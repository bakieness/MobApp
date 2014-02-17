// JavaScript Document

function setVars()
{
	var _event = document.getElementById("event").value;	
	var _type = document.getElementById("type").value;	
	var _date = document.getElementById("date").value;
	var _time = document.getElementById("time").value;	
	window.localStorage.setItem("event", _event);	
	window.localStorage.setItem("type", _type);
	window.localStorage.setItem("date", _date);
	window.localStorage.setItem("time", _time);
}

function Sfunction()
{
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");	 
	
	if ($event != null)
		{
			document.getElementById("p1").innerHTML=$event;
		}
	if ($type != null)
		{
			document.getElementById("p2").innerHTML=$type;
		}
	if ($date != null)
		{
			document.getElementById("p3").innerHTML=$date;
		}
	if ($time != null)
		{
			document.getElementById("p4").innerHTML=$time;
		}
	if ($event == null && $type == null)
		{
			var $blank = document.getElementById('alarm');
			$blank.style.backgroundColor = '#CCC';
		}

	var $div = document.getElementById('alarm');

	switch ($type)
	{
	case "Assignment":
  		$div.style.backgroundColor = '#FB9B9B';
  		break;
	case "Lecture":
  		$div.style.backgroundColor = '#A2BEF4';
  		break;
	case "Social":
   		$div.style.backgroundColor = '#A2FA92';
  		break;
	case "Other":
		$div.style.backgroundColor = '#FBEB91';
	}
}