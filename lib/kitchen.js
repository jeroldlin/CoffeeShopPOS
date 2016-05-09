angular.module('menuApp', [])
.controller('MenuListController', function($scope) {
	
	var socket = io();
	
	var menuList = this;
	menuList.orderedItems = [];
	
	updateInstruction();
	
	socket.on('new order to kitchen', function(msg){
		menuList.orderedItems.push(msg);
		$scope.$apply();
		alert("New order - " + msg.text + " | Order number: " + msg.orderNumber);
		updateInstruction();
	});
	
	menuList.deleteOrder = function(index) {
		menuList.orderedItems.splice(index, 1);
		updateInstruction();
	};
	
	function updateInstruction(){
		if(menuList.orderedItems[0] == undefined){
			$("#instruction").html("There are no orders, please ring up an order from the ordering system.");
		}else{
			$("#instruction").html("");
		}
	}
});