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



