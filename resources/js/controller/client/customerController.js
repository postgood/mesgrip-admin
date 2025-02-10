
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall';


let customerController = class {

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

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});

		self._code.find(".btnCreate").on("click",function(e){
			let $div = $('template#customerInsertDiv');
			self._parent.openLayer($div.html(), self.initNewLayer);
			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.initNewLayer);
			});
			*/
			e.stopPropagation();
		});
		self._code.find(".btnExcelUpload").on("click",function(e){
			let $div = $('template#customerExcelInsert');
			self._parent.openLayer($div.html(), self.excelUploadEvent);
			e.stopPropagation();
		});
		

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=cuSeq]:checked");
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

			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let cuSeq = chkBoxs.val();

					self.delete({cuSeq : cuSeq}, function(resp) {
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

		self._code.find("input[name=chckAll]").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let boxs = tbody.find("input[name=cuSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
			
		});

		// 목록 테이블 이벤트 정의
		let searchWrap = self._code.find(".searchWrapArea");
		let thead = self._code.find(".dataHeadTable thead");
		let tfoot = self._code.find(".pageInfoTfoot");
		let tbody = self._code.find(".dataListTable tbody");
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
		self._defaultData = self._utils.serializeObject(searchWrap);
		thead.on("click",".fa-rotate-right",function(){
			let $tr = $(this).closest("tr");
			self._utils.unSerializeObject(searchWrap,self._defaultData );
			$tr.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			self.retrieve();
		});
		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) tfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		tfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});

		tbody.on('click','.btnOpenInfo',  function(){
			let _data = $(this).closest('tr').data('ROW');
			
			// 고객사 데이터를 먼저 읽어온다
			self._client = {};
			self.load({cuSeq:_data.cuSeq}, function(resp){
				if(resp.code == 0) {
					self._client = resp.data;
					let $div = $('template#customerInsertDiv');
					self._parent.openLayer($div.html(), self.reloadLayer);
					/*
					self.layerView(function(data){
						self._parent.openLayer(data, self.reloadLayer);
					});
					*/
				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.customerEmployee', function(){
			let _data = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#customerEmployee');
			self._parent.openLayer($popDiv.html(), self.employeeListEvent,_data);

			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.reloadLayer);
			});
			*/
		});
		tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});

		self.retrieve();
	}

	purge = () => {
		const self = this;

		console.log("customerController purge");
	}

	reload = () => {
		const self = this;

		console.log("customerController reload");
	}

	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}

	retrieve = () => {
		const self = this;

		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchWrap = self._code.find(".searchWrapArea");
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let searchColumn = searchWrap.find("select[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let cuTypeCd = searchWrap.find("select[name=cuTypeCd]").val();

		let searchData = {
			cuTypeCd : cuTypeCd,
			cuImportantYn : 'N',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : searchColumn,
			searchWord : searchWord
		}

		self.list(searchData, function(resp){
			let tbody = self._code.find(".dataListTable tbody");
			let thead = self._code.find(".dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			tbody.empty();
			
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
					}
					self.display(tbody, resp[i]);
				}
			} else {
				$('<tr><td colspan="'+ thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}
			
			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});
	}

	display = (tbody, d) => {
		const self = this;
		let cuTypeCds = (d.cuTypeCd != undefined)?d.cuTypeCd.split(","):[];
		let cuTypeInfo = "";
		for(let i=0;i<cuTypeCds.length;i++){
			if(cuTypeCds[i] == 'A'){
				cuTypeInfo += ", 고객사";
			}else if(cuTypeCds[i] == 'B'){
				cuTypeInfo += ", 외주사";
			}else if(cuTypeCds[i] == 'C'){
				cuTypeInfo += ", 자재사";
			}
		}
		cuTypeInfo = (cuTypeInfo != '')? cuTypeInfo.substring(1):'';
		let trHtml = '<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>';
				trHtml +='<td style="border:1px solid #dedede;" ><input type="checkbox" class="vm" name="cuSeq" value="'+d.cuSeq+'"></td>';
				trHtml +='<td style="border:1px solid #dedede;" class="al pl5 cuNm cursorPointer">'+self._utils.nullTostring(d.cuNm, '')+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" >'+self._utils.nullTostring(d.cuOwnerNm, '')+'</td>';
				//if(d.cuImportantYn == "N") trHtml +='<td class="txt_red">'+self._utils.nullTostring(d.cuImportantYn, '')+'</td>';
				//else trHtml +='<td>'+self._utils.nullTostring(d.cuImportantYn, '')+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" >'+self._utils.convertBizNo(self._utils.nullTostring(d.cuBizNo, '').replace(/-/g,''))+ ((self._utils.checkEmptyNull(d.cuBizNoNum)?'':' ('+ d.cuBizNoNum +')'))+'</td>';
				//trHtml +='<td style="border:1px solid #dedede;" >'+self._utils.formatPhoneNumber(self._utils.nullTostring(d.cuTel, '').replace(/-/g,''))+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" class="al">'+self._utils.nullTostring(d.cuAddr, '')+ ' '+ self._utils.nullTostring(d.cuAddrDetail, '') +'</td>';
				trHtml +='<td style="border:1px solid #dedede;" >'+ cuTypeInfo +'</td>';
				trHtml +='<td style="border:1px solid #dedede;" ><i class="fa-solid fa-user-group customerEmployee cursorPointer" title="거래처 직원 관리"'+((d.employeeCnt == 0)?'style="color:#ccc;"':'')+'></i> '+ d.employeeCnt +'</td>';
				//trHtml +='<td>'+self._utils.nullTostring(d.cuDcRate, '')+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" class="al">'+self._utils.nullTostring(d.cuMemo,'')+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" >'+d.creDate.substring(0,16)+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" ><i class="fa-regular fa-pen-to-square btnOpenInfo cursorPointer" style="font-size:14px;" title="고객정보 수정"></i></td>';
				trHtml +='</tr>';

		let $trObj = $(trHtml).data("ROW",d);
		$trObj.appendTo(tbody);
	}

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
			cmd : 'list'
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

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
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

	delete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
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


	initNewLayer = (popupID) => {
		const self = this;
		if(self._const.__MANAGER_YN == 'Y'){
			$(`#${popupID} .ledgerInfo`).show();	
		}else{
			$(`#${popupID} .ledgerInfo`).hide();	
		}

		$(` .title`).text("거래처 등록");

		$(`#${popupID} input[name=cuAmountSaleStart],[name=cuAmountBuyStart]`).on('focus',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v);
		});
		$(`#${popupID} input[name=cuAmountSaleStart],[name=cuAmountBuyStart]`).on('focusout',function(){
			let o = $(this).data("ROW");
			let v = $(this).val();
			o = self._utils.getOnlyNumber(o);
			v = self._utils.getOnlyNumber(v);
			/*
			if(o!=v){
			}else{
			}
			*/
			$(this).val(self._utils.numberWithCommas(v));
		});
		$(`#${popupID} input[name=cuBizNo]`).on('focusout', function(e){

			let _cuBizNo = $('input[name=cuBizNo]', `#${popupID}`).val();
			let _cuBizNoNum = $('input[name=cuBizNoNum]', `#${popupID}`).val();

			if(!_cuBizNo) {
				//alert('사업자번호를 입력하세요');
				return false;
			}
			let mapData = {
				bizNo : _cuBizNo,
				bizNoNum : _cuBizNoNum
			}

			self.bizSelect(mapData,function(resp){
				if(resp.code == 0 && resp.data.length > 0) {
					let _data = resp.data[0];
			
					$('input[name=cuBizNo]', `#${popupID}`).val(self._utils.convertBizNo(_data.bizNo));
					$('input[name=cuBizNoNum]', `#${popupID}`).val(_data.bizNoNum);
					$('input[name=cuNm]', `#${popupID}`).val(_data.nm);
					$('input[name=cuOwnerNm]', `#${popupID}`).val(_data.ownerNm);
					$('input[name=cuTel]', `#${popupID}`).val(_data.tel);
					$('select[name=cuType]', `#${popupID}`).val(_data.type);

					$('input[name=cuZipcode]', `#${popupID}`).val(_data.zipcode);
					$('input[name=cuAddr]', `#${popupID}`).val(_data.addr);
					$('input[name=cuAddrDetail]', `#${popupID}`).val(_data.addrDetail);
					$('input[name=cuUpjong]', `#${popupID}`).val(_data.upjong);
					$('input[name=cuJongmok]', `#${popupID}`).val(_data.jongMok);
					$('input[name=cuFax]', `#${popupID}`).val(_data.fax);
					$('input[name=cuInvoiceEmail]', `#${popupID}`).val(_data.invoiceEmail);

					$('input[name=cuFax]', `#${popupID}`).trigger('focusout');
					$('input[name=cuTel]', `#${popupID}`).trigger('focusout');
				}
			});
		});
		
		$(`#${popupID} .btnAddrSearch`).on('click', function(e){
			new daum.Postcode({
				oncomplete: function(data) {
						// data.zonecode 새 우편번호
						let roadAddr = data.roadAddress; // 도로명 주소 변수
						$(`#${popupID} input[name=cuZipcode]`).val(data.zonecode);
						$(`#${popupID} input[name=cuAddr]`).val(roadAddr);
				}
			}).open();
		});
		self._utils.focusEvent($('input[name=cuBizNo]',`#${popupID}`), 'bizNo');
		self._utils.focusEvent($('input[name=cuTel]',`#${popupID}`), 'tel');
		self._utils.focusEvent($('input[name=cuFax]',`#${popupID}`), 'tel');
		self._utils.focusEvent($('input[name=eTel]',`#${popupID}`), 'tel');

		$(`#${popupID} .clientSave`).on('click', function(e){
			
			let _cuTypeCd = $('input[name=cuTypeCd]:checked', `#${popupID}`).map(function() {
				return this.value;
			}).get();
		
			let _cuNm = $('input[name=cuNm]', `#${popupID}`).val();
			let _cuOwnerNm = $('input[name=cuOwnerNm]', `#${popupID}`).val();
			let _cuBizNo = $('input[name=cuBizNo]', `#${popupID}`).val();
			let _cuBizNoNum = $('input[name=cuBizNoNum]', `#${popupID}`).val();
			let _cuType = $('select[name=cuType]', `#${popupID}`).val();
			let _cuZipcode = $('input[name=cuZipcode]', `#${popupID}`).val();
			let _cuAddr = $('input[name=cuAddr]', `#${popupID}`).val();
			let _cuAddrDetail = $('input[name=cuAddrDetail]', `#${popupID}`).val();
			let _cuTel = $('input[name=cuTel]', `#${popupID}`).val();
			let _cuDcRate = $('input[name=cuDcRate]', `#${popupID}`).val();
			let _cuImportantYn = $('select[name=cuImportantYn]', `#${popupID}`).val();
			let _cuMemo = $('textarea[name=cuMemo]', `#${popupID}`).val();
			let _cuSignificant = $('textarea[name=cuSignificant]', `#${popupID}`).val();
			let _cuFax = $('input[name=cuFax]', `#${popupID}`).val();
			let _cuInvoiceEmail = $('input[name=cuInvoiceEmail]', `#${popupID}`).val();
			let _cuUpjong = $('input[name=cuUpjong]', `#${popupID}`).val();
			let _cuJongmok = $('input[name=cuJongmok]', `#${popupID}`).val();
			let _cuBankNm = $('input[name=cuBankNm]', `#${popupID}`).val();
			let _cuBankOwnerNm = $('input[name=cuBankOwnerNm]', `#${popupID}`).val();
			let _cuAccount = $('input[name=cuAccount]', `#${popupID}`).val();
			let _cuAmountSaleStart = $('input[name=cuAmountSaleStart]', `#${popupID}`).val();
			let _cuAmountBuyStart = $('input[name=cuAmountBuyStart]', `#${popupID}`).val();

			let _eId = $('input[name=eId]', `#${popupID}`).val();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
			let _eNm = $('input[name=eNm]', `#${popupID}`).val();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val();

			if(!self._utils.checkEmptyNull(_cuAmountSaleStart)) _cuAmountSaleStart = self._utils.getOnlyNumber(_cuAmountSaleStart);
			if(!self._utils.checkEmptyNull(_cuAmountBuyStart)) _cuAmountBuyStart = self._utils.getOnlyNumber(_cuAmountBuyStart);
			if( self._utils.checkRequired(`#${popupID}`)) {

				let mapData = {
					cuNm : _cuNm,
					cuOwnerNm : _cuOwnerNm,
					cuBizNo : _cuBizNo,
					cuBizNoNum : _cuBizNoNum,
					cuType : _cuType,
					cuZipcode : _cuZipcode,
					cuAddr : _cuAddr,
					cuAddrDetail : _cuAddrDetail,
					cuTel : _cuTel,
					cuDcRate : _cuDcRate,
					cuImportantYn : _cuImportantYn,
					cuMemo : _cuMemo,
					cuSignificant : _cuSignificant,
					cuFax : _cuFax,
					cuInvoiceEmail : _cuInvoiceEmail,
					cuUpjong : _cuUpjong,
					cuJongmok : _cuJongmok,
					cuBankNm : _cuBankNm,
					cuBankOwnerNm : _cuBankOwnerNm,
					cuAccount : _cuAccount,
					cuAmountSaleStart : _cuAmountSaleStart,
					cuAmountBuyStart : _cuAmountBuyStart,
					cuTypeCd : JSON.stringify(_cuTypeCd),
					employeeInfo : JSON.stringify({
						eId : _eId, 
						ePwd: _ePwd,
						eNm : _eNm,
						eTel : _eTel
					})
				}

				self.insert(mapData, function(resp){
					if(resp.code==0) {
						$("body .btnClosePopLayer").trigger('click');
						self.retrieve();
						alert('등록되었습니다.');
					} else {
						alert(resp.message);
					}
				});
			}
		}).text('저장');
	}

	bizSelect = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'common',
			cmd : 'bizSelect'
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
			ctl : 'customer',
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

	reloadLayer = (popupID) => {
		const self = this;
		if(self._const.__MANAGER_YN == 'Y'){
			$(`#${popupID} .ledgerInfo`).show();	
		}else{
			$(`#${popupID} .ledgerInfo`).hide();	
		}
		//$(`#${popupID} .mw_body`).css('height','440px');
		$(`#${popupID} .cuEmployee`).remove();
		$(`#${popupID} .title`).text("고객사 수정");
		$(`#${popupID} input[name=cuAmountSaleStart],[name=cuAmountBuyStart]`).on('focus',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v);
		});
		$(`#${popupID} input[name=cuAmountSaleStart],[name=cuAmountBuyStart]`).on('focusout',function(){
			let o = $(this).data("ROW");
			let v = $(this).val();
			o = self._utils.getOnlyNumber(o);
			v = self._utils.getOnlyNumber(v);
			/*
			if(o!=v){
			}else{
			}
			*/
			$(this).val(self._utils.numberWithCommas(v));
		});
				
		$(`#${popupID} .btnAddrSearch`).on('click', function(e){
			new daum.Postcode({
				oncomplete: function(data) {
						// data.zonecode 새 우편번호
						let roadAddr = data.roadAddress; // 도로명 주소 변수
						$(`#${popupID} input[name=cuZipcode]`).val(data.zonecode);
						$(`#${popupID} input[name=cuAddr]`).val(roadAddr);
				}
			}).open();
		});

		if (Object.keys(self._client).length === 0 && self._client.constructor === Object) {
			alert('고객사 데이터를 불러올 수 없습니다');
			return false;
		}

		// 불러온 데이터를 화면에 표시한다.
		$('input[name=cuNm]', `#${popupID}`).val(self._client.cuNm);
		$('input[name=cuOwnerNm]', `#${popupID}`).val(self._client.cuOwnerNm);
		$('input[name=cuBizNo]', `#${popupID}`).val(self._client.cuBizNo);
		$('input[name=cuBizNoNum]', `#${popupID}`).val(self._client.cuBizNoNum);
		$('select[name=cuType]', `#${popupID}`).val(self._client.cuType);
		$('input[name=cuZipcode]', `#${popupID}`).val(self._client.cuZipcode);
		$('input[name=cuAddr]', `#${popupID}`).val(self._client.cuAddr);
		$('input[name=cuAddrDetail]', `#${popupID}`).val(self._client.cuAddrDetail);
		$('input[name=cuTel]', `#${popupID}`).val(self._client.cuTel);
		$('input[name=cuDcRate]', `#${popupID}`).val(self._client.cuDcRate);
		$('select[name=cuImportantYn]', `#${popupID}`).val(self._client.cuImportantYn);
		$('textarea[name=cuMemo]', `#${popupID}`).val(self._client.cuMemo);
		$('textarea[name=cuSignificant]', `#${popupID}`).val(self._client.cuSignificant);
		$('input[name=cuFax]', `#${popupID}`).val(self._client.cuFax);
		$('input[name=cuInvoiceEmail]', `#${popupID}`).val(self._client.cuInvoiceEmail);
		$('input[name=cuUpjong]', `#${popupID}`).val(self._client.cuUpjong);
		$('input[name=cuJongmok]', `#${popupID}`).val(self._client.cuJongmok);
		$('input[name=cuBankNm]', `#${popupID}`).val(self._client.cuBankNm);
		$('input[name=cuBankOwnerNm]', `#${popupID}`).val(self._client.cuBankOwnerNm);
		$('input[name=cuAccount]', `#${popupID}`).val(self._client.cuAccount);
		$('input[name=cuAmountSaleStart]', `#${popupID}`).val(self._utils.numberWithCommas(self._client.cuAmountSaleStart));
		$('input[name=cuAmountBuyStart]', `#${popupID}`).val(self._utils.numberWithCommas(self._client.cuAmountBuyStart));
		$('.cuAmountSaleBalance', `#${popupID}`).text(self._utils.numberWithCommas(self._client.cuAmountSaleBalance));
		$('.cuAmountBuyBalance', `#${popupID}`).text(self._utils.numberWithCommas(self._client.cuAmountBuyBalance));
		let $cuTypes = $(`input[name=cuTypeCd]`, `#${popupID}`);
		for(let i=0 ;i<$cuTypes.length;i++){
			$($cuTypes[i]).prop('checked', false);
			for(let t=0;t<self._client.cuTypeCd.length;t++){
				let _cuTypeCd = self._client.cuTypeCd[t].cuTypeCd;
				if(_cuTypeCd == 'C') $('.stockSetting', `#${popupID}`).show();
				if($($cuTypes[i]).val() == _cuTypeCd){
					$($cuTypes[i]).prop('checked', true);
					break;
				}
			}
		}

		$('input[name=ePwd]', `#${popupID}`).removeAttr('requiremsg');
		if(self._client.employeeInfo != undefined){
			self._client.employeeInfo.forEach(function(value) {
				let _employee = value;
				if(_employee.eManagerYn == 'Y') {
					$('input[name=eId]', `#${popupID}`).val(_employee.eId);
					$('input[name=ePwd]', `#${popupID}`).val(_employee.ePwd);
					$('input[name=eNm]', `#${popupID}`).val(_employee.eNm);
					$('input[name=eTel]', `#${popupID}`).val(_employee.eTel);
				}
			});
		}
		self._utils.focusEvent($('input[name=cuBizNo]',`#${popupID}`), 'bizNo');
		self._utils.focusEvent($('input[name=cuTel]',`#${popupID}`), 'tel');
		self._utils.focusEvent($('input[name=cuFax]',`#${popupID}`), 'tel');
		self._utils.focusEvent($('input[name=eTel]',`#${popupID}`), 'tel');
		/*$('input[name=cuBizNo]',`#${popupID}`).trigger('focusout');
		$('input[name=cuTel]',`#${popupID}`).trigger('focusout');
		$('input[name=cuFax]',`#${popupID}`).trigger('focusout');
		$('input[name=eTel]',`#${popupID}`).trigger('focusout');
		*/

		$('.stockSetting', `#${popupID}`).on('click', function(){
			let $div = $('template#customerStockSetting');
			self._parent.openLayer($div.html(), self.customerStockSettingEvent, self._client);
		});
		$(`#${popupID} .clientSave`).data({cuSeq:self._client.cuSeq}).on('click', function(e){
			let _data = $(this).data();

			let _cuTypeCd = $('input[name=cuTypeCd]:checked', `#${popupID}`).map(function() {
				return this.value;
			}).get();
		
			let _cuNm = $('input[name=cuNm]', `#${popupID}`).val();
			let _cuOwnerNm = $('input[name=cuOwnerNm]', `#${popupID}`).val();
			let _cuBizNo = $('input[name=cuBizNo]', `#${popupID}`).val();
			let _cuBizNoNum = $('input[name=cuBizNoNum]', `#${popupID}`).val();
			let _cuType = $('select[name=cuType]', `#${popupID}`).val();
			let _cuZipcode = $('input[name=cuZipcode]', `#${popupID}`).val();
			let _cuAddr = $('input[name=cuAddr]', `#${popupID}`).val();
			let _cuAddrDetail = $('input[name=cuAddrDetail]', `#${popupID}`).val();
			let _cuTel = $('input[name=cuTel]', `#${popupID}`).val();
			let _cuDcRate = $('input[name=cuDcRate]', `#${popupID}`).val();
			let _cuImportantYn = $('select[name=cuImportantYn]', `#${popupID}`).val();
			let _cuMemo = $('textarea[name=cuMemo]', `#${popupID}`).val();
			let _cuSignificant = $('textarea[name=cuSignificant]',`#${popupID}`).val();
			let _cuFax = $('input[name=cuFax]', `#${popupID}`).val();
			let _cuInvoiceEmail = $('input[name=cuInvoiceEmail]', `#${popupID}`).val();
			let _cuUpjong = $('input[name=cuUpjong]', `#${popupID}`).val();
			let _cuJongmok = $('input[name=cuJongmok]', `#${popupID}`).val();
			let _cuBankNm = $('input[name=cuBankNm]', `#${popupID}`).val();
			let _cuBankOwnerNm = $('input[name=cuBankOwnerNm]', `#${popupID}`).val();
			let _cuAccount = $('input[name=cuAccount]', `#${popupID}`).val();
			let _cuAmountSaleStart = $('input[name=cuAmountSaleStart]', `#${popupID}`).val();
			let _cuAmountBuyStart = $('input[name=cuAmountBuyStart]', `#${popupID}`).val();






			let _eId = $('input[name=eId]', `#${popupID}`).val();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
			let _eNm = $('input[name=eNm]', `#${popupID}`).val();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val();

			if(!self._utils.checkEmptyNull(_cuAmountSaleStart)) _cuAmountSaleStart = self._utils.getOnlyNumber(_cuAmountSaleStart);
			if(!self._utils.checkEmptyNull(_cuAmountBuyStart)) _cuAmountBuyStart = self._utils.getOnlyNumber(_cuAmountBuyStart);

			if( self._utils.checkRequired(`#${popupID}`)) {

				// 필수 항목 체크
				if(!_data.cuSeq) {
					alert('코드가 없어 수정불가합니다');
					return false;
				}
				
				let mapData = {
					cuSeq : _data.cuSeq,
					cuNm : _cuNm,
					cuOwnerNm : _cuOwnerNm,
					cuBizNo : _cuBizNo,
					cuBizNoNum : _cuBizNoNum,
					cuType : _cuType,
					cuZipcode : _cuZipcode,
					cuAddr : _cuAddr,
					cuAddrDetail : _cuAddrDetail,
					cuTel : _cuTel,
					cuDcRate : _cuDcRate,
					cuImportantYn : _cuImportantYn,
					cuMemo : _cuMemo,
					cuSignificant : _cuSignificant,
					cuFax : _cuFax,
					cuInvoiceEmail : _cuInvoiceEmail,
					cuUpjong : _cuUpjong,
					cuJongmok : _cuJongmok,
					cuBankNm : _cuBankNm,
					cuBankOwnerNm : _cuBankOwnerNm,
					cuAccount : _cuAccount,
					cuAmountSaleStart : _cuAmountSaleStart,
					cuAmountBuyStart : _cuAmountBuyStart,
					cuTypeCd : JSON.stringify(_cuTypeCd),
					employeeInfo : JSON.stringify({
						eId : _eId, 
						ePwd: _ePwd,
						eNm : _eNm,
						eTel : _eTel
					})
				}


				self.update(mapData, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$("body .btnClosePopLayer").trigger('click');
						alert('수정되었습니다.');
					} else {
						alert('수정에 실패하였습니다.');
					}
				});
			}

		}).text("수정");
	}

	employeeListEvent = (popupID, data) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		let $tbody = $('.employeeList tbody',$layerObject);
		self.employeeRetrieve($layerObject, data.cuSeq);
		$layerObject.data(data);
		$layerObject.on('click','.employeeCreate',function(){
			let $popDiv = $('template#customerEmployeeDetail');
			self._parent.openLayer($popDiv.html(), self.employeeDetailEvent, null, $layerObject);
		});
		$layerObject.on('click','.employeeDelete',function(){
			let $chkBoxs = $tbody.find("input[name=eSeq]:checked");
			if($chkBoxs.length==0){
				alert("삭제할 대상을 선택 하십시오");
				return;
			}else if($chkBoxs.length>1){
				alert("삭제는 1건씩 가능 합니다.");
				self._code.find("input[name=chckAll]").prop("checked", false);
				for(let i in $chkBoxs) {
					if ($chkBoxs[i].checked) {
						$chkBoxs[i].checked = false;
					}
				}
				return;
			}
			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let $tr = $($chkBoxs).closest('tr');
					let data = $tr.data("ROW");
					self.employeeDelete({eSeq : data.eSeq, cuSeq : data.cuSeq}, function(resp) {
						if(resp.code==0) {
							$tr.remove();
							alert('삭제되었습니다');
						} else {
							alert(resp.message);
						}
					});
				}
			});
		});
		
		$tbody.on('click', '.btnOpenInfo', function(){
			let _data = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#customerEmployeeDetail');
			self.employeeDetail({eSeq:_data.eSeq}, function(resp){
				if(resp.code == 0) {
					self._parent.openLayer($popDiv.html(), self.employeeDetailEvent, resp.data, $layerObject);
				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});

	}
	employeeDetailEvent = (popupID, d, $parentLayer) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		let cuSeq = $parentLayer.data().cuSeq;
		if(d!=undefined){
			self._utils.unSerializeObject($layerObject,d);
			$('select[name=eManagerYn]',$layerObject).val(d.eManagerYn);
			$('.title',$layerObject).text('직원수정');
			$('.employeeSave',$layerObject).text('수정');
			if(!self._utils.checkEmptyNull(d.eId)){
				$('input[name=eId]',$layerObject).attr('readonly',true).addClass('readonly');
				$('.btnChangePwd',$layerObject).show();
			} else {
				$('.btnChangePwd',$layerObject).hide();
			}
			$layerObject.data(d);

			$layerObject.on('change','select[name=eLoginYn]',function(){
				let v = $(this).val();
				if(v == 'Y'){
					if(d.eLoginYn == 'N') $('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).removeAttr('readonly').removeClass('readonly');
				}else{
					$('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).attr('readonly','readonly').addClass('readonly');
				}
			});

		}else{
			$('.title',$layerObject).text('직원등록');
			$('.employeeSave',$layerObject).text('등록');
			$('.btnChangePwd',$layerObject).hide();
			$layerObject.on('change','select[name=eLoginYn]',function(){
				let v = $(this).val();
				if(v == 'Y'){
					$('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).removeAttr('readonly').removeClass('readonly');
				}else{
					$('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).attr('readonly','readonly').addClass('readonly');
				}
			});
		}
		$layerObject.on('click','.btnChangePwd', function(e){
			let _ePwd = $('input[name=ePwd]',$layerObject).val();
			let _reEPwd = $('input[name=reEPwd]', $layerObject).val();
			if(_ePwd.trim() == ''){
				alert('비밀번호를 입력해 주세요');
				return false;
			}
			if(_ePwd != _reEPwd) {
				alert('비밀번호를 확인해 주세요');
				return false;
			}

			let mapData = {
				changepwd : 'N',
				eSeq : d.eSeq,
				ePwd : _ePwd
			}

			self.changepwd(mapData, function(resp){
				if(resp.code == 0) {
					$('input[name=ePwd], input[name=reEPwd]', $layerObject).val('');
					alert('변경되었습니다');
				} else {
					alert('변경 실패하였습니다');
				}
			});
		});


		$('select[name=eLoginYn]',$layerObject).trigger('change');

		self._utils.focusEvent($('input[name=eTel]', `#${popupID}`),'tel');
		
		$layerObject.on('click','.employeeSave', function(){
			let _eNm = $('input[name=eNm]', $layerObject).val();
			let _eTel = $('input[name=eTel]', $layerObject).val();
			let _eManagerYn = $('select[name=eManagerYn]', $layerObject).val();
			let _eLoginYn = $('select[name=eLoginYn]', $layerObject).val();
			let _eRank = $('input[name=eRank]', $layerObject).val();
			let _eTakeCharge = $('input[name=eTakeCharge]', $layerObject).val();
			let _ePwd = $('input[name=ePwd]', $layerObject).val();
			let _reEPwd = $('input[name=reEPwd]', $layerObject).val();
			let _eId = $('input[name=eId]', $layerObject).val();
			let _eMemo = $('textarea[name=eMemo]', $layerObject).val();
			if( self._utils.checkRequired($layerObject)) {
				let mapData = {
					cuSeq : cuSeq,
					eNm : _eNm,
					eTel : _eTel,
					eManagerYn : _eManagerYn,
					eLoginYn : _eLoginYn,
					eRank : _eRank,
					eTakeCharge : _eTakeCharge,
					eMemo : _eMemo,
				}
				if(d== undefined){
					if(_eLoginYn == 'Y'){
						if(_eId == ''){
							alert('아이디를 입력해 주세요');
							return false;
						/*}else if(_eId.indexOf('@') == -1){
							alert('아이디는 이메일 주소로 입력해 주세요');
							return false;
							*/
						}
						if(_ePwd == ''){
							alert('비밀번호를 입력해 주세요');
							return false;
						}
						if(_ePwd != "" && _ePwd != _reEPwd) {
							alert('비밀번호를 확인해 주세요');
							return false;
						}

						mapData.eId = _eId;
						mapData.ePwd = _ePwd;
					}
					self.employeeInsert(mapData, function(resp){
						if(resp.code==0) {
							$(".btnClosePopLayer", $layerObject).trigger('click');
							self.employeeRetrieve($parentLayer,cuSeq);
							alert('등록되었습니다.');
	
						} else {
							alert(resp.message);
						}
					});
				}else{
					mapData.eSeq = d.eSeq;
					if(_eLoginYn == 'Y'){
						if(d.eId!=undefined){
							_eId = d.eId;
							if(d.eLoginYn == 'N' && _ePwd == '') {
								alert('비밀번호를 입력해 주세요');
								return false;
							}
							if(_ePwd != '' && _ePwd != _reEPwd) {
								alert('비밀번호를 확인해 주세요');
								return false;
							}
						}else{
							if(_eId == ''){
								alert('아이디를 입력해 주세요');
								return false;
							/*}else if(_eId.indexOf('@') == -1){
								alert('아이디는 이메일 주소로 입력해 주세요');
								return false;
								*/
							}
							if(_ePwd == ''){
								alert('비밀번호를 입력해 주세요');
								return false;
							}
							if(_ePwd != "" && _ePwd != _reEPwd) {
								alert('비밀번호를 확인해 주세요');
								return false;
							}
						}
						mapData.eId = _eId;
						mapData.ePwd = _ePwd;
					}
					self.employeeUpdate(mapData, function(resp){
						if(resp.code==0) {
							$(".btnClosePopLayer", $layerObject).trigger('click');
							self.employeeRetrieve($parentLayer,cuSeq);
							alert('저장 되었습니다.');
	
						} else {
							alert(resp.message);
						}
					});
				}
				
			}
		});
	}

	employeeRetrieve = ($layerObject,cuSeq) => {
		const self = this;
		self.employeeList({cuSeq:cuSeq}, function(resp){
			if(resp.code == 0) {
				let $tbody = $('.employeeList tbody',$layerObject);
				$tbody.empty();
				for(let i=0;i<resp.data.length;i++){
					let d = resp.data[i];
					let $tr = $('<tr/>');
					$tr.append('<td><input type="checkbox" class="vm" name="eSeq" value="'+d.eSeq +'"/>');
					$tr.append('<td>'+ ((d.eManagerYn == 'Y')?'대표':'') +'</td>');
					$tr.append('<td>'+self._utils.nullTostring(d.eNm, '')+'</td>');
					$tr.append('<td>'+self._utils.nullTostring(d.eRank, '')+'</td>');
					$tr.append('<td>'+self._utils.formatPhoneNumber(d.eTel, '')+'</td>');
					$tr.append('<td>'+((d.eLoginYn == 'Y') ? '허용':'불가')+'</td>');
					$tr.append('<td>'+self._utils.nullTostring(d.eId, '')+'</td>');
					$tr.append('<td><i class="fa-solid fa-magnifying-glass cursorPointer btnOpenInfo" title="직원 정보 조회"></i></td>');
					$tr.data("ROW",d);
					$tr.appendTo($tbody);
				}	
			} else {
				alert('데이터를 불러올 수 없습니다');
				return false;
			}
		});
	}

	customerStockSettingEvent = (popupID, d, $parentLayer) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		let $leftDiv = $('div .f_lt');
		let $rightDiv = $('div .f_rt');
		let $leftTbody = $('.dataListTable tbody',$leftDiv);
		let $rightTbody = $('.dataListTable tbody',$rightDiv);
		let stockLinkList = [];

		$("input[name=chckAll]",$leftDiv).on("click",function(e){
			e.stopPropagation();
			let $boxs = $leftTbody.find("input[name=sSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<$boxs.length;i++){
				let $box = $($boxs[i]);
				if($box.is(":checked") != status) $box.trigger('click');
			}
		});

		$('.btnStockSearch',$leftDiv).on('click',function(){
			let v = $('input[name=sNm]',$leftDiv).val();
			if(v.trim() != ''){
				stockList(v);
			}
		});
		$('input[name=sNm]',$leftDiv).on('keypress',function(e){
			if(e.keyCode == 13) $('.btnStockSearch',$leftDiv).trigger('click');
		});

		$('.btnStockLinkCreate', $leftDiv).on('click',function(e){
			e.stopPropagation();
			let sSeqs = [];
			let chkBoxs = $("input[name=sSeq]:checked",$leftTbody);
			if(chkBoxs.length==0){
				alert("추가할 자재를 선택 하십시오");
				return;
			}else if(chkBoxs.length>0){
				for(let i=0;i<chkBoxs.length;i++){
					sSeqs.push($(chkBoxs[i]).val());
				}
				if(sSeqs.length>0){
					confirm('총 '+ self._utils.numberWithCommas(sSeqs.length) +'건의 자재를 추가하시겠습니까?', function(data){
						if(data) {
							let mapData = {ctl : 'customer',cmd : 'stockInsert', cuSeq : self._client.cuSeq, sSeqs : JSON.stringify(sSeqs)};
							let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code==0) {
									alert('등록 되었습니다.');
									for(let i=0;i<chkBoxs.length;i++){
										$(chkBoxs[i]).remove();
									}
									if($leftTbody.find('tr').length == 0){
										$leftTbody.append('<tr><td colspan="4" class="ac">데이타가 없습니다.</td></tr>');
									}
									customerStockList();
								} else {
									alert(rdata.message);
								}
							});
						}
					},'수급자재 추가');
				}
			}
		});
		$('.btnStockLinkDelete', $rightDiv).on('click',function(e){
			e.stopPropagation();
			let sSeqs = [];
			let chkBoxs = $("input[name=sSeq]:checked",$rightTbody);
			if(chkBoxs.length==0){
				alert("삭제할 자재를 선택 하십시오");
				return;
			}else if(chkBoxs.length>1){
				alert("삭제는 1건씩만 가능합니다.");
				return;
			}else{ 
				for(let i=0;i<chkBoxs.length;i++){
					sSeqs.push($(chkBoxs[i]).val());
				}
				if(sSeqs.length>0){

					confirm('삭제하시겠습니까?', function(data){
						if(data) {
							let mapData = {ctl : 'customer',cmd : 'stockDelete', cuSeq : self._client.cuSeq, sSeqs : JSON.stringify(sSeqs)};
							let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code==0) {
									alert('삭제 되었습니다.');
									customerStockList(function(){
										$('.btnStockSearch',$leftDiv).trigger('click');
									});
								} else {
									alert(rdata.message);
								}
							});
						}
					});
				}
			}
		});
		
		customerStockList();
		

		function customerStockList(cbfunc){
			$rightTbody.empty();
			stockLinkList = [];
			let mapData = {ctl : 'customer',cmd : 'stockList', cuSeq : self._client.cuSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let list = rdata.data;
					if(list.length> 0 ){
						for(let i=0; i< list.length; i++){
							let $tr = $('<tr />');
							$tr.append('<td class="ac"><input type="checkbox" name="sSeq" value="'+ list[i].sSeq +'"></td>');
							$tr.append('<td class="ac">'+ ((self._utils.checkEmptyNull(list[i].sCode))?'':list[i].sCode) +'</td>');
							$tr.append('<td class="al">'+ list[i].sNm +'</td>');
							$tr.append('<td class="al">'+ list[i].sStandard +'</td>');
							$tr.data("ROW", list[i]);
							$rightTbody.append($tr);
							stockLinkList.push(list[i].sSeq);
						}
					}else{
						$rightTbody.append('<tr><td colspan="4" class="ac">데이타가 없습니다.</td></tr>');
					}
					if(typeof cbfunc == 'function') cbfunc();
				} else {
					alert(rdata.message);
				}
			});
		}
		function stockList(sNm){
			let mapData = {ctl : 'stock',cmd : 'stockNmSearch', searchWord : sNm};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$leftTbody.empty();
					let list = rdata.data;
					if(list.length> 0 ){
						for(let i=0; i< list.length; i++){
							// 이미 등록된 자재는 목록에서 재외된다.
							
								let $tr = $('<tr />');
								if(stockLinkList.indexOf(list[i].sSeq) == -1 ){
									$tr.append('<td class="ac"><input type="checkbox" name="sSeq" value="'+ list[i].sSeq +'"></td>');
								}else{
									$tr.append('<td class="ac"></td>');
								}
								$tr.append('<td class="ac">'+ list[i].sCode +'</td>');
								$tr.append('<td class="al">'+ list[i].sNm +'</td>');
								$tr.append('<td class="al">'+ list[i].sStandard +'</td>');
								$tr.data("ROW", list[i]);
								$leftTbody.append($tr);

						}
						if($leftTbody.find('tr').length == 0){
							$leftTbody.append('<tr><td colspan="4" class="ac">추가할 자재 데이타가 없습니다.</td></tr>');
						}
					}else{
						$leftTbody.append('<tr><td colspan="4" class="ac">데이타가 없습니다.</td></tr>');
					}
				} else {
					alert(rdata.message);
				}
			});
		}
	}

	excelUploadEvent = (popupID) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		$('.btnExcelDocDown',$layerObject).on('click',function(){

			const element = document.createElement('a');
			element.setAttribute('href', __FILE_DOMIN + '/doc/customerDoc20250121.xlsx');
			element.setAttribute('download', '고객사등록양식.xlsx');
			element.click();
			$(element).remove();
			
		});
		$('.btnAddFile', $layerObject).on('click', function(e){
			e.preventDefault();
			  $('input[name=excelFile]', $layerObject).trigger('click');
		});
		$("input[name=excelFile]", $layerObject).on("change", function(event) {
			let file = event.target.files[0];
			let maxSize =  1024 * 1024 * 2;
			if(file.size >  maxSize){
				alert('최대 '+ self._utils.bytesToSize(maxSize) +' 까지만 가능 합니다.\n파일용량 :'+ self._utils.bytesToSize(file.size) )
				delete event.target.files;
				return false;
			}
			$('.addFileName', $layerObject).text(file.name);
		});
		$('.btnExcelInsert',$layerObject).on('click',function(){
			let files = $('input[name=excelFile]',$layerObject)[0].files;
			if(files.length == 0){
				alert('파일을 선택하십시요');
			}else{
				const wb = new ExcelJS.Workbook();
				const reader = new FileReader()
				let excelData = [];
				reader.readAsArrayBuffer(files[0])
				reader.onload = () => {
					const buffer = reader.result;
					wb.xlsx.load(buffer).then(workbook => {
						const sheet = workbook.getWorksheet(1);
						sheet.eachRow((row, rowIndex) => {
							if(rowIndex >= 3) excelData.push(row.values);
						});
						console.log(excelData);
						customerInsert(excelData);

					});
				}
			}
		});

		function customerInsert(data) {
			if(data.length == 0){
				alert("등록할 고객사 정보가 없습니다.");
				return;
			}
			//let $popDiv = $('template#progress');
			//self._parent.openLayer($popDiv.html(), self.employeeListEvent);

			for(let i=0;i<data.length;i++){
				let d = data[i];
				let _cuTypeCd = [];
				if(d[1] == 'Y') _cuTypeCd.push('A')
				if(d[2] == 'Y') _cuTypeCd.push('B')
				if(d[3] == 'Y') _cuTypeCd.push('C')
				let mapData = {
					ctl : 'customer',
					cmd : 'insert',
					cuType : 		d[4],
					cuNm : 			d[5],
					cuOwnerNm :		d[6],
					cuBizNo : 		d[7],
					cuBizNoNum : 	d[8],
					cuTel : 		d[9],
					cuFax : 		d[10],
					cuInvoiceEmail: d[11],
					cuUpjong : 		d[12],
					cuJongmok : 	d[13],
					cuZipcode : 	d[14],
					cuAddr : 		d[15],
					cuAddrDetail : 	d[16],
					cuBankNm : 		d[17],
					cuBankOwnerNm : d[18],
					cuAccount : 	d[19],
					cuTypeCd : JSON.stringify(_cuTypeCd),
				}

				let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true, isasync:false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						data[i].result = rdata.message;
					} else {
						data[i].result = rdata.message;
					}
				});
			}
			alert('등록되었습니다.');
			$('.btnClosePopLayer',$layerObject).trigger('click');
			excelUploadResultDownload(data);
		}

		function excelUploadResultDownload(resp){
			//let self = this;
			const workbook = new ExcelJS.Workbook();
			let fileName = '고객사 등록 결과 ';
			const sheet = workbook.addWorksheet(fileName);


			let columnInfos = [];
			columnInfos.push({name:"고객사",key:"1",width:10,align:'center'});
			columnInfos.push({name:"외주사",key:"2",width:10,align:'center'});
			columnInfos.push({name:"자재사",key:"3",width:10,align:'center'});
			columnInfos.push({name:"기업형태",key:"4",width:10,align:'center'});
			columnInfos.push({name:"업체명",key:"5",width:25,align:'left'});
			columnInfos.push({name:"대표자",key:"6",width:15,align:'center'});
			columnInfos.push({name:"사업자번호",key:"7",width:15,align:'center'});
			columnInfos.push({name:"종번호",key:"8",width:15,align:'center'});
			columnInfos.push({name:"대표전화번호",key:"9",width:15,align:'center'});
			columnInfos.push({name:"FAX",key:"10",width:15,align:'rigth'});
			columnInfos.push({name:"대표메일",key:"11",width:25,align:'left'});
			columnInfos.push({name:"업태",key:"12",width:25,align:'left'});
			columnInfos.push({name:"종목",key:"13",width:25,align:'left'});
			columnInfos.push({name:"우편번호",key:"14",width:10,align:'center'});
			columnInfos.push({name:"기본주소",key:"15",width:30,align:'left'});
			columnInfos.push({name:"상세주소",key:"16",width:20,align:'left'});
			columnInfos.push({name:"은행명",key:"17",width:15,align:'center'});
			columnInfos.push({name:"소유주",key:"18",width:15,align:'center'});
			columnInfos.push({name:"계좌번호",key:"19",width:20,align:'center'});
			columnInfos.push({name:"등록결과",key:"result",width:40,align:'left'});

			
			let header = [];
			for(let c in columnInfos) header.push(columnInfos[c].name);
			let headerRow = sheet.addRow(header);
			headerRow.eachCell((cell, colNum) => {
				self._utils.excelStyleHeaderCell(cell);
				sheet.getColumn(colNum).width = columnInfos[colNum - 1].width;
			});

			for(let i in resp){
				let rowData = [];
				for(let c in columnInfos){	rowData.push(resp[i][columnInfos[c].key]?resp[i][columnInfos[c].key]:'');	}
				let row = sheet.addRow(rowData);
				row.eachCell((cell, colNum) => {self._utils.excelStyleDataCell(cell,columnInfos[colNum - 1].align); });
			}
	
			self._utils.excelDownload(workbook, fileName + '('+ self._utils.currentDateTime()+')').then(r => {});
		}

	}
	employeeList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'list',
			rows : 9999
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	employeeDetail = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'load',
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	employeeInsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	employeeUpdate = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	employeeDelete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	changepwd = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'pwdChange'
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
			ctl : 'customer',
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
export default customerController