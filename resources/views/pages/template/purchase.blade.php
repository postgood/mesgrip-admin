<div id="CI00000005">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>장비관리</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="cuNm">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="200px">
			<col width="50px">
			<col width="150px">
			<!-- col width="50px">
			<col width="150px" -->
			<col width="30px">
			<col width="100px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			<col width="170px">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<th class="ar">· 거래쳐</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="searchColumn" type="hidden" value="cuNm">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<!--th class="ar">· 자재명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="srchIp schColumBorderTextDefault" name="sNm" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td -->
					<th class="ar"><input type="checkbox" name="unSend" value="Y"></th>
					<td>
						미발주 목록보기
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar"></div>
					</td>
					<td>
						
						<div class="ar">
							<a href="#" class="btnSearch btnStockInput" title="선택된 발주된 자재를 입고처리 합니다." style=""><i class="fa-solid fa-right-to-bracket"></i> 입고처리</a>
							<a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<!-- 영역 Wrap -->
	<div class="mt20">
		<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
				<col width="25px"><!-- 선택 -->
				<col width="200px"><!-- 거래처 -->
				<col width="auto"><!-- 관련자재 -->
				<col width="120px"><!-- 납품장소 -->
				<col width="90px"><!-- 희망일자 -->
				<col width="120px"><!-- 발주일시 -->
				<col width="80px"><!-- 발주자 -->
				<col width="70px"><!-- 작성자 -->
				<col width="120px"><!-- 등록일시 -->
				<col width="50px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="cuNm">거래처 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>자재</th>
					<th>납품장소</th>
					<th>납품희망일자</th>
					<th>발주일시</th>
					<th>발주자</th>
					<th>작성자</th>
					<th>등록일시</th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px"><!-- 선택 -->
					<col width="200px"><!-- 거래처 -->
					<col width="auto"><!-- 관련자재 -->
					<col width="120px"><!-- 납품장수 -->
					<col width="90px"><!-- 희망일자 -->
					<col width="120px"><!-- 발주일시 -->
					<col width="80px"><!-- 발주자 -->
					<col width="70px"><!-- 작성자 -->
					<col width="120px"><!-- 등록일시 -->
					<col width="50px"><!-- 보기 -->
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
					<!-- a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;";></i></a -->
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>


<template id="purchaseViewDiv">
	<div class="mw_defalut" style="width:620px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">등록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
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
										<a href="#" class="btnSearch fax" style="font-size:14px !important;padding-top:5px;background:#6572cd;border:1px solid #6572cd;" title="FAX보내기"><i class="fa-solid fa-fax"></i></a>
										<a href="#" class="btnSearch mail" style="font-size:17px !important;padding-top:3px;padding-left: 8px;padding-right: 8px;background:#6572cd;border:1px solid #6572cd;" title="메일보내기"><i class="fa-regular fa-envelope"></i></a>
										<a href="#" class="btnSearch print" style="font-size:14px !important;padding-top:5px;background:#6572cd;border:1px solid #6572cd;" title="인쇄"><i class="fas fa-print"></i></a>
										<a href="javascript:void(0);" class="btnSearch save">저장</a>
									</div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="searchWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10">
						<caption></caption>
						<colgroup>
							<col width="70px">
							<col width="auto">
							<col width="70px">
							<col width="auto">
							<col width="70px">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr class="creInfo">
								<th class="ac">작성자</th>
								<td class="eNm"></td>
								<th class="ac">발주자</th>
								<td class="puSendENm"></td>
								<th class="ac">발주일시</th>
								<td class="puSendDt"></td>
							</tr>	
							<tr>
								<th class="ac">거래처</th>
								<td class="" colspan="5">
									<div class="inputTextCleanDiv">
										<input name="cuSeq" type="hidden" value="">
										<input class="srchIp" style="width:405px;" name="cuNm" type="text" placeholder="거래처명">
										<div class="inputTextClean"><span>×</span></div>
									</div>
									<div class="f_rt w15p ar" style="height:25px;padding-top:4px;">
										<i class="fa-solid fa-building cursorPointer companyList" style="font-size:15px;margin-right:5px;color:#6572cd;" title="거래처 자재 가져오기"></i>
										<!--<i class="fa-solid fa-shapes cursorPointer typeList" style="font-size:15px;margin-right:5px;color:#6572cd;" title="사용분류에서 자재 가져오기"></i -->
										<i class="fa-solid fa-folder-tree cursorPointer categoryList" style="font-size:13px;margin-right:5px;color:#6572cd;" title="분류에서 자재 가져오기"></i>
									</div>
								</td>
							</tr>	
							<tr>
								<th class="ac">담당자</th>
								<td>
									<div class="inputTextCleanDiv">
										<input type="text" name="puInchargeNm" style="width:100px;" placeholder="담당자명">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
								<th class="ac">연락처</th>
								<td class="al">
									<div class="inputTextCleanDiv">
										<input type="text" name="puInchargeTel" style="width:100px;" placeholder="연락처">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>	
								<th class="ac">납품희망일</th>
								<td class="al"><input class="date crdrIp" type="text" name="puHopeDt" placeholder="날짜 선택" readonly></td>						
							</tr>
							
							<tr>
								<th class="ac">납품장소</th>
								<td colspan="5">
									<div class="inputTextCleanDiv">
										<input name="cpSeq" type="hidden">
										<input name="cpNm" type="text" class="srchIp" style="width:480px;" placeholder="보관창고">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>										
							</tr>
							<tr>
								<th class="ac">비고</th>
								<td colspan="5">
									<div class="inputTextCleanDiv">
										<input name="puMemo" type="text" style="width:480px;" placeholder="메모">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>										
							</tr>
							<tr>
								<td colspan="6">
									<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
										<caption></caption>
										<colgroup>
											<col width="140px"><!--자재명-->
											<col width="120px"><!--규격-->
											<col width="65px"><!--단가-->
											<col width="45px"><!--수량-->
											<col width="75px"><!--총금액-->
											<col width="auto"><!--비고-->
											<col width="30px"><!--삭제-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">단&nbsp;&nbsp;&nbsp;&nbsp;가</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">수&nbsp;&nbsp;&nbsp;&nbsp;량</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">총금액</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">메모</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;"></th>
											</tr>
										</thead>
									</table>
									<div class="overflowYListdiv overflowFixWrap " style="height:140px;overflow: overlay;">
										<table class="listTbType02 tr_nohover dataListTable" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
											<colgroup>
											<col width="140px"><!--자재명-->
											<col width="120px"><!--규격-->
											<col width="65px"><!--단가-->
											<col width="45px"><!--수량-->
											<col width="75px"><!--총금액-->
											<col width="auto"><!--비고-->
											<col width="30px"><!--삭제-->
											</colgroup> 
											<tbody></tbody>
											<tfoot>
											</tfoot>
										</table>
									</div>
									<table class="listTbType02 tr_nohover stockInfo" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
										<colgroup>
											<col width="140px"><!--자재명-->
											<col width="120px"><!--규격-->
											<col width="65px"><!--단가-->
											<col width="45px"><!--수량-->
											<col width="75px"><!--금액-->
											<col width="auto"><!--비고-->
											<col width="30px"><!--삭제-->
										</colgroup>
										<tbody>
											<tr>
												<td class="al" style="height:30px;background:#fff;">
													<input type="hidden" name="index">
													<div class="inputTextCleanDiv">
														<input type="hidden" name="sSeq">
														<input type="text" name="sNm" class="srchIp" style="width:130px;" placeholder="자재명 또는 코드">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;">
													<input type="text" name="sStandard" class="w100p readonly" readonly="readonly">
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:1px solid #ccc;">
													<div class="inputTextCleanDiv">
														<input type="text" name="puiPrice" class="ar" style="width:50px;" placeholder="단가">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:1px solid #ccc;">
													<div class="inputTextCleanDiv">
														<input type="text" name="puiCnt" class="ar" style="width:35px;" placeholder="수량">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;">
													<input type="text" name="puiTotalPrice" class="w100p ar readonly" readonly="readonly">
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:1px solid #ccc;">
													<div class="inputTextCleanDiv">
														<input type="text" name="puiMemo" class="al" style="width:62px;" placeholder="비고">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;padding:0px;">
													<a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="purchaseCompanyListDiv">
	<div class="mw_defalut" style="width:500px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">거래처 자재 목록</span>
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
								<th></th>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch btnApply">적용</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:315px;overflow-y:auto;padding:2px;">
					<div class="searchWrap pt10">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="40px">
								<col width="auto">
								<col width="120px">
								<col width="80px">
								<col width="60px">
							</colgroup>
							<thead>
								<tr>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">선택</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">자재명</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">규격</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">단가</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">재고</th>
								</tr>
							</thead>
							<tbody class="stockList">
							</tbody>
						</table>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>
<template id="purchaseTypeListDiv">
	<div class="mw_defalut" style="width:500px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">사용자분류 자재 목록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div class="bottonWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
						<caption></caption>
						<colgroup>
							<col width="55px">
							<col width="150px">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th>사용분류 :</th>
								<th><select name="stSeq" class="w100p"></select></th>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch btnApply">적용</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:315px;overflow-y:auto;padding:2px;">
					<div class="searchWrap pt10">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="40px">
								<col width="auto">
								<col width="120px">
								<col width="80px">
								<col width="60px">
							</colgroup>
							<thead>
								<tr>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">선택</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">자재명</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">규격</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">단가</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">재고</th>
								</tr>
							</thead>
							<tbody class="stockList">
							</tbody>
						</table>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>
<template id="purchaseCategoryListDiv">
	<div class="mw_defalut" style="width:500px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">분류 자재 목록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div class="bottonWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
						<caption></caption>
						<colgroup>
							<col width="55px">
							<col width="auto">
							<col width="100px">
						</colgroup>
						<tbody>
							<tr>
								<th>분류선택 :</th>
								<th>
									<select name="scSeq" class=""></select>
									<select name="scSeq2" class=""><option value=""></option></select>
									<select name="scSeq3" class=""><option value=""></option></select>
								</th>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch btnApply">추가</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:315px;overflow-y:auto;padding:2px;">
					<div class="searchWrap pt10">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="40px">
								<col width="auto">
								<col width="120px">
								<col width="80px">
								<col width="60px">
							</colgroup>
							<thead>
								<tr>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">선택</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">자재명</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">규격</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">단가</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">재고</th>
								</tr>
							</thead>
							<tbody class="stockList">
							</tbody>
						</table>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>
<template id="purchaseStockInsertDiv">
	<div class="mw_defalut" style="width:550px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">사용자분류 자재 목록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div class="bottonWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
						<caption></caption>
						<colgroup>
							<col width="auto">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th></th>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">적용</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:315px;overflow-y:auto;padding:2px;">
					<div class="searchWrap pt10">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="30px">
								<col width="auto">
								<col width="120px">
								<col width="70px">
								<col width="50px">
								<col width="50px">
							</colgroup>
							<thead>
								<tr>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;"><input type="checkbox" name="allCheck"></th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">자재명</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">규격</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">단가</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">주문량</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">입고량</th>
								</tr>
							</thead>
							<tbody class="stockList">
							</tbody>
						</table>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>
<template id="purchaseSendMail">
	<div class="mw_defalut ui-draggable" style="width: 580px; height: 300px; top: 205.5px; left: 670px;" id="">
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
									<th>
										<div class="al">
											<input type="hidden" name="wSeq" value="237">
										</div>
									</th>
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
										<input type="text" name="subject" class="w100p" requiremsg="제목">
									</td>
								</tr>
								<tr>
									<th class="txt_r">
										받는이 :
									</th>
									<td class="wESeq">
										<input type="text" name="to" class="w100p" vtype="mail" requiremsg="받는이 메일주소">
									</td>
									<th class="txt_r">
										참조 :
									</th>
									<td class="oFileNm">
										<input type="text" name="cc" class="w100p">
									</td>
								</tr>
								<tr>
									<th class="txt_r">
										첨부파일 :
									</th>
									<td class="oFileNm" colspan="3">
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
<template id="purchaseFax">
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
										<input type="text" name="cuNm" class="w100p readonly" readonly>
									</td>
									<th class="txt_r">
										FAX : 
									</th>
									<td class="">
										<input type="text" name="cuFax" class="w100p" >
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

<template id="purchaseDoc">
	<page size="A4" style="margin-bottom:1350px;overflow: hidden;">
		<div class="printA4">
			<table class="" style="width:100%;height:100px;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
				<tr class="">
					<td class="purchaseHead" style="width:100%;background-color:#fff;padding-bottom:5px;">
						<table class="" style="width:100%;height:80px;">
							<colgroup>
								<col width="75%">
								<col width="25%">
							</colgroup>
							<tbody>
								<tr style="width:100%;background-color:#fff;height:40px;">
									<td colsapn="2" style="background-color:#fff;padding-left:0px;"></td>
								</tr>
								<tr style="width:100%;background-color:#fff;">
									<td class="al" style="background-color:#fff;font-size:46px;font-weight:bold;text-align: left;vertical-align: top;font-family: 'Nanum Square', sans-serif;letter-spacing: -1px;"><strong>자재발주서</strong></td>
									<td class="ar companyLogo" rowspan="2" style="vertical-align: top;background-color:#fff;"></td>
								</tr>
								<tr style="width:100%;background-color:#fff;height:10px;">
									<td colsapn="2" style="background-color:#fff;padding-left:0px;"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr class="">
					<td class="customerInfo" style="background:#fff;">
						<table class="" style="width:100%;margin-top:10px;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
							<colgroup>
								<col width="50%">
								<col width="50%">
							</colgroup>
							<tbody>
								<tr>
									<td class="" style="height:180px;padding-left:0px;padding-right:15px;padding-bottom:5px;background: #fff;">
										<table cellpadding="0" cellspacing="0" class="tr_nohover customerInfo" style="width:100%;">
											<colgroup>
												<col width="13%">
												<col width="12%">
												<col width="auto">
												<col width="13%">
												<col width="35%">
											</colgroup>
											<tbody>
												<tr style="height:36px;background: #fff;">
													<td class="ac" style="height:36px;color:#000;background:#fff;border-left:0px;border-top:1px solid #000; border-bottom:1px solid #c1c1c1;border-right:0px; font-size:12px;;">발주일</th>
													<td class="al puSendDt" colspan="4" style="height:36px;background: #fff;border-right:0px;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;font-size:15px;"></td>
												</tr>
												<tr style="height:36px;background: #fff;">
													<th class="ac" style="height:36px;color:#000;background:#fff;border-left:0px;border-bottom:1px solid #c1c1c1;border-right:0px;font-size:12px;">업체명</th>
													<td class="al" colspan="4" style="height:36px;color:#000;background: #fff;border-bottom:1px solid #c1c1c1;border-right:0px;">
														<div class="cuNm f_lt" style="width:85%;font-size:16px;font-weight: bold;"></div>
														<div class="f_rt ar" style="width:14.9%;font-size:13px;font-weight:bold;" >귀하</div>
													</td>
												</tr>
												<tr style="height:36px;background: #fff;">
													<th class="ac" style="height:36px;color:#000;background:#fff;border-left:0px;border-bottom:1px solid #000;font-size:12px;">담당자</th>
													<td class="al puInchargeNm" colspan="2" style="height:36px;color:#000;background: #fff;border-bottom:1px solid #000; border-left:0px;border-right:0px;font-size:15px;"></td>
													<th class="ac" style="height:36px;color:#000;background:#fff;border-bottom:1px solid #000; border-left:0px;border-right:0px;font-size:12px;">연락처</th>
													<td class="al puInchargeTel" style="height:36px;color:#000;background: #fff;border-bottom:1px solid #000; border-left:0px;border-right:0px;font-size:15px;"></td>
												</tr>
												<tr style="height:36px;background: #fff;">
													<th class="ac" colspan="2" style="height:36px;color:#000;background:#fff;border-bottom:1px solid #c1c1c1;border-left:0px;border-right:0px;font-size:12px;">※ 입고요청일</th>
													<td class="al puHopeDt" colspan="3" style="height:36px;color:#000;background: #fff;border-bottom:1px solid #c1c1c1;border-right:0px;border-left:0px;font-size:14px;"></td>
												</tr>
												<tr style="height:36px;background: #fff;">
													<th class="ac" colspan="2" style="height:36px;color:#000;background:#fff;border-left:0px;border-bottom:1px solid #000;border-left:0px;border-right:0px;font-size:12px;">※ 입고요청지</th>
													<td class="al cpNm" colspan="3" style="height:36px;color:#000;background: #fff;border-bottom:1px solid #000;border-left:0px;border-right:0px;font-size:14px;"></td>
												</tr>
											</tbody>
										</table>
									</td>
									<td style="height:180px;padding-left:15px;padding-right:0px;padding-bottom:5px;background:#fff;">
										<table cellpadding="0" cellspacing="0" border="0" class="tr_nohover companyInfo" style="width:100%;">
											<colgroup>
												<col width="17%">
												<col width="13%">
												<col width="auto">
												<col width="10%">
												<col width="25%">
												<col width="5.5%">
											</colgroup>
											<tbody>
												<tr>
													<th class="ac" rowspan="6" style="color:#000;font-size:14px;font-weight: bold;background:#ddd;border-top:1px solid #000;border-left:0px;border-bottom:1px solid #000;border-right:0px;">발주처</th>
													<th class="ac cBizNo" colspan="5" style="height:30px;color:#000;font-size:14px;background:#fff;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-right:0px;border-left:0px;padding-left: 10px;font-weight: bold;"></th>
												</tr>
												<tr>
													<th class="al" style="height:30px;color:#333;font-size:12px;background:#fff;border-left:0px;border-bottom:1px solid #c1c1c1;border-right:0px;padding-left: 10px;">상호</th>
													<th class="al cNm" style="height:30px;color:#000;font-size:14px;font-weight: bold;background:#fff;border-bottom:1px solid #c1c1c1;border-right:0px;border-left:0px;"></th>
													<td class="ac" style="height:30px;color:#333;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;font-size:12px;">대표</td>
													<td class="al cOwnerNm" style="height:30px;color:#000;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;font-size:13px;"></td>
													<td class="ac" style="height:30px;color:#333;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;font-size:12px;">(인) </td> 
												</tr>
												<tr>
													<th class="al" style="height:30px;color:#333;font-size:12px;background:#fff;border-left:0px;border-bottom:1px solid #c1c1c1;border-right:0px;padding-left: 10px;">업태</th>
													<th class="al cUpjong" style="height:30px;color:#000;font-size:13px;background:#fff;border-bottom:1px solid #c1c1c1;border-right:0px;border-left:0px;"></th>
													<td class="ac" style="height:30px;color:#333;font-size:12px;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;border-left:0px;">종목</td>
													<td class="al cJongmok" colspan="2" style="height:30px;color:#000;font-size:13px;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;border-left:0px;"></td>
												</tr>
												<tr>
													<th class="al" style="height:30px;color:#333;font-size:12px;background:#fff;border-bottom:1px solid #c1c1c1;border-right:0px;border-left:0px;padding-left: 10px;">주소</th>
													<td class="al cAddr" colspan="4" style="height:30px;color:#000;font-size:13px;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;border-bottom-left:0px;"></td>
												</tr>
												<tr>
													<th class="ac" style="height:30px;color:#000;font-size:12px;background:#fff;border-bottom:1px solid #c1c1c1;border-right:0px;border-left:0px;"></th>
													<td class="al cAddrDetail" colspan="4" style="height:30px;color:#000;font-size:13px;background: #fff;border-right:0px;border-bottom:1px solid #c1c1c1;"></td>
												</tr>
												<tr>
													<th class="al" style="height:30px;color:#333;font-size:12px;background:#fff;border-bottom:1px solid #000;border-right:0px;border-left:0px;padding-left: 10px;">연락처</th>
													<td class="al cTel" colspan="4" style="height:30px;color:#000;font-size:13px;background: #fff;border-right:0px;border-bottom:1px solid #000;"></td>
												</tr>
											</tbody>
										</table>										
									</td>
								</tr>
								<tr>
									<td class="noborder" colspan="2" style="height:35px;padding-top:5px;padding-bottom:5px;padding-left:0px;padding-right:1px;background: #fff;">
										<span style="font-size:15px;">아래와 같이 발주합니다.</span>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td class="stockDetailArea" style="height: 680px;padding-top:10px;background:#fff;vertical-align: top;">
						<table class="workTableTypeA mb10" style="width:100%;">
							<colgroup>
								<col width="5%">
								<col width="30%">
								<col width="15%">
								<col width="10%">
								<col width="10%">
								<col width="15%">
							</colgroup>
							<thead>
								<tr class="" style="height:30px;">
									<td class="ac" style="height:30px;font-size:13px;font-weight: bold;background:#eee;border-top:1px solid #000;border-bottom:1px solid #000;border-left:0px;border-right:0px;">순번</th>
									<td class="ac" style="height:30px;font-size:13px;font-weight: bold;background:#eee;border-top:1px solid #000;border-bottom:1px solid #000;border-left:1px solid #999;border-right:0px;">품명</th>
									<td class="ac" style="height:30px;font-size:13px;font-weight: bold;background:#eee;border-top:1px solid #000;border-bottom:1px solid #000;border-left:1px solid #999;border-right:0px;">규격</td>
									<td class="ac" style="height:30px;font-size:13px;font-weight: bold;background:#eee;border-top:1px solid #000;border-bottom:1px solid #000;border-left:1px solid #999;border-right:0px;">수량</td>
									<td class="ac" style="height:30px;font-size:13px;font-weight: bold;background:#eee;border-top:1px solid #000;border-bottom:1px solid #000;border-left:1px solid #999;border-right:0px;">단가</td>
									<td class="ac" style="height:30px;font-size:13px;font-weight: bold;background:#eee;border-top:1px solid #000;border-bottom:1px solid #000;border-left:1px solid #999;border-right:0px;">비고</td>
								</tr>
							</thead>
							<tbody class="stockInfo">
								<tr style="height:30px;">
									<td class="ac rowNo" style="height:30px;font-size:13px;background:#fff;border-left:0px;border-bottom:1px solid #c1c1c1;"></th>
									<td class="al sNm" style="height:30px;font-size:13px;background:#fff;border-left:1px solid #c1c1c1;border-bottom:1px solid #c1c1c1;padding-left:5px;"></th>
									<td class="ac sStandard" style="height:30px;font-size:13px;background:#fff;border-left:1px solid #c1c1c1;border-bottom:1px solid #c1c1c1;"></td>
									<td class="ar puiCnt" style="height:30px;font-size:13px;background:#fff;border-left:1px solid #c1c1c1;border-bottom:1px solid #c1c1c1;padding-right:10px;"></td>
									<td class="ar puiPrice" style="height:30px;font-size:13px;background:#fff;border-left:1px solid #c1c1c1;border-bottom:1px solid #c1c1c1;padding-right:10px;"></td>
									<td class="al puiMemo" style="height:30px;font-size:13px;background:#fff;border-left:1px solid #c1c1c1;border-bottom:1px solid #c1c1c1;border-right:0px;padding-left:5px;"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</page>
</template>