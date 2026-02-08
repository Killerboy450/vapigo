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

  if (!from || !to) {
    alert("Please enter pickup and destination");
    return;
  }

  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [from],
      destinations: [to],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    },
    function (response, status) {
      if (status !== "OK") {
        alert("Google Maps error: " + status);
        return;
      }

      const element = response.rows[0].elements[0];

      if (element.status !== "OK") {
        alert("Route not found");
        return;
      }

      const distanceKm = element.distance.value / 1000;

      // TEMP: just show distance (test)
      document.getElementById("distance").innerText =
        distanceKm.toFixed(2);

      document.getElementById("fareBox").style.display = "block";
    }
  );
}


console.log("Vapigo script loaded");
