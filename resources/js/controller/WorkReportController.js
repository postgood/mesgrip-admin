'use strict';
import Utils from '../raon_modules/utils.js';
import workReportLoginController from './mobile/workReport/workReportLoginController.js'
import workReportDashboardController from './mobile/workReport/workReportDashboardController.js'



class WorkReportController {
	constructor(_const, _data, _param) {
			this._const = _const?_const:{};
			this._data = _data?_data:{};
			this._param = _param?_param:{};
			this._options = {};
			this._utils = new Utils();
			// Object.freeze(this._const);
	}

	init = () => {
		const self = this;
		switch(__ROUTE_PATH) {
				case 'workreport':
					self._workReportLogin =  new workReportLoginController(self._const,self._data,self._param);
					self._workReportLogin.init();
					break;
				case 'workreport/dashboard':
					self._workReportDashbaord =  new workReportDashboardController(self._const,self._data,self._param);
					self._workReportDashbaord.init();
					break;
		}
	}
}


window.addEventListener( "orientationchange", function() {
	let self = this;
	setTimeout( function() {
	  currentOrientation();
	}, 200 )
  } );
  
  function currentOrientation () {
	//self.$store.state.isVertical = ( window.innerHeight > window.innerWidth );
  }
export default WorkReportController