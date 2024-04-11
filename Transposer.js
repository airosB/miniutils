class Transposer {
    constructor() {
        this.elmInterval = document.getElementById('tr_interval');
        this.interval = parseFloat(this.elmInterval.innerHTML);
        this.transIn = document.getElementById('codes1');
        this.transOut = document.getElementById('codes2');
        this.direction = document.getElementsByName("sharpflat");
    }

    // Interval increment and decrement
    transInc() {
        this.interval++;
        this.elmInterval.innerHTML = this.interval;
        this.transpose();
    }

    transDec() {
        this.interval--;
        this.elmInterval.innerHTML = this.interval;
        this.transpose();
    }

    // Main transpose function
    transpose() {
        let transEdit = this.transIn.value;
        transEdit = this.transposeDrv(transEdit, this.interval, this.direction);
        this.transOut.value = transEdit;
    }

    // Detailed transpose driver
    transposeDrv(transEdit, interval, direction) {

        //元のコードにある数字を全角に変換して避難
        transEdit = transEdit.
        replace(/1/g,'１').replace(/2/g,'２').replace(/3/g,'３').replace(/4/g,'４').replace(/5/g,'５').
        replace(/6/g,'６').replace(/7/g,'７').replace(/8/g,'８').replace(/9/g,'９').replace(/0/g,'０').
        replace(/N\.C\./g,'ＮＣ').replace(/N\/C/g,'Ｎ／Ｃ');

        //ルートとベース音をすべて000-011の数字に変換。000=012がA。
        transEdit = transEdit.
        replace(/A##/g,'002').replace(/B##/g,'004').replace(/C##/g,'005').replace(/D##/g,'007').replace(/E##/g,'009').replace(/F##/g,'010').replace(/G##/g,'012').
        replace(/Ax/g,'002').replace(/Bx/g,'004').replace(/Cx/g,'005').replace(/Dx/g,'007').replace(/Ex/g,'009').replace(/Fx/g,'010').replace(/Gx/g,'012').
        replace(/Abb/g,'010').replace(/Bbb/g,'000').replace(/Cbb/g,'001').replace(/Dbb/g,'003').replace(/Ebb/g,'005').replace(/Fbb/g,'006').replace(/Gbb/g,'008');

        transEdit = transEdit.
        replace(/A#/g,'001').replace(/B#/g,'003').replace(/C#/g,'004').replace(/D#/g,'006').replace(/E#/g,'008').replace(/F#/g,'009').replace(/G#/g,'011').
        replace(/Ab/g,'011').replace(/Bb/g,'001').replace(/Cb/g,'002').replace(/Db/g,'004').replace(/Eb/g,'006').replace(/Fb/g,'007').replace(/Gb/g,'009');

        transEdit = transEdit.
        replace(/A/g,'000').replace(/B/g,'002').replace(/C/g,'003').replace(/D/g,'005').replace(/E/g,'007').replace(/F/g,'008').replace(/G/g,'010');

        //転調幅から転調先の音を計算
        //replaceの済んだ数字を次のreplaceで変換しないよう、わざわざ3桁で計算してる。数十音のシフトにまで対応
        //マイナス数オクターブ分の転調幅にも対応できるよう、10オクターブ120音分のオフセットをつけてmod12計算。
        //※replaceの済んだ数字は先頭にゼロがない、ふつうのint。
        transEdit = transEdit.
        replace(/000/g, (interval+120)%12).replace(/001/g, (interval+121)%12).replace(/002/g, (interval+122)%12).replace(/003/g, (interval+123)%12).
        replace(/004/g, (interval+124)%12).replace(/005/g, (interval+125)%12).replace(/006/g, (interval+126)%12).replace(/007/g, (interval+127)%12).
        replace(/008/g, (interval+128)%12).replace(/009/g, (interval+129)%12).replace(/010/g, (interval+130)%12).replace(/011/g, (interval+131)%12);

        //数字を音に変換
        //条件の厳しい2桁の数字から変換する
        if(direction[0].checked) {
            transEdit = transEdit.
            replace(/11/g, 'Ab').replace(/10/g, 'Abb').replace(/9/g, 'Gb').replace(/8/g, 'Gbb').replace(/7/g, 'Fb').replace(/6/g, 'Eb').
            replace(/5/g, 'Ebb').replace(/4/g, 'Db').replace(/3/g, 'Dbb').replace(/2/g, 'Cb').replace(/1/g, 'Bb').replace(/0/g, 'Bbb');
        }
        if(direction[1].checked) {
            transEdit = transEdit.
            replace(/11/g, 'Ab').replace(/10/g, 'G').replace(/9/g, 'Gb').replace(/8/g, 'F').replace(/7/g, 'E').replace(/6/g, 'Eb').
            replace(/5/g, 'D').replace(/4/g, 'Db').replace(/3/g, 'C').replace(/2/g, 'B').replace(/1/g, 'Bb').replace(/0/g, 'A');
        }
        if(direction[2].checked) {
            transEdit = transEdit.
            replace(/11/g, 'G#').replace(/10/g, 'G').replace(/9/g, 'F#').replace(/8/g, 'F').replace(/7/g, 'E').replace(/6/g, 'D#').
            replace(/5/g, 'D').replace(/4/g, 'C#').replace(/3/g, 'C').replace(/2/g, 'B').replace(/1/g, 'A#').replace(/0/g, 'A');
        }
        if(direction[3].checked) {
            transEdit = transEdit.
            replace(/11/g, 'G#').replace(/10/g, 'Fx').replace(/9/g, 'F#').replace(/8/g, 'E#').replace(/7/g, 'Dx').replace(/6/g, 'D#').
            replace(/5/g, 'Cx').replace(/4/g, 'C#').replace(/3/g, 'B#').replace(/2/g, 'Ax').replace(/1/g, 'A#').replace(/0/g, 'Gx');
        }

        //全角に避難させた数字を全部戻す
        transEdit = transEdit.
        replace(/１/g,'1').replace(/２/g,'2').replace(/３/g,'3').replace(/４/g,'4').replace(/５/g,'5').
        replace(/６/g,'6').replace(/７/g,'7').replace(/８/g,'8').replace(/９/g,'9').replace(/０/g,'0').
        replace(/Ｎ／Ｃ/g,'N/C').replace(/ＮＣ/g,'N.C.');


        //小節先頭のスペースを除去
        transEdit = transEdit.replace(/\t /g,'\t').replace(/^ /g,'').replace(/\n /g,'\n')

        return transEdit
    }

    initialize() {
        document.getElementById('tr_interval_inc').addEventListener('click', () => transposer.transInc());
        document.getElementById('tr_interval_dec').addEventListener('click', () => transposer.transDec());
        document.getElementById('codes1').addEventListener('keyup', () => transposer.transpose());
        _('.transposer-modifcations').addEventListener('click', () => transposer.transpose());
    }
}

const transposer = new Transposer();
transposer.initialize();
