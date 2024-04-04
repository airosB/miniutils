const $ = (selector) => {
    return document.querySelector(selector);
};
const $$ = (selector) => {
    return document.querySelectorAll(selector);
};

const main = () => {
    const util = {
        zen2han: (str) => {
            return str.replace(/＄/g, '$').replace(/％/g, '%').replace(/＆/g, '&').replace(/：/g, ':').replace(/；/g, ';').replace(/－/g, '-').replace(/＾/g, '^').replace(/＠/g, '@').replace(/．/g, '.').replace(/＊/g, '*').replace(/／/g, ' / ').replace(/＿/g, '_').replace(/　/g, ' ').replace(/１/g, '1').replace(/２/g, '2').replace(/３/g, '3').replace(/４/g, '4').replace(/５/g, '5').replace(/６/g, '6').replace(/７/g, '7').replace(/８/g, '8').replace(/９/g, '9').replace(/０/g, '0').replace(/Ａ/g, 'A').replace(/Ｂ/g, 'B').replace(/Ｃ/g, 'C').replace(/Ｄ/g, 'D').replace(/Ｅ/g, 'E').replace(/Ｆ/g, 'F').replace(/Ｇ/g, 'G').replace(/Ｈ/g, 'H').replace(/Ｉ/g, 'I').replace(/Ｊ/g, 'J').replace(/Ｋ/g, 'K').replace(/Ｌ/g, 'L').replace(/Ｍ/g, 'M').replace(/Ｎ/g, 'N').replace(/Ｏ/g, 'O').replace(/Ｐ/g, 'P').replace(/Ｑ/g, 'Q').replace(/Ｒ/g, 'R').replace(/Ｓ/g, 'S').replace(/Ｔ/g, 'T').replace(/Ｕ/g, 'U').replace(/Ｖ/g, 'V').replace(/Ｗ/g, 'W').replace(/Ｘ/g, 'X').replace(/Ｙ/g, 'Y').replace(/Ｚ/g, 'Z').replace(/ａ/g, 'a').replace(/ｂ/g, 'b').replace(/ｃ/g, 'c').replace(/ｄ/g, 'd').replace(/ｅ/g, 'e').replace(/ｆ/g, 'f').replace(/ｇ/g, 'g').replace(/ｈ/g, 'h').replace(/ｉ/g, 'i').replace(/ｊ/g, 'j').replace(/ｋ/g, 'k').replace(/ｌ/g, 'l').replace(/ｍ/g, 'm').replace(/ｎ/g, 'n').replace(/ｏ/g, 'o').replace(/ｐ/g, 'p').replace(/ｑ/g, 'q').replace(/ｒ/g, 'r').replace(/ｓ/g, 's').replace(/ｔ/g, 't').replace(/ｕ/g, 'u').replace(/ｖ/g, 'v').replace(/ｗ/g, 'w').replace(/ｘ/g, 'x').replace(/ｙ/g, 'y').replace(/ｚ/g, 'z');
        }
    }

    /**
     * Base64エンコード・デコード
     */
    const base64endec = {
        encode: (plain) => {
            return btoa(unescape(encodeURIComponent(plain)));
        },
        decode: (encoded) => {
            return decodeURIComponent(escape(atob(encoded)));
        },
        triggerEncode: () => {
            const plain = $("#base64-plain").value;
            const encoded = base64endec.encode(plain);
            $("#base64-encoded").value = encoded;
        },
        triggerDecode: () => {
            const encoded = $("#base64-encoded").value;
            const plain = base64endec.decode(encoded);
            $("#base64-plain").value = plain;
        },
        startWatching: () => {
            $("#base64-plain").addEventListener("keyup", base64endec.triggerEncode);
            $("#base64-encoded").addEventListener("keyup", base64endec.triggerDecode);
        }
    };
    base64endec.startWatching();

    /**
     * EasyTimer
     */
    const easyTimer = {
        startStopButton: $("#et-toggle-button"),
        combinedTimeInput: $("#et-combined"),
        isAlertNeeded: $("#et-alert"),
        result: $("#et-result"),
        intervalId: null,
        remainingSecondsInProgress: 0,

        start: () => {
            easyTimer.remainingSecondsInProgress = easyTimer.getSecondsByCombinedInput(easyTimer.combinedTimeInput.value);
            easyTimer.intervalId = setInterval(easyTimer.countDown, 1000);
            window.onbeforeunload = function () {
                return "EasyTimer count in progress.";
            };
            easyTimer.startStopButton.value = "Stop";
            easyTimer.combinedTimeInput.className = "et-input live";
        },

        stop: () => {
            easyTimer.remainingSecondsInProgress = 0;
            clearInterval(easyTimer.intervalId);
            easyTimer.intervalId = null;
            window.onbeforeunload = null;
            easyTimer.startStopButton.value = 'Start';
            easyTimer.combinedTimeInput.className = 'et-input';
        },

        toggle: () => {
            if (easyTimer.intervalId) {
                easyTimer.stop();
            } else {
                easyTimer.start();
            }
        },

        getSecondsByCombinedInput: (inputText) => {
            const timeFragments = util.zen2han(inputText).split(/[:\.]/);
            const format = (fragment) => {
                const parsed = parseInt(fragment, 10);
                return isNaN(parsed) ? 0 : parsed;
            };

            if (timeFragments.length <= 1) {
                return format(timeFragments[0]) * 60;
            } else if (timeFragments.length === 2) {
                return format(timeFragments[0]) * 60 + format(timeFragments[1]);
            } else if (timeFragments.length >= 3) {
                return format(timeFragments[0]) * 3600 + format(timeFragments[1]) * 60 + format(timeFragments[2]);
            }
        },

        countDown: () => {
            easyTimer.remainingSecondsInProgress--;
            easyTimer.updateTimerDisplay();

            if (easyTimer.remainingSecondsInProgress <= 0) {
                easyTimer.stop();
                easyTimer.combinedTimeInput.className = 'et-input timeout';
                easyTimer.result.className += ' show';
                if (easyTimer.isAlertNeeded.checked) {
                    alert('Timed out.');
                }
            } else if (easyTimer.remainingSecondsInProgress <= 60) {
                easyTimer.combinedTimeInput.className = 'et-input live instant';
            } else if (easyTimer.remainingSecondsInProgress <= 300) {
                easyTimer.combinedTimeInput.className = 'et-input live soon';
            } else {
                easyTimer.result.className = "et-result";
            }
        },

        updateTimerDisplay: () => {
            const remainingTimeSecond = Math.max(easyTimer.remainingSecondsInProgress, 0)
            let res = parseInt(remainingTimeSecond, 10);
            const hours = parseInt(res / 3600, 10) + '';
            res = res % 3600;
            const minutes = parseInt(res / 60, 10) + '';
            res = res % 60;
            const seconds = parseInt(res, 10) + '';
            easyTimer.combinedTimeInput.value = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        },

        bindEvents: () => {
            easyTimer.startStopButton.addEventListener('click', easyTimer.toggle);
            easyTimer.combinedTimeInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    easyTimer.toggle();
                } else if (e.key === "Escape") {
                    easyTimer.stop(false);
                }
            });
        },
    };
    easyTimer.bindEvents();

}
main();

