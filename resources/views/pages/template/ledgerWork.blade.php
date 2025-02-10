<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="sort">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="200px">
			<col width="35px">
			<col width="80px">
			<col width="55px">
			<col width="70px">
			<col width="45px">
			<col width="180px">
			<col width="35px">
			<col width="215px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<th>· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<th>· 원장</th>
					<td>
							<select name="ledgerYn" class="schColumBorderColorPlace">
								<option value="">전체</option>
								<option value="N">미등록</option>
								<option value="Y">등록완료</option>
							</select>
					</td>
					<th>· 작업상태</th>
					<td>
							<select name="oStatus" class="w100p schColumBorderColorProcesss">
								<option value="">전체</option>
								<option value="A">대기</option>
								<option value="B">진행중</option>
								<option value="C">정지</option>
								<option value="D" selected>완료</option>
							</select>
					</td>
					<th>· 업체명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="cuSeq" type="hidden" placeholder="">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" style="width:175px;height:28px !important;" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					
					<th>· 품명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input style="width:190px;height:28px !important;" class="schColumBorderTextDefault" name="oFileNm" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar searchWrapBtn">
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<a href="#" class="btnSearch2 btnPrintCall" title="진행중인 작업을 중지 할 수 있습니다."><i class="fas fa-print"></i>&nbsp;&nbsp;거래명세서</a>
							
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt20">
		<!-- div class="ar mb10 buttonArea">
			<a href="javascript:;" class="btnStyle04 addCustomer" style="display: ">추가</a>
			<a href="javascript:;" class="btnStyle04 saveCustomer">저장</a>
			<a href="javascript:;" class="btnStyle05 deleteCustomer">삭제</a>
		</div -->
		<div class="divisionWrap f_lt" style="width: 49.5%; min-height: 50px;">
			<div class="al" style="height:30px;">
				<span style="display:inline-block;font-size: 14px;font-weight: bold;color:#566981;padding-top: 5px;">▶ 수주목록</span>
				<span class="" style="display:inline-block;float: right;padding-top: 5px;">※ 수주건을 클릭하여 원장을 등록하십시오</span></div>
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px"><!--check-->
					<col width="35px"><!--명세서-->
					<col width="150px"><!--업체명-->
					<col width="auto"><!--파일명-->
					<!-- col width="60px" --><!--규격-->
					<col width="65px"><!--주문수량-->
					<!-- col width="80px" --><!--완료수량-->
					<col width="50px"><!--상태-->
					
					<col width="80px"><!--주문일-->
					<!-- col width="30px"--><!--보기-->
				</colgroup>
				<thead>
					<tr>
						<th><input type="checkbox" class="vm" name="chckAll"></th>
						<th>명세</th>
						<th>업체명</th>
						<th>품명</th>
						<!-- th>규격</th -->
						<th>주문량</th>
						<!-- th>완료수량</th -->
						<th>상태</th>
						<th>주문일 </th>
						<!-- th >보기</th -->

					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02 tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
					<col width="25px"><!--check-->
					<col width="35px"><!--명세서-->
					<col width="150px"><!--업체명-->
					<col width="auto"><!--파일명-->
					<!-- col width="60px" --><!--규격-->
					<col width="65px"><!--주문수량-->
					<!-- col width="80px" --><!--완료수량-->
					<col width="50px"><!--상태-->
					
					<col width="80px"><!--주문일-->
					<!-- col width="30px" --><!--보기-->
					</colgroup>
					<tbody>
					</tbody>
				</table>
			</div>

			<div class="absWrap">
				<div class="pageInfoTfoot" style="position:relative;margin-top:10px;">
					<span style="position:absolute;top:0px;left:5px;">
						<select name="rowsPerPage" class="vm">
						<option value="20">20개씩 보기</option>
						<option value="30">30개씩 보기</option>
						<option value="40">40개씩 보기</option>
						<option value="50">50개씩 보기</option>
						<option value="100">100개씩 보기</option>
						<option value="150">150개씩 보기</option>
						<option value="200">200개씩 보기</option>
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
		<div class="divisionWrap f_rt" style="width: 50.4%;min-height: 758px;">
			<!-- div style="text-aling:center;"><span style="font-size: 25px;;color: darkgrey;">좌측 수주건을 클릭하여 원장을 등록하십시오</span></div -->		
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
		<div class="mw_defalut" style="width:865px; font-size:13px;" id="transReport">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">거래명세서</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div>
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
												<a href="#" class="btnSearch fax"><i class="fa-solid fa-file-lines"></i>&nbsp;&nbsp;FAX발송</a>
												<a href="#" class="btnSearch mail"><i class="fa-regular fa-envelope"></i>&nbsp;&nbsp;메일발송</a>
												<a href="#" class="btnSearch print"><i class="fas fa-print"></i>&nbsp;&nbsp;인쇄</a>
											</div>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="searchWrap" style="height:680px;overflow-y:auto;padding:15px;">	
							<div class="printArea">
								<page size="A4" style="margin-bottom:0px;display:inline-block;">
									<div class="printA4" style="padding-top:0px;">
										<div class="topMarginDiv" style="display:block;width:100%;height:35px;background:#fff;"></div>
										<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
											<tr class="">
												<td style="width:100%;background-color:#fff;">
													<table class="transHead" style="width:100%;height:100px;">
														<colgroup>
															<col width="50%">
															<col width="50%">
														</colgroup>
														<tbody>
															<tr style="width:100%;background-color:#fff;">
																<td class="al workTitle" colspan="2" style="background-color:#fff;font-family: 'NanumBarunGothicLight';font-size:40px;"><span class="transMonth" style="font-weight:normal;margin-right:10px;"></span><strong >거래명세서</strong></td>
															</tr>
															<tr style="width:100%;background-color:#fff;">
																<td class="al" style="background-color:#fff;padding-top:18px;padding-bottom:0px;">
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
												<td style="padding-top:5px;background:#fff;">
													<table class="ledgerList" style="width:100%;">
														<colgroup>
															<col width="50px"><!-- 일자 -->
															<col width="auto"><!-- 제목 파일이름 -->
															<col width="80px"><!-- 작업명 -->
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
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;border-left-width:1px;">일자</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">품명</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">작업명</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">면</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">규격</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">주문수량</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">완료량</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">단가</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:0px;">공급가</th>
																<th class="ac" style="height:30px; padding:3px 0; font-weight:normal; font-size:12px; line-height:1.1; border:1px solid #999; white-space:normal; text-align:center; color:#000; background:#eeeeee;border-right-width:1px;">부가세</th>
															</tr>
														</thead>
														<tbody class="workList"></tbody>
														<tfoot>
															<tr>
																<td colspan="4" class="bankInfo" style="vertical-align: top;border-right: 0px;padding:10px 10px; border-left:1px solid #999;border-bottom:1px solid #999; border-top-width:0px;">
																	<table border="0" style="width:100%">
																		<tbody>
																			<td class="al" style="height:20px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px;color:#000;"><입금계좌 안내></td>
																		</tbody>
																	</table>
																</td>
																<td colspan="6" style="vertical-align: top;border-left: 0px;padding:10px 10px;border-right:1px solid #999;border-bottom:1px solid #999;border-left-width:0px; border-top-width:0px;">
																	<table class="totalTable" border="0" style="width:100%">
																		<colgroup>
																			<col width="auto">
																			<col width="100px">
																			<col width="100px">
																		</colgroup>
																		<tbody>
																			<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">총 금액 :</td>
																				<td class="ar amountTotal" style="color:#000;"></td>
																			</tr>
																			<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">할인금액 :</td>
																				<td class="ar amountDc" style="color:#000;"></td>
																			</tr>
																			<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">공급가 :</td>
																				<td class="ar amount" style="color:#000;"></td>
																			</tr>
																			<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">부가세 :</td>
																				<td class="ar amountVat" style="color:#000;"></td>
																			</tr>
																			<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">당월판매액 :</td>
																				<td class="ar amountSale" style="color:#000;"></td>
																			</tr>
																			<tr style="height:25px !important;background-color: #FFFFFF; padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">당월수금액 :</td>
																				<td class="ar amountSalePay" style="color:#000;"></td>
																			</tr>
																			<tr style="height:25px !important;background-color: #FFFFFF;padding: 0 5px;line-height:1.1;font-size:12px">
																				<td></td>
																				<td class="ar" style="color:#000;">현잔액 :</td>
																				<td class="ar amountBalance" style="color:#000;"></td>
																			</tr>													
																		</tbody>
																	</table>
																</td>
															</tr>
														</tfoot>
													</table>
												</td>
											</tr>
											<tr class="bottomCompanyInfo" style="background:#fff;">
												<td style="background-color:#fff;height:10px;padding-top:5px; color:#000;">
													<strong class="cNm">현아엔씨</strong> | <span class="address" style="margin-right:10px;">서울 어쩌구 저처구 </span>   
													<strong>T</strong> 
													<span class="cTel" style="margin-right:10px;">02-2275-3758</span> 
													<strong>F</strong> 
													<span class="cFax" style="margin-right:10px;">02-2275-3758</span>  
													<span class="cHomepage"> https://www.kprintfactory.com</span>
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
		</div>
</template>
<template id="workMail">
	<div class="mw_defalut ui-draggable" style="width: 580px; height: 300px;" id="">
		<div class="mw_title ui-draggable-handle" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">메일 발송</span>
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
									<th></th>
									<th>
										<div class="ar">
											<a href="javascript:void(0);" class="btnSearch mailSend">발송하기</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
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
									<th class="txt_r">
										제목 :
									</th>
									<td class="cuNm" colspan="3">
										<input type="text" name="subject" class="w99p" requiremsg="제목">
										<div class="inputTextClean"><span>×</span></div>
									</td>
								</tr>
								<tr>
									<th class="txt_r">
										받는이 :
									</th>
									<td class="wESeq">
										<input type="text" name="to" class="w98p" vtype="mail" requiremsg="받는이 메일주소">
										<div class="inputTextClean"><span>×</span></div>
									</td>
									<th class="txt_r">
										참조 :
									</th>
									<td class="oFileNm">
										<input type="text" name="cc" class="w98p">
										<div class="inputTextClean"><span>×</span></div>
									</td>
								</tr>
								<tr>
									<th class="txt_r">
										첨부파일 :
									</th>
									<td class="oFileNm" colspan="3" style="padding-left:0px;">
										<table border="0" style="width:100%">
											<tr>
												<td style="width:95%;">
													<select name="files" class="w100p" style="height: 50px !important;" size="2"></select>
												</td>
												<td style="width:5%;"> 
													<input type="file" name="eFile" style="width:0px;display: none;"> <i class="fa-solid fa-upload cursorPointer" style="color:blue;margin-bottom: 15px;" title="파일 추가"></i> <br><i class="fa-regular fa-trash-can cursorPointer" style="color:red;" title="선택 파일삭제"></i>
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr>
									<th class="txt_c">
										내용
									</th>
									<td colspan="3">
										<textarea name="content" class="w100p" rows="3"></textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="workFax">
	<div class="mw_defalut ui-draggable" style="width: 580px; height: 173px;" id="">
		<div class="mw_title ui-draggable-handle" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">FAX 발송</span>
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
									<th></th>
									<th>
										<div class="ar">
											<a href="javascript:void(0);" class="btnSearch faxSend">발송하기</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 mt10">
							<caption></caption>
							<colgroup>
								<col width="60px">
								<col width="auto">
								<col width="60px">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r">
										업체명 :
									</th>
									<td class="">
										<input type="text" name="cuNm" class="w98p readonly" readonly>
										<div class="inputTextClean"><span>×</span></div>
									</td>
									<th class="txt_r">
										FAX : 
									</th>
									<td class="">
										<input type="text" name="cuFax" class="w98p" >
										<div class="inputTextClean"><span>×</span></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="ledgerWorkCreate">
	<div class="ar mb10 buttonArea " style="height: 20px;">
		<div class="f_lt al" style="width:50%"></div>
			<div class="f_lt al" style="width:50%">
			<span style="display:inline-block;font-size: 14px;font-weight: bold;color:#566981;padding-top: 5px;">▶ 원장등록</span>
			</div>
			<div class="f_rt buttonArea" style="width:50%">
				<a href="javascript:;" class="btnStyle04 save tempSave" style="font-size: 13px !important;padding-bottom:3px;">임시저장</a>
				<a href="javascript:;" class="btnStyle04 save ledger" style="font-size: 13px !important;padding-bottom:3px;">등록</a>
			</div>
		</div>
		<table class="writeTable tr_nohover orderTable" border="0" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
				<col width="80px">
				<col width="80px">
				<col width="80px">
				<col width="80px">
				<col width="80px">
				<col width="auto">
				<col width="80px">
				<col width="80px">
			</colgroup>
			<tbody name="rtTbody" class="rtTbody" style="display:">
				<input name="lSeq" type="hidden" require="" value="">
				<tr>
					<th class="ac">업체명</th>
					<td colspan="3" class="cuNm"></td>
					<th class="ac">특이사항</th>
					<td  colspan="3" class="cuSignificant"></td>
				</tr>
				<tr>
					<th class="ac">품&nbsp;&nbsp;&nbsp;&nbsp;명</th>
					<td colspan="5" class="oFileNm"></td>
					<th class="ac">배송비 <span style="color:#f20;">②</span></th>
					<td class="ar" style="padding-right:5px;"><input type="text" name="istDeliveryAmount" style="font-size:13px;" class="w100p inputBoder0 ar" placeholder="배송비"></td>
				</tr>
				<tr>
					<th class="ac">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
					<td class="oPaperSize ac" style="padding-right:5px;"></td>
					<th class="ac">주문량 <span style="color:#f20;">①</span><input type="hidden" name="oEndCnt" style="font-size:13px;" class="w100p inputBoder0 ar"></th>
					<td class="oCnt ar" style="padding-right:5px;"></td>
					<th class="ac">비&nbsp;&nbsp;&nbsp;&nbsp;고</th>
					<td colspan="3"><pre class="oMemo"></pre></td>
					<!-- th class="ac">완료량 </th>
					<td class="oEndCnt ar" style="padding-right:5px;"><input type="text" name="oEndCnt" style="font-size:13px;" class="w100p inputBoder0 ar"></td-->
				</tr>
				<!-- tr -->
					<!-- th class="ac">배송 부가세</th>
					<td class="ar" style="padding-right:5px;"><input type="text" name="istDeliveryAmountVat" style="font-size:13px;" class="w100p inputBoder0 ar" placeholder="배송 부가세"></td -->
				<!-- /tr -->
				<tr>
					<th class="ac" colspan="8" style="height:25px;background:#fff;border-bottom:0px;">작업 내역</th>
				</tr>
				
				<tr>
					<td colspan="8" style="padding:5px; padding-top:0px;border-bottom: 0px; border-top:0px;">
						<table class="listTbType07 tr_nohover dataHeadTable tablScrollDisplay"  id="" style="margin: 0px !important; padding:3px 0;border-bottom: 0px;" cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
								<col width="75px"><!--공정명-->
								<col width="40px"><!--면-->
								<col width="85px"><!--작업명-->
								<col width="auto"><!--주문세부사항-->
								<!-- col width="auto" --><!--작업세부사항-->
								<col width="55px"><!--완료수량-->
								<col width="55px"><!--적용수량-->
								<col width="70px"><!--단가-->
								<col width="100px"><!--금액-->
								<col width="80px"><!--부가세-->
							</colgroup>
							<thead>
								<tr>
									<th style="border-bottom: 0px;">공정명</th>
									<th style="border-bottom: 0px;">면</th>
									<th style="border-bottom: 0px;">작업명</th>
									<th style="border-bottom: 0px;" >주문세부사항 <span style="color:#000;font-weight: normal; font-size:11px;">(비용청구내역)</span> <span style="color:#f20;">③</span></th>
									<!-- th>작업세부사항</th -->
									<th style="border-bottom: 0px;">완료량</th>
									<th style="border-bottom: 0px;">적용량</th>
									<th style="border-bottom: 0px;">단가 </th>
									<th style="border-bottom: 0px;"  title="적용량 × 단가 = 금액">금액 <span style="color:#f20;">④</span></th>
									<th style="border-bottom: 0px;"  title="금액 × 0.1 = 부가세">부가세</th>
								</tr>
							</thead>
						</table>
						<div class="overflowYListdiv overflowFixWrap noReSize" style="height:445px;">
						<table class="listTbType02 tr_nohover workList"  id="" style="min-height:35px;margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
							<colgroup>
								<col width="75px"><!--공정명-->
								<col width="40px"><!--면-->
								<col width="85px"><!--작업명-->
								<col width="auto"><!--주문세부사항-->
								<!-- col width="auto" --><!--작업세부사항-->
								<col width="55px"><!--완료수량-->
								<col width="55px"><!--적용수량-->
								<col width="70px"><!--단가-->
								<col width="100px"><!--금액-->
								<col width="80px"><!--부가세-->
							</colgroup>
							<tbody>
							</tbody>
							<tfoot>
							</tfoot>
						</table>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="8" style="border-top: 0px;padding-right:5px;">
						<table class="writeTable tr_nohover orderTable" border="0" cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
								<col width="10%">
								<col width="10%">
								<col width="10%">
								<col width="15%">
								<col width="10%">
								<col width="15%">
								<col width="30%">
							</colgroup>
							<tbody>
								<tr>
									<th class="ac" title="⑥ ÷ ① = 단가">단가 <span style="color:#f20;">⑤</span>
										<br><span style="font-size:10px;">(⑥÷①)</span>
									</th>
									<td class="ac pr10"><input type="text" name="oUnitPrice" vtype="number" class="w100p inputBoder0 ar" value="" style="font-size:15px;"></td>
									<th class="ac" title="② + ③ + ④ = 합계">합계  <span style="color:#f20;">⑥</span>
										<br><span style="font-size:10px;">(②+③+④)</span>
									</th>
									<td class="ac pr10"><input type="text" name="oAmountCalculable" vtype="number" class="w100p inputBoder0 ar" value="" readonly style="font-size:15px;"></td>
									<th class="ac" title="⑥ - ⓐ = 할인금액">할인 <span style="color:#f20;">⑦</span>
										<br><span style="font-size:10px;">(⑥-ⓐ)</span>
									</th>
									<td class="ac pr10" style="border-right:0px;"><input type="text" name="oAmountDc" vtype="number" class="w100p inputBoder0 ar" value="" style="font-size:15px;"></td>
									<td style="padding-right:5px;border-left:0px;">
										<table class="writeTable tr_nohover orderTable" border="0" cellspacing="0" cellpadding="0" summary="" style="border-top: 2px solid red !important;">
											<caption></caption>
											<colgroup>
												<col width="40%">
												<col width="60%">
											</colgroup>
											<tbody>
												<tr>
													<th class="ac" style="color:red;height:34px;padding:0 5px;" title="⑥ - ⑦ = 공급가">공급가 <span style="color:#f20;">ⓐ</span></th>
													<td style="height:34px;padding:0 5px;"class="ac" colspan="3"><input type="text" name="oAmount" vtype="number" class="w100p inputBoder0 ar" value="" style="font-size:15px;font-weight: bold; color:red;"></td>
												</tr>
												<tr>
													<th class="ac" style="color:red;height:34px;padding:0 5px;" title="ⓑ × 0.1 = 부가세">부가세 <span style="color:#f20;">ⓑ</span></th>
													<td style="height:34px;padding:0 5px;" class="ac"><input type="text" name="oAmountVat" vtype="number" class="w100p inputBoder0 ar" value="" style="font-size:15px;font-weight: bold; color:red;"></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</tempnam>
