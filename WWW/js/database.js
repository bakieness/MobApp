// JavaScript Document
var db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	
	db.transaction(function(tx) 
		{
			tx.executeSql('CREATE TABLE IF NOT EXISTS ALARMS (id INTEGER PRIMARY KEY ASC, title, type, date, time, repeat)');
			GetAlarms();
		});
		
	if (window.localStorage.getItem("new") === null)
		{
			window.localStorage.setItem("new", "notnow");
			window.localStorage.setItem("i", 0);
		}
		
}

function AddDB()
{
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");
	var $repeat = window.localStorage.getItem("repeat");
	var i = window.localStorage.getItem("i");
	i++;
	window.localStorage.setItem("i", i);
	db.transaction(function(tx) 
	{
		tx.executeSql('INSERT INTO ALARMS (id, title, type, date, time, repeat) VALUES (?, ?, ?, ?, ?, ?)', [i, $event,$type,$date,$time,$repeat]);
		redirect();
	});
}
 
function GetAlarms()
{	
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	db.transaction(function (tx) 
	{
		tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results)
		{
			var len = results.rows.length, i;
			for (i = 0; i < len; i++)
			{	
			var newDiv = document.createElement("div")
			newDiv.setAttribute('id', results.rows.item(i).id);
			newDiv.setAttribute('onClick', 'window.location = "index.html#Details"; ShowDetails(this); setid(this)');
			
			var a = document.createElement("p");
			var b = document.createElement("p");
			var c = document.createElement("p");
			var d = document.createElement("p");
			
			a.setAttribute('id', results.rows.item(i).id);
			b.setAttribute('id', results.rows.item(i).id);
			c.setAttribute('id', results.rows.item(i).id);
			d.setAttribute('id', results.rows.item(i).id);
			
			var t=document.createTextNode(" " + results.rows.item(i).title);
			var q=document.createTextNode(results.rows.item(i).type);
			var w=document.createTextNode(results.rows.item(i).date);
			var e=document.createTextNode(results.rows.item(i).time);
			
			a.appendChild(t);
			b.appendChild(q);
			c.appendChild(w);
			d.appendChild(e);
			
			newDiv.appendChild(a);
			newDiv.appendChild(b);
			newDiv.appendChild(c);
			newDiv.appendChild(d);
			
			if (results.rows.item(i).title == null && results.rows.item(i).type == null)
			{
				newDiv.style.display = 'none';
			}
			
			switch (results.rows.item(i).type)
			{
				case "Assignment":
					newDiv.style.backgroundColor = '#FB9B9B';
					break;
				case "Lecture":
					newDiv.style.backgroundColor = '#A2BEF4';
					break;
				case "Social":
   					newDiv.style.backgroundColor = '#A2FA92';
  					break;
				case "Other":
					newDiv.style.backgroundColor = '#FBEB91';
					break;
			}			
			$content = document.getElementById("contenthome");
			$content.appendChild(newDiv);
			}
		})
	})
}

function ShowDetails(alarm)
{	
	var aid = alarm.id;
	var title = document.createTextNode("Title:");
	var p1 = document.createTextNode(alarm.getElementsByTagName('p')[0].innerHTML);
	var type = document.createTextNode("Type:");
	var p2 = document.createTextNode(alarm.getElementsByTagName('p')[1].innerHTML);
	var date = document.createTextNode("Date:");
	var p3 = document.createTextNode(alarm.getElementsByTagName('p')[2].innerHTML);
	var time = document.createTextNode("Time:");
	var p4 = document.createTextNode(alarm.getElementsByTagName('p')[3].innerHTML);
	
	var newDiv = document.createElement("div");
	
	var a = document.createElement("p");
	var b = document.createElement("p");
	var c = document.createElement("p");
	var d = document.createElement("p");
	var e = document.createElement("p");
	var f = document.createElement("p");
	var g = document.createElement("p");
	var h = document.createElement("p");
	
	a.style.fontWeight = "bold";
	c.style.fontWeight = "bold";
	e.style.fontWeight = "bold";
	g.style.fontWeight = "bold";
	
	a.style.textAlign = "center";
	b.style.textAlign = "center";
	c.style.textAlign = "center";
	d.style.textAlign = "center";
	e.style.textAlign = "center";
	f.style.textAlign = "center";
	g.style.textAlign = "center";
	h.style.textAlign = "center";
	
	a.appendChild(title);
	b.appendChild(p1);
	c.appendChild(type);
	d.appendChild(p2);
	e.appendChild(date);
	f.appendChild(p3);
	g.appendChild(time);
	h.appendChild(p4);
	
	newDiv.appendChild(a);
	newDiv.appendChild(b);
	newDiv.appendChild(c);
	newDiv.appendChild(d);
	newDiv.appendChild(e);
	newDiv.appendChild(f);
	newDiv.appendChild(g);
	newDiv.appendChild(h);
	
	$content = document.getElementById("details");
	$content.innerHTML = "";
	$content.appendChild(newDiv);
	
	del = document.getElementById("delbtn");
	del.setAttribute('onClick', 'deletedata()');
}

//deletes data from database
function deletedata()
{
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	var id = window.localStorage.getItem("dataid");
	var n = Number(id)
	db.transaction(function (tx) {
		tx.executeSql("DELETE FROM ALARMS WHERE id=?", [n]);
		window.location = 'index.html';
		});
}

//gets the database id value from the div tag clicked
function setid(div)
{
	$(document.body).click(function(evt)
	{
		var clicked = evt.target;
		var currentID = clicked.id;
		var text = $.trim($('#' + currentID).text()),
    	word = text.split(' ');
    	dataid = word[0];
		dataid = parseInt(dataid);
		if (typeof dataid === 'number')
		{
			window.localStorage.setItem("dataid", dataid);
		}
	})	
}

//function is called once the notification has been dismissed by the user
function alertDismiss()
{
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	alert('Alarm Stopped');
	var currentDate = date();
	alert(currentDate);
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM TEST', [], function (tx, results) {
			var len = results.rows.length, i;
			for (i = 0; i < len; i++){
				dbid = row(i).id;
				if (results.rows.item(i).repeat === 'once')
				{
					window.localstorage.setItem("dataid", dbid);
					deletedata();
				}
			}
		});
	});
}

//gets the current date
function date()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0
	var yyyy = today.getFullYear();
	
	if(dd<10)
	{
		dd='0'+dd
	} 
	if(mm<10) 
	{
		mm='0'+mm
	} 
	today = dd+'/'+mm+'/'+yyyy;
	return today;
}

//gets the current time of day
function currentTime() {
    var date = new Date();
    var mins = date.getMinutes();
    var hours = date.getHours();
	var currentTime = hours + ":" + mins;
	return currentTime;
}

function redirect()
{
	window.location = 'index.html';
}