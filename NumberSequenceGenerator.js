
/**
 * 連番生成機能
 */
const numberSequenceGenerator = {
    /**
     * 指定された桁数に合わせて先頭にゼロを付加する
     * @param {number} digits 桁数
     * @param {number} num 数値
     * @returns {string} ゼロ埋めされた文字列
     */
    formatNumber: (digits, num) => {
        const isHex = _('#series_hex').checked;
        const numStr = isHex ? num.toString(16) : num.toString();
        return numStr.padStart(digits, '0');
    },

    /**
     * 連番を生成してフォームに出力
     */
    generate: () => {
        const template = _('#series_in').value;
        const output = _('#series_result');
        const digitsInput = _('#series_digit');
        output.value = '';

        // 自動桁数判定モード
        if (_('#series_auto').checked) {
            digitsInput.disabled = true;
            
            // 末尾に最も近い数字列を抽出して桁数を設定
            const match = template.match(/[0-9]+([^0-9]*?)$/);
            if (match) {
                const digits = match[0].match(/[0-9]+/)[0];
                digitsInput.value = digits.length;
            }
        } else {
            digitsInput.disabled = false;
        }

        // パラメータの取得
        const digits = parseInt(digitsInput.value, 10);
        const isHex = _('#series_hex').checked;
        const from = parseInt(_('#series_from').value, isHex ? 16 : 10);
        const to = parseInt(_('#series_to').value, isHex ? 16 : 10);
        const interval = parseInt(_('#series_interval').value, isHex ? 16 : 10);

        if (interval < 1) {
            output.value = 'Err.';
            return;
        }

        // 連番生成
        const results = [];
        for (let i = from; i <= to; i += interval) {
            const formattedNum = numberSequenceGenerator.formatNumber(digits, i);
            let line = template;
            
            // 自動桁数判定モードの場合は末尾の数字を置換
            if (_('#series_auto').checked) {
                line = template.replace(/[0-9]+([^0-9]*?)$/, `${formattedNum}$1`);
            } else {
                line = template.replace(/!/, formattedNum);
            }

            // 画像ラップモードの場合
            if (numberSequenceGenerator.isImageWrapped) {
                line = `<img width="300" src="${line}" />`;
            }

            results.push(line);
        }

        output.value = results.join('\n');
    },

    isImageWrapped: false,

    /**
     * 画像ラップモードの切り替え
     */
    toggleImageWrap: () => {
        numberSequenceGenerator.isImageWrapped = !numberSequenceGenerator.isImageWrapped;
        numberSequenceGenerator.generate();
    },

    /**
     * イベントリスナーの設定
     */
    bindEvents: () => {
        const inputs = [
            '#series_in', '#series_from', '#series_to', 
            '#series_interval', '#series_digit', '#series_auto',
            '#series_hex'
        ];

        inputs.forEach(selector => {
            _(selector).addEventListener('input', numberSequenceGenerator.generate);
        });

        _('#series_wrap').addEventListener('click', numberSequenceGenerator.toggleImageWrap);
    }
};

// 初期化
numberSequenceGenerator.bindEvents();
