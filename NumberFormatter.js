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
            if (i % 3 === 2 && i < ar.length - 1) {
                result.unshift("' ");
            }
