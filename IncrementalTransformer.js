/**
 * Incremental Transformation
 * Converts between numbers and incremental game notation
 * k -> 1e3, M -> 1e6, B -> 1e9, T -> 1e12, A -> 1e15, B -> 1e18, ..., AA -> 1e93
 */

class IncrementalTransformer {
    constructor() {
        // All possible base notations
        this.allBaseNotations = [
            { symbol: 'K', value: 1e3 },
            { symbol: 'M', value: 1e6 },
            { symbol: 'G', value: 1e9 },
            { symbol: 'T', value: 1e12 },
            { symbol: 'P', value: 1e15 },
            { symbol: 'E', value: 1e18 },
            { symbol: 'Z', value: 1e21 },
            { symbol: 'Y', value: 1e24 },
            { symbol: 'R', value: 1e27 },
            { symbol: 'Q', value: 1e30 }
        ];

        this.init();
    }

    // Get active base notations based on current mode
    getActiveBaseNotations() {
        const mode = this.getCurrentMode();
        const modeIndex = this.allBaseNotations.findIndex(n => n.symbol === mode);

        if (mode === 'none') {
            return [];
        } else if (modeIndex >= 0) {
            return this.allBaseNotations.slice(0, modeIndex + 1);
        } else {
            return this.allBaseNotations.slice(0, 2); // Default: K, M
        }
    }

    // Get current mode from radio buttons
    getCurrentMode() {
        const radios = document.getElementsByName('kmgt-mode');
        for (const radio of radios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return 'T'; // Default
    }

    // Get starting exponent for lowercase letters based on mode
    getStartingExponent() {
        const mode = this.getCurrentMode();
        const modeIndex = this.allBaseNotations.findIndex(n => n.symbol === mode);

        if (mode === 'none') {
            return 3;  // a=1e3
        } else if (modeIndex >= 0) {
            // Start from next exponent after the selected mode
            return 3 + (modeIndex + 1) * 3; // K=1e3, so a starts from 1e6 for K mode
        } else {
            return 9;  // Default: a=1e9 (M mode)
        }
    }

    // Generate notation value dynamically for any string
    getNotationValue(symbol) {
        // Check active base notations first
        const activeBaseNotations = this.getActiveBaseNotations();
        const baseNotation = activeBaseNotations.find(n => n.symbol === symbol);
        if (baseNotation) {
            return baseNotation.value;
        }

        // For lowercase letters: start from getStartingExponent(), increment by 3 for each step
        if (/^[a-z]+$/.test(symbol)) {
            let value = 0;
            const base = 26; // 26 letters in alphabet

            for (let i = 0; i < symbol.length; i++) {
                const charValue = symbol.charCodeAt(i) - 97 + 1; // a=1, b=2, etc.
                value = value * base + charValue;
            }

            // Start from mode-dependent exponent for 'a', increment by 3 for each step
            const startingExponent = this.getStartingExponent();
            const exponent = startingExponent + (value - 1) * 3;

            // Use BigInt for very large exponents to avoid infinity
            if (exponent > 308) {
                return { type: 'bigint', exponent: exponent };
            }

            return Math.pow(10, exponent);
        }

        return null;
    }

    // Generate notation string from value
    getNotationFromValue(value) {
        // Check base notations first
        for (const notation of this.baseNotations) {
            if (notation.value === value) {
                return notation.symbol;
            }
        }

        // For values >= 1e15, generate lowercase notation
        if (value >= 1e15) {
            const exponent = Math.log10(value);
            const step = Math.round((exponent - 15) / 3) + 1;

            if (step > 0) {
                return this.numberToBase26(step);
            }
        }

        return null;
    }

    // Convert number to base-26 string (a=1, b=2, ..., z=26, aa=27, etc.)
    numberToBase26(num) {
        let result = '';
        let n = num;

        while (n > 0) {
            n--; // Adjust for 1-based indexing
            result = String.fromCharCode(97 + (n % 26)) + result;
            n = Math.floor(n / 26);
        }

        return result;
    }

    init() {
        const inputField = document.getElementById('incremental-input');
        const outputField = document.getElementById('incremental-output');
        const clearBtn = document.getElementById('incremental-clear-btn');

        if (!inputField || !outputField || !clearBtn) {
            console.error('IncrementalTransformer: Required elements not found');
            return;
        }

        // Event listeners for real-time conversion
        clearBtn.addEventListener('click', () => this.clear());
        inputField.addEventListener('keyup', () => this.convert());
        inputField.addEventListener('input', () => this.convert());
        inputField.addEventListener('paste', () => {
            // Handle paste event with slight delay to ensure pasted content is processed
            setTimeout(() => this.convert(), 10);
        });

        // Add event listeners for radio buttons
        const radios = document.getElementsByName('kmgt-mode');
        for (const radio of radios) {
            radio.addEventListener('change', () => this.convert());
        }
    }

    convert() {
        const input = document.getElementById('incremental-input').value.trim();
        const output = document.getElementById('incremental-output');

        if (!input) {
            output.value = '';
            return;
        }

        try {
            const result = this.transform(input);
            output.value = result;
        } catch (error) {
            output.value = 'Error: ' + error.message;
        }
    }

    clear() {
        document.getElementById('incremental-input').value = '';
        document.getElementById('incremental-output').value = '';
    }

    transform(input) {
        // Check if input is a number (including scientific notation)
        if (this.isNumeric(input)) {
            return this.numberToNotation(parseFloat(input));
        }

        // Check if input is notation
        return this.notationToNumber(input);
    }

    isNumeric(str) {
        // Handle regular numbers and scientific notation
        return /^-?\d*\.?\d+([eE][+-]?\d+)?$/.test(str);
    }

    numberToNotation(num) {
        if (num < 1) {
            return '';
        }
        if (num < 1000) {
            return num % 1 === 0 ? num.toString() : num.toFixed(3);
        }

        // Check active base notations first
        const activeBaseNotations = this.getActiveBaseNotations();
        for (const notation of activeBaseNotations.slice().reverse()) {
            if (num >= notation.value) {
                const coefficient = num / notation.value;
                if (coefficient < 1000) {
                    // Check current mode - if mode is not "1", use KMGT notation even for coefficient of 1
                    const currentMode = this.getCurrentMode();
                    if (coefficient === 1 && currentMode === "1") {
                        const exponent = Math.log10(notation.value);
                        return this.formatScientificNotation(`1e${exponent}`);
                    }
                    return this.formatCoefficient(coefficient) + notation.symbol;
                }
            }
        }

        // For larger numbers, generate dynamic notation
        const startingExponent = this.getStartingExponent();
        if (num >= Math.pow(10, startingExponent)) {
            const exponent = Math.log10(num);
            const step = Math.floor((exponent - startingExponent) / 3) + 1;
            const notationExponent = startingExponent + (step - 1) * 3;

            // Handle very large exponents
            if (notationExponent > 308) {
                const notationSymbol = this.numberToBase26(step);
                return `1${notationSymbol}`;
            }

            const notationValue = Math.pow(10, notationExponent);
            const coefficient = num / notationValue;

            if (coefficient < 1000) {
                const notationSymbol = this.numberToBase26(step);
                return this.formatCoefficient(coefficient) + notationSymbol;
            }
        }

        return num % 1 === 0 ? num.toString() : num.toFixed(3);
    }

    notationToNumber(notationInput) {
        // Remove whitespace but preserve case for matching
        const cleanNotation = notationInput.trim();

        // Check for scientific notation first
        if (cleanNotation.includes('E')) {
            const num = parseFloat(cleanNotation);
            if (!isNaN(num)) {
                return this.formatLargeNumber(num);
            }
        }

        // Extract coefficient and suffix (case-sensitive)
        const match = cleanNotation.match(/^([0-9]*\.?[0-9]*)?([A-Za-z]+)$/);
        if (!match) {
            throw new Error('Invalid notation format');
        }

        const coefficient = match[1] ? parseFloat(match[1]) : 1;
        const suffix = match[2];

        // Get notation value dynamically
        const notationValue = this.getNotationValue(suffix);
        if (!notationValue) {
            throw new Error(`Unknown notation: ${suffix}`);
        }

        // Handle BigInt case
        if (typeof notationValue === 'object' && notationValue.type === 'bigint') {
            if (coefficient === 1) {
                return this.formatLargeNumber(notationValue);
            } else {
                return this.formatScientificNotation(`${coefficient}e${notationValue.exponent}`);
            }
        }

        const result = coefficient * notationValue;
        return this.formatLargeNumber(result);
    }

    formatCoefficient(num) {
        return num.toFixed(3);
    }

    formatLargeNumber(num) {
        // Handle BigInt objects with exponent
        if (typeof num === 'object' && num.type === 'bigint') {
            return this.formatScientificNotation(`1e${num.exponent}`);
        }

        // For notation-to-number conversion, use KMGT format or scientific notation
        // Check if we can use active base notations
        const activeBaseNotations = this.getActiveBaseNotations();
        for (const notation of activeBaseNotations.slice().reverse()) {
            if (num >= notation.value && num <= notation.value * 999.999) {
                const coefficient = num / notation.value;
                if (coefficient === 1) {
                    const exponent = Math.log10(notation.value);
                    return this.formatScientificNotation(`1e${exponent}`);
                } else if (coefficient >= 1000) {
                    // If coefficient is 1000 or more, use scientific notation instead
                    return this.formatScientificNotation(num.toExponential(3));
                } else {
                    return `${this.formatCoefficient(coefficient)}${notation.symbol}`;
                }
            }
        }

        // For numbers that don't fit KMGT, use scientific notation
        if (num >= 1000) {
            return this.formatScientificNotation(num.toExponential(3));
        } else {
            // For small numbers, still use scientific notation to avoid plain numbers
            return this.formatScientificNotation(num.toExponential(3));
        }
    }

    // Format scientific notation to use 1eeN format for very large exponents
    formatScientificNotation(scientificStr) {
        // Parse the scientific notation
        let coefficient, exponent, exponent2;
        const match = scientificStr.match(/^([\d.]+)e\+?(-?[\d.]+)$/);
        const match2 = scientificStr.match(/^([\d.]+)e\+?(-?[\d.]+)e\+?(-?[\d.]+)$/);

        if (match) {
            coefficient = parseFloat(match[1]);
            exponent = parseInt(match[2]);
        } else if (match2) {
            coefficient = parseFloat(match2[1]);
            exponent = Math.pow(10, parseInt(match2[3]));
            exponent2 = parseInt(match2[3]);
        } else {
            return scientificStr; // Return as-is if not parseable
        }

        // If exponent is very large (>=10000000000), use 1eeN format
        // For moderate exponents, use standard scientific notation
        if (exponent < 10000000000) {
            return scientificStr;
        }

        let eeExponent;
        if (match) {
            eeExponent = Math.floor(Math.log10(exponent));
        } else if (match2) {
            eeExponent = exponent2;
        }

        if (coefficient === 1) {
            return `1ee${eeExponent}`;
        } else {
            return `${coefficient}ee${eeExponent}`;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IncrementalTransformer();
});