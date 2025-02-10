
'use strict';
import Utils from '../../../raon_modules/utils.js';
import AjaxCall from '../../../raon_modules/AjaxCall.js';


let workReportLoginController = class {
	constructor(_const, _data, _param) {
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
		this._options = {};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		// Object.freeze(this._const);
	}

	init = () => {
		const self = this;
		self.signinInit();
	}

	signinInit = () => {
		let self = this;
		if(localStorage != undefined && localStorage.getItem('userIdSave')) {
			let _userId = localStorage.getItem('userid');
			$('input[name=userid]').val(_userId);
			$('.imgChkBoxLabel').trigger('click');
		}
		let width  = window.innerWidth  || document.body.clientWidth;
		let logBoxWidth = $('.logBox').width();
		if(width != parseInt(logBoxWidth)){
			$('.logBox').css('left', '50%').css('margin-left', '-250px');
		}
		//$('.widthSize').text(width);
		
		let data = {ctl:"company", cmd :"info"};
		data.host = document.location.host;
		let _api = new AjaxCall(self._const,data);
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code == 0) {
				let d = rdata.data;
				$(".logLogo").empty();
				$(".copy").empty();
				$(".logLogo").append('<img src="'+ 'https://kprintfactory.s3.ap-northeast-2.amazonaws.com'+d.fileInfo[0].path.replace('kprintfactory/', '') +'" alt="" style="filter:invert(93%);">');
				$(".copy").append('<b>'+ d.cNm +'</b> <i class="fa-solid fa-square-phone-flip"></i> '+ ((self._utils.checkEmptyNull(d.cTel))? '' : self._utils.formatPhoneNumber(d.cTel)) +' <i class="fa-solid fa-location-arrow"></i> : '+ d.cAddr + ' '+ d.cAddrDetail);

				let url = location.href;
				//console.log('url='+ url);
				
				let message = '<div style="height:50px;margin-top:50px;">작업지시서의 QR코드를 통하여 진입하시기 바랍니다.</div>';
				let param = {};
				if(url.indexOf('?') > -1){
					if(url.indexOf(document.location.host) > -1 || url.indexOf('127.0.0.1') > -1){
						let parameter = url.substring(url.indexOf('?')+1);
						let oSeq;
						console.log('parameter='+ parameter);
						sessionStorage.setItem('parameter',parameter);
						let params = parameter.split('&');
						
						for(let i=0;i<params.length;i++){
							let p = params[i].substring(0, params[i].indexOf('='));
							let v = params[i].substring(params[i].indexOf('=')+1);
							console.log('v='+ v);
							param[p] = v;
						}
						if(param.p == undefined){
							//	alert(message);
							$('#login-form').empty();
							$('#login-form').append(message);
							return;		
						}else{
							$('input[name=p]').val(param.p);

							let dData = self._utils.decryptData(decodeURI(param.p));
							let pdata = {};
							let params = dData.split('&');
							for(let i=0;i<params.length;i++){
								let p = params[i].split('=');
								pdata[p[0]] = p[1];
							}
							if(pdata.oSeq != undefined){
								oSeq = pdata.oSeq;
								let data = {ctl:"order", cmd :"loadCheck", cSeq : d.cSeq, oSeq : oSeq};
								let _api = new AjaxCall(self._const,data);
								_api.ajaxformdata(function(rdata){ 
									if(rdata.code == 0) {
										let d = rdata.data;
										if(d.oApprovalYn != 'Y'){
											alert('작업 승인되지 않은 수주건 입니다.');
											$('#login-form').empty();
											$('#login-form').append('');
										}
										if(d.oStatus == 'C'){
											alert('완료된 수주건 입니다.');
											$('#login-form').empty();
											$('#login-form').append('');
										}
									} else {
										alert(rdata.message);
									}
								});
							}else{
								$('#login-form').empty();
								$('#login-form').append(message);
							}
						}
					}else{
						$('#login-form').empty();
						$('#login-form').append(message);
					}
				}else{
					alert($(message).text());
					$('#login-form').empty();
					$('#login-form').append(message);
					return;		

				}

				
			} else {
					alert(rdata.message);
			}
		});

		$('#btnSingin').on('click', function(){
			if( self._utils.checkRequired('#login-form')) {
				// 아이디 저장 체크가 되어 있으면 아이디 저장하기
				if($('.imgChkBoxLabel').hasClass("lbOn")) {
					localStorage.setItem('userid', $('input[name=userid]').val());
					localStorage.setItem('userIdSave', true);
				} else {
					localStorage.removeItem('userid');
					localStorage.removeItem('userIdSave');
				}

				$('form').trigger("submit");
			}
		});

		$('input[name=encpwd]').on('keypress', function(e){
			if(e.keyCode && e.keyCode == 13){
				$("#btnSingin").trigger("click");
				return false;
			}
		});
		function getOSeq(){
			
		}
	}

}
export default workReportLoginController
