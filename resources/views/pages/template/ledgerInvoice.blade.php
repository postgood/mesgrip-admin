<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="200px">
			<col width="45px">
			<col width="195px">
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
					<th>· 업체명</th>
					<td>
						<div class="inputTextCleanDiv">	
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:170px;height:28px !important;" placeholder="" autocomplete="false">
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
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt10 mb10 totalSumDiv">
		<div class="f_rt" style="width:100%;">
			<table cellpadding="0" cellspacing="0" border="0" summary="" class="commTable f_lt tr_nohover" style=";border-top:0 !important;background:#fff;">
				<caption></caption>
				<colgroup>
				<col width="80px">
				<col width="65px">
				<col width="auto">
				<col width="65px">
				<col width="auto">
				<col width="65px">
				<col width="auto">
				</colgroup>
				<tbody>
					<tr>
						<th rowspan="2" class="ac" style="color:red !important;padding:0 !important;border-top:1px solid #ff135f !important;">발행합계</th>
						<th class="" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #ff135f !important;">총 공급가</th>
						<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="saleAmount">0</strong></td>
						<th class="" style="font-size:11px;border-top:1px solid #ff135f !important;letter-spacing:-1px;">총 부가세</th>
						<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="saleAmountVat">0</strong></td>
						<th class="" style="font-size:11px;border-top:1px solid #ff135f !important;letter-spacing:-1px;">합계</th>
						<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="saleAmountTotal">0</strong></td>
					</tr>
				</tbody>
			</table>
	</div>
		<div style="clear:both;"></div>
	</div>
	<div class="mt20">
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<!-- col width="25px" --><!--check-->
					<col width="100px"><!--일자-->
					<col width="200px"><!--거래처-->
					<col width="120px"><!--공급가-->
					<col width="120px"><!--부가세-->
					<col width="150px"><!--합계-->
					<col width="70px"><!--품목수-->
					<col width="auto"><!--비고-->
					<col width="100px"><!--직접발생 여부-->
					<col width="200px"><!--승인번호-->
					<col width="120px"><!--발행자-->
					<col width="120px"><!--등록일시-->
					<col width="50px"><!--보기-->
				</colgroup>
				<thead>
					<tr>
						<!-- th --><!-- input type="checkbox" class="vm" name="chckAll" --><!-- /th -->
						<th>일자</th>
						<th>거래처</th>
						<th>공급가</th>
						<th>부가세</th>
						<th>합계</th>
						<th>품목수</th>
						<th>비고</th>
						<th>발행여부</th>
						<th>승인번호</th>
						<th>등록자</th>
						<th>등록일시</th>
						<th>보기</th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<!-- col width="25px" --><!--check-->
						<col width="100px"><!--일자-->
						<col width="200px"><!--거래처-->
						<col width="120px"><!--공급가-->
						<col width="120px"><!--부가세-->
						<col width="150px"><!--합계-->
						<col width="70px"><!--품목수-->
						<col width="auto"><!--비고-->
						<col width="100px"><!--직접발생 여부-->
						<col width="200px"><!--승인번호-->
						<col width="120px"><!--발행자-->
						<col width="120px"><!--등록일시-->
						<col width="50px"><!--보기-->
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
<template  id="homtexView">
<div class="mw_defalut ui-draggable" style="width: 1000px;" id="">
		<div class="mw_title ui-draggable-handle" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">세금계산서 조회</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:495px;overflow-y:auto;padding:2px;">
					<div class="searchWrap invoiceDocument" style="background: #fff; border: 0px;">	
						<div id="grp2265" class="invoice w2group section_group">
							<div id="grp2478" class="w2group inner_group pb0">
								<div id="grp1478" class="w2group tax_wrap mt5">
									<div id="grpTfstAprvNo" style="display:none" class="w2group wrap_title_btn h_auto">
										<div id="grpTxtTfstAprvNo" class="w2group tit_h4">
											<h4 id="txtTfstAprvNo" class="w2textbox ">당초승인번호</h4>
										</div>
										<p id="grpEdtTfstAprvNo" class="w2group tit_h4_sub"><span id="edtTfstAprvNo" class="w2textbox "></span></p>
									</div>
									<div id="grp1441" class="w2group both_section">
										<div id="grpSplrTop" class="w2group fl">
											<div id="grpSplrMainTop" class="w2group tbl_box mb0">
												<div id="grpSplr1005Top" class="w2group both_section_tit"style="background:#ffdbde;"><span id="grpSplr1006Top" class="w2textbox " >공급자</span></div>
												<div id="grp3" class="w2group both_section_tbl">
													<table id="grpSplr1000Top" style="height:31px;" class="w2group tbl_form pink" cellspacing="0" cellpadding="0" summary="공급자의 등록번호, 종사업장번호, 상호, 성명, 사업장, 업태, 종목, 이메일을 나타낸 표">
														<caption id="grpSplr1031Top" class="w2textbox ">전자계산서 공급자 정보</caption>
														<colgroup id="grpSplr1032Top">
															<col style="width:15%">
															<col style="width:36%">
															<col style="width:17%">
															<col>
														</colgroup>
														<tbody id="grpSplrInputTop" class="w2group ">
															<tr id="grpSplr1004Top" class="w2group ">
																<th id="txtSplrTxprNoHeaderTop" class="w2group " scope="row"><label id="txtSplrTxprNoTop" class="w2textbox " for="edtSplrTxprNoTop">등록<br>번호</label></th>
																<td id="edtSplrTxprNoHeaderTop" class="w2group"><input type="text" name="cBizNo" class="w100p inputBoder0 ac" readonly></td>
																<th id="txtSplrMpbNoHeaderTop" class="w2group " scope="row"><span id="txtSplrMpbNoTop" class="w2textbox ">종사업장<BR> 번호</span></th>
																<td id="edtSplrMpbNoHeaderTop" class="w2group "><input type="text" name="cBizNoNum" class="w100p inputBoder0 ac" readonly></td>
															</tr>
															<tr id="grpSplrTnmNmRprsFnmTop" class="w2group ">
																<th id="grpSplr1008Top" class="w2group " scope="row"><label id="txtSplrTnmNmTop" class="w2textbox " for="edtSplrTnmNmTop">상호</label></th>
																<td id="edtSplrTnmNmHeaderTop" class="w2group"><input type="text" name="cNm" class="w100p inputBoder0 ac" readonly></td>
																<th id="grpSplr1009Top" class="w2group " scope="row"><label id="txtSplrRprsFnmTop" class="w2textbox " for="edtSplrRprsFnmTop">성명</label></th>
																<td id="edtSplrRprsFnmHeaderTop" class="w2group"><input type="text" name="cOwnerNm" class="w100p inputBoder0 ac" readonly></td>
															</tr>
															<tr id="grpSplr1011Top" class="w2group ">
																<th id="txtSplrPfbAdrHeaderTop" class="w2group " scope="row"><label id="txtSplrPfbAdrTop" class="w2textbox " for="edtSplrPfbAdrTop">사업장</label></th>
																<td id="edtSplrPfbAdrHeaderTop" class="w2group" colspan="3"><input type="text" name="cAddress" class="w100p inputBoder0" readonly></td>
															</tr>
																<th id="txtSplrBcNmHeaderTop" class="w2group " scope="row"><label id="txtSplrBcNmTop" class="w2textbox " for="edtSplrBcNmTop">업태</label></th>
																<td id="edtSplrBcNmHeaderTop" class="w2group"><input type="text" name="cUpjong" class="w100p inputBoder0 ac" readonly></td>
																<th id="txtSplrItmNmHeaderTop" class="w2group " scope="row"><label id="txtSplrItmNmTop" class="w2textbox " for="edtSplrItmNmTop">종목</label></th>
																<td id="edtSplrItmNmHeaderTop" class="w2group "><input type="text" name="cJongmok" class="w100p inputBoder0 ac" readonly></td>
															</tr>
															<tr id="grpSplrEmlAdr" class="w2group ">
																<th id="txtSplrEmlAdrHeaderTop" class="w2group " scope="row"><label id="txtSplrEmlAdrTop" class="w2textbox " for="edtSplrEmlIdTop">이메일</label></th>
																<td id="grpSplrEmlAdrTop" class="w2group double_height" colspan="3"><input type="text" name="cInvoiceEmail" class="w100p inputBoder0" readonly></td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div id="grpDmnrTop" class="w2group fr">
											<div id="grpDmnrMainTop" class="w2group tbl_box mb0">
												<div id="grpDmnr1004Top" class="w2group both_section_tit"><span id="grpDmnr1005Top" class="w2textbox ">공급받는자<input type="hidden" name="cuSeq"></span></div>
												<div id="grp16276" class="w2group both_section_tbl">
													<table id="grpDmnr1000Top" class="w2group tbl_form blue" cellspacing="0" cellpadding="0" summary="공급받는자의 등록번호, 종사업장번호, 상호, 성명, 사업장, 업태, 종목, 이메일을 나타낸 표">
														<colgroup id="tag3Bot">
															<col>
															<col style="width:36%">
															<col style="width:17%">
															<col>
														</colgroup>
														<tbody id="grpDmnrInputTop" class="w2group ">
															<tr id="grpDmnrBsnoTop" class="w2group" aria-hidden="false" style="visibility: visible;">
																<th id="grpDmnr1006Top" style="width:15%;" class="w2group " scope="row"><label id="txtDmnrTxprNoTop" class="w2textbox " for="edtDmnrBsnoTop">등록<br>번호</label></th>
																<td id="edtDmnrTxprNoHeaderTop" class="w2group "><input type="text" name="cuBizNo" class="w100p inputBoder0 ac" readonly></td>
																<th id="txtDmnrMpbNoHeaderTop" class="w2group " scope="row"><label id="txtDmnrMpbNoTop" class="w2textbox " for="edtDmnrMpbNoTop">종사업장<BR>번호</label></th>
																<td id="edtDmnrMpbNoHeaderTop" class="w2group"><input type="text" name="cuBizNoNum" class="w100p inputBoder0 ac" readonly></td>
															</tr>
															<!-- tr id="grpDmnrResnoTop" style="display: none; visibility: hidden;" class="w2group" aria-hidden="true">
																<th id="grpTxtDmnrResnoTop" class="w2group bt_none" scope="row"><label id="txtDmnrJuminTop" class="w2textbox " for="edtDmnrResno1Top">주민등록<br>번호</label></th>
																<td id="edtDmnrJuminTopHeader" class="w2group bt_none" colspan="3"><input type="text" name="cuBizNum" class="w100p inputBoder0 ac" readonly></td>
															</tr -->
															<tr id="grpDmnrTnmNmRprsFnmTop" class="w2group" aria-hidden="false" style="visibility: visible;">
																<th id="grpDmnr1008Top" class="w2group " scope="row"><label id="txtDmnrTnmNmTop" class="w2textbox " for="edtDmnrTnmNmTop">상호</label></th>
																<td id="edtDmnrTnmNmHeaderTop" class="w2group " style="height: 26px;"><input type="text" name="cuNm" class="w100p inputBoder0 ac" readonly></td>
																<th id="grpDmnr1009Top" class="w2group " scope="row"><label id="txtDmnrRprsFnmTop" class="w2textbox " for="edtDmnrRprsFnmTop">성명</label></th>
																<td id="edtDmnrRprsFnmHeaderTop" class="w2group "><input type="text" name="cuOwnerNm" class="w100p inputBoder0 ac" readonly></td>
															</tr>
															<!-- tr id="grpDmnrFnmTop" style="display: none; visibility: hidden;" class="w2group" aria-hidden="true">
																<th id="grpTxtDmnrFnmTop" class="w2group " scope="row"><label id="txtDmnrFnmTop" class="w2textbox " for="edtDmnrFnmTop">성명</label></th>
																<td id="edtDmnrFnmHeaderTop" class="w2group " colspan="3" style="height: 26px;"><input type="text" name="cuOwnerNm" class="w100p inputBoder0 ac" readonly></td>
															</tr -->
															<tr id="grpDmnr1010Top" class="w2group ">
																<th id="txtDmnrPfbAdrHeaderTop" class="w2group " scope="row"><label id="txtDmnrPfbAdrTop" class="w2textbox " for="edtDmnrPfbAdrTop">사업장</label></th>
																<td id="edtDmnrPfbAdrHeaderTop" class="w2group " colspan="3"><input type="text" name="cuAddress" class="w100p inputBoder0" readonly></td>
															</tr>
															<tr id="grpDmnrBcItmTop" class="w2group" aria-hidden="false" style="visibility: visible;">
																<th id="txtDmnrBcNmHeaderTop" class="w2group " scope="row"><label id="txtDmnrBcNmTop" class="w2textbox " for="edtDmnrBcNmTop">업태</label></th>
																<td id="edtDmnrBcNmHeaderTop" class="w2group "><input type="text" name="cuUpjong" class="w100p inputBoder0 ac" readonly value=""></td>
																<th id="txtDmnrItmNmHeaderTop" class="w2group " scope="row"><label id="txtDmnrItmNmTop" class="w2textbox " for="edtDmnrItmNmTop">종목</label></th>
																<td id="edtDmnrItmNmHeaderTop" class="w2group "><input type="text" name="cuJongmok" class="w100p inputBoder0 ac" readonly value=""></td>
															</tr>
															<tr id="grpDmnrMchrgEmlAdr" class="w2group ">
																<th id="txtDmnrEmlAdr1HeaderTop" class="w2group " scope="row"><label id="txtDmnrEmlAdr1Top" class="w2textbox " for="edtDmnrMchrgEmlIdTop">이메일</label></th>
																<td id="edtDmnrEmlAdr1HeaderTop" class="w2group " colspan="3"><input type="text" name="cuInvoiceEmail" class="w100p inputBoder0" readonly></td>
															</tr>
															<tr id="grpDmnrSchrgEmlAdr" class="w2group ">
																<th id="txtDmnrEmlAdr2HeaderTop" class="w2group " scope="row"><label id="txtDmnrEmlAdr2Top" class="w2textbox " for="edtDmnrSchrgEmlIdTop">이메일</label></th>
																<td id="edtDmnrEmlAdr2HeaderTop" class="w2group " colspan="3"><input type="text" name="cuInvoiceEmail2" class="w100p inputBoder0" readonly></td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									<div id="group2340" class="w2group ">
										<div id="group2341" class="w2group tbl_box mb0">
											<table id="group2342" class="w2group tbl_form2 bd_none_top" cellspacing="0" cellpadding="0" summary="전자세금계산서 작성일자, 비고를 나타낸 표">
												<caption id="textbox1441126" class="w2textbox ">전자세금계산서 날짜, 비고 게시목록</caption>
												<colgroup id="tag29">
													<col style="width:15%">
													<col style="width:35%">
													<col style="width:15%">
													<col>
												</colgroup>
												<tbody id="group2343" class="w2group ">
													<tr id="group2344" class="w2group ">
														<th id="group2345" class="w2group " scope="row"><label id="textbox1441128" class="w2textbox " for="calWrtDtTop_input">작성일자</label></th>
														<td id="group2347" class="w2group " colspan="1"><input type="text" name="iDt" class="inputBoder0 ac" style="width:80px;" readonly></td>
														<th id="group2350" class="w2group " scope="row"><label id="textbox1441130" class="w2textbox " for="edtRmrkCntnTop">비고</label></th>
														<td id="group2351" class="w2group " colspan="1"><input type="text" name="iMemo" class="w100p inputBoder0" readonly></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div id="grpEtivStlInfrTop" style="display: none; visibility: hidden;" class="w2group" aria-hidden="true">
										<div id="group2319" class="w2group tbl_box">
											<table id="group2320" class="w2group tbl_form2 bd_none_top" cellspacing="0" cellpadding="0" summary="전자계산서의 공급가액을 나타낸 표">
												<caption id="textbox1441113" class="w2textbox ">전자계산서 결제 정보</caption>
												<colgroup id="tag28">
													<col style="width:15%">
													<col>
												</colgroup>
												<tbody id="group2321" class="w2group ">
													<tr id="group2337" class="w2group ">
														<th id="group2338" class="w2group " scope="row"><label id="textbox1441124" class="w2textbox " for="edtSumSplCftTop">공급가액</label></th>
														<td id="group2339" class="w2group "><span id="textbox1441125" class="w2textbox fn"></span></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div id="grpEtxivStlInfrTop" style="visibility: visible;" class="w2group " aria-hidden="false">
										<div id="grpSnc1000Top" class="w2group tbl_box">
											<table id="grpSnc1001Top" class="w2group tbl_form2 bd_none_top" cellspacing="0" cellpadding="0" summary="전자세금계산서의 합계금액, 공급가액, 세액을 나타낸 표">
												<caption id="grpSnc1002Top" class="w2textbox ">전자세금계산서 결제 정보</caption>
												<colgroup id="grpSnc1003Top">
													<col style="width:15%">
													<col style="width:20%">
													<col style="width:15%">
													<col>
													<col style="width:15%">
													<col>
												</colgroup>
												<tbody id="grpSnc1004Top" class="w2group ">
													<tr id="grpSnc1005Top" class="w2group ">
														<th id="txtTotaAmtHeaderTop" class="w2group " scope="row"><label id="txtTotaAmtTop" class="w2textbox " for="edtTotaAmtTop">합계금액</label></th>
														<td id="edtTotaAmtHeaderTop" class="w2group tar"><input type="text" name="iAmountTotal" class="w95p inputBoder0 ar" readonly style="font-size: 15px;font-weight: bold; color: red;"></td>
														<th id="txtSumSplCftHeaderTop" class="w2group " scope="row"><label id="txtSumSplCftTop" class="w2textbox " for="edtSumSplCftTop">공급가액</label></th>
														<td id="edtSumSplCftHeaderTop" class="w2group tar"><input type="text" name="iAmount" class="w95p inputBoder0 ar" readonly style="font-size: 15px;font-weight: bold; color: red;"></td>
														<th id="txtSumTxamtHeaderTop" class="w2group " scope="row"><label id="txtSumTxamtTop" class="w2textbox " for="edtSumTxamtTop">세액</label></th>
														<td id="edtSumTxamtHeaderTop" class="w2group tar"><input type="text" name="iAmountVat" class="w95p inputBoder0 ar" readonly style="font-size: 15px;font-weight: bold; color: red;"></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div id="grpEtxivLsatTop" class="w2group tbl_box" aria-hidden="false" style="visibility: visible;">
								<div id="grpLsat2001Top" class="w2group tbl_list">
									<table id="grpLsat2002Top" class="w2group " cellspacing="0" cellpadding="0" summary="월, 일, 품목, 규격, 수량, 단가, 합계, 공급가액, 세액, 비고, 삭제를 나타낸 표">
										<caption id="grpLsat2003Top" class="w2textbox ">계산서 품목 리스트 게시목록</caption>
										<colgroup id="grpLsat2004Top">
											<col style="width:8%">
											<col>
											<col style="width:8%">
											<col style="width:6%">
											<col style="width:11%">
											<col style="width:11%">
											<col style="width:11%">
											<col style="width:9%">
											<!-- col style="width:5%" -->
										</colgroup>
										<thead id="grpLsat2005Top" class="w2group ">
											<tr id="grpLsat2006Top" class="w2group ">
												<th id="grpTxtLsatSplMmTop" class="w2group " scope="col"><label id="txtLsatSplMmTop" class="w2textbox " for="edtLsatSplMmTop">일자</label></th>
												<th id="grpTxtLsatNmTop" class="w2group " scope="col"><label id="txtLsatNmTop" class="w2textbox " for="edtLsatNmTop">품목</label></th>
												<th id="grpTxtLsatRszeNmTop" class="w2group " scope="col"><label id="txtLsatRszeNmTop" class="w2textbox " for="edtLsatRszeNmTop">규격</label></th>
												<th id="grpTxtLsatQtyTop" class="w2group " scope="col"><label id="txtLsatQtyTop" class="w2textbox " for="edtLsatQtyTop">수량</label></th>
												<th id="grpTxtLsatUtprcTop" class="w2group " scope="col"><label id="txtLsatUtprcTop" class="w2textbox " for="edtLsatUtprcTop">단가</label></th>
												<th id="grpTxtLsatSplCftTop" class="w2group " scope="col"><label id="txtLsatSplCftTop" class="w2textbox " for="edtLsatSplCftTop">공급가액</label></th>
												<th id="grpTxtLsatTxamtTop" class="w2group " scope="col"><label id="txtLsatTxamtTop" class="w2textbox " for="edtLsatTxamtTop">세액</label></th>
												<th id="grpTxtLsatRmrkCntnTop" class="w2group " scope="col"><label id="txtLsatRmrkCntnTop" class="w2textbox " for="edtLsatRmrkCntnTop">비고</label></th>
												<!-- th id="grpTxtLsatRowDltTop" class="w2group " scope="col"><label id="txtLsatRowDltTop" class="w2textbox " for="btnLsatRowDltTop">삭제</label></th -->
											</tr>
										</thead>
										<tbody class="orderList">
											<tr id="genEtxivLsatTop_0_grpLsat2007Top" class="w2group ">
												<td id="genEtxivLsatTop_0_grpEdtLsatSplMmTop" class="w2group tac"><input type="hidden" name="lSeq"><input type="text" name="lDt" class="w98p inputBoder0" readonly></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatNmTop" class="w2group tac"><input type="text" name="lilItem" class="w98p inputBoder0" readonly></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatRszeNmTop" class="w2group tac"><input type="text" name="lilStandard" class="w98p inputBoder0 ac" readonly></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatQtyTop" class="w2group tac"><input type="text" name="lilCnt" class="w98p inputBoder0 ac"></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatUtprcTop" class="w2group tac"><input type="text" name="lilUnitPrice" class="w98p inputBoder0 ar" readonly></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatSplCftTop" class="w2group tac"><input type="text" name="lilAmount" class="w98p inputBoder0 ar" readonly></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatTxamtTop" class="w2group tac"><input type="text" name="lilAmountVat" class="w98p inputBoder0 ar" readonly></td>
												<td id="genEtxivLsatTop_0_grpEdtLsatRmrkCntnTop" class="w2group tac"><input type="text" name="lilMemo" class="w98p inputBoder0" readonly></td>
												<!-- td id="genEtxivLsatTop_0_grpLsat2008Top" class="w2group tac"></td -->
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="grpStlMthdTop" class="w2group tax_result">
								<div id="grpSncCl1000Top" class="w2group tbl_box fl">
									<div id="grpSncCl1003Top" class="w2group tbl_list">
										<table id="grpSncCl1004Top" class="w2group " cellspacing="0" cellpadding="0" summary="현금, 수표, 어음, 외상미수금 정보가 있습니다.">
											<caption id="grpSncCl1005Top" class="w2textbox ">결재구분정보</caption>
											<thead id="grpSncCl1006Top" class="w2group ">
												<tr id="grpSncCl1007Top" class="w2group ">
													<th id="txtStlMthd10HeaderTop" class="w2group " scope="col"><label id="txtStlMthd10Top" class="w2textbox " for="edtStlMthd10Top">현금</label></th>
													<th id="txtStlMthd20HeaderTop" class="w2group " scope="col"><label id="txtStlMthd20Top" class="w2textbox " for="edtStlMthd20Top">수표</label></th>
													<th id="txtStlMthd30HeaderTop" class="w2group " scope="col"><label id="txtStlMthd30Top" class="w2textbox " for="edtStlMthd30Top">어음</label></th>
													<th id="txtStlMthd40HeaderTop" class="w2group " scope="col"><label id="txtStlMthd40Top" class="w2textbox " for="edtStlMthd40Top">외상미수금</label></th>
												</tr>
											</thead>
											<tbody id="grpSncCl1008Top" class="w2group ">
												<tr id="grpStlMthdAmtDtlTop" class="w2group ">
													<td id="edtStlMthd10HeaderTop" class="w2group tar"><input type="text" name="iAmountCash" class="w98p inputBoder0 ar" readonly></td>
													<td id="edtStlMthd20HeaderTop" class="w2group tar"><input type="text" name="iAmountCheque" class="w98p inputBoder0 ar" value="0" readonly></td>
													<td id="edtStlMthd30HeaderTop" class="w2group tar"><input type="text" name="iAmountPromissoryNote" class="w98p inputBoder0 ar" value="0" readonly></td>
													<td id="edtStlMthd40HeaderTop" class="w2group tar"><input type="text" name="iAmountCredit" class="w98p inputBoder0 ar" value="0" readonly></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div id="grpSncCl1010Top" class="w2group fr">
									<div id="grpSncCl1011Top" class="w2group area_wrap">
										<div id="txtRecApeClCdHeaderTop" class="w2group area ar"><span id="txtRecApeClCdTop" class="w2textbox ">이 금액을 (청구)함</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
