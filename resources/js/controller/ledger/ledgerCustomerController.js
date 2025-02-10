
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let ledgerCustomerController = class {
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

		let $customerList = $('.customerList', self._code);
		let $customerMonth = $('.customerMonth', self._code);
		let $customerTotal = $('.customerList', self._code);
		
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
		let $thead = self._code.find(".f_lt .dataHeadTable thead");
		let $tfoot = self._code.find(".pageInfoTfoot");
		let $leftDataDiv = self._code.find(".f_lt .overflowYListdiv");
		let $rightDataDiv = self._code.find(".f_rt .overflowYListdiv");
		let $leftTbody = self._code.find(".f_lt .dataListTable");
		let $rightTbody = self._code.find(".f_rt .dataListTable");

		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});
		
		// 관리자인 경우 생성
		if(self._const.__MANAGER_YN == 'Y'){
		
		}
		let startYyyy = 2024;
		let nowYyyy = self._utils.dateformatKorDate(new Date()).substring(0,4)
		let $yyyy = $('select[name=yyyy]',$searchWrap);
		$yyyy.empty();
		for(;startYyyy <= nowYyyy ; startYyyy++){
			let $opt = $('<option value="'+ startYyyy +'">'+ startYyyy +'</option>');
			if(startYyyy == nowYyyy) $opt.attr('selected', 'selected');
			$yyyy.append($opt);
		}
		
		$('select[name=lKind]',$searchWrap).on('change',function(){
			let $obj = $(this);
			let lKind = $obj.val();
			
			if(lKind == 'S'){ $obj.css({'color':'red','background':''})
			}else if(lKind == 'B'){{ $obj.css({'color':'blue','background':''});}
			}else{$obj.css({'color':'','background':''})}
			
		});
		$('select[name=lKind]',$searchWrap).trigger('change');
		$thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = $searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			$searchWrap.find("input[name=orderculumn]").val(column);
			$searchWrap.find("input[name=orderby]").val(order);
			self._utils.tHeadOrderBy($(this),order);
			self.retrieve();
		});

		$leftDataDiv.on('scroll',function(e){
			let top = $(this).scrollTop();
			$rightDataDiv.scrollTop(top);
			e.stopPropagation();

		});
		$rightDataDiv.on('scroll',function(e){
			let top = $(this).scrollTop();
			$leftDataDiv.scrollTop(top);
			e.stopPropagation();
		});
		self._code.find("input[name=chckAll]").on("click",function(e){
			let $tbody = self._code.find(".dataListTable tbody");
			let $boxs = $tbody.find("input[name=oSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<$boxs.length;i++){
				let $box = $($boxs[i]);
				if($box.is(":checked") != status) $box.trigger('click');
			}
			
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

		self._defaultData = self._utils.serializeObject($searchWrap);
		$(".btnPrintCall", $searchWrap).on("click",function(e){
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=oSeq]:checked");
			let startDt = $("input[name=startDt]", $searchWrap).val();
			let endDt = $("input[name=endDt]", $searchWrap).val();

			if(chkBoxs.length==0){
				alert("거래명세표를 출력할 대상을 선택 하십시오");
				return;
			}
			let oSeqs = [];
		
			for(let i=0;i<chkBoxs.length;i++){	oSeqs.push($(chkBoxs[i]).val());}
			let _api = new AjaxCall(self._const,{ctl:"company", cmd :"load"},{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						let info = rdata.data;
						info.oSeqs = oSeqs;
						info.startDt = startDt;
						info.endDt = endDt;
						let $popDiv = $('template#transReport');
						self._parent.openLayer($popDiv.html(), self.transReportEvent,info);
					}
				});
			

		});

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

		
		$leftTbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});
		$rightTbody.on('click','td:not(last)',function(){
			let d = $(this).closest('tr').data('ROW');
			let idx = $(this).index()+1;
			
			d.yyyy = $searchWrap.find("select[name=yyyy]").val();
			d.mm = (idx<10)?'0'+idx:idx;
			let $popDiv = $('template#transList');
			self._parent.openLayer($popDiv.html(), self.transListEvent,d);
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
		let lKind = $searchWrap.find("select[name=lKind]").val();
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let zeroRemove = $searchWrap.find("input[name=zeroRemove]:checked").val();
		zeroRemove
		let searchData = {
			cuSeq : undefined,
			yyyy : yyyy,
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			lKind : lKind,
			searchColumn : 'cuNm',
			searchWord : searchWord,
			zeroRemove : zeroRemove,
		}

		self.list(searchData, function(resp){
			let $tbody = self._code.find(".f_lt .dataListTable tbody");
			let $thead = self._code.find(".f_lt .dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			let lKind = self._code.find("select[name=lKind]").val();
			let $customerList = $('.customerList', self._code);
			let $customerMonth = $('.customerMonth', self._code);
			let $monthTotal = $('.monthTotal', self._code);
			$customerList.empty();
			$customerMonth.empty();
			let total = 0;
			let totalPage = 0;
			$('.headBalance',self._code).text(lKind=='S'?'현재 미결제금': '현재 미결재금');
			if(resp.data != null && resp.data.length > 0) {
				let list = resp.data;
				for(let i in list){
					if(i==0){
						total = list[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
					}
					self.display($customerList,$customerMonth, list[i]);
				}

				$monthTotal.empty();
				let sumTotal = resp.total;
				let $tr = $('<tr/>');
				$tr.append($('<td class="ac " />').append('총거래금액'));
				for(let m=1;m<=12;m++) $tr.append($('<td class="ar pr5" />').append(self._utils.numberWithCommas(sumTotal['totalTrans_'+m])));
				$tr.append($('<td class="ar pr5" style="font-weight: bold;" />').append(self._utils.numberWithCommas(sumTotal['totalTrans'])));
				$monthTotal.append($tr);
				$tr = $('<tr/>');
				$tr.append($('<td class="ac " style="color:#10a94f;" />').append('총결제금액'));
				for(let m=1;m<=12;m++) $tr.append($('<td class="ar pr5" style="color:#10a94f;" />').append(self._utils.numberWithCommas(sumTotal['totalPay_'+m])));
				$tr.append($('<td class="ar pr5" style="color:#10a94f;font-weight: bold;" />').append(self._utils.numberWithCommas(sumTotal['totalPay'])));
				$monthTotal.append($tr);

				//self._utils.tbodyMerge($customerList,[0,1],"cuSeq");


				let $trs = $('tr',$tbody);

			} else {
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);

		});
	}

	display = ($customerList,$customerMonth, d) => {
		const self = this;
		let lKind = self._code.find("select[name=lKind]").val();
		let finishInfo = d.finishInfo;
		let balancePrev = (lKind=='S')?self._utils.nvl(finishInfo.lfcAmountSaleBalance,0) : self._utils.nvl(finishInfo.lfcAmountBuyBalance,0);
		let balanceTotalPrev = 0;
		if (lKind=='S'){
			// balanceTotalPrev = self._utils.nvl(finishInfo.cuAmountSaleStart,0) + self._utils.nvl(finishInfo.lfcAmountSaleBalance,0) + (self._utils.nvl(d.transTotal,0) - self._utils.nvl(finishInfo.payTotal,0))	;
			balanceTotalPrev = self._utils.nvl(d.cuAmountSaleBalance,0) 	;
		}else{
			// balanceTotalPrev = self._utils.nvl(finishInfo.cuAmountBuyStart,0) + self._utils.nvl(finishInfo.lfcAmountBuyBalance,0) + (self._utils.nvl(d.transTotal,0) - self._utils.nvl(finishInfo.payTotal,0));
			balanceTotalPrev = self._utils.nvl(d.cuAmountSaleBalance,0) ;
		}
		let $listTr = $('<tr/>');
		//$listTr.append($('<td />').append($('<input type="checkbox" name="cuSeq" value="'+ d.cuSeq +'" >')));
		$listTr.append($('<td class="al" rowspan="2" style="padding-left:10px;font-size:12px;" />').append($('<input type="hidden" name="cuSeq" value="'+ d.cuSeq +'" >')).append('<span class="cuNm cursorPointer" style="font-weight: bold;color:#566981;font-size:13px;">'+ d.cuNm +'</span>').append('<br><span class="cuNm cursorPointer" style="margin-top:10px;display:inline-block;color:#666;">전년이월금 : '+self._utils.numberWithCommas(balancePrev)+' 원</span>'));
		$listTr.append($('<td class="ar pr5 pl5" rowspan="2" style="color:#cd110f;" title="현재 미수금"/>').append(self._utils.numberWithCommas(balanceTotalPrev)));
		$listTr.append($('<td class="ac pr5 pl5" style="padding-right:5px !important;"  title="금년 총미수금 : '+ self._utils.numberWithCommas((lKind=='S')?self._utils.nvl(d.cuAmountSaleBalance,0):self._utils.nvl(d.cuAmountBuyBalance,0)) +'원"/>').append('거래금액'));
		$listTr.data("ROW",d);
		$customerList.append($listTr);
		$listTr = $('<tr/>');
		$listTr.append($('<td class="ac pr5 pl5" style="color:#10a94f;padding-right:5px !important;" title="금년 총미수금 : '+ self._utils.numberWithCommas((lKind=='S')?self._utils.nvl(d.cuAmountSaleBalance,0):self._utils.nvl(d.cuAmountBuyBalance,0)) +'원"/>').append('결제금액'));
		$listTr.data("ROW",d);
		$customerList.append($listTr);

		let $monthTr = $('<tr/>');
		for(let i=1;i<=12;i++) $monthTr.append($('<td class="ar pr5 pl5" style="'+((i==1) ?'border-left:0px !important;':'')+'" />').append('<span class="cursorPointer">'+ self._utils.numberWithCommas(d['trans_'+i])+'</span>'));
		$monthTr.append($('<td class="ar pr5 pl5" style="padding-right: 5px !important;font-weight: bold;" />').append(self._utils.numberWithCommas(d.transTotal)));
		$monthTr.data("ROW",d);
		$customerMonth.append($monthTr);
		$monthTr = $('<tr/>');
		for(let i=1;i<=12;i++) $monthTr.append($('<td class="ar pr5 pl5" style="color:#10a94f;'+((i==1) ?'border-left:0px !important;':'')+'" />').append('<span class="cursorPointer">'+ self._utils.numberWithCommas(d['pay_'+i])+'</span>'));
		$monthTr.append($('<td class="ar pr5 pl5" style="padding-right: 5px !important;color:#10a94f;font-weight: bold;"/>').append(self._utils.numberWithCommas(d.payTotal)));
		$monthTr.data("ROW",d);
		$customerMonth.append($monthTr);

	}
	transListEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let $transTbody = $('.transList',$layerObject);
		let $payTbody = $('.payList',$layerObject);
		$('.title',$layerObject).text(info.cuNm +' '+ info.yyyy +'년'+ info.mm +'월 상세내역');

		let mapData = {ctl : 'ledger',cmd : 'list',};
		mapData.cuSeq = info.cuSeq;
		mapData.yyyy = info.yyyy;
		mapData.mm = info.mm;
		mapData.rows = 999;
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
					let i = 0;
					for(;i<rdata.data.length;i++){
						let d = rdata.data[i];
						let $tr = $('<tr/>');
						$tr.append($('<td class="ac" style="height:30px;background:#fff;"/>').append(self._utils.dateformatStringToDate(d.lDt)));
						$tr.append($('<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>').append('<span style="color:'+ ((d.lKind == 'S')?'red':'blue')+'">'+d.lKindNm+'</span>'));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lMemo+'"/>').append(self._utils.numberWithCommas(d.lAmount, '0')));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lMemo+'"/>').append(self._utils.numberWithCommas(d.lAmountVat, '0')));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lMemo+'"/>').append(self._utils.numberWithCommas(d.lAmountTotal, '0')));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lMemo+'"/>').append(self._utils.numberWithCommas(d.lAmountBalance, '0')));
						$transTbody.append($tr);
					}
					for(;i<12; i++){
						let $tr = $('<tr/>');
						$tr.append($('<td class="ac" style="height:30px;background:#fff;"/>'));
						$tr.append($('<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
						$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
						$transTbody.append($tr);
					}
					self._utils.tableScrollCheck();
			}		
		});

		mapData.cmd = 'payList';
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api2.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let i = 0;
				for(;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let $tr = $('<tr/>');
					$tr.append($('<td class="ac" style="height:30px;background:#fff;"/>').append(self._utils.dateformatStringToDate(d.lpDt)));
					$tr.append($('<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lpMemo+'"/>').append('<span style="color:'+ ((d.lKind == 'I')?'red':'blue')+'">'+d.lpKindNm+'</span>'));
					$tr.append($('<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lpMemo+'"/>').append(((d.caSeq != undefined)? d.caBankNm +' '+ d.caAccount :'')));
					$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lpMemo+'"/>').append(self._utils.numberWithCommas(d.lpAmount, '0')));
					$tr.append($('<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;" title="'+d.lpMemo+'"/>').append(d.eNm));
					$payTbody.append($tr);
				}
				for(;i<12; i++){
					let $tr = $('<tr/>');
					$tr.append($('<td class="ac" style="height:30px;background:#fff;"/>'));
					$tr.append($('<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
					$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
					$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
					$tr.append($('<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"/>'));
					$payTbody.append($tr);
				}
				self._utils.tableScrollCheck();
			}		
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
			cmd : 'customerMonthAggregate'
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
			ctl : 'work',
			cmd : 'qrWorkLoad'
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
			cmd : 'orderUpdate'
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
export default ledgerCustomerController
