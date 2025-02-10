<div id="____DIV_ID____">
	<div class="pageComment"></div>
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<style>

	</style>
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="200px">
			<!-- col width="55px" -->
			<col width="290px">
			<col width="45px">
			<col width="150px">
			<col width="35px">
			<col width="100px">
			<col width="25px">
			<col width="80px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<!-- th class="ar">· 작업상태</th -->
					<td class="ac"><table style="border:0px;display: inline-block;">
							<colgroup>
								<col width="15px">	
								<col width="20px">
								<col width="40px">
								<col width="20px">
								<col width="25px">
								<col width="20px">
								<col width="25px">
								<col width="20px">
								<col width="25px">
								<col width="20px">
								<col width="25px">
								<col width="20px">	
							</colgrop>
							<tbody>
							<td style="padding-left:2px;padding-right:5px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
							<td><input type="checkbox" name="oStatus" value="oApplyN" checked></td>
							<td style="padding-left:2px;">미승인</td>
							<td><input type="checkbox" name="oStatus" value="A" checked></td>
							<td style="padding-left:2px;">대기</td>
							<td><input type="checkbox" name="oStatus" value="B" checked></td>
							<td style="padding-left:2px;">진행</td>
							<td><input type="checkbox" name="oStatus" value="C"></td>
							<td style="padding-left:2px;">중지</td>
							<td><input type="checkbox" name="oStatus" value="D"></td>
							<td style="padding-left:2px;">완료</td>
							<td style="padding-left:10px;padding-right:0px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
							</tbody>
						</table>
						<!-- select name="oStatus" class="schColumBorderColorProcesss">
								<option value="">전체</option>
								<option value="oApplyN">미승인</option>
								<option value="A">대기</option>
								<option value="B">진행중</option>
								<option value="C">정지</option>
								<option value="D">완료</option>
							</select -->
					</td>
					<th class="ar">· 업체명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar">· 품명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="schColumBorderTextDefault" name="oFileNm" type="text" style="width:95px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					
					<td class="ac">
						<!-- div class="switchDiv" title="자주발생하는 수주로 설정된 수주건을 볼 수 있습니다.">
							<input type="checkbox" id="oMarkSwitch" name="oMarkYn" value="Y">
							<label for="oMarkSwitch" class="oMarkSwitch_label">
								<span class="onf_btn"></span>
							</label>
							반복수주
						</div -->
							<div style="display:block;aglin-items:center;"><input type="checkbox" name="oMarkYn" value="Y"><div>
					</td>
					<td style="padding-left:0px;padding-top:5px;"><strong style="font-size:11px;"title="자주발생하는 수주로 설정된 수주건을 볼 수 있습니다.">반복수주보기<strong>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<a href="#" class="btnSearch btnMarkCreate" title="자주 발생하는 주문을 코드를 부여하여 신규등록시 검색하여 사용 할 수 있습니다."><!-- i class="fa-regular fa-bookmark"></i --><i class="fa-regular fa-sun"></i>&nbsp;&nbsp;반복수주설정</a>
							<a href="#" class="btnSearch btnApproval" title="미승인된 수주건을 승인 처리 합니다."><i class="fa-solid fa-check"></i>&nbsp;&nbsp;작업승인</a>
							<a href="#" class="btnSearch btnCreate" title="신규 수주건을 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<!-- span class="btnCreate" style="color:#5073a1;font-size:17px;"><i class="fa-regular fa-square-plusbtn " style="" title="신규 수주건을 등록 할 수 있습니다." ></i></span -->
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt20">
		<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
				<col width="25px">
				<col width="30px"><!-- 작업지시서 -->
				<col width="80px"><!-- 등록일 -->
				<col width="45px"><!-- 상태 -->
				<col width="150px"><!-- 업체명 -->
				<col width="17px"><!-- 파일 -->
				<col width="auto"><!-- 파일명 -->
				<col width="65px"><!-- 규격 -->
				<col width="55px"><!-- 주문수량 -->
				<col width="55px"><!-- 주문수량 -->
				<col width="150px"><!-- 공정 -->
				<col width="145px"><!-- 입고처 -->
				<col width="120px"><!-- 입고일 -->
				<col width="40px"><!-- 입고 상태-->
				<col width="145px"><!-- 출고처 -->
				<col width="120px"><!-- 출고일 -->
				<col width="40px"><!-- 출고 상태-->
				<col width="0px"><!-- 보기 -->
				<col width="40px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th rowspan="2"><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th rowspan="2"><i class="fa-regular fa-note-sticky"></i></th>
					<th rowspan="2" column="creDate">등록일시 </th>
					<th rowspan="2" >수주<br/>상태 </th>
					<th rowspan="2" class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th rowspan="2" class="sortTd" column="oFileNm" colspan="2">품 명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th rowspan="2" column="oPaperSize" class="sortTd">규 격 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th rowspan="2" column="oCnt" style="border-right:0px;">주문량 </th>
					<th rowspan="2" column="oEndCnt" style="border-right:0px;">완료량 </th>
					<th rowspan="2" column="process" style="border-right:0px;">생산공정</th>
					<th colspan="3" column="istInNm" style="border-bottom:0px solid #3d4b5c;border-left:0px;border-right:0px;">입고현황 <span style="margin-left:10px;" title="대기">○ <span style="color:#68C3C7;" title="입고중">◐</span> <span style="color:#68C3C7;" title="완료">●</span></th>
					<th colspan="3" column="istOutNm" style="border-bottom:0px solid #3d4b5c;border-right:0px;border-left:0px;">출고현황  <span style="margin-left:10px;" title="대기">○ <span style="color:#b583f5;" title="출고중">◐</span> <span style="color:#b583f5;" title="완료">●</span></th>
					<th rowspan="2" style="border-left:0px;border-right:0px;"></th>
					<th rowspan="2" class="last" style="border-left:0px;">수주<br/>수정</th>
				</tr>
				<tr>

					<th column="ist.istInNm" class="sortTd" style="background:#68C3C7;border-left:1px solid #566981;border-right:1px solid #239ca1;border-bottom:0px solid #ccc;">입고장소 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"> </th>
					<th column="ist.istInHopeDt" class="sortTd" style="background:#68C3C7;border-right:1px solid #239ca1;border-bottom:0px solid #ccc;">입고일 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"> </th>
					<th column="istInStatusNm" style="background:#68C3C7;border-right:1px solid #239ca1;border-bottom:0px solid #ccc;">상태 </th>
					<th column="ist.istOutNm" class="sortTd" style="background:#b583f5;border-right:1px solid #974ff3;border-bottom:0px solid #ccc;">출고장소 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"> </th>
					<th column="ist.istOutHopeDt" class="sortTd" style="background:#b583f5;border-right:1px solid #974ff3;border-bottom:0px solid #ccc;">출고일 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="" style="background:#b583f5;border-bottom:0px solid #ccc;border-right:1px solid #566981;border-left:0px;">상태</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px">
				<col width="30px"><!-- 작업지시서 -->
				<col width="80px"><!-- 등록일 -->
				<col width="45px"><!-- 상태 -->
				<col width="150px"><!-- 업체명 -->
				<col width="17px"><!-- 파일 -->
				<col width="auto"><!-- 파일명 -->
				<col width="65px"><!-- 규격 -->
				<col width="55px"><!-- 주문수량 -->
				<col width="55px"><!-- 주문수량 -->
				<col width="150px"><!-- 공정 -->
				<col width="15px"><!-- 입고 지도아이콘 -->
				<col width="130px"><!-- 입고처 -->
				<col width="120px"><!-- 입고일 -->
				<col width="40px"><!-- 입고 -->
				<col width="15px"><!-- 출고 지도아이콘 -->
				<col width="130px"><!-- 출고처 -->
				<col width="120px"><!-- 출고일 -->
				<col width="40px"><!-- 출고 -->
				<col width="40px"><!-- 보기 -->
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
					<!-- span class="lastDateTime"></span -->
					<!-- a href="#" class="btnStyleMin03 btnAutoReload activeOff" title="자동새로고침"><i class="fa-solid fa-a"></i></a -->
					<a href="#" class="btnStyleMin03 btnFullScreen activeOff" title="풀스크린 보기"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="orderDiv">
	<div class="mw_defalut" style="width:950px;height:750px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">수주 등록</span>
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
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th>
										<div class="al f_lt" style="width:49.5%;"></div>
										<div class="ar f_rt" style="width:49.5%;">
											<table class="w100p noboard">
												<tr><td style="width:auto"></td>
													<td style="width:120px" class="ar">
														<strong class="applyCheck" style="margin-right:10px;"><input id="applyCheck" type="checkbox" name="oApprovalYn" value="Y"><label for="applyCheck"></label> 작업승인</strong>
														<a href="javascript:void(0);" class="btnSearch4 saveAs">재등록</a>
													</td>
													<td style="width:51px" class="ar">
														<a href="javascript:void(0);" class="btnSearch save">수정</a>
													</td>
												</tr>
											</table>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 orderMaster">
							<caption></caption>
							<colgroup>
								<col width="60px">
								<col width="120px">
								<col width="60px">
								<col width="120px">
								<col width="60px">
								<col width="120px">
								<col width="60px">
								<col width="120px">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 업체명</th>
									<td colspan="3">
										<div class="inputTextCleanDiv">
											<input type="hidden" name="cuSeq" requiremsg="업체명">
											<input type="text" name="cuNm" class="srchIp" placeholder="업체명" style="width:360px;ime-mode:active" tabindex="1" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th class="txt_r actionArea">주문일시</th>
									<td colspan="3" class="orderKey">
										<input type="hidden" name="oSeq" value="">
										<input type="hidden" name="istSeq" value="">
										<input type="text" name="creDate" class="w40p readonlyData">
									</td>
								</tr>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 품&nbsp;&nbsp;&nbsp;&nbsp;명</th>
									<td colspan="7" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
										<div class="inputTextCleanDiv" style="width:405px;">
											<input type="text" name="oFileNm" requiremsg="품명" tabindex="2" style="width:400px;" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
										<a href="javascript:void(0);" class="orderFileAddBtn btnAddFile" style="margin-left:5px;margin-right:5px;height:25px !important; font-size:11px !important;" title="최대 20Mb까지 첨부 가능합니다.">파일첨부</a> 
										<a href="javascript:void(0);" class="btnStyleMin05 btnDeleteFile" style="margin-left:5px;margin-right:5px;display:none;">파일 삭제</a>
										<i class="fa-solid fa-download oFileNmDown" style="margin-right:5px; display:none" title="파일 받기"></i>
										<span class="addFileName oFileNmDown"></span>
										<input name="orderFile" style="display: none;" type="file"> <!-- accept="*/*" -->
									</td>
								</tr>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
									<td>
										<div class="inputTextCleanDiv">
											<input type="text" name="oPaperSize" class="w98p srchIp" placeholder="2절, 국2절, 650*450" requiremsg="용지규격" tabindex="3" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th class="txt_r"><span style="color:red;">*</span> 수량</th>
									<td>
										<div class="inputTextCleanDiv">
											<input type="text" name="oCnt" class="w98p txt_r" placeholder="10000" requiremsg="수량" vtype="num" tabindex="4" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th class="txt_r">담당자</th>
									<td>
										<div class="inputTextCleanDiv" style="width: 100%;">
											<input type="text" name="oInchargeNm" class="srchIp" placeholder="성명" tabindex="5" style="width:115px;" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
											<i class="fa-solid fa-user-group f_rt customerEmployee cursorPointer" title="거래처 직원 목록" style="margin-left: 5px;margin-top: 6px;"></i>
										</div>
									</td>
									<th class="txt_r">연락처</th>
									<td>
										<div class="inputTextCleanDiv">
											<input type="text" name="oInchargeTel" class="w98p" placeholder="전화번호" tabindex="6" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
								</tr>
								<tr>
									<th class="txt_r">비&nbsp;&nbsp;&nbsp;&nbsp;고</th>
									<td colspan="7"><textarea name="oMemo"class="w100p" rows="1" tabindex="7"></textarea></td>
								</tr>
							</tbody>
						</table>

						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="8.5%">
								<col width="23%">
								<col width="auto">
								<col width="8.5%">
								<col width="23%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th rowspan="4" class="txt_r" style="vertical-align: top;">
										<div class="f_rt" style="width:50%; height: 17%; padding-top: 5px; border-top-left-radius: 5px;border-top-right-radius: 0px; border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;border-top-width: 1px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 1px;border-top-style: solid;border-bottom-style: solid;border-left-style: solid; border-top-color: #9ac7e1; border-bottom-color: #9ac7e1; border-left-color: #9ac7e1;border-image-source: initial;border-image-slice: initial;border-image-width: initial;border-image-outset: initial;border-image-repeat: initial;">입고</div>
									</th>
									<td colspan="2">
										
											<select name="istInCd" style="margin-right:4px;width:50px;" tabindex="8"><option value="C">일반</option><option value="A">직입</option></select> 
											<div class="inputTextCleanDiv">
											<input type="text" name="istInNm" class="inStorage srchIp" placeholder="입고지명" tabindex="9" style="width:118px;" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
										<div class="f_rt">
											<input class="date crdrIp" type="text" name="istInHopeDt" placeholder="날짜 선택" readonly style="margin-left: 20px;" tabindex="10" autocomplete="false">
											<input type="hidden" name="istInIsSeq">
											<input type="text" name="istInMemo" class="istInMemo " placeholder="메모란" maxlength="15" tabindex="11" style="width:65px;margin-left:5px;" autocomplete="false">
										</div>
									</td>
									<th rowspan="4" class="txt_r" style="vertical-align: top;">
										<div class="f_rt" style="width:50%; height: 17%; padding-top: 5px; border-top-left-radius: 5px;border-top-right-radius: 0px; border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;border-top-width: 1px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 1px;border-top-style: solid;border-bottom-style: solid;border-left-style: solid; border-top-color: #9ac7e1; border-bottom-color: #9ac7e1; border-left-color: #9ac7e1;border-image-source: initial;border-image-slice: initial;border-image-width: initial;border-image-outset: initial;border-image-repeat: initial;">출고</div>
									</th>
									<td colspan="2">
										<select name="istOutCd" style="margin-right:4px;width:50px;" tabindex="16"><option value="C">일반</option><option value="A">직출</option><option value="B">외부배송</option></select> 
										<div class="inputTextCleanDiv">
											<input type="text" name="istOutNm" class="srchIp outStorage" placeholder="출고지명" tabindex="17" style="width:118px;" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
										<div class="f_rt">
											<input class="date crdrIp" type="text" name="istOutHopeDt" placeholder="날짜 선택" readonly  style="margin-left: 20px;" tabindex="18">
											<input type="hidden" name="istOutIsSeq">
											<input type="text" maxlength="15" name="istOutMemo" class="istOutMemo " placeholder="메모란" tabindex="19" style="width:65px;margin-left:5px;" autocomplete="false">
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<div class="inputTextCleanDiv"><input type="text" name="isInZipcode" class="inStorage readonly" placeholder="우편번호" style="margin-right:7px;width:50px;" readonly><div class="inputTextClean"><span>×</span></div></div>
										<div class="inputTextCleanDiv"><input type="text" name="isInAddr" class="inStorage readonly" placeholder="기본주소" style="width:280px;" readonly><div class="inputTextClean"><span>×</span></div></div>
										<i class="fa-solid fa-location-dot cursorPointer istInAddr inStorage f_rt" style="font-size:15px;margin:5px 5px;color: #81b1cd;" title="주소 검색" tabindex="12"></i>
									</td>
									<td colspan="2">
										<div class="inputTextCleanDiv"><input type="text" name="isOutZipcode" class="outStorage readonly" placeholder="우편번호" style="margin-right:7px;width:50px;" readonly><div class="inputTextClean"><span>×</span></div></div>
										<div class="inputTextCleanDiv"><input type="text" name="isOutAddr" class="outStorage readonly" placeholder="기본주소" style="width:280px;" readonly><div class="inputTextClean"><span>×</span></div></div>
										<i class="fa-solid fa-location-dot cursorPointer istOutAddr outStorage f_rt" style="font-size:15px;margin:5px 5px;color: #81b1cd;" title="주소 검색" tabindex="20"></i>
									</td>
								</tr>
								<tr>
									<td colspan="2"><div class="inputTextCleanDiv"><input type="text" name="isInAddrDetail" class="inStorage" placeholder="상세주소" style="width:363px;" tabindex="13" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
									<td colspan="2"><div class="inputTextCleanDiv"><input type="text" name="isOutAddrDetail" class="outStorage" placeholder="상세주소" style="width:363px;" tabindex="21" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr>
									<td style="padding-right: 0px;">
										<div class="inputTextCleanDiv">
											<input type="text" name="istInInchargeNm" class="inStorage" style="width:170px;" placeholder="담당자" tabindex="14" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<td>
										<div class="inputTextCleanDiv">
											<input type="text" name="istInInchargeTel" class="inStorage" style="width:160px;" placeholder="전화번호" tabindex="15" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										<div>
									</td>
									<td style="padding-right: 0px;">
										<div class="inputTextCleanDiv">
											<input type="text" name="istOutInchargeNm" class="outStorage" style="width:170px;" placeholder="담당자" tabindex="22" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<td>
										<div class="inputTextCleanDiv" style="padding-right:0px;">
											<input type="text" name="istOutInchargeTel" class="outStorage" style="width:160px;" placeholder="전화번호" tabindex="23" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0px;border-top: 0px solid #4e80ee !important;" summary="" class="listTbType01 tr_nohover tablScrollDisplay scrollTbThead ">
							<caption></caption>
							<colgroup>
								<col width="30px">
								<col width="60px">
								<col width="90px">
								<col width="40px">
								<col width="auto">
								<col width="100px">
								<col width="100px">
								<col width="20px">
							</colgroup>
							<thead>
								<tr>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;">-</th>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">공정명</th>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">작업명</th>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">면</th>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">세부사항</th>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">전달사항</th>
									<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">외주설정</th>
									<th style="background-color: #9dc8e5;color:#fff;border-bottom: 0px;border-left: 1px;border-bottom: 0px;solid;border-left-style: solid; border-left-color: #f7f7f8;"></th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
						<div class="overflowYListdiv overflowFixWrap" id="" style="height:230px;overflow: auto;">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 workTable tableScrollOnTbody" style="border-top: 0px !important;margin-top:-1px;">
								<caption></caption>
								<colgroup>
									<col width="30px">
									<col width="60px">
									<col width="90px">
									<col width="40px">
									<col width="auto">
									<col width="100px">
									<col width="100px">
									<col width="20px">
								</colgroup>
								<tbody></tbody>
							</table>
						</div>
						<hr>

						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 workInfo">
							<caption></caption>
							<colgroup>
								<col width="110px">
								<col width="65px">
								<col width="220px">
								<col width="auto">
								<col width="70px">
							</colgroup>
							<tbody>
								<tr>
									<td><input type="hidden" name="index"><input type="hidden" name="wSeq"><select name="spSeq" class="w100p" tabindex="24"></select></td>
									<td><select name="wFrontYn" tabindex="25" title="공정명을 선택하신 후 해당 작업면을 선택 하십시요"><option>작업면</option></select></td>
									<td>

										<!--<input type="hidden" name="cwSeq"><input type="text" name="wNm" class="w50p srchIp" placeholder="작업명" tabindex="26" readonly>-->
										<select name="cwSeq" tabindex="26" style="width:90px;" disabled="disabled"></select>
										<div class="inputTextCleanDiv">
											<input type="text" name="wInfo" class="disabled" placeholder="부가정보" disabled='disabled' tabindex="27" style="width: 110px; margin-left: 2px;">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									
									<td>
										<div class="inputTextCleanDiv">
											<input type="text" name="wMemo" style="width:410px;" placeholder="전달사항"  tabindex="28">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<td rowspan="2" style="padding-top:5px;vertical-align: top;">
											<a href="#" class="trBtn saveWork" style="width:60px;color: #61869b !important; border: 2px solid #61869b;" title="작업 추가" tabindex="29">추가</a>
											<br><a href="#" class="trCleanIconBtn cleanWork mt5" title="초기화" style="width: 60px;color: #61869b !important; border: 2px solid #61869b;">초기화</a>
									</td>
								</tr>
								<tr>
									<td colspan="4" class="workOptionListDiv optionArea vm" style="padding: 0px;"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="outSourcingDiv">
	<div class="mw_defalut" style="width:450px;height:150px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">외주 설정</span>
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
									<th style="padding-left:0px;">
										<div class="al"><a href="javascript:void(0);" class="btnSearch2 delete">외주 취소</a></div>
									</th>
									<th>
										<div class="ar">
											<a href="#" class="btnSearch btnCreate addCustomer" title="외주 거래처 추가" style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
											<a href="javascript:void(0);" class="btnSearch save">저장</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="wrapRoot">
						<div class="searchWrap customerInfo">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 ">
								<caption></caption>
								<colgroup>
									<col width="50px">
									<col width="auto">
									<col width="60px">
									<col width="60px">
									<col width="30px">
								</colgroup>
								<tbody>
									<tr>
										<th class="txt_r">거래처 : <input type="hidden" name="oswSeq"p></th>
										<td>
											<input type="hidden" name="cuSeq" requiremsg="업체명">
											<div class="inputTextCleanDiv">
												<input type="text" name="cuNm" class="srchIp" style="width:177px;ime-mode:active" placeholder="업체명">
												<div class="inputTextClean"><span>×</span></div>
											</div>

										</td>
										<th class="txt_r">발주수량 : </th>
										<td>
											<div class="inputTextCleanDiv">
												<input type="text" name="oswCnt" class="ar" style="width:52px;" requiremsg="발주수량">
												<div class="inputTextClean"><span>×</span></div>
											</div>
										</td>
										<td class="ar"><i class="fa-solid fa-square-minus customerDelete cursorPointer" title="삭제" style="font-size: 16px;color:#898193;"></i></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="orderMarkDiv">
	<div class="mw_defalut" style="width:380px;height:200px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">반복형 수주 설정</span>
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
											<a href="javascript:void(0);" class="btnSearch save">저장</a>&nbsp;&nbsp;
											<a href="#" class="btnSearch2 delete" style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10 ">
							<caption></caption>
							<colgroup>
								<col width="60px">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="ac">업체명</th>
									<td class="cuNm"></td>
								</tr>
								<tr>
									<th class="ac">품&nbsp;&nbsp;&nbsp;&nbsp;명</th>
									<td class="oFileNm"></td>
								</tr>
								<tr>
									<th class="ac">코드지정</th>
									<td>
										<input type="hidden" name="oMarkYn" value="Y">
										<input type="hidden" name="oSeq" value="">
										<div class="inputTextCleanDiv">
											<input type="text" name="oCode" style="width:120px;" requiremsg="코드" placeholder="코드지정 (5자리 이상)">
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
	</div>
</template>
<template id="orderCustomerEmployeeList">
	<div class="mw_defalut" style="width:420px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">직원 목록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<div class="searchWrap">
							<table class="listTbType07 tr_nohover"  id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
								<caption></caption>
								<colgroup>
									<col width="50px"><!--선택-->
									<col width="40px"><!--대표-->
									<col width="80px"><!--성명-->
									<col width="70px"><!--직급-->
									<col width="120px"><!--전화번호-->
								</colgroup>
								<thead>
									<tr>
										<th>선택</th>
										<th>구분</th>
										<th>성명</th>
										<th>직급</th>
										<th>전화번호</th>
									</tr>
								</thead>
							</table>
							<div class="overflowYListdiv overflowFixWrap noReSize" style="height:200px;">
								<table class="listTbType07 tr_nohover employeeList"  id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
									<colgroup>
									<col width="50px"><!--선택-->
									<col width="40px"><!--대표-->
									<col width="80px"><!--성명-->
									<col width="70px"><!--직급-->
									<col width="120px"><!--전화번호-->
									</colgroup>
									<tbody>
									</tbody>
									<tfoot>
									</tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>