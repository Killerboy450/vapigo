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
async function showMap() {

const pickup = document.getElementById("pickup").value;
const drop = document.getElementById("drop").value;

if (!pickup || !drop) {
alert("Enter pickup and drop location");
return;
}

// Show map
let mapURL =
"https://www.google.com/maps?q=" +
encodeURIComponent(pickup + " to " + drop) +
"&output=embed";

let mapFrame = document.getElementById("mapFrame");

mapFrame.src = mapURL;
mapFrame.style.display = "block";


// Convert address to coordinates using Nominatim (free)
let pickupGeo = await fetch(
"https://nominatim.openstreetmap.org/search?format=json&q=" +
encodeURIComponent(pickup)
).then(res => res.json());

let dropGeo = await fetch(
"https://nominatim.openstreetmap.org/search?format=json&q=" +
encodeURIComponent(drop)
).then(res => res.json());

if (!pickupGeo.length || !dropGeo.length) {
alert("Location not found");
return;
}

let pickupLat = pickupGeo[0].lat;
let pickupLon = pickupGeo[0].lon;

let dropLat = dropGeo[0].lat;
let dropLon = dropGeo[0].lon;


// Get real driving distance using OSRM (FREE)
let route = await fetch(
`https://router.project-osrm.org/route/v1/driving/${pickupLon},${pickupLat};${dropLon},${dropLat}?overview=false`
).then(res => res.json());

let distanceMeters = route.routes[0].distance;

let distanceKm = (distanceMeters / 1000).toFixed(2);


// Fare calculation
let baseFare = 30;
let perKmRate = 10;

let fare = Math.round(baseFare + (distanceKm * perKmRate));


// Display results
document.getElementById("distanceText").innerText =
distanceKm + " km";

document.getElementById("fareText").innerText =
fare;

document.getElementById("fareBox").style.display =
"block";

}
