async function showMap() {

const pickupInput = document.getElementById("pickup").value;
const dropInput = document.getElementById("drop").value;

if (!pickupInput || !dropInput) {
alert("Enter pickup and drop location");
return;
}

// Add city/country automatically for better accuracy
const pickup = pickupInput + ", Gujarat, India";
const drop = dropInput + ", Gujarat, India";


// Show Google Map
let mapURL =
"https://www.google.com/maps?q=" +
encodeURIComponent(pickup + " to " + drop) +
"&output=embed";

let mapFrame = document.getElementById("mapFrame");

mapFrame.src = mapURL;
mapFrame.style.display = "block";


try {

// Get pickup coordinates
let pickupGeoResponse = await fetch(
"https://nominatim.openstreetmap.org/search?format=json&q=" +
encodeURIComponent(pickup),
{
headers: {
"Accept": "application/json"
}
}
);

let pickupGeo = await pickupGeoResponse.json();


// Get drop coordinates
let dropGeoResponse = await fetch(
"https://nominatim.openstreetmap.org/search?format=json&q=" +
encodeURIComponent(drop),
{
headers: {
"Accept": "application/json"
}
}
);

let dropGeo = await dropGeoResponse.json();


if (pickupGeo.length === 0 || dropGeo.length === 0) {

document.getElementById("distanceText").innerText =
"Unable to calculate distance";

document.getElementById("fareText").innerText =
"Unable to calculate fare";

document.getElementById("fareBox").style.display =
"block";

return;
}


// Coordinates
let pickupLat = pickupGeo[0].lat;
let pickupLon = pickupGeo[0].lon;

let dropLat = dropGeo[0].lat;
let dropLon = dropGeo[0].lon;


// Get route distance
let routeResponse = await fetch(
`https://router.project-osrm.org/route/v1/driving/${pickupLon},${pickupLat};${dropLon},${dropLat}?overview=false`
);

let route = await routeResponse.json();

let distanceMeters = route.routes[0].distance;

let distanceKm = (distanceMeters / 1000).toFixed(2);


// Fare calculation
let baseFare = 30;
let perKmRate = 10;

let fare = Math.round(baseFare + (distanceKm * perKmRate));


// Show results
document.getElementById("distanceText").innerText =
distanceKm + " km";

document.getElementById("fareText").innerText =
fare;

document.getElementById("fareBox").style.display =
"block";

} catch (error) {

document.getElementById("distanceText").innerText =
"Error calculating distance";

document.getElementById("fareText").innerText =
"Error calculating fare";

document.getElementById("fareBox").style.display =
"block";

}

}
