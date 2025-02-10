'use strict';
import Utils from '../raon_modules/utils.js';
import WorkLoginController from './mobile/work/WorkLoginController.js'
import WorkDashboardController from './mobile/work/WorkDashboardController.js'
//import MenuController from './MenuController.js'


class WorkController {
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
				case 'work':
					self._workLogin =  new WorkLoginController(self._const,self._data,self._param);
					self._workLogin.init();
					break;
				case 'work/dashboard':
					self._workDashboard =  new WorkDashboardController(self._const,self._data,self._param);
					self._workDashboard.init();
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
export default WorkController