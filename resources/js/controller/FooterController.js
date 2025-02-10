'use strict';
import Utils from '../raon_modules/utils.js';
import AjaxCall from '../raon_modules/AjaxCall';

class FooterController {
	constructor(_const, _data, _param, _root) {
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
		this._options = {};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._root = _root?_root:{};
		// Object.freeze(this._const);
	}

	init = () => {
		const self = this;
		if(self._const.__USER_LEVEL == 4){
			/*
			self.intervalId = setInterval(function(){
					let mapData = {ctl : 'employee',cmd : 'pushList',pType:'C', isRead:'N'};
					let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
					_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						for(let i=0;i<rdata.data.length;i++){
							let d = rdata.data[i];
							self.addMessage(d.puMessage, d.tSeq);
						}
						if(rdata.data.length>0){
							try{
								var audio = document.getElementById("notification-sound");
								audio.play();
							}catch(e){
								console.log("sound Error");
								console.log(e);
							}
						}
					}
				});
				}	,self._root._pushTime);
			*/				
			self.intervalCheckId = setInterval(function(){
				let $msgBox = $('.notification');
				let now = new Date()
				let time = now.getTime();
				
				for(let i=0;i<$msgBox.length;i++){
					let create = $($msgBox[i]).data("create");
					if((time-create) > 1000*60){
						$($msgBox[i]).hide(500, function(){$($msgBox[i]).remove();});
					}
				}

			},1000*60)

		}
	}

	addMessage = (msg, tSeq) => {
		const self = this;

		let notificationContainer = $('#notification-container');
			if($('[idx='+tSeq+']',notificationContainer).length == 0){
			let newMessage = $('<div class="notification cursorPointer" title="확인/닫기"/>');
			let icon = $('<img />',{'class':'notification-icon', 'src':'/images/bul/bul_notice.png'});
			let txt = $('<pre />',{'class':'notification-text'}).text(msg);
			newMessage.attr("idx",tSeq);
			newMessage.hide();
			newMessage.append(icon).append(txt);
			newMessage.data({create:(new Date()).getTime()});
			notificationContainer.append(newMessage);
			newMessage.show(500,function(){console.log("aaa")});
			newMessage.on('click', function() {
				let idx = $(this).attr("idx");
				let mapData = {ctl : 'employee',cmd : 'pushReadUpdate',tSeq:tSeq};
				let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
				_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
				}
			});
				$(this).remove();
			});
			try{
				var audio = document.getElementById("notification-sound");
				audio.play();
			}catch(e){
				console.log("sound Error");
				console.log(e);
			}
		}
        // setTimeout(function() {
        //     newMessage.remove();
        // }, 5000);
	}
}
export default FooterController