// JavaScript Document

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