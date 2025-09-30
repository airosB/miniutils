/**
 * 画面解像度計算機能
 */
const ScreenResolutionCalculator = {
    state: {
        px: [null, null],
        incm: [null, null],
    },

    inputElements: {
        px: {
            h: null,
            v: null,
            d: null,
        },
        in: {
            h: null,
            v: null,
            d: null,
        },
        cm: {
            h: null,
            v: null,
            d: null,
        },
    },

    // 画面解像度計算の初期化
    initialize: () => {
        // 入力要素の取得
        const types = ['px', 'in', 'cm'];
        const directions = ['h', 'v', 'd'];
        
        types.forEach(type => {
            directions.forEach(dir => {
                ScreenResolutionCalculator.inputElements[type][dir] = 
                    document.getElementById(`dispres-${dir}${type}`);
            });
        });

        // イベントリスナーの設定
        Object.keys(ScreenResolutionCalculator.inputElements).forEach(outerKey => {
            Object.keys(ScreenResolutionCalculator.inputElements[outerKey]).forEach(innerKey => {
                const element = ScreenResolutionCalculator.inputElements[outerKey][innerKey];
                element.addEventListener('keyup', ScreenResolutionCalculator.doCalculate, false);
                element.addEventListener('blur', ScreenResolutionCalculator.normalizeInputs, false);
            });
        });

        // ボタン類のイベント設定
        document.getElementById('dispres-discard').addEventListener('click', ScreenResolutionCalculator.discard, false);
        document.querySelectorAll('#dispres-preset .res-preset').forEach(el => {
            el.addEventListener('click', ScreenResolutionCalculator.setPreset, false);
        });

        // 入力監視の開始
        setInterval(ScreenResolutionCalculator.scanInputs, 20);
    },

    // 数値を指定桁数で丸める
    round: (float, digit) => {
        const offset = Math.pow(10, digit);
        return Math.round(float * offset) / offset;
    },

    // 最大公約数を計算
    calcGcd: (numA, numB) => {
        while (numB > 0) {
            const temp = numB;
            numB = numA % numB;
            numA = temp;
        }
        return numA;
    },

    // 入力値を正規化（全角数字を半角に変換など）
    normalizeInput: (str) => {
        return str
            .replace(/[１２３４５６７８９０]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
            .replace(/．/g, '.')
            .replace(/[^0-9\.]/g, '');
    },

    // すべての入力をクリア
    discard: () => {
        Object.keys(ScreenResolutionCalculator.inputElements).forEach(outerKey => {
            Object.keys(ScreenResolutionCalculator.inputElements[outerKey]).forEach(innerKey => {
                ScreenResolutionCalculator.inputElements[outerKey][innerKey].value = '';
            });
        });

        ['px', 'in', 'cm'].forEach(type => {
            document.getElementById(`dispres-r${type}`).value = '';
        });
        document.getElementById('dispres-res').value = '';
    },

    // プリセット解像度の入力
    setPreset: (e) => {
        const presets = {
            uxga: { hpx: 1600, vpx: 1200, dpx: 2000 },
            fullHd: { hpx: 1920, vpx: 1080, dpx: 2203 },
            wuxga: { hpx: 1920, vpx: 1200, dpx: 2264 },
            '4k': { hpx: 3840, vpx: 2160, dpx: 4406 },
            surfacePro3: { hpx: 2160, vpx: 1440, dpx: 2596, din: 12 },
            surfacePro6: { hpx: 2736, vpx: 1824, dpx: 3288, din: 12.3 },
        };

        const preset = presets[e.target.dataset.presetName];
        if (!preset) return;

        const setValueAndCalculate = (type, value) => {
            if (typeof value === 'number') {
                const target = document.getElementById(`dispres-${type}`);
                target.value = value;
                ScreenResolutionCalculator.doCalculate({ currentTarget: target, keyCode: 13 });
            }
        };

        setValueAndCalculate('vpx', preset.vpx);
        setValueAndCalculate('hpx', preset.hpx);
        setValueAndCalculate('dpx', preset.dpx);
        setValueAndCalculate('din', preset.din);
    },

    // 入力値をスキャン
    scanInputs: () => {
        const inputData = {};
        Object.keys(ScreenResolutionCalculator.inputElements).forEach(outerKey => {
            inputData[outerKey] = {};
            Object.keys(ScreenResolutionCalculator.inputElements[outerKey]).forEach(innerKey => {
                inputData[outerKey][innerKey] = ScreenResolutionCalculator.normalizeInput(
                    ScreenResolutionCalculator.inputElements[outerKey][innerKey].value
                );
            });
        });
        return inputData;
    },

    // 入力値を正規化
    normalizeInputs: () => {
        Object.keys(ScreenResolutionCalculator.inputElements).forEach(outerKey => {
            Object.keys(ScreenResolutionCalculator.inputElements[outerKey]).forEach(innerKey => {
                const element = ScreenResolutionCalculator.inputElements[outerKey][innerKey];
                element.value = ScreenResolutionCalculator.normalizeInput(element.value);
            });
        });
    },

    // 計算実行
    doCalculate: (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) return false;

        const el = e.currentTarget;
        const type = el.dataset.type;
        const dType = type === 'px' ? 'px' : 'incm';
        let calced = false;

        // 直近2回の入力履歴を更新
        if (el.dataset.direction !== ScreenResolutionCalculator.state[dType][0]) {
            ScreenResolutionCalculator.state[dType][1] = ScreenResolutionCalculator.state[dType][0];
        }
        ScreenResolutionCalculator.state[dType][0] = el.dataset.direction;
        const direction = ScreenResolutionCalculator.state[dType];

        const inputData = ScreenResolutionCalculator.scanInputs();
        const values = {
            h: inputData[type].h,
            v: inputData[type].v,
            d: inputData[type].d,
        };

        // 寸法計算
        const calculateDimensions = () => {
            const calculations = {
                d: () => ScreenResolutionCalculator.round(Math.sqrt(values.h * values.h + values.v * values.v), 2),
                h: () => ScreenResolutionCalculator.round(Math.sqrt(values.d * values.d - values.v * values.v), 2),
                v: () => ScreenResolutionCalculator.round(Math.sqrt(values.d * values.d - values.h * values.h), 2),
            };

            if (direction[1] !== null) {
                const missingDimension = ['h', 'v', 'd'].find(dim => !direction.includes(dim));
                if (missingDimension && Object.values(values).filter(Boolean).length >= 2) {
                    const result = calculations[missingDimension]();
                    if (result) {
                        ScreenResolutionCalculator.inputElements[type][missingDimension].value = result;
                    }
                }
            }
        };

        calculateDimensions();

        // インチ⇔センチの相互変換
        setTimeout(() => {
            const convertInchToCm = (value) => ScreenResolutionCalculator.round(value * 2.54, 2);
            const convertCmToInch = (value) => ScreenResolutionCalculator.round(value / 2.54, 2);

            if (type === 'in') {
                ['h', 'v', 'd'].forEach(dir => {
                    if (inputData.in[dir]) {
                        ScreenResolutionCalculator.inputElements.cm[dir].value = 
                            convertInchToCm(inputData.in[dir]);
                    }
                });
            } else if (type === 'cm') {
                ['h', 'v', 'd'].forEach(dir => {
                    if (inputData.cm[dir]) {
                        ScreenResolutionCalculator.inputElements.in[dir].value = 
                            convertCmToInch(inputData.cm[dir]);
                    }
                });
            }
        }, 21);

        // アスペクト比の計算
        setTimeout(() => {
            ['px', 'in', 'cm'].forEach(measureType => {
                if (inputData[measureType].h && inputData[measureType].v) {
                    const h = ScreenResolutionCalculator.round(inputData[measureType].h, 1);
                    const v = ScreenResolutionCalculator.round(inputData[measureType].v, 1);
                    const gcd = ScreenResolutionCalculator.calcGcd(h, v);
                    document.getElementById(`dispres-r${measureType}`).value = 
                        `${h/gcd}:${v/gcd}`;
                }
            });
        }, 21);

        // 解像度（DPI）の計算と補完
        setTimeout(() => {
            const calculateDpi = () => {
                if (inputData.px[direction[0]] && inputData.in[direction[0]]) {
                    const dpi = ScreenResolutionCalculator.round(
                        inputData.px[direction[0]] / inputData.in[direction[0]], 
                        2
                    );
                    document.getElementById('dispres-res').value = dpi;
                    return true;
                }
                return false;
            };

            calced = calculateDpi();

            // DPIを使って残りの値を補完
            if (calced) {
                const dpi = document.getElementById('dispres-res').value;
                ['h', 'v', 'd'].forEach(dir => {
                    if (direction[0] !== dir && inputData.px[dir]) {
                        ScreenResolutionCalculator.inputElements.in[dir].value = 
                            ScreenResolutionCalculator.round(inputData.px[dir] / dpi, 2);
                        ScreenResolutionCalculator.inputElements.cm[dir].value = 
                            ScreenResolutionCalculator.round(inputData.px[dir] * 2.54 / dpi, 2);
                    }
                });
            }
        }, 31);
    },
};

// 初期化
ScreenResolutionCalculator.initialize();
