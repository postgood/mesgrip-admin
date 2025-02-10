'use strict';

$(function(){
	$('.imgChkBoxLabel').on('click', function(){
		$(this).toggleClass( "lbOn" );

		if($(this).hasClass("lbOn")) {
			$('.imgChkBoxInput').attr('checked', 'checked');
		} else {
			$('.imgChkBoxInput').removeAttr('checked');
		}
	});
	
});
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

$( function() {
    $( document ).tooltip({show: { effect: "fadeIn", duration: 500, delay: 500 }, hide: { effect: "fadeOut", duration: 500 }});
  } );
$(window).resize(function() { // 브라우저 사이즈 감지
	//var sourceTop = $(window).height();
	var sourceTop = window.innerHeight;
	//$('#ctrTabWrapaa').height($(document).height());
	let menus = sessionStorage.getItem("MenuInfo");
	if(menus != undefined){
		menus = JSON.parse(menus);
	}else{
		menus = [];
	}
	// 원장 현황 목록 위치 잡기
	for(var i=0; i<menus.length;i++){
		var body = $("#"+ menus[i].____ID____);
		var overflowFixWraps = body.find(".overflowFixWrap:not(.noReSize)");
		var menuPlusHeight = 75;
		var menuFootHeight = 20;

		//if(body.find(".totalSumDiv").length != 0){
			//menuPlusHeight = menuPlusHeight + 40; //110;
		//}
		if(overflowFixWraps.length > 0){
			var cssheight = 0;
			for(var w=0;w<overflowFixWraps.length;w++){
				var overflowFixWrap = $(overflowFixWraps[w]);
				var plusHeight = menuPlusHeight;
				var footHeight = menuFootHeight;

//							if(body.find(".absWrap").length > 0){
//								sourceTop = body.find(".absWrap").position().top;
//								plusHeight = 31;
//							}
				
				

				var headHeight = overflowFixWrap.prev(".scrollTbThead").height();
				var pageInfoTfoot;
				/*if(overflowFixWrap.closest(".divisionWrap.f_lt").length == 1){
					pageInfoTfoot = overflowFixWrap.closest(".divisionWrap.f_lt").find(".pageInfoTfoot");
					if(pageInfoTfoot.length>0) plusHeight = (plusHeight-footHeight) + 25  ;
				}else{
				*/
					pageInfoTfoot = body.find(".pageInfoTfoot");
					if(pageInfoTfoot.length>0) plusHeight = plusHeight-footHeight;
				//}
				//console.log('sourceTop : '+ sourceTop);
				//console.log('scrollTbThead : '+ body.find(".scrollTbThead").position().top);
				//console.log('plusHeight : '+ plusHeight);
				var scWrapheight = sourceTop- body.find(".scrollTbThead").position().top - (plusHeight+headHeight); // 뒤에 thead의 높이값 만큼 뺄셈
				/*
				var headHeight = body.find(".scrollTbThead").height();
				var pageInfoTfoot = body.find(".pageInfoTfoot");
				if(pageInfoTfoot.length>0) plusHeight = 130;
				var scWrapheight = sourceTop - body.find(".scrollTbThead").position().top - (plusHeight+headHeight); // 뒤에 thead의 높이값 만큼 뺄셈
				*/
				//console.log('scWrapheight :'+scWrapheight);
				//console.log('scWrapheight2 :'+ (new Date()).getMilliseconds());
				overflowFixWrap.height(scWrapheight);
				var divisionWrap = overflowFixWrap.closest(".divisionWrap");
				if(divisionWrap.length == 1){
					divisionWrap.css("min-height",cssheight+50 +"px");
				}
			}
		}
/*		
		if(body.find(".totalSumDiv").length != 0){
			plusHeight = plusHeight + 80; //110;
			var headHeight = body.find(".scrollTbThead").height();
			var pageInfoTfoot = body.find(".pageInfoTfoot");
			
			if(pageInfoTfoot.length>0) plusHeight = plusHeight +footHeight ;  // 130;
			var scWrapheight = sourceTop - body.find(".scrollTbThead").position().top - (plusHeight+headHeight); // 뒤에 thead의 높이값 만큼 뺄셈
			overflowFixWraps.height(scWrapheight);
			
		}
*/			
		if(body.find(".leftSyncDiv").length != 0){
			plusHeight = plusHeight - 44; //110;
			var headHeight = body.find(".scrollTbThead").height();
			var pageInfoTfoot = body.find(".pageInfoTfoot");
			
			if(pageInfoTfoot.length>0) plusHeight = plusHeight +footHeight ;  // 130;
			var scWrapheight = sourceTop - body.find(".scrollTbThead").position().top - (plusHeight+headHeight); // 뒤에 thead의 높이값 만큼 뺄셈
			body.find(".leftSyncDiv").height(scWrapheight);
			body.find(".rightSyncDiv").height(scWrapheight);
		}

		var divisionWrapf_rt = body.find(".divisionWrap.f_rt");
		if(divisionWrapf_rt.length>0){
			var table = divisionWrapf_rt.find("table");
			if(table.length> 0 ){
				divisionWrapf_rt.css("min-height",table.height()+30 +"px");
			}
			
		}
	}
	/*
	console.log('dataHeadTable :'+ $(".dataHeadTable").length);
	let $dataHeadTable = $(".dataHeadTable");
	for(let i =0;i<$dataHeadTable.length;i++){

		let $nextDiv = $($dataHeadTable[i]).next();
		console.log('nextDiv :'+ $nextDiv.width());
		$($dataHeadTable[i]).css('width',$nextDiv.width());
	}
		*/
	$(".dataHeadTable").width('100%');
	// 테이블 스크로 재 조정
	//if (tableScrollCheck!=undefined) tableScrollCheck();


		var tableScroll = undefined;
		tableScroll = $(".tablScrollDisplay");
		if (tableScroll == undefined) return;
		$(tableScroll).each(function(){
			var colgroup = $(this).children("colgroup");
			var thead = $(this).children("thead").children("tr");
			var nextDiv = $(this).next();
			var nextTable = nextDiv.children("table");
			var rowsCnt = 0;
			var th = null;
			var scrollWidth = 8;
			var footTable = undefined;
			try{
				
				if (nextDiv.next().get(0).tagName == "TABLE"){
					footTable = nextDiv.next();
				}else if(nextDiv.parent().next().get(0).tagName == "TABLE"){
					footTable = nextDiv.next();
				}else{}
				
			}catch(e){
				//console.log("tableScrollCheck  ERROR");
				//console.log(e);
			}
			var footColgroup = (footTable!=undefined) ? footTable.children("colgroup"):undefined;
			var tfoot = (footTable!=undefined) ? footTable.children("tfoot").children("tr"):undefined;
			
			$(this).width(nextDiv.width());
			var width = $(this).width();
			if(nextDiv.height() < nextTable.height()){
				nextTable.addClass("tableScrollOnTbody");
				if($(this).width()>$(nextTable).width()){
					for(var i=0;i<thead.length;i++){
						th = $("th:last",$(thead[i]));
						if(rowsCnt >= i){
							var colspan = 0;
							if(th.attr("orgColspan")==undefined){
								colspan = th.attr("colspan")==undefined?1:th.attr("colspan");
								th.attr("orgColspan",colspan++);
								th.attr("scroll","Y").attr("colspan",colspan);
							}
							if(th.attr("rowspan") != undefined){
								rowsCnt = rowsCnt + (th.attr("rowspan")-0);
							}else{
								rowsCnt++;
							}
							// foot 
							if(tfoot!=undefined){
								var fth = $("th:last",$(tfoot[i]));
								if(fth.attr("orgColspan")==undefined){
									colspan = fth.attr("colspan")==undefined?1:fth.attr("colspan");
									fth.attr("orgColspan",colspan++);
									fth.attr("scroll","Y").attr("colspan",colspan);
								}
							}
						}
					}
					if($('col[scroll=Y]',colgroup).length == 0) $('<col scroll="Y">').attr("width",scrollWidth).appendTo(colgroup);
					var cols =  $('col:not([scroll=Y])',colgroup);
					var fcols =  (footColgroup!=undefined) ? $('col:not([scroll=Y])',footColgroup):undefined;
					if(fcols!=undefined){
						if($('col[scroll=Y]',footColgroup).length == 0) $('<col scroll="Y">').attr("width",scrollWidth).appendTo(footColgroup);	
					}
					for(var i =0;i<cols.length;i++){
						var col = $(cols[i]);
						var w = col.attr("width");
						if(w.indexOf("%") == -1){
							if(col.attr("orgWidth") != undefined){
								w = col.attr("orgWidth");
							}else{
								w = col.attr("width");
								col.attr("orgWidth",w);
							}
							if(w.indexOf("%") >= 0){
								w = w.replace("%","");
								col.attr("width",(((width-scrollWidth)*w)/100).toFixed(2));
								// foot
								if(fcols!=undefined){
									$(fcols[i]).attr("width",(((width-scrollWidth)*w)/100).toFixed(2));
								}
							}
						}
					}
	
				}
	
			}else{
				nextTable.removeClass("tableScrollOnTbody");
				for(var i=0;i<thead.length;i++){
					th = $("th[scroll=Y]",$(thead[i]));
					var colspan = th.attr("colspan");
					if(th.attr("orgColspan")!=undefined){
						th.attr("colspan",th.attr("orgColspan"));
						th.removeAttr("orgColspan");
						if(colspan == "2")	th.removeAttr("colspan");
					}
					th.removeAttr("scroll");
					// foot 
					if(tfoot!=undefined){
						var fth = $("th[scroll=Y]",$(tfoot[i]));
						colspan = fth.attr("colspan");
						if(fth.attr("orgColspan")!=undefined){
							fth.attr("colspan",fth.attr("orgColspan"));
							fth.removeAttr("orgColspan");
							if(colspan == "2")	fth.removeAttr("colspan");
						}
						fth.removeAttr("scroll");
					}
				}
				var cols =  $('col:not([scroll=Y])',colgroup);
				var fcols =  (footColgroup!=undefined) ? $('col:not([scroll=Y])',footColgroup):undefined;
				for(var i =0;i<cols.length;i++){
					var col = $(cols[i]);
					if(col.attr("orgWidth")!=undefined){
						col.attr("width",col.attr("orgWidth"));
						col.removeAttr("orgWidth");
						//foot
						if(fcols!=undefined){
							var fcol = $(fcols[i]); 
							fcol.attr("width",fcol.attr("orgWidth"));
							fcol.removeAttr("orgWidth");
						}
					}
					
				}
				$('col[scroll=Y]',colgroup).remove();
				if(fcols!=undefined) $('col[scroll=Y]',footColgroup).remove();
	
			}
		});


});
/*
function tableScrollCheck(){
	console.log('cccccccccccccccccccc');
	var tableScroll = undefined;
	if (arguments[0] != undefined){
		if(typeof arguments[0] == "object"){
			if($(arguments[0]).hasClass("tablScrollDisplay")){
				tableScroll = arguments[0];
			}else{
				var tag = $(arguments[0]).localName;
				var div = undefined;
				if(tag == "div"){
					div = $(arguments[0])
				}else{
					div = $(arguments[0]).closest("div")
				}
				tableScroll = div.parent().find(".tablScrollDisplay");
			}

		}
	}

	if (tableScroll == undefined){
		tableScroll = $(".tablScrollDisplay");
	}
	if (tableScroll == undefined) return;
	$(tableScroll).each(function(){
		var colgroup = $(this).children("colgroup");
		var thead = $(this).children("thead").children("tr");
		var nextDiv = $(this).next();
		var nextTable = nextDiv.children("table");
		var rowsCnt = 0;
		var th = null;
		var scrollWidth = 8;
		
		var footTable = undefined;
		try{
			
			if (nextDiv.next().get(0).tagName == "TABLE"){
				footTable = nextDiv.next();
			}else if(nextDiv.parent().next().get(0).tagName == "TABLE"){
				footTable = nextDiv.next();
			}else{}
			
		}catch(e){
			//console.log("tableScrollCheck  ERROR");
			//console.log(e);
		}
		var footColgroup = (footTable!=undefined) ? footTable.children("colgroup"):undefined;
		var tfoot = (footTable!=undefined) ? footTable.children("tfoot").children("tr"):undefined;

		
		$(this).width(nextDiv.width());
		var width = $(this).width();
		if(nextDiv.height() < nextTable.height()){
			nextTable.addClass("tableScrollOnTbody");
			if($(this).width()>$(nextTable).width()){
				for(var i=0;i<thead.length;i++){
					th = $("th:last",$(thead[i]));
					if(rowsCnt >= i){
						var colspan = 0;
						if(th.attr("orgColspan")==undefined){
							colspan = th.attr("colspan")==undefined?1:th.attr("colspan");
							th.attr("orgColspan",colspan++);
							th.attr("scroll","Y").attr("colspan",colspan);
						}
						if(th.attr("rowspan") != undefined){
							rowsCnt = rowsCnt + (th.attr("rowspan")-0);
						}else{
							rowsCnt++;
						}
						// foot 
						if(tfoot!=undefined){
							var fth = $("th:last",$(tfoot[i]));
							if(fth.attr("orgColspan")==undefined){
								colspan = fth.attr("colspan")==undefined?1:fth.attr("colspan");
								fth.attr("orgColspan",colspan++);
								fth.attr("scroll","Y").attr("colspan",colspan);
							}
						}
					}
				}
				if($('col[scroll=Y]',colgroup).length == 0) $('<col scroll="Y">').attr("width",scrollWidth).appendTo(colgroup);
				var cols =  $('col:not([scroll=Y])',colgroup);
				var fcols =  (footColgroup!=undefined) ? $('col:not([scroll=Y])',footColgroup):undefined;
				if(fcols!=undefined){
					if($('col[scroll=Y]',footColgroup).length == 0) $('<col scroll="Y">').attr("width",scrollWidth).appendTo(footColgroup);	
				}
				for(var i =0;i<cols.length;i++){
					var col = $(cols[i]);
					var w ;
					if(col.attr("orgWidth") != undefined){
						w = col.attr("orgWidth");
					}else{
						w = col.attr("width");
						col.attr("orgWidth",w);
					}
					if(w.indexOf("%") >= 0){
						w = w.replace("%","");
						col.attr("width",(((width-scrollWidth)*w)/100).toFixed(2));
						// foot
						if(fcols!=undefined){
							$(fcols[i]).attr("width",(((width-scrollWidth)*w)/100).toFixed(2));
						}
					}
				}

			}

		}else{
			nextTable.removeClass("tableScrollOnTbody");
			for(var i=0;i<thead.length;i++){
				th = $("th[scroll=Y]",$(thead[i]));
				var colspan = th.attr("colspan");
				if(th.attr("orgColspan")!=undefined){
					th.attr("colspan",th.attr("orgColspan"));
					th.removeAttr("orgColspan");
					if(colspan == "2")	th.removeAttr("colspan");
				}
				th.removeAttr("scroll");
				// foot 
				if(tfoot!=undefined){
					var fth = $("th[scroll=Y]",$(tfoot[i]));
					colspan = fth.attr("colspan");
					if(fth.attr("orgColspan")!=undefined){
						fth.attr("colspan",fth.attr("orgColspan"));
						fth.removeAttr("orgColspan");
						if(colspan == "2")	fth.removeAttr("colspan");
					}
					fth.removeAttr("scroll");
				}
			}
			var cols =  $('col:not([scroll=Y])',colgroup);
			var fcols =  (footColgroup!=undefined) ? $('col:not([scroll=Y])',footColgroup):undefined;
			for(var i =0;i<cols.length;i++){
				var col = $(cols[i]);
				if(col.attr("orgWidth")!=undefined){
					col.attr("width",col.attr("orgWidth"));
					col.removeAttr("orgWidth");
					//foot
					if(fcols!=undefined){
						var fcol = $(fcols[i]); 
						fcol.attr("width",fcol.attr("orgWidth"));
						fcol.removeAttr("orgWidth");
					}
				}
				
			}
			$('col[scroll=Y]',colgroup).remove();
			if(fcols!=undefined) $('col[scroll=Y]',footColgroup).remove();

		}
	});
}
*/	
/*
function serializeDiv(Obj){
	var param = $(Obj).find("input:not([type=checkbox]),select,textarea").serialize();
	var check = $(Obj).find("input[type=checkbox]"); 
	for(var i=0;i<check.length;i++){
		var c = $(check[i]);
		if(c.is(":checked")) param+="&"+c.attr("name") +"="+c.val();
	}
   return param
}
function serializeTbody(Obj,arrayName,excludes){
   var trs = $(Obj).children("tr");
   var param = "";
   var exclude = excludes==undefined ? undefined: excludes.split(",");
   var trCnt = trs.length;
   for(var i=0;i<trCnt;i++){
	   var tr = $(trs[i]);
	   var data = tr.data("ROW");
	   var pass = false;
	   if(exclude != undefined){
		   for(var j=0;j<exclude.length;j++){
			   if(exclude[j] == "last" && i == (trCnt-1)){	pass = true;}
			   else if(exclude[j] == "first" && i == 0){ pass = true;}
			   else if(exclude[j] == i){ pass = true;}
		   }
	   }
	   if(pass) continue;
	   var fields = tr.find("input,select,textarea").serializeArray();
	   for(var j=0;j<fields.length;j++){
		   if(data == undefined){
			   param +="&"+arrayName+"["+i+"]."+fields[j].name +"="+ fields[j].value;
		   }else{
			   param +="&"+arrayName+"["+i+"]."+fields[j].name +"="+ ((data[fields[j].name] == undefined) ? fields[j].value : data[fields[j].name]);
		   }
	   }
   }
   return param.substring(1);
}
function serializeTable(Obj,arrayName){
   var trs = $(Obj).find("tr");
   var param = "";
   var trCnt = trs.length;
   var index = 0;
   for(var i=0;i<trCnt;i++){
	   var tr = $(trs[i]);
	   var fields = tr.find("input,select,textarea").serializeArray();
	   for(var j=0;j<fields.length;j++){
		   param +="&"+arrayName+"["+index+"]."+fields[j].name +"="+ fields[j].value;
	   }
	   if(fields.length>0) index++;
   }
   return param.substring(1);
}
function serializeObject(Obj) {
	"use strict"
	debugger;
	var result = {}
	var extend = function(i, element) {
	  var node = result[element.name]
	  if ("undefined" !== typeof node && node !== null) {
		if ($.isArray(node)) {
		  node.push(element.value)
		} else {
		  result[element.name] = [node, element.value]
		}
	  } else {
		result[element.name] = element.value
	  }
	}
  	$.each(this.serializeArray(), extend)
	return result
  }
$.fn.serializeObject  = function() {
	"use strict"
	var result = {}
	var extend = function(i, element) {
	  var node = result[element.name]
	  if ("undefined" !== typeof node && node !== null) {
		if ($.isArray(node)) {
		  node.push(element.value)
		} else {
		  result[element.name] = [node, element.value]
		}
	  } else {
		result[element.name] = element.value
	  }
	}
  	$.each(this.serializeArray(), extend)
	return result
  }
*/  
// 달력인풋 및 달력아이콘 클릭시
$.datepicker.setDefaults({changeYear:true,changeMonth:true,showButtonPanel:true});
$("body").on("focus", "input.date", function(){
	$(this).attr("autocomplete", "off");
	$(this).datepicker({onSelect: function(dateText){
	$(this).trigger("change");
	if(typeof eventBus != "undefined") eventBus.$emit('selected-date', {date: dateText, ele: $(this) });
		}, onClose: function(){
			let $parentObj = $(this).closest('div');
			if($parentObj.length > 0){
				let $objs = $('INPUT, SELECT, TEXTAREA',$parentObj);
				let nextObjNm = $(this).attr("nextObject");
				if(nextObjNm != undefined && nextObjNm != ''){
					for(let i=0;i<$objs.length;i++){
						let nm = $($objs[i]).attr('name');
						if(nm != undefined && nm == nextObjNm ){
							$($objs[i]).trigger('focus');
						}
					}
				}else{
					let thisNm = $(this).attr('name');
					let check = false;
					for(let i=0;i<$objs.length;i++){
						if(check){
							$($objs[i]).trigger('focus');
							break;
						}
						let nm = $($objs[i]).attr('name');
						if(nm != undefined && nm == thisNm ){
							check = true;
						}
					}
				}
			}
		if(typeof eventBus != "undefined") eventBus.$emit('closed-date', null);
		}}).datepicker("show");
}).on("click", "img", function(){
	var input = $(this).prev("input.date");
	if(input.is(":disabled") == false){
	if(input.length==0) input = $(this).prev(".dateym");
	input.focus();
	}
});
$.datepicker._gotoToday = function(id) {
    $(id).datepicker('setDate', new Date()).datepicker('hide').blur();
};
$(window).trigger("resize");
/*
var AudioContext;
var audioContext;
let pathname = location.pathname;
let paths = pathname.split('/');
let passPaths = ['inout','work','workreport'];
if(!(paths.length > 1  && passPaths.indexOf(paths[1]) > -1)){
	window.onload = function() {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
			AudioContext = window.AudioContext || window.webkitAudioContext;
			audioContext = new AudioContext();
		}).catch(e => {
			console.error(`Audio permissions denied: ${e}`);
		});
	}
}
*/
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-57x57.png','57x57');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-60x60.png','60x60');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-72x72.png','72x72');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-76x76.png','76x76');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-114x114.png','114x114');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-120x120.png','120x120');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-144x144.png','144x144');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-152x152.png','152x152');
headLinkAdd('apple-touch-icon','/css/favicon/apple-icon-180x180.png','180x180');
headLinkAdd('icon','/css/favicon/android-icon-192x192.png','192x192','image/png');
headLinkAdd('icon','/css/favicon/favicon-32x32.png','32x32','image/png');
headLinkAdd('icon','/css/favicon/favicon-96x96.png','96x96','image/png');
headLinkAdd('icon','/css/favicon/favicon-16x16.png','16x16','image/png');
headLinkAdd('shortcut icon','/css/favicon/android-icon-192x192.png','192x192','image/png');
headLinkAdd('shortcut icon','/css/favicon/favicon-32x32.png','32x32','image/png');
headLinkAdd('shortcut icon','/css/favicon/favicon-96x96.png','96x96','image/png');
headLinkAdd('shortcut icon','/css/favicon/favicon-16x16.png','16x16','image/png');
 

function headLinkAdd(rel, href, size, type){
	const _tag = document.createElement('link');
	_tag.href = href;
	_tag.rel = rel;
	_tag.size = size;
	if(type != undefined) _tag.type = type;
	document.head.appendChild(_tag);
}
