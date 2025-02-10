<div id="CI00000005">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>장비관리</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="sNm">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="80px">
			<col width="40px">
			<col width="250px">
			<col width="60px">
			<col width="120px">
			<col width="50px">
			<col width="150px">
			<col width="20px">
			<col width="100px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			<col width="100px">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 유형</th>
					<td>
						<select name="skCd" class="w100p schColumBorderColorDefault"><option value="">전체</option><option value="S">자재</option><option value="P">제품</option></select>
					</td>
					<th class="ar">· 분류</th>
					<td>
						<select name="scSeq" class="schColumBorderColorDefault" style="width:80px;"><option value="">전체</option></select>
						<select name="scSeq2" class="schColumBorderColorDefault" style="width:80px;"><option value="">중분류 전체</option></select>
						<select name="scSeq3" class="schColumBorderColorDefault" style="width:78px;"><option value="">소분류 전체</option></select>	
					</td>
					
					<th class="ar">· 보관창고</th>
					<td>
						<select name="cpSeq" class="w100p schColumBorderColorDefault"><option value="">전체</option></select>
					</td>
					<th class="ar">· 자재명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="searchColumn" type="hidden" value="sNm">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar"><input type="checkbox" name="safeWarning" value="Y"></th>
					<td>
						안전량 미만 재고
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<strong>총 재고자산액 : <span class="totalPrice">0</span>원</strong>
						</div>
					</td>
					<td>
						
						<div class="ar">
							<!-- a href="#" class="btnSearch btnKindManager" title="자재 분류를 관리 할 수 있습니다." style=""><i class="fa-solid fa-shapes"></i> 분류관리</a -->
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
				<col width="45px"><!-- 주요자재여부 -->
				<col width="65px"><!-- 유형 -->
				<!-- col width="200px" --><!-- 분류 -->
				<col width="80px"><!-- 자재코드 -->
				<col width="150px"><!-- 자재명 -->
				<col width="150px"><!-- 규격 -->
				<col width="70px"><!-- 안전재고량 -->
				<col width="70px"><!-- 재고량 -->
				<col width="90px"><!-- 평귱금액 -->
				<col width="100px"><!-- 총금액 -->
				<col width="140px"><!-- 저장소 -->
				<col width="auto"><!-- 메모 -->
				<col width="120px"><!-- 주요거래처 -->
				<col width="50px"><!-- 사용여부 -->
				<col width="120px"><!-- 등록일시 -->
				<col width="50px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="sMarkYn">주요 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>유형</th>
					<!-- th>사용분류</th -->
					<th class="sortTd" column="sCode">자재코드 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sNm">자재명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sStandard">규격 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sSafeCnt">안전량 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sCnt">재고량 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sPrice">평균단가 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sTotalPrice">총금액 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>보관창고</th>
					<th>메모</th>
					<th class="sortTd">주요거래처</th>
					<th class="sortTd" column="useYn">사용 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
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
					<col width="45px"><!-- 주요자재여부 -->
					<col width="65px"><!-- 유형 -->
					<!-- col width="200px" --><!-- 사용분류 -->
					<col width="80px"><!-- 자재명 -->
					<col width="150px"><!-- 자재명 -->
					<col width="150px"><!-- 규격 -->
					<col width="70px"><!-- 안전재고량 -->
					<col width="70px"><!-- 재고량 -->
					<col width="90px"><!-- 평귱금액 -->
					<col width="100px"><!-- 총금액 -->
					<col width="140px"><!-- 저장소 -->
					<col width="auto"><!-- 메모 -->
					<col width="120px"><!-- 주요거래처 -->
					<col width="50px"><!-- 사용여부 -->
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
					<a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;";></i></a>
					<a href="#" class="btnStyleMin03 btnExcelUpload" title="엑셀파일 등록"><i class="fa-solid fa-upload" style="color: #38a938;margin-top: 4px;"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>


<template id="stockDiv">
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
							<col width="90px">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac">유&nbsp;&nbsp;&nbsp;&nbsp;형</th>
								<td class="">
									<strong class="stockKindSCheck" style="margin-right:10px;"><input id="stockKindSCheck" type="checkbox" name="skCd" value="S"><label for="stockKindSCheck"></label> 자재</strong>
									<strong colspan="3" class="stockKindPCheck" style="margin-right:10px;"><input id="stockKindPCheck" type="checkbox" name="skCd" value="P"><label for="stockKindPCheck"></label> 제품</strong>
									<!-- table style="margin:0px" class="tr_nohover bd_none no_pd padding_none">
										<colgroup>
											<col style="width:20px;">
											<col style="width:auto;">
											<col style="width:20px;">
											<col style="width:auto;">
										</colgroup>
										<tbody>
											<tr>
												<td class="no_bd" style="padding-right:0px;padding-bottom: 3px;"><input type="checkbox" name="skCd" value="S"></td>
												<td class="no_bd">자재 </td>
												<td class="no_bd" style="padding-right:0px;padding-bottom: 3px;"><input type="checkbox" name="skCd" value="P"></td>
												<td class="no_bd"> 제품 </td>
											</tr>
										</tbody>
									</table -->
								<th class="ac">중요여부</th>
								<td class="ar"><select name="sMarkYn" class="w100p" style="padding-left:2px;"><option value="N">일반</option><option value="Y">중요</option></select></td>						
							</tr>	
							<tr>
								<th class="ac"><span style="color:red;">*</span> 자재명</th>
								<td>
									<div class="inputTextCleanDiv">
										<input type="text" name="sNm" style="width:320px;" requiremsg="자재명" placeholder="자재명">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
								<th class="ac">사용여부</th>
								<td class="ar"><select name="useYn" class="w99p" style="padding-left:2px;"><option value="Y">사용</option><option value="N">미사용</option></select></td>						
							</tr>
							<tr>
								<th class="ac">코&nbsp;&nbsp;&nbsp;&nbsp;드</th>
								<td>
									<div class="inputTextCleanDiv">
										<input type="text" name="sCode" style="width:320px;" placeholder="자재코드">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
								<th class="ac">안전재고</th>
								<td class="al"><div class="inputTextCleanDiv"><input type="text" name="sSafeCnt" class="ar" style="width:79px;" placeholder="안전재고량"><div class="inputTextClean"><span>×</span></div></div></td>						
							</tr>
							<tr>
								<th class="ac">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
								<td>
									<div class="inputTextCleanDiv">
										<input name="sStandard" type="text" style="width:320px;" placeholder="규격">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>						
								<th class="ac">현재재고</th>
								<td class="ar"><input type="text" name="sCnt" class="w100p ar disabled" readonly></td>						
							</tr>
							<tr>
								<th class="ac">구매처</th>
								<td colspan="3" class="stockCustomerTd">
									<input type="hidden" name="cuSeqs">
									<span class="stockCustomer " style="width:460px;display:inline-block;"></span>
									<i class="fa-solid fa-building cursorPointer stockCustomerChoice" style="float: right;font-size:15px;color:#2a51d5;" title="주요 거래처 선택"></i>
								</td>
							</tr>
							<tr>
								<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
								<td colspan="3"><textarea name="sMemo" style="width:478px;" rows="1" placeholder="자재 정보에 필요한 정보를 기록하십시요"></textarea></td>
							</tr>
							<tr>
								<th class="ac">분&nbsp;&nbsp;&nbsp;&nbsp;류</th>
								<td colspan="3" class="stockCategoryTd">
									<input type="hidden" name="scSeqs">
									<span class="stockCategory" style="width:460px;display:inline-block;"></span>
									<i class="fa-solid fa-folder-open stockCategoryChoice cursorPointer" style="float: right;font-size:15px;color:#2a51d5;" title="분류 선택"></i>
								</td>
							</tr>
							<!-- tr>
								<th class="ac">사용분류</th>
								<td colspan="3" class="stockTypeTd">
									<input type="hidden" name="typeInfo">
									<span class="stockTypes w95p" style="display:inline-block;"></span>
									<i class="fa-solid fa-shapes stockTypeChoice cursorPointer" style="color:#2a51d5;" title="유형 선택"></i>
								</td>
							</tr -->
							<tr class="placeArae">
								<th class="ac">보관창고</th>
								<td colspan="3">
									<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
										<caption></caption>
										<colgroup>
										<col width="auto"><!--저장소-->
												<!--col width="15%" --><!--안전수량-->
												<col width="15%"><!--수량-->
												<col width="20%"><!--단가-->
												<col width="5%"><!--삭제-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">창고</th>
												<!-- th style="border-bottom: 0px;border-left:1px solid #ccc;">안전량</th -->
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">수량</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">단가</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;"></th>
											</tr>
										</thead>
									</table>
									<div class="overflowYListdiv overflowFixWrap " style="height:70px;overflow: overlay;">
										<table class="listTbType02 tr_nohover dataListTable" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
											<colgroup>
												<col width="auto"><!--저장소-->
												<!-- col width="15%" --><!--안전수량-->
												<col width="15%"><!--수량-->
												<col width="20%"><!--단가-->
												<col width="5%"><!--삭제-->
											</colgroup>
											<tbody>
												<!-- tr>
													<td class="ac" style="height:30px;background:#fff;"></td>
													<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"></td>
													<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"></td>
													<td class="ar" style="height:30px;background:#fff;border-left:1px solid #ccc;"></td>
												</tr -->
											</tbody>
											<tfoot>
											</tfoot>
										</table>
									</div>
									<table class="listTbType02 tr_nohover placeList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
										<colgroup>
											<col width="auto"><!--저장소-->
												<!-- col width="15%" --><!--안전수량-->
											<col width="15%"><!--수량-->
											<col width="20%"><!--단가-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<tbody>
											<tr>
												<td class="ac" style="height:30px;background:#fff;">
													<!-- input type="hidden" name="cpSeq"><input type="text" name="cpNm" class="w100p srchIp" -->
													 <select name="cpSeq" class="w100p"></select>
												</td>
												<!-- td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;"><input type="text" name="sSafeCnt" class="w100p ar"></td -->
												<td class="al" style="height:30px;background:#fff;border-left:1px solid #ccc;"><div class="inputTextCleanDiv"><input type="text" name="sioCnt" class="ar" style="width:60px;" placeholder="수량"><div class="inputTextClean"><span>×</span></div></div></td>
												<td class="al" style="height:30px;background:#fff;border-left:1px solid #ccc;"><div class="inputTextCleanDiv"><input type="text" name="sioUnitPrice" class="ar" style="width:85px;" placeholder="단가"><div class="inputTextClean"><span>×</span></div></div></td>
												<td class="ac" style="height:30px;background:#fff;border-left:1px solid #ccc;padding:0px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a></td>
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
<template id="stockTypeChoice">
	<div class="mw_defalut" style="width:300px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">사용분류선택</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch applySave">선택완료</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="searchWrap">
					<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
								<col width="40px"><!--선택-->
								<col width="auto"><!--유형-->
						</colgroup>
						<thead>
							<tr>
								<th style="border-bottom: 0px;border-left:1px solid #ccc;">선택</th>
								<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;">분류</th>
							</tr>
						</thead>
					</table>
					<div class="overflowYListdiv overflowFixWrap " style="height:150px;overflow: overlay;">
						<table class="listTbType02 tr_nohover dataListTable" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
							<colgroup>
								<col width="40px"><!--선택-->
								<col width="auto"><!--유형-->
							</colgroup>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>	
<template id="stockCategoryChoice">
	<div class="mw_defalut" style="width:300px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">분류선택</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch applySave">선택완료</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="searchWrap">
					<table class="listTbType07 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="25px"><!--check-->
							<col width="auto"><!--분류명-->
						</colgroup>
						<thead>
							<tr>
								<th style="border-left: 1px solid #aaa;"><!-- input type="checkbox" class="vm" name="chckAll" --></th>
								<th class="last">분류명</th>
							</tr>
						</thead>
					</table>
					<div class="overflowYListdiv overflowFixWrap " style="height:300px;overflow: overlay;">
						<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
							<col width="25px"><!--check-->
							<col width="auto"><!--분류명-->
							</colgroup>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>	
<template id="stockCustomerChoice">
	<div class="mw_defalut" style="width:300px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">주요거래처</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch applySave">선택완료</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="searchWrap">
					<table class="listTbType07 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="auto"><!--분류명-->
							<col width="25px"><!--삭제-->
						</colgroup>
						<thead>
							<tr>
								<th style="border-left: 1px solid #aaa;">업체명</th>
								<th></th>
							</tr>
						</thead>
					</table>
					<div class="overflowYListdiv overflowFixWrap " style="height:150px;overflow: overlay;">
						<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
							<col width="auto"><!--분류명-->
							<col width="25px"><!--삭제제-->
							</colgroup>
							<tbody>
							</tbody>
						</table>
					</div>
					<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="auto"><!--분류명-->
							<col width="25px"><!--삭제-->
						</colgroup>
						<tbody class="customerAddArea">
							<tr>
								<td class="al" style="border:0px;">
								<div class="inputTextCleanDiv">
										<input type="hidden" name="cuSeq">
										<input type="text" class="srchIp" name="cuNm" style="width:210px;"> 
										<div class="inputTextClean"><span>×</span></div>
									</div></td>
								<td class="ac" style="border:0px;">
									<a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus customerAdd" style="color:#2a51d5;font-size: 18px;"></i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>		
<template id="stockExcelInsert">
	<div class="mw_defalut" style="width:380px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">자재 등록</span>
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
											<a href="javascript:void(0);" class="btnSearch3 btnExcelDocDown"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;" ;=""></i> 엑셀 양식 받기</a>
										</div>
									</th>
									<th>
										<div class="ar">
											
											<a href="javascript:void(0);" class="btnSearch btnExcelInsert"> 등록</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<td>
										<a href="javascript:void(0);" class="orderFileAddBtn btnAddFile" style="margin-left:5px;margin-right:5px;height:25px !important; font-size:11px !important;" title="최대 1Mb까지 첨부 가능합니다.">파일첨부</a> 
										<span class="addFileName oFileNmDown"></span>
										<input name="excelFile" style="display: none;" type="file" accept=".xls, .xlsx">
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