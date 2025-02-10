import CryptoJS from 'crypto-js'
import $ from 'jquery'
import Swal from 'sweetalert2'

let Utils = class {
	init = (_const,data) => {
        const self = this;
            self._const = _const;
            Object.freeze(self._const);
            self._data = data;
    };

    printme = () => {
        const self = this;
    }

	stringcut = (str,len) => {
		const self = this;
        let s = 0;
	     for (let i=0; i<str.length; i++) {
	             s += (str.charCodeAt(i) > 128) ? 2 : 1;
	             if (s > len) return str.substring(0,i) + "...";
	     }
		return str;
	};

	_Redirect = (url,timeout, newwin) => {
		const self = this;
		if(newwin)
		{
			window.open(url, "_blank");
		} else {
			if( timeout ) {
				setTimeout( function(){
					window.location.href = url;
				},timeout);
			} else {
				window.location.href = url;
			}
		}
	};

	_RedirectPost = (url, data, method) => {
	//url and data options required
		if( url && data ){
			//data can be string of parameters or array/object
			data = typeof data == 'string' ? data.split('&') : data;
			//split params into form inputs
			let inputs = '';
			for(let key in data) {
				inputs+='<input type="hidden" name="'+ key +'" value="'+ data[key] +'" />';
			}
			// send request
			$('<form action="'+ url +'" method="'+ (method||'post') +'" data-ajax="false">'+inputs+'</form>')
			.appendTo('body').submit().remove();
		}
	};

	_RedirectGet = (_url, _data, timeout) => {
        if(_data){
            _data = (typeof _data == 'string') ? _data : jQuery.param(_data);
        }

        if( timeout ) {
            setTimeout( function(){
                window.location.href = _url+(_data?'?'+_data:'');
            },timeout);
        } else {
            window.location.href = _url+(_data?'?'+_data:'');
        }
    };

    _RedirectRoute = (_url, _data, timeout, _history = true) => {
        const self = this;
        let _param = '';
        if(_data){
            if(typeof _data == 'object') {
                _param = (_data.SendParam?'/'+self._encryptstring(JSON.stringify(_data.SendParam)):'');
            } else {
                _param = self._encryptstring(_data);
            }
        }

		if( timeout ) {
            setTimeout( function(){
				if(_history) window.location.href = _url+(_param);
				else window.location.replace(_url+(_param));
            },timeout);
        } else {
			if(_history) window.location.href = _url+(_param);
			else window.location.replace(_url+(_param));
        }
    };

	_RedirectDirectRoute = (_url, _data, timeout, _history = true) => {
        const self = this;
        let _param = '';
        if(_data){
			_param =self._encryptstring(JSON.stringify(_data));
        }

		if( timeout ) {
            setTimeout( function(){
				if(_history) window.location.href = _url+"/"+(_param);
				else window.location.replace(_url+"/"+(_param));
            },timeout);
        } else {
			if(_history) window.location.href = _url+"/"+(_param);
			else window.location.replace(_url+"/"+(_param));
        }
    };

	_RedirectPostWin = (url, data, method) => {

		checkPop = () => {
			let gsWin = window.open('about:blank','popWindow','width=1128,height=876');
			return true;
		}

		//url and data options required
		if( url && data ){
			//data can be string of parameters or array/object
			data = typeof data == 'string' ? data : jQuery.param(data);
			//split params into form inputs
			let inputs = '';
			jQuery.each(data.split('&'), function(){
				let pair = split('=');
				inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
			});
			// send request
			jQuery('<form name="frm" onsubmit="return checkPop();" action="'+ url +'" method="'+ (method||'post') +'" target="popWindow" data-ajax="false">'+inputs+'</form>')
			.appendTo('body').submit().remove();
		}
	};

	_randomString = (num=2) => {
		return Math.random().toString(36).substring(num)
	};

	_createUUID = () => {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function")
        {
            d += performance.now(); //use high-precision timer if available
        }
        // let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxx'.replace(/[xy]/g, function (c)
        {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

	_zeroFill = ( number, width ) => {
		if( number==undefined || number == null) return null;
		width -= number.toString().length;
		if ( width > 0 )
		{
		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		}
		return number + ""; // always return a string
	};

	nullTostring = ( data, str ) => {
		if( data == null || data == "undefined"){
			return str;
		// } else if( isNaN(data) ) {	// 숫자 변환 여부
		// 	return typeof str === 'number'?Number(str):str;
		} else {
			return data;
		}
	};

	isEmpty = (value) => {
		// 넘어온 값이 빈값인지 체크합니다.
		// !value 하면 생기는 논리적 오류를 제거하기 위해
		// 명시적으로 value == 사용
		// [], {} 도 빈값으로 처리
		if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
			return true
		}else{
			return false
		}
	}

	isNumberPressed = (k) => {
		// 48-57 are number 0-9 on a normal keyboard, 96-105 are keypad numbers
		return (k > 47 && k < 58) || (k > 95 && k < 106) ? true : false;
	};

	isValidNumber = (v,min,max) => {
		// Check if a valid number is entered
		return (parseInt(v, 10) >= min && parseInt(v, 10) <= max) ? true : false;
	};

	decimal = ( number, precision )  => {
		const self = this;
		let str = number.toString();
	    let pos = str.indexOf(".");
	    if(pos!=-1)
	    {
	        let tempArr = str.split(".");
	        	str = tempArr[0]+'.'+tempArr[1].substr(0,precision);
	    }
	    return parseFloat(str);
	};

	// 3자리마다 콤마 찍기
	numberWithCommas = (x,c)  => {
		let v = '';
		if(x!=undefined){ 
			v = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}else {
			v = c;
		}
	    return v;
	};

	pad = (n, width)  => {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	};

	limitLength = (obj)  => {

		let maximumCount = (($(obj).attr('maxlength') == undefined) ? 5:$(obj).attr('maxlength'));
		let now = maximumCount - $(obj).val().length;

		// 사용자 입력 값이 제한 값을 초과하는지를 검사
		if(now < 0) {
			let str = $(obj).val();
			// alert('글자 입력수가 초과하였습니다.');
			$(obj).val(str.substr(0,maximumCount));
			now = 0;
		}
	};

	korLength = (obj)  => {
		let totalByte = 0;
		let oneChar = "";
		for (let i = 0; i < obj.length; i++) {
			oneChar = obj.charAt(i);
			if (escape(oneChar).length > 4) {
				totalByte += 2;
			} else {
				totalByte++;
			}
		}
		return totalByte;
	};

	strMaxCuttion = (str, max)  => {
		str=str??'';
		if(str.length > max){
			return str.substring(0,max) + "...";
		}else{
			return str;
		}
	};

	download = (url, data, method) => {
	//url and data options required
		if( url && data ){
			//data can be string of parameters or array/object
			data = typeof data == 'string' ? data : jQuery.param(data);
			//split params into form inputs
			let inputs = '';
			jQuery.each(data.split('&'), function(){
				let pair = split('=');
				inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
			});
			//send request
			jQuery('<form action="'+ url +'" method="'+ (method||'post') +'"  data-ajax="false">'+inputs+'</form>')
			.appendTo('body').submit().remove();
		}
	};
	excelDownload = async (workbook, fileName) => {
		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});
		const url = window.URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = fileName + '.xlsx';
		anchor.click();
		window.URL.revokeObjectURL(url);
	}
	excelStyleHeaderCell = (cell) => {
		cell.fill = {
		  type: "pattern",
		  pattern: "solid",
		  fgColor: { argb: "ffebebeb" },
		};
		cell.border = {
		  bottom: { style: "thin", color: { argb: "-100000f" } },
		  right: { style: "thin", color: { argb: "-100000f" } },
		};
		cell.font = {
		  name: "Arial",
		  size: 12,
		  bold: true,
		  color: { argb: "ff252525" },
		};
		cell.alignment = {
		  vertical: "middle",
		  horizontal: "center",
		  wrapText: true,
		};
	  };
	  
	  excelStyleDataCell = (cell,horizontal) => {
		horizontal?horizontal:'center';
		cell.fill = {
		  type: "pattern",
		  pattern: "solid",
		  fgColor: { argb: "ffffffff" },
		};
		cell.border = {
		  bottom: { style: "thin", color: { argb: "-100000f" } },
		  right: { style: "thin", color: { argb: "-100000f" } },
		};
		cell.font = {
		  name: "Arial",
		  size: 10,
		  color: { argb: "ff252525" },
		};
		cell.alignment = {
		  vertical: "middle",
		  horizontal: horizontal,
		  wrapText: true,
		};
	  };
	checkValidate = (t,val)  => {
		const self = this;
		switch (t) {
			case "char":
				if(!/[!@#$%;]/.test(val)) {
					 return "ok";
				} else {
					 return "특수문자를 사용할 수 없습니다.";
				}
			break;
			case "date" :
				if(!/Invalid|NaN/.test(new Date(val))) {
					 return "ok";
				} else {
					 return "날짜 포맷이 아닙니다.";
				}
			break;
			case "eng_num":
				if(/^[A-Za-z0-9][A-Za-z0-9]*$/.test(val)) {
					 return "ok";
				} else {
					 return "영문이나 숫자를 조합해서 입력하세요.";
				}
			break;
			case "mail":
				if(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/.test(val)) {
				  return "ok";
				} else {
				  return "정확한 메일주소를 입력하세요";
				}
			break;
			case "mid":
				if(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/.test(val)) {
				  return "ok";
				} else {
				  return "정확한 아이디를 입력하세요";
				}
			break;
			case "domain":
				if(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(val)) {
				  return "ok";
				} else {
				  return "정확한 도메인을 입력하세요";
				}
			break;
			case "num":
				if(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val)) {
					 return "ok";
				} else {
					 return "숫자만 가능합니다.";
				}
			break;
			case "text" :
				return "ok"
			break;
			case "biz" :
				if(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val) && self.checkBizID(val)) {
					return "ok"
				} else {
					return "잘못된 사업자번호입니다.";
				}


			break;
			case "password" :

				let num = val.search(/[0-9]/g);
				let eng = val.search(/[a-z]/ig);
				let spe = val.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

				if(val.length < 8 || val.length > 20){
					return "비밀번호는 8~20자 이내여야 합니다.";
				} else {
					if(val.search(/₩s/) != -1){
						return "비밀번호는 공백없이 입력해주세요.";
					}

					if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
						return "영문,숫자,특수문자 중 2가지 이상을 혼합하여 입력해주세요.";
					}
					return "ok"
				}
			break;
			case "phone" :

				if(/(\d{3}).*(\d{3,4}).*(\d{4})/.test(val)) {
					return "ok"
				} else {
					return "정확한 전화번호를 입력하세요.";
				}
			break;
		}
	};

	checkRequired = (e) => {
		const self = this;
		let returncheck = true;
		let totalValue = 0;

		$('INPUT, SELECT, TEXTAREA',e).each(function(idx) {
			let obj = this;
			let frmType = $(this).get(0).tagName;
			let frmIType = $(this).attr('type');
			let frmName = $(this).attr('name');
			let requiredmsg = $(this).attr('requiremsg');
			let validatetype =  $(this).attr('vtype');

			let value = $(this).val();
			let disabled = $(this).is(':disabled');

			if(requiredmsg != undefined && !disabled) {
				if( frmIType == 'radio' )
				{
					if( !$('input[name='+frmName+']', e).is(':checked') )
					{
						$(obj).focus();
						alert( requiredmsg+' 체크하세요');
						returncheck = false;
						return false;
					}
				}
				if ( frmIType == 'checkbox' ) {
				    if (!$('input[name=' + frmName + ']', e).is(':checked')) {
						$(obj).focus();
						alert( requiredmsg + " 체크하세요.");
				        returncheck = false;
				        return false;
				    }
				}

				if ( frmType == 'SELECT' ) {
				    if (!value) {
						$(obj).focus();
						alert( requiredmsg + " 선택하세요.");
				        returncheck = false;
				        return false;
				    }
				}
				if(!value) {
					$(obj).focus();
					alert( requiredmsg+" 입력하세요.");
					returncheck = false;
					return false;
				}

				if( validatetype )
				{
					let validateMsg = self.checkValidate(validatetype,$.trim(value) );
					if(validateMsg !== 'ok')
					{
						$(obj).focus();
						alert(validateMsg);
						returncheck = false;
						return false;
					}
				}
			}
		});
		return returncheck;
	};

	// 사업자번호 체크
	checkBizID = (bizID) => {

	    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
	    let checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	    let i, chkSum=0, c2, remander;
	     bizID = bizID.replace(/-/gi,'');

	     for (let i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
	     c2 = "0" + (checkID[8] * bizID.charAt(8));
	     c2 = c2.substring(c2.length - 2, c2.length);
	     chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	     remander = (10 - (chkSum % 10)) % 10 ;

	    if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!

	    return false;
	};
	convertBizNo = (strBizNo)=>{
		if(strBizNo.length>0){
		  var bizNo1 = strBizNo.substring(0,3);
		  var bizNo2 = strBizNo.substring(3,5);
		  var bizNo3 = strBizNo.substring(5,10);
		  strBizNo = bizNo1 + "-" + bizNo2 + "-" + bizNo3;
		}
	  
		return strBizNo;
	};
	convertTel(strPhoneNumber) {
		const length = strPhoneNumber.length;
		if(length >= 9) {
			return strPhoneNumber.replace(/[^0-9]/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
		}
		return strPhoneNumber;
	}
	convertNumber = (str) =>{
		const type = typeof str;
		if( type == "string") str = str.replace(/[^0-9]/g, ""); 
		return str;
	}
	
	convertUnit = (x)  => {
		let v = '';
		let fixedNumber = '';
		let decimalNumber = '';
		let isMinus = false;
		if(x!=undefined){
			x = x.replace(/[^0-9.]/g, "")
			if(x.indexOf('.') > -1){
				fixedNumber = x.substring(0, x.indexOf('.'));
				decimalNumber = x.substring(x.indexOf('.')+1);
			}else{
				fixedNumber = x.replace(/[^0-9]/g, "");
			}
			fixedNumber = fixedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} 
	    return fixedNumber + ((decimalNumber=='')? '':'.'+ decimalNumber);
	};
	
	convertMoney = (x)  => {
		let v = '';
		let fixedNumber = '';
		let decimalNumber = '';
		let isMinus = false;
		if(x!=undefined){
			if(x.indexOf('-') > -1){
				isMinus = true;
				x = x.replace(/[^0-9.]/g, "")
			}
			if(x.indexOf('.') > -1){
				fixedNumber = x.substring(0, x.indexOf('.'));
				decimalNumber = x.substring(x.indexOf('.')+1);
			}else{
				fixedNumber = x.replace(/[^0-9]/g, "");
			}
			fixedNumber = fixedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} 
	    return ((isMinus)?'-':'') + fixedNumber + ((decimalNumber=='')? '':'.'+ decimalNumber);
	};
	unconvertUnit = (str) =>{
		const type = typeof str;
		if( type == "string") str = str.replace(/[^0-9.-]/g, ""); 
		return str;
	}
	unconvertMoney = (str) =>{
		const type = typeof str;
		if( type == "string") str = str.replace(/[^0-9.-]/g, ""); 
		return str;
	}
	focusEvent = ($obj, type, focusFnc, focusoutFnc) => {
		const self = this;
		$obj.on('focus',function(){
			let v = $(this).val();
			if(type == 'money'){
				v = self.unconvertMoney(v);
			}else if(type == 'unit'){
				v = self.unconvertUnit(v);
			}else {
				v = self.convertNumber(v);
			}
			if(typeof focusFnc == 'function') focusFnc(v);
			$(this).val(v);
		});
		$obj.on('focusout',function(){
			let v = $(this).val();
			if(type == 'tel'){
				v = self.formatPhoneNumber(v.replace(/-/g,''));
			}else if(type == 'bizNo'){
				v = self.convertBizNo(v.replace(/-/g,''));
			}else if(type == 'comma'){
				v = self.convertNumber(v);
				v = self.numberWithCommas(v);
			}else if(type == 'unit'){
				v = self.unconvertUnit(v);
				v = self.convertUnit(v);
			}else if(type == 'money'){
				v = self.unconvertMoney(v);
				v = self.convertMoney(v);	
			}
			if(typeof focusoutFnc == 'function') focusoutFnc(v);
			$(this).val(v);
		});
		setTimeout(function(){$obj.trigger('focusout')},100);
	}

	removeItem = (array, item) => {
	    for(let i in array){
	        if(array[i]==item){
	            array.splice(i,1);
	            break;
	            }
	    }
	};

	removeHtml = (contents)  => {
		const self = this;
		let array = self.removeTag.htmlTag;

		for(let i in array) {

			let tagRegExp = new RegExp("<"+array[i]+"[^>]*>(.*?)</"+array[i]+">", "ig");
			contents = contents.replace(tagRegExp, "");
		}

		return contents;
	};

	strip_tags = (input, allowed)  => {
	    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	    let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
		    	return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	    	});
	}

	formdataToArray = (data) => {
		let newdata = {};
		let newarray = [];
		let dataArray = true;
		let datavalue = '';
		var regExp = /^0[0-9].*$/;

		for(let i = 0;i< data.length;i++)
		{
			let key = data[i]['name'];
			var values = data[i]['value'];

			if(!values) continue;
			
			// 0으로 시작하는 String
			if(!regExp.test(values)) {
				datavalue = (isNaN(values))?values:Number(values);
			} else {
				datavalue = values;
			}

			newarray = [];
			$.each( newdata, function(index, idxVal) {

				if(key == index) {
					dataArray = false;
					if($.isArray(newdata[key])) {
						newarray = newdata[key];
					} else {
						newarray.push(newdata[key]);
					}

				}
			});

			if(dataArray) {
				newdata[key] = datavalue ;
			} else {
				newarray.push(datavalue);
				newdata[key] = newarray;
			}

			dataArray = true;
		}
		return newdata;
	};

	/* change selectmenu and refresh */
	changeMenu = ( e, i ) => {
		e.find('option').removeAttr('selected').eq(i).attr('selected','selected');
		e.selectmenu('refresh');
	};

	resetDataForm = (f) => {
		$(':input',f).not(':button, :submit, :reset, :hidden').each(function(idx, e) {

				let tagName = $(e).prop("tagName").toLowerCase();
				let type = $(e).attr('type');

				switch(tagName) {
					case 'input':
						if( type == 'radio' || type == 'selectbox' ) {
							$(e).removeAttr('checked');
						} else {
							$(e).val('');
						}
					break;
					case 'textarea':
						$(e).val('');
					break;
					case 'select' :
						$(e).find('option').removeAttr('selected').eq(0).attr('selected','selected');
					break;
				}
		});
	};

	bindformData = (data,frm) => {
		$.each( data,function( key, val ) {
			if($('[name='+key+']',frm).length > 0) {
				let cObj = $('[name='+key+']',frm);
				let tagname = cObj.prop("tagName").toLowerCase();
				switch(tagname) {
					case 'input':
						if( cObj.attr('type') == 'radio' ) {
							for( let i = 0; i < cObj.length; i++ )
								cObj.eq(i).val() == val ? cObj.eq(i).attr('checked','checked') : cObj.eq(i).removeAttr('checked');
						} else if ( cObj.attr('type') == 'checkbox' )	{
							cObj.val() == val ? cObj.attr('checked','checked') : cObj.removeAttr('checked');
						}else {
							cObj.val(val);
						}
						break;
					case 'select':
						cObj.find('[value='+val+']').attr( 'selected','selected');
						cObj.trigger( 'change' );
						break;
					break;
				}
			}
		});
	};

	currentDate = () => {
		let now = new Date();
		let year= now.getFullYear();
		let mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
		let day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();

		return year + '-' + mon + '-' + day;
	};

	currentMonth = () => {
		let now = new Date();
		let year= now.getFullYear();
		let mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);

		return year + '-' + mon;
	}

	currentDateTime = () => {
		let ToDay = new Date();
		let Year = ToDay.getFullYear();
		let Month = ("0" + (ToDay.getMonth() + 1)).slice(-2);
		let Day = ("0" + ToDay.getDate()).slice(-2);
		let Hour = ("0" + ToDay.getHours()).slice(-2);
		let Minute = ("0" + ToDay.getMinutes()).slice(-2);
		let Seconds = ("0" + ToDay.getSeconds()).slice(-2);

		return Year + Month + Day + Hour + Minute + Seconds;
	};

	currentTime = () => {
		let now = new Date();
		let hours = (now.getHours())>9 ? ''+(now.getHours()) : '0'+(now.getHours());
		let minutes = (now.getMinutes())>9 ? ''+(now.getMinutes()) : '0'+(now.getMinutes());
		return hours + ':' + minutes;
	};

	addDate = (date, days)  => {
		let result = new Date(date);
		result.setDate(result.getDate() + parseInt(days,10));

		let year= result.getFullYear();
		let mon = (result.getMonth()+1)>9 ? ''+(result.getMonth()+1) : '0'+(result.getMonth()+1);
		let day = result.getDate()>9 ? ''+result.getDate() : '0'+result.getDate();

		return year + '-' + mon + '-' + day;
	};

	subDate = (date, days)  => {
		let result = new Date(date);
		result.setDate(result.getDate() - parseInt(days,10));
		
		let year= result.getFullYear();
		let mon = (result.getMonth()+1)>9 ? ''+(result.getMonth()+1) : '0'+(result.getMonth()+1);
		let day = result.getDate()>9 ? ''+result.getDate() : '0'+result.getDate();

		return year + '-' + mon + '-' + day;
	};



	createDate = (d) => {
		return (d instanceof Date)? d : new Date(d.replace(/-/g, "/"));
	};

	addHours = (date,h) => {
	    date.setHours(date.getHours()+h);
	    return date;
	};

	addMinutes = (date,m) => {
	    date.setMinutes(date.getMinutes()+m);
	    return date;
	};

	dayDiffInStr = (a,b) => {
		let newa = (a instanceof Date)? new Date(a) : new Date(a.replace(/-/g, "/"));
		let newb = (b instanceof Date)? new Date(b) : new Date(b.replace(/-/g, "/"));
		return (newa.setHours(0,0,0,0)-newb.setHours(0,0,0,0)) ? false : true;
	};

	diffTime = (a,b,t) => {
		let date1 = (a instanceof Date)? a : new Date(a.replace(/-/g, "/"));
		let date2 = (b instanceof Date)? b : new Date(b.replace(/-/g, "/"));

		if (date2 < date1) {
		    date2.setDate(date2.getDate() + 1);
		}
		let diff = date2 - date1;
		switch(t)
		{
			case 'h':
				return Math.ceil((diff/1000)/60/60);
				break;
			case 'm':
				return Math.ceil((diff/1000)/60);
				break;
			case 's':
				return Math.ceil((diff/1000));
				break;
		}
	};

	diffDate = (a, b) => {
		let newa = (a instanceof Date)? new Date(a) : new Date(a.replace(/-/g, "/"));
		let newb = (b instanceof Date)? new Date(b) : new Date(b.replace(/-/g, "/"));

		let diffDate = Math.ceil((newa.getTime() - newb.getTime())/(24*60*60*1000));

		return diffDate;
	}

	diffmonth = (date1,date2) => {
	    let months = (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();
		let smonth = date1.getMonth()+1;
		let emonth = date2.getMonth()+1;
	    return ({smonth:smonth,emonth:emonth,tmonth:months });
	};

	formatdate = (a,pdivchar) => {
		let date = (a instanceof Date)? a : new Date(a.replace(/-/g, "/"));
		let divchar = pdivchar || "-";
		return date.getFullYear()+divchar+this._zeroFill(date.getMonth()+1,2)+divchar+this._zeroFill(date.getDate(),2);
	};

	dateformatMin = (date) => {
		let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : date;
		//let cdate =(date instanceof Date)? date : new Date(date.replace(/-/g, "/"));
		return cdate.getFullYear()+'-'+ this._zeroFill(cdate.getMonth()+1,2)+'-'+this._zeroFill(cdate.getDate(),2)+' '+this._zeroFill(cdate.getHours(),2) +':'+this._zeroFill(cdate.getMinutes(),2);
	};

	dateformatForeignDate = (date) => {
		const self = this;
		let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : date;
		return self._zeroFill(cdate.getDate(),2)+'-'+ self._zeroFill(cdate.getMonth()+1,2)+'-'+cdate.getFullYear();
	};

	dateformatForeignDatetime = (date) => {
		const self = this;
		let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : date;
		return self._zeroFill(cdate.getHours(),2)+':'+self._zeroFill(cdate.getMinutes(),2)+' '+self._zeroFill(cdate.getDate(),2)+'-'+ self._zeroFill(cdate.getMonth()+1,2)+'-'+cdate.getFullYear();
	};

	dateformatKorDate = (date) => {
		const self = this;
		let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : date;
		return cdate.getFullYear()+'-'+ self._zeroFill(cdate.getMonth()+1,2)+'-'+self._zeroFill(cdate.getDate(),2);
	};

	dateformatKorDateStr = (date) => {
		const self = this;
		let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : date;
		return cdate.getFullYear()+'년 '+ self._zeroFill(cdate.getMonth()+1,2)+'월 '+self._zeroFill(cdate.getDate(),2)+'일';
	};

	dateformatMonthDate = (date) => {
		const self = this;
		try {
			let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : date;
			return self._zeroFill(cdate.getMonth()+1,2)+'-'+self._zeroFill(cdate.getDate(),2);
		} catch(e) {
			return '-';
		}
	};

	dateformatStringToDate = (strDate) => {
		const self = this;
		return strDate.substr(0,4)+'-'+strDate.substr(4,2)+'-'+strDate.substr(6,2);
	}
	dateformatStringToDateTime = (strDate) => {
		const self = this;
		return strDate.substr(0,4)+'-'+strDate.substr(4,2)+'-'+strDate.substr(6,2)+' '+strDate.substr(8,2)+':'+strDate.substr(10,2)+':'+strDate.substr(12,2);
	}

	dateformatCurrentYYYYMMDD = (div) => {
		const self = this;
		div = div || '';

		let now = new Date();
		let year= now.getFullYear();
		let mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
		let day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();

		return year + div + mon + div + day;
	}

	dateformatCurrentYYYYMM = (div) => {
		const self = this;
		div = div || '';

		let now = new Date();
		let year= now.getFullYear();
		let mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
		let day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();

		return year + div + mon;
	}

	dateformatCurrentHHmmss = (div) => {
		const self = this;
		div = div || '';

		let now = new Date();
		let hours= now.getHours();
		let minutes = now.getMinutes();
		let seconds = now.getSeconds();

		return self._zeroFill(hours,2) + div + self._zeroFill(minutes,2) + div + self._zeroFill(seconds,2);
	}

	dateformatCurrentHHmm = (div) => {
		const self = this;
		div = div || '';

		let now = new Date();
		let hours= now.getHours();
		let minutes = now.getMinutes();

		return self._zeroFill(hours,2) + div + self._zeroFill(minutes,2);
	}

	formatPhoneNumber = (a) => {
		if(a == null) return '';
		const digits = a.replace(/\D/g, '');

		if (digits.length === 9) {
			return digits.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
		} else if (digits.length === 10) {
			if (digits.startsWith('02')) {
				return digits.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
			} else {
					return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		} else if (digits.length === 11) {
			return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		} else if (digits.length === 12) {
			return digits.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
		} else {
			return a;
		}
	}


	getWeek = (cdate,start) => {
	    start = start || 0;
	    let today = new Date(cdate.setHours(0, 0, 0, 0));
	    let day = today.getDay() - start;
	    let date = today.getDate() - day;
	    // Grabbing Start/End Dates

	    let StartDate = new Date(today.setDate(date));
	    let EndDate = new Date(today.setDate(today.getDate() + 6));
	    return [StartDate, EndDate];
	};

	weekCount = (year, month_number)  => {
	    let firstOfMonth = new Date(year, month_number-1, 1);
	    let lastOfMonth = new Date(year, month_number, 0);

	    let used = firstOfMonth.getDay() + lastOfMonth.getDate();

	    return Math.ceil( used / 7);
	};

	addDays = (date, days)  => {
		let result = new Date(date);
		result.setDate(result.getDate() + parseInt(days,10));
		return result;
	};

	addMonth = (date, m)  => {
		let result = new Date(date);
		result.setMonth(result.getMonth() + parseInt(m,10));
		return result;
	};

	//해당하는 날짜가 그 기간안에 있는지
	//s: 시작날짜. e:끝 날짜, n:현재 날짜, b: 시작이전(분), p: 추가 시간(분)
	isInDate = (s,e,n,b,p) => {
		s = typeof(s)=="string"?new Date(s.replace(/-/g, "/")).setHours(0,0,0,0):s.setHours(0,0,0,0);
		e = typeof(e)=="string"?new Date(e.replace(/-/g, "/")).setHours(23,59,59,0):e.setHours(23,59,59,0);
		n = typeof(n)=="string"?new Date(n.replace(/-/g, "/")).getTime():n.getTime();
		b = typeof(b)!="number"?parseInt(b)*60000:b*60000;
		p = typeof(p)!="number"?parseInt(p)*60000:p*60000;

		return ( n>(s-b) && n<(e+p) );
	};

	formatDatetime = (d,Pdiv)  => {
		const self = this;
		let date = typeof(d) == "string" ? new Date(d.replace(/-/g, "/")) : new Date(d);
		var	div = Pdiv ? Pdiv :'-';
	    	return date.getFullYear()+ div +self._zeroFill(date.getMonth() + 1,2) + div + self._zeroFill(date.getDate(),2) +' '+self._zeroFill(date.getHours(),2)+':00:00';
	};

	toHHMMSS = (sec)  => {
		const self = this;
	    let sec_num = parseInt(sec, 10);
	    let hours   = Math.floor(sec_num / 3600);
	    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    let seconds = sec_num - (hours * 3600) - (minutes * 60);

	    let time    = hours+'시간 '+minutes+'분 '+seconds+'초';
	    if( hours < 1 )
	    {
	    	time = self._zeroFill(minutes,2)+'분';
	    } else {
	    	time  = self._zeroFill(hours,2)+'시간 '+self._zeroFill(minutes)+'분';
	    }
	    return time;
	};

	intTostrMonth = (i,div) => {
		if(!i || String(i).length!=6) {
			return false;
		} else {
			return  `${String(i).substring(0,4)}${div}${String(i).substring(4)}`;
		}
	}

	getClassHour = (d)  => {
		const self = this;
		let datetime = typeof(d) == "string" ? new Date(d.replace(/-/g, "/")) : new Date(d);
	    return self._zeroFill(datetime.getHours(),2)+':'+self._zeroFill(datetime.getMinutes(),2);
	};

	predictionTime = (d)  => {
		const self = this;
		let datetime = (d instanceof Date)? d : typeof(d) == "string" ? new Date(d.replace(/-/g, "/")) : new Date();
		    return datetime.getFullYear()+'-'+self._zeroFill(datetime.getMonth()+1,2)+'-'+self._zeroFill(datetime.getDate(),2)+'T'+self._zeroFill(datetime.getHours(),2)+':'+self._zeroFill(datetime.getMinutes(),2)+':'+self._zeroFill(datetime.getSeconds(),2)+'+0900';
	};

	isNight = (d) => {
		const self = this;
		let datetime = (d instanceof Date)? d : typeof(d) == "string" ? new Date(d.replace(/-/g, "/")) : new Date();
		let bighour = datetime.getHours();
			return (bighour >= 0 && bighour <= 4 )?true:false;
	};

	isToday = (a,b) => {
		let c = typeof(a) == "string" ? new Date(a.replace(/-/g, "/")) : new Date(a);
		if(b)
		{
			let t = typeof(b) == "string" ? new Date(b.replace(/-/g, "/")) : new Date(b);
		} else {
			let t = new Date();
		}

		return c.setHours(0,0,0,0)==t.setHours(0,0,0,0);
	};

	createDateFromString = (date,h,m,s,ms) => {
		let shortDate = date.split(' ')[0];
		let arrdate = shortDate.split('-');
		let tmpdate = new Date(arrdate[0],parseInt(arrdate[1],10)-1,arrdate[2]).setHours(h,m,s,ms);
		return new Date(tmpdate);
	};

	// 2진수 요일을 문자열로 반환
	bitDaysToString = (days) => {
		let self = this;
		
		let _classDayBit = days ? self._zeroFill(days.toString(2), 7).split('').reverse().join('') : '0000000';

		let _daysTxt = ''
		let _day = ['월','화','수','목','금','토','일']; //요일배열만들기
		for(let bt = 0; bt < 7; bt++) { 
			if(_classDayBit.charAt(bt) == "1") {
				_daysTxt += (_daysTxt == '' ? _day[bt]: ', ' +_day[bt]);
			}
		}

		return _daysTxt;
	}

	// 2진수 요일을 배열로 반환
	bitDaysToArray = (days) => {
		let self = this;

		let _classDayBit = days ? self._zeroFill(days.toString(2), 7).split('').reverse().join('') : '0000000';

		let _daysArray = [];
		let _day = ['월','화','수','목','금','토','일']; //요일배열만들기
		for(let bt = 0; bt < 7; bt++) { 
			if(_classDayBit.charAt(bt) == "1") {
				_daysArray.push(_day[bt]);
			}
		}

		return _daysArray;
	}
	

	createArguments = () => {
		// let hash = location.hash;
		let hash = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		if ( hash.length < 2 )
		{
			return {};
		}
		hash = hash.substring(1);
		let list = hash.split('&');
		let args = {};
		for( let i = 0 ; i < list.length; i++ )
		{
			let v = list[i].split('=');
			args[v[0]] = v[1];
		}
		return args;
	}

	isEqual = (arg) => {
		let val = arg[0], equal = true;
		for (let i = 0; i < arg.length; i++) {
			equal = (arg[i] === val);
			if (!equal) return false;
		}
		return equal;
	};

	showLoading = () => {
		$("#spinnerWrap").show();
	};

	hideLoading = () => {
		$("#spinnerWrap").hide();
	};

	showSpinner = (t,m) => {
		$(t).empty().append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'+m);
	}

	isSpinner = (t,m) => {
		return $(t).find('.spinner-border').length;
	}

	hideSpinner = (t,m) => {
		$(t).empty().append(m);
	}

	openWin = (aClass)  => {
		$("."+aClass).show();
		$("."+aClass+" .popup").center();
	};

	openTopWin = (aClass)  => {
		$("."+aClass).show();
	};

	closeWin = (aClass)  => {
		$("."+aClass).hide();
	};

	imageExists = (url, callback) => {
	  let img = new Image();
	  img.onload = () => { callback(true); };
	  img.onerror = () => { callback(false); };
	  img.src = url;
	};

	hashchange = ( hash ) => {
		location.hash = hash;
	};

	retrieveHash = (  ) => {
		let hash = window.location.hash.slice(1);
		let array = hash.split("&");

		let values, form_data = {};

		for (let i = 0; i < array.length; i += 1) {
			values = array[i].split("=");
			form_data[values[0]] = values[1];
		}
		return form_data
	};

	getActiveContentWidth = () => {
		return  $.mobile.activePage.find("div[data-role='content']:visible:visible").outerWidth();
	};

	checkNetConnection = ( cbfunc ) => {
		r=Math.round(Math.random() * 10000);
		$.get("http://"+window.location.host+"/images/chkimg.png",{subins:r},function(d){
			cbfunc(true);
		}).error(function(){
			cbfunc(false);
		});
		 // return false;
	};

	getMousePoint = (event)  => {
	    let e = event || window.event;
	    if(e.pageX || e.pageY){
	        return {x:e.pageX, y:e.pageY};
	    }
	    return {
	        x:e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
	        y:e.clientY + document.documentElement.scrollTop  - document.documentElement.clientTop
	    };
	};

	getDoc = (frame) => {
		let doc = null;

		// IE8 cascading access check
		try {
		 if (frame.contentWindow) {
			 doc = frame.contentWindow.document;
		 }
		} catch(err) {
		}

		if (doc) { // successful getting content
		 return doc;
		}

		try { // simply checking may throw in ie8 under ssl or mismatched protocol
		 doc = frame.contentDocument ? frame.contentDocument : frame.document;
		} catch(err) {
		 // last attempt
		 doc = frame.document;
		}
		return doc;
	};

	getCreateFilename = (filename, instr)  => {
		let _fileLen = filename.length;
		let _lastDot = filename.lastIndexOf('.');

		let _fileName = filename.substring(0, _lastDot);
		let _fileExt = filename.substring(_lastDot, _fileLen);

		return _fileName+"_"+instr+_fileExt;
	};

	get_version_of_IE = ()  => {

		 let word;
		 let version = "N/A";

		 let agent = navigator.userAgent.toLowerCase();
		 let name = navigator.appName;

		 // IE old version ( IE 10 or Lower )
		 if ( name == "Microsoft Internet Explorer" ) word = "msie ";

		 else {
			 // IE 11
			 if ( agent.search("trident") > -1 ) word = "trident/.*rv:";

			 // Microsoft Edge
			 else if ( agent.search("edge/") > -1 ) word = "edge/";
		 }

		 let reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );

		 if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2;

		 return version;
	};

	checkBrowser = ()  => {
		const self = this;

		// jquery 1.9 이상에서는 삭제된 명령어로 아래 코드를 추가해야 함.
		// http://code.jquery.com/jquery-migrate-1.3.0.min.js
		let reg_id = /msie|mozilla|safari|chrome/;
		let _object = {
						browser: '',
						version: '',
						webkit: false
					};

		$.each( $.browser, function( i, val ) {

			if(reg_id.test(i)) _object.browser = i;
			if(i == 'version') {

				if(_object.browser == "msie") {
					_object.version = self.get_version_of_IE();
				} else {
					_object.version = val;
				}


			}

			if(i == 'webkit') _object.webkit = val;
		});

		return _object;
	};

	createKeyVal = (filterKey,filterValue) => {
		let object = {};
			object[filterKey] =filterValue;
			return object;
	};

	crossDomainAjax = (url, successCallback)  => {
	    // IE8 & 9 only Cross domain JSON GET request
	    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

	        let xdr = new XDomainRequest(); // Use Microsoft XDR
	        xdr.open('get', url);
	        xdr.onload = () => {
	            let dom  = new ActiveXObject('Microsoft.XMLDOM'),
	                JSON = $.parse(xdr.responseText);

	            dom.async = false;

	            if (JSON == null || typeof (JSON) == 'undefined') {
	                JSON = $.parse(data.firstChild.textContent);
	            }

	            successCallback(JSON); // internal function
	        };

	        xdr.onerror = () => {
	            _result = false;
	        };

	        xdr.send();
	    }
	};

	captureReturnKey = (e)  => {
		if(e.keyCode==13 && e.srcElement.type != 'textarea')
	    return false;
	};

	// 쿠키생성
	setCookie = (cName, cValue, cDay)  => {
		let expire = new Date();
		expire.setDate(expire.getDate() + cDay);
		cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
		if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
		document.cookie = cookies;
	};

	// 쿠키 가져오기
	getCookie = (cName)  => {
		cName = cName + '=';
		let cookieData = document.cookie;
		let start = cookieData.indexOf(cName);
		let cValue = '';
		if(start != -1){
			start += cName.length;
			let end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cValue = cookieData.substring(start, end);
		}
		return unescape(cValue);
	};

	dimOpen = (mydim,cbfunc) => {
		$("#" + mydim).show();
		$("#" + mydim + "> .popUpWrap").css({"top":"50%","margin-top":-($("#" + mydim + "> .popUpWrap").height()/2)});
		cbfunc = cbfunc?cbfunc:function(){};
		cbfunc();
	};

	dimClose = (myDim,cbfunc) => {
		$('#'+myDim).fadeOut(500, function(){
			cbfunc();
		});
	}

	_encryptstring = (data) => {
		if (window.btoa) {
			return window.btoa(encodeURIComponent(data));
		} else {
			return jQuery.base64.encode(encodeURIComponent(data));
		}
	};

	_decryptstring = function(data)
	{
		let result = '';
		try{
			if (window.atob) {
				result = decodeURIComponent(window.atob(data));
			} else {
				result = decodeURIComponent(jQuery.base64.decode(data));
			}
			return result;
		} catch (err) {
			if (window.atob) {
				result = unescape(window.atob(data));
			} else {
				result = unescape(jQuery.base64.decode(data));
			}
		}
	};

	/**
	 * 암호화모듈
	 * @param {*} plainText 
	 * @param {*} encKey 
	 * @returns 
	 */
	_encrypt = function(plainText,encKey)
	{
		const encryptedData = CryptoJS.AES.encrypt(plainText, encKey, {
			format: {
			  stringify: function (cipherParams) {
				return JSON.stringify({
				  ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
				  iv: cipherParams.iv.toString(),
				  s: cipherParams.salt.toString(),
				});
			  },
			  parse: function (jsonStr) {
				const jsonObj = JSON.parse(jsonStr);
				const cipherParams = CryptoJS.lib.CipherParams.create({
				  ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
				  iv: CryptoJS.enc.Hex.parse(jsonObj.iv),
				  salt: CryptoJS.enc.Hex.parse(jsonObj.s),
				});
				return cipherParams;
			  },
			},
		  });
  
		  const encryptedText = encryptedData.toString();
		  const words = CryptoJS.enc.Utf8.parse(encryptedText);
		  return CryptoJS.enc.Base64.stringify(words);
	};

	/**
	 * 복호화 모듈
	 * @param {*} cryptoData 
	 * @param {*} encKey 
	 * @returns 
	 */
	_decrypt = function(cryptoData,encKey)
	{
		const plainText = CryptoJS.enc.Base64.parse(cryptoData);
        const encryptedText = CryptoJS.enc.Utf8.stringify(plainText);
		const decryptedData = CryptoJS.AES.decrypt(encryptedText, encKey, {
			format: {
			stringify: function (cipherParams) {
				return JSON.stringify({
				ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
				iv: cipherParams.iv.toString(),
				s: cipherParams.salt.toString(),
				});
			},
			parse: function (jsonStr) {
				const jsonObj = JSON.parse(jsonStr);
				const cipherParams = CryptoJS.lib.CipherParams.create({
				ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
				iv: CryptoJS.enc.Hex.parse(jsonObj.iv),
				salt: CryptoJS.enc.Hex.parse(jsonObj.s),
				});
				return cipherParams;
			},
			},
		});
		return decryptedData.toString(CryptoJS.enc.Utf8);
	};

	/**
	 * 암호화 키 전달시 사용(로그인 후)
	 * @param {*} plaintText 
	 * @param {*} encKey 
	 * @returns 
	 */
	_encryption = function(plaintText,encKey)
	{
		const key = CryptoJS.enc.Utf8.parse(encKey);
		const iv = CryptoJS.lib.WordArray.random(16);
		const cipherText = CryptoJS.AES.encrypt(plaintText, key, { iv: iv });
		const ivCipherText = iv.clone().concat(cipherText.ciphertext);
		return CryptoJS.enc.Base64.stringify(ivCipherText);
	}

	// JSON decode
	jsonDecode = function(_data)
	{
		let returnData = _data;
		if(_data===null || _data === undefined || _data == 'undefined' || _data=='' ){
			returnData = null;
		} else {
			try {
			if(typeof _data === 'string') {
				returnData = JSON.parse(_data)
			} else {
				returnData = _data;
			}
			} catch(e) {
			returnData = _data;
			}
		}
		return returnData;
	}


	_htmlEscape = (s) => {
	    return s
	      .replace(/&/g, '&amp;')
	      .replace(/</g, '&lt;')
	      .replace(/>/g, '&gt;');
  	};

	msieversion = ()  => {
	    let ua = window.navigator.userAgent;
	    let msie = ua.indexOf('MSIE ');
	    if (msie > 0) {
	        // IE 10 or older => return version number
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	    }

	    let trident = ua.indexOf('Trident/');
	    if (trident > 0) {
	        // IE 11 => return version number
	        let rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	    }

	    let edge = ua.indexOf('Edge/');
	    if (edge > 0) {
	       // Edge (IE 12+) => return version number
	       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	    }

	    // other browser
	    return false;
	}

	nl2br = () => (str, is_xhtml)  => {
	  let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

	  return (str + '')
		.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

	substringMatcher = (str) => {
		return function findMatches(q, cb) {
		    let matches, substringRegex;

		    // an array that will be populated with substring matches
		    matches = [];

		    // regex used to determine if a string contains the substring `q`
		    substrRegex = new RegExp(q, 'i');

		    // iterate through the pool of strings and for any string that
		    // contains the substring `q`, add it to the `matches` array
		    $.each(strs, function(i, str) {
		      if (substrRegex.test(str.value)) {
		        matches.push(str);
		      }
		    });

		    cb(matches);
	  	};
	}

	sumarray = (arr) => {
		let result = 0;
		for (let i = 0; i < arr.length; i++) {
		    result += Number(arr[i])
		}
		return result;
	}

	removeA = (arr,...rest) => {
	    let what, a = rest, L = a.length, ax;
	    while (L > 1 && arr.length) {
	        what = a[--L];
	        while ((ax= arr.indexOf(what)) !== -1) {
	            arr.splice(ax, 1);
	        }
	    }
	    return arr;
	}

	bytesToSize = (bytes) => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
		if (bytes === 0) return 'n/a'
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
		if (i === 0) return `${bytes} ${sizes[i]})`
		return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
	}

	globalDiscountPrice = (globalevents,saleprice) => {
    	let gdiscountprice = 0;
    	for(let g in globalevents) {
			if(globalevents[g].discount>0 )
			{
				if(globalevents[g].discounttype==2)
				{
				 	gdiscountprice += globalevents[g].discount;
				}

				if(globalevents[g].discounttype==3)
				{
				 	gdiscountprice += (saleprice*(globalevents[g].discount/100));
				}
			}
		}

		return gdiscountprice;
    }

    globalSavePoint = (globalevents,saleprice) => {
    	let gdiscountprice = 0;
    	for(let i in globalevents) {
			if(globalevents[i].point>0 )
			{
				if(globalevents[i].pointtype==2)
				{
				 	gdiscountprice += globalevents[i].point;
				}

				if(globalevents[i].pointtype==3)
				{
				 	gdiscountprice += (saleprice*(globalevents[i].point/100));
				}
			}
		}

		return gdiscountprice;
    }

	shuffle = (_array)  => {
		for (let i = 0; i < _array.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			// [array[i], array[j]] = [array[j], array[i]];
			const x = _array[i];
			_array[i] = _array[j];
			_array[j] = x;
		  }
		  return _array;
	}

	rndExtraction = (arrayparam) => {
		let sValue = arrayparam; // ["one", "two", "three", "four", "five"];
		let sPick = Math.floor(Math.random() * sValue.length);
		
		return sPick;
	}

	/**
	 * 
	 * @param {*} size size ( sm,md,lg,xl )
	 * @param {*} cbfunc callback function
	 * @returns 
	 */
	createModal = (size=null,title='') => {
		const self = this;
		let cntModal = $('.modal').length;
		let _uuid = 'm_'+self._createUUID();
		let $modal = $( $('#tmpModal').html() ).attr('id',_uuid);
			$modal.css('z-index',1055+(cntModal*2));
			
			$('.modal-title',$modal).text(title);

			if(size) {
				$modal.addClass('modal-'+size);
			}
			
			$modal.appendTo('body');
		return _uuid;
	}

	/**
	 * 
	 * @param {*} size size ( sm,md,lg,xl )
	 * @param {*} cbfunc callback function
	 * @returns 
	 */
	 instanceModal = (_modalEl,_fnshow,_fnhide) => {
        const myModal = new bootstrap.Modal(_modalEl, {
            keyboard: false
        });

		_fnshow = typeof _fnshow!='function'?function(){}:_fnshow;
		_fnhide = typeof _fnhide!='function'?function(){}:_fnhide;

        _modalEl.addEventListener('hidden.bs.modal', event => {
            $(event.target).remove();
			_fnhide()
        });

		_modalEl.addEventListener('shown.bs.modal', event => {
			let zindex = Number($(event.target).css('z-index'));
			$(event.target).next().css('z-index',zindex-1);
			_fnshow(event);
		});
		return myModal;
	}

	/**
	 * 전화번호 - 넣기
	 */

	autoHyphen = (target) => {
		var test = target;
  		return test.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	}

	clearHyphen = (target) => {
		return target.replace(/\-/g,'');
	}

	aorb = (a,b) =>{
		return a?'<span class="text-danger">'+a+'</span>':b
	}

	serializeObject = (e) => {
		let o = {};
		/**
		 * arrProperity는 checkbox 체크시 동일한 이름이 있을경우 array object로 만들어서 리턴해 준다.
		 */
		let arrProperity = {};


		let arrName = new Array();
		var regExp = /^0[0-9].*$/;

		$('INPUT, SELECT, TEXTAREA',e).each(function(idx) {
			let obj = this;
			// let frmType = $(obj).get(0).tagName;
			let frmIType = $(obj).prop('type');
			let frmName = $(obj).prop('name');
			let frmVType = $(obj).attr('vtype');
			let isDate = $(obj).hasClass("date")
			//console.log($(obj).hasClass("date"));

			/**
			 * requirevalue가 있는경우 비어있는 값은 undefined로 설정한다.
			 */
			let requirevalue = $(obj).attr('requirevalue');


			let divchar =  $(obj).attr('divchar')||'';
			let disabled = $(obj).is(':disabled');
			let value = $(obj).val();
			if(frmVType == "num") value = value.replace(/,/g,'');
			
			// 0으로 시작하는 String
			
			if(frmIType=='number') {
				value = Number(value);
			} else {
				if(!regExp.test(value)) {
					value = $.isNumeric(value) ? Number(value): value;
				} else {
					value = (value)?value.toString():value;
				}
			}
			if(isDate){
				//console.log('start :'+ value)
				value = value.replace(/-/g,'');
				//console.log('end :'+ value)
			} 

			arrName.push(frmName);
			// console.log(frmName,value);

			/**
			 * checkbox는 다중 선택이므로 array로 변환하기위해 stack에 저장한다.
			 */
			if ( frmIType == 'checkbox' ){ 
				// divchar = '|';
				if($(obj).prop('checked') !== true) {
					if(requirevalue !== undefined && o[frmName] === undefined) {
						o[frmName] = '';
					}
					return true;
				} else {
					if(!arrProperity[frmName]) {
						arrProperity[frmName] = new Array();
						arrProperity[frmName].push(value);
					} else {
						if(arrProperity[frmName].indexOf(frmName) === -1) {
							arrProperity[frmName].push(value);
						}
					}
				}

				return true;
			}

			/**
			 * radio 박스의 경우 checked가 하나만 존재하므로 체크되지 않은것을 패스 한다.
			 */
			if ( frmIType == 'radio' ){ 
				if($(obj).prop('checked') == true) {
					o[frmName] = value
				}
				return true;
			}
			
			/**
			 * 이름이 존재하고 disabled 프로퍼티가 없을경우 
			 * array에 같은 이름이 존재할 경우 divchar 합쳐준다.
			 */
			if (frmName !== undefined && !disabled) {
				if(arrName.indexOf(frmName) > -1 && o[frmName]) {
					if(value !== undefined ) {
						o[frmName] += (divchar+''+value);
					}
				} else {
					if(requirevalue !== undefined ) {
						// if(value !== undefined ) {
							o[frmName] = value||undefined;
						// }
					} else {
						o[frmName] = value;
					}
				}
			}
			arrName.push(frmName);
		});

		// console.log(o,arrProperity);
		for(let i in arrProperity) {
			if(typeof arrProperity[i]=='object') {
				o[i] = JSON.stringify(arrProperity[i]);
			}
		}
		arrName.length = 0;
		arrProperity.length = 0;
		return o;
	}
	isEmailcheck = (val) => {
		if(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/.test(val)) {
			return true;
		  } else {
			return false;
		  }
	}
	validDateString = (s) => {
		const match = s.match(/^(\d{4})(\d\d)(\d\d)$/);
		let validate = false;
		if (match) {
		  const [year, month, day] = match.slice(1);
		  const iso = `${year}-${month}-${day}T00:00:00.000Z`;
		  const date = new Date(Date.UTC(year, month - 1, day));
		  validate = date.toISOString() === iso;
		}
	  
		if(validate) {
		  return true;
		} else {
		  const regex = /^\d{4}-\d{2}-\d{2}$/;
	  
			if (s.match(regex) === null) {
			  return false;
			}
		  
			const date = new Date(s);
		  
			const timestamp = date.getTime();
		  
			if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
			  return false;
			}
		  
			validate = date.toISOString().startsWith(s);
		}
	  
		return validate;
	}

	makeOID = () => {
		let ToDay = new Date();
		let Year = ToDay.getFullYear();
		let Month = ("0" + (ToDay.getMonth() + 1)).slice(-2);
		let Day = ("0" + ToDay.getDate()).slice(-2);
		let Hour = ("0" + ToDay.getHours()).slice(-2);
		let Minute = ("0" + ToDay.getMinutes()).slice(-2);
		let Seconds = ("0" + ToDay.getSeconds()).slice(-2);
		let MilliSeconds = ToDay.getMilliseconds();
		let RandomNum = Math.floor(Math.random() * 100);

		return Year + Month + Day + Hour + Minute + Seconds + MilliSeconds + RandomNum;
	}

	getPermission = (_access,_permit) => {
        let permit = 0;
        for(let i=0;i<_permit.length;i++){
            switch(_permit[i]){
                case 'R': //보기
                    permit += ((_access&1)>0?1:0)
                    break;
                case 'W': //수정
                    permit += ((_access&2)>0?1:0)
                    break;
                case 'D': //삭제
                    permit += ((_access&4)>0?1:0)
                    break;
                case 'L': //개인정보(목록)
                    permit += ((_access&8)>0?1:0)
                    break;
                case 'A': //개인정보(상세)
                    permit += ((_access&16)>0?1:0)
                    break;
                case 'P': //결제
                    permit += ((_access&32)>0?1:0)
                    break;
                case 'E': //다운로드
                    permit += ((_access&64)>0?1:0)
                    break;
            }
        }
        return permit;
    }
	
	strToNum = (_val,_set=undefined) => {
		if(_val===null || _val===undefined || _val==='') {
			_val = _set;
		} else {
			let arrVal = _val.match(/\d/g);
			_val = (arrVal && arrVal.length>0)?Number(arrVal.join('')):_set;
		}

		return _val;
	}

	concatObjToString = (_data,_key) => {
		let result = new Array();
		for(let i in _data) {
			result.push(_data[i][_key]);
		}
		return result.join(',');
	}

	// JSON 문자열인지 판단하는 함수
	parseJSONString = (str) => {
		try {
				const parsed = JSON.parse(str);
				if (typeof parsed === 'object' && parsed !== null) {
						return parsed;
				} else {
						return undefined;
				}
		} catch (e) {
				return undefined;
		}
	}

	//리스트 페이지
	mdiPaging = ($objPage,total,pagesize,totalpage,pageblock,page,func) => {
		$objPage.unbind("click");
		$objPage.empty();
		var strPage = "";
		if($objPage.length>0 && total != "0"){
			page = (isNaN(page)?1:(page<1?1:page));
			var startPage = parseInt((page-1)/pageblock)*parseInt(pageblock)+1;
			var first = '<a href="javascript:;" actCmd="1">처음</a>' ;
			var prev = '<a href="javascript:;" actCmd="'+((page>1)?(page-1):1)+'">이전</a>';
			var next = '<a href="javascript:;" actCmd="'+((page-0)+1)+'">다음</a>';
			var end = '<a href="javascript:;" actCmd="'+totalpage+'">마지막</a>';

			if (page>1) strPage = first + "&nbsp;";
			if (page>1) strPage += prev + "&nbsp;&nbsp;";

			for (let i=startPage; i<startPage+pageblock*1; i++ ){
				strPage += '<a href="javascript:;" '+ ((page==i)?'class="now"':'')+' actCmd="'+i+'">' + i + '</a>&nbsp;';
				if (i>=totalpage) break;
			}
			if (page<totalpage) strPage += "&nbsp;" + next + "&nbsp;";
			if (page<totalpage) strPage += end;
		}
		$objPage.html(strPage);
		$objPage.on("click","a",function(){
			var goPage = $(this).attr("actCmd");
			
			if(func!=undefined){
				func(goPage);
			}
		});
		this.tableScrollCheck();
	}
	processStatus = (kind,cd) =>{
		const processStauts = {"nm":{"A":"대기","B":"진행중","C":"중지","D":"완료"},"color":{"A":"","B":"#bfe2ff","C":"#f1d5bcbf","D":"#d4f19c"}};
		return (processStauts[kind][cd]==undefined)?'':processStauts[kind][cd];
	};

	tbodyMerge = ($tbody, indexs, key) => {
		let info = {};
		let trs = $('tr',$tbody);
		let keys = (key != undefined) ? key.split(','):[];
		let beferTr = null; 
		for(let r=(trs.length-1);r>=0;r--){
			let nowTr = $(trs[r]);
			let d = '';
			for(let i=0;i<keys.length;i++){
				let v = nowTr.find('[name='+keys[i]+']').val();
				if(v != undefined && v!='') d +=((d!='')?',': '')+v;
			}			
			if(beferTr==null){
				for(let t=0;t<indexs.length;t++){	
					info[indexs[t]] = 1;
					let style = $(nowTr.children()).eq(indexs[t]).attr('style');
					$(nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'border-right:1px solid #dedede ;');
				}
				
			}else{
				let beferD = '';  //beferTr.find('[name='+key+']').val();
				for(let i=0;i<keys.length;i++){
					let v = beferTr.find('[name='+keys[i]+']').val();
					if(v != undefined && v!='') beferD +=((beferD!='')?',': '')+v;
				}	
				for(let t=(indexs.length-1);t>=0;t--){	
					let style = $(nowTr.children()).eq(indexs[t]).attr('style');
					$(nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'border-right:1px solid #dedede ;');
					if(d == beferD &&  $(beferTr.children()).eq(indexs[t]).html() == $(nowTr.children()).eq(indexs[t]).html()){
						$(nowTr.children()).eq(indexs[t]).attr("rowspan",info[indexs[t]]+1);
						$(beferTr.children()).eq(indexs[t]).remove();
						info[indexs[t]]++;
					}else{
						info[indexs[t]] = 1;
						
					}
				}
			}
			beferTr = $(trs[r]);
		}

		let bgColor = ['#ffffff','#f7f7f7'];
		let colorCnt = 0;
		let thisRow = 0;
		let maxTdCnt = 0;
		for(let i=0;i<trs.length;i++){
			let nowTr = $(trs[i]);
			if(nowTr.children().length > maxTdCnt) maxTdCnt = nowTr.children().length;
		}
		for(let i=0;i<trs.length;i++){
			let nowTr = $(trs[i]);
			let tdCnt = nowTr.children().length;
			if(tdCnt == maxTdCnt)	colorCnt++;
			//console.log(colorCnt)
			//console.log('background-color :'+ bgColor[colorCnt % 2] + ' !important')

			let $tds = $('td',nowTr);
			for(let t=0;t<$tds.length;t++){
				let $td = $($tds[t])
				let style = $td.attr('style');
				if(style==undefined) style = '';
				style += 'background-color :'+ bgColor[colorCnt % 2] + ' ';
				$td.attr('style', style);
			}
		}
	}
	tbodyUnMerge = ($tbody, indexs, key) => {
		let info = {};
		let trs = $('tr',$tbody);
		let beferTr = null; 
		let tdCnt = $(trs[0]).find("td").length;
		for(let r=0;r <trs.length;r++){
			let nowTr = $(trs[r]);
			if(beferTr==null){
				for(let t=0;t<indexs.length;t++){	
					$(nowTr.children()).eq(indexs[t]).removeAttr('rowspan');
				}
			}else{
				let beferTds = beferTr.find("td");
				let nowTdCnt = nowTr.children().length
				for(let i=0;i<(nowTr.children().length);i++){$(nowTr.children()).eq(i).removeAttr('rowspan');}
				for(let i=0;i<(tdCnt - nowTdCnt);i++){	nowTr.prepend($('<td/>'));	}
				let $tds = nowTr.find("td");
				for(let i=0;i<$tds.length;i++){
					let width = $(beferTds[i]).attr("width");
					//console.log(i + "/"+ width);
					if(width != undefined && width == "0px"){
						$($tds[i]).hide().attr("width",width);
					}
				}
			}
			beferTr = $(trs[r]);
		}
	}
	tbodyOnlyMerge = ($tbody, indexs, key) => {
		let info = {};
		let trs = $('tr',$tbody);
		let beferTr = null; 
		for(let r=(trs.length-1);r>=0;r--){
			let nowTr = $(trs[r]);
			let d = nowTr.find('[name='+key+']').val();
			
			if(beferTr==null){
				for(let t=0;t<indexs.length;t++){	
					info[indexs[t]] = 1;
				}
			}else{
				let beferD = beferTr.find('[name='+key+']').val();
				for(let t=(indexs.length-1);t>=0;t--){	
					if(d == beferD &&  $(beferTr.children()).eq(indexs[t]).text() == $(nowTr.children()).eq(indexs[t]).text() && $(nowTr.children()).eq(indexs[t]).text() != ''){
						$(nowTr.children()).eq(indexs[t]).attr("rowspan",info[indexs[t]]+1);
						$(beferTr.children()).eq(indexs[t]).remove();
						info[indexs[t]]++;
					}else{
						info[indexs[t]] = 1;
					}
				}
			}
			beferTr = $(trs[r]);
		}
	}
	fullScreen = (_code) =>{
		if (document.fullscreenElement) {
			document.exitFullscreen();
			return;
		  }
		  let a = $("#"+ _code.attr("id"));
		  a.css('background-color','#fff');
		  //let b = $(a).closest(".innerConWrap");
		  //b.requestFullscreen();
		  document.querySelector("#"+_code.attr("id")).closest(".innerConWrap").requestFullscreen();
		  
	}
/*
	serializeDiv = (Obj) => {
		var param = $(Obj).find("input:not([type=checkbox]),select,textarea").serialize();
		var check = $(Obj).find("input[type=checkbox]"); 
		for(var i=0;i<check.length;i++){
			var c = $(check[i]);
			if(c.is(":checked")) param+="&"+c.attr("name") +"="+c.val();
		}
	   return param
	};
	serializeTbody = (Obj,arrayName,excludes) => {
	   var trs = $(Obj).children("tr");
	   var param = "";
	   var exclude = excludes==undefined ? undefined: excludes.split(",");
	   var trCnt = trs.length;
	   for(var i=0;i<trCnt;i++){
		   var tr = $(trs[i]);
		   var data = tr.data("ROW");
		   var pass = false;
		   if(exclude != undefined){
			   for(var j=0;j<exclude.length;j++){
				   if(exclude[j] == "last" && i == (trCnt-1)){	pass = true;}
				   else if(exclude[j] == "first" && i == 0){ pass = true;}
				   else if(exclude[j] == i){ pass = true;}
			   }
		   }
		   if(pass) continue;
		   var fields = tr.find("input,select,textarea").serializeArray();
		   for(var j=0;j<fields.length;j++){
			   if(data == undefined){
				   param +="&"+arrayName+"["+i+"]."+fields[j].name +"="+ fields[j].value;
			   }else{
				   param +="&"+arrayName+"["+i+"]."+fields[j].name +"="+ ((data[fields[j].name] == undefined) ? fields[j].value : data[fields[j].name]);
			   }
		   }
	   }
	   return param.substring(1);
	};

	serializeTable = (Obj,arrayName) =>{
	   var trs = $(Obj).find("tr");
	   var param = "";
	   var trCnt = trs.length;
	   var index = 0;
	   for(var i=0;i<trCnt;i++){
		   var tr = $(trs[i]);
		   var fields = tr.find("input,select,textarea").serializeArray();
		   for(var j=0;j<fields.length;j++){
			   param +="&"+arrayName+"["+index+"]."+fields[j].name +"="+ fields[j].value;
		   }
		   if(fields.length>0) index++;
	   }
	   return param.substring(1);
	};
*/	
	unSerializeObject = (e,data) =>{
		let self = this;
		let o = {};
		/**
		 * arrProperity는 checkbox 체크시 동일한 이름이 있을경우 array object로 만들어서 리턴해 준다.
		 */
		let arrProperity = {};


		let arrName = new Array();
		var regExp = /^0[0-9].*$/;

		$('INPUT, SELECT, TEXTAREA',e).each(function(idx) {
			let obj = this;
			let frmTag = $(obj).get(0).tagName;
			let frmIType = $(obj).prop('type');
			let frmName = $(obj).prop('name');
			let frmVType = $(obj).attr('vtype');
			if(data[frmName] !== undefined){
				let v = data[frmName];
				if(v == undefined) return;
				if (frmIType == 'checkbox' ){ 
					let value = $(obj).val();
					if(value == v){ $(obj).prop('checked',true)}
				}else if ( frmIType == 'radio' ){ 
					let value = $(obj).val();
					if(value == v){ $(obj).prop('checked',true)}
				}else{
					if($(obj).hasClass("date")) v = self.dateformatStringToDate(v);
					$(obj).val(v);
				}
			}
	  });
	}
	unSerializeObjectReadOnly = (e,data) =>{
		let self = this;
		let o = {};
		/**
		 * arrProperity는 checkbox 체크시 동일한 이름이 있을경우 array object로 만들어서 리턴해 준다.
		 */
		let arrProperity = {};


		let arrName = new Array();
		var regExp = /^0[0-9].*$/;

		$('INPUT, SELECT, TEXTAREA',e).each(function(idx) {
			let obj = this;
			$(obj).prop("readonly",true);
			$(obj).addClass("readonly");
			let frmTag = $(obj).get(0).tagName;
			let frmIType = $(obj).prop('type');
			let frmName = $(obj).prop('name');
			let frmVType = $(obj).attr('vtype');
			
			if(data[frmName] !== undefined){
				let v = data[frmName];
				if(v == undefined) return;
				if (frmIType == 'checkbox' ){ 
					let value = $(obj).val();
					if(value == v){ $(obj).prop('checked',true)}
				}else if ( frmIType == 'radio' ){ 
					let value = $(obj).val();
					if(value == v){ $(obj).prop('checked',true)}
				}else{
					if($(obj).hasClass("date")) v = self.dateformatStringToDate(v);
					$(obj).val(v);
				}
			}
			if(frmTag == "SELECT") $(obj).prop("disabled",true);
	  });
	}
	customConfirm = (message, callback) => {
        Swal.fire({
			title: message,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '삭제',
			cancelButtonText: '취소'
		}).then((result) => {
			if (result.isConfirmed) {
		  cbfunc(true);
		} else if (result.isDismissed) {
		  cbfunc(false);
		}
		});
    }
	getOnlyNumber = (str) =>{
		const type = typeof str;
		if( type == "string") str = str.replace(/[^0-9.-]/g, ""); 
		return str;
	}
	filterJsonRemoveNull = (json) => {
		let keys = Object.keys(json);
		for(let i=0;i<keys.length;i++){
			if(json[keys[i]] == undefined || json[keys[i]] == null) delete json[keys[i]];
		}
		return json;
	}
	tableScrollCheck = (args) =>{
		var tableScroll = undefined;
		if (args != undefined){
			if(typeof args == "object"){
				if($(args).hasClass("tablScrollDisplay")){
					tableScroll = args;
				}else{
					var tag = $(args).localName;
					var div = undefined;
					if(tag == "div"){
						div = $(args)
					}else{
						div = $(args).closest("div")
					}
					tableScroll = div.parent().find(".tablScrollDisplay");
				}
	
			}
		}
	/*	
		if (tableScroll == undefined && postgood!=undefined){
			tableScroll = postgood.activeMenu.body != undefined ? postgood.activeMenu.body.find(".tablScrollDisplay") : undefined;
		}
	*/	
		if (tableScroll == undefined){
			tableScroll = $(".tablScrollDisplay");
		}
		if (tableScroll == undefined) return;
		$(tableScroll).each(function(){
			var colgroup = $(this).children("colgroup");
			var thead = $(this).children("thead").children("tr");
			var nextDiv = $(this).next();
			var nextTable = nextDiv.children("table");
			var rowsCnt = 0;
			var th = null;
			var scrollWidth = 8;
			
			var footTable = undefined;
			try{
				
				if (nextDiv.next() > 0 && nextDiv.next().get(0).tagName == "TABLE"){
					footTable = nextDiv.next();
				}else if(nextDiv.parent().next().length > 0 && nextDiv.parent().next().get(0).tagName == "TABLE"){
					footTable = nextDiv.next();
				}else{}
				
			}catch(e){
				console.log("tableScrollCheck  ERROR");
				console.log(e);
			}
			var footColgroup = (footTable!=undefined) ? footTable.children("colgroup"):undefined;
			var tfoot = (footTable!=undefined) ? footTable.children("tfoot").children("tr"):undefined;
	
			
			$(this).width(nextDiv.width());
			var width = $(this).width();
			if(nextDiv.height() < nextTable.height()){
				nextTable.addClass("tableScrollOnTbody");
				if($(this).width()>$(nextTable).width()){
					for(var i=0;i<thead.length;i++){
						th = $("th:last",$(thead[i]));
						if(rowsCnt >= i){
							var colspan = 0;
							if(th.attr("orgColspan")==undefined){
								colspan = th.attr("colspan")==undefined?1:th.attr("colspan");
								th.attr("orgColspan",colspan++);
								th.attr("scroll","Y").attr("colspan",colspan);
							}
							if(th.attr("rowspan") != undefined){
								rowsCnt = rowsCnt + (th.attr("rowspan")-0);
							}else{
								rowsCnt++;
							}
							// foot 
							if(tfoot!=undefined){
								var fth = $("th:last",$(tfoot[i]));
								if(fth.attr("orgColspan")==undefined){
									colspan = fth.attr("colspan")==undefined?1:fth.attr("colspan");
									fth.attr("orgColspan",colspan++);
									fth.attr("scroll","Y").attr("colspan",colspan);
								}
							}
						}
					}
					if($('col[scroll=Y]',colgroup).length == 0) $('<col scroll="Y">').attr("width",scrollWidth).appendTo(colgroup);
					var cols =  $('col:not([scroll=Y])',colgroup);
					var fcols =  (footColgroup!=undefined) ? $('col:not([scroll=Y])',footColgroup):undefined;
					if(fcols!=undefined){
						if($('col[scroll=Y]',footColgroup).length == 0) $('<col scroll="Y">').attr("width",scrollWidth).appendTo(footColgroup);	
					}
					for(var i =0;i<cols.length;i++){
						var col = $(cols[i]);
						var w = col.attr("width");
						if(w.indexOf("%") == -1){
							if(col.attr("orgWidth") != undefined){
								w = col.attr("orgWidth");
							}else{
								w = col.attr("width");
								col.attr("orgWidth",w);
							}
							if(w.indexOf("%") >= 0){
								w = w.replace("%","");
								col.attr("width",(((width-scrollWidth)*w)/100).toFixed(2));
								// foot
								if(fcols!=undefined){
									$(fcols[i]).attr("width",(((width-scrollWidth)*w)/100).toFixed(2));
								}
							}
						}
					}
	
				}
	
			}else{
				nextTable.removeClass("tableScrollOnTbody");
				for(var i=0;i<thead.length;i++){
					th = $("th[scroll=Y]",$(thead[i]));
					var colspan = th.attr("colspan");
					if(th.attr("orgColspan")!=undefined){
						th.attr("colspan",th.attr("orgColspan"));
						th.removeAttr("orgColspan");
						if(colspan == "2")	th.removeAttr("colspan");
					}
					th.removeAttr("scroll");
					// foot 
					if(tfoot!=undefined){
						var fth = $("th[scroll=Y]",$(tfoot[i]));
						colspan = fth.attr("colspan");
						if(fth.attr("orgColspan")!=undefined){
							fth.attr("colspan",fth.attr("orgColspan"));
							fth.removeAttr("orgColspan");
							if(colspan == "2")	fth.removeAttr("colspan");
						}
						fth.removeAttr("scroll");
					}
				}
				var cols =  $('col:not([scroll=Y])',colgroup);
				var fcols =  (footColgroup!=undefined) ? $('col:not([scroll=Y])',footColgroup):undefined;
				for(var i =0;i<cols.length;i++){
					var col = $(cols[i]);
					if(col.attr("orgWidth")!=undefined){
						col.attr("width",col.attr("orgWidth"));
						col.removeAttr("orgWidth");
						//foot
						if(fcols!=undefined){
							var fcol = $(fcols[i]); 
							fcol.attr("width",fcol.attr("orgWidth"));
							fcol.removeAttr("orgWidth");
						}
					}
					
				}
				$('col[scroll=Y]',colgroup).remove();
				if(fcols!=undefined) $('col[scroll=Y]',footColgroup).remove();
	
			}
		});
	}

	tHeadOrderBy = ($obj, orderby) => {
		const self = this;

		let tr = $obj.closest("tr");
		tr.find("img").attr("src","/images/btn/btn_sort2.png");
		$obj.children("img").attr("src",(orderby.toUpperCase() == "DESC")?"/images/btn/btn_sort_dw.png":"/images/btn/btn_sort_up.png");

		//self.retrieve();
	}
	checkNull = (data) =>{
		if(data===null || data === undefined || data == 'undefined' ){
			return true;
		} else {
			return false;
		}
	}
	// 비어있는 값도 널로 취급 
	checkEmptyNull = (data) =>{
		if(data===null || data === undefined || data == 'undefined' || data=='' ){
			return true;
		} else {
			return false;
		}
	}
	nvl = (data, c) =>{
		return this.checkNull(data) ? c : data;
	}
	ifnull = (data) => {
		return this.checkNull(data) ? '' : data;
	}
	objectIfnull = (obj) => {
		let keys = Object.keys(obj);
		for(let i=0;i<keys.length;i++){
			if(!this.checkNull(obj[keys[i]]) && typeof obj[keys[i]] == "object" && !Array.isArray(obj[keys[i]])){
				obj[keys[i]] = this.objectIfnull(obj[keys[i]]);
			}else{
				obj[keys[i]] = this.ifnull(obj[keys[i]]);
			}
		}
		return obj;
	}
	popUpLayerTopReset($layerObject){
		let $div = $('div:eq(0)',$layerObject);
		let h = $div.height();
		let t = $div.offset().top;
		let nh = $('.mw_contents',$div).height();
		$div.css('height', nh+30);
		$div.css('top', t - ((nh-h)/2));
	}
	popWindowCenter = (width, height) =>{
		let popupX = (window.screen.width / 2) - (width / 2);
		let popupY= (window.screen.height / 2) - (height / 2);
		return 'width='+width+',height='+height +',left='+ popupX + ',top='+ popupY
	}
	popUpLayerHeightReset($layerObject){
		let bottonHeight = 35;
		let mainHeight = 58;
		let searchHeight = 30;
		let $mw_defalut = $('.mw_defalut', $layerObject);
		let $mw_contents = $('.mw_contents', $mw_defalut);
		let $mw_contentsDiv = $mw_contents.children('div');
		let $searchWrap = $mw_contentsDiv.children('.searchWrap');
		let $bottonWrap = $mw_contentsDiv.children('.bottonWrap');
		if($bottonWrap.length == 0) bottonHeight =0;
		$mw_contentsDiv.height($searchWrap.height()+bottonHeight+ searchHeight);
		$mw_defalut.height($searchWrap.height()+mainHeight+bottonHeight+ searchHeight);
	}

	classNameInput = ($obj, data) =>{
		let self = this;
		let keys = Object.keys(data);
		for(let i=0;i<keys.length;i++){
			let key = keys[i];
			let text = data[keys[i]];
			if(text!=undefined){
				if(key.substring(key.length - 2) == 'Dt'){
					text = this.dateformatStringToDate(text);
				}else if(key.substring(key.length - 3) == 'Cnt'){
					text = this.numberWithCommas(text);
				}else if(key.substring(key.length - 6) == 'Amount'){
					text = this.numberWithCommas(text);				
				}
			}
			$('.'+ keys[i], $obj).text(text);
		}
	}

	_crypto = {
		key : CryptoJS.enc.Hex.parse('123456789postgood123456789postgo'), // 256비트 암호화 키
		iv : CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210') // 초기화 벡터
	}
	// 일부 모바일 QR코드 조회시 대문자를 소문자로 강제로 변환되는 부분 보완용
	_cryptoDivCharAt = '|';
	// 암호화
	encryptData = (data) => {
		const self = this;
		const encrypted = CryptoJS.AES.encrypt(data, self._crypto.key, { iv: self._crypto.iv });
		const encryptedBase64 = encrypted.toString();

		function UpperConvert(d){
			let v = '';
			if(!self.checkEmptyNull(d)){
				for(let i=0;i<d.length;i++){
					if(d.charAt(i) == d.charAt(i).toLowerCase()){
						v += d.charAt(i);
					}else{
						v += self._cryptoDivCharAt + d.charAt(i).toLowerCase();
					}
				}
			}
			return v;
		}
		return UpperConvert(encryptedBase64);
	};

	//복호화
	decryptData = (data) => {
		const self = this;
		data = UpperUnConvert(data);
		// Base64로 인코딩된 암호화된 데이터를 디코드
		const ciphertext = CryptoJS.enc.Base64.parse(data);
		// 텍스트 복호화
		const decrypted = CryptoJS.AES.decrypt(
			{ ciphertext: ciphertext },
			self._crypto.key,
			{ iv: self._crypto.iv }
		);
		// 복호화된 결과를 문자열로 변환
		const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
		function UpperUnConvert(d){
			let v = '';
			if(!self.checkEmptyNull(d)){
				for(let i=0;i<d.length;i++){
					if(d.charAt(i) == self._cryptoDivCharAt){
						v += d.charAt(++i).toUpperCase();
					}else{
						v += d.charAt(i);
					}
				}
			}
			return v;
		}
		return decryptedText
	};
	objectTrim = (obj) => {
		if(typeof obj  == 'string'){
			obj = obj.trim();
		}else if(typeof obj == "object" ){
			if(Array.isArray(obj)){
				for(let i=0;i<obj.length;i++)	obj[i] = this.objectTrim(obj[i]);
			}else if(obj != undefined){
				let keys = Object.keys(obj);
				for(let i=0;i<keys.length;i++) obj[keys[i]] = this.objectTrim(obj[keys[i]]);
			}
		}
		return obj;
	}
}
export default Utils;

// Window Orverride 함수
window.toast = function(message, opt = {}){
	const Toast = Swal.mixin({
		toast: true,
		position: 'bottom-right',
		showConfirmButton: true,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
		  toast.addEventListener('mouseenter', Swal.stopTimer)
		  toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	  })
	
	  Toast.fire({
		//icon: 'success',
		html: message
	  })
}

window.alert = function(message, title, opt = {}) {

	let opts = {html:message, confirmButtonColor : '#68afd9'};
	if(title != undefined) opts.title = title;
	Swal.fire(opts);
/*
	switch(opt) {
		case 'error':
			Swal.fire({
					title: title,
					//icon: 'error',
					//text: message,
					html: message,
					confirmButtonText: '확인'
			});
			break;
		case 'success':
				Swal.fire({
					// position: "bottom-end",
					//icon: "success",
					//text: message,
					html: message,
					confirmButtonText: '확인'
					// showConfirmButton: false,
					// timer: 1500
				});
				break;
		case 'info':
			Swal.fire({
				// position: "bottom-end",
				//icon: "info",
				//text: message,
				html: message,
				confirmButtonText: '확인'
				// showConfirmButton: false,
					// timer: 1500
			});
			break;
		default:
			//Swal.fire({text:message,confirmButtonColor : '#68afd9'});
			Swal.fire({html:message,confirmButtonColor : '#68afd9'});
			break;
	}
			*/
	
};


// window.confirm Orverride 함수

window.confirm = function(message, cbfunc ,confirmButtonText, cancelButtonText ) {
	cancelButtonText = (cancelButtonText != undefined) ? cancelButtonText : '취소';
	confirmButtonText = (confirmButtonText != undefined) ? confirmButtonText : '삭제';
	Swal.fire({
		title: message,
		//icon: 'question',
		showCancelButton: true,
		//confirmButtonColor: '#3085d6',
		confirmButtonColor: '#68afd9',
		cancelButtonColor: '#db6363',
		confirmButtonText: confirmButtonText,
		cancelButtonText: cancelButtonText
	}).then((result) => {
		if (result.isConfirmed) {
      cbfunc(true);
    } else if (result.isDismissed) {
      cbfunc(false);
    }
	});
};
