'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let outsourcingController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._filcuSeq = null;
		this._nextStatus = {A:{nm : "대기", nextNm:"진행", nextStatus:'B'},"B":{nm : "대기", nextNm:"완료", nextStatus:'D'},"C":{nm : "중지", nextNm:"진행", nextStatus:'B'},"D":{nm : "완료", nextNm:"대기", nextStatus:'A'}};
		this._pageUrl = 'workreport';
	}
	init = (_code,_data) => {
		const self = this;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};
		
		self._currentDateTime = self._utils.currentDateTime();

		self.intervalId = setInterval(function(){
			self._parent.lastModifyTimeCheck(['order','work','distribution'],self._currentDateTime, function(){
					self._currentDateTime = self._utils.currentDateTime();
					setTimeout(self.retrieve,30000);
				});
			}, self._parent._reloadTime);

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._currentDateTime = self._utils.currentDateTime();
			self._code.find("input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});

		self._code.find(".btnCreate").on("click",function(e){
			self.layerView(function(data){
				self._parent.openLayer(data, self.initNewLayer);
			});
			
			e.stopPropagation();
		});

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=cuSeq]:checked");
			if(chkBoxs.length==0){
				alert("삭제할 대상을 선택 하십시오");
				return;
			}else if(chkBoxs.length>1){
				alert("삭제는 1건씩 가능 합니다.");
				self._code.find("input[name=chckAll]").prop("checked", false);
				for(let i in chkBoxs) {
					if (chkBoxs[i].checked) {
						chkBoxs[i].checked = false;
					}
				}
				return;
			}

			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let cuSeq = chkBoxs.val();

					self.delete({cuSeq : cuSeq}, function(resp) {
						if(resp.code==0) {
							self.retrieve();
							alert('삭제되었습니다');
						} else {
							self._code.find("input[name=chckAll]").prop("checked", false);
							for(let i in chkBoxs) {
								if (chkBoxs[i].checked) {
									chkBoxs[i].checked = false;
								}
							}
							alert(resp.message);
						}
					});
				}
			});
		});

		self._code.find("input[name=chckAll]").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let boxs = tbody.find("input[name=cuSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
			
		});

		// 목록 테이블 이벤트 정의
		let $searchWrap = self._code.find(".searchWrap");
		let $thead = self._code.find(".dataHeadTable thead");
		let $tbody = self._code.find(".dataListTable tbody");
		let $tfoot = self._code.find(".pageInfoTfoot");
		$searchWrap.find('input[name=searchWord]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term, cuTypeCd : 'B'};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.cuNm, value:v.cuNm, cuSeq:v.cuSeq};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });
		$searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		$searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addDays(new Date(), -3)));
		$searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(new Date()));

		$thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			$searchWrap.find("input[name=orderculumn]").val(column);
			$searchWrap.find("input[name=orderby]").val(order);
			self.tHeadOrderBy($(this),order);
			
		});


		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) $tfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		$tfoot.find("select[name=rowsPerPage]").on("change",function(){
			localStorage.setItem('rowsPerPage',$(this).val());
			$tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
		// 수주서 조회
		$tbody.on('click','.oFileNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.orderView(d);			
		});
		// 거래처 정보 조회
		$tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});
		$tbody.on('click','.oFileNmDown', function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			if(d.fileInfo.length>0){
				self._parent.fileDownload(d.fileInfo[0]);
			}

		});

		// 외주 발주
		$tbody.on('click','.orderFormShow',function(e){
			let $tr = $(this).closest("tr");
			let d = $tr.data("ROW");
			let mapData = {ctl : 'outsourcing',cmd : 'orderDataLoad',oSeq : d.oSeq, cuSeq : d.wCuSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
/*					if(d.cuCSeq != undefined){
						let $popDiv = $('template#outsourcingMemberDiv');
						rdata.data.cuCSeq = d.cuCSeq;
						rdata.data.cuSeq = d.wCuSeq;
						rdata.data.cuNm = d.wCuNm;
						self._parent.openLayer($popDiv.html(), self.memberSendLayer, rdata.data, $tr);
					}else{
*/					
						let $popDiv = $('template#outsourcingFormMainDiv');
						rdata.data.wCuNm = d.wCuNm;
						self._parent.openLayer($popDiv.html(), self.outsourcingFormMainDivEvent, rdata.data, $tr);

						/*					
						let $popDiv = $('template#outsourcingFormDiv');
						rdata.data.wCuNm = d.wCuNm;
						self._parent.openLayer($popDiv.html(), self.formLayer, rdata.data, $tr);
						*/
//					}
				}else{
					alert(rdata.message)
				}
			});

			e.stopPropagation();
		});
		$tbody.on('focus','input[name=oswEndCnt]', function(){
			let v = self._utils.getOnlyNumber($(this).val());
			$(this).data("ROW",v);
			$(this).val(v=='0'?'':v);

		});
		// 완료수량 변경
		$tbody.on('focusout','input[name=oswEndCnt]', function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let o = $(this).data("ROW");
			let v = $(this).val();
			if(d.delYn == 'Y'){
				$(this).val(o);
				return false;
			}
			v = self._utils.getOnlyNumber(v);
			if(o != undefined && o != v){
				let d = $tr.data("ROW");
				if(d.oswStatus=='D'){
					let mapData = {ctl : 'outsourcing',cmd : 'statusUpdate', wSeq : d.wSeq, oswSeq : d.oswSeq,  oswStatus : d.oswStatus, oswEndCnt : v};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
					_api.ajaxformdata(function(rdata){ 
						if(rdata.code==0) {
							alert('수정되었습니다.');
							self.retrieve();
						}else{
							alert(rdata.message)
						}
					});
				}else{
					alert('완료상태가 아닙니다.');
					$(this).val(0);

				}
			}
		});

		// 진행 상태 변경
		$tbody.on('click','.oswStatus', function(){
			if(self._const.__MANAGER_YN == 'Y'){
				let $tr = $(this).closest('tr');
				let d = $tr.data("ROW");
				if(d.delYn == 'Y'){
					return false;
				}
				let status = self._nextStatus[d.oswStatus];
				confirm('['+ status.nm +']을 ['+ status.nextNm +']상태로 변경하시겠습니까?', function(data){
					if(data) {
						let mapData = {ctl : 'outsourcing',cmd : 'statusUpdate', wSeq : d.wSeq, oswSeq : d.oswSeq, oswStatus : status.nextStatus };
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code==0) {
								alert('수정되었습니다.');
								self.retrieve();
							}else{
								alert(rdata.message)
							}
						});
					}
				},"변경");
			}else{
				alert('관리자권한이 필요합니다.');
			}
		});
		// 진행 세부사항 수정
		$tbody.on('click','.deleteSave', function(){
			if(self._const.__MANAGER_YN == 'Y'){
				let $tr = $(this).closest('tr');
				let d = $tr.data("ROW");
			
				confirm('취소된 외주작업['+d.wNm +']을 복원 하시겠습니까?', function(data){
					if(data) {
						let mapData = {ctl : 'outsourcing',cmd : 'deleteSave', cuSeq : d.wCuSeq, oSeq : d.oSeq, osSeq : d.osSeq, wSeq : d.wSeq,  oswSeq : d.oswSeq};
						let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api.ajaxformdata(function(rdata){ 
							if(rdata.code==0) {
								alert('외주작업이 복원 되었습니다.');
								self.retrieve();
							}else{
								alert(rdata.message)
							}
						});
					}
				},'복원하기');
			}else{
				alert('관리자권한이 필요합니다.');
			}
		});
		
		self.retrieve();
	}

	purge = () => {
		const self = this;

		console.log("customerController purge");
	}

	reload = () => {
		const self = this;

		console.log("customerController reload");
	}

	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}

	retrieve = () => {
		const self = this;

		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchWrap = self._code.find(".searchWrap");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let includeDelete = searchWrap.find("input[name=includeDelete]:checked").val() ??'N';
		let endDt = searchWrap.find("input[name=endDt]").val();
		let searchColumn = searchWrap.find("select[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let oFileNm = searchWrap.find("input[name=oFileNm]").val();
		let $oswStatus = searchWrap.find("input[name=oswStatus]:checked");
		if($oswStatus.length == 0){
			alert('작업상태를 선택해주세요');
			return;
		}
		let oswStatus = [];
		for(let i=0;i<$oswStatus.length;i++) oswStatus.push($($oswStatus[i]).val());
		let searchData = {
			cuTypeCd : 'B',
			cuImportantYn : 'N',
			page : page,
			rows : pageSize,
			startDt : startDt?startDt.replace(/-/g,''):'' ,
			endDt : endDt?endDt.replace(/-/g,''):'',
			searchColumn : 'osc.cuNm',
			includeDelete : includeDelete,
			searchWord : searchWord,
			oswStatus : JSON.stringify(oswStatus),
			oFileNm :oFileNm
		}

		self.list(searchData, function(resp){
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			
			let tbody = self._code.find(".dataListTable tbody");
			let thead = self._code.find(".dataHeadTable thead");
			tbody.empty();
			
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
					}
					self.display(tbody, resp[i]);
				}
				self._utils.tbodyMerge(tbody,[0,1,2,3,4,5,6,8,9],"oSeq");
			} else {
				$('<tr><td colspan="'+ thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}

			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});
	}

	display = ($tbody, d) => {
		const self = this;
		let process = "";
		let style = 'border:1px solid #dedede;';
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			if(info.outsourcingInfo.length>0){
				let workNm = [];
				let customerNm = [];
				for(let o=0;o<info.outsourcingInfo.length;o++){
					workNm.push(info.outsourcingInfo[o].wNm);
					customerNm.push(info.outsourcingInfo[o].cuNm);
				}
				process += '<span class="processStatusOut'+ info.pStatus +'" title="＊상태: '+ info.pStatusNm +' '+((info.pStatus != 'A')?' ＊일시: '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
			}else{
				process += '<span class="processStatus'+ info.pStatus +'" title="＊상태: '+ info.pStatusNm +''+((info.pStatus != 'A')?' ＊일시: '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
			}
		}
		let options = '';
		let opt = (d.optionInfo.length > 0) ? d.optionInfo : d.optionInfoOrg;
		for(let o=0;o<opt.length;o++) {
			let od = opt[o];
			if(od.cwoOrderYn == 'Y'){
				let inputText = od.oswoInput ?? od.woInput;
				if(inputText != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm"><strong class="workOptionInfo">'+ od.cwoNm + ' : <span style="font-weight: bold;">'+ inputText +'</span></strong></span>');}
			}
		}
		/*
		let oswStatusNm = '<strong class="oswStatus" style="" title="＊상태 : 대기">○</strong>';
		if(d.oswStatus == 'D'){
			oswStatusNm = '<strong class="oswStatus" style="color:#b2b8ba;" title="＊상태 : 완료 ＊일시 : '+ d.oswStatusDate.substring(0,16) +'">●</strong>';
		}else if(d.oswStatus == 'B'){
			oswStatusNm = '<strong class="oswStatus" style="color:#924ff6;" title="＊상태 : 진행 ＊일시 : '+ d.oswStatusDate.substring(0,16) +'">●</strong>';
		}else if(d.oswStatus == 'C'){
			oswStatusNm = '<strong class="oswStatus" style="color:#red;" title="＊상태 : 중지 ＊일시 : '+ d.oswStatusDate.substring(0,16) +'">●</strong>';
		}
		*/
		let oswStatusNm = '<span class="processBtnOutA oswStatus" title="＊상태 : 대기">대기</span>';
		if(d.oswStatus != 'A'){
			oswStatusNm = '<span class="processBtnOut'+ d.oswStatus+' oswStatus" title="＊상태 : '+ d.oswStatusNm +' ＊일시 : '+ d.oswStatusDate.substring(0,16) +'">'+ d.oswStatusNm +'</span>';

		}
		
		let delWorkStyle = ''; 
		let delWorkTitle = '';
		let delClass = '';
		if(d.delYn == 'Y'){
			delWorkStyle = 'text-decoration: line-through;  text-decoration-color: #f57a7a;text-decoration-style: solid;text-decoration-thickness: 2px;';
			delWorkTitle = ' * 취소자 : '+ d.delENm +' * 일시 : '+ d.delDate.substring(0,16);
			delClass = 'cursorPointer deleteSave'
		}

		let file = '';
		if(d.fileInfo.length>0) file = '<i class="fa-solid fa-download cursorPointer oFileNmDown" style="margin-right:5px;" title="파일 받기"></i>';

		let $tr = $('<tr/>');

		$tr.append($('<td style="'+ style +'" class="ac" />').append(((self._utils.checkEmptyNull(d.oApprovalDate)) ?'미승인': self._utils.dateformatMin(d.oApprovalDate).substring(5,10))));
		$tr.append($('<td style="'+ style +'white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al cuNm cursorPointer" title="'+ d.cuNm +'"/>').append('<input type="hidden" name="oSeq" value="'+ d.oSeq +'">'+ self._utils.nullTostring(d.cuNm, '')));
		$tr.append($('<td style="'+ style +'border-right:0px !important;padding-right:0px;" class="ac"></td>').append(file));
		$tr.append($('<td style="'+ style +'border-left:0px;" class="al"/>').append('<span class="oFileNm cursorPointer" title="수주서 보기">'+ self._utils.nullTostring(d.oFileNm, '')+ ((d.onContent != undefined && d.onContent != '')?' <img src="/images/bul/bul_notice.gif"  class="orderNoticeIcon">':'') +'</span>'));
		$tr.append($('<td style="'+ style +'" />').append(d.oPaperSize));
		$tr.append($('<td style="'+ style +'" class="ar"/>').append(self._utils.numberWithCommas(d.oCnt, '')));
		$tr.append($('<td style="'+ style +'" class="al"/>').append(process));
		if(d.oswStatus == 'D'){
			style += 'background:#ddf2f9 !important;';
		}
		$tr.append($('<td style="'+ style + delWorkStyle+'" title="'+ delWorkTitle +'" class="ac '+delClass+'"/>').append(oswStatusNm));
		$tr.append($('<td style="'+ style + delWorkStyle+'" title="'+ delWorkTitle +'" class="ac '+delClass+'"/>').append('<input type="hidden" name="wCuSeq" value="'+ d.wCuSeq +'"><i class="fa-solid fa-square-arrow-up-right orderFormShow cursorPointer" title="미발행" style="font-size: 17px;color:#566981;"></i>'));
		$tr.append($('<td style="'+ style +'white-space: nowrap;text-overflow: ellipsis; overflow: hidden;" class="al wCuNm cursorPointer" title="'+ d.wCuNm +'"/>').append(d.wCuNm));
		$tr.append($('<td style="'+ style + delWorkStyle+'" title="'+ delWorkTitle +'" class="al '+delClass+'"/>').append(d.wNm+(self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+')')));
		$tr.append($('<td style="'+ style + delWorkStyle+'" title="'+ delWorkTitle +'" class="ar '+delClass+'"/>').append(self._utils.numberWithCommas(d.oswCnt,'')));
		$tr.append($('<td style="'+ style +'padding-left:0px;" class="ar" />').append($('<span><strong style="font-size:9px;color: #f9ed40;padding-top: 7px;font-weight: bold">▶</strong><input type="text" name="oswEndCnt" vType="number" class="w80p" style="text-align:right;border-width: 0px;background-color:transparent;" value="'+((d.oswEndCnt != null)?self._utils.numberWithCommas(d.oswEndCnt, '0'):'0')+'"></span>')));
		$tr.append($('<td style="'+ style +'" class="al"/>').append(options));


		$tr.data("ROW",d);
		self._utils.focusEvent($('input[name=oswEndCnt]',$tr),'comma');
		if(d.osSendYn == 'Y'){
			let sendDate = d.osSendDate.substring(0,16);
			$('.orderFormShow',$tr).css('color','#ccc').attr('title','＊발송방법 : '+ d.osSendType +' ＊일시 : '+ sendDate);
		}
		if(self._const.__MANAGER_YN == 'Y'){
			$('.oswStatus,.workOptionEdit',$tr).addClass('cursorPointer');
		} 
		$tbody.append($tr);
	}

	memberSendLayer = (popupID, data, $parentObj) => {
		const self = this;
		const $layerObject = $(`#${popupID}`);

		$(`.title`,$layerObject).text('발주 ['+ data.cuNm +']');
		self._utils.unSerializeObject($layerObject, data);
		let workInfo = data.workInfo;
		for(let i=0;i<workInfo.length;i++){
			workInfo[i].idx = (i+1)
			self.workAdd($layerObject, workInfo[i]);
		} 
		self.memberSendLayerAction($layerObject, data);		
		$('input[name=oCnt]',$layerObject).trigger('focusout');		
		
		if(data.fileInfo.length>0){
			$('.oFileNmDown',$layerObject).show();
		}
	}
	
	
	memberSendLayerAction = (layerObject, data) =>{
		const self = this;

		$('.oFileNmDown', layerObject).on('click',function(){
			if(data.fileInfo.length > 0){
				self._parent.fileDownload(self._order.fileInfo[0]);
			}

		});


		// 담당자 검색
		$( 'input[name=oInchargeNm]', layerObject).autocomplete({
		source: function( request, response ) {
			let mapData = {ctl : 'employee',cmd : 'nmSearch',searchWord : this.term, };

			let cuSeq = $( 'input[name=cuSeq]', layerObject).val();
			if(cuSeq!="") mapData.cuSeq = cuSeq;
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let d = rdata.data.map(function(v){
						let nm;
						if(cuSeq == "")	{nm = (v.cuNm!= undefined)? "["+v.cuNm+"] "+ v.eNm : v.eNm;
						}else{			nm = v.eNm;							}
						return {label: nm, value: v.eNm, eSeq:v.eSeq, eTel : v.eTel};
					});
					response(d);
				} else {
					response([]);
				}
			});
		},
		focus: function (event, ui) {return false;  },
		select: function (event, ui) {
			$( 'input[name=oInchargeTel]', layerObject).val(ui.item.eTel);
			$( 'input[name=istInNm]', layerObject).focus();
		},
		minLength: self._parent._autocompleteLength,
		delay: self._parent._autocompleteTime,
		autoFocus: true,
		close: function (event, ui){}
		});

		// 입고지 이름 검색
		$( 'input[name=istInNm]', layerObject).autocomplete({
		source: function( request, response ) {
			let mapData = {ctl : 'customer',cmd : 'storageNmSearch',searchWord : this.term, cSeq : data.cuCSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let d = rdata.data.map(function(v){
						return {label:v.isNm, value:v.isNm, isSeq: v.isSeq, v:v};
					});
					response(d);
				} else {
					response([]);
				}
			});
		},
		focus: function (event, ui) {return false;  },
		select: function (event, ui) {	
			if(ui.item.v.isAddrDetail != undefined){
				$('input[name=isInAddr]', layerObject).val(ui.item.v.isAddr);
				$('input[name=isInAddrDetail]', layerObject).val(ui.item.v.isAddrDetail);
			} 
			$( 'input[name=istInIsSeq]', layerObject).val(ui.item.isSeq);
			$('input[name=istInHopeDt]', layerObject).focus();
		},
		minLength: self._parent._autocompleteLength,
		delay: self._parent._autocompleteTime,
		autoFocus: true,
		close: function (event, ui){}
		});
		// 입고지 주소검색
		$('.istInAddr', layerObject).on('click', function(e){
		new daum.Postcode({
			oncomplete: function(data) {
					// data.zonecode 새 우편번호
					let roadAddr = data.roadAddress; // 도로명 주소 변수
					$('input[name=isInZipcode]',layerObject).val(data.zonecode);
					$('input[name=isInAddr]',layerObject).val(roadAddr);
					$('input[name=isInAddrDetail]',layerObject).focus();
			}
		}).open();
		});
		// 출고지 이름 검색
		$( 'input[name=istOutNm]', layerObject).autocomplete({
		source: function( request, response ) {
			let mapData = {ctl : 'customer',cmd : 'storageNmSearch',searchWord : this.term, cSeq : data.cuCSeq};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					let d = rdata.data.map(function(v){
						return {label:v.isNm, value:v.isNm, isSeq: v.isSeq, v : v};
					});
					response(d);
				} else {
					response([]);
				}
			});
		},
		focus: function (event, ui) {return false;  },
		select: function (event, ui) {
			if(ui.item.v.isAddrDetail != undefined){
				$('input[name=isOutAddr]', layerObject).val(ui.item.v.isAddr);
				$('input[name=isOutAddrDetail]', layerObject).val(ui.item.v.isAddrDetail);
			} 
			$('input[name=istOutIsSeq]', layerObject).val(ui.item.isSeq);
			$('input[name=istOutHopeDt]', layerObject).focus();
		},
		minLength: self._parent._autocompleteLength,
		delay: self._parent._autocompleteTime,
		autoFocus: true,
		close: function (event, ui){}
		});
		// 출고지 주소 검색
		$('.istOutAddr', layerObject).on('click', function(e){
		new daum.Postcode({
			oncomplete: function(data) {
					// data.zonecode 새 우편번호
					let roadAddr = data.roadAddress; // 도로명 주소 변수
					$('input[name=isOutZipcode]',layerObject).val(data.zonecode);
					$('input[name=isOutAddr]',layerObject).val(roadAddr);
					$('input[name=isOutAddrDetail]',layerObject).focus();
			}
		}).open();
		});
		// 입/출고 방법 선택시
		$( 'select[name=istInCd],[name=istOutCd]', layerObject).on("change", function(e){
			let v = this.value;
			let name = $(this).attr('name');
			//직접 입/출고시
			if(v == 'A'){
				$((name=='istInCd')? '.inStorage' : '.outStorage', layerObject).val("").hide();
			}else{
				$((name=='istInCd')? '.inStorage' : '.outStorage', layerObject).show();
			}
		});
		$('select[name=istInCd]', layerObject).attr('placeholder', data.cuNm +' 입고지');
		$('select[name=istOutCd]', layerObject).attr('placeholder', data.cuNm +' 출고지');
		$('select[name=istInCd],[name=istOutCd]', layerObject).trigger('change');
		$('input[name=oCnt]',layerObject).val(self._utils.numberWithCommas($('input[name=oCnt]',layerObject).val()));
			
		$(`.save`, layerObject).on('click', function(e){
			
			if( self._utils.checkRequired(layerObject)) {
				let sendData = self._utils.serializeObject(layerObject);
				sendData.istShareYn = $('input[name=istShareYn]:checked',layerObject).val() ?? 'N';
				sendData.workInfo = [];
				if(sendData.oStatus == "D"){
					alert('작업이 완료되어 수정을 할 수 없습니다.');
					return false;
				}
				let works = $(".workTable tbody tr", layerObject);
				for(let i=0;i<works.length;i++){
					let d = $(works[i]).data("ROW");
					delete d.wOutsourcingYn
					sendData.workInfo.push(d);
				}
				sendData.workInfo = JSON.stringify(sendData.workInfo);
				if(sendData.cuSeq == undefined || sendData.cuSeq == ''){
					alert('업체 이름을 목록에서 선택해서 등록해주세요.');
					return false;
				}
				if(sendData.istShareYn == 'Y' && data.fileInfo.length > 0){
					sendData.fileSeq = data.fileInfo[0].fileSeq;
				}		
				delete data.fileInfo;

				sendData = self._utils.filterJsonRemoveNull(sendData);
				self.insert(sendData, function(resp){
					if(resp.code==0) {

						$("body .btnClosePopLayer").trigger('click');
						self.retrieve();
						alert('거래처에 수주가 등록되었습니다.');

					} else {
						alert('등록에 실패하였습니다.');
					}
				});
			}
		});

	}
	workAdd = (obj,d) => {
		let self = this;
		let tbody = $('.workTable tbody', obj);

		let tr = $('<tr style="border-bottom: 1px dotted #c1c1c1;" />').data("ROW",d);
		tr.append($('<td class="ac handle ">'+ d.idx +'</td>'));
		tr.append($('<td class="ac "></td>').text(d.spNm));
		tr.append($('<td class="ac "></td>').text(d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+')')));
		let frontYnNm = '-';
		if(d.wFrontYn=="Y"){
			frontYnNm = "전면"
		}else if(d.wFrontYn=="N"){
			frontYnNm = "후면";	
		}else if(d.wFrontYn=="Z"){
			frontYnNm = "양면";	
		}
		tr.append($('<td class="ac ">'+ frontYnNm +'</td>'));

		let options = '';
		for(let o=0;o<d.optionInfo.length;o++) {
			let od = d.optionInfo[o];
			if(od.cwoOrderYn == 'Y'){
				//if(od.woInput != null) {options += (((options!='')?', ':'') + od.cwoNm + '('+ od.woInput +')');}
				if(!self._utils.checkEmptyNull(od.woInput)) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm" style="padding:0px;"><span class="workOptionInfo">'+ od.cwoNm + ' : <strong>'+ od.woInput +'</strong></span></span>');}
			}
		}
		tr.append($('<td class="al workOptionListDiv " style="padding: 0px;"></td>').append($(options)));					
		tr.append($('<td class="al "></td>').text(d.wMemo));
		
		tbody.append(tr);
	}
	outsourcingFormMainDivEvent = (popupID, d) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		$(`.title`, $layerObject).text("작업의뢰");
		let $outsourcingDiv = $('.outsourcingDiv', $layerObject);
		let $workTbody = $('.workTable tbody', $outsourcingDiv);
		let $workDetailArea = $('.workDetailArea', $outsourcingDiv);
		let $workDetail = $('.workDetail', $workDetailArea);
		let printWrap = $(".printArea", $layerObject);
		let $processFlow = printWrap.find(".processFlow");
		$processFlow.empty();
		let $workDetailOrg = $workDetail.clone();
		$workDetail.remove();
		$layerObject.data(d);
		let isSave = false;
		
		window.jsPDF = window.jspdf.jsPDF;
		$('.wCuNm',$layerObject).text('('+ d.wCuNm +')');

		if(d.osESeq == undefined){
			let mapData = {ctl : 'employee',cmd : 'load'};
			let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api2.ajaxformdata(function(rdata){ 
				if(rdata.code == 0){
					$('input[name=osESeq', $layerObject).val(rdata.data.eSeq);
					$('input[name=osENm', $layerObject).val(rdata.data.eNm);
					$('input[name=osETel', $layerObject).val(rdata.data.eTel).trigger('focusout');
				}else{
					alert(rdata.message);
				}
			});
		}

		self._utils.classNameInput($layerObject,d);
		self._utils.unSerializeObject($layerObject,d);
		self._utils.focusEvent($('input[name=osInchargeTel', $layerObject), 'tel');
		self._utils.focusEvent($('input[name=osETel', $layerObject), 'tel');


		$('input[name=osENm', $layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'employee',cmd : 'nmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return $.extend({label:v.eNm, value:v.eNm} , v);
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				$('input[name=osESeq]',$layerObject).val(ui.item.eSeq);
				$('input[name=osETel]',$layerObject).val(ui.item.eTel).trigger('focusout').trigger('focus');;
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });

		$( 'input[name=osInNm],input[name=osOutNm]', $layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'storageNmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){
							return {label:v.isNm, value:v.isNm, v:v};
						});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {
				let nm = $(this).attr('name');
				if(nm == 'osInNm'){
					$('input[name=osInIsSeq]', $layerObject).val(ui.item.isSeq);
					$('input[name=osInHopeDt]', $layerObject).trigger('focus');
				}else{
					$('input[name=osOutIsSeq]', $layerObject).val(ui.item.isSeq);
					$('input[name=osOutHopeDt]', $layerObject).trigger('focus');
				}
				
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		});
		// 거래처 재 검색시 거래처관리번호 초기화
		$( 'input[name=cuNm],input[name=osENm],input[name=osInIsNm],input[name=osOutIsNm]', $layerObject).on("change", function(e){
			let nm = $(this).attr('name');
			if(this.value==""){
				let $obj = undefined;
				if(nm == 'cuNm'){
					$obj = $( 'input[name=cuSeq]', $layerObject);
				}else if(nm == "osENm"){
					$obj = $( 'input[name=osESeq]', $layerObject);
				}else if(nm == "osInIsNm"){
					$obj = $( 'input[name=osInIsSeq]', $layerObject);
				}else if(nm == "osOutIsNm"){
					$obj = $( 'input[name=osOutIsSeq]', $layerObject);
				}

				if($obj != undefined) $obj.val("");
			}
		});

		$workTbody.on('click', 'tr',function(){
			let choiceColor = '#d3e1ff';
			let $tr = $(this);
			let data = $tr.data("ROW");
			let style = $tr.attr('style');
			if(self._utils.checkEmptyNull(style) || style.indexOf('background') == -1){
				$('tr',$workTbody).css('background','');
				$tr.css('background',choiceColor);
				workView(data);
			}else{
				workChange(data);
			}
			

		});

		$outsourcingDiv.on('click','.btnApply', function(){
			let $workTable = $(this).closest('table');
			let _data = $workTable.data("ROW");
			let $optionArea = $workTable.find(".optionArea");
			let optData = $optionArea.data("ROW");

			for(let i=0;i<optData.length;i++){
				if(optData[i].cwoOrderYn == 'Y'){
					let option = $('[name='+optData[i].cwoSeq+']', $optionArea);
					let nextOption = option.next();
					if(nextOption.length == 0){
						optData[i].oswoInput = $('[name='+optData[i].cwoSeq+']', $optionArea).val();
					}else{
						let v = nextOption.val()
						if(self._utils.checkEmptyNull(v)){
							optData[i].oswoInput = $('[name='+optData[i].cwoSeq+']', $optionArea).val();
						}else{
							optData[i].oswoInput = $('[name='+optData[i].cwoSeq+']', $optionArea).val() +'→'+ v;
						}
					}
					if(optData[i].cwoMustYn == 'Y' && self._utils.checkEmptyNull(optData[i].oswoInput)){
						alert('세부사항 ['+ optData[i].cwoNm+']을 입력하세요')
						return false;
					}
				}
			}
			_data.optionInfo = optData;
			_data.oswMemo = $("input[name=oswMemo", $workTable).val();

			workChange(_data);
		});

		$('.btnSave', $layerObject).on('click',function(){
			let data = $layerObject.data();
			let inputData = self._utils.serializeObject($layerObject);

			$.extend(data,inputData);
			if(!self._utils.checkEmptyNull(data.osETel)){data.osETel = self._utils.getOnlyNumber(data.osETel); }
			if(!self._utils.checkEmptyNull(data.osInchargeTel)){data.osInchargeTel = self._utils.getOnlyNumber(data.osInchargeTel); }

			let $trs = $('tr',$workTbody);
			let workInfo = [];
			for(let i=0;i<$trs.length;i++){
				let workData = $($trs[i]).data("ROW");
				workData.oswCnt = self._utils.getOnlyNumber(workData.oswCnt);
				if(workData.optionInfo.length == 0) {
					let opts = workData.optionInfoOrg;
					for(let o =0;o<opts.length;o++) opts[o].oswoInput = opts[o].woInput;
					workData.optionInfo = opts;
				}
				workInfo.push(workData);
			}
			data.workInfo = JSON.stringify(workInfo);
			
			data = self._utils.filterJsonRemoveNull(data);

			let mapData = {ctl : 'outsourcing',cmd : 'update'};
			$.extend(mapData, data);
			self._utils.nullTostring
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					//$("body .btnClosePopLayer").trigger('click');
					self.retrieve();
					alert('저장 되었습니다.');
					isSave = true;
					$mail.removeClass('disable');
					$fax.removeClass('disable');
					$print.removeClass('disable');
				} else if(rdata.statusCode == 9099) {
					
				}else{
					alert(rdata.message);
				}
			});



		});
		for(let i=0;i<d.workInfo.length;i++){
			workAdd(d.workInfo[i]);
			if(!isSave && d.workInfo[i].optionInfo.length > 0 ) isSave = true;
		}
		
		popUpHeightReSize();

		function workAdd(d){
			let options = '';
			let opt = (d.optionInfo.length > 0) ? d.optionInfo : d.optionInfoOrg;
			for(let o=0;o<opt.length;o++) {
				let od = opt[o];
				if(od.cwoOrderYn == 'Y'){
					let inputText = od.oswoInput ?? od.woInput;
					if(inputText != null) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm"><strong class="workOptionInfo">'+ od.cwoNm + ' : <span style="font-weight: bold;">'+ inputText +'</span></strong></span>');}
				}
			}

			let osWmemo = d.oswMemo ?? d.wMemo;

			let $tr = $('<tr class="cursorPointer" style="border-bottom: 1px dotted #c1c1c1;"/>');
			$tr.append($('<td class="al" style="padding-left:10px;"/>').append(d.wNm + (!self._utils.checkEmptyNull(d.wInfo)?' ('+ d.wInfo+')':'')));
			$tr.append($('<td class="ac" />').append(d.wFrontYnNm));
			$tr.append($('<td class="ar" />').append(self._utils.numberWithCommas(d.oswCnt)));
			$tr.append($('<td class="al" />').append(options));
			$tr.append($('<td class="al" style="font-size:10px;"/>').append(osWmemo));
			$tr.data("ROW",d);
			$workTbody.append($tr);
		}

			// 작업 상세보기
		function workView(d){
			$('.workDetail',$outsourcingDiv).remove();
			let $workDetail = $workDetailOrg.clone();
			let optionInfo = (d.optionInfo.length > 0) ? d.optionInfo:d.optionInfoOrg;
			let $optionArea = workOptionView(optionInfo, self);
			$('input[name=oswMemo]', $workDetail).val(d.oswMemo??d.wMemo);
			$('.workOptionListDiv', $workDetail).append($optionArea);
			$workDetail.data("ROW",d);
			$workDetailArea.append($workDetail);
			//self._utils.popUpLayerHeightReset($layerObject);
			popUpHeightReSize()
		}

			// 작업 세부사항 보기
		function workOptionView(d, self){
				let $optionArea = $('<div class="optionArea">');
				$optionArea.empty();
				for(let i=0;i<d.length;i++){
					if(d[i].cwoOrderYn == "Y"){
						let $optionTag = $('<span class="workOptionListOne vm" style="padding: 0px 2px !importan;"/>');
						let $option = $('<strong class="workOptionInfoInput" style="margin: 0px 2px;" />');				 // + ((d[i].cwoMustYn == "Y") ? '<span style="color:red">*</span>':'') + d[i].cwoNm  + ' : ';
						if(d[i].cwoMustYn == "Y") $option.append('<span style="color:red">*</span>');
						$option.append(d[i].cwoNm  + ' : ');

						if(d[i].cwoInputCd == "A"){
							let $select = $('<select name="'+ d[i].cwoSeq+'"><option value="">선택</option></select>');
							if(!self._utils.checkEmptyNull(d[i].cwoData)){
								let data = d[i].cwoData.split(",");
								for(let a = 0;a<data.length;a++){
									let $option = $('<option />');
									$option.val(data[a]).text(data[a]);
									$select.append($option);
								} 
							}
							$select.on('change',function(){
								let v = $(this).val();
								let $strong = $(this).closest('strong');
								let o = $(this).closest('span').data('ROW');
								let cwoDataSub = JSON.parse(o.cwoDataSub);
								let $sub = $(this).next();
								if(v == ''){
									if($sub.length > 0){ $sub.remove();}
								}else{
									if($sub.length > 0){ $sub.remove();}
									if(cwoDataSub == undefined || self._utils.checkEmptyNull(cwoDataSub[v])){
										//if($sub.length > 0){ $sub.remove();}
									}else{
										if(cwoDataSub[v].type == 'select'){			
											$sub = $('<select name="'+d[i].cwoSeq+'_sub" style="margin-left:5px"/>');
											$sub.empty();
											$sub.append('<option value="">선택</option>');
											let subs = cwoDataSub[v].values;
											for(let i=0;i<subs.length;i++){
												let $option = $('<option />');
												$option.val(subs[i]).text(subs[i]);
												$sub.append($option);
											}
											$strong.append($sub);
										}else if(cwoDataSub[v].type == 'text'){			
											$sub = $('<input type="text" name="'+d[i].cwoSeq+'_sub" style=" width:95px;margin-left:5px" placeholder="최대 40글자"/>');
											$strong.append($sub);
										}
									}
								}
							});
							$option.append($select);
						}else if(["T","C","W","M","L"].indexOf(d[i].cwoInputCd) > -1 ){
							let $input = $('<input type="text" name="'+ d[i].cwoSeq+'" style="width:95px;" placeholder="최대 40글자"  >');
							if(!self._utils.checkEmptyNull(d[i].woInput)) $input.val(d[i].woInput);
							if(["W","M","L"].indexOf(d[i].cwoInputCd) > -1 ){ 
								self._utils.focusEvent($input,'unit');
								$input.css({'width':'40px', 'text-align': 'right'});
								$input.attr('placeholder',d[i].cwoInputCdNm);
							}else if('C' == d[i].cwoInputCd){
								self._utils.focusEvent($input,'comma');
								$input.css({'width':'50px', 'text-align': 'right'});
								$input.attr('placeholder',d[i].cwoInputCdNm);
							}
							$option.append($input);
						}
						//option += '</strong>';
						$optionTag.append($option);
						$optionTag.data("ROW", d[i]);
						$optionArea.append($optionTag);
					}
					
				}
				for(let i=0;i<d.length;i++){
					if(d[i].cwoOrderYn == "Y"){
						let v = d[i].oswoInput??d[i].woInput;
						if(d[i].cwoInputCd == "A"){
							if(!self._utils.checkEmptyNull(v) && v.indexOf('→') > -1){
								let vs = v.split('→');
								$("select[name="+d[i].cwoSeq+"]",$optionArea).val(vs[0]).trigger('change');
								$("[name="+d[i].cwoSeq+"_sub]",$optionArea).val(vs[1])
							}else{
								$("select[name="+d[i].cwoSeq+"]",$optionArea).val(v).trigger('change');
							}
						}else if(["T","C","W","M"].indexOf(d[i].cwoInputCd) > -1 ){
							$("input[name="+d[i].cwoSeq+"]",$optionArea).val(v);
						}
					}
				}
				return $optionArea.data("ROW",d);
			}
			// 작업 변경시 
			function workChange(d){
				let $trs = $('tr',$workTbody);
				let $tr;
				for(let i=0;i<$trs.length;i++){
					let data = $($trs[i]).data("ROW");
					if(d.oswSeq == data.oswSeq){
						$tr = $($trs[i]);
						break;
					}
				}

				let $tds = $tr.find("td");
				let opts = (d.optionInfo.length > 0)? d.optionInfo:d.optionInfoOrg
				let options = '';
				for(let o=0;o<opts.length;o++) {
					let od = opts[o];
					if(od.cwoOrderYn == 'Y'){
						let inputText = od.oswoInput??od.woInput;
						if(!self._utils.checkEmptyNull(inputText)) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm" style="padding:0px;"><span class="workOptionInfo">'+ od.cwoNm + ' : <strong>'+ inputText +'</strong></span></span>');}
					}
				}
				$($tds[3]).empty().append(options);
				$($tds[4]).text(d.oswMemo);
				$tr.data("ROW",d);
				$tr.css('background','');

				$workDetailArea.empty();
				// self._utils.popUpLayerHeightReset($layerObject);
				popUpHeightReSize();

			}
			function popUpHeightReSize(){
				let $mw_defalut = $('.mw_defalut', $layerObject);
				let $mw_contentsDiv = $('.mw_contentsDiv', $layerObject);
				console.log($outsourcingDiv.height());

				let h = $outsourcingDiv.height();
				$mw_contentsDiv.height(h+65);
				$mw_defalut.height(h+123);
			}





		let $mail = $('.mail',$layerObject);
		let $fax = $('.fax',$layerObject);
		let $print = $('.print',$layerObject);
		if(isSave){
			$mail.removeClass('disable');
			$fax.removeClass('disable');
			$print.removeClass('disable');
		}

		$fax.on('click',function(){
			if(!isSave){
				alert('발주 내역을 저장 후 다시 진행해 주십시요');
				return false;
			}
			/*
			if(d.cPopbillYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px;font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여 popbill 연동신청을 진행하세요</div>', '연동 신청이 안되어 있습니다.');
				return false;
			}else if(d.cFaxApplyYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px;font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여  FAX 발신번호를 등록하십시오</div>', '팩스번호 발신번호 승인이 안되어 있습니다.');
				//alert('\n');
				return false;
			}
			*/
			let data = $layerObject.data();
			let dt = self._utils.currentDate().replace(/-/g,'');
			printLoad(data, function($area){
				self._utils.showLoading();
				let $page = $('page',$area);
				for(let i=0;i<$page.length;i++){
					//var doc = new jsPDF($page[i]);
					//var element = document.getElementById('pdf_canvas');
					$('.workDetailArea',$page[i]).css('height','725px');
					var element = $page[i];

					html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
						// 캔버스를 이미지로 변환
						let imgData = canvas.toDataURL('image/png')
						let imgWidth = 190 // 이미지 가로 길이(mm)
						let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
						let imgHeight = canvas.height * imgWidth / canvas.width
						let heightLeft = imgHeight
						let margin = 10 // 출력 페이지 여백설정
						let doc = new jsPDF('p', 'mm')
						let position = 10
						let info = d;
		
						info.files = [];
						window.scrollTo(0, 0)
		
						//첫 페이지 출력
						doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined,'FAST');
						heightLeft -= pageHeight
		
						//한 페이지 이상일 경우 루프 돌면서 출력
						while (heightLeft >= 20) {
							position = heightLeft - imgHeight
							position = position - 20
							doc.addPage()
							doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight,undefined,'FAST');
							heightLeft -= pageHeight
						}
						
						let file = {}
						info.eTitle = $('.cuNm',$(element)).text()+' 발주서 ';
						file.filename = d.cNm + '_'+ $('.cuNm',$(element)).text()+' 발주서_'+ dt +'.pdf';
						file.content = doc.output('datauristring');
						file.encoding = 'base64';
						file.size = file.content.length;

						info.files.push(file);

						let $popDiv = $('template#outsourcingFax');
						self._parent.openLayer($popDiv.html(),self.outsourcingFaxEvent,info);
						self._utils.hideLoading();
					});
				}
			});
		});

		$mail.on('click',function(){
			if(!isSave){
				alert('발주 내역을 저장 후 다시 진행해 주십시요');
				return false;
			}
			if(d.cMailYn != 'Y'){
				alert('<div class="al" style="width:100%;padding-left:10px; font-size:11px;">기본설정 > 회사정보 메뉴를 이용하여 메일 연동 정보를 등록하십시오</div>', '메일발송 설정이 필요합니다.');
				return false;
			}
			let data = $layerObject.data();
			let dt = self._utils.currentDate().replace(/-/g,'');
			printLoad(data, function($area){
				let $page = $('page',$area);
				for(let i=0;i<$page.length;i++){
					//var doc = new jsPDF($page[i]);
					//var element = document.getElementById('pdf_canvas');
					$('.workDetailArea',$page[i]).css('height','725px');
					let element = $page[i];
					self._utils.showLoading();
					html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
						// 캔버스를 이미지로 변환
						let imgData = canvas.toDataURL('image/png')
						let imgWidth = 190 // 이미지 가로 길이(mm)
						let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
						let imgHeight =  277; //canvas.height * imgWidth / canvas.width
						let heightLeft = imgHeight
						let margin = 10 // 출력 페이지 여백설정
						let doc = new jsPDF('p', 'mm')
						let position = 10
						let info = d;
		
						info.files = [];
						window.scrollTo(0, 0)
		
						//첫 페이지 출력
						doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined,'FAST');
						heightLeft -= pageHeight
		
						//한 페이지 이상일 경우 루프 돌면서 출력
						while (heightLeft >= 20) {
							position = heightLeft - imgHeight
							position = position - 20
							doc.addPage()
							doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight,undefined,'FAST');
							heightLeft -= pageHeight
						}
		
						// PDF를 새탭으로 열기
						//window.open(doc.output('bloburl'));
						//console.log(doc.output('datauristring'));
						
						let file = {}
						info.eTitle = $('.cuNm',$(element)).text()+' 발주서 ';
						file.filename = d.cNm + '_'+ $('.cuNm',$(element)).text()+' 발주서_'+ dt +'.pdf';
						file.content = doc.output('datauristring');
						file.encoding = 'base64';
						file.size = file.content.length;

						info.files.push(file);

						let $popDiv = $('template#outsourcingSendMail');
						self._parent.openLayer($popDiv.html(),self.outsourcingMailEvent,info);
						
						self._utils.hideLoading();
						
						// PDF를 바로 다운로드
						//doc.save('sample.pdf');

					});
				}
			});
		});
		$print.on('click', function(){

			if(!isSave){
				alert('발주 내역을 저장 후 다시 진행해 주십시요');
				return false;
			}
			let data = $layerObject.data();
			printLoad(data, function($area){
				let $printA4 = $('.printA4',$area);
				$('.workDetailArea',$printA4).css('height','745px');
				$($printA4).print({
					addGlobalStyles: true,
					stylesheet: null,
					rejectWindow: true,
					noPrintSelector: ".no-print",
					iframe: true,
					append: null,
					prepend: null,
					timeout: 5000,
				});
				
			});
			if(d.osSendYn != 'Y'){
				setTimeout(function(){
					confirm('외주 발송 처리 하시겠습니까',function(is){
						if(is){
							let mapData = {ctl : 'outsourcing',cmd : 'orderSendTypeUpdate',osSeq : data.osSeq,osSendType:'print'};
							let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
							_api2.ajaxformdata(function(rdata){ 
								if(rdata.code != 0){
									toast('발송 기록에 실패 하였습니다.');
								}
							});
						}
					},'발송처리');
				}, 2000);
			}		
		});
		
		function printLoad(d, func){
			let $outsourcingDoc = $("template#outsourcingDoc");
			let printWrap = $("#printWrap");
			printWrap.empty();
			printWrap.append($outsourcingDoc.html());


			let mapData = {ctl : 'outsourcing',cmd : 'orderDataLoad',oSeq : d.oSeq,cuSeq:d.cuSeq};
			let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api2.ajaxformdata(function(rdata){ 
		
				if(rdata.code==0) {
					let info = rdata.data;
					let $outSourcingHead = $('.outSourcingHead', printWrap);
					let $outSourcingInfo = $('.outSourcingInfo',printWrap);
					self._utils.classNameInput($outSourcingHead,info);
					self._utils.classNameInput($outSourcingInfo,info);


					if(info.osInCd == 'A') $('.osInNm',$outSourcingInfo).text('직접입고');
					if(info.osOutCd == 'A') $('.osOutNm',$outSourcingInfo).text('직접출고');
					$('.cuNm',$outSourcingHead).text('- '+info.cuNm);

					let $workDetailArea = $('.workDetailArea',printWrap);
					let $workTableOrg = $('.workTableTypeA',$workDetailArea).clone();
					let $workInfoOrg = $('.workInfo', $workTableOrg).clone();
					let $workDetailOrg = $('.workDetail',$workTableOrg).clone();
					$('tbody',$workTableOrg).empty();
					$('.workTableTypeA',$workDetailArea).remove();




					let topProcessFlow = [];
					let processFlow = [];
					let workPre = {};
					let $workTablePre;
					for(let i=0;i<info.workInfo.length;i++){
						// 상단 공정도 
						let work = info.workInfo[i];
						/*
						if(topProcessFlow.indexOf(work.spNm) == -1){
							topProcessFlow.push(work.spNm);
						}
						*/
						// 주문 정보에서 외주사 정보 가져오기
						for(let o=0;o<info.workInfo.length;o++){
							if(work.wSeq == info.workInfo[o].wSeq){
								work.wOutsourcingInfo = info.workInfo[o].wOutsourcingInfo;
								break;
							}
						}

						let $workTable;
						if(workPre.wSeq == undefined || workPre.spSeq != work.spSeq) {
							$workTable = $workTableOrg.clone(); 
							let $workInfo = $workInfoOrg.clone();
							self._utils.classNameInput($workInfo, work);
							$('.oswCnt', $workInfo).text('주문량 : '+ self._utils.numberWithCommas(work.oswCnt));
							$('tbody',$workTable).append($workInfo);
						}else{
							$workTable = $workTablePre; 
						} 

						let option = work.optionInfo;
						let opt = [];
						for(let o=0;o<option.length;o++){
							if(option[o].cwoOrderYn == 'Y' && !self._utils.checkEmptyNull(option[o].oswoInput)){
								opt.push(option[o]);
							}
						}

						let $workDetail = $workDetailOrg.clone();
						self._utils.classNameInput($workDetail, work);

						let o = 0;
						let $trs = [];
						let $tr = $('<tr style="height:45px;"/>');

						for(o=0;o<opt.length;o++){
							let $optionTag = '<span class="workOptionListOne vm"><strong class="workOptionInfo" style="font-size:14px;">'+ opt[o].cwoNm + ' : <span style="font-weight: bold;font-size:15px;">'+ opt[o].oswoInput +'</span></strong></span>';
							if(o <=2){
								$('.option:eq('+o+')',$workDetail).append($optionTag);
							}else{
								if(((o) % 3) == 0)	$tr = $('<tr style="height:45px;"/>');

								let $td = $('<td class="al" style="border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;background:#fff;"></td>');
								$td.append($optionTag);
								$tr.append($td);
								if((o % 3) == 2 || o == (opt.length -1)){
									if(o == (opt.length -1)  && (o % 3) < 2){
										for(let c=((o+1) % 3) ;c<3;c++ ){
											let $td = $('<td class="al" style="border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;background:#fff;"></td>');
											$tr.append($td);
										}
									}
									if($('td',$tr).length > 0) $trs.push($tr);
								}
							}
						}

						let rowspan = (opt.length == 0 )? 1: Math.ceil(opt.length/3);
						$('.rowspan',$workDetail).attr("rowspan", rowspan);
						$('tbody',$workTable).append($workDetail);
						for(let tr = 0; tr < $trs.length; tr++) $('tbody',$workTable).append($tr[tr]);

						$workDetailArea.append($workTable);

						$workTablePre = $workTable; 
						workPre = work;
						if(i == (d.workInfo.length-1)){
							$tr = $('tbody tr:last',$workTable);
							if($('td',$tr).length == 3){
								$('.rowspan',$workDetail).css('border-bottom','1px solid #c1c1c1');
							}
							$('td',$tr).css('border-bottom','1px solid #c1c1c1');
						}
					}

					let spSeqs = [];

					// 하단 공정 데이터 추출
					for(let i = 0; i<info.workInfo.length;i++){
						let work = info.workInfo[i];
						let outsourcingNm = d.cNm;
						if(spSeqs.indexOf(work.spSeq) == -1) spSeqs.push(work.spSeq);
						if(i == 0){
							processFlow.push({spNm : info.workInfo[i].spNm, cuNm : outsourcingNm});
						}else{
							if(processFlow[processFlow.length-1].spNm != info.workInfo[i].spNm){
								processFlow.push({spNm : info.workInfo[i].spNm, cuNm : outsourcingNm});
							}
						}
					}

					// 상단 공정도 표시
					let $topProcessFlow = $('.topProcessFlow',printWrap);;
					for(let i=0;i<d.processInfo.length;i++){
						let pInfo = d.processInfo[i];
						let $div = '';
						if(spSeqs.indexOf(pInfo.spSeq) == -1){
							$div = $('<div style="margin-right:5px;display: inline-block;height: 25px;line-height: 22px; background: #fff;padding: 0 15px;text-align: center;font-size: 13px;font-weight: normal;color: #000;	border: 1px solid #7b7b7b;border-radius: 3px;vertical-align: middle;" >'+pInfo.spNm+'</div>');
						}else{
							$div = $('<div style="margin-right:5px;display: inline-block;height: 25px;line-height: 22px; background: #7b7b7b;padding: 0 15px;text-align: center;font-size: 13px;font-weight: normal;color: #fff;	border: 1px solid #7b7b7b;border-radius: 3px;vertical-align: middle;" >'+pInfo.spNm+'</div>');
						}
						
						$topProcessFlow.append($div);
					}
					// 하단 공정도
					let $processFlow = $('.processFlow',printWrap)
					for(let i=0;i<processFlow.length;i++){
						let d = processFlow[i];
						let $table = $('<table class="printInfo" style="width:78px;"/>').append("<tbody/>");
						$table.append($("<tr/>").append($('<th class="top last" />').append(d.spNm)));
						$table.append($("<tr/>").append($('<td class="last ac" style="font-size:10px; padding: 0px 2px;" />').append(d.cuNm)));
						$processFlow.append($('<td style="background:#fff;padding:1px;"/>').append($table));
						$processFlow.append('<td style="font-size:10px;padding:0px;font-stretch:extra-condensed">▶</td>');
					}
					if(processFlow.length < 8)	$processFlow.append('<td style="background:#fff;"><table class="printInfo" style="width:78px;"><tbody><tr><th class="top last">출고</td></tr><tr><td class="ac last" style="font-size:12px;">'+d.cNm+'</td></tr></tbody></table></td>');

					let param =  self._utils.encryptData('oSeq='+ info.oSeq+'&osSeq='+info.osSeq+'&cuSeq='+info.cuSeq);
					//console.log(param);
					param = encodeURI(param);
					//let qrData = document.location.host +'/'+self._pageUrl+'?oSeq='+ info.oSeq;
					let qrData = document.location.host +'/'+self._pageUrl+'?p='+ param;
					const qrcode1 = $('.qrCode',printWrap)[0];
					const qrcode2 = $('.qrCode2',printWrap)[0];
					new QRCode.toCanvas(qrData, { width: 105,margin:0 }, function (error, canvas) {
						if (error) console.error(error);
						let qrData1 = canvas.toDataURL();
						qrcode1.appendChild(canvas);
						$(qrcode1).empty()
						$(qrcode1).append($('<img src=""/>').attr("src", qrData1));
					});

					new QRCode.toCanvas(qrData, { width: 60,margin:1 }, function (error, canvas) {
						if (error) console.error(error);
						let qrData2 = canvas.toDataURL();
						qrcode2.appendChild(canvas);
						$(qrcode2).empty()
						$(qrcode2).append($('<img src=""/>').attr("src", qrData2));
					});

					$('.reportTitle',printWrap).append($('<pre>'+info.cReportTitle+'<pre>'));
					if(d.companyFileInfo != undefined && d.companyFileInfo.length>0){
						self._parent.imageFileLoad(d.companyFileInfo[0],function(data){
							let $imageTag = $('<img src="" style="width:130px;"></img>');
							$imageTag.attr('src',data);
							$('.reportLogo',printWrap).append($imageTag);
							/*********************** 이미지를 늦게 가져오는 이유로 여기서 리턴 해준다. *************************/
							func(printWrap);
						});
						//$('.reportLogo',printWrap).append($('<img src="https://kprintfactory.s3.ap-northeast-2.amazonaws.com'+d.companyFileInfo[0].path.replace('kprintfactory', '')+'" style="width:130px;"></img>'));
					}else{
						$('.reportLogo',printWrap).append($('<strong style="font-size:20px;font-weight:bold;font-family: \'Nanum Square\', sans-serif;">'+ d.cNm +'</strong>'));
					}

					if(d.cTransReport == 'A'){
						$('.processFlowArea',printWrap).remove();
						//$('.workDetailArea',printWrap).css('height','765px');
					}
					
				} else {
					alert(rdata.message);
				}
			});
		}
	}
	formLayer = (popupID, d) => {
		const self = this;
		let $layerObject = $(`#${popupID}`);
		$(`.title`, $layerObject).text("발주");

		let printWrap = $(".printArea", $layerObject);
		let $processFlow = printWrap.find(".processFlow");
		$processFlow.empty();
		let cWorkReport = d.cWorkReport;
	
		$('.wCuNm',$layerObject).text('('+ d.wCuNm +')');

		let mapData = {ctl : 'order',cmd : 'load',oSeq : d.oSeq,};
		let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		_api2.ajaxformdata(function(rdata){ 
		
			if(rdata.code==0) {
				let info = rdata.data;
				$('.orderNum',printWrap).text(self._utils.formatdate(info.creDate,'') +''+ self._utils._zeroFill(info.oSeq,7));
				//$('.orderDate',printWrap).text(self._utils.formatdate(info.creDate));
				$('.orderDate',printWrap).text(info.creDate.substring(0,16));
				$('.cuNm',printWrap).text(info.cuNm);
				$('.oFileNm',printWrap).text(info.oFileNm);
				$('.istInNm',printWrap).text(info.istInNm);
				$('.istOutNm',printWrap).text(info.istOutNm);
				$('.oCnt',printWrap).text(self._utils.numberWithCommas(info.oCnt));
				$('.oPaperSize',printWrap).text(info.oPaperSize);
				$('.oMemo',printWrap).text(self._utils.strMaxCuttion(info.oMemo,25));


				let $workDetailArea = $('.workDetailArea',printWrap);
				let $workTableOrg = $('.workTableTypeA',$workDetailArea).clone();
				let $workInfoOrg = $('.workInfo', $workTableOrg).clone();
				let $workDetailOrg = $('.workDetail',$workTableOrg).clone();
				$('tbody',$workTableOrg).empty();
				$('.workTableTypeA',$workDetailArea).remove();




				let topProcessFlow = [];
				let processFlow = [];
				let workPre = {};
				let $workTablePre;
				for(let i=0;i<d.workInfo.length;i++){
					// 상단 공정도 
					let work = d.workInfo[i];
					if(topProcessFlow.indexOf(work.spNm) == -1){
						topProcessFlow.push(work.spNm);
					}
					// 주문 정보에서 외주사 정보 가져오기
					for(let o=0;o<info.workInfo.length;o++){
						if(work.wSeq == info.workInfo[o].wSeq){
							work.wOutsourcingInfo = info.workInfo[o].wOutsourcingInfo;
							break;
						}
					}
					let outsourcingCuNm = '자사';
					if(work.wOutsourcingYn == 'Y'){
						if(work.wOutsourcingInfo.length == 1){
							outsourcingCuNm = work.wOutsourcingInfo[0].cuNm;
						}else if(work.wOutsourcingInfo.length == 2){
							outsourcingCuNm = work.wOutsourcingInfo[0].cuNm + ', '+ work.wOutsourcingInfo[1].cuNm;
						}else if(work.wOutsourcingInfo.length > 2){
							outsourcingCuNm = work.wOutsourcingInfo[0].cuNm +' 외 '+ work.wOutsourcingInfo.length +'개 업체';
						}
					}
					
					let $workTable;
					if(workPre.wSeq == undefined || workPre.spSeq != work.spSeq || workPre.wOutsourcingYn != work.wOutsourcingYn) {
						$workTable = $workTableOrg.clone(); 
						let $workInfo = $workInfoOrg.clone();
						self._utils.classNameInput($workInfo, work);
						$('.wOutsourcingNm', $workInfo).text(outsourcingCuNm);
						$('tbody',$workTable).append($workInfo);
					}else{
						$workTable = $workTablePre; 
					} 

					let option = work.optionInfo;
					let opt = [];
					for(let o=0;o<option.length;o++){
						if(option[o].cwoOrderYn == 'Y' && !self._utils.checkEmptyNull(option[o].woInput)){
							opt.push(option[o]);
						}
					}

					let $workDetail = $workDetailOrg.clone();
					self._utils.classNameInput($workDetail, work);

					let o = 0;
					let $trs = [];
					let $tr = $('<tr style="height:26px;"/>');

					for(o=0;o<opt.length;o++){
						let $optionTag = '<span class="workOptionListOne vm"><strong class="workOptionInfo" style="font-size:12px;">'+ opt[o].cwoNm + ' : <span style="font-weight: bold;font-size:14px;">'+ opt[o].woInput +'</span></strong></span>';
						if(o <=2){
							$('.option:eq('+o+')',$workDetail).append($optionTag);
						}else{
							if(((o) % 3) == 0)	$tr = $('<tr style="height:26px;"/>');

							let $td = $('<td class="al" style="border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;background:#fff;"></td>');
							$td.append($optionTag);
							$tr.append($td);
							if((o % 3) == 2 || o == (opt.length -1)){
								if(o == (opt.length -1)  && (o % 3) < 2){
									for(let c=((o+1) % 3) ;c<3;c++ ){
										let $td = $('<td class="al" style="border-left:1px solid #c1c1c1;border-top:1px solid #c1c1c1;background:#fff;"></td>');
										$tr.append($td);
									}
								}
								if($('td',$tr).length > 0) $trs.push($tr);
							}
						}
					}

					let rowspan = (opt.length == 0 )? 1: Math.ceil(opt.length/3);
					$('.rowspan',$workDetail).attr("rowspan", rowspan);
					$('tbody',$workTable).append($workDetail);
					for(let tr = 0; tr < $trs.length; tr++) $('tbody',$workTable).append($tr[tr]);

					$workDetailArea.append($workTable);

					$workTablePre = $workTable; 
					workPre = work;
					if(i == (d.workInfo.length-1)){
						$tr = $('tbody tr:last',$workTable);
						if($('td',$tr).length == 3){
							$('.rowspan',$workDetail).css('border-bottom','1px solid #c1c1c1');
						}
						$('td',$tr).css('border-bottom','1px solid #c1c1c1');
					}


				}


				// 하단 공정 데이터 추출
				for(let i = 0; i<info.workInfo.length;i++){
					let work = info.workInfo[i];
					let outsourcingNm = d.cNm;

					if(work.wOutsourcingYn == 'Y'){
						if(work.wOutsourcingYn == 'Y'){
							if(work.wOutsourcingInfo.length == 1){
								outsourcingNm = work.wOutsourcingInfo[0].cuNm;
							}else if(work.wOutsourcingInfo.length == 2){
								outsourcingNm = work.wOutsourcingInfo[0].cuNm + ', '+ work.wOutsourcingInfo[1].cuNm;
							}else if(work.wOutsourcingInfo.length > 2){
								outsourcingNm = work.wOutsourcingInfo[0].cuNm +' 외 '+ work.wOutsourcingInfo.length +'개 업체';
							}
						}
					}
					if(i == 0){
						processFlow.push({spNm : info.workInfo[i].spNm, cuNm : outsourcingNm});
					}else{
						if(processFlow[processFlow.length-1].spNm != info.workInfo[i].spNm){
							processFlow.push({spNm : info.workInfo[i].spNm, cuNm : outsourcingNm});
						}
					}
				}

				// 상단 공정도 표시
				let $topProcessFlow = $('.topProcessFlow',printWrap);;
				for(let i=0;i<topProcessFlow.length;i++){
					let $div = $('<div style="margin-right:5px;display: inline-block;height: 25px;line-height: 22px; background: #7b7b7b;padding: 0 15px;text-align: center;font-size: 13px;font-weight: normal;color: #fff;	border: 1px solid #7b7b7b;border-radius: 3px;vertical-align: middle;" >'+topProcessFlow[i]+'</div>');
					$topProcessFlow.append($div);
				}
				// 하단 공정도
				let $processFlow = $('.processFlow',printWrap)
				for(let i=0;i<processFlow.length;i++){
					let d = processFlow[i];
					let $table = $('<table class="printInfo" style="width:78px;"/>').append("<tbody/>");
					$table.append($("<tr/>").append($('<th class="top last" />').append(d.spNm)));
					$table.append($("<tr/>").append($('<td class="last ac" style="font-size:10px; padding: 0px 2px;" />').append(d.cuNm)));
					$processFlow.append($('<td style="background:#fff;padding:1px;"/>').append($table));
					$processFlow.append('<td style="font-size:10px;padding:0px;font-stretch:extra-condensed">▶</td>');
				}
				if(processFlow.length < 8)	$processFlow.append('<td style="background:#fff;"><table class="printInfo" style="width:78px;"><tbody><tr><th class="top last">출고</td></tr><tr><td class="ac last" style="font-size:12px;">'+d.cNm+'</td></tr></tbody></table></td>');

				//let qrData = document.location.host +'/workrepost?oSeq='+ info.oSeq;
				let param =  self._utils.encryptData('oSeq='+ info.oSeq+'&osSeq='+info.osSeq+'&cuSeq='+info.cuSeq);
					//console.log(param);
				param = encodeURI(param);
					//let qrData = document.location.host +'/'+self._pageUrl+'?oSeq='+ info.oSeq;
				let qrData = document.location.host +'/'+self._pageUrl+'?p='+ param;
				const qrcode1 = $('.qrCode',printWrap)[0];
				const qrcode2 = $('.qrCode2',printWrap)[0];
				new QRCode.toCanvas(qrData, { width: 105,margin:0 }, function (error, canvas) {
					if (error) console.error(error);
					let qrData1 = canvas.toDataURL();
					qrcode1.appendChild(canvas);
					$(qrcode1).empty()
					$(qrcode1).append($('<img src=""/>').attr("src", qrData1));
				});

				new QRCode.toCanvas(qrData, { width: 60,margin:1 }, function (error, canvas) {
					if (error) console.error(error);
					let qrData2 = canvas.toDataURL();
					qrcode2.appendChild(canvas);
					$(qrcode2).empty()
					$(qrcode2).append($('<img src=""/>').attr("src", qrData2));
				});

				$('.reportTitle',printWrap).append($('<pre>'+info.cReportTitle+'<pre>'));
				if(d.companyFileInfo != undefined && d.companyFileInfo.length>0){
					self._parent.imageFileLoad(d.companyFileInfo[0],function(data){
						let $imageTag = $('<img src="" style="width:130px;"></img>');
						$imageTag.attr('src',data);
						$('.reportLogo',printWrap).append($imageTag);
					});
					//$('.reportLogo',printWrap).append($('<img src="https://kprintfactory.s3.ap-northeast-2.amazonaws.com'+d.companyFileInfo[0].path.replace('kprintfactory', '')+'" style="width:130px;"></img>'));
				}else{
					$('.reportLogo',printWrap).append($('<strong style="font-size:20px;font-weight:bold;font-family: \'Nanum Square\', sans-serif;">'+ d.cNm +'</strong>'));
				}

				if(d.cTransReport == 'A'){
					$('.processFlowArea',printWrap).remove();
					$('.workDetailArea',printWrap).css('height','790px');
				}
			

			} else {
				alert(rdata.message);
			}
		
		});


		let $printArea = $('.printArea',$layerObject);
		let $mail = $('.mail',$layerObject);
		let $fax = $('.fax',$layerObject);
		window.jsPDF = window.jspdf.jsPDF;
	
		
		$fax.on('click',function(){
			let dt = self._utils.currentDate().replace(/-/g,'');
/*
			if(d.cPopbillYn != 'Y'){
				alert('연동 신청이 안되어 있습니다. \n기본설정 > 회사정보 메뉴를 이용하여 popbill 연동신청을 진행해 주세요');
				return false;
			}else if(d.cFaxApplyYn != 'Y'){
				alert('팩스번호 발신번호 승인이 안되어 있습니다.\n기본설정 > 회사정보 메뉴를 이용하여 연동설정 중 popbill FAX 발신번호를 등록하십시오');
				return false;
			}
*/				
			self._utils.showLoading();
			let $page = $('page',$layerObject);
			for(let i=0;i<$page.length;i++){
				//var doc = new jsPDF($page[i]);
				//var element = document.getElementById('pdf_canvas');
				var element = $page[i];

				html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
					// 캔버스를 이미지로 변환
					let imgData = canvas.toDataURL('image/png')
					let imgWidth = 190 // 이미지 가로 길이(mm)
					let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
					let imgHeight = canvas.height * imgWidth / canvas.width
					let heightLeft = imgHeight
					let margin = 10 // 출력 페이지 여백설정
					let doc = new jsPDF('p', 'mm')
					let position = 10
					let info = d;
	
					info.files = [];
					window.scrollTo(0, 0)
	
					//첫 페이지 출력
					doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined,'FAST');
					heightLeft -= pageHeight
	
					//한 페이지 이상일 경우 루프 돌면서 출력
					while (heightLeft >= 20) {
						position = heightLeft - imgHeight
						position = position - 20
						doc.addPage()
						doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight,undefined,'FAST');
						heightLeft -= pageHeight
					}
					
					let file = {}
					info.eTitle = $('.workTitle',$layerObject).text();
					file.filename = $('.workTitle',$layerObject).text()+".pdf";
					file.content = doc.output('datauristring');
					file.encoding = 'base64';
					file.size = file.content.length;

					info.files.push(file);

					let $popDiv = $('template#outsourcingFax');
					self._parent.openLayer($popDiv.html(),self.outsourcingFaxEvent,info);
					self._utils.hideLoading();
				  });
			}
		});

		$mail.on('click',function(){
			if(d.cMailYn != 'Y'){
				alert('메일발송 설정이 필요합니다..\n기본설정 > 회사정보 메뉴를 이용하여 메일 연동 정보를 등록하십시오');
				return false;
			}
			//self._utils.showLoading();
			let $page = $('page',$layerObject);

			for(let i=0;i<$page.length;i++){
				//var doc = new jsPDF($page[i]);
				//var element = document.getElementById('pdf_canvas');
				let element = $page[i];

				html2canvas(element, {  scrollY:0, scrollX:0, scale:4, dpi: 300, letterRendering: true, allowTaint: true}).then(canvas => {
					// 캔버스를 이미지로 변환
					let imgData = canvas.toDataURL('image/png')
					let imgWidth = 190 // 이미지 가로 길이(mm)
					let pageHeight = imgWidth * 1.414  // 출력 페이지 세로 길이
					let imgHeight = canvas.height * imgWidth / canvas.width
					let heightLeft = imgHeight
					let margin = 10 // 출력 페이지 여백설정
					let doc = new jsPDF('p', 'mm')
					let position = 10
					let info = d;
	
					info.files = [];
					window.scrollTo(0, 0)
	
					//첫 페이지 출력
					doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined,'FAST');
					heightLeft -= pageHeight
	
					//한 페이지 이상일 경우 루프 돌면서 출력
					while (heightLeft >= 20) {
						position = heightLeft - imgHeight
						position = position - 20
						doc.addPage()
						doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight,undefined,'FAST');
						heightLeft -= pageHeight
					}
	
					// PDF를 새탭으로 열기
					//window.open(doc.output('bloburl'));
					//console.log(doc.output('datauristring'));
					let file = {}
					info.eTitle = $('.workTitle',$layerObject).text();
					file.filename = $('.workTitle',$layerObject).text()+".pdf";
					file.content = doc.output('datauristring');
					file.encoding = 'base64';
					file.size = file.content.length;

					info.files.push(file);

					let $popDiv = $('template#outsourcingSendMail');
					self._parent.openLayer($popDiv.html(),self.outsourcingMailEvent,info);
					self._utils.hideLoading();
					// PDF를 바로 다운로드
					//doc.save('sample.pdf');

				  });
			}
		});
		$('.print',$layerObject).on('click', function(){
			let printA4 = $(".printA4",$layerObject);
			if(printA4.find('.print_footer').length == 0) $("<div class='print_footer'><span class='left'></span><span class='right'><strong>(주)한국문화사랑</strong> K-PrintFactory / 010-9089-0794 / postgood@kakao.com</span></div>").appendTo(printA4);
			$($printArea).print({
				addGlobalStyles: true,
				stylesheet: null,
				rejectWindow: true,
				noPrintSelector: ".no-print",
				iframe: true,
				append: null,
				prepend: null,
				timeout: 1500,
			});
		});

	}

	outsourcingMailEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		let maxSize = 1024 * 1024 * 5;
		let $selectBox = $('select[name=files]', $layerObject);
		$('input[name=subject]',$layerObject).val('['+ self._const.__C_NM +'] ' + info.eTitle+'를 보내드립니다.');
		$('input[name=to]',$layerObject).val(info.cuInvoiceEmail);

		fileDisplay();
		
		$('input[name=eFile]',$layerObject).on('change',function(){
			let f  = {};
			f.filename = this.files[0].name;
			f.size = this.files[0].size;
			f.encoding = 'base64';
			fileToBase64(this.files[0]).then(
				data => f.content = data
			);
			if(f.size > maxSize){
				alert("최대 5M이상 첨부 할 수 없습니다.");
				return false;
			}
			info.files.push(f);
			fileDisplay();
			$(this).val('');
		});

		$('.fa-upload',$layerObject).on('click',function(){
			$('input[name=eFile]',$layerObject).trigger('click');
		});

		$('.fa-trash-can',$layerObject).on('click',function(){
			let idx = $('option:checked',$selectBox).index();
			info.files.splice(idx,1);
			fileDisplay();
		});

		function fileDisplay(){
			$selectBox.empty();
			for(let i=0;i<info.files.length;i++){
				let f = info.files[i];
				let $opt = $('<option value="'+ f.filename +'">'+ f.filename + '('+ self._utils.bytesToSize(f.size) +')</option>');
				$selectBox.append($opt);
			}
		}
		function fileToBase64(file) {
			//var reader = new FileReader();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
			  });
		}


		$('.mailSend',$layerObject).on('click',function(){
			if( self._utils.checkRequired($layerObject)) {
				let data = self._utils.serializeObject($layerObject);
				let totalSize = 0;
				for(let i=0;i<info.files.length;i++) totalSize += info.files[i].size;
				if(totalSize > maxSize){
					alert("최대 5M이상 첨부 할 수 없습니다.");
					return false;
				}

				data.files = JSON.stringify(info.files);
				self._parent.emailSend(data, function(rdata){
					if(rdata.code == 0){
						$("body .btnClosePopLayer").trigger('click');
						alert('발송 되었습니다.');
						let mapData = {ctl : 'outsourcing',cmd : 'orderSendTypeUpdate',osSeq : info.osSeq,osSendType:'mail'};
						let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api2.ajaxformdata(function(rdata){ 
							if(rdata.code != 0){
								toast('발송 기록에 실패 하였습니다.');
							}
						});
					}else{
						alert(rdata.message);
					}
				})
			}
		});

	} 



	outsourcingFaxEvent = (popupID, info) =>{
		let self = this;
		let $layerObject = $('#'+ popupID);
		$('input[name=cuNm]',$layerObject).val(info.cuNm);
		$('input[name=cuFax]',$layerObject).val(info.cuFax);

		
		$('.faxSend',$layerObject).on('click',function(){
			if( self._utils.checkRequired($layerObject)) {
				let data = self._utils.serializeObject($layerObject);
				data.files = JSON.stringify(info.files);
				self._parent.faxSend(data, function(rdata){
					if(rdata.code == 0){
						$("body .btnClosePopLayer").trigger('click');
						alert('발송 되었습니다.');
						let mapData = {ctl : 'outsourcing',cmd : 'orderSendTypeUpdate',osSeq : info.osSeq,osSendType:'fax'};
						let _api2 = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
						_api2.ajaxformdata(function(rdata){ 
							if(rdata.code != 0){
								toast('발송 기록에 실패 하였습니다.');
							}
						});
					}else{
						alert(rdata.message);
					}
				})
			}
		});

	} 

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'outsourcing',
			cmd : 'list'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						cbfunc(rdata.data);
					} else {
						cbfunc(null);
					}
			});
	}

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
			cmd : 'load'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}


	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'outsourcing',
			cmd : 'insert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
}
export default outsourcingController