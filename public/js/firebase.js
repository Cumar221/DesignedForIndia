
var config = {
    apiKey: "AIzaSyBYmzosHMMW50rWLNzR-pBHU3d5Qzqq3bY",
    authDomain: "designed-for-india.firebaseapp.com",
    databaseURL: "https://designed-for-india.firebaseio.com",
    projectId: "designed-for-india",
    storageBucket: "designed-for-india.appspot.com",
    messagingSenderId: "356012265511"
};

firebase.initializeApp(config);

var ref = firebase.database().ref('userCount');
ref.on('value', function(snap) {
    document.getElementById("userCount").innerHTML = snap.val();
});

function pushFirebase() {
    const fb = firebase.database().ref();
    form = document.getElementById("myform");
    thanks = document.getElementById("thankYouDiv");
    errorForm = document.getElementById("orm");


    first_name = document.getElementById("firstNameInput").value;
    last_name = document.getElementById("lastNameInput").value;
    age = document.getElementById("ageInput").value;
    university = document.getElementById("current").innerHTML;
    email = document.getElementById("emailInput").value;
    mobile_number = document.getElementById("mobileNumberInput").value;
    mobile_device= document.getElementById("mobileDeviceInput").value;

    data = {first_name,last_name,age,university,email,mobile_number,mobile_device};

    fb.child('users/').push(data, function(error) {
        if (error)
            console.log('Error has occured during saving process');
        else
            if(errorForm.checkValidity() == true) {
                console.log("Data hss been saved succesfully");

                var userCountRef = fb.child('userCount');
                userCountRef.transaction(function (current_value) {
                    // increment the user count by one
                    return (current_value || 0) + 1;
                });

                form.style.display = "none";
                thanks.style.display = "block";
            }
    });
    return false
}
