
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let processController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._pro = {
			plus : 1,
			minus : 1
		}
		this._stndList = [];
		this._process = []
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
			self.layerView(function(data){
				self._parent.openLayer(data, self.initNewLayer); 
			});
			e.stopPropagation();
		});
		
		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=cwSeq]:checked");
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
					let cwSeq = chkBoxs.val();

					self.delete({cwSeq : cwSeq}, function(resp) {
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
			let boxs = tbody.find("input[name=cwSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
			
		});

		let mapData = {ctl : 'process',cmd : 'companyProcessList',};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
			  let obj = $( 'select[name=spSeq]', self._code);
			  obj.empty();
			  obj.append($('<option value="">전체</option>'));
			  for(let i=0;i<rdata.data.length;i++){
				  let opt = $('<option value="'+ rdata.data[i].spSeq +'">'+ rdata.data[i].spNm +'</option>');
				  obj.append(opt);
			  }
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
			// 공정 데이터를 먼저 읽어온다
			self.companyLoad({cwSeq:_data.cwSeq}, function(resp){
				if(resp.code == 0) {
					self.layerView(function(data){
						self._parent.openLayer(data, self.reloadLayer, resp.data);
					});
				} else {
					alert('공정 데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.workCopy', function(){
			let _data = $(this).closest('tr').data('ROW');
			// 공정 데이터를 먼저 읽어온다
			self.companyLoad({cwSeq:_data.cwSeq}, function(resp){
				if(resp.code == 0) {
					self.layerView(function(data){
						self._parent.openLayer(data, self.copyLayer, resp.data);
					});
				} else {
					alert('공정 데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});

		self.retrieve();

		// 표준공정 불러오기
		self._stndList = [];
		self.stndList(function(resp){
			if(resp.code == 0) {
				self._stndList = resp.data;
			} else {
				alert("표준공정 불러오기 실패");
			}
		});
	}

	purge = () => {
		const self = this;

		console.log("processController purge");
	}

	reload = () => {
		const self = this;

		console.log("processController reload");
	}


	retrieve = () => {
		const self = this;

		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchWrap = self._code.find(".searchWrapArea");
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let searchWord = searchWrap.find("input[name=schValue]").val();
		let spSeq = searchWrap.find("select[name=spSeq]").val();
		

		let searchData = {
			cuSeq : undefined,
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'cwNm',
			searchWord : searchWord
		}
		if(!self._utils.checkEmptyNull(spSeq)){
			searchData.spSeq = spSeq;
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
		let tr = $('<tr'+ ((d.useYn=='N')?' style="color:#808080"':'')+'>');
		tr.append($('<td style="border:1px solid #dedede;"><input type="checkbox" class="vm" name="cwSeq" value="'+d.cwSeq+'"></td>'));
		tr.append($('<td style="border:1px solid #dedede;"/>').append(self._utils.nullTostring(d.spNm, '')));
		tr.append($('<td style="border:1px solid #dedede;" class="al pl5"/>').append(self._utils.nullTostring(d.cwNm, '')));
		tr.append($('<td style="border:1px solid #dedede;" class="ac"/>').append(self._utils.nullTostring(d.sort, '')));
		tr.append($('<td style="border:1px solid #dedede;" class="al"/>').append(self._utils.nullTostring(d.publicOption, '')));
		tr.append($('<td style="border:1px solid #dedede;" class="al"/>').append(self._utils.nullTostring(d.privateOption,'')));
		tr.append($('<td style="border:1px solid #dedede;"><i class="fa-regular fa-clone workCopy cursorPointer" title="작업을 복사하여 새로운 작업으로 등록 합니다."></i></td>'));
		tr.append($('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="작업 수정" style="font-size:14px;"></i></td>'));
		tr.data("ROW",d);
		tr.appendTo(tbody);
	}


	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'companyList'
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
			ctl : 'process',
			cmd : 'companyDelete'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}

	stndList = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'stndProcessList'
		}

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

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'companyList'
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

	// popupview
	layerView = (cbfunc) => {
		const self = this;
		
		var divHtml = '<div class="mw_defalut" style="width:550px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">공정 등록</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:620px;overflow-y:auto;padding:2px;">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="#" class="btnSearch processSave">저장</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="50px">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="50px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">기준공정</th>';
		divHtml += '<td>';
		divHtml += '<select name="spSeq" class="w98p" requiremsg="기준공정">';
		// 표준공정 추가
		if(self._stndList.length == 0) divHtml += '<option value="">데이터없음</option>';
		for(let i in self._stndList) {
			divHtml += '<option value="'+self._stndList[i].spSeq+'" '+(i==0 ? 'selected':'')+'>'+self._stndList[i].spNm+'</option>';
		}
		divHtml += '</select>';

		divHtml += '</td>';
		divHtml += '<th class="txt_r" title="예시가 없는 경우 직접등록을 선택하여 설정 할 수 있습니다">작업예시</th>';
		divHtml += '<td>';
		
		divHtml += '<select name="swSeq" class="w98p">';

		if(self._stndList[0].workInfo.length == 0) divHtml += '<option value="" title="예시가 없는 경우 직접등록을 선택하여 설정 할 수 있습니다">직접등록</option>';
		else {
			for(let i in self._stndList[0].workInfo) {
				divHtml += '<option value="'+(self._stndList[0].workInfo[i].swSeq??'')+'" '+(i==0 ? 'selected':'')+'>'+self._stndList[0].workInfo[i].swNm+'</option>';
			}
		}
		
		divHtml += '</select>';

		divHtml += '</td>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table></div>';


		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover" style="margin-bottom: 0px !important;">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="50px">';
		divHtml += '<col width="150px">';
		divHtml += '<col width="60px">';
		divHtml += '<col width="50px">';
		divHtml += '<col width="70px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">작업명</th>';
		divHtml += '<td><input type="text" name="cwNm" class="w100p" requiremsg="작업명"></td>';
		//divHtml += '<th class="txt_r">작업면</th>';
		// divHtml += '<td class="al"><table class="w100p noboard"><tr><td><input type="checkbox" name="cwFrontYnCode" value="Y"></td><td>전 </td><td><input type="checkbox" name="cwFrontYnCode" value="N"></td> <td>후</td><td><input type="checkbox" name="cwFrontYnCode" value="Z"></td> <td>양</td></tr></table></td>';
		divHtml += '<th class="txt_r">노출 순서</th>';
		divHtml += '<td class="al"><input type="text" name="sort" class="w100p"></td>';
		divHtml += '<td class="al" colspan="2" style="padding-left:20px;"><div class="mw_checkbox"><input type="checkbox" name="useYn" id="useYn" value="Y" checked><label for="useYn">수주 등록시 노출 여부</label></div></td>';
		divHtml += '</tr>';
		//divHtml += '<tr>';
		//divHtml += '<td class="al" colspan="6" style="padding-left:20px;"><div class="mw_checkbox"><input type="checkbox" name="useYn" id="useYn" value="Y" checked><label for="useYn">수주 등록시 노출 여부</label></div></td>';
		//divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';

		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover" style="margin-bottom: 0px !important;">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="15px">';
		divHtml += '<col width="90px">';
		divHtml += '<col width="55px">';
		divHtml += '<col width="65px">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="55px">';
		divHtml += '<col width="20px">';
		divHtml += '</colgroup>';
		divHtml += '<thead>';
		divHtml += '<tr style="height: 20px;">';
		divHtml += '<th class="ac" colspan="6" style="background-color: #b3d9f3a1 !important;height: 20px; color:#3b627f !important;"> 주문 세부사항</th>';
		divHtml += '<td style="height: 20px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th></th>';
		divHtml += '<th class="ac">항목명</th>';
		divHtml += '<th class="ac">비용적용</th>';
		divHtml += '<th class="ac">입력유형</th>';
		divHtml += '<th class="ac">세부설정</th>';
		divHtml += '<th class="ac">필수적용</th>';
		divHtml += '<td></td>';
		divHtml += '</tr>';		
		divHtml += '</thead>';
		divHtml += '<tbody class="orderOption"></tbody>';
		divHtml += '</table>';

		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="15px">';
		divHtml += '<col width="90px">';
		divHtml += '<col width="55px">';
		divHtml += '<col width="65px">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="55px">';
		divHtml += '<col width="20px">';
		divHtml += '</colgroup>';
		divHtml += '<thead>';
		divHtml += '<tr style="height: 20px;">';
		divHtml += '<th class="ac" colspan="6" style="background-color: #b3d9f3a1 !important;height: 20px; color:#3b627f !important;"> 작업 세부사항 </th>';
		divHtml += '<td style="height: 20px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th ></th>';
		divHtml += '<th class="ac">항목명</th>';
		divHtml += '<th class="ac">비용적용</th>';
		divHtml += '<th class="ac">입력유형</th>';
		divHtml += '<th class="ac">세부설정</th>';
		divHtml += '<th class="ac">필수적용</th>';
		divHtml += '<td></td>';
		divHtml += '</tr>';		
		divHtml += '</thead>';
		divHtml += '<tbody class="workOption">';
		divHtml += '</tbody>';
		divHtml += '</table>';

		divHtml += '</div>';
		divHtml += '</div></div></div></div>';
		cbfunc(divHtml);
	}

	initNewLayer =	(popupID) => { 
		let self = this;
		let $Layer = $('#'+ popupID);
		$(`.title`,$Layer).text("작업 등록");
		$('.processSave',$Layer).text("등록");
		self.workEvent($Layer);
	}
	reloadLayer = (popupID, data) => {
		let self = this;
		let $Layer = $('#'+ popupID);
		$(`.title`,$Layer).text("작업 수정");
		$('.processSave',$Layer).text("수정");
		$Layer.append('<input type="hidden" name="cwSeq">');
		let $tbodyOrder = $('.orderOption', $Layer);
		let $tbodyWork = $('.workOption', $Layer);
		//self._utils.unSerializeObject($Layer,data);
		for(let i=0;i<data.optionInfo.length;i++){
			let d = data.optionInfo[i];
			self.workAdd(d.cwoOrderYn=='Y'?$tbodyOrder:$tbodyWork,d);
		}
		self.workEvent($Layer, data);
		self._utils.unSerializeObject($Layer,data);
		$('input[name=useYn]', $Layer).prop('checked',(data.useYn == 'Y'));
		$('select[name=spSeq]', $Layer).trigger('change');
		$('select[name=spSeq]', $Layer).attr('readonly',true);
		$('select[name=swSeq]', $Layer).attr('readonly',true);
		/*
		let $cwFrontYnCode = $('input[name=cwFrontYnCode]', $Layer);
		for(let i=0;i<$cwFrontYnCode.length;i++){
			let v = $($cwFrontYnCode[i]).val();
			$($cwFrontYnCode[i]).prop("checked", data.cwFrontYnCode.indexOf(v) > -1);
		}
		*/
	}
	copyLayer = (popupID, data) => {
		let self = this;
		let $Layer = $('#'+ popupID);
		$(`.title`,$Layer).text("작업 등록");
		$('.processSave',$Layer).text("등록");
		let $tbodyOrder = $('.orderOption', $Layer);
		let $tbodyWork = $('.workOption', $Layer);
		self._utils.unSerializeObject($Layer,data);
		for(let i=0;i<data.optionInfo.length;i++){
			let d = data.optionInfo[i];
			delete d.cwoSeq;
			self.workAdd(d.cwoOrderYn=='Y'?$tbodyOrder:$tbodyWork,d);
		}
		self.workEvent($Layer, self._data);
	}
	workAdd = ($tbody, d) =>{
		let self = this;
		let $tr = $('<tr/>');
		$tr.append($('<th class="ac UpDown"><i class="fa-solid fa-up-down cursorPointer"></i></th>'));
		$tr.append($('<td/>').append('<input type="hidden" name="cwoSeq"/>').append('<input type="text" name="cwoNm" class="w100p" requiremsg="항목명" />'));
		//if($tbody.hasClass('orderOption')){
			//$tr.append($('<td class="ac" />').append('<input type="checkbox" name="cwoCostYn" value="Y" title="정산시 비용이 발생 할수 있는 경우 체크 하십시오" />'));
			$tr.append($('<td class="ac" />').append('<select name="cwoCostYn"  class="w100p" title="정산시 비용이 발생 할수 있는 경우 선택 하십시오" /><option value="N">제외</option><option value="Y">비용</option></select>'));
		//}else{
		//	$tr.append($('<td class="ac" />'));
		//}
		$tr.append($('<td/>').append($('<select name="cwoInputCd" class="w100p" requiremsg="입력유형"><option value="T" selected>텍스트</option><option value="A">선택형</option><option value="C">수량</option><!-- option value="W">무게</option --><option value="M">용량</option><option value="L">길이</option></select>')));
		let $td = $('<td class="cwoData"/>');
		if(d!=undefined && d.cwoInputCd=='A'){
			let $input = $('<input type="text" name="cwoData" class="w90p" requiremsg="선택값" placeholder="콤마(,)로 구분">');
			let $hiddenInput = $('<input type="hidden" name="cwoDataSub">');
			let $li = $('<i class="fa-solid fa-share-nodes optionDataSub cursorPointer" style="margin-left:5px" title="선택형에 저장된 하위 선택 사항을 설정 할 수 있습니다."></i>');
			if(d != undefined && d.cwoData!=undefined) $input.val(d.cwoData);
			if(d != undefined && !self._utils.checkEmptyNull(d.cwoDataSub)){
				$li.css('color','blue');
				$input.attr('readonly',true).css('background-color','#eee').attr("title","오른쪽에 상세설정 아이콘버튼을 통하여 설정하시기 바랍니다");
			}
			$td.append($input);
			$td.append($hiddenInput);
			$td.append($li);
		}
		$tr.append($td);
		$tr.append($('<td><select name="cwoMustYn" class="w100p" title="반드시 입력을 받아야 될 경우 필수입력 선택"><option value="N" selected>일반</option><option value="Y">필수</option></select></td>'));
		$tr.append($('<td><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></td>'));
		if(d != undefined) self._utils.unSerializeObject($tr,d);
		$tr.data('ROW',d);
		$tbody.append($tr);
	}
	workEvent = ($Layer, d) =>{
		let self = this;
		let $tbodyOrder = $('.orderOption', $Layer);
		let $tbodyWork = $('.workOption', $Layer);
		$(`select[name=spSeq]`,$Layer).on('change', function(e){
			let _selVal = $(this).val();
			for(let i in self._stndList) {
				let _stndItem = self._stndList[i];
				if(_stndItem.spSeq == _selVal) {
					$(`select[name=swSeq]`,$Layer).empty();
					for(let j in _stndItem.workInfo) {
						let _workItem = _stndItem.workInfo[j];
						let $option = $('<option value="">'+_workItem.swNm+'</option>');
						if(!self._utils.checkEmptyNull(_workItem.swSeq)) $option.val(_workItem.swSeq);
						if(d!=undefined &&_workItem.swSeq == d.swSeq) $option.prop("selected",true);
						$(`select[name=swSeq]`,$Layer).append($option);

						//$(`select[name=swSeq]`,$Layer).append('<option value="'+(_workItem.swSeq??'')+'" '+(i==0 ? 'selected':'')+'>'+_workItem.swNm+'</option>')
					}
					if(d==undefined){
						$(`select[name=swSeq]`,$Layer).trigger('change');
					}
					break;
				}
			}
		});

		$Layer.on('change',`select[name=swSeq]`, function(e){
			let _swSeq = $(this).val();
			let $cwNm = $('input[name=cwNm]', $Layer);
			if(_swSeq != ''){
				//if($cwNm.val()== '') 
				$cwNm.val($(this).find('option:selected').text());
				$tbodyOrder.empty();
				$tbodyWork.empty();
				let mapData = {ctl : 'process',cmd : 'stndLoad',swSeq : _swSeq,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						/*
						let $cwFrontYnCode = $('input[name=cwFrontYnCode]', $Layer);
						for(let i=0;i<$cwFrontYnCode.length;i++){
							let v = $($cwFrontYnCode[i]).val();
							$($cwFrontYnCode[i]).prop("checked", rdata.data.cwFrontYnCode.indexOf(v) > -1);
						}
						*/
						for(let i=0;i<rdata.data.optionInfo.length;i++){
							let row = rdata.data.optionInfo[i];
							self.workAdd((row.cwoOrderYn == 'Y') ? $tbodyOrder:$tbodyWork, row);
						}
					} else {
						alert(rdata.message);
					}
				});
			}
		});
		$Layer.on('change',`select[name=cwoInputCd]`, function(e){
			let v = $(this).val();
			let $tr = $(this).closest('tr');
			if(v=='A'){
				let $input = $('<input type="text" name="cwoData" class="w90p" requiremsg="선택값" placeholder="콤마(,)로 구분">');
				let $hiddenInput = $('<input type="hidden" name="cwoDataSub">');
				let $li = $('<i class="fa-solid fa-share-nodes optionDataSub cursorPointer" style="margin-left:5px" title="선택형에 저장된 하위 선택 사항을 설정 할 수 있습니다."></i>');
				let d = $tr.data('ROW');
				if(d !=undefined && d.cwoData != undefined) $input.val(d.cwoData);
				//if(d !=undefined && d.cwoDataSub != undefined)$input.css('color','blue');

				if(d != undefined && !self._utils.checkEmptyNull(d.cwoDataSub)){
					$li.css('color','blue');
					$input.attr('readonly',true).css('background-color','#ddd').attr("title","오른쪽에 상세설정 아이콘버튼을 통하여 설정하시기 바랍니다");
				}

				$('.cwoData',$tr).append($input);
				$('.cwoData',$tr).append($hiddenInput);
				$('.cwoData',$tr).append($li);
			}else{
				$('.cwoData',$tr).empty();
			}
		});
		$tbodyOrder.sortable({
			handle: ".UpDown",
			items : "tr",
		});
		$tbodyWork.sortable({
			handle: ".UpDown",
			items : "tr",
		});
		$($Layer).on('click', '.plusbtn', function(e){
			let $table = $(this).closest('table');
			let $tbody = $('tbody',$table);
			self.workAdd($tbody);
		});

		$($Layer).on('click', '.minusbtn', function(e){
			$(this).closest('tr').remove();
		});
		$($Layer).on('click', '.optionDataSub', function(e){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			if(d==undefined) d = {};
			d.cwoData = $('input[name=cwoData]',$tr).val();
			self.layerOptionDetailView(function(data){
				self._parent.openLayer(data, self.layerOptionDetailViewEvent, d , $tr);
			});

		});

		$(`.processSave`,$Layer).on('click', function(e){
			if( self._utils.checkRequired($Layer)) {
				let _cwSeq = ($('input[name=cwSeq]', $Layer).length == 0)? undefined : $('input[name=cwSeq]', $Layer).val();
				let _spSeq = $('select[name=spSeq]', $Layer).val();
				let _cwNm = $('input[name=cwNm]', $Layer).val().trim();
				let _swSeq = $('select[name=swSeq]', $Layer).val();
				let _useYn = $('input[name=useYn]:checked', $Layer).val()?? 'N';
				let _sort = $('input[name=sort]', $Layer).val()?? '0';
				let _optionInfo = [];
				for(let i=0;i<$tbodyOrder.children().length;i++){
					let option = self._utils.serializeObject($($tbodyOrder.children().eq(i)));
					//option.cwoMustYn = $('input[name=cwoMustYn]:checked', $($tbodyOrder.children().eq(i))).val()?? 'N'; 
					//option.cwoCostYn = $('input[name=cwoCostYn]:checked', $($tbodyOrder.children().eq(i))).val()?? 'N'; 
					option.cwoOrderYn = 'Y';
					if(self._utils.checkEmptyNull(option.cwoNm)){
						alert('세부사항에 들어갈 항목 이름을 입력하세요');
						return false;
					}
					if(option.cwoInputCd == 'A'){
						if(self._utils.checkEmptyNull(option.cwoData)){
							alert(option.cwoNm +'에 들어갈 선택 값을 입력하십시오\n예) 제공,미제공 ');
							return false;
						}
						if(option.cwoData.indexOf('→') > -1){
							alert(option.cwoNm +'는 "→" 문자는 사용 할 수 없습니다.');
							return false;
						}
					}
					option.sort = 1+i;
					_optionInfo.push(option);
				}
				for(let i=0;i<$tbodyWork.children().length;i++){
					let option = self._utils.serializeObject($($tbodyWork.children().eq(i)));
					//option.cwoMustYn = $('input[name=cwoMustYn]:checked', $($tbodyWork.children().eq(i))).val()?? 'N'; 
					//option.cwoCostYn = $('input[name=cwoCostYn]:checked', $($tbodyOrder.children().eq(i))).val()?? 'N';
					//option.cwoCostYn = $('input[name=cwoCostYn]', $($tbodyOrder.children().eq(i))).is(':checked') ?'Y':'N';
					option.cwoOrderYn = 'N';
					if(self._utils.checkEmptyNull(option.cwoNm)){
						alert('세부사항에 들어갈 항목 이름을 입력하세요');
						return false;
					}
					if(option.cwoInputCd == 'A' && self._utils.checkEmptyNull(option.cwoData)){
						alert(option.cwoNm +'에 들어갈 선택 값을 입력하십시오\n예) 제공,미제공 ');
						return false;
					}
					option.sort = 1+i;
					_optionInfo.push(option);
				}
				//_optionInfo = self._utils.objectTrim(_optionInfo);
				let cwFrontYnCode = '';
				/*
				let $cwFrontYnCode = $('input[name=cwFrontYnCode]:checked', $Layer);
				for(let i=0;i<$cwFrontYnCode.length;i++){
					let v = $($cwFrontYnCode[i]).val();
					cwFrontYnCode += ((cwFrontYnCode != '')? ',':'')+ v;
				}
				*/
				let mapData = {
					spSeq : _spSeq,
					swSeq : _swSeq,
					cwNm : _cwNm,
					cwOutsourcingYn : 'N',
					optionInfo : JSON.stringify(_optionInfo),
					cwFrontYnCode : cwFrontYnCode,
					useYn : _useYn,
					sort : _sort
				}
				if(_cwSeq != undefined){
					mapData.cwSeq = _cwSeq;
					self.companyUpdate(mapData, function(resp){
						if(resp.code==0) {
							$("body .btnClosePopLayer").trigger('click');
							self.retrieve();
							alert('수정되었습니다.');
						} else {
							alert('수정에 실패하였습니다.');
						}
					});
				}else{
					self.companyInsert(mapData, function(resp){
						if(resp.code==0) {
							$("body .btnClosePopLayer").trigger('click');
							self.retrieve();
							alert('등록되었습니다.');
						} else {
							//alert('등록에 실패하였습니다.');
							alert(resp.message)
						}
					});
				}
			}
		});
	}

	layerOptionDetailView = (cbfunc) =>{
		const self = this;
		var divHtml = `
		<div class="mw_defalut" style="width:400px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">세부사항 상세설정</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="height:260px;overflow-y:auto;padding:2px;">
						<div class="bottonWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th><div class="ar"><a href="#" class="btnSearch optionDetailApply">적용</a></div></th>
									</tr>
								</tbody>
							</table>
						</div>
					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="45%">
								<col width="10%">
								<col width="45%">
							</colgroup>
							<thead>
								<tr>
									<th class="ac">기본선택</th>
									<th class="ac"></th>
									<th class="ac">세부선택 유형 : <select name="type" class="disabled" disabled><option value="">없음</option><option value="text">텍스트형</option><option value="select">선택형</option></select></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th class="ac">
										<select name="cwoData" class="w100p" size="7" style="height: 100px !important;"></select>
									</th>
									<th class="ac"><i class="fa-solid fa-share-nodes"></i></th>
									<th class="ac cwoDataSubTypeSelect">
										<select name="cwoDataSub" class="w100p" size="7" style="height: 100px !important;"></select>
									</th>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<th class="ac">
										<span class="f_lt cursorPointer cwoDataDel" style="border-radius: 4px; padding:3px; border: 1px solid #fd6456 !important;background: #fd6456 !important;color: #fff !important;transition: All 0.3s ease; -webkit-transition: All 0.3s ease;-moz-transition: All 0.3s ease;-o-transition: All 0.3s ease;cursor: pointer;">삭제</span>
										<input type="text" class="w51p" name="cwoDataNm">
										<span class="f_rt cwoDataAdd cursorPointer" style="border-radius: 4px; padding:3px; border: 1px solid #5675fd !important;background: #5675fd !important;color: #fff !important;transition: All 0.3s ease; -webkit-transition: All 0.3s ease;-moz-transition: All 0.3s ease;-o-transition: All 0.3s ease;cursor: pointer;">추가</span>
									</th>
									<th class="ac"></th>
									<th class="ac cwoDataSubTypeSelect">
										<span class="f_lt cursorPointer cwoDataSubDel" style="border-radius: 4px; padding:3px; border: 1px solid #fd6456 !important;background: #fd6456 !important;color: #fff !important;transition: All 0.3s ease; -webkit-transition: All 0.3s ease;-moz-transition: All 0.3s ease;-o-transition: All 0.3s ease;cursor: pointer;">삭제</span>
										<input type="text" class="w51p" name="cwoDataSubNm">
										<span class="f_rt cwoDataSubAdd cursorPointer" style="border-radius: 4px; padding:3px; border: 1px solid #5675fd !important;background: #5675fd !important;color: #fff !important;transition: All 0.3s ease; -webkit-transition: All 0.3s ease;-moz-transition: All 0.3s ease;-o-transition: All 0.3s ease;cursor: pointer;">추가</span>
									</th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>`
		cbfunc(divHtml);
	}
	layerOptionDetailViewEvent = (popupID, data, $parentObject) => {
		let self = this;
		if(data ==undefined) data = {};
		let $Layer = $('#'+ popupID);
		let $cwoData = $('select[name=cwoData]',$Layer);
		let $cwoDataSub = $('select[name=cwoDataSub]',$Layer);
		let $type = $('select[name=type]',$Layer);
		let cwoData = [];
		let cwoDataSub = {};
		if(!self._utils.checkEmptyNull(data.cwoData)) cwoData = data.cwoData.split(',');
		if(!self._utils.checkEmptyNull(data.cwoDataSub)){
			try{	cwoDataSub = JSON.parse(data.cwoDataSub);
			}catch(e){}
		} 
		cwoDataReflash();
		/*
		$cwoData.sortable({
			handle: "option",
			items : "option",
			axis: 'y',
			containment: "parent",
			start: function(event, ui){},
			update: function(event, ui){
				let data = [];
				let $options = $cwoData.children();
				for(let i=0;i<$options.length;i++){
					data.push($($options[i]).val());
				}
				cwoData = data;
			},
		  });
		  $cwoDataSub.sortable({
			//handle: "option",
			//items : "option",
			axis: 'y',
			containment: "parent",
			start: function(event, ui){},
			update: function(event, ui){
				let data = [];
				let $options = $cwoDataSub.children();
				for(let i=0;i<$options.length;i++){
					data.push($($options[i]).val());
				}
				cwoDataSub[$cwoData.val()] = data.join(',');
			},
		  });
		  */
		$type.on('change',function(){
			let v = $(this).val();
			let cowDataNm = $cwoData.val();
			if(!self._utils.checkEmptyNull(cowDataNm)){
				if(cwoDataSub[cowDataNm] == undefined){
					cwoDataSub[cowDataNm] = {type:v};
				}else{
					if(cwoDataSub[cowDataNm].type != v)	cwoDataSub[cowDataNm].type = v;
				}
				let type = '';
				let subData = ((cwoDataSub[cowDataNm].values != undefined) ? cwoDataSub[cowDataNm].values : []);
				if(v == 'text'){ type="텍스트형";
				}else if(v == 'select'){ type="선택형";
				}else{ type="없음";	}
				$('option:selected',$cwoData).text(cowDataNm + '['+type+''+ ((v=='select')? ' '+subData.length :'')+']');
			}
			selectChange(v);
		});
		$cwoData.on('change',function(){
			let v = $(this).val();
			$cwoDataSub.empty();
			$type.prop('disabled',false).removeClass('disabled');
			let subData = [];

			if(!self._utils.checkEmptyNull(cwoDataSub[v])){
				$type.val(cwoDataSub[v].type);
				selectChange(cwoDataSub[v].type);
				if(cwoDataSub[v].type == 'select'){
					//$('.cwoDataSubTypeSelect',$Layer).show();
					subData = ((cwoDataSub[v].values == undefined) ? []:cwoDataSub[v].values);
					for(let i=0;i<subData.length;i++){
						let $option = $('<option/>');
						$option.text(subData[i]).val(subData[i]);
						$cwoDataSub.append($option);
					}
				}else{
					selectChange("");
					//$('.cwoDataSubTypeSelect',$Layer).hide();
				}
			}else{
				$type.val("");
				selectChange("");
			}
		})
		$Layer.on('click','.cwoDataAdd',function(){
			let v = $('input[name=cwoDataNm',$Layer).val();
			if(self._utils.checkEmptyNull(v)){
				alert('추가할 선택사항을 입력하십시오');
				$('input[name=cwoDataNm',$Layer).focus();
			}
			$('input[name=cwoDataNm',$Layer).val('');
			let vs = v.split(',');
			for(let i=0;i<vs.length;i++){
				if(cwoData.indexOf(vs[i]) >-1){
					alert('"'+ vs[i] +'" 값은 기존에 등록되어 있는 선택 값입니다.');
					return false;
				}
			}
			for(let i=0;i<vs.length;i++) cwoData.push(vs[i]);
			cwoDataReflash();
		});
		$Layer.on('click','.cwoDataDel',function(){
			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let v = $cwoData.val();
					let idx = cwoData.indexOf(v);
					cwoData.splice(idx,1);
					cwoDataReflash();
				}
			});
		});

		$Layer.on('click','.cwoDataSubAdd',function(){
			let cwoDataNm = $cwoData.val();
			if($type.val() != 'select'){
				return false;
			}
			if(self._utils.checkEmptyNull(cwoDataNm)){
				alert('추가할 기본선택사항을 선택하세요');
				return false;
			}
			let v = $('input[name=cwoDataSubNm',$Layer).val();
			if(self._utils.checkEmptyNull(v)){
				alert('추가할 선택사항을 입력하십시오');
				$('input[name=cwoDataSubNm',$Layer).focus();
				return false;
			}
			if(v.indexOf('+') > -1){
				alert('"+" 문자는 사용 할 수 없습니다.');
				return false;
			}
			if(cwoDataSub[cwoDataNm] != undefined){
				if(cwoDataSub[cwoDataNm].values == undefined){
					cwoDataSub[cwoDataNm].values = [v];
				}else{
					let vs = v.split(',');
					for(let i=0;i<vs.length;i++){
						if(cwoDataSub[cwoDataNm].values.indexOf(vs[i]) >-1){
							alert('"'+ vs[i] +'" 값은 기존에 등록되어 있는 세부 선택 값입니다.');
							return false;
						}
					}
					for(let i=0;i<vs.length;i++) cwoDataSub[cwoDataNm].values.push(vs[i]);
				}
			}else{
				cwoDataSub[cwoDataNm] = {values:[v]};
			}
			$('input[name=cwoDataSubNm',$Layer).val('');
			cwoDataReflash();
			$cwoData.val(cwoDataNm).trigger('change');
		});
		$Layer.on('click','.cwoDataSubDel',function(){
			let v = $cwoDataSub.val();
			let cwoDataNm = $cwoData.val();
			if($type.val() != 'select'){
				return false;
			}
			if(self._utils.checkEmptyNull(v)){
				alert('삭제 할 세부정보가 없습니다.');
				return false;
			}
			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let cwoDataNm = $cwoData.val();
					let v = $cwoDataSub.val();
					if(self._utils.checkEmptyNull(cwoDataSub[cwoDataNm])){
						alert('삭제 할 세부정보가 없습니다.');
						return false;
					}
					let d = cwoDataSub[cwoDataNm].values;
					let idx = d.indexOf(v);
					d.splice(idx,1);
					cwoDataReflash();
					$cwoData.val(cwoDataNm).trigger('change');
				}
			});
		});
		$Layer.on('click','.optionDetailApply',function(){
			let d = cwoData.join(',');
			let sub = '';
			let trData = $parentObject.data("ROW");
			if(trData==undefined) trData = {};
			trData.cwoData = d;
			let keys = Object.keys(cwoDataSub)
			if(keys.length > 0 ){
				let isEmpty = true;
				for(let i=0;i<keys.length;i++){
					if(cwoDataSub[keys[i]].type != undefined){
						isEmpty = false;
						break;
					}
				}
				if(!isEmpty)	sub = JSON.stringify(cwoDataSub);
			}

			let $parentCwoData = $('input[name=cwoData]',$parentObject);
			let $parentCwoDataSub = $('input[name=cwoDataSub]',$parentObject);
			let $parentIcon = $('.optionDataSub',$parentObject);
			if(!self._utils.checkEmptyNull(sub)){
				$parentCwoData.attr("readonly",true).css('background-color','#ddd').attr("title","오른쪽에 상세설정 아이콘버튼을 통하여 설정하시기 바랍니다");
				$parentIcon.css("color",'blue');
			}else{
				$parentCwoData.attr("readonly",false).css('background-color','').removeAttr("title");
				$parentIcon.css("color",'');
			}

			trData.cwoDataSub = sub;
			$parentObject.data("ROW",trData);
			$parentCwoData.val(d);
			$parentCwoDataSub.val(sub);

			
			$(".btnClosePopLayer",$Layer).trigger('click');
		});

		$('input[name=cwoDataNm],[name=cwoDataSubNm]',$Layer).on('keypress',function(e){
			if(e.charCode == 13){
				let n = $(this).attr('name');
				n = n.replace('Nm','');
				$('.'+n+'Add', $Layer).trigger('click');
			}
		});

		$type.trigger('change');

		function cwoDataReflash(){
			$cwoData.empty();
			for(let i=0;i<cwoData.length;i++){
				let $option = $('<option/>');
				if(self._utils.checkEmptyNull(cwoDataSub[cwoData[i]])){
					$option.text(cwoData[i] + '[없음]');
				}else{
					let subData = [];
					let type = '';
					if(cwoDataSub[cwoData[i]].type == 'text'){ type="텍스트형";
					}else if(cwoDataSub[cwoData[i]].type == 'select'){ type="선택형";
					}else{ type="없음";	}
					subData = cwoDataSub[cwoData[i]].values;
					$option.text(cwoData[i] + '['+type+''+ ((cwoDataSub[cwoData[i]].type=='select')? ' '+subData.length :'')+']');
				}
				$option.val(cwoData[i]);
				$cwoData.append($option);
			}
		}
		function selectChange(v){
			if(v=='select'){
				$('select[name=cwoDataSub]',$Layer).removeClass('disabled').prop('disabled',false);
				$('input[name=cwoDataSubNm]',$Layer).removeClass('disabled').prop('disabled',false);
			}else{
				$('select[name=cwoDataSub]',$Layer).addClass('disabled').prop('disabled',true);
				$('input[name=cwoDataSubNm]',$Layer).addClass('disabled').prop('disabled',true);
			}
		}
	}
	companyInsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'companyInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	companyLoad = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'companyLoad'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	companyUpdate = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'companyUpdate'
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

export default processController