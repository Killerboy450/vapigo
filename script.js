function bookRide() {

const name = document.getElementById("name").value;
const mobile = document.getElementById("mobile").value;
const pickup = document.getElementById("pickup").value;
const drop = document.getElementById("drop").value;

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

let message =
"New Booking:%0A" +
"Name: " + name + "%0A" +
"Mobile: " + mobile + "%0A" +
"Pickup: " + pickup + "%0A" +
"Drop: " + drop;

let whatsappNumber = "916359495943";  // YOUR WHATSAPP NUMBER

let whatsappURL =
"https://wa.me/" + whatsappNumber + "?text=" + message;

window.open(whatsappURL, "_blank");

});
}
