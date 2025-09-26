// Login and region selection
const regions = ["Delhi", "Mumbai", "Varanasi", "Chennai", "Ayodhya"];
const temples = {
  Delhi: [
    {name:"Akshardham", desc:"Grand Hindu temple with stunning architecture."},
    {name:"Lotus Temple", desc:"Bahá'í house of worship known for its flower-like shape."},
    {name:"ISKCON Temple", desc:"Popular Hare Krishna temple with cultural programs."}
  ],
  Mumbai: [
    {name:"Siddhivinayak", desc:"Famous Lord Ganesha temple."},
    {name:"Mumbadevi", desc:"Historic temple dedicated to goddess Mumbadevi."}
  ],
  Varanasi: [{name:"Kashi Vishwanath", desc:"Sacred Shiva temple."}],
  Chennai: [{name:"Kapaleeshwarar", desc:"Dravidian architecture temple."}],
  Ayodhya:[{name:"Ram Janmabhoomi", desc:"Birthplace of Lord Rama."}]
};

let loggedInUser = null;
let selectedRegion = null;
let selectedTemple = null;
let registeredSlots = {};

const regionListEl = document.getElementById('region-list');
regions.forEach(r=>{
  const div = document.createElement('div');
  div.className = 'card';
  div.textContent = r;
  div.onclick = () => selectRegion(r);
  regionListEl.appendChild(div);
});

function login() {
  const name = document.getElementById('username').value.trim();
  if(!name) { alert("Enter your name"); return; }
  loggedInUser = name;
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('region-section').style.display = 'block';
}

function selectRegion(region){
  selectedRegion = region;
  document.getElementById('region-section').style.display = 'none';
  document.getElementById('temple-region-header').textContent = `Temples in ${region}`;
  renderTemples(region);
  document.getElementById('temple-section').style.display = 'block';
}

function renderTemples(region){
  const templeList = document.getElementById('temple-list');
  templeList.innerHTML = '';
  (temples[region] || []).forEach(t=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${t.name}</h3><p>${t.desc}</p>`;
    card.onclick = () => selectTemple(t);
    templeList.appendChild(card);
  });
}

function selectTemple(temple){
  selectedTemple = temple;
  const details = document.getElementById('temple-details');
  details.style.display = 'block';
  details.innerHTML = `<h2>${temple.name}</h2><p>${temple.desc}</p>
    <button onclick="showRegistration()">Register / Aarti</button>`;
  scrollToElement(details);
}

// Registration & AI less crowded slot simulation
function showRegistration(){
  document.getElementById('registration-section').style.display = 'block';
  populateSlots();
  scrollToElement(document.getElementById('registration-section'));
}

function populateSlots(){
  const slotSelect = document.getElementById('aarti-slot');
  slotSelect.innerHTML = '';
  const slots = [
    '6:00 AM - 7:00 AM',
    '7:30 AM - 8:30 AM',
    '9:00 AM - 10:00 AM',
    '5:00 PM - 6:00 PM',
    '7:00 PM - 8:00 PM'
  ];
  slots.forEach(s => {
    const option = document.createElement('option');
    const lessCrowded = Math.random() > 0.6;
    option.value = s;
    option.textContent = s + (lessCrowded ? " (Less Crowded)" : "");
    if(lessCrowded){ option.style.color = "green"; option.style.fontWeight = "bold"; }
    slotSelect.appendChild(option);
  });
}

function register(){
  const date = document.getElementById('aarti-date').value;
  const slot = document.getElementById('aarti-slot').value;
  if(!date || !slot){ alert('Select date and slot'); return; }
  const key = `${selectedTemple.name}-${date}-${slot}`;
  let count = registeredSlots[key] || 0;
  if(count >= 3000){ alert("Slot full"); return; }
  registeredSlots[key] = count + 1;
  showNotification(`Registered for ${selectedTemple.name} on ${date} at ${slot}`);
}

// Notification
function showNotification(msg){
  const note = document.getElementById('notification');
  note.style.display = 'block';
  note.textContent = msg;
  setTimeout(()=>{note.style.display='none';},5000);
}

// Live Crowd Counter
function updateLiveCounter(){
  const counterBox = document.getElementById("counterBox");
  let visitors = Math.floor(Math.random()*3000);
  let cls;
  if(visitors < 1000) cls="safe";
  else if(visitors < 2500) cls="moderate";
  else cls="danger";
  counterBox.className = "counter " + cls;
  counterBox.innerText = visitors + " devotees inside";
}
updateLiveCounter();
setInterval(updateLiveCounter,5000);

// AI Crowd Prediction
function updatePrediction(){
  const result = document.getElementById("predictionResult");
  const slots = ["6AM-8AM","9AM-11AM","12PM-2PM","3PM-5PM","6PM-8PM"];
  const lowCrowd = slots[Math.floor(Math.random()*slots.length)];
  result.innerHTML = "Suggested less crowded slot: <strong>"+lowCrowd+"</strong>";
}
updatePrediction();
setInterval(updatePrediction,7000);

// SOS & AI Guidance
function raiseSOS(){ alert("SOS Alert sent to temple staff!"); }

function askAI(){
  const input = document.getElementById("chatInput").value.toLowerCase();
  const response = document.getElementById("chatResponse");
  if(input.includes("crowd") || input.includes("slot")){
    const slots = ["6AM-8AM","9AM-11AM","12PM-2PM","3PM-5PM","6PM-8PM"];
    const safeSlot = slots[Math.floor(Math.random()*slots.length)];
    response.innerHTML = `AI Suggestion: Visit at <strong>${safeSlot}</strong>`;
  } else { response.innerHTML = "AI: I can guide only on crowd/safety."; }
}

// Smooth scroll
function scrollToElement(el){ el.scrollIntoView({behavior:"smooth"}); }
