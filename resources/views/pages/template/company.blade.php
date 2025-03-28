<div id="CI00000002">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>기업정보</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="cNm">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<!-- col width="35px">
			<col width="90px" -->
			<col width="45px">
			<col width="150px">
			<col width="65px">
			<col width="80px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<!-- th class="ar">· 분류</th>
					<td>
						<select class="w98p schColumBorderColorDefault" name="searchColumn">
							<option value="cuNm">업체명</option>
							<option value="cuOwnerNm">대표자명</option>
							<option value="cuTel">전화번호</option>
						</select>
					</td -->
					
					<th class="ar">· 검색어</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="schColumBorderTextDefault" style="width:145px;height:28px !important" name="searchWord" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar">· 만료여부</th>
					<td>
						<select class="schColumBorderColorDefault" name="isExpiry">
							<option value="">전체</option>
							<option value="Y">유효</option>
							<option value="N">만료</option>
						</select>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
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
				<col width="25px">
				<col width="180px"><!-- 업체명 -->
				<col width="100px"><!-- 대표자 -->
				<col width="120px"><!-- 사업자번호 -->
				<col width="180px"><!-- 도메인 -->
				<col width="450px"><!-- 주소-->
				<col width="80px"><!-- 만료일-->
				<col width="50px"><!-- 직원수 -->
				<col width="50px"><!-- 직원수 -->
				<col width="auto"><!-- 비고 -->
				<col width="110px"><!-- 등록일시 -->
				<col width="80px"><!-- 회원사 메뉴 설정 -->
				<col width="80px"><!-- 거래처 메뉴 설정 -->
				<col width="50px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="cuOwnerNm">대표자 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th >사업자번호(종)</th>
					<th >도메인</th>
					<th >주소 </th>
					<th >만료일 </th>
					<th >직원 </th>
					<th >로그인 </th>
					<th >메모 </th>
					<th >등록일시</th>
					<th >회원사 메뉴</th>
					<th >거래처 메뉴</th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px">
				<col width="180px"><!-- 업체명 -->
				<col width="100px"><!-- 대표자 -->
				<col width="120px"><!-- 사업자번호 -->
				<col width="180px"><!-- 도메인 -->
				<col width="450px"><!-- 주소-->
				<col width="80px"><!-- 만료일-->
				<col width="50px"><!-- 직원수 -->
				<col width="50px"><!-- 직원수 -->
				<col width="auto"><!-- 비고 -->
				<col width="110px"><!-- 등록일시 -->
				<col width="80px"><!-- 회원사 메뉴설정 -->
				<col width="80px"><!-- 거래처 메뉴설정 -->
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
					<a href="#" class="btnStyleMin03 btnExcelUpload" title="엑셀파일 등록"><i class="fa-solid fa-upload" style="color: #38a938;margin-top: 4px;"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="companyInsertDiv">
	<div class="mw_defalut" style="width:850px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">회원사 등록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents" style="margin-bottom: 7px !important;">
				<div class="mw_body" style="">
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
									</th>
									<th>
										<div class="ar">
											<a href="javascript:void(0);" class="btnSearch save">저장</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap" style="margin-bottom:15px;">
						<table class="commonPopTable tr_nohover" cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
								<col width="14%">
								<col width="36%">
								<col width="14%">
								<col width="36%">
							</colgroup>
							<tbody name="rtTbody" class="rtTbody">
								<tr>
									<th style="padding-left:10px;"><font color="red">*</font>업체명
									</th>
									<td>
										<div class="inputTextCleanDiv">
											<input class="" name="cNm" type="text" style="width:250px;" requiremsg="업체명">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th style="padding-left:10px;"><font color="red">*</font>서비스만료일</th>
									<td class=""><input class="date crdrIp" type="text" name="expiryDt" placeholder="날짜 선택" readonly requiremsg="만료일"></td>
								</tr>
								<tr>
									<th style="padding-left:10px;"><font color="red">*</font>사업자등록번호</th>
									<td>
										<input class="inputs" type="text" name="cBizNo" style="width:250px;" requiremsg="사업자등록번호">
									</td>
									<th style="padding-left:10px;">종사업장번호</th>
									<td>
										<input class="inputs" type="text" name="cBizNoNum" style="width:250px;" >
									</td>
								</tr>
								<tr>
									<th style="padding-left:10px;"><font color="red">*</font>대표자</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px;" type="text" name="cOwnerNm" placeholder="대표자" requiremsg="대표자">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th style="padding-left:10px;"><font color="red">*</font>접속 URL</th>
									<td><input class="" type="text" name="cDomain" style="width:250px;" requiremsg="접속URL"></td>
								</tr>
								<tr>
									<th style="padding-left:10px;">업태</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px" type="text" name="cUpjong" placeholder="업태">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th style="padding-left:10px;">종목</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px;" type="text" name="cJongmok" placeholder="종목">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
								</tr>
								<tr>
									<th style="padding-left:10px;">사업장주소</th>
									<td colspan="3">
										<p class="mb5">
										<input name="cZipcode" class="ip_acc vm readonly" type="text" style="width:60px;margin-right:10px;" placeholder="우편번호" readonly="readonly"><input name="cAddr" class="ip_acc vm readonly" type="text" style="width:200px;" placeholder="기본 주소" readonly="readonly">
											<a class="btnStyle03 vm btnAddrSearch" href="javascript:void(0);">주소검색</a>
										</p>
										<p>
											<div class="inputTextCleanDiv">
												<input name="cAddrDetail" class="ip_acc vm" style="width:270px;" type="text" placeholder="상세 주소">
												<div class="inputTextClean"><span>×</span></div>
											</div>
										</p>
									</td>
								</tr>
								<tr>
									<th style="padding-left:10px;">대표번호</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px" type="text" inputType="phone" name="cTel"  placeholder="">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>	
									<th style="padding-left:10px;">대표메일</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px" type="text" name="cInvoiceEmail" placeholder="세금계산서 발행용 메일">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
								</tr>
								<tr>
									<th style="padding-left:10px;">FAX</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px" type="text" name="cFax" placeholder="팩스번호">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>	
									<th style="padding-left:10px;">홈페이지</th>
									<td>
										<div class="inputTextCleanDiv">
											<input style="width:250px" type="text" name="cHomepage" placeholder="https://">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
								</tr>
								<tr>
									<th style="padding-left:10px;">로고 이미지
										<p class="mt3">
											<a href="javascript:void(0);" class="btnStyleMin03 btnAddFile">파일 첨부하기</a>
										</p>
									</th>
									<td colspan="3" style="height:80px;">
										<input id="uploadProfie" name="upfile" style="display: none;" type="file" accept="image/*">
										<img id="uploadProfie-preview" src="/images/logo.png" width="172px"> ※ 권장 이미지크기 (180 X 50)
									</td>
								</tr>
								<tr>
									<th style="padding-left:10px;">작업지시서 유형<span></th>
									<td style="">
										<select name="cWorkReport">
											<option value="A"> A-Type</option>
											<option value="B"> A-Type(배송장)</option>
											<option value="C"> B-Type</option>
											<option value="D"> B-Type(배송장)</option>
										</select>
								<br> <span style="padding-left:5px; color:#999">※설정 후 저장을 해야 적용이 됩니다.</span>
									</td>
									<th style="padding-left:10px;">발주서 유형<span></th>
									<td style="height:85px;">
										<select name="cTransReport">
											<option value="A"> A-Type </option>
										</select>
										<br> <span style="padding-left:5px; color:#999">※설정 후 저장을 해야 적용이 됩니다.</span>
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
<template id="companyMenuSetting">
	<div class="mw_defalut" style="width:450px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">권한 설정</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="">
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
										<div class="ar"><a href="javascript:void(0);" class="btnSearch memuSave">저장</a></div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap pt10" style="height:485px;overflow-y:auto;padding:2px;">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType01 tr_nohover mb10 tablScrollDisplay scrollTbThead" style="border-top: 1px solid #9ac7e1 !important;">
							<caption></caption>
							<colgroup>
								<col width="150px">
								<col width="25px">
								<col width="200px">
							</colgroup>
							<thead>
								<tr>
									<th class="txt_c" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;">대분류</td>
									<th class="txt_c" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;border-right-width: 0 !important;"><input type="checkbox" name="menuAll"></th>
									<th class="txt_c last" style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;border-left-width: 0 !important;">소분류</th>
								<tr>
							</thead>
							<tbody class="menuList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="companyEmployeeInsertDiv">
	<div class="mw_defalut" style="width:680px;" id=""><div class="mw_title" id="handle">
		<h1 class="mw_title_mid">
			<span class="title">직원 등록</span>
			<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
		</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:350px;overflow-y:auto;padding:2px;">
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
										<div class="al passwordChange"></div>
									</th>
									<th>
										<div class="ar"><a href="javascript:void(0);" class="btnSearch employeeSave">저장</a></div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="60px">
								<col width="auto">
								<col width="60px">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color: red;">*</span> 이름</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="eNm" style="width:240px;" requiremsg="이름"><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r">직급</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="eRank" style="width:240px;"><div class="inputTextClean"><span>×</span></div></div></td>
								<tr>
									<th class="txt_r">담당분야</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="eTakeCharge" style="width:240px;" placeholder="예시)정산,생산,관리,검수"><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r"><span style="color: red;">*</span> 전화번호</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="eTel" style="width:240px;" requiremsg="eTel" vtype="phone"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr>
									<th class="txt_r">메모</th>
									<td colspan="3"><textarea name="eMemo" class="w100p" rows="1"></textarea></td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap employeeAuthTr">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="60px">
								<col width="30%">
								<col width="50px">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_c" colspan="4">권한</th></tr>
								<tr>
									<th class="txt_r">접속권한</th>
									<td><select name="eLoginYn"><option value="N">미사용</option><option value="Y">사용</option></select></td>
									<th class="txt_r">담당장비</th>
									<td><span class="eqNms f_lt" style="width:75%;margin: 5px 0px;"></span><a class="btnStyle03 f_rt eqChoice" href="javascript:void(0);">장비선택</a></td>
								</tr>
								<tr>
									<th class="txt_r">아이디</th>
									<td><input type="text" name="eId" class="w100p" placeholder="예시)kprintfactory" autocomplete="false"></td>
									<th class="txt_r">비밀번호</th>
									<td><input type="password" name="ePwd" class="w35p"  vtype="password" placeholder="비밀번호" autocomplete="false"> <input type="password" name="reEPwd" class="w35p mr5" placeholder="비밀번호 확인"><a class="btnStyle03 btnChangePwd f_rt" href="javascript:void(0);">변경</a></td>
								</tr>
								<tr>
									<th class="txt_r">권한</th>
									<td><select name="eManagerYn"><option value="N">직원</option><option value="Y">관리자</option></select></td>
									<th class="txt_r">재직여부</th>
									<td><select name="eOutYn"><option value="N">재직중</option><option value="Y">퇴사</option></select></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</templage>