const _ = (selector) => {
    return document.querySelector(selector);
};

const main = () => {
    const util = {
    }

    /**
     * Base64エンコード・デコード
     */
    const base64EnDec = {
        encode: (plain) => {
            return btoa(unescape(encodeURIComponent(plain)));
        },
        decode: (encoded) => {
            return decodeURIComponent(escape(atob(encoded)));
        },
        triggerEncode: () => {
            const plain = _("#base64-plain").value;
            _("#base64-encoded").value = base64EnDec.encode(plain);
        },
        triggerDecode: () => {
            const encoded = _("#base64-encoded").value;
            _("#base64-plain").value = base64EnDec.decode(encoded);
        },
        startWatching: () => {
            _("#base64-plain").addEventListener("keyup", base64EnDec.triggerEncode);
            _("#base64-encoded").addEventListener("keyup", base64EnDec.triggerDecode);
        }
    };
    base64EnDec.startWatching();

    /**
     * Blogger用スタイル修正
     */
    const bloggerStyling = {
        imageSizeToEnlarge: 720,
        update: () => {
            const $textarea = $('#blogger-article-html');
            const originalArticle = $textarea.val();
            // トップレベルに直接書かれたimgなどが不正なhtmlとして除去されるのを防ぐため、divに流し込む
            let $article = $(`<div id="jquery-wrapper">${originalArticle}</div>`);

            $article = bloggerStyling.enlargeImage($article);
            $article = bloggerStyling.removeSpaceAroundImage($article);

            $textarea.val($article.html());
        },

        enlargeImage: ($article) => {
            const imageSizeToEnlarge = bloggerStyling.imageSizeToEnlarge;
            $article.find('img').each((_, img) => {
                const $img = $(img);
                const src = $img.attr('src');

                // 初回実行時は640、再実行時は720で渡される
                const dominantOrientation = ($img.attr('width') === '640' || $img.attr('width') === '720')
                    ? 'width'
                    : ($img.attr('height') === '640' || $img.attr('height') === '720')
                        ? 'height'
                        : null;

                if (dominantOrientation !== null) {
                    $img.removeAttr(dominantOrientation === 'width' ? 'height' : 'width');
                    $img.attr(dominantOrientation, imageSizeToEnlarge);
                    const newSizeIndicator = dominantOrientation === 'width' ? '=w' : '=h';
                    const enlargedSrc = src.replace(/=w.+$/, `${newSizeIndicator}${imageSizeToEnlarge}`)
                    console.log(enlargedSrc.substring(230))

                    $img.attr('src', enlargedSrc);
                }
            });
            return $article;
        },

        removeSpaceAroundImage: ($article) => {
            $article.find('img').parent('a').each((_, anchor) => {
                $(anchor).css({
                    marginLeft: 0,
                    marginRight: 0,
                });
            });
            return $article;
        },

        bindEvents: () => {
            $('#blogger-styling-button').bind('click', bloggerStyling.update);
        },
    };
    bloggerStyling.bindEvents();

    /**
     * Kemonoから画像DL用URLを抽出
     */
    const kemonoImageUrlExtractor = {
        update: () => {
            const $textarea = $('#kemono-article-html');
            const originalArticle = $textarea.val();
            // トップレベルに直接書かれたimgなどが不正なhtmlとして除去されるのを防ぐため、divに流し込む
            let $html = $(`<div id="jquery-wrapper">${originalArticle}</div>`);

            urls = kemonoImageUrlExtractor.extractUrls($html);
            urls = kemonoImageUrlExtractor.setDownloadFileNames(urls);

            $textarea.val(urls.join("\n"));
        },

        /**
         * HTMLから画像URLの配列を抽出する
         * @param $html
         * @returns {String[]}
         */
        extractUrls: ($html) => {
            const $links = $html.find('a.image-link');
            let result = [];
            $links.each((_, link) => {
                result.push(link.getAttribute('href'));
            })

            return result;
        },

        /**
         * 新しいファイル名を設定する
         * @param urls String[]
         * @returns {String[]}
         */
        setDownloadFileNames: (urls) => {
            return urls.map((rawUrl, i) => {
                const url = URL.parse(rawUrl);

                // 元ファイル名の末尾から拡張子を取り出し
                let extension = '';
                if (url.search.endsWith('.jpeg') || url.search.endsWith('.jpg')) {
                    extension = 'jpg'
                } else {
                    extension = url.search.replace(/.+\.([A-Za-z]+)$/, '$1');
                }

                // 連番化
                const fileIndex = ('' + i).padStart(3, '0')
                const filename = `${fileIndex}.${extension}`;
                return url.origin + url.pathname + '?f=' + filename;
            })
        },

        bindEvents: () => {
            $('#kemono-styling-button').bind('click', kemonoImageUrlExtractor.update);
        },
    };
    kemonoImageUrlExtractor.bindEvents();

    /**
     * 突然の死
     */
    const suddenDeath = {
        suddenDeath: () => {
            const input = _('#sudden-death-input').value;
            const len = Math.floor(suddenDeath.calculateLengthByte(input) / 2);

            const lines = [
                `＿${"人".repeat(len + 2)}＿`,
                `＞　${input}　＜`,
                `￣^${"Y^".repeat(len)}￣`,
            ];

            _('#sudden-death-result').value = lines.join("\n");
        },

        calculateLengthByte: (str) => {
            let result = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                // 1文字ずつ移動して文字列幅を計算する
                // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
                // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
                if ( (char >= 0x0 && char < 0x81) || (char == 0xf8f0) || (char >= 0xff61 && char < 0xffa0) || (char >= 0xf8f1 && char < 0xf8f4)) {
                    result += 1;
                } else {
                    result += 2;
                }
            }
            return result;
        },

        bindEvents : () => {
            _('#sudden-death-start').addEventListener('click', suddenDeath.suddenDeath);
        }
    };
    suddenDeath.bindEvents();
}
main();
