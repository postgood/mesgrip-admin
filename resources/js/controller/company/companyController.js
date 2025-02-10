
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall';


let companyController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._fileSeq = null;
	}

	init = (_code,_data) => {
		const self = this;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		self._utils.focusEvent($('input[name=cTel]', self._code),'tel');
		self._utils.focusEvent($('input[name=cFax]', self._code),'tel');
		self.display();
		
		$('.btnSave', self._code).on('click', function(e){

			let _cOwnerNm = $('input[name=cOwnerNm]', self._code).val();
			let _cZipcode = $('input[name=cZipcode]', self._code).val();
			let _cAddr = $('input[name=cAddr]', self._code).val();
			let _cAddrDetail = $('input[name=cAddrDetail]', self._code).val();
			let _cTel = $('input[name=cTel]', self._code).val();
			let _cFax = $('input[name=cFax]', self._code).val();
			let _cInvoiceEmail = $('input[name=cInvoiceEmail]', self._code).val();
			let _cUpjong = $('input[name=cUpjong]', self._code).val();
			let _cJongmok = $('input[name=cJongmok]', self._code).val();
			let _cReportTitle = $('textarea[name=cReportTitle]',self._code).val();
			let _cWorkReport = $('select[name=cWorkReport]',self._code).val();
			let _cHomepage = $('input[name=cHomepage]',self._code).val();
			let _cTransReport = $('select[name=cTransReport]',self._code).val();

			if( self._utils.checkRequired(`#frmCompany`)) {

				// 로고 이미지 업로드
				const mPromise = new Promise((resolve, reject) => {

					if($('input[name=upfile]')[0].files[0]) {
							self.mediaUpload($('input[name=upfile]')[0].files[0], function(resp){
									if(resp == -9999) {
											reject(new Error("upload  is failed"));
									}
									//resolve(resp.id);
									resolve(resp.fileSeq);
							});
					} else {
							resolve(self._fileSeq??undefined);
					}
				});

				mPromise.then((res) => {
					let mapData = {
						cOwnerNm : _cOwnerNm,
						cZipcode : _cZipcode,
						cAddr : _cAddr,
						cAddrDetail : _cAddrDetail,
						cTel : _cTel,
						cFax : _cFax,
						cInvoiceEmail : _cInvoiceEmail,
						cUpjong : _cUpjong,
						cJongmok : _cJongmok,
						cReportTitle : _cReportTitle,
						cWorkReport : _cWorkReport,
						cTransReport : _cTransReport,
						cHomepage : _cHomepage,
						fileSeq : res 
					}
	
					self.update(mapData, function(resp){
						if(resp.code==0) {
							alert('저장되었습니다.');
						} else {
							alert('저장에 실패하였습니다.');
						}
					});
					
				}).catch((error) => {
						alert('로고 이미지 업로드 에러');
				});
			}
		});
		
		$('.btnSaveAccount', self._code).on('click', function(e){
			// 계좌번호 수정/등록
			let $accountList = $('.accountWrap tr', self._code); 
			for(let i=0;i<$accountList.length;i++){
				let info = $($accountList[i]).data();
				let newData = {
					caBankNm : $('input[name=caBankNm]',$accountList[i]).val(),
					caOwnerNm : $('input[name=caOwnerNm]',$accountList[i]).val(),
					caAccount : $('input[name=caAccount]',$accountList[i]).val(),
					sort : i+1
				}
				if(info.constructor === Object	&& Object.keys(info).length === 0)  {
					if(!self._utils.checkEmptyNull(newData.caBankNm) && !self._utils.checkEmptyNull(newData.caAccount)){
						self.accountInsert(newData, function(resp){
							console.log(resp);
						});
					}
				} else {
					delete info.sortableItem;
					$.extend(newData,info);
					self.accountUpdate(newData, function(resp){
						console.log(resp);
					});
				}
			}
		});
		let $apiArea = $('.apiArea', self._code); 
		$('.btnSaveEmail', self._code).on('click', function(e){
			let name = $(this).attr("name");
			let $obj = $('.'+ name, $apiArea);
			let orgData = $obj.data('ROW');
			let data = self._utils.serializeObject($obj);

			data.coaType = name;
			$.extend(orgData, data);
			orgData = self._utils.filterJsonRemoveNull(orgData);
			self.apiInfoSave(orgData, function(resp){
				if(resp.code == 0){
					alert('저장 되었습니다.');
				}else{
					alert(resp.message);
				}
			});
		});

		
	}

	display = () => {
		const self = this;

		self.load(null, function(resp){
			if(resp.code == 0) {
				let _data = self._companyInfo = resp.data;
				let $companyInfo = $('.companyInfo',self._code);
				$('input[name=cNm]',$companyInfo).val(_data.cNm);
				$('input[name=cOwnerNm]',$companyInfo).val(_data.cOwnerNm);
				$('input[name=cDomain]',$companyInfo).val(_data.cDomain);
				$('input[name=cZipcode]',$companyInfo).val(_data.cZipcode);
				$('input[name=cAddr]',$companyInfo).val(_data.cAddr);
				$('input[name=cAddrDetail]',$companyInfo).val(_data.cAddrDetail);
				$('input[name=cBizNo]',$companyInfo).val(self._utils.convertBizNo(_data.cBizNo));
				$('input[name=cBizNoNum]',$companyInfo).val(_data.cBizNoNum);
				$('input[name=cTel]',$companyInfo).val(_data.cTel);
				$('input[name=cFax]',$companyInfo).val(_data.cFax);
				$('input[name=cInvoiceEmail]',$companyInfo).val(_data.cInvoiceEmail);
				$('input[name=cUpjong]',$companyInfo).val(_data.cUpjong);
				$('input[name=cJongmok]',$companyInfo).val(_data.cJongmok);
				$('textarea[name=cReportTitle]',$companyInfo).val(_data.cReportTitle);
				$('select[name=cWorkReport]',$companyInfo).val(_data.cWorkReport);
				$('select[name=cTransReport]',$companyInfo).val(_data.cTransReport);
				$('input[name=cHomepage]',$companyInfo).val(_data.cHomepage);
				$('.expiryDt',$companyInfo).text(self._utils.dateformatStringToDate(_data.expiryDt));
				$('input[name=cTel]', self._code).trigger('focusout');
				$('input[name=cFax]', self._code).trigger('focusout');
				if(_data.fileInfo && _data.fileInfo.length > 0) {
					self._fileSeq = _data.fileInfo[0].fileSeq;
					$('#uploadProfie-preview').attr('src', __FILE_DOMIN+_data.fileInfo[0].path.replace('kprintfactory', ''));
				}
				


				$('.btnAddrSearch', $companyInfo).on('click', function(e){
					new daum.Postcode({
						oncomplete: function(data) {
								// data.zonecode 새 우편번호
								let roadAddr = data.roadAddress; // 도로명 주소 변수
								$('input[name=cZipcode]',$companyInfo).val(data.zonecode);
								$('input[name=cAddr]',$companyInfo).val(roadAddr);
						}
					}).open();
				});

				$('.btnAddFile', $companyInfo).on('click', function(e){
					e.preventDefault();
          			$('#uploadProfie').trigger('click');
				});

				$("#uploadProfie", $companyInfo).on("change", function(event) {
					let file = event.target.files[0];

					if(file.size > self._imagesize) {
							$(this).val('');
							alert('파일 용량은 2MB 이하로 제한됩니다.');
							return false;
					}

					var reader = new FileReader(); 
					reader.onload = function(e) {
						$("#uploadProfie-preview").attr("src", e.target.result);
					}
					reader.readAsDataURL(file);
				});

				let $tbody = $('.accountWrap', self._code); //.empty();
				//let $tbody = $accountWrap.find("tbody");

				$tbody.sortable({
					handle: ".fa-up-down",
					items : "tr",
					start: function(event, ui){	},
					update: function(event, ui){},
				  });
				$('.btnAddBank', self._code).on('click', function(e){
					let $tr = $('<tr/>');
					$tr.append($('<td class="UpDown ac" style="background-color:#fff;padding:0 0;"/>').append($('<i class="fa-solid fa-up-down cursorPointer"></i>')));
					$tr.append($('<td calss="ac" style="background-color:#fff;" />').append($('<input type="text" class="w98p" name="caBankNm" style="border-width: 0px;background-color:transparent;">')));
					$tr.append($('<td class="al" style="background-color:#fff;" />').append($('<input type="text" class="w98p" name="caOwnerNm" style="border-width: 0px;background-color:transparent;">')));
					$tr.append($('<td class="al" style="background-color:#fff;" />').append($('<input type="text" class="w98p" name="caAccount" style="border-width: 0px;background-color:transparent;">')));
					$tr.append($('<td class="ac" style="background-color:#fff;padding:0 0;" />').append($('<i class="fa-solid fa-square-minus btnRemoveBank" title="계좌 삭제" style="font-size: 16px;color:#898193;"></i>')));
					$tbody.append($tr);

					/*
					let $template = $($('#bankWrap').html());
					$('.btnRemoveBank', $template).on('click', function(e){
						$(this).parent().remove();
					});

					$template.appendTo($accountWrap);
					*/
				});
				
				
				$tbody.on('click','.btnRemoveBank',function(){
					let $tr = $(this).closest('tr');
					let _delData = $tr.data();
					confirm('삭제하시겠습니까?', function(data){
						if(data) {
							
							if(_delData.caSeq!=undefined){
								self.accountDelete({caSeq : _delData.caSeq}, function(resp) {
									if(resp.code==0) {
										$tr.remove();
										alert('삭제되었습니다');
									} else {
										alert(resp.message);
									}
								});
							}else{
								$tr.remove();
							}
						}
					});
				});
				let i = 0;
				if(_data.accountInfo.length > 0){
					for(i =0;i<_data.accountInfo.length;i++) {
						let _account = _data.accountInfo[i];
						//let $template = $($('#bankWrap').html());
						let $tr = $('<tr/>');
						$tr.append($('<td class="UpDown ac" style="background-color:#fff;padding:0 0;" />').append($('<i class="fa-solid fa-up-down cursorPointer"></i>')));
						$tr.append($('<td class="ac" style="background-color:#fff;" />').append($('<input type="text" class="w98p " name="caBankNm" style="border-width: 0px;background-color:transparent;">').val(_account.caBankNm)));
						$tr.append($('<td class="al" style="background-color:#fff;" />').append($('<input type="text" class="w98p " name="caOwnerNm" style="border-width: 0px;background-color:transparent;">').val(_account.caOwnerNm)));
						$tr.append($('<td calss="ac" style="background-color:#fff;" />').append($('<input type="text" class="w98p " name="caAccount" style="border-width: 0px;background-color:transparent;">').val(_account.caAccount)));
						$tr.append($('<td class="ac" style="background-color:#fff;padding:0 0;" />').append($('<i class="fa-solid fa-square-minus btnRemoveBank" title="계좌 삭제" style="font-size: 16px;color:#898193;"></i>')));
						$tr.data({caSeq : _account.caSeq});
						$tbody.append($tr);
						
					}
				}
				// 화면의 안전감을 위해 5개를 노출 한다.
				let cnt = $tbody.find('tr').length;
				for(cnt;cnt< 5;cnt++){
					let $tr = $('<tr/>');
					$tr.append($('<td class="UpDown ac" style="background-color:#fff;padding:0 0;" />').append($('<i class="fa-solid fa-up-down cursorPointer"></i>')));
					$tr.append($('<td class="ac" style="background-color:#fff;" />').append($('<input type="text" class="w98p " name="caBankNm" style="border-width: 0px;background-color:transparent;">')));
					$tr.append($('<td class="al" style="background-color:#fff;" />').append($('<input type="text" class="w98p " name="caOwnerNm" style="border-width: 0px;background-color:transparent;">')));
					$tr.append($('<td calss="ac" style="background-color:#fff;" />').append($('<input type="text" class="w98p " name="caAccount" style="border-width: 0px;background-color:transparent;">')));
					$tr.append($('<td class="ac" style="background-color:#fff;padding:0 0;" />').append($('<i class="fa-solid fa-square-minus btnRemoveBank" title="계좌 삭제" style="font-size: 16px;color:#898193;"></i>')));
					$tbody.append($tr);
				}

				/**************************  팝빌 화면 설정 [START] ************************************/

				
				self.popbillEvent();
				self.apiAccount();
				// 인증서 확인

				/**************************  팝빌 화면 설정  [END] ************************************/

			} else {
				alert(resp.message);
			}
		});
	}
	apiAccount = () => {
		let self = this;
		self.apiAccountList(null, function(resp){
			if(resp.code == 0) {
				let $apiArea = $('.apiArea', self._code);
				let _data = resp.data;
				for(let i=0;i<_data.length;i++){
					let d = _data[i];
					let $obj = $('.'+ d.coaType , $apiArea);
					if($obj.length > 0){
						$('input[name=coaDomain]',$obj).val(d.coaDomain);
						$('input[name=coaPort]',$obj).val(d.coaPort);
						$('input[name=coaId]',$obj).val(d.coaId);
						//$('input[name=coaPwd]',$obj).val(d.coaPwd);
						$('input[name=coaPwd]',$obj).val('');
						$('input[name=coaEtc1]',$obj).val(d.coaEtc1);
						$obj.data('ROW',d);
					}
				}
			} else {
				alert(resp.message);
			}
		});
	}
	popbillEvent = () =>{
		let self = this;
		self.load(null, function(resp){
			if(resp.code == 0) {
				let _data = self._companyInfo = resp.data;
				let $popbill = $('.popbill',self._code);
				let $popbillAction = $('.popbillAction',self._code);
				if(_data.cPopbillYn == 'N'){
					$popbill.hide();
					$('.btnPopbillJoin', self._code).on('click',function(){
						let bizNo = $('input[name=cBizNo]',self._code).val();
						bizNo = bizNo.replaceAll('-','')
						let mapData = {
							ctl : 'popbill',
							cmd : 'checkIsMember',
							cBizNo : bizNo,
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':false});
						_api.ajaxformdata(function(rdata2){ 
							if(rdata2.code == 0){
								let d2 = rdata2.data;
								//console.log(d2)
								if(d2.message == '미가입'){
									let $popDiv = $('template#popbillJoinDiv');
									self._parent.openLayer($popDiv.html(), self.popbillJoinEvent);
								}else if(d2.message == '가입'){
									alert('이미 가입되어 있는 회원입니다.<br> 관리자에게 문의하시기 바랍니다.');
									/*
									let $popDiv = $('template#popbillMemberDiv');
									self._parent.openLayer($popDiv.html(), self.popbillMemberEvent);
									*/
								}
									
							}else{
								alert('Popbill 시스템 통신이 원활 하지 않습니다.');
							}
						});
					});
					$('.btnPopbillJoin', self._code).show();
					$('.popbillPoint', self._code).hide();
				}else{
					$popbill.show();
					$('.btnPopbillJoin', self._code).hide();
					$('.popbillPoint', self._code).show();
					//$popbillAction.show();
				}

				if(_data.cPopbillYn == 'Y'){
					let $certInsert = $('.certInsert'. $popbill).clone();
					if(!self._utils.checkEmptyNull(_data.cCertExpiryDt)){
						let nowDt = self._utils.currentDate(/-/g,'');
						if(nowDt > _data.cCertExpiryDt){
							$('.certInfo',$popbill).append('<span>인증서 만료일 : <span style="color:red; margin-right:10px;">'+self._utils.dateformatStringToDate(_data.cCertExpiryDt)+'</span></span>');
						}else{
							$('.certInfo',$popbill).empty().append('<span>인증서 만료일 : '+ self._utils.dateformatStringToDate(_data.cCertExpiryDt)+'</span>');
							//$('.certInsert'. $popbill).remove();
						}
					}else{

						// 인증서 만료일 조회 하기
						let mapData = {
							ctl : 'popbill',
							cmd : 'getTaxCertInfo', 
							//cmd : 'certExpireDate', 
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':false});
							
						_api.ajaxformdata(function(rdata2){ 
							if(rdata2.code == 0){
								let d2 = rdata2.data;
								if(d2.code == 1){
									/*
									let dt = d2.message.substring(0,10);

									let sps = dt.split(".");
									let expiryDt = sps[0] + self._utils._zeroFill(sps[1].replace(' ',''),2) + self._utils._zeroFill(sps[2].replace(' ',''),2)
									*/
									let expiryDt = d2.message.expireDT;
									$('.certInfo',$popbill).empty().text('인증서 만료일 : '+ self._utils.dateformatStringToDate(expiryDt));

									self.update({cCertExpiryDt : expiryDt.substring(0,8)}, function(){});
								}else{
									//alert(d2.message)
								}
							}else{
								alert('Popbill 시스템 통신이 원활 하지 않습니다.');
							}
						});
					}
					if(_data.cFaxApplyYn == 'Y'){
						$('.faxSendNo',$popbill).text(_data.cFax);
					}else{
						// 발신번호 승인 여부 조회 하기
						let mapData = {
							ctl : 'popbill',
							cmd : 'faxCheckSenderNumber',
							cBizNo : $('input[name=cBizNo]',self._code).val(),
							cFax : $('input[name=cFax]',self._code).val(),

						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':false});
						_api.ajaxformdata(function(rdata2){ 
							if(rdata2.code == 0){
								let d2 = rdata2.data;
								if(d2.code == 1){
									$('.certInfo',$popbill).empty().text(d2.message);
									self.update({cFaxApplyYn : 'Y'}, function(){});
								}else{
									//alert(d2.message)
								}
							}else{
								alert('Popbill 시스템 통신이 원활 하지 않습니다.');
							}
						});
					}

					
					/*
					$('.btnPopbillMemberDelete',$popbill).on('click',function(){
						confirm('Popbill 계정정보를 삭제하시겠습니까?', function(){
							let mapData = {ctl : 'company',cmd : 'popbillDelete'};
							let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code==0) {
									self.popbillEvent();
									alert('삭제 되었습니다.');
								}else{
									alert(rdata.message);
								}
							});
						},'삭제');

					});
					*/
					// 잔여포인트 가져오기
					let mapData = {
						ctl : 'popbill',
						cmd : 'pointBalance',
						cBizNo : $('input[name=cBizNo]',self._code).val(),
						coaId : $('input[name=coaId]',$popbill).val(),
					}
					let _api = new AjaxCall(self._const
						,mapData
						,{'wapi': 'user/ws','spinner':false});
					_api.ajaxformdata(function(rdata2){ 
						if(rdata2.code == 0){
							let d2 = rdata2.data;
							if(d2.code == 1){
								$popbillAction.append('<span class="popbillPoint">잔여포인트 : '+ self._utils.numberWithCommas(d2.result) +' 원</span>');
							}else{
								//alert(d2.message)
							}
						}else{
							alert('Popbill 시스템 통신이 원활 하지 않습니다.');
						}
					});

					$popbill.on('click','.certInsert',function(){
						let mapData = {
							ctl : 'popbill',
							cmd : 'certInsertUrl',
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code == 0){
									let d = rdata.data;
									var win = window.open(d.result, "certInsertPop", self._utils.popWindowCenter(830,470));
									win.focus();
								}else{
									alert(rdata.message);
								}
							}
						);
					});
					$popbill.on('click','.faxNoInsert',function(){
						let mapData = {
							ctl : 'popbill',
							cmd : 'faxSenderNumberMgrUrl',
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code == 0){
									let d = rdata.data;
									var win = window.open(d.result , "faxInsertPop", self._utils.popWindowCenter(850,720));
									win.focus();
								}else{
									alert(rdata.message);
								}
							}
						);
					});
					$('.btnPopbillPaymentHistoryURL',$popbill).on('click', function(){
						let mapData = {
							ctl : 'popbill',
							cmd : 'paymentURL',
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code == 0){
									let d = rdata.data;
									let win = window.open(d.result , 'pointCharge', self._utils.popWindowCenter(850,550));
									win.focus();
								}else{
									alert(rdata.message);
								}
							}
						);
					});
					$('.btnPopbillUseHistoryURL',$popbill).on('click', function(){
						let mapData = {
							ctl : 'popbill',
							cmd : 'useHistoryURL',
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code == 0){
									let d = rdata.data;
									let win = window.open(d.result , 'pointCharge', self._utils.popWindowCenter(850,550));
									win.focus();
								}else{
									alert(rdata.message);
								}
							}
						);
					});
					$('.btnPopbillQuit',$popbill).on('click', function(){
			
						confirm('팝빌 연동 해지(탈퇴)를 진행 하시겠습니까?\n<span style="color:red;">해지시 먼저 포인트 환불을 진행 하십시오</span>', function(data){
							if(data) {
								let $popDiv = $('template#popbillQuitDiv');
								self._parent.openLayer($popDiv.html(), self.popbillQuitEvent);
							}
						},'연동 해지 신청');
					});
					$('.btnPopbillWebUrl',$popbill).on('click', function(){
						let mapData = {
							ctl : 'popbill',
							cmd : 'popbillWebUrl',
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code == 0){
									let d = rdata.data;
									let win = window.open(d.result , 'pointCharge', self._utils.popWindowCenter(850,550));
									win.focus();
								}else{
									alert(rdata.message);
								}
							}
						);
					});
					$('.btnPopbillChargeURL',$popbill).on('click', function(){
						let mapData = {
							ctl : 'popbill',
							cmd : 'pointChargeURL',
							cBizNo : $('input[name=cBizNo]',self._code).val()
						}
						let _api = new AjaxCall(self._const
							,mapData
							,{'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code == 0){
									let d = rdata.data;
									var win = window.open(d.result , "pointCharge", self._utils.popWindowCenter(550,650));
									win.focus();
								}else{
									alert(rdata.message);
								}
							}
						);
					});
					// 세금계산서 단가조회
					mapData.cmd = 'taxinvoiceUnitCost'
					let _api2 = new AjaxCall(self._const
						,mapData
						,{'wapi': 'user/ws','spinner':false});
					_api2.ajaxformdata(function(rdata2){ 
						if(rdata2.code == 0){
							let d = rdata2.data;
							if(d.code == 1){
								$('.vatTh',$popbill).append('<br/><span style="font-size:11px;font-weight: normal;">건당 : '+ d.result +' 원</span>');
							}else{
								//alert(d2.message)
							}
						}else{
							// alert('Popbill 시스템 통신이 원활 하지 않습니다.');
						}
					});

					// 팩스 단가 조회
					mapData.cmd = 'faxUnitCost'
					let _api3 = new AjaxCall(self._const
						,mapData
						,{'wapi': 'user/ws','spinner':false});
					_api3.ajaxformdata(function(rdata2){ 
						if(rdata2.code == 0){
							let d = rdata2.data;
							if(d.code == 1){
								$('.faxTh',$popbill).append('<br/><span style="font-size:11px;font-weight: normal;">건당 : '+ d.result +' 원</span>');
							}else{
								alert(d.message)
							}
						}else{
							// alert('Popbill 시스템 통신이 원활 하지 않습니다.');
						}
					});
					
				}else{
					// Popbill 가입 여부 확인
					let bizNo = $('input[name=cBizNo]',self._code).val();
					bizNo = self._utils.getOnlyNumber(bizNo);
					let mapData = {
						ctl : 'popbill',
						cmd : 'checkIsMember',
						cBizNo : bizNo
					}
					let _api = new AjaxCall(self._const
						,mapData
						,{'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						let d = rdata.data;
						if(d.code == 1){
							// 인증서 만료일 또는 등록 여부 확인
							mapData.cmd = 'certExpireDate';
							_api.ajaxformdata(function(rdata2){ 
								if(rdata2.code == 0){
									let d2 = rdata2.data;
									if(d2.code == 1){
										$('.certInfo',$popbill).empty().text(d2.message);
									}
								}
							});
						}else{

						}
					});
				}
			}
		});
	}
	popbillMemberEvent = (popupID, d) =>{
		const self = this;
		const $layerObject = $(`#${popupID}`);
		self._utils.unSerializeObject($layerObject, self._companyInfo);

		$('input[name=popbillId]',$layerObject).on('focusout',function(){
			let id = $(this).val();
			if(id.trim().length >= 6){
				let mapData = {
					ctl : 'popbill',
					cmd : 'checkID',
					popbillId : id
				}
				let _api = new AjaxCall(self._const
					,mapData
					,{'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0){
						let d = rdata.data;
						if(d.code != 0){
							$('input[name=idCheck]',$layerObject).val('N');
							$(this).css('border','');
							alert('Popbill에 존재하지 않는 아이디 입니다.');
						}else{
							$('input[name=idCheck]',$layerObject).val('Y');
							$(this).css('border','1px solid red');
						}
					}
				});
			}else{
				$(this).css('border','1px solid red');
			}
		});

		$('.popbillSave',$layerObject).on('click', function(){
			let id = $('input[name=popbillId]',$layerObject).val();
			let idCheck = $('input[name=idCheck]',$layerObject).val();

			if(self._utils.checkEmptyNull(id)){
				alert('아이디를 입력하십시오');
				return false;
			}
			if(id.trim().length < 6){
				alert('아이디는 6자리 이상 입력하십시오');
				return false;
			}
			if(idCheck!='Y'){
				alert('아이디를 다시 확인해보시기 바랍니다.');
				return false;
			}
			let mapData = {
				ctl : 'company',
				cmd : 'popbillSave',
				popbillId : id.trim(),
			}
			let _api = new AjaxCall(self._const
				,mapData
				,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					self.popbillEvent();
					self.apiAccount();
					alert('저장 되었습니다.');
					$("body .btnClosePopLayer").trigger('click');
				}else{
					alert(rdata.message);
				}
			});

		});
		
	}
	popbillJoinEvent = (popupID, d) =>{
		const self = this;
		const $layerObject = $(`#${popupID}`);
		let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+]).{8,20}$/;
		self._utils.unSerializeObject($layerObject, self._companyInfo);

		$('input[name=popbillId]',$layerObject).on('focusout',function(){
			let id = $(this).val();
			if(id.trim().length >= 8){
				let mapData = {
					ctl : 'popbill',
					cmd : 'checkID',
					popbillId : id
				}
				let _api = new AjaxCall(self._const
					,mapData
					,{'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0){
						let d = rdata.data;
						if(d.code != 0){
							$('input[name=idCheck]',$layerObject).val('N');
							$(this).css('border','1px solid red');
							alert(d.message);
						}else{
							$('input[name=idCheck]',$layerObject).val('Y');
							$(this).css('border','');
						}
					}
				});
			}else{
				$(this).css('border','1px solid red');
			}
		});
		$('input[name=popbillPwd]',$layerObject).on('focusout',function(){
			let v = $(this).val();
			if(v.length<8 || v.length>20){
				$(this).css('border','1px solid red');
			}else if(!passwordRegex.test(v)){
				$(this).css('border','1px solid red');
			}else{
				$(this).css('border','');
			}
		});
		$('input[name=popbillPwdRe]',$layerObject).on('focusout',function(){
			let p = $('input[name=popbillPwd]',$layerObject).val();
			let v = $(this).val();
			if(p != v){
				$(this).css('border','1px solid red');
			}else{
				$(this).css('border','');
			}
		});


		$('.popbillJoin',$layerObject).on('click', function(){
			let id = $('input[name=popbillId]',$layerObject).val();
			let pwd = $('input[name=popbillPwd]',$layerObject).val();
			let pwdRe = $('input[name=popbillPwdRe]',$layerObject).val();
			let idCheck = $('input[name=idCheck]',$layerObject).val();
			let popbillContactName = $('input[name=popbillContactName]',$layerObject).val();
			let popbillContactTel = $('input[name=popbillContactTel]',$layerObject).val();
			

			if(self._utils.checkEmptyNull(id)){
				alert('아이디를 입력하십시오');
				return false;
			}
			if(id.trim().length < 8){
				alert('아이디는 8자리 이상 입력하십시오');
				return false;
			}
			if(idCheck!='Y'){
				alert('이미 사용중인 아이디 입니다.');
				return false;
			}
			if(pwd.length < 8){
				alert('비밀번호는 8자리 이상입력하십시오');
				return false;
			}
			if(self._utils.checkEmptyNull(pwd) || pwd != pwdRe){
				alert('비밀번호를 정확이 입력하십시오');
				return false;
			}
			if(!passwordRegex.test(pwd)) {
				alert('비밀번호는 영문, 숫자, 특수문자(~!@#$%^&*()_+) 포함 되어야 합니다.');
				return false;
			}

			if(self._utils.checkEmptyNull(popbillContactName)){
				alert('담당자 성명을 입력하십시오');
				return false;
			}
			if(self._utils.checkEmptyNull(popbillContactTel)){
				alert('담당자 전화번호를 입력하십시오');
				return false;
			}
			let mapData = {
				ctl : 'popbill',
				cmd : 'join',
				popbillId : id.trim(),
				popbillPwd : pwd.trim(),
				popbillContactName : popbillContactName.trim(),
				popbillContactTel : popbillContactTel.trim()
			}
			let _api = new AjaxCall(self._const
				,mapData
				,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					let d = rdata.data;
					if(d.code != 1){
						alert(d.message);
					}else{
						self.apiAccount();
						self.popbillEvent();
						alert('신청되었습니다.');
						$("body .btnClosePopLayer").trigger('click');
					}
				}
			});

		});
		
	}
	popbillQuitEvent = (popupID, d) =>{
		const self = this;
		const $layerObject = $(`#${popupID}`);
		let $popbill = $('.popbill',self._code);

		// 잔여포인트 가져오기
		let mapData = {
			ctl : 'popbill',
			cmd : 'pointBalance',
			cBizNo : $('input[name=cBizNo]',self._code).val(),
			coaId : $('input[name=coaId]',$popbill).val(),
		}
		// 잔여 포인트 조회 하여 환불 유도함
		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':false});
		_api.ajaxformdata(function(rdata2){ 
			if(rdata2.code == 0){
				let d2 = rdata2.data;
				if(d2.code == 1){
					if(d2.result>0){
						alert('잔여 포인트가 남아 있습니다. popbill을 통하여 환불 받으신 후 해지 하시기 바랍니다.');
						let $btn = $('<a href="javascript:;" class="btnStyle05 btnPopbillRefund" style="margin-left:15px;">환불신청하러 가기</a>');
						$btn.on('click',function(){
							let mapData = {
								ctl : 'popbill',
								cmd : 'popbillWebUrl',
								coaId : $('input[name=coaId]',$popbill).val(),
							}
							let _api = new AjaxCall(self._const
								,mapData
								,{'wapi': 'user/ws','spinner':false});
							_api.ajaxformdata(function(rdata2){ 
								if(rdata2.code == 0){
									let d2 = rdata2.data;
									if(d2.code == 1){
										let d = rdata2.data;
										let win = window.open(d.message , 'popbileSite', self._utils.popWindowCenter(1250,850));
										win.focus();
									}
								}
							});
						});
						$('.reFund',$layerObject).append($btn);
					}
				}
			}
		});		

		$('.popbillQuit',$layerObject).on('click', function(){
			let quitReason = $('textarea[name=quitReason]',$layerObject).val();
			let coaId = $('input[name=coaId]',$popbill).val();

			if(self._utils.checkEmptyNull(quitReason)){
				alert('아이디를 입력하십시오');
				return false;
			}
			let mapData = {
				ctl : 'popbill',
				cmd : 'quit',
				quitReason : quitReason,
				coaId : coaId,
			}
			let _api = new AjaxCall(self._const
				,mapData
				,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					let d = rdata.data;
					if(d.code != 1){
						alert(d.message);
					}else{
						alert('해지 되었습니다.');
						$("body .btnClosePopLayer").trigger('click');
					}
				}
			});
		});
		

	}
	purge = () => {
		const self = this;

		console.log("employeeController purge");
	}

	reload = () => {
		const self = this;

		console.log("employeeController reload");
	}

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'load'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'update'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	mediaUpload = (file, cbfunc) => {
		let self = this;

		let form_data = new FormData();
				form_data.append('ctl', 'media');
				form_data.append('cmd', 'upload');
				form_data.append('directory', 'company');
				//form_data.append('target', 'P');
				form_data.append('authLevel', 3);
				form_data.append('upfile', file);
				
				let _api = new AjaxCall(self._const
						,form_data
						,{'isasync':false, 'wapi': 'user/fws','spinner':true});
						_api.ajaxfiledata(function(rdata){ 
								if(rdata.code == 0) {
										cbfunc(rdata.data);
								} else {
										alert(rdata.message);
										cbfunc(-9999);
								}
						});
	}

	accountDelete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'accountDelete'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	accountInsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'accountInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	accountUpdate = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'accountUpdate'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	apiAccountList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'apiAccountList'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	apiInfoSave = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'apiAccountSave'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	
}
export default companyController