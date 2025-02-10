
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let equipmentController = class {

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
		this._eqSeq = null;
		this._eqNm = null;
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
			let $popDiv = $('template#equipmentLayerView');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);
			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.initNewLayer);
			});
			*/
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

			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let eqSeq = chkBoxs.val();

					self.delete({eqSeq : eqSeq}, function(resp) {
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

		self.companyPlaceList({},function(resp){
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

		tbody.on('click','.btnOpenRepair', function(){
			let _data = $(this).closest('tr').data('ROW');
			self._eqSeq = _data.eqSeq;
			self._eqNm = _data.eqNm;

			// 수리이력 데이터를 먼저 읽어온다
			self.repairList({eqSeq:_data.eqSeq}, function(resp){
				if(resp.code == 0) {
					self.repairView(function(data){
						self._parent.openLayer(data, self.repairLayer);
					});

				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});


		tbody.on('click','.btnOpenInfo', function(){
			let _data = $(this).closest('tr').data('ROW');
			
			// 고객사 데이터를 먼저 읽어온다
			//self._client = {};
			self.load({eqSeq:_data.eqSeq}, function(resp){
				if(resp.code == 0) {
					let $popDiv = $('template#equipmentLayerView');
					self._parent.openLayer($popDiv.html(),self.reloadLayer,resp.data);
					//self._client = resp.data;
					/*
					self.layerView(function(data){
						self._parent.openLayer(data, self.reloadLayer,resp.data);
					});
					*/
				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
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
		let cpSeq = searchWrap.find("select[name=cpSeq]").val();

		let searchData = {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'eqNm',
			searchWord : searchWord,
			cpSeq : cpSeq
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

		let $tr = $('<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>');
		$tr.append($('<td style="border:1px solid #dedede;"><input type="checkbox" class="vm" name="eqSeq" value="'+d.eqSeq+'"></td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al pl5" />').append(self._utils.nullTostring(d.eqNm, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac pl5" />').append(self._utils.nullTostring(d.cpNm, '')));
		if(d.useYn == "N") $tr.append($('<td class="txt_red">'+self._utils.nullTostring(d.useYn, '')+'</td>'));
		else $tr.append($('<td style="border:1px solid #dedede;">'+self._utils.nullTostring(d.useYn, '')+'</td>'));

		$tr.append($('<td style="border:1px solid #dedede;" />').append(self._utils.nullTostring(d.eqProcess, '')));
		$tr.append($('<td style="border:1px solid #dedede;" />').append(self._utils.nullTostring(d.eqEmployee, '')));
		$tr.append($('<td style="border:1px solid #dedede;"><i class="fa-solid fa-screwdriver-wrench cursorPointer btnOpenRepair" title="수리이력 보기"></i></td>'));
		$tr.append($('<td style="border:1px solid #dedede;">'+d.creDate+'</td>'));;
		$tr.append($('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="장비 수정" style="font-size:14px;"></i></td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
/*
		let trHtml = '<tr'+ ((d.eOutYn=='Y')?' style="color:#808080"':'')+'>';
				trHtml +='<td><input type="checkbox" class="vm" name="eqSeq" value="'+d.eqSeq+'"></td>';
				trHtml +='<td class="al pl5">'+self._utils.nullTostring(d.eqNm, '')+'</td>';

				if(d.useYn == "N") trHtml +='<td class="txt_red">'+self._utils.nullTostring(d.useYn, '')+'</td>';
				else trHtml +='<td>'+self._utils.nullTostring(d.useYn, '')+'</td>';

				trHtml +='<td>'+self._utils.nullTostring(d.eqProcess, '')+'</td>';
				trHtml +='<td>'+self._utils.nullTostring(d.eqEmployee, '')+'</td>';
				trHtml +='<td><i class="fa-solid fa-screwdriver-wrench cursorPointer btnOpenRepair" title="수리이력 보기"></i></td>';
				trHtml +='<td>'+d.creDate+'</td>';
				trHtml +='<td><i class="fa-solid fa-magnifying-glass cursorPointer btnOpenInfo" title="조회"></i>/td>';
				trHtml +='</tr>';

		let $trObj = $(trHtml).data("ROW",d);
		$(".btnOpenRepair", $trObj).on("click", function(){
			let _data = $(this).closest('tr').data('ROW');
			self._eqSeq = _data.eqSeq;
			self._eqNm = _data.eqNm;

			// 수리이력 데이터를 먼저 읽어온다
			self.repairList({eqSeq:_data.eqSeq}, function(resp){
				if(resp.code == 0) {
					self.repairView(function(data){
						self._parent.openLayer(data, self.repairLayer);
					});

				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});


		$(".btnOpenInfo", $trObj).on("click", function(){
			let _data = $(this).closest('tr').data('ROW');
			
			// 고객사 데이터를 먼저 읽어온다
			self._client = {};
			self.load({eqSeq:_data.eqSeq}, function(resp){
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
*/		
	}

	list = (_mapData, cbfunc) => {
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
			ctl : 'equipment',
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
			ctl : 'equipment',
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

	layerViewEvent = ($layerObject, data) =>{
		const self = this;

		$(`.btnMEmployeeSelect`,$layerObject).on('click', function(e){
			let $popDiv = $('template#employeeView');
			self._parent.openLayer($popDiv.html(),self.employeeLayer,data, $layerObject);
			e.stopPropagation();
		});
		$(`.btnSEmployeeDel`,$layerObject).on('click', function(e){
			$('input[name=semployee]', `#${popupID}`).data(null).val('');
			e.stopPropagation();
		});


		self.companyProcessList(function(resp){
			// let $target = $(`#${popupID} .processWrap`).empty();
			let $target = $(`select[name=spSeq]`,$layerObject).empty();
			if(resp.code == 0) {
				for(let i in resp.data) {
					let _data = resp.data[i];
					//let divItem = $(`<div class="mw_checkbox mb5"><input type="checkbox" name="spSeq" id="spSeq${i}" value="${_data.spSeq}"> <label for="spSeq${i}">${_data.spNm}</label></div>`);
					//$(divItem).appendTo($target);
					let $option = $('<option />');
					$option.val(_data.spSeq).text(_data.spNm);
					$target.append($option);
				}
				if(data != undefined)$('select[name=spSeq]',$layerObject).val(data.processInfo[0].spSeq);
			}
		});

		self.companyPlaceList({cpType:'A',useYn:'Y'}, function(resp){
			
			let $target = $(`select[name=cpSeq]`,$layerObject).empty();
			if(resp.code == 0) {
				for(let i in resp.data) {
					let _data = resp.data[i];
					let $option = $('<option />');
					$option.val(_data.cpSeq).text(_data.cpNm);
					if(data != undefined && data.cpSeq == _data.cpSeq) $option.attr('selected','selected');
					$target.append($option);
				}
				//if(data != undefined)$('select[name=cpSeq]',$layerObject).val('');
			}
		});
		$(`.clientSave`,$layerObject).on('click', function(e){

			let _eqNm = $('input[name=eqNm]', $layerObject).val();
			let _cpSeq = $('select[name=cpSeq]', $layerObject).val();
			let _eqMemo = $('textarea[name=eqMemo]', $layerObject).val();
			let _useYn = $('select[name=useYn]', $layerObject).val();

			let _employeeInfo = [];
			let _spSeq = [];
			if( self._utils.checkRequired($layerObject)) {
				let employeeInfo = $layerObject.data('employeeInfo');
				_employeeInfo = employeeInfo ?? [];

				_spSeq.push($('select[name=spSeq]', $layerObject).val());
				
				let mapData = {
					eqNm : _eqNm,
					eqMemo : _eqMemo,
					cpSeq : _cpSeq,
					useYn : _useYn,
					employeeInfo : JSON.stringify(_employeeInfo),
					processInfo : JSON.stringify(_spSeq)
				}
				let data = $layerObject.data();
				if(data!= undefined) mapData.eqSeq = data.eqSeq;
				

				if(mapData.eqSeq == undefined){
					self.insert(mapData, function(resp){
						if(resp.code==0) {
							self.retrieve();
							$(`.btnClosePopLayer`,$layerObject).trigger('click');
							alert('등록 되었습니다.');
						} else {
							alert(resp.message);
						}
					});
				}else{
					self.update(mapData, function(resp){
						if(resp.code==0) {
							self.retrieve();
							$(`.btnClosePopLayer`,$layerObject).trigger('click');
							alert('수정되었습니다.');
						} else {
							alert('수정에 실패하였습니다.');
						}
					});
				}
			}

		});
	}

	initNewLayer = (popupID) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.clientSave`,$layerObject).text("등록");
		self.layerViewEvent($layerObject);
	}
	reloadLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text("장비 수정");
		$(`.clientSave`,$layerObject).text("수정");
		$layerObject.data(data);
		self.layerViewEvent($layerObject,data);
		self._utils.unSerializeObject($layerObject, data);
		$('input[name=memployee]',$layerObject).data(data.employeeInfo[0]).val(data.employeeInfo[0].eNm);
	}
	/*
	employeeView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:400px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">직원 선택</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:320px;overflow-y:auto;padding:2px;">';
		divHtml += '<div class="searchWrap pt10">';
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="40%">';
		divHtml += '<col width="40%">';
		divHtml += '<col width="20%">';
		divHtml += '</colgroup>';
		divHtml += '<thead>';
		divHtml += '<tr>';
		divHtml += '<th>직원명</th>';
		divHtml += '<th>직급</th>';
		divHtml += '<th class="last">선택</th>';
		divHtml += '</tr>';
		divHtml += '</thead>';
		divHtml += '<tbody class="employeeList">';
		divHtml += '</tbody>';
		divHtml += '</table>';
		divHtml += '</div>';
		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}
*/
	employeeLayer = (popupID, data, $object) => {
		const self = this;
		let $layerObject = $('#'+ popupID);
		let empList = (data!=undefined)? data.employeeInfo : [];


		let $empList = $('.takeChargeList',$layerObject);
		let $allEmpList = $(`.employeeList`,$layerObject).empty();

		$allEmpList.on('click','.btnSelect',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data('ROW'); 
			empListAdd(d);
			$tr.remove();
		});
		$empList.on('click','.btnSelect',function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data('ROW'); 
			allEmpListAdd(d);
			$tr.remove();
		});

		$empList.sortable({
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
			},
			update: function(event, ui){
			},
		});

		for(let i=0;i<empList.length;i++){
			let _data = empList[i];
			empListAdd(_data);
		}

		self.employeeList(function(resp){

			$allEmpList.empty();

			if(resp.code == 0) {

				for(let i in resp.data) {
					let _data = resp.data[i];
					let is = false;
					for(let e=0;e<empList.length;e++){
						if(_data.eSeq == empList[e].eSeq){
							is = true;
							break;
						}
					}
					if(is) continue;
					allEmpListAdd(_data);
				}
			}
		});

		$('.applySave',$layerObject).on('click', function(){
			let $trs = $('tr',$empList);
			let info = [];
			for(let i =0;i<$trs.length;i++){
				let d = $($trs[i]).data('ROW');
				info.push(d);
			}
			$object.data('employeeInfo', info);
			if(info.length > 0){
				let eNms = [];
				for(let i=0;i<info.length;i++) eNms.push(info[i].eNm)
				$('input[name=memployee]',$object).val(eNms.join(', '));
			}
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});

		function allEmpListAdd(d){
			let $trItem = $(`<tr><td>${self._utils.nullTostring(d.eNm, '')}</td><td>${self._utils.nullTostring(d.eRank, '')}</td><td><a class="btnStyle03 btnSelect" href="javascript:void(0);">배정</a></td></tr>`);
			$trItem.data("ROW", d);
			$allEmpList.append($trItem);
		}
		function empListAdd(d){
			let $trItem = $(`<tr><td><i class="fa-solid fa-up-down cursorPointer"></i></td><td>${self._utils.nullTostring(d.eNm, '')}</td><td>${self._utils.nullTostring(d.eRank, '')}</td><td><a class="btnStyle03 btnSelect" href="javascript:void(0);">취소</a></td></tr>`);
			$trItem.data("ROW", d);
			$empList.append($trItem);
		}
	}

	employeeList = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'list'
		}

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	companyProcessList = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'process',
			cmd : 'companyProcessList'
		}
		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	companyPlaceList = (data, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'place',
			cmd : 'list',
			cpType : 'A',
			rows : 9999
		}

		if(data != undefined) $.extend(mapData,data)

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
			ctl : 'equipment',
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



	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'equipment',
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


	repairView = (cbfunc) => {
		const self = this;

		var divHtml = '<div class="mw_defalut" style="width:600px;" id=""><div class="mw_title" id="handle">';
		divHtml += '<h1 class="mw_title_mid">';
		divHtml += '<span class="title">최근 수리이력</span>';
		divHtml += '<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>';
		divHtml += '</h1>';
		divHtml += '</div>';
		divHtml += '<div class="mw_ctWrap">';
		divHtml += '<div class="mw_contents">';
		divHtml += '<div style="height:420px;overflow-y:auto;padding:2px;">';
		divHtml += '<div class="searchWrap pt10" style="height: 395px;">';
		divHtml += '<input type="hidden" name="orderculumn" value="eqNm">';
		divHtml += '<input type="hidden" name="orderby" value="DESC">';
			
		divHtml += '<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">';
		divHtml += '<caption></caption>';
		divHtml += '<colgroup>';
		divHtml += '<col width="20%">';
		divHtml += '<col width="auto">';
		divHtml += '<col width="25%">';
		divHtml += '</colgroup>';
		divHtml += '<thead>';
		divHtml += '<tr>';
		divHtml += '<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">일자</th>';
		divHtml += '<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">수리내용</th>';
		divHtml += '<th class="last" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">등록일시</th>';
		divHtml += '</tr>';
		divHtml += '</thead>';
		divHtml += '<tbody class="repairList">';
		divHtml += '</tbody>';
		divHtml += '</table>';
/*		
		divHtml += '<div class="absWrap">';
		divHtml += '<div class="pageInfoTfoot" style="position:relative;margin-top:10px;margin-bottom: 10px;">';
		divHtml += '<span style="position:absolute;top:0px;left:5px;">';
		divHtml += '<select name="rowsPerPage" class="vm">';
		divHtml += '<option value="20">20개씩 보기</option>';
		divHtml += '<option value="30">30개씩 보기</option>';
		divHtml += '<option value="40">40개씩 보기</option>';
		divHtml += '<option value="50">50개씩 보기</option>';
		divHtml += '<option value="100">100개씩 보기</option>';
		divHtml += '</select>';
		divHtml += '</span>';
		divHtml += '<div class="pagenate">';
		divHtml += '<a href="#">처음</a>';
		divHtml += '<a href="#">이전</a>';
		divHtml += '<a href="#" class="now">1</a>';
		divHtml += '<a href="#">2</a>';
		divHtml += '<a href="#">3</a>';
		divHtml += '<a href="#">다음</a>';
		divHtml += '<a href="#">마지막</a>';
*/
		divHtml += '</div>';
		divHtml += '<span style="position:absolute;top:0px;right:5px;">';
		divHtml += '<input type="hidden" name="page" style="width:40px;text-align:center;" inputType=comma>';
		divHtml += '</span>';
		divHtml += '</div>';
		divHtml += '</div>';
		divHtml += '</div>';

		divHtml += '</div></div></div></div>';

		cbfunc(divHtml);
	}

	repairLayer = (popupID) => {
		const self = this;

		$(`#${popupID} .title`).text(`최근 수리이력 (${self._eqNm })`);

		let pageTfoot = $(`#${popupID}`).find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let orderColumn = $(`#${popupID}`).find("input[name=orderculumn]").val();
		let orderType = $(`#${popupID}`).find("input[name=orderby]").val();

		pageTfoot.find("select[name=rowsPerPage]").on("change",function(){
			pageTfoot.find("input[name=page]").val("1");
			self.repairLayer(popupID);
		});


		let mapData = {
			eqSeq : self._eqSeq,
			page : 1,
			rows : 10,
			orderColumn : orderColumn,
			orderType : orderType
		}

		self.repairList(mapData, function(resp){

			let $target = $(`#${popupID} .repairList`).empty();
			
			let total = 0;
			let totalPage = 0;

			if(resp.code == 0) {
				if(resp.data != null && resp.data.length > 0) {
					
					for(let i in resp.data) {
						let _data = resp.data[i];
	
						if(i==0){

							

							total = _data.totalCnt;
							totalPage = Math.ceil(total / pageSize);
						}
	
						let trItem = $(`<tr><td>${self._utils.nullTostring(_data.erDt, '.')}</td><td class="txt_l">${self._utils.nullTostring(_data.erMemo, '')}</td><td>${self._utils.nullTostring(_data.creDate, '')}</td></tr>`);
	
						$(trItem).appendTo($target);
					}
				} else {
					$('<tr><td colspan="3">데이타가 없습니다.</td></tr>').appendTo($target);
				}
			} else {
				$('<tr><td colspan="3">데이타가 없습니다.</td></tr>').appendTo($target);
			}

			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});
	}

	repairList = (_mapData, cbfunc) => {
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
					cbfunc(rdata);
			});
	}

}
export default equipmentController
