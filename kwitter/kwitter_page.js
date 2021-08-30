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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0,
      });
      document.getElementById("msg").value = "";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = " <h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag = " <h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+ firebase_message_id +" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyhpicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id){
      console.log("Clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}
