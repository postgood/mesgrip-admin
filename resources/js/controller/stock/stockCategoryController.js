
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let stockCategoryController = class {
	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._scSeq = null;
		this._categoryInfo = null;
	}

	init = (_code,_data) => {
		const self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};
		let $leftDiv = $('.f_lt', self._code);
		let $rightDiv = $('.f_rt', self._code);
		let $searchWrap = $(".searchWrap",self._code);
		let $rightThead = $(".dataHeadTable thead", $rightDiv);
		let $rightTfoot = $(".pageInfoTfoot", $rightDiv);
		let $rightTbody = $(".dataListTable", $rightDiv);

		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
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


		self._code.find(".btnCategoryDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = $(".dataListTable tbody",$leftDiv);
			let chkBoxs = tbody.find("input[name=scSeq]:checked");
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
			confirm('삭제하시겠습니까?', function(is){
				if(is) {
					let info = self.getCategoryInfo(data.scSeq);
					if(info != undefined){
						if(info.node.length > 0){
							confirm('하위 분류가 존재합니다.</br> 그래도 삭제하시겠습니까?', function(is){
								if(is) {	
									deleteAction();
								}
							}, '하위 분류까지 삭제');
						}else{
							deleteAction();
						}
					}
					
				}
			});

			function deleteAction (){
				self.categoryDelete({scSeq : data.scSeq}, function(resp) {
					if(resp.code==0) {
						self.retrieve();
						alert('삭제되었습니다');
					} else {
						$("input[name=chckAll]",$leftDiv).prop("checked", false);
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
		self._code.find(".btnStockDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = $(".dataListTable tbody",$rightDiv);
			let chkBoxs = tbody.find("input[name=sclSeq]:checked");
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
			confirm('삭제하시겠습니까?', function(is){
				if(is) {
					self.stockDelete({sclSeq : data.sclSeq}, function(resp) {
						if(resp.code==0) {
							self.retrieve();
							alert('삭제되었습니다');
						} else {
							$("input[name=chckAll]",$rightDiv).prop("checked", false);
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

		$("input[name=startDt]", $searchWrap).val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -3)));
		$("input[name=endDt]", $searchWrap).val(self._utils.dateformatKorDate(new Date()));
		self._defaultData = self._utils.serializeObject($searchWrap);

		/******** 좌측 이벤트 정의 ********/ 
		


		// 목록 테이블 이벤트 정의
		$('.btnCategoryCreate', $leftDiv).on('click',function(){
			let $popDiv = $('template#stockCategoryViewDiv');
			self._parent.openLayer($popDiv.html(), self.layerCategoryCreateEvent);
		});
		let $leftThead = $(".dataHeadTable thead", $leftDiv);
		let $leftTfoot = $(".pageInfoTfoot",$leftDiv);
		let $leftTbody = self._code.find(".f_lt .dataListTable");
		// 관리자인 경우 생성
		if(self._const.__MANAGER_YN == 'Y'){}
		


		$leftTbody.on('click','.categoryCreate',function(){
			let d = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#stockCategoryViewDiv');
			self._parent.openLayer($popDiv.html(), self.layerCategoryCreateEvent, d);
		});
		
		$leftTbody.on('click','.categoryNm',function(){
			let choiceColor = '#d3e1ff';
			let $tbody = $(this).closest('tbody');
			let $tr = $(this).closest('tr');
			let d = $tr.data('ROW');
			$tbody.find('td').css({'background':'', 'font-weight': ''});
			$tr.find('td').css({'background':choiceColor, 'font-weight': 'bold'});
			$rightTfoot.find("input[name=scSeq]").val(d.scSeq);
			$rightTfoot.find("input[name=page]").val(1);
			self._scSeq = d.scSeq;
			self.stockRetrieve();
		});
		$leftTbody.on('click','.btnInfoEdit',function(){
			let d = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#stockCategoryViewDiv');
			self._parent.openLayer($popDiv.html(), self.layerCategoryEditEvent, d);
		});
		
		self.retrieve();

		/*********** 좌측 이벤트 정의 완료 ****************/

		/*********** 우측 이벤트 정의 ****************/
		// 목록 테이블 이벤트 정의



		$("input[name=chckAll]",$rightDiv).on("click",function(e){
			e.stopPropagation();
			let $boxs = $rightTbody.find("input[name=lpSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<$boxs.length;i++){
				let $box = $($boxs[i]);
				if($box.is(":checked") != status) $box.trigger('click');
			}
		});

		$rightDiv.on('click','.btnStockAdd',function(){
			let $popDiv = $('template#categoryStockInsertDiv');
			self._parent.openLayer($popDiv.html(), self.layerStockInsertEvent);

		});

		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) $rightTfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		$rightTfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			 $rightTfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
		self._utils.mdiPaging($rightTfoot.find(".pagenate"),0,20,0,10,1,self.goPage);
//		self.payRetrieve();
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

		self.categroyTreelist(searchData, function(resp){
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
				self._categoryInfo = resp;
				$('.categoryNm:first', $tbody).trigger('click');
				// self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,7],"oSeq");
			} else {
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			//self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);

		});
	}

	display = ($tbody, d) => {
		const self = this;
		let level = '';
		for(let i=0;i<d.scLevel ; i++){
			if(i == (d.scLevel - 1)){
				level += '<span style="width:15px;display: inline-block;"></span><span style="width:15px;display: inline-block;"><i class="fa-solid fa-arrow-right"></i></span>';
			}else{
				level += '<span style="width:15px;display: inline-block;"></span>';
			}
		} 
		let btnSubCreate = '<i class="fa-solid fa-folder-plus cursorPointer categoryCreate" style="color:#dbd581;font-size:15px;" title="하위 구조 만들기"></i>';
		console.log(d)
		if(d.scLevel >= 2)  btnSubCreate = '';

		let $tr = $('<tr/>');
		$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="scSeq" value="'+d.scSeq+'"/>')));
		$tr.append($('<td class="al pl5 pr5 " style="border-right:0px;">'+ level + '<span class="categoryNm cursorPointer" style="display: inline-block;">'+ self._utils.nullTostring(d.scNm, '')+'</span></td>'));
		$tr.append($('<td class="ac" style="border-left:0px;border-right:0px;">'+ btnSubCreate +'</td>'));
		$tr.append($('<td class="ac pl0 pr0 " style="border-left:0px;"><a href="javascript:void(0);" class="btnInfoEdit" title="수정"><i class="fa-regular fa-pen-to-square cursorPointer" style="color:font-size: 14px;"></i></a></td>'));
		$tr.append($('<td class="ar pl5 pr5">'+self._utils.numberWithCommas(d.itemCnt)+'</td>'));
		$tr.append($('<td class="al pl5 pr5">'+((self._utils.checkEmptyNull(d.scMemo))?'':d.scMemo)+'</td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
		if(d.node != undefined && d.node.length > 0){
			for(let i=0;i<d.node.length;i++) self.display( $tbody, d.node[i]);
		}
	}
	layerCategoryCreateEvent = (popupID, info) => {
		let self = this;
		let $layerObject = $(`#${popupID}`);
		$('.title',$layerObject).text('등록');
		if(info == undefined){
			$('.parentPath', $layerObject).text('/');
		}else{
			$('.parentPath', $layerObject).text(info.path + '/');
			$('input[name=scParentSeq]',$layerObject).val(info.scSeq);
		}

		$('.save',$layerObject).on('click',function(){
			let data = self._utils.serializeObject($layerObject);
			if(data.scNm == ''){
				alert('분류명을 입력하십시요');
			}
			if(self._utils.checkEmptyNull(data.scSeq)){
				self.categoryInsert(data, function(rdata){
					if(rdata.code == 0){
						$(".btnClosePopLayer",$layerObject).trigger('click');
						self.retrieve();
						alert('등록되었습니다.');

					}else{
						alert(rdata.message);
					}

				});

			}else{
				alert('상위 정보를 찾을 수 없습니다.');
			}
		});
	}

	layerCategoryEditEvent = (popupID, info) => {
		let self = this;
		let $layerObject = $(`#${popupID}`);
		$('.title,.save',$layerObject).text('수정');
		if(info == undefined){
			alert('분류 정보가 없습니다.')
			return;
		}else{
			$('.parentPath', $layerObject).text(info.path + '/');
			self._utils.unSerializeObject($layerObject, info);
		}

		$('.save',$layerObject).on('click',function(){
			let data = self._utils.serializeObject($layerObject);
			if(data.scNm == ''){
				alert('분류명을 입력하십시요');
			}
			self.categoryUpdate(data, function(rdata){
				if(rdata.code == 0){
					$(".btnClosePopLayer",$layerObject).trigger('click');
					self.retrieve();
					alert('수정되었습니다.');

				}else{
					alert(rdata.message);
				}

			});
		});
	}




	stockRetrieve = (data) => {
		const self = this;
		let $pageTfoot = self._code.find(".f_rt .pageInfoTfoot");
		let pageSize = $pageTfoot.find("select[name=rowsPerPage]").val();
		let page = $pageTfoot.find("input[name=page]").val();
		let $searchWrap = self._code.find(".searchWrap");
		let orderColumn = $pageTfoot.find("input[name=orderculumn]").val();
		let orderType = $pageTfoot.find("input[name=orderby]").val();
		let scSeq = $pageTfoot.find("input[name=scSeq]").val();


		let searchData = {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'sNm',
			//searchWord : searchWord,
			scSeq : scSeq,
		}
		self.stockList(searchData, function(resp){
			let $tbody = self._code.find(".f_rt .dataListTable tbody");
			let $thead = self._code.find(".f_rt .dataHeadTable thead");
			
			$tbody.empty();
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.data.length > 0) {
				let rdata = resp.data;
				for(let i in rdata){
					if(i==0){
						total = rdata[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
					}
					self.stockDisplay($tbody, rdata[i]);
				}
				let $trs = $('tr',$tbody);
				for(let t =0;t<$trs.length;t++) $($($trs[t]).find('td').eq(8)).css('border-right','1px solid #dedede !important;');
			} else {
				$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
			}
			self._utils.mdiPaging($pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);

		});
	}

	stockDisplay = ($tbody, d) => {
		const self = this;
		let placeInfo = d.placeInfo;
		let place = '';
		for(let i=0;i<placeInfo.length;i++){
			let p = placeInfo[i];
		 	place += '<span style="display:inline-block;width:100%;">'+ p.cpNm +' : <strong>'+ self._utils.numberWithCommas(p.splCnt) +'</strong></span>';
		}
		let kindNm = [];
		for(let i=0;i<d.kindInfo.length;i++) kindNm.push(d.kindInfo[i].skCdNm);

		let $tr = $('<tr/>');
		$tr.append($('<td></td>').append($('<input type="checkbox" class="vm" name="sclSeq" value="'+d.sclSeq+'"/>')));
		$tr.append($('<td class="ac">'+kindNm.join(', ')+'</td>'));
		$tr.append($('<td class="al">'+d.sNm+'</td>'));
		$tr.append($('<td class="al pl5 pr5"></td>').append(d.sStandard ));
		$tr.append($('<td class="ar pl5 pr5"/>'+self._utils.numberWithCommas(d.sCnt, '0')+'</td>'));
		$tr.append($('<td class="al"/>'+ place+ '</td>'));
		$tr.append($('<td class="al"/>'+ d.sMemo+ '</td>'));
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	} 
	
	layerStockInsertEvent = (popupID) =>{
		let self = this;
		let $layerObject = $(`#${popupID}`);
		let $tbody = $('.dataListTable tbody', $layerObject);
		/*
		$('input[name=sCode]',$layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockCodeSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.sCode +'('+ v.sNm +')', value:v.sCode, v:v};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=sSeq]', $layerObject).val(ui.item.v.sSeq);
				$( 'input[name=sNm]', $layerObject).val(ui.item.v.sNm);
				$( 'input[name=sStandard]', $layerObject).val(ui.item.v.sStandard);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
		*/
		$('input[name=sNm]',$layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'stock',cmd : 'stockNmSearch',searchWord : this.term,};
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
							r.v = v;
							return r;

							//return {label:v.sNm +'('+ v.sStandard +')', value:v.sCode, v:v};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=sSeq]', $layerObject).val(ui.item.v.sSeq);
				$( 'input[name=sCode]', $layerObject).val(ui.item.v.sCode);
				$( 'input[name=sStandard]', $layerObject).val(ui.item.v.sStandard);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});

/*
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
*/		
		$('.stockAdd',$layerObject).on('click',function(){
			let data = self._utils.serializeObject($('.stockInfo',$layerObject));
			if(data.sSeq == undefined){
				alert('자재명 또는 코드를 입력하여 선택하십시요');
				return;
			}
			stockAdd(data);
			$($(this).closest('tr')).find('input').val('');

		});

		function stockAdd(d){
			let $trs = $('tr',$tbody);
			for(let i=0;i<$trs.length;i++){
				let data = $($trs[i]).data("ROW");
				if(data == undefined || data.sSeq == undefined){
					$($trs[i]).remove();
				}else if(data.sSeq == d.sSeq){
					alert('이미 등록되어 있습니다.')
					return false;
				}
			}

			let btnSubCreate = '<a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus stockDel" style="color:#8071bb;font-size: 18px;"></i></a>';
			let $tr = $('<tr/>');
			//$tr.append($('<td class="al pl5 pr5 " style="border-right:0px;">'+ d.sCode +'</td>'));
			$tr.append($('<td class="al pl5 pr5 " style="border-right:0px;">'+ d.sNm +'</td>'));
			$tr.append($('<td class="al pl5 pr5 " style="border-right:0px;">'+ d.sStandard +'</td>'));
			$tr.append($('<td class="ac pl0 pr0 " style="border-right:0px;">'+ btnSubCreate +'</td>'));
			$tr.data("ROW",d);
			$tr.appendTo($tbody);
			return true;
		}

		$tbody.on('click','.stockDel',function(){
			let $tr = $(this).closest('tr');
			$tr.remove();
		});

		$layerObject.find('input[name=sCode],input[name=sNm]').on('keypress', function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					$('.stockAdd',$layerObject).trigger('click');
				}
			}
		});

		$layerObject.on('click','.save',function(){
			let $trs = $('tr', $tbody);
			let mapData = {sSeqs:[],scSeq: self._scSeq};
			for(let i=0;i<$trs.length;i++){
				let d = $($trs[i]).data('ROW');
				mapData.sSeqs.push(d.sSeq);
			}
			self.stockInsert(mapData,function(rdata){
				if(rdata.code == 0){
					alert('등록 되었습니다.');
					self.stockRetrieve();
					$(`.btnClosePopLayer`,$layerObject).trigger('click');

				}else{
					alert(rdata.message);
				}

			});

			
		});
	}
	getCategoryInfo = (scSeq) => {
		let self = this;
		let category = self._categoryInfo;
		for(let i=0;i<category.length;i++){
			if(category[i].scSeq == scSeq){
				return category[i];
			}else{
				if(category[i].node != undefined && category[i].node.length > 0){
					let info = getInfo(category[i].node, scSeq);
					if(info != undefined) return info;
				}
			}
		}
		function getInfo(node, scSeq){
			for(let i=0;i<node.length;i++){
				if(node[i].scSeq == scSeq){
					return node[i];
				}else{
					if(node[i].node != undefined && node[i].node.length > 0){
						let info = getInfo(node[i].node, scSeq);
						if(info != undefined) return info;
					}
				}
			}	
		}
		return null;
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

	categroyTreelist = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'stock',
			cmd : 'categoryTreeList',
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
	categoryInsert = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'stock',
			cmd : 'categoryInsert',
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':!document.fullscreenElement});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}
	categoryUpdate = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'stock',
			cmd : 'categoryUpdate',
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':!document.fullscreenElement});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}



	categoryDelete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'categoryDelete',
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}
	stockList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'categoryStockList',
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

	
	stockInsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'categoryLinkInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	stockDelete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
			cmd : 'categoryLinkDelete'
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
export default stockCategoryController
