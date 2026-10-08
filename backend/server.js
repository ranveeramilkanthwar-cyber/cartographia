const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); app.use(express.json());

const locations = [
  { id:1,name:"Avalon",type:"mythical",lat:51.5,lng:-2.5,era:"medieval",description:"The mystical island of King Arthur veiled in eternal mist.",legend:"Excalibur was forged in Avalons sacred fires.",rarity:"legendary",treasures:["Excalibur","Holy Grail","Round Table Seal"],visitors:1284 },
  { id:2,name:"El Dorado",type:"mythical",lat:4.7,lng:-74.1,era:"colonial",description:"The fabled City of Gold hidden deep in the Amazon.",legend:"Conquistadors spent lifetimes seeking its golden temples.",rarity:"legendary",treasures:["Golden Idol","Emerald Throne","Sun Disk"],visitors:876 },
  { id:3,name:"Alexandria Library",type:"historical",lat:31.2,lng:29.9,era:"ancient",description:"The greatest repository of knowledge in the ancient world.",legend:"Contains scrolls from every civilization ever known.",rarity:"epic",treasures:["Lost Aristotle Manuscripts","Map of the World","Alchemist Codex"],visitors:2341 },
  { id:4,name:"Shangri-La",type:"mythical",lat:28.0,lng:85.0,era:"medieval",description:"A hidden utopia in the Himalayas where time stands still.",legend:"Residents live for centuries in perfect harmony.",rarity:"legendary",treasures:["Elixir of Youth","Crystal of Time","Jade Mandala"],visitors:445 },
  { id:5,name:"Troy",type:"historical",lat:39.9,lng:26.2,era:"ancient",description:"The legendary city of the Trojan War rediscovered in Turkey.",legend:"Helens face launched a thousand ships to its shores.",rarity:"epic",treasures:["Priams Treasure","Paris Bow","Helen Mirror"],visitors:3102 },
  { id:6,name:"Petra",type:"historical",lat:30.3,lng:35.4,era:"nabataean",description:"The rose-red city carved directly into Jordanian cliffs.",legend:"The Nabataeans carved entire temples from living rock.",rarity:"epic",treasures:["Treasury Scrolls","Nabataean Gold"],visitors:4521 },
  { id:7,name:"Atlantis",type:"mythical",lat:28.0,lng:-16.0,era:"ancient",description:"Platos legendary sunken civilization of advanced beings.",legend:"It sank into the sea in a single day and night.",rarity:"legendary",treasures:["Orichalcum Crystal","Atlantean Ring","Sea God Trident"],visitors:5847 },
  { id:8,name:"Thule",type:"mythical",lat:76.5,lng:-68.7,era:"viking",description:"The ultimate north - land of the midnight sun and eternal ice.",legend:"Vikings described it as a land beyond the known world.",rarity:"rare",treasures:["Runic Tablets","Aurora Crystal","Viking Star Map"],visitors:234 }
];
const monsters = [
  { id:1,name:"Leviathan",type:"sea_serpent",region:"North Atlantic",threat:"extreme",legend:"Swallows ships whole in the storm season." },
  { id:2,name:"Basilisk",type:"serpent",region:"Saharan Desert",threat:"high",legend:"Its gaze turns explorers to stone." },
  { id:3,name:"Kraken",type:"cephalopod",region:"Norwegian Sea",threat:"extreme",legend:"Eight arms wide as a ship mast." },
  { id:4,name:"Roc",type:"giant_bird",region:"Arabian Peninsula",threat:"medium",legend:"Carries elephants as prey." }
];

app.get("/api/locations", (req,res) => {
  let r = [...locations];
  if(req.query.type) r = r.filter(l=>l.type===req.query.type);
  if(req.query.era) r = r.filter(l=>l.era===req.query.era);
  if(req.query.rarity) r = r.filter(l=>l.rarity===req.query.rarity);
  res.json({success:true,data:r,total:r.length});
});
app.get("/api/locations/:id", (req,res) => {
  const l = locations.find(l=>l.id===parseInt(req.params.id));
  if(!l) return res.status(404).json({error:"Not found"});
  res.json({success:true,data:l});
});
app.get("/api/monsters", (req,res) => res.json({success:true,data:monsters}));
app.get("/api/explore/:id", (req,res) => {
  const loc = locations.find(l=>l.id===parseInt(req.params.id));
  if(!loc) return res.status(404).json({error:"Not found"});
  const found = Math.random()>0.4;
  const treasure = loc.treasures[Math.floor(Math.random()*loc.treasures.length)];
  res.json({success:true,expedition:{location:loc.name,discovered:found,treasure:found?treasure:null,message:found?`You discovered ${treasure} in ${loc.name}!`:`The secrets of ${loc.name} remain hidden...`,dangerLevel:loc.rarity==="legendary"?"extreme":loc.rarity==="epic"?"high":"moderate"}});
});
app.get("/api/stats", (req,res) => res.json({success:true,stats:{totalLocations:locations.length,mythical:locations.filter(l=>l.type==="mythical").length,historical:locations.filter(l=>l.type==="historical").length,legendary:locations.filter(l=>l.rarity==="legendary").length,totalMonsters:monsters.length,totalVisitors:locations.reduce((s,l)=>s+l.visitors,0)}}));
app.listen(3004, ()=>console.log("CARTOGRAPHIA backend running on http://localhost:3004"));
