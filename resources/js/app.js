'use strict';
import './jquery-ui.js';
import './jquery.ui.datepicker-ko.js';
import './jquery.print.js';
//import './html2canvas.js';
//import './jspdf.min.js';
import './common.js';

import Utils from './raon_modules/utils.js';
import CryptoJSAesJson from './raon_modules/CryptoJSAesJson.js';
import AppController from './controller/AppController';

$(function () {
	const __CONSTDATA = {
		__ENVIRONMENT : import.meta.env.VITE_ENVIRONMENT,
		__URL_API : import.meta.env.VITE_ENVIRONMENT=='dev'?import.meta.env.VITE_TEST_API_URL:import.meta.env.VITE_API_URL,
		__URL_AS3 : import.meta.env.VITE_AS3_URL,
		__ISENCPARAM : import.meta.env.VITE_ISENCPARAM==='true',
		__ISDEBUGDATA : import.meta.env.VITE_ISDEBUGDATA==='true',
	}

	const __SEND_DATA = {}
	let _controller = {}

	let exportGlobalModule;

	if (typeof exports !== 'undefined') {
			exportGlobalModule = exports;
	} else {
			exportGlobalModule = self.exportGlobalModule = {};
	}

	let _utils = new Utils();
	if(__GLOBALINFO) {
			let loginUserInfo = CryptoJSAesJson.decrypt(__GLOBALINFO, import.meta.env.VITE_TOKEN_KEY)
			if(loginUserInfo.islogin) {
					let sessionInfo = loginUserInfo.sessionInfo;
					$.extend(__CONSTDATA,{
							__USER_ID : sessionInfo.eSeq,
							__USER_NAME : sessionInfo.eNm,
							__USER_TEL : sessionInfo.eTel,
							__USER_LEVEL : sessionInfo.authLevel,
							__GROUP_ID : sessionInfo.cSeq,
							__ACCESSTOKEN : sessionInfo.AccessToken,
							__ENCKEY : sessionInfo.AuthKey,
							__MANAGER_YN : sessionInfo.managerYn,
							__C_NM : sessionInfo.cNm,
							__C_TEL : sessionInfo.cTel,
							__C_ADDRESS : sessionInfo.cAddr + ' '+ sessionInfo.cAddrDetail,
							__CU_NAME : sessionInfo.cNm,
							//__C_REPORT_TITLE : sessionInfo.cReportTitle,
					});
			}
	} else {
			$.extend(__CONSTDATA,{
					__AUTH_API : 'public',
					__ENCKEY : import.meta.env.VITE_TOKEN_KEY
			});
	}

	
	let sendParam;
	if(__SEND_PARAMS) {
			sendParam = JSON.parse(__SEND_PARAMS)
	} else {
			sendParam = {};
	}

	const   _index = new AppController(__CONSTDATA,__SEND_PARAMS,sendParam);
	_index.init();
	exportGlobalModule.onControllerAction = function(_linkage,_cmd,_code,_data) {
			return _index.onControllerAction(_linkage,_cmd,_code,_data);
	};

});