class RomanToKanaTranslator {
    static ELEMENTS = {
        INPUT: document.getElementById('roman-input'),
        OUTPUT: document.getElementById('roman-output'),
        CONFIRMED_COUNT: document.getElementById('roman-confirmed-count'),
        OLD_SPELLING: document.getElementById('roman-old-spelling'),
    };

    static TRANSLATION_TABLE = {
        SINGLE_CHARS: {
            "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
            "?": "？", "!": "！", ",": "、", ".": "。", "-": "ー",
            "~": "～"
        },
        SPECIAL_CASES: {
            "qq": "っ", "ww": "っ", "rr": "っ", "tt": "っ", "yy": "っ",
            "pp": "っ", "ss": "っ", "dd": "っ", "ff": "っ", "gg": "っ",
            "hh": "っ", "jj": "っ", "kk": "っ", "ll": "っ", "zz": "っ",
            "xx": "っ", "cc": "っ", "vv": "っ", "bb": "っ", "mm": "っ",
            "nb": "ん", "nc": "ん", "nd": "ん", "nf": "ん", "ng": "ん",
            "nh": "ん", "nj": "ん", "nk": "ん", "nl": "ん", "nm": "ん",
            "np": "ん", "nq": "ん", "nr": "ん", "ns": "ん", "nt": "ん",
            "nv": "ん", "nw": "ん", "nx": "ん", "ny": "ん", "nz": "ん"
        },
        DOUBLE_CHARS: {
            "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
            "ca": "か", "ci": "し", "cu": "く", "ce": "せ", "co": "こ",
            "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",
            "fa": "ふぁ", "fi": "ふぃ", "fu": "ふ", "fe": "ふぇ", "fo": "ふぉ",
            "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
            "ha": "は", "hi": "ひ", "hu": "ふ", "he": "へ", "ho": "ほ",
            "ja": "じゃ", "ji": "じ", "ju": "じゅ", "je": "じぇ", "jo": "じょ",
            "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
            "la": "ぁ", "li": "ぃ", "lu": "ぅ", "le": "ぇ", "lo": "ぉ",
            "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
            "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
            "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",
            "qa": "くぁ", "qi": "くぃ", "qu": "く", "qe": "くぇ", "qo": "くぉ",
            "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
            "sa": "さ", "si": "し", "su": "す", "se": "せ", "so": "そ",
            "ta": "た", "ti": "ち", "tu": "つ", "te": "て", "to": "と",
            "va": "ゔぁ", "vi": "ゔぃ", "vu": "ゔ", "ve": "ゔぇ", "vo": "ゔぉ",
            "wa": "わ", "wi": "ゐ", "wu": "う", "we": "ゑ", "wo": "を",
            "xa": "ぁ", "xi": "ぃ", "xu": "ぅ", "xe": "ぇ", "xo": "ぉ",
            "ya": "や", "yi": "い", "yu": "ゆ", "ye": "いぇ", "yo": "よ",
            "za": "ざ", "zi": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
            "nn": "ん", "n'": "ん"
        },
        TRIPLE_CHARS: {
            "bya": "びゃ", "byi": "びぃ", "byu": "びゅ", "bye": "びぇ", "byo": "びょ",
            "cha": "ちゃ", "chi": "ち", "chu": "ちゅ", "che": "ちぇ", "cho": "ちょ",
            "cya": "ちゃ", "cyi": "ちぃ", "cyu": "ちゅ", "cye": "ちぇ", "cyo": "ちょ",
            "dha": "でゃ", "dhi": "でぃ", "dhu": "でゅ", "dhe": "でぇ", "dho": "でょ",
            "dya": "ぢゃ", "dyi": "ぢぃ", "dyu": "ぢゅ", "dye": "ぢぇ", "dyo": "ぢょ",
            "dwa": "どゎ", "dwi": "どゐ", "dwu": "どぅ", "dwe": "どゑ", "dwo": "どぉ",
            "fya": "ふゃ", "fyi": "ふぃ", "fyu": "ふゅ", "fye": "ふぇ", "fyo": "ふょ",
            "fwa": "ふゎ", "fwi": "ふゐ", "fwu": "ふぅ", "fwe": "ふゑ", "fwo": "ふぉ",
            "gya": "ぎゃ", "gyi": "ぎぃ", "gyu": "ぎゅ", "gye": "ぎぇ", "gyo": "ぎょ",
            "gwa": "ぐゎ", "gwi": "ぐゐ", "gwu": "ぐぅ", "gwe": "ぐゑ", "gwo": "ぐぉ",
            "hya": "ひゃ", "hyi": "ひぃ", "hyu": "ひゅ", "hye": "ひぇ", "hyo": "ひょ",
            "jya": "じゃ", "jyi": "じぃ", "jyu": "じゅ", "jye": "じぇ", "jyo": "じょ",
            "kya": "きゃ", "kyi": "きぃ", "kyu": "きゅ", "kye": "きぇ", "kyo": "きょ",
            "lya": "ゃ", "lyi": "ぃ", "lyu": "ゅ", "lye": "ぇ", "lyo": "ょ",
            "lka": "ヵ", "lke": "ヶ", "ltu": "っ", "lwa": "ゎ",
            "mya": "みゃ", "myi": "みぃ", "myu": "みゅ", "mye": "みぇ", "myo": "みょ",
            "nya": "にゃ", "nyi": "にぃ", "nyu": "にゅ", "nye": "にぇ", "nyo": "にょ",
            "pya": "ぴゃ", "pyi": "ぴぃ", "pyu": "ぴゅ", "pye": "ぴぇ", "pyo": "ぴょ",
            "qwa": "くゎ", "qwi": "くゐ", "qwu": "くぅ", "qwe": "くゑ", "qwo": "くぉ",
            "qya": "くゃ", "qyi": "くぃ", "qyu": "くゅ", "qye": "くぇ", "qyo": "くょ",
            "rya": "りゃ", "ryi": "りぃ", "ryu": "りゅ", "rye": "りぇ", "ryo": "りょ",
            "sha": "しゃ", "shi": "し", "shu": "しゅ", "she": "しぇ", "sho": "しょ",
            "sya": "しゃ", "syi": "しぃ", "syu": "しゅ", "sye": "しぇ", "syo": "しょ",
            "swa": "すゎ", "swi": "すゐ", "swu": "すぅ", "swe": "すゑ", "swo": "すぉ",
            "tha": "てゃ", "thi": "てぃ", "thu": "てゅ", "the": "てぇ", "tho": "てょ",
            "tsa": "つぁ", "tsi": "つぃ", "tsu": "つ", "tse": "つぇ", "tso": "つぉ",
            "twa": "とゎ", "twi": "とゐ", "twu": "とぅ", "twe": "とゑ", "two": "とぉ",
            "tya": "ちゃ", "tyi": "ちぃ", "tyu": "ちゃ", "tye": "ちぇ", "tyo": "ちょ",
            "vya": "ゔゃ", "vyi": "ゔぃ", "vyu": "ゔゅ", "vye": "ゔぇ", "vyo": "ゔょ",
            "wha": "うぁ", "whi": "うぃ", "whu": "う", "whe": "うぇ", "who": "うぉ",
            "xya": "ゃ", "xyi": "ぃ", "xyu": "ゅ", "xye": "ぇ", "xyo": "ょ",
            "xka": "ヵ", "xke": "ヶ", "xtu": "っ", "xwa": "ゎ",
            "zya": "じゃ", "zyi": "じぃ", "zyu": "じゅ", "zye": "じぇ", "zyo": "じょ"
        },
        QUADRUPLE_CHARS: {
            "ltsu": "っ", "xtsu": "っ"
        }
    };

    searchForTranslationTables(fragment) {
        const TABLE = RomanToKanaTranslator.TRANSLATION_TABLE;

        if (fragment.length === 1) {
            if (TABLE.SINGLE_CHARS[fragment]) {
                return {result: TABLE.SINGLE_CHARS[fragment], shift: 1}
            }
        }
        if (fragment.length === 2) {
            if (TABLE.SPECIAL_CASES[fragment]) {
                return {result: TABLE.SPECIAL_CASES[fragment], shift: 1}
            }
            if (TABLE.DOUBLE_CHARS[fragment]) {
                return {result: TABLE.DOUBLE_CHARS[fragment], shift: 2}
            }
        }
        if (fragment.length === 3) {
            if (TABLE.TRIPLE_CHARS[fragment]) {
                return {result: TABLE.TRIPLE_CHARS[fragment], shift: 3}
            }
        }
        if (fragment.length === 4) {
            if (TABLE.QUADRUPLE_CHARS[fragment]) {
                return {result: TABLE.QUADRUPLE_CHARS[fragment], shift: 4}
            }
        }

        return false;
    }

    translateRomanIntoKana(romanString) {
        let result = '';
        let cursor = 0;

        while (cursor < romanString.length) {
            let converted = false;

            for (let length = 0; length <= 4 && !converted; length++) {
                const fragment = romanString.substring(cursor, cursor + length);
                if (this.searchForTranslationTables(fragment)) {
                    const translated = this.searchForTranslationTables(fragment)
                    result += translated.result;
                    cursor += translated.shift;
                    length = 0;
                }
            }

            if (!converted) {
                result += romanString.charAt(cursor);
                cursor++;
            }
        }

        return {'translated': result, 'confirmedLength': Math.max(cursor - 1, 0)}
    };

    translate() {
        const input = RomanToKanaTranslator.ELEMENTS.INPUT.value;
        const result = this.translateRomanIntoKana(input)
        RomanToKanaTranslator.ELEMENTS.CONFIRMED_COUNT.value = result.confirmedLength;
        if (RomanToKanaTranslator.ELEMENTS.OLD_SPELLING.checked) {
            RomanToKanaTranslator.ELEMENTS.OUTPUT.value = result.translated;
        } else {
            RomanToKanaTranslator.ELEMENTS.OUTPUT.value = result.translated.replace(/ゐ/g, "うぃ").replace(/ゑ/g, "うぇ");
        }
    }

    initialize() {
        RomanToKanaTranslator.ELEMENTS.INPUT.addEventListener('keyup', this.translate.bind(this))
        RomanToKanaTranslator.ELEMENTS.OLD_SPELLING.addEventListener('click', this.translate.bind(this))
    };
}

const converter = new RomanToKanaTranslator();
converter.initialize();
