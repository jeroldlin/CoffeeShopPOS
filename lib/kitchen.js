angular.module('menuApp', [])
.controller('MenuListController', function() {
	
	var socket = io();
	
	var menuList = this;
	menuList.orderedItems = [];
	
	socket.on('new order', function(msg){
		$('.orderRow').append($('<li>').text(msg));
	});
	
	menuList.deleteOrder = function(index) {
		menuList.orderedItems.splice(index, 1);
	};
});