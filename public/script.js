"use strict";
const facilities = [
 {id:1,name:"Davao del Sur Provincial Hospital",town:"Digos",location:"Digos City, Davao del Sur",type:"Government hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"Ask about eligible government health services",verified:false},
 {id:2,name:"Digos Doctors' Hospital",town:"Digos",location:"McArthur Highway, Digos City",type:"Private hospital",doctors:["Pediatrics","OB-GYN","General Medicine"],services:["checkup","laboratory","emergency"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 553 3517",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:3,name:"Dominican Hospital of Digos",town:"Digos",location:"Davao-Cotabato Road, Digos City",type:"Private hospital",doctors:["Pediatrics","Ophthalmology","General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 553 6925",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:4,name:"Sunga Hospital",town:"Digos",location:"Digos City, Davao del Sur",type:"Private hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:5,name:"Gonzales Maranan Clinic & Hospital",town:"Digos",location:"Davao-Cotabato Road, Digos City",type:"Private hospital",doctors:["Pediatrics","General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:6,name:"Davao del Sur Medical Specialist Center",town:"Digos",location:"Digos City, Davao del Sur",type:"Specialty hospital",doctors:["ENT","Surgery","General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 553 8304",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:7,name:"Medical Center of Digos Cooperative",town:"Digos",location:"Digos City, Davao del Sur",type:"Private hospital",doctors:["OB-GYN","General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 553 8533",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:8,name:"City Health Office Digos",town:"Digos",location:"Digos City, Davao del Sur",type:"Government health office",doctors:["General Medicine","Pediatrics"],services:["checkup","vaccination","medicine"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 272 1332",price:"Ask about public health fees",free:"Ask about free or subsidized services",verified:false},
 {id:9,name:"Digos Animal Bite Center (DARC)",town:"Digos",location:"Digos City, Davao del Sur",type:"Animal bite center",doctors:["General Medicine"],services:["anti-rabies"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"0977 299 4167",price:"Contact facility for current prices",free:"Ask about eligible public programs",verified:false},
 {id:10,name:"JGMD Digos City Animal Bite Center & Medical Clinic",town:"Digos",location:"Digos City, Davao del Sur",type:"Clinic / animal bite center",doctors:["General Medicine"],services:["anti-rabies","checkup"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"0915 350 3565",price:"Contact facility for current prices",free:"Ask about eligible public programs",verified:false},
 {id:11,name:"Digos City Rural Health Unit",town:"Digos",location:"Digos City, Davao del Sur",type:"Government health center",doctors:["General Medicine"],services:["checkup","vaccination","medicine"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Contact RHU for current hours",phone:"",price:"Ask about public health fees",free:"Ask about free consultation and vaccination programs",verified:false},
 {id:12,name:"Matti Barangay Health Station",town:"Digos",location:"Matti, Digos City",type:"Barangay health station",doctors:[],services:["medicine","vaccination"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Contact barangay health station",phone:"",price:"Ask the health station",free:"Ask about barangay health programs",verified:false},
 {id:13,name:"Mabama Doctors' Hospital",town:"Bansalan",location:"Bonifacio Road, Bansalan, Davao del Sur",type:"Private hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 272 2081",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:14,name:"Viacrucis Medical Hospital",town:"Bansalan",location:"Bansalan, Davao del Sur",type:"Private hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:15,name:"Bendijo Hospital",town:"Hagonoy",location:"Leling, Hagonoy, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:16,name:"Clinica Rudinas and Hospital",town:"Hagonoy",location:"T. Ronda Street, Hagonoy, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:17,name:"Guihing Community Hospital",town:"Hagonoy",location:"Guihing, Hagonoy, Davao del Sur",type:"Community hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"Ask about public health programs",verified:false},
 {id:18,name:"Hagonoy Rural Health Unit",town:"Hagonoy",location:"Hagonoy, Davao del Sur",type:"Government health center",doctors:["General Medicine"],services:["checkup","vaccination","medicine"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Contact RHU for current hours",phone:"",price:"Ask about public health fees",free:"Ask about free consultation and vaccination programs",verified:false},
 {id:19,name:"Gregorio Matas District Hospital",town:"Kiblawan",location:"Kiblawan, Davao del Sur",type:"District hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"Ask about public health programs",verified:false},
 {id:20,name:"Magsaysay Municipal Hospital",town:"Magsaysay",location:"Magsaysay, Davao del Sur",type:"Municipal hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"Ask about public health programs",verified:false},
 {id:21,name:"Golingay General Hospital",town:"Malalag",location:"Poblacion, Malalag, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:22,name:"Pineda-Aquino General Hospital",town:"Malalag",location:"Malalag, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:23,name:"Saroma Hospital",town:"Malalag",location:"Malalag, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:24,name:"St. Benedict Hospital of Davao del Sur",town:"Matanao",location:"Matanao, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:25,name:"Sinawilan Clinic & Hospital",town:"Matanao",location:"Matanao, Davao del Sur",type:"Clinic / hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:26,name:"Matanao Medicare Community Hospital",town:"Matanao",location:"Matanao, Davao del Sur",type:"Community hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"Ask about public health programs",verified:false},
 {id:27,name:"Baron-Yee Hospital",town:"Padada",location:"Padada, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:28,name:"Asilo Hospital",town:"Padada",location:"Mascardo Street, Padada, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:29,name:"South Davao Medical Specialist Hospital",town:"Padada",location:"Rizal Street, Padada, Davao del Sur",type:"Specialty hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:30,name:"Medcore Hospital",town:"Santa Cruz",location:"Santa Cruz, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:31,name:"Cereville Medical Clinic and Hospital",town:"Santa Cruz",location:"Santa Cruz, Davao del Sur",type:"Clinic / hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:32,name:"Marpe Medical Clinic and Hospital",town:"Santa Cruz",location:"Santa Cruz, Davao del Sur",type:"Clinic / hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:33,name:"Santa Cruz Community Hospital",town:"Santa Cruz",location:"Santa Cruz, Davao del Sur",type:"Community hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"Ask about public health programs",verified:false},
 {id:34,name:"Dr. Angos Medical Clinic & Animal Bite Center",town:"Santa Cruz",location:"Santa Cruz, Davao del Sur",type:"Clinic / animal bite center",doctors:["Pediatrics","General Medicine"],services:["checkup","anti-rabies"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"0995 154 3729",price:"Contact facility for current prices",free:"Ask about eligible public programs",verified:false},
 {id:35,name:"Diones Hospital",town:"Sulop",location:"Poblacion, Sulop, Davao del Sur",type:"Hospital",doctors:["General Medicine"],services:["checkup","laboratory"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"",price:"Contact facility for current prices",free:"No verified offer listed",verified:false},
 {id:36,name:"Sulop Medical Clinic",town:"Sulop",location:"Poblacion, Sulop, Davao del Sur",type:"Clinic",doctors:["General Medicine"],services:["checkup"],medicine:"Call to confirm",vaccination:"Call to confirm",schedule:"Call to confirm",phone:"(082) 272 0318",price:"Contact facility for current prices",free:"No verified offer listed",verified:false}
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
 const list=facilities.filter(matches);
 resultsContainer.innerHTML="";
 $("resultCount").textContent=list.length+" "+(list.length===1?"place":"places");
 $("resultsMessage").textContent=currentQuery?'Results matching “'+currentQuery+'”':(selectedService?'Facilities listing '+serviceNames[selectedService]:'Browse facilities or search a place above.');
 $("resultsTitle").textContent=selectedService?serviceNames[selectedService]:"Healthcare facilities";
 emptyState.hidden=list.length>0;
 resultsContainer.hidden=list.length===0;
 list.forEach(f=>{
  const card=document.createElement("article");card.className="facility-card";
  const serviceText=f.services.slice(0,2).map(s=>serviceNames[s]).join(" · ")||"Services not listed";
  card.innerHTML='<div class="facility-card-top"><span class="facility-symbol" aria-hidden="true">'+(f.type.toLowerCase().includes("government")||f.type.toLowerCase().includes("health center")?"＋":"✚")+'</span><span class="facility-type">'+esc(f.type)+'</span></div><h4>'+esc(f.name)+'</h4><p class="facility-location">⌖ '+esc(f.location)+'</p><div class="facility-meta">'+statusPill(serviceText,false)+statusPill("Hours: confirm",true)+'</div><div class="facility-card-footer"><span class="fee-preview">Service fees<b>'+esc(f.price)+'</b></span><button class="view-btn" type="button" data-id="'+f.id+'">View details ↗</button></div>';
  resultsContainer.appendChild(card);
 });
}
function showFacility(id){
 const f=facilities.find(item=>item.id===Number(id));if(!f)return;activeFacility=f;
 $("detailTitle").textContent=f.name;$("detailLocation").textContent=f.location+" · "+f.type;
 $("detailDoctor").textContent=f.doctors.length?f.doctors.join(", "):"Not listed — contact facility";
 $("detailMedicine").textContent=f.medicine;$("detailVaccination").textContent=f.vaccination;$("detailSchedule").textContent=f.schedule;
 $("detailPrice").textContent=f.price;$("detailFree").textContent=f.free;$("detailPhone").textContent=f.phone||"Not listed — verify locally";
 $("detailTags").innerHTML=f.services.map(s=>'<span class="meta-pill">'+esc(serviceNames[s])+'</span>').join("")+'<span class="meta-pill caution">Current availability not verified</span>';
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