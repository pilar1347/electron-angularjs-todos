(function(){
	'use strict';

	angular.module('app').config(AppConfig);

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
		otherwise({
			redirectTo:'/Todos'
		});

		$mdThemingProvider.theme('default')
			.primaryPalette('indigo')
			.accentPalette('pink');

	}

}());