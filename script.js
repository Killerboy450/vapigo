function openMap() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (from === "" || to === "") {
    alert("Please enter both pickup and destination");
    return;
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(from)}+to+${encodeURIComponent(to)}&output=embed`;

  document.getElementById("map").src = mapUrl;
}
function calculateFare() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (from === "" || to === "") {
    alert("Please enter both pickup and destination");
    return;
  }

  // Demo distance logic (random but realistic)
  const distance = (Math.random() * 10 + 2).toFixed(1); // 2–12 km

  // Fare calculation (bike taxi style)
  const baseFare = 20;
  const perKmRate = 8;
  const fare = Math.round(baseFare + distance * perKmRate);

  // Show results
  document.getElementById("distance").innerText = distance;
  document.getElementById("fare").innerText = fare;
  document.getElementById("fareBox").style.display = "block";

  // Load route map
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(from)}+to+${encodeURIComponent(to)}&output=embed`;
  document.getElementById("map").src = mapUrl;
}


console.log("Vapigo script loaded");
