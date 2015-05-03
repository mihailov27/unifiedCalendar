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
			center: '',
			right: ''
		},
		defaultView: 'agendaDay'		
	});
	calendarContainer.on('swiperight', this.swipeRightHandler);
	calendarContainer.on('swipeleft', this.swipeLeftHandler);
	// disable vertical scrolling
	calendarContainer.find('div.fc-time-grid-container').addClass('calendarContainer');
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
		calendarContainer.find('div.fc-time-grid-container').addClass('calendarContainer');
	});
};

MenuController.prototype.swipeLeftHandler = function(event) {
	var calendarContainer = $('#calendar');
	calendarContainer.fullCalendar('next');
	calendarContainer.find('div.fc-time-grid-container').addClass('calendarContainer');
};

MenuController.prototype.swipeRightHandler = function(event) {
	var calendarContainer = $('#calendar');
	calendarContainer.fullCalendar('prev');
	calendarContainer.find('div.fc-time-grid-container').addClass('calendarContainer');
};
