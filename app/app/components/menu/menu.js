(function(){
	'use strict';

	angular.module('app').controller('MenuController',MenuController);

	/* @ngInject */
	function MenuController($scope, $mdBottomSheet){

		$scope.closeMenu = function(){
			$mdBottomSheet.hide();
		}
	}

}());