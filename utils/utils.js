var Utils = {
	/*
	 * 身份证验证，并进行年龄限制
	 * @param str  身份证号(避免精度问题请使用String类型)
	 * @param {object} [option] 设置参数
	 * @param option.maxAge 设置最大年龄限制
	 * @param option.minAge 设置最小年龄限制
	*/
	regIdCard : function(str, option) {console.log("comeing");
		str = str.toString();
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/;
		// 用于存储结果
		var result = {};
		if (reg.test(str)) {
			var sum = 0,arrID = str.split(""),arrWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],arrY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
			for (var i = 0; i < arrWi.length; i++) {
				sum += arrID[i] * arrWi[i];
			};
			sum %= 11;
			var lastID = arrID[arrID.length - 1];
			if (lastID == "X" || lastID == "x") {
				lastID = 10;
			};
			if (arrY[sum] == lastID) {
				result.birthday = str.substr(6, 8);
				var birthdayResult = this.regBirth(result.birthday, option);
				if(birthdayResult.errorType == 'age') {
					result.cityCode = str.substr(0, 6);
					result.gender = (str.substr(14, 3) % 2 == 0) ? "女" : "男";
					result.age = birthdayResult.age;
				}
				if(birthdayResult.check) {
					result.check = true;
				} else {
					result.check = false;
					result.error = birthdayResult.error;
				}
			} else {
				result.check = false;
				result.error = "身份证号码输入错误";
			}
		} else {
			result.check = false;
			result.error = "身份证号码格式有误";
		}
		return result;
	},
	/*
	 * 辅助增强身份证验证
	 * @param str  生日字符串
	 * @param {object} [option] 设置参数
	 * @param option.maxAge 设置最大年龄限制
	 * @param option.minAge 设置最小年龄限制
	 */
	regBirth : function(str, option) {console.log("comeing on");
		str = str.toString();
		var result = {};
		if(str.length != 8) {
			result.check = false;
			result.error = '生日格式不正确';
			return 	result;
		}
		var maxAge,minAge,date = new Date(),nowYear = date.getFullYear(),nowMoth = date.getMonth() + 1,today = date.getDate();
		var birthYear = Number(str.substring(0,4)),birthMonth = Number(str.substring(4,6)),birthday = Number(str.substring(6,8));
		// 年不能小于1800年，生日月份不在1-12区间的,日小于1,生日不能超过生日那个月的最大天数
		var maxDay = new Date(birthYear, birthMonth, 0).getDate();
		if((birthYear <= 1800) || (birthMonth > 12 || birthMonth < 1 || birthday < 1) || (birthday > maxDay)) {
			result.check = false;
			result.error = '生日格式不正确';
			return result;
		}
		// 增加年龄限制和未来时判断
		if(option && typeof option.maxAge != 'undefined') {
			maxAge = Number(option.maxAge);
		}
		if(option && typeof option.minAge != 'undefined') {
			minAge = Number(option.minAge);
		}
		if(maxAge || minAge) {
			// 出生年份属于未来时
			if((birthYear > nowYear) || (birthYear == nowYear && birthMonth > nowMoth) || (birthYear == nowYear && birthMonth == nowMoth && birthday > today)) {
				result.check = false;
				result.error = '生日不能为未来时间';
				return result;
			};
			// 计算年龄
			var age = nowYear - birthYear;
			birthMonth > nowMoth ? age-- : (birthMonth == nowMoth ? (birthday > today ? age-- : "") : "");
			result.age = age;
			// 年龄限制
			if(maxAge) {
				if(age > maxAge) {
					result.check = false;
					result.error = '超过最大年龄限制';
					return result;
				}
			}
			if(minAge) {
				if(age < minAge) {
					result.check = false;
					result.error = '超过最小年龄限制';
					return result;
				}
			}
		}
		result.check = true;
		return result;
	},
	/*
	 * 手机号验证
	 * @param str 要验证的手机号
	 */
	 regPhone : function(str) {
	 	str = str.toString();
	 	return /^1([38]\d|4[567]|5(?!4)\d|7[01678])\d{8}$/.test(str);
	 },
	/*
	 * 邮箱验证
	 * @param str 要验证的邮箱
	 */
	 regEmail : function(str) {
	 	str = str.toString();
	 	return /^\w+(\.\w+)*@\w+((\.\w+)+)$/.test(str);
	 	return /^(?!_)\w+[\w-.]*@\w+\.[\w.]*(?!_)\w$/.test(str);
	 },
	/**
	 * 转千分位
	 * @param priceVal
	 * @returns {string}
	 */
	parseThousands: function(priceVal) {
		return ((priceVal || '0') + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
	},
	/**
	 * 从千分位还原成原始数值
	 * @param priceVal
	 * @returns {number}
	 */
	decodeThousands: function(priceVal) {
		return Number(((priceVal||'')+'').replace(/,/g, ""));
	},
	/**
	 * 数字金额转大写
	 * 参数长度1-12位（单位：元，最大单位：千亿）
	 * @param n 字符串或数字类型，如 9999 或 "9999" 或 "12,255.00"
	 * @return str 返回值 "xxxx元整"，如果数据过长返回为空字符串
	 * @example C.parseUpperNumberMoney("12,255.00");  // 返回"壹万贰仟贰佰伍拾伍元整"
	 */
	parseUpperNumberMoney: function (n) {
		if (isNaN(Number(n)) || !/^\d{1,13}(\.\d+)?$/.test(n))  // 判断是否符合规则
			return "";
		n = n + ""; // 转换为字符串
		n = n.replace(/\,/g, "").replace(/\.(\d{1,2})\d*?$/g, ".$1").replace(/\.[0]+$/, "").replace(/\.([^0]+)[0]+$/, ".$1");  // 替换掉千分位符号和小数点及后面的数

		var unit = "万仟佰拾亿仟佰拾万仟佰拾元", str = "";
		var rightMatch = n.match(/\.(\d*)$/);
		if (rightMatch && rightMatch.length == 2) {
			n = n.replace(rightMatch[0], rightMatch[1]);
			unit += ("角分".substring(0, rightMatch[1].length));
		}
		unit = unit.substr(unit.length - n.length);
		for (var i = 0; i < n.length; i++)
			str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
		return str.replace(/零(仟|佰|拾)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿)/g, "$1").replace(/(.+)零元/g,"$1元").replace(/(亿)万|元(拾)|角(拾)|/g, "$1$2").replace(/^元零?|零$/g, "").replace(/元$/g, "元整");
	},
	/**
	 * 银行卡格式化四位一空格
	 * @param [str] value
	 */
	cardNoFormat : function (value) {
		return value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
	},
	/**
	 * 银行卡留前后各4位,其他用*号代替
	 * @param [str] value 银行卡号
	 */
	parseToStarNumber : function (value) {
		if(value.length < 9 ){
			return false;
		}
		return value.substr(0,4) + ' **** **** ' + value.substr(-4,4);
	},
	/*
	 * 禁止输入法go或者“前往”进行强制提交
	 */
	checkGo : function(even) {
		var keyCode = even.keyCode || event.which;
		if(keyCode == 13) {
			return false;
		}
	},
	/**
	 * 检测字符串字节长度
	 * @param str 需要检查字节长度的字符串
	 */
	checkLen: function(str) {
		if (!str) {
			str.toString();
		}
		var byteLen=0,len=str.length;
		for(var i=0; i<len; i++){
			if(str.charCodeAt(i)>255){
				byteLen += 2;
			}
			else{
				byteLen++;
			}
		}
		return byteLen;
	},
	/*
	 * 获取数据类型可以用于判断Math，Date，Function等类型
	 */
	 getType : function(data) {
	 	return Object.prototype.toString.call(data).replace(/[\[\]]/g, "").split(" ")[1];
	 },
};
module.exports = Utils;