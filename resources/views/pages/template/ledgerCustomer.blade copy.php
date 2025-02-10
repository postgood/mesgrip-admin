<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrap">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="60px">
			<col width="60px">
			<col width="40px">
			<col width="80px">
			<col width="60px">
			<col width="180px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<th>· 년도</th>
					<td>
							<select name="yyyy">
								<option value="2024">2024</option>
							</select>
					</td>
					<th>· 구분</th>
					<td>
							<select name="lKind">
								<option value="S">매출</option>
								<option value="B">매입</option>
							</select>
					</td>
					<th>· 업체명</th>
					<td>
						<input class="w98p srchIp" name="searchWord" type="text" placeholder="검색어">
					</td>
					<td>
						<div class="ar searchWrapBtn">
							<a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt20 divisionWrap">
		<div style="width:100%;float: left;">
		<div class=" f_lt leftSyncDiv" style="width: 15%; min-height: 50px;">
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="10%"><!--check-->
					<col width="50%"><!--업체명-->
					<col width="40%"><!--이월잔액-->
				</colgroup>
				<thead>
					<tr>
						<th><input type="checkbox" class="vm" name="chckAll"></th>
						<th>업체명</th>
						<th>이월잔액</th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="" style="overflow-y: hidden;">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
					<col width="10%"><!--check-->
					<col width="50%"><!--업체명-->
					<col width="40%"><!--이월잔액-->
					</colgroup>
					<tbody class="customerList">
					</tbody>
				</table>
			</div>
		</div>
		<div class=" f_rt rightSyncDiv" style="width: 85%;min-height: 658px;">
			<div class="f_lt" style="width: 91%;min-height: 658px;overflow: overlay">
				<table class="listTbType02 tr_nohover dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="8.3%"><!--1월-->
						<col width="8.3%"><!--2월-->
						<col width="8.3%"><!--3월-->
						<col width="8.3%"><!--4월-->
						<col width="8.3%"><!--5월-->
						<col width="8.3%"><!--6월-->
						<col width="8.3%"><!--7월-->
						<col width="8.3%"><!--8월-->
						<col width="8.3%"><!--9월-->
						<col width="8.3%"><!--10월-->
						<col width="8.3%"><!--11월-->
						<col width="8.3%"><!--12월-->
					</colgroup>
					<thead>
						<tr>
							<th>1월</th>
							<th>2월</th>
							<th>3월</th>
							<th>4월</th>
							<th>5월</th>
							<th>6월</th>
							<th>7월</th>
							<th>8월</th>
							<th>9월</th>
							<th>10월</th>
							<th>11월</th>
							<th>12월</th>
						</tr>
					</thead>
				</table>
				<div class="overflowYListdiv overflowFixWrap" id="" style="width:100%;overflow: hidden"; >
					<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="8.3%"><!--1월-->
							<col width="8.3%"><!--2월-->
							<col width="8.3%"><!--3월-->
							<col width="8.3%"><!--4월-->
							<col width="8.3%"><!--5월-->
							<col width="8.3%"><!--6월-->
							<col width="8.3%"><!--7월-->
							<col width="8.3%"><!--8월-->
							<col width="8.3%"><!--9월-->
							<col width="8.3%"><!--10월-->
							<col width="8.3%"><!--11월-->
							<col width="8.3%"><!--12월-->
						</colgroup>
						<tbody class="customerMonth">
						</tbody>
					</table>
				</div>
			</div>
			<div class=" f_rt" style="width: 9%;min-height: 658px;">
				<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="auto"><!--주문일-->
					</colgroup>
					<thead>
						<tr>
							<th>합계</th>
						</tr>
					</thead>
				</table>
				<div class="overflowYListdiv overflowFixWrap" id="">
					<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="auto">
						</colgroup>
						<tbody class="customerTotal">
						</tbody>
					</table>
				</div>	
			</div>
		</div>
</div>
		<!-- div class="" style="width:100%;float: left;">
			<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<tbody class="monthTotal">
						</tbody>
					</table>
		</div -->
		<div class="absWrap" style="clear: both;float: left; width:100%;">
			<div class="pageInfoTfoot" style="position:relative;margin-top:10px;">
				<span style="position:absolute;top:0px;left:5px;">
					<select name="rowsPerPage" class="vm">
					<option value="20">20개씩 보기</option>
					<option value="30">30개씩 보기</option>
					<option value="40">40개씩 보기</option>
					<option value="50">50개씩 보기</option>
					<option value="100">100개씩 보기</option>
					</select>
				</span>
				<div class="pagenate">
					<a href="#">처음</a>
					<a href="#">이전</a>
					<a href="#" class="now">1</a>
					<a href="#">2</a>
					<a href="#">3</a>
					<a href="#">다음</a>
					<a href="#">마지막</a>
				</div>
				<span style="position:absolute;top:0px;right:5px;">
					<input type="hidden" name="page" style="width:40px;text-align:center;" inputType=comma>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>

<template id="workDetail">
	<div class="divisionWrap" style="min-height: 150px">
		<table class="workTable tr_nohover" border="0" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
			<col width="10%">
			<col width="23%">
			<col width="10%">
			<col width="23%">
			<col width="10%">
			<col width="24%">
			</colgroup>
			<tbody name="rtTbody" class="rtTbody" style="display:">
			<input name="cSeq" type="hidden" require="" value="">
				<tr>
					<th>작업명</th>
					<td></td>
					<th>상태</th>
					<td></td>
					<th>상태일시</th>
					<td></td>
				</tr>
				<tr>
					<th>완료수량</th>
					<td></td>
					<th>단가</th>
					<td></td>
					<th>금액</th>
					<td></td>
				</tr>
				<tr>
					<th>비고</th>
					<td colspan="5"></td>
				</tr>
				<tr>
					<th>작업메모</th>
					<td colspan="5"></td>
				</tr>
				<tr>
					<th class="ac" colspan="6">수주 세부사항</th>
				</tr>
				<tr>
					<td colspan="6"></th>
				</tr>
				<tr>
					<th class="ac" colspan="6">작업 세부사항</th>
				</tr>
				<tr>
					<td colspan="6"></th>
				</tr>
				
			</tbody>
		</table>
	</div>
</template>
<template id="transReport">
		<div class="mw_defalut" style="width:860px; font-size:13px;" id="transReport">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">거래명세서</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div style="height:650px;overflow-y:auto;padding:2px;">
						<div class="bottonWrap">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="auto">
								</colgroup>
								<tbody>
									<tr>
										<th>
											<div class="ar">
												<a href="#" class="btnSearch mail"><i class="fa-regular fa-envelope"></i>&nbsp;&nbsp;메일발송</a>
												<a href="#" class="btnSearch print"><i class="fas fa-print"></i>&nbsp;&nbsp;인쇄</a>
											</div>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="printArea">
							<page size="A4" style="margin-bottom:1350px;">
								<div class="printA4">
									<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
										<tr class="">
											<td style="width:100%;background-color:#fff;">
												<table class="" style="width:100%;height:100px;">
													<colgroup>
														<col width="50%">
														<col width="50%">
													</colgroup>
													<tbody>
														<tr style="width:100%;background-color:#fff;">
															<td class="al workTitle" colspan="2" style="background-color:#fff;font-family: 'NanumBarunGothicLight';font-size:45px;"><span class="transMonth" style="font-weight:normal;margin-right:10px;"></span><strong >거래명세표</strong></td>
														</tr>
														<tr style="width:100%;background-color:#fff;">
															<td class="al" style="background-color:#fff;padding-top:25px;padding-bottom:0px;">
																<table border="0" style="width:600px;">
																	<tr>
																		<td><div style="width:280px;border-bottom: 1px solid #000;padding-bottom:5px;" class="f_lt"><span style="font-size:20px;margin-right:10px;font-weight:bold;" class="cuNm"></span></div><div class="f_rt" style="width:310px;font-size:18px">귀하</div></td>
																	</tr>
																	<tr>
																		<td style="height:25px;padding-top:8px; padding-bottom:3px;"><strong>E_</strong><span class="cuInvoiceEmail"></span></td>
																	</tr>
																	<tr>
																		<td style="height:25px;padding-top:3px; padding-bottom:0px;"><strong>F_</strong><span  class="cuFax"></span></td>
																	</tr>
																</table>
															</td>
															<td class="ar" style="vertical-align: bottom; background-color:#fff;"><strong class="searchDate" style="font-size:16px;font-weight:bold;"></strong></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td style="padding-top:10px;background:#fff;">
												<table class="ledgerList" style="width:100%;">
													<colgroup>
														<col width="50px"><!-- 일자 -->
														<col width="auto"><!-- 제목 파일이름 -->
														<col width="70px"><!-- 작업명 -->
														<col width="40px"><!-- 면 -->
														<col width="70px"><!-- 규격 -->
														<col width="60px"><!-- 주문수량 -->
														<col width="60px"><!-- 완료수량 -->
														<col width="55px"><!-- 단가 -->
														<col width="90px"><!-- 공급가 -->
														<col width="70px"><!-- 부가세 -->
													</colgroup>
													<thead>
														<tr>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">일자</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">제목</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">작업명</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">면</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">규격</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">주문수량</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">완료량</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">단가</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">공급가</th>
															<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #000; white-space:normal; text-align:center; color:#000; background:#eeeeee;">부가세</th>
														</tr>
													</thead>
													<tbody class="workList "></tbody>
													<tfoot>
														<tr>
															<td colspan="4" class="bankInfo" style="vertical-align: top;border-right: 0px;padding:10px 10px; border-left:1px solid #000;border-bottom:1px solid #000;">
																<table border="0" style="width:100%">
																	<tbody>
																		<td class="al" style="height:20px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px;"><입금계좌 안내></td>
																	</tbody>
																</table>
															</td>
															<td colspan="6" style="vertical-align: top;border-left: 0px;padding:10px 10px;border-right:1px solid #000;border-bottom:1px solid #000;">
																<table class="totalTable" border="0" style="width:100%">
																	<colgroup>
																		<col width="auto">
																		<col width="100px">
																		<col width="100px">
																	</colgroup>
																	<tbody>
																		<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">총 금액 :</td>
																			<td class="ar amountTotal"></td>
																		</tr>
																		<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">할인금액 :</td>
																			<td class="ar amountDc"></td>
																		</tr>
																		<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">공급가 :</td>
																			<td class="ar amount"></td>
																		</tr>
																		<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">부가세 :</td>
																			<td class="ar amountVat"></td>
																		</tr>
																		<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">당월판매액 :</td>
																			<td class="ar amountSale"></td>
																		</tr>
																		<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">당월수금액 :</td>
																			<td class="ar amountSalePay"></td>
																		</tr>
																		<tr style="height:25px !important;background-color: #FFFFFF;padding: 0 5px;line-height:1.1;font-size:12px">
																			<td></td>
																			<td class="ar">현잔액 :</td>
																			<td class="ar amountBalance"></td>
																		</tr>													
																	</tbody>
																</table>
															</td>
														</tr>
													</tfoot>
												</table>
											</td>
										</tr>
										<tr style="background:#fff;">
											<td style="background-color:#fff;height:10px;padding-top:5px;">
											<strong class="cNm">현아엔씨</strong> | <span class="address">서울 어쩌구 저처구 </span>   <strong>T</strong> <span class="cTel">02-2275-3758</span> <strong>F</strong> <span class="cFax">02-2275-3758</span>  <span class="cHomePageUrl"> www.sdlflkdflkdc.com</span>
											</td>

										</tr>
									</table>
								</div>
							</page>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>