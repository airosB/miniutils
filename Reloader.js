

const reloader = {
    timeToGo: 0,
    doneCount: 0,
    engageTimer: null,
    statusTimer: null,
    timeToNext: 0,

    generateUrl: () => {
        const params = {
            1: {
                enabled: _('#f15-param1').checked,
                name: _('#f15-name1').value,
                value: _('#f15-value1').value,
            },
            2: {
                enabled: _('#f15-param2').checked,
                name: _('#f15-name2').value,
                value: _('#f15-value2').value,
            },
            3: {
                enabled: _('#f15-param3').checked,
                name: _('#f15-name3').value,
                value: _('#f15-value3').value,
            },
            "R": {
                enabled: _('#f15-paramR').checked,
                name: _('#f15-nameR').value,
                value: _('#f15-valueR').value,
            }
        };

        const paramArray = [];
        for (const [key, param] of Object.entries(params)) {
            if (param.enabled) {
                if (key === "R") {
                    const rand = Math.random();
                    _("#f15-valueR").value = rand;
                    paramArray.push(`${param.name}=${rand}`);
                } else {
                    paramArray.push(`${param.name}=${param.value}`);
                }
            }
        }

        const inputUrl = _('#inputUrl').value;
        _('#outputUrl').value = paramArray.length ? `${inputUrl}?${paramArray.join('&')}` : inputUrl;
    },

    engage: () => {
        reloader.doneCount = 0;
        clearTimeout(reloader.engageTimer);
        clearTimeout(reloader.statusTimer);

        reloader.timeToGo = parseFloat(_('#f15-interval-ms').value);
        if (isNaN(reloader.timeToGo)) {
            reloader.timeToGo = 60000;
        }

        const targetWindow = _('#target-window');
        targetWindow.style.display = "block";

        reloader.shoot(true);
        if (reloader.timeToGo > 1000) {
            reloader.showCountDown();
        }
    },

    disengage: () => {
        clearTimeout(reloader.engageTimer);
        clearTimeout(reloader.statusTimer);
        _('#status').innerHTML = 'DETERMINATED';
        reloader.timeToGo = '';
    },

    shoot: (isTheFirstTime = false) => {
        if (reloader.timeToGo > 15 || isTheFirstTime) {
            reloader.generateUrl();
        }

        const targetUrl = _('#outputUrl').value;
        _('#target-window').src = targetUrl;

        _('#status').innerHTML = `FIRING (${reloader.timeToGo/1000} sec.) [${reloader.doneCount} done]`;
        reloader.doneCount++;

        reloader.engageTimer = setTimeout(() => reloader.shoot(), reloader.timeToGo);
        reloader.timeToNext = reloader.timeToGo/1000;
    },

    showCountDown: () => {
        const displayTime = Math.round(reloader.timeToNext * 10) / 10;
        _('#status').innerHTML = `RELOADING (${reloader.timeToGo/1000} sec.) NEXT in ${displayTime} sec. [${reloader.doneCount} done]`;
        reloader.timeToNext--;

        reloader.statusTimer = setTimeout(() => reloader.showCountDown(), 1000);
    },

    ms2min: () => {
        _('#f15-interval-min').value = _('#f15-interval-ms').value / 60000;
    },

    min2ms: () => {
        _('#f15-interval-ms').value = _('#f15-interval-min').value * 60000;
    },

    bindEvents: () => {
        // キー入力とクリックでURL生成
        document.querySelectorAll('.f15-key-change').forEach(el => {
            el.addEventListener('keyup', reloader.generateUrl);
        });
        
        document.querySelectorAll('.f15-click-change').forEach(el => {
            el.addEventListener('click', reloader.generateUrl);
        });

        // リロード開始・停止
        _('#f15-engage').addEventListener('click', reloader.engage);
        _('#f15-disengage').addEventListener('click', reloader.disengage);

        // インターバル時間の相互変換
        _('#f15-interval-min').addEventListener('keyup', reloader.min2ms);
        _('#f15-interval-ms').addEventListener('keyup', reloader.ms2min);
    },
};

reloader.bindEvents();
