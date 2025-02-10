<div id="">
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<div class="pageHere"></div>
	<!-- searchWrap -->
	<div class="searchWrap">
		<input type="hidden" name="orderculumn" value="o.creDate">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
		<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="200px">
			<col width="180px">
			<col width="45px">
			<col width="150px">
			<col width="35px">
			<col width="150px">
			<col width="20px">
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
					<td class="ac"><table style="border:0px;display: inline-block;">
							<colgroup>
								<col width="15px">	
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
							<td><input type="checkbox" name="oswStatus" value="A" checked></td>
							<td style="padding-left:2px;">대기</td>
							<td><input type="checkbox" name="oswStatus" value="B" checked></td>
							<td style="padding-left:2px;">진행</td>
							<td><input type="checkbox" name="oswStatus" value="D"></td>
							<td style="padding-left:2px;">완료</td>
							<td style="padding-left:10px;padding-right:0px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
							</tbody>
						</table>
					</td>
					<th>· 협력사</th>
					<td>
						<div class="inputTextCleanDiv">	
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th>· 품명</th>
					<td>
						<div class="inputTextCleanDiv">	
							<input class="schColumBorderTextDefault" name="oFileNm" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					

					<td class="ar">
							<input type="checkbox" name="includeDelete" value="Y">
					</td>
					<td class="al">
							<strong style="margin-bottom:5px;" title="취소건 포함">취소건 포함</strong>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<!-- a href="#" class="btnSearch btnSearchCall">검색</a -->
							<!-- <a href="#" class="btnSearch btnCreate">신규</a> -->
							<!-- <a href="#" class="btnSearch2 btnTransDelete">삭제</a> -->
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
				<!--col width="25px"--> <!-- 선택 -->
				<col width="50px"> <!-- 일자 -->
				<col width="120px"> <!-- 원청사 -->
				<col width="17px"><!--파일-->
				<col width="300px"> <!-- 품명 -->
				<col width="70px"> <!-- 규격 -->
				<col width="65px"> <!-- 수량 -->
				<col width="150px"> <!-- 공정흐름 -->
				<col width="40px"> <!-- 상태 -->
				<col width="50px"> <!-- 발주서 -->
				<col width="120px"> <!-- 외주사 -->
				<col width="110px"> <!-- 작업명 -->
				<col width="65px"> <!-- 외주수량 -->
				<col width="70px"> <!-- 완료수량 -->
				<col width="auto"> <!-- 작업상세 -->
				<!-- col width="0px"--> <!-- 작업상세 -->
				<!-- col width="50px" --> <!-- 작업상세 수정 -->
			</colgroup>
			<thead>
			<!--tr>
					<th >일자</th>
					<th >원청사</th>
					<th column="cuOwnerNm">품명</th>
					<th >규격</th>
					<th >수량</th>
					<th >공정흐름</th>
					<th >협력사</th>
					<th>발주서</th>
					<th>상태</th>
					<th >작업명</th>
					<th >발주수량</th>
					<th >완료수량</th>
					<th>세부사항</th>
					<th class="last">수정</th>
				</tr -->
				<tr>
					<th rowspan="2">승인일</th>
					<th rowspan="2" >원청사</th>
					<th rowspan="2" column="cuOwnerNm" colspan="2">품명</th>
					<th rowspan="2" >규격</th>
					<th rowspan="2" >수량</th>
					<th rowspan="2" style="border-right:0px;">생산공정</th>
					<th colspan="7" style="border-left:0px;border-right:0px;">외주작업상세</th>
					<!-- th rowspan="2" style="border-left:0px;border-right:0px;"></th-->
					<!-- th rowspan="2" class="last" style="border-left:0px;">수정</th -->
				</tr>
				<tr>
					<th class="dashboardOutsourceTd1" style="border-left:1px solid #566981;border-bottom:0px;">상태</th>
					<th class="dashboardOutsourceTd1">발주서</th>
					<th class="dashboardOutsourceTd2" >협력사</th>
					<th class="dashboardOutsourceTd2" >작업명</th>
					<th class="dashboardOutsourceTd2" >발주량</th>
					<th class="dashboardOutsourceTd2" >완료량</th>
					<th class="dashboardOutsourceTd2" style="border-right:1px solid #78b793;">세부사항</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<!--col width="25px"--> <!-- 선택 -->
					<col width="50px"> <!-- 원청사 -->
					<col width="120px"> <!-- 원청사 -->
					<col width="17px"><!--파일-->
					<col width="300px"> <!-- 파일명 -->
					<col width="70px"> <!-- 규격 -->
					<col width="65px"> <!-- 수량 -->
					<col width="150px"> <!-- 공정흐름 -->
					<col width="40px"> <!-- 상태 -->
					<col width="50px"> <!-- 발주서 -->
					<col width="120px"> <!-- 외주사 -->
					<col width="110px"> <!-- 작업명 -->
					<col width="65px"> <!-- 외주수량 -->
					<col width="70px"> <!-- 완료수량 -->
					<col width="auto"> <!-- 작업상세 -->
					<!-- col width="50px" --> <!-- 작업상세 수정 -->
					<!-- col width="40px" --> <!-- 파일공유 -->
					

					<!-- col width="50px" -->
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
<template id="outsourcingMemberDiv">
	<div class="mw_defalut" style="width:950px;height:630px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">외주 발주</span>
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
											<a href="javascript:void(0);" class="btnSearch save">발주하기</a>
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
								<!-- tr>
									<th class="txt_r"><span style="color:red;">*</span> 업체명</th>
									<td colspan="3"><input type="hidden" name="cuSeq" requiremsg="업체명"><input type="text" name="cuNm" class="w100p srchIp" style="ime-mode:active"></td>
									<th class="txt_r actionArea">주문일시</th>
									<td colspan="3" class="orderKey">
										<input type="text" name="creDate" class="w40p readonlyData">
									</td>
								</tr -->
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 파일명</th>
									<td colspan="7">
										<input type="checkbox" name="istFileShareYn" vlaue="Y" title="선택시 외주사가 해당 파일을 다운 받을수 있도록 공유 합니다."> 파일공유
										<i class="fa-solid fa-file-arrow-down cursorPointer oFileNmDown" style="margin-right:5px;:display:none;" title="파일 받기"></i>
										<input type="text" name="oFileNm" class="w70p readonlyData" requiremsg="파일명" readonly>		
										<input type="hidden" name="cuSeq" value="">
										<input type="hidden" name="oRootOSeq" value="">
										<input type="hidden" name="oParentOSeq" value="">
										<input type="hidden" name="oDepthLevel" value="">
										<input type="hidden" name="istRootIstSeq" value="">
										<input type="hidden" name="istParentIstSeq" value="">
										<input type="hidden" name="istDepthLevel" value="">
									</td>
								</tr>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 용지규격</th>
									<td><input type="text" name="oPaperSize" class="w100p readonly" readonly placeholder="예시) 2절, 국2절, 650*450" requiremsg="용지규격"></td>
									<th class="txt_r"><span style="color:red;">*</span> 수량</th>
									<td><input type="text" name="oCnt" class="w100p txt_r readonly" readonly placeholder="예시) 10000" requiremsg="수량" vtype="num"></td>
									<th class="txt_r">담당자</th>
									<td><input type="text" name="oInchargeNm" class="w100p srchIp" placeholder="담당자"></td>
									<th class="txt_r">연락처</th>
									<td><input type="text" name="oInchargeTel" class="w100p" placeholder="담당자 연락처"></td>
								</tr>
								<tr>
									<th class="txt_r">비고</th>
									<td colspan="7"><textarea name="oMemo"class="w100p" rows="1"></textarea></td>
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
										<div class="f_rt" style="width:50%; height: 100%; padding-top: 5px; border-top-left-radius: 10px;border-top-right-radius: 0px; border-bottom-right-radius: 0px;border-bottom-left-radius: 10px;border-top-width: 1px;border-right-width: 0px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-bottom-style: solid;border-left-style: solid; border-top-color: #9ac7e1; border-bottom-color: #9ac7e1; border-left-color: #9ac7e1;border-image-source: initial;border-image-slice: initial;border-image-width: initial;border-image-outset: initial;border-image-repeat: initial;">입고</div>
									</th>
									<td colspan="2"><select name="istInCd" style="margin-right:7px;"><option value="C">일반</option><option value="A">직접입고</option></select> <input type="text" name="istInNm" class="w44p inStorage srchIp" placeholder="외주처 입고지"> <input class="date crdrIp f_rt" type="text" name="istInHopeDt" placeholder="날짜 선택" readonly style="margin-left: 20px;"><input type="hidden" name="istInIsSeq"></td>
									<th rowspan="4" class="txt_r" style="vertical-align: top;">
										<div class="f_rt" style="width:50%; height: 100%; padding-top: 5px; border-top-left-radius: 10px;border-top-right-radius: 0px; border-bottom-right-radius: 0px;border-bottom-left-radius: 10px;border-top-width: 1px;border-right-width: 0px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-bottom-style: solid;border-left-style: solid; border-top-color: #9ac7e1; border-bottom-color: #9ac7e1; border-left-color: #9ac7e1;border-image-source: initial;border-image-slice: initial;border-image-width: initial;border-image-outset: initial;border-image-repeat: initial;">출고</div>
									</th>
									<td colspan="2"><select name="istOutCd" style="margin-right:7px;"><option value="C">일반</option><option value="A">직접출고</option><option value="B">외부배송</option></select> <input type="text" name="istOutNm" class="w44p srchIp outStorage" placeholder="외주처 출고지"> <input class="date crdrIp  f_rt" type="text" name="istOutHopeDt" placeholder="날짜 선택" readonly  style="margin-left: 20px;"><input type="hidden" name="istOutIsSeq"></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" name="isInZipcode" class="w15p inStorage readonly" placeholder="우편번호" style="margin-right:7px;" readonly><input type="text" name="isInAddr" class="w75p inStorage readonly" placeholder="기본주소" readonly><i class="fa-solid fa-location-dot cursorPointer istInAddr inStorage f_rt" style="font-size:15px;margin:0 5px" title="주소 검색"></i></td>
									<td colspan="2"><input type="text" name="isOutZipcode" class="w15p outStorage readonly" placeholder="우편번호" style="margin-right:7px;" readonly><input type="text" name="isOutAddr" class="w75p outStorage readonly" placeholder="기본주소" readonly><i class="fa-solid fa-location-dot cursorPointer istOutAddr outStorage f_rt" style="font-size:15px;margin:0 5px" title="주소 검색"></i></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" name="isInAddrDetail" class="w100p inStorage" placeholder="상세주소"></td>
									<td colspan="2"><input type="text" name="isOutAddrDetail" class="w100p outStorage" placeholder="상세주소"></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" name="isInInchargeNm" class="w49p inStorage" placeholder="담당자" style="margin-right:7px;"><input type="text" name="isInInchargeTel" class="w49p inStorage" placeholder="전화번호"></td>
									<td colspan="2"><input type="text" name="isOutInchargeNm" class="w49p outStorage" placeholder="담당자" style="margin-right:7px;"><input type="text" name="isOutInchargeTel" class="w49p outStorage" placeholder="전화번호"></td>
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
								<col width="150px">
							</colgroup>
							<thead>
								<tr>
									<th class="ac" style="background-color: #81b1cd;color:#fff;border-bottom: 0px;">-</th>
									<th class="ac" style="background-color: #81b1cd;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">공정명</th>
									<th class="ac" style="background-color: #81b1cd;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">작업명</th>
									<th class="ac" style="background-color: #81b1cd;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">면</th>
									<th class="ac" style="background-color: #81b1cd;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">세부사항</th>
									<th class="ac" style="background-color: #81b1cd;color:#fff;border-bottom: 0px;border-left: 1px;solid;border-left-style: solid; border-left-color: #f7f7f8;">비고</th>
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
									<col width="150px">
								</colgroup>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="outsourcingFormMainDiv">
		<div class="mw_defalut" style="width:845px; font-size:13px;" id="transReport">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">외주작업 발주</span>
					<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
				</h1>
			</div>
			<div class="mw_ctWrap">
				<div class="mw_contents">
					<div class="mw_contentsDiv" style="height:497px;overflow-y:auto;padding:2px;">
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
												<a href="#" class="btnSearch disable fax" style="font-size:14px !important;padding-top:5px;background:#6572cd;border:1px solid #6572cd;" title="FAX보내기"><i class="fa-solid fa-fax"></i></a>
												<a href="#" class="btnSearch disable mail" style="font-size:17px !important;padding-top:3px;padding-left: 8px;padding-right: 8px;background:#6572cd;border:1px solid #6572cd;" title="메일보내기"><i class="fa-regular fa-envelope"></i></a>
												<a href="#" class="btnSearch disable print" style="font-size:14px !important;padding-top:5px;background:#6572cd;border:1px solid #6572cd;" title="인쇄"><i class="fas fa-print"></i></a>
												<a href="#" class="btnSearch btnSave">저장</a>
											</div>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="outsourcingDiv">
							<div class="searchWrap">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable" style="margin-bottom: 5px;">
									<caption></caption>
									<colgroup>
										<col width="90px">
										<col width="auto">
										<col width="90px">
										<col width="auto">
									</colgroup>
									<tbody>
										<tr>
											<th class="ac">품&nbsp;&nbsp;&nbsp;명</th>
											<td colspan="3" class="oFileNm" style="padding-left :10px;"></td>
										</tr>
										<tr>
											<th class="ac">규&nbsp;&nbsp;&nbsp;격</th>
											<td class="oPaperSize" style="padding-left :10px;"></td>
											<th class="ac">발주담당</th>
											<td class=""><input type="hidden" name="osESeq"><input type="text" class="w100p srchIp" name="osENm"></td>											
										</tr>
										<tr>
											<th class="ac">수&nbsp;&nbsp;&nbsp;량</th>
											<td class="oCnt" style="padding-left :10px;"></td>
											<th class="ac">연락처</th>
											<td class=""><input type="text" class="w100p" name="osETel"></td>
										</tr>
										
									</tbody>
								</table>
							</div>
							<div class="searchWrap ">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable">
									<caption></caption>
									<colgroup>
										<col width="90px">
										<col width="auto">
										<col width="90px">
										<col width="auto">
									</colgroup>
									<tbody>
										<tr>
											<th class="ac">협력사<input type="hidden" name="cuSeq"></th>
											<td class="cuNm" style="padding-left:10px;"></td>
											<th class="ac">수신담당</th>
											<td class="">
												<input type="text" class="w49p" name="osInchargeNm">
												<div class="f_rt" style="width:145px;">
													<input type="text" class="w100p" name="osInchargeTel" style="margin-left:1px;"></td>
												</div>
										</tr>
										<tr>
											<th class="ac">입고정보</th>
											<td style="padding: 5px 5px;">
												<select name="osInCd" style="width: 90px;"><option value="C">일반</option><option value="A">직접입고</option></select>
												<div class="f_rt">
													<input type="hidden" name="osInIsSeq">
													<input type="text" class="srchIp" name="osInNm" style="width:194px;" placeholder="입고지">
												</div>
												
												<input class="date crdrIp" type="text" name="osInHopeDt" placeholder="날짜 선택" readonly tabindex="10" style="margin-top:5px;">
												<div class="f_rt" style="padding-top: 5px;">
													<input type="text" name="osInMemo" class="osInMemo" placeholder="메모란" maxlength="15" tabindex="11" style="width:194px;">
												</div>
											</td>
											<th class="ac">출고정보</th>
											<td class="">
												<select name="osOutCd" style="width: 90px;"><option value="C">일반</option><option value="B">외부발송</option><option value="A">직접출고</option></select>
												<div class="f_rt">
													<input type="hidden" name="osOutIsSeq">
													<input type="text" class="srchIp" name="osOutNm" style="width:194px;" placeholder="출고지">
												</div>
												
												<input class="date crdrIp" type="text" name="osOutHopeDt" placeholder="날짜 선택" readonly tabindex="10" style="margin-top:5px;">
												<div class="f_rt" style="padding-top: 5px;">
													<input type="text" name="osOutMemo" class="osOutMemo " placeholder="메모란" maxlength="15" tabindex="11" style="width:194px;">
												</div>
											</td>
										</tr>
										<tr>
											<th class="ac">비&nbsp;&nbsp;&nbsp;고</th>
											<td colspan="3"><textarea class="w100p" rows="1" name="osMemo"></textarea></td>
										</tr>
									</tbody>
								</table>
								<div style="color:#777;width:100%;font-size:11px;" class="ar">※ 아래 작업을 클릭하여 필요 세부사항을 변경하여 의뢰 하십시요 </div>
								<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0px;margin-top:5px;border-top: 0px solid #4e80ee !important;" summary="" class="listTbType01 tr_nohover tablScrollDisplay scrollTbThead ">
									<caption></caption>
									<colgroup>
										<col width="90px">
										<col width="40px">
										<col width="70px">
										<col width="auto">
										<col width="100px">
									</colgroup>
									<thead>
										<tr>
											<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 5px solid #ecf5f9;border-left: 1px solid #9dc8e5;border-right: 1px solid #fff;border-top: 1px solid #9dc8e5;">작업명</th>
											<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 5px solid #ecf5f9;border-left: 1px solid #fff;border-right: 1px solid #fff;border-top: 1px solid #9dc8e5;">면</th>
											<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 5px solid #ecf5f9;border-left: 1px solid #fff;border-right: 1px solid #fff;border-top: 1px solid #9dc8e5;">수량</th>
											<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 5px solid #ecf5f9;border-left: 1px solid #fff;border-right: 1px solid #fff;border-top: 1px solid #9dc8e5;">세부사항</th>
											<th class="ac" style="background-color: #9dc8e5;color:#fff;border-bottom: 5px solid #ecf5f9;border-left: 1px solid #fff;border-right: 1px solid #9dc8e5;border-top: 1px solid #9dc8e5;">전달사항</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<div class="overflowYListdiv overflowFixWrap" id="" style="height:150px;overflow: auto;">
									<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 workTable tableScrollOnTbody" style="border-top: 0px !important;margin-top:-1px;">
										<caption></caption>
										<colgroup>
											<col width="90px">
											<col width="40px">
											<col width="70px">
											<col width="auto">
											<col width="100px">
										</colgroup>
										<tbody></tbody>
									</table>
								</div>
								<div class="workDetailArea" style="width:100%;height:80px;display:contents;">
									<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable mb10 workDetail">
										<caption></caption>
										<colgroup>
											<col width="90px">
											<col width="auto">
											<col width="80px">
										</colgroup>
										<tbody>
											<tr style="border-top:0px;">
												<th class="ac" style="border-top:1px solid #b1c6f3;border-left:1px solid #b1c6f3;background:#d3e1ff;">세부사항</th>
												<td class="workOptionListDiv vm" style="padding:0px;border-right:1px solid #b1c6f3;border-top:1px solid #b1c6f3;"></td>
												<td class="ar vt" rowspan="2" style="background:#ecf5f9;border-top:1px solid #ecf5f9;border-bottom:1px solid #ecf5f9;border-right:1px solid #ecf5f9;border-left:1px solid #b1c6f3;">
													<span class="btnApply cursorPointer ac vc" style="display: inline-block;border:2px solid #ccc;border-radius:3px;width:60px;height:50px;padding-top:18px;background: #82a6f3; color: #fff;font-weight: bold;">수정</span>
												</td>
											</tr>
											<tr style="height: 38px;">
												<th class="ac" style="border-bottom:1px solid #b1c6f3;border-left:1px solid #b1c6f3;background:#d3e1ff;">전달사항</th>
												<td style="border-right:1px solid #b1c6f3;border-bottom:1px solid #b1c6f3;"><input type="text" name="oswMemo" class="w100p " placeholder="전달사항"  tabindex="28"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<template id="outsourcingFormDiv">
		<div class="mw_defalut" style="width:845px; font-size:13px;" id="transReport">
			<div class="mw_title" id="handle">
				<h1 class="mw_title_mid">
					<span class="title">발주</span>
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
												<a href="#" class="btnSearch fax"><i class="fa-solid fa-file-lines"></i>&nbsp;&nbsp;FAX발송</a>
												<a href="#" class="btnSearch mail"><i class="fa-regular fa-envelope"></i>&nbsp;&nbsp;메일발송</a>
												<a href="#" class="btnSearch print"><i class="fas fa-print"></i>&nbsp;&nbsp;인쇄</a>
											</div>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="printArea">
							<page size="A4" style="margin-bottom:1350px;overflow: hidden;">
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
															<td class="al workTitle" style="background-color:#fff;"><strong>작업발주서<span class="wCuNm" style="font-size:30px;">(외주업체명)</span></strong></td>
															<td class="ar reportLogo" rowspan="2" style="vertical-align: top;"></td>
														</tr>
														<tr style="width:100%;background-color:#fff;">
															<td class="al topProcessFlow" colsapn="3" style="background-color:#fff;padding-left:0px;padding-top:10px;"></td>
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
															<th class="ac top" style="color:#000;height:60px;font-size: 18px; font-weight: bold;background-color:#ddd; border-top : 0px;border-bottom : 0px;border-left : 1px solid #000;border-right : 1px solid #000;">품명</th>
															<td class="al noborder oFileNm" style="background-color:#fff;padding-left:10px;font-weight: bold;font-size: 18px;">한권으로 끝내는 해커스토익700+(LC+RC+VOCA)(2판6쇄1회차)중철(7-75)1회차)중철(7-75)</td>
															<td class="ac noborder cuNm" style="background-color:#fff;font-size: 16px;border-left : 1px solid #000 !important;border-right : 1px solid #000 !important;;">삼보아트</td>
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
																			<th class="ac" style="height:26px;color:#000;background:#ddd;border-left:1px solid #000;border-top:1px solid #000; border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1; border-top-left-radius: 3px;font-size:15px;font-weight: bold;">규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</th>
																			<td class="ac oPaperSize" colspan="2" style="height:26px;background: #fff;border-right:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-top-right-radius: 3px;font-size:15px;"></td>
																		</tr>
																		<tr style="height:52px;background: #fff;">
																			<th class="ac" style="height:52px;color:#000;background:#ddd;border-left:1px solid #000;border-bottom:1px solid #c1c1c1000;border-right:1px solid #c1c1c1;font-size:15px;font-weight: bold;">주문수량</th>
																			<td class="ac oCnt" colspan="2" style="height:52px;color:#000;background: #fff;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;font-size:18px;font-weight: bold;"></td>
																		</tr>
																		<tr style="height:26px;background: #fff;">
																			<th class="ac" style="height:26px;color:#000;background:#ddd;border-left:1px solid #000;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;font-size:15px;font-weight: bold;border-bottom-left-radius: 3px;">제작담당</th>
																			<td class="ac oInchargeNm" style="height:26px;color:#000;background: #fff;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;font-size:15px;"></td>
																			<td class="ac oInchargeTel" style="height:26px;color:#000;background: #fff;border-bottom:1px solid #000;border-right:1px solid #000;border-bottom-right-radius: 3px;font-size:15px;"></td>
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
																		<tr>
																			<th class="ac" rowspan="2" style="height:auto;min-height:52px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-collapse; collapse;border-right:1px solid #c1c1c1;border-top-left-radius: 3px;">입고</th>
																			<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-left:0px;">장소</th>
																			<td class="ac istInNm" style="height:26px;color:#000;background: #fff;border-top:1px solid #000;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;font-size:15px;border-top-right-radius: 3px;"></td>
																		</tr>
																		<tr>
																			<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-left:0px;">일자</th>
																			<td class="ac istInHopeDt" style="height:26px;color:#000;font-size:15px;background: #fff;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;"></td>
																		</tr>
																		<tr>
																			<th class="ac" rowspan="2" style="height:52px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-left:1px solid #000;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;border-bottom-left-radius: 3px;">출고</th>
																			<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-left:0px;">장소</th>
																			<td class="ac istInNm" style="height:26px;color:#000;font-size:15px;background: #fff;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;"></td>
																		</tr>
																		<tr>
																			<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;border-left:0px;">일자</th>
																			<td class="ac istInHopeDt" style="height:26px;color:#000;font-size:15px;background: #fff;border-right:1px solid #000;border-bottom:1px solid #000;border-bottom-right-radius: 3px;"></td>
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
																			<td class="ar" rowspan="2" style="background: #fff;font-size:13px;font-weight: bold;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000; border-bottom-left-radius: 3px;border-top-left-radius: 3px;">비고 |</td>
																			<td class="al oMemo" style="background: #fff;border-right:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000; border-bottom-right-radius: 3px;border-top-right-radius: 3px;"></td>
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
											<td class="workDetailArea" style="height: 680px;padding-top:10px;background:#fff;vertical-align: top;">
												<table class="workTableTypeA mb10" style="width:100%;">
													<colgroup>
														<col width="12%"><!-- 공정 및 작업 -->
														<col width="5%">
														<col width="auto">
														<col width="auto">
														<col width="auto">
													</colgroup>
													<tbody>
														<tr class="workInfo" style="height:60px !important;">
															<th class="ac spNm" style="height:60px !important;background:#000;color:#fff;font-size:18px;font-weight:bold;border-bottom:0px;border:1px solid #000;"></th>
															<th class="al wOutsourcingNm" colspan="2" style="height:60px !important;color:#000;font-size:16px;font-weight:bold;padding-left:5px;background:#ddd;border-bottom:0px;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;border-right:0px;"></th>
															<th class="al last" colspan="2" style="height:60px !important;color:#000;font-size:15px;font-weight:bold;background:#eee;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;border-bottom:0px;border-right:1px solid #c1c1c1;padding-left:10px;"> ※ <span class="wMemo"></sapn></th>
														</tr>
														<tr class="workDetail" style="height:60px !important;">
															<td class="ac wNm rowspan" rowspan="1" style="height:60px !important;font-size:16px;background:#fff;border-top:1px solid #c1c1c1;"></th>
															<td class="ac wFrontYnNm rowspan" rowspan="1" style="height:60px !important;font-size:17px;font-weight:bold;background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
															<td class="al option" style="height:60px !important;font-size:16px;background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
															<td class="al option" style="height:60px !important;font-size:16px;background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
															<td class="al option" style="height:60px !important;font-size:16px;background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr class="processFlowArea" style="background:#fff;">
											<td style="padding-top:20px;padding-bottom:13px;background-color:#fff;">
												<table class="" style="width:100%;">
												<colgroup>
													<col width="50px">
													<col width="auto">
												</colgroup>
												<tbody>
													<tr>
														<td class="ar" style="font-size:17px;font-weight:bold;line-height:1.2; border-right:1px solid #000;padding-right:5px;vertical-align: top;background:#fff;">공정<BR/>흐름</td>
														<td class="al" style="padding-left:5px; background:#fff;">
															<table cellpadding="0" cellspacing="0" border="0" class="" style="margin-top:-5px;">
																<tr class="processFlow">
																	<td style="background:#fff;">
																		<table class="printInfo" style="width:78px;">
																			<tbody>
																			<tr><th class="top last">공정명</td></tr>
																			<tr><td class="top last">업체명</td></tr>
																			</tbody>
																		</table>
																	</td>
																	<td style="font-size:10px;padding:3px;font-stretch:extra-condensed">▶</td>
																	<td><table class="printInfo" style="width:78px;">
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
										<tr class="">
											<td style="width:100%;background-color:#fff;padding-bottom:5px;">
												<table class="" style="width:100%;">
													<colgroup>
														<col width="25%">
														<col width="50%">
														<col width="25%">
													</colgroup>
													<tbody>
														<tr style="width:100%;background-color:#fff;">
															<td class="al reportLogo" style="background-color:#fff;"></td>
															<td class="al" style="vertical-align: top;align-content: end;padding-left:0px;"></td>
															<td class="ar"  style="vertical-align: top;padding-right:0px;"><div class="qrCode2 f_rt"></div></td>
														</tr>
													</tbody>
												</table>
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
<template id="outsourcingSendMail">
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
<template id="outsourcingFax">
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

<template id="outsourcingDoc">
	<page size="A4" style="margin-bottom:1350px;overflow: hidden;">
		<div class="printA4">
			<table class="" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
				<tr class="">
					<td class="outSourcingHead" style="width:100%;background-color:#fff;padding-bottom:5px;">
						<table class="" style="width:100%;height:80px;">
							<colgroup>
								<col width="75%">
								<col width="25%">
							</colgroup>
							<tbody>
								<tr style="width:100%;background-color:#fff;height:10px;">
									<td colsapn="2" style="background-color:#fff;padding-left:0px;"></td>
								</tr>
								<tr style="width:100%;background-color:#fff;">
									<td class="al workTitle" style="background-color:#fff;"><strong>작업의뢰서<span class="cuNm" style="font-size:30px;margin-left:10px;">(외주업체명)</span></strong></td>
									<td class="ar" rowspan="2" style="vertical-align: top;background-color:#fff;"></td>
								</tr>
								<tr style="width:100%;background-color:#fff;">
									<td class="al topProcessFlow" colsapn="1" style="background-color:#fff;padding-left:0px;padding-top:10px;padding-bottom:15px;"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr class="">
					<td class="outSourcingInfo" style="background:#fff;">
						<table class="workReportTitie" style="width:100%;" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mb10 ">
							<colgroup>
								<col width="12%">
								<col width="auto">
								<col width="30%">
							</colgroup>
							<tbody>
								<tr>
									<th class="ac top" style="color:#000;height:60px;font-size: 18px; font-weight: bold;background-color:#ddd; border-top : 0px;border-bottom : 0px;border-left : 1px solid #c1c1c1;border-right : 1px solid #c1c1c1;">품명</th>
									<td class="al noborder oFileNm" style="background-color:#fff;padding-left:10px;font-weight: bold;font-size: 18px;">한권으로 끝내는 해커스토익700+(LC+RC+VOCA)(2판6쇄1회차)중철(7-75)1회차)중철(7-75)</td>
									<td class="ac noborder mainCuNm" style="background-color:#fff;font-size: 16px;border-left : 1px solid #c1c1c1 !important;border-right : 1px solid #c1c1c1 !important;;">삼보아트</td>
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
												<tr style="height:34px;background: #fff;">
													<th class="ac" style="height:34px;color:#000;background:#ddd;border-left:1px solid #000;border-top:1px solid #000; border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1; border-top-left-radius: 3px;font-size:15px;font-weight: bold;">규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</th>
													<td class="ac oPaperSize" colspan="2" style="height:34px;background: #fff;border-right:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-top-right-radius: 3px;font-size:15px;"></td>
												</tr>
												<tr style="height:35px;background: #fff;">
													<th class="ac" style="height:35px;color:#000;background:#ddd;border-left:1px solid #000;border-bottom:1px solid #c1c1c1000;border-right:1px solid #c1c1c1;font-size:15px;font-weight: bold;">발주담당</th>
													<td class="ac osENm" style="height:35px;color:#000;background: #fff;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:15px;"></td>
													<td class="ac osETel" style="height:35px;color:#000;background: #fff;border-bottom:1px solid #c1c1c1;border-right:1px solid #000;font-size:15px;"></td>
												</tr>
												<tr style="height:35px;background: #fff;">
													<th class="ac" style="height:35px;color:#000;background:#ddd;border-left:1px solid #000;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;font-size:15px;font-weight: bold;border-bottom-left-radius: 3px;">수신담당</th>
													<td class="ac osInchargeNm" style="height:35px;color:#000;background: #fff;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;font-size:15px;"></td>
													<td class="ac osInchargeTel" style="height:35px;color:#000;background: #fff;border-bottom:1px solid #000;border-right:1px solid #000;border-bottom-right-radius: 3px;font-size:15px;"></td>
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
												<tr>
													<th class="ac" rowspan="2" style="height:auto;min-height:52px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-collapse; collapse;border-right:1px solid #c1c1c1;border-top-left-radius: 3px;">입고</th>
													<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-top:1px solid #000;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-left:0px;">장소</th>
													<td class="ac osInNm" style="height:26px;color:#000;background: #fff;border-top:1px solid #000;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;font-size:15px;border-top-right-radius: 3px;"></td>
												</tr>
												<tr>
													<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-left:0px;">일자</th>
													<td class="ac osInHopeDt" style="height:26px;color:#000;font-size:15px;background: #fff;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;"></td>
												</tr>
												<tr>
													<th class="ac" rowspan="2" style="height:52px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-left:1px solid #000;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;border-bottom-left-radius: 3px;">출고</th>
													<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;border-left:0px;">장소</th>
													<td class="ac osOutNm" style="height:26px;color:#000;font-size:15px;background: #fff;border-right:1px solid #000;border-bottom:1px solid #c1c1c1;"></td>
												</tr>
												<tr>
													<th class="ac" style="height:26px;color:#000;font-size:15px;font-weight: bold;background:#ddd;border-bottom:1px solid #000;border-right:1px solid #c1c1c1;border-left:0px;">일자</th>
													<td class="ac osOutHopeDt" style="height:26px;color:#000;font-size:15px;background: #fff;border-right:1px solid #000;border-bottom:1px solid #000;border-bottom-right-radius: 3px;"></td>
												</tr>
											</tbody>
										</table>										
									</td>
									<td class="al qr" style="height:110px;background: #fff;padding-bottom:5px;"><div class="qrCode f_rt"></div></td>
								</tr>
								<tr>
									<td class="noborder" colspan="3" style="height:5px;padding-top:5px;padding-bottom:5px;padding-left:0px;padding-right:1px;background: #fff;">
										<table class="" cellpadding="0" cellspacing="0" border="0" class="noBdrTb tr_nohover mt10 " style="width:100%;border-radius: 3px;border-collapse: collapse;border-style: hidden;box-shadow: 0 0 0 1px #999;">
											<colgroup>
												<col width="7%">
												<col width="auto">
											</colgroup>
											<tbody>
												<tr style="height:40px;background: #fff;">
													<td class="ar" rowspan="2" style="background: #fff;font-size:13px;font-weight: bold;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000; border-bottom-left-radius: 3px;border-top-left-radius: 3px;">비고 |</td>
													<td class="al osMemo" style="background: #fff;border-right:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000; border-bottom-right-radius: 3px;border-top-right-radius: 3px;padding-left:10px;"></td>
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
					<td class="workDetailArea" style="height: 680px;padding-top:10px;background:#fff;vertical-align: top;">
						<table class="workTableTypeA mb10" style="width:100%;">
							<colgroup>
								<col width="12%"><!-- 공정 및 작업 -->
								<col width="5%">
								<col width="auto">
								<col width="auto">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr class="workInfo" style="height:45px;">
									<th class="ac spNm" style="height:45px;background:#000;color:#fff;font-size:17px;font-weight:bold;border-bottom:0px;border:1px solid #000;"></th>
									<th class="ac oswCnt" colspan="2" style="height:45px;color:#000;font-size:17px;font-weight:bold;padding-left:5px;background:#ddd;border-bottom:0px;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;border-right:0px;padding-right:10px;"></th>
									<th class="al last" colspan="2" style="height:45px;color:#000;font-size:15px;font-weight:bold;background:#eee;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;border-bottom:0px;border-right:1px solid #c1c1c1;padding-left:10px;"> ※ <span class="oswMemo"></sapn></th>
								</tr>
								<tr class="workDetail" style="height:45px;">
									<td class="ac wNm rowspan" rowspan="1" style="height:45px;font-size:16px;background:#fff;border-top:1px solid #c1c1c1;"></th>
									<td class="ac wFrontYnNm rowspan" rowspan="1" style="height:45px;font-size:14px;font-weight:bold;background:#fff;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
									<td class="al option" style="height:45px;background:#fff;font-size:14px;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
									<td class="al option" style="height:45px;background:#fff;font-size:14px;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
									<td class="al option" style="height:45px;background:#fff;font-size:14px;border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr class="processFlowArea" style="background:#fff;">
					<td style="padding-top:20px;padding-bottom:13px;background-color:#fff;">
						<table class="" style="width:100%;">
						<colgroup>
							<col width="50px">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<td class="ar" style="font-size:17px;font-weight:bold;line-height:1.2; border-right:1px solid #000;padding-right:5px;vertical-align: top;background:#fff;">공정<BR/>흐름</td>
								<td class="al" style="padding-left:5px; background:#fff;">
									<table cellpadding="0" cellspacing="0" border="0" class="" style="margin-top:-5px;">
										<tr class="processFlow">
											<td style="background:#fff;">
												<table class="printInfo" style="width:78px;">
													<tbody>
													<tr><th class="top last">공정명</td></tr>
													<tr><td class="top last">업체명</td></tr>
													</tbody>
												</table>
											</td>
											<td style="font-size:10px;padding:3px;font-stretch:extra-condensed">▶</td>
											<td><table class="printInfo" style="width:78px;">
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
				<tr class="">
					<td style="width:100%;background-color:#fff;padding-bottom:5px;">
						<table class="" style="width:100%;">
							<colgroup>
								<col width="25%">
								<col width="50%">
								<col width="25%">
							</colgroup>
							<tbody>
								<tr style="width:100%;background-color:#fff;">
									<td class="al reportLogo" style="background-color:#fff;"></td>
									<td class="al" style="vertical-align: top;align-content: end;padding-left:0px;background-color:#fff;"></td>
									<td class="ar" style="vertical-align: top;padding-right:0px;background-color:#fff;"><div class="qrCode2 f_rt"></div></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</page>
</template>
