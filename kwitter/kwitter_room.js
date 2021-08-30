
var firebaseConfig = {
      apiKey: "AIzaSyDMaRTnt887iAP6LWYnpBjobkr7wxX7e-E",
      authDomain: "kwitterbase-58f70.firebaseapp.com",
      databaseURL: "https://kwitterbase-58f70-default-rtdb.firebaseio.com",
      projectId: "kwitterbase-58f70",
      storageBucket: "kwitterbase-58f70.appspot.com",
      messagingSenderId: "146705042585",
      appId: "1:146705042585:web:ff6f59821c9c3217be3c08",
      measurementId: "G-FHW59D48NV"
    };
    firebase.initializeApp(firebaseConfig);

var user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome, " + user_name + "!";

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "Adding Room Name"
      });
      localStorage.setItem("room_name", room_name);
      window.location.replace("kwitter_page.html");
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room name - " + Room_names);
      row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomName(this.id)'> #" + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location.replace("kwitter_page.html");
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}

