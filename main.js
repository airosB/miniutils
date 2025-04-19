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



