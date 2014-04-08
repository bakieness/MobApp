// JavaScript Document
var db = window.openDatabase('myDB', '1.0', 'myDb', 1024 * 1024 * 500);
	if (window.localStorage.getItem("new") === null)
	{
		db.transaction(function(tx) 
		{
			tx.executeSql('CREATE TABLE ALARMS (id unique, title, type, date, time, repeat)');
		});
		window.localStorage.setItem("new", "notnow");
		window.localStorage.setItem("i", 0);
	}
	

function AddDB()
{
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
	});
}

 
function GetAlarms()
{
	db.transaction(function (tx) 
	{
		tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results)
		{
			
			var len = results.rows.length, i;
			for (i = 0; i < len; i++)
			{	
			var thing = document.createElement("div")
			thing.setAttribute('id', i);
			thing.setAttribute('onClick', 'window.location = "index.html#Details"; ShowDetails(this)');
			
			var a = document.createElement("p");
			var b = document.createElement("p");
			var c = document.createElement("p");
			var d = document.createElement("p");
			-
			a.setAttribute('id', 'p1');
			b.setAttribute('id', 'p2');
			c.setAttribute('id', 'p3');
			d.setAttribute('id', 'p4');
			
			var t=document.createTextNode(results.rows.item(i).title);
			var q=document.createTextNode(results.rows.item(i).type);
			var w=document.createTextNode(results.rows.item(i).date);
			var e=document.createTextNode(results.rows.item(i).time);
			
			a.appendChild(t);
			b.appendChild(q);
			c.appendChild(w);
			d.appendChild(e);
			
			thing.appendChild(a);
			thing.appendChild(b);
			thing.appendChild(c);
			thing.appendChild(d);
			
			if (results.rows.item(i).title == null && results.rows.item(i).type == null)
			{
				thing.style.display = 'none';
			}
			
			switch (results.rows.item(i).type)
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
			$content = document.getElementById("contenthome");
			$content.appendChild(thing);
			}
		})
	})
}

function deleteAlarm(aid)
{
	alert(aid);
/*	db.transaction(function (tx) 
	{
		tx.executeSql('DELETE * FROM ALARMS WHERE id = ?', [aid], function (tx, results)
		{
			alert("ALARM DELETED");
		})
	});*/
}

function ShowDetails(alarm)
{
	var p1 = document.createTextNode(alarm.getElementsByTagName('p')[0].innerHTML);
	var p2 = document.createTextNode(alarm.getElementsByTagName('p')[1].innerHTML);
	var p3 = document.createTextNode(alarm.getElementsByTagName('p')[2].innerHTML);
	var p4 = document.createTextNode(alarm.getElementsByTagName('p')[3].innerHTML);
	
	//do styling here like above
	$content = document.getElementById("details");
	$content.appendChild(p1);
	$content.appendChild(p2);
	$content.appendChild(p3);
	$content.appendChild(p4);
	
	var aid = alarm.id;
	alert(aid);
	db.transaction(function (tx) 
	{
		tx.executeSql('SELECT * FROM ALARMS WHERE (id = ?)', [aid], function (tx, results)
		{
			alert(results.rows.length);
			for(var i=0; i<results.rows.length; i++) 
			{	
			var details = document.createTextNode(results.rows.item(i).type);
			alert(results.rows.item(i).type);
			}
		})
	});
	
	del = document.getElementById("delbtn");
	del.setAttribute('onClick', 'window.location = "index.html"; deleteAlarm(aid)');
}