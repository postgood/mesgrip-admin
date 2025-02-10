
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let distributionController = class {
	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._employee = {};
	}

	init = (_code,_data) => {
		const self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		self._currentDateTime = self._utils.currentDateTime();
/*
		self.intervalId = setInterval(function(){
			self._parent.lastModifyTimeCheck(['order','work','distribution'],self._currentDateTime, function(){
					self._currentDateTime = self._utils.currentDateTime();
					setTimeout(self.retrieve,30000);
				});
			}, self._parent._reloadTime);
*/			
		//debugger;

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._currentDateTime = self._utils.currentDateTime();
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});
		self._code.find('.btnInout').on('click',function() {
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=istSeq]:checked");
			if(chkBoxs.length==0){
				alert("상태를 변경할 수주건을 선택하십시오");
				return;
			}
			self.layerInoutView(function(data){
				self._parent.openLayer(data, self.layerInoutViewEvent);
			});			
		});

		self._code.find('.btnMap').on('click',function() {
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=istSeq]:checked");
			let data = [];
			if(chkBoxs.length==0){
				data = tbody.data("ROWS");
			}else{
				for (let i=0;i<chkBoxs.length;i++){
					let d = $(chkBoxs[i]).closest('tr').data('ROW');
					data.push(d);
				}
			}
			let is = false;
			for(let i=0;i<data.length;i++){
				if((['A','B'].indexOf(data[i].istInStatus) > -1 && !self._utils.checkEmptyNull(data[i].inGpsLatitude)) || (['A','B'].indexOf(data[i].istOutStatus) > -1 && !self._utils.checkEmptyNull(data[i].outGpsLatitude))){
					is = true;
					break;
				}
			}
			if(is){
				self.layerAllMapView(function(html){
					self._parent.openLayer(html, self.layerAllMapViewEvent, data);
				});			
			}else{
				alert('입/출고 처리가 완료 되었거나 주소정보가 없습니다.');
			}
		});

		self._code.find('.btnWorkReportPrint').on('click',function() {
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=oSeq]:checked");
			if(chkBoxs.length==0){
				alert("상태를 변경할 수주건을 선택하십시오");
				return;
			}
			self.layerInoutView(function(data){
				self._parent.openLayer(data, self.layerInoutViewEvent);
			});			
		});
		


		self._code.find(".btnFullScreen").on("click",function(e){
			let autoRead = self._code.find(".btnAutoReload");
			if (document.fullscreenElement) {
				$(this).removeClass("activeOn").addClass("activeOff");
				if(autoRead.hasClass("activeOn")) autoRead.trigger('click');
			}else{
				$(this).removeClass("activeOff").addClass("activeOn");
				if(autoRead.hasClass("activeOff")) autoRead.trigger('click');
			}
			self._utils.fullScreen(self._code);
		});
		/*
		self._code.find(".btnAutoReload").on("click",function(e){
			if(self.intervalId == undefined){
				$(this).removeClass("activeOff").addClass("activeOn");
				self.intervalRun();
			}else{
				$(this).removeClass("activeOn").addClass("activeOff");
				clearInterval(self.intervalId);
				delete self.intervalId;
			}
		});
		*/
		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});

		
		// 목록 테이블 이벤트 정의
		let searchWrap = self._code.find(".searchWrapArea");
		let thead = self._code.find(".dataHeadTable thead");
		let tfoot = self._code.find(".pageInfoTfoot");
		let tbody = self._code.find(".dataListTable");

		searchWrap.on('change','input[name=today]', function(){
			if($(this).is(":checked")){
				$('select[name=dateKind]').addClass('readonly').attr('readonly','readonly').css({ 'color' : '#ccc'});
				$('input[name=startDt],input[name=endDt]').removeClass('crdrIp').removeClass('hasDatepicker').addClass('readonly').css({'background-color':'#eee !important','cursor' : 'default', 'width': '90px','color':'#ccc'});
			}else{
				$('select[name=dateKind]').removeClass('readonly').removeAttr('readonly').css({ 'color' : ''});
				$('input[name=startDt],input[name=endDt]').addClass('crdrIp').addClass('hasDatepicker').removeClass('readonly').css({'background-color':'','cursor' : '', 'color' : ''});
			}
		});

		searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			searchWrap.find("input[name=orderculumn]").val(column);
			searchWrap.find("input[name=orderby]").val(order);
			self._utils.tHeadOrderBy($(this),order);
			self.retrieve();
		});

		searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -1)));
		searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), +1)));
		//searchWrap.find("input[name=startOutDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -1)));
		//searchWrap.find("input[name=endOutDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), +1)));

		searchWrap.find('input[name=searchWord]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term, cuTypeCd : 'A'};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm, cuSeq:v.cuSeq};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });
		self._defaultData = self._utils.serializeObject(searchWrap);
		thead.on("click",".fa-rotate-right",function(){
			let $thead = $(this).closest("thead");
			self._utils.unSerializeObject(searchWrap,self._defaultData );
			$thead.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			self.retrieve();
		});
		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) tfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		tfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
		// 수주서 조회
		tbody.on('click','.oFileNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.orderView(d);			
		});
		// 거래처 정보 조회
		tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});
		// 작업지시서 출력
		tbody.on('click','.printTd', function() {
			let d = $(this).closest('tr').data('ROW');
			self._parent.workReport(d);
		});
		// 입고지 조회
		tbody.on('click','.istInMap', function() {
			let d = $(this).closest('tr').data('ROW');
			let mapData = {ctl : 'distribution',cmd : 'load', istSeq: d.istSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let data = rdata.data;
					data.inout = 'in';
					data.isNm = data.istInNm;
					data.inInchargeNm = data.istInInchargeNm;
					data.inInchargeTel = data.istInInchargeTel;
					data.gpsLatitude = data.inGpsLatitude;
					data.gpsLongitude = data.inGpsLongitude;
					self._parent._popup.storageMapView(data);

				}else{
					alert(rdata.message);
				}
			});
			/*
			let mapData = $.extend(d, {isNm: d.istInNm,gpsLatitude:d.inGpsLatitude, gpsLongitude:d.inGpsLongitude});
			mapData.inout = 'in';
			self._parent._popup.storageMapView(mapData);
			*/
			/*
			self.layerMapView(function(data){
				self._parent.openLayer(data, self.layerMapViewEvent, mapData);
			},d.istInNm);	
			*/
		});
		// 출고지 조회
		tbody.on('click','.istOutMap', function() {
			let d = $(this).closest('tr').data('ROW');
			let mapData = {ctl : 'distribution',cmd : 'load', istSeq: d.istSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let data = rdata.data;
					data.inout = 'out';
					data.isNm = data.istOutNm;
					data.outInchargeNm = data.istOutInchargeNm;
					data.outInchargeTel = data.istOutInchargeTel;
					data.gpsLatitude = data.outGpsLatitude;
					data.gpsLongitude = data.outGpsLongitude;
					self._parent._popup.storageMapView(data);

				}else{
					alert(rdata.message);
				}
			});
/*
			let mapData = $.extend(d,{isNm: d.istOutNm,gpsLatitude:d.outGpsLatitude, gpsLongitude:d.outGpsLongitude});
			mapData.inout = 'out';
			self._parent._popup.storageMapView(mapData);
*/			
			/*
			self.layerMapView(function(data){
				self._parent.openLayer(data, self.layerMapViewEvent, mapData);
			},d.istOutNm);	
			*/
		});
		tbody.on('click','.processBtnA,.processBtnB,.processBtnC',function(){
			let inout = $(this).attr("actionType");
			let d = $(this).closest('tr').data('ROW');
			if (d.wOutsourcingYn == 'Y'){
				if(inout=='in' && d.istOutStatus != 'C'){
					alert('출고가 되지않은 외주 작업건 입니다.');
					return false;
				}
			}else{
				if(inout!='in' && d.istInStatus != 'C'){
					alert('입고가 되지않은 수주건 입니다.');
					return false;
				}
			}
			let mapData = {oSeqs: JSON.stringify([d.oSeq]), kind:inout,};
			mapData.status = String.fromCharCode(d[((inout == 'in')?'istInStatus':'istOutStatus')].charCodeAt(0)+1);

			self.update(mapData, function(data){
				if(data.code == 0){
					self.retrieve();	
					self._parent.modifyTime({action:'distribution'});	
				}else{
					alert(data.message);
				}
			});
		});

		tbody.on('click','.oFileNmDown', function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			if(d.fileInfo.length>0){
				self._parent.fileDownload(d.fileInfo[0]);
			}

		});
		tbody.on('click','.markIn, .markOut',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let inout = $(this).hasClass('markIn')?'I' : 'O';
			let mapData = {ctl : 'distribution',cmd : 'mark', istSeq: d.istSeq,  istmInout : inout};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$("body .btnClosePopLayer").trigger('click');
					self.retrieve();
					self._parent.modifyTime({action:'distribution'});
				}else{
					alert(rdata.message);
				}
			});
		});
		self.retrieve();
	}



	tHeadOrderBy = ($obj, orderby) => {
		const self = this;

		let tr = $obj.closest("tr");
		tr.find("img").attr("src","/images/btn/btn_sort2.png");
		$obj.children("img").attr("src",(orderby.toUpperCase() == "DESC")?"/images/btn/btn_sort_dw.png":"/images/btn/btn_sort_up.png");

		self.retrieve();
	}

	retrieve = () => {
		const self = this;
		if(self._parent.activeMenuId() != undefined && self._parent.activeMenuId() != self._id){
			if(self.intervalId != undefined){
				self._code.find(".btnAutoReload").removeClass("activeOn").addClass("activeOff");
				clearInterval(self.intervalId);
				delete self.intervalId;
			}
			return;
		}
		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let todayIn = searchWrap.find("input[name=todayIn]:checked").val()??'N';
		let todayOut = searchWrap.find("input[name=todayOut]:checked").val()??'N';
		let istInStatus = searchWrap.find("input[name=istInStatus]:checked").val()??'N';
		let istOutStatus = searchWrap.find("input[name=istOutStatus]:checked").val()??'N';
		let todayMarkIn = searchWrap.find("input[name=todayMarkIn]:checked").val()??'N';
		let todayMarkOut = searchWrap.find("input[name=todayMarkOut]:checked").val()??'N';
		let oFileNm = searchWrap.find("input[name=oFileNm]").val();
		/*
		let $oStatus = searchWrap.find("input[name=oStatus]:checked");
		if($oStatus.length == 0){
			alert('작업상태를 선택해주세요');
			return;
		}
		let oStatus = [];
		for(let i=0;i<$oStatus.length;i++) oStatus.push($($oStatus[i]).val());
		*/
		let searchData = {
			cuSeq : undefined,
			
			startDt : startDt.replace(/-/g,''),
			endDt : endDt.replace(/-/g,''),
			//startOutDt : startOutDt.replace(/-/g,''),
			//endOutDt : endOutDt.replace(/-/g,''),
			//oMarkYn : oMarkYn,
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			// oStatus : JSON.stringify(oStatus),
			istInStatus : istInStatus,
			istOutStatus : istOutStatus,
			todayIn : todayIn,
			todayOut : todayOut,
			todayMarkIn : todayMarkIn,
			todayMarkOut : todayMarkOut,
			searchColumn : 'cuNm',
			searchWord : searchWord,
			oFileNm : oFileNm
		}

		self.list(searchData, function(resp){
			let tbody = self._code.find(".dataListTable tbody");
			let thead = self._code.find(".dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			
			tbody.empty();
			tbody.data("ROWS",resp);
			let total = 0;
			let totalPage = 0;
			let inCnt = 0;
			let outCnt = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
						inCnt = resp[i].inCnt;
						outCnt = resp[i].outCnt;
					}
					self.display(tbody, resp[i]);
				}
				//self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6],"oSeq");
			} else {
				
				$('<tr><td colspan="'+ thead.find('th').length+2 +'">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}

			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
			self._code.find(".inCnt").text(self._utils.numberWithCommas(inCnt));
			self._code.find(".outCnt").text(self._utils.numberWithCommas(outCnt));
		});

		let autoReload = self._code.find(".btnAutoReload");
		let lastDateTime = self._code.find(".lastDateTime");
		lastDateTime.empty();
		if(autoReload.hasClass("activeOn")){
			lastDateTime.text(self._utils.dateformatCurrentHHmmss(":"));	
		}
	}

	display = (tbody, d) => {
		const self = this;
		let process = "";
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		let startProcess = '';
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			if(i==0) startProcess = info.spNm;
			if(info.outsourcingInfo.length>0){
				let workNm = [];
				let customerNm = [];
				for(let o=0;o<info.outsourcingInfo.length;o++){
					workNm.push(info.outsourcingInfo[o].wNm);
					customerNm.push(info.outsourcingInfo[o].cuNm);
				}
				process += '<span class="processStatusOut'+ info.pStatus +'" title="＊상태: '+ info.pStatusNm +' ＊업체: '+ customerNm.join(', ') +' '+((info.pStatus != 'A')?' ＊일시: '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
			}else{
				process += '<span class="processStatus'+ info.pStatus +'" title="＊상태: '+ info.pStatusNm +''+((info.pStatus != 'A')?' ＊일시: '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
			}
		}
		let tdStyle = 'border:1px solid #dedede;'; //((d.oStatus!='A')?' style="background-color:'+self._utils.processStatus('color',d.oStatus)+'"':'')
		let oStatusNm = '<i class="fa-brands fa-internet-explorer" title="거래처에서 직접 발주한 건"></i>';
		if(d.oApprovalYn != 'Y') {
				tdStyle += 'color:#8b8989;background: #d7e2ff;';
		}else{
			oStatusNm = '○';
			if(d.oStatus == 'D'){
				//oStatusNm = '<strong style="color:#95D9e4;">●</strong>';
				oStatusNm = '<strong style="color:#b2b8ba;">●</strong>';
			}else if(d.oStatus == 'B'){
				oStatusNm = '<strong style="color:#4e80ee;">●</strong>';
			}else{
				oStatusNm = '○';
			}
		}
		if(d.oStatus == 'D' && d.istInStatus == 'C' && d.istOutStatus == 'C'){
			tdStyle += 'background:#ddf2f9;';
		}

		let file = '';
		if(d.fileInfo.length>0) file = '<i class="fa-solid fa-download cursorPointer oFileNmDown" style="margin-right:5px;" title="파일 받기"></i>';
		let style='';
		// if(d.isCustomer == 'Y') tdStyle += 'background: #ddf9ee;';


		let istInStatusNm = d.istInStatusNm;
		let istOutStatusNm = d.istOutStatusNm;
		if(d.istInStatus == 'C') istInStatusNm = '<span style="color:#68C3C7;font-weight: bold;">입고</span>';
		if(d.istOutStatus == 'C') istOutStatusNm = '<span style="color:#b583f5;font-weight: bold;">출고</span>';

		let tr = $('<tr style="'+style+'"/>');
		tr.append($('<td style="'+tdStyle+'"><i class="fas fa-print printTd cursorPointer"></i><input type="hidden" name="oSeq" value="'+ d.oSeq +'"></td>'));
		tr.append($('<td style="'+tdStyle+'"></td>').append($('<input type="checkbox" class="vm" name="istSeq" value="'+d.istSeq+'"/>')));
		tr.append($('<td style="'+tdStyle+'">'+((self._utils.checkEmptyNull(d.oApprovalDate)) ?'미승인': self._utils.dateformatMin(d.oApprovalDate).substring(5,10))+'</td>'));
		//tr.append($('<td '+tdStyle+'><input type="checkbox" name="oSeq" value="'+ d.oSeq +'"></td>'));
		
		tr.append($('<td style="'+tdStyle+'white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al cuNm cursorPointer"><span title="'+d.cuNm +'">'+self._utils.nullTostring(d.cuNm, '')+'</span></td>'));
		tr.append($('<td style="'+tdStyle+'border-right:0px;padding-right:0px;" class="ac"></td>').append(file));
		tr.append($('<td style="'+tdStyle+'border-left:0px !important;" class="al"></td>').append('<span class="oFileNm cursorPointer" title="수주서 보기">'+self._utils.nullTostring(d.oFileNm, '')+ ((d.onContent != undefined && d.onContent != '')?' <img src="/images/bul/bul_notice.gif"  class="orderNoticeIcon">':'') +'</span>'));
		
		tr.append($('<td style="'+tdStyle+'" title="'+ d.oPaperWidth +' × '+ d.oPaperHeight +'"></td>').text(self._utils.nullTostring(d.oPaperSize, '')));
		tr.append($('<td style="'+tdStyle+'" class="ar">'+self._utils.numberWithCommas(d.oCnt, '')+'</td>'));
		
		//tr.append($('<td style="'+tdStyle+'" class="al"></td>').append((d.wNm==undefined)?'':d.wNm));
		tr.append($('<td style="'+tdStyle+'" class="ac"></td>').append(startProcess));
		tr.append($('<td style="'+tdStyle+'" class="al">'+ process +'</td>'));
		tr.append($('<td style="'+tdStyle+'" '+((d.oStatus != 'A')?'title="변경일시 : '+ d.oStatusDate +'"':'')+'>'+oStatusNm +'</td>'));
		let inStoragNm = '';
		if(d.istInCd != 'A'){
			inStoragNm = self._utils.nullTostring(d.istInNm,'');
		}else{
			inStoragNm = '직입 '+ ((self._utils.checkEmptyNull(d.istInNm))? '':'('+ d.istInNm +')');
		}
		
		if(d.inGpsLatitude != undefined){
			tr.append($('<td style="'+tdStyle+'padding-right:0px;border-right:0px;" class="ar istInMap cursorPointer"></td>').append('<i class="fa-solid fa-location-arrow" title="지도보기" style="color:#ffb98b;margin-top: 2px;margin-bottom: 2px;"></i>'));
			tr.append($('<td style="'+tdStyle+'border-left:0px;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al istInMap cursorPointer"  title="'+inStoragNm+'"></td>').text(inStoragNm));
		}else{
			tr.append($('<td style="'+tdStyle+'padding-right:0px;border-right:0px;" class="ar"></td>'));
			tr.append($('<td style="'+tdStyle+'border-left:0px;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al" title="'+inStoragNm+'"></td>').text(inStoragNm));
		}
		tr.append($('<td class="al" style="'+tdStyle+'padding-left:8px;padding-right:1px;"></td>').append((d.istInHopeDt?'<span style="font-weight:550;">'+self._utils.dateformatStringToDate(d.istInHopeDt).substring(5)+'</span>':'') + ((!self._utils.checkEmptyNull(d.istInMemo)? ' ('+d.istInMemo +')':''))) );
		tr.append($('<td style="'+ tdStyle +'padding-left:3px;padding-right:0px;border-right:0px;" class="al"></td>').append((( d.istmInYn=='Y')?'<i class="fa-solid fa-square-check markIn cursorPointer" style="color:#f50000;" title="주요물류선정일시 : '+ d.istmInYnDate.substring(0,16)+'"></i> ':'<i class="fa-solid fa-square-check markIn cursorPointer" style="color:#ccc;" title="주요물류 설정"></i>')));
		if(d.wOutsourcingYn == 'Y'){
			if(d.istOutStatus =='C'){
				tr.append($('<td style="'+tdStyle+'border-left:0px;" class="ac" '+((d.istInStatus != 'A')?'title="일시 : '+ d.istInStatusDate +'"':'')+'></td>').append((d.istInStatus != 'C')?'<span class="processBtn'+d.istInStatus+'" actionType="in">'+d.istInStatusNm+'</span>':istInStatusNm));
			}else{
				tr.append($('<td style="'+tdStyle+'border-left:0px;" class="ac" '+((d.istInStatus != 'A')?'title="일시 : '+ d.istInStatusDate +'"':'')+'></td>').append(d.istInStatusNm));
			}
		}else{
			tr.append($('<td style="'+tdStyle+'border-left:0px;" class="ac" '+((d.istInStatus != 'A')?'title="일시 : '+ d.istInStatusDate +'"':'')+'></td>').append((d.istInStatus != 'C')?'<span class="processBtn'+d.istInStatus+'" actionType="in">'+d.istInStatusNm+'</span>':istInStatusNm));
		}
		
		
		// tr.append($('<td style="'+tdStyle+'" class="ac"></td>').text(d.inENm));
		let outStoragNm = '';
		if(d.istOutCd != 'A'){
			outStoragNm = self._utils.nullTostring(d.istOutNm,'');
		}else{
			outStoragNm = '직출 '+ ((self._utils.checkEmptyNull(d.istOutNm))? '':'('+ d.istOutNm +')');
		}
		if(d.outGpsLatitude != undefined){
			tr.append($('<td style="'+tdStyle+'padding-right:0px;border-right:0px;" class="ar istOutMap cursorPointer"></td>').append(' <i class="fa-solid fa-location-arrow" title="지도보기" style="color:#ffb98b;margin-top: 2px;margin-bottom: 2px;"></i>'));
			tr.append($('<td style="'+tdStyle+'border-left:0px;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al istOutMap cursorPointer" title="'+outStoragNm+'"></td>').text(outStoragNm));
		}else{
			tr.append($('<td style="'+tdStyle+'padding-right:0px;border-right:0px;" class="ar istOutMap cursorPointer"></td>'));
			tr.append($('<td style="'+tdStyle+'border-left:0px;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al" title="'+outStoragNm+'"></td>').text(outStoragNm));
		}
		tr.append($('<td class="al" style="'+tdStyle+'padding-left:8px;padding-right:1px;"></td>').append((!self._utils.checkEmptyNull(d.istOutHopeDt)?'<span style="font-weight:550;">'+self._utils.dateformatStringToDate(d.istOutHopeDt).substring(5)+'</span>':'') + ((!self._utils.checkEmptyNull(d.istOutMemo)? ' ('+d.istOutMemo +')':''))));
		tr.append($('<td style="'+ tdStyle +'padding-left:3px;padding-right:0px;border-right:0px;" class="al"></td>').append((( d.istmOutYn=='Y')?'<i class="fa-solid fa-square-check markOut cursorPointer" style="color:#f50000;" title="주요물류선정일시 : '+ d.istmOutYnDate.substring(0,16)+'"></i> ':'<i class="fa-solid fa-square-check markOut cursorPointer" style="color:#ccc;" title="주요물류 설정"></i>')));
		if(d.wOutsourcingYn == undefined){
			if(d.istInStatus =='C'){
				tr.append($('<td style="'+tdStyle+'border-left:0px;" class="ac" '+((d.istOutStatus != 'A')?'title="일시 : '+ d.istOutStatusDate +'"':'')+'></td>').append((d.oStatus == 'D' && d.istOutStatus != 'C')?'<span class="processBtn'+d.istOutStatus+'" actionType="out">'+d.istOutStatusNm+'</span>':'<span style="color:#ccc;">'+ istOutStatusNm +'</span>'));
			}else{
				tr.append($('<td style="'+tdStyle+'border-left:0px;" class="ac" '+((d.istOutStatus != 'A')?'title="일시 : '+ d.istOutStatusDate +'"':'')+'></td>').append('<span style="color:#ccc;">'+d.istOutStatusNm+'</span>'));
			}
		}else{
			tr.append($('<td style="'+tdStyle+'border-left:0px;" class="ac" '+((d.istOutStatus != 'A')?'title="일시 : '+ d.istOutStatusDate +'"':'')+'></td>').append((d.istOutStatus != 'C')?'<span class="processBtn'+d.istOutStatus+'" actionType="out">'+d.istOutStatusNm+'</span>':istOutStatusNm));
		}
		
		
		//tr.append($('<td style="'+tdStyle+'" class="ac"></td>').text(d.outENm));
		tr.append($('<td style="'+tdStyle+'" class="al"></td>').text(self._utils.strMaxCuttion(self._utils.nullTostring(d.oMemo,''),25)).attr("title",d.oMemo));
		
		//tr.append($('<td style="'+tdStyle+'"><i class="fa-solid fa-magnifying-glass cursorPointer"></i></td>'));
		if(self._const.__MANAGER_YN == 'N') $('.markIn, .markOut',tr).removeClass('cursorPointer')
		tr.data("ROW",d);
		tr.appendTo(tbody);
	}

	layerInoutView = (cbfunc, data) => {
		const self = this;
		let tbody = self._code.find(".dataListTable tbody");
		let chkBoxs = tbody.find("input[name=istSeq]:checked");
		var divHtml = '<div class="mw_defalut" style="width:280px;height:200px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">입/출고 상태 변경</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="overflow-y:auto;padding:2px;">';

		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="50%">'
		divHtml += '<col width="50%">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="al"></div>';
		divHtml += '</th>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch save">변경</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
	
		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 ">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">대상 : </th>';
		divHtml += '<td class="cuNm">'+ chkBoxs.length +' 건</td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">구분 : </th>';
		divHtml += '<td class="cuNm"><input type="radio" name="kind" value="in">&nbsp; 입고 &nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="kind" value="out">&nbsp; 출고</td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">상태 : </th>';
		divHtml += '<td class="oFileNm"><select name="status"><option value="A">대기</option><option value="B">진행</option><option value="C">완료</option></td>';
		divHtml += '</tr>';
		divHtml += "</tbody></table>"
		divHtml += '</div>';
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	layerInoutViewEvent = (popupID, d) => {
		let self = this;
		let layerObject = $('#'+ popupID);
		
		$('input[name=kind]',layerObject).on('click',function(){
			let v = $(this).val();
			$('select[name=status]',layerObject).children().eq(1).text((v=='in')?'입고중':'출고중');
			$('select[name=status]',layerObject).children().eq(2).text((v=='in')?'입고완료':'출고완료');
		});
		$('.save',layerObject).on('click',function(){
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=istSeq]:checked");
			let inout = $('input[name=kind]:checked',layerObject).val();
			let status = $('select[name=status]',layerObject).val();
			let istSeqs = [];
			if(inout == undefined){
				alert('입고/출고 구분을 선택하십시오');
				return false;
			}
			for(let i=0;i<chkBoxs.length;i++) istSeqs.push($(chkBoxs[i]).val());

			let mapData = {istSeqs: JSON.stringify(istSeqs), kind:inout,status:status};

			self.update(mapData, function(data){
				if(data.code == 0){
					$("body .btnClosePopLayer").trigger('click');
					self.retrieve();		
					self._parent.modifyTime({action:'distribution'});
				}else{
					alert(data.message);
				}
			});
		});
	}
	// popupview
	layerMapView = (cbfunc, data) => {
		const self = this;
		var divHtml = '<div class="mw_defalut" style="width:580px;height:680px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">'+data+' </span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';

		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="50%">'
		divHtml += '<col width="50%">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="al"></div>';
		divHtml += '</th>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="#" class="btnSearch btnPrint" title="인쇄하기"><i class="fas fa-print cursorPointer" style="margin:auto auto";></i>&nbsp;&nbsp;출력</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
		
		divHtml += '<div style="overflow-y:auto;padding:2px;">';
		divHtml += '<div class="searchWrap kakaoMap" style="width:100%; height:500px; border:3px solid #fff;">';
		divHtml += '<div class="custom_zoomcontrol radius_border"> ';
        //divHtml += '<span onclick="zoomIn()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"></span>  ';
        //divHtml += '<span onclick="zoomOut()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"></span>';
		divHtml += '</div></div>';
		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 ">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">장소명 : </th>';
		divHtml += '<td colspan="3" class="isNm" style="font-weight: bold;"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">주&nbsp;&nbsp;&nbsp;&nbsp;소 : </th>';
		divHtml += '<td colspan="3" class="isAddress" style="font-weight: bold;"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">담당자 : </th>';
		divHtml += '<td class="isChargeNm" style="font-weight: bold;"></td>';
		divHtml += '<th class="txt_r">전화번호 : </th>';
		divHtml += '<td class="isChargeTel" style="font-weight: bold;"></td>';
		divHtml += '</tr>';
		divHtml += "</tbody></table>"
		divHtml += '</div>';

		
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	layerMapViewEvent = (popupID, d) => {
		let self = this;
		let layerObject = $('#'+ popupID);
		let container = $('.kakaoMap',layerObject)[0];
		var options = {
			center: new kakao.maps.LatLng(d.gpsLatitude, d.gpsLongitude),
			level: 3
		};
		
		self._utils.classNameInput(layerObject, d);
		$('.isAddress',layerObject).text(self._utils.ifnull(d[d.inout+'Addr']) + ' '+ self._utils.ifnull(d[d.inout+'AddrDetail']) );
		$('.isChargeNm',layerObject).text(self._utils.ifnull(d[d.inout+'InchargeNm']) );
		$('.isChargeTel',layerObject).text(self._utils.formatPhoneNumber(self._utils.ifnull(d[d.inout+'InchargeTel']) ));
		var map = new kakao.maps.Map(container, options);
		let positions = {
			//	title: d.isNm, 
				latlng: new kakao.maps.LatLng(d.gpsLatitude,d.gpsLongitude),
				content :'<div style="margin-top: -65px;background:#80dcf1;border: 1px solid #babbbb; padding: 2px;font-size:12px;font-weight: bold;"><span class="title">'+ d.isNm +'</span></div>'
		}

		var marker = new kakao.maps.Marker({
			map: map, // 마커를 표시할 지도
			position: positions.latlng, // 마커를 표시할 위치
			title : positions.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			
		});

		var customOverlay = new kakao.maps.CustomOverlay({
			map: map,
			position: positions.latlng,
			content : positions.content,
			yAnchor: 1 
		});
		
		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		$('.address',layerObject).val(d.isAddr + ' '+ d.AddrDetail);
		$('.isInchargeNm',layerObject).val(d.isInchargeNm);
		$('.isInchargeTel',layerObject).val(d.isInchargeTel);

		$('.btnPrint',layerObject).on('click',function(){
			let div = $(this).closest('.mw_defalut');
			$(div.find(".mw_contents")).print({
				addGlobalStyles: true,
				stylesheet: null,
				rejectWindow: true,
				noPrintSelector: ".no-print,.btnPrint",
				iframe: true,
				append: null,
				prepend: null,
				timeout: 1500,
			  });
		});

	}

	// popupview
	layerAllMapView = (cbfunc, data) => {
		const self = this;
		var divHtml = '<div class="mw_defalut" style="width:1000px;height:780px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">위치보기</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="overflow-y:auto;padding:2px;">';
		divHtml += '<div class="searchWrap kakaoMap" style="width:100%; height:750px; border:3px solid #fff;">';
		divHtml += '<div class="custom_zoomcontrol radius_border"> ';
        //divHtml += '<span onclick="zoomIn()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"></span>  ';
        //divHtml += '<span onclick="zoomOut()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"></span>';
		divHtml += '</div></div>';
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	layerAllMapViewEvent = (popupID, d) => {
		let self = this;
		let tbody = self._code.find(".dataListTable tbody");
		let chkBoxs = tbody.find("input[name=istSeq]:checked");
		let data = [];
		if(chkBoxs.length==0){
			data = tbody.data("ROWS");
		}else{
			for (let i=0;i<chkBoxs.length;i++){
				let d = $(chkBoxs[i]).closest('tr').data('ROW');
				data.push(d);
			}
		}
		
		let layerObject = $('#'+ popupID);
		let container = $('.kakaoMap',layerObject)[0];

		var options = {
			center: new kakao.maps.LatLng(37.5616699427206 , 126.992492586819),
			level: 3
		};
		let storages = {};
		
		for(let i=0;i<data.length;i++){
			if(['A','B'].indexOf(data[i].istInStatus) > -1 && data[i].inGpsLatitude != undefined){
				if(storages[data[i].istInIsSeq] == undefined){
					storages[data[i].istInIsSeq] = {nm:data[i].istInNm,latitude :data[i].inGpsLatitude,longitude :data[i].inGpsLongitude , in:[{oSeq:data[i].oSeq, dt:data[i].oHopeInDt, status:data[i].istInStatus}],out:[]};
				}else{
					storages[data[i].istInIsSeq].in.push({oSeq:data[i].oSeq, dt:data[i].oHopeInDt, status:data[i].istInStatus});
				}
			}
			if(['A','B'].indexOf(data[i].istOutStatus) > -1 && data[i].outGpsLatitude != undefined){
				if(storages[data[i].istOutIsSeq] == undefined){
					storages[data[i].istOutIsSeq] = {nm:data[i].istOutNm,latitude :data[i].outGpsLatitude,longitude :data[i].outGpsLongitude , out:[{oSeq:data[i].oSeq, dt:data[i].oHopeOutDt, status:data[i].istOutStatus}],in:[]};
				}else{
					storages[data[i].istOutIsSeq].out.push({oSeq:data[i].oSeq, dt:data[i].oHopeOutDt, status:data[i].istOutStatus});
				}
			}
		}

		let keys = Object.keys(storages);


		let bounds = new kakao.maps.LatLngBounds(); 

		let map = new kakao.maps.Map(container, options);


		let positions = [];
		for(let i=0;i<keys.length;i++){
			let d = storages[keys[i]];
			let key = keys[i];
			let latlng = new kakao.maps.LatLng(d.latitude,d.longitude);
			let content = '<div style="margin-top: -70px;margin-left: 120px;background:#80dcf1;border: 1px solid #babbbb; padding: 2px;font-size:12px;font-weight: bold; width:90px;text-align: center;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;"><span class="title">'+ d.nm +'</span>';
			content += '<div>';
			content += '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 3px;background-color: #fff;" class="noBdrTb">';
			content += '<caption></caption>';
			content += '<colgroup>';
			content += '<col width="auto">';
			content += '<col width="auto">';
			content += '</colgroup>';
			content += '<tbody>';
			content += '<tr>';
			content += '<th class="ac" style="height: 25px;background-color: #efefef !important">입고</th><th class="ac" style="height: 25px;background-color: #efefef !important">출고</th>';
			content += '</tr>';
			content += '<tr>';
			content += '<td class="ac" style="height: 25px;">'+ d.in.length +' 건</td>';
			content += '<td class="ac" style="height: 25px;">'+ d.out.length +' 건</td>';
			content += '</tr>';
			content += "</tbody></table>"
			content += '</div>';
			content += '</div>';
			positions.push({
				latlng: new kakao.maps.LatLng(d.latitude,d.longitude),
				content : content
			});
			bounds.extend(latlng);
			new kakao.maps.Marker({
				map: map, // 마커를 표시할 지도
				title : d.nm,
				position: latlng, // 마커를 표시할 위치
			});
			new kakao.maps.CustomOverlay({
				map: map,
				position: latlng,
				content : content,
				yAnchor: i+1 
			});
		}
		map.setBounds(bounds);
	}

	excelDownload = () =>{
		let self = this;
		const workbook = new ExcelJS.Workbook();
		let fileName = self._code.find(".pageHere strong").text();
		const sheet = workbook.addWorksheet(fileName);
		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let oStatus = searchWrap.find("select[name=oStatus]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let oMarkYn = searchWrap.find("input[name=oMarkYn]:checked").val();

		let columnInfos = [];
		columnInfos.push({name:"상태",key:"oStatusNm",width:12,align:'center'});
		columnInfos.push({name:"업체명",key:"cuNm",width:20,align:'left'});
		columnInfos.push({name:"파일명",key:"oFileNm",width:50,align:'left'});
		columnInfos.push({name:"규격",key:"oPaperSize",width:10,align:'center'});
		columnInfos.push({name:"주문수량",key:"oCnt",width:10,align:'right'});
		columnInfos.push({name:"입고처",key:"istInNm",width:20,align:'left'});
		columnInfos.push({name:"입고희망일",key:"oHopeInDt",width:12,align:'center'});
		columnInfos.push({name:"입고자",key:"inENm",width:15,align:'center'});
		columnInfos.push({name:"출고처",key:"outNm",width:20,align:'left'});
		columnInfos.push({name:"출고희망일",key:"oHopeOutDt",width:12,align:'center'});
		columnInfos.push({name:"출고자",key:"istOutENm",width:15,align:'center'});
		columnInfos.push({name:"메모",key:"oMemo",width:70,align:'left'});
		columnInfos.push({name:"등록일시",key:"creDate",width:20,align:'center'});

		let searchData = {
			cuSeq : undefined,
			startDt : startDt.replace(/-/g,''),
			endDt : endDt.replace(/-/g,''),
			oMarkYn : oMarkYn,
			page : 1,
			rows : 9999,
			orderColumn : orderColumn,
			orderType : orderType,
			oStatus : oStatus,
			searchColumn : 'cuNm',
			searchWord : searchWord
		}

		self.list(searchData, function(resp){

			if(resp != null && resp.length > 0) {
				let header = [];
				for(let c in columnInfos) header.push(columnInfos[c].name);
				let headerRow = sheet.addRow(header);
				headerRow.eachCell((cell, colNum) => {
					self._parent._utils.excelStyleHeaderCell(cell);
					sheet.getColumn(colNum).width = columnInfos[colNum - 1].width;
				  });

				for(let i in resp){
					let rowData = [];
					for(let c in columnInfos){	rowData.push(resp[i][columnInfos[c].key]?resp[i][columnInfos[c].key]:'');	}
					let row = sheet.addRow(rowData);
					row.eachCell((cell, colNum) => {self._parent._utils.excelStyleDataCell(cell,columnInfos[colNum - 1].align); });
				}
			} else {
				
				alert('데이타가 없습니다.');
				return false;
			}
			self._parent._utils.excelDownload(workbook, fileName + "("+ searchData.startDt+'-'+searchData.endDt+')').then(r => {});
		});

		
	}
	

	purge = () => {
		const self = this;

		console.log("dashboardOrderController purge");
	}

	reload = () => {
		const self = this;

		console.log("dashboardOrderController reload");
	}	
	list = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'distribution',
			cmd : 'list'
		}
		$.extend(mapData,_mapData,{isInout:'Y'});

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':!document.fullscreenElement});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						cbfunc(rdata.data);
					} else {
						cbfunc(null);
					}
			});
	}

	delete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
			cmd : 'delete'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}


	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}
	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
			cmd : 'insert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
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
			ctl : 'distribution',
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
}
export default distributionController
