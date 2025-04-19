const NumberFormatter = {
    /**
     * 入力された数値を配列化して処理する
     * @param {string} input 入力された数値
     * @param {number} roundExp 丸め桁数
     * @returns {Object} 通常の配列と制限された配列
     */
    parseInput: (input, roundExp) => {
        const array = Array.from(input).map(char => parseInt(char));
        const arrayLimited = [...array];
        
        // 桁数の切り詰め
        const REV = parseInt(roundExp) + 1;
        const offset = REV - array.length;
        
        if (offset < 0) {
            arrayLimited.length = REV;
        } else {
            arrayLimited.push(...Array(offset).fill(0));
        }

        // 切り詰め時の四捨五入
        const last = arrayLimited.pop();
        const last2 = arrayLimited.pop();
        arrayLimited.push(last >= 5 ? last2 + 1 : last2);

        return { array, arrayLimited };
    },

    /**
     * 浮動小数点形式にフォーマット
     */
    formatFloat: (array, digits) => {
        const ar = [...array];

        // 末尾の0を削除
        while (ar[ar.length - 1] === 0) {
            ar.pop();
        }

        ar.push('e+', --digits);
        return ar.join('');
    },

    /**
     * カンマ区切り形式にフォーマット
     */
    formatApostrophe: (array, digits) => {
        const ar = [...array];
        ar.push(...Array(digits - ar.length).fill(0));
        ar.reverse();

        const result = [];
        ar.forEach((num, i) => {
            result.unshift(num);
            // 3桁ごと、かつ最後のブロックでない場合に区切り文字を追加
            if ((i + 1) % 3 === 0 && i < ar.length - 1) {
                result.unshift("' ");
            }
        });

        return result.join('');
    },

    /**
     * 漢字形式（万、億、兆...）にフォーマット
     */
    formatJapanese: (array, digits) => {
        const ar = [...array];
        const suffixes = ['', '万', '億', '兆', '京', '垓', '秭', '穣', '溝', '澗', '正', '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議', '無量大数'];
        ar.push(...Array(digits - ar.length).fill(0));
        ar.reverse();

        const result = [];
        let block = [];
        let suffixIndex = 0;

        ar.forEach((num, i) => {
            block.unshift(num);
            if (block.length === 4 || i === ar.length - 1) {
                const blockNum = parseInt(block.join(''), 10);
                if (blockNum !== 0) {
                    result.unshift(suffixes[suffixIndex]);
                    result.unshift(blockNum);
                }
                block = [];
                suffixIndex++;
            }
        });

        return result.join('');
    },

    /**
     * 金融形式（千、百万、十億...）にフォーマット
     */
    formatFinance: (array, digits) => {
        const ar = [...array];
        const suffixes = ['', '千', '百万', '十億', '兆', '千兆', '百京', '十垓', '秭', '千秭', '百穣', '十溝', '澗', '千澗', '百正', '十載', '極', '千極', '百恒河沙', '十阿僧祇', '那由他', '千那由他', '百不可思議', '十無量大数'];
        ar.push(...Array(digits - ar.length).fill(0));
        ar.reverse();

        const result = [];
        let block = [];
        let suffixIndex = 0;

        ar.forEach((num, i) => {
            block.unshift(num);
            if (block.length === 3 || i === ar.length - 1) {
                const blockNum = parseInt(block.join(''), 10);
                if (blockNum !== 0) {
                    result.unshift(suffixes[suffixIndex] + ' ');
                    result.unshift(blockNum);
                }
                block = [];
                suffixIndex++;
            }
        });

        return result.join('').trim(); // 末尾のスペースを削除
    },

    /**
     * ショートスケール形式（thousand, million, billion...）にフォーマット
     */
    formatShortScale: (array, digits) => {
        const ar = [...array];
        const suffixes = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];
        ar.push(...Array(digits - ar.length).fill(0));
        ar.reverse();

        const result = [];
        let block = [];
        let suffixIndex = 0;

        ar.forEach((num, i) => {
            block.unshift(num);
            if (block.length === 3 || i === ar.length - 1) {
                const blockNum = parseInt(block.join(''), 10);
                if (blockNum !== 0) {
                    result.unshift(suffixes[suffixIndex] + ' ');
                    result.unshift(blockNum);
                }
                block = [];
                suffixIndex++;
            }
        });

        return result.join('').trim(); // 末尾のスペースを削除
    },

    /**
     * ロングスケール形式（million, billion, trillion...）にフォーマット
     */
    formatLongScale: (array, digits) => {
        const ar = [...array];
        const suffixes = ['', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];
        ar.push(...Array(digits - ar.length).fill(0));
        ar.reverse();

        const result = [];
        let block = [];
        let suffixIndex = 0;

        ar.forEach((num, i) => {
            block.unshift(num);
            if (block.length === 6 || i === ar.length - 1) {
                const blockNum = parseInt(block.join(''), 10);
                if (blockNum !== 0) {
                    result.unshift(suffixes[suffixIndex] + ' ');
                    result.unshift(blockNum);
                }
                block = [];
                suffixIndex++;
            }
        });

        return result.join('').trim(); // 末尾のスペースを削除
    },

    /**
     * HTML要素から値を取得し、フォーマットを実行して結果を出力欄に反映させる
     */
    update: () => {
        const inputNumberEl = document.getElementById('nf-input-number');
        const inputAccuracyEl = document.getElementById('nf-input-accuracy');

        const rawNumber = inputNumberEl.value.replace(/[^0-9]/g, ''); // 数字以外を除去
        const accuracy = parseInt(inputAccuracyEl.value, 10) || 0; // 精度を取得、無効な場合は0

        if (!rawNumber) {
            // 入力が空の場合は出力欄もクリア
            const outputIds = [
                'nf-output-float1', 'nf-output-float2', 'nf-output-apostrophe1', 'nf-output-apostrophe2',
                'nf-output-short1', 'nf-output-short2', 'nf-output-long1', 'nf-output-long2',
                'nf-output-kanji1', 'nf-output-kanji2', 'nf-output-financial1', 'nf-output-financial2'
            ];
            outputIds.forEach(id => document.getElementById(id).value = '');
            return;
        }

        const { array, arrayLimited } = NumberFormatter.parseInput(rawNumber, accuracy);
        const digits = rawNumber.length; // 元の桁数

        _('#nf-output-float1').value = NumberFormatter.formatFloat(arrayLimited, digits);
        _('#nf-output-float2').value = NumberFormatter.formatFloat(array, digits);
        _('#nf-output-apostrophe1').value = NumberFormatter.formatApostrophe(arrayLimited, digits);
        _('#nf-output-apostrophe2').value = NumberFormatter.formatApostrophe(array, digits);
        _('#nf-output-short1').value = NumberFormatter.formatShortScale(arrayLimited, digits);
        _('#nf-output-short2').value = NumberFormatter.formatShortScale(array, digits);
        _('#nf-output-long1').value = NumberFormatter.formatLongScale(arrayLimited, digits);
        _('#nf-output-long2').value = NumberFormatter.formatLongScale(array, digits);
        _('#nf-output-kanji1').value = NumberFormatter.formatJapanese(arrayLimited, digits);
        _('#nf-output-kanji2').value = NumberFormatter.formatJapanese(array, digits);
        _('#nf-output-financial1').value = NumberFormatter.formatFinance(arrayLimited, digits);
        _('#nf-output-financial2').value = NumberFormatter.formatFinance(array, digits);
    },

    /**
     * イベントリスナーをHTML要素にバインドする
     */
    bindEvents: () => {
        const inputNumberEl = document.getElementById('nf-input-number');
        const inputAccuracyEl = document.getElementById('nf-input-accuracy');

        inputNumberEl.addEventListener('keyup', NumberFormatter.update);
        inputAccuracyEl.addEventListener('keyup', NumberFormatter.update);
    }
};

// イベントリスナーを登録
NumberFormatter.bindEvents();
