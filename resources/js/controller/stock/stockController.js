
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
		this._employeeSel = null;
		this._eqSeq = null;
		this._eqNm = null;
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
			let $popDiv = $('template#stockDiv');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);

			e.stopPropagation();
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=sSeq]:checked");
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
					let sSeq = chkBoxs.val();

					self.delete({sSeq : sSeq}, function(resp) {
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

		self._code.find(".btnExcelUpload").on("click",function(e){
			let $div = $('template#stockExcelInsert');
			self._parent.openLayer($div.html(), self.excelUploadEvent);
			e.stopPropagation();
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
		let $scSeq = $('select[name=scSeq]', searchWrap);
		let $scSeq2 = $('select[name=scSeq2]', searchWrap);
		let $scSeq3 = $('select[name=scSeq3]', searchWrap);
		let dept1Data = [];
		let dept2Data = [];
		let dept3Data = [];

		let mapData = {ctl : 'stock',cmd : 'categoryTreeList', };
			let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let data = rdata.data;
					dept1Data = data;
					for(let i=0;i<data.length;i++){
						$scSeq.append('<option value="'+ data[i].scSeq +'">'+ data[i].scNm +'</option>');
					}
				} else {
					alert(rdata.message);
				}
			});

		$scSeq.on('change', function(){
			let scSeq = $(this).val();
			let mapData = {
				ctl : 'stock',
				cmd : 'categoryStockList',
				scSeq : scSeq
			}
			if(!self._utils.checkEmptyNull(scSeq)){
				for(let i=0;i<dept1Data.length;i++){
					if(scSeq == dept1Data[i].scSeq){
						dept2Data = dept1Data[i].node;
						$scSeq2.empty();
						$scSeq2.append('<option value="" selected>중분류 전체</option>');
						for(let d2=0;d2<dept2Data.length;d2++){
							$scSeq2.append('<option value="'+ dept2Data[d2].scSeq +'">'+ dept2Data[d2].scNm +'</option>');
						}
						break;
					}
					$scSeq3.empty();
					$scSeq3.append('<option value="" selected>소분류 전체</option>');
				}
			}else{
				$scSeq2.empty();
				$scSeq2.append('<option value="" selected>중분류 전체</option>');
				$scSeq3.empty();
				$scSeq3.append('<option value="" selected>소분류 전체</option>');
			}
		});
		$scSeq2.on('change', function(){
			let scSeq = $(this).val();
			let mapData = {
				ctl : 'stock',
				cmd : 'categoryStockList',
				scSeq : scSeq
			}
			
			if(!self._utils.checkEmptyNull(scSeq)){
				for(let i=0;i<dept2Data.length;i++){
					if(scSeq == dept2Data[i].scSeq){
						dept3Data = dept2Data[i].node;
						$scSeq3.empty();
						$scSeq3.append('<option value="" selected>소분류 전체</option>');
						for(let d3=0;d3<dept3Data.length;d3++){
							$scSeq3.append('<option value="'+ dept3Data[d3].scSeq +'">'+ dept3Data[d3].scNm +'</option>');
						}
						break;
					}
				}
			}
		});
		$scSeq3.on('change', function(){
			let scSeq = $(this).val();
		});
		$scSeq.trigger('change');


		/*	// 사용분류
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

		mapData = {ctl : 'place',cmd : 'nmList', cpType :'B', useYn : 'Y'};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api2.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $cpSeq = $('select[name=cpSeq]',searchWrap);
				let data = self._placeList = rdata.data;
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

		$('input[name=searchWord]',searchWrap).autocomplete({
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
			self.load({sSeq:_data.sSeq}, function(resp){
				if(resp.code == 0) {
					let $popDiv = $('template#stockDiv');
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
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let searchColumn = searchWrap.find("select[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let cpSeq = searchWrap.find("select[name=cpSeq]").val();
		let skCd = searchWrap.find("select[name=skCd]").val();
		let stSeq = searchWrap.find("select[name=stSeq]").val();
		let scSeq = searchWrap.find("select[name=scSeq]").val();
		let scSeq2 = searchWrap.find("select[name=scSeq2]").val();
		let scSeq3 = searchWrap.find("select[name=scSeq3]").val();
		let safeWarning = searchWrap.find("input[name=safeWarning]:checked").val()??'N';
		if(!self._utils.checkEmptyNull(scSeq3)){ scSeq = scSeq3;}
		else if(!self._utils.checkEmptyNull(scSeq2)){ scSeq = scSeq2;}

		return{
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'sNm',
			searchWord : searchWord,
			cpSeq : cpSeq,
			stSeq : stSeq,
			skCd : skCd,
			scSeq : scSeq,
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
		$('.totalPrice',searchWrap).text(0);
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
		let style = 'border:1px solid #dedede;';
		let placeInfo = d.placeInfo;
		let place = '';
		for(let i=0;i<placeInfo.length;i++){
			let p = placeInfo[i];
		 	place += '<span style="display:inline-block;width:100%;">'+ p.cpNm +' : <strong>'+ self._utils.numberWithCommas(p.splCnt) +'</strong></span>';
		}
		let markNm = '일반';
		if(d.sMarkYn == 'Y') markNm = '<i class="fa-solid fa-check" title="주요자재"></i>';
		let kindNm = [];
		for(let i=0;i<d.kindInfo.length;i++) kindNm.push(d.kindInfo[i].skCdNm);
		let typeNm = [];
		for(let i=0;i<d.typeInfo.length;i++) typeNm.push(d.typeInfo[i].stNm);

		if(d.useYn == 'N'){
			style += 'color:#aaa;';
		}
		let customerInfo = '';
		let customerInfoTitle = '';
		if(d.customerInfo.length == 1){
			customerInfo = d.customerInfo[0].cuNm;
		}else if(d.customerInfo.length > 1){
			customerInfo = d.customerInfo[0].cuNm +' 외 '+ (d.customerInfo.length -1 );
			for(let i=0;i<d.customerInfo.length;i++) customerInfoTitle += ' '+ d.customerInfo[i].cuNm +','
			customerInfoTitle = customerInfoTitle.substring(0,customerInfoTitle.length-1);
		}
		let $tr = $('<tr />');
		$tr.append($('<td style="'+style +'"><input type="checkbox" class="vm" name="sSeq" value="'+d.sSeq+'"></td>'));
		$tr.append($('<td style="'+style +'" class="'+ ((d.sMarkYn == "Y")?'txt_red':'')+'">'+markNm+'</td>'));
		$tr.append($('<td style="'+style +'" class="ac">'+kindNm.join(', ')+'</td>'));
		//$tr.append($('<td style="'+style +'" class="al">'+typeNm.join(', ')+'</td>'));
		$tr.append($('<td style="'+style +'" class="ac">'+self._utils.nullTostring(d.sCode,'')+'</td>'));
		$tr.append($('<td style="'+style +'" class="al pl5" />').append(self._utils.nullTostring(d.sNm, '')));
		//$tr.append($('<td style="'+style +'" class="al" />').append(self._utils.nullTostring(d.sModelNo, '')));
		$tr.append($('<td style="'+style +'" class="al" />').append(self._utils.nullTostring(d.sStandard, '')));
		$tr.append($('<td style="'+style +'" class="ar" />').append(self._utils.numberWithCommas(d.sSafeCnt)));
		$tr.append($('<td style="'+style +'" class="ar" />').append(self._utils.numberWithCommas(d.sCnt)));
		$tr.append($('<td style="'+style +'" class="ar" />').append(self._utils.numberWithCommas(d.sPrice)));
		$tr.append($('<td style="'+style +'" class="ar" />').append(self._utils.numberWithCommas(d.sTotalPrice)));
		$tr.append($('<td style="'+style +'" class="al" />').append(place));
		$tr.append($('<td style="'+style +'" class="al" />').append(self._utils.nullTostring(d.sMemo)));
		$tr.append($('<td style="'+style +'" class="al" title="'+ customerInfoTitle +'" />').append(self._utils.nullTostring(customerInfo)));
		if(d.useYn == "N") $tr.append($('<td style="'+style +'" class="txt_red">'+self._utils.nullTostring(d.useYn, '')+'</td>'));
		else $tr.append($('<td style="'+style +'">'+self._utils.nullTostring(d.useYn, '')+'</td>'));
		$tr.append($('<td style="'+style +'">'+d.creDate.substring(0,16)+'</td>'));;
		$tr.append($('<td style="'+style +'"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="조회" style="font-size:14px;"></i></td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
	
	}

	

	// popupview

	layerViewEvent = ($layerObject, info) =>{
		const self = this;
		self._utils.focusEvent($('input[name=sioCnt]',$layerObject),'comma');
		self._utils.focusEvent($('input[name=sSafeCnt]',$layerObject),'comma');
		self._utils.focusEvent($('input[name=sioUnitPrice]',$layerObject),'moeny');
		if(self._utils.checkEmptyNull(info)){
			let mapData = {ctl : 'place',cmd : 'list', cpType :'B', rows:9999};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let $cpSeq = $('select[name=cpSeq]',$layerObject);
					let data = rdata.data;
					for(let i=0;i<data.length;i++){
						$cpSeq.append('<option value="'+ data[i].cpSeq +'">'+ data[i].cpNm +'</option>');
					}
				} else {
					alert(rdata.message);
				}
			});
		}

		let $tbody = $('.dataListTable tbody', $layerObject);
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
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
		$('input[name=sioCnt]',$layerObject).on('keypress',function(key){
			if(key.keyCode && key.keyCode==13)	{$('input[name=sioUnitPrice]',$layerObject).trigger('focus'); }
		});
/*
		$layerObject.find('input[name=cpNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'place',cmd : 'list', cpType :'B', cpNm : this.term, rows:9999};
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
*/
		$('.stockTypeChoice', $layerObject).on('click', function(e){
			let $popDiv = $('template#stockTypeChoice');
			let $stockTypeTd = $('.stockTypeTd', $layerObject);
			let stockTypes = [];
			let stSeqs =$('input[name=typeInfo]',$layerObject).val();
			if(stSeqs.length > 0) stockTypes = JSON.parse(stSeqs);
			self._parent.openLayer($popDiv.html(),self.sotckTypeChoce, stockTypes, $stockTypeTd);
			e.stopPropagation();
		});

		$('.stockCategoryChoice', $layerObject).on('click', function(e){
			let $popDiv = $('template#stockCategoryChoice');
			let $stockCategoryTd = $('.stockCategoryTd', $layerObject);
			let scSeqs =$('input[name=scSeqs]',$layerObject).val();
			if(scSeqs.length > 0) scSeqs = JSON.parse(scSeqs);
			self._parent.openLayer($popDiv.html(),self.sotckCategoryChoce, scSeqs, $stockCategoryTd);
			e.stopPropagation();
		});
		$('.stockCustomerChoice', $layerObject).on('click', function(e){
			let $popDiv = $('template#stockCustomerChoice');
			let $stockCustomerTd = $('.stockCustomerTd', $layerObject);
			let customerInfo = [];
			if(info != undefined){
				let cuSeqs = $('input[name=cuSeqs]',$layerObject).val();
				let cuNms = $('.stockCustomer',$layerObject).text();
				if(cuSeqs.length > 0){
					try{
						cuSeqs = JSON.parse(cuSeqs);
						cuNms = cuNms.split(',');
						for(let i=0;i<cuSeqs.length;i++){
							customerInfo.push({cuSeq : cuSeqs[i], cuNm : cuNms[i]});
						}
					}catch(e){
						console.log('거래처 정보 수집 오류')
					}
				}
				// customerInfo = info.customerInfo;
			}else{
				let cuSeqs = $('input[name=cuSeqs]',$layerObject).val();
				let cuNms = $('.stockCustomer',$layerObject).text();
				
				if(cuSeqs.length > 0){
					try{
						cuSeqs = JSON.parse(cuSeqs);
						cuNms = cuNms.split(',');
						for(let i=0;i<cuSeqs.length;i++){
							customerInfo.push({cuSeq : cuSeqs[i], cuNm : cuNms[i]});
						}
					}catch(e){
						console.log('거래처 정보 수집 오류')
					}
				}
			}
			self._parent.openLayer($popDiv.html(),self.sotckCustomerChoce, customerInfo, $stockCustomerTd);
			e.stopPropagation();
		});
		$('.fa-solid.fa-square-plus',$layerObject).on('click',function(){
			let $placeInfo = $('.placeList',$layerObject);
			let d = self._utils.serializeObject($placeInfo);
			d.cpNm = $('select[name=cpSeq] option:selected',$placeInfo).text();
			if(self._utils.checkEmptyNull(d.cpSeq)){
				alert('창고를 선택 하십시요');
				return;
			}
			d.sioCnt = d.sioCnt ?? 0;
			d.sioUnitPrice = d.sioUnitPrice ?? 0;
			d.sioCnt = self._utils.convertNumber(d.sioCnt);
			d.sioUnitPrice = self._utils.convertNumber(d.sioUnitPrice);
			placeAdd($tbody, d);
			let $objs = $('input,select',$placeInfo);
			for(let i=0;i<$objs.length;i++) $($objs[i]).val('');
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
			
			if(info.kindInfo.length > 0){
				for(let i=0;i<info.kindInfo.length;i++){
					$('input[name=skCd][value='+ info.kindInfo[i].skCd +']',$layerObject).prop('checked',true);
				} 
			}
			
			if(info.typeInfo.length > 0){
				let stockTypes = [];
				let stockTypeNms = [];
				for(let i=0;i<info.typeInfo.length;i++){
					stockTypes.push(info.typeInfo[i].stSeq);
					stockTypeNms.push(info.typeInfo[i].stNm);
				}
				$('input[name=typeInfo]',$layerObject).val(JSON.stringify(stockTypes));
				$('.stockTypes',$layerObject).text(stockTypeNms.join(', '));
			}

			if(info.categoryInfo.length > 0){
				let scSeqs = [];
				let scNms = [];
				for(let i=0;i<info.categoryInfo.length;i++){
					scSeqs.push(info.categoryInfo[i].scSeq);
					scNms.push(info.categoryInfo[i].scNm);
				}
				$('input[name=scSeqs]',$layerObject).val(JSON.stringify(scSeqs));
				$('.stockCategory',$layerObject).text(scNms.join(', '));
			}
			if(info.customerInfo.length > 0){
				let cuSeqs = [];
				let cuNms = [];
				for(let i=0;i<info.customerInfo.length;i++){
					cuSeqs.push(info.customerInfo[i].cuSeq);
					cuNms.push(info.customerInfo[i].cuNm);
				}
				$('input[name=cuSeqs]',$layerObject).val(JSON.stringify(cuSeqs));
				$('.stockCustomer',$layerObject).text(cuNms.join(', '));
			}
		}

		$(`.save`,$layerObject).on('click', function(e){
			let orgData = $layerObject.data();
			let data = self._utils.serializeObject($layerObject);
			let $trs = $('tr', $tbody);
			let inoutInfo = [];
			let $checkboxs = $('input[name=skCd]:checked',$layerObject);
			let cuNm = $('input[name=cuNm]',$layerObject).val();
			let cuSeq = $('input[name=cuSeq]',$layerObject).val();
			/*
			if(cuNm != '' && cuSeq == ''){
				alert('등록된 거래처를 입력하십시요');
				return;
			}
			*/
			if( orgData.sSeq == undefined){
				for(let i=0;i<$trs.length;i++){
					let d = $($trs[i]).data("ROW");
					if(d != undefined && d.cpSeq != undefined){
						inoutInfo.push(d);
					}
				}
				if(inoutInfo.length == 0){
					alert('창고를 선택하여 현재 재고를 등록 하십시요');
					return;
				}
			}else{
				data.sSeq = orgData.sSeq;
			}

			if($checkboxs.length == 0){
				alert('자재 분류를 선택하세요');
				return;
			}
			if( self._utils.checkRequired($layerObject)) {
				let kindInfo = [];
				for(let i=0;i<$checkboxs.length;i++) kindInfo.push($($checkboxs[i]).val());
				data.kindInfo = JSON.stringify(kindInfo);
				if(data.sSeq == undefined){
					data.inoutInfo = inoutInfo;
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

		function placeAdd($tbody, d){
			let $tr = $('<tr />');
			$tr.append($('<td class="al">'+ d.cpNm +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioCnt) +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioUnitPrice) +'</td>'));
			//$tr.append($('<td class="ar"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tr.append($('<td class="ac" style="padding:0px;"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tbody.append($tr.data("ROW",d));
		}
	}

	initNewLayer = (popupID) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.save`,$layerObject).text("등록");
		self.layerViewEvent($layerObject);
	}
	reloadLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text(data.sNm +' 수정');
		$(`.save`,$layerObject).text('수정');
		$('.placeArae',$layerObject).remove();
		$layerObject.data(data);
		self._utils.unSerializeObject($layerObject, data);
		self.layerViewEvent($layerObject,data);
	}

	sotckTypeChoce = (popupID, stSeqs, $parentTr) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let $tbody = $('.dataListTable tbody', $layerObject);
		let mapData = {
			ctl : 'stock',
			cmd : 'typeList',
			isOnlyType : true,
			useYn :'Y'
		}
		let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					if(rdata.data.length > 0 ){
						for(let i=0;i<rdata.data.length;i++){
							let d = rdata.data[i];
							let $tr = $('<tr />');
							$tr.append($('<td class="ac"><input type="checkbox" name="stSeq" '+ ((stSeqs.indexOf(d.stSeq) > -1)? 'checked':'')  +'></td>'));
							$tr.append($('<td class="al">'+ d.stNm +'</td>'));
							$tbody.append($tr.data("ROW", d));
						}
					}else{
						let $tr = $('<tr />');
						$tr.append($('<td class="ac" colspan="2">데이타가 없습니다.</td>'));
						$tbody.append($tr);
					}
				} else {
					alert(rdata.message);
				}
		});

		$(`.applySave`,$layerObject).on('click', function(e){
			let stockTypes = [];
			let stockTypeNms = [];
			let $trs = $('tr', $tbody);
			let $chkBoxs = $tbody.find("input[name=stSeq]:checked");
			
			for(let i=0;i<$chkBoxs.length;i++){
				let $tr = $($chkBoxs[i]).closest('tr');
				let d = $tr.data('ROW');
				stockTypes.push(d.stSeq);
				stockTypeNms.push(d.stNm);
			}
			$('input[name=typeInfo]',$parentTr).val(JSON.stringify(stockTypes));
			$('.stockTypes',$parentTr).text(stockTypeNms.join(', '));
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});

	}
	sotckCategoryChoce = (popupID, scSeqs, $parentObject) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let $tbody = $('.dataListTable tbody', $layerObject);
		let $thead = $('.dataHeadTable thead',$layerObject);
		let mapData = {
			ctl : 'stock',
			cmd : 'categoryTreeList',
		}

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						
						$tbody.empty();
						let resp = rdata.data;
						if(resp != null && resp.length > 0) {
							for(let i in resp){
								display($tbody, resp[i]);
							}
						} else {
							$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
						}
					} else {
						alert(rdata.message);
					}
		});
		function display($tbody, d){
			let level = '';
			for(let i=0;i<d.scLevel ; i++){
				if(i == (d.scLevel - 1)){
					level += '<span style="width:15px;display: inline-block;"></span><span style="width:15px;display: inline-block;"><i class="fa-solid fa-arrow-right"></i></span>';
				}else{
					level += '<span style="width:15px;display: inline-block;"></span>';
				}
			} 
			let $tr = $('<tr/>');
			$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="scSeq" value="'+d.scSeq+'" '+ ((scSeqs.indexOf(d.scSeq)> -1)?' checked':'') +'/>')));
			$tr.append($('<td class="al pl5 pr5 " style="border-right:0px;border-right:1px solid #ccc;">'+ level + '<span class="categoryNm cursorPointer" style="display: inline-block;">'+ self._utils.nullTostring(d.scNm, '')+'</span></td>'));
			$tr.data("ROW",d);
			$tr.appendTo($tbody);
			if(d.node != undefined && d.node.length > 0){
				for(let i=0;i<d.node.length;i++) display( $tbody, d.node[i]);
			}
		}

		$(`.applySave`,$layerObject).on('click', function(e){
			let scSeqs = [];
			let scNms = [];
			let $trs = $('tr', $tbody);
			let $chkBoxs = $tbody.find("input[name=scSeq]:checked");
			
			for(let i=0;i<$chkBoxs.length;i++){
				let $tr = $($chkBoxs[i]).closest('tr');
				let d = $tr.data('ROW');
				scSeqs.push(d.scSeq);
				scNms.push(d.scNm);
			}
			$('input[name=scSeqs]',$parentObject).val(JSON.stringify(scSeqs));
			$('.stockCategory',$parentObject).text(scNms.join(', '));
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});
	}
	sotckCustomerChoce = (popupID, customerInfo, $parentObject) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let $tbody = $('.dataListTable tbody',$layerObject);
		let $thead = $('.dataHeadTable thead',$layerObject);

		if(customerInfo.length > 0){
			for(let i=0;i<customerInfo.length;i++){
				customerAdd(customerInfo[i]);
			}
		}else{
			$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
		}

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
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
		$('.customerAdd',$layerObject).on('click',function(){
			let data = self._utils.serializeObject($('.customerAddArea',$layerObject));
			if(self._utils.checkEmptyNull(data.cuSeq)){
				alert('거래처를 입력 선택하여 등록하십시요');
				return;
			}
			customerAdd(data) ;
			$('input[name=cuSeq]',$layerObject).val('');
			$('input[name=cuNm]',$layerObject).val('');
		});
		$layerObject.find('input[name=cuNm]').on('keypress', function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					$('.customerAdd',$layerObject).trigger('click');
				}
			}
		});
		
		function customerAdd(d){
			let $trs = $('tr',$tbody);
			for(let i=0;i<$trs.length;i++){
				let data = $($trs[i]).data("ROW");
				if(data == undefined || data.cuSeq == undefined){
					$($trs[i]).remove();
				}else if(data.cuSeq == d.cuSeq){
					alert('이미 등록되어 있습니다.')
					return false;
				}
			}
			let $tr = $('<tr/>');
			$tr.append($('<td class="al pl5 pr5 " style="border-right:0px;">'+ d.cuNm +'</td>'));
			$tr.append($('<td class="al pl5 pr5 " style="border-right:1px solid #ccc;"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus customerDel" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tr.data("ROW",d);
			$tr.appendTo($tbody);
			return true;
		}

		$tbody.on('click','.customerDel',function(){
			let $tr = $(this).closest('tr');
			$tr.remove();
		});

		$(`.applySave`,$layerObject).on('click', function(e){
			let cuSeqs = [];
			let cuNms = [];
			let $trs = $('tr', $tbody);
			
			for(let i=0;i<$trs.length;i++){
				let d = $($trs[i]).data('ROW');
				cuSeqs.push(d.cuSeq);
				cuNms.push(d.cuNm);
			}
			$('input[name=cuSeqs]',$parentObject).val(JSON.stringify(cuSeqs));
			$('.stockCustomer',$parentObject).text(cuNms.join(', '));
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});
	}
	
	excelUploadEvent = (popupID) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		if(self._placeList == undefined || self._placeList.length == 0){
			alert('')
		}
		$('.btnExcelDocDown',$layerObject).on('click',function(){

			const element = document.createElement('a');
			element.setAttribute('href', __FILE_DOMIN + '/doc/stockDoc20250123.xlsx');
			element.setAttribute('download', '자재등록양식.xlsx');
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
						stockInsert(excelData);

					});
				}
			}
		});

		function stockInsert(data) {
			if(data.length == 0){
				alert("등록할 고객사 정보가 없습니다.");
				return;
			}
			//let $popDiv = $('template#progress');
			//self._parent.openLayer($popDiv.html(), self.employeeListEvent);

			for(let i=0;i<data.length;i++){
				let d = data[i];
				let skCd = [];
				if(d[1] == 'Y') skCd.push('S')
				if(d[2] == 'Y') skCd.push('P')

				let inoutInfo = [];
				if(!self._utils.checkEmptyNull(d[7].trim())){
					let place = {};
					place.cpSeq = getPlaceSeq(d[7].trim());
					if(place.cpSeq > 0){
						place.sioCnt = d[8].trim();
						place.sioUnitPrice = d[8].trim();
						place.sioUnitPrice = '초기 재고(엑셀 등록)';
						inoutInfo.push(place);
					}
				}

				let mapData = {
					ctl : 'stock',
					cmd : 'insert',
					sCode : 		d[3].trim(),
					sNm : 			d[4].trim(),
					sStandard :		d[5].trim(),
					sSafeCnt : 		((d[6].trim() == '')? 0 : d[6].trim()) ,
					useYn : 		((d[10].trim() == 'Y')?'Y':'N'),
					skCd : JSON.stringify(skCd),
					inoutInfo : JSON.stringify(inoutInfo)
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
		function getPlaceSeq(nm){
			if(self._placeList != undefined && self._placeList.length > 0){
				for(let i=0;i<self._placeList.length;i++){
					if(nm == self._placeList[i].cpNm){
						return self._placeList[i].cpSeq;
					}
				}
			}
			return 0;
		}
		function excelUploadResultDownload(resp){
			//let self = this;
			const workbook = new ExcelJS.Workbook();
			let fileName = '자재 등록 결과 ';
			const sheet = workbook.addWorksheet(fileName);


			let columnInfos = [];
			columnInfos.push({name:"자재",key:"1",width:10,align:'center'});
			columnInfos.push({name:"재품",key:"2",width:10,align:'center'});
			columnInfos.push({name:"자재코드",key:"3",width:25,align:'center'});
			columnInfos.push({name:"자재명",key:"4",width:30,align:'left'});
			columnInfos.push({name:"규격",key:"5",width:30,align:'left'});
			columnInfos.push({name:"안전량",key:"6",width:15,align:'rigth'});
			columnInfos.push({name:"보관창고",key:"7",width:20,align:'left'});
			columnInfos.push({name:"보관량",key:"8",width:15,align:'rigth'});
			columnInfos.push({name:"단가",key:"9",width:20,align:'rigth'});
			columnInfos.push({name:"사용여부",key:"10",width:10,align:'center'});
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
		//columnInfos.push({name:"주요거래처",key:"cuNm",width:20,align:'left'});
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
			ctl : 'stock',
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
			ctl : 'stock',
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
	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
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
	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
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
export default stockController