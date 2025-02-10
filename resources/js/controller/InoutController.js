'use strict';
import Utils from '../raon_modules/utils.js';
import InoutLoginController from './mobile/inout/InoutLoginController.js'
import InoutDashboardController from './mobile/inout/InoutDashboardController.js'
//import MenuController from './MenuController.js'


class InoutController {
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
				case 'inout':
					self._inoutLogin =  new InoutLoginController(self._const,self._data,self._param);
					self._inoutLogin.init();
					break;
				case 'inout/dashboard':
					self._inoutDashboard =  new InoutDashboardController(self._const,self._data,self._param);
					self._inoutDashboard.init();
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
	// self.$store.state.isVertical = ( window.innerHeight > window.innerWidth );
  }
export default InoutController