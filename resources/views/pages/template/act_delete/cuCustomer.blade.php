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
						<th>업체명 <font color="red">*</font>
						</th>
						<td>
							<input class="w98p" name="cNm" type="text" style="border-width: 0px;background-color:transparent;" disabled>
						</td>
						<th>서비스만료일</th>
						<td class="expiryDt"></td>
					</tr>
					<tr>
						<th>사업자등록번호</th>
						<td>
							<input class="w98p inputs" type="text" name="cBizNo" style="border-width: 0px;background-color:transparent;" disabled>
						</td>
						<th>종사업장번호</th>
						<td>
							<input class="inputs" type="text" name="cBizNoNum" style="border-width: 0px;background-color:transparent;" disabled>
						</td>
					</tr>
					<tr>
						<th>대표자</th>
						<td><input class="w40p" type="text" name="cOwnerNm" placeholder="대표자" requiremsg="대표자"></td>
						<th>홈페이지</th>
						<td><input class="w94p" type="text" name="cDomain" style="border-width: 0px;background-color:transparent;" disabled></td>
					</tr>
					<tr>
						<th>업종</th>
						<td><input class="w40p" type="text" name="cUpjong" placeholder="업종"></td>
						<th>종목</th>
						<td><input class="w94p" type="text" name="cJongmok" placeholder="종목"></td>
					</tr>
					<tr>
						<th>사업장주소</th>
						<td colspan="3">
							<p class="mb5">
								<input name="cAddr" class="ip_acc w55p vm" type="text" placeholder="기본 주소" readonly="readonly">
								<a class="btnStyle03 vm btnAddrSearch" href="javascript:void(0);">주소검색</a>
							</p>
							<p>
								<input name="cAddrDetail" class="ip_acc w43p vm" type="text" placeholder="상세 주소"><br>
							</p>
							
						</td>
					</tr>
					<tr>
						<th>FAX</th>
						<td><input class="w40p" type="text" name="cFax" placeholder="팩스번호"></td>
						<th>대표메일</th>
						<td><input class="w94p" type="text" name="cInvoiceEmail" placeholder="세금계산서 발행용 메일"></td>
					</tr>
					<tr>
						<th>대표번호</th>
						<td><input class="w94p" type="text" inputType="phone" name="cTel" fieldname="거래처 전화번호" placeholder=""></td>
						<th>홈페이지</th>
						<td><input class="w94p" type="text" name="cHomepage" placeholder="https://"></td>
					</tr>
					<tr>
						<th>로고 이미지
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
						<th>작업지시서 유형<span></th>
						<td style="">
							<select name="cWorkReport">
								<option value="A"> A-Type</option>
								<option value="B"> A-Type(배송장)</option>
								<option value="C"> B-Type</option>
								<option value="D"> B-Type(배송장)</option>
							</select> 샘플보기
						</td>
						<th>발주서 유형<span></th>
						<td style="height:85px;">
							<select name="cTransReport">
								<option value="A"> A-Type </option>
								<option value="B"> A-Type (공정흐름) </option>
							</select> 샘플보기
						</td>
					</tr>
					<!-- tr>
						<th>보고서 소개	<span></th>
						<td colspan="3" style="height:85px;">
							<textarea name="cReportTitle" class="w98p" style="line-height: 15px;" rows="3"></textarea><br/> ※ 작업지시서, 거래명세서 등인 인쇄물에 출력된 간략한 회사 소개
						</td>
					</tr -->
					<!--tr>
						<th colspan="4" class="ac">계좌정보 <a href="javascript:void(0);" class="btnStyleMin03 btnAddBank" style="margin-left:15px;">추가</a>
						</th>
					</tr>
					< tr>
						<td colspan="4" class="accountWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="w50p listTbType01 tr_nohover mb10 tablScrollDisplay scrollTbThead ">
						<caption></caption>
						<colgroup>
						<col width="45px">
						<col width="30%">
						<col width="30%">
						<col width="30%">
						<col width="15%">
						</colgroup>
						<thead>
						<tr>
						<th class="ac"></th>
						<th class="ac">은행명</th>
						<th class="ac">예금주</th>
						<th class="ac">계좌번호</th>
						<th class="ac">비고</th>
						<th></th>
						</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
						</td>
					</tr -->
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
								▶ 계좌정보
							</div>
						</td>
						<td>
							<div class="ar">
								<a href="javascript:void(0);" class="btnStyle02 btnAddBank" style="margin-left:15px;">추가</a>
								<a href="javascript:;" class="btnStyle04 btnSaveAccount">저장</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table cellpadding="0" cellspacing="0" border="0" summary="" class="writeTable tr_nohover">
				<caption></caption>
				<colgroup>
					<col width="30px">
					<col width="20%">
					<col width="auto">
					<col width="30%">
					<col width="30px">
				</colgroup>
				<thead>
					<tr>
						<th class="ac"></th>
						<th class="ac">은행명</th>
						<th class="ac">예금주</th>
						<th class="ac">계좌번호</th>
						<th class="ac"></th>
					</tr>
				</thead>
				<tbody class="accountWrap">
				</tbody>
			</table>
			<div style="clear:both;"></div>
		</div>
	</div>
	<div class="divisionWrap f_lt apiArea" style="min-height: 50px;width: 49.9%;padding-top:0px;margin-left:5px;margin-top:9px;">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover" >
			<caption></caption>
			<colgroup>
			<col width="50%">
			<col width="50%">
			</colgroup>
			<tbody>
				<tr>
					<td>
						<div class="al">
							▶ 연동 정보
						</div>
					</td>
					<td>
						<div class="ar">
						</div>
					</td>
				</tr>
			</tbody>
		</table>
			<div class="f_lt" style="width:40%; ">
				<table class="writeTable tr_nohover" cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="30%">
						<col width="70%">
					</colgroup>
					<thead>
						<tr>
							<th colspan="2" class="al" style="padding:0 5px;">※ 메일정보설정
								<div class="f_rt">
									<a href="javascript:;" class="btnStyle04 btnSaveEmail" name="mail">저장</a>
								</div>
							</th>
						</tr>
					</thead>
					<tbody class="mail">
						<tr>
							<th class="ar" style="padding:0 5px;">도메인 </th>
							<td><input class="w95p" name="coaDomain" type="text" style="border-width: 0px;background-color:transparent;"></td>
						</tr>
						<tr>
							<th class="ar" style="padding:0 5px;">포트 </th>
							<td><input class="w15p" name="coaPort" type="text" style="border-width: 0px;background-color:transparent;"></td>
						</tr>
						<tr>
							<th class="ar" style="padding:0 5px;">계정 </th>
							<td><input class="w45p" name="coaId" type="text" style="border-width: 0px;background-color:transparent;"> / <input class="w45p" name="coaPwd" type="text" style="border-width: 0px;background-color:transparent;"></td>
						</tr>
						<tr>
							<th class="ar" style="padding:0 5px;">발송메일주소 </th>		
							<td><input class="w95p" name="coaEtc1" type="text" style="border-width: 0px;background-color:transparent;"></td>		
						</tr>
						
					</tbody>
				</table>
			</div>

			<div class="f_lt" style="width:58.6%;margin-left:10px;">
				<table class="writeTable tr_nohover" cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="30%">
						<col width="70%">
					</colgroup>
					<thead>
						<tr>
							<th colspan="2" class="ac" style="padding:0 5px;">
								<div class="f_lt al" style="width:49%;margin-top: 3px;">
									※ <img src="https://www.linkhubcorp.com/static/img/main/main_wedo_logo1.png" width="60px"> (세금계산서 / FAX)
								</div>
								<div class="f_rt popbillAction ar" style="width:49%;">
									<a href="javascript:;" class="btnStyle04 btnPopbillJoin" name="popbill">연동 가입</a>
								</div>
							</th>
						</tr>
					</thead>
					<tbody class="popbill" style="display:none">
						<tr>
							<th class="ar" style="padding:0 5px;height:38px;">계정 </th>
							<td><input class="w45p readonlyData" name="coaId" type="text" style="border-width: 0px;background-color:transparent;"> (<input class="readonlayData ac" name="coaEtc1" type="text" style="width:50px;border-width: 0px;background-color:transparent;">) <input class="w45p" name="coaPwd" type="hidden" style="border-width: 0px;background-color:transparent;"></td>
						</tr>
						<tr>
							<th class="ar vatTh" style="padding:0 5px;height:38px;">계산서발행 </th>
							<td class="certInfo"><a href="javascript:;" class="btnStyle03 certInsert"><i class="fa-solid fa-up-right-from-square"></i>&nbsp;&nbsp;인증서등록</a></td>
						</tr>
						<tr>
							<th class="ar faxTh" style="padding:0 5px;height:38px;">FAX 발신번호 </th>
							<td class="faxSendNo"><a href="javascript:;" class="btnStyle03 faxNoInsert"><i class="fa-solid fa-up-right-from-square"></i>&nbsp;&nbsp;발신번호 설정</a> &nbsp;&nbsp;<span style="color:red;font-size:10px;">(저장된 FAX번호로 설정하십시오)</span></td>
						</tr>
						<tr>
							<td colspan="2" class="ac" style="height:38px;">
								<a href="javascript:;" class="btnStyle01 btnPopbillPaymentHistoryURL" style="margin-rigth:15px;"><i class="fa-solid fa-up-right-from-square"></i>&nbsp;&nbsp;결제내역 조회</a>
								<a href="javascript:;" class="btnStyle01 btnPopbillUseHistoryURL" style="margin-left:15px;"><i class="fa-solid fa-up-right-from-square"></i>&nbsp;&nbsp;사용내역 조회</a>
								<a href="javascript:;" class="btnStyle02 btnPopbillChargeURL" style="margin-left:15px;"><i class="fa-solid fa-up-right-from-square"></i>&nbsp;&nbsp;포인트 충전</a>
								<a href="javascript:;" class="btnStyle05 btnPopbillQuit" style="margin-left:15px;">&nbsp;&nbsp;연통해지신청</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="bankWrap">
	<!-- div class="mt3">
		<input class="w20p" type="text" name="caBankNm" placeholder="은행명" requiremsg="은행명">
		<input class="w20p" type="text" name="caOwnerNm" placeholder="예금주" requiremsg="예금주">
		<input class="w35p" type="text" name="caAccount" placeholder="계좌번호" requiremsg="계좌번호">
		<a href="javascript:void(0);" class="mt3 btnStyle05 btnRemoveBank">삭제</a>
	</div -->
</template>
<template id="popbillJoinDiv">
	<div class="mw_defalut" style="width:650px;height:200px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">Popbill 연동 신청</span>
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
											<a href="javascript:void(0);" class="btnSearch popbillJoin">연동신청</a>
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
								<col width="12%">
								<col width="30%">
								<col width="15%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 아이디</th>
									<td><input type="hidden" name="idCheck"><input type="text" class="w98p" name="popbillId" requiremsg="아이디" placeholder="8자에서 50자 미만"></td>
									<th class="txt_r"><span style="color:red;">*</span> 비밀번호</th>
									<td>
										<input type="password" name="popbillPwd" class="w47p" placeholder="8~20자,영,숫자,특수 포함"> /
										<input type="password" name="popbillPwdRe" class="w47p" placeholder="비밀번호 확인">
									</td>
								</tr>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 담당자 성명</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactName" style="" placeholder="담당자 성명" >
									</td>
									<th class="txt_r"><span style="color:red;">*</span> 담당자 연락처</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactTel" style="" placeholder="담당자 연락처">
									</td>
								</tr>

								<!-- tr>
									<th class="txt_r">업체명</th>
									<td>
										<input class="w98p inputs" type="text" name="cNm" style="border-width: 0px;background-color:transparent;" >
									</td>
									<th class="txt_r">사업자번호</th>
									<td>
										<input class="w98p inputs" type="text" name="cBizNo" style="border-width: 0px;background-color:transparent;" >
									</td>
								</tr>
								<tr>
									<th class="txt_r">대표자</th>
									<td>
										<input class="w98p inputs" type="text" name="cOwnerNm" style="border-width: 0px;background-color:transparent;" >
									</td>
									<th class="txt_r">담당자 성명</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactName" >
									</td>
								</tr>
								<tr>
									<th class="txt_r">담당자 메일</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactEmail" style="border-width: 0px;background-color:transparent;" >
									</td>
									<th class="txt_r">담당자 연락처</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactTel" style="" >
									</td>
								</tr>
								<tr>
									<th class="txt_r">업태</th>
									<td>
										<input class="w98p inputs" type="text" name="cUpjong" style="border-width: 0px;background-color:transparent;" >
									</td>
									<th class="txt_r">종목</th>
									<td>
										<input class="w98p inputs" type="text" name="cJongmok" style="border-width: 0px;background-color:transparent;" >
									</td>
								</tr -->
							</tbody>
						</table>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="popbillQuitDiv">
	<div class="mw_defalut" style="width:650px;height:200px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">Popbill 연동 해지(탈퇴)</span>
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
										<div class="al f_lt reFund" style="width:49.5%;"></div>
										<div class="ar f_rt" style="width:49.5%;">
											<a href="javascript:void(0);" class="btnSearch popbillJoin">해지신청</a>
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
								<col width="12%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 해지사유</th>
									<td><textarea class="w99p" name="quitReason" rows="3"></textarea></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>