
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let placeController = class {

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
			let $popDiv = $('template#placeDiv');
			self._parent.openLayer($popDiv.html(),self.initNewLayer);

			e.stopPropagation();
		});

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=cpSeq]:checked");
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
					let cpSeq = chkBoxs.val();

					self.delete({cpSeq : cpSeq}, function(resp) {
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
			self.load({cpSeq:_data.cpSeq}, function(resp){
				if(resp.code == 0) {
					let $popDiv = $('template#placeDiv');
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

		let searchData = {
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : 'cpNm',
			searchWord : searchWord,
			cpType : 'A'
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
		$tr.append($('<td style="border:1px solid #dedede;"><input type="checkbox" class="vm" name="cpSeq" value="'+d.cpSeq+'"></td>'));
		$tr.append($('<td style="border:1px solid #dedede;" class="al pl5" />').append(self._utils.nullTostring(d.cpNm, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="al" />').append(self._utils.nullTostring(d.cpAddr, '') +' '+ self._utils.nullTostring(d.cpAddrDetail, '')));
		$tr.append($('<td style="border:1px solid #dedede;" class="ac" />').append(self._utils.formatPhoneNumber(d.cpTel)));

		if(d.useYn == "N") $tr.append($('<td class="txt_red">'+self._utils.nullTostring(d.useYn, '')+'</td>'));
		else $tr.append($('<td style="border:1px solid #dedede;">'+self._utils.nullTostring(d.useYn, '')+'</td>'));

		
		
		$tr.append($('<td style="border:1px solid #dedede;">'+d.creDate.substring(0,16)+'</td>'));;
		$tr.append($('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="공장 정보 수정" style="font-size:14px;"></i></td>'));;

		$tr.data("ROW",d);
		$tr.appendTo(tbody);
	
	}

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'place',
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
			ctl : 'place',
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
			ctl : 'place',
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

	layerViewEvent = ($layerObject, data) =>{
		const self = this;
		self._utils.focusEvent($('input[name=cpTel]',$layerObject),'tel');

		$('i.fa-solid.fa-location-dot', $layerObject).on('click', function(e){
			new daum.Postcode({
				oncomplete: function(data) {
						// data.zonecode 새 우편번호
						let roadAddr = data.roadAddress; // 도로명 주소 변수
						$('input[name=cpZipcode]',$layerObject).val(data.zonecode);
						$('input[name=cpAddr]',$layerObject).val(roadAddr);
						$('input[name=cpAddrDetail]',$layerObject).trigger('focus');
				}
			}).open();
		});


		$(`.save`,$layerObject).on('click', function(e){
			let _cpNm = $('input[name=cpNm]', $layerObject).val();
			let _cpType = 'A';
			let _cpTel = $('input[name=cpTel]', $layerObject).val();
			let _cpZipcode = $('input[name=cpZipcode]', $layerObject).val();
			let _cpAddr = $('input[name=cpAddr]', $layerObject).val();
			let _cpAddrDetail = $('input[name=cpAddrDetail]', $layerObject).val();
			let _cpMemo = $('textarea[name=cpMemo]', $layerObject).val();
			let _useYn = $('select[name=useYn]', $layerObject).val();
			let _sort = $('input[name=sort]', $layerObject).val();

			if( self._utils.checkRequired($layerObject)) {
				
				if(!self._utils.checkEmptyNull(_cpTel)) _cpTel = _cpTel.replace(/-/g,'');
				let mapData = {
					cpNm : _cpNm,
					cpType : _cpType,
					cpTel : _cpTel,
					cpZipcode : _cpZipcode,
					cpAddr : _cpAddr,
					cpAddrDetail : _cpAddrDetail,
					cpMemo : _cpMemo,
					useYn : _useYn,
					sort : _sort,
				}
				let data = $layerObject.data();
				if(data!= undefined) mapData.cpSeq = data.cpSeq;
				

				if(mapData.cpSeq == undefined){
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
		$(`.save`,$layerObject).text("등록");
		self.layerViewEvent($layerObject);
	}
	reloadLayer = (popupID, data) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		$(`.title`,$layerObject).text(+data.cpNm + " 수정");
		$(`.save`,$layerObject).text("수정");
		$layerObject.data(data);
		self.layerViewEvent($layerObject,data);
		self._utils.unSerializeObject($layerObject, data);
	}


	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'place',
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
			ctl : 'place',
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
export default placeController