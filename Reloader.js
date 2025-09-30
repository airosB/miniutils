

const reloader = {
    timeToGo: 0,
    doneCount: 0,
    engageTimer: null,
    statusTimer: null,
    timeToNext: 0,

    generateUrl: () => {
        const inputUrl = _('#inputUrl').value;
        
        // ランダムパラメータの処理
        if (_('#f15-paramR').checked) {
            const rand = Math.random();
            _("#f15-valueR").value = rand;
            const paramName = _('#f15-nameR').value;
            _('#outputUrl').value = `${inputUrl}?${paramName}=${rand}`;
        } else {
            _('#outputUrl').value = inputUrl;
        }
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
        // 基本URL入力時のURL生成
        _('#inputUrl').addEventListener('keyup', reloader.generateUrl);
        
        // ランダムパラメータの設定変更時のURL生成
        _('#f15-paramR').addEventListener('change', reloader.generateUrl);
        _('#f15-nameR').addEventListener('keyup', reloader.generateUrl);

        // リロード開始・停止
        _('#f15-engage').addEventListener('click', reloader.engage);
        _('#f15-disengage').addEventListener('click', reloader.disengage);

        // インターバル時間の相互変換
        _('#f15-interval-min').addEventListener('keyup', reloader.min2ms);
        _('#f15-interval-ms').addEventListener('keyup', reloader.ms2min);
    },
};

reloader.bindEvents();
