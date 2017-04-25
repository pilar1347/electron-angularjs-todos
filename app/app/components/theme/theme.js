(function(){
	'use strict';

	angular.module('app').controller('ThemeController',ThemeController);

	/* @ngInject */
	function ThemeController($scope, $rootScope, $mdBottomSheet, TodoData){
		var vm = this;

		vm.applyTheme = applyTheme;
		vm.getColor = getColor;

		activate();

		function activate(){
			//mark current theme as selected
			markAsSelected($scope.theme);
		}

		function markAsSelected(baseName){
			angular.forEach($rootScope.themes,function(value,key){
				if(value.base == baseName){
					value.selected = true;
				} else {
					value.selected = false;
				}
			});
		}

		function getColor(type,theme){
			if(type == 'base'){
				return {
					background:$scope.getMaterialColor(theme.base,400)
				}
			} else {
				return {
					background:$scope.getMaterialAccentColor(theme.base,400)
				}
			}
		}

		function applyTheme(theme){
			//apply selected theme
			$rootScope.theme = theme.base;
			$rootScope.$broadcast('themeChange',{
				base:theme.base,
				logo:theme.logo
			});
			markAsSelected(theme.base);

			//save theme in electron storage
			TodoData.setTheme(theme.base);

		}
	}

}());