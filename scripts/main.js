$( document ).ready(function() {
    console.log( "ready!" );
	//alert('ready');
	var menuController = new MenuController();
	menuController.initTabBar();
});

var MenuController = function() {
	this.initTabBar = function(){
		alert('hello world');	
	}
}
