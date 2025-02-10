
'use strict';
import Utils from '../../../raon_modules/utils.js';
import AjaxCall from '../../../raon_modules/AjaxCall.js';


let workReportDashboardController = class {
	constructor(_const, _data, _param) {
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
		this._options = {};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._employee = {};
	}

	init = (_code,_data) => {
		const self = this;
		self._id = _code;
		self._data = _data?_data:{};

		let $workReport = $('#mobileContainerWorkReport');
		let $workReportBoard = $('.workReportBoard');
		let $workInfoTable_org  = $('.workInfoTable', $workReportBoard).clone();

		$workReportBoard.empty();
	
		let parameter = sessionStorage.getItem('parameter');
		let params = parameter.split('&');
		let param = {};
		for(let i=0;i<params.length;i++){
			let p = params[i].substring(0, params[i].indexOf('='));
			let v = params[i].substring(params[i].indexOf('=')+1);
			param[p] = v;
		}

		if(param.p == undefined){
			alert('작업지시서의 QR코드를 통하여 진입하시기 바랍니다.');
			return;		
		}else{
			let dData = self._utils.decryptData(decodeURI(param.p));
			let pdata = {};
			let params = dData.split('&');
			for(let i=0;i<params.length;i++){
				let p = params[i].split('=');
				pdata[p[0]] = p[1];
			}
			if(pdata.oSeq != undefined){
				let data = {ctl:"outsourcing", cmd :"orderDataLoad", oSeq : pdata.oSeq};
				let _api = new AjaxCall(self._const,data);
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						
						let d = rdata.data;
						if(d.workInfo == undefined || d.workInfo.length == 0){
							alert('발주된 작업 내용이 존재하지 않습니다.');
							setTimeout(function(){location.href = '/workreport?p='+parameter},4000);
							return;
						}
						let is = true;
						if(d.oApprovalYn != 'Y'){
							alert('승인되지 않은 수주건 입니다.');
							is = false;
							setTimeout(function(){location.href = d.cHompage}, 3000);
							return;
						}
						if(d.oStatus == 'C'){
							alert('완료된 수주건 입니다.');
							is = false;
							setTimeout(function(){location.href = d.cHompage}, 3000);
							return;
						}

						self._utils.classNameInput($workReport, d);

						$('.cTel', $workReport).text(self._utils.formatPhoneNumber(d.cTel));

						if(!self._utils.checkEmptyNull(d.osInMemo)){
							let style = $('.osInNm', $workReport).attr('style');
							style += 'font-size:12px;';
							$('.osInNm', $workReport).text(d.osInNm + ' ('+ d.osInMemo+')');
							$($('.osInNm', $workReport)).attr('style', style);
						}
						if(!self._utils.checkEmptyNull(d.osOutMemo)){
							let style = $('.osOutNm', $workReport).attr('style');
							style += 'font-size:12px;';
							$('.osOutNm', $workReport).text(d.osOutNm + ' ('+ d.osOutMemo+')');
							$($('.osOutNm', $workReport)).attr('style', style);
						}	

						let process = "";
						d.processInfo.sort((a, b) => {
							if (a.sort < b.sort) return -1;
							if (a.sort > b.sort) return 1;
							return 0;
						});
						for(let i=0;i<d.processInfo.length;i++){
							let info = d.processInfo[i];
							process += '<span class="mprocessStatus'+ info.pStatus +'" >'+info.spNm+'</span>';
						}
						$('.processFlow',$workReport).empty().append(process);

						let workInfo = d.workInfo;
						for(let i=0;i<workInfo.length;i++){
							let $workInfo = $workInfoTable_org.clone();
							let $workInfoThead_org = $('thead tr',$workInfoTable_org).clone();
							let $workInfoTop_org = $('tbody tr:eq(0)',$workInfoTable_org).clone();
							let $workInfoMiddle_org = $('tbody tr:eq(1)',$workInfoTable_org).clone();
							let $workInfoBottom_org = $('tbody tr:eq(2)',$workInfoTable_org).clone();

							$('thead',$workInfo).empty();
							$('tbody',$workInfo).empty();

							let $workInfoThead = $workInfoThead_org.clone();
							let $workInfoTop = $workInfoTop_org.clone();
							let $workInfoMiddle = $workInfoMiddle_org.clone();
							let $workInfoTrBottom = $workInfoBottom_org.clone();
							let w = workInfo[i];
							self._utils.classNameInput($workInfoThead,w);

							if(!self._utils.checkEmptyNull(w.wInfo)){
								$('.wNm',$workInfoThead).text(w.wNm + '('+ w.wInfo +')');
							}
							if(!self._utils.checkEmptyNull(w.oswMemo))	$('.oswMemo',$workInfoThead).text('※ '+ w.oswMemo);

							if(w.oswStatus == 'D'){
								$workInfoThead.children().css('background','#999');
								$('.wNm',$workInfoThead).css('border-right','1px solid #777 !important');
								$('.workCheck',$workInfoThead).css('color','#fff !important');
							}else if(w.oswStatus == 'B'){
								$workInfoThead.children().css('background','#4e80ee');
							}
							$('thead',$workInfo).append($workInfoThead);

							self._utils.classNameInput($workInfoTop,w);
							let oIdx = 0;
							let optInfo = (w.optionInfo.length>0)?w.optionInfo:w.optionInfoOrg;
							for(let o=0;o<optInfo.length;o++){
								if(optInfo[o].cwoOrderYn == 'Y'){
									let v = ((optInfo[o].oswoInput != undefined) ? optInfo[o].oswoInput : optInfo[o].woInput)
									if(!self._utils.checkEmptyNull(v)){
										let $optTag = optInfo[o].cwoNm +' : '+ v;
										if(oIdx==0){
											$('.wOption',$workInfoTop).append($optTag);
											$('tbody',$workInfo).append($workInfoTop);
										}else{
											$workInfoMiddle = $workInfoMiddle_org.clone();
											$('.wOption',$workInfoMiddle).append($optTag);
											$('.wOption',$workInfoMiddle).css({'border-bottom':'1px solid #a3a3a3'});
											$('tbody',$workInfo).append($workInfoMiddle);
										}
										oIdx++;
									}
								}
							}
							if(oIdx == 0){
								$('.wFrontYnNm, .oswCnt', $workInfoTop).removeAttr('rowspan');
								$('.wOption',$workInfoTop).append('&nbsp;').css({'border-bottom':'2px solid #a3a3a3'});;
								$('tbody',$workInfo).append($workInfoTop);
							}else{
								$('.wOption',$workInfoMiddle).css({'border-bottom':'2px solid #a3a3a3'});
								$('.wFrontYnNm, .oswCnt', $workInfoTop).attr('rowspan', oIdx);
							}
							
							let btnNm = '진행';
							if(w.oswStatus =='B'){
								btnNm = '완료';
							}
							
							if(w.oswStatus == 'D'){
								$('.btnAction',$workInfoTrBottom).attr('style','border:0px;text-align: left;padding-left: 120px;');
								btnNm = '완료일시 : <strong>'+ w.oswStatusDate.substring(0,16)  +'</strong>';
								btnNm += '<br>완료수량 : <strong>'+ self._utils.numberWithCommas(w.oswEndCnt) +'</strong>';
								$('.btnAction',$workInfoTrBottom).empty().append(btnNm);

							}else{
								$('.btnAction',$workInfoTrBottom).text(btnNm);
							}
							$('tbody',$workInfo).append($workInfoTrBottom);
							$workInfo.data("ROW", w);
							$workReportBoard.append($workInfo);
						}
					} else {
						alert(rdata.message);
					}
				
				});
			}else{
				alert('주문번호가 정확하지 않습니다.');
			}
		}
		
		$('tbody',$workReportBoard).hide();
		$workReportBoard.on('click','table thead tr',function(){
			$('tbody',$workReportBoard).hide();
			$('.workCheck',$workReportBoard).text('');
			
			let $table = $(this).closest('table');
			$('.workCheck',$table).text('✔');
			$('tbody',$table).show();
		});
		$workReportBoard.on('click','.btnAction',function(){
			let $table = $(this).closest('table');
			let d = $table.data('ROW');
			let actionNm = '진행';
			let message = '처리하시겠습니까?';
			if(d.oswStatus == 'B'){
				actionNm = '완료';
			}


			let $popDiv = $('template#outworkAction');
			self.openLayer($popDiv.html(), self.workActionEvent, d);
			
		});


	}

	workActionEvent = (popupID, d) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);
		let oswStatus = 'B';
		let actionNm = '진행';
		$('input[name=oswActionCnt]',$layerObject).attr('placeholder','진행 시작 수량을 입력하십시요');
		if(d.oswStatus == 'B'){
			actionNm = '완료';
			oswStatus = 'D'
			$('input[name=oswActionCnt]',$layerObject).attr('placeholder','완료 수량을 입력하십시요');
		}

		$('.actionNm',$layerObject).text(actionNm);
		let wNm = d.wNm;
		if(!self._utils.checkEmptyNull(d.wInfo)) wNm += '('+ d.wInfo +')';
		$('.wNm',$layerObject).text(wNm);

		$layerObject.on('click','.btnActionCall',function(){
			let oswActionCnt = $('input[name=oswActionCnt]',$layerObject).val();
			if(self._utils.checkEmptyNull(oswActionCnt)){
				alert('수량을 입력하십시오');
				return false;
			}
			oswActionCnt = self._utils.getOnlyNumber(oswActionCnt);
			
			let data = {ctl:"outsourcing", cmd :"statusUpdate", wSeq : d.wSeq, oswSeq: d.oswSeq, oswStatus :oswStatus };
			if(oswStatus == 'D'){
				data.oswEndCnt = oswActionCnt;
			}else if(oswStatus == 'B'){
				data.oswStartCnt = oswActionCnt;
			}
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						self.modifyTime('work',function(){document.location.reload();});
						
					} else {
						alert(rdata.message);
					}
			});

		});

	}

	openLayer = (data,cbfunc, d, $parentObj) => {
		const self = this;
		let popupID = self.createUniqueId();
		let obj;

		let openDiv = '<div class="mw_layer open"><div class="bg"></div><div id="'+popupID+'" class="ctlContainer">'+data+'</div></div>';
		$("body").append(openDiv);
			
		// 레이어 설정
		obj = $("#"+popupID+" div:eq(0)");
		let handler = obj.find(".mw_title");
		obj.draggable({containment:"body", cursor:"move", handle:handler});
		self.initPositionLayer(obj);

		// contents 원래크기 기록
		let contentsDiv = $(".contents");
		let contentsHeight = contentsDiv.height();
		if(contentsDiv.attr("data-height")==undefined){
			contentsDiv.attr("data-height", contentsDiv.height());
		}

		$("body").on("click", ".btnClosePopLayer", function(){
			let $video = $('video');
			if($video.length > 0){ 
				self.stopScan($video[0]);
			}
			self._scanner = false;
			self.closeLayerPopup($(this));
		});

		cbfunc(popupID , d, $parentObj);
	}

	closeLayerPopup = ($obj) => {
		if($obj != undefined){
			$obj.closest(".mw_layer").html("").remove();
	
			// contents 원래크기로 변경
			var contentsDiv = $(".contents");
			if(contentsDiv.attr("data-height")!=undefined){
				contentsDiv.css("minHeight", contentsDiv.attr("data-height")+"px");
			}
		}
	}

	createUniqueId = () => {
		const self = this;
		self._uniqueID = self._uniqueID ?? 0;
		return "dynamicLayerID_" + (++self._uniqueID);
	}
	initPositionLayer = ($id) => {
		const self = this;

		let objWrap = $(".wrap");
		let heightDoc = objWrap.height(); // 문서높이
		let widthDoc = objWrap.width(); // 문서너비
		let heightWin = $(window).height(); // 창높이
		let widthWin = $(window).width(); // 창너비
		let layerHeight = $id.height(); // 레이어높이
		let layerWidth = $id.width(); // 레이어너비
		let top = $(document).scrollTop(); // 스크롤세로
		let left = $(document).scrollLeft(); // 스크롤가로

		if(widthDoc==0) widthDoc = $(document).width();
		if(heightDoc==0) heightDoc = $(document).width();
	
		if(widthWin<layerWidth) widthWin=widthDoc; // 가로는 출력내용이 많을경우 Doc 크기로 변경
	
		top += (heightWin-layerHeight)/2;
		left += (widthWin-layerWidth)/2;
		if(top<10) top=10; // 최소 10px
		if(left<10) left=10; // 최소 10px
	
		$id.css("top", top);
		$id.css("left", left);
		$id.parent().prev(".bg").height('100%'); // 불투명 스크린 문서크기만큼 height 리사이즈
		$id.parent().prev(".bg").width('100%'); // 불투명 스크린 문서크기만큼 width 리사이즈
	}
	modifyTime = (_mapData, cbfunc) => {
		try{
			const self = this;
			let mapData = {ctl : 'media',cmd : 'realLastTimeSave'};
			$.extend(mapData,_mapData);
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					if(typeof cbfunc == 'function') cbfunc();
				} else {
					toast('수정 시간 기록 실패');
				}
			});
		}catch(e){
			console.error(e.message);
		}		
	}
	lastModifyTimeCheck = (keys = [], dateTime = self._utils.currentDateTime() , minutes = 3, trueCbfunc, fasleCbfunc) =>{
		let self = this;
		let checkDateTime = new Date(dateTime.substring(0,4), parseInt(dateTime.substring(4,6))-1, dateTime.substring(6,8), dateTime.substring(8,10), dateTime.substring(10,12),dateTime.substring(12));
		//checkDateTime.setMinutes(checkDateTime.getMinutes() - minutes);
		try{
			this.lastModifyTime(function(data){
				console.log(data)
				let is = false;
				if(typeof keys == 'string'){
					if(data[keys] != undefined){
						let d = data[keys];
                		let lastDateTime = new Date(d.substring(0,4), parseInt(d.substring(4,6))-1, d.substring(6,8), d.substring(8,10), d.substring(10,12),d.substring(12));
                		if((lastDateTime - checkDateTime) > (minutes * 60 *1000)){
						//if(lastDateTime > checkDateTime){
							is = true;
							if (typeof trueCbfunc == 'function') trueCbfunc();
						}
					}
				}else{
					for(let i=0;i<keys.length;i++){
						if(data[keys[i]] != undefined){
							let d = data[keys[i]];
							let lastDateTime = new Date(d.substring(0,4), parseInt(d.substring(4,6))-1, d.substring(6,8), d.substring(8,10), d.substring(10,12),d.substring(12));
							if((lastDateTime - checkDateTime) > (minutes * 60 *1000)){
							// if(lastDateTime > checkDateTime){
								is = true;
								if (typeof trueCbfunc == 'function') trueCbfunc();
								break;
							}
						}	
					}
				}
				if(!is){
					if (typeof fasleCbfunc == 'function') fasleCbfunc();
				}
			});
		}catch(e){
			console.log(e.message);
		}
	}
}
export default workReportDashboardController
