function bookRide(){
fetch("https://vapigo-backend.onrender.com/book_cab",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
pickup:document.getElementById("pickup").value,
drop:document.getElementById("drop").value
})
})
.then(r=>r.json())
.then(d=>document.getElementById("message").innerText="Booking successful!");
}
