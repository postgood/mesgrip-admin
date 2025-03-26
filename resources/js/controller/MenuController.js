'use strict';
import Utils from '../raon_modules/utils.js';
import AjaxCall from '../raon_modules/AjaxCall';
import CommonPop from '../raon_modules/CommonPop.js';
import Report from '../raon_modules/Report.js';
import TopbarController from './TopbarController.js'
import FooterController from './FooterController.js'

import MemberController from './member'
import ClientController from './client'
import DistributionController from './distribution'
/*
import CompanyController from './company'
import DashboardController from './dashboard'
import LedgerController from './ledger'
import CustomerController from './customer'
import StockController from './stock'
*/

class MenuController {
	constructor(_const, _data, _param) {
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
		let wapi = 'public/ws';
		if(_const.__USER_LEVEL == 3) { wapi = 'customer/ws';
		}else if(_const.__USER_LEVEL == 4) { wapi = 'user/ws';
		}else if(_const.__USER_LEVEL == 7) { wapi = 'admin/ws';}
		this._options = {
			isasync : true,
			wapi : wapi
		}
		// this._options = {};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._popup = new CommonPop(this, _const?_const:{}, _data?_data:{},this._options);
		this._report = new Report(this, _const?_const:{}, _data?_data:{},this._options);
		this._tabs = {
			startMenu: true,
			info: [],
			menuInfo: [],
			activeMenu: undefined,
			activeIndex: 0,
			tabMagin : 400,
			tabWidth : 0
		}
		this._uniqueID = 0; // 레이어 아이디
		this._autocompleteLength = 2;
		this._autocompleteTime = 200;
		this._reloadStartTime = 5000;
		this._reloadTime = 180000;
		this._reloadActionTime = 10000;
		this._pushTime = 1000*5;
		// Object.freeze(this._const);

	}

	init = () => {
		const self = this;

		self._topbar =  new TopbarController(self, self._const,self._data,self._param);
		self._footer =  new FooterController(self._const,self._data,self._param, self);
		self._member =  new MemberController(self._const,self._data,self._param, self);
		self._member.init();
/*
		self._client =  new ClientController(self._const,self._data,self._param, self);
		self._client.init();
		
		self._distribution =  new DistributionController(self._const,self._data,self._param, self);
		self._distribution.init();

		self._company =  new CompanyController(self._const,self._data,self._param, self);
		self._company.init();

		self._dashboard =  new DashboardController(self._const,self._data,self._param, self);
		self._dashboard.init();
		

		self._ledger =  new LedgerController(self._const,self._data,self._param, self);
		self._ledger.init();

		self._customer =  new CustomerController(self._const,self._data,self._param, self);
		self._customer.init();

		self._stock =  new StockController(self._const,self._data,self._param, self);
		self._stock.init();
		setTimeout(
			function(){
				self.intervalId = setInterval(function(){self.intervalRun()}, self._reloadTime)
			} ,self._reloadStartTime);
*/
/*
		let _api = new AjaxCall(self._const,{ctl:"company", cmd :"dashboardInfo"},{'spinner':true});
		_api.ajaxformdata(function(rdata){ 
					if(rdata.code == 0) {
						let d = rdata.data;
						self._companyInfo = d;
						if(d.fileInfo.length>0){
							$(".headerWrap .logo").empty();
							$(".headerWrap .logo").append('<img src="'+ __FILE_DOMIN+d.fileInfo[0].path.replace('kprintfactory', '') +'" alt="">');
							//$(".copy").append('<b>'+ d.cNm +'</b> <i class="fa-solid fa-square-phone-flip"></i> '+ d.cTel +' <i class="fa-solid fa-location-arrow"></i> : '+ d.cAddr + ' '+ d.cAddrDetail);
							//$(".copy").append(서울 중구 퇴계로31길 10 304호 (필동1가 43-3) Tel. <a href="tel:01090890794">010 9089 0794</a>  Email. <a href="mailto:postgood@kakao.com">postgood@kakao.com</a><br>Copyright 2024 KOREANCULTURELOVE Co,. ltd All right reserved.');
						}
						
					} else {
							alert(rdata.message);
					}
			});
*/
		self.getMenu(function(data){
			self._topbar.init();
			self.displayMenu(data);
			self._menuList = data.data;
			self._footer.init();


			// 새로고침시 활성화 된 메뉴 살리기
			if(sessionStorage.getItem("AMenuInfo")!=undefined){
				self._tabs.info = JSON.parse(sessionStorage.getItem("AMenuInfo"));
				for(let i in self._tabs.info) {
					let info = self._tabs.info[i];
					if(info.____ACTIVE____=="Y") {
						self._tabs.activeIndex = i;
						self.createMdi(info.____ID____,info.____NAME____,info.____URL____);
					}
				}
			}
		});

		// 탭 클릭시
		$("#ctrTabWrap").on("click","li .tabName",function(e){
			let tab = $(this).parent();
			let id = tab.attr("code");
			//console.log("탭 클릭 : "+ id);
			let info = self.getMdi(id);
			self._tabs.activeIndex = tab.index();
			self._tabs.activeId = id;
			self.createMdi(info.____ID____,info.____NAME____,info.____URL____);
			//console.log('ctrTabWrap');
			window.dispatchEvent(new Event('resize'));
			//e.stopPropagation();
		});


		// 탭 닫기
		$("#ctrTabWrap").children(".tabMenuUl").on("click","li .ctrTabCloseBtn",function(e){
			if(self._tabs.info.length == 1){
				alert("탭이 여러개인 경우에만 삭제 할 수 있습니다.");
				return;
			}
			let tab = $(this).parent();
			let id = tab.attr("code");
			//console.log("탭 닫기 : "+ id);
			// self._tabs.activeId = id;
			//let info = self.getMdi(id);
			if(tab.hasClass("choiceTab")){
				self._tabs.activeIndex = 0;
				setTimeout(function(){
					$("#ctrTabWrap li .tabName").eq(self._tabs.activeIndex).trigger("click");
				},500);
			}
			self.remove(id);
			self.refresh();
			self.menuFocus(self.activeMenuId());
			e.stopPropagation();
		});

		// 더보기 메뉴보기
		$("#ctrTabWrap").on("click","li.ctrTabMore",function(e){
			let moreDiv = $("#moreTapList"); 
			moreDiv.css("display") != "none" ? moreDiv.hide(): moreDiv.show();
			e.stopPropagation();
			
		});
		// 더보기 메뉴에서 해당 메뉴 클릭시
		$("#ctrTabWrap").on("click","li.ctrTabMore .myMenuList a",function(e){
			let id = $(this).attr("code");
			let info = self.getMdi(id);
			self._tabs.activeIndex = 0;
			self._tabs.activeId = id;
			self.createMdi(info.____ID____,info.____NAME____,info.____URL____);
			//console.log('ctrTabWrap');
			window.dispatchEvent(new Event('resize'));


			/*
			let id = $(this).attr("code");
			self._tabs.activeId = id;
			let info = self.getMdi(id);
			self.createMdi(info.____ID____,info.____NAME____,info.____URL____);
			*/
		});

		$(document).on('click', function(e){
			if($(e.target).closest(".topMenuUl").length == 0){
				$(".topMenuSubLayer2").hide();
			}
		});
		//console.log('init');
		/*
		$(window).on('resize', function() { // 브라우저 사이즈 감지
			self.refresh();
		});
		*/
		$(document).on('click','.inputTextClean',function(e){
			let $clean = $(e.target);
			if($clean.prop('tagName') == 'SPAN'){
				$clean = $clean.closest('div');
			}
			
			let $prev = $clean.prev();
			if($prev.length > 0 && ($prev.attr('type') == 'text' || $prev.attr('type') == 'password') ){
				$prev.val('').trigger('focus');
				let $seqObj = $prev.prev();
				if($seqObj.attr('type') == 'hidden' && $seqObj.attr('name').indexOf('Seq') >-1){
					$seqObj.val('');
				}
			}
			
		});
		$(document).on('mouseover','.inputTextCleanDiv',function(e){
			let $obj = $(e.currentTarget);
			let $input = $('input[type=text]', $obj);
			//if($input.length > 0 && $input.val() != ''){
				let $clean = $obj.children('.inputTextClean');
				if($input.hasClass('disabled')) return;
				if($clean.length > 0){
					$clean.css('display','inline-block');
				}
			//}
		});
		$(document).on('mouseout','.inputTextCleanDiv',function(e){
			let $obj = $(e.currentTarget);
			let $clean = $obj.children('.inputTextClean');
			if($clean.length > 0){
				$clean.css('display','none');
			}
		});
/*
		if(self._const.__USER_LEVEL == 3){
			$("#sideWrap").find("ul li a").eq(0).trigger('click');
		}
*/
	}

	reloadTabCode = (code) => {
		const self = this;
		let info = self.getMdi(code);
		self.createMdi(info.____ID____,info.____NAME____,info.____URL____);
	}

	activeMenuId = () => { 
		const self = this;
		let id = undefined;
		/*
		if(typeof self._tabs.activeMenu == "object" && self._tabs.activeMenu.____TAB____ != undefined){let id =  self._tabs.activeMenu.____TAB____.attr("code");}
		if(id == undefined){id = $(".tabMenu.choiceTab").attr("code");}
		*/
		if(id == undefined){id = self._tabs.activeId ;}
		//if(id == undefined && self.info != undefined){id = self.info[self._tabs.activeIndex].____ID____;}
		return id
	}

	displayMenu = (data) => {
		const self = this;

		if(data.code === 0) {
			let sstorage = self._utils.parseJSONString(sessionStorage.getItem("LMKEY"));

			const menuOpen = $('#sideOpen .lnb');
			const menuOff = $('#sideOff .lnb');

			let gSort = undefined;
			let gOpenMenu = undefined;
			for(let i in sstorage) {
				let v = sstorage[i];

				if(v.mType == "MENU") {
					if(gSort != v.mgSort ){
						if(gSort != undefined){
							menuOpen.append(gOpenMenu);
						}
						let iconTag = '';
						if(v.mgCode=='CI'){
							iconTag = '<i class="fa-regular fa-sun" style="width:25px;"></i>';
						}else if(v.mgCode=='MM'){
							iconTag = '<i class="fa-solid fa-desktop" style="width:25px;"></i>';
						}else if(v.mgCode=='CM'){
							iconTag = '<i class="fa-solid fa-coins" style="width:25px;"></i>';
						}else if(v.mgCode=='CS'){
							iconTag = '<i class="fa-solid fa-boxes-packing" style="width:25px;"></i>';
						}
						
						
						gSort = v.mgSort;
						gOpenMenu = $('<dl class="lnbDl"><dt id="'+v.mgNm+'">'+ iconTag + v.mgNm+ '</dt><dd><ul></ul></dd></dl>');
					}
					gOpenMenu.find("ul").append('<li><a href="javascript:void(0);" code="'+v.code+'" page-url="'+v.mUrl+'" controller="'+ v.mController+'">'+v.mNm+'</a></li>');
					
				}
			}
			gOpenMenu.append($('<div class="lnbAside"><a href="javascript:void(0);" class="lnbToggleBtn"><img src="/images/btn/btn_menuToggle.png" alt="" class="mCS_img_loaded"> 메뉴 감추기</a></div>'));
			menuOpen.append(gOpenMenu);
			menuOff.append($('<div class="lnbAside"><a href="javascript:void(0);" class="lnbToggleBtn"><img src="/images/btn/lnb_closeMenuEnd.png" alt="" title="메뉴 열기" class="mCS_img_loaded"></a></div>'));


			menuOpen.on("click", "dt", function (e) {
				let dl = $(this).parent();
					if(dl.hasClass("lnbDlSelected") == false){
						menuOpen.find("dl.lnbDlSelected").removeClass("lnbDlSelected").addClass("lnbDl");
						dl.removeClass("lnbDl").addClass("lnbDlSelected");
					}else{
						menuOpen.find("dl.lnbDlSelected").removeClass("lnbDl").addClass("lnbDlSelected");
						dl.removeClass("lnbDlSelected").addClass("lnbDl");
					}
					e.stopPropagation();
			});
			
			menuOpen.on("click", "li a", function (e) {
				if($(this).hasClass("on") == false){
					menuOpen.find("li a").removeClass("on");
					$(this).addClass("on");
				}
				
			});

			// 메뉴 숨김 이벤트
			$("#sideWrap").on("click",".lnbToggleBtn",function(e){
				let visible = $('#sideOpen').is(":visible");
				if (visible == false) {
					$('.contentsWrap').addClass('sideOpen');
					$('.contentsWrap').removeClass('sideOff');
					$('#sideOpen').show();
					$('#sideOff').hide();
					$('.footNotice').css('left', 208 + 'px');
					$('.sideWrap').css('background', '#344154 !important');
				}else{
					$('.contentsWrap').removeClass('sideOpen');
					$('.contentsWrap').addClass('sideOff');
					$('#sideOpen').hide();
					$('#sideOff').show();
					$('.footNotice').css('left', 0 + 'px');
					$('.sideWrap').css('background', '#fff !important');
				}
				//console.log('sideWrap');
				window.dispatchEvent(new Event('resize'));
				//e.stopPropagation();		
			});	

			if(sessionStorage.getItem("AMenuInfo") == undefined || sessionStorage.getItem("AMenuInfo").length == 0){
			setTimeout(function(){$("#sideWrap").find("ul li a").eq(0).trigger('click');},1500);
			}
		} else {
			alert(data.message, 'info');
		}

		// 메뉴 연결
		$("#sideWrap").on("click","ul li a",function(e){
			let aLink = $(this);
			let tabId = aLink.attr("code");
			let tabName = aLink.text();
			let tabUrl = aLink.attr("page-url");
			let controller = aLink.attr('controller');
			self.createMdi(tabId,tabName,tabUrl, controller);
			e.stopPropagation();
		});
	}

	createMdi = async (id,name,url,controller, cbfunc) => {
		const self = this;
		//console.log("createMdi : "+ id);
		self._tabs.activeId = id;
		let tabInfo = undefined;
		let $ctrBody = $("#ctrContWrap");
		let info ;
		if($ctrBody == undefined){
			alert("ctrDiv Not Find", 'error');
			return false;
		}
/*		
		let menuData = {};
		for(let i=0;i<self._menuList.length;i++){
			if(id == self._menuList[i].code){
				menuData = self._menuList[i];
				break;
			}
		}
*/			
		let side = ($('#sideOpen').is(":visible"))?'sideOpen' : 'sideOff';
		$(".contentsWrap").hide();
		if(self.getMdi(id) == null) { // 신규 탭 생성
			let tabContentHtml = "";
			

			if(url!=undefined && url != '/') tabContentHtml = await self.getContent(url);
			let $body = $('<div class="contentsWrap '+side +'" id="__sales__ctrBody_'+ id +'"><div class="innerConWrap">'+tabContentHtml+'</div></div>');
			try{
				let $div = $($($body.children()[0]).children()[0]);
				$div.prop("id", id);
				let sstorage = self._utils.parseJSONString(sessionStorage.getItem("LMKEY"));
				//let info;
				for(let i=0;i<sstorage.length;i++){
					if(id == sstorage[i].code){
						info = sstorage[i];
						break;
					}
				}
				$div.find(".pageHere").html("<span class=\"first\">"+info.mgNm+"</span> &gt; <strong>"+info.mNm+ "</strong>");
			}catch(err){

			}
			self._tabs.activeMenu = tabInfo = {"____ID____":id,"____NAME____":name,"body":$body,"____URL____":url,"____DISPLAY____":"Y",func:{}};
			self._tabs.info.splice(0,0,tabInfo);

			$body.appendTo($ctrBody);
			self._tabs.activeIndex = 0;
			if(tabContentHtml !== "") {
				self['_'+ info.mgController.toLowerCase()].onControllerAction(info.mController, 'init', id); 
			}
		} else {		// 기존 탭
			for(let i=0;i< self._tabs.info.length;i++){
				if (self._tabs.info[i].____ID____ == id ){
					tabInfo = self._tabs.info[i];
					if(tabInfo.____DISPLAY____ != undefined && tabInfo.____DISPLAY____ == "N"){
						self._tabs.info.splice(i,1);
						self._tabs.info.splice(0,0,tabInfo);
						self._tabs.activeIndex = 0; 
						self._tabs.activeMenu = tabInfo;
					}else{
						self._tabs.activeIndex = i;
					}
					//}else{
						
						if($(`#${tabInfo.____ID____}`).length == 0) {
							let tabContentHtml = "";
							if(url!=undefined && url != '/') tabContentHtml = await self.getContent(url);
				
							if($(`#__sales__ctrBody_${tabInfo.____ID____}`).length > 0) {
								$(`#__sales__ctrBody_${tabInfo.____ID____} .innerConWrap`).append(tabContentHtml);

								tabInfo.body = $(`#__sales__ctrBody_${tabInfo.____ID____}`);
							} else {
								let $body = $('<div class="contentsWrap '+side +'" id="__sales__ctrBody_'+ id +'"><div class="innerConWrap">'+tabContentHtml+'</div></div>');
								try{
									let $div = $($($body.children()[0]).children()[0]);
									$div.prop("id", id);
									let sstorage = self._utils.parseJSONString(sessionStorage.getItem("LMKEY"));
									//let info;
									for(let i=0;i<sstorage.length;i++){
										if(id == sstorage[i].code){
											info = sstorage[i];
											break;
										}
									}
									$div.find(".pageHere").html("<span class=\"first\">"+info.mgNm+"</span> &gt; <strong>"+info.mNm+ "</strong>");
								}catch(err){
					
								}
								tabInfo.body = $body;
								$body.appendTo($ctrBody);
								if(tabContentHtml !== "") {
									self['_'+ info.mgController.toLowerCase()].onControllerAction(info.mController, 'init', id); 
								}
								
							}
						//}
						//console.log(tabInfo.____ID____)
						$("#ctrTabWrap").find("li[code="+ tabInfo.____ID____+"]").addClass('choiceTab');
					}
					if(tabInfo.body!=undefined && typeof tabInfo.body == "object") $(tabInfo.body).show();
					window.dispatchEvent(new Event('resize'));
				}
			}
		}

		self.refresh(id);
		self.menuFocus(id);
		window.dispatchEvent(new Event('resize'));
		//$(window).trigger("resize");
		if(cbfunc != undefined) cbfunc();
	}

	remove = (id) => {
		const self = this;

		let infos = self._tabs.info;
		for(let i=0;i< infos.length;i++){
			if (infos[i].____ID____ == id ){
				if(self._tabs.activeIndex > i) self._tabs.activeIndex--;
				let info = infos[i];
				$(info.body).remove();
				$(info.____TAB____).remove();
				
				infos.splice(i,1);
				self.refresh(id);
				break;
			}
		}
	}


	refresh = (id) => {
		const self = this;

		let maxWidth = $("#headerWrap").width() - self._tabs.tabMagin;
		let infos = self._tabs.info;
		let $ctrContWrap = $("#ctrContWrap");
		let $tabArea = $("#ctrTabWrap").children(".tabMenuUl");
		let $ctrTabMore = $tabArea.children(".ctrTabMore").clone();
		let width = 0;
		$tabArea.empty();
		$tabArea.children(".ctrTabMore").remove();
		$ctrTabMore.hide();
		
		let $hiddenTabArea = $ctrTabMore.find("#tabMenuHiddenList");
		$hiddenTabArea.empty();
		
		for(let i=0;i<infos.length;i++){
			let info = infos[i];
			let $tab = $('<li class="tabMenu'+(self._tabs.activeIndex == i ? ' choiceTab':'')+'" code="'+ info.____ID____ +'"><a href="javascript:void(0);" class="tabName">'+info.____NAME____+'</a> <a href="javascript:void(0);" class="ctrTabCloseBtn"></a></li>');
			info.____ACTIVE____ = "N";

			if(self._tabs.activeIndex == i){
				if(info.body != undefined && typeof info.body == "object"){
					$(info.body).show();
				/* } else {
					let tabContentHtml = "";

					let $body = $('<div class="contentsWrap sideOpen" id="__sales__ctrBody_'+ info.____ID____ +'"><div class="innerConWrap">'+tabContentHtml+'</div></div>');
					info.body = $body;
					$body.appendTo($ctrContWrap);
				*/
				}

				info.____ACTIVE____ = "Y";
				self._tabs.activeMenu = info ;

				if(self._tabs.menuInfo!=undefined){
					for(let m=0;m<self._tabs.menuInfo.length;m++){
						if(self._tabs.menuInfo[m].code == info.____ID____){
							let pageHere = self._tabs.activeMenu.body.find(".pageHere");
							pageHere.find(".first").text(self._tabs.menuInfo[m].mgNm);
							pageHere.find(".first").next().text(self._tabs.menuInfo[m].mNm);
						}
					}
				}

			}
			
			$tab.appendTo($tabArea);
			width = width + $tab.width();

			if(maxWidth > width){
				info.____TAB____ = $tab;
				info.____DISPLAY____ = "Y";
			}else{
				info.____DISPLAY____ = "N";
				$tab.remove();
				$tab = $('<a href="javascript:void(0);" code="'+info.____ID____+'">'+info.____NAME____+'</a><a href="javascript:void(0);" class="ctrTabCloseBtn"></a>');
				info.____TAB____ = $tab;
				$($tab).appendTo($hiddenTabArea);
			}
		}
		if(sessionStorage!=undefined) sessionStorage.setItem("AMenuInfo",self.getCacheJSON(infos));
		$ctrTabMore.appendTo($tabArea);
		if($hiddenTabArea.children().length > 0) $ctrTabMore.show();
		self.menuFocus(id);
	}

	menuFocus =(id) => {
		const self = this;
		
		if (id==undefined) return;
		if(self._tabs.startMenu){
			self._tabs.startMenu = false;
			return;
		}

		let $menuDiv = $("#sideWrap").find("#sideOpen .lnb");
		if ($menuDiv.css("display") != "none"){
			let dls = $menuDiv.find("dl");
			let menus = $menuDiv.find("li");
			dls.removeClass("lnbDlSelected").addClass("lnbDl");
			menus.find("a").removeClass("on");

			for(let i=0;i<menus.length;i++){
				let menu = $(menus[i]);
				if(id == menu.find("a").attr("code")){
					menu.find("a").addClass("on");
					menu.closest("dl").removeClass("lnbDl").addClass("lnbDlSelected");
					break;
				}
			}
		}
	}


	getMdi = (id) => {
		const self = this;

		try{
			for(let i=0;i< self._tabs.info.length;i++)
			 if (self._tabs.info[i].____ID____ == id ) return self._tabs.info[i];
			return null;
		}catch(e){
			alert("getMdi Error : "+ e, 'error');
			return null;
		}
	}

	getMenu = (cbfunc) => {
		const self = this;

		// 메뉴 호출
		let mapData = {
			ctl : 'menu',
			cmd : 'adminMenu'
		}
		// $.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {

						if(sessionStorage.getItem("LMKEY")) {
							sessionStorage.removeItem("LMKEY");
						}
						// 브라우저 sessionStorage에 저장하기 JSON을 JSONString으로 변환하여 저장
						sessionStorage.setItem("LMKEY", JSON.stringify(rdata.data));
						cbfunc({"code":0, "message": "(성공) 메뉴 데이터 수집", "data": rdata.data});
					} else {
						cbfunc({"code":-1, "message": "(실패) "+rdata.message, "data": null});
					}
			});

	}

	getCacheJSON = (_info) => {
		var infos = _info;
		var array = [];
		for(var i=0;i<infos.length;i++){
			var d = $.extend($.extend({},infos[i]),{});
			for (var key in d){
				if(key.indexOf("____") < 0 || key == "____TAB____" ){
					delete d[key];
				}
			}
			array.push(d);
		}
		
		return JSON.stringify(array);
	}

	getContent = (url) => {
		const self = this;

		return new Promise((resolve, reject) => {
			if(url.substring(0,1) == '/'){url = url.substring(1)};
			url = url +((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
			$.ajax({
				url: ('/temp/') +url.replace(/\//g,''), // 읽어올 HTML 파일의 경로
				//url: '/temp/'+url, // 읽어올 HTML 파일의 경로
				type: 'GET',
				dataType: 'html', // 데이터 형식은 HTML
				success: function(response){
						resolve(response);
				},
				error: function(xhr, status, error){
						reject(error);
				}
			});
		});
	}

	openLayer = (data,cbfunc, d , $parentObject) => {
		const self = this;
		let popupID = self.createUniqueId();
		let obj;
		// 닫기 버튼 드레그 방지
		data = data.replace('<img src="/images/btn/btn_mw_close.png" alt="레이어 닫기">','<img src="/images/btn/btn_mw_close.png" class="popupClose" alt="레이어 닫기">');
		let openDiv = '<div class="mw_layer open"><div class="bg"></div><div id="'+popupID+'" class="ctlContainer">'+data+'</div></div>';
		$("body").append(openDiv);
			
		// 레이어 설정
		obj = $("#"+popupID+" div:eq(0)");
		let handler = obj.find(".mw_title");
		obj.draggable({containment:"body", cursor:"move", handle:handler , cancel: ".popupClose"});
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
		cbfunc(popupID, d, $parentObject);
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

	
	fileDownload = (d) => {
		let self = this;
		let mapData = {
			ctl : 'media',
			cmd : 'downloadBase64'
		}
		$.extend(mapData,{fileSeq:d.fileSeq});

		let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code == 0){
				var link = document.createElement("a");
				link.download = d.realName;
				link.href = 'data:application/octet-stream;base64,' + rdata.data;
				link.click();
				link.remove();
			}
		});

	}

	imageFileLoad = (d, cbfunc, isSync = true) => {
		// isSync = false 동기식으로 하면 안됨 ㅜㅜ
		let self = this;
		let mapData = {
			ctl : 'media',
			cmd : 'imageDownload'
		}
		$.extend(mapData,{fileSeq:d.fileSeq});
		let xhr = new XMLHttpRequest();
		let formParam = new FormData();
		formParam.append('service', 'dws');
		formParam.append('encrypt', self._const.__ISENCPARAM);
		for(const key in mapData) {
			if (mapData.hasOwnProperty(key)) {
				const value = mapData[key];
				formParam.append(key, value);
			}
		}

		xhr.open('POST', self._const.__URL_API+'/user/dws', true);
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
		xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-XSRF-TOKEN,Access-Control-Allow-Headers,Access-Control-Allow-Origin");
		xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
		xhr.setRequestHeader("Authorization", "Bearer " + self._const.__ACCESSTOKEN);
		xhr.responseType = 'blob';

		xhr.onload = function() {
		  if (xhr.status === 200) {
			let blob = xhr.response;
			let url = window.URL.createObjectURL(blob);
			cbfunc(url);
		  }
		};
		xhr.send(formParam);
	}


	emailSend = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'workReportMailSend'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	faxSend = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'ledger',
			cmd : 'workReportFaxSend'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	modifyTime = (_mapData, cbfunc) => {
		try{
			const self = this;
			let mapData = {ctl : 'media',cmd : 'realLastTimeSave'};
			$.extend(mapData,_mapData);
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					if(typeof cbfunc == 'function') cbfunc();
				} else {
					toast('수정 시간 기록 실패');
				}
			});
		}catch(e){
			console.log(e.message);
		}
	}
	lastModifyTime = (cbfunc) => {
		
		try{
			let self = this;
			let realLastTimeFile = __FILE_DOMIN +"/"+ self._const.__GROUP_ID +"/realTimeCheck.txt";

			$.ajax({
				url: realLastTimeFile  + ((/\?/).test(realLastTimeFile) ? "&" : "?") + (new Date()).getTime(),
				method: 'GET',
				success: function (str, status, xhr) {
					let data = JSON.parse(str);
					if(typeof cbfunc == 'function') cbfunc(data);
				},
				error: function (data, status, err) {
				},
				complete: function () {
				}
			});
			/*

			let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : console.error("XMLHTTP를 지원하지 않는 브라우저입니다");
			xmlhttp.onreadystatechange = function() { 
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					let str = xmlhttp.responseText
					let data = JSON.parse(str);
					if(typeof cbfunc == 'function') cbfunc(data);
				}
			}
			xmlhttp.spinner = false;
			xmlhttp.open("GET",realLastTimeFile  + ((/\?/).test(realLastTimeFile) ? "&" : "?") + (new Date()).getTime() ,true);
			xmlhttp.send();
			*/			
		}catch(e){
			console.log(e.message);
		}
	}
	lastModifyTimeCheck = (keys = [], dateTime = self._utils.currentDateTime() , trueCbfunc, fasleCbfunc) =>{
		let self = this;
		let checkDateTime = new Date(dateTime.substring(0,4), parseInt(dateTime.substring(4,6))-1, dateTime.substring(6,8), dateTime.substring(8,10), dateTime.substring(10,12),dateTime.substring(12));
		//checkDateTime.setMinutes(checkDateTime.getMinutes() - minutes);
		try{
			this.lastModifyTime(function(data){
				//console.log(data)
				let is = false;
				if(typeof keys == 'string'){
					if(data[keys] != undefined){
						let d = data[keys];
                		let lastDateTime = new Date(d.substring(0,4), parseInt(d.substring(4,6))-1, d.substring(6,8), d.substring(8,10), d.substring(10,12),d.substring(12));
                		if((lastDateTime - checkDateTime) > 0){
						//if(lastDateTime > checkDateTime){
							is = true;
							if (typeof trueCbfunc == 'function') trueCbfunc();
						}
					}
				}else{
					for(let i=0;i<keys.length;i++){
						if(data[keys[i]] != undefined){
							let d = data[keys[i]];
							let lastDateTime = new Date(d.substring(0,4), parseInt(d.substring(4,6))-1, d.substring(6,8), d.substring(8,10), d.substring(10,12),d.substring(12));
							if((lastDateTime - checkDateTime) > 0){
							// if(lastDateTime > checkDateTime){
								is = true;
								if (typeof trueCbfunc == 'function') trueCbfunc();
								break;
							}
						}	
					}
				}
				if(!is){
					if (typeof fasleCbfunc == 'function') fasleCbfunc();
				}
			});
		}catch(e){
			console.log(e.message);
		}
	}
	
	intervalRun = () => {
		/*
		let self = this;
		let activeMenu = ['MM00000001','MM00000013','MM00000014','MM00000015'];
		if(activeMenu.indexOf(self._tabs.activeId) >-1){
			let info = {};
			try{
				let sstorage = self._utils.parseJSONString(sessionStorage.getItem("LMKEY"));
				for(let i=0;i<sstorage.length;i++){
					if(self._tabs.activeId == sstorage[i].code){
						info = sstorage[i];
						break;
					}
				}
			}catch(err){

			}
			let mgController = info.mgController.toLowerCase();
			let mController = info.mController.toLowerCase();
			let currentDateTime = self['_'+ mgController]['_'+ mController]._currentDateTime;
			self.lastModifyTimeCheck(['order','work','distribution'],currentDateTime, function(){
				self['_'+ mgController]['_'+ mController]._currentDateTime = self._utils.currentDateTime();
				setTimeout(function(){
					self['_'+ mgController].onControllerAction(mController, 'retrieve', self._tabs.activeId);
				} ,self._reloadActionTime);
			});
			*/
/*
		self.intervalId = setInterval(function(){
			self._parent.lastModifyTimeCheck(['order','work','distribution'],self._currentDateTime, function(){
				self._currentDateTime = self._utils.currentDateTime();
				setTimeout(self.retrieve,30000);
			});
		}, self._parent._reloadTime);
*/		
	//	}
	}
}
export default MenuController