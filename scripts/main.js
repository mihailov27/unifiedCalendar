$( document ).ready(function() {
    console.log( "ready!" );
	var menuController = new MenuController(getDailyView());
	menuController.bindEvents();
});

// Constants for screen names

function getDailyView() { return 'daily'; }
function getWeeklyView() { return 'weekly'; }
function getMonthlyView() { return 'monthly'; }

// Menu controller

var MenuController = function(selectedView) {
	console.log('Menu controller initiated.');
	this.selectedView = selectedView;
}

MenuController.prototype.bindEvents = function() {
	console.log('Menu controller: binding events.');
	$( "#daily, #weekly, #monthly" ).on("tap", this.tapHandler);
	$("#calendar").fullCalendar({
		theme: false,
		header: {
			left: '',
			center: 'title',
			right: ''
		},
		defaultView: 'agendaDay'		
	});
	//$( "#daily" ).trigger( "tap" ); --> trigger tap event
};

MenuController.prototype.tapHandler = function (event) {
	console.log("Tap event received: " + event.target.id);
	// update selected view
	this.selectedView = event.target.id;
	var calendar = $('#calendar');
	if(this.selectedView === 'daily') {
		$(document).ready(function(){
			calendar.fullCalendar('changeView', 'agendaDay');			
		});
	} else if (this.selectedView === 'weekly') {
		$(document).ready(function(){
			calendar.fullCalendar('changeView', 'agendaWeek');		
		});
	} else if (this.selectedView === 'monthly') {
		$(document).ready(function(){
			calendar.fullCalendar('changeView', 'month');			
		});
	}
};
