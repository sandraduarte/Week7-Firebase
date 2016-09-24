   





   // Initialize Firebase
   var config = {
       apiKey: "AIzaSyB0f-RS2FJtEwBgcm29XiR2MLFDqGNZSRQ",
       authDomain: "train-scheduler-75a02.firebaseapp.com",
       databaseURL: "https://train-scheduler-75a02.firebaseio.com",
       storageBucket: "train-scheduler-75a02.appspot.com",
       messagingSenderId: "463271566581"
   };
   firebase.initializeApp(config);

// Set up database storage
   var database = firebase.database();

   var trainname = "";
   var destination = "";
   var starttime = "";
   var frequency = "";
   var minutesaway = "";
   var nextarrival = "";

   // On pressing submit, run timeCalc() function.
   // Capture User Inputs and store into variables

   $("#submit").on("click", function() {

       trainname = $('#train-name').val();
       destination = $('#train-destination').val();
       starttime = " " + ($('#first-train-time').val());
       frequency = $('#train-frequency').val();

       var today = moment(new Date(moment())).format("MM/DD/YYYY");
       // 09/19/2016
       var todaystarttime = moment(new Date(today + starttime)).format("MM/DD/YYYY HH:mm"); // 09/19/2016 00:00
       var value = moment(todaystarttime).add(frequency, 'minutes').format("MM/DD/YYYY HH:mm");
       // 09/19/2016 01:00

       function timeCalc(frequency) {

           for (var x = 1; x <= 1440; x++)
               if (todaystarttime < moment().format("MM/DD/YYYY HH:mm")) {
                   todaystarttime = moment(todaystarttime).add(frequency, 'minutes').format("MM/DD/YYYY HH:mm"); // 09/19/2016 01:00}
               } 
               else if (todaystarttime > moment().format("MM/DD/YYYY HH:mm")) { nextarrival = todaystarttime;
               minutesaway = moment(todaystarttime).diff(moment(), 'minutes');
               break; 
             }
       }
       timeCalc();



       // push information to database
       database.ref().push({
           trainname: trainname,
           destination: destination,
           starttime: starttime,
           frequency: frequency,
           nextarrival: moment(nextarrival).format("HH:mm"),
           minutesaway: minutesaway,

           dateAdded: firebase.database.ServerValue.TIMESTAMP
       });

       $('#train-name').val("");
       $('#train-destination').val("");
       $('#first-train-time').val("");
       $('#frequencyinput').val("");

       return false;
   });


   database.ref().on("child_added", function(snapshot) {

       trainname = snapshot.val().trainname;
       destination = snapshot.val().destination;
       frequency = snapshot.val().frequency;

       nextarrival = snapshot.val().nextarrival;
       minutesaway = snapshot.val().minutesaway;

       $("#traindisplay > tbody").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextarrival + "</td><td id =countDown>" + minutesaway + "</td></tr>");
   });







