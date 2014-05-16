// JavaScript Document

//creates database
var db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);;

//adds an event listener for the onDeviceReady event, when event happens a function is called
document.addEventListener("deviceready", onDeviceReady, false);

//function runs when the onDeviceReady event from the device is fired
function onDeviceReady() {
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	
	//if statment which sets the variable i as 0 if this is the firts time the app is run	
	if (window.localStorage.getItem("new") === null)
		{
			var notification_count=0;
			window.localStorage.setItem("new", "notnow");
			window.localStorage.setItem("i", 0);
		}
	
	//database query to create the table to store alarms
	db.transaction(function(tx) 
		{
			
			//simple SQL script to create table
			tx.executeSql('CREATE TABLE IF NOT EXISTS ALARMS (id INTEGER PRIMARY KEY ASC, title, type, date, time, repeat)');
		
			//checks to see if a notification is needed for any alarm every minute
			window.setInterval(function() 
			{
				var currentDate = date(); //current date in yyyy/mm/dd format
				var currentTime = time(); //current time in hh:mm format

				//database transaction that gets all rows from the database
				db.transaction(function(tx) {
					tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results) {
						var len = results.rows.length, i;
						
						//this for loop will create a notification if the date and time are the same as any database entries	
						for (i = 0; i < len; i++){
							if (results.rows.item(i).time === currentTime && results.rows.item(i).date === currentDate)
							{
								window.localStorage.setItem("dataid", results.rows.item(i).id);
								createNotification();
							}
						}
						});
					});
			}, 60 * 1000);
			
			//Once table is created this function is called.
			//This function must be here to gurantee it runs after database transactionthis is because database transactions are asynchronous.
			GetAlarms();
		});
}

//this function is called by the add alarm page
//it adds the data inputed by the user into the database
function AddDB()
{
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	
	//gets the informatoin from local storage to be inserted into the database
	var $event = window.localStorage.getItem("event");
	var $type = window.localStorage.getItem("type");
	var $date = window.localStorage.getItem("date");
	var $time = window.localStorage.getItem("time");
	var $repeat = window.localStorage.getItem("repeat");
	
	//increments i for the database id
	var i = window.localStorage.getItem("i");
	i++;
	window.localStorage.setItem("i", i);
	
	//database transaction to add infromation into the database
	db.transaction(function(tx) 
	{
		tx.executeSql('INSERT INTO ALARMS (id, title, type, date, time, repeat) VALUES (?, ?, ?, ?, ?, ?)', [i, $event,$type,$date,$time,$repeat]);
		redirect();
	});
}
 
//this function is called by the onDeviceReady function
//it displays all the alarms in div tags thatv are dynamically created
function GetAlarms()
{	
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	
	//database transaction to select all the rows form the database
	db.transaction(function (tx) 
	{
		tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results)
		{
			//get the length of the database
			var len = results.rows.length, i;
			
			//this for loop creates a div tag for each alarm in the database and appends it to the main page
			for (i = 0; i < len; i++)
			{
				//this creates the blank div and sets the onClick commands
				var newDiv = document.createElement("div")
				newDiv.setAttribute('id', results.rows.item(i).id);
				newDiv.setAttribute('onClick', 'window.location = "index.html#Details"; ShowDetails(this); setid(this)');
				
				//creates 4 paragraph tags to display the data from the database
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
				
				//appends the data to the paragraph tags
				a.appendChild(t);
				b.appendChild(q);
				c.appendChild(w);
				d.appendChild(e);
				
				//appends the paragraph tags to the div
				newDiv.appendChild(a);
				newDiv.appendChild(b);
				newDiv.appendChild(c);
				newDiv.appendChild(d);
				
				//this switch statment chnages the colour of the div based on the type of alarm
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
				
				//appends the new div to the main page			
				$content = document.getElementById("contenthome");
				$content.appendChild(newDiv);
			}
		})
	})
}

//this function is called when the user navigates to the alarms detail page
//it displays the details of the chosen alarm 
//alarm is passed through here, this is the div tag that the user clicked to get to this page
function ShowDetails(alarm)
{	
	//creates the text to be displayed on the page
	var title = document.createTextNode("Title:");
	var type = document.createTextNode("Type:");
	var date = document.createTextNode("Date:");
	var time = document.createTextNode("Time:");
		
	//uses the div tag passed through to get the alarm information
	var p1 = document.createTextNode(alarm.getElementsByTagName('p')[0].innerHTML);
	var p2 = document.createTextNode(alarm.getElementsByTagName('p')[1].innerHTML);
	var p3 = document.createTextNode(alarm.getElementsByTagName('p')[2].innerHTML);
	var p4 = document.createTextNode(alarm.getElementsByTagName('p')[3].innerHTML);
	
	//creates div tag for all the information to be stored in
	var newDiv = document.createElement("div");
	
	var a = document.createElement("p");
	var b = document.createElement("p");
	var c = document.createElement("p");
	var d = document.createElement("p");
	var e = document.createElement("p");
	var f = document.createElement("p");
	var g = document.createElement("p");
	var h = document.createElement("p");
	
	//styles the text to make the headings bold and allign to the center
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
	
	//appends all the text to the div tag
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
	
	//appends the new div to the page once the page has been cleared
	$content = document.getElementById("details");
	$content.innerHTML = "";
	$content.appendChild(newDiv);
	
	//creates a delete button so the user can delete the alarm if they want
	del = document.getElementById("delbtn");
	del.setAttribute('onClick', 'deletedata()');
}

//deletes data from database
function deletedata()
{
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	
	//gets the id of the row to be deleted and convers the string to a number
	var id = window.localStorage.getItem("dataid");
	var n = Number(id);
	
	//database transaction to delete alarm and take the user back to the main page
	db.transaction(function (tx) {
		tx.executeSql("DELETE FROM ALARMS WHERE id=?", [n]);
		window.location = 'index.html';
		});
}

//gets the database id value from the div tag clicked
function setid(div)
{
	//checks to see when the page is clicked
	$(document.body).click(function(evt)
	{
		//gets the id target of the click
		var clicked = evt.target;
		var currentID = clicked.id;
		
		//converts the string containing the id into a number
		dataid = parseInt(currentID);
		
		//checks to make sure the id is now a number
		if (typeof dataid === 'number')
		{
			//stores the id in local storage in case the user wants to delete the alarm
			window.localStorage.setItem("dataid", dataid);
		}
	})	
}

//function is called once the notification has been dismissed by the user
function alertDismiss()
{
	db = window.openDatabase("myDB2", "1.0", "myDb", 1024 * 1024);
	
	//gets current date and time
	var currentTime = time();
	var currentDate = date();
	
	//database transaction to get all rows in the database 
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM ALARMS', [], function (tx, results) {
			var len = results.rows.length, i;

			//this for loop gets all results where the date and time are the same
			for (i = 0; i < len; i++){
				if (results.rows.item(i).date === currentDate && results.rows.item(i).time === currentTime)
				{
					//if the alarm has a repeat the date is incremented by a week and the database updated
					if (results.rows.item(i).repeat !== 'Once')
					{
						var newDate = datePlusWeek();
						db.transaction(function(tx) {
							tx.executeSql("UPDATE ALARMS SET date=? WHERE date=? AND time=?", [newDate, currentDate, currentTime])
						});
					}
				}
			}
		});
	});
}

//gets the current date
function date()
{
	//gets the current date 
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0
	var yyyy = today.getFullYear();
	
	//if the month or day is more than 10 a 0 is added to the start
	if(dd<10) 
	{
		dd='0'+dd
	} 
	if(mm<10) 
	{
		mm='0'+mm
	} 
	
	//sets date format
	today = yyyy+'-'+mm+'-'+dd;
	
	//returns the date
	return today;
}

function datePlusWeek()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0
	var yyyy = today.getFullYear();
	
	//if the month or day is more than 10 a 0 is added to the start
	if(dd<10) 
	{
		dd='0'+dd
	} 
	if(mm<10) 
	{
		mm='0'+mm
	} 
	
	switch (mm)
	{
		case "01":
			if (dd < 25)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 31;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "02":
			if (dd < 22)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 28;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "03":
			if (dd < 25)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 31;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "04":
		if (dd < 24)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 30;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "05":
		if (dd < 25)
			{
				dd = dd + 7;
			}
			else
			{
				mm = mm + 1;
				dd = (dd + 7) - 31;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "06":
		if (dd < 24)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 30;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "07":
		if (dd < 25)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 31;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "08":
		if (dd < 24)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 30;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "09":
		if (dd < 24)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 30;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "10":
		if (dd < 25)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 31;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
		
		case "11":
		if (dd < 24)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 30;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
			
		case "12":
		if (dd < 25)
			{
				dd + 7;
			}
			else
			{
				mm + 1;
				(dd + 7) - 31;
				yyyy + 1;
			}
			//sets date format
			today = yyyy+'-'+mm+'-'+dd;
	
			//returns the date
			return today;
			break;
	}
}

//gets the current time of day
function time() 
{
	//get the current time and returns it
    var date = new Date();
    var mins = date.getMinutes();	
    var hours = date.getHours();

	if(mins<10)
	{
		mins='0'+mins
	}
	if(hours<10)
	{
		hours='0'+hours
	}

	var currentTime = hours + ":" + mins;
	return currentTime;
}

//this function is called when the user wants to go to the main page
//it makes the page reload makeing sure that the list of alarms is refreshed
function redirect()
{
	window.location = 'index.html';
}

function createNotification()
{
	var now = new Date().getTime(); //current time in milliseconds
	var notificationTime = new Date(now + 3000); //delayed time
				
	//uses a plugin to create notifications for alarms
	window.plugin.notification.local.add({
	    id:      1,
	    title:   'Reminder',
	    message: 'Alarm Done',
	    date:    notificationTime,
		});
			
	alertDismiss();
}