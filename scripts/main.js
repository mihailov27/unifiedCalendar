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
	$( "#daily, #weekly, #monthly" ).on('tap', this.tapHandler);
	var calendarContainer = $('#calendar');
	calendarContainer.fullCalendar({
		theme: false,
		header: {
			left: '',
			center: 'title',
			right: ''
		},
		defaultView: 'agendaDay'		
	});
	calendarContainer.on('swiperight', this.swipeRightHandler);
	calendarContainer.on('swipeleft', this.swipeLeftHandler);
	//$( "#daily" ).trigger( "tap" ); --> trigger tap event
};

MenuController.prototype.tapHandler = function (event) {
	console.log("Tap event received: " + event.target.id);
	// update selected view
	this.selectedView = event.target.id;
	var calendarContainer = $('#calendar');
	var that = this;
	$(document).ready(function(){
		if(that.selectedView === getDailyView()) {
			calendarContainer.fullCalendar('changeView', 'agendaDay');
		} else if (that.selectedView === getWeeklyView()) {
			calendarContainer.fullCalendar('changeView', 'agendaWeek');
		} else if (that.selectedView === getMonthlyView()) {
			calendarContainer.fullCalendar('changeView', 'month');
		}
	});
};

MenuController.prototype.swipeLeftHandler = function(event) {
	var calendarContainer = $('#calendar');
	calendarContainer.fullCalendar('prev');
};

MenuController.prototype.swipeRightHandler = function(event) {
	var calendarContainer = $('#calendar');
	calendarContainer.fullCalendar('next');
};
