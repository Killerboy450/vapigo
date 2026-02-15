function bookRide() {

const name = document.getElementById("name").value;
const mobile = document.getElementById("mobile").value;
const pickup = document.getElementById("pickup").value;
const drop = document.getElementById("drop").value;

if (!pickup || !drop) {
alert("Please enter pickup and drop location");
return;
}

// Save booking
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

// Show map inside website
let mapURL =
"https://www.google.com/maps?q=" +
encodeURIComponent(pickup + " to " + drop) +
"&output=embed";

let mapFrame = document.getElementById("mapFrame");

mapFrame.src = mapURL;
mapFrame.style.display = "block";

});
}
