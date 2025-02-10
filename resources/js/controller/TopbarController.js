'use strict';
import Utils from '../raon_modules/utils.js';
import AjaxCall from '../raon_modules/AjaxCall';


class TopbarController {
	constructor(_parent,_const, _data, _param) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
		this._options = {};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._menuInfo = undefined;
		// Object.freeze(this._const);
	}

	init = () => {
		const self = this;
		self._menuInfo = self._utils.parseJSONString(sessionStorage.getItem("LMKEY"));

		self.getTopbarInfo();

		$(".topMenuSubLayer").hide();
		$("a[id^=topMenu]").on('click',function(e){
			var idx = $(this).attr("id").replace("topMenu","")*1;

			$("#popMenu0" + idx).css("display") != "none" ? $("#popMenu0" + idx).hide(): $("#popMenu0" + idx).show();
			e.stopPropagation();
		});

		$('.topMenuSubLayer .btnMyInfo').on('click', function(e){
			$(".topMenuSubLayer").hide();

			self.load({eSeq:self._const.__USER_ID}, function(resp){

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
			e.stopPropagation();
		});

		$('.topMenuSubLayer .btnLogout').on('click', function(e){
			if (sessionStorage != undefined) {
				sessionStorage.removeItem("MenuInfo");
				sessionStorage.removeItem("LMKEY");
			}

			$(".topMenuSubLayer").hide();
			e.stopPropagation();
		});

		$(document).on('click', function(e){
			if($(e.target).closest(".topMenuUl").length == 0){
				$(".topMenuSubLayer").hide();
			}
			e.stopPropagation();
		});
	}
	
	// popupview
	layerView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:450px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">내정보 수정</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="overflow-y:auto;padding:2px;">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch myInfoSave">수정</a></div>';
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
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">이&nbsp;&nbsp;&nbsp;&nbsp;름</th>';
		divHtml += '<td><input type="text" name="eNm" class="w100p" requiremsg="이름" autocomplete="false"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">아이디</th>';
		divHtml += '<td><input type="text" name="eId" class="w100p readonly" placeholder="예시)kprint@kpfactory.com" readonly></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">비밀번호</th>';
		divHtml += '<td><input type="password" name="ePwd" class="w49p" autocomplete="false"> <input type="password" name="reEPwd" class="w49p" autocomplete="false"></td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">전화번호</th>';
		divHtml += '<td><input type="text" name="eTel" class="w100p" requiremsg="전화번호" vtype="phone" autocomplete="false"></td>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	reloadLayer = (popupID) => {
		const self = this;

		$(`#${popupID} .title`).text("내정보 수정");

		if (Object.keys(self._employee).length === 0 && self._employee.constructor === Object) {
			alert('직원 데이터를 불러올 수 없습니다');
			return false;
		}

		// 불러온 데이터를 화면에 표시한다.
		$('input[name=eNm]', `#${popupID}`).val(self._employee.eNm);
		$('input[name=eId]', `#${popupID}`).val(self._employee.eId);
		$('input[name=eTel]', `#${popupID}`).val(self._employee.eTel);

		self._utils.focusEvent($('input[name=eTel]', `#${popupID}`),'tel');
		setTimeout(function(){ $('input[name=ePwd]', `#${popupID}`).val('')},1000);
		$(`#${popupID} .myInfoSave`).data({eSeq:self._employee.eSeq}).on('click', function(e){
			let _data = $(this).data();

			let _eNm = $('input[name=eNm]', `#${popupID}`).val().trim();
			let _eId = $('input[name=eId]', `#${popupID}`).val().trim();
			let _ePwd = $('input[name=ePwd]', `#${popupID}`).val().trim();
			let _reEPwd = $('input[name=reEPwd]', `#${popupID}`).val().trim();
			let _eTel = $('input[name=eTel]', `#${popupID}`).val().trim();

			// 필수 항목 체크
			if(!_data.eSeq) {
				alert('직원코드가 없어 수정불가합니다');
				return false;
			}

			if( self._utils.checkRequired(`#${popupID}`)) {
				
				if(_ePwd != _reEPwd) {
					alert('암호가 일치하지 않습니다');
					return false;
				}
	
				let mapData = {
					eSeq : _data.eSeq,
					eNm : _eNm,
					ePwd : _ePwd,
					eTel : _eTel
				}
	
				self.update(mapData, function(resp){
					if(resp.code==0) {
						self.getTopbarInfo();
						$("body .btnClosePopLayer").trigger('click');
						alert('수정되었습니다.');
					} else {
						alert('수정에 실패하였습니다.');
					}
				});
			}

		}).text("수정");
	}

	getTopbarInfo = () => {
		const self = this;

		self.load({eSeq:self._const.__USER_ID}, function(resp){

			if(resp.code == 0) {
				self._employee = resp.data;
				$("#topUserName").empty();
				if(self._const.__USER_LEVEL == 3){
					$("#topUserName").append('<i class="fa-solid fa-power-off"></i>&nbsp;&nbsp;<span style="font-size:11px;">'+self._const.__CU_NM +'</span>&nbsp;&nbsp;'+ self._employee.eNm);
				}else{	
					$("#topUserName").append('<i class="fa-solid fa-power-off"></i>&nbsp;&nbsp;'+self._employee.eNm);
				}

			} else {
				alert('직원 데이터를 불러올 수 없습니다');
				return false;
			}
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
}
export default TopbarController