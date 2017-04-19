(function(){
	'use strict';

	angular.module('app').controller('InfoController',InfoController);

	/* @ngInject */
	function InfoController($scope, $mdDialog, $timeout, TodoData, item, data){
		var vm = this;

		vm.item = item;
		vm.data = data;

		vm.close = close;
		vm.addNew = addNew;
		vm.editExisting = editExisting;
		vm.save = save;
		vm.saveOnEnter = saveOnEnter;
		vm.delete = deleteTodo;
		vm.updateList = updateList;
		vm.cancelNew = cancelNew;
		vm.completionChange = completionChange;

		activate();

		function activate(){
			console.log(data,item);
		}

		function close(){
			$mdDialog.hide();
		}

		function addNew(){
			//show todo editor
			vm.editing = true;
			vm.current = {};
			if(vm.existing_edit){
				vm.current = vm.existing_edit;
			}
			
			$timeout(function(){
				document.getElementById('item_input').focus();
			},50);
		}

		function editExisting(item){
			vm.existing_edit = item;

			addNew();
		}

		function save(){
			if(!item.details){ item.details = []; }
			if(!vm.existing_edit){
				//add to array if new
				item.details.push(vm.current);
			}
			
			TodoData.save(vm.data);
			vm.editing = false;
			vm.existing_edit = null;
		}

		function saveOnEnter(ev){
			if(ev.keyCode === 13){
				save();
			}
		}

		function deleteTodo(index){
			item.details.splice(index,1);
			TodoData.save(vm.data);
		}

		function updateList(){
			TodoData.save(vm.data);
		}

		function cancelNew(){
			vm.editing = false;
			vm.current = null;
			vm.existing_edit = null;
		}

		function completionChange(detail){
			TodoData.save(vm.data);
		}

	}

}());