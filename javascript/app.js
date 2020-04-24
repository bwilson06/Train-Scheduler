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
        trainName = $("#name-input").val().trim()
        destination = $("#destination").val().trim()
        frequency = $("#frequency").val().trim()
        firstTrain = $("#example-date-input").val().trim()
        console.log(trainName)

    })
   
   
