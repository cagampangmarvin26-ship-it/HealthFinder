"use strict";
const facilities = [
 {id:1,name:"Davao del Sur Provincial Hospital",town:"Digos",location:"Lapu-Lapu Street, Zone III, Digos City, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026); recent 2026 hospital report"},
 {id:2,name:"Digos Doctors' Hospital, Inc.",town:"Digos",location:"McArthur Highway, Kiagot, Digos City, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:3,name:"Medical Center of Digos Cooperative Hospital (MCDC)",town:"Digos",location:"National Highway, Tres de Mayo, Digos City, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:4,name:"Sunga Hospital, Inc.",town:"Digos",location:"3991 Rizal Avenue, Zone III, Digos City, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:5,name:"Gonzales-Maranan Medical Center, Inc.",town:"Digos",location:"Quezon Avenue, Digos City, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:6,name:"Dominican Hospital (St. Dominic Hospital of Digos)",town:"Digos",location:"Quezon Avenue, Zone 1, Digos City, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:7,name:"Alfonso G. Llanos Medical Clinic & Hospital",town:"Digos",location:"Rizal Avenue, Digos City, Davao del Sur",type:"Hospital / medical clinic",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Older DOH/city records; current accreditation needs confirmation"},
 {id:8,name:"Gonzales-Maranan Medical Center – Guihing Satellite",town:"Hagonoy",location:"Campo 10, Guihing, Hagonoy, Davao del Sur",type:"Hospital satellite",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital satellite (May 31, 2026)"},
 {id:9,name:"Bendijo Hospital / Clinica Rudinas and Hospital",town:"Hagonoy",location:"Hagonoy, Davao del Sur, Davao del Sur",type:"Hospital / clinic",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Current status needs confirmation"},
 {id:10,name:"Viacrucis Medical Hospital",town:"Bansalan",location:"Bansalan, Davao del Sur, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Current status needs confirmation"},
 {id:11,name:"Centeno Medical Specialists Hospital, Inc.",town:"Bansalan",location:"R. delos Cientos Street, Poblacion Uno, Bansalan, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Listed in DOH regional hospital directory (2025); confirm current license"},
 {id:12,name:"Mabama Doctors' Hospital",town:"Bansalan",location:"Bonifacio Road, Poblacion 2, Bansalan, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:13,name:"MedCORE Hospital, Inc.",town:"Santa Cruz",location:"National Highway, Zone II, Santa Cruz, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:14,name:"Marpe Medical Clinic & Hospital, Inc.",town:"Santa Cruz",location:"Apo Beach, Zone III, Santa Cruz, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:15,name:"Ralota-Lagrada Medical Clinic",town:"Santa Cruz",location:"Santa Cruz, Davao del Sur, Davao del Sur",type:"Medical clinic",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Older listing; current status needs confirmation"},
 {id:16,name:"Sinawilan Clinic & Hospital",town:"Matanao",location:"Matanao, Davao del Sur, Davao del Sur",type:"Hospital / clinic",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Older public accreditation listing; current status needs confirmation"},
 {id:17,name:"Jose J. Golingay General Hospital, Inc.",town:"Malalag",location:"Malalag, Davao del Sur, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Older public listing; current status needs confirmation"},
 {id:18,name:"Pineda-Aquino General Hospital",town:"Malalag",location:"Malalag, Davao del Sur, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Current status needs confirmation"},
 {id:19,name:"Saroma Hospital",town:"Malalag",location:"Poblacion, Malalag, Davao del Sur, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:20,name:"Asilo Hospital",town:"Padada",location:"Padada, Davao del Sur, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Current status needs confirmation"},
 {id:21,name:"South Davao Medical Specialists' Hospital, Inc.",town:"Padada",location:"Purok 4, Southern Paligue, Padada, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026)"},
 {id:22,name:"Baron-Yee Hospital",town:"Padada",location:"Magsaysay Street, Poblacion, Padada, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Listed in DOH regional hospital directory (2025); confirm current license"},
 {id:23,name:"Gregorio Matas District Hospital",town:"Kiblawan",location:"Bucabal Street, Poblacion, Kiblawan, Davao del Sur",type:"Hospital",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited hospital (May 31, 2026); recent 2026 hospital report"},
 {id:24,name:"Diones Hospital",town:"Sulop",location:"Purok 4, Poblacion, Sulop, Davao del Sur",type:"Infirmary / dispensary",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited infirmary/dispensary (May 31, 2026); not a full hospital"},
 {id:25,name:"Sulop Medical Clinic",town:"Sulop",location:"Purok 2, Poblacion, Sulop, Davao del Sur",type:"Infirmary / dispensary",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited infirmary/dispensary (May 31, 2026); not a full hospital"},
 {id:26,name:"Sulop Municipal Health Building",town:"Sulop",location:"Sulop, Davao del Sur, Davao del Sur",type:"Municipal health facility",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"Municipal health facility; not a hospital"},
 {id:27,name:"Magsaysay Medical Healthcare, Inc.",town:"Magsaysay",location:"Purok 5, Barayong, Magsaysay, Davao del Sur",type:"Infirmary / dispensary",doctors:[],services:[],medicine:"Contact facility to confirm",vaccination:"Contact facility to confirm",schedule:"Contact facility to confirm",phone:"",price:"Contact facility for current prices",free:"Ask the local health office about current public programs",verified:false,sourceStatus:"PhilHealth-accredited infirmary/dispensary (May 31, 2026); not a full hospital"}
];
const serviceNames={checkup:"General check-up",vaccination:"Vaccination", "anti-rabies":"Anti-rabies",dialysis:"Dialysis",cancer:"Cancer care",medicine:"Medicines",laboratory:"Laboratory",emergency:"Emergency"};
const $=id=>document.getElementById(id);
const searchInput=$("searchInput"), resultsContainer=$("resultsContainer"), emptyState=$("emptyState");
const doctorFilter=$("doctorFilter"),serviceFilter=$("serviceFilter"),availabilityFilter=$("availabilityFilter"),scheduleFilter=$("scheduleFilter");
let currentQuery="",selectedService="",activeFacility=null,lang="en";
const translations={
 en:{eyebrow:"COMMUNITY HEALTHCARE DIRECTORY",heroTitle:"The care you need.<br><em>Closer to home.</em>",heroDesc:"Find nearby hospitals, clinics, health services, and community programs — all in one place.",searchButton:"Find care",findTitle:"Let's find the right care.",servicesTitle:"What do you need today?"},
 tl:{eyebrow:"DIREKTORYO NG SERBISYONG PANGKALUSUGAN",heroTitle:"Ang pangangalagang kailangan mo.<br><em>Mas malapit sa tahanan.</em>",heroDesc:"Maghanap ng mga ospital, klinika, serbisyong pangkalusugan, at programang pangkomunidad sa iisang lugar.",searchButton:"Maghanap",findTitle:"Hanapin natin ang tamang pangangalaga.",servicesTitle:"Anong serbisyo ang kailangan mo ngayon?"}
};
function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function searchable(f){return [f.name,f.town,f.location,f.type,...f.doctors,...f.services.map(s=>serviceNames[s])].join(" ").toLowerCase();}
function matches(f){
 const q=currentQuery.toLowerCase().trim();
 if(q&&!q.split(/\s+/).every(word=>searchable(f).includes(word)))return false;
 if(doctorFilter.value&&!f.doctors.includes(doctorFilter.value))return false;
 if(serviceFilter.value&&!f.services.includes(serviceFilter.value))return false;
 if(selectedService&&!f.services.includes(selectedService))return false;
 if(availabilityFilter.value==="confirmed"&&f.verified!==true)return false;
 if(availabilityFilter.value==="free"&&!f.free.toLowerCase().includes("ask about"))return false;
 if(scheduleFilter.value==="h24"&&f.schedule!=="Open 24 hours")return false;
 if(scheduleFilter.value==="posted"&&f.schedule==="Call to confirm")return false;
 return true;
}
function statusPill(text,caution=true){return '<span class="meta-pill '+(caution?'caution':'')+'">'+esc(text)+'</span>';}
function renderResults(){
 const hasSearch=Boolean(currentQuery.trim()||doctorFilter.value||serviceFilter.value||availabilityFilter.value||scheduleFilter.value||selectedService);
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
  const serviceText=f.sourceStatus||"Current status needs confirmation";
  card.innerHTML=(f.photo?'<img class="facility-photo" src="'+esc(f.photo)+'" alt="Exterior photo of '+esc(f.name)+'" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement("div"),{className:"facility-photo-placeholder",textContent:"Facility photo not yet verified"}))">' : '<div class="facility-photo-placeholder">Facility photo not yet verified</div>')+'<div class="facility-card-top"><span class="facility-symbol" aria-hidden="true">'+(f.type.toLowerCase().includes("government")||f.type.toLowerCase().includes("health center")?"＋":"✚")+'</span><span class="facility-type">'+esc(f.type)+'</span></div><h4>'+esc(f.name)+'</h4><p class="facility-location">⌖ '+esc(f.location)+'</p><div class="facility-meta">'+statusPill(serviceText,false)+statusPill("Hours: confirm",true)+'</div><div class="facility-card-footer"><span class="fee-preview">Service fees<b>'+esc(f.price)+'</b></span><button class="view-btn" type="button" data-id="'+f.id+'">View details ↗</button></div>';
  resultsContainer.appendChild(card);
 });
}
function showFacility(id){
 const f=facilities.find(item=>item.id===Number(id));if(!f)return;activeFacility=f;
 $("detailTitle").textContent=f.name;$("detailLocation").textContent=f.location+" · "+f.type;
 $("detailDoctor").textContent=f.doctors.length?f.doctors.join(", "):"Not listed — contact facility";
 $("detailMedicine").textContent=f.medicine;$("detailVaccination").textContent=f.vaccination;$("detailSchedule").textContent=f.schedule;
 $("detailPrice").textContent=f.price;$("detailFree").textContent=f.free;$("detailPhone").textContent=f.phone||"Not listed — verify locally";
 $("detailTags").innerHTML='<span class="meta-pill caution">'+esc(f.sourceStatus||"Current status needs confirmation")+'</span><span class="meta-pill caution">Contact facility to confirm it is operating</span>';
 const call=$("callFacility");if(f.phone){call.href="tel:"+f.phone.replace(/[^+\d]/g,"");call.hidden=false;}else{call.hidden=true;call.removeAttribute("href");}
 $("facilityDetails").hidden=false;
 $("facilityDetails").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
}
function closeDetails(){$("facilityDetails").hidden=true;activeFacility=null;}
function fillDoctors(){const types=[...new Set(facilities.flatMap(f=>f.doctors))].sort();doctorFilter.innerHTML='<option value="">Any specialty</option>'+types.map(d=>'<option value="'+esc(d)+'">'+esc(d)+'</option>').join("");}
function applyFilters(){currentQuery=searchInput.value.trim();selectedService="";document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));renderResults();$("find").scrollIntoView({behavior:"smooth",block:"start"});}
$("searchForm").addEventListener("submit",e=>{e.preventDefault();currentQuery=searchInput.value.trim();selectedService="";document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));renderResults();$("find").scrollIntoView({behavior:"smooth",block:"start"});});
$("applyFilters").addEventListener("click",applyFilters);
[doctorFilter,serviceFilter,availabilityFilter,scheduleFilter].forEach(el=>el.addEventListener("change",()=>{currentQuery=searchInput.value.trim();selectedService="";document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));renderResults();}));
function resetFilters(){searchInput.value="";currentQuery="";selectedService="";doctorFilter.value="";serviceFilter.value="";availabilityFilter.value="";scheduleFilter.value="";document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));renderResults();closeDetails();$("servicePanel").hidden=true;}
$("resetFilters").addEventListener("click",resetFilters);$("emptyReset").addEventListener("click",resetFilters);$("closeDetailsBtn").addEventListener("click",closeDetails);
resultsContainer.addEventListener("click",e=>{const btn=e.target.closest("[data-id]");if(btn)showFacility(btn.dataset.id);});
const panel=$("servicePanel"),panelList=$("panelList");
function renderServicePanel(key){
 const list=facilities.filter(f=>f.services.includes(key));
 $("panelTitle").textContent=serviceNames[key];$("panelCount").textContent=list.length+" facilities list this service. Please confirm directly.";
 panelList.innerHTML="";
 if(!list.length){panelList.innerHTML='<div class="panel-empty">No facility is currently listed for this service in this directory. Contact your local health office for referrals.</div>';return;}
 list.forEach(f=>{const row=document.createElement("div");row.className="panel-result";row.innerHTML='<div><strong>'+esc(f.name)+'</strong><small>'+esc(f.location)+'</small><small>'+esc(f.price)+'</small></div><button class="view-btn" type="button" data-id="'+f.id+'">Details</button>';panelList.appendChild(row);});
}
document.querySelectorAll(".service-card").forEach(card=>card.addEventListener("click",()=>{
 const key=card.dataset.service;selectedService=selectedService===key?"":key;
 document.querySelectorAll(".service-card").forEach(c=>c.classList.toggle("selected",c.dataset.service===selectedService));
 if(!selectedService){panel.hidden=true;currentQuery=searchInput.value.trim();renderResults();return;}
 panel.hidden=false;renderServicePanel(key);currentQuery="";searchInput.value="";doctorFilter.value="";serviceFilter.value="";availabilityFilter.value="";scheduleFilter.value="";renderResults();panel.scrollIntoView({behavior:"smooth",block:"nearest"});
}));
$("panelClose").addEventListener("click",()=>{panel.hidden=true;selectedService="";document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));renderResults();});
panelList.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)showFacility(b.dataset.id);});
const programs=[
 {title:"Free medical consultation",desc:"Ask your barangay health station or municipal health office about the next schedule, eligibility, and venue.",status:"Schedule not yet verified",date:"ASK"},
 {title:"Community vaccination drive",desc:"Contact the local health office to confirm vaccine availability, target groups, dates, and required documents.",status:"Schedule not yet verified",date:"ASK"},
 {title:"Barangay medical mission",desc:"Community organizers may announce check-ups and health screening. Confirm details with your barangay office.",status:"Awaiting official announcement",date:"ASK"}
];
function renderPrograms(){$("programList").innerHTML=programs.map(p=>'<article class="program-item"><div class="program-date"><strong>?</strong>'+p.date+'</div><div><h4>'+esc(p.title)+'</h4><p>'+esc(p.desc)+'</p><span class="program-status">'+esc(p.status)+'</span></div></article>').join("");}
const toggle=$("menuToggle"),nav=$("navLinks");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");}));
$("languageBtn").addEventListener("click",()=>{
 lang=lang==="en"?"tl":"en";const dict=translations[lang];
 document.documentElement.lang=lang==="tl"?"fil":"en";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const value=dict[el.dataset.i18n];if(value)el.innerHTML=value;});
 $("languageBtn").textContent=lang==="en"?"Filipino":"English";
 searchInput.placeholder=lang==="en"?"Try Digos, barangay, hospital...":"Subukan ang Digos, barangay, o ospital...";
});
$("year").textContent=new Date().getFullYear();
fillDoctors();renderResults();renderPrograms();
const revealTargets=document.querySelectorAll(".trust-strip > div,.section-heading,.filter-panel,.results-top,.facility-card,.philhealth-card,.service-card,.program-intro,.program-content,.about-art,.about-copy,.contact-band > div,.contact-band > a");
revealTargets.forEach(el=>el.classList.add("reveal-on-scroll"));
if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
 revealTargets.forEach(el=>revealObserver.observe(el));
}else{revealTargets.forEach(el=>el.classList.add("is-visible"));}