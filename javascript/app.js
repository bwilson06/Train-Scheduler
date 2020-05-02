console.log(moment().format('HH:mm:ss a'));
var trainName = ''
var destination = ''
var frequency;
var firstTrain = ''


var config = {
    apiKey: "AIzaSyC0DWE1pTO0iWUnd1yBb-92wuSfmb1FW9g",
    authDomain: "uw-bootcamp-bw.firebaseapp.com",
    databaseURL: "https://uw-bootcamp-bw.firebaseio.com",
    projectId: "uw-bootcamp-bw",
    storageBucket: "uw-bootcamp-bw.appspot.com"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#add-train").on("click", function(){
        event.preventDefault()
        trainName = $("#name-input").val().trim()
        destination = $("#destination").val().trim()
        frequency = $("#frequency").val().trim()
        firstTrain = $(".datetimepicker-input").val().trim()
        

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrain,
          });
          
    })

    function update() {
       var realTime = moment().format('HHmm');
        database.ref().update({
        realWorldTime : realTime
        });
    }

    

    

    database.ref().on("child_added", function(childSnapshot) {

        var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
        console.log(firstTrainNew)
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        console.log(remainder)
        var minAway = childSnapshot.val().frequency - remainder;
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        
        $(".table").append('<tr><td>' + childSnapshot.val().trainName + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().frequency + '</td>' + '<td>' + nextTrain + '</td>' +  '<td>' + minAway + '</td>' + '</tr>')

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code)
    });

    setInterval(update, 1000)
   
   
