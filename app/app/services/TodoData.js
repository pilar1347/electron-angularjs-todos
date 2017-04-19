(function(){
	'use strict';

	angular.module('app').factory('TodoData',TodoData);

	/* @ngInject */
	function TodoData($q){
		var Promise = require('bluebird');
		var storage = Promise.promisifyAll(require('electron-json-storage'));
		var data = {};
		var factory = {
			get:get,
			save:save
		}
		return factory;

		function get(){
			var d = $q.defer();
			if(data.hasOwnProperty('items')){
				d.resolve(data);
			} else {
				storage.getAsync('dawnsTodos').then(function(res){
					if(res.items){
						//already populated, return
						data = res;
						d.resolve(data);
					} else {
						//initialize in storage
						data = { items:[] };
						storage.setAsync('dawnsTodos', data).then(function(res){
							d.resolve(data);
						});
					}
				});
			}
			return d.promise;
		}

		function save(res){
			data = res;
			//write over
			storage.set('dawnsTodos', data, function(err){
				if(err){ console.error('Todos write error: ' + err); }
			});
		}

	}
}());