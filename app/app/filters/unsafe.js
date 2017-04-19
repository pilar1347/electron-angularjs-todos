(function(){
	'use strict';

	angular.module('app').filter('unsafe',function($sce){
	    return $sce.trustAsHtml;
	});

}());