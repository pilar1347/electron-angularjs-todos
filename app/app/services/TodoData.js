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
			save:save,
			setTheme:setTheme,
			getTheme:getTheme
		}
		return factory;

		function get(){
			var d = $q.defer();
			if(data.hasOwnProperty('items')){
				d.resolve(data);
			} else {
				storage.getAsync('myTodos').then(function(res){
					if(res.items){
						//already populated, return
						data = res;
						d.resolve(data);
					} else {
						//initialize in storage
						data = { items:[] };
						storage.setAsync('myTodos', data).then(function(res){
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
			storage.set('myTodos', data, function(err){
				if(err){ console.error('Todos write error: ' + err); }
			});
		}

		function setTheme(theme){
			storage.set('myTodosTheme', {theme:theme}, function(err){
				if(err){ console.error('Todo theme write error: ' + err); }
			});
		}

		function getTheme(){
			return storage.getAsync('myTodosTheme').then(function(res){
				if(!res.theme){
					//not yet set, set as default indigo
					setTheme('indigo');
					return 'indigo';
				} else {
					return res;
				}
				
			});
		}

	}
}());