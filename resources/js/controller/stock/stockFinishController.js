
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let stockFinishController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._yyyy = null;
		this._finishPlace = null;
		this._info = null;
	}

	init = (_code,_data) => {
		const self = this;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		let startYear =  2023;
		let now = new Date();
		let year= now.getFullYear();
		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});
		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});
		self._code.find(".btnCreate").on("click",function(e){
			let $popDiv = $('template#stockDiv');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);

			e.stopPropagation();
		});
		self._code.find(".btnAdjust").on("click",function(e){
			let $popDiv = $('template#stockAdjustDiv');
			self._parent.openLayer($popDiv.html(),self.stockAdjustDiv);

			e.stopPropagation();
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
		let $searchWrap = self._code.find(".searchWrapArea");
		let $thead = self._code.find(".dataHeadTable thead");
		let $tfoot = self._code.find(".pageInfoTfoot");
		let $tbody = self._code.find(".dataListTable");
		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		let $yyyy = $('select[name=yyyy]',$searchWrap);
		for(;startYear <= year; startYear++){
			$yyyy.append('<option value="'+ startYear +'"'+((startYear == year)?' selected':'')+'>'+ startYear+'</option>');
		}

		let mapData = {ctl : 'place',cmd : 'nmList', cpType :'B', useYn : 'Y'};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $cpSeq = $('select[name=cpSeq]',$searchWrap);
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
		$('.btnStockFinish',$searchWrap).on('click',function(){
			let year = $('select[name=yyyy]',$searchWrap).val();
			let info = {yyyy:year};
			let $div = $('template#stockFinishInsert');
			self._parent.openLayer($div.html(), self.stockFinishInsertEvent, info);
		});
		$('.btnStockFinishCancel',$searchWrap).on('click',function(){
			let $div = $('template#stockFinishCancel');
			self._parent.openLayer($div.html(), self.stockFinishCancelEvent,self._info);
		});
		
		$('input[name=searchWord]',$searchWrap).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockNmSearch', nmOnly:'Y', searchWord : this.term};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.sNm, value:v.sNm};
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


		$tbody.on('click','.btnOpenInfo', function(){
			let _data = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#stockAdjustDiv');
			self._finishPlace = _data;
			self._parent.openLayer($popDiv.html(),self.stockAdjustViewDiv,_data);
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
		let $pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rowsPerPage]").val();
		let page = $pageTfoot.find("input[name=page]").val();
		let $searchWrap = self._code.find(".searchWrapArea");
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let searchColumn = $searchWrap.find("select[name=searchColumn]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let cpSeq = $searchWrap.find("select[name=cpSeq]").val();
		let skCd = $searchWrap.find("select[name=skCd]").val();
		let stSeq = $searchWrap.find("select[name=stSeq]").val();
		let yyyy = $searchWrap.find("select[name=yyyy]").val();

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
			stSeq : stSeq,
			yyyy : yyyy
		}
	}
	retrieve = () => {
		const self = this;

		let $pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rowsPerPage]").val();
		let page = $pageTfoot.find("input[name=page]").val();

		let $searchWrap = self._code.find(".searchWrapArea");
		let orderColumn = $searchWrap.find("input[name=orderculumn]").val();
		let orderType = $searchWrap.find("input[name=orderby]").val();
		let searchColumn = $searchWrap.find("select[name=searchColumn]").val();
		let searchWord = $searchWrap.find("input[name=searchWord]").val();
		let cpSeq = $searchWrap.find("select[name=cpSeq]").val();
		let skCd = $searchWrap.find("select[name=skCd]").val();
		let stSeq = $searchWrap.find("select[name=stSeq]").val();
		let yyyy = $searchWrap.find("select[name=yyyy]").val();

		let searchData = {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'sNm',
			searchWord : searchWord,
			cpSeq : cpSeq,
			stSeq : stSeq,
			skCd : skCd,
			yyyy : yyyy,
		}
		self._yyyy = yyyy;
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
						$('.totalPrice',$searchWrap).text(self._utils.numberWithCommas(resp[i].totalPrice));
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
						self._info = resp[i];
						if(self._utils.checkEmptyNull(resp[i].sfSeq)){
							$('.btnStockFinish',$searchWrap).show();
							$('.btnStockFinishCancel',$searchWrap).hide();
						}else{
							$('.btnStockFinish',$searchWrap).hide();
							$('.btnStockFinishCancel',$searchWrap).show();
						}
					}
					self.display($tbody, resp[i]);
				}
				self._utils.tbodyMerge($tbody,[0,1,2,3,4,5],"sSeq");
			} else {
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});
	}

	display = (tbody, d) => {
		const self = this;
		let markNm = '일반';
		if(d.sMarkYn == 'Y') markNm = '<i class="fa-solid fa-check" title="주요자재"></i>';
		let holdTag = '';
		if(d.sfcHoldYn == 'Y'){
			holdTag = '마감';
		}else{
			holdTag = '-';
			if(d.sfpcAujustCnt > 0) {
				holdTag = '<i class="fa-solid fa-magnifying-glass cursorPointer btnOpenInfo" title="조정 내역 조회"></i>';
			}
		}
		let $tr = $('<tr />');
		$tr.append($('<td class="'+ ((d.sMarkYn == "Y")?'txt_red':'')+'">'+ markNm +'<input type="hidden" name="sSeq" value="'+ d.sSeq +'"></td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al pl5" />').append(self._utils.nullTostring(d.sNm, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(self._utils.nullTostring(d.sStandard, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sfcCnt)));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sfcPrice)));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sTotalPrice)));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(d.cpNm));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sfpcCnt)));
		$tr.append($('<td style="border:1px solid #dedede;">'+ holdTag +'</td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
	
	}

	

	// popupview

	stockAdjustEvent = ($layerObject, info) =>{
		const self = this;

		self._utils.focusEvent($('input[name=sioRealCnt]',$layerObject),'comma');
		let $inputInfo = $('.inoutInfo',$layerObject);
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
		let $tbody = $('.dataListTable tbody', $layerObject);
		$('select[name=cpSeq]',$layerObject).on('change',function(){
			let sSeq = $('input[name=sSeq]',$layerObject).val();
			let cpSeq = $(this).val();
			let mapData = {ctl : 'stock',cmd : 'finishPlaceCntList', yyyy : self._yyyy, sSeq : sSeq, cpSeq : cpSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					if(rdata.data.length == 0){
						$('input[name=splCnt]', $inputInfo).val(0);
					}else if(rdata.data.length == 1){
						$('input[name=splCnt]', $inputInfo).val(self._utils.numberWithCommas(rdata.data[0].splCnt));
					}else{
						for(let i=0;i<rdata.data.length;i++){
							let d = rdata.data[i];
							if(d.cpSeq == cpSeq && d.sSeq == sSeq){
								$('input[name=splCnt]', $inputInfo).val(self._utils.numberWithCommas(d.splCnt));
							}
						}
					}
				}
			});
		})
		
		$('input[name=sNm]',$layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockNmSearch', searchWord : this.term};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.sNm + ((!self._utils.checkEmptyNull(v.sStandard))?'('+v.sStandard+')':''), value:v.sNm, sSeq:v.sSeq, sStandard : v.sStandard};
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
				$( 'select[name=cpSeq]', $inputInfo).trigger('change').trigger('focus');
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});

		$('.fa-solid.fa-square-plus',$layerObject).on('click',function(){
			let $finishPlaceInfo = $('.finishPlaceInfo',$layerObject);
			let d = self._utils.serializeObject($finishPlaceInfo);
			d.cpNm = $('select[name=cpSeq] option:selected',$finishPlaceInfo).text();
			if(self._utils.checkEmptyNull(d.cpSeq)){
				alert('저장소를 입력 선택 하십시요');
				return;
			}
			d.sioRealCnt = d.sioRealCnt ?? 0;
			d.splCnt = d.splCnt ?? 0;
			d.splRealCnt = self._utils.convertNumber(d.splRealCnt);
			d.splCnt = self._utils.convertNumber(d.splCnt);
			if(d.splCnt == d.splRealCnt){
				alert('현재고량과 실재고량이 동일합니다.');
				return;
			}
			adjustAdd($tbody, d);
			let $objs = $('input,select',$finishPlaceInfo);
			for(let i=0;i<$objs.length;i++) $($objs[i]).val('');
		});

		$tbody.on('click','.fa-solid.fa-square-minus',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			if(d != undefined && d.sioSeq != undefined){
				confirm('바로 삭제 처리 됩니다.<br/>그래도 삭제 하시겠습니까?',function(is){
					if(is){
						let data = {sioSeq: d.sioSeq, sSeq : d.sSeq}
						self.delete(data, function(rdata){
							if(rdata.code == 0){
								$tr.remove();
							}else{
								alert(rdata.message);
							}
						});
					}
				});
			}else{
				confirm('삭제 하시겠습니까?',function(is){
					if(is){
						$tr.remove();
					}
				});
			}
			
		});

		if(info != undefined && info.length > 0){
			let cnt = self._finishPlace.sfpcCnt;
			for(let i=info.length-1;i>=0;i--){
				info[i].splRealCnt = cnt;
				if(info[i].sioKind == 'I'){
					cnt = info[i].splRealCnt - info[i].sioCnt;
				}else{
					cnt = info[i].splRealCnt + info[i].sioCnt;
				}
				info[i].splCnt = cnt;
			}

			for(let i=0;i<info.length;i++){
				adjustAdd($tbody, info[i]);
			}
		}

		$(`.save`,$layerObject).on('click', function(e){
			let data = self._utils.serializeObject($layerObject);
			data.yyyy = self._yyyy;
			let $trs = $('tr', $tbody);
			let inoutInfo = [];
			for(let i=0;i<$trs.length;i++){
				let d = $($trs[i]).data("ROW");
				if(d != undefined && d.cpSeq != undefined){
					inoutInfo.push(d);
				}
			}
			if(inoutInfo.length == 0){
				alert('저장소를 선택하여 실재고량을 등록 하십시요');
				return;
			}

			data.adjustInfo = inoutInfo;

			self.adJustinsert(data, function(resp){
				if(resp.code==0) {
					self.retrieve();
					$(`.btnClosePopLayer`,$layerObject).trigger('click');
					alert('등록 되었습니다.');
				} else {
					alert(resp.message);
				}
			});
		});

		function adjustAdd($tbody, d){
			let $tr = $('<tr />');
			$tr.append($('<td class="al">'+ d.sNm +'</td>'));
			$tr.append($('<td class="al">'+ d.sStandard +'</td>'));
			$tr.append($('<td class="al">'+ d.cpNm +'</td>'));
			$tr.append($('<td class="ar" style="border-right:0px;">'+ self._utils.numberWithCommas(d.splCnt) +'</td>'));
			$tr.append($('<td class="ac" style="border-right:0px;border-left:0px;">▶</td>'));
			$tr.append($('<td class="ar" style="border-left:0px;">'+ self._utils.numberWithCommas(d.splRealCnt) +'</td>'));
			$tr.append($('<td class="ac" style="padding:0px;"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tbody.append($tr.data("ROW",d));
		}
	}

	stockAdjustDiv = (popupID) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.save`,$layerObject).text("등록");
		self.stockAdjustEvent($layerObject);
	}


	stockAdjustViewDiv = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text(data.sNm + " 조정내역");
		$('.mw_defalut',$layerObject).css('background','#b1d1e8');
		$('.overflowYListdiv',$layerObject).css('height','103px');
		$('.bottonWrap',$layerObject).remove();
		$('.inoutInfo',$layerObject).remove();
		$layerObject.data(data);
		let mapData = {
			ctl : 'stock',
			cmd : 'finishAdjustList',
			cpSeq : data.cpSeq,
			sSeq :data.sSeq,
			yyyy : self._yyyy
		}
		let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				if(rdata.data.length > 0 ){
					$(".btnClosePopLayer",$layerObject).on('click',function(){
						self.retrieve();
					});
					self.stockAdjustEvent($layerObject,rdata.data);
				}else{
					alert(rdata.message);
				}
			}
		});

		
	}
	stockFinishInsertEvent = (popupID,info) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);

		$('.yeraFinish',$layerObject).text(self._yyyy +'년');
		$('.eNm',$layerObject).text(self._const.__USER_NAME);

		$layerObject.on('click','.save',function(){
			let sfPassword = $('input[name=sfPassword]', $layerObject).val();
			let sfPassword2 = $('input[name=sfPassword2]', $layerObject).val();
			if(self._utils.checkEmptyNull(sfPassword)){
				alert('마감 비밀번호를 입력하십시요');
				return;
			}

			if(sfPassword.length < 5){
				alert('마감 비밀번호는 5자리 이상으로 입력하십시요');
				return;
			}
			if(sfPassword != sfPassword2){
				alert('비밀번호가 정확하지 않습니다.');
				return;
			}
			

			info.sfPassword = sfPassword;
			self.stockFinsh(info, function(data){
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
	
	stockFinishCancelEvent = (popupID,info) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);
		$('.yeraFinish',$layerObject).text(self._yyyy +'년');
		$('.eNm',$layerObject).text(info.eNm);
		$('.creDate',$layerObject).text(info.creDate);
		$layerObject.on('click','.save',function(){
			let sfPassword = $('input[name=sfPassword]', $layerObject).val();
			if(self._utils.checkEmptyNull(sfPassword)){
				alert('마감 비밀번호를 입력하십시요');
				return;
			}
			info.yyyy = self._yyyy;
			info.sfPassword = sfPassword;
			self.stockFinshCancel(info, function(data){
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

		let columnInfos = [];
		columnInfos.push({name:"중요",key:"sMarkYn",width:5,align:'center'});
		columnInfos.push({name:"자재명",key:"sNm",width:25,align:'left'});
		columnInfos.push({name:"규격",key:"sStandard",width:30,align:'left'});
		columnInfos.push({name:"총재고량",key:"sfcCnt",width:10,align:'right'});
		columnInfos.push({name:"평균단가",key:"sfcPrice",width:12,align:'right'});
		columnInfos.push({name:"총금액",key:"sTotalPrice",width:15,align:'right'});
		columnInfos.push({name:"보관창고",key:"cpNm",width:50,align:'left'});
		columnInfos.push({name:"수량",key:"sfpcCnt",width:10,align:'right'});
		columnInfos.push({name:"마감",key:"holdYn",width:5,align:'center'});

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
					if(resp[i].sfcHoldYn == 'Y'){
						resp[i].holdYn = 'Y';
					}else{
						resp[i].holdYn = 'N';
					}
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
			cmd : 'finishList'
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
	adJustinsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'finishPlaceAdjustInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	stockFinsh = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'finishInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	stockFinshCancel = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'finishDelete'
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
export default stockFinishController