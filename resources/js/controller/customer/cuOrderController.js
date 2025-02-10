
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let cuOrderController = class {
	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._employee = {};
	}

	init = (_code,_data) => {
		const self = this;
		self._id = _code;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};
		

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			//e.stopPropagation();
		});
		self._code.find(".btnCreate").on("click",function(e){
			let $popDiv = $('template#orderLayer');
			self._parent.openLayer($popDiv.html(), self.initNewLayer);
			
			e.stopPropagation();
		});
		
		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=oSeq]:checked");
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
			let info = chkBoxs.closest('tr').data("ROW");
			if(info.oApprovalYn == 'Y'){
				alert("승인되어 삭제가 불가능 합니다.");
				return false;
			}
			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let oSeq = chkBoxs.val();

					self.delete({oSeq : oSeq}, function(resp) {
						if(resp.code==0) {
							self.retrieve();
							alert('삭제되었습니다');
							self._parent.modifyTime({action:'work'});
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

		// 목록 테이블 이벤트 정의
		let searchWrap = self._code.find(".searchWrapArea");
		let thead = self._code.find(".dataHeadTable thead");
		let tfoot = self._code.find(".pageInfoTfoot");
		let tbody = self._code.find(".dataListTable");
		searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});

		thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			searchWrap.find("input[name=orderculumn]").val(column);
			searchWrap.find("input[name=orderby]").val(order);
			self._utils.tHeadOrderBy($(this),order);
			self.retrieve();
		});

		searchWrap.find("input[name=startDt]").val(self._utils.dateformatKorDate(self._utils.addMonth(new Date(), -1)));
		searchWrap.find("input[name=endDt]").val(self._utils.dateformatKorDate(new Date()));
		searchWrap.find('input[name=searchWord]').autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'nmSearch',searchWord : this.term,};
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
		  self._defaultData = self._utils.serializeObject(searchWrap);
		  thead.on("click",".fa-rotate-right",function(){
			  let $tr = $(this).closest("tr");
			  self._utils.unSerializeObject(searchWrap,self._defaultData );
			  $tr.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			  self.retrieve();
		  });
  
		tfoot.find("select[name=rowsPerPage]").on("change",function(){
			tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});

		tbody.on('click','.oFileNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.orderView(d);			
		});
		tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});

		tbody.on('click','.orderEdit', function() {
			let _data = $(this).closest('tr').data('ROW');
			
			// 작업 데이터를 먼저 읽어온다
			self._order = {};
			self.load({oSeq:_data.oSeq}, function(resp){
				if(resp.code == 0) {
					self._order = resp.data;
					let $popDiv = $('template#orderLayer');
					self._parent.openLayer($popDiv.html(), self.reloadLayer);
				} else {
					alert('작업 데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.oFileNmDown', function(){
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			if(d.fileInfo !=undefined && d.fileInfo.length>0){
				self._parent.fileDownload(d.fileInfo[0]);
			}

		});
		self.retrieve();
	}


/*
	tHeadOrderBy = ($obj, orderby) => {
		const self = this;

		let tr = $obj.closest("tr");
		tr.find("img").attr("src","/images/btn/btn_sort2.png");
		$obj.children("img").attr("src",(orderby.toUpperCase() == "DESC")?"/images/btn/btn_sort_dw.png":"/images/btn/btn_sort_up.png");

		self.retrieve();
	}
*/
	retrieve = () => {
		const self = this;
		if(self._parent.activeMenuId() != undefined && self._parent.activeMenuId() != self._id){
			if(self.intervalId != undefined){
				self._code.find(".btnAutoReload").removeClass("activeOn").addClass("activeOff");
				clearInterval(self.intervalId);
				delete self.intervalId;
			}
			return;
		}
		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		//let oStatus = searchWrap.find("select[name=oStatus]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let oMarkYn = searchWrap.find("input[name=oMarkYn]:checked").val();
		let $oStatus = searchWrap.find("input[name=oStatus]:checked");
		if($oStatus.length == 0){
			alert('작업상태를 선택해주세요');
			return;
		}
		let oStatus = [];
		for(let i=0;i<$oStatus.length;i++) oStatus.push($($oStatus[i]).val());

		let searchData = {
			cuSeq : undefined,
			startDt : startDt?startDt.replace(/-/g,''):'' ,
			endDt : endDt?endDt.replace(/-/g,''):'',
			oMarkYn : oMarkYn,
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			oStatus : JSON.stringify(oStatus),
			searchColumn : 'cuNm',
			searchWord : searchWord
		}

		self.list(searchData, function(resp){
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
			} else {
				
				$('<tr><td colspan="'+ (thead.find('th').length +1) +'">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}
			self._utils.tableScrollCheck();
			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});

		let autoReload = self._code.find(".btnAutoReload");
		let lastDateTime = self._code.find(".lastDateTime");
		lastDateTime.empty();
		if(autoReload.hasClass("activeOn")){
			lastDateTime.text(self._utils.dateformatCurrentHHmmss(":"));	
		}
	}

	display = (tbody, d) => {
		const self = this;
		let process = "";
		d.processInfo.sort((a, b) => {
			if (a.sort < b.sort) return -1;
			if (a.sort > b.sort) return 1;
			return 0;
		});
		for(let i=0;i<d.processInfo.length;i++){
			let info = d.processInfo[i];
			let workNm = [];
			let customerNm = [];
			process += '<span class="processStatus'+ info.pStatus +'" title="작업순서 : '+ info.sort +' / 상태 : '+ info.pStatusNm +''+((info.pStatus != 'A')?'/ 변경일시 : '+ info.pStatusDate :'')+'">'+info.spNm+'</span>';
		}
		let tdStyle = 'border:1px solid #ccc;';
		/*
		if(d.oStatus!='A') tdStyle+='background-color:'+self._utils.processStatus('color',d.oStatus)+';';
		let oStatusNm = '미승인';
		if(d.oApprovalYn != 'Y') {
				tdStyle += 'color:#c1c1c1;';
		}else{
			oStatusNm = d.oStatusNm;
		}
		*/
		let oStatusNm = '미승인';
		if(d.oApprovalYn != 'Y') {
			if(d.isCustomer == 'Y'){
				tdStyle += 'background: #e0e9ff;';
			}
			if(tdStyle == ''){
				tdStyle += 'color:#8b8989;';
			}else{
				//tdStyle += tdStyle.substring(0,tdStyle.length-1) + 'color:#8b8989;"';
				tdStyle += 'color:#8b8989;';
			} 
		}else{
			oStatusNm = d.oStatusNm;
		}
		if(d.oStatus == 'D'){
			tdStyle += 'background:#ddf2f9;';
		}
		let inStatus = '○'
		//if(d.istInStatus == 'B') inStatus = '<span style="color:#aaa;" title="입고일시 : '+ d.istInStatusDate+'">●</span>';
		if(d.istInStatus == 'B') inStatus = '<span style="color:#68C3C7;" title="진행일시 : '+ d.istInStatusDate+'">◐</span>';
		if(d.istInStatus == 'C') inStatus = '<span style="color:#68C3C7;" title="입고일시 : '+ d.istInStatusDate+'">●</span>';
		let outStatus = '○'
		//if(d.istOutStatus == 'B') outStatus = '<span style="color:#aaa;" title="출고일시 : '+ d.istOutStatusDate+'">●</span>';
		if(d.istOutStatus == 'B') outStatus = '<span style="color:#b583f5;" title="진행일시 : '+ d.istOutStatusDate+'">◐</span>';
		if(d.istOutStatus == 'C') outStatus = '<span style="color:#b583f5;" title="출고일시 : '+ d.istOutStatusDate+'">●</span>';
		let file = '';
		if(d.fileInfo.length>0) file = '<i class="fa-solid fa-download cursorPointer oFileNmDown" style="margin-right:5px;" title="파일 받기"></i>';
		let tr = $('<tr/>');
		tr.append($('<td style="'+tdStyle+'"></td>').append(((d.oApprovalYn == 'N')? $('<input type="checkbox" class="vm" name="oSeq" value="'+d.oSeq+'"/>'):'')));
		tr.append($('<td style="'+tdStyle+'">'+self._utils.dateformatMin(d.creDate).substring(5,16)+'</td>'));
		tr.append($('<td style="'+tdStyle+'" '+((d.oStatus != 'A')?'title="변경일시 : '+ d.oStatusDate +'"':'')+'>'+ oStatusNm +'</td>'));
		tr.append($('<td style="'+tdStyle+'padding-right:0px;border-right:0px;" class="ac"></td>').append(file));
		tr.append($('<td style="'+tdStyle+'border-left:0px;" class="al"></td>').append('<span class="oFileNm cursorPointer" title="수주서 보기">'+self._utils.nullTostring(d.oFileNm, '') +'</span>'+ ((d.oMarkYn == 'Y')? ' <span class="btnstyle1 oCode" style="cursor:pointer" title="즐겨찾는 수주코드 수정"><i class="fa-regular fa-bookmark" style="color: #d15353;"></i> '+ d.oCode +'</span>' :'')));
		tr.append($('<td style="'+tdStyle+'" class="al">'+ process +'</td>'));
		tr.append($('<td style="'+tdStyle+'" title="'+ d.oPaperWidth +' × '+ d.oPaperHeight +'"></td>').text(self._utils.nullTostring(d.oPaperSize, '')));
		tr.append($('<td style="'+tdStyle+'" class="ar">'+self._utils.numberWithCommas(d.oCnt, '')+'</td>'));
		tr.append($('<td style="'+tdStyle+'" class="ar">'+self._utils.numberWithCommas(d.oEndCnt, '-')+'</td>'));
		tr.append($('<td style="'+tdStyle+'" class="ac"></td>').append($('<span>'+ ((d.istInCd == 'A')? d.istInCdNm : self._utils.nullTostring(d.istInNm,''))+'</span>')));
		tr.append($('<td style="'+tdStyle+'">'+((d.istInHopeDt!=undefined) ?'<span style="font-weight:550;">'+self._utils.dateformatStringToDate(d.istInHopeDt).substring(5)+'</span>':'')+((!self._utils.checkEmptyNull(d.istInMemo))?' ('+d.istInMemo+')':'')+'</td>'));
		tr.append($('<td style="'+tdStyle+'" class="ac" '+((d.istInStatus != 'A')?'title="변경일시 : '+ d.istInStatusDate +'"':'')+'></td>').append(inStatus));
		//tr.append($('<td style="'+tdStyle+'" class="ac" '+((d.istInStatus != 'A')?'title="변경일시 : '+ d.istInStatusDate +'"':'')+'></td>').text(d.istInStatusNm));
		tr.append($('<td style="'+tdStyle+'" class="ac"></td>').append($('<span>'+ ((d.istOutCd == 'A')? d.istOutCdNm : self._utils.nullTostring(d.istOutNm,''))+'</span>')));
		tr.append($('<td style="'+tdStyle+'">'+((d.istOutHopeDt!=undefined) ?'<span style="font-weight:550;">'+self._utils.dateformatStringToDate(d.istOutHopeDt).substring(5)+'</span>':'')+((!self._utils.checkEmptyNull(d.istOutMemo))?' ('+d.istOutMemo+')':'')+'</td>'));
		tr.append($('<td style="'+tdStyle+'" class="ac" '+((d.istOutStatus != 'A')?'title="변경일시 : '+ d.istOutStatusDate +'"':'')+'></td>').append(outStatus));
		
		tr.append($('<td style="'+tdStyle+'">'+((d.oApprovalYn == 'N')?'<i class="fa-regular fa-pen-to-square cursorPointer orderEdit" title="수주서 수정 화면보기" style="font-size:14px;"></i>':'')+'</td>'));

		tr.data("ROW",d);
		tr.appendTo(tbody);
	}


	

	
	eventAction = (layerObject) =>{
		const self = this;
		$('.btnAddFile', layerObject).on('click', function(e){
			e.preventDefault();
			  $('input[name=orderFile]', layerObject).trigger('click');
		});
		  
		$('.btnDeleteFile', layerObject).on('click', function(e){
			e.preventDefault();
			confirm('첨부된 파일을 삭제하시겠습니까?', function(data){
				let oSeq = $('input[name=oSeq]',layerObject).val();
				let mapData = {ctl : 'order',cmd : 'oFileDelete',oSeq : oSeq,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						$('.btnDeleteFile', layerObject).hide();
						$('.fa-file-arrow-down', layerObject).hide();
//						$('.fileDown',layerObject).hide();
						$('.addFileName', layerObject).text('');
						$('.btnAddFile', layerObject).show();
					} else {

					}
				});

			});
		});
		$('.oFileNmDown', layerObject).on('click',function(){
			if(self._order.fileInfo.length > 0){
				self._parent.fileDownload(self._order.fileInfo[0]);
			}

		});

		$("input[name=orderFile]", layerObject).on("change", function(event) {
			let file = event.target.files[0];
			let maxSize =  1024 * 1024 * 20;
			if(file.size >  maxSize){
				alert('최대 '+ self._utils.bytesToSize(maxSize) +' 까지만 가능 합니다.\n파일용량 :'+ self._utils.bytesToSize(file.size) )
				delete event.target.files;
				return false;
			}
			$('.addFileName', layerObject).text(file.name);
		});

		  // 담당자 검색
		  $( 'input[name=oInchargeNm]', layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'employee',cmd : 'nmSearch',searchWord : this.term,};

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
		  // 용지 규격 검색
		$( 'input[name=oPaperSize]', layerObject).autocomplete({
			//classes: {"display": "block !important",'z-index':9999999 },
			source: function( request, response ) {
				let mapData = {ctl : 'common',cmd : 'paperSizeInfo',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let d = rdata.data.map(function(v){	return {label:v.key, value:v.key};});
						response(d);
					} else {
						response([]);
					}
				});
			},
			focus: function (event, ui) {return false;  },
			select: function (event, ui) {$( 'input[name=oCnt]', layerObject).focus();},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });

		 // 입고지 이름 검색
		 $( 'input[name=istInNm]', layerObject).autocomplete({
			source: function( request, response ) {
				let mapData = {ctl : 'customer',cmd : 'storageNmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
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
				$('input[name=isInZipcode]',layerObject).val(ui.item.v.isZipcode);
				if(!self._utils.checkEmptyNull(ui.item.v.isInchargeNm)) $('input[name=istInInchargeNm]', layerObject).val(ui.item.v.isInchargeNm);
				if(!self._utils.checkEmptyNull(ui.item.v.isInchargeTel)) $('input[name=istInInchargeTel]', layerObject).val(self._utils.formatPhoneNumber(ui.item.v.isInchargeTel));
				$('input[name=istInHopeDt]', layerObject).focus();
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });
		  // 입고지 주소검색
		  $('.istInAddr', layerObject).on('click', function(e){
			let cd = $('select[name=istInCd]', layerObject).val();
			if(cd == 'A') return;
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
				let mapData = {ctl : 'customer',cmd : 'storageNmSearch',searchWord : this.term,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
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
				$('input[name=isOutZipcode]',layerObject).val(ui.item.v.isZipcode);
				if(!self._utils.checkEmptyNull(ui.item.v.isInchargeNm)) $('input[name=istOutInchargeNm]', layerObject).val(ui.item.v.isInchargeNm);
				if(!self._utils.checkEmptyNull(ui.item.v.isInchargeTel)) $('input[name=istOutInchargeTel]', layerObject).val(self._utils.formatPhoneNumber(ui.item.v.isInchargeTel));
				$('input[name=istOutHopeDt]', layerObject).focus();
			},
			minLength: self._parent._autocompleteLength,
			delay: self._parent._autocompleteTime,
			autoFocus: true,
			close: function (event, ui){}
		  });
		  // 출고지 주소 검색
		  $('.istOutAddr', layerObject).on('click', function(e){
			let cd = $('select[name=istOutCd]', layerObject).val();
			if(cd == 'A') return;
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
				$((name=='istInCd')? '.inStorage' : '.outStorage', layerObject).val("").attr('readonly','readonly').addClass('disabled');
			}else{
				$((name=='istInCd')? '.inStorage' : '.outStorage', layerObject).removeAttr('readonly').removeClass('disabled');
			}
		});

		  
		  // 공정 목록 가져오기
		  let mapData = {ctl : 'process',cmd : 'companyProcessList',searchWord : this.term,};
		  let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		  _api.ajaxformdata(function(rdata){ 
			  if(rdata.code==0) {
				let obj = $( 'select[name=spSeq]', layerObject);
				obj.empty();
				obj.append($('<option value="">공정선택</option>'));
				for(let i=0;i<rdata.data.length;i++){
					let opt = $('<option value="'+ rdata.data[i].spSeq +'">'+ rdata.data[i].spNm +'</option>');
					obj.append(opt);
				}
				obj.trigger('change');
			  }
		  });

		  // 공정 선택시
		  $( 'select[name=spSeq]', layerObject).on('change',function(e ,cwSeq){

			let spSeq = $(this).val();
			// 인쇄 공정(1) 만 양면 사용
			let obj = $( 'select[name=cwSeq]', layerObject);
			obj.empty();
			if(spSeq == 2){
				$( 'input[name=wInfo]', layerObject).removeAttr('disabled').removeClass('disabled');
			}else{
				$( 'input[name=wInfo]', layerObject).attr('disabled','disabled').addClass('disabled');
			}
			if(spSeq != ''){
				//if(spSeq == 1){
					$( 'select[name=wFrontYn]', layerObject).empty().append(self.workFrontYnSelectOption('Y,N,Z')).trigger('focus');
				//}else{
					//$( 'select[name=wFrontYn]', layerObject).empty().append(self.workFrontYnSelectOption('Y,N')).trigger('focus');
				//}

				let mapData = {ctl : 'process',cmd : 'companyList', spSeq : spSeq, rows:999, useYn: 'Y'};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						obj.removeAttr('disabled').removeClass('disabled');
						obj.removeAttr('readonly');
						if(rdata.data.length == 0) obj.attr('disabled','disabled').addClass('disabled');
						for(let i=0;i<rdata.data.length;i++){
							let opt = $('<option value="'+ rdata.data[i].cwSeq +'">'+ rdata.data[i].cwNm +'</option>');
							obj.append(opt);
						}
						if(cwSeq != undefined){ 
							obj.val(cwSeq).attr('readonly','readonly');;
						}
						obj.trigger('change');
					}
				});
			}else{
				obj.attr('disabled','disabled').addClass('disabled');
				$( '.optionArea', layerObject).empty();
			}
		  });

			// 작업 전/후/양면 선택시 이동
		  $( 'select[name=wFrontYn]', layerObject).on('change',function(e){
			$( 'select[name=cwSeq]', layerObject).trigger('focus');	
		  });
		  $( 'select[name=cwSeq]', layerObject).on('focus',function(e){
			let v = $(this).val();
			$(this).data("ROW", v);
		  });

		  // 작업 선택시 주문 세부사항 정보 가져오기
		  $( 'select[name=cwSeq]', layerObject).on('change',function(e){
			let o = $(this).data("ROW");
			let v = $(this).val();
			let index = $('input[name=index]', layerObject).val();
			// 수정여부는 index 값의 존재여부로 판단
			if($(this).val() != '' && index == ''){
				let mapData = {ctl : 'process',cmd : 'companyLoad',cwSeq : this.value,};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						let obj = $( '.optionArea', layerObject);
						obj.empty();
						self.workOptionView(layerObject,rdata.data.optionInfo);
					}
				});
				if(o != undefined && o!=v){
					if($( 'select[name=spSeq]', layerObject).val() == '2'){
						$( 'input[name=wInfo]', layerObject).trigger('focus');
					}else{
						$( 'input[name=wMemo]', layerObject).trigger('focus');
					}
				} 
			}
		  });
		// 등록된 작업정보 전달
		$('.workTable tbody', layerObject).on('click','td:not(.unEvent)',function(){
			let choiceColor = '#d3e1ff !important;';
			let $tds = $('.workTable tbody tr td', layerObject);
			let $tr = $(this).closest('tr');
			let d = $tr.data("ROW");
			let style = $tr.attr('style');
			//if(self._utils.checkEmptyNull(style) || style.indexOf('background') == -1){
				$tds.css('background','');
				let $td = $tr.find('td');
				for(let i=0;i<$td.length;i++) $($td[i]).css('background',choiceColor)
			//}

			$('input[name=index]', layerObject).val($tr.index());
			//console.log('click : '+ $tr.index());
			let mapData = {ctl : 'process',cmd : 'companyLoad',cwSeq : d.cwSeq,};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					//if(rdata.data.spSeq == 1){
						$( 'select[name=wFrontYn]', layerObject).empty().append(self.workFrontYnSelectOption('Y,N,Z',d.wFrontYn));
					//}else{
						//$( 'select[name=wFrontYn]', layerObject).empty().append(self.workFrontYnSelectOption('Y,N',d.wFrontYn));
					//}
					//$( 'select[name=wFrontYn]', layerObject).empty().append(self.workFrontYnSelectOption(rdata.data.cwFrontYnCode, d.wFrontYn));
					//self.workOptionView(layerObject,rdata.data.optionInfo);
				}
			});
			self.workView(layerObject, d);
			$(this).closest("tbody").children().css("background-color", "")
			$(this).css("background-color", "#bec2f7")
		});
		

		// 작업 삭제
		$('.workTable tbody', layerObject).on('click','.workDelete',function(){
			let tr = this.closest("tr");
			confirm('삭제하시겠습니까?', function(data){
				if(data){
					tr.remove();
					self.workClean(layerObject);
					$('.workTable tbody',layerObject).children().css("background-color", "")
				}
			});
		});
		

		$('input[name=oCnt]',layerObject).on('focus',function(){
			let v = $(this).val();
			v = self._utils.getOnlyNumber(v);
			$(this).data("ROW",v).val(v);
		});
		$('input[name=oCnt]',layerObject).on('focusout',function(){
			let v = $(this).val();
			if(v !='')$(this).val(self._utils.numberWithCommas(v));
			
		});
		// 엔터 이동 포커스 정리
		let obj = {
			cuNm :'oFileNm',
			oFileNm :'oPaperSize',
			oPaperSize :'oCnt',
			oCnt :'oInchargeNm',
			oInchargeNm :'oInchargeTel',
			oInchargeTel :'oMemo',
			oMemo :'istInNm',
			istInNm :'istInHopeDt',
			istInHopeDt :'istInMemo',
			istInMemo :'istInAddr',
			isInAddr :'istInAddrDetail',
			istInAddrDetail :'oInchargeNm',
			isInInchargeNm :'isInInchargeTel',
			isInInchargeTel :'istOutNm',
			istOutNm :'istOutHopeDt',
			istOutHopeDt :'istOutMemo',
			istOutMemo :'isOutAddr',
			isOutAddr :'istOutAddrDetail',
			istOutAddrDetail :'oOutInchargeNm',
			isOutInchargeNm :'isOutInchargeTel',
			isOutInchargeNm :'spSeq',
		}
		$( 'input:not([name=wMemo])', layerObject).on('keypress',function(e) {
			if(e.keyCode == 13){
				let name = $(this).attr('name')
				$( '[name='+ obj[name]+']', layerObject).focus();
			}
		});


		$(`.cleanWork`, layerObject).on('click', function(e){
			self.workClean(layerObject);
			$('.workTable tbody',layerObject).children().css("background-color", "")
		});
		$(`.saveWork`, layerObject).on('click', function(e){
			let _data = {};
			let _wSeq = $('input[name=wSeq]', layerObject).val();
			let _spSeq = $('select[name=spSeq]', layerObject).val();
			let _spNm = $('select[name=spSeq]', layerObject).find(":selected").text();
			let _cwSeq = $('select[name=cwSeq]', layerObject).val();
			let _wNm = $('select[name=cwSeq]', layerObject).find(":selected").text();
			let _wInfo = $('input[name=wInfo]', layerObject).val();
			let _wFrontYn = $('select[name=wFrontYn]', layerObject).val();
			let _wFrontYnNm = $('select[name=wFrontYn]', layerObject).find(":selected").text();
			let _wMemo = $('input[name=wMemo]', layerObject).val();
			let optionArea = $('.optionArea', layerObject);
			let optData = optionArea.data("ROW");
			let index = $('input[name=index]', layerObject).val();

			if(self._utils.checkEmptyNull(_cwSeq)){
				alert("작업 명을 입력 선택 하십시오");
				$('input[name=cwNm]', layerObject).focus();
				return false;
			}
			_data.wSeq = _wSeq;
			_data.spSeq = _spSeq;
			_data.spNm = _spNm;
			_data.cwSeq = _cwSeq;
			_data.wNm = _wNm;
			_data.wInfo = _wInfo;
			_data.wFrontYn = _wFrontYn;
			_data.wFrontYnNm = _wFrontYnNm;
			_data.wMemo = _wMemo;

			for(let i=0;i<optData.length;i++){
				if(optData[i].cwoOrderYn == 'Y'){
					let option = $('[name='+optData[i].cwoSeq+']', optionArea);
					let nextOption = option.next();
					if(nextOption.length == 0){
						optData[i].woInput = $('[name='+optData[i].cwoSeq+']', optionArea).val();
					}else{
						let v = nextOption.val()
						if(self._utils.checkEmptyNull(v)){
							optData[i].woInput = $('[name='+optData[i].cwoSeq+']', optionArea).val();
						}else{
							if(v.indexOf('→') >-1){
								alert('"→"문자는 사용 할수 없습니다.');
								return;
							}
							optData[i].woInput = $('[name='+optData[i].cwoSeq+']', optionArea).val() +'→'+ v;
						}
					}
					if(optData[i].cwoMustYn == 'Y' && self._utils.checkEmptyNull(optData[i].woInput)){
						alert('세부사항 ['+ optData[i].cwoNm+']을 입력하세요')
						return false;
					}
				}
			}
			_data.optionInfo = optData;

			if(index != ""){
				_data.index = index;
				self.workChange(layerObject,_data);
			} else {
				self.workAdd(layerObject,_data);
			}
			$(".workTable tbody" ,layerObject).children().css("background-color", "")
			self.workClean(layerObject);

		});

		$(`.save`, layerObject).on('click', function(e){
			
			if( self._utils.checkRequired(layerObject)) {
				let data = self._utils.serializeObject(layerObject);
				data.oApprovalYn = layerObject.find("input[name=oApprovalYn]:checked").val();
				data.workInfo = [];
				if(data.oStatus == "D"){
					alert('작업이 완료되어 수정을 할 수 없습니다.');
					return false;
				}
				let works = $(".workTable tbody tr", layerObject);
				for(let i=0;i<works.length;i++){
					data.workInfo.push($(works[i]).data("ROW"));
				}
				data.workInfo = JSON.stringify(data.workInfo);
				if(data.oSeq != undefined && data.oSeq != ""){
					const mPromise = new Promise((resolve, reject) => {
						if($('input[name=orderFile]',layerObject)[0].files[0]) {
							self.mediaUpload($('input[name=orderFile]',layerObject)[0].files[0], function(resp){
									if(resp == -9999) {
											reject(new Error("upload  is failed"));
									}
									//resolve(resp.id);
									resolve(resp.fileSeq);
								});
						} else {
								resolve(undefined);
						}
					});

					mPromise.then((res) => {
						if(res != undefined){
							data.fileSeq = res ;	
						}
						data = self._utils.filterJsonRemoveNull(data);

						
						self.update(data, function(resp){
							if(resp.code==0) {

								$("body .btnClosePopLayer").trigger('click');
								self.retrieve();
								alert('수정 되었습니다.');
								self._parent.modifyTime({action:'work'});
							} else {
								alert(resp.message);
							}
						});
					});

				}else{
					const mPromise = new Promise((resolve, reject) => {
						if($('input[name=orderFile]',layerObject)[0].files[0]) {
								self.mediaUpload($('input[name=orderFile]',layerObject)[0].files[0], function(resp){
										if(resp == -9999) {
												reject(new Error("upload  is failed"));
										}
										//resolve(resp.id);
										resolve(resp.fileSeq);
								});
						} else {
								resolve(undefined);
						}
					});
					mPromise.then((res) => {
						if(res != undefined){
							data.fileSeq = res ;	
						}
						data = self._utils.filterJsonRemoveNull(data);
						self.insert(data, function(resp){
							if(resp.code==0) {

								$("body .btnClosePopLayer").trigger('click');
								self.retrieve();
								alert('등록되었습니다.');
								self._parent.modifyTime({action:'work'});
							} else {
								alert(resp.message);
							}
						});
					});
				}

			}
		});
		
		// 마우스 드레그로 순서 변경
		$(`.workTable tbody`, layerObject).sortable({
			handle: ".handle"
		});
		self._utils.focusEvent($('input[name=oInchargeTel]',layerObject),'tel');
		
	}
	initNewLayer = (popupID) => {
		const self = this;
		const layerObject = $(`#${popupID}`);
		$(`.title`, layerObject).text("주문등록");
		$(`.btnSearch.save`, layerObject).text("등록");
		$(`.btnSearch3.saveAs`, layerObject).remove();
		$('input[name=oInchargeNm]',layerObject).val(self._const.__USER_NAME);
		$('input[name=oInchargeTel]',layerObject).val(self._const.__USER_TEL);
		self.eventAction(layerObject);
		$('select[name=istInCd],[name=istOutCd]',layerObject).trigger('change');
		$('.fileDown',layerObject).hide();
		
	}
	reloadLayer = (popupID) =>{
		const self = this;
		const layerObject = $(`#${popupID}`);
		layerObject.data(self._order);
		if(self._order.orderNotice != null && self._order.orderNotice.length>0) self._order.orderNotice = self._order.orderNotice[0].onContent;
		// $(`.title`, layerObject).empty().append(self._order.cuNm +'&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;'+ self._order.oFileNm );
		$(`.title`, layerObject).empty().append('주문수정');
		$(`.btnSearch`, layerObject).text("수정");
		self.eventAction(layerObject);
		self._utils.unSerializeObject(layerObject, self._order);
		$('select[name=istInCd],[name=istOutCd]',layerObject).trigger('change');
		let workInfo = self._order.workInfo;
		for(let i=0;i<workInfo.length;i++) self.workAdd(layerObject, workInfo[i]);
		$('input[name=oCnt]',layerObject).trigger('focusout');
		$('select[name=istInCd],[name=istOutCd]',layerObject).trigger('change');	
		if(self._order.fileInfo.length>0){
			$('.btnDeleteFile', layerObject).show();
			$('.oFileNmDown',layerObject).show().addClass('cursorPointer');
			$('.btnAddFile', layerObject).hide();
			$('.addFileName',layerObject).text(self._order.fileInfo[0].realName);
		}
		
	}
	workAdd = (obj,d) => {
		let self = this;
		let tbody = $('.workTable tbody', obj);

		let tr = $('<tr style="border-bottom: 1px dotted #c1c1c1;" />').data("ROW",d);
		tr.append($('<td class="ac handle cursorPointer"><i class="fa-solid fa-arrows-up-down"></i></td>'));
		tr.append($('<td class="ac cursorPointer"></td>').text(d.spNm));
		tr.append($('<td class="ac cursorPointer"></td>').text(d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+')')));
		let frontYnNm = '-';
		if(d.wFrontYn=="Y"){
			frontYnNm = "전면"
		}else if(d.wFrontYn=="N"){
			frontYnNm = "후면";	
		}else if(d.wFrontYn=="Z"){
			frontYnNm = "양면";	
		}
		tr.append($('<td class="ac cursorPointer">'+ frontYnNm +'</td>'));

		let options = '';
		for(let o=0;o<d.optionInfo.length;o++) {
			let od = d.optionInfo[o];
			if(od.cwoOrderYn == 'Y'){
				//if(od.woInput != null) {options += (((options!='')?', ':'') + od.cwoNm + '('+ od.woInput +')');}
				if(!self._utils.checkEmptyNull(od.woInput)) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm" style="padding:0px;"><span class="workOptionInfo">'+ od.cwoNm + ' : <strong>'+ od.woInput +'</strong></span></span>');}
			}
		}
		tr.append($('<td class="al workOptionListDiv cursorPointer" style="padding: 0px;"></td>').append($(options)));					
		// tr.append($('<td class="al cursorPointer" style="text-overflow: ellipsis;"></td>').text(!self._utils.checkEmptyNull(d.wMemo)?self._utils.strMaxCuttion(d.wMemo,8)+'...':''));
		tr.append($('<td class="al cursorPointer" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></td>').text(d.wMemo));

		tr.append($('<td class="unEvent"><i class="fa-solid fa-square-minus workDelete" title="작업삭제" style="font-size: 16px;color:#81b1cd;"></i></td>'));
		
		tbody.append(tr);
	}
	workClean = (obj) =>{
		$('input[name=index]', obj).val("");
		$('input[name=cwSeq]', obj).val("");
		$('select[name=spSeq]', obj).val("").removeAttr('readonly');
		$('select[name=cwSeq]', obj).empty().removeData("ROW").attr('disabled','disabled').addClass('disabled');;
		$('select[name=wFrontYn]', obj).empty().append('<option>작업면</option>');
		$('input[name=wMemo]', obj).val("");
		$('.optionArea', obj).empty();
		$(`.saveWork`, obj).attr("title","작업 추가").text("작업추가");
		$( 'input[name=wInfo]', obj).val('').attr('disabled','disabled').addClass('disabled');
		
	}
	workView = (obj,d) =>{
		let self = this;
		$('.workInfo', obj).data("ROW", d);
		if(!self._utils.checkEmptyNull(d.wSeq)) $('input[name=wSeq]', obj).val(d.wSeq);
		else $('input[name=wSeq]', obj).val('');
		$('select[name=spSeq]', obj).val(d.spSeq).trigger('change',d.cwSeq).attr('readonly','readonly');
		//$('select[name=cwSeq]', obj).val(d.cwSeq);
		$('select[name=wFrontYn]', obj).val(d.wFrontYn);
		$('input[name=wMemo]', obj).val(d.wMemo);
		$(`.saveWork`, obj).attr("title","작업 수정").text("작업수정");
		if(d.spSeq == 2){
			$( 'input[name=wInfo]', obj).val(d.wInfo).removeAttr('disabled').removeClass('disabled');
		}else{
			$( 'input[name=wInfo]', obj).val('').attr('disabled','disabled').addClass('disabled');
		}
		this.workOptionView(obj, d.optionInfo);
	}

	workFrontYnSelectOption = (cwFrontYnCode, v) => {
		let opts = '';
		let cd = {'Y' : '전면', 'N':'후면', 'Z': '양면'}
		let cds = cwFrontYnCode.split(',');
		let selected = '';
		if(cwFrontYnCode == ''){
			opts += '<option value="">없음</option>';
		}else{
			if(v==undefined){ selected = 'selected';}
			opts += '<option value="" '+selected +'>선택</option>';
			for(let i=0;i<cds.length;i++){
				selected = '';
				if(v == cds[i]){ selected = 'selected';}
				opts += '<option value="'+ cds[i]+'" '+selected +'>'+ cd[cds[i]] +'</option>';
			}
		}
		return opts;
	}
	workOptionView = (obj,d) => {
		let self = this;
		let $optionArea = $( '.optionArea.vm', obj).data("ROW",d);
		$optionArea.empty();
		for(let i=0;i<d.length;i++){
			if(d[i].cwoOrderYn == "Y"){
				let $optionTag = $('<span class="workOptionListOne vm"/>');
				let $option = $('<strong class="workOptionInfoInput" />');				 // + ((d[i].cwoMustYn == "Y") ? '<span style="color:red">*</span>':'') + d[i].cwoNm  + ' : ';
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
								//if($sub.length > 0){ $sub.remove();}
								if(cwoDataSub[v].type == 'select'){			
									if($sub.length == 0){
										$sub = $('<select name="'+d[i].cwoSeq+'_sub" style="margin-left:5px"/>');
									}
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
				}else if(["T","C","W","M"].indexOf(d[i].cwoInputCd) > -1 ){
					$option.append('<input type="text" name="'+ d[i].cwoSeq+'" style="width:95px;" placeholder="최대 40글자" >');
				}
				//option += '</strong>';
				$optionTag.append($option);
				$optionTag.data("ROW", d[i]);
				$optionArea.append($optionTag);
			}
		}
		for(let i=0;i<d.length;i++){
			if(d[i].cwoOrderYn == "Y"){
				if(d[i].cwoInputCd == "A"){
					let v = d[i].woInput;
					if(!self._utils.checkEmptyNull(v) && v.indexOf('→') > -1){
						let vs = v.split('→');
						$("select[name="+d[i].cwoSeq+"]",$optionArea).val(vs[0]).trigger('change');
						$("[name="+d[i].cwoSeq+"_sub]",$optionArea).val(vs[1])
					}else{
						$("select[name="+d[i].cwoSeq+"]",$optionArea).val(d[i].woInput).trigger('change');
					}
				}else if(["T","C","W","M"].indexOf(d[i].cwoInputCd) > -1 ){
					$("input[name="+d[i].cwoSeq+"]",$optionArea).val(d[i].woInput);
				}
			}
		}
	}
	workChange = (obj,d) => {
		let self = this;
		let tbody = $('.workTable tbody', obj);
		let index = $('input[name=index]', obj).val();
		let tr = tbody.find("tr").eq(index);
		let td = tr.find("td");
		//console.log('change : '+ index);
		$(td[1]).text(d.spNm);
		if(d.spSeq == 2) $(td[2]).text(d.wNm + (self._utils.checkEmptyNull(d.wInfo) ? '' : ' ('+ d.wInfo+')'));
		else $(td[2]).text(d.wNm);
		let frontYnNm = '-';
		if(d.wFrontYn=="Y"){
			frontYnNm = "전면"
		}else if(d.wFrontYn=="N"){
			frontYnNm = "후면";	
		}else if(d.wFrontYn=="Z"){
			frontYnNm = "양면";	
		}
		$(td[3]).text(frontYnNm);
		let options = '';
		for(let o=0;o<d.optionInfo.length;o++) {
			let od = d.optionInfo[o];
			if(od.cwoOrderYn == 'Y'){
				if(!self._utils.checkEmptyNull(od.woInput)) {options += (((options!='')?' ':'') + '<span class="workOptionListOne vm" style="padding:0px;"><span class="workOptionInfo">'+ od.cwoNm + ' : <strong>'+ od.woInput +'</strong></span></span>');}
			}
		}
		$(td[4]).empty().append(options);
		$(td[5]).text(d.wMemo);
			
		tr.data("ROW",d);
	}
	


	excelDownload = () =>{
		let self = this;
		const workbook = new ExcelJS.Workbook();
		let fileName = self._code.find(".pageHere strong").text();
		const sheet = workbook.addWorksheet(fileName);
		let searchWrap = self._code.find(".searchWrapArea");
		let startDt = searchWrap.find("input[name=startDt]").val();
		let endDt = searchWrap.find("input[name=endDt]").val();
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let oStatus = searchWrap.find("select[name=oStatus]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let oMarkYn = searchWrap.find("input[name=oMarkYn]:checked").val();

		let columnInfos = [];
		columnInfos.push({name:"상태",key:"oStatusNm",width:12,align:'center'});
		columnInfos.push({name:"업체명",key:"cuNm",width:20,align:'left'});
		columnInfos.push({name:"파일명",key:"oFileNm",width:50,align:'left'});
		columnInfos.push({name:"규격",key:"oPaperSize",width:10,align:'center'});
		columnInfos.push({name:"주문수량",key:"oCnt",width:10,align:'right'});
		columnInfos.push({name:"입고처",key:"istInNm",width:20,align:'left'});
		columnInfos.push({name:"입고희망일",key:"oHopeInDt",width:12,align:'center'});
		columnInfos.push({name:"입고자",key:"istInENm",width:15,align:'center'});
		columnInfos.push({name:"출고처",key:"istOutNm",width:20,align:'left'});
		columnInfos.push({name:"출고희망일",key:"oHopeOutDt",width:12,align:'center'});
		columnInfos.push({name:"출고자",key:"istOutENm",width:15,align:'center'});
		columnInfos.push({name:"메모",key:"oMemo",width:70,align:'left'});
		columnInfos.push({name:"등록일시",key:"creDate",width:20,align:'center'});

		let searchData = {
			cuSeq : undefined,
			startDt : startDt.replace(/-/g,''),
			endDt : endDt.replace(/-/g,''),
			oMarkYn : oMarkYn,
			page : 1,
			rows : 9999,
			orderColumn : orderColumn,
			orderType : orderType,
			oStatus : oStatus,
			searchColumn : 'cuNm',
			searchWord : searchWord
		}

		self.list(searchData, function(resp){

			if(resp != null && resp.length > 0) {
				let header = [];
				for(let c in columnInfos) header.push(columnInfos[c].name);
				let headerRow = sheet.addRow(header);
				headerRow.eachCell((cell, colNum) => {
					self._parent._utils.excelStyleHeaderCell(cell);
					sheet.getColumn(colNum).width = columnInfos[colNum - 1].width;
				  });

				for(let i in resp){
					let rowData = [];
					for(let c in columnInfos){	rowData.push(resp[i][columnInfos[c].key]?resp[i][columnInfos[c].key]:'');	}
					let row = sheet.addRow(rowData);
					row.eachCell((cell, colNum) => {self._parent._utils.excelStyleDataCell(cell,columnInfos[colNum - 1].align); });
				}
			} else {
				
				alert('데이타가 없습니다.');
				return false;
			}
			self._parent._utils.excelDownload(workbook, fileName + "("+ searchData.startDt+'-'+searchData.endDt+')').then(r => {});
		});

		
	}
	purge = () => {
		const self = this;

		console.log("dashboardOrderController purge");
	}

	reload = () => {
		const self = this;

		console.log("dashboardOrderController reload");
	}	
	list = (_mapData, cbfunc) => {
		const self = this;
		let mapData = {
			ctl : 'order',
			cmd : 'list'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':!document.fullscreenElement});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						cbfunc(rdata.data);
					} else {
						cbfunc(null);
					}
			});
	}

	delete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
			cmd : 'delete'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}


	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}
	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
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

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
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


	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'order',
			cmd : 'update'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	mediaUpload = (file, cbfunc) => {
		let self = this;

		let form_data = new FormData();
				form_data.append('ctl', 'media');
				form_data.append('cmd', 'upload');
				form_data.append('directory', 'order');
				//form_data.append('target', 'P');
				form_data.append('authLevel', 3);
				form_data.append('upfile', file);
				
				let _api = new AjaxCall(self._const
						,form_data
						,{'isasync':false, 'wapi': 'user/fws','spinner':true});
						_api.ajaxfiledata(function(rdata){ 
								if(rdata.code == 0) {
										cbfunc(rdata.data);
								} else {
										alert(rdata.message);
										cbfunc(-9999);
								}
						});
	}
}
export default cuOrderController
