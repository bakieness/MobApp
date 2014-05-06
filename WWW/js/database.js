// JavaScript Document
document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady() {
	alert("hdeu");
	var db = window.openDatabase('myDB2', '1.0', 'myDb', 1024 * 1024 * 500);
	alert("hi2");
	db.transaction(function(tx) 
		{
			tx.executeSql('CREATE TABLE ALARMS (id unique, title, type, date, time, repeat)');
		});
	alert("hi3");	
	if (window.localStorage.getItem("new") === null)
		{
			window.localStorage.setItem("new", "notnow");
			window.localStorage.setItem("i", 0);
		}
	alert("hi4");
    GetAlarms();
}

function AddDB()
{
	var db = window.openDatabase('myDB2', '1.0', 'myDb', 1024 * 1024 * 500);
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
	alert("ste");
	var db = window.openDatabase('myDB2', '1.0', 'myDb', 1024 * 1024 * 500);
	db.transaction(function (tx) 
	{
		tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results)
		{
			var len = results.rows.length, i;
			for (i = 0; i < len; i++)
			{	
			var newDiv = document.createElement("div")
			newDiv.setAttribute('id', i);
			newDiv.setAttribute('onClick', 'window.location = "index.html#Details"; ShowDetails(this)');
			
			var a = document.createElement("p");
			var b = document.createElement("p");
			var c = document.createElement("p");
			var d = document.createElement("p");
			
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
			alert(document);
			
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
	del.setAttribute('onClick', 'window.location = "index.html"; deleteAlarm()');
}

function deleteAlarm()
{
	var db = window.openDatabase('myDB2', '1.0', 'myDb', 1024 * 1024 * 500);
	alert("hi");
	alert(db);
	
	db.transaction(function (tx) 
	{
		var aid = "3";
		alert(aid);
		alert(tx);
		tx.executeSql('DELETE FROM ALARMS', [], 
			function (tx, results)
			{
				alert("ALARM DELETED");
			},
			function (error)
			{
				alert("fh");
			}
		)
	});
	alert("hf")
}