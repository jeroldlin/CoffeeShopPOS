angular.module('menuApp', [])
.controller('MenuListController', function($scope) {
	
	var socket = io();
	
	var menuList = this;
	menuList.orderedItems = [];
	
	socket.on('new order to kitchen', function(msg){
		menuList.orderedItems.push(msg);
		$scope.$apply();
		alert("GOT NEW ORDER FOR " + msg.text);
	});
	
	menuList.deleteOrder = function(index) {
		menuList.orderedItems.splice(index, 1);
	};
});