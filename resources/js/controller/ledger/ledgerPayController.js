
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let ledgerPayController = class {
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
		let $leftDiv = $('.f_lt', self._code);
		let $riftDiv = $('.f_rt', self._code);
		let $searchWrap = $(".searchWrap",self._code);

		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		let mapData = {ctl : 'company',cmd : 'accountList',searchWord : this.term,};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				self._accountInfo = rdata.data;
			} else {
				alert(rdata.message);
			}
		});

		// 검색 영역
		$(".btnSearchCall",$searchWrap).on("click",function(e){
			self._code.find("input[name=page]").val(1);
			$searchWrap.find("input[name=cuSeq]").val('');
			self.retrieve();
			self.payRetrieve();
			e.stopPropagation();
		});
		$(".btnExcelDownload",$searchWrap).on("click",function(e){
			self.excelDownload();
		});
		$(".btnPayCreate",$searchWrap).on("click",function(e){
			let $div = $('template#payInsert');
			self._parent.openLayer($div.html(), self.layerPayEvent);
			/*
			self.layerPayView(function(data){
				self._parent.openLayer(data, self.layerPayEvent,info);
			});
			*/
			e.stopPropagation();
		});

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = $(".dataListTable tbody",$riftDiv);
			let chkBoxs = tbody.find("input[name=lpSeq]:checked");
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
			if(data.lpHoldYn == 'Y'){
				alert("마감된 결제는 삭제 할수 없습니다.");
				return false;
			}
			confirm('삭제하시겠습니까?', function(is){
				if(is) {
					self.delete({lpSeq : data.lpSeq}, function(resp) {
						if(resp.code==0) {
							self.payRetrieve();
							alert('삭제되었습니다');
						} else {
							$("input[name=chckAll]",$riftDiv).prop("checked", false);
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
		let startDt = self._utils.dateformatKorDate(new Date());
		startDt = startDt.substring(0,8)+'01';
		//$searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -3)));
		$searchWrap.find("input[name=startDt]").val(startDt);
		
		$("input[name=endDt]", $searchWrap).val(self._utils.dateformatKorDate(new Date()));
		self._defaultData = self._utils.serializeObject($searchWrap);

		/******** 좌측 이벤트 정의 ********/ 
		


		// 목록 테이블 이벤트 정의
		
		let $leftThead = $(".dataHeadTable thead", $leftDiv);
		let $leftTfoot = $(".pageInfoTfoot",$leftDiv);
		let $leftTbody = self._code.find(".f_lt .dataListTable");
		// 관리자인 경우 생성
		if(self._const.__MANAGER_YN == 'Y'){}
		
		$leftTfoot.find("select[name=rowsPerPage]").on("change",function(){
			$leftTfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) $leftTfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		$leftTfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			 $leftTfoot.find("input[name=page]").val("1");
			self.retrieve();
		});


		$leftTbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);	
		});

		$leftTbody.on('click','.btnPayDetail',function(){
			let choiceColor = '#d3e1ff';
			let $tbody = $(this).closest('tbody');
			let $tr = $(this).closest('tr');
			let d = $tr.data('ROW');
			$tbody.find('td').css({'background':'', 'font-weight': ''});
			$tr.find('td').css({'background':choiceColor, 'font-weight': 'bold'});
			$searchWrap.find("input[name=cuSeq]").val(d.cuSeq);
			self.payRetrieve();
		});

		self.retrieve();

		/*********** 좌측 이벤트 정의 완료 ****************/

		/*********** 우측 이벤트 정의 ****************/
		// 목록 테이블 이벤트 정의
		let $rightThead = $(".dataHeadTable thead", $riftDiv);
		let $rightTfoot = $(".pageInfoTfoot", $riftDiv);
		let $rightTbody = $(".dataListTable", $riftDiv);


		$("input[name=chckAll]",$riftDiv).on("click",function(e){
			e.stopPropagation();
			let $boxs = $rightTbody.find("input[name=lpSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<$boxs.length;i++){
				let $box = $($boxs[i]);
				if($box.is(":checked") != status) $box.trigger('click');
			}
		});
		
		$rightThead.on("click",".fa-broom",function(){
			let $tr = $(this).closest("tr");
			self._utils.unSerializeObject($searchWrap,self._defaultData );
			$tr.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			self.payRetrieve();
		});		  
		rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) $rightTfoot.find("select[name=rightRowsPerPage]").val(rowsPerPage);
		$rightTfoot.find("select[name=rightRowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			 $rightTfoot.find("input[name=rightPage]").val("1");
			self.retrieve();
		});

		$rightTbody.on('click','.btnOpenInfo',function(){
			let d = $(this).closest('tr').data('ROW');
			let mapData = {ctl : 'ledger',cmd : 'payLoad',lpSeq : d.lpSeq,};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let $div = $('template#payInsert');
					self._parent.openLayer($div.html(), self.layerPayEvent,rdata.data);
					/*
					self.layerPayView(function(data){
						self._parent.openLayer(data, self.layerPayEvent,rdata.data);
					});
					*/
				} else {
					alert(rdata.message);
				}
			});

		});
		
		self.payRetrieve();
	}



	retrieve = () => {
		const self = this;

		let $pageTfoot = self._code.find(".f_lt .pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rowsPerPage]").val();
		let page = $pageTfoot.find("input[name=page]").val();
		let $searchWrap = self._code.find(".searchWrap");
		let startDt = $searchWrap.find("input[name=startDt]").val();
		let endDt = $searchWrap.find("input[name=endDt]").val();
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let lKind = $searchWrap.find("select[name=lKind]").val();
		let searchData = {
			cuSeq : undefined,
			startDt : startDt?startDt.replace(/-/g,''):'' ,
			endDt : endDt?endDt.replace(/-/g,''):'',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			lKind : lKind,
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
						let balance = (lKind == 'S') ? resp[i].totalSaleBalance : resp[i].totalBuyBalance;
						if(!self._utils.checkEmptyNull(balance)) $('.totalBalance',self._code).text(self._utils.numberWithCommas(balance));
						else $('.totalBalance',self._code).text(0);
					}
					self.display($tbody, resp[i]);
				}
				// self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,7],"oSeq");
			} else {
				$('.totalBalance',self._code).text(0);
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);

		});
	}

	display = ($tbody, d) => {
		const self = this;
		let $tr = $('<tr/>');
		let lKind = $(".searchWrap select[name=lKind]", self._code).val();
		let cuAmountStart = (lKind=='S')?d.cuAmountSaleStart : d.cuAmountBuyStart;
		let cuAmountBalance = (lKind=='S')?d.cuAmountSaleBalance : d.cuAmountBuyBalance;
		let lfcAmountSaleBalance = (lKind=='S')?d.lfcAmountSaleBalance : d.lfcAmountBuyBalance;
		//$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="oSeq" value="'+d.oSeq+'"/>')));
		$tr.append($('<td class="al pl5 pr5 btnPayDetail cursorPointer">'+self._utils.nullTostring(d.cuNm, '')+'</td>'));
		//$tr.append($('<td class="ar pl5 pr5 btnPayDetail cursorPointer">'+self._utils.numberWithCommas(cuAmountStart, '')+'</td>'));
		$tr.append($('<td class="ar pl5 pr5 btnPayDetail cursorPointer">'+(self._utils.checkEmptyNull(lfcAmountSaleBalance)? '0': self._utils.numberWithCommas(lfcAmountSaleBalance, ''))+'</td>'));
		$tr.append($('<td class="ar pl5 pr5 btnPayDetail cursorPointer">'+self._utils.numberWithCommas(d.payTotalAmount, '')+'</td>'));
		$tr.append($('<td class="ar pl5 btnPayDetail cursorPointer" style="padding-right:7px !important;">'+self._utils.numberWithCommas(cuAmountBalance, '')+'</td>'));
		//$tr.append($('<td class="ac"><i class="fa-solid fa-right-from-bracket btnPayDetail cursorPointer" title="결제 내역보기"></i></td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	}

	payRetrieve = (data) => {
		const self = this;
		let $pageTfoot = self._code.find(".f_rt .pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rightRowsPerPage]").val();
		let page = $pageTfoot.find("input[name=rightPage]").val();
		let $searchWrap = self._code.find(".searchWrap");
		let startDt = $searchWrap.find("input[name=startDt]").val();
		let endDt = $searchWrap.find("input[name=endDt]").val();
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let lKind = $searchWrap.find("select[name=lKind]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let cuSeq = $searchWrap.find("input[name=cuSeq]").val();
		let lpKind = (lKind == 'S') ? 'I':'O';


		let searchData = {
			cuSeq : cuSeq,
			startDt : startDt?startDt.replace(/-/g,''):'' ,
			endDt : endDt?endDt.replace(/-/g,''):'',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			lpKind : lpKind,
			searchColumn : 'cuNm',
			searchWord : searchWord,
		}
		self.payList(searchData, function(resp){
			let $tbody = self._code.find(".f_rt .dataListTable tbody");
			let $thead = self._code.find(".f_rt .dataHeadTable thead");
			
			$tbody.empty();
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
						let totalPay = (lKind == 'S') ? resp[i].amountIn : resp[i].amountOut;
						if(!self._utils.checkEmptyNull(totalPay)) $('.totalPay',self._code).text(self._utils.numberWithCommas(totalPay));
					}
					
					self.payDisplay($tbody, resp[i]);
				}
				let $trs = $('tr',$tbody);
				for(let t =0;t<$trs.length;t++) $($($trs[t]).find('td').eq(8)).css('border-right','1px solid #dedede !important;');
			} else {
				$('.totalPay',self._code).text(0);
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPayPage);

		});
	}

	payDisplay = ($tbody, d) => {
		const self = this;

		let $tr = $('<tr/>');
		$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="lpSeq" value="'+d.lpSeq+'"/>')));
		$tr.append($('<td class="ac">'+self._utils.dateformatStringToDate(d.lpDt) +'</td>'));
		//$tr.append($('<td class="ac"><a href="#" class="'+ ((d.lpKind == 'I')?'btnStyleMin02':'btnStyleMin05')+'">'+d.lpKindNm+'</a></td>'));
		$tr.append($('<td class="ac"><strong style="color:'+ ((d.lpKind == 'I')?'blue':'red')+'">'+d.lpKindNm+'</strong></td>'));
		$tr.append($('<td class="al pl5 pr5" style="white-space: nowrap;text-overflow: ellipsis; overflow: hidden;"></td>').append('<span class="cuNm" title="'+ d.cuNm +'">'+ d.cuNm +'</span>'));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.lpAmount, '')+'</td>'));
		//$tr.append($('<td class="ac"/>'+ ((d.caSeq != undefined)? d.caBankNm +' '+ d.caAccount +' / '+ d.caOwnerNm:'')+ '</td>'));
		$tr.append($('<td class="ac"/>'+ ((d.caSeq != undefined)? d.caBankNm +' '+ d.caAccount :'')+ '</td>'));
		$tr.append($('<td class="ac"/>'+ d.eNm+ '</td>'));
		$tr.append($('<td class="al pl5 pr5">'+((d.lMemo!=undefined)? d.lMemo : '')+'</td>'));
		$tr.append($('<td><i class="fa-regular fa-pen-to-square btnOpenInfo cursorPointer" title="수정" style="font-size:14px;"></i></td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
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
					<div style="height:280px;overflow-y:auto;padding:2px;">
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
									<th class="ar">금액</th>
									<th class="al" colspan="3"><input class="ar w100p" type="text" name="lpAmount" placeholder="결제금"  value="0"></th>
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
	layerPayEvent = (popupID,info, $parentObj) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);

		if(info != undefined && info.lpHoldYn == 'Y'){
			let $btn = $('.save',$layerObject);
			let $div = $btn.closest('div');
			let $objs = $('input, select, textarea',$layerObject);
			
			$btn.remove();
			$div.append('마감된 결제는 수정 할수 없습니다.')
			$objs.attr('disabled','disabled').addClass('readonly');
		}

		if(info != undefined){
			$('input[name=cuSeq]',$layerObject).val(info.cuSeq);
			$('input[name=cuNm]',$layerObject).val(info.cuNm);
			if(info.lSeq== undefined){
				$layerObject.data(info);
			}
		}

		
		let $select = $('select[name=caSeq]',$layerObject);
		for(let i=0;i< self._accountInfo.length;i++){
			let d = self._accountInfo[i];
			let $option = $('<option />');
			$option.val(d.caSeq);
			$option.text(d.caBankNm +'-'+ d.caOwnerNm +'('+ d.caAccount +')');
			$select.append($option);
		}


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
			/*
			if(lKind == 'I'){ $obj.css({'color':'red','background':'#fbe2e2'})
			}else if(lKind == 'O'){{ $obj.css({'color':'blue','background':'#bfd3ee'});}
			}else{$obj.css({'color':'','background':''})}
			*/
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
			$('input[name=lpDt]',$layerObject).val(self._utils.currentDate());
			if(info.lpSeq != undefined){
				self._utils.unSerializeObject($layerObject,info)
				$('input[name=lpAmount]',$layerObject).trigger('focus').trigger('focusout');
				$('select[name=lpKind]',$layerObject).trigger('change');
				$('.title',$layerObject).text('결제 수정');
				$('.save',$layerObject).text('수정');
			}
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
				self.update(saveInfo, function(data){
					if(data.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						alert('수정 되었습니다.');
						self.payRetrieve();
					}else{
						alert(data.message);
					}
				});
			}else{
				console.log("insert")
				self.insert(saveInfo, function(data){
					if(data.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						alert('등록 되었습니다.');
						self.payRetrieve();
					}else{
						alert(data.message);
					}
				});
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
			cmd : 'customerBalancelist',
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
	payList = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'ledger',
			cmd : 'payList',
			rows: 9999
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
			cmd : 'payDelete'
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
		
		let tfoot = self._code.find(".f_lt .pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}
	goPayPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".f_rt .pageInfoTfoot");
		tfoot.find("input[name=rightPage]").val(page);

		self.payRetrieve();
	}

	update = (_mapData, cbfunc) => {
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
	insert = (_mapData, cbfunc) => {
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
}
export default ledgerPayController
