import CryptoJS from 'crypto-js'
import $ from 'jquery'
import Swal from 'sweetalert2'
import AjaxCall from './AjaxCall';

let Report = class {
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
		this._filter = {};
		this._pageUrl = 'workreport';
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

	workReportTypeB = (d ,cbfunc) => {
		const self = this;
		let html = `
		<page size="A4">
			<div class="printA4">
				<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
					<tr class="">
						<td style="width:100%;background-color:#fff;padding-top:20px;">
							<table class="" style="width:100%;height:70px;">
								<tr style="width:100%;background-color:#fff;">
									<td class="al workTitle" style="background-color:#fff;"><strong>작업지시서</strong></td>
									<td class="ar reportLogo" rowspan="2" style="vertical-align: top;"></td>
								</tr>
								<tr style="width:100%;background-color:#fff;">
									<td class="al orderDate" style="background-color:#fff;font-size: 20px;padding-top:20px;padding-bottom:5px;padding-left:5px;"></td>
								</tr>
							</table>
						</td>
					</tr>
					<tr class="">
						<td class="" style="background:#fff;">
							<table class="printInfo" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
								<colgroup>
									<col width="100px">
									<col width="auto">
									<col width="100px">
									<col width="auto">
									<col width="10px">
									<col width="180px">
								</colgroup>
								<tbody>
									<!-- tr>
										<th class="ac top" style="background:#dfdfdf;height: 30px !important;">승인일자</th>
										<td class="al top last orderDate" colspan="3" style="height: 30px !important;"></td>
										<td class="al noborder" rowspan="7"></td>
										<td class="al qr" rowspan="9"><div class="qrCode"></div></td>
									</tr>
									<tr>
										<td class="noborder" colspan="4" style="height:5px !important;padding:0px;"></td>
									</tr -->
									<tr>
										<th class="top" style="border-left:0px;border-top:1px solid #000;border-bottom:0px;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">거래처명</th>
										<td class="top last cuNm" colspan="3"style="border-left:1px solid #999;border-top:1px solid #000;border-bottom:0px;border-right:0px;padding-left:10px;"> </td>
										<td class="al noborder" rowspan="7"></td>
										<td class="al qr" rowspan="7"><div class="qrCode"></div></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #999;background:#eee;border-bottom:0px;border-right:0px;height: 30px !important;font-weight: normal;">품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</th>
										<td class="last oFileNm" colspan="3" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;padding-left:10px;"></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #999;border-bottom:0px;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</th>
										<td class="oPaperSize" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;padding-left:10px;"></td>
										<th style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">주문수량</th>
										<td class="last oCnt" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;padding-left:10px;"></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고</th>
										<td class="oMemo last" colspan="3" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;height: 30px !important;padding-left:10px;"></td>
									</tr>
									<tr>
										<td class="noborder" colspan="4" style="height:5px !important;padding:0px;"></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #000;border-bottom:0px;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">입&nbsp;&nbsp;고</th>
										<td style="border-left:1px solid #999;border-top:1px solid #000;border-bottom:0px;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">장소 : <span class="istInNm" style="color:#000;font-size:14px;"></span></td>
										<td colspan="2" style="border-left:1px solid #999;border-top:1px solid #000;border-bottom:0px;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">요청일 : <span class="istInHopeDt" style="color:#000;font-size:14px;"></span></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">출&nbsp;&nbsp;고</th>
										<td style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">장소 : <span class="istOutNm" style="color:#000;font-size:14px;"></span></td>
										<td colspan="2" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">요청일 : <span class="istOutHopeDt" style="color:#000;font-size:14px;"></span></td>

									</tr>
									
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td style="padding-top:10px;background:#fff;">
							<table class="printList" style="width:100%;border-top:1px solid #000 !important;border-bottom:1px solid #000;">
								<colgroup>
									<col width="40px"><!-- 순서 -->
									<col width="70px"><!-- 공정 -->
									<col width="50px"><!-- 면 -->
									<col width="100px"><!-- 작업명 -->
									<col width="auto"><!-- 세부사항 -->
									<col width="150px"><!-- 비고 -->
								</colgroup>
								<thead>
									<tr>
										<th style="background:#eee;border-bottom:1px solid #999;">순서</th>
										<th style="background:#eee;border-bottom:1px solid #999;">공정명</th>
										<th style="background:#eee;border-bottom:1px solid #999;">면</th>
										<th style="background:#eee;border-bottom:1px solid #999;">작업명</th>
										<th style="background:#eee;border-bottom:1px solid #999;">세부사항</th>
										<th style="background:#eee;border-bottom:1px solid #999;" class="last">비고</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first"></th>
										<td class="ac"></td>
										<td class="ac"></td>
										<td class="al" style="padding-left:5px;"></td>
										<td class="al textLineHeight19px"></td>
										<td class="al last textLineHeight19px"></td>
									</tr>
									<tr>
										<td class="ac first bottom"></th>
										<td class="ac bottom"></td>
										<td class="ac bottom"></td>
										<td class="al bottom" style="padding-left:5px;"></td>
										<td class="al bottom textLineHeight19px"></td>
										<td class="al last bottom textLineHeight19px"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr style="background:#fff;">
						<td style="padding-top:20px;padding-bottom:13px;background-color:#fff;">
							<table class="" style="width:100%;">
							<colgroup>
								<col width="50px">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<td class="ar" style="font-size:20px;font-weight:bold;line-height:1.2; border-right:1px solid #999;padding-right:5px;vertical-align: top;background:#fff;">공정<BR/>보기</td>
									<td class="al" style="padding-left:5px; background:#fff;">
										<table cellpadding="0" cellspacing="0" border="0" class="" style="margin-top:-5px;">
											<tr class="processFlow">
												<td style="background:#fff;">
													<table class="printInfo" style="width:78px;">
														<tbody>
														<tr><th class="top last">공정명</td></tr>
														<tr><td class="top last" ㄴ>업체명</td></tr>
														</tbody>
													</table>
												</td>
												<td style="font-size:10px;padding:3px;font-stretch:extra-condensed">▶</td>
												<td><table class="printInfo" style="width:80px;">
														<tbody>
														<tr><th class="top last">공정명</td></tr>
														<tr><td class="top last">업체명</td></tr>
														</tbody>
														</table>
												</td>
												<td style="font-size:10px;padding:3px;font-stretch:extra-condensed">▶</td>
												<td>
													<table class="printInfo" style="width:78px;">
													<tbody>
													<tr><th class="top last">공정명</td></tr>
													<tr><td class="top last">업체명</td></tr>
													</tbody>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr class="deliveryLine" style="background:#fff;">
						<td style="background-color:#fff;height:10px;"><hr style="border:none;border-top:2px dotted #000;color:#fff;height:1px;width:100%;">
						</td>
					</tr>
					<tr class="deliveryArea" style="background:#fff;">
						<td  style="padding-top:10px;background-color:#fff;">
							<table class="" style="width:100%;">
								<colgroup>
									<col width="50%">
									<col width="50%">
									<col width="160px">
								</colgroup>
								<tbody>
									<tr>
										<td class="al" colspan="2" style="font-size:25px;font-weight:bold;">물류<span style="font-size:20px">(입고,출고)</span></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr style="background:#fff;">
						<td class="deliveryArea2" style="background-color:#fff;">
							<table class="printInfo" style="width:100%;">
								<colgroup>
									<col width="120px">
									<col width="auto">
									<col width="120px">
									<col width="auto">
									<col width="10px">
									<col width="150px">
								</colgroup>
								<tbody>
									<!-- tr>
										<th class="top" style="background:#dfdfdf;height: 30px !important;">승인일자</th>
										<td class="top last orderDate" colspan="3"></td>
										<td class="noborder" rowspan="9"></td>
										<td class="noborder qr" rowspan="5"><div class="qrCode2"></td>
									</tr>
									<tr>
										<td class="noborder" colspan="4" style="height:5px !important;padding:0px;"></td>
									</tr -->
									<tr>
										<td class="ar" colspan="4" style="background-color:#fff;font-size:13px;font-weight:bold;padding:0px;padding-bottom:5px;height:15px;border:0px;">20 &nbsp;&nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; .&nbsp;&nbsp;( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</td>
										<td class="noborder" rowspan="7"></td>
										<td class="noborder ar" rowspan="4"><div class="qrCode2"></div></td>
									</tr>
									<tr>
										<th class="top" style="border-left:0px;border-top:1px solid #000;border-bottom:0px;border-right:1px solid #999;background:#eee;height: 30px !important;font-weight: normal;">거래처명</th>
										<td class="top last cuNm" colspan="3" style="border-left:1px solid #999;border-top:1px solid #000;border-bottom:0px;border-right:0px;"></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #999;border-bottom:0px;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</th>
										<td class="last oFileNm" colspan="3" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;"></td>
									</tr>
									<tr>
										<th style="border-left:0px;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</th>
										<td class="oPaperSize" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;"></td>
										<th style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량</th>
										<td class="last oCnt" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;"></td>
									</tr>
									<tr>
										<td class="noborder" colspan="5" style="height:5px !important;padding:0px;"></td>
										<td class="noborder" style="height:5px !important;padding:0px;"></td>
									</tr>
									<tr>
										<th class="top" style="border-left:0px;border-top:1px solid #000;border-bottom:0px;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">* 입 고</th>
										<td class="top" colspan="2" style="border-left:1px solid #999;border-top:1px solid #000;border-bottom:0px;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">장소 <span class="istInNm" style="color:#000;font-size:14px;"></span></td>
										<td class="top last" style="border-left:1px solid #999;border-top:1px solid #000;border-bottom:0px;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">전화번호 <span class="istInInchargeTel" style="color:#000;font-size:14px;"></span></td>
										<th class="top last" style="border-left:1px solid #000;border-top:1px solid #000;border-bottom:0px;border-right:1px solid #000;background:#eee;height: 30px !important;font-weight: normal;">납품확인</th>
									</tr>
									<tr>
										<th rowspan="2" style="border-left:0px;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;background:#eee;height: 30px !important;font-weight: normal;">* 출 고</th>
										<td colspan="2" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">장소 <span class="istOutNm" style="color:#000;font-size:14px;"></span></td>
										<td class="last" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:0px;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">전화번호 <span class="istOutInchargeTel" style="color:#000;font-size:14px;"></span></td>
										<td class="last" rowspan="2" style="border-left:1px solid #000;border-top:1px solid #999;border-bottom:1px solid #000;border-right:1px solid #000:#aaa;font-size:10px;height: 30px !important;">담당자명 <span style="float: right;">(인)</span></td>
									</tr>			
									<tr>
										<td class="last" colspan="3" style="border-left:1px solid #999;border-top:1px solid #999;border-bottom:1px solid #000;border-right:0px;color:#aaa;font-size:10px;height: 30px !important;">주소 <span class="istOutAddress" style="color:#000;font-size:14px;"></span></td>
									</tr>								
								</tbody>
							</table>
						</td>
					</tr>
					<tr style="background:#fff;">
						<td style="background-color:#fff;">
							<table class="" style="width:100%;">
								<colgroup>
									<col width="400px">
									<col width="auto">
								</colgroup>
								<tbody>
									<tr style="background:#fff;">
										<td style="padding-top:5px;background:#fff;">
											<span class="cNm" style="font-weight:bold; font-size:10px;">sfsfsfdsfs</span>
											<span class="cTel" style="margin-left:5px;font-size:10px;"></span>
											<span class="cAddress" style="margin-left:5px; font-size:10px;"></span>
											<span class="cHomepage" style="margin-left:5px; font-size:10px;">homepage</span>
										</td>
										<td style="padding-top:5px;background:#fff;"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</table>
		</div></page>`;	


		
		let printWrap = $("#printWrap");
		printWrap.empty();
		printWrap.append($(html));
		//console.log(html);
		let printA4 = printWrap.find(".printA4");
		let $processFlow = printWrap.find(".processFlow");
		$processFlow.empty();
		let cWorkReport = d.cWorkReport;
		
/*		
		$('.cNm',printWrap).text(self._const.__C_NM);
		if(self._const.__C_TEL != undefined && self._const.__C_TEL != '') $('.cTel',printWrap).text(self._root._utils.formatPhoneNumber(self._const.__C_TEL));
		$('.cAddress',printWrap).text(self._const.__C_ADDRESS);
		$('.reportTitle',printWrap).append($('<pre>'+self._const.__C_REPORT_TITLE+'<pre>'));
		
		https://kprintfactory.s3.ap-northeast-2.amazonaws.com/8/3EECF99F05534060982C7AD2C28F4348.png
*/		
		let mapData = {ctl : 'order',cmd : 'load',oSeq : d.oSeq,};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api2.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let info = rdata.data;
						$('.orderNum',printWrap).text(self._root._utils.formatdate(info.creDate,'') +''+ self._root._utils._zeroFill(info.oSeq,7));
						//$('.orderDate',printWrap).text(self._utils.formatdate(info.creDate));
						if(self._root._utils.checkEmptyNull(info.oApprovalDate)){
							$('.orderDate',printWrap).text('미승인');
						}else{
							$('.orderDate',printWrap).text(info.oApprovalDate.substring(0,10));
						}
						
						$('.cuNm',printWrap).text(info.cuNm);
						$('.oFileNm',printWrap).text(info.oFileNm);
						if(info.istInCd == 'A') {
							let istInNm = '직입';
							if(!self._root._utils.checkEmptyNull(info.istInNm)){
								istInNm += ' ('+ info.istInNm +')';
							}
							$('.istInNm',printWrap).text(istInNm);
						}else{
							$('.istInNm',printWrap).text(info.istInNm);
						}
						if(info.istOutCd == 'A') {
							let istOutNm = '직출';
							if(!self._root._utils.checkEmptyNull(info.istOutNm)){
								istOutNm += ' ('+ info.istOutNm +')';
							}
							$('.istOutNm',printWrap).text(istOutNm);
						}else{
							$('.istOutNm',printWrap).text(info.istOutNm);
						}
						let istInHopeDt = (self._root._utils.checkEmptyNull(info.istInHopeDt)) ? '':self._root._utils.dateformatStringToDate(info.istInHopeDt);
						if(!self._root._utils.checkEmptyNull(info.istInMemo)) istInHopeDt += '('+ info.istInMemo +')';
						let istOutHopeDt = (self._root._utils.checkEmptyNull(info.istOutHopeDt)) ? '':self._root._utils.dateformatStringToDate(info.istOutHopeDt);
						if(!self._root._utils.checkEmptyNull(info.istOutMemo)) istOutHopeDt += '('+ info.istOutMemo +')';
						$('.istInHopeDt',printWrap).text(istInHopeDt);
						$('.istOutHopeDt',printWrap).text(istOutHopeDt);
						let istInInchargeTel = (self._root._utils.checkEmptyNull(info.istInInchargeTel)) ? '':self._root._utils.formatPhoneNumber(info.istInInchargeTel);
						let istOutInchargeTel = (self._root._utils.checkEmptyNull(info.istOutInchargeTel)) ? '':self._root._utils.formatPhoneNumber(info.istOutInchargeTel);
						let istOutAddress = (self._root._utils.checkEmptyNull(info.isOutAddr)) ? '':info.isOutAddr + ' '+ info.isOutAddrDetail; 
						$('.istInInchargeTel',printWrap).text(istInInchargeTel);
						$('.istOutInchargeTel',printWrap).text(istOutInchargeTel);
						$('.istOutAddress',printWrap).text(istOutAddress);

						//$('.istOutNm',printWrap).text(info.istOutNm);
						$('.oCnt',printWrap).text(self._root._utils.numberWithCommas(info.oCnt));
						$('.oPaperSize',printWrap).text(info.oPaperSize);
						$('.oMemo',printWrap).text(self._root._utils.strMaxCuttion(info.oMemo,25));

						if(cWorkReport == 'C'){
							for(let t=0;t<9;t++){
								$('.printList tbody',printWrap).prepend('<tr><td class="ac first"></th><td class="al"></td><td class="al"></td><td class="ac"></td><td class="al textLineHeight19px"></td><td class="al last"></td></tr>');
							}
						}
						let $trs = $('.printList tbody tr',printWrap);
						let workFlow = [];
						for(let i=0;i<info.workInfo.length;i++){
							if($trs.length <= i) break;  // 11건 이상이면 버림
							let $tr = $($trs[i]);
							let d = info.workInfo[i];
							let options = '';
							for(let o=0;o<d.optionInfo.length;o++) {
								let od = d.optionInfo[o];
								if(od.cwoOrderYn == 'Y'){
									if(od.woInput != undefined && od.woInput != ''){
										//options += ((options!='')?', ':'') + od.cwoNm + '('+ od.woInput +')' ;
										options += '<span class="workOptionListOne vm"><strong class="workOptionInfo" style="font-size:15px;">'+ od.cwoNm + ' : <span style="font-weight: bold;">'+ od.woInput +'</span></strong></span>'
									}
								}
							}
							$($tr.children()[0]).text(i+1);
							$($tr.children()[1]).text(d.spNm);
							$($tr.children()[2]).text(d.wFrontYnNm);
							if(!self._root._utils.checkEmptyNull(d.wInfo)){
								$($tr.children()[3]).text(d.wNm +' ('+ d.wInfo +')');
							}else{
								$($tr.children()[3]).text(d.wNm);
							}	
							$($tr.children()[4]).append(options); //.addClass('lineHeight19px');
							$($tr.children()[5]).text(d.wMemo);

							let cuNm = undefined;
							if(d.wOutsourcingYn == 'Y'){
								if(d.wOutsourcingInfo.length == 1){
									cuNm = d.wOutsourcingInfo[0].cuNm;
								}else if(d.wOutsourcingInfo.length > 1){
									cuNm = d.wOutsourcingInfo.length + '개 업체';
								}
							}
							if(i == 0){
								workFlow.push({spNm : d.spNm, cuNm : cuNm});
							}else{
								if(workFlow[workFlow.length-1].spNm != d.spNm){
									workFlow.push({spNm : d.spNm, cuNm : cuNm});
								}
							}
						}

						self._root._utils.tbodyOnlyMerge($('.printList tbody',printWrap),[1],"spSeq", false);
						for(let i=0;i<workFlow.length;i++){
							let d = workFlow[i];
							let $table = $('<table class="printInfo" style="width:78px;"/>').append("<tbody/>");
							$table.append($("<tr/>").append($('<th class="top last"  style="border-bottom:0px;background:#eee;font-weight: normal;border:1px solid #999;"/>').append(d.spNm)));
							$table.append($("<tr/>").append($('<td class="last ac" style="border-top:0px;height:35px;font-size:12px; padding: 0px 2px; border:1px solid #999;" />').append((d.cuNm==undefined)?'자사': d.cuNm)));
							$processFlow.append($('<td  style="background:#fff;"/>').append($table));
							$processFlow.append('<td style="font-size:10px;padding:3px;font-stretch:extra-condensed">▶</td>');
						}
						if(workFlow.length < 8)	$processFlow.append('<td style="background:#fff;"><table class="printInfo" style="width:78px;"><tbody><tr><th class="top last" style="border-bottom:0px;border:1px solid #999;font-weight: normal;background:#eee">출고</td></tr><tr><td class="ac last" style="height:35px;font-size:12px;border-top:0px;border:1px solid #999;">'+ ((self._root._utils.checkEmptyNull(info.istOutNm))?'':info.istOutNm)+'</td></tr></tbody></table></td>');

						let param =  self._root._utils.encryptData('oSeq='+ info.oSeq);
						param = encodeURI(param);
						//let qrData = document.location.host +'/'+self._pageUrl+'?oSeq='+ info.oSeq;
						let qrData = document.location.host +'/'+self._pageUrl+'?p='+ param;
						console.log(qrData);
						const qrcode1 = $('.qrCode',printWrap)[0];
						const qrcode2 = $('.qrCode2',printWrap)[0];
						new QRCode.toCanvas(qrData, { width: 170,margin:1 }, function (error, canvas) {
							if (error) console.error(error);
							let qrData1 = canvas.toDataURL();
							qrcode1.appendChild(canvas);
							$(qrcode1).empty()
							$(qrcode1).append($('<img src=""/>').attr("src", qrData1));
						});


						
						new QRCode.toCanvas(qrData, { width: 95,margin:1 }, function (error, canvas) {
							if (error) console.error(error);
							let qrData2 = canvas.toDataURL();
							qrcode2.appendChild(canvas);
							$(qrcode2).empty()
							$(qrcode2).append($('<img src=""/>').attr("src", qrData2));
						});

						if(cWorkReport == 'C'){
							$('.deliveryLine',printWrap).remove();
							$('.deliveryArea',printWrap).remove();
							$('.deliveryArea2',printWrap).empty().css('border-bottom','1px solid #000');
						}

						cbfunc();
/*
						$(printA4).print({
							addGlobalStyles: true,
							stylesheet: null,
							rejectWindow: true,
							noPrintSelector: ".no-print",
							iframe: true,
							append: null,
							prepend: null,
							timeout: 1500,
						  });
*/
					} else {
						alert(rdata.message);
					}
				});
	

	}
	workReportTypeA = (d ,cbfunc) => {
		const self = this;
		let html = `
		<page size="A4">
			<div class="printA4">
				<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
					<tr class="">
						<td style="width:100%;background-color:#fff;padding-bottom:5px;">
							<table class="" style="width:100%;height:80px;">
								<colgroup>
									<col width="75%">
									<col width="25%">
								</colgroup>
								<tbody>							
									<tr style="width:100%;background-color:#fff;">
										<td class="al workTitle" style="background-color:#fff;"><strong>작업지시서</strong><span class="orderYear" style="font-size:18px; font-weight: normal; margin-left:10px;"></span><strong class="orderMonthDay" style="font-size:16px;margin-left:5px;"></strong></td>
										<td class="ar reportLogo" rowspan="2" style="vertical-align: top;"></td>
									</tr>
									<tr style="width:100%;background-color:#fff;">
										<td class="al processFlow" colsapn="3" style="background-color:#fff;"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr class="">
						<td class="" style="background:#fff;">
							<table class="workReportTitie" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
								<colgroup>
									<col width="12%">
									<col width="auto">
									<col width="18%">
								</colgroup>
								<tbody>
									<tr>
										<th class="ac top" style="height:60px;font-size: 18px; font-weight: bold;background-color:#ddd; border-top : 0px;border-bottom : 0px;border-left : 1px solid #000;border-right : 1px solid #000;">품명</th>
										<td class="al noborder oFileNm" style="background-color:#fff;padding-left:10px;padding-right:10px;font-weight: bold;font-size: 18px;">한권으로 끝내는 해커스토익700+(LC+RC+VOCA)(2판6쇄1회차)중철(7-75)1회차)중철(7-75)</td>
										<td class="ac noborder cuNm" style="padding-left:10px;padding-right:10px;background-color:#fff;font-size: 17px;border-left : 1px solid #000 !important;border-right : 1px solid #000 !important;;">삼보아트</td>
									</tr>
								</tbody>
							</table>
							<table class="" style="width:100%;margin-top:10px;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
								<colgroup>
									<col width="41%">
									<col width="41%">
									<col width="18%">
								</colgroup>
								<tbody>
									<tr>
										<td class="" style="height:110px;padding-left:0px;padding-right:5px;padding-bottom:5px;background: #fff;">
											<table cellpadding="0" cellspacing="0" class="tr_nohover " style="width:100%;border-radius: 3px;border-collapse: collapse;border-style: hidden;box-shadow: 0 0 0 1px #000;">
												<colgroup>
													<col width="30%">
													<col width="25%">
													<col width="45%">
												</colgroup>
												<tbody>
													<tr style="height:26px;background: #fff;">
														<th class="ac" style="background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1; border-top-left-radius: 3px;font-size:15px;font-weight: bold;">규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</th>
														<td class="ac oPaperSize" colspan="2" style="background: #fff;border-bottom:1px solid #c1c1c1;border-top-right-radius: 3px;font-size:15px;"></td>
													</tr>
													<tr style="height:52px;background: #fff;">
														<th class="ac" style="background:#ddd;border-bottom:1px solid #c1c1c1000;border-right:1px solid #c1c1c1;font-size:15px;font-weight: bold;">주문수량</th>
														<td class="ac oCnt" colspan="2" style="background: #fff;border-bottom:1px solid #c1c1c1;font-size:18px;font-weight: bold;"></td>
													</tr>
													<tr style="height:26px;background: #fff;">
														<th class="ac" style="background:#ddd;border-right:1px solid #c1c1c1;font-size:15px;font-weight: bold;border-bottom-left-radius: 3px;">제작담당</th>
														<td class="ac oInchargeNm" style="background: #fff;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:15px;"></td>
														<td class="ac oInchargeTel" style="background: #fff;border-bottom:1px solid #c1c1c1;border-radius: 3px;font-size:15px;"></td>
													</tr>
												</tbody>
											</table>
										</td>
										<td style="height:110px;padding-left:5px;padding-right:1px;padding-bottom:5px;background:#fff;">
											<table cellpadding="0" cellspacing="0" border="0" class="tr_nohover " style="width:100%;border-radius: 3px;border-collapse: collapse;border-style: hidden;box-shadow: 0 0 0 1px #000;">
												<colgroup>
													<col width="20%">
													<col width="20%">
													<col width="60%">
												</colgroup>
												<tbody>
													<tr style="height:26px;background: #fff;">
														<th class="ac" rowspan="2" style="font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-top-left-radius: 3px;">입고</th>
														<th class="ac" style="font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">장소</th>
														<td class="ac istInNm" style="background: #fff;border-radius: 3px;border-bottom:1px solid #c1c1c1;font-size:15px;"></td>
													</tr>
													<tr style="height:26px;background: #fff;">
														<th class="ac" style="font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">일자</th>
														<td class="ac istInHopeDt" style="font-size:15px;background: #fff;border-bottom:1px solid #c1c1c1;"></td>
													</tr>
													<tr style="height:26px;background: #fff;">
														<th class="ac" rowspan="2" style="font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-bottom-left-radius: 3px;">출고</th>
														<th class="ac" style="font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">장소</th>
														<td class="ac istInNm" style="font-size:15px;background: #fff;border-bottom:1px solid #c1c1c1;border-radius: 5px;"></td>
													</tr>
													<tr style="height:26px;background: #fff;">
														<th class="ac" style="font-size:15px;font-weight: bold;background:#ddd;border-right:1px solid #c1c1c1;">일자</th>
														<td class="ac istOutHopeDt" style="font-size:15px;background: #fff;border-radius: 3px;"></td>
													</tr>
												</tbody>
											</table>										
										</td>
										<td class="al qr" style="height:110px;background: #fff;padding-bottom:5px;"><div class="qrCode f_rt"></div></td>
									</tr>
									<tr>
										<td class="noborder" colspan="3" style="height:5px;padding-top:5px;padding-bottom:5px;padding-left:0px;padding-right:1px;background: #fff;">
											<table class="" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mt10 " style="width:100%;border-radius: 3px;border-collapse: collapse;border-style: hidden;box-shadow: 0 0 0 1px #000;">
												<colgroup>
													<col width="7%">
													<col width="auto">
												</colgroup>
												<tbody>
													<tr style="height:40px;background: #fff;">
														<td class="ar" rowspan="2" style="background: #fff;font-size:13px;font-weight: bold;border-radius: 3px;">비고 |</td>
														<td class="al oMemo" style="border-radius: 3px;background: #fff;"></td>
													</tr>
												</tbody>
											</table>	
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td class="workDetailArea" style="height: 695px;padding-top:10px;background:#fff;vertical-align: top;">
							<table class="workTableTypeA mb10" style="width:100%;">
								<colgroup>
									<col width="12%"><!-- 공정 및 작업 -->
									<col width="5%">
									<col width="auto">
									<col width="auto">
									<col width="auto">
								</colgroup>
								<tbody>
									<tr class="workInfo" style="height:26px;">
										<th class="ac spNm" style="background:#000;color:#fff;font-size:15px;font-weight:bold;border-top:1px solid #c1c1c1;">인쇄</th>
										<th class="al wOutsourcingNm" colspan="2" style="font-size:14px;font-weight:bold;padding-left:5px;background:#ddd;border-top:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">외주사명</th>
										<th class="al last" colspan="2" style="font-size:13px;font-weight:bold;background:#eee;border-top:1px solid #c1c1c1;border-right:1px solid #c1c1c1;padding-left:10px;"> ※ <span class="wMemo">전달사항</sapn></th>
									</tr>
									<tr class="workDetail" style="height:26px;">
										<td class="ac wNm rowspan" rowspan="1" style="font-size:14px;background:#fff;border-top:1px solid #c1c1c1;"></th>
										<td class="ac wFrontYnNm rowspan" rowspan="1" style="font-size:14px;font-weight:bold;background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
										<td class="al option" style="background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
										<td class="al option" style="background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
										<td class="al option" style="background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr class="deliveryLine" style="background:#fff;">
						<td style="background-color:#fff;height:5px;padding-bottom:5px;"><hr style="border:none;border-top:2px dotted #ccc;color:#fff;height:1px;width:100%;">
						</td>
					</tr>
					<tr style="background:#fff;">
						<td class="deliveryArea" style="padding-top:0px;background-color:#fff;">
							<table class="" style="width:100%;margin-bottom:5px;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover">
								<colgroup>
									<col width="7%">
									<col width="auto">
									<col width="20%">
									<col width="18%">
								</colgroup>
								<tbody>
									<tr style="height:40px;">
										<th class="ac top" style="background:#000;color:#fff;font-size:16px;font-weight:bold;">품명</th>
										<td class="al oFileNm" style="background: #fff;padding-left:10px;font-size:15px;font-weight:bold;">한권으로 끝내는 해커스토익700+(LC+RC+VOCA)(2판6쇄1회차)중철(7-75)1회차)중철(7-75)</td>
										<td class="ac cuNm" style="background: #fff;border-left:1px solid #000;border-right:1px solid #000;font-size:15px;font-weight:bold;">삼보아트</td>
										<td class="ac " style="background: #fff;"></td>
									</tr>
								</tbody>
							</table>
							<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mt10 ">
								<colgroup>
									<col width="41%">
									<col width="41%">
									<col width="18%">
								</colgroup>
								<tbody>
									<tr>
										<td class="" style="padding-left:0px;padding-right:5px;background: #fff;">
											<table class="" cellpadding="0" cellspacing="0" class="noBdrTb tr_nohover mt10 " style="width:100%;border-radius: 3px;border-collapse: collapse;border-style: hidden;box-shadow: 0 0 0 1px #000;">
												<colgroup>
													<col width="30%">
													<col width="25%">
													<col width="45%">
												</colgroup>
												<tbody>
													<tr style="height:21px;background: #fff;">
														<th class="ac" style="background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1; border-top-left-radius: 3px;font-size:14px;font-weight: bold;">거래처명</th>
														<td class="ac cuNm" colspan="2" style="background: #fff;border-bottom:1px solid #c1c1c1;border-top-right-radius: 3px;font-size:14px;"></td>
													</tr>
													<tr style="height:21px;background: #fff;">
														<th class="ac" style="background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:14px;font-weight: bold;">규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</th>
														<td class="ac oPaperSize" colspan="2" style="background: #fff;border-bottom:1px solid #c1c1c1;font-size:14px;"></td>
													</tr>
													<tr style="height:21px;background: #fff;">
														<th class="ac" style="background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:14px;font-weight: bold;">주문수량</th>
														<td class="ac oCnt" colspan="2" style="background: #fff;border-bottom:1px solid #c1c1c1;font-size:14px;"></td>
													</tr>
													<tr style="height:21px;background: #fff;">
														<th class="ac" style="background:#ddd;border-right:1px solid #c1c1c1;font-size:14px;font-weight: bold;border-bottom-left-radius: 3px;">제작담당</th>
														<td class="ac oInchargeNm" style="background: #fff;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:14px;"></td>
														<td class="ac oInchargeTel" style="background: #fff;border-bottom:1px solid #c1c1c1;border-radius: 3px;font-size:14px;"></td>
													</tr>
												</tbody>
											</table>
										</td>
										<td style="padding:5px;background: #fff;">
											<table class="" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10" style="width:100%;border-radius: 3px;border-collapse: collapse;border-style: hidden;box-shadow: 0 0 0 1px #000;">
												<colgroup>
													<col width="20%">
													<col width="20%">
													<col width="60%">
												</colgroup>
												<tbody>
													<tr style="height:21px;background: #fff;">
														<th class="ac" rowspan="2" style="font-size:14px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-top-left-radius: 3px;">입고</th>
														<th class="ac" style="font-size:14px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">장소</th>
														<td class="ac istInNm" style="font-size:14px;background: #fff;border-radius: 3px;border-bottom:1px solid #c1c1c1;"></td>
													</tr>
													<tr style="height:21px;background: #fff;">
														<th class="ac" style="font-size:14px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">일자</th>
														<td class="ac istInHopeDt" style="font-size:14px;background: #fff;border-bottom:1px solid #c1c1c1;"></td>
													</tr>
													<tr style="height:21px;background: #fff;">
														<th class="ac" rowspan="2" style="font-size:14px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-bottom-left-radius: 3px;">출고</th>
														<th class="ac" style="font-size:14px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;">장소</th>
														<td class="ac istOutNm" style="font-size:14px;background: #fff;border-bottom:1px solid #c1c1c1;border-radius: 5px;"></td>
													</tr>
													<tr style="height:21px;background: #fff;">
														<th class="ac" style="font-size:14px;font-weight: bold;background:#ddd;border-right:1px solid #c1c1c1;">일자</th>
														<td class="ac istOutHopeDt" style="font-size:14px;background: #fff;border-radius: 3px;"></td>
													</tr>
												</tbody>
											</table>										
										</td>
										<td class="ar qr" style="background: #fff;"><div class="qrCode2 f_rt"></div></td>
									</tr>
									
								</tbody>
							</table>
						</td>
					</tr>
				</table>
		</div></page>`;	


		
		let printWrap = $("#printWrap");
		printWrap.empty();
		printWrap.append($(html));
		let printA4 = printWrap.find(".printA4");
		let $processFlow = printWrap.find(".processFlow");
		$processFlow.empty();
		let cWorkReport = d.cWorkReport;
		
/*		
		$('.cNm',printWrap).text(self._const.__C_NM);
		if(self._const.__C_TEL != undefined && self._const.__C_TEL != '') $('.cTel',printWrap).text(self._root._utils.formatPhoneNumber(self._const.__C_TEL));
		$('.cAddress',printWrap).text(self._const.__C_ADDRESS);
		$('.reportTitle',printWrap).append($('<pre>'+self._const.__C_REPORT_TITLE+'<pre>'));
		
		https://kprintfactory.s3.ap-northeast-2.amazonaws.com/8/3EECF99F05534060982C7AD2C28F4348.png
*/		
		let mapData = {ctl : 'order',cmd : 'load',oSeq : d.oSeq,};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api2.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let info = rdata.data;
						$('.orderNum',printWrap).text(self._root._utils.formatdate(info.creDate,'') +''+ self._root._utils._zeroFill(info.oSeq,7));
						//$('.orderDate',printWrap).text(self._utils.formatdate(info.creDate));
						//$('.orderDate',printWrap).text(info.creDate.substring(0,16));
						if(self._root._utils.checkEmptyNull(info.oApprovalDate)){
							$('.orderYear',printWrap).text('미승인');
						}else{
							$('.orderYear',printWrap).text(info.oApprovalDate.substring(0,4));
							$('.orderMonthDay',printWrap).text(info.oApprovalDate.substring(5,10).replace('-','.'));
						}


						
						$('.cuNm',printWrap).text(info.cuNm);
						$('.oFileNm',printWrap).text(info.oFileNm);
						if(info.istInCd == 'A') {
							let istInNm = '직입';
							if(!self._root._utils.checkEmptyNull(info.istInNm)){
								istInNm += ' ('+ info.istInNm +')';
							}
							$('.istInNm',printWrap).text(istInNm);
						}else{
							$('.istInNm',printWrap).text(info.istInNm);
						}
						if(info.istOutCd == 'A') {
							let istOutNm = '직출';
							if(!self._root._utils.checkEmptyNull(info.istOutNm)){
								istOutNm += ' ('+ info.istOutNm +')';
							}
							$('.istOutNm',printWrap).text(istOutNm);
						}else{
							$('.istOutNm',printWrap).text(info.istOutNm);
						}
						//$('.istInNm',printWrap).text(info.istInNm);
						//$('.istOutNm',printWrap).text(info.istOutNm);
						let istInHopeDt = (self._root._utils.checkEmptyNull(info.istInHopeDt)) ? '':self._root._utils.dateformatStringToDate(info.istInHopeDt);
						if(!self._root._utils.checkEmptyNull(info.istInMemo)) istInHopeDt += '('+ info.istInMemo +')';
						let istOutHopeDt = (self._root._utils.checkEmptyNull(info.istOutHopeDt)) ? '':self._root._utils.dateformatStringToDate(info.istOutHopeDt);
						if(!self._root._utils.checkEmptyNull(info.istOutMemo)) istOutHopeDt += '('+ info.istOutMemo +')';
						$('.istInHopeDt',printWrap).text(istInHopeDt);
						$('.istOutHopeDt',printWrap).text(istOutHopeDt);

						let istInInchargeTel = (self._root._utils.checkEmptyNull(info.istInInchargeTel)) ? '':self._root._utils.formatPhoneNumber(info.istInInchargeTel);
						let istOutInchargeTel = (self._root._utils.checkEmptyNull(info.istOutInchargeTel)) ? '':self._root._utils.formatPhoneNumber(info.istOutInchargeTel);
						let istOutAddress = (self._root._utils.checkEmptyNull(info.isOutAddr)) ? '':info.isOutAddr + ' '+ info.isOutAddrDetail; 
						$('.istInInchargeTel',printWrap).text(istInInchargeTel);
						$('.istOutInchargeTel',printWrap).text(istOutInchargeTel);
						$('.istOutAddress',printWrap).text(istOutAddress);

						$('.oCnt',printWrap).text(self._root._utils.numberWithCommas(info.oCnt));
						$('.oPaperSize',printWrap).text(info.oPaperSize);
						$('.oMemo',printWrap).text(self._root._utils.strMaxCuttion(info.oMemo,25));


						let $workDetailArea = $('.workDetailArea',printWrap);
						let $workTableOrg = $('.workTableTypeA',$workDetailArea).clone();
						let $workInfoOrg = $('.workInfo', $workTableOrg).clone();
						let $workDetailOrg = $('.workDetail',$workTableOrg).clone();
						$('tbody',$workTableOrg).empty();
						$('.workTableTypeA',$workDetailArea).remove();




						let processFlow = [];
						let workPre = {};
						let $workTablePre;
						for(let i=0;i<info.workInfo.length;i++){
							let work = info.workInfo[i];
							if(processFlow.indexOf(work.spNm) == -1){
								processFlow.push(work.spNm);
							}

							let $workTable;
							if(workPre.wSeq == undefined || workPre.spSeq != work.spSeq || workPre.wOutsourcingYn != work.wOutsourcingYn) {
								$workTable = $workTableOrg.clone(); 
								let $workInfo = $workInfoOrg.clone();
								self._root._utils.classNameInput($workInfo, work);
								let outsourcingCuNm = '자사';
								if(work.wOutsourcingYn == 'Y'){
									if(work.wOutsourcingInfo.length == 1){
										outsourcingCuNm = work.wOutsourcingInfo[0].cuNm;
									}else if(work.wOutsourcingInfo.length == 2){
										outsourcingCuNm = work.wOutsourcingInfo[0].cuNm + ', '+ work.wOutsourcingInfo[1].cuNm;
									}else if(work.wOutsourcingInfo.length > 2){
										outsourcingCuNm = work.wOutsourcingInfo[0].cuNm +' 외 '+ work.wOutsourcingInfo.length +'개 업체';
									}
								}
								$('.wOutsourcingNm', $workInfo).text(outsourcingCuNm);
								$('tbody',$workTable).append($workInfo);
							}else{
								if(work.wOutsourcingYn == 'Y'){
									console.log(work.wOutsourcingInfo);
									console.log(workPre.wOutsourcingInfo);
									if(work.wOutsourcingInfo.length != workPre.wOutsourcingInfo.length || work.wOutsourcingInfo[0].wCuSeq != workPre.wOutsourcingInfo[0].wCuSeq){
										$workTable = $workTableOrg.clone(); 
										let $workInfo = $workInfoOrg.clone();
										self._root._utils.classNameInput($workInfo, work);
										let outsourcingCuNm = '자사';
										if(work.wOutsourcingYn == 'Y'){
											if(work.wOutsourcingInfo.length == 1){
												outsourcingCuNm = work.wOutsourcingInfo[0].cuNm;
											}else if(work.wOutsourcingInfo.length == 2){
												outsourcingCuNm = work.wOutsourcingInfo[0].cuNm + ', '+ work.wOutsourcingInfo[1].cuNm;
											}else if(work.wOutsourcingInfo.length > 2){
												outsourcingCuNm = work.wOutsourcingInfo[0].cuNm +' 외 '+ work.wOutsourcingInfo.length +'개 업체';
											}
										}
										$('.wOutsourcingNm', $workInfo).text(outsourcingCuNm);
										$('tbody',$workTable).append($workInfo);
									}else{
										$workTable = $workTablePre; 	
									}
								}else{
								//	console.log('ok : ' )
									$workTable = $workTablePre; 
								}
							} 

							let option = work.optionInfo;
							let opt = [];
							for(let o=0;o<option.length;o++){
								if(option[o].cwoOrderYn == 'Y' && !self._root._utils.checkEmptyNull(option[o].woInput)){
									opt.push(option[o]);
								}
							}

							let $workDetail = $workDetailOrg.clone();
							self._root._utils.classNameInput($workDetail, work);
							if(!self._root._utils.checkEmptyNull(work.wInfo)){
								$('.wNm',$workDetail).text(work.wNm + ' ('+ work.wInfo +')');
							}
							let o = 0;
							let $trs = [];
							let $tr = $('<tr style="height:26px;"/>');

							for(o=0;o<opt.length;o++){
								let $optionTag = '<span class="workOptionListOne vm"><strong class="workOptionInfo" style="font-size:12px;">'+ opt[o].cwoNm + ' : <span style="font-weight: bold;font-size:14px;">'+ opt[o].woInput +'</span></strong></span>';
								if(o <=2){
									$('.option:eq('+o+')',$workDetail).append($optionTag);
								}else{
									if(((o) % 3) == 0)	$tr = $('<tr style="height:26px;"/>');

									let $td = $('<td class="al" style="border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;background:#fff;"></td>');
									$td.append($optionTag);
									$tr.append($td);
									if((o % 3) == 2 || o == (opt.length -1)){
										if(o == (opt.length -1)  && (o % 3) < 2){
											for(let c=((o+1) % 3) ;c<3;c++ ){
												let $td = $('<td class="al" style="border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;background:#fff;"></td>');
												$tr.append($td);
											}
										}
										if($('td',$tr).length > 0) $trs.push($tr);
									}
								}
							}

							let rowspan = (opt.length == 0 )? 1: Math.ceil(opt.length/3);
							$('.rowspan',$workDetail).attr("rowspan", rowspan);
							$('tbody',$workTable).append($workDetail);
							for(let tr = 0; tr < $trs.length; tr++) $('tbody',$workTable).append($tr[tr]);

							$workDetailArea.append($workTable);

							$workTablePre = $workTable; 
							workPre = work;
							if(i == (info.workInfo.length-1)){
								$tr = $('tbody tr:last',$workTable);
								$('td',$tr).css('border-bottom','1px solid #c1c1c1');
							}
						}


						let $processFlow = $('.processFlow',printWrap);
						for(let i=0;i<processFlow.length;i++){
							let $div = $('<div style="margin-right:5px;display: inline-block;height: 25px;line-height: 22px; background: #7b7b7b;padding: 0 15px;text-align: center;font-size: 13px;font-weight: normal;color: #fff;	border: 1px solid #7b7b7b;border-radius: 3px;vertical-align: middle;" >'+processFlow[i]+'</div>');
							$processFlow.append($div);
						}
						let param =  self._root._utils.encryptData('oSeq='+ info.oSeq);
						console.log(param);
						param = encodeURI(param);
						//let qrData = document.location.host +'/'+self._pageUrl+'?oSeq='+ info.oSeq;
						let qrData = document.location.host +'/'+self._pageUrl+'?p='+ param;
						console.log(qrData);
						const qrcode1 = $('.qrCode',printWrap)[0];
						const qrcode2 = $('.qrCode2',printWrap)[0];
						new QRCode.toCanvas(qrData, { width: 105,margin:0 }, function (error, canvas) {
							if (error) console.error(error);
							let qrData1 = canvas.toDataURL();
							qrcode1.appendChild(canvas);
							$(qrcode1).empty()
							$(qrcode1).append($('<img src=""/>').attr("src", qrData1));
						});
						
						new QRCode.toCanvas(qrData, { width: 94,margin:1 }, function (error, canvas) {
							if (error) console.error(error);
							let qrData2 = canvas.toDataURL();
							qrcode2.appendChild(canvas);
							$(qrcode2).empty()
							$(qrcode2).append($('<img src=""/>').attr("src", qrData2));
						});


						if(cWorkReport == 'A'){
							$('.deliveryLine',printWrap).remove();
							$('.deliveryArea',printWrap).empty().css('border-bottom','1px solid #000');
							$('.workDetailArea',printWrap).css('height','825px');
						}else{
							$('.workDetailArea',printWrap).css('height','655px');
						}


						cbfunc();
/*
						$(printA4).print({
							addGlobalStyles: true,
							stylesheet: null,
							rejectWindow: true,
							noPrintSelector: ".no-print",
							iframe: true,
							append: null,
							prepend: null,
							timeout: 1500,
						  });
*/
					} else {
						alert(rdata.message);
					}
				});
	

	}
	transReport = (d ,cbfunc) => {
		const self = this;
		let html = `
		<page size="A4">
			<div class="printA4">
				<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
					<tr class="">
						<td style="width:100%;background-color:#fff;">
							<table class="" style="width:100%;height:100px;">
								<tr style="width:100%;background-color:#fff;">
									<td class="al workTitle" style="background-color:#fff;"><strong>거래명세표</strong></td>
									<td class="ar reportLogo" rowspan="2" style="vertical-align: top;"></td>
								</tr>
								<tr style="width:100%;background-color:#fff;">
									<td class="al reportTitle" style="background-color:#fff;">업체명 귀하</td>
								</tr>
								<tr style="width:100%;background-color:#fff;">
									<td class="al reportTitle" style="background-color:#fff;">업체명 귀하</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr class="">
						<td class="" style="background:#fff;">
							<table class="printInfo" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
								<colgroup>
									<col width="100px">
									<col width="auto">
									<col width="100px">
									<col width="auto">
									<col width="10px">
									<col width="180px">
								</colgroup>
								<tbody>
									<tr>
										<th class="ac top">주문일자</th>
										<td class="al top last orderDate" colspan="3"></td>
										<td class="al noborder" rowspan="7"></td>
										<td class="al qr" rowspan="7"><div class="qrCode"></div></td>
									</tr>
									<tr>
										<th>비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고</th>
										<td class="oMemo last" colspan="3"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td style="padding-top:10px;background:#fff;">
							<table class="printList" style="width:100%;">
								<colgroup>
									<col width="60px"><!-- 일자 -->
									<col width="auto"><!-- 제목 파일이름 -->
									<col width="120px"><!-- 작업명 -->
									<col width="50px"><!-- 면 -->
									<col width="75px"><!-- 규격 -->
									<col width="10px"><!-- 주문수량 -->
									<col width="100px"><!-- 완료수량 -->
									<col width="75px"><!-- 단가 -->
									<col width="120px"><!-- 공급가 -->
									<col width="120px"><!-- 부가세 -->
								</colgroup>
								<thead>
									<tr>
										<th>일자</th>
										<th>제목</th>
										<th>작업명</th>
										<th>면</th>
										<th>규격</th>
										<th>주문수량</th>
										<th>완료량</th>
										<th>단가</th>
										<th>공급가</th>
										<th>부가세</th>
									</tr>
								</thead>
								<tbody>
								<tfoot>
									<tr>
										<td colsapn="2" class="bankInfo"></td>
										<td colsapn="8">
											<table border="0" style="width:100%">
												<colgroup>
													<col width="auto">
													<col width="100px">
													<col width="150px">
												</colgroup>
												<tbody>
													<tr>
														<td></td>
														<td class="ar">공급가 :</td>
														<td class="ar amount"></td>
													</tr>
													<tr>
														<td></td>
														<td class="ar">부가세 :</td>
														<td class="ar amount"></td>
													</tr>
													<tr>
														<td></td>
														<td class="ar">할인금액 :</td>
														<td class="ar amount"></td>
													</tr>
													<tr>
														<td></td>
														<td class="ar">당월판매액 :</td>
														<td class="ar amount"></td>
													</tr>
													<tr>
														<td></td>
														<td class="ar">당월수금액 :</td>
														<td class="ar amount"></td>
													</tr>
													<tr>
														<td></td>
														<td class="ar">현잔액 :</td>
														<td class="ar amount"></td>
													</tr>													
												</tbody>
											</table>
										</td>
									</tr>
								</tfoot>
								</tbody>
							</table>
						</td>
					</tr>
					<tr style="background:#fff;">
						<td style="background-color:#fff;height:10px;"><hr style="border:none;border-top:2px dotted #000;color:#fff;height:1px;width:100%;">
						<strong class="cNm">현아엔씨</strong> | <span class="address">서울 어쩌구 저처구 </span>   <strong>T</strong> <span class="cTel">02-2275-3758</span> <strong>F</strong> <span class="cFax">02-2275-3758</span>  <span class="cHomepage"> https://www.kprintfactory.com</span>
						</td>

					</tr>
				</table>
		</div></page>`;	


		
		let printWrap = $("#printWrap");
		printWrap.empty();
		printWrap.append($(html));
		let printA4 = printWrap.find(".printA4");
	
		let mapData = {ctl : 'order',cmd : 'transReportOrderLoad',oSeqs : d.oSeqs,};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api2.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let info = rdata.data;
						

						cbfunc();

					} else {
						alert(rdata.message);
					}
				});
	

	};
	
}
export default Report;