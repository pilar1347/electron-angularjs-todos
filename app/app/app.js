(function(){
	'use strict';

	angular.module('app').controller('AppController', AppController);

	/* ngInject */
	function AppController($scope, $rootScope, $mdBottomSheet, TodoData){
		var vm = this;
		var ipc = require('electron').ipcRenderer;

		$rootScope.theme = 'indigo';
		vm.theme = 'indigo';

		vm.closeApp = closeApp;
		vm.showMenu = showMenu;

		activate();

		function activate(){
			//get theme
			TodoData.getTheme().then(function(res){
				vm.theme = res.theme;
				$rootScope.theme = res.theme;

				setProgressBarColor();
				setLogo('white');
			});
			
		}

		function setProgressBarColor(){
			vm.progress_style = {
				background:$scope.getMaterialAccentColor($rootScope.theme,400)
			}
		}

		$scope.$on('themeChange',function(ev,data){
			vm.theme = data.base;
			setProgressBarColor();
			setLogo(data.logo);
		});

		function setLogo(color){
			vm.logo = 'Todos_icon.png';
			if(color == 'black'){
				vm.logo = 'Todos_icon_black.png';
			}
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