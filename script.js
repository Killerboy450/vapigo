// Confirm booking and open WhatsApp
function confirmBooking() {

const name = document.getElementById("name").value;
const mobile = document.getElementById("mobile").value;
const pickup = document.getElementById("pickup").value;
const drop = document.getElementById("drop").value;

if (!name || !mobile || !pickup || !drop) {
alert("Please fill all fields");
return;
}

// Save booking in backend
fetch("https://vapigo-backend.onrender.com/book_cab", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name: name,
mobile: mobile,
pickup: pickup,
drop: drop
})

})
.then(response => response.json())
.then(data => {

// WhatsApp message
let message =
"New Booking:%0A" +
"Name: " + name + "%0A" +
"Mobile: " + mobile + "%0A" +
"Pickup: " + pickup + "%0A" +
"Drop: " + drop;

let whatsappNumber = "916359495943"; // your number

let whatsappURL =
"https://wa.me/" + whatsappNumber + "?text=" + message;

window.open(whatsappURL, "_blank");

document.getElementById("message").innerText =
"Booking saved. Please confirm on WhatsApp.";

});
}


// Show map inside website
function showMap() {

const pickup = document.getElementById("pickup").value;
const drop = document.getElementById("drop").value;

if (!pickup || !drop) {
alert("Enter pickup and drop location");
return;
}

let mapURL =
"https://www.google.com/maps?q=" +
encodeURIComponent(pickup + " to " + drop) +
"&output=embed";

let mapFrame = document.getElementById("mapFrame");

mapFrame.src = mapURL;
mapFrame.style.display = "block";

}
