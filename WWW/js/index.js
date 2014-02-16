// JavaScript Document

function Afunction()
{
	var $div = document.getElementById('alarm');
	var $color = $div.style.backgroundColor;
	$div.onmouseover = function() 
	{
  		this.style.backgroundColor = 'green';
  	}
	$div.onmouseout = function() 
	{
  		this.style.backgroundColor = $color;
  	}
}

function setVars()
{
	var _event = document.getElementById("event").value;	
	window.localStorage.setItem("event", _event);	
	var _type = document.getElementById("type").value;	
	window.localStorage.setItem("type", _type);	
}

function Sfunction()
{
	var $type = window.localStorage.getItem("event");
	var $name = window.localStorage.getItem("type");
	if ($type != null)
		{
			document.getElementById("p1").innerHTML=$type;
		}
	if ($name != null)
		{
			document.getElementById("p2").innerHTML=$name;
		}
}

function createDialog() 
{
	navigator.notification.confirm(
		'What do you think of this dialog?',  // message
    	dialogDismissed,         // callback
    	'An example dialog!',            // title
    	['Awesome!', 'Sucks']                  // buttons    		
	);
}