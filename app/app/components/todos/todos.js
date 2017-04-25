(function(){
	'use strict';

	angular.module('app').controller('TodosController', TodosController);

	/* @ngInject */
	function TodosController($scope, $timeout, $routeParams, $mdDialog, $mdTheming, TodoData){
		var vm = this;

		vm.addNew = addNew;
		vm.editExisting = editExisting;
		vm.save = save;
		vm.saveOnEnter = saveOnEnter;
		vm.delete = deleteTodo;
		vm.updateList = updateList;
		vm.cancelNew = cancelNew;
		vm.completionChange = completionChange;
		vm.configureList = configureList;
		vm.viewInfo = viewInfo;

		activate();

		//TODOs for todos
		//Attach folder locations to todos?
		//Add due date to Todos

		//If list is long, is it annoying to have add new at bottom?
		//Should list be tall and skinny instead of size it is now?

		function activate(){
			TodoData.get().then(function(res){
				vm.data = res;
				vm.params = $routeParams;
				//Detect if it has been 2 hours since they completed it. If so, hide
				angular.forEach(vm.data.items,function(value,key){
					if(value.completed && Date.now() - value.timestamp > (3600000 * 2)){
						value.hidden = true;
					}
				});
				calculateProgress();
				//check list to see if none are visible
				vm.listCheck = checkList();

				TodoData.save(vm.data);
			});
		}

		function calculateProgress(){
			angular.forEach(vm.data.items,function(item,b){
				if(item.details){
					var total = item.details.length;
					var complete = 0;
					angular.forEach(item.details,function(value,key){
						if(value.completed){
							complete += 1;
						}
					});
					//get percent complete
					var p_complete = parseInt((complete/total)*100);

					//If progress is 100, mark as complete
					if(total == complete){
						item.completed = true;
						completionChange(item);
					} else if(item.completed){
						//was complete, but now is not
						item.completed = false;
						completionChange(item);
					}

					item.style = {
						width:p_complete+'%'
					}
				}
			});
		}

		function addNew(){
			//show todo editor
			vm.editing = true;
			vm.current = {};
			if(vm.existing_edit){
				vm.current = vm.existing_edit;
			}
			
			$timeout(function(){
				document.getElementById('todo_input').focus();
			},50);
		}

		function editExisting(item){
			vm.existing_edit = item;

			addNew();
		}

		function save(){
			vm.current.timestamp = Date.now();
			if(!vm.existing_edit){
				//add to array if new
				vm.data.items.push(vm.current);
			}
			vm.listCheck = checkList();
			
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
			vm.data.items.splice(index,1);
			vm.listCheck = checkList();
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

		function completionChange(item){
			if(item.completed){
				//if marked as completed, update timestamp
				item.timestamp = Date.now();
			} else {
				//if unmarked as completed, move to current list
				item.hidden = false;
			}

			TodoData.save(vm.data);
		}

		function configureList(item){
			if(vm.params.state && item.hidden){
				//show only completed
				return true;
			} else if(!vm.params.state && !item.hidden){
				return true;
			}
			return false;
		}

		function checkList(){
			var result = true;
			angular.forEach(vm.data.items,function(value,key){
				if(configureList(value)){
					result = false;
				}
			});
			return result;
		}

		function viewInfo(item,ev){
			//open dialog to add smaller items
			$mdDialog.show({
				controller:'InfoController',
				templateUrl:'app/components/info/info.html',
				parent:angular.element(document.body),
				targetEvent:ev,
				clickOutsideToClose:true,
				controllerAs:'info',
				fullscreen:true,
				locals:{
					item:item,
					data:vm.data
				}
			})
			.then(function(){
				calculateProgress();
			});
		}

	}

}());