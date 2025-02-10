
'use strict';
import Utils from '../../../raon_modules/utils.js';
import AjaxCall from '../../../raon_modules/AjaxCall.js'

class WorkLoginController {
	constructor(_const, _data, _param) {
			this._const = _const?_const:{};
			this._data = _data?_data:{};
			this._param = _param?_param:{};
			this._options = {};
			this._utils = new Utils();
			this._ajax = new AjaxCall();
			// Object.freeze(this._const);
	}

	init = () => {
		const self = this;
		switch(__ROUTE_PATH)
		{
				case 'work':
						self.signinInit();
						break;
		}
	}

	signinInit = () => {
		const self = this;
		if(localStorage != undefined && localStorage.getItem('userIdSave')) {
			let _userId = localStorage.getItem('userid');
			$('input[name=userid]').val(_userId);
			$('.imgChkBoxLabel').trigger('click');
		}
		let width  = window.innerWidth  || document.body.clientWidth;
		let logBoxWidth = $('.logBox').width();
		if(width != parseInt(logBoxWidth)){
			$('.logBox').css('left', '50%').css('margin-left', '-250px');
		}
		//$('.widthSize').text(width);
		let message = '<div style="height:50px;margin-top:50px;">등록된 회원사가 아닙니다.</div>';

		let data = {ctl:"company", cmd :"info"};
		data.host = document.location.host;
		let _api = new AjaxCall(self._const,data);
		_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						let d = rdata.data;
						$(".logLogo").empty();
						$(".copy").empty();
						$(".logLogo").append('<img src="'+ 'https://kprintfactory.s3.ap-northeast-2.amazonaws.com'+d.fileInfo[0].path.replace('kprintfactory/', '') +'" alt="" style="filter:invert(93%);">');
						$(".copy").append('<b>'+ d.cNm +'</b> <i class="fa-solid fa-square-phone-flip"></i> '+ ((self._utils.checkEmptyNull(d.cTel))? '' : self._utils.formatPhoneNumber(d.cTel)) +' <i class="fa-solid fa-location-arrow"></i> : '+ d.cAddr + ' '+ d.cAddrDetail);
					} else {
						$('#login-form').empty();
						$('#login-form').append(message);
						alert($(message).text());
					}
			});
		$('#btnSingin').on('click', function(){
			if( self._utils.checkRequired('#login-form')) {
				// 아이디 저장 체크가 되어 있으면 아이디 저장하기
				if($('.imgChkBoxLabel').hasClass("lbOn")) {
					localStorage.setItem('userid', $('input[name=userid]').val());
					localStorage.setItem('userIdSave', true);
				} else {
					localStorage.removeItem('userid');
					localStorage.removeItem('userIdSave');
				}

				$('form').trigger("submit");
			}
		});

		$('input[name=encpwd]').on('keypress', function(e){
			if(e.keyCode && e.keyCode == 13){
				$("#btnSingin").trigger("click");
				return false;
			}
		});

		$('.btnFind').on('click', function(e){
			self.layerView(function(data){
				self.openLayer(data, self.initNewLayer);
			});
			
			e.stopPropagation();
		});
	}

	initNewLayer = (popupID) => {
		const self = this;

		$(`#${popupID} .title`).text("아이디/패스워드 찾기");


		$(`#${popupID}`).on('click', '.tabFindID', function(e){
			$(".tabcontent").hide();
			$(".tablinks").removeClass("active");
			$("#idTab").show();
    	$(this).addClass("active");
		});

		$(`#${popupID}`).on('click', '.tabFindPWD', function(e){
			$(".tabcontent").hide();
			$(".tablinks").removeClass("active");
			$("#pwTab").show();
    	$(this).addClass("active");
		});

		$(`#${popupID}`).on('click', '.btnEvtCancel, .btnEvtOk', function(e){
			$("body .btnClosePopLayer").trigger('click');
		});

		$(`#${popupID}`).on('click', '.btnEvtFind', function(e){
			const currentUrl = window.location.href;

			if($('.tablinks.tabFindID').hasClass('active')) {
				let _eNm= $('#idTab input[name=eNm]', `#${popupID}`).val().replace(/^\s+|\s+$/g, '');
				let _eTel = $('#idTab input[name=eTel]', `#${popupID}`).val().replace(/^\s+|\s+|[-]/g, '');

				if(_eNm == "") {
					alert('이름을 입력해 주세요');
					return false;
				}
	
				if(_eTel == "") {
					alert('전화번호를 입력해 주세요');
					return false;
				}

				//let mapData = { host : `${currentUrl.replace(/^(https?:\/\/)/, '').replace(/\/$/, '')}`, eNm : _eNm, eTel : _eTel}
				let mapData = { host : document.location.host, eNm : _eNm, eTel : _eTel}
				self.idFind(mapData, function(resp){
					if(resp.code==0) {
						$(".findlayer").hide();
						$(".sublayer").show();

						$(".sublayer .resultInfo", `#${popupID}`).text("검색된 아이디입니다");
						$(".sublayer .resultMsg", `#${popupID}`).text(resp.data.eId);

					} else {
						alert('존재하는 아이디가 없습니다');
					}
				});


			} else {
				let _eId= $('#pwTab input[name=eId]', `#${popupID}`).val().replace(/^\s+|\s+$/g, '');
				let _eNm= $('#pwTab input[name=eNm]', `#${popupID}`).val().replace(/^\s+|\s+$/g, '');
				let _eTel = $('#pwTab input[name=eTel]', `#${popupID}`).val().replace(/^\s+|\s+|[-]/g, '');

				if(_eId == "") {
					alert('아이디를 입력해 주세요');
					return false;
				}

				if(_eNm == "") {
					alert('이름을 입력해 주세요');
					return false;
				}
	
				if(_eTel == "") {
					alert('전화번호를 입력해 주세요');
					return false;
				}

				let mapData = { host :document.location.host, 
												newCreate: 'Y', 
												eId : _eId,
												eNm : _eNm, 
												eTel : _eTel };
												
				self.pwdChange(mapData, function(resp){
					if(resp.code==0) {
						$(".findlayer").hide();
						$(".sublayer").show();

						$(".sublayer .resultInfo", `#${popupID}`).text("해당 메일로 임시비밀번호가 발송되었습니다");
						$(".sublayer .resultMsg", `#${popupID}`).text(_eId);

					} else {
						alert('정보를 다시 확인해 주세요');
					}
				});
			}

		});
	}

	idFind = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'idFind'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'public/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	pwdChange = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'pwdChange'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'public/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}


	// popupview
	layerView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:450px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">아이디/패스워드 찾기</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div class="findlayer mainlayer" style="display:block;height:300px;overflow-y:auto;padding:2px;">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<td>';
		divHtml += '<p style="font-weight:600;">아이디/패스워드를 잊은경우<br/>가입할 때 사용하였던 정보를 입력하여 주시기 바랍니다</p>';
		divHtml += '</td>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="tab">';
    divHtml += '<button class="tablinks active tabFindID">아이디 찾기</button>';
    divHtml += '<button class="tablinks tabFindPWD">비밀번호 변경</button>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap">';
		divHtml += '<div id="idTab" class="tabcontent" style="display:block;">';
		divHtml += '<div class="input-group" style="display:block;">';
		divHtml += '<label for="eNm11">이름</label>';
		divHtml += '<input type="text" id="eNm11" name="eNm">';
		divHtml += '</div>';
		divHtml += '<div class="input-group">';
		divHtml += '<label for="eTel12">전화번호</label>';
		divHtml += '<input type="text" id="eTel12" name="eTel" placeholder="예시) 010987654321">';
		divHtml += '</div>';
		divHtml += '</div>';

		divHtml += '<div id="pwTab" class="tabcontent">';
		divHtml += '<div class="input-group">';
		divHtml += '<label for="eId21">아이디</label>';
		divHtml += '<input type="text" id="eId21" name="eId">';
		divHtml += '</div>';
		divHtml += '<div class="input-group">';
		divHtml += '<label for="eNm22">이름</label>';
		divHtml += '<input type="text" id="eNm22" name="eNm">';
		divHtml += '</div>';
		divHtml += '<div class="input-group">';
		divHtml += '<label for="eTel23">전화번호</label>';
		divHtml += '<input type="text" id="eTel23" name="eTel" placeholder="예시) 010987654321">';
		divHtml += '</div>';

		divHtml += '</div>';
		divHtml += '</div>';

		divHtml += '<div class="ac">';
		divHtml += '<a class="btnSearch2 mr10 btnEvtCancel">취소</a>';
		divHtml += '<a class="btnSearch btnEvtFind">찾기</a>';
		divHtml += '</div>';

		divHtml += '</div>';
		

		
		divHtml += '</div>';

		divHtml += '<div class="findlayer sublayer" style="height:300px;overflow-y:auto;padding:2px;">';
		
		divHtml += '<div class="bottonWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="auto">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<td>';
		divHtml += '<p class="resultInfo" style="font-weight:600;">검색된 아이디입니다</p>';
		divHtml += '</td>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap">';
		divHtml += '<div class="ac mt25 mb25 resultMsg">hon*****@naver.com</div>';
		divHtml += '</div>';
		divHtml += '<div class="ac">';
		divHtml += '<a class="btnSearch2 mr10 btnEvtOk">확인</a>';
		divHtml += '</div>';

		divHtml += '</div>';
		
		divHtml += '</div></div>';

		cbfunc(divHtml);
	}

	openLayer = (data,cbfunc) => {
		const self = this;
		let popupID = self.createUniqueId();
		let obj;

		let openDiv = '<div class="mw_layer open"><div class="bg"></div><div id="'+popupID+'" class="ctlContainer">'+data+'</div></div>';
		$("body").append(openDiv);
			
		// 레이어 설정
		obj = $("#"+popupID+" div:eq(0)");
		let handler = obj.find(".mw_title");
		obj.draggable({containment:"body", cursor:"move", handle:handler});
		self.initPositionLayer(obj);

		// contents 원래크기 기록
		let contentsDiv = $(".contents");
		let contentsHeight = contentsDiv.height();
		if(contentsDiv.attr("data-height")==undefined){
			contentsDiv.attr("data-height", contentsDiv.height());
		}

		$("body").on("click", ".btnClosePopLayer", function(){
			self.closeLayerPopup($(this));
		});

		cbfunc(popupID);
	}

	closeLayerPopup = ($obj) => {
		if($obj != undefined){
			$obj.closest(".mw_layer").html("").remove();
	
			// contents 원래크기로 변경
			var contentsDiv = $(".contents");
			if(contentsDiv.attr("data-height")!=undefined){
				contentsDiv.css("minHeight", contentsDiv.attr("data-height")+"px");
			}
		}
	}

	createUniqueId = () => {
		const self = this;

		return "dynamicLayerID_" + (++self._uniqueID);
	}

	initPositionLayer = ($id) => {
		const self = this;

		let objWrap = $(".wrap");
		let heightDoc = objWrap.height(); // 문서높이
		let widthDoc = objWrap.width(); // 문서너비
		let heightWin = $(window).height(); // 창높이
		let widthWin = $(window).width(); // 창너비
		let layerHeight = $id.height(); // 레이어높이
		let layerWidth = $id.width(); // 레이어너비
		let top = $(document).scrollTop(); // 스크롤세로
		let left = $(document).scrollLeft(); // 스크롤가로

		if(widthDoc==0) widthDoc = $(document).width();
		if(heightDoc==0) heightDoc = $(document).width();
	
		if(widthWin<layerWidth) widthWin=widthDoc; // 가로는 출력내용이 많을경우 Doc 크기로 변경
	
		top += (heightWin-layerHeight)/2;
		left += (widthWin-layerWidth)/2;
		if(top<10) top=10; // 최소 10px
		if(left<10) left=10; // 최소 10px
	
		$id.css("top", top);
		$id.css("left", left);
		$id.parent().prev(".bg").height('100%'); // 불투명 스크린 문서크기만큼 height 리사이즈
		$id.parent().prev(".bg").width('100%'); // 불투명 스크린 문서크기만큼 width 리사이즈
	}
}
export default WorkLoginController