
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let ledgerWorkController = class {
	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._employee = {};
		this._nowIndex = 0;
	}

	init = (_code,_data) => {
		const self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		
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
		let $tfoot = self._code.find(".f_lt .pageInfoTfoot");
		let $tbody = self._code.find(".f_lt .dataListTable");
		self._tbody = $tbody;
		
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
			let $tbody = self._code.find(".dataListTable tbody");
			let $boxs = $tbody.find("input[name=oSeq]"); 
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
		$(".btnPrintCall", $searchWrap).on("click",function(e){
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=oSeq]:checked");
			let startDt = $("input[name=startDt]", $searchWrap).val();
			let endDt = $("input[name=endDt]", $searchWrap).val();

			if(chkBoxs.length==0){
				alert("거래명세표에 작성할 대상을 선택 하십시오");
				return;
			}
			let oSeqs = [];
			let cuSeqs = [];
			for(let i=0;i<chkBoxs.length;i++){
				let $tr = $(chkBoxs[i]).closest('tr');
				let data = $tr.data("ROW");
				if(data.lSeq == undefined){
					alert('['+ data.oFileNm +'] 매출원장에 등록이 안된 수주건입니다.');
					return;
				}
				oSeqs.push($(chkBoxs[i]).val());
				if(cuSeqs.indexOf(data.cuSeq) == -1) cuSeqs.push(data.cuSeq);
			}

			if(cuSeqs.length > 1){
				alert("하나의 거래처의 수주를 선택하십시요");
				return;
			}
			let _api = new AjaxCall(self._const,{ctl:"company", cmd :"load", employee :'N'},{'wapi': 'user/ws','spinner':true});
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
			if($(this).val() <= 100) localStorage.setItem('rowsPerPage',$(this).val());
			$tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
/*
		$tbody.on('click','.oFileNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.orderView(d);			
		});
		$tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});
*/		
		$tbody.on('click','.createLedger',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data('ROW');
			let $tbody = self._code.find(".f_lt .dataListTable tbody");
			$tbody.find('td').css('font-weight','');
			$tr.find('td').css('font-weight','bold');
			self._nowIndex = $tr.index();
			let mapData = {ctl : 'ledger',cmd : 'orderLoad', oSeq : d.oSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {

					// 테스트용
					/*
					if(rdata.data.oEndCnt == undefined)	rdata.data.oEndCnt = 10259;
					for(let i=0;i<rdata.data.workInfo.length;i++) {
						if(rdata.data.workInfo[i].wEndCnt == undefined) rdata.data.workInfo[i].wEndCnt = 15000
					}
					*/
					/*
					if(self._isCreateLedger ==undefined){
						self._isCreateLedger = true;
						self.createLedgerView();
					}
					*/
					self.createLedgerView();
					self.ledgerInput(rdata.data);
				}else{
					alert(rdata.message);
				}
			});
		});
		self.retrieve();
		self.ledgerEvent();
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
		}

		self.list(searchData, function(resp){
			let $tbody = self._code.find(".f_lt .dataListTable tbody");
			let $thead = self._code.find(".f_lt .dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			$tbody.empty();
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
					}
					self.display($tbody, resp[i]);
				}
				// self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,7],"oSeq");

				let $trs = $('tr',$tbody);
				$($trs[self._nowIndex]).find(".createLedger:eq(0)").trigger('click');
				//for(let t =0;t<$trs.length;t++) $($($trs[t]).find('td').eq(8)).css('border-right','1px solid #dedede !important;');

			} else {
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);

		});
	}

	display = ($tbody, d) => {
		const self = this;

		let $sendIcon = $('<span style="display:inline-block;width:20px;color:#666;"></span>');;
		if(d.oTransSendYn == 'Y') $sendIcon.append('<i class="fa-regular fa-paper-plane" title="* 일시 : '+ d.oTransSendDate.substring(0,16) +'"></i>');
		let tdStyle = 'border-left:1px solid #ccc;'; //((d.oStatus!='A')?' style="background-color:'+self._utils.processStatus('color',d.oStatus)+'"':'')
		if(d.lSeq != undefined) tdStyle += "background: #e6eeff !important"
		let otransSendYn
		let $tr = $('<tr />');
		$tr.append($('<td style="'+tdStyle+'" class=""></td>').append($('<input type="checkbox" class="vm" name="oSeq" value="'+d.oSeq+'"/>')));
		$tr.append($('<td style="'+tdStyle+'" class="createLedger cursorPointer" title="'+((d.oTransSendYn=='Y')? '발송일시 :'+ d.oTransSendDate.substring(0,16):'미발송')+'"><i class="fa-regular fa-paper-plane" style="font-size:12px;color:'+((d.oTransSendYn=='Y')? '#ccc':'#333')+'"></i></td>'));
		$tr.append($('<td style="'+tdStyle+'" class="al createLedger cursorPointer">'+self._utils.nullTostring(d.cuNm, '')+'</td>'));
		$tr.append($('<td style="'+tdStyle+'" class="al createLedger cursorPointer"></td>').append('<span class="" >'+self._utils.nullTostring(d.oFileNm, '') +'</span>'));
		//tr.append($('<td'+tdStyle+' title="'+ d.oPaperWidth +' × '+ d.oPaperHeight +'"></td>').text(self._utils.nullTostring(d.oPaperSize, '')));
		$tr.append($('<td style="'+tdStyle+'" class="ar createLedger cursorPointer"/>'+self._utils.numberWithCommas(d.oCnt, '')+'</td>'));
		//tr.append($('<td'+tdStyle+' class="ar">'+self._utils.numberWithCommas(d.oCnt, '')+'</td>'));
		$tr.append($('<td style="'+tdStyle+'" class="createLedger cursorPointer" '+((d.oStatus != 'A')?'title="변경일시 : '+ d.oStatusDate +'"':'')+'>'+self._utils.processStatus('nm',d.oStatus) +'</td>'));
		
		$tr.append($('<td style="'+tdStyle+'" class="createLedger cursorPointer">'+self._utils.dateformatKorDate(d.creDate)+'</td>'));
		//$tr.append($('<td'+tdStyle+'><i class="fa-regular fa-clipboard createLedger cursorPointer" '+ ((d.lSeq == undefined)?'style="color:red;" title="원장을 등록해주세요"':'title="원장 등록완료"')+'></i></td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	}
	createLedgerView = (d) =>{
		let self = this;
		let $rightDiv = self._code.find(".f_rt");
		$rightDiv.empty();
		let template = $("template#ledgerWorkCreate");
		//debugger
		$rightDiv.append(template.html());

	}
	ledgerInput = (d) =>{
		let self = this;
		let $rightDiv = self._code.find(".f_rt");
		let $table = $('.orderTable', $rightDiv);
		let $tbody = $('.workList tbody', $table);
		$('.save', $rightDiv).show();
		
		$('.f_rt.buttonArea .taxSendMessage',$rightDiv).remove();
		if(!self._utils.checkEmptyNull(d.lSeq)){
			$table.find('input[name=lSeq]').val(d.lSeq);
			// $('.save.ledger', $rightDiv).attr('disabled', 'disabled').addClass('disable');
			$('.save.tempSave', $rightDiv).hide();
			$('.save.ledger', $rightDiv).text('저장');
			if(d.lAmountInvoice != d.lAmountTotal){
				$('.save', $rightDiv).hide();
				$('.f_rt.buttonArea', $rightDiv).append('<span class="taxSendMessage" style="margin-top: 10px; display: inline-block;">세금계산서 발행이 되어 수정 불가합니다.</span>');
			}
		}else{
			$('.save.tempSave', $rightDiv).show();
			$('.save.ledger', $rightDiv).text('등록');
			// $('.save.ledger', $rightDiv).removeAttr('disabled').removeClass('disable');
		}
		$table.find('.cuNm').text(d.cuNm);
		$table.find('.oFileNm').text(d.oFileNm);
		$table.find('.oPaperSize').text(d.oPaperSize);
		$table.find('.oCnt').text(self._utils.numberWithCommas(d.oCnt, ''));
		$table.find('.oMemo').text(d.oMemo);
		$table.find('.cuSignificant').text(d.cuSignificant);
		$table.find('input[name=oEndCnt]').val(((d.oEndCnt != null)?self._utils.numberWithCommas(d.oEndCnt, '0'):'0'));
		$table.find('input[name=oUnitPrice]').val(((d.oUnitPrice != null)?self._utils.numberWithCommas(d.oUnitPrice, '0'):'0'));
		$table.find('input[name=oAmount]').val(((d.oAmount != null)?self._utils.numberWithCommas(d.oAmount, '0'):'0'));
		$table.find('input[name=oAmountVat]').val(((d.oAmountVat != null)?self._utils.numberWithCommas(d.oAmountVat, '0'):'0'));
		$table.find('input[name=oAmountDc]').val(((d.oAmountDc != null)?self._utils.numberWithCommas(d.oAmountDc, '0'):'0'));
		$table.find('input[name=oAmountCalculable]').val(((d.oAmountCalculable != null)?self._utils.numberWithCommas(d.oAmountCalculable, '0'):'0'));
		$table.find('input[name=istDeliveryAmount]').val(((d.istDeliveryAmount != null)?self._utils.numberWithCommas(d.istDeliveryAmount, '0'):'0'));
		$table.find('input[name=istDeliveryAmountVat]').val(((d.istDeliveryAmountVat != null)?self._utils.numberWithCommas(d.istDeliveryAmountVat, '0'):'0'));

		$tbody.empty();
		for(let i=0;i<d.workInfo.length; i++){
			let w = d.workInfo[i];
			let $tr = $('<tr style="width:100%;"/>');
			let addBorderTop = '';
			if(i==0) addBorderTop += 'border-top:0px;';
			let orderOption = '', workOption = '';
			let woMarkYn = 'N';
			for(let o=0;o<w.optionInfo.length;o++){
				let op = w.optionInfo[o];
				if(op.woMarkYn == 'Y') woMarkYn = 'Y';
				if(op.cwoOrderYn == 'Y'){
					if(op.woInput != null && op.cwoCostYn == 'Y') {orderOption += (((orderOption!='')?' ':'') + '<span class="workOptionListOne vm" style="height:20px;"><strong class="workOptionInfoView" style="height: 20px;"><span style="font-size:10px;font-weight: normal;">'+ op.cwoNm + '</span> : <span style="font-size:10px;">'+ op.woInput +'</span> <input type="hidden" name="woSeq" value="'+ op.woSeq +'"> <input type="text" name="woAmount" style="text-align:right; height:16px;width:60px;margin-left:5px;margin-top:0x;font-size:11px;padding-bottom: 2px;" placeholder="금액" title="금액" value="'+((op.woAmount != null)?self._utils.numberWithCommas(op.woAmount, '0'):'0')+'"><input type="text" name="woAmountVat" style="display:none;text-align:right;width:45px;margin-left:5px;font-size:11px;" placeholder="부가세" title="부가세" value="'+((op.woAmountVat != null)?self._utils.numberWithCommas(op.woAmountVat, '0'):'0')+'"</strong></span>');}
				}else{
				//	if(op.woInput != null && op.cwoCostYn == 'Y') {workOption += (((workOption!='')?' ':'') + '<span class="workOptionListOne vm"><strong class="workOptionInput">'+ op.cwoNm + ' : '+ op.woInput +' <input type="text" name="cwoAmount" style="text-align:right;width:60px;" placeholder="금액" value="'+((op.woAmount != null)?self._utils.numberWithCommas(op.woAmount, ''):'')+'"></strong></span>');}
				}
			}
			
			let tdText = w.spNm + '/'+ w.wNm +'/'+ w.wFrontYnNm
			$tr.append($('<td class="ac workOptionView cursorPointer" style="color:#000;'+addBorderTop+'" />').append(w.spNm));
			$tr.append($('<td class="ac workOptionView cursorPointer" style="color:#000;'+addBorderTop+'" />').append(w.wFrontYnNm));
			$tr.append($('<td class="ac workOptionView cursorPointer" style="'+((woMarkYn == 'Y')?'color:#f78ca4;font-weight: bold;':'color:#000;') +  addBorderTop+'" />').append(w.wNm + (self._utils.checkEmptyNull(w.wInfo) ? '' : '<br>('+ w.wInfo+')')));
			

			$tr.append($('<td class="workOptionListDiv al" style="'+addBorderTop+';padding-left:0px;padding-top:5px !important;padding-bottom:0px !important;"/>').append($(orderOption)));
			//$tr.append($('<td class="workOptionListDiv al"/>').append($(workOption)));
			$tr.append($('<td class="ar"  style="color:#000;'+addBorderTop+';" />').append($('<strong class="wEndCnt">'+((w.wEndCnt != undefined)?self._utils.numberWithCommas(w.wEndCnt, ''):'')+'</strong>')));
			$tr.append($('<td class="ar"  style="color:#000;'+addBorderTop+';" />').append($('<input type="text" name="wApplyCnt" vType="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="적용될 수량"  value="'+((w.wApplyCnt != null)?self._utils.numberWithCommas(w.wApplyCnt, '0'):self._utils.numberWithCommas(w.wEndCnt, '0'))+'">')));
			$tr.append($('<td class="ac"  style="color:#000;'+addBorderTop+';" />').append($('<input type="text" name="wUnitPriceWork" vType="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 금액 및 부가세 자동 입력"  value="'+((w.wUnitPriceWork != null)?self._utils.numberWithCommas(w.wUnitPriceWork, '0'):'0')+'">')));
			$tr.append($('<td class="ac"  style="color:#000;'+addBorderTop+';" />').append($('<input type="text" name="wAmount" vType="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 단가는 표시 되지 않습니다." value="'+((w.wAmount != null)?self._utils.numberWithCommas(w.wAmount, '0'):'0')+'">')));
			$tr.append($('<td class="ac"  style="color:#000;'+addBorderTop+';" />').append($('<input type="text" name="wAmountVat" vType="number" class="w100p inputBoder0 ar" style="font-size:13px;" value="'+((w.wAmountVat != null)?self._utils.numberWithCommas(w.wAmountVat, '0'):'0')+'">')));
			$tr.data("ROW",w);
			$tbody.append($tr);

		}
		self.totalSum($rightDiv);
		$rightDiv.data(d);
	}
	ledgerEvent = () =>{
		let self = this;
		let $rightDiv = self._code.find(".f_rt");
	
		//let $tbody = $('.workList tbody', $table);
		
		$rightDiv.on('focus','input[name=istDeliveryAmount],[name=istDeliveryAmountVat],[name=oEndCnt],[name=woAmount],[name=woAmountVat],[name=oUnitPrice],[name=oAmountDc],[name=oAmount],[name=oAmountVat],input[name=wApplyCnt],[name=wUnitPriceWork],[name=wAmount],[name=wAmountVat]',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val((v=='0')?'':v);
		});
		$rightDiv.on('focusout','input[name=istDeliveryAmount],[name=istDeliveryAmountVat],[name=oEndCnt],[name=woAmount],[name=woAmountVat],[name=oUnitPrice],[name=oAmountDc],[name=oAmount],[name=oAmountVat],input[name=wApplyCnt],[name=wUnitPriceWork],[name=wAmount],[name=wAmountVat]',function(){
			let o = $(this).data("ROW");
			let v = $(this).val();
			let n = $(this).attr('name');
			if(v == '') v = 0;
			o = self._utils.getOnlyNumber(o);
			v = self._utils.getOnlyNumber(v);
			$(this).val(self._utils.numberWithCommas(v));
			if(o!=v){
				if(['wApplyCnt','woAmount','wUnitPriceWork','wAmount','istDeliveryAmount'].indexOf(n) > -1){
					let $tr = $(this).closest('tr');
					let info = $tr.data('ROW');
					
					if(n=='woAmount'){
						// $('input[name=woAmountVat]',$tr).val(self._utils.numberWithCommas(v*0.1));
						$('input[name=woAmountVat]',$(this).closest('strong')).val(self._utils.numberWithCommas(parseInt(v*0.1)));
					}else if(n == 'wAmount'){
						// $('input[name=wUnitPriceWork]',$tr).val(self._utils.numberWithCommas((v/info.wEndCnt).toFixed(2)));
						$('input[name=wUnitPriceWork]',$tr).val(0);
						$('input[name=wAmountVat]',$tr).val(self._utils.numberWithCommas(parseInt(v*0.1)));
					}else if(n == 'wUnitPriceWork'){
						let wApplyCnt = $('input[name=wApplyCnt]',$tr).val();
						wApplyCnt = self._utils.getOnlyNumber(wApplyCnt);
						$('input[name=wAmount]',$tr).val(self._utils.numberWithCommas(wApplyCnt*v));
						$('input[name=wAmountVat]',$tr).val(self._utils.numberWithCommas(parseInt((wApplyCnt*v)*0.1)));
					}else if(n == 'istDeliveryAmount'){
						$('input[name=istDeliveryAmountVat]',$tr).val(self._utils.numberWithCommas(parseInt(v*0.1)));
					}else if(n == 'wApplyCnt'){
						let wUnitPriceWork = $('input[name=wUnitPriceWork]',$tr).val();
						wUnitPriceWork = self._utils.getOnlyNumber(wUnitPriceWork);
						let wAmount = parseInt(v*wUnitPriceWork);
						$('input[name=wAmount]',$tr).val(self._utils.numberWithCommas(wAmount));
						$('input[name=wAmountVat]',$tr).val(self._utils.numberWithCommas(parseInt(wAmount*0.1)));
					}
				}

				if(['oAmountDc','oAmount','oUnitPrice'].indexOf(n) > -1){
					let oEndCnt = $('input[name=oEndCnt]', $rightDiv).val();
					if(!self._utils.checkEmptyNull(oEndCnt)){
						oEndCnt = self._utils.getOnlyNumber(oEndCnt);	
						let oAmountCalculable = $('input[name=oAmountCalculable',$rightDiv).val();
						oAmountCalculable = (!self._utils.checkEmptyNull(oAmountCalculable))? self._utils.getOnlyNumber(oAmountCalculable) : 0;
						if(n=='oAmountDc'){
							if(v <0){
								alert('마이너스는 입력 할 수 없습니다.');
								$(this).val(o);
								return;
							}
							let oAmount = oAmountCalculable - v;
							if(oAmount <0){
								alert('할인금액은 공급가보다 크게 입력 할수없습니다.');
								$(this).val(o);
								return;
							}
							$('input[name=oAmount',$rightDiv).val(self._utils.numberWithCommas(oAmount));
							$('input[name=oAmountVat',$rightDiv).val(self._utils.numberWithCommas(parseInt(oAmount*0.1)));
							console.log(parseInt(oAmount*0.1));
						}else if(n=='oAmount'){
							let oAmountDc = oAmountCalculable - v;
							$('input[name=oAmountDc',$rightDiv).val(self._utils.numberWithCommas(oAmountDc));
							$('input[name=oAmountVat',$rightDiv).val(self._utils.numberWithCommas(parseInt(v*0.1)));
						}else if(n=='oUnitPrice'){
							oAmountCalculable = oEndCnt * v;
							let addAmount = self.addAmount().total;
							let oAmountDc = $('input[name=oAmountDc',$rightDiv).val()
							oAmountDc = (!self._utils.checkEmptyNull(oAmountDc))? self._utils.getOnlyNumber(oAmountDc) : 0;
							let oAmount = (oAmountCalculable + addAmount) - oAmountDc;
							$('input[name=oAmountCalculable',$rightDiv).val(self._utils.numberWithCommas(oAmountCalculable + addAmount));
							$('input[name=oAmount',$rightDiv).val(self._utils.numberWithCommas(oAmount));
							$('input[name=oAmountDc',$rightDiv).val(self._utils.numberWithCommas(parseInt(oAmount*0.1)));
						}
					}
				}
				
				if(['oAmountDc','oAmount','oAmountVat','oUnitPrice'].indexOf(n) == -1)	self.totalSum($rightDiv);
			}
		});
		

		$rightDiv.on('click','.workOptionView',function(){
			let $tr = $(this).closest('tr');
			let info = $tr.data('ROW');
			self.layerWorkView(function(data){
				self._parent.openLayer(data, self.layerWorkInput,info);
			}, info);
		});
		

		$rightDiv.on('click','.save',function(){
			let info = $rightDiv.data();
			/*if($(this).hasClass('disable')){
				return false;
			}
			*/
			if(info.lSeq != undefined){
				if(info.lAmountInvoice != info.lAmountTotal){
					alert('세금계산서가 발행된 수주건으로 수정이 불가능 합니다.');
					return false;
				}
			}

			let saveInfo = {oSeq: info.oSeq, istSeq : info.istSeq, cuSeq : info.cuSeq,lMemo:info.oFileNm };
			let oUnitPrice = $rightDiv.find("input[name=oUnitPrice]").val();
			let oAmount = $rightDiv.find("input[name=oAmount]").val();
			let oAmountVat = $rightDiv.find("input[name=oAmountVat]").val();
			let oAmountDc = $rightDiv.find("input[name=oAmountDc]").val();
			let oAmountCalculable = $rightDiv.find("input[name=oAmountCalculable]").val();
			let istDeliveryAmount = $rightDiv.find('input[name=istDeliveryAmount]').val();
			let oEndCnt = $('input[name=oEndCnt]', $rightDiv).val();
			let oCnt = info.oCnt;
			oEndCnt = (!self._utils.checkEmptyNull(oEndCnt))? parseInt(self._utils.getOnlyNumber(oEndCnt)) : 0;
		
			if(self._utils.checkEmptyNull(oUnitPrice)){
				alert('수주 기준 단가 입력 되지 않았습니다.');
				return false;
			}
			if(self._utils.checkEmptyNull(oAmount)){
				alert('청구 금액이 입력 되지 않았습니다.');
				return false;
			}
			saveInfo.oEndCnt = oEndCnt;
			saveInfo.oUnitPrice = self._utils.getOnlyNumber(oUnitPrice);
			saveInfo.oAmount = self._utils.getOnlyNumber(oAmount);
			saveInfo.oAmountVat = self._utils.getOnlyNumber(oAmountVat);
			saveInfo.oAmountDc = self._utils.getOnlyNumber(oAmountDc);
			saveInfo.oAmountCalculable = self._utils.getOnlyNumber(oAmountCalculable);
			saveInfo.istDeliveryAmount = self._utils.getOnlyNumber(istDeliveryAmount);
			let $tbody = $('.workList tbody',$rightDiv);
			let $trs = $tbody.children();
			saveInfo.workInfo = [];
			for(let i=0;i<$trs.length;i++){
				let $tr = $($trs[i]);
				let work = self._utils.serializeObject($tr);
				work.wSeq = $tr.data("ROW").wSeq;
				if(!self._utils.checkEmptyNull(work.wUnitPriceWork)) work.wUnitPriceWork = self._utils.getOnlyNumber(work.wUnitPriceWork);
				if(!self._utils.checkEmptyNull(work.wAmount)) work.wApplyCnt = self._utils.getOnlyNumber(work.wApplyCnt);
				if(!self._utils.checkEmptyNull(work.wAmount)) work.wAmount = self._utils.getOnlyNumber(work.wAmount);
				if(!self._utils.checkEmptyNull(work.wAmountVat)) work.wAmountVat = self._utils.getOnlyNumber(work.wAmountVat);
				
				let $options = $tr.find('.workOptionListOne');
				work.optionInfo = [];
				for(let o=0;o<$options.length;o++){
					let option = {};
					let woSeq = $($options[o]).find('input[name=woSeq]').val();
					let woAmount = $($options[o]).find('input[name=woAmount]').val();
					let woAmountVat = $($options[o]).find('input[name=woAmountVat]').val();
					option.woSeq = woSeq;
					option.wSeq = work.wSeq;
					if(!self._utils.checkEmptyNull(woAmount)) option.woAmount = self._utils.getOnlyNumber(woAmount);
					if(!self._utils.checkEmptyNull(woAmountVat)) option.woAmountVat = self._utils.getOnlyNumber(woAmountVat);
					work.optionInfo.push(option);
				}
				saveInfo.workInfo.push(work);
			}
			saveInfo.workInfo = JSON.stringify(saveInfo.workInfo);
			if($(this).hasClass('ledger')) saveInfo.ledgerInsert = 'Y';
			if(!self._utils.checkEmptyNull(info.lSeq)) saveInfo.lSeq = info.lSeq;
			self.update(saveInfo, function(data){
				if(data.code == 0){
					alert('저장 되었습니다.');
					let mapData = {ctl : 'ledger',cmd : 'orderLoad', oSeq : info.oSeq};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code==0) {
							self.ledgerInput(rdata.data);
						}else{
							alert(rdata.message);
						}
					});
					
					self.retrieve();
				}else{
					alert(data.message);
				}
			});
		});
		

		$rightDiv.on('keypress','input',function(e){
			if(e.charCode == 13){
				$(this).trigger('focusout');
			}
		});

		self._utils.tableScrollCheck();
	}

	addAmount = ($rightDiv) =>{
		let self = this;
		// 배송비
		let istDeliveryAmount = $('input[name=istDeliveryAmount]',$rightDiv).val();
		let istDeliveryAmountVat = $('input[name=istDeliveryAmountVat]',$rightDiv).val();
		istDeliveryAmount = (!self._utils.checkEmptyNull(istDeliveryAmount))? parseInt(self._utils.getOnlyNumber(istDeliveryAmount)) : 0;
		istDeliveryAmountVat = (!self._utils.checkEmptyNull(istDeliveryAmountVat))? parseInt(self._utils.getOnlyNumber(istDeliveryAmountVat)) : 0;
		//세부사항 비용 체크
		let woAmountTotal = 0;
		let $woAmounts = $('input[name=woAmount]',$rightDiv);
		for(let i=0;i<$woAmounts.length;i++){
			let amt = $($woAmounts[i]).val();
			amt = (!self._utils.checkEmptyNull(amt))? parseInt(self._utils.getOnlyNumber(amt)) : 0;
			woAmountTotal = woAmountTotal + parseInt(amt);
		}
		let woAmountVatTotal = 0;
		let $woAmountVats = $('input[name=woAmountVat]',$rightDiv);
		for(let i=0;i<$woAmountVats.length;i++){
			let amt = $($woAmountVats[i]).val();
			amt = (!self._utils.checkEmptyNull(amt))? parseInt(self._utils.getOnlyNumber(amt)) : 0;
			woAmountVatTotal = woAmountVatTotal + parseInt(amt);
		}

		return {
					total : (istDeliveryAmount + istDeliveryAmountVat + woAmountTotal + woAmountVatTotal), 
					woAmountVatTotal: woAmountVatTotal, 
					woAmountTotal:woAmountTotal,
					istDeliveryAmount:istDeliveryAmount,
					istDeliveryAmountVat : istDeliveryAmountVat
				} ;
	}
	workAmount = ($rightDiv) =>{
		let self = this;
		let $wAmounts = $rightDiv.find('input[name=wAmount]');
		let $wAmountVats = $rightDiv.find('input[name=wAmountVat]');
		let totalAmount = 0;
		let totalAmountVat = 0;
		
		for(let i=0;i<$wAmounts.length;i++){
			let amount = $($wAmounts[i]).val();
			amount = (!self._utils.checkEmptyNull(amount))? self._utils.getOnlyNumber(amount) : 0;
			totalAmount += parseInt(self._utils.getOnlyNumber(amount));
		}
		for(let i=0;i<$wAmountVats.length;i++){
			let amount = $($wAmountVats[i]).val();
			amount = (!self._utils.checkEmptyNull(amount))? self._utils.getOnlyNumber(amount) : 0;
			totalAmountVat += parseInt(self._utils.getOnlyNumber(amount));
		}
		return {
				total : (totalAmount + totalAmountVat),
				totalAmount : totalAmount,
				totalAmountVat : totalAmountVat
				};

	}
	totalSum = ($rightDiv) =>{
		let self = this;
		
		let info = $rightDiv.data();
		let oEndCnt = $('input[name=oEndCnt]', $rightDiv).val();
		oEndCnt = (!self._utils.checkEmptyNull(oEndCnt))? parseInt(self._utils.getOnlyNumber(oEndCnt)) : 0;
		let addAmount = self.addAmount($rightDiv);
		let workAmount = self.workAmount($rightDiv);
						
		// 할인금액
		let oAmountDc = $rightDiv.find("input[name=oAmountDc]").val();
		oAmountDc = self._utils.getOnlyNumber(oAmountDc);

		let totalAmount = workAmount.totalAmount + addAmount.istDeliveryAmount + addAmount.woAmountTotal;

		$('input[name=oAmountCalculable',$rightDiv).val(self._utils.numberWithCommas(totalAmount));
		$('input[name=oAmount',$rightDiv).val(self._utils.numberWithCommas((totalAmount)- oAmountDc));
		$('input[name=oAmountVat',$rightDiv).val(self._utils.numberWithCommas(parseInt(((totalAmount)- oAmountDc)*0.1)));
		
		let oUnitPrice = 0;
		//if(totalAmount > 0 && oEndCnt > 0){
			//oUnitPrice = (totalAmount/oEndCnt).toFixed(2)
		if(totalAmount > 0 && info.oCnt != undefined){
			oUnitPrice = (totalAmount/info.oCnt).toFixed(2)
			let split = oUnitPrice.split(".");
			if(split[1] == "00") oUnitPrice = split[0];
		}
		$('input[name=oUnitPrice',$rightDiv).val(self._utils.numberWithCommas(oUnitPrice));
	}
	
	layerWorkView = (cbfunc, d) =>{
		const self = this;
		var divHtml = `
			<div class="mw_defalut" style="width:580px;" id="">
				<div class="mw_title" id="handle">
					<h1 class="mw_title_mid">
						<span class="title">작업 세부사항 </span>
						<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
					</h1>
				</div>
				<div class="mw_ctWrap">
					<div class="mw_contents">
						<div style="overflow-y:auto;padding:2px;">
							<div class="searchWrap" style="padding-bottom:10px;">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable">
									<caption></caption>
									<colgroup>
										<col width="80px">
										<col width="auto">
										<col width="80px">
										<col width="auto">
									</colgroup>
									<tbody>
										<tr>
											<th class="ac">작업명</th>
											<td class="wNm">`+ d.wNm +'('+ d.wFrontYnNm +`)</td>
											<th class="ac">작업자</th>
											<td class="wESeq">`+ d.wENm +`</td>
										</tr>
										<tr>
											<td class="txt_c" colspan="4" style="background: #ecf5f9;height: 5px; border-left:1px solid #ecf5f9 !important;border-right:0px;"></th>
										</tr>
										<tr>
											<th class="txt_c" colspan="4">수주세부사항</th>
										</tr>
										<tr>
											<td class="workOptionListDiv orderOption" colspan="4"></td>
										</tr>		
										<tr>
											<td class="txt_c" colspan="4" style="background: #ecf5f9;height: 5px; border-left:1px solid #ecf5f9 !important;border-right:0px;"></th>
										</tr>
										<tr>
											<th class="txt_c" colspan="4">작업현장기록</th>
										</tr>
										<tr>
											<td class="workOptionListDiv workOption" colspan="4"></td>
										</tr>
										<tr>
											<td class="txt_c" colspan="4" style="background: #ecf5f9;height: 5px; border-left:1px solid #ecf5f9 !important;border-right:0px;"></th>
										</tr>
										<tr>
											<th class="txt_c" colspan="4">추가기록사항</th>
										</tr>
										<tr>
											<td colspan="4"><pre class="wReport">`+ (self._utils.checkEmptyNull(d.wReport)?'':d.wReport) +`</pre></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>`;
		cbfunc(divHtml);
	}
	
	layerWorkInput = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		let d = data.optionInfo;
		
		let $orderOptionArea = $( '.workOptionListDiv.orderOption', $layerObject);
		let $workOptionArea = $( '.workOptionListDiv.workOption', $layerObject);

		for(let i=0;i<d.length;i++){
			let $optionTag = $('<span class="workOptionListOne vm">');
			let $option = $('<strong style="font-size:12px;"/>');
			if(!self._utils.checkEmptyNull(d[i].woInput)) {
				$option.addClass('workOptionInfoView');
				if(d[i].woMarkYn == 'Y'){
					$option.append(d[i].cwoNm  + ' : <span style="font-size:12px;color:#f78ca4;font-weight: bold;">'+ d[i].woInput+'</span>');
				}else{
					$option.append(d[i].cwoNm  + ' : <span style="font-size:12px;">'+ d[i].woInput+'</span>');
				}
				if(d[i].woInput != null) $optionTag.append($($option));
				$optionTag.data("ROW", d[i]);
				$optionTag.appendTo((d[i].cwoOrderYn == 'Y')?$orderOptionArea: $workOptionArea);
	
			}
		}
	}
	transReportEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let $printArea = $('.printArea',$layerObject);
		let $mail = $('.mail',$layerObject);
		let $fax = $('.fax',$layerObject);
		window.jsPDF = window.jspdf.jsPDF;
	
		
		$fax.on('click',function(){
			let dt = self._utils.currentDate().replace(/-/g,'');
			if(info.cPopbillYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px;font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여 popbill 연동신청을 진행하세요</div>', '연동 신청이 안되어 있습니다.');
				return false;
			}else if(info.cFaxApplyYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px;font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여  FAX 발신번호를 등록하십시오</div>', '팩스번호 발신번호 승인이 안되어 있습니다.');
				return false;
			}
			let oSeqs = info.oSeqs;
			self._utils.showLoading();
			let $page = $('page',$layerObject);
			$('.printA4',$page).css('padding-top','0px');
			for(let i=0;i<$page.length;i++){
				//var doc = new jsPDF($page[i]);
				//var element = document.getElementById('pdf_canvas');
				var element = $page[i];

				html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
					// 캔버스를 이미지로 변환
					// 캔버스를 이미지로 변환
					let imgData = canvas.toDataURL('image/png')
					const marginLeft = 10; // 왼쪽 마진 값 (mm)
					const marginRight = 10; // 오른쪽 마진 값 (mm)
					const marginTop = 10; // 상단 마진 값 (mm)
					const marginBottom = 5.33; // 하단 마진 값 (mm)
					const imageMargin = 5; // 이미지 사이의 여백 (mm)
					let doc = new jsPDF('p', 'mm', 'a4');
					// PDF 페이지의 가로 세로 사이즈
					const pageWidth = doc.internal.pageSize.getWidth() - (marginLeft + marginRight);
					const pageHeight = doc.internal.pageSize.getHeight() -(marginTop + marginBottom + imageMargin);

					const widthRatio = pageWidth / canvas.width;
 
					// 비율에 따른 이미지 높이
					const customHeight = canvas.height * widthRatio;
				
					// 첫 페이지에만 marginTop + 15 적용, 나머지는 marginTop만 적용
					const topMargin = marginTop ;
				
					// 캔버스를 사용하여 이미지를 페이지 크기로 자르기
					let heightLeft = customHeight; // 남은 이미지 높이
					let position = 0; // 이미지 자를 위치
				
					while (heightLeft > 0) {
						const sliceHeight = Math.min(pageHeight, heightLeft);
				
						// 새로운 캔버스 생성
						const newCanvas = document.createElement('canvas');
						newCanvas.width = canvas.width;
						newCanvas.height = sliceHeight / widthRatio;
				
						// 잘라낸 이미지 부분을 새로운 캔버스에 그림
						const newCtx = newCanvas.getContext('2d');
						newCtx.drawImage(
							canvas,
							0,
							position / widthRatio,
							canvas.width,
							sliceHeight / widthRatio,
							0,
							0,
							canvas.width,
							sliceHeight / widthRatio,
						);
				
						// 새로운 캔버스의 이미지를 PDF에 추가
						const newImage = newCanvas.toDataURL('image/jpeg');
						doc.addImage(
							newImage,
							'JPEG',
							marginLeft,
							topMargin,
							pageWidth,
							sliceHeight,
						);
				
						// 남은 이미지 높이와 자를 위치 업데이트
						heightLeft -= sliceHeight;
						position += sliceHeight;
				
						// 페이지가 남아있는 경우 새 페이지 추가
						if (heightLeft > 0) {
						doc.addPage();
						}
					}
					/*
					let imgData = canvas.toDataURL('image/png')
					let imgWidth = 190 // 이미지 가로 길이(mm)
					let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
					let imgHeight = canvas.height * imgWidth / canvas.width
					let heightLeft = imgHeight
					let marginLeft = 10 // 출력 페이지 여백설정
					let doc = new jsPDF('p', 'mm')
					let marginTop = 10
					let info = $(element).data();
					info.oSeqs = oSeqs;
	
					info.files = [];
					window.scrollTo(0, 0)
	
					//첫 페이지 출력
					doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight, undefined,'FAST');
					heightLeft -= pageHeight
	
					//한 페이지 이상일 경우 루프 돌면서 출력
					while (heightLeft >= 20) {
						position = heightLeft - imgHeight
						position = position - 20
						doc.addPage()
						doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight,undefined,'FAST');
						heightLeft -= pageHeight
					}
					*/
					let file = {}
					info.eTitle = $('.workTitle',$layerObject).text();
					file.filename = $('.workTitle',$layerObject).text()+".pdf";
					file.content = doc.output('datauristring');
					file.encoding = 'base64';
					file.size = file.content.length;

					info.files = [file];

					let $popDiv = $('template#workFax');
					self._parent.openLayer($popDiv.html(),self.workFaxEvent,info);
					self._utils.hideLoading();
				  });
			}
		});

		$mail.on('click',function(){
			if(info.cMailYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px; font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여 메일 연동 정보를 등록하십시오</div>', '메일발송 설정이 필요합니다.');
				return false;
			}
			let oSeqs = info.oSeqs;
			self._utils.showLoading();
			let $page = $('page',$layerObject);
			$('.topMarginDiv',$page).css('height','25px');
			
			//$('.transHead',$page).css('height','90px');
			for(let i=0;i<$page.length;i++){
				//var doc = new jsPDF($page[i]);
				//var element = document.getElementById('pdf_canvas');
				var element = $page[i];


				let jsPdf = new jsPDF('p', 'mm', 'a4');
				/*
				jsPdf.addFileToVFS('Malgun.Ttf', ____FONT_MALGUN____);
				jsPdf.addFont('Malgun.Ttf','malgun','normal');
				jsPdf.setFont('malgun');

				//window.open(jsPdf.output('bloburl'));
				
				//jsPdf.setFontType('bold');

				// you need to load html2canvas (and dompurify if you pass a string to html)
				
				const opt = {
					callback: function (doc) {
						doc.addFileToVFS('Malgun.Ttf', ____FONT_MALGUN____);
						doc.addFont('Malgun.Ttf','malgun','normal');
						doc.setFont('malgun');
						window.open(doc.output('bloburl'));
						//jsPdf.save("Test.pdf");
						// to open the generated PDF in browser window
						// window.open(jsPdf.output('bloburl'));
					},
					margin: [10, 10, 10, 10],
					autoPaging: 'text',
					html2canvas: {
						allowTaint: true,
						dpi: 72,
						letterRendering: true,
						logging: false,
						scale: .24
					},
					jsPDF : jsPdf
				};

				jsPdf.html(element, opt);

				self._utils.hideLoading();
				*/
				

// https://postforty.tistory.com/474
				html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
					// 캔버스를 이미지로 변환
					let imgData = canvas.toDataURL('image/png')
					const marginLeft = 10; // 왼쪽 마진 값 (mm)
					const marginRight = 10; // 오른쪽 마진 값 (mm)
					const marginTop = 10; // 상단 마진 값 (mm)
					const marginBottom = 5.33; // 하단 마진 값 (mm)
					const imageMargin = 5; // 이미지 사이의 여백 (mm)
					let doc = new jsPDF('p', 'mm', 'a4');
					// PDF 페이지의 가로 세로 사이즈
					const pageWidth = doc.internal.pageSize.getWidth() - (marginLeft + marginRight);
					const pageHeight = doc.internal.pageSize.getHeight() -(marginTop + marginBottom + imageMargin);

					const widthRatio = pageWidth / canvas.width;
 
					// 비율에 따른 이미지 높이
					const customHeight = canvas.height * widthRatio;
				
					// 첫 페이지에만 marginTop + 15 적용, 나머지는 marginTop만 적용
					const topMargin = marginTop ;
				
					// 캔버스를 사용하여 이미지를 페이지 크기로 자르기
					let heightLeft = customHeight; // 남은 이미지 높이
					let position = 0; // 이미지 자를 위치
				
					while (heightLeft > 0) {
						const sliceHeight = Math.min(pageHeight, heightLeft);
				
						// 새로운 캔버스 생성
						const newCanvas = document.createElement('canvas');
						newCanvas.width = canvas.width;
						newCanvas.height = sliceHeight / widthRatio;
				
						// 잘라낸 이미지 부분을 새로운 캔버스에 그림
						const newCtx = newCanvas.getContext('2d');
						newCtx.drawImage(
							canvas,
							0,
							position / widthRatio,
							canvas.width,
							sliceHeight / widthRatio,
							0,
							0,
							canvas.width,
							sliceHeight / widthRatio,
						);
				
						// 새로운 캔버스의 이미지를 PDF에 추가
						const newImage = newCanvas.toDataURL('image/jpeg');
						doc.addImage(
							newImage,
							'JPEG',
							marginLeft,
							topMargin,
							pageWidth,
							sliceHeight,
						);
				
						// 남은 이미지 높이와 자를 위치 업데이트
						heightLeft -= sliceHeight;
						position += sliceHeight;
				
						// 페이지가 남아있는 경우 새 페이지 추가
						if (heightLeft > 0) {
						doc.addPage();
						}
					}
					// window.open(doc.output('bloburl'));
					let file = {}
					info.eTitle = $('.workTitle',$layerObject).text();
					file.filename = $('.workTitle',$layerObject).text()+".pdf";
					file.content = doc.output('datauristring');
					file.encoding = 'base64';
					file.size = file.content.length;

					info.files = [file];

					let $popDiv = $('template#workMail');
					self._parent.openLayer($popDiv.html(),self.workMailEvent,info);

	
/*

					let imgWidth = 190 // 이미지 가로 길이(mm)
					let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
					let imgHeight = (canvas.height * imgWidth / canvas.width) ;
					console.log('canvas.height : '+ canvas.height)
					console.log('canvas.width : '+ canvas.width)
					console.log('imgHeight : '+ imgHeight)
					const totalPageSize = Math.ceil(imgHeight / pageHeight);
					let heightLeft = imgHeight
					let marginLeft = 10 // 출력 페이지 여백설정
					let doc = new jsPDF('p', 'mm')
					let marginTop = 10
					let info = $(element).data();
					info.oSeqs = oSeqs;
					let position = marginTop;
					info.files = [];
					window.scrollTo(0, 0)
	
					//첫 페이지 출력
					doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight); //, undefined,'FAST');
					heightLeft -= pageHeight
					//한 페이지 이상일 경우 루프 돌면서 출력

					while (heightLeft >= 0) {
						marginTop =  heightLeft - imgHeight + 10
						//marginTop = marginTop + 80
						doc.addPage()
						doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
						heightLeft -= pageHeight
					}
					
					// PDF를 새탭으로 열기
					 window.open(doc.output('bloburl'));
					// PDF를 바로 다운로드
					//doc.save('sample.pdf');
					//console.log(doc.output('datauristring'));
*/					

/*
					let file = {}
					info.eTitle = $('.workTitle',$layerObject).text();
					file.filename = $('.workTitle',$layerObject).text()+".pdf";
					file.content = doc.output('datauristring');
					file.encoding = 'base64';
					file.size = file.content.length;

					info.files.push(file);

					let $popDiv = $('template#workMail');
					self._parent.openLayer($popDiv.html(),self.workMailEvent,info);
*/
					self._utils.hideLoading();
				  });

			}
		});
		$('.print',$layerObject).on('click', function(){
			let printA4 = $(".printA4",$layerObject);
			$('.topMarginDiv',$layerObject).css('height','35px');
							//$("<div class='print_footer'><span class='left'></span><span class='right'><strong>(주)한국문화사랑</strong> K-PrintFactory / 010-9089-0794 / postgood@kakao.com</span></div>").appendTo(printA4);
			/*							
			let printWrap = $('.bottomCompanyInfo',$layerObject);
			$('.cNm',printWrap).text(info.cNm);
			if(info.cTel != undefined && info.cTel != '') $('.cTel',printWrap).text(self._utils.formatPhoneNumber(info.cTel));
			$('.cAddress',printWrap).text(info.cAddr +' '+ info.cAddrDetail);
			$('.reportTitle',printWrap).append($('<pre>'+info.cReportTitle+'<pre>'));
			if(info.fileInfo.length>0){
				$('.reportLogo',printWrap).append($('<img src="https://kprintfactory.s3.ap-northeast-2.amazonaws.com'+info.fileInfo[0].path.replace('kprintfactory', '')+'" style="width:130px;"></img>'));
			}else{
				$('.reportLogo',printWrap).append($('<strong style="font-size:20px;font-weight:bold;font-family: \'Nanum Square\', sans-serif;">'+ info.cNm +'</strong>'));
			}
			*/
			$($printArea).print({
				addGlobalStyles: true, 
				stylesheet: null,
				rejectWindow: true,
				noPrintSelector: ".no-print",
				iframe: true,
				append: null,
				prepend: null,
				timeout: 1500,
			});
			
			setTimeout(function(){
				confirm('명세서 발송 처리 하시겠습니까',function(is){
					if(is){
						let mapData = {ctl : 'ledger',cmd : 'transSendUpdate',oSeqs : JSON.stringify(info.oSeqs),};
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code != 0){
								toast('발송 기록에 실패 하였습니다.');
							}
						});
					}
				},'발송처리');
			}, 2000);
			
		});

		// 회원사 정보 노출
		let trCnt = 21;
		// 계좌번호
		let $bankInfoTbody = $('.bankInfo tbody',$layerObject);
		for(let i=0;i<info.accountInfo.length;i++){
			let d = info.accountInfo[i];
			let $tr = $('<tr />');
			$tr.append($('<td class="al" style="height:20px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px;color:#000;"/>').text(d.caBankNm +' '+ d.caAccount +' / '+ d.caOwnerNm));
			$bankInfoTbody.append($tr);
		}
		let month = info.endDt.substring(5,7);
		$('.cNm',$layerObject).text(info.cNm);
		$('.address',$layerObject).text(info.cAddr +' '+ info.cAddrDetail);
		$('.cTel',$layerObject).text(self._utils.formatPhoneNumber(info.cTel));
		$('.cFax',$layerObject).text(self._utils.formatPhoneNumber(info.cFax));
		$('.cHomepage',$layerObject).text(info.cHomepage);

		$('.transMonth',$layerObject).text(month+'월');
		let $page = $('page',$layerObject).clone();
		$('page',$layerObject).remove();
		
		//info.oSeqs = (info.oSeqs.length ==0)? [94,105] : info.oSeqs;

		let mapData = {ctl : 'ledger',cmd : 'transReportOrderLoad',oSeqs : JSON.stringify(info.oSeqs),endDt : info.endDt};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let keys = Object.keys(rdata.data);
				let isEnd = false;
				for(let cu=0; cu<keys.length;cu++){
					let $transReport = $page.clone();
					let $tbody =  $('.workList', $transReport);
					let customer = rdata.data[keys[cu]];
					let amountTotal = 0;
					let amount = 0;
					let amountVat = 0;
					let amountDc = 0;
					let style='font-size:12px;background-color: #FFFFFF;height: 35px; padding: 0px 5px;line-height:1.1;border-left:1px solid #999;border-bottom:1px solid #999;border-top-width:0px;';

					$transReport.data(customer);
					for(let i=0;i<customer.orderInfo.length;i++){
						let order = customer.orderInfo[i];
						amountTotal = amountTotal + (self._utils.checkEmptyNull(order.oAmountCalculable)? 0 : parseInt(order.oAmountCalculable));
						amount = amount + (self._utils.checkEmptyNull(order.oAmount)? 0 : parseInt(order.oAmount));
						amountVat = amountVat + (self._utils.checkEmptyNull(order.oAmountVat)? 0 : parseInt(order.oAmountVat));
						amountDc = amountDc + (self._utils.checkEmptyNull(order.oAmountDc)? 0 : parseInt(order.oAmountDc));
						
						for(let w=0;w<order.workInfo.length;w++){
							let work = order.workInfo[w];
							//amount = amount + (self._utils.checkEmptyNull(work.wAmount)? 0 : parseInt(work.wAmount));
							//amountVat = amountVat + (self._utils.checkEmptyNull(work.wAmountVat)? 0 : parseInt(work.wAmountVat));
							let oFileNmStyle = style;
							if(order.oFileNm.length > 38 && order.oFileNm.length <= 46){
								oFileNmStyle = oFileNmStyle.replace('font-size:12px','font-size:10px');
							}else if(order.oFileNm.length > 46){
								oFileNmStyle = oFileNmStyle.replace('font-size:12px','font-size:9px');
							}
							let workInofStyle = '';
							if (!self._utils.checkEmptyNull(work.wInfo) && work.wInfo.length > 7) workInofStyle = 'font-size:10px;';
							
							let $tr = $('<tr>');
							$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;" />').text(self._utils.dateformatMin(order.oApprovalDate).substring(5,10)));
							$tr.append($('<td class="al" style="'+oFileNmStyle+'border-right-width:0px;color:#000;" />').text(order.oFileNm));
							$tr.append($('<td class="ac" style="'+style+'padding:0px 2px !important; border-right-width:0px;color:#000;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;"/>').append(work.wNm+ (self._utils.checkEmptyNull(work.wInfo) ? '' : '<br>(<spna style="'+ workInofStyle +'">'+ work.wInfo+'</span>)')));
							$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;"/>').text(work.wFrontYnNm));
							$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;"/>').text(order.oPaperSize));
							$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;"/>').text(self._utils.numberWithCommas(order.oCnt)));
							$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;"/>').text(self._utils.numberWithCommas(work.wEndCnt)));
							$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;"/>').text(self._utils.numberWithCommas(work.wUnitPriceWork)));
							$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;"/>').text(self._utils.numberWithCommas(work.wAmount)));
							$tr.append($('<td class="ar" style="'+style+'border-right:1px solid #999;color:#000;"/>').text(self._utils.numberWithCommas(work.wAmountVat)));
							$tbody.append($tr.data(order));
							for(let o=0;o<work.optionInfo.length;o++){
								let option = work.optionInfo[o];
								if(!self._utils.checkEmptyNull(option.woAmount) && option.woAmount != 0){
									
									let woAmount = (self._utils.checkEmptyNull(option.woAmount)? 0 : parseInt(option.woAmount));
									let woAmountVat = (self._utils.checkEmptyNull(option.woAmountVat)? 0 : parseInt(option.woAmountVat));
									/*
									amount = amount + woAmount;
									amountVat = amountVat + woAmountVat;
									*/
									let $tr = $('<tr>');
									$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;" />').text(self._utils.dateformatMin(order.creDate).substring(5,10)));
									$tr.append($('<td class="al" style="'+oFileNmStyle+'border-right-width:0px;color:#000;" />').text(order.oFileNm));
									$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;" />').text(option.cwoNm));
									$tr.append($('<td style="'+style+'border-right-width:0px;color:#000;" />'));
									$tr.append($('<td style="'+style+'border-right-width:0px;color:#000;" />'));
									$tr.append($('<td style="'+style+'border-right-width:0px;color:#000;" />').text(''));
									$tr.append($('<td style="'+style+'border-right-width:0px;color:#000;" />'));
									$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;" />'));
									$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;" />').text(self._utils.numberWithCommas(woAmount)));
									$tr.append($('<td class="ar" style="'+style+'border-right:1px solid #999;color:#000;" />').text(self._utils.numberWithCommas(woAmountVat)));
									$tbody.append($tr.data(order));
								}
							}

						}
						if(!self._utils.checkEmptyNull(order.istDeliveryAmount) && order.istDeliveryAmount != 0){
							let istDeliveryAmount = ((order.istDeliveryAmount == undefined)? 0 : parseInt(order.istDeliveryAmount));
							let istDeliveryAmountVat = (istDeliveryAmount == 0) ? 0: parseInt(istDeliveryAmount / 10)
							/*
							amount = amount + istDeliveryAmount;
							amountVat = amountVat + istDeliveryAmountVat;
							*/
							let $tr = $('<tr>');
							$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;" />').text(self._utils.dateformatMin(order.creDate).substring(5,10)));
							$tr.append($('<td class="al" style="'+oFileNmStyle+'border-right-width:0px;color:#000;" />').text(order.oFileNm));
							$tr.append($('<td class="ac" style="'+style+'border-right-width:0px;color:#000;" />').text('배송비'));
							$tr.append($('<td  style="'+style+'border-right-width:0px;color:#000;" />'));
							$tr.append($('<td  style="'+style+'border-right-width:0px;color:#000;" />'));
							$tr.append($('<td  style="'+style+'border-right-width:0px;color:#000;" />').text(''));
							$tr.append($('<td  style="'+style+'border-right-width:0px;color:#000;" />'));
							$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;" />'));
							$tr.append($('<td class="ar" style="'+style+'border-right-width:0px;color:#000;" />').text(self._utils.numberWithCommas(istDeliveryAmount)));
							$tr.append($('<td class="ar" style="'+style+'border-right:1px solid #999;color:#000;" />').text(self._utils.numberWithCommas(istDeliveryAmountVat)));
							$tbody.append($tr.data(order));
							

						}
					}
					if($tbody.children().length<trCnt){
						for(let s=0;$tbody.children().length < trCnt;s++){
							let $tr = $('<tr>');
							for(let t=0;t<10;t++) $tr.append($('<td  style="'+style+ ((t == 9 )? 'border-right:1px solid #999;':'border-right-width:0px;color:#000;') +'" />'));
							$tbody.append($tr);
						}
					}else{
						isEnd = true;
					}
					$('.amountTotal',$transReport).text(self._utils.numberWithCommas(amountTotal));
					$('.amount',$transReport).text(self._utils.numberWithCommas(amount));
					$('.amountVat',$transReport).text(self._utils.numberWithCommas(amountVat));
					$('.amountDc',$transReport).text(self._utils.numberWithCommas(amountDc));
					//$('.amountSale',$transReport).text(self._utils.numberWithCommas(customer.amountSale));
					$('.amountSale',$transReport).text(self._utils.numberWithCommas(amount + amountVat));
					$('.amountSalePay',$transReport).text(self._utils.numberWithCommas(customer.amountSalePay));
					$('.amountBalance',$transReport).text(self._utils.numberWithCommas(customer.cuAmountSaleBalance));


					$('.cuNm',$transReport).text(customer.cuNm);
					$('.cuInvoiceEmail',$transReport).text(customer.cuInvoiceEmail);
					if(!self._utils.checkEmptyNull(customer.cuFax))	$('.cuFax',$transReport).text(self._utils.formatPhoneNumber(customer.cuFax));
					$('.searchDate',$transReport).text(info.startDt +' ~ '+ info.endDt);

					let $tfoot =  $('tfoot', $transReport).clone();
					$('tfoot', $transReport).remove();
					$tbody.append($tfoot.children('tr'));
					tbodyMerge($tbody, [0,1]);
					$printArea.append($transReport);
					if(isEnd) break;
				}
			}		
		});
		function tbodyMerge($tbody, indexs){
			let info = {};
			let $trs = $tbody.children();
			let $beferTr = null; 
			let passTrIndexs = [26];
			for(let i=1;i<=20;i++)	passTrIndexs.push(passTrIndexs[0] + (33 *i));

			for(let r=($trs.length-1);r>=0;r--){
				let $nowTr = $($trs[r]);
				let data = $nowTr.data();
				if(data.oSeq == undefined) continue;
				let d = data.oSeq;
				if($beferTr==null){
					for(let t=0;t<indexs.length;t++){	
						info[indexs[t]] = 1;
						let style = $($nowTr.children()).eq(indexs[t]).attr('style');
						//$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#fff;border-left:1px solid #000 !important;border-right:1px solid #000 !important;');
					}
				}else{
					let beferD = $beferTr.data().oSeq;
						for(let t=(indexs.length-1);t>=0;t--){	
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							//$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#fff;border-left:1px solid #000 !important;border-right:1px solid #000 !important;');
							if(d == beferD &&  $($beferTr.children()).eq(indexs[t]).text() == $($nowTr.children()).eq(indexs[t]).text()){
								if(passTrIndexs.indexOf(r) == -1){
									$($nowTr.children()).eq(indexs[t]).attr("rowspan",info[indexs[t]]+1);
									$($beferTr.children()).eq(indexs[t]).remove();
									info[indexs[t]]++;
								}else{
									info[indexs[t]] = 1;
									if(passTrIndexs.indexOf(r) == 0){
										$($nowTr.children()).css('height','41px');
									}else{
										$($nowTr.children()).css('height','36px');
									}
								}									
							}else{
								info[indexs[t]] = 1;
								if(passTrIndexs.indexOf(r) > -1){
									if(passTrIndexs.indexOf(r) == 0){
										$($nowTr.children()).css('height','41px');
									}else{
										$($nowTr.children()).css('height','36px');
									}

								}
							}
						}
					
				}
				$beferTr = $($trs[r]);
			}
		}
		
	}
	workMailEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let maxSize = 1024 * 1024 * 10;
		let $selectBox = $('select[name=files]', $layerObject);
		$('input[name=subject]',$layerObject).val('['+ self._const.__C_NM +'] ' + info.eTitle+'를 보내드립니다.');
		$('input[name=to]',$layerObject).val(info.cuInvoiceEmail);

		fileDisplay();
		
		$('input[name=eFile]',$layerObject).on('change',function(){
			let f  = {};
			f.filename = this.files[0].name;
			f.size = this.files[0].size;
			f.encoding = 'base64';
			fileToBase64(this.files[0]).then(
				data => f.content = data
			);
			if(f.size > maxSize){
				alert("최대 10M이상 첨부 할 수 없습니다.");
				return false;
			}
			info.files.push(f);
			fileDisplay();
			$(this).val('');
		});

		$('.fa-upload',$layerObject).on('click',function(){
			$('input[name=eFile]',$layerObject).trigger('click');
		});

		$('.fa-trash-can',$layerObject).on('click',function(){
			let idx = $('option:checked',$selectBox).index();
			info.files.splice(idx,1);
			/*
			let filename = $('option:checked',$selectBox).text();
			for(let i=0; i<info.files.length;i++){
				if(info.files[i].filename == filename){
					info.files.splice(i,1);
					break;
				}
			}
			*/
			fileDisplay();
		});

		function fileDisplay(){
			$selectBox.empty();
			for(let i=0;i<info.files.length;i++){
				let f = info.files[i];
				let $opt = $('<option value="'+ f.filename +'">'+ f.filename + '('+ self._utils.bytesToSize(f.size) +')</option>');
				$selectBox.append($opt);
			}
		}
		function fileToBase64(file) {
			//var reader = new FileReader();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
			  });
		}


		$('.mailSend',$layerObject).on('click',function(){
			if( self._utils.checkRequired($layerObject)) {
				let data = self._utils.serializeObject($layerObject);
				let totalSize = 0;
				for(let i=0;i<info.files.length;i++) totalSize += info.files[i].size;
				if(totalSize > maxSize){
					alert("최대 10M이상 첨부 할 수 없습니다.");
					return false;
				}

				data.files = JSON.stringify(info.files);
				self._parent.emailSend(data, function(rdata){
					if(rdata.code == 0){
						$("body .btnClosePopLayer").trigger('click');
						alert('발송 되었습니다.');
						let mapData = {ctl : 'ledger',cmd : 'transSendUpdate',oSeqs : JSON.stringify(info.oSeqs),};
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code != 0){
								toast('발송 기록에 실패 하였습니다.');
							}
						});
					}else{
						alert(rdata.message);
					}
				})
			}
		});

	} 



	workFaxEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		$('input[name=cuNm]',$layerObject).val(info.cuNm);
		$('input[name=cuFax]',$layerObject).val(info.cuFax);

		
		$('.faxSend',$layerObject).on('click',function(){
			if( self._utils.checkRequired($layerObject)) {
				let data = self._utils.serializeObject($layerObject);
				data.files = JSON.stringify(info.files);
				self._parent.faxSend(data, function(rdata){
					if(rdata.code == 0){
						$("body .btnClosePopLayer").trigger('click');
						alert('발송 되었습니다.');
						let mapData = {ctl : 'ledger',cmd : 'transSendUpdate',oSeqs : JSON.stringify(info.oSeqs),};
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code != 0){
								toast('발송 기록에 실패 하였습니다.');
							}
						});
					}else{
						alert(rdata.message);
					}
				})
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
			cmd : 'orderList'
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
export default ledgerWorkController
