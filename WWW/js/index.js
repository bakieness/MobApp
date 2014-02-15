// JavaScript Document

function Afunction()
{
	var div = document.getElementById( 'alarm' );
	var $color = div.style.backgroundColor;
	div.onmouseover = function() 
	{
  		this.style.backgroundColor = 'green';
  	}
	div.onmouseout = function() 
	{
  		this.style.backgroundColor = $color;
  	}
}
