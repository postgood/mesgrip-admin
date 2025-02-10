
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let repairController = class {

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
	}

	init = (_code,_data) => {
		const self = this;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		/*
		// 달력인풋 및 달력아이콘 클릭시
		if($.datepicker != undefined){
			$.datepicker.setDefaults({changeYear:true,changeMonth:true,showButtonPanel:true});

			self._code.find("input.date").on("focus", function(){
				$(this).datepicker().datepicker("show");
			}).on("click", "img", function(){
				var input = $(this).prev("input.date");
				if(input.is(":disabled") == false){
					if(input.length==0) input = $(this).prev(".dateym");;
					input.focus();
				}
			});
		}
		*/

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});

		self._code.find(".btnCreate").on("click",function(e){
			self.layerView(function(data){
				self._parent.openLayer(data, self.initNewLayer);
			});
			
			e.stopPropagation();
		});

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=eqSeq]:checked");
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

			let _chkItem = chkBoxs.closest('tr').data('ROW');
			confirm('삭제하시겠습니까?', function(data){
				if(data) {

					self.delete({eqSeq : _chkItem.eqSeq, erSeq: _chkItem.erSeq}, function(resp) {
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

		searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addMonth(new Date(), -6)));
		searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(new Date()));

		self.retrieve();
	}

	purge = () => {
		const self = this;

		console.log("repairController purge");
	}

	reload = () => {
		const self = this;

		console.log("repairController reload");
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

		let startDt = searchWrap.find("input[name=startDt]").val().replace(/-/g,'');
		let endDt = searchWrap.find("input[name=endDt]").val().replace(/-/g,'');

		let searchData = {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : searchColumn,
			searchWord : searchWord,
			startDt : startDt,
			endDt : endDt
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

		let trHtml = '<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>';
				trHtml +='<td style="border:1px solid #dedede;"><input type="checkbox" class="vm" name="eqSeq" value="'+d.eqSeq+'"></td>';
				trHtml +='<td style="border:1px solid #dedede;">'+self._utils.dateformatStringToDate(d.erDt)+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" class="al">'+self._utils.nullTostring(d.eqNm, '')+'</td>';
				trHtml +='<td style="border:1px solid #dedede;" class="al pl5">'+self._utils.nullTostring(d.erMemo, '')+'</td>';
				trHtml +='<td style="border:1px solid #dedede;">'+d.creDate+'</td>';
				trHtml +='<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="수리 정보 수정" style="font-size:14px;"></i></td>';
				trHtml +='</tr>';

		let $trObj = $(trHtml).data("ROW",d);
		$(".btnOpenInfo", $trObj).on("click", function(){
			let _data = $(this).closest('tr').data('ROW');
			
			// 수리내역 데이터를 먼저 읽어온다
			self._client = {};
			self._client = _data;
			self.layerView(function(data){
				self._parent.openLayer(data, self.reloadLayer);
			});
		});

		$trObj.appendTo(tbody);
	}

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'equipment',
			cmd : 'repairList'
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
			ctl : 'equipment',
			cmd : 'repairDelete'
		}

		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}

	// popupview
	layerView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:520px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">수리이력 등록</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:260px;overflow-y:auto;padding:2px;">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch clientSave">저장</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="80px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">수리일시</th>';
		divHtml += '<td colspan="3"><input class="date crdrIp" type="text" name="erDt" placeholder="날짜 선택" readonly></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">장비명</th>';
		divHtml += '<td colspan="3"><input type="text" name="eqNm" class="w30p mr5" requiremsg="장비명" readonly><a class="btnStyle03 btnEquipmentSelect" href="javascript:void(0);">조회</a></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">수리내역</th>';
		divHtml += '<td colspan="3"><textarea name="erMemo" class="w95p" rows="4"></textarea></td>';
		divHtml += '</tr>';

		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
		
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}


	initNewLayer = (popupID) => {
		const self = this;

		self._mainPopID = popupID;

		$(`#${popupID} .title`).text("수리이력 등록");

		// 달력인풋 및 달력아이콘 클릭시
		if($.datepicker != undefined){
			$(`#${popupID} input.date`).on("focus", function(){
				$(this).datepicker().datepicker("show");
			}).on("click", "img", function(){
				var input = $(this).prev("input.date");
				if(input.is(":disabled") == false){
					if(input.length==0) input = $(this).prev(".dateym");;
					input.focus();
				}
			});
		}

		$(`#${popupID} .btnEquipmentSelect`).on('click', function(e){

			self.equipmentView(function(data){
				self._parent.openLayer(data, self.equipmentLayer);
			});
			
			e.stopPropagation();
		});

		$(`#${popupID} .clientSave`).on('click', function(e){
			let _data = $(this).data();

			let _erDt= $('input[name=erDt]', `#${popupID}`).val().replace(/-/g,'');
			let _eqNm = $('input[name=eqNm]', `#${popupID}`).val();
			let _eqSeq = $('input[name=eqNm]', `#${popupID}`).data('eqSeq');
			let _erMemo = $('textarea[name=erMemo]', `#${popupID}`).val();

			if( self._utils.checkRequired(`#${popupID}`)) {

				let mapData = {
					eqSeq : _eqSeq,
					erDt : _erDt,
					erMemo : _erMemo,
				}

				self.insert(mapData, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$(`#${popupID} .btnClosePopLayer`).trigger('click');
						alert('등록되었습니다.');
					} else {
						alert('등록에 실패하였습니다.');
					}
				});
			}

		}).text("저장");
	}

	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'equipment',
			cmd : 'repairInsert'
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

		self._mainPopID = popupID;

		$(`#${popupID} .title`).text("수리내역 수정");

		// 달력인풋 및 달력아이콘 클릭시
		if($.datepicker != undefined){
			$(`#${popupID} input.date`).on("focus", function(){
				$(this).datepicker().datepicker("show");
			}).on("click", "img", function(){
				var input = $(this).prev("input.date");
				if(input.is(":disabled") == false){
					if(input.length==0) input = $(this).prev(".dateym");;
					input.focus();
				}
			});
		}

		if (Object.keys(self._client).length === 0 && self._client.constructor === Object) {
			alert('수리이력 데이터를 불러올 수 없습니다');
			return false;
		}

		// 불러온 데이터를 화면에 표시한다.
		$('input[name=erDt]', `#${popupID}`).val(self._utils.dateformatStringToDate(self._client.erDt));
		$('input[name=eqNm]', `#${popupID}`).data({eqSeq:self._client.eqSeq}).val(self._client.eqNm);
		$('textarea[name=erMemo]', `#${popupID}`).val(self._client.erMemo);
		
		$(`#${popupID} .btnEquipmentSelect`).on('click', function(e){

			self.equipmentView(function(data){
				self._parent.openLayer(data, self.equipmentLayer);
			});
			
			e.stopPropagation();
		});


		$(`#${popupID} .clientSave`).data({eqSeq:self._client.eqSeq, erSeq: self._client.erSeq}).on('click', function(e){
			let _data = $(this).data();

			let _erDt= $('input[name=erDt]', `#${popupID}`).val().replace(/-/g,'');
			let _eqNm = $('input[name=eqNm]', `#${popupID}`).val();
			let _eqSeq = $('input[name=eqNm]', `#${popupID}`).data('eqSeq');
			let _erMemo = $('textarea[name=erMemo]', `#${popupID}`).val();

			if( self._utils.checkRequired(`#${popupID}`)) {

				// 필수 항목 체크
				if(!_data.erSeq || !_eqSeq) {
					alert('코드가 없어 수정불가합니다');
					return false;
				}

				let mapData = {
					eqSeq : _eqSeq,
					erSeq : _data.erSeq,
					erDt : _erDt,
					erMemo : _erMemo,
				}

				self.update(mapData, function(resp){
					if(resp.code==0) {
						self.retrieve();
						$(`#${popupID} .btnClosePopLayer`).trigger('click');
						alert('수정되었습니다.');
					} else {
						alert('수정에 실패하였습니다.');
					}
				});
			}

		}).text("수정");
	}

	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'equipment',
			cmd : 'repairUpdate'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	equipmentView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:740px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">장비 선택</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:320px;overflow-y:auto;padding:2px;">';
		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType07 tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="33%">';
		divHtml += '<col width="7%">';
		divHtml += '<col width="31%">';
		divHtml += '<col width="21%">';
		divHtml += '<col width="8%">';
		divHtml += '</colgroup>';
		divHtml += '<thead>';
		divHtml += '<tr>';
		divHtml += '<th>장비명</th>';
		divHtml += '<th>사용여부</th>';
		divHtml += '<th>공정</th>';
		divHtml += '<th>담당자</th>';
		divHtml += '<th class="last">선택</th>';
		divHtml += '</tr>';
		divHtml += '</thead>';
		divHtml += '<tbody class="equipmentList">';
		divHtml += '</tbody>';
		divHtml += '</table>';
		
		divHtml += '</div></div></div></div></div>';

		cbfunc(divHtml);
	}

	equipmentLayer = (popupID) => {
		const self = this;

		self.equipmentList(function(resp){

			let $target = $(`#${popupID} .equipmentList`).empty();

			if(resp.code == 0) {

				for(let i in resp.data) {
					let _data = resp.data[i];
					let trItem = $(`<tr><td>${self._utils.nullTostring(_data.eqNm, '')}</td><td>${self._utils.nullTostring(_data.useYn, '')}</td><td>${self._utils.nullTostring(_data.eqProcess, '')}</td><td>${self._utils.nullTostring(_data.eqEmployee, '')}</td><td><a class="btnStyle03 btnSelect" href="javascript:void(0);">선택</a></td></tr>`);

					$(trItem).find(".btnSelect").data({eqNm:_data.eqNm, eqSeq:_data.eqSeq}).on('click',function(e){
						let _evtData = $(this).data();
						$(`#${self._mainPopID} input[name=eqNm]`).data({eqSeq:_evtData.eqSeq}).val(self._utils.nullTostring(_evtData.eqNm, ''));
						$(`#${popupID} .btnClosePopLayer`).trigger('click');
					});

					$(trItem).appendTo($target);
				}
			}
		});
	}

	equipmentList = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'equipment',
			cmd : 'list'
		}

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

}
export default repairController