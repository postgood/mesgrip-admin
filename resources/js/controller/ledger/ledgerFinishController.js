
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let ledgerController = class {
	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._employee = {};
		this._info = {};
	}

	init = (_code,_data) => {
		let self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		// 목록 테이블 이벤트 정의
		let $searchWrap = self._code.find(".searchWrapArea");
		let $searchWrapBtn = self._code.find(".searchWrapBtn");
		let $thead = self._code.find(".dataHeadTable thead");
		let $tfoot = self._code.find(".pageInfoTfoot");
		let $tbody = self._code.find(".dataListTable");

		let startYear =  2024;
		let now = new Date();
		let year= now.getFullYear();
		let $yyyy = $('select[name=yyyy]',$searchWrap);
		for(;startYear <= year; startYear++){
			$yyyy.append('<option value="'+ startYear +'"'+((startYear == year)?' selected':'')+'>'+ startYear+'</option>');
		}
		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) $tfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		$tfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			$tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find("input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});
		$searchWrap.find('input[name=searchWord]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,};
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

		$('.btnLedgerFinish',$searchWrap).on('click',function(){
			let year = $('select[name=yyyy]',$searchWrap).val();
			let info = {yyyy:year};
			let $div = $('template#ledgerFinishInsert');
			self._parent.openLayer($div.html(), self.ledgerFinishInsertEvent, info);
		});
		$('.btnLedgerFinishCancel',$searchWrap).on('click',function(){
			let $div = $('template#ledgerFinishCancel');
			self._parent.openLayer($div.html(), self.ledgerFinishCancelEvent,self._info);
		});

		$thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = $searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			$searchWrap.find("input[name=orderculumn]").val(column);
			$searchWrap.find("input[name=orderby]").val(order);
			self._utils.tHeadOrderBy($(this),order);
			self.retrieve();
		});
		self._defaultData = self._utils.serializeObject($searchWrap);
		$thead.on("click",".fa-rotate-right",function(){
			let $thead2 = $(this).closest("thead");
			self._utils.unSerializeObject($searchWrap,self._defaultData );
			$thead.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			self.retrieve();
		});

		self.retrieve();
		
	}



	retrieve = () => {
		const self = this;

		let $pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rowsPerPage]").val();
		let page = $pageTfoot.find("input[name=page]").val();
		let $searchWrap = self._code.find(".searchWrapArea");
		let yyyy = $searchWrap.find("select[name=yyyy]").val();
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let searchData = {
			yyyy : yyyy,
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'cuNm',
			searchWord : searchWord,
		}
		$('.yearPrev',self._code).text((yyyy-1)+ '년');
		$('.yearNow',self._code).text(yyyy+ '년');
		self.list(searchData, function(resp){
			let prevYearTotal = resp.prevTotal;
			let yearTotal = resp.total;
			$(".lfAmountSaleTransPrev",self._code).text(self._utils.checkEmptyNull(prevYearTotal.lfAmountSaleTrans)? 0 : self._utils.numberWithCommas(prevYearTotal.lfAmountSaleTrans));
			$(".lfAmountSalePayPrev",self._code).text(self._utils.checkEmptyNull(prevYearTotal.lfAmountSalePay)? 0 : self._utils.numberWithCommas(prevYearTotal.lfAmountSalePay));
			$(".lfAmountSaleBalancePrev",self._code).text(self._utils.checkEmptyNull(prevYearTotal.lfAmountSaleBalance)? 0 : self._utils.numberWithCommas(prevYearTotal.lfAmountSaleBalance));
			$(".lfAmountBuyTransPrev",self._code).text(self._utils.checkEmptyNull(prevYearTotal.lfAmountBuyTrans)? 0 : self._utils.numberWithCommas(prevYearTotal.lfAmountBuyTrans));
			$(".lfAmountBuyPayPrev",self._code).text(self._utils.checkEmptyNull(prevYearTotal.lfAmountBuyPay)? 0 : self._utils.numberWithCommas(prevYearTotal.lfAmountBuyPay));
			$(".lfAmountBuyBalancePrev",self._code).text(self._utils.checkEmptyNull(prevYearTotal.lfAmountBuyBalance)? 0 : self._utils.numberWithCommas(prevYearTotal.lfAmountBuyBalance));
			$(".lfAmountSaleTrans",self._code).text(self._utils.checkEmptyNull(yearTotal.lfAmountSaleTrans)? 0 : self._utils.numberWithCommas(yearTotal.lfAmountSaleTrans));
			$(".lfAmountSalePay",self._code).text(self._utils.checkEmptyNull(yearTotal.lfAmountSalePay)? 0 : self._utils.numberWithCommas(yearTotal.lfAmountSalePay));
			$(".lfAmountSaleBalance",self._code).text(self._utils.checkEmptyNull(yearTotal.lfAmountSaleBalance)? 0 : self._utils.numberWithCommas(yearTotal.lfAmountSaleBalance));
			$(".lfAmountBuyTrans",self._code).text(self._utils.checkEmptyNull(yearTotal.lfAmountBuyTrans)? 0 : self._utils.numberWithCommas(yearTotal.lfAmountBuyTrans));
			$(".lfAmountBuyPay",self._code).text(self._utils.checkEmptyNull(yearTotal.lfAmountBuyPay)? 0 : self._utils.numberWithCommas(yearTotal.lfAmountBuyPay));
			$(".lfAmountBuyBalance",self._code).text(self._utils.checkEmptyNull(yearTotal.lfAmountBuyBalance)? 0 : self._utils.numberWithCommas(yearTotal.lfAmountBuyBalance));
			if(self._const.__MANAGER_YN == 'Y'){
				if(self._utils.checkEmptyNull(yearTotal.lfSeq)){
					$('.btnLedgerFinish',$searchWrap).show();
					$('.btnLedgerFinishCancel',$searchWrap).hide();
				}else{
					$('.btnLedgerFinish',$searchWrap).hide();
					$('.btnLedgerFinishCancel',$searchWrap).show();
				}
			}
			self._info.yyyy = $('select[name=yyyy]',$searchWrap).val();
			self._info.eNm = yearTotal.eNm;
			self._info.creDate = yearTotal.creDate;
			let $tbody = self._code.find(".dataListTable tbody");
			let $thead = self._code.find(".dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			$tbody.empty();
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.data.length > 0) {
				for(let i in resp.data){
					if(i==0){
						total = resp.data[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
						
					}
					self.display($tbody, resp.data[i]);
				}
				// self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,7],"oSeq");

				let $trs = $('tr',$tbody);
				for(let t =0;t<$trs.length;t++) $($($trs[t]).find('td').eq(8)).css('border-right','1px solid #dedede !important;');
			} else {
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);

		});
	}

	display = ($tbody, d) => {
		const self = this;

		let $tr = $('<tr/>');
		$tr.append($('<td class="al pl5 pr5"></td>').append('<span class="cuNm cursorPointer" title="거래처 정보 보기">'+ d.cuNm +'</span>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountSaleTransPrev, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountSalePayPrev, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountSaleBalancePrev, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountBuyTransPrev, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountBuyPayPrev, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountBuyBalancePrev, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountSaleTrans, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountSalePay, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountSaleBalance, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountBuyTrans, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lfcAmountBuyPay, '0')+'</td>'));
		$tr.append($('<td class="ar pl5 " style="padding-right:5px !important;"/>'+self._utils.numberWithCommas(d.lfcAmountBuyBalance, '0')+'</td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	}
	
	ledgerFinishInsertEvent = (popupID,info) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);

		$('.yeraFinish',$layerObject).text(info.yyyy +'년');
		$('.eNm',$layerObject).text(self._const.__USER_NAME);

		$layerObject.on('click','.save',function(){
			let lfPassword = $('input[name=lfPassword]', $layerObject).val();
			let lfPassword2 = $('input[name=lfPassword2]', $layerObject).val();
			if(self._utils.checkEmptyNull(lfPassword)){
				alert('마감 비밀번호를 입력하십시요');
				return;
			}

			if(lfPassword.length < 5){
				alert('마감 비밀번호는 5자리 이상으로 입력하십시요');
				return;
			}
			if(lfPassword != lfPassword2){
				alert('비밀번호가 정확하지 않습니다.');
				return;
			}
			

			info.lfPassword = lfPassword;
			self.ledgerFinsh(info, function(data){
				if(data.code == 0){
					$(".btnClosePopLayer",$layerObject).trigger('click');
					alert('마감처리 되었습니다.');
					self.retrieve();
				}else{
					alert(data.message);
				}
			});
		});
	}
	
	ledgerFinishCancelEvent = (popupID,info) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);
		$('.yeraFinish',$layerObject).text(info.yyyy +'년');
		$('.eNm',$layerObject).text(info.eNm);
		$('.creDate',$layerObject).text(info.creDate);
		$layerObject.on('click','.save',function(){
			let lfPassword = $('input[name=lfPassword]', $layerObject).val();
			if(self._utils.checkEmptyNull(lfPassword)){
				alert('마감 비밀번호를 입력하십시요');
				return;
			}
			
			info.lfPassword = lfPassword;
			self.ledgerFinshCancel(info, function(data){
				if(data.code == 0){
					$(".btnClosePopLayer",$layerObject).trigger('click');
					alert('해지 되었습니다.');
					self.retrieve();
				}else{
					alert(data.message);
				}
			});
		});
	}
	
	

	excelDownload = () =>{
		let self = this;
		const workbook = new ExcelJS.Workbook();
		let fileName = self._code.find(".pageHere strong").text();
		const sheet = workbook.addWorksheet(fileName);
		let $searchWrap = self._code.find(".searchWrapArea");
		let startDt = $searchWrap.find("input[name=startDt]").val();
		let endDt = $searchWrap.find("input[name=endDt]").val();
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let oStatus = $searchWrap.find("select[name=oStatus]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let oMarkYn = $searchWrap.find("input[name=oMarkYn]:checked").val();

		let columnInfos = [];
		columnInfos.push({name:"상태",key:"oStatusNm",width:12,align:'center'});
		columnInfos.push({name:"업체명",key:"cuNm",width:20,align:'left'});
		columnInfos.push({name:"파일명",key:"oFileNm",width:50,align:'left'});
		columnInfos.push({name:"규격",key:"oPaperSize",width:10,align:'center'});
		columnInfos.push({name:"주문수량",key:"oCnt",width:10,align:'right'});
		columnInfos.push({name:"입고여부",key:"istInStatusNm",width:10,align:'center'});
		columnInfos.push({name:"공정",key:"spNm",width:10,align:'center'});
		columnInfos.push({name:"작업명",key:"wNm",width:20,align:'left'});
		columnInfos.push({name:"면(Y/N:앞/뒤)",key:"wFrontYn",width:15,align:'center'});
		columnInfos.push({name:"완료수량",key:"wEndCnt",width:10,align:'rigth'});
		columnInfos.push({name:"비고",key:"wMemo",width:70,align:'left'});
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
			ctl : 'ledger',
			cmd : 'yearFinishInfo'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						cbfunc(rdata.data);
					} else {
						cbfunc(null);
					}
			});
	}
	
	


	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}
	ledgerFinsh = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'yearFinish'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	ledgerFinshCancel = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'yearFinishCancel'
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
export default ledgerController
