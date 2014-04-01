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

//being replaced by database
/*function displayAlarms()
{
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");
	var $repeat = window.localStorage.getItem("repeat");	 
	
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
			$blank.style.display = 'none';
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
		break;
	}
}
*/
//getting replaced by database
function displayAlarmDetails()
{
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");
	var $repeat = window.localStorage.getItem("repeat");	 
	
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
	if ($repeat != null)
		{
			document.getElementById("p5").innerHTML=$repeat;
		}	
}

//replaced by database
function deleteAlarm()
{
	window.localStorage.clear();	
}

function adddiv()
{
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");
	
	var thing = document.createElement("div")
	thing.setAttribute('id', 'alarm');
	thing.setAttribute('onClick', 'window.location = "Details.html"');
	
	var a = document.createElement("p");
	var b = document.createElement("p");
	var c = document.createElement("p");
	var d = document.createElement("p");
	
	a.setAttribute('id', 'p1');
	b.setAttribute('id', 'p2');
	c.setAttribute('id', 'p3');
	d.setAttribute('id', 'p4');
	
	var t=document.createTextNode($event);
	var q=document.createTextNode($type);
	var w=document.createTextNode($date);
	var e=document.createTextNode($time);
	
	a.appendChild(t);
	b.appendChild(q);
	c.appendChild(w);
	d.appendChild(e);
	
	thing.appendChild(a);
	thing.appendChild(b);
	thing.appendChild(c);
	thing.appendChild(d);

	if ($event == null && $type == null)
		{
			//var $blank = document.getElementById('alarm');
			thing.style.display = 'none';
		}

	switch ($type)
	{
	case "Assignment":
  		thing.style.backgroundColor = '#FB9B9B';
  		break;
	case "Lecture":
  		thing.style.backgroundColor = '#A2BEF4';
  		break;
	case "Social":
   		thing.style.backgroundColor = '#A2FA92';
  		break;
	case "Other":
		thing.style.backgroundColor = '#FBEB91';
		break;
	}
	
	document.body.appendChild(thing);
}