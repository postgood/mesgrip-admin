
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let stockPurchaseController = class {

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
			let $popDiv = $('template#stockDiv');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);

			e.stopPropagation();
		});

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=sSeq]:checked");
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
					let sSeq = chkBoxs.val();

					self.delete({sSeq : sSeq}, function(resp) {
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
		let tbody = self._code.find(".dataListTable");

		searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});
		let mapData = {ctl : 'stock',cmd : 'typeList',isOnlyType : true,useYn :'Y'};
		let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $stSeq = $('select[name=stSeq]', searchWrap);
				for(let i=0;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let $opt = $('<option />');
					$opt.val(d.stSeq).text(d.stNm);
					$stSeq.append($opt);
				}
			} else {
				alert(rdata.message);
			}
		});

		mapData = {ctl : 'place',cmd : 'nmList', cpType :'B', useYn : 'Y'};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api2.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $cpSeq = $('select[name=cpSeq]',searchWrap);
				let data = rdata.data;
				for(let i=0;i<data.length;i++){
					let d = rdata.data[i];
					let $opt = $('<option />');
					$opt.val(d.cpSeq).text(d.cpNm);
					$cpSeq.append($opt);
				}
			} else {
				alert(rdata.message);
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
			
			// 고객사 데이터를 먼저 읽어온다
			//self._client = {};
			self.load({sSeq:_data.sSeq}, function(resp){
				if(resp.code == 0) {
					let $popDiv = $('template#stockDiv');
					self._parent.openLayer($popDiv.html(),self.reloadLayer,resp.data);
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
		let stSeq = searchWrap.find("select[name=stSeq]").val();
		let safeWarning = searchWrap.find("input[name=safeWarning]:checked").val()??'N';

		let searchData = {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'sNm',
			searchWord : searchWord,
			cpSeq : cpSeq,
			stSeq : stSeq,
			safeWarning : safeWarning
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
						$('.totalPrice',searchWrap).text(self._utils.numberWithCommas(resp[i].totalPrice));
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
		let placeInfo = d.placeInfo;
		let place = '';
		for(let i=0;i<placeInfo.length;i++){
			let p = placeInfo[i];
		 	place += '<span style="display:inline-block;width:100%;">'+ p.cpNm +' : <strong>'+ self._utils.numberWithCommas(p.splCnt) +'</strong></span>';
		}
		let $tr = $('<tr />');
		$tr.append($('<td style="border:1px solid #dedede;"><input type="checkbox" class="vm" name="sSeq" value="'+d.sSeq+'"></td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al pl5" />').append(self._utils.nullTostring(d.sNm, '')));
		$tr.append($('<td class="'+ ((d.sMarkYn == "Y")?'txt_red':'')+'">'+self._utils.nullTostring(d.sMarkYnNm, '')+'</td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(self._utils.nullTostring(d.sModelNo, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(self._utils.nullTostring(d.sStandard, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(self._utils.nullTostring(d.cuNm)));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sSafeCnt)));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sCnt)));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(place));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sPrice)));
		$tr.append($('<td style="border:1px solid #dedede;" class="ar" />').append(self._utils.numberWithCommas(d.sTotalPrice)));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac" />').append('내역보기'));
		if(d.useYn == "N") $tr.append($('<td class="txt_red">'+self._utils.nullTostring(d.useYn, '')+'</td>'));
		else $tr.append($('<td style="border:1px solid #dedede;">'+self._utils.nullTostring(d.useYn, '')+'</td>'));
		$tr.append($('<td style="border:1px solid #dedede;">'+d.creDate.substring(0,16)+'</td>'));;
		$tr.append($('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="수정" style="font-size:14px;"></i></td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
	
	}

	

	// popupview

	layerViewEvent = ($layerObject, info) =>{
		const self = this;
		self._utils.focusEvent($('input[name=sioCnt]',$layerObject),'comma');
		self._utils.focusEvent($('input[name=sSafeCnt]',$layerObject),'comma');
		self._utils.focusEvent($('input[name=sioUnitPrice]',$layerObject),'moeny');

		let mapData = {ctl : 'place',cmd : 'list', cpType :'B', rows:9999};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				let $cpSeq = $('select[name=cpSeq]',$layerObject);
				let data = rdata.data;
				for(let i=0;i<data.length;i++){
					$cpSeq.append('<option value="'+ data[i].cpSeq +'">'+ data[i].cpNm +'</option>');
				}
			} else {
				alert(rdata.message);
			}
		});


		let $tbody = $('.dataListTable tbody', $layerObject);
		$layerObject.find('input[name=cuNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
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
			select: function (event, ui) {
				$( 'input[name=cuSeq]', $layerObject).val(ui.item.cuSeq);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
		$('input[name=sioCnt]',$layerObject).on('keypress',function(key){
			if(key.keyCode && key.keyCode==13)	{$('input[name=sioUnitPrice]',$layerObject).trigger('focus'); }
		});
/*
		$layerObject.find('input[name=cpNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'place',cmd : 'list', cpType :'B', cpNm : this.term, rows:9999};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cpNm, value:v.cpNm, cpSeq:v.cpSeq};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=cpSeq]', $layerObject).val(ui.item.cpSeq);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
*/
		$('.stockTypeChoice', $layerObject).on('click', function(e){
			let $popDiv = $('template#stockTypeChoice');
			let $stockTypeTd = $('.stockTypeTd', $layerObject);
			let stockTypes = [];
			let stSeqs =$('input[name=typeInfo]',$layerObject).val();
			if(stSeqs.length > 0) stockTypes = JSON.parse(stSeqs);
			self._parent.openLayer($popDiv.html(),self.sotckTypeChoce, stockTypes, $stockTypeTd);
			e.stopPropagation();
		});

		$('.fa-solid.fa-square-plus',$layerObject).on('click',function(){
			let $placeInfo = $('.placeList',$layerObject);
			let d = self._utils.serializeObject($placeInfo);
			d.cpNm = $('select[name=cpSeq] option:selected',$placeInfo).text();
			if(self._utils.checkEmptyNull(d.cpSeq)){
				alert('저장소를 입력 선택 하십시요');
				return;
			}
			d.sioCnt = d.sioCnt ?? 0;
			d.sioUnitPrice = d.sioUnitPrice ?? 0;
			d.sioCnt = self._utils.convertNumber(d.sioCnt);
			d.sioUnitPrice = self._utils.convertNumber(d.sioUnitPrice);
			placeAdd($tbody, d);
			let $objs = $('input,select',$placeInfo);
			for(let i=0;i<$objs.length;i++) $($objs[i]).val('');
		});


		$tbody.on('click','.fa-solid.fa-square-minu',function(){
			let $tr = $(this).closest('tr');
			confirm('삭제 하시겠습니까?',function(is){
				if(is){
					$tr.remove();
				}
			});
		});
		if(info != undefined){
			/*
			if(info.placeInfo.length > 0){
				for(let i=0;i<info.placeInfo.length;i++) placeAdd($tbody,info.placeInfo[i]);
			}
			*/
			if(info.typeInfo.length > 0){
				let stockTypes = [];
				let stockTypeNms = [];
				for(let i=0;i<info.typeInfo.length;i++){
					stockTypes.push(info.typeInfo[i].stSeq);
					stockTypeNms.push(info.typeInfo[i].stNm);
				}
				$('input[name=typeInfo]',$layerObject).val(JSON.stringify(stockTypes));
				$('.stockTypes',$layerObject).text(stockTypeNms.join(', '));
			}
		}

		$(`.save`,$layerObject).on('click', function(e){
			let orgData = $layerObject.data();
			let data = self._utils.serializeObject($layerObject);
			let $trs = $('tr', $tbody);
			let inoutInfo = [];
			if( orgData.sSeq == undefined){
				for(let i=0;i<$trs.length;i++){
					let d = $($trs[i]).data("ROW");
					if(d != undefined && d.cpSeq != undefined){
						inoutInfo.push(d);
					}
				}
				if(inoutInfo.length == 0){
					alert('저장소를 선택하여 현재 재고를 등록 하십시요');
					return;
				}
			}else{
				data.sSeq = orgData.sSeq;
			}

			if( self._utils.checkRequired($layerObject)) {
				if(data.sSeq == undefined){
					data.inoutInfo = inoutInfo;
					self.insert(data, function(resp){
						if(resp.code==0) {
							self.retrieve();
							$(`.btnClosePopLayer`,$layerObject).trigger('click');
							alert('등록 되었습니다.');
						} else {
							alert(resp.message);
						}
					});
				}else{
					self.update(data, function(resp){
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

		function placeAdd($tbody, d){
			let $tr = $('<tr />');
			$tr.append($('<td class="al">'+ d.cpNm +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioCnt) +'</td>'));
			$tr.append($('<td class="ar">'+ self._utils.numberWithCommas(d.sioUnitPrice) +'</td>'));
			//$tr.append($('<td class="ar"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tr.append($('<td class="ac" style="padding:0px;"><a href="javascript:void(0);" class="minusbtn"><i class="fa-solid fa-square-minus" style="color:#8071bb;font-size: 18px;"></i></a></td>'));
			$tbody.append($tr.data("ROW",d));
		}
	}

	initNewLayer = (popupID) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.save`,$layerObject).text("자재 등록");
		self.layerViewEvent($layerObject);
	}
	reloadLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text(data.sNm + " 수정");
		$(`.save`,$layerObject).text("수정");
		$('.placeArae',$layerObject).remove();
		$layerObject.data(data);
		self._utils.unSerializeObject($layerObject, data);
		self.layerViewEvent($layerObject,data);
	}

	sotckTypeChoce = (popupID, stSeqs, $parentTr) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let $tbody = $('.dataListTable tbody', $layerObject);
		let mapData = {
			ctl : 'stock',
			cmd : 'typeList',
			isOnlyType : true,
			useYn :'Y'
		}
		let _api = new AjaxCall(self._const	,mapData,{'wapi': 'user/ws','spinner':true});
		_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					if(rdata.data.length > 0 ){
						for(let i=0;i<rdata.data.length;i++){
							let d = rdata.data[i];
							let $tr = $('<tr />');
							$tr.append($('<td class="ac"><input type="checkbox" name="stSeq" '+ ((stSeqs.indexOf(d.stSeq) > -1)? 'checked':'')  +'></td>'));
							$tr.append($('<td class="al">'+ d.stNm +'</td>'));
							$tbody.append($tr.data("ROW", d));
						}
					}else{
						let $tr = $('<tr />');
						$tr.append($('<td class="ac" colspan="2">데이타가 없습니다.</td>'));
						$tbody.append($tr);
					}
				} else {
					alert(rdata.message);
				}
		});

		$(`.applySave`,$layerObject).on('click', function(e){
			let stockTypes = [];
			let stockTypeNms = [];
			let $trs = $('tr', $tbody);
			let $chkBoxs = $tbody.find("input[name=stSeq]:checked");
			
			for(let i=0;i<$chkBoxs.length;i++){
				let $tr = $($chkBoxs[i]).closest('tr');
				let d = $tr.data('ROW');
				stockTypes.push(d.stSeq);
				stockTypeNms.push(d.stNm);
			}
			$('input[name=typeInfo]',$parentTr).val(JSON.stringify(stockTypes));
			$('.stockTypes',$parentTr).text(stockTypeNms.join(', '));
			$(`.btnClosePopLayer`,$layerObject).trigger('click');
		});

	}

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
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
			ctl : 'stock',
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
			ctl : 'stock',
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
	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'stock',
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
			ctl : 'stock',
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
export default stockPurchaseController