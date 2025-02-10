
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let materialController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._filcuSeq = null;
	}

	init = (_code,_data) => {
		const self = this;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
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

		thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			searchWrap.find("input[name=orderculumn]").val(column);
			searchWrap.find("input[name=orderby]").val(order);
			self.tHeadOrderBy($(this),order);
			
		});


		tfoot.find("select[name=rowsPerPage]").on("change",function(){
			tfoot.find("input[name=page]").val("1");
			self.retrieve();
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

	goPage = () => {
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

		let searchData = {
			cuTypeCd : 'C',
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
				$('<tr><td colspan="9">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}

			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});
	}

	display = (tbody, d) => {
		const self = this;

		let trHtml = '<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>';
				trHtml +='<td><input type="checkbox" class="vm" name="cuSeq" value="'+d.cuSeq+'"></td>';
				trHtml +='<td class="al pl5">'+self._utils.nullTostring(d.cuNm, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.cuOwnerNm, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.cuTel, '')+'</td>';
				if(d.cuImportantYn == "N") trHtml +='<td class="txt_red">'+self._utils.nullTostring(d.cuImportantYn, '')+'</td>';
				else trHtml +='<td>'+self._utils.nullTostring(d.cuImportantYn, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.cuDcRate, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.cuMemo,'')+'</td>';
				trHtml +='<td>'+d.creDate+'</td>';
				trHtml +='<td><a href="javascript:void(0);"class="btnStyle4 btnOpenInfo" >보기</a></td>';
				trHtml +='</tr>';

		let $trObj = $(trHtml).data("ROW",d);
		$(".btnOpenInfo", $trObj).on("click", function(){
			let _data = $(this).closest('tr').data('ROW');
			
			// 고객사 데이터를 먼저 읽어온다
			self._client = {};
			self.load({cuSeq:_data.cuSeq}, function(resp){

				if(resp.code == 0) {
					self._client = resp.data;
					self.layerView(function(data){
						self._parent.openLayer(data, self.reloadLayer);
					});

				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});

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

	// popupview
	layerView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:820px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">자재사 등록</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:420px;overflow-y:auto;padding:2px;">';
		
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
		divHtml += '<col width="80px">';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">기업유형</th>';
		divHtml += '<td colspan="3">';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="cuTypeCd" value="A" id="cuTypeCd1"><label for="cuTypeCd1">고객사</label></div>';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="cuTypeCd" value="B" id="cuTypeCd2"><label for="cuTypeCd2">외주사</label></div>';
		divHtml += '<div class="mw_checkbox"><input type="checkbox" name="cuTypeCd" value="C" id="cuTypeCd3" checked><label for="cuTypeCd3">자재공급사</label></div>';
		divHtml += '</td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">사업자번호</th>';
		divHtml += '<td><input type="text" name="cuBizNo" class="w55p mr5" requiremsg="사업자번호"><a class="btnStyle03 btnBizSelect" href="javascript:void(0);">조회</a></td>';
		divHtml += '<th class="txt_r">종사업장번호</th>';
		divHtml += '<td><input type="text" name="cuBizNoNum" class="w20p"></td>';
		divHtml += '</tr>';

		divHtml += '<tr>';
		divHtml += '<th class="txt_r">회사명</th>';
		divHtml += '<td><input type="text" name="cuNm" class="w100p" requiremsg="회사명"></td>';
		divHtml += '<th class="txt_r">대표자</th>';
		divHtml += '<td><input type="text" name="cuOwnerNm" class="w100p" requiremsg="대표자"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">기업형태</th>';
		divHtml += '<td><select name="cuType"><option value="C">기업</option><option value="P">개인</option></select></td>';
		divHtml += '<th class="txt_r">전화번호</th>';
		divHtml += '<td><input type="text" name="cuTel" class="w100p" requiremsg="전화버호" vtype="phone"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">주소</th>';
		divHtml += '<td><p class="mb5"><input name="cuZipcode" class="w20p mr5" type="text" requiremsg="우편번호" readonly="readonly"><a class="btnStyle03 btnAddrSearch" href="javascript:void(0);">주소검색</a></p></td>';
		divHtml += '<th class="txt_r">기본 주소</th>';
		divHtml += '<td><input name="cuAddr" class="w100p" type="text" placeholder="기본 주소" readonly="readonly"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">상세주소</th>';
		divHtml += '<td colspan="3"><input type="text" name="cuAddrDetail" class="w100p"></td>';
		divHtml += '</tr>';
		// divHtml += '<tr>';
		// divHtml += '<th class="txt_r">위도</th>';
		// divHtml += '<td><input type="text" name="cuGpsLatitude" class="w100p" placeholder="위도"></td>';
		// divHtml += '<th class="txt_r">경도</th>';
		// divHtml += '<td><input type="text" name="cuGpsLongitude" class="w100p" placeholder="경도"></td>';
		// divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">할인률(%)</th>';
		divHtml += '<td><input type="text" name="cuDcRate" class="w20p" placeholder="할인률" value="0" requiremsg="할인률" vtype="num"></td>';
		divHtml += '<th class="txt_r">주요 거래처</th>';
		divHtml += '<td><select name="cuImportantYn"><option value="N">N</option><option value="Y">Y</option></select></td>';
		divHtml += '</tr>';

		divHtml += '<tr>';
		divHtml += '<th class="txt_r">비고</th>';
		divHtml += '<td colspan="3"><input type="text" name="cuMemo" class="w100p"></td>';
		divHtml += '</tr>';

		divHtml += '<tr>';
		divHtml += '<th class="txt_r">아이디</th>';
		divHtml += '<td><input type="text" name="eId" class="w100p" placeholder="아이디" requiremsg="아이디"></td>';
		divHtml += '<th class="txt_r">비밀번호</th>';
		divHtml += '<td><input type="password" name="ePwd" class="w100p" placeholder="비밀번호" requiremsg="비밀번호"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">이름</th>';
		divHtml += '<td><input type="text" name="eNm" class="w100p" placeholder="이름" requiremsg="이름"></td>';
		divHtml += '<th class="txt_r">전화번호</th>';
		divHtml += '<td><input type="text" name="eTel" class="w100p" placeholder="전화번호" requiremsg="전화번호" vtype="phone"></td>';
		divHtml += '</tr>';

		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
		
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	initNewLayer = (popupID) => {
		const self = this;

		$(`#${popupID} .title`).text("자재사 등록");

		$(`#${popupID} .btnBizSelect`).on('click', function(e){

			let _cuBizNo = $('input[name=cuBizNo]', `#${popupID}`).val();
			let _cuBizNoNum = $('input[name=cuBizNoNum]', `#${popupID}`).val();

			if(!_cuBizNo) {
				alert('사업자번호를 입력하세요');
				return false;
			}
			let mapData = {
				bizNo : _cuBizNo,
				bizNoNum : _cuBizNoNum
			}

			self.bizSelect(mapData,function(resp){
				if(resp.code == 0 && resp.data.length > 0) {
					let _data = resp.data[0];
			
					$('input[name=cuBizNo]', `#${popupID}`).val(_data.bizNo);
					$('input[name=cuBizNoNum]', `#${popupID}`).val(_data.bizNoNum);

					$('input[name=cuNm]', `#${popupID}`).val(_data.nm);
					$('input[name=cuOwnerNm]', `#${popupID}`).val(_data.ownerNm);
					$('input[name=cuTel]', `#${popupID}`).val(_data.tel);
					$('select[name=cuType]', `#${popupID}`).val(_data.type);

					$('input[name=cuZipcode]', `#${popupID}`).val(_data.zipcode);
					$('input[name=cuAddr]', `#${popupID}`).val(_data.addr);
					$('input[name=cuAddrDetail]', `#${popupID}`).val(_data.addrDetail);
					
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
			let _cuMemo = $('input[name=cuMemo]', `#${popupID}`).val();

			let _eId = $('input[name=eId]', `#${popupID}`).val();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
			let _eNm = $('input[name=eNm]', `#${popupID}`).val();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val();

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
					cuTypeCd : JSON.stringify(_cuTypeCd),
					employeeInfo : JSON.stringify({
						eId : _eId, 
						ePwd: _ePwd,
						eNm : _eNm,
						eTel : _eTel
					})
				}

				console.log(mapData);

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

		$(`#${popupID} .title`).text("자재사 수정");

				
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
			alert('자재사 데이터를 불러올 수 없습니다');
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
		$('input[name=cuMemo]', `#${popupID}`).val(self._client.cuMemo);



		self._client.cuTypeCd.forEach(function(value) {
			let _cuTypeCd = value.cuTypeCd;
			$(`input[name=cuTypeCd][value=${_cuTypeCd}]`, `#${popupID}`).prop('checked', true);
		});

		$('input[name=ePwd]', `#${popupID}`).removeAttr('requiremsg');
		self._client.employeeInfo.forEach(function(value) {
			let _employee = value;
			if(_employee.eManagerYn == 'Y') {
				$('input[name=eId]', `#${popupID}`).val(_employee.eId);
				$('input[name=ePwd]', `#${popupID}`).val(_employee.ePwd);
				$('input[name=eNm]', `#${popupID}`).val(_employee.eNm);
				$('input[name=eTel]', `#${popupID}`).val(_employee.eTel);
			}
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
			let _cuMemo = $('input[name=cuMemo]', `#${popupID}`).val();

			let _eId = $('input[name=eId]', `#${popupID}`).val();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val();
			let _eNm = $('input[name=eNm]', `#${popupID}`).val();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val();

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
export default materialController