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


console.log("Vapigo script loaded");
