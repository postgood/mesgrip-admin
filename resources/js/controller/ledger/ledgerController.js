
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
	}

	init = (_code,_data) => {
		let self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		// 기업 정보 가져오기
		let mapData = {ctl : 'company',cmd : 'load',searchWord : this.term,};
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
		// 관리자인 경우 생성
		if(self._const.__MANAGER_YN != 'Y'){
			$('.btnPayCall',$searchWrap).hide();
			$('.btnInvoiceCall',$searchWrap).hide();
			$('.btnCreate',$searchWrap).hide();
			$('.btnTransDelete',$searchWrap).hide();
		}
		self._code.find(".btnCreate").on("click",function(e){
			let $div = $('template#ledgerInsert');
			self._parent.openLayer($div.html(), self.layerEvent);
			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.layerEvent);
			});
			*/
			e.stopPropagation();
		});
		self._code.find(".btnPayCreate").on("click",function(e){
			let $div = $('template#legderPayInsert');
			self._parent.openLayer($div.html(), self.layerPayEvent);
			/*			
			self.layerPayView(function(data){
				self._parent.openLayer(data, self.layerPayEvent);
			});
			*/
			e.stopPropagation();
		});
		self._code.find(".btnInvoiceCall").on("click",function(e){
			let $tbody = self._code.find(".dataListTable tbody");
			let $chkBoxs = $tbody.find("input[name=lSeq]:checked");
			let cuSeqs = {};
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
					if(data.lAmountInvoice == 0){
						alert("발행된 계산서를 제외하고 선택 하십시요.");
						return false;
					}
					if(cuSeqs[data.cuSeq] == undefined) cuSeqs[data.cuSeq] = [];
					cuSeqs[data.cuSeq].push(data.lSeq);
					lSeqs.push(data.lSeq);
				}
			}

			let keys = Object.keys(cuSeqs);
			let isJoinCheck = false;
			for(let i=0;i<keys.length;i++){
				if(cuSeqs[keys[i]].length > 1){
					isJoinCheck = true;
					break;
				}
			}
			if(isJoinCheck){
				confirm('아이템을 하나로 발행 하시겠습니까?', function(is){
					self._isJoin = is;
					let mapData = {ctl : 'ledger',cmd : 'ledgerChoiceList',lSeqs : JSON.stringify(lSeqs),};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code == 0){
								let data = self._utils.objectIfnull(rdata.data);
								let $popDiv = $('template#homtex');
								self._parent.openLayer($popDiv.html(), self.invoiceDocEvent, data);
							}
						});
				}, '병합 발행',' 목록 발행');
			}else{
				self._isJoin = false;
				let mapData = {ctl : 'ledger',cmd : 'ledgerChoiceList',lSeqs : JSON.stringify(lSeqs),};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code == 0){
							let data = self._utils.objectIfnull(rdata.data);
							let $popDiv = $('template#homtex');
							self._parent.openLayer($popDiv.html(), self.invoiceDocEvent, data);
						}
					});
			}


			
		});
		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=lSeq]:checked");
			if(chkBoxs.length==0){
				alert("삭제할 대상을 선택 하십시오");
				return;
			}else if(chkBoxs.length>1){
				alert("삭제는 1건씩 가능 합니다.");
				self._code.find("input[name=chckAll]").prop("checked", false);
				for(let i in chkBoxs) {
					if (chkBoxs[i].checked) {
						chkBoxs[i].checked = false;
					}
				}
				return;
			}
			let $tr = chkBoxs.closest('tr');
			let data = $tr.data("ROW");
			if(data.lHoldYn == 'Y'){
				alert("마감된 원장은 삭제 할수 없습니다.");
				return false;
			}
			if(data.lAmountInvoice != data.lAmountTotal){
				alert("세금계산서가 발행된 원장은 삭제 할수 없습니다.");
				return false;
			}
			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let lSeq = chkBoxs.val();

					self.delete({lSeq : lSeq}, function(resp) {
						if(resp.code==0) {
							self.retrieve();
							alert('삭제되었습니다');
						} else {
							self._code.find("input[name=chckAll]").prop("checked", false);
							for(let i in chkBoxs) {
								if (chkBoxs[i].checked) {
									chkBoxs[i].checked = false;
								}
							}
							alert(resp.message);
						}
					});
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
		$('select[name=lKind]',$searchWrap).on('change',function(){
			let $obj = $(this);
			let lKind = $obj.val();
			
			if(lKind == 'S'){ $obj.css({'color':'red','background':''})
			}else if(lKind == 'B'){{ $obj.css({'color':'blue','background':''});}
			}else{$obj.css({'color':'','background':''})}
			
		});
		$('select[name=lKind]',$searchWrap).trigger('change');
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

		$tbody.on('click','.oFileNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.orderView(d);			
		});
		$tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});

		$tbody.on('click','.btnOpenInfo',function(){
			let $tr = $(this).closest('tr');
			let row = $tr.data("ROW");
			let $div = $('template#ledgerInsert');
			self._parent.openLayer($div.html(), self.layerEvent, row);
			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.layerEvent,row);
			});
			*/
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
						$(".ctlListSaleVat",self._code).text(self._utils.numberWithCommas(resp[i].saleAmountVat));
						$(".ctlListSaleInvoice",self._code).text(self._utils.numberWithCommas(resp[i].saleAmountInvoice));
						$(".ctlListSalePrice3",self._code).text(self._utils.numberWithCommas(resp[i].saleAmountTotal));
						$(".ctlListBuyPrice1",self._code).text(self._utils.numberWithCommas(resp[i].buyAmountTotal));
						$(".ctlListBuyPrice",self._code).text(self._utils.numberWithCommas(resp[i].buyAmount));
						$(".ctlListBuyVat",self._code).text(self._utils.numberWithCommas(resp[i].buyAmountVat));
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
		$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="lSeq" value="'+d.lSeq+'"/>')));
		//$tr.append($('<td class="ac"><a href="#" class="'+ ((d.lKind == 'S')?'btnStyleMin02':'btnStyleMin05')+'">'+d.lKindNm+'</a></td>'));
		$tr.append($('<td class="ac"><span style="color:'+ ((d.lKind == 'S')?'red':'blue')+'">'+d.lKindNm+'</span></td>'));
		$tr.append($('<td class="ac">'+ ((d.lKind == 'S')? '<i class="fa-solid fa-landmark" style="color:'+ ((d.lAmountInvoice == 0)? '#eeeeee' : '#fd6456') +'" title="세금계산서'+ ((d.lAmountInvoice == 0)? '가 발행되었습니다.' : ' 미발행금액 : '+ self._utils.numberWithCommas(d.lAmountInvoice))+' "></i>':'')+'</td>'));
		$tr.append($('<td class="ac">'+self._utils.dateformatStringToDate(d.lDt) +'</td>'));
		$tr.append($('<td class="al pl5 pr5" style="white-space: nowrap;text-overflow: ellipsis; overflow: hidden;"></td>').append('<span class="cuNm cursorPointer" title="'+d.cuNm +'">'+ d.cuNm +'</span>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lAmount, '')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lAmountVat, '')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/><strong>'+self._utils.numberWithCommas(d.lAmountTotal, '')+'</strong></td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lAmountTotal - d.lAmountInvoice, '')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lAmountBalance, '')+'</td>'));
		$tr.append($('<td class="al pl5 pr5">'+((d.lMemo!=undefined)? d.lMemo : '')+'</td>'));
		$tr.append($('<td class=""><i class="fa-regular fa-pen-to-square btnOpenInfo cursorPointer" title="원장 수정" style="font-size:14px;"></i></td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	}
	/*
	layerView = (cbfunc) =>{
		const self = this;
		var divHtml = `
		<div class="mw_defalut" style="width:560px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">매입/매출 등록</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="height:270px;overflow-y:auto;padding:2px;">
						<div class="bottonWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th><div class="ar"><a href="#" class="btnSearch save">등록</a></div></th>
									</tr>
								</tbody>
							</table>
						</div>
					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="10%">
								<col width="40%">
								<col width="10%">
								<col width="40%">

							</colgroup>
							<tbody>
								<tr>
									<th class="ar">구분</th>
									<th class="al"><select name="lKind"><option value="S" selected>매출</option><option value="B">매입</option></select></th>
									<th class="ar">일자</th>
									<th class="al"><input class="date crdrIp" type="text" name="lDt" placeholder="날짜 선택" readonly></th>
								</tr>
								<tr>
									<th class="ar">거래처</th>
									<th class="al" colspan="3"><input type="hidden" name="cuSeq"><input class="w90p srchIp" type="text" name="cuNm" placeholder="거래처"></th>
								</tr>
								<tr>
									<th class="ar">공급가액</th>
									<th class="al"><input class="ar w90p" type="text" name="lAmount" placeholder="공급가액" value="0"> 원</th>
									<th class="ac">부가세</th>
									<th class="al"><input class="ar w90p" type="text" name="lAmountVat" placeholder="부가세"  value="0"> 원</th>
								</tr>								
								<tr>
								<tr>
									<th class="ar">총 금액</th>
									<th class="ar lAmountTotal"></th>
									<th class="ac" colspan="2"></th>
								</tr>
								<tr>
									<th class="ar">비고</th>
									<th class="al" colspan="3"><textarea name="lMemo" class="w100p" rows="2"></textarea></th>
								</tr>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>`
		cbfunc(divHtml);
	}
	*/
	layerEvent = (popupID,info) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);

		if(info != undefined && info.lHoldYn == 'Y'){
			let $btn = $('.save',$layerObject);
			let $div = $btn.closest('div');
			let $objs = $('input, select, textarea',$layerObject);
			
			$btn.remove();
			$div.append('마감된 원장은 수정 할수 없습니다.')
			$objs.attr('disabled','disabled').addClass('readonly');
		}
		$('input[name=cuNm]',$layerObject).autocomplete({
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
			select: function (event, ui) {
				$('input[name=cuSeq]',$layerObject).val(ui.item.cuSeq);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });

		$layerObject.find('select[name=lKind]').on('change',function(){
			let $obj = $(this);
			let lKind = $obj.val();
			//$('.mw_title',$layerObject).css('background',(lKind=='S')?'#265bd1':'#e36991');
			
			if(lKind == 'S'){ $obj.css({'color':'red','background':''})
			}else if(lKind == 'B'){{ $obj.css({'color':'blue','background':''});}
			}else{$obj.css({'color':'','background':''})}
			
		});
		$layerObject.find('select[name=lKind]').trigger('change');
		$layerObject.find('input[name=cuNm]').on('change',function(){
			let v = $(this).val();
			if(v == ''){$('input[name=cuSeq]',$layerObject).val('');}
		});
		
		$layerObject.on('focus','input[name=lAmount]',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v=='0'?'':v);
		});
		$layerObject.on('focusout','input[name=lAmount]',function(){
			let o = $(this).data("ROW");
			let v = $(this).val();
			o = self._utils.getOnlyNumber(o);
			v = self._utils.getOnlyNumber(v);
			if(o!=v){
				$('input[name=lAmountVat]',$layerObject).val(self._utils.numberWithCommas(parseInt(v/10)));
				totalSum();
			}
			$(this).val(self._utils.numberWithCommas(v==''?'0':v));
		});

		$layerObject.on('focus','input[name=lAmountVat]',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v=='0'?'':v);
		});
		$layerObject.on('focusout','input[name=lAmountVat]',function(){
			let o = $(this).data("ROW");
			let v = $(this).val();
			o = self._utils.getOnlyNumber(o);
			v = self._utils.getOnlyNumber(v);
			if(o!=v){
				totalSum();
			}
			$(this).val(self._utils.numberWithCommas(v==''?'0':v));
		});
		
		if(info ==undefined){
			$('input[name=lDt]',$layerObject).val(self._utils.currentDate());
		}else {
			self._utils.unSerializeObject($layerObject,info)
			$('input[name=lAmount]',$layerObject).trigger('focus').trigger('focusout');
			$('input[name=lAmountVat]',$layerObject).trigger('focus').trigger('focusout');
			$('select[name=lKind]',$layerObject).trigger('change');
			$('.title',$layerObject).text('매입/매출 수정');
			$('.save',$layerObject).text('수정');
			$layerObject.data(info);
		}

		// 엔터 이동 포커스 정리
		let obj = {
			cuNm :'lAmount',
			lAmount :'lAmountVat',
			lAmountVat :'lMemo',
		}
		$( 'input:not([name=lMemo])', $layerObject).on('keypress',function(e) {
			if(e.keyCode == 13){
				$(this).trigger('focusout');
				let name = $(this).attr('name')
				$( '[name='+ obj[name]+']', $layerObject).focus();
			}
		});
		$layerObject.on('click','.save',function(){
			let info = $layerObject.data();
			if(info.lSeq != undefined){
				if(info.lAmountInvoice != info.lAmountTotal){
					alert('세금계산서가 발행된 수주건으로 수정이 불가능 합니다.');
					return false;
				}
			}
			let saveInfo = {};
			saveInfo.lKind = $layerObject.find("select[name=lKind]").val();
			saveInfo.lMemo = $layerObject.find('textarea[name=lMemo]').val();

			let lDt = $layerObject.find("input[name=lDt]").val();
			let cuSeq = $layerObject.find("input[name=cuSeq]").val();
			let lAmount = $layerObject.find("input[name=lAmount]").val();
			let lAmountVat = $layerObject.find("input[name=lAmountVat]").val();
			
		
			if(self._utils.checkEmptyNull(cuSeq)){
				alert('거래처를 검색하여 목록을 선택하여 입력하십시오');
				return false;
			}
			if(self._utils.checkEmptyNull(lAmount)){
				alert('공급가를 입력하십시오');
				return false;
			}

			saveInfo.lDt = lDt.replace(/-/g,'');
			saveInfo.cuSeq = self._utils.getOnlyNumber(cuSeq);
			saveInfo.lAmount = self._utils.getOnlyNumber(lAmount);
			saveInfo.lAmountVat = self._utils.getOnlyNumber(lAmountVat);
			
			if(info.lSeq !=undefined){
				saveInfo.lSeq = info.lSeq;
				self.update(saveInfo, function(data){
					if(data.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						alert('수정 되었습니다.');
						self.retrieve();
					}else{
						alert(data.message);
					}
				});
			}else{
				self.insert(saveInfo, function(data){
					if(data.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						alert('등록 되었습니다.');
						self.retrieve();
					}else{
						alert(data.message);
					}
				});
			}
		});
		function totalSum(){
			let amount = $('input[name=lAmount]', $layerObject).val();
			let amountVat = $('input[name=lAmountVat]', $layerObject).val();
			amount = ((self._utils.checkEmptyNull(amount))? 0: self._utils.getOnlyNumber(amount));
			amountVat = ((self._utils.checkEmptyNull(amountVat))? 0: self._utils.getOnlyNumber(amountVat));
			let amountTotal = parseInt(amount) + parseInt(amountVat);
			$('.lAmountTotal', $layerObject).text(self._utils.numberWithCommas(amountTotal));
		}		
	}
	/*
	layerPayView = (cbfunc) =>{
		const self = this;
		var divHtml = `
		<div class="mw_defalut" style="width:450px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">결제 등록</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="height:275px;overflow-y:auto;padding:2px;">
						<div class="bottonWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th><div class="ar"><a href="#" class="btnSearch save">등록</a></div></th>
									</tr>
								</tbody>
							</table>
						</div>
					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="15%">
								<col width="45%">
								<col width="15%">
								<col width="25%">

							</colgroup>
							<tbody>
								<tr>
									<th class="ar">구분</th>
									<th class="al"><select name="lpKind"><option value="I" selected>수금</option><option value="O">지급</option></select></th>
									<th class="ar">일자</th>
									<th class="al"><input class="date crdrIp" type="text" name="lpDt" placeholder="날짜 선택" readonly></th>
								</tr>
								<tr>
									<th class="ar">거래처</th>
									<th class="al" colspan="3"><input type="hidden" name="cuSeq"><input class="w100p srchIp" type="text" name="cuNm" placeholder="거래처"></th>
								</tr>
								<tr>
									<th class="ar">결제계좌</th>
									<th class="al" colspan="3"><select name="caSeq" class="w100p"><option value="">계좌선택</option></select></th>
								</tr>
								<tr>
									<!-- th class="ar">미결제금</th>
									<th class="ar"><input class="ar w95p inputBoder0 " type="text" name="unAmount" readonly value="0" style="background-color:transparent;"> 원</th -->
									<th class="ar">금액</th>
									<th class="al" colspan="3"><input class="ar w95p" type="text" name="lpAmount" placeholder="결제금"  value="0"> 원</th>
								</tr>								
								<tr>
								<tr>
									<th class="ar">비고</th>
									<th class="al" colspan="3"><textarea name="lpMemo" class="w100p" rows="2"></textarea></th>
								</tr>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>`
		cbfunc(divHtml);
	}
	*/
	layerPayEvent = (popupID,info) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);

		let mapData = {ctl : 'company',cmd : 'accountList',searchWord : this.term,};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $select = $('select[name=caSeq]',$layerObject);
				for(let i=0;i< rdata.data.length;i++){
					let d = rdata.data[i];
					let $option = $('<option />');
					$option.val(d.caSeq);
					$option.text(d.caBankNm +'-'+ d.caOwnerNm +'('+ d.caAccount +')');
					$select.append($option);
				}
			} else {
				alert(rdata.message);
			}
		});

		$('input[name=cuNm]',$layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm, cuSeq:v.cuSeq, v:v};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$('input[name=cuSeq]',$layerObject).val(ui.item.cuSeq);
				let v = self._utils.numberWithCommas(ui.item.v.cuStartAmount + ui.item.v.cuUnpaidAmount);
				$('input[name=unAmount]',$layerObject).val(v);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });

		$layerObject.find('select[name=lpKind]').on('change',function(){
			let $obj = $(this);
			let lKind = $obj.val();
			//$('.mw_title',$layerObject).css('background',(lKind=='I')?'#265bd1':'#e36991');
			if(lKind == 'I'){ $obj.css({'color':'red','background':'#fbe2e2'});
			}else if(lKind == 'O'){{ $obj.css({'color':'blue','background':'#bfd3ee'});}
			}else{$obj.css({'color':'','background':''})}
		});
		$layerObject.find('select[name=lpKind]').trigger('change');
		$layerObject.find('input[name=cuNm]').on('change,focusout',function(){
			let v = $(this).val();
			if(v == ''){
				$('input[name=cuSeq]',$layerObject).val('');
				$('input[name=unAmount]',$layerObject).val(0);
			} 
		});
		$layerObject.on('focus','input[name=lpAmount]',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v=='0'?'':v);
		});
		$layerObject.on('focusout','input[name=lpAmount]',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).val(self._utils.numberWithCommas(v==''?'0':v));
		});

		if(info ==undefined){
			$('input[name=lpDt]',$layerObject).val(self._utils.currentDate());
		}else {
			self._utils.unSerializeObject($layerObject,info)
			$('input[name=lpAmount]',$layerObject).trigger('focus').trigger('focusout');
			$('select[name=lpKind]',$layerObject).trigger('change');
			$('.title',$layerObject).text('결제 수정');
			$('.save',$layerObject).text('수정');
		}

		// 엔터 이동 포커스 정리
		let obj = {
			cuNm :'lpAmount',
			lpAmount :'lpMemo',
		}
		$( 'input:not([name=lpMemo])', $layerObject).on('keypress',function(e) {
			if(e.keyCode == 13){
				$(this).trigger('focusout');
				let name = $(this).attr('name')
				$( '[name='+ obj[name]+']', $layerObject).focus();
			}
		});
		$layerObject.on('click','.save',function(){
			let info = $layerObject.data();
			let saveInfo = {};
			saveInfo.lpKind = $layerObject.find("select[name=lpKind]").val();
			saveInfo.lpMemo = $layerObject.find('textarea[name=lpMemo]').val();
			saveInfo.caSeq = $layerObject.find("select[name=caSeq]").val();
			let lpDt = $layerObject.find("input[name=lpDt]").val();
			let cuSeq = $layerObject.find("input[name=cuSeq]").val();
			let lpAmount = $layerObject.find("input[name=lpAmount]").val();
		
			if(self._utils.checkEmptyNull(cuSeq)){
				alert('거래처를 검색하여 목록을 선택하여 입력하십시오');
				return false;
			}
			if(self._utils.checkEmptyNull(lpAmount)){
				alert('결제금액을 입력하십시오');
				return false;
			}

			saveInfo.lpDt = lpDt.replace(/-/g,'');
			saveInfo.cuSeq = cuSeq;
			saveInfo.lpAmount = self._utils.getOnlyNumber(lpAmount);
			
			if(info.lpSeq !=undefined){
				saveInfo.lpSeq = info.lpSeq;
				self.payUpdate(saveInfo, function(data){
					if(data.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						alert('수정 되었습니다.');
						self.retrieve();
					}else{
						alert(data.message);
					}
				});
			}else{
				self.payInsert(saveInfo, function(data){
					if(data.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						alert('등록 되었습니다.');
						self.retrieve();
					}else{
						alert(data.message);
					}
				});
			}
		});
	}
	
	invoiceDocEvent = (popupID, data) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);
		let $invoiceDocument = $('.invoiceDocument',$layerObject);
		self._companyInfo.cAddress = self._companyInfo.cAddr +' '+ self._companyInfo.cAddrDetail
		self._utils.unSerializeObject($layerObject, self._companyInfo);
		let $invoiceOrg = $('.invoice',$invoiceDocument).clone();
		let invoice = {};

		$layerObject.on('click','.save',function(){
			let invoiceSendPass = $('input[name=invoiceSendPass]:checked',$layerObject).val() ?? 'N';
			if(invoiceSendPass == 'N'){
				let dt = self._utils.currentDate().replace(/-/g,'');
				if(self._companyInfo.cPopbillYn != 'Y'){
					alert('연동 신청이 안되어 있습니다. \n기본설정 > 회사정보 메뉴를 이용하여 popbill 연동신청을 진행해 주세요');
					return false;
				}else if(self._utils.checkEmptyNull(self._companyInfo.cCertExpiryDt)){
					alert('인증서 등록이 안되어 있습니다. \n기본설정 > 회사정보 메뉴를 통하여 인증서를 등록하십시오');
					return false;
				}else if(self._companyInfo.cCertExpiryDt < dt){
					alert('인증서 만료일이 지났습니다. \n기본설정 > 회사정보 메뉴를 통하여 신규 인증서를 등록하십시오');
					return false;
				}
			}
			let $invoices = $('.invoice',$layerObject);
			let saveInfo = {};
			
			for(let i=0;i<$invoices.length;i++){
				let $invoice = $($invoices[i]);
				let cuInfo = $invoice.data("ROW");
				delete cuInfo.list;
				let info = self._utils.serializeObject($invoice);
				cuInfo = JSON.parse(JSON.stringify(cuInfo));  // 원인을 알수 없는 이유로 전송전 stringify 사용시 (Converting circular structure to JSON)에러가 발생하여 임시 조치함
				if(self._utils.checkEmptyNull(info.cuInvoiceEmail)){
					alert('공급받는자의 메일주소를  입력하십시오');
					return false;
				}

				if(!self._utils.isEmailcheck(info.cuInvoiceEmail)){
					alert('공급받는자의 메일주소를 정확히 입력하십시오');
					return false;
				}
				if(!self._utils.checkEmptyNull(info.cuInvoiceEmail2)){
					if(!self._utils.isEmailcheck(info.cuInvoiceEmail2)){
						alert('공급받는자의 두번째 메일주소를 정확히 입력하십시오');
						return false;
					}
				}


				$.extend(cuInfo,info);
				cuInfo.trans = [];
				let $trs = $('.orderList tr', $invoice);
				for(let t = 0;t<$trs.length;t++){
					let $tr = $($trs[t]);
					let tr = $tr.data("ROW")??{};
					$.extend(tr,self._utils.serializeObject($($tr)));
					tr.lilAmount = self._utils.getOnlyNumber(tr.lilAmount);
					tr.lilAmountVat = self._utils.getOnlyNumber(tr.lilAmountVat);
					tr.lilUnitPrice = self._utils.getOnlyNumber(tr.lilUnitPrice);
					tr.lilCnt = self._utils.getOnlyNumber(tr.lilCnt);
					cuInfo.trans.push(tr);
				}
				cuInfo.iKind = 'S';
				saveInfo[cuInfo.cuSeq] = cuInfo;

			}
			let mapData = {ctl : 'ledger',cmd : 'invoiceInsert'};
			//saveInfo.trans = JSON.stringify(saveInfo.trans);
			mapData.invoices = JSON.stringify(saveInfo);
			mapData.invoiceSendPass = invoiceSendPass;
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					$(".btnClosePopLayer",$layerObject).trigger('click');
					alert('발행 되었습니다.');
					self.retrieve();		
				}else{
					alert(rdata.message);
				}
			});
		});


		$invoiceDocument.empty();
		data = JSON.parse(JSON.stringify(data));
		for(let i=0;i<data.length;i++){
			let d = data[i];
			if(invoice[d.cuSeq] == undefined){
				invoice[d.cuSeq] = d;
				invoice[d.cuSeq].list = [d];
			}else{
				invoice[d.cuSeq].list.push(d);
			}
		}
		
		let keys = Object.keys(invoice);
		let paddingHeight = 55;
		let height = 0;
		for(let i=0;i<keys.length;i++){
			let cuInfo = invoice[keys[i]];
			let $invoice = $invoiceOrg.clone();
			let $orderTbody = $('.orderList', $invoice)
			let $trOrg = $('tr', $orderTbody).clone();
			$orderTbody.empty();
			let iAmount = 0;
			let iAmountVat = 0;
			

			$invoice.data("ROW",cuInfo);
			cuInfo.cuAddress = cuInfo.cuAddr +' '+ cuInfo.cuAddrDetail
			self._utils.unSerializeObject($invoice, cuInfo);
			// 한건은 일반 발행
			if(self._isJoin && cuInfo.list.length > 1){
				$('input[name=lItemJoinYn]',$invoice).val('Y');
				let $tr = $trOrg.clone();
				let lilItem = cuInfo.list[0].lMemo + ' 외 '+ (cuInfo.list.length - 1) +'건';
				let lSeqs = [];
				$('input[name=lDt]', $tr).val(self._utils.dateformatCurrentYYYYMMDD('-'));
				$('input[name=lilItem]', $tr).val(lilItem);
				$('input[name=lilStandard]', $tr).val('-').attr('readonly', 'readonly').addClass('readonly');
				$('input[name=lilCnt]', $tr).val('1').attr('readonly', 'readonly').addClass('readonly');

				for(let l=0;l<cuInfo.list.length;l++){
					let d = cuInfo.list[l];
					if (parseInt(d.lAmountVat) > 0){
						iAmount += parseInt((d.lAmountInvoice/11)*10);
						iAmountVat += parseInt(d.lAmountInvoice/11);	
					}else{
						iAmount += parseInt(d.lAmountInvoice);
					}
					lSeqs.push(d.lSeq);
				}
				$('input[name=lSeqs]',$invoice).val(lSeqs.join(','));
				$('input[name=lilAmount]', $tr).val(self._utils.numberWithCommas(iAmount)).attr('readonly', 'readonly').addClass('readonly');
				$('input[name=lilAmountVat]', $tr).val(self._utils.numberWithCommas(iAmountVat)).attr('readonly', 'readonly').addClass('readonly');
				$('input[name=lilUnitPrice]', $tr).val(self._utils.numberWithCommas(iAmount)).attr('readonly', 'readonly').addClass('readonly');
				$orderTbody.append($tr);
			}else{
				$('input[name=lItemJoinYn]',$invoice).val('N');
				for(let l=0;l<cuInfo.list.length;l++){
					let d = cuInfo.list[l];
					let $tr = $trOrg.clone();
					let lAmount = d.lAmount;
					let lAmountVat = d.lAmountVat;
					if (parseInt(lAmountVat) > 0){
						lAmount = parseInt((d.lAmountInvoice/11)*10);
						lAmountVat = parseInt(d.lAmountInvoice/11);	
					}else{
						lAmount = parseInt(d.lAmountInvoice);
						lAmountVat = 0;
					}

					$('input[name=lSeq]', $tr).val(d.lSeq);
					$('input[name=lDt]', $tr).val(self._utils.dateformatStringToDate(d.lDt));
					$('input[name=lilItem]', $tr).val(d.lMemo);
					$('input[name=lilAmount]', $tr).val(self._utils.numberWithCommas(lAmount));
					$('input[name=lilAmountVat]', $tr).val(self._utils.numberWithCommas(lAmountVat));
					$('input[name=lilStandard]', $tr).val('-');
					$('input[name=lilCnt]', $tr).val('1');
					$('input[name=lilUnitPrice]', $tr).val(self._utils.numberWithCommas(lAmount));
					$orderTbody.append($tr.data("ROW",d));
					iAmount += parseInt(lAmount);
					iAmountVat += parseInt(lAmountVat);
				}
			}
			$('input[name=iAmount]',$invoice).val(self._utils.numberWithCommas(iAmount));
			$('input[name=iAmountCash]',$invoice).val(self._utils.numberWithCommas(iAmount));
			$('input[name=iAmountVat]',$invoice).val(self._utils.numberWithCommas(iAmountVat));
			$('input[name=iAmountTotal]',$invoice).val(self._utils.numberWithCommas(iAmount+iAmountVat));
			$("input[name=iDt]",$invoice).val(self._utils.dateformatKorDate(new Date()));
			$invoiceDocument.append($invoice);
			if(i<(keys.length-1)) $invoiceDocument.append('<div style="height:30px;clear: both;"><hr></div>');
			invoiceEvent($invoice);
			height += $invoice.height() + paddingHeight;
		}
		$('.invoiceDocument', $layerObject).css("height", height);
		if(height > 540){
			$('.invoiceRootDiv', $layerObject).css("height", 540);
		}
		

		function invoiceEvent($invoice){
			$invoice.on('focus','input[name=lilAmount],[name=lilUnitPrice],[name=lilCnt]',function(){
				let v = $(this).val();
				v = self._utils.getOnlyNumber(v);
				$(this).data("ROW",v).val(v=='0'?'':v);
			});
			$invoice.on('focusout','input[name=lilAmount],[name=lilUnitPrice],[name=lilCnt]',function(){
				let o = $(this).data("ROW");
				let v = $(this).val();
				let n = $(this).attr('name');
				let $orderList = $('.orderList',$invoice)
				o = self._utils.getOnlyNumber(o);
				v = self._utils.getOnlyNumber(v);
				$(this).val(self._utils.numberWithCommas(v==''?'0':v));
				if(o!=v){
					let $tr = $(this).closest('tr');
					let info = $tr.data('ROW');
					if(n == 'lilAmount'){
						$('input[name=lilAmountVat]',$tr).val(self._utils.numberWithCommas(v*0.1));
					}else if(n== 'lilUnitPrice'){
						let cnt = $('input[name=lilCnt]',$tr).val();
						cnt = self._utils.getOnlyNumber(cnt);
						$('input[name=lilAmount]',$tr).val(self._utils.numberWithCommas(cnt * v));
						$('input[name=lilAmountVat]',$tr).val(self._utils.numberWithCommas((cnt * v)*0.1));
					}else if(n=='lilCnt'){
						let unitPrice = $('input[name=lilUnitPrice]',$tr).val();
						unitPrice = self._utils.getOnlyNumber(unitPrice);
						$('input[name=lilAmount]',$tr).val(self._utils.numberWithCommas(unitPrice * v));
						$('input[name=lilAmountVat]',$tr).val(self._utils.numberWithCommas((unitPrice * v)*0.1));
					}
				}
				let $lilAmounts = $('input[name=lilAmount]',$orderList);
				let $lilAmountVats = $('input[name=lilAmountVat]',$orderList);
				let iAmount = 0;
				let iAmountVat = 0;
				for(let i=0;i<$lilAmounts.length;i++)	iAmount += parseInt(self._utils.getOnlyNumber($($lilAmounts[i]).val()));
				for(let i=0;i<$lilAmountVats.length;i++)	iAmountVat += parseInt(self._utils.getOnlyNumber($($lilAmountVats[i]).val()));
				$('input[name=iAmount]',$invoice).val(self._utils.numberWithCommas(iAmount));
				$('input[name=iAmountVat]',$invoice).val(self._utils.numberWithCommas(iAmountVat));
				$('input[name=iAmountTotal]',$invoice).val(self._utils.numberWithCommas(parseInt(iAmount)+parseInt(iAmountVat)));
			});
			$invoice.on('keypress','input[name=lilAmount],[name=lilUnitPrice],[name=lilCnt]',function(e){
				if(e.keyCode == 13) ($(this).trigger('focusout'));
			})
		}
		
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
			cmd : 'list'
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
export default ledgerController
