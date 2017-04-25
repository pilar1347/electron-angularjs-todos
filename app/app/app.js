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
				setLogo();
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
			setLogo();
		});

		function setLogo(){
			vm.logo = 'Todos_icon.png';
			if(vm.theme.logo == 'black'){
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