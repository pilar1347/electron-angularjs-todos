(function(){
	'use strict';

	angular.module('app').controller('AppController', AppController);

	/* ngInject */
	function AppController($scope, $mdBottomSheet){
		var vm = this;
		var ipc = require('electron').ipcRenderer;

		vm.closeApp = closeApp;
		vm.showMenu = showMenu;

		activate();

		function activate(){

		}

		function closeApp(){
			ipc.send('close-app');
		}

		function showMenu(){
			$mdBottomSheet.show({
				templateUrl:'app/components/menu/menu.html',
				controller:'MenuController'
			});
		}

	}
	
}());