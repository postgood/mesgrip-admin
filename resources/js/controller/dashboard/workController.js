
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let workController = class {
	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._employee = {};
		this._employeeList = {};
	}

	init = (_code,_data) => {
		const self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		self._currentDateTime = self._utils.currentDateTime();
		/*
		self.intervalId = setInterval(function(){
				self._parent.lastModifyTimeCheck(['order','work','distribution'],self._currentDateTime, function(){
					self._currentDateTime = self._utils.currentDateTime();
					setTimeout(self.retrieve,30000);
				});
			}, self._parent._reloadTime);
		*/
		
		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._currentDateTime = self._utils.currentDateTime();
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			setTimeout(self.columnCheck, 2000);
			//e.stopPropagation();
		});
		self._code.find(".btnStopCall").on("click",function(e){
			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=wSeq]:checked");
			if(chkBoxs.length==0){
				alert("중지 작업건을 선택하십시오");
				return;
			}else if(chkBoxs.length>1){
				alert("1건씩만 설정이 가능합니다.");
				return;
			}

			let d = chkBoxs.closest("tr").data("ROW");
			if(d.wStatus != 'B'){
				alert("현재 진행중인 작업을 선택하십시오");
				return;
			}
			self._work = d;
			self._work.stop = true;
			self.layerActionView(function(data){
				self._parent.openLayer(data, self.layerActionEvent, d);
			},d);
		});

		
		
		self._code.find(".btnFullScreen").on("click",function(e){
			let autoRead = self._code.find(".btnAutoReload");
			if (document.fullscreenElement) {
				$(this).removeClass("activeOn").addClass("activeOff");
				if(autoRead.hasClass("activeOn")) autoRead.trigger('click');
			}else{
				$(this).removeClass("activeOff").addClass("activeOn");
				if(autoRead.hasClass("activeOff")) autoRead.trigger('click');
			}
			self._utils.fullScreen(self._code);
		});
		self._code.find(".btnAutoReload").on("click",function(e){
			if(self.intervalId == undefined){
				$(this).removeClass("activeOff").addClass("activeOn");
				self.intervalRun();
			}else{
				$(this).removeClass("activeOn").addClass("activeOff");
				clearInterval(self.intervalId);
				delete self.intervalId;
			}
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});
		
		// 금일작업량 설정시 기간 설정 제어
		self._code.find("input[name=onlyToday]").on("click",function(e){
			//self._utils.fullScreen($(self._code));
			self._code.find("input[name=startDt]").attr("disabled",$(this).is(":checked"));
			self._code.find("input[name=endDt]").attr("disabled",$(this).is(":checked"));
		});

		let mapData = {ctl : 'process',cmd : 'companyProcessList', useYn : 'Y'};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
			  let obj = $( 'select[name=spSeq]', self._code);
			  obj.empty();
			  obj.append($('<option value="">전체공정</option>'));
			  for(let i=0;i<rdata.data.length;i++){
				  let opt = $('<option value="'+ rdata.data[i].spSeq +'">'+ rdata.data[i].spNm +'</option>');
				  obj.append(opt);
			  }
			}
		});
		


		// 목록 테이블 이벤트 정의
		let searchWrap = self._code.find(".searchWrapArea");
		let searchWrapBtn = self._code.find(".searchWrapBtn");
		let thead = self._code.find(".dataHeadTable thead");
		let tfoot = self._code.find(".pageInfoTfoot");
		let tbody = self._code.find(".dataListTable");
		self._tbody = tbody;

		searchWrap.on('change','select[name=spSeq]',function(){
			let spSeq = $(this).val();
			let $wESeq = $('select[name=wESeq]',searchWrap);
			if(!self._utils.checkEmptyNull(spSeq)){
				$wESeq.empty();
				$wESeq.append($('<option value="">전직원</option>'));
				$wESeq.append($('<option value="NO">미지정</option>'));
				if(self._processEmployeeList[spSeq] != undefined){
					let e = self._processEmployeeList[spSeq] ?? [];
					for(let i=0;i<e.length;i++){
						$wESeq.append($('<option value="'+ e[i].eSeq +'">'+ e[i].eNm +'</option>'));
					}
				}
			}else{
				$wESeq.empty();
				$wESeq.append($('<option value="">전직원</option>'));
				$wESeq.append($('<option value="NO" class="unChoice">미지정</option>'));
				let keys = Object.keys(self._employeeList);
				for(let i=0;i<keys.length;i++){
					let opt = $('<option value="'+ keys[i] +'">'+ self._employeeList[keys[i]].eNm +'</option>');
					obj.append(opt);
				}
			}
		});
		searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		self.companyPlaceList(function(resp){
			let $target = $(`select[name=cpSeq]`,searchWrap);
			if(resp.code == 0) {
				for(let i in resp.data) {
					let _data = resp.data[i];
					let $option = $('<option />');
					$option.val(_data.cpSeq).text(_data.cpNm);
					$target.append($option);
				}
			}
		});

		let mapData2 = {ctl : 'employee',cmd : 'processList'};
		let _api2 = new AjaxCall(self._const, mapData2, {'wapi': 'user/ws','spinner':true});
		_api2.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let processEmployeeList = {};
				self._employeeList = {};
				let list = rdata.data;
				for(let i=0;i<list.length;i++){
					if(processEmployeeList[list[i].spSeq] == undefined){
						processEmployeeList[list[i].spSeq] = [list[i]];
					}else{
						let is = true;
						for(let j =0;j <processEmployeeList[list[i].spSeq].length; j++){
							if(processEmployeeList[list[i].spSeq][j].eSeq == list[i].eSeq){
								is = false;
								break;
							}
						}

						if(is)processEmployeeList[list[i].spSeq].push(list[i]);
					}
					if(self._employeeList[list[i].eSeq] == undefined){
						self._employeeList[list[i].eSeq] = list[i];
					}
				}
				self._processEmployeeList = processEmployeeList;

				let obj = $( 'select[name=wESeq]', self._code);
				let keys = Object.keys(self._employeeList);
				for(let i=0;i<keys.length;i++){
					let opt = $('<option value="'+ keys[i] +'">'+ self._employeeList[keys[i]].eNm +'</option>');
					obj.append(opt);
				}
			}
		});
		// 관리자인 경우 생성
		if(self._const.__MANAGER_YN == 'Y'){
			$(".btnStatusUpdate",searchWrapBtn).on("click",function(e){
				let tbody = self._code.find(".dataListTable tbody");
				let chkBoxs = tbody.find("input[name=wSeq]:checked");
				if(chkBoxs.length==0){
					alert("변경할 작업건을 선택하십시오");
					return;
				}else if(chkBoxs.length>1){
					alert("1건씩만 설정이 가능합니다.");
					return;
				}
	
				let d = chkBoxs.closest("tr").data("ROW");
				if(d.wStatus == 'A'){
					alert("현재 진행 또는 완료 작업을 선택하십시오");
					return;
				}
				confirm('['+ d.wNm +'] 작업을 대기상태로 변경하겠습니까?', function(is){
					if(is){
						let mapData = {ctl : 'work',cmd : 'reSet', oSeq : d.oSeq, wSeq : d.wSeq, pSeq : d.pSeq};
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code==0) {
								alert('대기 상태로 초기화 되었습니다.');
								self.retrieve();
								self._parent.modifyTime({action:'work'});
							}else{
								alert(rdata.message);
							}
						});
					}
				},'변경');
				
			});
			
			$(".btnTodaySetting",searchWrapBtn).on("click",function(e){
				let tbody = self._code.find(".dataListTable tbody");
				let chkBoxs = tbody.find("input[name=wSeq]:checked");
				if(chkBoxs.length==0){
					alert("금일 작업할 마지막 작업건을 선택 하십시오");
					return;
				}else if(chkBoxs.length>1){
					alert("1건씩만 설정이 가능 합니다.");
					self._code.find("input[name=chckAll]").prop("checked", false);
					return;
				}
				let d = chkBoxs.closest("tr").data("ROW");
				self._work = d;
				self.layerTodayView(function(data){
					self._parent.openLayer(data, self.layerTodayEvent);
				});
			});
			$(".btnSortSetting",searchWrapBtn).on("click",function(e){
				let tbody = self._code.find(".dataListTable tbody");
				let chkBoxs = tbody.find("input[name=wSeq]:checked");
				let orderColumn = $('input[name=orderculumn]',searchWrap).val();
				let orderType = $('input[name=orderby]',searchWrap).val();
				if(orderColumn == 'sort' && orderType.toUpperCase() == 'ASC'){
					if(chkBoxs.length==0){
						alert("순서를 변경할 작업건을 선택 하십시오");
						return;
					}else if(chkBoxs.length>1){
						alert("1건씩만 설정이 가능 합니다.");
						self._code.find("input[name=chckAll]").prop("checked", false);
						return;
					}
					let d = chkBoxs.closest("tr").data("ROW");
					self._work = d;
					self.layerSortView(function(data){
						self._parent.openLayer(data, self.layerSortEvent);
					});
				}else{
					alert('작업 순서 변경시 검색을 초기하 하여 진행 하십시요<br>목록 좌측상단에 <i class="fa-solid fa-rotate-right" style="color:#000;"></i> 을 출러 초기화 하세요')
				}
			});
			$('input[name=wStatus][value=D]',searchWrap).on('change',function(){
				let is = $(this).prop("checked");
				if(is){
					$("input[name=startDt],input[name=endDt]",searchWrap).removeClass('disabled').prop('disabled',!is);
				}else{
					$("input[name=startDt],input[name=endDt]",searchWrap).addClass('disabled').prop('disabled',!is);
				}
			});
			$('input[name=wStatus][value=D]',searchWrap).trigger('change');
/*
			tbody.on('click','.wNm',function(){
				let $tr = $(this).closest('tr');
				let data = $tr.data("ROW");
				if(data.todayJob!='Y'){
					let mapData = {ctl : 'work',cmd : 'todayJob', spSeq: data.spSeq,  wSeq : data.wSeq};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code==0) {
							self.retrieve();
						} else if(rdata.statusCode == 9099) {
							
						}else{
							alert(rdata.message);
						}
				});
				}
			});
*/
			// 금일 작업 설정 및 해지
			tbody.on('click','.todayJob',function(){
				let $tr = $(this).closest('tr');
				let data = $tr.data("ROW");
				//if(data.todayJob=='Y'){
					let mapData = {ctl : 'work',cmd : 'todayJob', spSeq: data.spSeq,  wSeq : data.wSeq};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code==0) {
							self.retrieve();
							self._parent.modifyTime({action:'work'});
						} else if(rdata.statusCode == 9099) {
							
						}else{
							alert(rdata.message);
						}
				});
				//}
			});
		}

		thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			searchWrap.find("input[name=orderculumn]").val(column);
			searchWrap.find("input[name=orderby]").val(order);
			self._utils.tHeadOrderBy($(this),order);
			self.retrieve();
		});


		searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -1)));
		searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(new Date()));

		/*
		searchWrap.find('input[name=searchWord]').autocomplete({
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
		*/
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

		tbody.on('click','.processBtnA,.processBtnB,.processBtnC,.processBtnD',function(){
			let d = $(this).closest('tr').data('ROW');
			self._work = d ;
			//선공정이 없는 경우 첫 공정으로 바로 착수 가능
			let processInfo = d.processInfo;
			for(let i=0;i<processInfo.length;i++){
				if(d.pSeq == processInfo[i].pSeq){
					if(i>0) d.processBefer = processInfo[i-1];
					break;
				}
			}
			if(d.processBefer == undefined){
				actionRunCheck(d);
			}else{
				if(d.wStatus == 'A' && d.processBefer.pStatus != 'D'){
					
					confirm('['+ d.processBefer.spNm +']공정이 완료 되지 않았습니다. \n작업진행 하시겠습니까?', function(data){
						if(data) {
							actionRunCheck(d);
						}
					}," 강제 작업 진행");
				}else{
					actionRunCheck(d);
				}

			}
			function actionRunCheck(d){
				if(d.istInStatus != 'C'){
					confirm('입고가 되지 않은 작업 입니다. \n직접 입고처리 하시겠습니까?', function(data){
						if(data) {
							let mapData = {ctl : 'work',cmd : 'incoming', wSeq: d.wSeq};
							let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
							_api.ajaxformdata(function(rdata){ 
								if(rdata.code==0) {
									self.layerActionView(function(data){
										self._parent.openLayer(data, self.layerActionEvent, d);
									},d);
									self._parent.modifyTime({action:'distribution'});
								} else{
									alert(d.message);
								}

							});
						}
					}, '입고처리');
				}else{
					self.layerActionView(function(data){
						self._parent.openLayer(data, self.layerActionEvent, d);
					},d);
				}
			}
			
		});
		tbody.on('click','.printTd', function() {
			let d = $(this).closest('tr').data('ROW');
			self._parent.workReport(d);
		});

		tbody.on('click','.oFileNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.orderView(d);			
		});
		tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});
		
		tbody.sortable({
			handle: ".fa-up-down",
			items : "tr",
			axis: 'y',
			containment: "parent",
        	helper: function (e, ui) {
            	ui.children().each(function () {
                	$(this).width($(this).width());
            	});
	            return ui;
			},
			start: function(event, ui){
				self._work = ui.item.data("ROW")
				self._work.index = ui.item.index();
				self._utils.tbodyUnMerge(tbody,[0,1,2,3,4,5,6,7],"oSeq");
			},
			update: function(event, ui){
				//let targetSort = ui.item.next().data("ROW").sort;
				let targetIndex = ui.item.index()+1;
				let page = $('input[name=page]',self._code).val();
				let rowsPerPage = $('input[name=rowsPerPage]',self._code).val();
				let pageStartIndex = 0;
				if(page > 1){
					targetIndex = ((parent(page) - 1) * parent(rowsPerPage)) + targetIndex;
				}
				let nowSort = ui.item.data("ROW").sort;
				let move = ui.item.index() - self._work.index;
				self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,7],"oSeq");
				if(move != 0){
					const d = self._work;
					let search = self._utils.serializeObject($('.searchWrapArea',self._code));
					let $wStatus = searchWrap.find("input[name=wStatus]:checked");
					if($wStatus.length == 0){
						alert('작업상태를 선택해주세요');
						return;
					}
					let wStatus = [];
					for(let i=0;i<$wStatus.length;i++) wStatus.push($($wStatus[i]).val());
					search.wStatus = JSON.stringify(wStatus);
					let mapData = {ctl : 'work',cmd : 'sortMove', wSeq : d.wSeq, move : move, targetIndex :targetIndex,nowSort :nowSort};
					$.extend(search,mapData);
					let _api = new AjaxCall(self._const, search, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code==0) {
							self.retrieve();
							self._parent.modifyTime({action:'work'});
						} else {
							alert(rdata.message)
							self.retrieve();
						}
					});
				}

			},
		  });

		// 기간 설정
		tbody.on('click','.btnOpenInfo', function() {
			let d = $(this).closest('tr').data('ROW');
			// 데이터를 먼저 읽어온다
			//self._work = d;
			self.layerWorkView(function(data){
				self._parent.openLayer(data, self.layerWorkEvent,d);
			},d);
		});
/*		
		$(".fa-sort", $trObj).on("click", function() {
			let d = $(this).closest('tr').data('ROW');
			self._work = d;
			self.layerSortView(function(data){
				self._parent.openLayer(data, self.layerSortAction);
			});			
		});
*/		
		tbody.on('focus','input[name=wEndCnt]',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v);
		});
		tbody.on('focusout','input[name=wEndCnt]',function(){
			let o = $(this).data("ROW");
			let v = $(this).val();
			o = self._utils.getOnlyNumber(o);
			v = self._utils.getOnlyNumber(v);
			if(o!=v){
				let d = $(this).closest('tr').data('ROW');
				//if(['C','D'].indexOf(d.wStatus) > -1){
				if(['D'].indexOf(d.wStatus) > -1){
					let mapData = {'wSeq':d.wSeq,'cnt':v};
					
					self.update(mapData,function(data){
						if(data.code == 0){
						self.retrieve();
						self._parent.modifyTime({action:'work'});
						}else{
							alert(data.message);
						}
					});
				}else{
					alert('완료된 작업만 수정 가능합니다.');
					$(this).val(o).trigger('focusout');
				}
			}else{
				$(this).val(self._utils.numberWithCommas(v));
			}
		});
		tbody.on('click','.oFileNmDown', function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			if(d.fileInfo.length>0){
				self._parent.fileDownload(d.fileInfo[0]);
				
			}

		});
		tbody.on('change','select[name=wESeq]',function(){
			let $tr = $(this).closest('tr');
			let eSeq = $(this).val();
			let d = $tr.data('ROW');
					
			let mapData = {ctl : 'work',cmd : 'employeeChange', wSeq: d.wSeq, wESeq : eSeq, spSeq : d.spSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			  _api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					self.retrieve();
					self._parent.modifyTime({action:'work'});
				} else if(rdata.statusCode == 9099) {
					
				}else{
					alert(rdata.message);
				}
		  });
		});
		self.retrieve();
	}

	columnCheck = () =>{
		let self = this;
		if(self._const.__MANAGER_YN == 'Y'){
			if($( 'select[name=spSeq]', self._code).val() == undefined || $( 'select[name=spSeq]', self._code).val() == '') {
				self._tbody.sortable("disable" );
				$('.btnTodaySetting', self._code).hide();
				$('.btnSortSetting', self._code).hide();
				$('.btnStatusUpdate', self._code).hide();
				self._code.find(".upDown").attr("width","0px").find('i').hide();
			}else{
				self._tbody.sortable("enable" );
				$('.btnTodaySetting', self._code).show();
				$('.btnSortSetting', self._code).show();
				$('.btnStatusUpdate', self._code).show();
				self._code.find(".upDown").attr("width","15px").find('i').show();
			}
			$('.totalEndCnt', self._code).show();
		}else{
			self._code.find(`.dataListTable tbody`).sortable("disable" );
			$('.btnTodaySetting', self._code).hide();
			$('.btnSortSetting', self._code).hide();
			self._code.find(".upDown").attr("width","0px").find('i').hide();
			$('.totalEndCnt', self._code).hide();
		}
	}

	retrieve = () => {
		const self = this;
		
		if(self._parent.activeMenuId() != undefined && self._parent.activeMenuId() != self._id){
			if(self.intervalId != undefined){
				self._code.find(".btnAutoReload").removeClass("activeOn").addClass("activeOff");
				clearInterval(self.intervalId);
				delete self.intervalId;
			}
			return;
		}
		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();
		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let cpSeq = searchWrap.find("select[name=cpSeq]").val();
		//let wStatus = searchWrap.find("select[name=wStatus]").val();
		let oFileNm = searchWrap.find("input[name=oFileNm]").val();
		let spSeq = searchWrap.find("select[name=spSeq]").val();
		let wESeq = searchWrap.find("select[name=wESeq]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let onlyToday = searchWrap.find("input[name=onlyToday]:checked").val();
		let $wStatus = searchWrap.find("input[name=wStatus]:checked");
		if($wStatus.length == 0){
			alert('작업상태를 선택해주세요');
			return;
		}
		let wStatus = [];
		for(let i=0;i<$wStatus.length;i++) wStatus.push($($wStatus[i]).val());

		let searchData = {
			cuSeq : undefined,
			startDt : startDt?startDt.replace(/-/g,''):'' ,
			endDt : endDt?endDt.replace(/-/g,''):'',
			spSeq : spSeq?spSeq:'',
			wESeq : wESeq?wESeq:'',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			cpSeq : cpSeq,
			//wStatus : wStatus,
			wStatus : JSON.stringify(wStatus),
			oFileNm : oFileNm,
			searchColumn : 'cuNm',
			searchWord : searchWord,
			onlyToday : onlyToday,
			//finishYn : finishYn
		}

		self.list(searchData, function(resp){
			let tbody = self._code.find(".dataListTable tbody");
			let thead = self._code.find(".dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			
			tbody.empty();
			let total = 0;
			let totalPage = 0;
			let totalEndCnt = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
						totalEndCnt = resp[i].totalEndCnt;
					}
					self.display(tbody, resp[i]);
				}
				self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,7,8,20,21],"oSeq");

				let trs = $('tr',tbody);
				for(let t =0;t<trs.length;t++) $($(trs[t]).find('td').eq(8)).css('border-right','1px solid #dedede !important;');
				$('.totalEndCnt strong').text(self._utils.numberWithCommas(totalEndCnt));
			} else {
				
				$('<tr><td colspan="'+ thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}
			//self._utils.tableScrollCheck();
			if(spSeq != undefined && spSeq !='') {
				self._code.find(".spNm").hide().attr("width","0px");
				self._code.find(".workThead").attr("colspan","11");
			}else{
				self._code.find(".spNm").show().attr("width","70px");
				self._code.find(".workThead").attr("colspan","12");
			}
			self._code.find(".eqNm").hide();
			self._code.find(".eqNm").attr("width","0px");

			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
			self.columnCheck();
			/*
			if(self._const.__MANAGER_YN == 'Y'){
				if($( 'select[name=spSeq]', self._code).val() == undefined || $( 'select[name=spSeq]', self._code).val() == '') {
					self._tbody.sortable("disable" );
					$('.btnTodaySetting', self._code).hide();
					$('.btnSortSetting', self._code).hide();
					self._code.find(".upDown").attr("width","0px").find('i').hide();
				}else{
					if(searchData.orderColumn == 'sort' && searchData.orderType.toUpperCase() == 'ASC'){
						self._tbody.sortable("enable" );
					}
					$('.btnTodaySetting', self._code).show();
					$('.btnSortSetting', self._code).show();
					self._code.find(".upDown").attr("width","15px").find('i').show();
				}
			}else{
				self._code.find(`.dataListTable tbody`).sortable("disable" );
				$('.btnTodaySetting', self._code).hide();
				$('.btnSortSetting', self._code).hide();
				self._code.find(".upDown").attr("width","0px").find('i').hide();
			}
			*/
		});
		/*
		let autoReload = self._code.find(".btnAutoReload");
		let lastDateTime = self._code.find(".lastDateTime");
		lastDateTime.empty();
		if(autoReload.hasClass("activeOn")){
			lastDateTime.text(self._utils.dateformatCurrentHHmmss(":"));	
		}
		self._utils.tableScrollCheck(self._code);
		*/
	}

	display = (tbody, d) => {
		const self = this;
		let style= '';//((d.wStatus!='A')?' background-color:'+self._utils.processStatus('color',d.wStatus)+';':'');

		let process = "";
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			if(info.outsourcingInfo.length>0){
				let workNm = [];
				let customerNm = [];
				for(let o=0;o<info.outsourcingInfo.length;o++){
					workNm.push(info.outsourcingInfo[o].wNm);
					customerNm.push(info.outsourcingInfo[o].cuNm);
				}
				process += '<span class="processStatusOut'+ info.pStatus +'" title="＊상태: '+ info.pStatusNm +' ＊업체: '+ customerNm.join(', ') +' '+((info.pStatus != 'A')?' ＊일시: '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
			}else{
				process += '<span class="processStatus'+ info.pStatus +'" title="＊상태: '+ info.pStatusNm +''+((info.pStatus != 'A')?' ＊일시: '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
			}
		}
/*
		let beferProcess = ""
		let afterProcess = ""
		if(d.processInfo.befer != undefined){
			let b = d.processInfo.befer;
			beferProcess = '<span class="processStatus'+ b.pStatus +'" title="작업순서 : '+ b.sort +' / 상태 : '+ b.pStatusNm +''+((b.pStatus != 'A')?'/ 변경일시 : '+ b.pStatusDate :'')+'">'+b.spNm+'</span>';
		}
		if(d.processInfo.after != undefined){
			let a = d.processInfo.after;
			afterProcess = '<span class="processStatus'+ a.pStatus +'"  title="작업순서 : '+ a.sort +' / 상태 : '+ a.pStatusNm +''+((a.pStatus != 'A')?'/ 변경일시 : '+ a.pStatusDate :'')+'">'+a.spNm+'</span>';
		}
*/
		let options = '';
		let viewColor = '#B3B3B3';
		let woMarkYn = 'N';
		for(let o=0;o<d.optionInfo.length;o++) {
			let od = d.optionInfo[o];
			if(od.woMarkYn == 'Y') woMarkYn = 'Y';
			if(od.cwoOrderYn == 'Y'){
				if(od.woInput != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm" style="padding:0px !important; margin-bottom:0px !important;"><strong class="workOptionInfo">'+ od.cwoNm + ' : <span style="font-weight: bold;">'+ od.woInput +'</span></strong></span>');}
			}else{
				if(viewColor == '#B3B3B3' && (od.woInput != null && od.woInput != '')) viewColor = '#000';
				if(woMarkYn == 'Y'){
					viewColor = '#f78ca4';
				}
			}
		}
		let btNm = '대기';
		if(d.wStatus == "B") btNm = '진행';
		if(d.wStatus == "C") btNm = '중지';
		let istInStatus = "대기";
		if(d.istInStatus == 'B' ) {istInStatus = '입고중';}
		else if(d.istInStatus == 'C' ) {istInStatus = '완료';}
		let moveStyle = style;
		//if($( 'select[name=spSeq]', self._code).val() != '' && self._const.__MANAGER_YN == 'Y')  style += ';cursor:s-resize;';
		if(d.wStatus == 'D'){
			style += 'background:#ddf2f9 !important;';
		}
		let file = '';
		if(d.fileInfo.length>0) file = '<i class="fa-solid fa-download cursorPointer oFileNmDown" style="margin-right:5px;" title="파일 받기"></i>';
		
		let eNm = d.wENm;
		if(self._const.__MANAGER_YN == 'Y'){
			//작업자 선택
			eNm = $('<select name="wESeq" class="w100p" style="border-width: 0px;background-color:transparent;" />');
			eNm.append($('<option value="" class="optionUndefinde">미지정</option>'));
			if(self._processEmployeeList[d.spSeq] != undefined){
				let e = self._processEmployeeList[d.spSeq] ?? [];
				for(let i=0;i<e.length;i++){
					eNm.append($('<option value="'+ e[i].eSeq +'" '+ ((d.wESeq == e[i].eSeq)?'selected':'')  +'>'+ e[i].eNm +'</option>'));
				}
			}
			if(eNm.val() == ''){eNm.css('color','#777')}
		}

		let inStatus = '○'
		if(d.istInStatus == 'B') inStatus = '<span style="color:#aaa;" title="입고진행 : '+ d.istInStatusDate+'">●</span>';
		if(d.istInStatus == 'C') inStatus = '<span style="color:#68C3C7;" title="입고일시 : '+ d.istInStatusDate+'">●</span>';
		let outStatus = '○'
		if(d.istOutStatus == 'B') outStatus = '<span style="color:#aaa;" title="출고진행 : '+ d.istOutStatusDate+'">●</span>';
		if(d.istOutStatus == 'C') outStatus = '<span style="color:#b583f5;" title="출고일시 : '+ d.istOutStatusDate+'">●</span>';

		let statusTitle = '';
		if(d.wStatus == 'B') statusTitle += '시작일시 : '+ d.wStatusDate;
		if(d.wStatus == 'D' || d.wStatus == 'D') statusTitle += '완료일시 : '+ d.wStatusDate;

		let tr = $('<tr class="tbodyTr tr_nohover" />');
		tr.append($('<td><i class="fas fa-print printTd cursorPointer"></i></td>'));
		tr.append($('<td class="ac">'+ inStatus +' '+ outStatus +'</td>'));
		tr.append($('<td class="al cuNm cursorPointer" style="    white-space: nowrap;text-overflow: ellipsis; overflow: hidden;"/>').append('<span title="업체정보 조회">'+self._utils.nullTostring(d.cuNm, '') +'</span>'));
		tr.append($('<td class="al" style="border-right:0px !important;" />').append(file ));
		tr.append($('<td class="al" style="border-left:0px !important;padding-left:3px;padding-right:2px;padding-top:0px;padding-bottom:0px;line-height: 13px;"/>').append('<span class="oFileNm cursorPointer" title="수주서 보기">'+ self._utils.nullTostring(d.oFileNm, '') + ((d.onContent != undefined && d.onContent != '')?' <img src="/images/bul/bul_notice.gif"  class="orderNoticeIcon">':'')+'</span>'));
		//tr.append($('<td class="ac"><i class="fa-regular fa-file-lines cursorPointer" style="font-size: 15px;"></i></td>'));
		tr.append($('<td class="ac" >'+ d.oPaperSize +'</td>'));
		tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.oCnt) +'</td>'));
		tr.append($('<td class="al spFlow">'+ process +'</td>')); 
		// tr.append($('<td class="ac" '+((d.istInStatus != 'A')?'title="변경일시 : '+ d.istInStatusDate +'"':'')+'>'+ istInStatus +'</td>'));
		
		tr.append($('<td class="ac spNm">'+ d.spNm +'</td>'));
		tr.append($('<td class="ac eqNm" style="border:1px solid #dedede;"></td>').text((d.eqNm?d.eqNm:'')));
		tr.append($('<td class="ac upDown" style="'+ style +'"><i class="fa-solid fa-up-down" style="cursor:s-resize;" title="최상위로 이동시 아이콘 위쪽 부분눌러서 이동시키십시요"></i></td>'));
		tr.append($('<td style="'+ style +'border-top:1px solid #dedede;border-bottom:1px solid #dedede;" class="RowNum">'+d.num+'</td>'));
		tr.append($('<td style="'+ style +'border-top:1px solid #dedede;border-bottom:1px solid #dedede;"><input type="hidden" name="oSeq" value="'+d.oSeq+'"><input type="checkbox" class="vm" name="wSeq" value="'+d.wSeq+'"></td>'));
		if(d.wOutsourcingYn == 'Y'){
			//tr.append($('<td style="'+ style +'"><span title="작업을 '+d.cuNm+'에서 진행 합니다.">외주</span></td>'));
			let customerNm = [];
			for(let o=0;o<d.outsourcingInfo.length;o++){
				customerNm.push(d.outsourcingInfo[o].cuNm);
			}
			tr.append($('<td style="'+ style +'border-top:1px solid #dedede;border-bottom:1px solid #dedede;">'+((d.wStatus!='D')?'<span class="processBtnOut'+d.wStatus+'" title="작업처 :'+customerNm.join(', ')+'">외주</span>':'<span title="'+ statusTitle +'">완료</span>')+'</td>'));
		}else{
			tr.append($('<td style="'+ style +'border-top:1px solid #dedede;border-bottom:1px solid #dedede;">'+((d.wStatus!='D')?'<span class="processBtn'+d.wStatus+'" title="'+ statusTitle +'">'+btNm+'</span>':'<span title="'+ statusTitle +'">완료</span>')+'</td>'));
		}
		tr.append($('<td style="'+ style +'border:1px solid #dedede;">'+ d.wFrontYnNm +'</td>'));
		//tr.append($('<td style="'+ style +'" '+((d.wStatus != 'A')?'title="변경일시 : '+ d.wStatusDate +'"':'')+'>'+ d.wStatusNm+'</td>'));
		tr.append($('<td style="'+ style +'padding-left:5px;border:1px solid #dedede;" class="al"></td>').append((( d.todayJob=='Y')?'<i class="fa-solid fa-square-check todayJob" style="color:#f50000;" title="작업선정일시 : '+d.todayJobDate.substring(0,16)+'"></i> ':'<i class="fa-solid fa-square-check todayJob" style="color:#ccc;" title="금일작업 설정"></i>')+ ' <span class="wNm">'+ d.wNm +'</span>'+(self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+')')));
		//tr.append($('<td style="'+ style +'">'+((d.wENm != undefined) ? d.wENm : '<span style="color:#cccccc">미지정</span>')+'</td>'));
		tr.append($('<td style="'+ style +'border:1px solid #dedede;padding-left:0px;padding-right:0px;"/>').append(eNm));
		
		tr.append($('<td style="'+ style +'padding-left:0px;border:1px solid #dedede;" class="ar"></td>').append($('<span><strong style="font-size:9px;color: #f9ed40;padding-top: 7px;font-weight: bold">▶</strong><input type="text" name="wEndCnt" vType="number" class="w80p" style="text-align:right;border-width: 0px;background-color:transparent;padding-left: 0px;padding-right: 0px;" value="'+((d.wEndCnt != null)?self._utils.numberWithCommas(d.wEndCnt, '0'):'0')+'"></span>')));
		//tr.append($('<td style="'+ style +'" class="ac">'+ beferProcess +'</td>'));
		//tr.append($('<td style="'+ style +'" class="ac">'+ afterProcess +'</td>'));
		tr.append($('<td style="'+ style +'border:1px solid #dedede;padding-left:0px;padding-right:0px;" class="al workOptionListDiv vm"></td>').append(options)); 
		let wMemo = self._utils.checkEmptyNull(d.wMemo) ? '' : '※ '+ d.wMemo;
		//tr.append($('<td style="'+ style +'" class="al"></td>').text(self._utils.strMaxCuttion(self._utils.nullTostring(d.wMemo,''),20)).attr("title",d.wMemo));
		tr.append($('<td style="'+ style +'border:1px solid #dedede;" class="al"></td>').text(self._utils.strMaxCuttion(wMemo)).attr("title",d.wMemo));
		tr.append($('<td style="'+ style +'border:1px solid #dedede;">'+self._utils.dateformatMin(d.oApprovalDate).substring(5,10)+'</td>'));
		tr.append($('<td class="al" style="'+ style +'border:1px solid #dedede;">'+self._utils.nullTostring(d.istOutMemo,'')+'</td>'));
		tr.append($('<td style="'+ style +'border:1px solid #dedede;" class=""><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" style="font-size: 14px;color:'+viewColor+';" title="'+ ((viewColor == '#B3B3B3')?'미등록':((woMarkYn == 'Y')?'중요항목 있음':'등록완료'))+'"></i></td>'));
				
		tr.data("ROW",d);
		if(self._const.__MANAGER_YN == 'Y') $('.todayJob',tr).addClass('cursorPointer')
		tr.appendTo(tbody);
	}




	// popupview
	layerActionView = (cbfunc,d) =>{
		const self = this;
		//const d = self._work;
		let action = "start";
		let title = '작업 시작'
		if(d.wStatus == 'B'){
			action = 'end';
			title = '작업 완료'
		} else if(d.wStatus == 'C'){
			action = 'start';
			title = '작업 재시작'
		}
		if(d.stop != undefined && d.stop == true){
			action = 'stop';
			title = '작업 중지'
		}

		var divHtml = '<div class="mw_defalut" style="width:380px;height:220px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">'+ title +'</span>';
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
		divHtml += '<col width="50%">'
		divHtml += '<col width="50%">';
		divHtml += '</colgroup>';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th>';
		divHtml += '<div class="al"></div>';
		divHtml += '</th>';
		divHtml += '<th>';
		//divHtml += '<div class="ar">'+((d.wStatus=='B')?'<a href="javascript:void(0);" class="btnSearch2 btnCancel" style="margin-right:5px;">작업취소</a>':'')+' <a href="javascript:void(0);" class="btnSearch save">'+ title +'</a></div>';
		divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch save">'+ title +'</a></div>';
		divHtml += '</th>';
		divHtml += '</tr>';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';

		divHtml += '<div class="searchWrap">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 ">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="60px">';
		divHtml += '<col width="auto">';
		divHtml += '<tbody>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">업체명 : </th>';
		divHtml += '<td class="cuNm">'+ d.cuNm +'</td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">파일명 : </th>';
		divHtml += '<td class="oFileNm">'+ (d.oFileNm?d.oFileNm:'') +'</td>';
		divHtml += '</tr>';
		divHtml += '<tr>';
		divHtml += '<th class="txt_r">작업명 : </th>';
		divHtml += '<td class="wNm">'+ d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+') ') +'('+ d.wFrontYnNm+')</td>';
		divHtml += '</tr>';
		divHtml += '<tr class="cntTr">';
		divHtml += '<th class="txt_r">수&nbsp;&nbsp;&nbsp;량 : </th>';
		divHtml += '<td><input type="hidden" name="wSeq" value="'+ d.wSeq +'"><input type="hidden" name="action" value="'+ action +'"><input type="text" vType="number" name="cnt" class="w90p" placeholder="수량을 입력하세요 (현재 완료수량에 추가됨)"></td>';
		divHtml += '</tr>';
		divHtml += "</tbody></table>"
		divHtml += '</div>';
		divHtml += '</div></div></div></div>';
		cbfunc(divHtml);
	}

	layerActionEvent = (popupID, d) => {
		let self = this;
		let layerObject = $('#'+ popupID);
		let action = $('input[name=action]',layerObject).val();
		
		if(action == 'start') {
			let $cntTr = $('.cntTr',layerObject);
			if(d.wStatus == 'C'){
				$cntTr.hide();	
			}else{
				$('th',$cntTr).text('시작 수량 :');
				$('input[name=cnt]',$cntTr).attr('placeholder','작업에 들어가는 수량을 입력하세요');
				//$('.cntTr',layerObject).hide();
				let mapData = {ctl : 'work',cmd : 'firstEndCnt', oSeq: d.oSeq,  wSeq : d.wSeq};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let data = rdata.data;
						if(d.wSeq == data.wSeq){
							$('input[name=cnt]',$cntTr).val(0);
						}else{
							$('input[name=cnt]',$cntTr).val(data.wEndCnt);
						}
					}else{
						alert(rdata.message);
					}
				});
			}
		}

		$('.save',layerObject).on('click',function(){
			let wSeq = $('input[name=wSeq]',layerObject).val();
			let cnt = $('input[name=cnt]',layerObject).val();
			if(['stop','end'].indexOf(action) > -1){
				if(cnt == undefined || cnt == ''){
					alert('수량을 입력하십시오');
					return false;
				}
				try{
					parseInt(cnt);
				}catch(e){
					alert('수량을 입력하십시오');
					return false;
				}
			}

			let mapData = {ctl : 'work',cmd : 'action', action: action,  wSeq : wSeq,cnt:cnt};
		  	let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		  	_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {

					$("body .btnClosePopLayer").trigger('click');
					delete self._work;
					self.retrieve();
					self._parent.modifyTime({action:'work'});
//					alert('수정 되었습니다.');
				} else if(rdata.statusCode == 9099) {
					
				}else{
					alert(rdata.message);
				}

		  });
		});

		$('.btnCancel',layerObject).on('click',function(){
			let wSeq = $('input[name=wSeq]',layerObject).val();
			let cnt = $('input[name=cnt]',layerObject).val();
			if(cnt == undefined || cnt == ''){
				alert('현재까지 작업된 수량을 입력하십시오');
				return false;
			}
			try{
				parseInt(cnt);
			}catch(e){
				alert('수량을 입력하십시오');
				return false;
			}

			confirm('해당 작업을 취소하시겠습니까?', function(data){
				if(data) {
					let mapData = {ctl : 'work',cmd : 'action', action: "cancel",  wSeq : wSeq,cnt:cnt};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
					  if(rdata.code==0) {
						  $("body .btnClosePopLayer").trigger('click');
						  delete self._work;
						  self.retrieve();
	  						alert('취소 되었습니다.');
							self._parent.modifyTime({action:'work'});
					  } else if(rdata.statusCode == 9099) {
						  
					  }else{
						  alert(rdata.message);
					  }
	  
					});
	
				}
			}," 작업 취소");
		});


	}

// popupview
layerTodayView = (cbfunc) =>{
	const self = this;
	const d = self._work;
	var divHtml = '<div class="mw_defalut" style="width:380px;height:250px;" id=""><div class="mw_title" id="handle">';
	divHtml += '<h1 class="mw_title_mid">';
	divHtml += '<span class="title">금일 작업량 설정</span>';
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
	divHtml += '<col width="50%">'
	divHtml += '<col width="50%">';
	divHtml += '</colgroup>';
	divHtml += '<tbody>';
	divHtml += '<tr>';
	divHtml += '<th>';
	divHtml += '<div class="al"></div>';
	divHtml += '</th>';
	divHtml += '<th>';
	divHtml += '<div class="ar"><a href="javascript:void(0);" class="btnSearch save">설정</a></div>';
	divHtml += '</th>';
	divHtml += '</tr>';
	divHtml += '</tbody>';
	divHtml += '</table>';
	divHtml += '</div>';

	divHtml += '<div class="searchWrap">';
	divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 ">';
	divHtml += '<caption></caption>';
	divHtml += '<colgroup>';
	divHtml += '<col width="60px">';
	divHtml += '<col width="auto">';
	divHtml += '<tbody>';
	divHtml += '<tr>';
	divHtml += '<th class="txt_c" colspan="2">아래의 작업 까지만 금일 작업량으로 설정합니다.</th>';
	divHtml += '</tr>';
	divHtml += '<tr>';
	divHtml += '<th class="txt_r">No: <input type="hidden" name="spSeq" value="'+d.spSeq+'"><input type="hidden" name="sort" value="'+d.sort+'"></th>';
	divHtml += '<td class="cuNm">'+ d.num +'</td>';
	divHtml += '</tr>';
	divHtml += '<tr>';
	divHtml += '<th class="txt_r">업체명 : </th>';
	divHtml += '<td class="cuNm">'+ d.cuNm +'</td>';
	divHtml += '</tr>';
	divHtml += '<tr>';
	divHtml += '<th class="txt_r">파일명 : </th>';
	divHtml += '<td class="oFileNm">'+ (d.oFileNm?d.oFileNm:'') +'</td>';
	divHtml += '</tr>';
	divHtml += '<tr>';
	divHtml += '<th class="txt_r">작업명 : </th>';
	divHtml += '<td class="wNm">'+ d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+') ') +'('+ d.wFrontYnNm+')</td>';
	divHtml += '</tr>';
	divHtml += '<tr>';
	divHtml += "</tbody></table>"
	divHtml += '</div>';
	divHtml += '</div></div></div></div>';
	cbfunc(divHtml);
}

layerTodayEvent = (popupID) => {
	let self = this;
	let layerObject = $('#'+ popupID);
	
	$('.save',layerObject).on('click',function(){
		let spSeq = $('input[name=spSeq]',layerObject).val();
		let sort = $('input[name=sort]',layerObject).val();

		let mapData = {ctl : 'work',cmd : 'todayJob', spSeq: spSeq,  wtSortEnd : sort};
		  let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		  _api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				$("body .btnClosePopLayer").trigger('click');
				delete self._work;
				self.retrieve();
//					alert('수정 되었습니다.');
			} else if(rdata.statusCode == 9099) {
				
			}else{
				alert(rdata.message);
			}

	  });
	});


}
// popupview
layerSortView = (cbfunc) =>{
	const self = this;
	const d = self._work;
	var divHtml = `<div class="mw_defalut" style="width:380px;height:294px;" id="">
			<div class="mw_title" id="handle">
					<h1 class="mw_title_mid">
						<span class="title">작업순서 변경</span>
						<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
					</h1>
				</div>
				<div class="mw_ctWrap">
					<div class="mw_contents">
						<div style="overflow-y:auto;padding:2px;">
					
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
												<div class="al"></div>
											</th>
											<th>
												<div class="ar"><a href="javascript:void(0);" class="btnSearch save">변경</a></div>
											</th>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="searchWrap">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10 ">
									<caption></caption>
									<colgroup>
										<col width="60px">
										<col width="auto">
										<col width="30px">
										<col width="120px">
									<tbody>
										<tr>
											<th class="ac">업체명</th>
											<td class="cuNm" colspan="3">`+ d.cuNm +`</td>
										</tr>
										<tr>
											<th class="ac">파일명</th>
											<td class="oFileNm" colspan="3">`+ (d.oFileNm?d.oFileNm:'') +`</td>
										</tr>
										<tr>
											<th class="ac">공정명</th>
											<td class="wNm" colspan="3">`+ d.spNm +`</td>
										</tr>	
										<tr>
											<th class="ac">작업명</th>
											<td class="wNm" colspan="3">`+ d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? `` : ` (`+ d.wInfo+`) `)+`(`+ d.wFrontYnNm +`)</td>
										</tr>
										<tr>
											<th class="ac actionCnt">현재 위치</th>
											<td style="border-right:0px;"> No `+ d.num +` <i class="fa-solid fa-angles-right" style="color: magenta;font-size: 13px;margin-top: 5px;"></i>&nbsp;&nbsp;<input type="text" vType="number" name="index" class="" style="width:40px;" placeholder="위치번호">
											</td>
											<td class="ar"  style="border-right:0px;border-left:0px;"><input type="checkbox" name="orderYn" value="Y"> </td>
											<td class="al" style="border-left:0px;">해당공정 전체 이동 </td>
										</tr>
									</tbody>
								</table>
							</div>
							<input type="hidden" name="wSeq" value="`+d.wSeq+`">
						</div>
					</div>
				</div>
			</div>
		</div>`;
	cbfunc(divHtml);
}

layerSortEvent = (popupID) => {
	let self = this;
	let layerObject = $('#'+ popupID);
	
	$('.save',layerObject).on('click',function(){
		let wSeq = $('input[name=wSeq]',layerObject).val();
		let index = $('input[name=index]',layerObject).val();
		let orderYn = $("input[name=orderYn]:checked",layerObject).val();
		if(orderYn != 'Y') orderYn = 'N';

		let move = index - self._work.num;
		if(move != 0){
			let d = self._utils.serializeObject($('.searchWrapArea',self._code));
			let mapData = {ctl : 'work',cmd : 'sortMove', wSeq : wSeq, move : move, orderYn:orderYn, targetIndex :index };
			$.extend(d,mapData);
			let _api = new AjaxCall(self._const, d, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$("body .btnClosePopLayer").trigger('click');
					delete self._work;
					self.retrieve();
					self._parent.modifyTime({action:'work'});
				} else {
					alert(rdata.message)
				}
			});
		}else{
			alert('변경할 위치가 동일 합니다.');
			return false;
		}
		
	});
}

	layerWorkView = (cbfunc , d) =>{
		const self = this;
		//const d = self._work;
		var divHtml = `<div class="mw_defalut" style="width:580px;height:540px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">`+ d.wNm +` <span style="font-size:18px;">작업기록</span></span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="overflow-y:auto;padding:2px;">
						
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="50%">
									<col width="50%">
								</colgroup>
								<tbody>
									<tr>
										<th>
											<div class="al"><input type="hidden" name="wSeq" value="`+ d.wSeq +`"></div>
										</th>
										<th>
											<div class="ar"><a href="javascript:void(0);" class="btnSearch save">저장</a></div>
										</th>
									</tr>
								</tbody>
							</table>
						
						
						<div class="searchWrap" style="padding-bottom: 10px;">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable">
								<caption></caption>
								<colgroup>
									<col width="70px">
									<col width="auto">
									<col width="70px">
									<col width="auto">
								<tbody>
									<tr>
										<th class="ac">업체명</th>
										<td class="cuNm">`+ d.cuNm +`</td>
										<th class="ac">작업자</th>
										<td class="">`+ (d.wENm??'미지정') +`</td>
									</tr>
									<tr>
										<th class="ac">품&nbsp;&nbsp;&nbsp;&nbsp;명</th>
										<td class="oFileNm" colspan="3">`+ (d.oFileNm?d.oFileNm:'') +`</td>
									</tr>
									<tr>
										<th class="ac">공정명</th>
										<td class="spNm">`+ d.spNm +`</td>
										<th class="ac">작업명</th>
										<td class="wNm">`+ d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+') ') +`(`+ d.wFrontYnNm +`)</td>
									</tr>
									<tr>
										<td class="txt_c" colspan="4" style="border:0px;height: 5px;padding: 0px;"><!-- hr style="width: 99%;color: #9ac7e194; border: 1px solid;" --></th>
									</tr>
									<tr>
										<th class="txt_c" colspan="4" style="height:25px;">수주 세부사항</th>
									</tr>
									<tr>
										<td class="workOptionListDiv orderOption" colspan="4"></td>
									</tr>		
									<!-- tr>
										<td class="txt_c" colspan="4" style="height: 5px;padding: 0px;"><hr style="width: 99%;color: #9ac7e194;border: 1px solid;"></th>
									</tr -->
									<tr>
										<th class="txt_c" colspan="4" style="height:25px;">작업현장기록</th>
									</tr>
									<tr>
										<td class="workOptionListDiv workOption" colspan="4" style="padding-left:0px;padding-right:0px;"></td>
									</tr>
										<th class="txt_c" colspan="4" style="height:25px;">추가기록사항</th>
									</tr>
									<tr>
										<td colspan="4"><textarea name="wReport" class="w100p" rows="3"></textarea></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		cbfunc(divHtml);
	}
	
	layerWorkEvent = (popupID, workInfo) => {
		let self = this;
		let layerObject = $('#'+ popupID);
		let mw_defalut = $('.mw_defalut', layerObject);
		let d = workInfo.optionInfo;
		let $wESeq = $( '.wESeq', layerObject);
		let orderOptionArea = $( '.workOptionListDiv.orderOption', layerObject).data("ROW",d);
		let workOptionArea = $( '.workOptionListDiv.workOption', layerObject).data("ROW",d);

		if(!self._utils.checkEmptyNull(workInfo.wReport)) $('textarea[name=wReport]',layerObject).val(workInfo.wReport);
/*
		if(self._const.__MANAGER_YN == 'Y'){
			let $select = $('<select name="wESeq"/>');
			let mapData = {ctl : 'employee',cmd : 'list', rows : 999};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let isSelected = false;
						for(let i=0;i<rdata.data.length;i++){
							let emp = rdata.data[i];
							let $option = $('<option />');
							$option.val(emp.eSeq).text(emp.eNm);
							if(workInfo.wESeq == emp.eSeq){
								$option.attr('selected', true);
								isSelected = true;
							}
							if(!isSelected && self._const.__USER_ID == emp.eSeq){
								$option.attr('selected', true);
								isSelected = true;
							}
							$select.append($option);
						}
						$wESeq.append($select);
					} else {

					}
				});
		}else{
			if(self._work.wENm == undefined){
				let $select = $('<select name="wESeq"/>');
				let mapData = {ctl : 'employee',cmd : 'list', rows : 999};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
						if(rdata.code==0) {
							let isSelected = false;
							for(let i=0;i<rdata.data.length;i++){
								let emp = rdata.data[i];
								let $option = $('<option />');
								$option.val(emp.eSeq).text(emp.eNm);
								if(self._work.wESeq == emp.eSeq){
									$option.attr('selected', true);
									isSelected = true;
								}
								if(!isSelected && self._const.__USER_ID == emp.eSeq){
									$option.attr('selected', true);
									isSelected = true;
								}
								$select.append($option);
							}
							$wESeq.append($select);
						} else {
	
						}
					});
			}else{
				$wESeq.text(workInfo.wENm);
			}
		}
		*/	
		$wESeq.text(workInfo.wENm);
		for(let i=0;i<d.length;i++){
			let optionTag = $('<span class="workOptionListOne vm" style="width:49.5%;margin: -3px 0px;">');
			let option = $('<strong class="w100p" style="padding-top: 3px;" />');
			if(d[i].cwoOrderYn == "N"){
				option.addClass('workOptionInfoInput');
				option.append('<input type="checkbox" name="'+ d[i].cwoSeq+'_MarkYn" value="Y" '+((d[i].woMarkYn == 'Y')?'checked':'')+' style="width: 10px;height: 10px;margin-right:5px;" title="일반적이지 않은경우 중요표시">');
				if(d[i].cwoMustYn == "Y") option.append($('<span style="color:red">*</span>'))
				option.append('<span  style="text-align:left;display: inline-block;width:70px;">'+d[i].cwoNm  + '</span>');

				if(d[i].cwoInputCd == "A"){
					//option.append($('<select name="'+ d[i].cwoSeq+'"><option value="Y" '+ ((d[i].woInput=='Y')? 'selected':'')+'>사용</option><option value="N" '+ ((d[i].woInput!='Y')? 'selected':'')+'>미사용</option></select>'));
					let $select = $('<select name="'+ d[i].cwoSeq+'" style="height: 20px !important;width:75px;font-size: 11px;padding-top: 0px;"><option value="">선택</option></select>');
					if(!self._utils.checkEmptyNull(d[i].cwoData)){
						let data = d[i].cwoData.split(",");
						for(let a = 0;a<data.length;a++){
							let $option = $('<option />');
							$option.val(data[a]).text(data[a]);
							$select.append($option);
						} 
					}
					$select.on('change',function(){
						let v = $(this).val();
						let $strong = $(this).closest('strong');
						let o = $(this).closest('span').data('ROW');
						let cwoDataSub = JSON.parse(o.cwoDataSub);
						let $sub = $(this).next();
						if(v == ''){
							if($sub.length > 0){ $sub.remove();}
						}else{

							if($sub.length > 0){ $sub.remove();}
							if(cwoDataSub == undefined || self._utils.checkEmptyNull(cwoDataSub[v])){
								//if($sub.length > 0){ $sub.remove();}
							}else{
								//if($sub.length > 0){ $sub.remove();}
								if(cwoDataSub[v].type == 'select'){			
									$sub = $('<select name="'+d[i].cwoSeq+'_sub" style="margin-left:5px;width:75px;height: 20px !important;font-size: 11px;padding-top: 0px;"/>');
									$sub.empty();
									$sub.append('<option value="">선택</option>');
									let subs = cwoDataSub[v].values;
									for(let i=0;i<subs.length;i++){
										let $option = $('<option />');
										$option.val(subs[i]).text(subs[i]);
										$sub.append($option);
									}
									$strong.append($sub);
								}else if(cwoDataSub[v].type == 'text'){			
									$sub = $('<input type="text" name="'+d[i].cwoSeq+'_sub" style=" width:75px;margin-left:5px;height: 20px !important;" placeholder="최대 40글자"/>');
									$strong.append($sub);
								}
							}
						}
					});
					option.append($select)
					let v = d[i].woInput;
					if(!self._utils.checkEmptyNull(v) && v.indexOf('→') > -1){
						let vs = v.split('→');
						setTimeout(() => {
							$("select[name="+d[i].cwoSeq+"]",workOptionArea).val(vs[0]).trigger('change');
							$("select[name="+d[i].cwoSeq+"_sub]",workOptionArea).val(vs[1])	
						}, 500);
					}else{
						setTimeout(() =>{
							$("select[name="+d[i].cwoSeq+"]",workOptionArea).val(d[i].woInput).trigger('change');
						},500);
					}
				}else if(["T","C","W","M","L"].indexOf(d[i].cwoInputCd) > -1 ){
					let $input = $('<input type="text" name="'+ d[i].cwoSeq+'" style="height: 20px !important;">');
					if(!self._utils.checkEmptyNull(d[i].woInput)) $input.val(d[i].woInput);

					if(["W","M","L"].indexOf(d[i].cwoInputCd) > -1 ){ 
						self._utils.focusEvent($input,'unit');
						$input.css({'width':'40px', 'text-align': 'right'});
						$input.attr('placeholder',d[i].cwoInputCdNm);
					}else if('C' == d[i].cwoInputCd){
						self._utils.focusEvent($input,'comma');
						$input.css({'width':'50px', 'text-align': 'right'});
						$input.attr('placeholder',d[i].cwoInputCdNm);
					}
					option.append($input);
				}
				optionTag.append($(option));
			}
			if(d[i].cwoOrderYn == 'Y'){
				if(d[i].woInput != null) {
					option.addClass('workOptionInfo');
					option.append(d[i].cwoNm  + ' : <strong>'+ d[i].woInput +'</strong>');
					optionTag.append($(option));
				}
			}
			
			optionTag.data("ROW", d[i]);
			optionTag.appendTo((d[i].cwoOrderYn == 'Y')?orderOptionArea: workOptionArea);
		}
		workOptionArea.data("ROW",d);
		
		$('.save',layerObject).on('click',function(){
			let wSeq = $('input[name=wSeq]',layerObject).val();
			let d = workOptionArea.data("ROW");
			let optionInfo = [];
			let wReport = $('textarea[name=wReport]',layerObject).val();
			for(let i=0;i<d.length;i++){
				if(d[i].cwoOrderYn == 'N'){
					let option = $('[name='+d[i].cwoSeq+']', workOptionArea);
					let nextOption = option.next();
					if(nextOption.length == 0){
						d[i].woInput = $('[name='+d[i].cwoSeq+']', workOptionArea).val();
					}else{
						let v = nextOption.val()
						if(v==''){
							d[i].woInput = $('[name='+d[i].cwoSeq+']', workOptionArea).val();
						}else{
							d[i].woInput = $('[name='+d[i].cwoSeq+']', workOptionArea).val() +'→'+ v;
						}
					}
					if(d[i].cwoMustYn == 'Y' && self._utils.checkEmptyNull(d[i].woInput)){
						alert('세부사항 ['+ d[i].cwoNm+']을 입력하세요')
						return false;
					}
					d[i].woMarkYn = $('input[name='+ d[i].cwoSeq +'_MarkYn]:checked',workOptionArea).val()??'N';
	
					optionInfo.push(d[i]);
				}
			}
			
			let mapData = {ctl : 'work',cmd : 'optionSave', wSeq: wSeq, wReport: wReport, optionInfo : JSON.stringify(optionInfo)};
/*
			let wESeq = $('select[name=wESeq]',layerObject).val();
			if(wESeq != '' && workInfo.wESeq != wESeq){
				mapData.wESeq = wESeq;
			}
*/			

			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			  _api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$("body .btnClosePopLayer").trigger('click');
					delete self._work;
					self.retrieve();
					alert('저장 되었습니다.');
				} else if(rdata.statusCode == 9099) {
					
				}else{
					alert(rdata.message);
				}
	
		  });
		});

//		console.log($('.mw_ctWrap',mw_defalut).height());

		mw_defalut.height($('.mw_ctWrap',mw_defalut).height() + 50);
	
	
	}
	excelDownload = () =>{
		let self = this;
		const workbook = new ExcelJS.Workbook();
		let fileName = self._code.find(".pageHere strong").text();
		const sheet = workbook.addWorksheet(fileName);
		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let oStatus = searchWrap.find("select[name=oStatus]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let oMarkYn = searchWrap.find("input[name=oMarkYn]:checked").val();

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

	list = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'work',
			cmd : 'list'
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

	delete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
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
	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
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

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'work',
			cmd : 'qrWorkLoad'
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
			ctl : 'work',
			cmd : 'endCntUpdate'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	companyPlaceList = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'place',
			cmd : 'list',
			cpType : 'A',
			useYn : 'Y',
			rows : 9999
		}

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	/*
	intervalRun = () => {
		let self = this;
		self.intervalId = setInterval(function(){
			self._parent.lastModifyTimeCheck(['order','work','distribution'],self._currentDateTime, function(){
				self._currentDateTime = self._utils.currentDateTime();
				setTimeout(self.retrieve,30000);
			});
		}, self._parent._reloadTime);
	}
	*/
}
export default workController
