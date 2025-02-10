
<div id="OM00000007">
	<div class="pageHere">
		<span class="first">거래처관리</span> &gt; <strong>고객사관리</strong>
	</div>
	<!-- searchWrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="cuNm">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="35px">
			<col width="90px">
			<col width="45px">
			<col width="150px">
			<col width="35px">
			<col width="80px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 분류</th>
					<td>
						<select class="w98p schColumBorderColorDefault" name="searchColumn">
							<option value="cuNm">업체명</option>
							<option value="cuOwnerNm">대표자명</option>
							<option value="cuTel">전화번호</option>
						</select>
					</td>
					
					<th class="ar">· 검색어</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="schColumBorderTextDefault" style="width:145px;height:28px !important" name="searchWord" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar">· 구분</th>
					<td>
						<select class="schColumBorderColorDefault" name="cuTypeCd">
							<option value="">전체</option>
							<option value="A">고객사</option>
							<option value="B">외주사</option>
							<option value="C">자재사</option>
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
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<!-- a href="#" class="btnSearch btnCreate" title="신규로 등록 할 수 있습니다."><i class="fa-regular fa-square-plus"></i>&nbsp;&nbsp;신규</a -->
							<a href="#" class="btnSearch btnCreate" title="신규 수주건을 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<!--a href="#" class="btnSearch2 btnTransDelete" title="선택된 건을 삭제 할 수 있습니다."><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;삭제</a -->
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
				<col width="250px"><!-- 업체명 -->
				<col width="100px"><!-- 대표자 -->
				<!-- col width="50px" --><!-- 주요 -->
				<col width="120px"><!-- 사업자번호 -->
				<!-- col width="120px" --><!-- 전화번호 -->
				<col width="450px"><!-- 주소-->
				<col width="170px"><!-- 유형-->
				<col width="50px"><!-- 할인율 -->
				<col width="auto"><!-- 비고 -->
				<col width="150px"><!-- 등록일시 -->
				<col width="50px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="cuOwnerNm">대표자 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<!-- th >주요 </th -->
					<th >사업자번호(종)</th>
					<!-- th >전화번호 </th -->
					<th >주소 </th>
					<th >유형 </th>
					<th >직원 </th>
					<th >메모 </th>
					<th >등록일시</th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px">
				<col width="250px"><!-- 업체명 -->
				<col width="100px"><!-- 대표자 -->
				<!-- col width="50px" --><!-- 주요 -->
				<col width="120px"><!-- 사업자번호 -->
				<!-- col width="120px" --><!-- 전화번호 -->
				<col width="450px"><!-- 주소-->
				<col width="170px"><!-- 유형-->
				<col width="50px"><!-- 직원 -->
				<col width="auto"><!-- 비고 -->
				<col width="150px"><!-- 등록일시 -->
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
<template id="customerInsertDiv">
	<div class="mw_defalut" style="width:850px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">고객사 등록</span>
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
											<a href="javascript:void(0);" class="btnSearch stockSetting" style="display:none;">공급자재 설정</a>
											<a href="javascript:void(0);" class="btnSearch clientSave">저장</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap" style="margin-bottom:15px;">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="80px">
								<col width="170px">
								<col width="60px">
								<col width="80px">
								<col width="80px">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r">거래처유형</th>
									<td colspan="5">
										<div class="mw_checkbox"><input type="checkbox" name="cuTypeCd" value="A" id="cuTypeCd1" checked><label for="cuTypeCd1">고객사</label></div>
										<div class="mw_checkbox"><input type="checkbox" name="cuTypeCd" value="B" id="cuTypeCd2"><label for="cuTypeCd2">외주사</label></div>
										<div class="mw_checkbox"><input type="checkbox" name="cuTypeCd" value="C" id="cuTypeCd3"><label for="cuTypeCd3">자재공급사</label></div>
										<span style="font-size:11px; color:#777;">※ 검색시 거래처 유형별 거래처가 나타납니다. (고객사 : 현장/정산관리, 자재사 : 자재관리 등)</span>
									</td>
								</tr>
								<tr>
									<th class="txt_r"><strong style="color:red;">*</strong> 사업자번호</th>
									<td colspan="3"><div class="inputTextCleanDiv"><input type="text" name="cuBizNo" class="mr5" style="width:300px;" requiremsg="사업자번호" autocomplete='false'><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r">종사업장번호</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="cuBizNoNum" style="width:60px;" autocomplete='false'><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>

								<tr>
									<th class="txt_r"><strong style="color:red;">*</strong> 회사명</th>
									<td colspan="3"><div class="inputTextCleanDiv"><input type="text" name="cuNm" style="width:300px;" requiremsg="회사명" autocomplete='false'><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r"><strong style="color:red;">*</strong> 대표자</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="cuOwnerNm" style="width:300px;" requiremsg="대표자" autocomplete='false'><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr>
									<th class="txt_r">기업형태</th>
									<td colspan="3"><select name="cuType"><option value="C">기업</option><option value="P">개인</option></select></td>
									<th class="txt_r">대표번호</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="cuTel" style="width:300px;" vtype="phone" autocomplete='false'><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>		
								<tr>
									<th class="txt_r">업&nbsp;&nbsp;&nbsp;&nbsp;태</th>
									<td colspan="3"><div class="inputTextCleanDiv"><input type="text" name="cuUpjong" style="width:300px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r">종&nbsp;&nbsp;&nbsp;&nbsp;목</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="cuJongmok" style="width:300px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr>
									<th class="txt_r">F&nbsp;&nbsp;A&nbsp;&nbsp;X</th>
									<td colspan="3"><div class="inputTextCleanDiv"><input type="text" name="cuFax" style="width:300px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r">대표 메일</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="cuInvoiceEmail" style="width:300px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr>
									<th class="txt_r">주&nbsp;&nbsp;&nbsp;&nbsp;소</th>
									<td colspan="3"><p class="mb5"><input name="cuZipcode" class="mr5 readonly" style="width:60px;" type="text" readonly="readonly"> <input name="cuAddr" class="width:200px" type="text" placeholder="기본 주소" readonly="readonly"> <a class="btnStyle03 btnAddrSearch" href="javascript:void(0);">주소검색</a></p></td>
									<th class="txt_r">상세주소</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="cuAddrDetail" style="width:300px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr>
									<th class="txt_r" style="vertical-align: top;padding-top:8px;">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
									<td colspan="3"><textarea name="cuMemo" rows="3" style="width: 300px;"></textarea></td>
									<th class="txt_r" style="vertical-align: top;padding-top:8px;">특이사항</th>
									<td colspan="1"><textarea name="cuSignificant" rows="3" style="width: 300px;" placeholder=""></textarea></td>
								</tr>
								<tr class="ledgerInfo">
									<th class="txt_r">결제계좌</th>
									<td class="al">
										<div class="inputTextCleanDiv" style="width:100%;">은행명 <input type="text" name="cuBankNm" style="width:100px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div>
									</td>
									<td class="al" colspan="2">
									 	<div class="inputTextCleanDiv" style="width:100%;padding-left:11px;">예금주 <input type="text" name="cuBankOwnerNm" style="width:83px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div>
									</td>
									<th class="txt_r">계좌번호</th>
									<td>
										<div class="inputTextCleanDiv"><input type="text" name="cuAccount" style="width:250px;" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
									</td>
								</tr>		
								<!-- tr class="">
									<td colspan="6" style="height:2px;"><hr style="border-width:1px 0 0 0; border-style:solid; border-color:#bbb;"></td>
								</tr>
								<tr class="ledgerInfo">
									<th class="txt_r">이월금</th>
									<td class="al">
										미수금 <input type="text" name="cuAmountSaleStart" class="ar" style="width:100px;" autocomplete="false">
									</td>
									<td class="al" colspan="2">
										미지급금 <input type="text" name="cuAmountBuyStart" class="ar" style="width:83px;" autocomplete="false">
									</td>
									<td colspan="2"></td>
									
								</tr -->		
								<tr class="cuEmployee">
									<td colspan="6"><hr></td>
								</tr>
								<tr class="cuEmployee">
									<th class="txt_r">접속아이디</th>
									<td colspan="3"><div class="inputTextCleanDiv"><input type="text" name="eId" style="width:300px;" placeholder="아이디" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r">비밀번호</th>
									<td><div class="inputTextCleanDiv"><input type="password" name="ePwd" style="width:300px;" placeholder="비밀번호" autocomplete="new-password"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
								<tr class="cuEmployee">
									<th class="txt_r">이름</th>
									<td colspan="3"><div class="inputTextCleanDiv"><input type="text" name="eNm" style="width:300px;" placeholder="이름"  autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
									<th class="txt_r">전화번호</th>
									<td><div class="inputTextCleanDiv"><input type="text" name="eTel" style="width:300px;" placeholder="전화번호" vtype="phone" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template> 
<template id="customerEmployee">
	<div class="mw_defalut" style="width:750px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">직원 목록</span>
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
									<th>
										<!-- div class="al "><a href="javascript:void(0);" class="btnSearch2 employeeDelete">직원삭제</a></div -->
									</th>
									<th>
										<div class="ar">
										<a href="#" class="btnSearch employeeCreate" title="신규등록을 할 수 있습니다." style="padding-top:4px;margin-right:3px;background: #ea467f;border:0px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
										<a href="#" class="btnSearch2 employeeDelete" title="선택된건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>		
										
										<!-- a href="javascript:void(0);" class="btnSearch employeeCreate">직원등록</a -->
									</div>
									</th>
								</tr>
							</tbody>
						</table>
					<div class="searchWrap">
						<table class="listTbType07 tr_nohover"  id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
								<col width="30px"><!--선택-->
								<col width="40px"><!--대표-->
								<col width="80px"><!--성명-->
								<col width="70px"><!--직급-->
								<col width="120px"><!--전화번호-->
								<col width="80px"><!--접속여부-->
								<col width="150px"><!--아이디-->
								<col width="50px"><!--보기-->
							</colgroup>
							<thead>
								<tr>
									<th>-</th>
									<th>구분</th>
									<th>성명</th>
									<th>직급</th>
									<th>전화번호</th>
									<th>접속여부</th>
									<th>아이디</th>
									<th>보기</th>
								</tr>
							</thead>
						</table>
						<div class="overflowYListdiv overflowFixWrap noReSize" style="height:200px;">
							<table class="listTbType07 tr_nohover employeeList"  id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
								<colgroup>
								<col width="30px"><!--선택-->
								<col width="40px"><!--대표-->
								<col width="80px"><!--성명-->
								<col width="70px"><!--직급-->
								<col width="120px"><!--전화번호-->
								<col width="80px"><!--접속여부-->
								<col width="150px"><!--아이디-->
								<col width="50px"><!--보기-->
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
</template>
<template id="customerEmployeeDetail">
	<div class="mw_defalut" style="width:680px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">직원 등록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:300px;overflow-y:auto;padding:2px;">
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
									<td>
										<div class="inputTextCleanDiv">
											<input type="text" name="eNm" style="width:100px;" requiremsg="이름" autocomplete="false">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
									<th class="txt_r">권한</th>
									<td><select name="eManagerYn"><option value="N">직원</option><option value="Y">대표자</option></select></td>
								</tr>
								<tr>
									<th class="txt_r"><span style="color: red;">*</span> 전화번호</th>
									<td><input type="text" name="eTel" class="w100p" vtype="phone" autocomplete="false"></td>	
									<th class="txt_r">직급</th>
									<td><input type="text" name="eRank" class="w100p" autocomplete="false"></td>
									
								</tr>
								<tr>
									<th class="txt_r">담당분야</th>
									<td><input type="text" name="eTakeCharge" class="w100p" placeholder="예시)정산,생산,관리,검수" autocomplete="false"></td>
									<th class="txt_r">접속권한</th>
									<td><select name="eLoginYn"><option value="N">미사용</option><option value="Y">사용</option></select></td>
								</tr>
								<tr>
									<th class="txt_r">접속 아이디</th>
									<td><input type="text" name="eId" class="w100p" placeholder="예시)kprint@kpfactory.com" autocomplete="false"></td>
									<th class="txt_r">비밀번호</th>
									<td><input type="password" name="ePwd" class="w35p"  vtype="password" placeholder="비밀번호" autocomplete="new-password"> <input type="password" name="reEPwd" class="w35p mr5" placeholder="비밀번호 확인" autocomplete="new-password"><a class="btnStyle03 btnChangePwd f_rt" href="javascript:void(0);">변경</a></td>
								</tr>
								<tr>
									<th class="txt_r">메모</th>
									<td colspan="3"><textarea name="eMemo" class="w100p" rows="3"></textarea></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="customerStockSetting">
	<div class="mw_defalut ui-draggable" style="width: 950px;" id="">
		<div class="mw_title ui-draggable-handle" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">공급자재 설정</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" class="popupClose" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap" style="padding: 5px 20px 10px 20px;">
			<div class="mw_contents">
				<div class="searchWrap">
					<div style="height:440px;overflow-y:auto;padding:2px;">
						<div class=" f_lt " style="width:49%; min-height: 50px;">
							<div class="ar mb5 buttonArea " style="height: 20px;">
								<div class="f_rt buttonArea al" style="width:100%">
									<strong style="font-size: 14px;color:#566981;">※ 자재 목록</strong>
									<div class="inputTextCleanDiv" style="width:135px;padding-left:10px;">
										<input type="text" name="sNm" style="width:120px;height:20px !important;" placeholder="자재명 또는 자재코드">
										<div class="inputTextClean"><span>×</span></div>
									</div>
									<i class="fa-solid fa-magnifying-glass btnStockSearch"></i>
									<div class="" style="display:inline-block;float: right;padding-top: 2px;padding-right: 5px;">
										<a href="#" class="btnCreate btnStockLinkCreate" title="수급자재 목록에 추가 할 수 있습니다." style="padding-top:0px;margin-right:5px;margin-top: -5px;cursor:pointer;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
									</div>
								</div>
							</div>
							<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
								<caption></caption>
								<colgroup>
									<col width="30px"><!--선택-->
									<col width="100px"><!--코드-->
									<col width="160px"><!--자재명-->
									<col width="auto"><!--규격-->
								</colgroup>
								<thead>
									<tr>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;"><input type="checkbox" name="chckAll"></th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">코드</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;">규격</th>
									</tr>
								</thead>
							</table>
							<div class="overflowYListdiv overflowFixWrap " style="height:365px;overflow: overlay;">
								<table class="listTbType02 tr_nohover dataListTable transList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
									<colgroup>
										<col width="30px"><!--선택-->
										<col width="100px"><!--코드-->
										<col width="160px"><!--자재명-->
										<col width="auto"><!--규격-->
									</colgroup>
									<tbody><tr><td colspan="4" class="ac">자재명 또는 이름으로 검색을 하십시요</td></tr></tbody>
									<tfoot>
									</tfoot>
								</table>
							</div>
						</div>
						<div class=" f_rt " style="width:49%; min-height: 50px;">
							<div class="ar mb5 buttonArea " style="height: 20px;">
								<div class="f_rt buttonArea al" style="width:100%">
									<strong style="font-size: 14px;color:#566981;">※ 수급 자재목록</strong>
									<div class="" style="display:inline-block;float: right;padding-top: 2px;padding-right: 5px;">
									<a href="#" class="btnStockLinkDelete" title="선택된 건을 삭제 할 수 있습니다." style="padding-top:0px;margin-top: -5px;cursor:pointer;"><i class="fa-regular fa-trash-can" style="font-size:17px; color:#ea467f"></i></a>
								</div>
								</div>
							</div>
							<table class="listTbType07 tr_nohover payListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
								<caption></caption>
								<colgroup>
									<col width="30px"><!--선택-->
									<col width="100px"><!--코드-->
									<col width="160px"><!--자재명-->
									<col width="auto"><!--규격-->
								</colgroup>
								<thead>
									<tr>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;"></th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">코드</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;">규격</th>
									</tr>
								</thead>
							</table>
							<div class="overflowYListdiv overflowFixWrap noReSize" style="height:365px;overflow: overlay;">
								<table class="listTbType02 tr_nohover dataListTable payList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
									<colgroup>
										<col width="30px"><!--선택-->
										<col width="100px"><!--코드-->
										<col width="160px"><!--자재명-->
										<col width="auto"><!--규격-->
									</colgroup>
									<tbody></tbody>
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


<template id="customerExcelInsert">
	<div class="mw_defalut" style="width:380px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">고객사 등록</span>
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