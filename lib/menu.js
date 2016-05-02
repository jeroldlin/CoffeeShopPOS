angular.module('menuApp', [])
.controller('MenuListController', function() {

	$(".menuOrder").css("display","none");
	$(".checkout").css("display","none");

	var menuList = this;
	var orderNumber = 0;
	
	menuList.items = [
		{text:'Caffe Latte', selected:false, size:'Tall', price:'2.95', comments:''},
		{text:'Caffe Latte', selected:false, size:'Grande', price:'3.65'},
		{text:'Caffe Latte', selected:false, size:'Venti', price:'4.15'},
		{text:'Caffe Mocha', selected:false, size:'Tall', price:'3.45'},
		{text:'Caffe Mocha', selected:false, size:'Grande', price:'4.15'},
		{text:'Caffe Mocha', selected:false, size:'Venti', price:'4.65'},
		{text:'White Chocolate Mocha', selected:false, size:'Tall', price:'3.75'},
		{text:'White Chocolate Mocha', selected:false, size:'Grande', price:'4.45'},
		{text:'White Chocolate Mocha', selected:false, size:'Venti', price:'4.75'},
		{text:'Freshly Brewed Coffee', selected:false, size:'Tall', price:'1.85'},
		{text:'Freshly Brewed Coffee', selected:false, size:'Grande', price:'2.10'},
		{text:'Freshly Brewed Coffee', selected:false, size:'Venti', price:'2.45'},
		{text:'Cinnamon Dolce Latte', selected:false, size:'Tall', price:'3.65'},
		{text:'Cinnamon Dolce Latte', selected:false, size:'Grande', price:'4.25'},
		{text:'Cinnamon Dolce Latte', selected:false, size:'Venti', price:'4.65'}
	];
	
	menuList.orderedItems = [];
	
	menuList.order = [];

	menuList.addItem = function(index) {
		if (menuList.items[index].selected == true){
			menuList.items[index].selected = false;
		}else{
			for (var i = 0; i < menuList.items.length; i++){
				if (i == index){
					menuList.items[i].selected = true;
				}else{
					menuList.items[i].selected = false;
				}
			}
		}
		displayCheckout();
	};
	
	menuList.addToOrder = function() {
		for (var i = 0; i < menuList.items.length; i++){
			if (menuList.items[i].selected == true){
				menuList.orderedItems.push(menuList.items[i]);
			}
		}
		displayCheckout();
	};
	
	menuList.addComment = function(index) {
		if ($(".menuCommentInput" + index).val() == ""){
			alert ("can't write blank comments!");
			return false;
		}else{
			menuList.orderedItems[index].comment = $(".menuCommentInput" + index).val();
			$(".menuCommentInput" +index).val('');
		}
		displayComments(index);
	};
	
	menuList.deleteOrder = function(index) {
		menuList.orderedItems.splice(index, 1);
		displayCheckout();
	};

	menuList.deleteComment = function(index) {
		menuList.orderedItems[index].comment = '';
		displayComments(index);
	};

	menuList.totalCost = function() {
		return totalCost();
	};
	
	menuList.checkout = function() {
		orderNumber += 1;
		// for (var i = 0; i < menuList.orderedItems.length; i++){
			// menuList.orderedItems[index].orderNumber = orderNumber;
			// socket.emit('new order', menuList.orderedItems[index]);
		// }
		alert ("Your order number is " + orderNumber);
		for (var i = 0; i < menuList.items.length; i++){
			menuList.items[i].selected = false;
		}
		menuList.orderedItems = [];
		displayCheckout();
	};
	
	function displayComments(index){
		if (menuList.orderedItems[index].comment == ''){
			$(".menuComment" + index).css("display","none");
		}else{
			$(".menuComment" + index).css("display","");
		}
	}

	function displayCheckout(){
		if (subCost() == 0){
			$(".menuOrder").css("display","none");
		}else{
			$(".menuOrder").css("display","");
		};
		if (totalCost() == 0){
			$(".checkout").css("display","none");
		}else{
			$(".checkout").css("display","");
		};
	}
	
	function subCost(){
		var total = 0;
		angular.forEach(menuList.items, function(item) {
			if (item.selected == true) total += parseFloat(item.price).toFixed(2);
		});
		return total;
	}	
	
	function totalCost(){
		var total = 0;
		angular.forEach(menuList.orderedItems, function(item) {
			total += parseFloat(item.price);
		});
		return total.toFixed(2);
	}
});
	
function cancelEntry(){
		setTimeout(function(){$(".menuCommentInput").val("");}, 3000);
}