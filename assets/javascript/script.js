   // Initialize Firebase
var config = {
    apiKey: "AIzaSyB0f-RS2FJtEwBgcm29XiR2MLFDqGNZSRQ",
    authDomain: "train-scheduler-75a02.firebaseapp.com",
    databaseURL: "https://train-scheduler-75a02.firebaseio.com",
    storageBucket: "train-scheduler-75a02.appspot.com",
    messagingSenderId: "463271566581"
  };
  firebase.initializeApp(config);

 // // Initialize Firebase
 //  var config = {
 //    apiKey: "AIzaSyBemqFZMvE5AZaH6F76jwfa1oQRWhWvQkg",
 //    authDomain: "my-project-1-1a47c.firebaseapp.com",
 //    databaseURL: "https://my-project-1-1a47c.firebaseio.com",
 //    storageBucket: "my-project-1-1a47c.appspot.com",
 //    messagingSenderId: "316551187676"
 //  };
 //  firebase.initializeApp(config);

var database = firebase.database();

var trainname = "";
var destination = "";
var starttime = "";
var frequency = "";
var minutesaway="";
var nextarrival="";


$("#submit").on("click", function() {
  // On pressing submit, run timeCalc() function.

	// Capture User Inputs and store into variables
	trainname = $('#trainnameinput').val();
	destination = $('#destinationinput').val();
  starttime = " " + ($('#firsttraininput').val());
	frequency = $('#frequencyinput').val();

var today = moment(new Date(moment())).format("MM/DD/YYYY"); 
// 09/19/2016
var todaystarttime = moment(new Date(today + starttime)).format("MM/DD/YYYY HH:mm"); // 09/19/2016 00:00
var value = moment(todaystarttime).add(frequency, 'minutes').format("MM/DD/YYYY HH:mm");
// 09/19/2016 01:00

function timeCalc(frequency){

for(var x=1; x<=1440; x++)
if(todaystarttime < moment().format("MM/DD/YYYY HH:mm"))
  {todaystarttime =  moment(todaystarttime).add(frequency, 'minutes').format("MM/DD/YYYY HH:mm"); // 09/19/2016 01:00}
  } //nextarrival(todaystarttime);minutesAway(todaystarttime);}
else if(todaystarttime > moment().format("MM/DD/YYYY HH:mm"))
    {nextarrival = todaystarttime; minutesaway = moment(todaystarttime).diff(moment(), 'minutes'); break;}
}
timeCalc(frequency);


// // Timer
// var number = minutesaway;
// var counter = setInterval(decrement, 1000);
// function decrement(){
//   number--;
//   console.log(number);
//   if(number===0)
//     {clearInterval(counter);}
// }


database.ref().push({
	trainname: trainname,
	destination: destination,
	starttime: starttime,
	frequency: frequency,
  nextarrival: moment(nextarrival).format("HH:mm"),
  minutesaway: minutesaway,

  dateAdded: firebase.database.ServerValue.TIMESTAMP
});

$('#trainnameinput').val("");
$('#destinationinput').val("");
$('#firsttraininput').val("");
$('#frequencyinput').val("");

return false;
});



database.ref().on("child_added", function(snapshot){

trainname = snapshot.val().trainname;
destination = snapshot.val().destination;
frequency = snapshot.val().frequency;

nextarrival = snapshot.val().nextarrival;
minutesaway = snapshot.val().minutesaway;

$("#traindisplay > tbody").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextarrival +  "</td><td>" + minutesaway + /* + "</td><td>" + updateButton + "</td><td>"+ removeButton + */ "</td></tr>");
});