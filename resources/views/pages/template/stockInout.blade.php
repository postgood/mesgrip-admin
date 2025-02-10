<div id="CI00000005">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>장비관리</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="sioDt">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="200px">
			<col width="50px">
			<col width="60px">
			<col width="40px">
			<col width="60px">
			<col width="60px">
			<col width="60px">
			<col width="40px">
			<col width="60px">
			<col width="50px">
			<col width="170px">
			<col width="40px">
			<col width="60px">
			<col width="auto">
			<col width="165px">
			<col width="180px">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<th class="ar">· 입출고</th>
					<td>
						<select name="sioKind" class="w100p schColumBorderColorDefault"><option value="">전체</option><option value="I">입고</option><option value="O">출고</option></select>
					</td>
					<th class="ar">· 유형</th>
					<td>
						<select name="sioInsideYn" class="w100p schColumBorderColorDefault"><option value="">전체</option><option value="N">외부</option><option value="Y">내부</option></select>
					</td>
					<th class="ar">· 보관창고</th>
					<td>
						<select name="cpSeq" class="w100p schColumBorderColorDefault"><option value="">전체</option></select>
					</td>
					<th class="ar">· 분류</th>
					<td>
						<select name="skCd" class="w100p schColumBorderColorDefault"><option value="">전체</option><option value="S">자재</option><option value="P">분류</option></select>
					</td>
					<th class="ar">· 자재명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="searchColumn" type="hidden" value="sNm">
							<input class="srchIp schColumBorderTextDefault" style="width:145px;height:28px !important;" name="searchWord" type="text" placeholder="자재명 또는 코드" autocomplete="false">
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
						<div class="ar">
							<strong style="color:#ea467f;">입고자산 : <span class="inTotalPrice">0</span>원</strong>
						</div>
					</td>
					<td>
						<div class="ar">
							<strong style="color:#566981;">출고자산 : <span class="outTotalPrice">0</span>원</strong>
						</div>
					</td>
					<td>
						
						<div class="ar">
							<a href="#" class="btnSearch btnInsideCreate" title="저장소에서 다른 저장소로 이동시 등록 할수 있습니다." style=""><i class="fa-solid fa-right-left"></i> 내부이동</a>
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
				<col width="80px"><!-- 일자 -->
				<col width="50px"><!-- 입출고유형 -->
				<col width="50px"><!-- 구분 -->
				<col width="180px"><!-- 자재명 -->
				<col width="150px"><!-- 규격 -->
				<col width="150px"><!-- 저장소 -->
				<col width="80px"><!-- 수량 -->
				<col width="80px"><!-- 단가 -->
				<col width="120px"><!-- 금액 -->
				<!-- col width="150px"--><!-- 모델명 -->
				<!-- col width="150px" --><!-- 규격 -->
				<col width="auto"><!-- 메모 -->
				<col width="70px"><!-- 등록자 -->
				<col width="120px"><!-- 등록일시 -->
				<col width="70px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="sioDt">일자 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>유형</th>
					<th class="sortTd" column="sioKind">입/출 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sNm">자재명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
					<th class="sortTd" column="cpNm">보관창고 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sioCnt">수량 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sioUnitPrice">단가 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>금액</th>
					<!-- th>모델명</th-->
					<!-- th>규격</th -->
					<th>메모</th>
					<th class="sortTd" column="eNm">등록자 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sSafeCnt">등록일시 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px"><!-- 선택 -->
					<col width="80px"><!-- 일자 -->
					<col width="50px"><!-- 입출고유형 -->
					<col width="50px"><!-- 구분 -->
					<col width="180px"><!-- 자재명 -->
					<col width="150px"><!-- 규격 -->
					<col width="150px"><!-- 저장소 -->
					<col width="80px"><!-- 수량 -->
					<col width="80px"><!-- 단가 -->
					<col width="120px"><!-- 금액 -->
					<!-- col width="150px"--><!-- 모델명 -->
					<!-- col width="150px" --><!-- 규격 -->
					<col width="auto"><!-- 메모 -->
					<col width="70px"><!-- 등록자 -->
					<col width="120px"><!-- 등록일시 -->
					<col width="70px"><!-- 보기 -->
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
					<a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;";></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>


<template id="stockInoutInsertDiv">
	<div class="mw_defalut" style="width:650px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">입출고 등록</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">저장</a></div>
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
						</colgroup>
						<tbody>
							<tr>
								<th class="ac"><span style="color:red;">*</span> 일&nbsp;&nbsp;&nbsp;&nbsp;자</th>
								<td><input class="date crdrIp" type="text" name="sioDt" placeholder="날짜 선택" readonly=""></td>
								<th class="ac">구&nbsp;&nbsp;&nbsp;&nbsp;분</th>
								<td class="ar"><select name="sioKind" class="w100p"><option value="I">입고</option><option value="O">출고</option></select></td>						
							</tr>
							<tr class="placeArae">
								<td colspan="4">
									<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
										<caption></caption>
										<colgroup>
											<col width="25%"><!--자재명-->
											<col width="20%"><!--규격-->
											<col width="auto"><!--보관창고-->
											<col width="10%"><!--수량-->
											<col width="10%"><!--단가-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">보관창고</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">수&nbsp;&nbsp;&nbsp;&nbsp;량</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">단&nbsp;&nbsp;&nbsp;&nbsp;가</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;"></th>
											</tr>
										</thead>
									</table>
									<div class="overflowYListdiv overflowFixWrap " style="height:120px;overflow: overlay;">
										<table class="listTbType02 tr_nohover dataListTable inoutList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
											<colgroup>
												<col width="25%"><!--자재명-->
												<col width="20%"><!--규격-->
												<col width="auto"><!--보관창고-->
												<col width="10%"><!--수량-->
												<col width="10%"><!--단가-->
												<col width="5%"><!--삭제-->
											</colgroup>
											<tbody>
											</tbody>
											<tfoot>
											</tfoot>
										</table>
									</div>
									<table class="listTbType02 tr_nohover inoutInfo" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
										<colgroup>
											<col width="25%"><!--자재명-->
											<col width="20%"><!--규격-->
											<col width="auto"><!--보관창고-->
											<col width="10%"><!--수량-->
											<col width="10%"><!--단가-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<tbody>
											<tr>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<div class="inputTextCleanDiv">	
														<input type="hidden" name="sSeq">
														<input type="text" name="sNm" class="w97p srchIp" placeholder="자재명 또는 코드">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<input type="text" name="sStandard" class="al readonly" style="width:105px;" readonly="readonly">
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<select name="cpSeq" class="w100p"></select>
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;"><div class="inputTextCleanDiv"><input type="text" name="sioCnt" class="w100p ar" placeholder="수량"><div class="inputTextClean"><span>×</span></div></div></td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;"><div class="inputTextCleanDiv"><input type="text" name="sioUnitPrice" class="w100p ar" placeholder="단가"><div class="inputTextClean"><span>×</span></div></div></td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;padding-right:0px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
								<td colspan="3">
									<div class="inputTextCleanDiv">	
										<input style="width:510px;" type="text" name="sioMemo" placeholder="메모">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="stockInoutInsideInsertDiv">
	<div class="mw_defalut" style="width:650px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">자재 내부이동 등록</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">저장</a></div>
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
							<col width="100px">
							<col width="70px">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac"><span style="color:red;">*</span> 일&nbsp;&nbsp;&nbsp;&nbsp;자</th>
								<td><input class="date crdrIp" type="text" name="sioDt" placeholder="날짜 선택" readonly=""></td>
								<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
								<td>
									<div class="inputTextCleanDiv">	
										<input style="width:340px;" type="text" name="sioMemo" placeholder="메모">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
							</tr>
							<tr class="placeArae">
								<td colspan="4">
									<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
										<caption></caption>
										<colgroup>
											<col width="25%"><!--자재명-->
											<col width="20%"><!--규격-->
											<col width="15%"><!--수량-->
											<col width="25%"><!--저장소-->
											<col width="5%"><!--아이콘-->
											<col width="25%"><!--이동 저장소-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">수&nbsp;&nbsp;&nbsp;&nbsp;량</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:0px;">출고창고</th>
												<th style="border-bottom: 0px;border-left:0px;border-right:0px;"></th>
												<th style="border-bottom: 0px;border-left:0px;">입고창고</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;"></th>
											</tr>
										</thead>
									</table>
									<div class="overflowYListdiv overflowFixWrap " style="height:120px;overflow: overlay;">
										<table class="listTbType02 tr_nohover dataListTable inoutList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
											<colgroup>
												<col width="25%"><!--자재명-->
												<col width="20%"><!--규격-->
												<col width="15%"><!--수량-->
												<col width="25%"><!--저장소-->
												<col width="5%"><!--아이콘-->
												<col width="25%"><!--이동 저장소-->
												<col width="5%"><!--삭제-->
											</colgroup>
											<tbody>
											</tbody>
										</table>
									</div>
									<table class="listTbType02 tr_nohover inoutInfo" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
										<colgroup>
											<col width="25%"><!--자재명-->
											<col width="20%"><!--규격-->
											<col width="15%"><!--수량-->
											<col width="25%"><!--저장소-->
											<col width="5%"><!--아이콘-->
											<col width="25%"><!--이동 저장소-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<tbody>
											<tr>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<div class="inputTextCleanDiv">	
														<input type="hidden" name="sSeq">
														<input type="text" name="sNm" class="w97p srchIp" placeholder="자재명 또는 코드">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<input type="text" name="sStandard" class="al readonly" style="width:85px;" readonly="readonly">
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<div class="inputTextCleanDiv">	
														<input type="text" name="sioCnt" class="ar" style="width:55px;" placeholder="수량">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<select name="cpSeq" class="w100p"></select>
												</td>
												<td class="ar" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">▶</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<select name="toCpSeq" class="w100p"></select>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a></td>
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
<template id="stockInoutViewDiv">
	<div class="mw_defalut" style="width:550px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">입출고 수정</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">수정</a></div>
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
							<col width="100px">
							<col width="70px">
							<col width="auto">
							<col width="70px">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac"><span style="color:red;">*</span> 일&nbsp;&nbsp;&nbsp;&nbsp;자</th>
								<td><input class="date crdrIp" type="text" name="sioDt" placeholder="날짜 선택" readonly=""></td>
								<th class="ac">구&nbsp;&nbsp;&nbsp;&nbsp;분</th>
								<td class="ar"><select name="sioKind" class="w100p"><option value="I">입고</option><option value="O">출고</option></select></td>						
								<th class="ac">수&nbsp;&nbsp;&nbsp;&nbsp;량</th>
								<td class="ar"><input type="text" class="w100p ar" name="sioCnt"></td>						
							</tr>
							<tr>
								<th class="ac"><span style="color:red;">*</span> 저장소</th>
								<td class="cpSeqTd" colspan="3"><select name="cpSeq" class="w100p"></select></td>
								<th class="sioUnitPriceTd ac">단&nbsp;&nbsp;&nbsp;&nbsp;가</th>
								<td class="sioUnitPriceTd ar"><input type="text" class="w100p ar" name="sioUnitPrice"></td>						
							</tr>
							<tr>
								<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
								<td colspan="5"><input class="w100p" type="text" name="sioMemo"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="stockInoutInsideViewDiv">
	<div class="mw_defalut" style="width:450px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">내부이동 수정</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">수정</a></div>
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
							<col width="105px">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac">물폼명</th>
								<td colspan=""><input class="readonly w100p" type="text" name="sNm" readonly="readolny"></td>
								<th class="ac"><span style="color:red;">*</span> 일&nbsp;&nbsp;&nbsp;&nbsp;자</th>
								<td colspan=""><input class="date crdrIp" type="text" name="sioDt" placeholder="날짜 선택" readonly=""></td>
							</tr>
							<tr class="">
								<td colspan="4">
									<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
										<caption></caption>
										<colgroup>
											<col width="20%"><!--수량-->
											<col width="38%"><!--저장소-->
											<col width="4%"><!--아이콘-->
											<col width="38%"><!--이동 저장소-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">수 량</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:0px;">출고 저장소</th>
												<th style="border-bottom: 0px;border-left:0px;border-right:0px;"></th>
												<th style="border-bottom: 0px;border-left:0px;">입고 저장소</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"><input type="text" name="sioCnt" class="w100p ar" placeholder="수량"></td>
												<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;border-right:0px;">
													<select name="cpSeq" class="w100p" placeholder="출고지 선택"></select>
												</td>
												<td class="ar" style="height:30px;background:#fff;border-left:0px;border-right:0px;">▶</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px solid #ccc;">
													<select name="toCpSeq" class="w100p" placeholder="입고지 선택"></select>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
								<td colspan="3"><input class="w100p" type="text" name="sioMemo"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>