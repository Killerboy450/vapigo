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


// FREE distance calculation using straight-line fallback
try {

// Use OpenStreetMap geocoding
let pickupRes = await fetch(
"https://nominatim.openstreetmap.org/search?format=json&limit=1&q="
+ encodeURIComponent(pickup + ", Gujarat, India")
);

let pickupData = await pickupRes.json();

let dropRes = await fetch(
"https://nominatim.openstreetmap.org/search?format=json&limit=1&q="
+ encodeURIComponent(drop + ", Gujarat, India")
);

let dropData = await dropRes.json();

if (!pickupData.length || !dropData.length) {
throw new Error("Location not found");
}

// Coordinates
let lat1 = parseFloat(pickupData[0].lat);
let lon1 = parseFloat(pickupData[0].lon);

let lat2 = parseFloat(dropData[0].lat);
let lon2 = parseFloat(dropData[0].lon);


// Haversine formula for real-world distance approximation
let R = 6371;

let dLat = (lat2 - lat1) * Math.PI / 180;
let dLon = (lon2 - lon1) * Math.PI / 180;

let a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(lat1 * Math.PI/180) *
Math.cos(lat2 * Math.PI/180) *
Math.sin(dLon/2) * Math.sin(dLon/2);

let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

let distanceKm = (R * c * 1.3).toFixed(2); 
// multiply 1.3 to approximate driving distance


// Fare calculation
let baseFare = 30;
let perKmRate = 10;

let fare = Math.round(baseFare + (distanceKm * perKmRate));


// Display
document.getElementById("distanceText").innerText =
distanceKm + " km";

document.getElementById("fareText").innerText =
fare;

document.getElementById("fareBox").style.display =
"block";

}
catch(error) {

document.getElementById("distanceText").innerText =
"Enter valid locations";

document.getElementById("fareText").innerText =
"0";

document.getElementById("fareBox").style.display =
"block";

}

}
