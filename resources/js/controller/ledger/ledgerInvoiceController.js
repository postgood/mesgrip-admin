
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let ledgerInvoiceController = class {
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
		let self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		let mapData = {ctl : 'company',cmd : 'load',};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code == 0){
				self._companyInfo = rdata.data;
			}
		});
		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find("input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});

		// 목록 테이블 이벤트 정의
		let $searchWrap = self._code.find(".searchWrapArea");
		let $searchWrapBtn = self._code.find(".searchWrapBtn");
		let $thead = self._code.find(".dataHeadTable thead");
		let $tfoot = self._code.find(".pageInfoTfoot");
		let $tbody = self._code.find(".dataListTable");
		self._tbody = $tbody;

		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});
		
		self._code.find(".btnCreate").on("click",function(e){
			self.layerView(function(data){
				self._parent.openLayer(data, self.layerEvent);
			});
			e.stopPropagation();
		});
		self._code.find(".btnPayCreate").on("click",function(e){
			self.layerPayView(function(data){
				self._parent.openLayer(data, self.layerPayEvent);
			});
			e.stopPropagation();
		});
		self._code.find(".btnInvoiceCall").on("click",function(e){
			let $tbody = self._code.find(".dataListTable tbody");
			let $chkBoxs = $tbody.find("input[name=lSeq]:checked");
			let cuSeqs = [];
			let lSeqs = [];
			if($chkBoxs.length==0){
				alert("세금계산서를 발행할 건을 선택 하십시오");
				return;
			}else if($chkBoxs.length>0){
				for(let i=0 ;i<$chkBoxs.length;i++) {
					let $tr = $($chkBoxs[i]).closest('tr')
					let data = $tr.data("ROW");
					if(data.lKind != 'S'){
						alert("매출건만 계산서 발행이 가능합니다.");
						return false;
					}
					lSeqs.push(data.lSeq);
				}
			}

			let mapData = {ctl : 'ledger',cmd : 'ledgerChoiceList',lSeqs : JSON.stringify(lSeqs),};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0){
						let data = self._utils.objectIfnull(rdata.data);
						let $popDiv = $('template#homtex');
						self._parent.openLayer($popDiv.html(), self.invoiceDocEvent, data);
					}
				});
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

		self._code.find("input[name=chckAll]").on("click",function(e){
			e.stopPropagation();

			let $tbody = self._code.find(".dataListTable tbody");
			let $boxs = $tbody.find("input[name=lSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<$boxs.length;i++){
				let $box = $($boxs[i]);
				if($box.is(":checked") != status) $box.trigger('click');
			}
		});
		let startDt = self._utils.dateformatKorDate(new Date());
		startDt = startDt.substring(0,8)+'01';
		//$searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -3)));
		$searchWrap.find("input[name=startDt]").val(startDt);
		$searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(new Date()));
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

		self._defaultData = self._utils.serializeObject($searchWrap);
		$thead.on("click",".fa-broom",function(){
			let $tr = $(this).closest("tr");
			self._utils.unSerializeObject($searchWrap,self._defaultData );
			$tr.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			self.retrieve();
		});		  
		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) $tfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		$tfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			$tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});

		$tbody.on('click','.btnOpenInfo',function(){
			let $tr = $(this).closest('tr');
			let row = $tr.data("ROW");
			let mapData = {ctl : 'ledger',cmd : 'invoiceLoad',iSeq : row.iSeq,};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					let data = self._utils.objectIfnull(rdata.data);
					let $popDiv = $('template#homtexView');
					self._parent.openLayer($popDiv.html(), self.invoiceDocEvent, data);
				}
			});
		});
		$tbody.on('click','.invoiceLoad',function(){
			let $tr = $(this).closest('tr');
			let row = $tr.data("ROW");
			let mapData = {ctl : 'popbill',cmd : 'invoiceLoad'};
			$.extend(mapData,row);
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
				}
			});
		});
		

		self.retrieve();
		
	}



	retrieve = () => {
		const self = this;

		let $pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rowsPerPage]").val();
		let page = $pageTfoot.find("input[name=page]").val();
		let $searchWrap = self._code.find(".searchWrapArea");
		let startDt = $searchWrap.find("input[name=startDt]").val();
		let endDt = $searchWrap.find("input[name=endDt]").val();
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let oStatus = $searchWrap.find("select[name=oStatus]").val();
		let oFileNm = $searchWrap.find("input[name=oFileNm]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let ledgerYn = $searchWrap.find("select[name=ledgerYn]").val();
		let lKind = $searchWrap.find("select[name=lKind]").val();
		let invoiceYn = $searchWrap.find("select[name=invoiceYn]").val();
		let searchData = {
			cuSeq : undefined,
			startDt : startDt?startDt.replace(/-/g,''):'' ,
			endDt : endDt?endDt.replace(/-/g,''):'',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			oStatus : oStatus,
			oFileNm : oFileNm,
			ledgerYn : ledgerYn,
			searchColumn : 'cuNm',
			searchWord : searchWord,
			lKind : lKind,
			invoiceYn: invoiceYn
		}

		self.list(searchData, function(resp){
			let $tbody = self._code.find(".dataListTable tbody");
			let $thead = self._code.find(".dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			$tbody.empty();
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
						$(".saleAmount",self._code).text(self._utils.numberWithCommas(resp[i].saleAmount));
						$(".saleAmountVat",self._code).text(self._utils.numberWithCommas(resp[i].saleAmountVat));
						$(".saleAmountTotal",self._code).text(self._utils.numberWithCommas(resp[i].saleAmount + resp[i].saleAmountVat));
					}
					self.display($tbody, resp[i]);
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
		//$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="lSeq" value="'+d.iSeq+'"/>')));
		$tr.append($('<td class="ac">'+self._utils.dateformatStringToDate(d.iDt) +'</td>'));
		$tr.append($('<td class="al pl5 pr5"></td>').append('<span class="cuNm cursorPointer" title="거래처 정보 보기">'+ d.cuNm +'</span>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.iAmount, '')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.iAmountVat, '')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/><strong>'+self._utils.numberWithCommas((d.iAmount + d.iAmountVat), '')+'</strong></td>'));
		$tr.append($('<td class="ac pl5 pr5"/>'+((d.itemCnt!=undefined)? d.itemCnt : '')+'</td>'));
		$tr.append($('<td class="al pl5 pr5"/>'+((d.iMemo!=undefined)? d.iMemo : '')+'</td>'));
		$tr.append($('<td class="ac pl5 pr5"/>'+((d.iSendYn=='N')?'미발행':'발행')+'</td>'));
		//$tr.append($('<td class="ac pl5 pr5">'+((d.iSendApproveNo!=undefined)? '<span class="invoiceLoad cursorPointer">'+d.iSendApproveNo +'</span>' : '')+'</td>'));
		$tr.append($('<td class="ac pl5 pr5">'+((d.iSendApproveNo!=undefined)? d.iSendApproveNo : '')+'</td>'));
		$tr.append($('<td class="ac pl5 pr5"/>'+d.eNm+'</td>'));
		$tr.append($('<td class="ac pl5 pr5"/>'+d.creDate.substring(0,16)+'</td>'));
		$tr.append($('<td class=""><i class="fa-regular fa-pen-to-square btnOpenInfo cursorPointer" title="상세보기" style="font-size:14px;"></i></td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	}

	invoiceDocEvent = (popupID, data) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);
		let $invoiceDocument = $('.invoiceDocument',$layerObject);
		self._companyInfo.cAddress = self._companyInfo.cAddr +' '+ self._companyInfo.cAddrDetail
		self._utils.unSerializeObject($layerObject, self._companyInfo);
		let $invoiceOrg = $('.invoice',$invoiceDocument).clone();


		$invoiceDocument.empty();
		
		let paddingHeight = 55;
		let height = 0;

		let cuInfo = data;
		let $invoice = $invoiceOrg.clone();
		let $orderTbody = $('.orderList', $invoice)
		let $trOrg = $('tr', $orderTbody).clone();
		$orderTbody.empty();
		
		$invoice.data("ROW",cuInfo);
		cuInfo.cuAddress = cuInfo.cuAddr +' '+ cuInfo.cuAddrDetail
		self._utils.unSerializeObject($invoice, cuInfo);
		if(!self._utils.checkEmptyNull(cuInfo.iEmail)){
			if(cuInfo.iEmail.indexOf(',') > -1){
				let emails = cuInfo.iEmail.split(',');
				$('input[name=cuInvoiceEmail]', $invoice).val(emails[0]);
				$('input[name=cuInvoiceEmail2]', $invoice).val(emails[1]);
			}else{
				$('input[name=cuInvoiceEmail]', $invoice).val(cuInfo.iEmail);
			}
		}
		if(cuInfo.iItemJoinYn == 'Y'){
			let $tr = $trOrg.clone();
			//$('input[name=lSeq]', $tr).val(d.lSeq);
			$('input[name=lDt]', $tr).val(self._utils.dateformatStringToDate(cuInfo.iDt));
			$('input[name=lilItem]', $tr).val(cuInfo.iItemNm);
			$('input[name=lilAmount]', $tr).val(self._utils.numberWithCommas(cuInfo.iAmount));
			$('input[name=lilAmountVat]', $tr).val(self._utils.numberWithCommas(cuInfo.iAmountVat));
			$('input[name=lilStandard]', $tr).val('-');
			$('input[name=lilCnt]', $tr).val(1);
			$('input[name=lilUnitPrice]', $tr).val(self._utils.numberWithCommas(cuInfo.iAmount));
			$orderTbody.append($tr);
		}else{
			for(let l=0;l<cuInfo.ledgerInfo.length;l++){
				let d = cuInfo.ledgerInfo[l];
				let $tr = $trOrg.clone();
				$('input[name=lSeq]', $tr).val(d.lSeq);
				$('input[name=lDt]', $tr).val(self._utils.dateformatStringToDate(d.lDt));
				$('input[name=lilItem]', $tr).val(d.lilItem);
				$('input[name=lilAmount]', $tr).val(self._utils.numberWithCommas(d.lilAmount));
				$('input[name=lilAmountVat]', $tr).val(self._utils.numberWithCommas(d.lilAmountVat));
				$('input[name=lilStandard]', $tr).val(d.lilStandard);
				$('input[name=lilCnt]', $tr).val(d.lilCnt);
				$('input[name=lilUnitPrice]', $tr).val(self._utils.numberWithCommas(d.lilUnitPrice));
				$orderTbody.append($tr.data("ROW",d));
		//		iAmount += parseInt(d.lilAmount);
		//		iAmountVat += parseInt(d.lilAmountVat);
			}
		}
		$('input[name=iAmount]',$invoice).val(self._utils.numberWithCommas(cuInfo.iAmount));
		$('input[name=iAmountCash]',$invoice).val(self._utils.numberWithCommas(cuInfo.iAmount));
		$('input[name=iAmountVat]',$invoice).val(self._utils.numberWithCommas(cuInfo.iAmountVat));
		$('input[name=iAmountTotal]',$invoice).val(self._utils.numberWithCommas(cuInfo.iAmount+cuInfo.iAmountVat));
		$("input[name=iDt]",$invoice).val(self._utils.dateformatKorDate(new Date()));
		$invoiceDocument.append($invoice);
		height += $invoice.height() + paddingHeight;

		$('.invoiceDocument', $layerObject).css("height", height);

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
			cmd : 'invoiceList'
		}
		$.extend(mapData,_mapData);

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
			ctl : 'ledger',
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
			ctl : 'ledger',
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
			ctl : 'ledger',
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
			ctl : 'ledger',
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
	payInsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'payInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	payLoad = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'payLoad'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}


	payUpdate = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'payUpdate'
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
export default ledgerInvoiceController
