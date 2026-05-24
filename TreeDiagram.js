(() => {
    /**
     * データの構造化
     * @param text
     * @returns {*[]}
     */
    const parseToTree = (text) => {
        const lines = text.trim().split("\n");
        const roots = [];

        // 各レベルの最新のノードを記憶しておくための配列（1ベースのインデックス）
        // 例: currentNodes[1] には現在処理中のレベル1のノードが入る
        const currentNodes = [];

        for (const line of lines) {
            if (!line.trim()) continue;

            const [levelStr, name] = line.split(",");
            const level = parseInt(levelStr, 10);

            // 新しいノードのオブジェクトを作成
            const node = {name, children: []};
            currentNodes[level] = node;

            if (level === 1) {
                // ルートノード（階層1）ならルート配列に追加
                roots.push(node);
            } else {
                // 親ノードは、1つ上のレベルの最新ノード
                const parentNode = currentNodes[level - 1];
                if (parentNode) {
                    parentNode.children.push(node);
                }
            }
        }

        return roots;
    }


    /**
     * ツリーの文字列生成
     * @param nodes
     * @param prefix
     * @returns {*[]}
     */
    const generateTree = (nodes, prefix = "") => {
        let result = [];

        nodes.forEach((node, index) => {
            const isLast = index === nodes.length - 1;

            if (prefix === "") {
                // 1. ルートノード（最上位）の場合の処理
                result.push(`　 ${node.name}`);

                const nextPrefix = isLast ? n : d;
                // 子階層の文字列を再帰的に取得して結合
                result.push(...generateTree(node.children, nextPrefix));

            } else {
                // 2. レベル2以降の子ノードの場合の処理
                const marker = isLast ? r : dr;
                result.push(`${prefix}${marker} ${node.name}`);

                const nextPrefix = prefix + (isLast ? n : d);
                // 子階層の文字列を再帰的に取得して結合
                result.push(...generateTree(node.children, nextPrefix));
            }
        });

        return result;
    }

    /**
     * 出力結果としてきれいに整える
     * @param treeArray
     * @returns {*}
     */
    const organizeOutput = (treeArray) => {
        treeArray = treeArray.map((node) => {
            return node.substring(1);
        })
        return treeArray.join("\n")
    }

    /**
     * 再計算・更新
     */
    const update = () => {
        if ($bold.prop('checked')) {
            n = '　　'
            d = '┃　'
            r = '┗━'
            dr = '┣━'
        } else {
            n = '　　'
            d = '│　'
            r = '└─'
            dr = '├─'
        }

        const treeData = parseToTree($input.val());
        const treeArray = generateTree(treeData);
        const outputString = organizeOutput(treeArray);
        $output.val(outputString);
    }

    // 実行まわり
    let n, d, r, dr;
    const $input = $('#tree-definition');
    const $output = $('#tree-result');
    const $bold = $('#diagram-bold');

    update();
    $input[0].addEventListener('keyup', update);
    $bold[0].addEventListener('change', update);
})();
