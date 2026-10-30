"use strict";
/* ---------- Data ---------- */
const DEF="Contact facility to confirm";
const PH="PhilHealth-accredited hospital (May 31, 2026)";
const OLD="Current status needs confirmation";
const DOH="Listed in DOH regional hospital directory (2025); confirm current license";
const INF="PhilHealth-accredited infirmary/dispensary (May 31, 2026); not a full hospital";
const base={doctors:[],services:[],medicine:DEF,vaccination:DEF,schedule:DEF,phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false};
// [name, town, location, type, sourceStatus]
const rows=[
 ["Davao del Sur Provincial Hospital","Digos","Lapu-Lapu Street, Zone III, Digos City, Davao del Sur","Hospital",PH+"; recent 2026 hospital report"],
 ["Digos Doctors' Hospital, Inc.","Digos","McArthur Highway, Kiagot, Digos City, Davao del Sur","Hospital",PH],
 ["Medical Center of Digos Cooperative Hospital (MCDC)","Digos","National Highway, Tres de Mayo, Digos City, Davao del Sur","Hospital",PH],
 ["Sunga Hospital, Inc.","Digos","3991 Rizal Avenue, Zone III, Digos City, Davao del Sur","Hospital",PH],
 ["Gonzales-Maranan Medical Center, Inc.","Digos","Quezon Avenue, Digos City, Davao del Sur","Hospital",PH],
 ["Dominican Hospital (St. Dominic Hospital of Digos)","Digos","Quezon Avenue, Zone 1, Digos City, Davao del Sur","Hospital",PH],
 ["Alfonso G. Llanos Medical Clinic & Hospital","Digos","Rizal Avenue, Digos City, Davao del Sur","Hospital / medical clinic","Older DOH/city records; current accreditation needs confirmation"],
 ["Gonzales-Maranan Medical Center – Guihing Satellite","Hagonoy","Campo 10, Guihing, Hagonoy, Davao del Sur","Hospital satellite","PhilHealth-accredited hospital satellite (May 31, 2026)"],
 ["Bendijo Hospital / Clinica Rudinas and Hospital","Hagonoy","Hagonoy, Davao del Sur","Hospital / clinic",OLD],
 ["Viacrucis Medical Hospital","Bansalan","Bansalan, Davao del Sur","Hospital",OLD],
 ["Centeno Medical Specialists Hospital, Inc.","Bansalan","R. delos Cientos Street, Poblacion Uno, Bansalan, Davao del Sur","Hospital",DOH],
 ["Mabama Doctors' Hospital","Bansalan","Bonifacio Road, Poblacion 2, Bansalan, Davao del Sur","Hospital",PH],
 ["MedCORE Hospital, Inc.","Santa Cruz","National Highway, Zone II, Santa Cruz, Davao del Sur","Hospital",PH],
 ["Marpe Medical Clinic & Hospital, Inc.","Santa Cruz","Apo Beach, Zone III, Santa Cruz, Davao del Sur","Hospital",PH],
 ["Ralota-Lagrada Medical Clinic","Santa Cruz","Santa Cruz, Davao del Sur","Medical clinic","Older listing; current status needs confirmation"],
 ["Sinawilan Clinic & Hospital","Matanao","Matanao, Davao del Sur","Hospital / clinic","Older public accreditation listing; current status needs confirmation"],
 ["Jose J. Golingay General Hospital, Inc.","Malalag","Malalag, Davao del Sur","Hospital","Older public listing; current status needs confirmation"],
 ["Pineda-Aquino General Hospital","Malalag","Malalag, Davao del Sur","Hospital",OLD],
 ["Saroma Hospital","Malalag","Poblacion, Malalag, Davao del Sur","Hospital",PH],
 ["Asilo Hospital","Padada","Padada, Davao del Sur","Hospital",OLD],
 ["South Davao Medical Specialists' Hospital, Inc.","Padada","Purok 4, Southern Paligue, Padada, Davao del Sur","Hospital",PH],
 ["Baron-Yee Hospital","Padada","Magsaysay Street, Poblacion, Padada, Davao del Sur","Hospital",DOH],
 ["Gregorio Matas District Hospital","Kiblawan","Bucabal Street, Poblacion, Kiblawan, Davao del Sur","Hospital",PH+"; recent 2026 hospital report"],
 ["Diones Hospital","Sulop","Purok 4, Poblacion, Sulop, Davao del Sur","Infirmary / dispensary",INF],
 ["Sulop Medical Clinic","Sulop","Purok 2, Poblacion, Sulop, Davao del Sur","Infirmary / dispensary",INF],
 ["Sulop Municipal Health Building","Sulop","Sulop, Davao del Sur","Municipal health facility","Municipal health facility; not a hospital"],
 ["Magsaysay Medical Healthcare, Inc.","Magsaysay","Purok 5, Barayong, Magsaysay, Davao del Sur","Infirmary / dispensary",INF]
];
const facilities=rows.map((r,i)=>({id:i+1,name:r[0],town:r[1],location:r[2],type:r[3],sourceStatus:r[4],...base}));
const serviceNames={checkup:"General check-up",vaccination:"Vaccination","anti-rabies":"Anti-rabies",dialysis:"Dialysis",cancer:"Cancer care",medicine:"Medicines",laboratory:"Laboratory",emergency:"Emergency"};
const translations={
 en:{heroTitle:"The care you need.<br><em>Closer to home.</em>",heroDesc:"Find hospitals, clinics, and community health services in your area.",searchButton:"Find care",findTitle:"Let's find the right care.",servicesTitle:"What do you need today?"},
 tl:{heroTitle:"Ang pangangalagang kailangan mo.<br><em>Mas malapit sa tahanan.</em>",heroDesc:"Maghanap ng mga ospital, klinika, serbisyong pangkalusugan, at programang pangkomunidad sa iisang lugar.",searchButton:"Maghanap",findTitle:"Hanapin natin ang tamang pangangalaga.",servicesTitle:"Anong serbisyo ang kailangan mo ngayon?"}
};

/* ---------- Helpers ---------- */
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const smooth=()=>reduceMotion?"auto":"smooth";
const searchInput=$("searchInput"),resultsContainer=$("resultsContainer"),emptyState=$("emptyState"),panel=$("servicePanel"),panelList=$("panelList");
const doctorFilter=$("doctorFilter"),serviceFilter=$("serviceFilter"),availabilityFilter=$("availabilityFilter"),scheduleFilter=$("scheduleFilter");
let currentQuery="",selectedService="",lang="en";

function searchable(f){return [f.name,f.town,f.location,f.type,...f.doctors,...f.services.map(s=>serviceNames[s])].join(" ").toLowerCase();}
function matches(f){
 const q=currentQuery.toLowerCase().trim();
 if(q&&!q.split(/\s+/).every(w=>searchable(f).includes(w)))return false;
 if(doctorFilter.value&&!f.doctors.includes(doctorFilter.value))return false;
 if(serviceFilter.value&&!f.services.includes(serviceFilter.value))return false;
 if(selectedService&&!f.services.includes(selectedService))return false;
 if(availabilityFilter.value==="confirmed"&&f.verified!==true)return false;
 if(availabilityFilter.value==="free"&&!f.free.toLowerCase().includes("ask about"))return false;
 if(scheduleFilter.value==="h24"&&f.schedule!=="Open 24 hours")return false;
 if(scheduleFilter.value==="posted"&&f.schedule===DEF)return false;
 return true;
}
const pill=(text,caution)=>'<span class="meta-pill'+(caution?' caution':'')+'">'+esc(text)+'</span>';
function clearServiceSelection(){selectedService="";document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));}

/* ---------- Results ---------- */
function renderResults(){
 const hasSearch=Boolean(currentQuery||doctorFilter.value||serviceFilter.value||availabilityFilter.value||scheduleFilter.value||selectedService);
 resultsContainer.innerHTML="";
 if(!hasSearch){
  resultsContainer.hidden=true;emptyState.hidden=true;
  $("resultCount").textContent="Search first";
  $("resultsTitle").textContent="Search to see facilities";
  $("resultsMessage").textContent="Enter a municipality, barangay, or facility name above to view matching results.";
  return;
 }
 const list=facilities.filter(matches);
 $("resultCount").textContent=list.length+" "+(list.length===1?"place":"places");
 $("resultsMessage").textContent=currentQuery?'Results matching “'+currentQuery+'”':(selectedService?'Facilities listing '+serviceNames[selectedService]:'Browse facilities or search a place above.');
 $("resultsTitle").textContent=selectedService?serviceNames[selectedService]:"Healthcare facilities";
 emptyState.hidden=list.length>0;
 resultsContainer.hidden=list.length===0;
 list.forEach(f=>{
  const card=document.createElement("article");card.className="facility-card";
  const photo=f.photo?'<img class="facility-photo" src="'+esc(f.photo)+'" alt="Exterior photo of '+esc(f.name)+'" loading="lazy" onerror="this.hidden=true">':'<div class="facility-photo-placeholder">Facility photo not yet verified</div>';
  card.innerHTML=photo+'<div class="facility-card-top"><span class="facility-symbol" aria-hidden="true">✚</span><span class="facility-type">'+esc(f.type)+'</span></div><h4>'+esc(f.name)+'</h4><p class="facility-location">⌖ '+esc(f.location)+'</p><div class="facility-meta">'+pill(f.sourceStatus||OLD,false)+pill("Hours: confirm",true)+'</div><div class="facility-card-footer"><span class="fee-preview">Service fees<b>'+esc(f.price)+'</b></span><button class="view-btn" type="button" data-id="'+f.id+'">View details ↗</button></div>';
  resultsContainer.appendChild(card);
 });
}
function showFacility(id){
 const f=facilities.find(x=>x.id===Number(id));if(!f)return;
 $("detailTitle").textContent=f.name;$("detailLocation").textContent=f.location+" · "+f.type;
 $("detailDoctor").textContent=f.doctors.length?f.doctors.join(", "):"Not listed — contact facility";
 $("detailMedicine").textContent=f.medicine;$("detailVaccination").textContent=f.vaccination;$("detailSchedule").textContent=f.schedule;
 $("detailPrice").textContent=f.price;$("detailFree").textContent=f.free;$("detailPhone").textContent=f.phone||"Not listed — verify locally";
 $("detailTags").innerHTML=pill(f.sourceStatus||OLD,true)+pill("Contact facility to confirm it is operating",true);
 const call=$("callFacility");
 if(f.phone){call.href="tel:"+f.phone.replace(/[^+\d]/g,"");call.hidden=false;}else{call.hidden=true;call.removeAttribute("href");}
 $("facilityDetails").hidden=false;
 $("facilityDetails").scrollIntoView({behavior:smooth(),block:"start"});
}
const closeDetails=()=>{$("facilityDetails").hidden=true;};
function fillDoctors(){
 const types=[...new Set(facilities.flatMap(f=>f.doctors))].sort();
 doctorFilter.innerHTML='<option value="">Any specialty</option>'+types.map(d=>'<option value="'+esc(d)+'">'+esc(d)+'</option>').join("");
}
function runSearch(scroll){
 currentQuery=searchInput.value.trim();clearServiceSelection();panel.hidden=true;renderResults();
 if(scroll)$("find").scrollIntoView({behavior:smooth(),block:"start"});
}
function resetFilters(){
 searchInput.value="";currentQuery="";clearServiceSelection();
 [doctorFilter,serviceFilter,availabilityFilter,scheduleFilter].forEach(el=>el.value="");
 renderResults();closeDetails();panel.hidden=true;
}
$("searchForm").addEventListener("submit",e=>{e.preventDefault();runSearch(true);});
$("applyFilters").addEventListener("click",()=>runSearch(true));
[doctorFilter,serviceFilter,availabilityFilter,scheduleFilter].forEach(el=>el.addEventListener("change",()=>runSearch(false)));
$("resetFilters").addEventListener("click",resetFilters);
$("emptyReset").addEventListener("click",resetFilters);
$("closeDetailsBtn").addEventListener("click",closeDetails);
resultsContainer.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)showFacility(b.dataset.id);});

/* ---------- Service panel ---------- */
function renderServicePanel(key){
 const list=facilities.filter(f=>f.services.includes(key));
 $("panelTitle").textContent=serviceNames[key];
 $("panelCount").textContent=list.length+" facilities list this service. Please confirm directly.";
 panelList.innerHTML="";
 if(!list.length){panelList.innerHTML='<div class="panel-empty">No facility is currently listed for this service in this directory. Contact your local health office for referrals.</div>';return;}
 list.forEach(f=>{
  const row=document.createElement("div");row.className="panel-result";
  row.innerHTML='<div><strong>'+esc(f.name)+'</strong><small>'+esc(f.location)+'</small><small>'+esc(f.price)+'</small></div><button class="view-btn" type="button" data-id="'+f.id+'">Details</button>';
  panelList.appendChild(row);
 });
}
document.querySelectorAll(".service-card").forEach(card=>card.addEventListener("click",()=>{
 const key=card.dataset.service;
 selectedService=selectedService===key?"":key;
 document.querySelectorAll(".service-card").forEach(c=>c.classList.toggle("selected",c.dataset.service===selectedService));
 if(!selectedService){panel.hidden=true;currentQuery=searchInput.value.trim();renderResults();return;}
 panel.hidden=false;renderServicePanel(key);
 currentQuery="";searchInput.value="";
 [doctorFilter,serviceFilter,availabilityFilter,scheduleFilter].forEach(el=>el.value="");
 renderResults();
 panel.scrollIntoView({behavior:smooth(),block:"nearest"});
}));
$("panelClose").addEventListener("click",()=>{panel.hidden=true;clearServiceSelection();renderResults();});
panelList.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)showFacility(b.dataset.id);});

/* ---------- Programs ---------- */
const programs=[
 {title:"Free medical consultation",desc:"Ask your barangay health station or municipal health office about the next schedule, eligibility, and venue.",status:"Schedule not yet verified",date:"ASK"},
 {title:"Community vaccination drive",desc:"Contact the local health office to confirm vaccine availability, target groups, dates, and required documents.",status:"Schedule not yet verified",date:"ASK"},
 {title:"Barangay medical mission",desc:"Community organizers may announce check-ups and health screening. Confirm details with your barangay office.",status:"Awaiting official announcement",date:"ASK"}
];
$("programList").innerHTML=programs.map(p=>'<article class="program-item"><div class="program-date"><strong>?</strong>'+esc(p.date)+'</div><div><h4>'+esc(p.title)+'</h4><p>'+esc(p.desc)+'</p><span class="program-status">'+esc(p.status)+'</span></div></article>').join("");

/* ---------- Navigation, language, year ---------- */
const toggle=$("menuToggle"),nav=$("navLinks");
function setMenu(open){nav.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");}
toggle.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));
const navLinks=[...nav.querySelectorAll("a")];
navLinks.forEach(a=>a.addEventListener("click",()=>setMenu(false)));
$("languageBtn").addEventListener("click",()=>{
 lang=lang==="en"?"tl":"en";const dict=translations[lang];
 document.documentElement.lang=lang==="tl"?"fil":"en";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const v=dict[el.dataset.i18n];if(v)el.innerHTML=v;});
 $("languageBtn").textContent=lang==="en"?"Filipino":"English";
 searchInput.placeholder=lang==="en"?"Try Digos, barangay, hospital...":"Subukan ang Digos, barangay, o ospital...";
});
$("year").textContent=new Date().getFullYear();

/* Highlight the nav link of the section currently on screen */
if("IntersectionObserver" in window){
 const spy=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));
 }),{rootMargin:"-45% 0px -50% 0px"});
 navLinks.forEach(a=>{const s=document.querySelector(a.getAttribute("href"));if(s)spy.observe(s);});
}

/* ---------- Scroll float-in (replays every time it re-enters the screen) ---------- */
fillDoctors();renderResults();
const revealTargets=document.querySelectorAll(".hero-content-centered > *,.section-heading,.filter-panel,.results-top,.philhealth-card,.service-card,.program-intro,.program-content,.program-item,.about-art,.about-copy,.about-points > div,.contact-band > div,.contact-band > a");
revealTargets.forEach(el=>el.classList.add("reveal-on-scroll"));
if("IntersectionObserver" in window&&!reduceMotion){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle("is-visible",e.isIntersecting)),{threshold:.1,rootMargin:"0px 0px -40px 0px"});
 revealTargets.forEach(el=>io.observe(el));
}else{revealTargets.forEach(el=>el.classList.add("is-visible"));}