// JavaScript Document

document.addEventListener('deviceready', function () {
    // window.plugin.notification.local is now available
}, false);

var now = new Date().getTime(),
    _60_seconds_from_now = new Date(now + 60*1000);

window.plugin.notification.local.add({
    id:      1,
    title:   'Reminder',
    message: 'Dont forget to buy some flowers.',
    repeat:  'weekly',
    date:    _60_seconds_from_now
});

function setVars()
{
	var _event = document.getElementById("event").value;	
	var _type = document.getElementById("type").value;	
	var _date = document.getElementById("date").value;
	var _time = document.getElementById("time").value;	
	var _repeat = document.getElementById("repeat").value;
	
	window.localStorage.setItem("event", _event);	
	window.localStorage.setItem("type", _type);
	window.localStorage.setItem("date", _date);
	window.localStorage.setItem("time", _time);
	window.localStorage.setItem("repeat", _repeat);
}