
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let stockInoutController = class {

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
			let $popDiv = $('template#stockInoutInsertDiv');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);

			e.stopPropagation();
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});

		self._code.find(".btnInsideCreate").on("click",function(e){
			let $popDiv = $('template#stockInoutInsideInsertDiv');
			self._parent.openLayer($popDiv.html(),self.stockInoutInsideLayer);

			e.stopPropagation();
		});
		
		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=sioSeq]:checked");
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
			let d = $(chkBoxs[0]).closest('tr').data('ROW');
			let deleteMessage = '삭제하시겠습니까?';
			if(d.sioInsideYn == 'Y'){
				deleteMessage = '내부이동으로 관련된 '+((d.sioKind == 'I')?'[출고]':'[입고]')+'내역도 같이 삭제됩니다. <br>그래도 삭제 하시겠습니까?';
			}
			confirm(deleteMessage, function(data){
				if(data) {
					let sioSeq = chkBoxs.val();

					self.delete({sioSeq : d.sioSeq, sSeq : d.sSeq}, function(resp) {
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
		
		let mapData = {ctl : 'place',cmd : 'nmList', cpType :'B', useYn : 'Y'};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api.ajaxformdata(function(rdata){ 
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

		$('input[name=searchWord]',searchWrap).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockNmSearch',nmOnly: 'Y', searchWord : this.term};
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
							r.sSeq = v.sSeq;
							return r;
							//return {label:v.sNm, value:v.sNm, sSeq:v.sSeq};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=sSeq]', searchWrap).val(ui.item.sSeq);
			},
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
			
			// 고객사 데이터를 먼저 읽어온다
			//self._client = {};
			self.load({sioSeq:_data.sioSeq}, function(resp){
				if(resp.code == 0) {
					let d = resp.data;
					if(d.sioInsideYn == 'N'){
						let $popDiv = $('template#stockInoutViewDiv');
						self._parent.openLayer($popDiv.html(),self.stockInoutViewLayer,d);
					}else{
						let $popDiv = $('template#stockInoutInsideViewDiv');
						self._parent.openLayer($popDiv.html(),self.stockInoutInsideViewLayer,d);
					}
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
		let searchColumn = searchWrap.find("input[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let cpSeq = searchWrap.find("select[name=cpSeq]").val();
		let skCd = searchWrap.find("select[name=skCd]").val();
		let sioInsideYn = searchWrap.find("select[name=sioInsideYn]").val();
		let sioKind = searchWrap.find("select[name=sioKind]").val();

		return {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : searchColumn,
			searchWord : searchWord,
			cpSeq : cpSeq,
			skCd : skCd,
			sioInsideYn : sioInsideYn,
			sioKind : sioKind,
			startDt : startDt,
			endDt : endDt
		}
	}
	retrieve = () => {
		const self = this;

		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();
		let searchWrap = self._code.find(".searchWrapArea");

		let searchData = self.searchData();

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
						$('.inTotalPrice',searchWrap).text(self._utils.numberWithCommas(resp[i].inTotalPrice));
						$('.outTotalPrice',searchWrap).text(self._utils.numberWithCommas(resp[i].outTotalPrice));
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
		let kindTag = '○ ○';
		if(d.sioKind == 'I') kindTag = '<span style="color:#68C3C7;" title="입고">●</span> ○';
		else kindTag = ' ○ <span style="color:#974ff3;" title="출고">●</span>';
		let insideTag = '<i class="fa-solid fa-right-left" title="내부이동" style="color:#1e991e;"></i>';
		if(d.sioInsideYn == 'N') insideTag = '외부';
		let style = 'border:1px solid #dedede;';
		if (d.sioHoldYn == 'Y') style += 'color:#aaa;'
		let $tr = $('<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>');
		$tr.append($('<td style="'+style+'"><input type="checkbox" class="vm" name="sioSeq" value="'+d.sioSeq+'"></td>'));
		$tr.append($('<td style="'+style+'" class="ac pl5" />').append(self._utils.dateformatStringToDate(d.sioDt)));
		$tr.append($('<td style="'+style+'" class="ac" />').append(insideTag));
		$tr.append($('<td style="'+style+'" class="ac" />').append(kindTag));
		$tr.append($('<td style="'+style+';" class="al" />').append(d.sNm));
		$tr.append($('<td style="'+style+'" class="al" />').append(self._utils.nullTostring(d.sStandard, '')));
		$tr.append($('<td style="'+style+'" class="al" />').append(d.cpNm));
		$tr.append($('<td style="'+style+'" class="ar" />').append(self._utils.numberWithCommas(d.sioCnt)));
		$tr.append($('<td style="'+style+'" class="ar" />').append(self._utils.numberWithCommas(d.sioUnitPrice)));
		$tr.append($('<td style="'+style+'" class="ar" />').append(self._utils.numberWithCommas(d.totalPrice)));
		//$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(d.sModelNo));
		$tr.append($('<td style="'+style+'" class="al" />').append(d.sioMemo));
		$tr.append($('<td style="'+style+'" class="ac" />').append(d.eNm));
		$tr.append($('<td style="'+style+'">'+d.creDate.substring(0,16)+'</td>'));;
		$tr.append($('<td style="'+style+'"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="수정" style="font-size:14px;"></i></td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
	
	}

	

	// popupview

	layerViewEvent = ($layerObject, data) =>{
		const self = this;
		self._utils.focusEvent($('input[name=sioCnt]',$layerObject),'comma');
		self._utils.focusEvent($('input[name=sioUnitPrice]',$layerObject),'comma');

		let $inputInfo = $('.inoutInfo',$layerObject);
		let $tbody = $('.dataListTable tbody', $layerObject);

		self.cpSeqSelect($('select[name=cpSeq]',$inputInfo));

		if($('input[name=sioDt]',$layerObject).val() == '')	$('input[name=sioDt]',$layerObject).val(self._utils.currentDate());

		$('.fa-solid.fa-square-plus',$layerObject).on('click',function(){
			let sioKind = $('select[name=sioKind]', $layerObject).val();
			let d = self._utils.serializeObject($inputInfo);
			d.cpNm = $('select[name=cpSeq] option:selected',$inputInfo).text();
			if(self._utils.checkEmptyNull(d.cpSeq)){
				alert('저장소를 입력 선택 하십시요');
				return;
			}
			if(self._utils.checkEmptyNull(d.sSeq) || self._utils.checkEmptyNull(d.sNm)){
				alert('물품명을 입력 선택 하십시요');
				return;
			}

			if(sioKind == 'I'){
				if(self._utils.checkEmptyNull(d.sioUnitPrice)){
					alert('물품명 구매 단가를 입력하십시요');
					return;
				}
			}
			d.sioCnt = d.sioCnt ?? 0;
			d.sioUnitPrice = d.sioUnitPrice ?? 0;
			d.sioCnt = self._utils.convertNumber(d.sioCnt);
			d.sioUnitPrice = self._utils.convertNumber(d.sioUnitPrice);
			inoutAdd($tbody, d);
			let $objs = $('input,select',$inputInfo);
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
							r.sPrice = v.sPrice;
							return r;

							//return {label:v.sNm + ((!self._utils.checkEmptyNull(v.sStandard)) ?'('+v.sStandard+')':''), value:v.sNm, sSeq:v.sSeq, sStandard : v.sStandard};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=sSeq]', $inputInfo).val(ui.item.sSeq);
				$( 'input[name=sStandard]', $inputInfo).val(ui.item.sStandard);
				$( 'input[name=sioUnitPrice]', $inputInfo).val(self._utils.numberWithCommas(ui.item.sPrice));
				$( 'select[name=cpSeq]', $inputInfo).trigger('focus');
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
		$('select[name=cpSeq]', $inputInfo).on('change',function(){
			$('input[name=sioCnt]',$inputInfo).trigger('focus');
		});
		$('input[name=sioCnt]',$layerObject).on('keypress',function(key){
			if(key.keyCode && key.keyCode==13)	{$('input[name=sioUnitPrice]',$layerObject).trigger('focus'); }
		});
		$(`.save`,$layerObject).on('click', function(e){
			let data = self._utils.serializeObject($layerObject);
			let $trs = $('tr', $tbody);
			let inoutInfo = [];
			for(let i=0;i<$trs.length;i++){
				let d = $($trs[i]).data("ROW");
				if(d != undefined && d.sSeq != undefined){
					inoutInfo.push(d);
				}
			}
			if(inoutInfo.length == 0){
				alert('등록된 물품이 없습니다.');
				return;
			}

			if( self._utils.checkRequired($layerObject)) {
				data.inoutInfo = inoutInfo;
				self.insertGroup(data, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$(`.btnClosePopLayer`,$layerObject).trigger('click');
						alert('등록 되었습니다.');
					} else {
						alert(resp.message);
					}
				});
			}

		});

		function inoutAdd($tbody, d){
			let $tr = $('<tr />');
			$tr.append($('<td class="al">'+ d.sNm +'</td>'));
			$tr.append($('<td class="al">'+ d.sStandard +'</td>'));
			$tr.append($('<td class="al">'+ d.cpNm +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioCnt) +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioUnitPrice) +'</td>'));
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
	stockInoutInsideLayer = (popupID) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.save`,$layerObject).text("등록");
		
		self._utils.focusEvent($('input[name=sioCnt]',$layerObject),'comma');

		let $inputInfo = $('.inoutInfo',$layerObject);
		let $tbody = $('.dataListTable tbody', $layerObject);

		self.cpSeqSelect($('select[name=cpSeq]',$inputInfo), undefined, function(data){
			$('select[name=toCpSeq]',$inputInfo).append($('select[name=cpSeq] option',$inputInfo).clone());
		});

		if($('input[name=sioDt]',$layerObject).val() == '')	$('input[name=sioDt]',$layerObject).val(self._utils.currentDate());

		$('.fa-solid.fa-square-plus',$layerObject).on('click',function(){
			let d = self._utils.serializeObject($inputInfo);
			d.cpNm = $('select[name=cpSeq] option:selected',$inputInfo).text();
			d.toCpNm = $('select[name=cpSeq] option:selected',$inputInfo).text();
			if(self._utils.checkEmptyNull(d.cpSeq)){
				alert('출고할 저장소를 입력 선택 하십시요');
				return;
			}
			if(self._utils.checkEmptyNull(d.toCpSeq)){
				alert('입고할 저장소를 입력 선택 하십시요');
				return;
			}
			if(d.cpSeq == d.toCpSeq){
				alert('입/출고 저장소가 동일합니다.');
				return;
			}
			if(self._utils.checkEmptyNull(d.sSeq) || self._utils.checkEmptyNull(d.sNm)){
				alert('물품명을 입력 선택 하십시요');
				return;
			}

			d.sioCnt = d.sioCnt ?? 0;
			d.sioCnt = self._utils.convertNumber(d.sioCnt);
			inoutAdd($tbody, d);
			let $objs = $('input,select',$inputInfo);
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
							return r;
							//return {label:v.sNm + ((!self._utils.checkEmptyNull(v.sStandard)) ?'('+v.sStandard+')':''), value:v.sNm, sSeq:v.sSeq, sStandard : v.sStandard};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$('input[name=sSeq]', $inputInfo).val(ui.item.sSeq);
				$( 'input[name=sStandard]', $inputInfo).val(ui.item.sStandard);
				$('input[name=sioCnt]', $inputInfo).trigger('focus');
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});


		$(`.save`,$layerObject).on('click', function(e){
			let data = self._utils.serializeObject($layerObject);
			let $trs = $('tr', $tbody);
			let inoutInfo = [];
			for(let i=0;i<$trs.length;i++){
				let d = $($trs[i]).data("ROW");
				if(d != undefined && d.sSeq != undefined){
					inoutInfo.push(d);
				}
			}
			if(inoutInfo.length == 0){
				alert('등록된 물품이 없습니다.');
				return;
			}

			if( self._utils.checkRequired($layerObject)) {
				data.inoutInfo = inoutInfo;
				self.insertInsideGroup(data, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$(`.btnClosePopLayer`,$layerObject).trigger('click');
						alert('등록 되었습니다.');
					} else {
						alert(resp.message);
					}
				});
			}

		});

		function inoutAdd($tbody, d){
			let $tr = $('<tr />');
			$tr.append($('<td class="al">'+ d.sNm +'</td>'));
			$tr.append($('<td class="al">'+ d.sStandard +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioCnt) +'</td>'));
			$tr.append($('<td class="al" style="border-right:0px;">'+ d.cpNm +'</td>'));
			$tr.append($('<td class="al" style="border-left:0px;border-right:0px;">▶</td>'));
			$tr.append($('<td class="al" style="border-left:0px;">'+ d.toCpNm +'</td>'));
			$tr.append($('<td class="ac" style="padding:0px;"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tbody.append($tr.data("ROW",d));
		}
	}

	stockInoutViewLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text(data.sNm + (!self._utils.checkEmptyNull(data.sStandard) ? '('+ data.sStandard +')':'') +  ' 수정');
		$(`.save`,$layerObject).text("수정");

		self._utils.focusEvent($('input[name=sioCnt]',$layerObject),'comma');
		self._utils.focusEvent($('input[name=sioUnitPrice]',$layerObject),'money');
		self.cpSeqSelect($('select[name=cpSeq]',$layerObject), data.cpSeq);

		$layerObject.data(data);
		self._utils.unSerializeObject($layerObject, data);

		$(`.save`,$layerObject).on('click', function(e){
			let data = self._utils.serializeObject($layerObject);
			let d = $layerObject.data();
			if( self._utils.checkRequired($layerObject)) {
				data.sioSeq = d.sioSeq;
				data.sSeq = d.sSeq;
				self.update(data, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$(`.btnClosePopLayer`,$layerObject).trigger('click');
						alert('수정 되었습니다.');
					} else {
						alert(resp.message);
					}
				});
			}
		});
	}


	stockInoutInsideViewLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text(data.sNm + (!self._utils.checkEmptyNull(data.sStandard) ? '('+ data.sStandard +')':'') + ' 내부이동 수정');
		$(`.save`,$layerObject).text("수정");
		self._utils.focusEvent($('input[name=sioCnt]',$layerObject),'comma');
		$layerObject.data(data);

		self.cpSeqSelect($('select[name=cpSeq]',$layerObject), data.cpSeq, function(d){
			$('select[name=toCpSeq]',$layerObject).append($('select[name=cpSeq] option',$layerObject).clone());
			$('select[name=toCpSeq]',$layerObject).val(data.toCpSeq);
		});
		self._utils.unSerializeObject($layerObject, data);

		$(`.save`,$layerObject).on('click', function(e){
			let data = self._utils.serializeObject($layerObject);
			let d = $layerObject.data();
			if( self._utils.checkRequired($layerObject)) {
				if(self._utils.checkEmptyNull($('select[name=cpSeq]',$layerObject).val())){
					alert('출고지를 지정하십시요');
					return;
				}
				if(self._utils.checkEmptyNull($('select[name=toCpSeq]',$layerObject).val())){
					alert('입고지를 지정하십시요');
					return;
				}
				data.sioSeq = d.sioSeq;
				data.sSeq = d.sSeq;
				self.insideUpdate(data, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$(`.btnClosePopLayer`,$layerObject).trigger('click');
						alert('수정 되었습니다.');
					} else {
						alert(resp.message);
					}
				});
			}

		});
	}

	cpSeqSelect = ($cpSeq, v , func) => {
		const self = this;
		let mapData = {ctl : 'place',cmd : 'nmList', cpType :'B'};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let data = rdata.data;
				for(let i=0;i<data.length;i++){
					$cpSeq.append('<option value="'+ data[i].cpSeq +'"'+((v != undefined && v == data[i].cpSeq) ? ' selected':'')+'>'+ data[i].cpNm +'</option>');
				}
				if(func != undefined && typeof func == 'function') func(data);
			} else {
				alert(rdata.message);
			}
		});
	}

	excelDownload = () =>{
		let self = this;
		const workbook = new ExcelJS.Workbook();
		let fileName = self._code.find(".pageHere strong").text();
		const sheet = workbook.addWorksheet(fileName);

		let columnInfos = [];
		columnInfos.push({name:"일자",key:"sioDt",width:10,align:'center'});
		columnInfos.push({name:"유형",key:"sioInsideYnNm",width:8,align:'center'});
		columnInfos.push({name:"구분",key:"sioKindNm",width:8,align:'center'});
		columnInfos.push({name:"자재명",key:"sNm",width:25,align:'left'});
		columnInfos.push({name:"저장소",key:"cpNm",width:25,align:'left'});
		columnInfos.push({name:"규격",key:"sStandard",width:30,align:'left'});
		columnInfos.push({name:"수량",key:"sioCnt",width:10,align:'right'});
		columnInfos.push({name:"단가",key:"sioUnitPrice",width:10,align:'right'});
		columnInfos.push({name:"총금액",key:"totalPrice",width:15,align:'right'});
		columnInfos.push({name:"메모",key:"sioMemo",width:50,align:'left'});
		columnInfos.push({name:"등록자",key:"eNm",width:10,align:'center'});
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
					/*
					let kindNm = [];
					for(let k=0;k<resp[i].kindInfo.length;k++) kindNm.push(resp[i].kindInfo[k].skCdNm);
					resp[i].kindInfo = kindNm.join(', ');
					*/
					let rowData = [];
					for(let c in columnInfos){	rowData.push(resp[i][columnInfos[c].key]?resp[i][columnInfos[c].key]:'');	}
					let row = sheet.addRow(rowData);
					row.eachCell((cell, colNum) => {self._parent._utils.excelStyleDataCell(cell,columnInfos[colNum - 1].align); });
				}
			} else {
				
				alert('데이타가 없습니다.');
				return false;
			}
			self._parent._utils.excelDownload(workbook, fileName + "("+ searchData.startDt+'-'+searchData.endDt +')').then(r => {});
		});

		
	}
	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'inoutList'
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
			cmd : 'inoutLoad'
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
			cmd : 'inoutDelete'
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
			cmd : 'inoutInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	insertGroup = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'inoutInsertGroup'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	insertInsideGroup = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'inoutInsertInsideGroup'
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
			cmd : 'inoutUpdate'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	insideUpdate = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'inoutInsideUpdate'
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
export default stockInoutController
