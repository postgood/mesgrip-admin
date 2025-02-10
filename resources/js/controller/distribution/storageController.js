
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let storageController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._fileSeq = null;
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
			let chkBoxs = tbody.find("input[name=isSeq]:checked");
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
					let isSeq = chkBoxs.val();

					self.delete({isSeq : isSeq}, function(resp) {
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
			let boxs = tbody.find("input[name=isSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
		});

		self._code.find(".btnExcelDownload").on("click",function(e){
			self.excelDownload();
		});
		self._code.find(".aaa").on("click",function(e){
			self.excelDownload2();
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

		searchWrap.find('input[name=cuNm]').autocomplete({
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

		  searchWrap.find('input[name=isNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'storageNmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.isNm, value:v.isNm, v:v};
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


/*
		  tbody.on('click','.btnAddrSearch', function(e){
			let tr = $(this).closest("tr");

			new daum.Postcode({
				oncomplete: function(data) {
						let roadAddr = data.roadAddress; // 도로명 주소 변수
						$(`input[name=isZipcode]`,tr).val(data.zonecode);
						$(`input[name=isAddr]`,tr).val(roadAddr);
				}
			}).open();
		});
*/
		tbody.on('click','.btnOpenInfo', function(){
			let d = $(this).closest('tr').data('ROW');
			self.load({isSeq:d.isSeq}, function(resp){
				if(resp.code == 0) {
					self.layerView(function(data){
						self._parent.openLayer(data, self.initLoadLayer,resp.data);
					},d.isNm);
				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		self.retrieve();
	
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
		let searchColumn = searchWrap.find("input[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let isAddress = searchWrap.find("input[name=isAddress]:checked").val();
		let cuNm = searchWrap.find("input[name=cuNm]").val();

		let searchData = {
			cuTypeCd : 'A',
			cuImportantYn : 'N',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : searchColumn,
			searchWord : searchWord,
			isAddress : isAddress,
			cuNm : cuNm
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

		let tr = $('<tr/>');
				tr.append($('<td ><input type="checkbox" class="vm" name="isSeq" value="'+d.isSeq+'"></td>'));
				//tr.append($('<td class="al pl5"></td>').append(self._utils.nullTostring(d.cuNm, '')));
				tr.append($('<td class="al pl10" style="border:1px solid #dedede;" ></td>').append(self._utils.nullTostring(d.isNm, '')));
				tr.append($('<td style="border:1px solid #dedede;" ></td>').append(self._utils.nullTostring(d.isInchargeNm, '')));
				//tr.append($('<td style="border:1px solid #dedede;" ></td>').append(self._utils.formatPhoneNumber(self._utils.nullTostring(d.isInchargeTel, '').replace(/-/g,''))));
				tr.append($('<td style="border:1px solid #dedede;" class="al"></td>').append((d.isAddr == undefined)?'' : self._utils.nullTostring(d.isAddr, '')+' '+self._utils.nullTostring(d.isAddrDetail, '')));
				tr.append($('<td style="border:1px solid #dedede;" class="al"></td>').append(self._utils.nullTostring(d.isMemo,'')));
				tr.append($('<td style="border:1px solid #dedede;" >'+d.creDate.substring(0,16)+'</td>'));
				tr.append($('<td style="border:1px solid #dedede;" ></td>').append($('<i class="fa-regular fa-pen-to-square cursorPointer btnOpenInfo" title="입/출고지 수정" style="font-size:14px;"></i>')));

		$(tr).data("ROW",d);
		

		tr.appendTo(tbody);
	}



	// popupview
	layerView = (cbfunc,nm) => {
		const self = this;
		nm = (nm==undefined)?'입/출고지 등록':nm;
		var divHtml = `<div class="mw_defalut" style="width:820px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">'+ nm +'</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="height:480px;overflow-y:auto;padding:2px;">
						<div class="bottonWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th>
											<div class="ar"><a href="javascript:void(0);" class="btnSearch clientSave">저장</a></div>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="searchWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
								<caption></caption>
								<colgroup>
									<col width="80px">
									<col width="auto">
									<col width="60px">
									<col width="100px">
									<col width="60px">
									<col width="100px">
								</colgroup>
								<tbody>
									<tr>
										<th class="txt_r">입/출고지</th>
										<td><div class="inputTextCleanDiv"><input type="text" name="isNm" class="mr5" requiremsg="입/출고지명" style="width:350px;"><div class="inputTextClean"><span>×</span></div></div></td>
										<th class="txt_r">담당자</th>
										<td><div class="inputTextCleanDiv"><input type="text" name="isInchargeNm" style="width:95px;"><div class="inputTextClean"><span>×</span></div></div></td>
										<th class="txt_r">연락처</th>
										<td><div class="inputTextCleanDiv"><input type="text" name="isInchargeTel" style="width:95px;"><div class="inputTextClean"><span>×</span></div></div></td>
									</tr>
									<tr>
										<th class="txt_r">주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</th>
										<td colspan="5">
											<input name="isZipcode" class="mr5 readonly" type="text" style="width:50px;" placeholder="우편번호" readonly="readonly">
											<!-- a class="btnStyle03 btnAddrSearch mr5" href="javascript:void(0);">주소검색</a -->
											<input name="isAddr" class="w40p readonly" type="text" placeholder="기본 주소" readonly="readonly"> 
											<div class="inputTextCleanDiv">
												<input name="isAddrDetail" style="width:315px" type="text" placeholder="상세 주소" >
												<div class="inputTextClean"><span>×</span></div>
											</div>
											<i class="fa-solid fa-location-dot cursorPointer btnAddrSearch f_rt" style="font-size:15px;margin:5px 5px;color: #81b1cd;" title="주소 검색" tabindex="12"></i>
										</td>
									</tr>
									<tr class="gpsInfo" style="display:none;">
										<th class="txt_r">GPS</th>
										<td colspan="5">Latitude : <input name="isGpsLatitude" class="w20p" type="text" placeholder="GPS Latitude" readonly="readonly"> Longitude : <input name="isGpsLongitude" class="w20p" type="text" placeholder="GPS Longitude" readonly="readonly"> 아래 지도를 클릭하여 정확한 좌표를 입력하세요</td>
									</tr>
									<tr>
										<th class="txt_r"></th>
										<td colspan="5"><div class="searchWrap kakaoMap" style="height:250px;border:2px solid #fff;"><div class="custom_zoomcontrol radius_border"></div></div></td>
									</tr>
									<tr>
										<th class="txt_r">메&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;모</th>
										<td colspan="5"><textarea name="isMemo" class="w100p"></textarea></td>
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

	mpaLoad = (address) => {
		let self = this;
		
		self._geocoder.addressSearch(address, function(result, status) {
		// 정상적으로 검색이 완료됐으면 
		 if (status === kakao.maps.services.Status.OK) {
				var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				// 결과값으로 받은 위치를 마커로 표시합니다
				var marker = new kakao.maps.Marker({
					map: self._map,
					position: coords
				});
				// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
				self._map.setCenter(coords);
		} });
	}
	LayerEvent = (layerObject) =>{
		const self = this;
		let container = $('.kakaoMap',layerObject)[0];
		let options = {
			center: new kakao.maps.LatLng( 37.566851228967195, 126.97863244275388),
			level: 3
		};
		let map = new kakao.maps.Map(container, options);
		self._geocoder = new kakao.maps.services.Geocoder();
		self._map = map;
		
		self._marker = new kakao.maps.Marker({
			position: new kakao.maps.LatLng( 37.566851228967195, 126.97863244275388),
			clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
		});
		kakao.maps.event.addListener(map, 'click', function(mouseEvent) {      
 			let latlng = mouseEvent.latLng;
			$('input[name=isGpsLatitude]', layerObject).val(latlng.getLat());
			$('input[name=isGpsLongitude]', layerObject).val(latlng.getLng());
			self._marker.setPosition(mouseEvent.latLng);
			self._marker.setMap(map);
			self.searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
				if (status === kakao.maps.services.Status.OK) {
					if(result[0].road_address != undefined){
						$('input[name=isAddr]', layerObject).val(result[0].road_address.address_name);
						$('input[name=isZipcode]', layerObject).val(result[0].road_address.zone_no);
					}
				}   
			});
		});
		
		

		layerObject.on('focus','input[name=isAddrDetail]',function(){
			$(this).data('ROW',$(this).val());
		});
		layerObject.on('focusout','input[name=isAddrDetail]',function(){
			let o = $(this).data("ROW");
			let d = $(this).val();
			let addr = $('input[name=isAddrDetail]', layerObject).val();
			if(addr != '' && o != d && d != ''){
			//	self.mpaLoad(addr +' '+ d);
				/*
				let mapData = {ctl : 'common',cmd : 'addressToGps',address : addr +' '+ d,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm, cuSeq:v.cuSeq};
						});
					} else {
					}
				});
				*/
			}
		});

		layerObject.on('click','.btnAddrSearch', function(e){
			new daum.Postcode({
				oncomplete: function(data) {
						// data.zonecode 새 우편번호
						let roadAddr = data.roadAddress; // 도로명 주소 변수
						$('input[name=isZipcode]',layerObject).val(data.zonecode);
						$('input[name=isAddr]',layerObject).val(roadAddr);
						self.mpaLoad(roadAddr);
				}
			}).open();
		});

		layerObject.find('input[name=cuNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm, v:v};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=cuSeq]', layerObject).val(ui.item.v.cuSeq);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });

		layerObject.find('input[name=isNm]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm, v:v};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$( 'input[name=isZipcode]', layerObject).val(ui.item.v.cuZipcode);
				$( 'input[name=isAddr]', layerObject).val(ui.item.v.cuAddr);
				$( 'input[name=isAddrDetail]', layerObject).val(ui.item.v.cuAddrDetail);
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });
		  self._utils.focusEvent($('input[name=isInchargeTel]',layerObject),'tel');
	}
	initNewLayer = (popupID) => {
		const self = this;
		let layerObject = $('#'+popupID);
		$('.title',layerObject).text("입/출고지 등록");
		self.LayerEvent(layerObject);
		$('.clientSave', layerObject).on('click', function(e){
			let isNm = $('input[name=isNm]', layerObject).val();
			let isAddr = $('input[name=isAddr]', layerObject).val();
			let isAddrDetail = $('input[name=isAddrDetail]', layerObject).val();
			let isZipcode = $('input[name=isZipcode]', layerObject).val();
			let isGpsLatitude = $('input[name=isGpsLatitude]', layerObject).val();
			let isGpsLongitude = $('input[name=isGpsLongitude]', layerObject).val();
			let isMemo = $('textarea[name=isMemo]', layerObject).val();
			let isInchargeNm = $('input[name=isInchargeNm]', layerObject).val();
			let isInchargeTel = $('input[name=isInchargeTel]', layerObject).val();
			if(!self._utils.checkEmptyNull(isInchargeTel)) isInchargeTel = self._utils.convertNumber(isInchargeTel);
			if( self._utils.checkRequired(`#${popupID}`)) {

				let mapData = {
					isNm : isNm,
					isAddr : isAddr,
					isAddrDetail : isAddrDetail,
					isGpsLatitude : isGpsLatitude,
					isGpsLongitude : isGpsLongitude,
					isZipcode : isZipcode,
					isMemo : isMemo,
					isInchargeNm : isInchargeNm,
					isInchargeTel : isInchargeTel
				}
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
		}).text('등록');		
	}
	initLoadLayer = (popupID, d) => {
		const self = this;
		let layerObject = $('#'+popupID);
		$('.title',layerObject).text("입/출고지 수정");
		self._utils.unSerializeObject(layerObject, d);
		self.LayerEvent(layerObject);
		
		if(d.isGpsLongitude != undefined){
			let latlng = new kakao.maps.LatLng(d.isGpsLatitude, d.isGpsLongitude);
			self._marker = new kakao.maps.Marker({
				map: self._map, // 마커를 표시할 지도
				position: latlng, // 마커를 표시할 위치
				title : d.isNm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			});
			self._map.setCenter(latlng);
			self._marker.setMap(self._map);

		}

		$('.clientSave', layerObject).on('click', function(e){

			let isNm = $('input[name=isNm]', layerObject).val();
			let isAddr = $('input[name=isAddr]', layerObject).val();
			let isAddrDetail = $('input[name=isAddrDetail]', layerObject).val();
			let isZipcode = $('input[name=isZipcode]', layerObject).val();
			let isGpsLatitude = $('input[name=isGpsLatitude]', layerObject).val();
			let isGpsLongitude = $('input[name=isGpsLongitude]', layerObject).val();
			let isMemo = $('textarea[name=isMemo]', layerObject).val();
			let isInchargeNm = $('input[name=isInchargeNm]', layerObject).val();
			let isInchargeTel = $('input[name=isInchargeTel]', layerObject).val();
			if(!self._utils.checkEmptyNull(isInchargeTel)) isInchargeTel = self._utils.convertNumber(isInchargeTel);

			if( self._utils.checkRequired(`#${popupID}`)) {
				let mapData = {
					isSeq : d.isSeq,
					isNm : isNm,
					isAddr : isAddr,
					isAddrDetail : isAddrDetail,
					isGpsLatitude : isGpsLatitude,
					isGpsLongitude : isGpsLongitude,
					isZipcode : isZipcode,
					isMemo : isMemo,
					isInchargeNm : isInchargeNm,
					isInchargeTel : isInchargeTel
				}
				self.update(mapData, function(resp){
					if(resp.code==0) {
						$("body .btnClosePopLayer").trigger('click');
						self.retrieve();
						alert('수정되었습니다.');
					} else {
						alert(resp.message);
					}
				});
			}
		}).text('수정');
	}
	searchAddrFromCoords = (coords, callback) => {
		let self = this;
		// 좌표로 행정동 주소 정보를 요청합니다
		self._geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
	}
	searchDetailAddrFromCoords = (coords, callback) => {
		let self = this;
		// 좌표로 법정동 상세 주소 정보를 요청합니다
		self._geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
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
		columnInfos.push({name:"입고처",key:"istInNm",width:20,align:'left'});
		columnInfos.push({name:"입고희망일",key:"oHopeInDt",width:12,align:'center'});
		columnInfos.push({name:"입고자",key:"inENm",width:15,align:'center'});
		columnInfos.push({name:"출고처",key:"outNm",width:20,align:'left'});
		columnInfos.push({name:"출고희망일",key:"oHopeOutDt",width:12,align:'center'});
		columnInfos.push({name:"출고자",key:"istOutENm",width:15,align:'center'});
		columnInfos.push({name:"메모",key:"oMemo",width:70,align:'left'});
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

	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
			cmd : 'storageInsert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	
	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
			cmd : 'storageList'
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
			cmd : 'storageLoad'
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
			cmd : 'storageDelete'
		}

		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}
	purge = () => {
		const self = this;

		console.log("customerController purge");
	}

	reload = () => {
		const self = this;

		console.log("customerController reload");
	}
	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
			cmd : 'storageUpdate'
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
export default storageController