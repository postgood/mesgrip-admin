'use strict';
import Utils from '../raon_modules/utils.js';
import LoginController from './LoginController.js'
import MenuController from './MenuController.js'
//import WorkReportController from './public/workReportController.js'

class AppController {
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
 
		//console.log(`'${__ROUTE_PATH}'`);
		switch(__ROUTE_PATH) {
				case '/':
					self._login =  new LoginController(self._const,self._data,self._param);
					self._login.init();
					break;
				case 'mem/dashboard':
					self._menu =  new MenuController(self._const,self._data,self._param);
					self._menu.init();
					break;
		}
	}
}

export default AppController