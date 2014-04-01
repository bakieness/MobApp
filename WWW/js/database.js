// JavaScript Document
var db = window.openDatabase('mydb', '1.0', 'AlarmDatabase', 1024*1024 * 500);

//insert function - add page
function AddDB()
{
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");
	var $repeat = window.localStorage.getItem("repeat");
	
	db.transaction(function(tx) 
	{
		tx.executeSql('CREATE TABLE IF NOT EXISTS ALARMS (id unique, title, type, date, time, repeat)');
		tx.executeSql('INSERT INTO ALARMS (title, type) VALUES ("thing", "Other")');
	})
}
//select & display function - index page 
function GetAlarms()
{
	//alert("test");
	db.transaction(function (tx) 
	{
		tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results)
		{
			
			var len = results.rows.length, i;
			for (i = 0; i < len; i++)
			{	
			var thing = document.createElement("div")
			thing.setAttribute('id', 'alarm');
			thing.setAttribute('onClick', 'window.location = "index.html#details"');
			
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
			
			document.body.appendChild(thing);
			}
		})
	})
}

//delete function - from detail page