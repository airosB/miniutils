// jastyle
var jastyle_version = '0.6.0';
var jastyle_autostyle_namespaces = [ 0 ];




function jastyle(node) {

	var strips = new Array();
	var edit = document.getElementById(node);
	var tmp = edit.value.

		// CRLF
		replace(/\r*\n|\r/g, "\n").

		// 全角英数・記号
		//replace(/＃/g, '#').   replace(/＋/g, '+').   replace(/＜/g, '&lt;').  replace(/＞/g, '&gt;').
		replace(/＄/g, '$').
		replace(/％/g, '%').replace(/＆/g, '&').
		replace(/－/g, '-').replace(/＾/g, '^').
		replace(/＠/g, '@').
		replace(/＊/g, '*').replace(/／/g, ' / ').
		replace(/＿/g, '_').
		replace(/１/g,'1').replace(/２/g,'2').replace(/３/g,'3').replace(/４/g,'4').
		replace(/５/g,'5').replace(/６/g,'6').replace(/７/g,'7').replace(/８/g,'8').
		replace(/９/g,'9').replace(/０/g,'0').replace(/Ａ/g,'A').replace(/Ｂ/g,'B').
		replace(/Ｃ/g,'C').replace(/Ｄ/g,'D').replace(/Ｅ/g,'E').replace(/Ｆ/g,'F').
		replace(/Ｇ/g,'G').replace(/Ｈ/g,'H').replace(/Ｉ/g,'I').replace(/Ｊ/g,'J').
		replace(/Ｋ/g,'K').replace(/Ｌ/g,'L').replace(/Ｍ/g,'M').replace(/Ｎ/g,'N').
		replace(/Ｏ/g,'O').replace(/Ｐ/g,'P').replace(/Ｑ/g,'Q').replace(/Ｒ/g,'R').
		replace(/Ｓ/g,'S').replace(/Ｔ/g,'T').replace(/Ｕ/g,'U').replace(/Ｖ/g,'V').
		replace(/Ｗ/g,'W').replace(/Ｘ/g,'X').replace(/Ｙ/g,'Y').replace(/Ｚ/g,'Z').
		replace(/ａ/g,'a').replace(/ｂ/g,'b').replace(/ｃ/g,'c').replace(/ｄ/g,'d').
		replace(/ｅ/g,'e').replace(/ｆ/g,'f').replace(/ｇ/g,'g').replace(/ｈ/g,'h').
		replace(/ｉ/g,'i').replace(/ｊ/g,'j').replace(/ｋ/g,'k').replace(/ｌ/g,'l').
		replace(/ｍ/g,'m').replace(/ｎ/g,'n').replace(/ｏ/g,'o').replace(/ｐ/g,'p').
		replace(/ｑ/g,'q').replace(/ｒ/g,'r').replace(/ｓ/g,'s').replace(/ｔ/g,'t').
		replace(/ｕ/g,'u').replace(/ｖ/g,'v').replace(/ｗ/g,'w').replace(/ｘ/g,'x').
		replace(/ｙ/g,'y').replace(/ｚ/g,'z').

		// 救済
		replace(/([A-Za-z0-9])．[　\s]*/g, '$1. ').
		replace(/([A-Za-z0-9])，[　\s]*/g, '$1, ').

		// 句読点・半角カナ
		replace(/[，､]/g, '、').replace(/[．｡]/g, '。').
		replace(/ｶﾞ/g, 'ガ').replace(/ｷﾞ/g, 'ギ').replace(/ｸﾞ/g, 'グ').
		replace(/ｹﾞ/g, 'ゲ').replace(/ｺﾞ/g, 'ゴ').replace(/ｻﾞ/g, 'ザ').
		replace(/ｼﾞ/g, 'ジ').replace(/ｽﾞ/g, 'ズ').replace(/ｾﾞ/g, 'ゼ').
		replace(/ｿﾞ/g, 'ゾ').replace(/ﾀﾞ/g, 'ダ').replace(/ﾁﾞ/g, 'ヂ').
		replace(/ﾂﾞ/g, 'ヅ').replace(/ﾃﾞ/g, 'デ').replace(/ﾄﾞ/g, 'ド').
		replace(/ﾊﾞ/g, 'バ').replace(/ﾋﾞ/g, 'ビ').replace(/ﾌﾞ/g, 'ブ').
		replace(/ﾍﾞ/g, 'ベ').replace(/ﾎﾞ/g, 'ボ').replace(/ﾊﾟ/g, 'パ').
		replace(/ﾋﾟ/g, 'ピ').replace(/ﾌﾟ/g, 'プ').replace(/ﾍﾟ/g, 'ペ').
		replace(/ﾎﾟ/g, 'ポ').replace(/ｳﾞ/g, 'ヴ').
		replace(/ｧ/g, 'ァ').replace(/ｨ/g, 'ィ').replace(/ｩ/g, 'ゥ').
		replace(/ｪ/g, 'ェ').replace(/ｫ/g, 'ォ').replace(/ｯ/g, 'ッ').
		replace(/ｬ/g, 'ャ').replace(/ｭ/g, 'ュ').replace(/ｮ/g, 'ョ').
		replace(/ｱ/g, 'ア').replace(/ｲ/g, 'イ').replace(/ｳ/g, 'ウ').
		replace(/ｴ/g, 'エ').replace(/ｵ/g, 'オ').replace(/ｶ/g, 'カ').
		replace(/ｷ/g, 'キ').replace(/ｸ/g, 'ク').replace(/ｹ/g, 'ケ').
		replace(/ｺ/g, 'コ').replace(/ｻ/g, 'サ').replace(/ｼ/g, 'シ').
		replace(/ｽ/g, 'ス').replace(/ｾ/g, 'セ').replace(/ｿ/g, 'ソ').
		replace(/ﾀ/g, 'タ').replace(/ﾁ/g, 'チ').replace(/ﾂ/g, 'ツ').
		replace(/ﾃ/g, 'テ').replace(/ﾄ/g, 'ト').replace(/ﾅ/g, 'ナ').
		replace(/ﾆ/g, 'ニ').replace(/ﾇ/g, 'ヌ').replace(/ﾈ/g, 'ネ').
		replace(/ﾉ/g, 'ノ').replace(/ﾊ/g, 'ハ').replace(/ﾋ/g, 'ヒ').
		replace(/ﾌ/g, 'フ').replace(/ﾍ/g, 'ヘ').replace(/ﾎ/g, 'ホ').
		replace(/ﾏ/g, 'マ').replace(/ﾐ/g, 'ミ').replace(/ﾑ/g, 'ム').
		replace(/ﾒ/g, 'メ').replace(/ﾓ/g, 'モ').replace(/ﾔ/g, 'ヤ').
		replace(/ﾕ/g, 'ユ').replace(/ﾖ/g, 'ヨ').replace(/ﾗ/g, 'ラ').
		replace(/ﾘ/g, 'リ').replace(/ﾙ/g, 'ル').replace(/ﾚ/g, 'レ').
		replace(/ﾛ/g, 'ロ').replace(/ﾜ/g, 'ワ').replace(/ｦ/g, 'ヲ').
		replace(/ﾝ/g, 'ン').replace(/ｰ/g, 'ー').
		replace(/｢/g, '「').replace(/｣/g, '」').replace(/･/g, '・').
		replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜').

		// 機種依存記号
		//replace(/〝/g, '「').replace(/〟/g, '」').
		replace(/⓪/g, '(0)').replace(/[①⑴]/g, '(1)').replace(/[②⑵]/g, '(2)').replace(/[③⑶]/g, '(3)').replace(/[④⑷]/g, '(4)').
		replace(/[⑤⑸]/g, '(5)').replace(/[⑥⑹]/g, '(6)').replace(/[⑦⑺]/g, '(7)').replace(/[⑧⑻]/g, '(8)').
		replace(/[⑨⑼]/g, '(9)').replace(/[⑩⑽]/g, '(10)').replace(/[⑪⑾]/g, '(11)').replace(/[⑫⑿]/g, '(12)').
		replace(/[⑬⒀]/g, '(13)').replace(/[⑭⒁]/g, '(14)').replace(/[⑮⒂]/g, '(15)').replace(/[⑯⒃]/g, '(16)').
		replace(/[⑰⒄]/g, '(17)').replace(/[⑱⒅]/g, '(18)').replace(/[⑲⒆]/g, '(19)').replace(/[⑳⒇]/g, '(20)').

		replace(/⒈/g, '1.').replace(/⒉/g, '2.').replace(/⒊/g, '3.').replace(/⒋/g, '4.').
		replace(/⒌/g, '5.').replace(/⒍/g, '6.').replace(/⒎/g, '7.').replace(/⒏/g, '8.').
		replace(/⒐/g, '9.').replace(/⒑/g, '10.').replace(/⒒/g, '11.').replace(/⒓/g, '12.').
		replace(/⒔/g, '13.').replace(/⒕/g, '14.').replace(/⒖/g, '15.').replace(/⒗/g, '16.').
		replace(/⒘/g, '17.').replace(/⒙/g, '18.').replace(/⒚/g, '19.').replace(/⒛/g, '20.').

		replace(/[ⓐ⒜]/g, '(a)').replace(/[ⓑ⒝]/g, '(b)').replace(/[ⓒ⒞]/g, '(c)').replace(/[ⓓ⒟]/g, '(d)').
		replace(/[ⓔ⒠]/g, '(e)').replace(/[ⓕ⒡]/g, '(f)').replace(/[ⓖ⒢]/g, '(g)').replace(/[ⓗ⒣]/g, '(h)').
		replace(/[ⓘ⒤]/g, '(i)').replace(/[ⓙ⒥]/g, '(j)').replace(/[ⓚ⒦]/g, '(k)').replace(/[ⓛ⒧]/g, '(l)').
		replace(/[ⓜ⒨]/g, '(m)').replace(/[ⓝ⒩]/g, '(n)').replace(/[ⓞ⒪]/g, '(o)').replace(/[ⓟ⒫]/g, '(p)').
		replace(/[ⓠ⒬]/g, '(q)').replace(/[ⓡ⒭]/g, '(r)').replace(/[ⓢ⒮]/g, '(s)').replace(/[ⓣ⒯]/g, '(t)').
		replace(/[ⓤ⒰]/g, '(u)').replace(/[ⓥ⒱]/g, '(v)').replace(/[ⓦ⒲]/g, '(w)').replace(/[ⓧ⒳]/g, '(x)').
		replace(/[ⓨ⒴]/g, '(y)').replace(/[ⓩ⒵]/g, '(z)').

		replace(/Ⓐ/g, '(A)').replace(/Ⓑ/g, '(B)').replace(/Ⓒ/g, '(C)').replace(/Ⓓ/g, '(D)').
		replace(/Ⓔ/g, '(E)').replace(/Ⓕ/g, '(F)').replace(/Ⓖ/g, '(G)').replace(/Ⓗ/g, '(H)').
		replace(/Ⓘ/g, '(I)').replace(/Ⓙ/g, '(J)').replace(/Ⓚ/g, '(K)').replace(/Ⓛ/g, '(L)').
		replace(/Ⓜ/g, '(M)').replace(/Ⓝ/g, '(N)').replace(/Ⓞ/g, '(O)').replace(/Ⓟ/g, '(P)').
		replace(/Ⓠ/g, '(Q)').replace(/Ⓡ/g, '(R)').replace(/Ⓢ/g, '(S)').replace(/Ⓣ/g, '(T)').
		replace(/Ⓤ/g, '(U)').replace(/Ⓥ/g, '(V)').replace(/Ⓦ/g, '(W)').replace(/Ⓧ/g, '(X)').
		replace(/Ⓨ/g, '(Y)').replace(/Ⓩ/g, '(Z)').

		replace(/Ⅰ/g, 'I').replace(/Ⅱ/g, 'II').replace(/Ⅲ/g, 'III').replace(/Ⅳ/g, 'IV').
		replace(/Ⅴ/g, 'V').replace(/Ⅵ/g, 'VI').replace(/Ⅶ/g, 'VII').replace(/Ⅷ/g, 'VIII').
		replace(/Ⅸ/g, 'IX').replace(/Ⅹ/g, 'X').replace(/Ⅺ/g, 'XI').replace(/Ⅻ/g, 'XII').
		replace(/Ⅼ/g, 'L').replace(/Ⅽ/g, 'C').replace(/Ⅾ/g, 'D').replace(/Ⅿ/g, 'M').

		replace(/ⅰ/g, 'i').replace(/ⅱ/g, 'ii').replace(/ⅲ/g, 'iii').replace(/ⅳ/g, 'iv').
		replace(/ⅴ/g, 'v').replace(/ⅵ/g, 'vi').replace(/ⅶ/g, 'vii').replace(/ⅷ/g, 'viii').
		replace(/ⅸ/g, 'ix').replace(/ⅹ/g, 'x').replace(/ⅺ/g, 'xi').replace(/ⅻ/g, 'xii').
		replace(/ⅼ/g, 'l').replace(/ⅽ/g, 'c').replace(/ⅾ/g, 'd').replace(/ⅿ/g, 'm').

		replace(/㌀/g, 'アパート').replace(/㌁/g, 'アルファ').replace(/㌂/g, 'アンペア').
		replace(/㌃/g, 'アール').replace(/㌄/g, 'イニング').replace(/㌅/g, 'インチ').
		replace(/㌆/g, 'ウォン').replace(/㌇/g, 'エスクード').replace(/㌈/g, 'エーカー').
		replace(/㌉/g, 'オンス').replace(/㌊/g, 'オーム').replace(/㌋/g, 'カイリ').
		replace(/㌌/g, 'カラット').replace(/㌍/g, 'カロリー').replace(/㌎/g, 'ガロン').
		replace(/㌏/g, 'ガンマ').replace(/㌔/g, 'キロ').replace(/㌐/g, 'ギガ').
		replace(/㌑/g, 'ギニー').replace(/㌒/g, 'キュリー').replace(/㌓/g, 'ギルダー').
		replace(/㌕/g, 'キログラム').replace(/㌖/g, 'キロメートル').replace(/㌗/g, 'キロワット').
		replace(/㌘/g, 'グラム').replace(/㌙/g, 'グラムトン').replace(/㌚/g, 'クルゼイロ').
		replace(/㌛/g, 'クローネ').replace(/㌜/g, 'ケース').replace(/㌝/g, 'コルナ').
		replace(/㌞/g, 'コーポ').replace(/㌟/g, 'サイクル').replace(/㌠/g, 'サンチーム').
		replace(/㌡/g, 'シリング').replace(/㌢/g, 'センチ').replace(/㌣/g, 'セント').
		replace(/㌤/g, 'ダース').replace(/㌥/g, 'デシ').replace(/㌧/g, 'トン').
		replace(/㌦/g, 'ドル').replace(/㌨/g, 'ナノ').replace(/㌩/g, 'ノット').
		replace(/㌪/g, 'ハイツ').replace(/㌫/g, 'パーセント').replace(/㌬/g, 'バーツ').
		replace(/㌭/g, 'バーレル').replace(/㌮/g, 'ピアストル').replace(/㌯/g, 'ピクル').
		replace(/㌰/g, 'ピコ').replace(/㌱/g, 'ビル').replace(/㌲/g, 'ファラッド').
		replace(/㌳/g, 'フィート').replace(/㌴/g, 'ブッシェル').replace(/㌵/g, 'フラン').
		replace(/㌶/g, 'ヘクタール').replace(/㌷/g, 'ペソ').replace(/㌸/g, 'ペニヒ').
		replace(/㌺/g, 'ペンス').replace(/㌻/g, 'ページ').replace(/㌼/g, 'ベータ').
		replace(/㌽/g, 'ポイント').replace(/㌾/g, 'ボルト').replace(/㌿/g, 'ホン').
		replace(/㍀/g, 'ポンド').replace(/㍁/g, 'ホール').replace(/㍂/g, 'ホーン').
		replace(/㍃/g, 'マイクロ').replace(/㍄/g, 'マイル').replace(/㍅/g, 'マッハ').
		replace(/㍆/g, 'マルク').replace(/㍇/g, 'マンション').replace(/㍈/g, 'ミクロン').
		replace(/㍉/g, 'ミリ').replace(/㍊/g, 'ミリバール').replace(/㍍/g, 'メートル').
		replace(/㍋/g, 'メガ').replace(/㍌/g, 'メガトン').replace(/㍎/g, 'ヤード').
		replace(/㍏/g, 'ヤール').replace(/㍐/g, 'ユアン').replace(/㍒/g, 'リラ').
		replace(/㍑/g, 'リットル').replace(/㍓/g, 'ルピー').replace(/㍔/g, 'ルーブル').
		replace(/㍕/g, 'レム').replace(/㍖/g, 'レントゲン').replace(/㍗/g, 'ワット').

		replace(/㍱/g, 'hPa').replace(/㍲/g, 'da').replace(/㍳/g, 'AU').replace(/㍴/g, 'bar').
		replace(/㍵/g, 'oV').replace(/㍶/g, 'pC').replace(/㎀/g, 'pA').replace(/㎁/g, 'nA').
		replace(/㎂/g, 'uA').replace(/㎃/g, 'mA').replace(/㎄/g, 'kA').replace(/㎅/g, 'KB').
		replace(/㎆/g, 'MB').replace(/㎇/g, 'GB').replace(/㎈/g, 'cal').replace(/㎉/g, 'kcal').
		replace(/㎊/g, 'pf').replace(/㎋/g, 'nF').replace(/㎌/g, 'μF').replace(/㎍/g, 'μg').
		replace(/㎎/g, 'mg').replace(/㎏/g, 'kg').replace(/㎐/g, 'Hz').replace(/㎑/g, 'kHz').
		replace(/㎒/g, 'MHz').replace(/㎓/g, 'GHz').replace(/㎔/g, 'THz').replace(/㎕/g, 'μl').
		replace(/㎖/g, 'Ml').replace(/㎗/g, 'dl').replace(/㎘/g, 'kl').replace(/㎙/g, 'fm').
		replace(/㎚/g, 'nm').replace(/㎛/g, 'μm').replace(/㎜/g, 'mm').replace(/㎝/g, 'cm').
		replace(/㎞/g, 'km').replace(/㎟/g, 'mm&sup2;').replace(/㎠/g, 'cm&sup2;').
		replace(/㎡/g, 'm&sup2;').replace(/㎢/g, 'km&sup2;').replace(/㎣/g, 'mm&sup3;').
		replace(/㎤/g, 'cm&sup3;').replace(/㎥/g, 'm&sup3;').replace(/㎦/g, 'km&sup3;').
		replace(/㎧/g, 'm/s').replace(/㎨/g, 'm/s&sup2;').replace(/㎩/g, 'Pa/g').replace(/㎪/g, 'kPa').
		replace(/㎫/g, 'MPa').replace(/㎬/g, 'GPa').replace(/㎭/g, 'rad').replace(/㎮/g, 'rad/s').
		replace(/㎯/g, 'rad/s&sup2;').replace(/㎰/g, 'ps').replace(/㎱/g, 'ns').replace(/㎲/g, 'μs').
		replace(/㎳/g, 'ms').replace(/㎴/g, 'pV').replace(/㎵/g, 'nV').replace(/㎶/g, 'μV').
		replace(/㎷/g, 'mV').replace(/㎸/g, 'kV').replace(/㎹/g, 'MV').replace(/㎺/g, 'pW').
		replace(/㎻/g, 'nW').replace(/㎼/g, 'μW').replace(/㎽/g, 'mW').replace(/㎾/g, 'kW').
		replace(/㎿/g, 'MW').replace(/㏀/g, 'kΩ').replace(/㏁/g, 'mΩ').replace(/㏂/g, 'a.m.').
		replace(/㏃/g, 'Bq').replace(/㏄/g, 'cc').replace(/㏅/g, 'cd').replace(/㏆/g, 'C/kg').
		replace(/㏇/g, 'Co.').replace(/㏈/g, 'dB').replace(/㏉/g, 'Gy').replace(/㏊/g, 'ha').
		replace(/㏋/g, 'HP').replace(/㏌/g, 'in').replace(/㏍/g, 'K.K.').replace(/㏎/g, 'KM').
		replace(/㏏/g, 'kt').replace(/㏐/g, 'lm').replace(/㏑/g, 'ln').replace(/㏒/g, 'log').
		replace(/㏓/g, 'lx').replace(/㏔/g, 'mb').replace(/㏕/g, 'mil').replace(/㏖/g, 'mol').
		replace(/㏗/g, 'pH').replace(/㏘/g, 'p.m.').replace(/㏙/g, 'ppm').replace(/㏚/g, 'PR').
		replace(/㏛/g, 'sr').replace(/㏜/g, 'Sv').replace(/㏝/g, 'Wb');



	var tmp = tmp.
		replace(/[㊀㈠]/g, '（一）').replace(/[㊁㈡]/g, '（二）').replace(/[㊂㈢]/g, '（三）').
		replace(/[㊃㈣]/g, '（四）').replace(/[㊄㈤]/g, '（五）').replace(/[㊅㈥]/g, '（六）').
		replace(/[㊆㈦]/g, '（七）').replace(/[㊇㈧]/g, '（八）').replace(/[㊈㈨]/g, '（九）').
		replace(/[㊉㈩]/g, '（十）').replace(/[㊊㈪]/g, '（月）').replace(/[㊋㈫]/g, '（火）').
		replace(/[㊌㈬]/g, '（水）').replace(/[㊍㈭]/g, '（木）').replace(/[㊎㈮]/g, '（金）').
		replace(/[㊏㈯]/g, '（土）').replace(/[㊐㈰]/g, '（日）').

		replace(/[㈱㊑]/g, '（株）').replace(/[㈲㊒]/g, '（有）').replace(/[㈳㊓]/g, '（社）').
		replace(/[㈴㊔]/g, '（名）').replace(/[㈵㊕]/g, '（特）').replace(/[㈶㊖]/g, '（財）').
		replace(/[㈷㊗]/g, '（祝）').replace(/[㈸㊘]/g, '（労）').replace(/[㈻㊫]/g, '（学）').
		replace(/[㈼㊬]/g, '（監）').replace(/[㈽㊭]/g, '（企）').replace(/[㈾㊮]/g, '（資）').
		replace(/[㈿㊯]/g, '（協）').replace(/[㉁㊡]/g, '（休）').

		replace(/㊤/g, '（上）').replace(/㊥/g, '（中）').replace(/㊦/g, '（下）').replace(/㊧/g, '（左）').
		replace(/㊨/g, '（右）').replace(/㊙/g, '（秘）').replace(/㊚/g, '（男）').replace(/㊛/g, '（女）').
		replace(/㊜/g, '（適）').replace(/㊝/g, '（優）').replace(/㊞/g, '（印）').replace(/㊟/g, '（注）').
		replace(/㊠/g, '（項）').replace(/㊢/g, '（写）').replace(/㊣/g, '（正）').replace(/㊩/g, '（医）').
		replace(/㊪/g, '（宗）').replace(/㊰/g, '（夜）').

		replace(/㈹/g, '（代）').replace(/㈺/g, '（呼）').replace(/㉀/g, '（祭）').
		replace(/㉂/g, '（自）').replace(/㉃/g, '（至）').

		replace(/㋀/g, '1月').replace(/㋁/g, '2月').replace(/㋂/g, '3月').replace(/㋃/g, '4月').
		replace(/㋄/g, '5月').replace(/㋅/g, '6月').replace(/㋆/g, '7月').replace(/㋇/g, '8月').
		replace(/㋈/g, '9月').replace(/㋉/g, '10月').replace(/㋊/g, '11月').replace(/㋋/g, '12月').

		replace(/㍾/g, '明治').replace(/㍽/g, '大正').replace(/㍼/g, '昭和').
		replace(/㍻/g, '平成').replace(/㍿/g, '株式会社').

		replace(/№/g, 'No.').replace(/℡/g, 'Tel').
		replace(/™/g, '<sup>TM</sup>').replace(/℠/g, '<sup>SM</sup>').

		//曖昧回避
		replace(/\[\[DNA\]\]/g, '[[デオキシリボ核酸|DNA]]').
		replace(/\[\[RNA\]\]/g, '[[リボ核酸|RNA]]').
		replace(/\[\[タンパク質\]\]/g, '[[蛋白質|タンパク質]]').
		replace(/\[\[アメリカ\]\]/g, '[[アメリカ合衆国|アメリカ]]').

		// Wiki記法
		replace(/\s*\n-----*\s*/g, "\n----\n\n").
		replace(/\{\{msg:/ig, '{{').
		replace(/\{\{SERVER\}\}\{\{localurl:/ig, '{{fullurl:').
		replace(/(\[\[:?)Category:/ig, '$1Category:');
		if(location.host == 'ja.wikipedia.org') {
			tmp = tmp
				.replace(/\[\[w(:[a-z]{2,3}:)/g, '[[$1')
				.replace(/\[\[w:/ig, '[[:en:');
		}


	// タグ
	tmp = tmp.
		replace(/\s*<\/?br\s*\/?>/ig, '<br />').
		replace(/\s*<\/?hr\s*\/?>\s*/ig, "\n----\n\n").
		replace(/<(center|div|span|font|tr|td|th|table|caption)/ig,
		function(str) { return str.toLowerCase(); }).
		replace(/<\/(center|div|span|font|tr|td|th|table|caption)>/ig,
		function(str) { return str.toLowerCase(); }).
		replace(/(cell(padd|spac)ing|v?align|width|style|border)\s*=\s*/ig,
		function(str, p1) { return p1.toLowerCase() + '='; });

	// strip
	tmp = tmp.replace(/<pre[^>]*?>(.|\n)*?<\/pre>/g,
	function(str) {
		var i = strips.length;
		strips[i] = str;
		return '<!--@@ jastyle-STRIP-' + i + ' @@-->';
	});


	// 行頭認識がいるもの
	var lines = tmp.split('\n');
	var out = '', pre_p = false;

	for(var i = 0; i < lines.length; i++) {

		tmp = lines[i].
		// 行頭の全角空白
		replace(/^　+/g, '').
		// 行頭の * : # ;
		replace(/^([\*\:\#\;\&\!\?\@\%\^]+)[\s　]*/, '$1 ').
		// REDIRECTだけ戻す
		replace(/^# REDIRECT[^\[]*\[\[/i, '#REDIRECT[[');

		// '''で終わる行を ; に置き換え
		//replace(/^\'\'\'(.*?)\'\'\'$/, '; \'\'\'$1\'\'\'').


			if(!tmp.match(/^ /)) {
				// 行末空白除去 (半角空白しかない場合は除去しない for <pre>)
				tmp = tmp.replace(/[\s　]+$/, '');
				pre_p = false;
			} else if(tmp.match(/^[\s　]+$/) && !pre_p) {
				// 孤立した空白のみの行
				tmp = '';
			} else {
				pre_p = true;
			}


			// == ==
			if(tmp.match(/^=.*[^=]=/)) {
				tmp = tmp.
					replace(/^(={1,5})[\s　]*/, '$1 ').
					replace(/[\s　]*(={1,5})$/, ' $1').
					replace(/関連(記事|事項|用語)/g, '関連項目').
					replace(/外部(参照)?((への)?リンク|サイト)|関連リンク/g,'外部リンク');
			}


			// interwiki
			if(tmp.match(/^\[\[([a-z]{2,3}|fiu-vro|pt-br|roa-rup|simple|zh-min-nan):.*?\]\]$/)) {
				tmp = decodeURI(tmp).replace(/&#((x[\dA-Fa-f]+)|\d+);/ig,
					function(str, dec, hex) {
						var ch = hex ? parseInt("0" + hex) : parseInt(dec, 10);
						return String.fromCharCode(ch);
					}).
				replace(/ /g, '_');
			}

		out += tmp + '\n';
	}

	out = out.
		replace(/^\s+/, '').replace(/\s+$/, '').
		// 二行以上の空行トルツメ
		replace(/\n{3,}/g, '\n\n').
		// 見出しの後の空行トルツメ
		replace(/==\n+/g, '==\n').
		// 見出しの前に空行を挿入
		replace(/([^=\n])\n+==/g, '$1\n\n==').
		// 空白
		replace(/[ 　]+/g, ' ');

	// unstrip
	out = out.replace(/<!--@@ jastyle-STRIP-(\d+) @@-->/g,
		function(str, n) { return strips[n]; });

	edit.value = out + "\n";
	return true;
}

