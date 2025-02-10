import CryptoJS from 'crypto-js'
import $ from 'jquery'
import Swal from 'sweetalert2'
import AjaxCall from './AjaxCall';
import Utils from './utils.js';

let CommonPop = class {
	constructor (_root,_const,_data,_options) {
		this._root = _root?_root:null;
		this._const = _const;
		this._data = _data?_data:{};
		let wapi = 'public/ws';
		if(_const.__USER_LEVEL == 3) { wapi = 'customer/ws';
		}else if(_const.__USER_LEVEL == 3) { wapi = 'user/ws';
		}else if(_const.__USER_LEVEL == 7) { wapi = 'admin/ws';}
		this._options = _options?_options:{
			isasync : true,
			wapi : wapi
		}
		this._filter = {}
		this._utils = new Utils();
	}
	init = (_const,data) => {
        const self = this;
            self._const = _const;
            Object.freeze(self._const);
            self._data = data;
    };

    printme = () => {
        const self = this;
    };

	customerView = (d) => {
		const self = this;
		let mapData = {ctl : 'customer',cmd : 'load', cuSeq: d.cuSeq};
		let _api = new AjaxCall(self._const, mapData, {'wapi': self._options.wapi,'spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				self.layerCustomerView(function(data){
					self._root.openLayer(data, self.layerCustomerViewEvent, rdata.data);
				});
			} else{
				alert(rdata.message);
			}
		});

	};
	orderView = (d) => {
		const self = this;
		let mapData = {ctl : 'order',cmd : 'load', oSeq: d.oSeq};
		let _api = new AjaxCall(self._const, mapData, {'wapi': self._options.wapi,'spinner':true});
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				self.layerOrderView(function(data){
					self._root.openLayer(data, self.layerOrderViewEvent, rdata.data);
				});
			} else{
				alert(rdata.message);
			}
		});
	};
	order = {

	};
	layerOrderView = (cbfunc) =>{

		var divHtml = `<div class="mw_defalut" style="width:700px;height:495px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">수주 조회</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="overflow-y:auto;padding:2px;">

						<div class="searchWrap" style="padding-bottom:10px;">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable mb10 orderMaster">
								<caption></caption>
								<colgroup>
									<col width="70px">
									<col width="auto">
									<col width="70px">
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th class="ac">업&nbsp;&nbsp;체&nbsp;&nbsp;명</th>
										<td class="cuNm"></td>
										<th class="ac actionArea">승인일시</th>
										<td class="oApprovalDate"></td>
									</tr>
									<tr>
										<th class="ac">파일이름</th>
										<td colspan="3"><span  class="oFileNm"></span><i class="fa-solid fa-download cursorPointer fileDown" style="margin-left:15px;margin-right:5px;display:none;" title="파일 받기"></i><span  class="addFileName fileDown cursorPointer"></span></td>
									</tr>
									<tr>
										<th class="ac">용지규격</th>
										<td class="oPaperSize"></td>
										<th class="ac">담&nbsp;&nbsp;당&nbsp;&nbsp;자</th>
										<td class="oInchargeNm"></td>
									</tr>
									<tr>
										<th class="ac">수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량</th>
										<td class="oCnt"></td>
										<th class="ac">연&nbsp;&nbsp;락&nbsp;&nbsp;처</th>
										<td class="oInchargeTel"></td>
									</tr>
									<tr>
										<th class="ac">비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고</th>
										<td colspan="3"><pre  class="oMemo"></pre></td>
									</tr>
									<tr>
										<th class="ac">수정공지</th>
										<td colspan="3"><pre  class="oMemo"></pre></td>
									</tr>
								</tbody>
							</table>
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10">
								<caption></caption>
								<colgroup>
									<col width="4%"><!-- 입고 -->
									<col width="25%"><!-- 컬럼 -->
									<col width="20%"><!-- 내용 -->
									<col width="2%">
									<col width="4%"><!-- 입고 -->
									<col width="25%"><!-- 컬럼 -->
									<col width="20%"><!-- 내용 -->
								</colgroup>
								<tbody>
									<tr>
										<th rowspan="3" class="ac">입<br><br>고</th>
										<td colspan="" class="" style="padding: 0px 5px;line-height: 1.1;"><span class="istInNm"></span></td>
										<td colspan="" class="ac" style="padding: 0px 5px;line-height: 1.1;"><span class="istInHopeDt"></span><span class="istInMemo"></span></td>
										<td rowspan="3" class="" style="background: #ecf5f9;border:0px;"></td>
										<th rowspan="3" class="ac">출<br><br>고</th>
										<td colspan="" class="" style="padding: 0px 5px;line-height: 1.1;"><span class="istOutNm"></span></td>
										<td colspan="" class="ac" style="padding: 0px 5px;line-height: 1.1;"><span class="istOutHopeDt"></span><span class="istOutMemo"></span></td>
									</tr>
									<tr>
										<td colspan="2"><span class="isInAddr"></span><span class="isInAddrDetail"></span></td>
										<td colspan="2"><span class="isOutAddr"></span><span class="isOutAddrDetail"></span></td>
									</tr>
									<tr>
										<td colspan="2"><span class="isInInchargeNm" style="margin-right:10px;"></span><span class="isInInchargeTel"></td>
										<td colspan="2"><span class="isOutInchargeNm" style="margin-right:10px;"></span><span class="isOutInchargeTel"></td>
									</tr>
								</tbody>
							</table>

							<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tablScrollDisplay dataHeadTable scrollTbThead" style="border-top: 1px solid #9ac7e1 !important;">
								<caption></caption>
								<colgroup>
									<col width="70px">
									<col width="90px">
									<col width="50px">
									<col width="auto">
									<col width="100px">
								</colgroup>
								<thead>
									<tr>
										<th class="ac" style="background:#9dc8e5; color:#fff;border-bottom: 1px solid #9ac7e1 !important;border-left: 1px solid #9dc8e5 !important;">공정명</th>
										<th class="ac" style="background:#9dc8e5;color:#fff;border-bottom: 1px solid #9ac7e1 !important;">작업명</th>
										<th class="ac" style="background:#9dc8e5;color:#fff;border-bottom: 1px solid #9ac7e1 !important;">면</th>
										<th class="ac" style="background:#9dc8e5;color:#fff;border-bottom: 1px solid #9ac7e1 !important;">세부사항</th>
										<th class="ac last" style="background:#9dc8e5;color:#fff;border-bottom: 1px solid #9ac7e1 !important;;border-right: 1px solid #9dc8e5 !important;">전달사항</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
							<div class="overflowYListdiv overflowFixWrap" id="" style="height:210px;overflow: overlay;">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="orderWorkTable commonPopTable dataListTable" style="border-top: 0px !important;margin-top:-1px;">
									<caption></caption>
									<colgroup>
										<col width="70px">
										<col width="90px">
										<col width="50px">
										<col width="auto">
										<col width="100px">
									</colgroup>
									<tbody></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;

		cbfunc(divHtml);
	};

	layerOrderViewEvent = (popupID, d) =>{
		const self = this;
		const layerObject = $(`#${popupID}`);
		if(d.orderNotice != undefined && d.orderNotice.length>0) d.orderNotice = d.orderNotice[0].onContent;
		if(self._const.__USER_LEVEL >= 4){
			$(`.title`, layerObject).text("수주 정보");
		}else{
			$(`.title`, layerObject).text("주문상세내역");
		}
		if(self._const.__USER_LEVEL > 3 ){
			if(d.orderNotice.length > 0){
				let tr = $('<tr><th class="ac">수정공지</th><td colspan="3"><pre class="orderNotice" style="color:#ea467f !important;font-weight: bold;">'+ d.orderNotice[0].onContent +'</pre></td></tr>');
				$(`.orderMaster tbody`, layerObject).append(tr);
			}
		}
		// self.eventAction(layerObject);
		// self._root._utils.unSerializeObjectReadOnly(layerObject, d);
		this.classNameInput(layerObject, d);
		$('.oInchargeTel', layerObject).text(self._utils.formatPhoneNumber(d.oInchargeTel));
		$('.isInInchargeTel', layerObject).text(self._utils.formatPhoneNumber(d.isInInchargeTel));
		$('.isOutInchargeTel', layerObject).text(self._utils.formatPhoneNumber(d.isOutInchargeTel));
		$('.istInHopeDt', layerObject).text(self._utils.checkEmptyNull(d.istInHopeDt) ? '':self._utils.dateformatStringToDate(d.istInHopeDt).substring(5));
		$('.istOutHopeDt', layerObject).text(self._utils.checkEmptyNull(d.istOutHopeDt) ? '':self._utils.dateformatStringToDate(d.istOutHopeDt).substring(5));
		if(d.istInCd == 'A'){
			let istInNm = '직입';
			if(!self._utils.checkEmptyNull(d.istInNm)) istInNm += '('+ d.istInNm +')';
			$('.istInNm', layerObject).text(istInNm);
		}else{
			$('.istInNm', layerObject).text(d.istInNm);	
		}
		if(d.istOutCd == 'A'){
			let istOutNm = '직출';
			if(!self._utils.checkEmptyNull(d.istOutNm)) istOutNm += '('+ d.istOutNm +')';
			$('.istOutNm', layerObject).text(istOutNm);
		}else{
			$('.istOutNm', layerObject).text(d.istOutNm);				
		}

		if(!self._utils.checkEmptyNull(d.istInMemo))$('.istInMemo', layerObject).text('('+ d.istInMemo +')');
		if(!self._utils.checkEmptyNull(d.istOutMemo))$('.istOutMemo', layerObject).text('('+ d.istOutMemo +')');
			
		
		
		
		let workInfo = d.workInfo;
		let i = 0;
		for(;i<workInfo.length;i++) workAdd(layerObject, workInfo[i]);
		for(;i<7;i++) workAdd(layerObject);

		if(d.fileInfo.length == 0) {
			$('.fileDown', layerObject).remove();
		}else{
			$('.addfileName',layerObject).text(d.fileInfo[0].realName);
			$('.fileDown', layerObject).show();
			$('.fileDown', layerObject).on('click',function(){
				self._root.fileDownload(d.fileInfo[0]);
			});
		}
		function workAdd(obj,d){
			let tbody = $('.orderWorkTable tbody', obj);
			let tr = $('<tr/>');
			if(d!=undefined){
				tr.data("ROW",d);
				tr.append($('<td class="ac"></td>').text(d.spNm));
				tr.append($('<td class="al"></td>').text(d.wNm+ (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+')')));
				tr.append($('<td class="ac">'+ d.wFrontYnNm +'</td>'));

				let options = '';
				for(let o=0;o<d.optionInfo.length;o++) {
					let od = d.optionInfo[o];
					if(od.cwoOrderYn == 'Y'){
						if(od.woInput != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm"><sapn class="workOptionInfo">'+ od.cwoNm + ' : <strong>'+ od.woInput +'</strong></span></span>');}
					}
				}
				tr.append($('<td class="al workOptionListDiv"></td>').append($(options)));					
				tr.append($('<td class="al" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></td>').text(d.wMemo));
			}else{
				tr.append($('<td class="ac"></td>'));
				tr.append($('<td class="al"></td>'));
				tr.append($('<td class="ac"></td>'));
				tr.append($('<td class="al workOptionListDiv"></td>'));					
				tr.append($('<td class="al" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></td>'));
			}
			tbody.append(tr);
		}
		self._utils.tableScrollCheck();
	}
	classNameInput = ($obj, data) =>{
		let self = this;
		let keys = Object.keys(data);
		for(let i=0;i<keys.length;i++){
			let key = keys[i];
			let text = data[keys[i]];
			if(text!=undefined){
				if(key.substring(key.length - 2) == 'Dt'){
					text = self._utils.dateformatStringToDate(text);
				}else if(key.substring(key.length - 3) == 'Cnt'){
					text = self._utils.numberWithCommas(text);
				}else if(key.substring(key.length - 6) == 'Amount'){
					text = self._utils.numberWithCommas(text);				
				}
			}
			$('.'+ keys[i], $obj).text(text);
		}
	}
	layerCustomerView = (cbfunc) => {
		const self = this;

		var divHtml = `<div class="mw_defalut" style="width:620px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">고객사 정보</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="height:225px;overflow-y:auto;padding:2px;">
		
						<div class="searchWrap" style="padding-bottom:10px;">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable">
								<caption></caption>
								<colgroup>
									<col width="80px">
									<col width="auto">
									<col width="80px">
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th class="ac" style="border-bottom:1px solid #aec8d7;">사업자번호</th>
										<td class="cuBizNo" style="padding-left:10px;"></td>
										<th class="ac" style="border-bottom:1px solid #aec8d7;">종사업장번호</th>
										<td class="cuBizNoNum" style="padding-left:10px;"></td>
									</tr>

									<tr>
										<th class="ac" style="border-bottom:1px solid #aec8d7;">회&nbsp;&nbsp;사&nbsp;&nbsp;명</th>
										<td class="cuNm" style="padding-left:10px;line-height: 0.9;"></td>
										<th class="ac">대&nbsp;&nbsp;표&nbsp;&nbsp;자</th>
										<td class="cuOwnerNm" style="padding-left:10px;"></td>
									</tr>
									<tr>
										<th class="ac" style="border-bottom:1px solid #aec8d7;">기업형태</th>
										<td class="cuTypeNm" style="padding-left:10px;" colspan="3"></td>
									</tr>
									<tr>
										<th class="ac" style="border-bottom:1px solid #aec8d7;">전화번호</th>
										<td class="cuTel" style="padding-left:10px;"></td>
										<th class="ac">F&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;X</th>
										<td class="cuFax" style="padding-left:10px;"></td>
									</tr>
									<tr>
										<th class="ac" style="border-bottom:1px solid #aec8d7;">주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</th>
										<td colspan="3" style="padding-left:10px;"><span class="cuZipcode"></span> &nbsp;&nbsp;<span class="cuAddr"></span>&nbsp;<span class="cuAddrDetail"></span></td>
									</tr>
									<tr>
										<th class="ac">비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고</th>
										<td colspan="3" style="padding-left:10px;"><pre class="cuMemo"></pre></td>
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


	layerCustomerViewEvent = (popupID, d) =>{
		const self = this;
		const layerObject = $(`#${popupID}`);
		if(d.orderNotice != undefined && d.orderNotice.length>0) d.orderNotice = d.orderNotice[0].onContent;
		$(`.title`, layerObject).text(d.cuNm);
		this.classNameInput(layerObject, d);
		$('.cuTel', layerObject).text(self._utils.formatPhoneNumber(d.cuTel));
		$('.cuFax', layerObject).text(self._utils.formatPhoneNumber(d.cuFax));
		$('.cuBizNo', layerObject).text(self._utils.convertBizNo(d.cuBizNo));

		//self._root._utils.unSerializeObjectReadOnly(layerObject, d);
	}

	storageMapView = (d) => {
		const self = this;
		if(d.inout == undefined){
			let mapData = {ctl : 'customer',cmd : 'storageLoad', isSeq: d.isSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': self._options.wapi,'spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					self.layerStorageMapView(function(data){
						self._root.openLayer(data, self.layerStorageMapViewEvent, rdata.data);
					});
				} else{
					alert(rdata.message);
				}
			});
		}else{
			self.layerStorageMapView(function(data){
				self._root.openLayer(data, self.layerStorageMapViewEvent, d);
			});
		}
	};

	layerStorageMapView = (cbfunc) => {
		const self = this;
		var divHtml = `<div class="mw_defalut" style="width:580px;height:680px;" id="">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title"></span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">

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
										<div class="ar"><a href="#" class="btnSearch btnPrint" title="인쇄하기"><i class="fas fa-print cursorPointer" style="margin:auto auto";></i>&nbsp;&nbsp;출력</a></div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
						
					<div style="overflow-y:auto;padding:2px;">
						<div class="searchWrap kakaoMap" style="width:100%; height:500px; border:3px solid #fff;">
							<div class="custom_zoomcontrol radius_border"></div>
						</div>
						<div class="searchWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 ">
								<caption></caption>
								<colgroup>
									<col width="60px">
									<col width="auto">
									<col width="60px">
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th class="txt_r">장소명 : </th>
										<td colspan="3" class="isNm" style="color:#555;font-size:15px;font-weight: 500;"></td>
									</tr>
									<tr>
										<th class="txt_r">주&nbsp;&nbsp;&nbsp;&nbsp;소 : </th>
										<td colspan="3" class="isAddress" style="color:#555;font-size:15px;font-weight: 500;"></td>
									</tr>
									<tr>
										<th class="txt_r">담당자 : </th>
										<td class="isChargeNm" style="color:#555;font-size:15px;font-weight: 500;"></td>
										<th class="txt_r">전화번호 : </th>
										<td class="isChargeTel" style="color:#555;font-size:15px;font-weight: 500;"></td>
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

	layerStorageMapViewEvent = (popupID, d) => {
		let self = this;
		let layerObject = $('#'+ popupID);
		let container = $('.kakaoMap',layerObject)[0];
		$('.title',layerObject).text(d.isNm);
		var options = {
			center: new kakao.maps.LatLng(d.gpsLatitude, d.gpsLongitude),
			level: 3
		};
		
		self._utils.classNameInput(layerObject, d);
		if(d.inout != undefined){
			$('.isAddress',layerObject).text(self._utils.ifnull(d[d.inout+'Addr']) + ' '+ self._utils.ifnull(d[d.inout+'AddrDetail']) );
			$('.isChargeNm',layerObject).text(self._utils.ifnull(d[d.inout+'InchargeNm']) );
			$('.isChargeTel',layerObject).text(self._utils.formatPhoneNumber(self._utils.ifnull(d[d.inout+'InchargeTel']) ));
		}

		let inChargeTel = $('.isChargeTel',layerObject).text();
		if(inChargeTel != '') $('.isChargeTel',layerObject).text(self._utils.formatPhoneNumber(inChargeTel));
		var map = new kakao.maps.Map(container, options);
		let positions = {
			//	title: d.isNm, 
				latlng: new kakao.maps.LatLng(d.gpsLatitude,d.gpsLongitude),
				content :'<div style="margin-top: -65px;background:#80dcf1;border: 1px solid #babbbb; padding: 2px;font-size:12px;font-weight: bold;"><span class="title">'+ d.isNm +'</span></div>'
		}

		var marker = new kakao.maps.Marker({
			map: map, // 마커를 표시할 지도
			position: positions.latlng, // 마커를 표시할 위치
			title : positions.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			
		});

		var customOverlay = new kakao.maps.CustomOverlay({
			map: map,
			position: positions.latlng,
			content : positions.content,
			yAnchor: 1 
		});
		
		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		$('.address',layerObject).val(d.isAddr + ' '+ d.AddrDetail);
		//$('.isInchargeNm',layerObject).val(d.isInchargeNm);
		//$('.isInchargeTel',layerObject).val(d.isInchargeTel);

		$('.btnPrint',layerObject).on('click',function(){
			let div = $(this).closest('.mw_defalut');
			let p = div.find(".mw_contents");
			parent.$.print(p,{
				addGlobalStyles: true,
				stylesheet: null,
				rejectWindow: true,
				noPrintSelector: ".no-print,.btnPrint",
				iframe: true,
				append: null,
				prepend: null,
				timeout: 1500,
			  });
/*
			$(div.find(".mw_contents")).parent.$.print({
				addGlobalStyles: true,
				stylesheet: null,
				rejectWindow: true,
				noPrintSelector: ".no-print,.btnPrint",
				iframe: true,
				append: null,
				prepend: null,
				timeout: 1500,
			  });
*/			  
		});

	}
}
export default CommonPop;