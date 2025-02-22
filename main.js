function gebi(nodeId){
	return document.getElementById(nodeId);
}


function toInt(str){
	str = str.
	replace(/１/g,'1').replace(/２/g,'2').replace(/３/g,'3').replace(/４/g,'4').
	replace(/５/g,'5').replace(/６/g,'6').replace(/７/g,'7').replace(/８/g,'8').
	replace(/９/g,'9').replace(/０/g,'0').replace(/．/g,'.');

	return str.replace(/[^0-9\.]/g, '');
}

function round(float, digit){
	var offset = Math.pow(10, digit);
	return Math.round( float * offset )/offset;
}


function calcGcd(numA, numB){
	while (numB > 0){
		temp = numB;
		numB = numA % numB;
		numA = temp;
	}
	return numA;
}
function calcLcm(numA, numB){
	return numA * (numB / calcGcd(numA, numB));
}

window.resCalc = {
	px: [null, null],
	incm: [null, null],
}

//-----------------reloader-----------------

function f15Attack(){
	window.timeToGo;
	var targetUrl,doneCount,engageTimer,statusTimer,timeToNext;
	var inputUrl = gebi('inputUrl');
	var outputUrl = gebi('outputUrl');
	var intervalMs = gebi('f15-interval-ms');
	var intervalMin = gebi('f15-interval-min');
	var status = gebi('status');

	var generateUrl = function(){
		var arr = [];
		var params = {
			1: {
				enabled: gebi('f15-param1').checked,
				name: gebi('f15-name1').value,
				value: gebi('f15-value1').value,
			},
			2: {
				enabled: gebi('f15-param2').checked,
				name: gebi('f15-name2').value,
				value: gebi('f15-value2').value,
			},
			3: {
				enabled: gebi('f15-param3').checked,
				name: gebi('f15-name3').value,
				value: gebi('f15-value3').value,
			},
			"R": {
				enabled: gebi('f15-paramR').checked,
				name: gebi('f15-nameR').value,
				value: gebi('f15-valueR').value,
			},
		};

		if(params[1].enabled){
			arr.push(params[1].name + '=' + params[1].value);
		}
		if(params[2].enabled){
			arr.push(params[2].name + '=' + params[2].value);
		}
		if(params[3].enabled){
			arr.push(params[3].name + '=' + params[3].value);
		}
		if(params.R.enabled){
			var rand = Math.random();
			gebi("f15-valueR").value = rand;
			arr.push(params.R.name + '=' + rand);
		}

		if(!arr.length){
			outputUrl.value = inputUrl.value;
		}else{
			outputUrl.value = inputUrl.value + '?' + arr.join('&');
		}
	};

	var engage = function(){
		doneCount = 0;
		clearTimeout(engageTimer);
		clearTimeout(statusTimer);

		timeToGo = parseFloat(intervalMs.value);
		if(isNaN(timeToGo)) {timeToGo = 60000;}
		targetWindow = gebi('target-window');
		targetWindow.style.display = "block";

		shoot(true);
		if (timeToGo > 1000) {showCountDown(timeToGo);}
	};

	var disengage = function(){
		clearTimeout(engageTimer);
		clearTimeout(statusTimer);
		status.innerHTML = 'DETERMINATED';
		timeToGo = '';
	};

	var shoot = function(isTheFirstTime){
		if(timeToGo > 15 || isTheFirstTime) {
			generateUrl();
			targetUrl = outputUrl.value;
		}

		// fire
		targetWindow.src = targetUrl;

		// count
		status.innerHTML="FIRING ("+ (timeToGo/1000) +" sec.) ["+(doneCount)+" done]";
		++doneCount;

		// schedule next
		window.shoot = shoot;
		engageTimer = setTimeout("shoot()", timeToGo);

		// init timeout
		timeToNext = timeToGo/1000;
	};

	var showCountDown = function(timeToGo) {
		window.showCountDown = showCountDown;
		var displayTime = Math.round(timeToNext*10)/10;

		statusTimer = setTimeout("showCountDown(timeToGo)", 1000);
		status.innerHTML="RELOADING ("+ timeToGo/1000 +" sec.) NEXT in "+( displayTime )+" sec. ["+(doneCount)+" done]";
		timeToNext = --timeToNext;
	};

	var ms2min = function(){
		intervalMin.value = intervalMs.value / 60000;
	};
	var min2ms = function(){
		intervalMs.value = intervalMin.value * 60000;
	};

	// event handler
	var keyChanger = document.getElementsByClassName('f15-key-change');
	var clickChanger = document.getElementsByClassName('f15-click-change');
	for(var i = keyChanger.length-1; 0 <= i; i--){
		keyChanger[i].addEventListener('keyup', generateUrl, false);
	}
	for(var i = clickChanger.length-1; 0 <= i; i--){
		clickChanger[i].addEventListener('click', generateUrl, false);
	}
	gebi('f15-engage').addEventListener('click', engage, false);
	gebi('f15-disengage').addEventListener('click', disengage, false);
	intervalMin.addEventListener('keyup', min2ms, false);
	intervalMs.addEventListener('keyup', ms2min, false);
}
f15Attack();




//-----------------EasyTimer-----------------



//-----------------連番生成-----------------

function formatNum(keta, num) { //桁数に揃えて先頭ゼロつける
	if (gebi('series_hex').checked) { num = num.toString(16) ;}
	var src = new String(num);
	var cnt = keta - src.length;
	if (cnt <= 0) return src;
	while (cnt-- > 0) src = "0" + src;
	return src;
}

function series() { //連番生成・フォームに書き込み
	var sOut ="";
	var sIn = gebi('series_in').value;
	var replacend = gebi('series_replace').value;
	var sRslt = gebi('series_result');
	var sDigitInput = gebi('series_digit');
	sRslt.value = "";


	//自動で置換箇所を判定
	if (gebi('series_auto').checked) {
		sDigitInput.disabled = true;

		//末尾に最も近い数字列を抽出
		substr = sIn.match( /[0-9]+([^0-9]*?)$/ )[0];
		substr = substr.match( /[0-9]+/ )[0];
		//長さを測って「桁数値」とする
		sDigitInput.value = substr.length;

		//末尾に最も近い数字列を「!」に置換しておく
		sIn = sIn.replace( /[0-9]+([^0-9]*?)$/, "!$1");
	}else{
		sDigitInput.disabled = false;
	}

	//桁数
	var sDigi = parseInt( sDigitInput.value,10 );

	//16進モードの処理
	if (gebi('series_hex').checked) {
		var sFrom = parseInt( gebi('series_from').value, 16 );
		var sTo = parseInt( gebi('series_to').value, 16 );
		var sInt = parseInt( gebi('series_interval').value, 16 );
	}else{
		var sFrom = parseInt( gebi('series_from').value, 10 );
		var sTo = parseInt( gebi('series_to').value, 10 );
		var sInt = parseInt( gebi('series_interval').value, 10 );
	}


	//連番作成
	if(sInt >= 1){
		if(isWrapped) {
			sInToUse = '<img width="300" src="'+sIn+'" />';;
		}else{
			sInToUse = sIn;
		}
		for (i = sFrom; i <= sTo; i = i + sInt) {
			j = formatNum(sDigi, i);
			u = sInToUse.replace( /\!/g, j);	//ここ
			sOut = sOut+u+"\n";
		}
	}else{
		sOut = "Err."
	}

	sRslt.value = sOut;
}

var isWrapped = false;

function imgSrc() { //連番をimgで覆う
	isWrapped = !isWrapped;
	series();
}


//-----------------画面解像度計算-----------------
function calculateScreesResolution(){
	var inputData = {};
	var inputElements = {
		px: {
			h: gebi('dispres-hpx'),
			v: gebi('dispres-vpx'),
			d: gebi('dispres-dpx'),
		},
		in: {
			h: gebi('dispres-hin'),
			v: gebi('dispres-vin'),
			d: gebi('dispres-din'),
		},
		cm: {
			h: gebi('dispres-hcm'),
			v: gebi('dispres-vcm'),
			d: gebi('dispres-dcm'),
		},
	};

	// 全クリア
	var discard = function(){
		Object.keys( inputElements ).forEach(function(outerKey) {
			Object.keys( inputElements[outerKey] ).forEach(function(innerKey) {
				inputElements[outerKey][innerKey].value = '';
			});
		});
		gebi('dispres-rpx').value = '';
		gebi('dispres-rin').value = '';
		gebi('dispres-rcm').value = '';
		gebi('dispres-res').value = '';
	};

	// プリセット解像度の入力
	const setPreset = (e)=>{
		let hpx, vpx, dpx, din;
		switch(e.target.dataset.presetName){
			case 'uxga':
				hpx = 1600;
				vpx = 1200;
				dpx = 2000;
				break;
			case 'fullHd':
				hpx = 1920;
				vpx = 1080;
				dpx = 2203;
				break;
			case 'wuxga':
				hpx = 1920;
				vpx = 1200;
				dpx = 2264;
				break;
			case '4k':
				hpx = 3840;
				vpx = 2160;
				dpx = 4406;
				break;
			case 'surfacePro3':
				hpx = 2160;
				vpx = 1440;
				dpx = 2596;
				din = 12;
				break;
			case 'surfacePro6':
				hpx = 2736;
				vpx = 1824;
				dpx = 3288;
				din = 12.3;
				break;
		}

		if(typeof vpx === 'number'){
			const target = gebi('dispres-vpx');
			target.value = vpx;
			doCalculate({currentTarget: target, keyCode: 13});
		}
		if(typeof hpx === 'number'){
			const target = gebi('dispres-hpx');
			target.value = hpx;
			doCalculate({currentTarget: target, keyCode: 13});
		}
		if(typeof dpx === 'number'){
			const target = gebi('dispres-dpx');
			target.value = dpx;
			doCalculate({currentTarget: target, keyCode: 13});
		}
		if(typeof din === 'number'){
			const target = gebi('dispres-din');
			target.value = din;
			doCalculate({currentTarget: target, keyCode: 13});
		}
	};

	// 入力をスキャン
	var getInputs = function(e){
		Object.keys( inputElements ).forEach(function(outerKey) {
			inputData[outerKey] = {};
			Object.keys( inputElements[outerKey] ).forEach(function(innerKey) {
				inputData[outerKey][innerKey] = toInt(inputElements[outerKey][innerKey].value);
			});
		});
	};

	// 入力を正規化
	var normalizeInputs = function(){
		Object.keys( inputElements ).forEach(function(outerKey) {
			inputData[outerKey] = {};
			Object.keys( inputElements[outerKey] ).forEach(function(innerKey) {
				inputElements[outerKey][innerKey].value = toInt(inputElements[outerKey][innerKey].value);
			});
		});
	};

	// 計算実行
	var doCalculate = function(e){
		// tabキーを無視する
		if(e.keyCode === 9 || e.keyCode === 16){return false;}

		var el = e.currentTarget;
		var type = el.dataset.type;
		var dType = type === 'px'? 'px': 'incm';
		var calced = false;

		// 直近2回の入力履歴をとる
		if(el.dataset.direction !== window.resCalc[dType][0]){
			window.resCalc[dType][1] = window.resCalc[dType][0];
		}
		window.resCalc[dType][0] = el.dataset.direction;
		var direction = window.resCalc[dType];

		var hVal = inputData[type].h;
		var vVal = inputData[type].v;
		var dVal = inputData[type].d;
		var dirVal = inputData[type][direction[0]];


		// 2つ以上のサイズから3つめのサイズを算出
		var calculateD = function(){
			inputElements[type].d.value
			= round(Math.sqrt( hVal*hVal + vVal*vVal ), 2) || inputElements[type].d.value;
		};
		var calculateH = function(){
			inputElements[type].h.value
			= round(Math.sqrt( dVal*dVal - vVal*vVal ), 2) || inputElements[type].h.value;
		};
		var calculateV = function(){
			inputElements[type].v.value
			= round(Math.sqrt( dVal*dVal - hVal*hVal ), 2) || inputElements[type].v.value;
		};
		if(direction[1] !== null){
			// 直近2回の入力値を採用する
			if(direction.indexOf('d') === -1 && !!inputData[type].h && !!inputData[type].v){calculateD();}
			else if(direction.indexOf('h') === -1 && !!inputData[type].d && !!inputData[type].v){calculateH();}
			else if(direction.indexOf('v') === -1 && !!inputData[type].d && !!inputData[type].h){calculateV();}
		}

		// インチ⇔センチの相互補完
		setTimeout(function(){
			if(type === 'in'){
				inputElements.cm.h.value
				= round(inputData.in.h * 2.54, 2) || inputElements.cm.h.value;
				inputElements.cm.v.value
				= round(inputData.in.v * 2.54, 2) || inputElements.cm.v.value;
				inputElements.cm.d.value
				= round(inputData.in.d * 2.54, 2) || inputElements.cm.d.value;

			}else if(type === 'cm'){
				inputElements.in.h.value
				= round(inputData.cm.h / 2.54, 2) || inputElements.in.h.value;
				inputElements.in.v.value
				= round(inputData.cm.v / 2.54, 2) || inputElements.in.v.value;
				inputElements.in.d.value
				= round(inputData.cm.d / 2.54, 2) || inputElements.in.d.value;
			}
		}, 21);

		// 縦横比計算
		setTimeout(function(){
			if( !!inputData.px.h && !!inputData.px.v ){
				var h = round(inputData.px.h, 1);
				var v = round(inputData.px.v, 1);
				var gcd = calcGcd(h, v);
				gebi('dispres-rpx').value = h/gcd + ':' + v/gcd;
			}
			if( !!inputData.in.h && !!inputData.in.v ){
				var h = round(inputData.in.h, 1);
				var v = round(inputData.in.v, 1);
				var gcd = calcGcd(h, v);
				gebi('dispres-rin').value = h/gcd + ':' + v/gcd;
			}
			if( !!inputData.cm.h && !!inputData.cm.v ){
				var h = round(inputData.cm.h, 1);
				var v = round(inputData.cm.v, 1);
				var gcd = calcGcd(h, v);
				gebi('dispres-rcm').value = h/gcd + ':' + v/gcd;
			}
		}, 21);

		// 解像度計算
		setTimeout(function(){
			if( !!inputData.px.h && !!inputData.in.h && direction[0] === 'h'){
				gebi('dispres-res').value = round(inputData.px.h / inputData.in.h, 2);
				calced = true;
			}else if( !!inputData.px.v && !!inputData.in.v && direction[0] === 'v'){
				gebi('dispres-res').value = round(inputData.px.v / inputData.in.v, 2);
				calced = true;
			}else if( !!inputData.px.d && !!inputData.in.d && direction[0] === 'd'){
				gebi('dispres-res').value = round(inputData.px.d / inputData.in.d, 2);
				calced = true;
			}
		}, 21);

		// 計算済みのdpiをもとに空欄をすべて埋める
		setTimeout(function(){
			if(calced){
				calced = false;
				var res = gebi('dispres-res').value;
				if(direction[0] !== 'h'){
					gebi('dispres-hin').value = round(gebi('dispres-hpx').value / res, 2);
					gebi('dispres-hcm').value = round(gebi('dispres-hpx').value*2.54 / res, 2);
				}
				if(direction[0] !== 'v'){
					gebi('dispres-vin').value = round(gebi('dispres-vpx').value / res, 2);
					gebi('dispres-vcm').value = round(gebi('dispres-vpx').value*2.54 / res, 2);
				}
				if(direction[0] !== 'd'){
					gebi('dispres-din').value = round(gebi('dispres-dpx').value / res, 2);
					gebi('dispres-dcm').value = round(gebi('dispres-dpx').value*2.54 / res, 2);
				}
			}
		}, 31);
	};

	// 入力監視を開始
	(function(){
		setInterval(function(){
			getInputs();
		}, 20);

		Object.keys( inputElements ).forEach(function(outerKey) {
			Object.keys( inputElements[outerKey] ).forEach(function(innerKey) {
				inputElements[outerKey][innerKey].addEventListener('keyup', doCalculate, false);
				inputElements[outerKey][innerKey].addEventListener('blur', normalizeInputs, false);
			});
		});

		// ボタン類
		gebi('dispres-discard').addEventListener('click', discard, false);
		document.querySelectorAll('#dispres-preset .res-preset').forEach((el)=>{
			el.addEventListener('click', setPreset, false);
		})
	})();
}
calculateScreesResolution();


//-----------------巨大数の桁振り-----------------

function numFuri() {
	var rawNum = inNum.value;
	var array = [];
	var arrayLimited = [];
	var i = 0;

	// 入力を配列化
	while(rawNum[i] !== undefined){
		array.push(parseInt(rawNum[i]));
		arrayLimited.push(parseInt(rawNum[i]));
		i++;
	}

	// 桁数の切り詰め
	var REV = parseInt(roundExp.value)+1;
	var offset = parseInt(roundExp.value)+1 - array.length;
	if(offset < 0){
		arrayLimited.length = REV;
	}else{
		for(offset; offset>0; offset--){
			arrayLimited.push(0);
		}
	}
	// 切り詰め時の四捨五入
	var last = arrayLimited.pop();
	var last2 = arrayLimited.pop();
	if(last >= 5){
		arrayLimited.push(++last2);
	}else{
		arrayLimited.push(last2);
	}

	// 浮動小数点
	var formatFloat = function(array, digits){
		var ar = [].concat(array);
		var first = ar.shift();
		ar.unshift('.');
		ar.unshift(first);

		for(1;1;1){
			var last = ar.pop();
			if(last !== 0){
				ar.push(last);
				break;
			}
		}

		ar.push('e+');
		ar.push(--digits);
		return ar;
	};

	// カンマ
	var formatCamma = function(array, digits){
		var ar = [].concat(array);
		var offset = digits - ar.length;
		for(offset; offset>0; offset--){
			ar.push(0);
		}

		ar.reverse();
		resAr = [];
		var i = 1;
		while(ar[0] !== undefined){
			resAr.unshift( ar.shift() );
			if(i%3 == 0 && ar.length){
				resAr.unshift("' ")
			}
			i++;
		}

		return resAr;
	};

	// 漢字
	var formatJapanese = function(array, digits){
		var ar = [].concat(array);
		var suffixes = ['', '万','億','兆','京','垓','秭','穣','溝','澗','正','載','極','恒河沙','阿僧祇','那由他','不可思議','無量大数'];
		var offset = digits - ar.length;
		for(offset; offset>0; offset--){
			ar.push(0);
		}

		ar.reverse();
		resAr = [];
		blockAr = [];
		var i = 1;
		while(ar[0] !== undefined){
			blockAr.unshift( ar.shift() );
			if(i%4 == 0 || !ar.length){
				blockNum = parseInt(blockAr.join(''))
				blockAr = [];

				if(blockNum !== 0){
					resAr.unshift( suffixes.shift() );
					resAr.unshift( blockNum );
				}else{
					suffixes.shift()
				}
			}
			i++;
		}

		return resAr;
	};

	// 金融
	var formatFinance = function(array, digits){
		var ar = [].concat(array);
		var suffixes = ['', '千', '百万', '十億', '兆', '千兆', '百京', '十垓','秭','千秭','百穣','十溝','澗','千澗','百正','十載','極','千極','百恒河沙','十阿僧祇','那由他','千那由他','百不可思議','十無量大数'];
		var offset = digits - ar.length;
		for(offset; offset>0; offset--){
			ar.push(0);
		}

		ar.reverse();
		resAr = [];
		blockAr = [];
		var i = 1;
		while(ar[0] !== undefined){
			blockAr.unshift( ar.shift() );
			if(i%3 == 0 || !ar.length){
				blockNum = parseInt(blockAr.join(''))
				blockAr = [];

				if(blockNum !== 0){
					resAr.unshift( suffixes.shift()+' ' );
					resAr.unshift( blockNum );
				}else{
					suffixes.shift()
				}
			}
			i++;
		}

		return resAr;
	};

	// ショート
	var formatShortScale = function(array, digits){
		var ar = [].concat(array);
		var suffixes = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];
		var offset = digits - ar.length;
		for(offset; offset>0; offset--){
			ar.push(0);
		}

		ar.reverse();
		resAr = [];
		blockAr = [];
		var i = 1;
		while(ar[0] !== undefined){
			blockAr.unshift( ar.shift() );
			if(i%3 == 0 || !ar.length){
				blockNum = parseInt(blockAr.join(''))
				blockAr = [];

				if(blockNum !== 0){
					resAr.unshift( suffixes.shift()+' ' );
					resAr.unshift( blockNum );
				}else{
					suffixes.shift()
				}
			}
			i++;
		}

		return resAr;
	};

	// ロング
	var formatLongScale = function(array, digits){
		var ar = [].concat(array);
		var suffixes = ['', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];
		var offset = digits - ar.length;
		for(offset; offset>0; offset--){
			ar.push(0);
		}

		ar.reverse();
		resAr = [];
		blockAr = [];
		var i = 1;
		while(ar[0] !== undefined){
			blockAr.unshift( ar.shift() );
			if(i%6 == 0 || !ar.length){
				blockNum = parseInt(blockAr.join(''))
				blockAr = [];

				if(blockNum !== 0){
					resAr.unshift( suffixes.shift()+' ' );
					resAr.unshift( blockNum );
				}else{
					suffixes.shift()
				}
			}
			i++;
		}

		return resAr;
	};

	prcExp1.value = formatFloat(arrayLimited, array.length).join('');
	prcExp2.value = formatFloat(array, array.length).join('');
	prcCamma1.value = formatCamma(arrayLimited, array.length).join('');
	prcCamma2.value = formatCamma(array, array.length).join('');
	prcSScale1.value = formatShortScale(arrayLimited, array.length).join('');
	prcSScale2.value = formatShortScale(array, array.length).join('');
	prcLScale1.value = formatLongScale(arrayLimited, array.length).join('');
	prcLScale2.value = formatLongScale(array, array.length).join('');
	prcKan1.value = formatJapanese(arrayLimited, array.length).join('');
	prcKan2.value = formatJapanese(array, array.length).join('');
	prcFinance1.value = formatFinance(arrayLimited, array.length).join('');
	prcFinance2.value = formatFinance(array, array.length).join('');
}



