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
        const first = ar.shift();
        ar.unshift('.', first);

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
    formatComma: (array, digits) => {
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
    }
};
