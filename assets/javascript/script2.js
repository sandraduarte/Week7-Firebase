// Initialize Firebase

  var config = {
       apiKey: "AIzaSyB0f-RS2FJtEwBgcm29XiR2MLFDqGNZSRQ",
       authDomain: "train-scheduler-75a02.firebaseapp.com",
       databaseURL: "https://train-scheduler-75a02.firebaseio.com",
       storageBucket: "train-scheduler-75a02.appspot.com",
       messagingSenderId: "463271566581"
   };
   firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();

// Initial value
var train = {
	name: "",
	destination: "",
	frequency: "",
	startTime:"",
	dateAdded: firebase.database.ServerValue.TIMESTAMP
};


// Submit Button Click
$("#submit").on("click", function() {

	// Code in the logic for storing and retrieving the most recent employee.
	train.name = $("#train-name").val().trim();
	train.destination = $("#train-destination").val().trim();
	train.startTime = $("#first_train-time").val().trim();
	train.frequency = $("#train-frequency").val().trim();

	
    // Save new value to Firebase
	database.ref().push(train);

	// Don't refresh !
	return false;
});

database.ref().on("child_added", function(childSnapshot) {
	
	var train = childSnapshot.val();
	var row = $("<tr>");
	var colName = $("<td>").html(train.name);
	var colDestination = $("<td>").html(train.destination);
	var colFrequency = $("<td>").html(train.frequency);

	// Assumptions
		var tFrequency = train.frequency;
		var firstTime = train.startTime; // Time is 3:30 AM
        console.log("tf " + tFrequency+ " ft " + firstTime);
		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinRemaining = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinRemaining);

		// Next Train
		var nextTrain = moment().add(tMinRemaining, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


	var colNextTrain = $("<td>").html(moment(nextTrain).format("hh:mm"));
	var colMinutesTillTrain = $("<td>").html(tMinRemaining);

	row.append(colName).append(colDestination).append(colFrequency)
	    .append(colNextTrain).append(colMinutesTillTrain);
	$("#train-table").append(row);
});