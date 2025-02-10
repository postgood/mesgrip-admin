
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall';


let employeeController = class {

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
			let chkBoxs = tbody.find("input[name=eSeq]:checked");
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
					let eSeq = chkBoxs.val();

					self.delete({eSeq : eSeq}, function(resp) {
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

		tbody.on('click','.btnOpenInfo', function() {
			let _data = $(this).closest('tr').data('ROW');
			
			// 직원 데이터를 먼저 읽어온다
			self._employee = {};
			self.load({eSeq:_data.eSeq}, function(resp){

				if(resp.code == 0) {
					self._employee = resp.data;
					self.layerView(function(data){
						self._parent.openLayer(data, self.reloadLayer);
					});

				} else {
					alert('직원 데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.btnAuthInfo', function() {
			let _data = $(this).closest('tr').data('ROW');
			// 직원 메뉴데이터를 먼저 읽어온다
			self.menuList({eSeq:_data.eSeq}, function(resp){
				if(resp.code == 0) {
					self.layerAuthView(function(data){
						self._parent.openLayer(data, self.layerAuthViewEvent,{eSeq:_data.eSeq,menuList:resp.data});
					});

				} else {
					alert('직원 데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});

		self.retrieve();
	}

	purge = () => {
		const self = this;

		console.log("employeeController purge");
	}

	reload = () => {
		const self = this;

		console.log("employeeController reload");
	}

	tHeadOrderBy = ($obj, orderby) => {
		const self = this;

		let tr = $obj.closest("tr");
		tr.find("img").attr("src","/images/btn/btn_sort2.png");
		$obj.children("img").attr("src",(orderby.toUpperCase() == "DESC")?"/images/btn/btn_sort_dw.png":"/images/btn/btn_sort_up.png");

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
		let searchWord = searchWrap.find("input[name=schValue]").val();
		let eOutYn = searchWrap.find("select[name=eOutYn]").val();

		let searchData = {
			cuSeq : undefined,
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			eOutYn : eOutYn,
			searchColumn : 'eNm',
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

	display = ($tbody, d) => {
		const self = this;
		let $tr = $('<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+' />');
		$tr.append('<td style="border:1px solid #dedede;" ><input type="checkbox" class="vm" name="eSeq" value="'+d.eSeq+'"/>');
		$tr.append('<td style="border:1px solid #dedede;">'+self._utils.nullTostring(d.eNm, '')+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+self._utils.nullTostring(d.eRank, '')+'</td>');
		//$tr.append('<td style="border:1px solid #dedede;">'+self._utils.formatPhoneNumber(d.eTel, '')+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+((d.eManagerYn == 'Y') ? '<span style="color:blue;">관리자</span>':'직원')+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+((d.eLoginYn == 'Y') ? '허용':'불가')+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+self._utils.nullTostring(d.eId, '')+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+((d.eOutYn=='N')?'재직중': '퇴사')+'</td>');
		$tr.append('<td class="al" style="border:1px solid #dedede;">'+ self._utils.nullTostring(d.eTakeCharge,'') +'</td>');
		$tr.append($('<td style="border:1px solid #dedede;" class="al"/>').text(self._utils.strMaxCuttion(self._utils.nullTostring(d.eMemo,''),20)).attr("title",d.eMemo));
		$tr.append('<td style="border:1px solid #dedede;">'+d.creDate.substring(0,16)+'</td>');;
		$tr.append('<td style="border:1px solid #dedede;"><i class="fa-brands fa-elementor cursorPointer btnAuthInfo" title="메뉴 권한 설정"></i></td>');
		$tr.append('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square btnOpenInfo cursorPointer" style="font-size:14px;" title="직원정보 수정"></i></td>');
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
/*
		let trHtml = '<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>';
				trHtml +='<td><input type="checkbox" class="vm" name="eSeq" value="'+d.eSeq+'"></td>';
				trHtml +='<td>'+self._utils.nullTostring(d.eNm, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.eRank, '')+'</td>';
				trHtml +='<td>'+self._utils.formatPhoneNumber(d.eTel, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.eManagerYn, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.eId, '')+'</td>';
				trHtml +='<td title=">'+self._utils.nullTostring(d.eMemo,'')+'</td>';
				trHtml +='<td>'+d.creDate+'</td>';
				trHtml +='<td><i class="fa-solid fa-magnifying-glass cursorPointer btnOpenInfo" title="직원 정보 조회"></i></td>';
				trHtml +='</tr>';
				let $trObj = $(trHtml).data("ROW",d);

		
		$(".btnOpenInfo", $trObj).on("click", function() {
			let _data = $(this).closest('tr').data('ROW');
			
			// 직원 데이터를 먼저 읽어온다
			self._employee = {};
			self.load({eSeq:_data.eSeq}, function(resp){

				if(resp.code == 0) {
					self._employee = resp.data;
					self.layerView(function(data){
						self._parent.openLayer(data, self.reloadLayer);
					});

				} else {
					alert('직원 데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});

		$trObj.appendTo(tbody);
		*/

	}


	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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

	delete = (_mapData, cbfunc) => {
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


	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}

	// popupview
	layerView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:680px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">직원 등록</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:'+((self._const.__MANAGER_YN == 'Y')?'350':'240')+'px;overflow-y:auto;padding:2px;">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="50%">';
		divHtml += '<col width="50%">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="al passwordChange"></div>';
		divHtml += '</th>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch employeeSave">저장</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r"><span style="color: red;">*</span> 이름</th>';
		divHtml += '<td><div class="inputTextCleanDiv"><input type="text" name="eNm" style="width:240px;" requiremsg="이름"><div class="inputTextClean"><span>×</span></div></div></td>';
		divHtml += '<th class="txt_r">직급</th>';
		divHtml += '<td><div class="inputTextCleanDiv"><input type="text" name="eRank" style="width:240px;"><div class="inputTextClean"><span>×</span></div></div></td>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">담당분야</th>';
		divHtml += '<td><div class="inputTextCleanDiv"><input type="text" name="eTakeCharge" style="width:240px;" placeholder="예시)정산,생산,관리,검수"><div class="inputTextClean"><span>×</span></div></div></td>';
		divHtml += '<th class="txt_r"><span style="color: red;">*</span> 전화번호</th>';
		divHtml += '<td><div class="inputTextCleanDiv"><input type="text" name="eTel" style="width:240px;" requiremsg="eTel" vtype="phone"><div class="inputTextClean"><span>×</span></div></div></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">메모</th>';
		divHtml += '<td colspan="3"><textarea name="eMemo" class="w100p" rows="1"></textarea></td>';
		divHtml += '</tr></table></div>';

		divHtml += '<div class="searchWrap employeeAuthTr">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="60px">';
		divHtml += '<col width="30%">';
		divHtml += '<col width="50px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr><th class="txt_c" colspan="4">권한</th></tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">접속권한</th>';
		divHtml += '<td><select name="eLoginYn"><option value="N">미사용</option><option value="Y">사용</option></select></td>';
		divHtml += '<th class="txt_r">담당장비</th>';
		divHtml += '<td><span class="eqNms f_lt" style="width:75%;margin: 5px 0px;"></span><a class="btnStyle03 f_rt eqChoice" href="javascript:void(0);">장비선택</a></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">아이디</th>';
		divHtml += '<td><input type="text" name="eId" class="w100p" placeholder="예시)kprintfactory" autocomplete="false"></td>';
		divHtml += '<th class="txt_r">비밀번호</th>';
		divHtml += '<td><input type="password" name="ePwd" class="w35p"  vtype="password" placeholder="비밀번호" autocomplete="false"> <input type="password" name="reEPwd" class="w35p mr5" placeholder="비밀번호 확인"><a class="btnStyle03 btnChangePwd f_rt" href="javascript:void(0);">변경</a></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">권한</th>';
		divHtml += '<td><select name="eManagerYn"><option value="N">직원</option><option value="Y">관리자</option></select></td>';
		divHtml += '<th class="txt_r">재직여부</th>';
		divHtml += '<td><select name="eOutYn"><option value="N">재직중</option><option value="Y">퇴사</option></select></td>';
		divHtml += '</tr></table></div>';
		/*
		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="50px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr><th class="txt_c">메세지</th>';
		divHtml += '<th colspan="3" class="al"><div class="mw_checkbox"><input type="checkbox" name="epTypeBC" id="epTypeBC" value="Y">&nbsp;&nbsp;수주 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="epTypeAC" id="epTypeAC" value="Y">&nbsp;&nbsp; 공정</div></th>';
		divHtml += '</tr>';
		*/
	/*	
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">알림(공정)</th>';
		divHtml += '<td colspan="3"><div class="mw_checkbox"><input type="checkbox" name="epTypeAA" id="epTypeAA" value="Y"><label for="epTypeAA">카카오톡</label></div>';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="epTypeAB" id="epTypeAB" value="Y"><label for="epTypeAB">푸쉬</label></div>';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="epTypeAC" id="epTypeAC" value="Y"><label for="epTypeAC">사이트</label></div></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">알림(수주)</th>';
		divHtml += '<td colspan="3"><div class="mw_checkbox"><input type="checkbox" name="epTypeBA" id="epTypeBA" value="Y"><label for="epTypeBA">카카오톡</label></div>';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="epTypeBB" id="epTypeBB" value="Y"><label for="epTypeBB">푸쉬</label></div>';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="epTypeBC" id="epTypeBC" value="Y"><label for="epTypeBC">사이트</label></div></td>';
		divHtml += '</tr>';
*/		
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
		
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	initNewLayer = (popupID) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		
		$(`#${popupID} .title`).text("직원 등록");

		$(`#${popupID} .btnChangePwd`).hide();
		$(`#${popupID} .eqChoice`).on('click', function(){
			let $popDiv = $('template#eqChoiceDiv');
			self._parent.openLayer($popDiv.html(), self.layerEqChoiceViewEvent,undefined, $layerObject);
		});
			
		$layerObject.on('change','select[name=eLoginYn]',function(){
			let v = $(this).val();
			if(v == 'Y'){
				$('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).removeAttr('readonly').removeClass('readonly');
			}else{
				$('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).attr('readonly','readonly').addClass('readonly');
			}
		});
		$('select[name=eLoginYn]',$layerObject).trigger('change');
		self._utils.focusEvent($('input[name=eTel]', `#${popupID}`),'tel');
		$(`#${popupID} .employeeSave`).on('click', function(e){
			let _eNm = $('input[name=eNm]', `#${popupID}`).val();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val();
			let _eManagerYn = $('select[name=eManagerYn]', `#${popupID}`).val();
			let _eOutYn = $('select[name=eOutYn]', `#${popupID}`).val();
			let _eLoginYn = $('select[name=eLoginYn]', `#${popupID}`).val();
			let _eRank = $('input[name=eRank]', `#${popupID}`).val();
			let _eTakeCharge = $('input[name=eTakeCharge]', `#${popupID}`).val();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
			let _reEPwd = $('input[name=reEPwd]', `#${popupID}`).val();
			let _eId = $('input[name=eId]', `#${popupID}`).val();
			let _eMemo = $('textarea[name=eMemo]', `#${popupID}`).val();
			if( self._utils.checkRequired(`#${popupID}`)) {
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
				}

				

				let mapData = {
					eNm : _eNm,
					eTel : _eTel,
					eManagerYn : _eManagerYn,
					eOutYn : _eOutYn,
					eLoginYn : _eLoginYn,
					eRank : _eRank,
					eTakeCharge : _eTakeCharge,
					ePwd : _ePwd,
					eId : _eId,
					eMemo : _eMemo,
				}
				let d = $('.eqNms',$layerObject).data();
				if(d!=undefined) mapData.equipmentInfo = JSON.stringify(d.eqInfo);
				else mapData.equipmentInfo = '[]';

				let pushJSON = [
					{epCd:"A", epType :"A", epYn: $('input[name=epTypeAA]:checked', `#${popupID}`).val() ?? 'N'},
					{epCd:"A", epType :"B", epYn: $('input[name=epTypeAB]:checked', `#${popupID}`).val() ?? 'N'},
					{epCd:"A", epType :"C", epYn: $('input[name=epTypeAC]:checked', `#${popupID}`).val() ?? 'N'},
					{epCd:"B", epType :"A", epYn: $('input[name=epTypeBA]:checked', `#${popupID}`).val() ?? 'N'},
					{epCd:"B", epType :"B", epYn: $('input[name=epTypeBB]:checked', `#${popupID}`).val() ?? 'N'},
					{epCd:"B", epType :"C", epYn: $('input[name=epTypeBC]:checked', `#${popupID}`).val() ?? 'N'}
				]

				self.insert(mapData, function(resp){
					if(resp.code==0) {
						let pushData = {
							eSeq : resp.data.eSeq,
							pushJson : JSON.stringify(pushJSON)
						}

						self.setpush(pushData, function(resp){
							console.log(resp);
						});

						$("body .btnClosePopLayer").trigger('click');
						self.retrieve();
						alert('등록되었습니다.');

					} else {
						alert('등록에 실패하였습니다.');
					}
				});
			}
		}).text('저장');

	}

	reloadLayer = (popupID) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		$(`#${popupID} .title`).text("직원 수정");
		//$(`#${popupID} .passwordChange`).append($('<a href="javascript:void(0);" class="btnSearch3 passwordChange">비밀번호 변경</a>'));
		// 관리자인 경우 생성
		if(self._const.__MANAGER_YN == 'N'){
			$(`#${popupID} .employeeAuthTr`).hide();
		}
		let eqInfo = [];
		let eqNms = [];
		let d = self._employee.equipmentInfo
		for(let i=0;i<d.length;i++){
			eqInfo.push(d[i]);
			eqNms.push(d[i].eqNm);
		}
		$('.eqNms',$layerObject).data({eqInfo:eqInfo}).text(eqNms.join(','));


		$(`#${popupID} .eqChoice`).on('click', function(){
			let $popDiv = $('template#eqChoiceDiv');
			self._parent.openLayer($popDiv.html(),self.layerEqChoiceViewEvent,undefined, $layerObject);
			
			/*
			self.layerEqChoiceView(function(data){
				self._parent.openLayer(data, self.layerEqChoiceViewEvent,undefined, $layerObject);
			});
			*/
		});
		if(self._employee.eLoginYn == 'N'){

		}else{
			$(`#${popupID} .btnChangePwd`).on('click', function(e){

				let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
				let _reEPwd = $('input[name=reEPwd]', `#${popupID}`).val();
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
					eSeq : self._employee.eSeq,
					ePwd : _ePwd
				}

				self.changepwd(mapData, function(resp){
					if(resp.code == 0) {
						$('input[name=ePwd], input[name=reEPwd]', `#${popupID}`).val('');
						alert('변경되었습니다');
					} else {
						alert('변경 실패하였습니다');
					}
				});

			}).show();
		}

		if (Object.keys(self._employee).length === 0 && self._employee.constructor === Object) {
			alert('직원 데이터를 불러올 수 없습니다');
			return false;
		}


		// 불러온 데이터를 화면에 표시한다.
		$('input[name=eNm]', `#${popupID}`).val(self._employee.eNm);
		$('input[name=eTel]', `#${popupID}`).val(self._employee.eTel);
		$('select[name=eManagerYn]', `#${popupID}`).val(self._employee.eManagerYn);
		$('select[name=eOutYn]', `#${popupID}`).val(self._employee.eOutYn);
		$('select[name=eLoginYn]', `#${popupID}`).val(self._employee.eLoginYn);
		$('input[name=eRank]', `#${popupID}`).val(self._employee.eRank);
		$('input[name=eTakeCharge]', `#${popupID}`).val(self._employee.eTakeCharge);
		if(self._employee.eLoginYn == 'Y') $('input[name=eId]', `#${popupID}`).val(self._employee.eId).attr("disabled", true);
		$('textarea[name=eMemo]', `#${popupID}`).val(self._employee.eMemo);

		self._utils.focusEvent($('input[name=eTel]', `#${popupID}`),'tel');
		$layerObject.on('change','select[name=eLoginYn]',function(){
			let v = $(this).val();
			if(v == 'Y'){
				if(self._employee.eLoginYn == 'N') $('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).removeAttr('readonly').removeClass('readonly');
			}else{
				$('input[name=eId] ,input[name=ePwd], input[name=reEPwd]',$layerObject).attr('readonly','readonly').addClass('readonly');
			}
		});
		$('select[name=eLoginYn]',$layerObject).trigger('change');
		
		for(let i in self._employee.pushInfo) {
			let _data = self._employee.pushInfo[i];
			$(`input[name=epType${_data.epCd}${_data.epType}][value="${_data.epYn}"]`, `#${popupID}`).prop('checked', true);
		}

		$(`#${popupID} .employeeSave`).data({eSeq:self._employee.eSeq}).on('click', function(e){
			let _data = $(this).data();

			let _eNm = $('input[name=eNm]', `#${popupID}`).val();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val();
			let _eManagerYn = $('select[name=eManagerYn]', `#${popupID}`).val();
			let _eOutYn = $('select[name=eOutYn]', `#${popupID}`).val();
			let _eLoginYn = $('select[name=eLoginYn]', `#${popupID}`).val();
			let _eRank = $('input[name=eRank]', `#${popupID}`).val();
			let _eTakeCharge = $('input[name=eTakeCharge]', `#${popupID}`).val();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
			let _reEPwd = $('input[name=reEPwd]', `#${popupID}`).val();
			let _eId = $('input[name=eId]', `#${popupID}`).val();
			let _eMemo = $('textarea[name=eMemo]', `#${popupID}`).val();


			// 필수 항목 체크
			if(!_data.eSeq) {
				alert('직원코드가 없어 수정불가합니다');
				return false;
			}

			if(_eNm == '') {
				alert('이름을 입력해 주세요');
				return false;
			}
			if(_eLoginYn == 'Y'){
				if(_eId == '') {
					alert('아이디를 입력해 주세요');
					return false;
				}
				if(self._employee.eLoginYn == 'N' && _ePwd == ''){
					alert('비밀번호를 입력하세요');
					return false;
				}
				if(_ePwd != _reEPwd) {
					alert('비밀번호가 일치하지 않습니다');
					return false;
				}
			}
			let mapData = {
				eSeq : _data.eSeq,
				eNm : _eNm,
				eTel : _eTel,
				eManagerYn : _eManagerYn,
				eOutYn : _eOutYn,
				eLoginYn : _eLoginYn,
				eRank : _eRank,
				eTakeCharge : _eTakeCharge,
				ePwd : _ePwd,
				eId : _eId,
				eMemo : _eMemo
			}
			let d = $('.eqNms',$layerObject).data();
			if(d!=undefined) mapData.equipmentInfo = JSON.stringify(d.eqInfo);
			else mapData.equipmentInfo = '[]';

			let pushJSON = [
				{epCd:"A", epType :"A", epYn: $('input[name=epTypeAA]:checked', `#${popupID}`).val() ?? 'N'},
				{epCd:"A", epType :"B", epYn: $('input[name=epTypeAB]:checked', `#${popupID}`).val() ?? 'N'},
				{epCd:"A", epType :"C", epYn: $('input[name=epTypeAC]:checked', `#${popupID}`).val() ?? 'N'},
				{epCd:"B", epType :"A", epYn: $('input[name=epTypeBA]:checked', `#${popupID}`).val() ?? 'N'},
				{epCd:"B", epType :"B", epYn: $('input[name=epTypeBB]:checked', `#${popupID}`).val() ?? 'N'},
				{epCd:"B", epType :"C", epYn: $('input[name=epTypeBC]:checked', `#${popupID}`).val() ?? 'N'}
			]

			self.update(mapData, function(resp){
				if(resp.code==0) {
					let pushData = {
						eSeq : _data.eSeq,
						pushJson : JSON.stringify(pushJSON)
					}

					self.setpush(pushData, function(resp){
						console.log(resp);
					});

					$(".btnClosePopLayer", $layerObject).trigger('click');
					self.retrieve();
					alert('수정되었습니다.');

				} else {
					alert('수정에 실패하였습니다.');
				}
			});

		}).text("수정");
	}


	// popupview
	/*
	layerEqChoiceView = (cbfunc) => {
		const self = this;

		var divHtml = `
			<div class="mw_defalut" style="width:400px;" id="">
				<div class="mw_title" id="handle">
					<h1 class="mw_title_mid">
						<span class="title">장비선택</span>
						<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
					</h1>
				</div>
				<div class="mw_ctWrap">
					<div class="mw_contents">
						<div style="height:315px;overflow-y:auto;padding:2px;">
							<div class="bottonWrap">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
									<caption></caption>
									<colgroup>
										<col width="50%">
										<col width="50%">
									</colgroup>
									<tbody>
										<tr>
											<th>
												<div class="al passwordChange"></div>
											</th>
											<th>
												<div class="ar"><a href="javascript:void(0);" class="btnSearch employeeApply">적용</a></div>
											</th>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="searchWrap pt10">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">
									<caption></caption>
									<colgroup>
										<col width="40px">
										<col width="auto">
										<col width="100px">
										<col width="100px">
									</colgroup>
									<thead>
										<tr>
											<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">선택</th>
											<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">장비명</th>
											<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">공정</th>
											<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">담당자</th>
										</tr>
									</thead>
									<tbody class="eqList">
									</tbody>
								</table>
							</div>		
						</div>
					</div>
				</div>
			</div>`;
		cbfunc(divHtml);
	}
		*/
	// 장비 선택
	layerEqChoiceViewEvent = (popupID, data, $parentLayer) =>{
		const self = this;
		let $layerObject = $(`#${popupID}`);
		let _mapData = {
				page: 1,
				rows : 9999
			};
		let $tbody = $('table tbody.eqList',$layerObject);

		self.eqList(_mapData,function(rdata){
			if(rdata.code == 0){
				let eqInfo = [];
				let info = $('.eqNms',$parentLayer).data('eqInfo');
				if(info != undefined)	for(let i=0;i<info.length;i++) eqInfo.push(info[i].eqSeq);
				for(let i=0;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let $tr = $('<tr/>');
					let status = (eqInfo.indexOf(d.eqSeq) > -1) ?'checked':'';
					/*
					if(d.eqEmployee != undefined){
						if(d.eqEmployee.split(',').indexOf(self._employee.eNm) == -1){ status = 'disabled'}
					}
					*/
					$tr.append($('<td><input type="checkbox" name="eqSeq" value="'+ d.eqSeq +'" '+ status +'></td>'));
					$tr.append($('<td class="al" />').text(d.eqNm));
					$tr.append($('<td class="ac" />').text(d.eqProcess));
					$tr.append($('<td class="ac" style="border-right:0px !important;"/>').text(d.eqEmployee));
					$tr.data(d);
					$tbody.append($tr);
				}
			}
		});

		$layerObject.on('click','.employeeApply',function(){
			let $eqSeqs = $('input[name=eqSeq]:checked',$tbody);
			let eqInfo = [];
			let eqNms = [];
			for(let i=0;i<$eqSeqs.length;i++){
				let $tr = $($eqSeqs[i]).closest('tr');
				let d = $tr.data();
				eqInfo.push({eqSeq : d.eqSeq, eeInchargeYn :'Y'});
				eqNms.push(d.eqNm);
			}
			$('.eqNms',$parentLayer).data({eqInfo:eqInfo}).text(eqNms.join(','));
			$(".btnClosePopLayer", $layerObject).trigger('click');
		});

	}
	insert = (_mapData, cbfunc) => {
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


	// popupview
	layerAuthView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:450px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">권한 설정</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="50%">';
		divHtml += '<col width="50%">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="al"></div>';
		divHtml += '</th>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch employeeAuthSave">저장</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap pt10" style="height:485px;overflow-y:auto;padding:2px;">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType01 tr_nohover mb10 tablScrollDisplay scrollTbThead" style="border-top: 1px solid #9ac7e1 !important;">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="150px">';
		divHtml += '<col width="25px">';
		divHtml += '<col width="200px">';
		divHtml += '</colgroup>';
		divHtml += '<thead>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_c" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;">대분류</td>';
		divHtml += '<th class="txt_c" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;border-right-width: 0 !important;"><input type="checkbox" name="menuAll"></th>';
		divHtml += '<th class="txt_c last" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;border-left-width: 0 !important;">소분류</th>';
		divHtml += '<tr>';
		divHtml += '</thead>';
		divHtml += '<tbody class="menuList">';
		divHtml += '</tbody></table></div>';
		
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	layerAuthViewEvent = (popupID, data) => {
		const self = this;
		let layerObject = $(`#${popupID}`);
		let eSeq = data.eSeq;
		let menuList = data.menuList;
		$(`.title`, layerObject).text("직원 권한 설정");
		let tbody = $('.menuList', layerObject);

		let mapData = {ctl : 'menu',cmd : 'companyMenu',};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				for(let i=0;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let is = false;
					for(let m=0;m<menuList.length;m++){
						if(menuList[m].cmSeq == d.cmSeq){
							is= true;
							break;
						}
					} 
					let tr = $('<tr/>');
					tr.append($('<td class="al pl10" style="">'+ d.mgNm +'</td>'));
					tr.append($('<td style="border:1px solid #9ac7e1 !important;border-right-width: 0 !important;"><input type="checkbox" name="cmSeq" value="'+ d.cmSeq +'" '+((is)?' checked':'')+'></td>'));
					tr.append($('<td class="al" style="border:1px solid #9ac7e1 !important;border-left-width: 0 !important;border-right-width: 0 !important;">'+ d.mNm +'</td>'));
					tr.data(d);
					tbody.append(tr);
				}
				tbodyMerge(tbody,[0]);
			}
			function tbodyMerge($tbody, indexs){
				let info = {};
				let $trs = $tbody.children();
				let $beferTr = null; 
				for(let r=($trs.length-1);r>=0;r--){
					let $nowTr = $($trs[r]);
					let data = $nowTr.data();
					if(data.mgSeq == undefined) continue;
					let d = data.mgSeq;
					if($beferTr==null){
						for(let t=0;t<indexs.length;t++){	
							info[indexs[t]] = 1;
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							if(t==0){
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;border-left-width: 0 !important;');
							}else{
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;');
							}
						}
					}else{
						let beferD = $beferTr.data().mgSeq;
						for(let t=(indexs.length-1);t>=0;t--){	
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							if(t==0){
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;border-left-width: 0 !important;');
							}else{
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;');
							}
							if(d == beferD &&  $($beferTr.children()).eq(indexs[t]).text() == $($nowTr.children()).eq(indexs[t]).text()){
								$($nowTr.children()).eq(indexs[t]).attr("rowspan",info[indexs[t]]+1);
								$($beferTr.children()).eq(indexs[t]).remove();
								info[indexs[t]]++;
							}else{
								info[indexs[t]] = 1;
							}
						}
					}
					$beferTr = $($trs[r]);
				}
			}
		});

		layerObject.find("input[name=menuAll]").on("click",function(e){
			e.stopPropagation();
			let boxs = tbody.find("input[name=cmSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
		});

		layerObject.on('click','.employeeAuthSave', function(e){
			let menuInfo = [];
			let chkBoxs = tbody.find("input[name=cmSeq]:checked");
			for(let i=0;i<chkBoxs.length;i++) menuInfo.push($(chkBoxs[i]).val());
			let mapData = {ctl : 'menu',cmd : 'employeeSet',eSeq : eSeq, menuInfo: JSON.stringify(menuInfo)};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$("body .btnClosePopLayer").trigger('click');
					alert("저장되었습니다.");
				}else{
					alert(rdata.message);
				}
			});

		});

	}




	setpush = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'pushSet'
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

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	menuList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'menu',
			cmd : 'employeeMenu'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	eqList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'equipment',
			cmd : 'list'
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
export default employeeController