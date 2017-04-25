(function(){
	'use strict';

	angular.module('app').config(AppConfig).run(AppRun)
	var themes;

	/* @ngInject */
	function AppConfig($routeProvider, $mdThemingProvider){
		$routeProvider.when('/Todos',{
			templateUrl:'app/components/todos/todos.html',
			controller:'TodosController',
			controllerAs:'todos'
		}).
		when('/Todos/:state',{
			templateUrl:'app/components/todos/todos.html',
			controller:'TodosController',
			controllerAs:'todos'
		}).
		when('/Theme',{
			templateUrl:'app/components/theme/theme.html',
			controller:'ThemeController',
			controllerAs:'th'
		}).
		otherwise({
			redirectTo:'/Todos'
		});

		themes = [
			{
				base:'indigo',
				accent:'pink',
				logo:'white'
			},
			{
				base:'lime',
				accent:'orange',
				logo:'black'
			},
			{
				base:'teal',
				accent:'amber',
				logo:'white'
			},
			{
				base:'deep-orange',
				accent:'cyan',
				logo:'white'
			},
			{
				base:'deep-purple',
				accent:'lime',
				logo:'white'
			}
		];

		for(var i=0; i<themes.length; i++){
			var t = themes[i];
			$mdThemingProvider.theme(t.base)
				.primaryPalette(t.base)
				.accentPalette(t.accent);
		}

		$mdThemingProvider.alwaysWatchTheme(true);

	}

	function AppRun($rootScope, $mdColorPalette, $filter){
		$rootScope.themes = themes;

		$rootScope.getMaterialColor = function(base,shade){
			var color = $mdColorPalette[base][shade].value;
			return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
		}

		$rootScope.getMaterialAccentColor = function(base,shade){
			var t = $filter('filter')(themes, {base:base}, true)[0];
			var color = $mdColorPalette[t.accent][shade].value;
			return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
		}
	}

}());