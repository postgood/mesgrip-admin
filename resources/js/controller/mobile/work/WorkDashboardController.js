
'use strict';
import Utils from '../../../raon_modules/utils.js';
import AjaxCall from '../../../raon_modules/AjaxCall.js'

class WorkDashboardController {
	constructor(_const, _data, _param) {
			this._const = _const?_const:{};
			this._data = _data?_data:{};
			this._param = _param?_param:{};
			this._options = {};
			this._utils = new Utils();
			this._ajax = new AjaxCall();
			this._employee = {};
			this._scanner = false;
			this._facingMode = 'user';
			this._isMyJob = true;
			// Object.freeze(this._const);
			this._currentDateTime = this._utils.currentDateTime();
	}

	init = () => {
		let self = this;
		let width  = window.innerWidth  || document.body.clientWidth;
		let height  = window.innerHeight  || document.body.clientHeight;
		let nowSelf = this;
		
		self.intervalId = setInterval(function(){
				self.lastModifyTimeCheck(['order','work','distribution'],self._currentDateTime, function(){
					self._currentDateTime = self._utils.currentDateTime();
						setTimeout(function(){
							$('.workBoardTab .workBoardTabLeft li.on').trigger('click');
						}, 30000);
				}
		)}, 150*1000);


		$('.workList').css('height',height-30);

		let logBoxWidth = $('.logBox').width();
		if(width != parseInt(logBoxWidth)){
			$('.logBox').css('left', '50%').css('margin-left', '-250px');
		}
		let today = self._utils.currentDate();
		let _day = ['일','월','화','수','목','금','토'];
		let week = new Date(today).getDay();
		$('.mobileToday').text(today + " ("+ _day[week] +")");
		$('.eNm').text(self._const.__USER_NAME);
		$(".cNm").empty().text(self._const.__C_NM);
		let $workList = $('.workList').children();


		// 대기중 버튼
		let $workListStatusATbody = $('.workListStatusA table tbody');
		$workListStatusATbody.on('click','.workNmBtn',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let data = {ctl:"work", cmd :"wStatusCheck", wSeq : d.wSeq};
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						if(rdata.data.wStatus != 'A'){
							alert('<span style="font-size:19px !important">현재 작업은 대기 상태가 아닙니다.</span>');
							return false;
						}
						$.extend(d,rdata.data);
						let $popDiv = $('template#workStart');
						self.openLayer($popDiv.html(), self.workStartEvent, d);
					} else {
							alert(rdata.message);
					}
			});
		});
		$workListStatusATbody.on('click','td.cuNm, td.oFileNm',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let data = {ctl:"order", cmd :"load", oSeq : d.oSeq};
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						$.extend(rdata.data,d);
						let $popDiv = $('template#workView');
						self.openLayer($popDiv.html(), self.workViewEvent, rdata.data);
					} else {
							alert(rdata.message);
					}
			});
		});
		// 작업중 버튼
		let $workListStatusB = $('.workListStatusB');
		$workListStatusB.on('click','.btnFinishCall',function(){
			let $workStatusBInfo = $(this).closest('.workStatusBInfo');
			let d = $workStatusBInfo.data("ROW");
			let $popDiv = $('template#workAction');
			self.openLayer($popDiv.html(), self.workFinishEvent, d);
		});
		$workListStatusB.on('click','.btnStopCall',function(){
			let $workStatusBInfo = $(this).closest('.workStatusBInfo');
			let d = $workStatusBInfo.data("ROW");
			let $popDiv = $('template#workAction');
			self.openLayer($popDiv.html(), self.workStopEvent, d);
		});
		let $nextStatusA = $('.workListStatusB .nextStatusA tbody');
		$nextStatusA.on('click','td.cuNm, td.oFileNm',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let data = {ctl:"order", cmd :"load", oSeq : d.oSeq};
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						$.extend(rdata.data,d);
						let $popDiv = $('template#workView');
						self.openLayer($popDiv.html(), self.workViewEvent, rdata.data);
					} else {
							alert(rdata.message);
					}
			});
		});
		$nextStatusA.on('click','.workNmBtn',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let data = {ctl:"work", cmd :"wStatusCheck", wSeq : d.wSeq};
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						if(rdata.data.wStatus != 'A'){
							alert('<span style="font-size:19px !important">현재 작업은 대기 상태가 아닙니다.</span>');
							return false;
						}
						$.extend(d,rdata.data);
						let $popDiv = $('template#workStart');
						self.openLayer($popDiv.html(), self.workStartEvent, d);
					} else {
							alert(rdata.message);
					}
			});
		});

		let $workStatusBInfoOrg = $('.workStatusBInfo');
		let $tab = $('.workBoardTabLeft');
		$('input[name=onlyToday]').on('change',function(){
			$('li:first',$tab).trigger('click');
		});
		
		$('li',$tab).on('click',function(){
			let $this = $(this);
			let tabIdx = $this.index();
			if(!$this.hasClass('on')){
				$('li',$tab).removeClass('on');
				$(this).addClass('on');
				$workList.css('display','none');
				$($workList[tabIdx]).css('display','block');
			}

			// 대기 작업 가져오기
			if(tabIdx == 0){
				self.wStatisA(function(data){
					let $wStatusATable = $($workList[0]);
					let $tbody = $('table tbody',$wStatusATable);
					$tbody.empty();
					if(data.length > 0){
						for(let i=0;i<data.length;i++){
							let d = data[i];
							let btStyle = '';
							let tdStyle = '';
							if(!self._utils.checkEmptyNull(d.onContent)) tdStyle = 'color:#ea467f !important;'
							if(d.wStatus == 'C') btStyle += 'background:#ea467f !important;';
							let $tr = $('<tr />').data('ROW',d);
							$tr.append('<td class="al cuNm">'+ d.cuNm +'</td>');
							$tr.append('<td class="al oFileNm" style="'+tdStyle+'">'+ d.oFileNm +'</td>');
							
							$tr.append('<td class="ac">'+ d.oPaperSize +'</td>');
							$tr.append('<td class="ac">'+ d.wFrontYnNm.substring(0,1) +'</td>');
							$tr.append('<td class="ac"><span class="workNmBtn" style="'+ btStyle +'">'+ d.wNm +'</span></td>');
							
							$tr.append('<td class="ar" style="padding-right:10px;">'+ self._utils.numberWithCommas(d.oCnt) +'</td>');

							$tbody.append($tr);
						}
					}else{
						$tbody.append('<tr><td class="ac" colspan="6">데이타가 없습니다.</td></tr>');
					}
				});
			}else if(tabIdx == 1){
				let $wStatusBTable = $($workList[1]);
				self.wStatisB(function(data){
					let heigth = 0;
					let $tbody = $('.nextStatusA tbody',$wStatusBTable);
					let $workListStatusB = $('.workListStatusB');
					$('.workStatusBInfo',$workListStatusB).remove();
					if(data.length > 0 ){
						for(let b =data.length-1;b >= 0;b--){
							let $workStatusBInfo = $workStatusBInfoOrg.clone();
							$workStatusBInfo.show();
							let wInfo = data[b];
							$workStatusBInfo.data("ROW", wInfo);
							self._utils.classNameInput($workStatusBInfo, wInfo);
							$('.oApprovalDate',$workStatusBInfo).text(self._utils.checkEmptyNull(wInfo.oApprovalDate) ?'미승인': self._utils.dateformatMin(wInfo.oApprovalDate))
							$('.wStartDate', $workStatusBInfo).text(wInfo.wStartDate.substring(0,16));
							$('.oCnt',$workStatusBInfo).text(self._utils.numberWithCommas(wInfo.oCnt));
							$('.oFileInfo', $workStatusBInfo).text(wInfo.oFileNm)
							let opts = wInfo.optionInfo;
							let options = '';
							for(let o=0;o<opts.length;o++) {
								let od = opts[o];
								if(od.cwoOrderYn == 'Y'){
									if(od.woInput != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm" style="font-size:18px;"><strong class="workOptionInfo" style="font-size:20px;">'+ od.cwoNm + ' : <span style="font-weight: bold;">'+ od.woInput +'</span></strong></span>');}
								}
							}
							$('.workOptionListDiv', $workStatusBInfo).empty().append(options);


							let process = "";
							wInfo.processInfo.sort((a, b) => {
								if (a.sort < b.sort) return -1;
								if (a.sort > b.sort) return 1;
								return 0;
							});
							for(let i=0;i<wInfo.processInfo.length;i++){
								let info = wInfo.processInfo[i];
								if(info.outsourcingInfo.length>0){
									let workNm = [];
									let customerNm = [];
									for(let o=0;o<info.outsourcingInfo.length;o++){
										workNm.push(info.outsourcingInfo[o].wNm);
										customerNm.push(info.outsourcingInfo[o].cuNm);
									}
									process += '<span class="mprocessStatusOut" >'+info.spNm+'</span>';
								}else{
									process += '<span class="mprocessStatus'+ info.pStatus +'" >'+info.spNm+'</span>';
								}
							}

							$('.processFlow', $workStatusBInfo).empty().append(process);
							$workListStatusB.prepend($workStatusBInfo);

							heigth += $workStatusBInfo.height();
						}
						$($wStatusBTable).css('height',height+300);
					}else{
						let $workStatusBInfo = $workStatusBInfoOrg.clone();
						$workStatusBInfo.show();
						$workStatusBInfo.empty();
						$workStatusBInfo.append('<div class="noStatusMessage" style="width:100%;font-size:20px;">현재 진행중인 작업이 존재하지 않습니다.</div>');
						$workListStatusB.prepend($workStatusBInfo)
					}
				});

				self.wStatisA(function(data){
					let $tbody = $('.nextStatusA tbody',$wStatusBTable);
					$tbody.empty();
					if(data.length > 0){
						for(let i=0;i<data.length;i++){
							let d = data[i];
							let btStyle = '';
							let tdStyle = '';
							if(!self._utils.checkEmptyNull(d.onContent)) tdStyle = 'color:#ea467f !important;'
							if(d.wStatus == 'C') btStyle += 'background:#ea467f !important;';
							let $tr = $('<tr />').data('ROW',d);
							$tr.append('<td class="al cuNm">'+ d.cuNm +'</td>');
							$tr.append('<td class="al oFileNm" style="'+ tdStyle +'">'+ d.oFileNm +'</td>');
							$tr.append('<td class="ac">'+ d.oPaperSize +'</td>');

							$tr.append('<td class="ac">'+ d.wFrontYnNm.substring(0,1) +'</td>');
							$tr.append('<td class="ac"><span class="workNmBtn" style="'+ btStyle+'">'+ d.wNm +'</span></td>');
							$tr.append('<td class="ar" style="padding-right:10px;">'+ self._utils.numberWithCommas(d.oCnt) +'</td>');
							
							$tbody.append($tr);

							if(i == 2) break;
						}
					}else{
						$tbody.append('<tr><td class="ac" colspan="6">데이타가 없습니다.</td></tr>');
					}
					
				});

			}else if(tabIdx == 2){
				self.wStatisD(function(data){
					let $wStatusDTable = $($workList[2]);
					let $tbody = $('table tbody',$wStatusDTable);
					$tbody.empty();
					if(data.length > 0){
						for(let i=0;i<data.length;i++){
							let d = data[i];
							let $tr = $('<tr />').data('ROW',d);
							$tr.append('<td class="al">'+ d.oFileNm +'</td>');
							$tr.append('<td class="ac">'+ d.wNm +'</td>');
							$tr.append('<td class="ar" style="padding-right:5px;">'+ self._utils.numberWithCommas(d.wEndCnt) +'</td>');
							
							$tr.append('<td class="ac">'+ d.wStartDate.substring(5,16) +'</td>');
							$tr.append('<td class="ac">'+ d.wEndDate.substring(5,16) +'</td>');
							$tbody.append($tr);

						}
					}else{
						$tbody.append('<tr><td class="ac" colspan="6">데이타가 없습니다.</td></tr>');
					}
				});
			}

			
		});

		$('.dataReflash').on('click', function(){
			$('.workBoardTab .workBoardTabLeft li.on').trigger('click');
			/*
			for(let i=0;i<$workList.length;i++){
				if($($workList[i]).css('display') == 'block'){
					$('li:eq('+i+')',$tab).trigger('click');
				}
			}
			*/
		})

		$('.logOutBtn').on('click',function(){
			confirm('로그아웃 하시겠습니까?', function(data){
				if(data) {
					document.location.href="/work/logout";
				}
			},'로그아웃');
			
		});
		$('.qrScanner').on('click',function(){
/*
			let data = {ctl:"order", cmd :"load", oSeq : 280};
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						let $popDiv = $('template#workQrStart');
						self.openLayer($popDiv.html(), self.workQrStartEvent, rdata.data);
						//self.closeLayerPopup($layerObject);
					} else {
							alert(rdata.message);
					}
			});
*/			

			let $popDiv = $('template#workQrScanner');
			self.openLayer($popDiv.html(), self.workQrScannerEvent);

		});

		let data = {ctl:"employee", cmd :"load"};
		let _api = new AjaxCall(self._const,data);
		_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						let d = rdata.data;
						let eqInfo = d.equipmentInfo;
						let spNm = [];
						let spSeqs = [];
						let eqNm = [];
						let eqSeqs = [];
						for(let i=0;i<eqInfo.length;i++){
							if(spNm.indexOf(eqInfo[i].spNm) == -1){
								spNm.push(eqInfo[i].spNm);
								spSeqs.push(eqInfo[i].spSeq);
							}
							if(eqNm.indexOf(eqInfo[i].eqNm) == -1){
								eqNm.push(eqInfo[i].eqNm);
								eqSeqs.push(eqInfo[i].eqSeq);
							}
						}
						let mobileProcessNm = '담당 장비 없음';
						if(eqNm.length > 0 ){
							if(spNm.length == 1){
								mobileProcessNm = spNm[0];
							}else{
								mobileProcessNm = spNm[0] +' 외 '+ (spNm.length -1);
							}
							if(eqNm.length == 1){
								mobileProcessNm += '('+ eqNm[0] +')';
							}else{
								mobileProcessNm += '('+ eqNm[0] +' 외 '+ (eqNm.length -1 )+')';
							}
						} 
						$('.mobileProcessNm').text(mobileProcessNm);
						d.spSeqs = spSeqs;
						d.spNms = spNm;
						d.eqSeqs = eqSeqs;
						self._employee = d;
						$('li:eq(1)',$tab).trigger('click');
					} else {
							alert(rdata.message);
					}
			});

	}

	wStatisA = (cbfunc) =>{
		const today = new Date;
		const self = this;
		let data = {ctl:"employee", cmd :"workList",rows:20};

		if(self._employee.eqSeqs.length > 0){
			//if( self._employee.eManagerYn == 'N'){
				data.spSeqs = JSON.stringify(self._employee.spSeqs);
				data.eqSeqs = JSON.stringify(self._employee.eqSeqs);
			//}
			let onlyToday = $('input[name=onlyToday]:checked').val()??'N';
			data.onlyToday = onlyToday;
			data.wStatus = 'A';
			data.endDt = today.toISOString().substring(0,10).replace(/-/g,'');
			today.setDate(today.getDate() - 30);
			data.startDt = today.toISOString().substring(0,10).replace(/-/g,'');
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0) {
					
					$(".roadTime").text(self._utils.currentTime());
					cbfunc(rdata.data);
				}else{
					alert(rdata.message);
				}
			});
		}else{
			cbfunc([]);
		}
	}

	wStatisB = (cbfunc) =>{
		const today = new Date;
		const self = this;
		if(self._employee.eqSeqs.length > 0){
			let data = {ctl:"employee", cmd :"workList",rows:20};
			//if( self._employee.eManagerYn == 'N'){
				data.spSeqs = JSON.stringify(self._employee.spSeqs);
				data.eqSeqs = JSON.stringify(self._employee.eqSeqs);
			//}
			data.wStatus = 'B';
			data.endDt = today.toISOString().substring(0,10).replace(/-/g,'');
			today.setDate(today.getDate() - 30);
			data.startDt = today.toISOString().substring(0,10).replace(/-/g,'');
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0) {
					$(".roadTime").text(self._utils.currentTime());
					cbfunc(rdata.data);
				}else{
					alert(rdata.message);
				}
			});
		}else{
			cbfunc([]);
		}			
	}
	wStatisD = (cbfunc) =>{
		const today = new Date;
		const self = this;
		if(self._employee.eqSeqs.length > 0){		
			let data = {ctl:"employee", cmd :"workList",rows:50};
			//if( self._employee.eManagerYn == 'N'){
				data.spSeqs = JSON.stringify(self._employee.spSeqs);
				data.eqSeqs = JSON.stringify(self._employee.eqSeqs);
			//}
			data.wStatus = 'D';
			data.endDt = today.toISOString().substring(0,10).replace(/-/g,'');
			today.setDate(today.getDate() - 2);
			data.startDt = today.toISOString().substring(0,10).replace(/-/g,'');
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0) {
					$(".roadTime").text(self._utils.currentTime());
					cbfunc(rdata.data);
				}else{
					alert(rdata.message);
				}
			});
		}else{
			cbfunc([]);
		}
	}
	workViewEvent = (popupID, d) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);
		self._utils.classNameInput($layerObject,d)
		if(!self._utils.checkEmptyNull(d.oInchargeTel))  $('.oInchargeTel',$layerObject).text(self._utils.formatPhoneNumber(d.oInchargeTel));
		let process = "";
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			if(info.outsourcingInfo.length>0){
				let workNm = [];
				let customerNm = [];
				for(let o=0;o<info.outsourcingInfo.length;o++){
					workNm.push(info.outsourcingInfo[o].wNm);
					customerNm.push(info.outsourcingInfo[o].cuNm);
				}
				process += '<span class="mprocessStatusOut" >'+info.spNm+'</span>';
			}else{
				process += '<span class="mprocessStatus'+ info.pStatus +'" >'+info.spNm+'</span>';
			}
		}

		$('.processFlow', $layerObject).empty().append(process);

		if(d.orderNotice.length > 0){
			$('.orderNotice', $layerObject).empty();
			$('.orderNotice', $layerObject).append(d.orderNotice[0].onContent);
		}else{
			$('.orderNotice', $layerObject).empty();
		}


		let $workTbody = $('.orderWorkList tbody',$layerObject);
		for(let i=0;i<d.workInfo.length;i++){
			let work = d.workInfo[i];
			let $tr = $('<tr />');
			$tr.append($('<td class="ac" style="color:#fff;"/>').append(work.spNm));
			$tr.append($('<td class="ac" style="color:#fff;"/>').append(work.wNm + ((self._utils.checkEmptyNull(work.wInfo)?'':'('+ work.wInfo +')'))));
			$tr.append($('<td class="ac" style="color:#fff;"/>').append(work.wFrontYnNm));
			$tr.append($('<td class="ac" style="color:#fff;"/>').append((work.wStartDate == undefined?'':work.wStartDate.substring(0,16))));
			$tr.append($('<td class="ac" style="color:#fff;"/>').append((work.wEndDate == undefined?'':work.wEndDate.substring(0,16))));
			$tr.append($('<td class="ac" style="color:#fff;"/>').append(work.wStatusNm));
			$workTbody.append($tr);
		}

	}
	workStartEvent = (popupID, d) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);
		self._utils.classNameInput($layerObject,d)
		if(self._utils.checkEmptyNull(d.onContent)) $('.orderNotice',$layerObject).hide();
		let opts = d.optionInfo;
		let options = '';
		for(let o=0;o<opts.length;o++) {
			let od = opts[o];
			if(od.cwoOrderYn == 'Y'){
				if(od.woInput != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm"><strong class="workOptionInfo" style="color:#fff;">'+ od.cwoNm + ' : <span style="font-weight: bold;color:#fff;">'+ od.woInput +'</span></strong></span>');}
			}
		}
		$('.workOptionListDiv', $layerObject).empty().append(options);
		let process = "";
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			if(info.outsourcingInfo.length>0){
				let workNm = [];
				let customerNm = [];
				for(let o=0;o<info.outsourcingInfo.length;o++){
					workNm.push(info.outsourcingInfo[o].wNm);
					customerNm.push(info.outsourcingInfo[o].cuNm);
				}
				process += '<span class="mprocessStatusOut" >'+info.spNm+'</span>';
			}else{
				process += '<span class="mprocessStatus'+ info.pStatus +'" >'+info.spNm+'</span>';
			}
		}

		$('.processFlow', $layerObject).empty().append(process);

		$('.btnStartCall',$layerObject).on('click',function(){
			/*let isCheck = $('input[name=confirmation]:checked',$layerObject).val() ?? 'N';
			if(isCheck != 'Y'){
				alert('작업 세부사항을 확인 여부를 체크해 주십시오');
				return false;
			}
			*/
			//선공정이 없는 경우 첫 공정으로 바로 착수 가능

			if(d.processInfo.befer == undefined){
				actionRunCheck(d);
			}else{
				if(d.wStatus == 'A' && d.processInfo.befer.pStatus != 'D'){
					
					confirm('선 공정 ['+ d.processInfo.befer.spNm +']가 완료 되지 않았습니다. \n\n작업진행 하시겠습니까?', function(data){
						if(data) {
							actionRunCheck(d);
						}
					}," 강제 작업 진행");
				}else{
					actionRunCheck(d);
				}

			}

			

			function actionRunCheck(d){
				if(d.istInStatus != 'C'){
					confirm('입고가 되지 않은 작업 입니다. \n직접 입고처리 하시겠습니까?', function(data){
						if(data) {
							let mapData = {ctl : 'work',cmd : 'incoming', wSeq: d.wSeq};
							let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code==0) {
									self.modifyTime({action:'distribution'});
									let data = {ctl:"work", cmd :"action"};
									data.wSeq = d.wSeq;
									data.action = 'start';
									let _api = new AjaxCall(self._const,data);
									_api.ajaxformdata(function(rdata){ 
										if(rdata.code == 0) {
											self.closeLayerPopup($layerObject);
											alert('<span style="font-size:19px !important">작업이 시작되었습니다.</span>');
											let $tab = $('.workBoardTabLeft');
											$('li:eq(1)',$tab).trigger('click');
											self.modifyTime({action:'work'});
										}else{
											alert(rdata.message);
										}
									});
								} else{
									alert(d.message);
								}

							});
						}
					}, '입고처리');
				}else{
					let data = {ctl:"work", cmd :"action"};
					data.wSeq = d.wSeq;
					data.action = 'start';
					let _api = new AjaxCall(self._const,data);
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code == 0) {
							self.closeLayerPopup($layerObject);
							alert('<span style="font-size:19px !important">작업이 시작되었습니다.</span>');
							let $tab = $('.workBoardTabLeft');
							$('li:eq(1)',$tab).trigger('click');
							self.modifyTime({action:'work'});
						}else{
							alert(rdata.message);
						}
					});				}
			}
		});

	}
	workFinishEvent = (popupID, d) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);
		
		let title = '['+ d.wNm +'] 작업을 완료합니다.';
		$('.workTitle',$layerObject).append(title);
		$('.workSubTitle',$layerObject).append('완료수량 :');
		d.action = 'end';
		self.workActionEvent($layerObject,d);
	}
	workStopEvent = (popupID, d) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);

		let title = '['+ d.wNm +'] 작업을 <span style="color:red;">중지</span>합니다.';
		$('.workTitle',$layerObject).append(title);
		$('.workSubTitle',$layerObject).append('작업수량 :');
		$('.btnActionCall ',$layerObject).removeClass('workActionStartBtn').addClass('workActionStopBtn').empty().append('<i class="fa-solid fa-pause"></i>&nbsp;&nbsp;작업중지');
		d.action = 'stop';
		self.workActionEvent($layerObject,d);

	}
	workActionEvent = ($layerObject, d) => {
		const self = this;
		let top = $('.mobilePop ',$layerObject).position().top;
		$('.mobilePop ',$layerObject).css('top', '150px');
		
		$('input[name=wEndCnt]',$layerObject).on('change keyup input',function(){
			let v = $(this).val();
			v = self._utils.convertNumber(v);
			v = self._utils.numberWithCommas(v);
			$(this).val(v);
		});

		$layerObject.on('click','.btnActionCall',function(){
			let wEndCnt = $('input[name=wEndCnt]',$layerObject).val();
			if(self._utils.checkEmptyNull(wEndCnt)){
				alert('<span style="font-size:19px !important">수량을 입력하십시오</span>');
				return false;
			}
			wEndCnt = self._utils.getOnlyNumber(wEndCnt);
			let data = {ctl:"work", cmd :"wStatusCheck", wSeq : d.wSeq};
			let _api = new AjaxCall(self._const,data);
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						if(rdata.data.wStatus != 'B'){
							alert('<span style="font-size:19px !important">현재 작업은 진행 상태가 아닙니다.</span>');
							return false;
						}

						let data = {ctl:"work", cmd :"action"};
						data.wSeq = d.wSeq;
						data.action = d.action;
						data.cnt = wEndCnt;
						let _api = new AjaxCall(self._const,data);
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code == 0) {
								self.closeLayerPopup($layerObject);
								alert('<span style="font-size:19px !important"> '+((data.action =='stop')?'중지':'완료')+' 처리 되었습니다.</span>');
								let $tab = $('.workBoardTabLeft');
								$('li:eq(1)',$tab).trigger('click');
								self.modifyTime({action:'work'});
							}else{
								alert(rdata.message);
							}
						});
	

					} else {
							alert(rdata.message);
					}
			});

		});

	}
	workQrScannerEvent = (popupID, d) => {
		let self = this;
		const $layerObject = $(`#${popupID}`);
		let video = document.createElement("video");	
		$('.cameraChange',$layerObject).on('click', function(){
			if(self._facingMode == 'environment'){
				self._facingMode = 'user';
			}else{
				self._facingMode = 'environment';
			}
			self.stopScan(video);
			setTimeout(startScan,500);

		});
		$('.btnClosePopLayer',$layerObject).on('click',function(){
			self.stopScan(video);
		});
		function startScan() {
				
			let canvasElement = document.getElementById("canvas");
			let canvas = canvasElement.getContext("2d");
			let loadingMessage = document.getElementById("loadingMessage");
			var outputContainer = document.getElementById("output");
			var outputMessage = document.getElementById("outputMessage");
			var outputData = document.getElementById("outputData");
			self._scanner = true;

			function drawLine(begin, end, color) {
				canvas.beginPath();
				canvas.moveTo(begin.x, begin.y);
				canvas.lineTo(end.x, end.y);
				canvas.lineWidth = 4;
				canvas.strokeStyle = color;
				canvas.stroke();
			}
	
				// 카메라 사용시
			navigator.mediaDevices.getUserMedia({ video: { facingMode: self._facingMode } }).then(function(stream) {
			//navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
				video.srcObject = stream;
				video.setAttribute("playsinline", true);      // iOS 사용시 전체 화면을 사용하지 않음을 전달
				video.play();
				requestAnimationFrame(tick);
			});
	
			function tick() {
				try{
				loadingMessage.innerText = "⌛ 스캔 기능을 활성화 중입니다."
	
				if(video.readyState === video.HAVE_ENOUGH_DATA) {
					loadingMessage.hidden = true;
					canvasElement.hidden = false;
					///outputContainer.hidden = false;
	
					// 읽어들이는 비디오 화면의 크기
					canvasElement.height = video.videoHeight;
					canvasElement.width = video.videoWidth;
					canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
					
					var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
					var code = jsQR(imageData.data, imageData.width, imageData.height, {
									inversionAttempts : "dontInvert",
					});
					
					// QR코드 인식에 성공한 경우
					if(code) {
						// 인식한 QR코드의 영역을 감싸는 사용자에게 보여지는 테두리 생성
						drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
						drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
						drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
						drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

						if(code.data.indexOf(document.location.host) > -1 || code.data.indexOf('127.0.0.1') > -1){
							let parameter = code.data.substring(code.data.indexOf('?')+3);
							parameter = self._utils.decryptData(decodeURI(parameter));
							let param = {};
							let params = parameter.split('&');
							for(let i=0;i<params.length;i++){
								let p = params[i].split('=');
								param[p[0]] = p[1];
							}

							if(param.oSeq != undefined){
								self.stopScan(video);
								let data = {ctl:"order", cmd :"load", oSeq : param.oSeq};
								let _api = new AjaxCall(self._const,data);
								_api.ajaxformdata(function(rdata){ 
										if(rdata.code == 0) {
											let $popDiv = $('template#workQrStart');
											self.openLayer($popDiv.html(), self.workQrStartEvent, rdata.data);
											self.closeLayerPopup($layerObject);
										} else {
												alert(rdata.message);
										}
								});
								return;
							}else{
								alert('<span style="font-size:19px !important">조회 가능한 QR코드가 아닙니다.</span>');
							}
						}

						// return을 써서 함수를 빠져나가면 QR코드 프로그램이 종료된다.
						
					}
					// QR코드 인식에 실패한 경우
					else {
						//outputMessage.hidden = false;
						//outputData.parentElement.hidden = true;
					}
				}
				if(self._scanner) requestAnimationFrame(tick);
				}catch(e){
					alert(e.message);
				}
			}
		}
		
		// 카메라 열기
		setTimeout(startScan,100);
	}
	stopScan = (videoElem) => {
		const stream = videoElem.srcObject;
		const tracks = stream.getTracks();
		tracks.forEach(function(track) {
		track.stop();
		});
		videoElem.srcObject = null;
	}

	workQrStartEvent = (popupID, d) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);
		self._utils.classNameInput($layerObject,d)
		if(self._utils.checkEmptyNull(d.onContent)) $('.orderNotice',$layerObject).hide();
		let process = "";
		let isMyJob = false;
		
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			if(info.wOutsourcingYn == 'Y'){
				process += '<span class="mprocessStatusOut" >'+info.spNm+'</span>';
			}else{
				process += '<span class="mprocessStatus'+ info.pStatus +'" >'+info.spNm+'</span>';
			}
		}

		let processWork = [];
		for(let i=0;i<d.workInfo.length;i++){
			if(self._employee.spSeqs.indexOf(d.workInfo[i].spSeq) > -1 && (d.workInfo[i].wStatus == 'A' || d.workInfo[i].wStatus == 'C')){
				processWork.push(d.workInfo[i]);
			}
		}
		processWork.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});

		if(processWork.length == 0){
			self.closeLayerPopup($layerObject);
			let spNm = self._employee.spNms.join(',');
			alert('<span style="font-size:19px !important">['+ d.oFileNm +']수주에 부여 또는 대기중인 작업이 존재 하지 않습니다.</span>');
			return false;
		}
		let $wSeq = $('select[name=wSeq]',$layerObject).data("workInfo",processWork);
		for(let i=0;i<processWork.length;i++){
			let $opt = $('<option />').val(processWork[i].wSeq).text(processWork[i].wNm).data("ROW", processWork[i]);
			$wSeq.append($opt);
		}
		$wSeq.on('change',function(){
			let wSeq = $(this).val();
			for(let i=0;i<processWork.length;i++){
				if(processWork[i].wSeq == wSeq){
					$('input[name=spSeq]',$layerObject).val(processWork[i].spSeq);
					let opts = processWork[i].optionInfo;
					let options = '';
					for(let o=0;o<opts.length;o++) {
						let od = opts[o];
						if(od.cwoOrderYn == 'Y'){
							if(od.woInput != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm"><strong class="workOptionInfo">'+ od.cwoNm + ' : <span style="font-weight: bold;">'+ od.woInput +'</span></strong></span>');}
						}
					}
					$('.workOptionListDiv', $layerObject).empty().append(options);
					$('.wFrontYnNm',$layerObject).text(processWork[i].wFrontYnNm)				;
					if(self._utils.checkEmptyNull(processWork[i].wESeq) || self._const.__USER_ID != processWork[i].wESeq){
						isMyJob = false;
						$('.btnMyJobChangeCall',$layerObject).show();
						$('.btnStartCall',$layerObject).hide();
					}else {
						isMyJob = true;
						$('.btnMyJobChangeCall',$layerObject).hide();
						$('.btnStartCall',$layerObject).show();
					}
				}
			}
		});
		

		$('.processFlow', $layerObject).empty().append(process);

		$('.btnStartCall',$layerObject).on('click',function(){
			let isCheck = $('input[name=confirmation]:checked',$layerObject).val() ?? 'N';
			let wSeq = $('select[name=wSeq]',$layerObject).val();
			
			/*
			if(isCheck != 'Y'){
				alert('작업 세부사항을 확인 여부를 체크해 주십시오');
				return false;
			}
			*/
			d.wSeq = wSeq;
			if(!isMyJob){
				alert('<span style="font-size:19px !important">배정된 작업이 아닙니다.</span>');
				return;
			}
			//선공정이 없는 경우 첫 공정으로 바로 착수 가능
			if(d.processInfo.befer == undefined){
				actionRunCheck(d);
			}else{
				if(d.wStatus == 'A' && d.processInfo.befer.pStatus != 'D'){
					confirm('<span style="font-size:19px !important">선 공정 ['+ d.processInfo.befer.spNm +']가 완료 되지 않았습니다. \n\n작업진행 하시겠습니까?</span>', function(data){
						if(data) {
							actionRunCheck(d);
						}
					}," 강제 작업 진행");
				}else{
					actionRunCheck(d);
				}
			}

			function actionRunCheck(d){
				if(d.istInStatus != 'C'){
					confirm('입고가 되지 않은 작업 입니다. \n직접 입고처리 하시겠습니까?', function(data){
						if(data) {
							let mapData = {ctl : 'work',cmd : 'incoming', wSeq: d.wSeq};
							let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code==0) {
									self.modifyTime({action:'distribution'});
									let data = {ctl:"work", cmd :"action"};
									data.wSeq = d.wSeq;
									data.action = 'start';
									let _api = new AjaxCall(self._const,data);
									_api.ajaxformdata(function(rdata){ 
										if(rdata.code == 0) {
											self.closeLayerPopup($layerObject);
											alert('<span style="font-size:19px !important">작업이 시작되었습니다.</span>');
											let $tab = $('.workBoardTabLeft');
											$('li:eq(1)',$tab).trigger('click');
											self.modifyTime({action:'work'});
										}else{
											alert(rdata.message);
										}
									});
								} else{
									alert(d.message);
								}

							});
						}
					}, '입고처리');
				}else{
					let data = {ctl:"work", cmd :"action"};
					data.wSeq = d.wSeq;
					data.action = 'start';
					let _api = new AjaxCall(self._const,data);
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code == 0) {
							self.closeLayerPopup($layerObject);
							alert('<span style="font-size:19px !important">작업이 시작되었습니다.</span>');
							let $tab = $('.workBoardTabLeft');
							$('li:eq(1)',$tab).trigger('click');
							self.modifyTime({action:'work'});
						}else{
							alert(rdata.message);
						}
					});				}
			}
		});

		$('.btnMyJobChangeCall',$layerObject).on('click',function(){
			let isCheck = $('input[name=confirmation]:checked',$layerObject).val() ?? 'N';
			let wSeq = $('select[name=wSeq]',$layerObject).val();

			d.wSeq = wSeq;
			if(!isMyJob){
				confirm('<span style="font-size:19px !important">작업자 ['+ self._const.__USER_NAME+']로 변경 하시겠습니까?</span>', function(is){
					if(is){
						let spSeq = $('select[name=spSeq]',$layerObject).val();
						let mapData = {ctl : 'work',cmd : 'employeeChange', wSeq: d.wSeq, wESeq : self._const.__USER_ID, spSeq : d.spSeq};
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code==0) {
								isMyJob = true;
								alert('<span style="font-size:19px !important">작업자가 변경되었습니다.<br>시작 버튼을 다시 눌러 진행하십시요.</span>');
								$('.btnMyJobChangeCall',$layerObject).hide();
								$('.btnStartCall',$layerObject).show();
							}else{
								alert(rdata.message);
							}
						});
					}
				},'변경');
				return;
			}
		});
		$wSeq.trigger('change');

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
	lastModifyTime = (cbfunc) => {
		try{
			let self = this;
			let realLastTimeFile = __FILE_DOMIN +"/"+ self._const.__GROUP_ID +"/realTimeCheck.txt";
			$.ajax({
				url: realLastTimeFile  + ((/\?/).test(realLastTimeFile) ? "&" : "?") + (new Date()).getTime(),
				method: 'GET',
				success: function (str, status, xhr) {
					let data = JSON.parse(str);
					if(typeof cbfunc == 'function') cbfunc(data);
				},
				error: function (data, status, err) {
				},
				complete: function () {
				}
			});
		}catch(e){
			console.error(e.message);
		}
	}
	lastModifyTimeCheck = (keys = [], dateTime = self._utils.currentDateTime() , trueCbfunc, fasleCbfunc) =>{
		let self = this;
		let checkDateTime = new Date(dateTime.substring(0,4), parseInt(dateTime.substring(4,6))-1, dateTime.substring(6,8), dateTime.substring(8,10), dateTime.substring(10,12),dateTime.substring(12));
		//checkDateTime.setMinutes(checkDateTime.getMinutes() - minutes);
		try{
			this.lastModifyTime(function(data){
				//console.log(data)
				let is = false;
				if(typeof keys == 'string'){
					if(data[keys] != undefined){
						let d = data[keys];
                		let lastDateTime = new Date(d.substring(0,4), parseInt(d.substring(4,6))-1, d.substring(6,8), d.substring(8,10), d.substring(10,12),d.substring(12));
                		if((lastDateTime - checkDateTime) > 0){
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
							if((lastDateTime - checkDateTime) > 0){
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
export default WorkDashboardController