
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let stockController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._mainPopID = null;
		this._isSave = false;
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
			let $popDiv = $('template#purchaseViewDiv');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);

			e.stopPropagation();
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});
		
		self._code.find(".btnStockInput").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=puSeq]:checked");
			let puSeqs = [];
			if(chkBoxs.length==0){
				alert("입고처리할 대상을 선택 하십시오");
				return;
			}else if(chkBoxs.length>0){
				for(let i=0;i<chkBoxs.length; i++) {
					let d = $(chkBoxs[i]).closest('tr').data('ROW');
/*					if(d.puSendYn == 'N'){
						alert("발주되지 않은 발주서가 있습니다.");
						return;
					}
*/						
					puSeqs.push(d.puSeq);
				}
			}
			let mapData = {ctl : 'stock',cmd : 'purchaseItemList'};
			mapData.puSeqs = JSON.stringify(puSeqs);
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let $popDiv = $('template#purchaseStockInsertDiv');
					self._parent.openLayer($popDiv.html(),self.purchaseStockInsertEvent,rdata.data);
				} else {
					alert(rdata.message);
				}
			});
		});
		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=puSeq]:checked");
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
			let d = $(chkBoxs).closest('tr').data('ROW');
			if(d.puSendYn == 'Y'){
				alert("발주된 대상은 삭제 할수 없습니다.");
				return;
			}
			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let puSeq = chkBoxs.val();

					self.delete({puSeq : puSeq}, function(resp) {
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
			let boxs = tbody.find("input[name=eqSeq]"); 
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
		let tbody = self._code.find(".dataListTable");
		
		searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});
		/*
		let mapData = {ctl : 'stock',cmd : 'typeList', stKind : 'A', isOnlyType : true,useYn :'Y'};
		let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $stSeq = $('select[name=stSeq]', searchWrap);
				for(let i=0;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let $opt = $('<option />');
					$opt.val(d.stSeq).text(d.stNm);
					$stSeq.append($opt);
				}
			} else {
				alert(rdata.message);
			}
		});
		*/
		/*
		mapData = {ctl : 'place',cmd : 'nmList', cpType :'B', useYn : 'Y'};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api2.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $cpSeq = $('select[name=cpSeq]',searchWrap);
				let data = rdata.data;
				for(let i=0;i<data.length;i++){
					let d = rdata.data[i];
					let $opt = $('<option />');
					$opt.val(d.cpSeq).text(d.cpNm);
					$cpSeq.append($opt);
				}
			} else {
				alert(rdata.message);
			}
		});
		*/
		$('input[name=searchWord]',searchWrap).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term, cuTypeCd : 'C'};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm};
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
		$('input[name=sNm]',searchWrap).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockNmSearch', nmOnly: 'Y', searchWord : this.term};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							let r = {}
							if(!self._utils.checkEmptyNull(v.sCode)){
								r.label = '['+ v.sCode +'] '+ v.sNm;
							}else{
								r.label = v.sNm;
							}
							r.value = v.sNm;
							return r;
							//return {label:v.sNm, value:v.sNm};
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

		searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -3)));
		searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(new Date()));

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


		tbody.on('click','.btnOpenInfo', function(){
			let _data = $(this).closest('tr').data('ROW');
			if(_data.sioHoldYn == 'Y'){
				alert('마감된 데이터 입니다.');
				return false;
			}
			if(_data.sioAdjustYn == 'Y'){
				alert('재고 조정 데이터 입니다.');
				return false;
			}
			// 고객사 데이터를 먼저 읽어온다
			//self._client = {};
			self.load({puSeq:_data.puSeq}, function(resp){
				if(resp.code == 0) {
					let $popDiv = $('template#purchaseViewDiv');
					self._parent.openLayer($popDiv.html(),self.reloadLayer,resp.data);
				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});

		self.retrieve();
	}

	purge = () => {
		const self = this;

		console.log("equipmentController purge");
	}

	reload = () => {
		const self = this;

		console.log("equipmentController reload");
	}

	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}
	searchData = () =>{
		let self = this;
		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();
		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let searchColumn = searchWrap.find("select[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let sNm = searchWrap.find("input[name=sNm]").val();
		let cpSeq = searchWrap.find("select[name=cpSeq]").val();
		let skCd = searchWrap.find("select[name=skCd]").val();
		let stSeq = searchWrap.find("select[name=stSeq]").val();
		let safeWarning = searchWrap.find("input[name=safeWarning]:checked").val()??'N';

		return{
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'cuNm',
			searchWord : searchWord,
			sNm : sNm,
			startDt : startDt,
			endDt : endDt,
			cpSeq : cpSeq,
			stSeq : stSeq,
			skCd : skCd,
			safeWarning : safeWarning
		}
	}
	retrieve = () => {
		const self = this;

		let searchData = self.searchData();
		let searchWrap = self._code.find(".searchWrapArea");
		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

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
						$('.totalPrice',searchWrap).text(self._utils.numberWithCommas(resp[i].totalPrice));
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
		let itemNmTag = '';

		for(let i=0;i<d.itemInfo.length;i++){
			itemNmTag += '<span class="workOptionListOne vm" style="padding:0px !important; margin-bottom:0px !important;"><strong class="workOptionInfo">'+ d.itemInfo[i].sNm + (!self._utils.checkEmptyNull(d.itemInfo[i].sStandard)? '('+d.itemInfo[i].sStandard +')':'')+' : <span style="font-weight: bold;">'+ d.itemInfo[i].puiCnt +' 개</span></strong></span>';
		}
		let $tr = $('<tr />');
		$tr.append($('<td style="border:1px solid #dedede;"><input type="checkbox" class="vm" name="puSeq" value="'+d.puSeq+'"></td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al">'+d.cuNm+'</td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al workOptionListDiv vm">'+ itemNmTag +'</td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(self._utils.nullTostring(d.cpNm, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac">'+((d.puHopeDt!=undefined)?self._utils.dateformatStringToDate(d.puHopeDt):'')+'</td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac" />').append((d.puSendDate!=undefined)? d.puSendDate.substring(0,16):''));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac" />').append(self._utils.nullTostring(d.puSendENm, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac" />').append(d.eNm));
		$tr.append($('<td style="border:1px solid #dedede;">'+d.creDate.substring(0,16)+'</td>'));;
		$tr.append($('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="조회" style="font-size:14px;"></i></td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
	
	}

	

	// popupview

	layerViewEvent = ($layerObject, info) =>{ 
		const self = this;
		self._utils.focusEvent($('input[name=puInchargeTel]',$layerObject),'tel');
		self._utils.focusEvent($('input[name=puiCnt]',$layerObject),'comma', null, function(d){
			let puiPrice = $('input[name=puiPrice]',$layerObject).val();
			d = self._utils.convertNumber(d);
			puiPrice = self._utils.convertNumber(puiPrice);
			$('input[name=puiTotalPrice]',$layerObject).val(self._utils.numberWithCommas(d * puiPrice));
		});
		self._utils.focusEvent($('input[name=puiPrice]',$layerObject),'tel', null, function(d){
			let puiCnt = $('input[name=puiCnt]',$layerObject).val();
			d = self._utils.convertNumber(d);
			puiCnt = self._utils.convertNumber(puiCnt);
			$('input[name=puiTotalPrice]',$layerObject).val(self._utils.numberWithCommas(d * puiCnt));
		});
		let $tbody = $('.dataListTable tbody', $layerObject);
		let $stockInfo = $('.stockInfo',$layerObject);
		$('input[name=puiCnt]',$stockInfo).on('focus',function(){
			let v = $(this).val();
			if(v== '0') v = '';
			$(this).val(v);
		})

		$('.companyList', $layerObject).on('click', function(e){
			let cuSeq = $('input[name=cuSeq]',$layerObject).val();
			if(self._utils.checkEmptyNull(cuSeq)){
				alert('거래처를 먼저 검색하십시요');
				return;
			}
			let mapData = {ctl : 'stock',cmd : 'companyList',cuSeq : cuSeq,};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let $popDiv = $('template#purchaseCompanyListDiv');
					self._parent.openLayer($popDiv.html(),self.companyStockChoceEvent,rdata.data, $tbody);
					e.stopPropagation();
				}
			});
		});

		$('.typeList',$layerObject).on('click',function(e){
			let mapData = {ctl : 'stock',cmd : 'typeList', stKind : 'A', isOnlyType : true,useYn :'Y'};
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let $popDiv = $('template#purchaseTypeListDiv');
					self._parent.openLayer($popDiv.html(),self.typeStockChoceEvent,rdata.data, $tbody);
					e.stopPropagation();
				} else {
					alert(rdata.message);
				}
			});
			
		});
		$('.categoryList',$layerObject).on('click',function(e){
			let mapData = {ctl : 'stock',cmd : 'categoryTreeList', };
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let $popDiv = $('template#purchaseCategoryListDiv');
					self._parent.openLayer($popDiv.html(),self.categoryStockChoceEvent,rdata.data, $tbody);
					e.stopPropagation();
				} else {
					alert(rdata.message);
				}
			});
			
		});
		
		$layerObject.find('input[name=cuNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,cuTypeCd : 'C'};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
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
				$( 'input[name=cuSeq]', $layerObject).val(ui.item.cuSeq);
				let mapData = {ctl : 'employee',cmd : 'list',cuSeq : ui.item.cuSeq};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						if(rdata.data.length> 0){
							$( 'input[name=puInchargeNm]', $layerObject).val(rdata.data[0].eNm);
							if(!self._utils.checkEmptyNull(rdata.data[0].eTel)){
								$( 'input[name=puInchargeTel]', $layerObject).val(self._utils.formatPhoneNumber(rdata.data[0].eTel));
							}
						}
					} else {
						alert(rdata.message);
					}
				});
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});

		$layerObject.find('input[name=cpNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'place',cmd : 'nmList', cpType :'B', rows:9999};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cpNm, value:v.cpNm, cpSeq:v.cpSeq};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=cpSeq]', $layerObject).val(ui.item.cpSeq);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});

		$('input[name=sNm]',$layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockNmSearch', searchWord : this.term};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							let r = {}
							if(!self._utils.checkEmptyNull(v.sCode)){
								r.label = '['+ v.sCode +'] '+ v.sNm + ((!self._utils.checkEmptyNull(v.sStandard)) ?'('+v.sStandard+')':'');
							}else{
								r.label = v.sNm + ((!self._utils.checkEmptyNull(v.sStandard)) ?'('+v.sStandard+')':'');
							}
							r.value = v.sNm;
							r.sSeq = v.sSeq;
							r.sStandard = v.sStandard;
							sPrice : v.sPrice
							return r;

							//return {label:v.sNm + ((!self._utils.checkEmptyNull(v.sStandard)) ?'('+v.sStandard+')':''), value:v.sNm, sSeq:v.sSeq, sStandard : v.sStandard, sPrice : v.sPrice};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$('input[name=sSeq]', $stockInfo).val(ui.item.sSeq);
				$( 'input[name=sStandard]', $stockInfo).val(ui.item.sStandard);
				$( 'input[name=puiPrice]', $stockInfo).val(self._utils.numberWithCommas(ui.item.sPrice));
				$('input[name=puiCnt]', $stockInfo).trigger('focus');
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});


		$('.fa-solid.fa-square-plus',$layerObject).on('click',function(){
			let $trs = $('tr',$tbody);
			let d = self._utils.serializeObject($stockInfo);
			if(self._utils.checkEmptyNull(d.sSeq)){
				alert('발주할 자재를 선택 입력 하십시요');
				return;
			}
			if(self._utils.checkEmptyNull(d.puiCnt) || d.puiCnt == 0){
				alert('발주할 자재 수량을 입력 하십시요');
				return;
			}
/*			for(let i=0;i<$trs.length;i++){
				let rdata = $($trs[i]).data("ROW");
				if(rdata.sSeq == d.sSeq){
					alert('자재가 중복되었습니다.');
					return;
				}
			}
*/				
			d.puiCnt = d.puiCnt ?? 0;
			d.puiPrice = d.puiPrice ?? 0;
			d.puiCnt = self._utils.convertNumber(d.puiCnt);
			d.puiPrice = self._utils.convertNumber(d.puiPrice);
			self.stockAdd($tbody, d);
			let $objs = $('input,select',$stockInfo);
			for(let i=0;i<$objs.length;i++) $($objs[i]).val('');
		});

		$tbody.on('click','.editClick', function(e){
			let $tr = $(this).closest('tr');
			let d = $tr.data('ROW');
			d.index = $tr.index();
			self._utils.unSerializeObject($stockInfo, d);
			$('input[name=puiPrice]',$stockInfo).val(self._utils.numberWithCommas(d.puiPrice));
			$('input[name=puiCnt]',$stockInfo).val(self._utils.numberWithCommas(d.puiCnt));
			$('input[name=puiTotalPrice]',$stockInfo).val(self._utils.numberWithCommas(d.puiTotalPrice));
		});
		$tbody.on('click','.fa-solid.fa-square-minus',function(){
			let $tr = $(this).closest('tr');
			confirm('삭제 하시겠습니까?',function(is){
				if(is){
					$tr.remove();
				}
			});
		});
		if(info != undefined){
			if(info.itemInfo.length > 0){
				for(let i=0;i<info.itemInfo.length;i++){
					self.stockAdd($tbody, info.itemInfo[i]);
				}
			}
		}

		$(`.save`,$layerObject).on('click', function(e){
			let orgData = $layerObject.data();
			let data = self._utils.serializeObject($layerObject);
			let $trs = $('tr', $tbody);
			let stockInfo = [];
			let cuNm = $('input[name=cuNm]',$layerObject).val();
			let cuSeq = $('input[name=cuSeq]',$layerObject).val();
			if(cuNm != '' && cuSeq == ''){
				alert('등록된 거래처를 입력하십시요');
				return;
			}
			if(data.cpSeq == ''){
				alert('납품장소를 선택하여 입력하십시요');
				return;
			}
			for(let i=0;i<$trs.length;i++){
				let d = $($trs[i]).data("ROW");
				d.sort = i+1;
				if(self._utils.checkEmptyNull(d.puiCnt) || d.puiCnt == 0){
					alert(d.sNm +' 수량을 입력하십시요');
					return;
				}
				if(d != undefined && d.sSeq != undefined){
					stockInfo.push(d);
				}
			}
			if(stockInfo.length == 0){
				alert('발주할 자재를 등록 하십시요');
				return;
			}
			if( orgData.puSeq != undefined){
				data.puSeq = orgData.puSeq;
			}
			data.itemInfo = JSON.stringify(stockInfo);
			if( self._utils.checkRequired($layerObject)) {
				if(data.puSeq == undefined){
					self.insert(data, function(resp){
						if(resp.code==0) {
							self.retrieve();
							$(`.btnClosePopLayer`,$layerObject).trigger('click');
							alert('등록 되었습니다.');
						} else {
							alert(resp.message);
						}
					});
				}else{
					self.update(data, function(resp){ 
						if(resp.code==0) {
							self.retrieve();
							$(`.btnClosePopLayer`,$layerObject).trigger('click');
							alert('수정되었습니다.');
						} else {
							alert(resp.message);
						}
					});
				}
			}

		});

	}
	
	stockAdd = ($tbody, d) => {
		let self = this;
		let $trs = $('tr',$tbody);
		if(self._utils.checkEmptyNull(d.index) && d.index != '0'){
			for(let i=0;i<$trs.length;i++){
				let rdata = $($trs[i]).data("ROW");
				if(rdata.sSeq == d.sSeq){
					alert('자재가 중복되었습니다.');
					return false;
				}
			}
			let $tr = $('<tr />');
			$tr.append($('<td class="al editClick cursorPointer">'+ d.sNm +'</td>'));
			$tr.append($('<td class="al editClick cursorPointer">'+ d.sStandard +'</td>'));
			$tr.append($('<td class="ar editClick cursorPointer">'+ self._utils.numberWithCommas(d.puiPrice) +'</td>'));
			$tr.append($('<td class="ar editClick cursorPointer">'+ self._utils.numberWithCommas(d.puiCnt) +'</td>'));
			$tr.append($('<td class="ar editClick cursorPointer">'+ self._utils.numberWithCommas(d.puiCnt * d.puiPrice) +'</td>'));
			$tr.append($('<td class="al editClick cursorPointer">'+ self._utils.nullTostring(d.puiMemo,'') +'</td>'));
			$tr.append($('<td class="ac" style="padding:0px;"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tbody.append($tr.data("ROW",d));
			self._utils.tableScrollCheck();
		}else{
			let $tr = $('tr:eq('+d.index+')',$tbody);
			let $tds = $('td',$tr);
			$($tds[2]).empty().append(self._utils.numberWithCommas(d.puiPrice));
			$($tds[3]).empty().append(self._utils.numberWithCommas(d.puiCnt));
			$($tds[4]).empty().append(self._utils.numberWithCommas(d.puiCnt * d.puiPrice));
			$($tds[5]).empty().append(self._utils.nullTostring(d.puiMemo,''));
			$tr.data("ROW",d);
		}

		self._isSave = false;
		return true;
	}
	initNewLayer = (popupID) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.save`,$layerObject).text("등록");
		$('.creInfo',$layerObject).remove();
		$('.mail',$layerObject).remove();
		$('.fax',$layerObject).remove();
		$('.print',$layerObject).remove();
		self.layerViewEvent($layerObject);
		self._isSave = false;
	}
	reloadLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text('['+ data.cuNm +']발주 수정');
		$(`.save`,$layerObject).text('수정');
		$layerObject.data(data);
		self._utils.unSerializeObject($layerObject, data);
		self._utils.classNameInput($layerObject, data);
		self.layerViewEvent($layerObject,data);
		self._isSave = true;
		window.jsPDF = window.jspdf.jsPDF;

		let $mail = $('.mail',$layerObject);
		let $fax = $('.fax',$layerObject);
		let $print = $('.print',$layerObject);
		

		$fax.on('click',function(){
			if(!self._isSave){
				alert('발주 내역을 저장 후 다시 진행해 주십시요');
				return false;
			}
			/*
			if(self._parent._companyInfo.cPopbillYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px;font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여 popbill 연동신청을 진행하세요</div>', '연동 신청이 안되어 있습니다.');
				return false;
			}else if(self._parent._companyInfo.cFaxApplyYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px;font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여  FAX 발신번호를 등록하십시오</div>', '팩스번호 발신번호 승인이 안되어 있습니다.');
				//alert('\n');
				return false;
			}
			*/
			let data = $layerObject.data();
			let dt = self._utils.currentDate().replace(/-/g,'');
			printLoad(data, function($area){
				self._utils.showLoading();
				let $page = $('page',$area);
				for(let i=0;i<$page.length;i++){
					//var doc = new jsPDF($page[i]);
					//var element = document.getElementById('pdf_canvas');
					$('.workDetailArea',$page[i]).css('height','725px');
					var element = $page[i];

					html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
						// 캔버스를 이미지로 변환
						let imgData = canvas.toDataURL('image/png')
						let imgWidth = 190 // 이미지 가로 길이(mm)
						let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
						let imgHeight = canvas.height * imgWidth / canvas.width
						let heightLeft = imgHeight
						let margin = 10 // 출력 페이지 여백설정
						let doc = new jsPDF('p', 'mm')
						let position = 10
						let info = self._parent._companyInfo;
		
						info.files = [];
						window.scrollTo(0, 0)
		
						//첫 페이지 출력
						doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined,'FAST');
						heightLeft -= pageHeight
		
						//한 페이지 이상일 경우 루프 돌면서 출력
						while (heightLeft >= 20) {
							position = heightLeft - imgHeight
							position = position - 20
							doc.addPage()
							doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight,undefined,'FAST');
							heightLeft -= pageHeight
						}
						
						let file = {}
						info.eTitle = $('.cuNm',$(element)).text()+' 발주서 ';
						file.filename = info.cNm + '_'+ $('.cuNm',$(element)).text()+' 발주서_'+ dt +'.pdf';
						file.content = doc.output('datauristring');
						file.encoding = 'base64';
						file.size = file.content.length;

						info.files.push(file);
						info.puSeq = data.puSeq;
						info.cuFax = data.cuFax;
						info.cuNm = data.cuNm;

						let $popDiv = $('template#purchaseFax');
						self._parent.openLayer($popDiv.html(),self.purchaseFaxEvent,info);
						self._utils.hideLoading();
					});
				}
			});
		});

		$mail.on('click',function(){
			if(!self._isSave){
				alert('발주 내역을 저장 후 다시 진행해 주십시요');
				return false;
			}
			if(self._parent._companyInfo.cMailYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px; font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여 메일 연동 정보를 등록하십시오</div>', '메일발송 설정이 필요합니다.');
				return false;
			}
			let data = $layerObject.data();
			let dt = self._utils.currentDate().replace(/-/g,'');
			printLoad(data, function($area){
				let $page = $('page',$area);
				for(let i=0;i<$page.length;i++){
					//var doc = new jsPDF($page[i]);
					//var element = document.getElementById('pdf_canvas');
					//$('.workDetailArea',$page[i]).css('height','725px');
					let element = $page[i];
					self._utils.showLoading();
					html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
						// 캔버스를 이미지로 변환
						let imgData = canvas.toDataURL('image/png')
						let imgWidth = 190 // 이미지 가로 길이(mm)
						let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
						let imgHeight =  277; //canvas.height * imgWidth / canvas.width
						let heightLeft = imgHeight
						let margin = 10 // 출력 페이지 여백설정
						let doc = new jsPDF('p', 'mm')
						let position = 10
						let info = self._parent._companyInfo;
		
						info.files = [];
						window.scrollTo(0, 0)
		
						//첫 페이지 출력
						doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined,'FAST');
						heightLeft -= pageHeight
		
						//한 페이지 이상일 경우 루프 돌면서 출력
						while (heightLeft >= 20) {
							position = heightLeft - imgHeight
							position = position - 20
							doc.addPage()
							doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight,undefined,'FAST');
							heightLeft -= pageHeight
						}
		
						// PDF를 새탭으로 열기
						//window.open(doc.output('bloburl'));
						//console.log(doc.output('datauristring'));
						
						let file = {}
						info.eTitle = $('.cuNm',$(element)).text()+' 발주서 ';
						file.filename = self._parent._companyInfo.cNm + '_'+ $('.cuNm',$(element)).text()+' 발주서_'+ dt +'.pdf';
						file.content = doc.output('datauristring');
						file.encoding = 'base64';
						file.size = file.content.length;

						info.files.push(file);
						info.cuInvoiceEmail = data.cuInvoiceEmail;
						info.puSeq = data.puSeq;
						let $popDiv = $('template#purchaseSendMail');
						self._parent.openLayer($popDiv.html(),self.purchaseMailEvent,info);
						
						self._utils.hideLoading();
						
						// PDF를 바로 다운로드
						//doc.save('sample.pdf');

					});
				}
			});
		});
		$print.on('click', function(){

			if(!self._isSave){
				alert('발주 내역을 저장 후 다시 진행해 주십시요');
				return false;
			}

			let data = $layerObject.data();
			printLoad(data, function($area){
				let $printA4 = $('.printA4',$area);
				$($printA4).print({
					addGlobalStyles: true,
					stylesheet: null,
					rejectWindow: true,
					noPrintSelector: ".no-print",
					iframe: true,
					append: null,
					prepend: null,
					timeout: 5000,
				});
				
			});
			if(data.puSendYn != 'Y'){
				setTimeout(function(){
					confirm('발주서 발송 처리 하시겠습니까',function(is){
						if(is){
							let mapData = {ctl : 'stock',cmd : 'purchaseSendUpdate',puSeq : data.puSeq,puSendType:'print',puSendYn:'Y'};
							let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
							_api2.ajaxformdata(function(rdata){ 
								if(rdata.code != 0){
									toast('발송 기록에 실패 하였습니다.');
								}
							});
						}
					},'발송처리');
				}, 2000);
			}		
		});
		
		function printLoad(info, func){
			let $purchaseDoc = $("template#purchaseDoc");
			let $printWrap = $("#printWrap");
			$printWrap.empty();
			$printWrap.append($purchaseDoc.html());
			let check = false;
			let comInfo = self._parent._companyInfo;
			let mapData = {
				ctl : 'media',
				cmd : 'downloadBase64'
			}
			$.extend(mapData,{fileSeq:comInfo.fileInfo[0].fileSeq});
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					$('.companyLogo', $printWrap).append('<img src="data:application/octet-stream;base64,' + rdata.data +'" alt="">');
					check = true;
				}
			});
			
			let $companyInfo = $('.companyInfo',$printWrap);
			self._utils.classNameInput($companyInfo,comInfo);
			$('.cTel', $companyInfo).text(self._utils.formatPhoneNumber(comInfo.cTel));
			$('.cBizNo', $companyInfo).text(self._utils.convertBizNo(comInfo.cBizNo));

			let $customerInfo = $('.customerInfo',$printWrap);
			self._utils.classNameInput($customerInfo,info);
			$('.puInchargeTel', $customerInfo).text((info.puInchargeTel == undefined) ? '' : self._utils.formatPhoneNumber(info.puInchargeTel));
			$('.puHopeDt', $customerInfo).text((info.puHopeDt == undefined) ? '': self._utils.dateformatStringToDate(info.puHopeDt));
			$('.puSendDt', $customerInfo).text(self._utils.dateformatCurrentYYYYMMDD('-'));
			$('.cpNm', $customerInfo).text(comInfo.cNm +' '+ info.cpNm);

			let $stockInfo = $('.stockInfo',$printWrap);
			let $trOrg = $('tr',$stockInfo).clone();
			$stockInfo.empty();
			let i = 0;
			let maxCnt = 23;
			for(;i<info.itemInfo.length;i++){
				let $tr = $trOrg.clone();
				let item = info.itemInfo[i];
				self._utils.classNameInput($tr,item);
				$('.rowNo',$tr).text(i+1);
				$('.puiCnt',$tr).text(self._utils.numberWithCommas(item.puiCnt));
				//$('.puiPrice',$tr).text(self._utils.numberWithCommas(item.puiPrice));
				$('.puiPrice',$tr).text('');
				
				if(maxCnt <= i && i == (info.itemInfo.length-1)){
					$('td',$tr).css({'border-bottom':'1px solid #000'});
				}
				$stockInfo.append($tr);	
				
			}
			for(;i<=maxCnt;i++){	
				let $tr = $trOrg.clone();
				if(maxCnt == i){
					$('td',$tr).css({'border-bottom':'1px solid #000'});
				}
				$stockInfo.append($tr);
			}
			setTimeout(function(){
				let max = 999999;
				for(let i=0;i<max;i++){
					if(check){
						func($printWrap);
						break;
					}
				}
			},2000);
		}

	}
	companyStockChoceEvent = (popupID, data, $tbody) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text('자재 목록');
		$(`.save`,$layerObject).text('적용');

		let $stockList = $('.stockList',$layerObject);
		let i=0;
		for(;i<data.length;i++){
			let d = data[i];
			let $tr = $('<tr />');
			$tr.append('<td class="ac" style="background: #fff;"><input type="checkbox" name="sSeq" value="'+ d.sNm +'"></td>');
			$tr.append('<td class="al" style="background: #fff;">'+ d.sNm +'</td>');
			$tr.append('<td class="ac" style="background: #fff;">'+ d.sStandard +'</td>');
			$tr.append('<td class="ar" style="background: #fff;">'+ self._utils.numberWithCommas(d.sPrice) +'</td>');
			$tr.append('<td class="ar" style="background: #fff;padding-right:10px !important;">'+ self._utils.numberWithCommas(d.sCnt) +'</td>');
			$stockList.append($tr.data("ROW", d));
		}
		for(;i<7;i++){
			let $tr = $('<tr />');
			$tr.append('<td class="ac" colspan="5" style="background: #fff;"></td>');
			$stockList.append($tr);
		}

		$(`.btnApply`,$layerObject).on('click', function(e){
			let $chkBoxs = $layerObject.find("input[name=sSeq]:checked");
			if($chkBoxs.length==0){
				alert("추가할 대상을 선택 하십시오");
				return;
			}
			for(let i=0;i<$chkBoxs.length;i++) {
				if ($chkBoxs[i].checked) {
					let $tr = $($chkBoxs[i]).closest('tr');
					let d = $tr.data('ROW');
					d.puiCnt = 0;
					d.puiPrice = d.sPrice;
					if(!self.stockAdd($tbody, d)){
						alert("추가할 대상이 중복됩니다.");
						return
					};
				}
			}
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});
	}

	typeStockChoceEvent = (popupID, data, $tbody) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text('자재 목록');
		$(`.save`,$layerObject).text('적용');

		let $stSeq = $('select[name=stSeq]', $layerObject);
		let $stockList = $('.stockList',$layerObject);
		for(let i=0;i<data.length;i++){
			$stSeq.append('<option value="'+ data[i].stSeq +'"'+((i==0)?' selected':'')+'>'+ data[i].stNm +'</option>');
		}

		$stSeq.on('change', function(){
			let stSeq = $(this).val();
			let mapData = {
				ctl : 'stock',
				cmd : 'typeLinkList',
				stSeq : stSeq
			}
			$stockList.empty();
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let i=0;
					for(;i<rdata.data.length;i++){
						let d = rdata.data[i];
						let $tr = $('<tr />');
						$tr.append('<td class="ac" style="background: #fff;"><input type="checkbox" name="sSeq" value="'+ d.sNm +'"></td>');
						$tr.append('<td class="al" style="background: #fff;">'+ d.sNm +'</td>');
						$tr.append('<td class="ac" style="background: #fff;">'+ d.sStandard +'</td>');
						$tr.append('<td class="ar" style="background: #fff;">'+ self._utils.numberWithCommas(d.sPrice) +'</td>');
						$tr.append('<td class="ar" style="background: #fff;padding-right:10px !important;">'+ self._utils.numberWithCommas(d.sCnt) +'</td>');
						$stockList.append($tr.data("ROW", d));
					}
					for(;i<7;i++){
						let $tr = $('<tr />');
						$tr.append('<td class="ac" colspan="5" style="background: #fff;"></td>');
						$stockList.append($tr);
					}
				}
			});
		});
		$stSeq.trigger('change');
		
		

		$(`.btnApply`,$layerObject).on('click', function(e){
			let $chkBoxs = $layerObject.find("input[name=sSeq]:checked");
			if($chkBoxs.length==0){
				alert("추가할 대상을 선택 하십시오");
				return;
			}
			for(let i=0;i<$chkBoxs.length;i++) {
				if ($chkBoxs[i].checked) {
					let $tr = $($chkBoxs[i]).closest('tr');
					let d = $tr.data('ROW');
					d.puiCnt = 0;
					d.puiPrice = d.sPrice;
					if(!self.stockAdd($tbody, d)){
						alert("추가할 대상이 중복됩니다.");
						return
					};
				}
			}
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});
	}

	categoryStockChoceEvent = (popupID, data, $tbody) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text('분류 자재 목록');
		$(`.save`,$layerObject).text('추가');

		let $scSeq = $('select[name=scSeq]', $layerObject);
		let $scSeq2 = $('select[name=scSeq2]', $layerObject);
		let $scSeq3 = $('select[name=scSeq3]', $layerObject);
		let dept2Data = [];
		let dept3Data = [];
		let $stockList = $('.stockList',$layerObject);
		for(let i=0;i<data.length;i++){
			$scSeq.append('<option value="'+ data[i].scSeq +'"'+((i==0)?' selected':'')+'>'+ data[i].scNm +'</option>');
		}

		$scSeq.on('change', function(){
			let scSeq = $(this).val();
			let mapData = {
				ctl : 'stock',
				cmd : 'categoryStockList',
				scSeq : scSeq
			}
			for(let i=0;i<data.length;i++){
				if(scSeq == data[i].scSeq){
					dept2Data = data[i].node;
					$scSeq2.empty();
					$scSeq2.append('<option value="" selected>선택</option>');
					for(let d2=0;d2<dept2Data.length;d2++){
						$scSeq2.append('<option value="'+ dept2Data[d2].scSeq +'">'+ dept2Data[d2].scNm +'</option>');
					}
					break;
				}
				$scSeq3.empty();
				$scSeq3.append('<option value="" selected></option>');
			}
			$stockList.empty();
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let i=0;
					for(;i<rdata.data.length;i++){
						let d = rdata.data[i];
						let $tr = $('<tr />');
						$tr.append('<td class="ac" style="background: #fff;"><input type="checkbox" name="sSeq" value="'+ d.sNm +'"></td>');
						$tr.append('<td class="al" style="background: #fff;">'+ d.sNm +'</td>');
						$tr.append('<td class="ac" style="background: #fff;">'+ d.sStandard +'</td>');
						$tr.append('<td class="ar" style="background: #fff;">'+ self._utils.numberWithCommas(d.sPrice) +'</td>');
						$tr.append('<td class="ar" style="background: #fff;padding-right:10px !important;">'+ self._utils.numberWithCommas(d.sCnt) +'</td>');
						$stockList.append($tr.data("ROW", d));
					}
					for(;i<7;i++){
						let $tr = $('<tr />');
						$tr.append('<td class="ac" colspan="5" style="background: #fff;"></td>');
						$stockList.append($tr);
					}
				}
			});
		});
		$scSeq2.on('change', function(){
			let scSeq = $(this).val();
			let mapData = {
				ctl : 'stock',
				cmd : 'categoryStockList',
				scSeq : scSeq
			}
			
			if(!self._utils.checkEmptyNull(scSeq)){
				$stockList.empty();
				for(let i=0;i<dept2Data.length;i++){
					if(scSeq == dept2Data[i].scSeq){
						dept3Data = dept2Data[i].node;
						$scSeq3.empty();
						$scSeq3.append('<option value="" selected>선택</option>');
						for(let d3=0;d3<dept3Data.length;d3++){
							$scSeq3.append('<option value="'+ dept3Data[d3].scSeq +'">'+ dept3Data[d3].scNm +'</option>');
						}
						break;
					}
				}
					
				let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let i=0;
						for(;i<rdata.data.length;i++){
							let d = rdata.data[i];
							let $tr = $('<tr />');
							$tr.append('<td class="ac" style="background: #fff;"><input type="checkbox" name="sSeq" value="'+ d.sNm +'"></td>');
							$tr.append('<td class="al" style="background: #fff;">'+ d.sNm +'</td>');
							$tr.append('<td class="ac" style="background: #fff;">'+ d.sStandard +'</td>');
							$tr.append('<td class="ar" style="background: #fff;">'+ self._utils.numberWithCommas(d.sPrice) +'</td>');
							$tr.append('<td class="ar" style="background: #fff;padding-right:10px !important;">'+ self._utils.numberWithCommas(d.sCnt) +'</td>');
							$stockList.append($tr.data("ROW", d));
						}
						for(;i<7;i++){
							let $tr = $('<tr />');
							$tr.append('<td class="ac" colspan="5" style="background: #fff;"></td>');
							$stockList.append($tr);
						}
					}
				});
			}
			
		});
		$scSeq3.on('change', function(){
			let scSeq = $(this).val();
			let mapData = {
				ctl : 'stock',
				cmd : 'categoryStockList',
				scSeq : scSeq
			}

			$stockList.empty();
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let i=0;
					for(;i<rdata.data.length;i++){
						let d = rdata.data[i];
						let $tr = $('<tr />');
						$tr.append('<td class="ac" style="background: #fff;"><input type="checkbox" name="sSeq" value="'+ d.sNm +'"></td>');
						$tr.append('<td class="al" style="background: #fff;">'+ d.sNm +'</td>');
						$tr.append('<td class="ac" style="background: #fff;">'+ d.sStandard +'</td>');
						$tr.append('<td class="ar" style="background: #fff;">'+ self._utils.numberWithCommas(d.sPrice) +'</td>');
						$tr.append('<td class="ar" style="background: #fff;padding-right:10px !important;">'+ self._utils.numberWithCommas(d.sCnt) +'</td>');
						$stockList.append($tr.data("ROW", d));
					}
					for(;i<7;i++){
						let $tr = $('<tr />');
						$tr.append('<td class="ac" colspan="5" style="background: #fff;"></td>');
						$stockList.append($tr);
					}
				}
			});
		});
		$scSeq.trigger('change');
		
		

		$(`.btnApply`,$layerObject).on('click', function(e){
			let $chkBoxs = $layerObject.find("input[name=sSeq]:checked");
			if($chkBoxs.length==0){
				alert("추가할 대상을 선택 하십시오");
				return;
			}
			for(let i=0;i<$chkBoxs.length;i++) {
				if ($chkBoxs[i].checked) {
					let $tr = $($chkBoxs[i]).closest('tr');
					let d = $tr.data('ROW');
					d.puiCnt = 0;
					d.puiPrice = d.sPrice;
					if(!self.stockAdd($tbody, d)){
						alert("추가할 대상이 중복됩니다.");
						return
					};
				}
			}
			// $(`.btnClosePopLayer`,$layerObject).trigger('click');
		});
	}

	purchaseStockInsertEvent = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text('발주 자재 목록');
		$(`.save`,$layerObject).text('입고');

		let $stockList = $('.stockList',$layerObject);
		$('input[name=allCheck]',$layerObject).on('change',function(){
			let is = $(this).prop("checked");
			let $checks = $('input[name=puiSeq]:not(:disabled)', $stockList);
			for(let i=0;i<$checks.length;i++) $($checks[i]).prop("checked", is);
		});

		
		let i=0;
		for(;i<data.length;i++){
			let d = data[i];
			let $tr = $('<tr />');
			$tr.append('<td class="ac" style="background: #fff;"><input type="checkbox" name="puiSeq" value="'+ d.puiSeq +'" '+((d.puiInsertYn == 'Y')?'disabled':'')+'></td>');
			$tr.append('<td class="al" style="background: #fff;">'+ d.sNm +'</td>');
			$tr.append('<td class="al" style="background: #fff;">'+ d.sStandard +'</td>');
			$tr.append('<td class="al" style="background: #fff;"><input type="text" name="sioUnitPrice" class="w100p ar" value="'+ self._utils.numberWithCommas(d.puiPrice) +'" '+((d.puiInsertYn == 'Y')?'disabled':'')+'></td>');
			$tr.append('<td class="ar" style="background: #fff;">'+ self._utils.numberWithCommas(d.puiCnt) +'</td>');
			$tr.append('<td class="al" style="background: #fff;"><input type="text" name="sioCnt" class="w100p ar" value="'+ self._utils.numberWithCommas(d.puiCnt) +'" '+((d.puiInsertYn == 'Y')?'disabled':'')+'></td>');
			self._utils.focusEvent($('input[name=sioUnitPrice]',$tr),'comma');
			self._utils.focusEvent($('input[name=sioCnt]',$tr),'comma');
			$stockList.append($tr.data("ROW", d));
		}
		for(;i<7;i++){
			let $tr = $('<tr />');
			$tr.append('<td class="ac" colspan="6" style="background: #fff;"></td>');
			$stockList.append($tr);
		}
		$(`.save`,$layerObject).on('click', function(e){
			let $chkBoxs = $layerObject.find("input[name=puiSeq]:checked");
			if($chkBoxs.length==0){
				alert("입고할 대상을 선택 하십시오");
				return;
			}
			let inoutInfo = [];
			for(let i=0;i<$chkBoxs.length;i++) {
				if ($chkBoxs[i].checked) {
					let $tr = $($chkBoxs[i]).closest('tr');
					let d = $tr.data('ROW');
					let data = self._utils.serializeObject($tr);
					delete data.puiSeq;
					data.sioUnitPrice = self._utils.convertNumber(data.sioUnitPrice);
					data.sioCnt = self._utils.convertNumber(data.sioCnt);
					$.extend(d,data);
					d.sioMemo = '발주입고';
					inoutInfo.push(d);
				}
			}
			let mapData = {
				ctl : 'stock',
				cmd : 'inoutInsertGroup',
				inoutInfo : JSON.stringify(inoutInfo),
				sioKind : 'I',
				
			}
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$(`.btnClosePopLayer`,$layerObject).trigger('click');
					alert('입고처리 되었습니다.');
				}else{
					alert(rdata.message);
				}
			});
			
		});
	}


	purchaseMailEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let maxSize = 1024 * 1024 * 5;
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
				alert("최대 5M이상 첨부 할 수 없습니다.");
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
					alert("최대 5M이상 첨부 할 수 없습니다.");
					return false;
				}

				data.files = JSON.stringify(info.files);
				self._parent.emailSend(data, function(rdata){
					if(rdata.code == 0){
						$("body .btnClosePopLayer").trigger('click');
						alert('발송 되었습니다.');
						let mapData = {ctl : 'stock',cmd : 'purchaseSendUpdate',puSeq : info.puSeq,puSendType:'mail',puSendYn:'Y'};
						let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api2.ajaxformdata(function(rdata){ 
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



	purchaseFaxEvent = (popupID, info) =>{
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
						let mapData = {ctl : 'stock',cmd : 'purchaseSendUpdate',puSeq : info.puSeq,puSendType:'fax',puSendYn:'Y'};
						let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api2.ajaxformdata(function(rdata){ 
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

		let columnInfos = [];
		columnInfos.push({name:"중요",key:"sMarkYn",width:5,align:'center'});
		columnInfos.push({name:"분류",key:"kindInfo",width:10,align:'center'});
		columnInfos.push({name:"자재명",key:"sNm",width:25,align:'left'});
		columnInfos.push({name:"규격",key:"sStandard",width:30,align:'left'});
		columnInfos.push({name:"안전량",key:"sSafeCnt",width:10,align:'right'});
		columnInfos.push({name:"재고량",key:"sCnt",width:10,align:'right'});
		columnInfos.push({name:"평균단가",key:"sPrice",width:12,align:'right'});
		columnInfos.push({name:"총금액",key:"sTotalPrice",width:15,align:'right'});
		columnInfos.push({name:"메모",key:"sMemo",width:50,align:'left'});
		columnInfos.push({name:"주요거래처",key:"cuNm",width:20,align:'left'});
		columnInfos.push({name:"사용",key:"useYn",width:5,align:'center'});
		columnInfos.push({name:"등록일시",key:"creDate",width:20,align:'center'});

		let searchData = self.searchData();
		searchData.rows = 9999;
		searchData.page = 1;

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
					let kindNm = [];
					for(let k=0;k<resp[i].kindInfo.length;k++) kindNm.push(resp[i].kindInfo[k].skCdNm);
					resp[i].kindInfo = kindNm.join(', ');

					let rowData = [];
					for(let c in columnInfos){	rowData.push(resp[i][columnInfos[c].key]?resp[i][columnInfos[c].key]:'');	}
					let row = sheet.addRow(rowData);
					row.eachCell((cell, colNum) => {self._parent._utils.excelStyleDataCell(cell,columnInfos[colNum - 1].align); });
				}
			} else {
				
				alert('데이타가 없습니다.');
				return false;
			}
			self._parent._utils.excelDownload(workbook, fileName + "("+ self._utils.currentDateTime() +')').then(r => {});
		});
	}
	list = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'stock',
			cmd : 'purchaseList'
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
			ctl : 'stock',
			cmd : 'purchaseLoad'
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
			ctl : 'stock',
			cmd : 'purchaseDelete'
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
			ctl : 'stock',
			cmd : 'purchaseInsert'
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
			ctl : 'stock',
			cmd : 'purchaseUpdate'
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
export default stockController