// AI Crowd Prediction
function updatePrediction() {
  const result = document.getElementById("predictionResult");
  const slots = ["6AM-8AM","9AM-11AM","12PM-2PM","3PM-5PM","6PM-8PM"];
  const lowCrowd = slots[Math.floor(Math.random()*slots.length)];
  result.innerHTML = "Suggested Slot with low crowd: <strong>" + lowCrowd + "</strong>";
}
updatePrediction();
setInterval(updatePrediction, 7000);

// Live Crowd Counter
function updateLiveCounter() {
  const counterBox = document.getElementById("counterBox");
  let visitors = Math.floor(Math.random() * 3000);
  let cls;
  if(visitors < 1000) cls="safe";
  else if(visitors < 2500) cls="moderate";
  else cls="danger";

  counterBox.className = "counter " + cls;
  counterBox.innerText = visitors + " devotees currently inside";
}
updateLiveCounter();
setInterval(updateLiveCounter, 5000);

// SOS Button
document.getElementById("sosButton").addEventListener("click", function() {
  alert("📞 Calling Staff Council: +91 9876543210");
});

// AI Chatbox Simulation
function askAI() {
  const input = document.getElementById("chatInput").value.toLowerCase();
  const responseBox = document.getElementById("chatResponse");
  if(input.includes("crowd") || input.includes("slot")) {
    const slots = ["6AM-8AM","9AM-11AM","12PM-2PM","3PM-5PM","6PM-8PM"];
    const safeSlot = slots[Math.floor(Math.random()*slots.length)];
    responseBox.innerHTML = "AI Suggestion: Consider visiting at <strong>" + safeSlot + "</strong> to avoid crowd.";
  } else if(input.includes("safe") || input.includes("emergency")) {
    responseBox.innerHTML = "AI Tip: Always follow staff instructions and use SOS button if needed.";
  } else {
    responseBox.innerHTML = "AI: Sorry, I can only provide guidance on crowd levels and safety.";
  }
}

// Time Slot Booking Simulation
function bookSlot() {
  const slot = document.getElementById("slotSelect").value;
  alert("✅ Slot " + slot + " booked successfully! Please reach on time.");
}
