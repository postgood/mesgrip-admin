<div id="CI00000002">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>기업정보</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="divisionWrap f_lt" style="width: 49.5%; min-height: 50px;">
		<div class="mt20 companyInfo">
			<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
				<caption></caption>
				<colgroup>
				<col width="50%">
				<col width="50%">
				</colgroup>
				<tbody>
					<tr>
						<td>
							<div class="al">
								▶ 기업정보
							</div>
						</td>
						<td>
							<div class="ar">
								<a href="javascript:;" class="btnStyle04 btnSave">저장</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<form id="frmCompany">
			<table class="writeTable tr_nohover" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="14%">
					<col width="36%">
					<col width="14%">
					<col width="36%">
				</colgroup>
				<tbody name="rtTbody" class="rtTbody">
					<tr>
						<th>회사명 
						</th>
						<td>
							<input class="w98p" name="cuNm" type="text" style="border-width: 0px;background-color:transparent;" disabled>
						</td>
						<th>대표자</th>
						<td><input class="w40p" type="text" name="cuOwnerNm" placeholder="대표자" requiremsg="대표자"></td>
					</tr>
					<tr>
						<th>사업자등록번호</th>
						<td>
							<input class="w98p inputs" type="text" name="cuBizNo" style="border-width: 0px;background-color:transparent;" disabled>
						</td>
						<th>종사업장번호</th>
						<td>
							<input class="inputs" type="text" name="cuBizNoNum" style="border-width: 0px;background-color:transparent;" disabled>
						</td>
					</tr>
					<tr>
						<th>업태</th>
						<td><input class="w40p" type="text" name="cuUpjong" placeholder="업태"></td>
						<th>종목</th>
						<td><input class="w94p" type="text" name="cuJongmok" placeholder="종목"></td>
					</tr>
					<tr>
						<th>사업장주소</th>
						<td colspan="3">
							<p class="mb5">
								<input name="cuZipcode" class="ip_acc w10p vm" type="text" placeholder="우편번호" readonly="readonly">
								<a class="btnStyle03 vm btnAddrSearch" href="javascript:void(0);">주소검색</a>
								<input name="cuAddr" class="ip_acc w55p vm ml20" type="text" placeholder="기본 주소" readonly="readonly">
							</p>
							<p>
								<input name="cuAddrDetail" class="ip_acc w80p vm" type="text" placeholder="상세 주소"><br>
							</p>
							
						</td>
					</tr>
					<tr>
						<th>FAX</th>
						<td><input class="w40p" type="text" name="cuFax" placeholder="팩스번호"></td>
						<th>대표메일 </th>
						<td><input class="w94p" type="text" name="cuInvoiceEmail" placeholder="세금계산서 발행용 메일"></td>
					</tr>
					<tr>
						<th>대표번호</th>
						<td><input class="w94p" type="text" inputType="phone" name="cuTel" fieldname="대표전화번호" placeholder=""></td>
						<th></th>
						<td></td>
					</tr>
				</tbody>
			</table>
			</form>
			<div style="clear:both;"></div>
		</div>
	</div>
	<div class="divisionWrap f_lt" style="width: 49.9%; min-height: 50px;margin-left:5px;">
	<div class="mt20">
			<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
				<caption></caption>
				<colgroup>
				<col width="50%">
				<col width="50%">
				</colgroup>
				<tbody>
					<tr>
						<td>
							<div class="al">
								▶ 직원정보
							</div>
						</td>
						<td>
							<div class="ar">
								<a href="javascript:void(0);" class="btnStyle02 btnAddEmployee" style="margin-left:15px;">추가</a>
								<!-- a href="javascript:;" class="btnStyle04 btnSaveAccount">저장</a -->
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table cellpadding="0" cellspacing="0" border="0" summary="" class="cuEmployeeList writeTable tr_nohover">
				<caption></caption>
				<colgroup>
					<col style="width:30px;">
					<col style="width:20%;">
					<col style="width:auto;">
					<col style="width:30%;">
					<col style="width:30%;">
				</colgroup>
				<thead>
					<tr>
						<th class="ac"></th>
						<th class="ac">성명</th>
						<th class="ac">직급</th>
						<th class="ac">아이디</th>
						<th class="ac">전화번호</th>
						
					</tr>
				</thead>
				<tbody class="">
				</tbody>
			</table>
			<div style="clear:both;"></div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="employeeDiv">
	<div class="mw_defalut" style="width:680px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">직원 등록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:'+((self._const.__MANAGER_YN == 'Y')?'440':'370')+'px;overflow-y:auto;padding:2px;">
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
										<div class="al"><a href="javascript:void(0);" class="btnSearch2 employeeDelete">삭제</a></div>
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
									<td><input type="text" name="eNm" class="w100p" requiremsg="이름"></td>
									<th class="txt_r">직급</th>
									<td><input type="text" name="eRank" class="w100p"></td>
								</tr>
								<tr>
									<th class="txt_r">아이디</th>
									<td><input type="text" name="eId" class="w70p" placeholder="예시)kprint@kpfactory.com" vtype="mail"><span class="idOverlapCheck" style="margin-left:5px;"></span></td>
									<th class="txt_r">비밀번호</th>
									<td><input type="password" name="ePwd" class="w35p"  vtype="password" placeholder="비밀번호"> <input type="password" name="reEPwd" class="w35p mr5" placeholder="비밀번호 확인"><a class="btnStyle03 btnChangePwd" href="javascript:void(0);">변경</a></td>
								</tr>
								<tr>
									<th class="txt_r">담당분야</th>
									<td><input type="text" name="eTakeCharge" class="w100p" placeholder="예시)정산,생산,관리,검수"></td>
									<th class="txt_r"><span style="color: red;">*</span> 전화번호</th>
									<td><input type="text" name="eTel" class="w100p" requiremsg="eTel" vtype="phone"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
