"use client";

import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const COMPANY = "U.I Khaleel Agrilink Solutions";
const PHONE1 = "08034838198";
const PHONE2 = "07015482559";
const EMAIL = "iukhaleel@gmail.com";
const ADDRESS = "No. 45 Shitu Marafa Street, Sharada, Kano State, Nigeria.";
const WHATSAPP = "https://wa.me/2348034838198";

const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com/uikhaleelagrilink", label: "FB", bg: "bg-blue-600" },
  { name: "X", url: "https://x.com/uikhaleelagrilink", label: "X", bg: "bg-black" },
  { name: "Instagram", url: "https://instagram.com/uikhaleelagrilink", label: "IG", bg: "bg-gradient-to-br from-pink-500 to-purple-600" },
  { name: "LinkedIn", url: "https://linkedin.com/company/uikhaleelagrilink", label: "in", bg: "bg-blue-700" },
  { name: "YouTube", url: "https://youtube.com/@uikhaleelagrilink", label: "YT", bg: "bg-red-600" },
  { name: "WhatsApp", url: WHATSAPP, label: "WA", bg: "bg-green-500" },
  { name: "TikTok", url: "https://tiktok.com/@uikhaleelagrilink", label: "TK", bg: "bg-gray-900" },
];

const PRODUCTS = [
  { id:1, name:"Maize", category:"Grains", price:85000, unit:"Ton", emoji:"🌽", desc:"Premium yellow maize sourced directly from northern Nigeria farms." },
  { id:2, name:"Rice", category:"Grains", price:95000, unit:"Bag", emoji:"🍚", desc:"Local parboiled rice, 50kg bags, high quality." },
  { id:3, name:"Soybeans", category:"Legumes", price:120000, unit:"Ton", emoji:"🫘", desc:"Grade A soybeans suitable for oil extraction and feed." },
  { id:4, name:"Cowpea", category:"Legumes", price:150000, unit:"Ton", emoji:"🫛", desc:"White and brown eye cowpea, farm-fresh." },
  { id:5, name:"Groundnut", category:"Oil Seeds", price:110000, unit:"Ton", emoji:"🥜", desc:"Shelled groundnut for oil processing and direct consumption." },
  { id:6, name:"Sesame", category:"Export Crops", price:220000, unit:"Ton", emoji:"🌾", desc:"Export-quality sesame seed, natural white variety." },
  { id:7, name:"Millet", category:"Grains", price:70000, unit:"Ton", emoji:"🌿", desc:"Pearl millet for human consumption and livestock feed." },
  { id:8, name:"Sorghum", category:"Grains", price:76000, unit:"Ton", emoji:"🌾", desc:"Red and white sorghum for food and industrial use." },
];

const COMMODITIES = [
  { name:"Maize", market:"Dawanau Market, Kano", price:"₦82,000", trend:"up", change:"+3.2%" },
  { name:"Rice", market:"Dawanau Market, Kano", price:"₦97,500", trend:"up", change:"+1.8%" },
  { name:"Soybeans", market:"Kaduna Central Market", price:"₦118,000", trend:"down", change:"-2.1%" },
  { name:"Cowpea", market:"Kano Central Market", price:"₦142,000", trend:"up", change:"+4.5%" },
  { name:"Groundnut", market:"Kano Central Market", price:"₦110,000", trend:"down", change:"-1.3%" },
  { name:"Sesame", market:"Lagos Export Market", price:"₦230,000", trend:"up", change:"+6.2%" },
  { name:"Millet", market:"Maiduguri Market", price:"₦70,000", trend:"up", change:"+2.0%" },
  { name:"Sorghum", market:"Katsina Market", price:"₦76,000", trend:"down", change:"-0.8%" },
];

const COURSES = [
  { title:"Modern Maize Production", category:"Crop Production", lessons:6, duration:"3 hrs", emoji:"🌽", level:"Beginner" },
  { title:"Poultry Farming Masterclass", category:"Livestock", lessons:10, duration:"5 hrs", emoji:"🐓", level:"Intermediate" },
  { title:"Fish Farming for Beginners", category:"Aquaculture", lessons:8, duration:"4 hrs", emoji:"🐟", level:"Beginner" },
  { title:"Farm Mechanization", category:"Technology", lessons:5, duration:"2.5 hrs", emoji:"🚜", level:"Advanced" },
  { title:"Soil Health & Fertilizer Use", category:"Agronomy", lessons:7, duration:"3.5 hrs", emoji:"🌱", level:"Beginner" },
  { title:"Agricultural Finance & Loans", category:"Business", lessons:4, duration:"2 hrs", emoji:"💰", level:"Intermediate" },
];

const BLOG_POSTS = [
  { id:1, title:"Modern Maize Production Techniques in Northern Nigeria", category:"Crop Production", date:"12 July 2026", emoji:"🌽", readTime:"5 min", content:`Modern maize production combines improved seed varieties, good agronomic practices, soil fertility management, integrated pest management, and efficient water use.\n\nFarmers should begin by selecting certified seeds suitable for their agroecological zone. Proper land preparation, timely planting, and balanced fertilizer application are essential for achieving high yields.\n\nRegular field scouting helps detect pests and diseases early. Fall Armyworm remains one of the most devastating pests in Northern Nigeria — early detection and targeted application of recommended pesticides can save up to 80% of yield losses.\n\nHarvesting at physiological maturity and proper storage practices help reduce post-harvest losses. Use moisture meters to confirm grain moisture below 13% before storage, and treat storage bags to prevent weevil damage.\n\nWith good practices, farmers can achieve 4–6 tons per hectare, compared to the national average of 1.8 tons. The difference is simply knowledge and inputs.` },
  { id:2, title:"Climate-Smart Agriculture: How Nigerian Farmers Can Adapt", category:"Climate", date:"10 July 2026", emoji:"🌦️", readTime:"4 min", content:`Climate change is reshaping rainfall patterns, temperatures, and pest pressures across Nigeria. Farmers who adapt will survive and thrive; those who don't risk devastating losses.\n\nClimate-smart agriculture (CSA) refers to practices that increase productivity, enhance resilience, and reduce greenhouse gas emissions. Key practices include:\n\n1. Drought-tolerant crop varieties — Use certified seeds developed for your zone by IITA and other research institutes.\n\n2. Conservation agriculture — Minimum tillage, crop residue retention, and cover crops improve soil moisture retention.\n\n3. Agroforestry — Planting trees alongside crops provides shade, improves soil, and provides income diversification.\n\n4. Early warning systems — Subscribe to NIMET alerts and our weather dashboard for advance planting guidance.\n\nThe transition to climate-smart farming is not a cost — it is an investment that pays back within one to two seasons.` },
  { id:3, title:"Agricultural Commodity Market Update — July 2026", category:"Market Intelligence", date:"8 July 2026", emoji:"📈", readTime:"3 min", content:`This week's market report covers price movements across major Nigerian agricultural markets for the period ending 8 July 2026.\n\nMAIZE: Prices at Dawanau Market rose 3.2% to ₦82,000 per 100kg bag, driven by increased demand from feed mills and reduced supply from Kaduna State following recent rains.\n\nRICE: Local parboiled rice remained firm at ₦97,500 per 50kg bag. Imported rice continues to face import restriction headwinds, supporting local prices.\n\nSOYBEANS: Prices softened 2.1% to ₦118,000 per 100kg bag as new harvest enters the market from Benue and Taraba states.\n\nSESAME: The export market remains strong at ₦230,000 per 100kg bag. Chinese demand continues to support premium pricing for white sesame.\n\nOUTLOOK: Prices are expected to remain firm through August as Ramadan demand effects unwind and the main cropping season progresses. Farmers are advised to hold stocks where storage is available.` },
];

const FAQS = [
  { q:"What is U.I Khaleel Agrilink Solutions?", a:"We are an agribusiness and agricultural technology company connecting farmers with markets, extension services, logistics, research and digital solutions across Nigeria." },
  { q:"Who can register on the platform?", a:"Farmers, buyers, agribusinesses, researchers, extension professionals and investors can all register. Registration is free and takes less than 5 minutes." },
  { q:"Is registration free?", a:"Yes. Basic registration is completely free. Some premium services such as advanced market analytics and priority extension support may require a subscription in the future." },
  { q:"Do you provide agricultural extension services?", a:"Yes. We provide digital extension services, training resources, weather information, AI-powered farming support, and direct access to agricultural extension officers." },
  { q:"Which states do you currently operate in?", a:"We are based in Kano State and currently serve farmers across northern Nigeria, with plans to expand nationwide. Our digital platform is accessible from all 36 states." },
  { q:"Can I sell my farm produce through Agrilink?", a:"Yes. Registered farmers can list commodities in our marketplace where verified buyers from across Nigeria can view and place orders directly." },
  { q:"How does the AI Assistant work?", a:"Our AI Assistant is powered by advanced language models trained on agricultural knowledge. Ask it any question about crops, livestock, weather, pest control or market prices and it will provide practical guidance." },
  { q:"How do I contact customer support?", a:"You can reach us by phone on 08034838198 or 07015482559, by email at iukhaleel@gmail.com, or via WhatsApp. Our office is open Monday to Friday 8AM–5PM and Saturday 9AM–2PM." },
];

const TESTIMONIALS = [
  { name:"Abdullahi Musa", role:"Maize Farmer, Kano State", message:"Agrilink connected me with reliable buyers and helped me improve my farming practices. My income increased by 40% in the first season.", rating:5 },
  { name:"Aisha Bello", role:"Poultry Farmer, Kaduna State", message:"The training materials and extension support are practical and easy to understand. The AI assistant answered questions I had been struggling with for years.", rating:5 },
  { name:"Ibrahim Sani", role:"Commodity Trader, Lagos", message:"The marketplace makes it easy to find quality agricultural products from trusted farmers across Nigeria. Transparent pricing, no middlemen.", rating:5 },
  { name:"Fatima Zakari", role:"Rice Farmer, Niger State", message:"I used the weather dashboard to plan my planting and avoided the losses my neighbours suffered from the late rains. Highly recommend this platform.", rating:5 },
];

const RESOURCES = [
  { title:"Maize Production Guide", category:"Crop Production", pages:24, emoji:"🌽" },
  { title:"Rice Farming Manual", category:"Crop Production", pages:32, emoji:"🍚" },
  { title:"Integrated Pest Management Guide", category:"Plant Protection", pages:18, emoji:"🐛" },
  { title:"Poultry Farming Handbook", category:"Livestock", pages:40, emoji:"🐓" },
  { title:"Fish Farming Manual", category:"Aquaculture", pages:28, emoji:"🐟" },
  { title:"Agricultural Market Report Q2 2026", category:"Market Intelligence", pages:16, emoji:"📊" },
  { title:"Soil Health & Fertilizer Guide", category:"Agronomy", pages:22, emoji:"🌱" },
  { title:"Agribusiness Finance Manual", category:"Business", pages:20, emoji:"💰" },
];

// ─── WEATHER DATA ─────────────────────────────────────────────────────────────
const WEATHER_DATA = {
  city:"Kano", temp:"30°C", humidity:"65%", wind:"18 km/h", rain:"40%", condition:"Partly Cloudy",
  forecast:[
    { day:"Mon", emoji:"☀️", temp:"30°C", rain:"20%", condition:"Sunny" },
    { day:"Tue", emoji:"🌧️", temp:"28°C", rain:"70%", condition:"Rain" },
    { day:"Wed", emoji:"⛅", temp:"29°C", rain:"40%", condition:"Cloudy" },
    { day:"Thu", emoji:"☀️", temp:"31°C", rain:"10%", condition:"Sunny" },
    { day:"Fri", emoji:"⛈️", temp:"27°C", rain:"80%", condition:"Storm" },
  ],
  advice:"Heavy rainfall expected Thursday–Friday. Delay fertilizer application. Check drainage channels and scout for early signs of fungal diseases in maize and sorghum fields.",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => "₦" + n.toLocaleString();

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const set = (v) => { const nv = typeof v === "function" ? v(val) : v; setVal(nv); try { localStorage.setItem(key, JSON.stringify(nv)); } catch {} };
  return [val, set];
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function PageHero({ title, subtitle, emoji }) {
  return (
    <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-20 text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 text-8xl flex flex-wrap gap-10 p-10 pointer-events-none select-none">
        {[emoji,emoji,emoji,emoji,emoji,emoji].map((e,i)=><span key={i}>{e}</span>)}
      </div>
      <div className="relative">
        {emoji && <div className="text-6xl mb-4">{emoji}</div>}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{title}</h1>
        {subtitle && <p className="text-green-200 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}

function Badge({ children, color="green" }) {
  const colors = { green:"bg-green-100 text-green-700", yellow:"bg-yellow-100 text-yellow-700", blue:"bg-blue-100 text-blue-700", red:"bg-red-100 text-red-700" };
  return <span className={`${colors[color]} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>{children}</span>;
}

function Card({ children, className="" }) {
  return <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all ${className}`}>{children}</div>;
}

function Btn({ children, onClick, variant="green", className="", disabled=false }) {
  const base = "font-semibold rounded-xl px-5 py-2.5 transition-all text-sm flex items-center gap-2 justify-center";
  const v = {
    green:"bg-green-700 hover:bg-green-800 text-white",
    yellow:"bg-yellow-500 hover:bg-yellow-400 text-black",
    outline:"border-2 border-green-700 text-green-700 hover:bg-green-50",
    ghost:"text-green-700 hover:bg-green-50",
    red:"bg-red-600 hover:bg-red-700 text-white",
  };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${v[variant]} ${disabled?"opacity-50 cursor-not-allowed":""} ${className}`}>{children}</button>;
}

function Input({ label, type="text", value, onChange, placeholder, required=false, className="" }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}{required&&<span className="text-red-500 ml-1">*</span>}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" />
    </div>
  );
}

function Select({ label, value, onChange, options, className="" }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 bg-white">
        {options.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toast({ msg, type="success", onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,4000); return()=>clearTimeout(t); },[]);
  const colors = { success:"bg-green-700", error:"bg-red-600", info:"bg-blue-600" };
  return (
    <div className={`fixed top-6 right-6 z-[999] ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm`}>
      <span>{type==="success"?"✅":type==="error"?"❌":"ℹ️"}</span>
      <span className="text-sm font-medium">{msg}</span>
      <button onClick={onClose} className="ml-auto text-white/70 hover:text-white text-lg">×</button>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, cart, onLogout }) {
  const [open, setOpen] = useState(false);
  const [cartPop, setCartPop] = useState(false);
  const totalItems = cart.reduce((a,c)=>a+c.qty,0);
  const totalPrice = cart.reduce((a,c)=>a+(c.price*c.qty),0);
  const navLinks = [
    {label:"Home",page:"home"},{label:"About",page:"about"},{label:"Services",page:"services"},
    {label:"Marketplace",page:"marketplace"},{label:"Prices",page:"prices"},
    {label:"Training",page:"training"},{label:"Blog",page:"blog"},{label:"Contact",page:"contact"},
  ];
  return (
    <nav className="bg-green-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={()=>setPage("home")} className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🌿</span>
          <div className="hidden sm:block text-left">
            <div className="font-extrabold text-sm leading-tight">U.I Khaleel</div>
            <div className="text-green-400 text-xs">Agrilink Solutions</div>
          </div>
        </button>

        <div className="hidden xl:flex items-center gap-0.5">
          {navLinks.map(l=>(
            <button key={l.page} onClick={()=>setPage(l.page)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${page===l.page?"bg-green-700 text-white":"text-green-200 hover:bg-green-800 hover:text-white"}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Cart */}
          <div className="relative">
            <button onClick={()=>setCartPop(!cartPop)} className="relative p-2 hover:bg-green-800 rounded-xl transition-all">
              <span className="text-xl">🛒</span>
              {totalItems>0&&<span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>
            {cartPop&&(
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="bg-green-800 text-white px-5 py-3 font-bold flex items-center justify-between">
                  <span>🛒 Cart ({totalItems} items)</span>
                  <button onClick={()=>setCartPop(false)} className="text-white/70 hover:text-white text-xl">×</button>
                </div>
                {cart.length===0?(
                  <div className="p-8 text-center text-gray-400"><div className="text-4xl mb-2">🛒</div><p className="text-sm">Your cart is empty</p></div>
                ):(
                  <>
                    <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                      {cart.map(item=>(
                        <div key={item.id} className="px-5 py-3 flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.qty} × {fmt(item.price)}</div>
                          </div>
                          <div className="font-bold text-green-700 text-sm">{fmt(item.price*item.qty)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <div className="flex justify-between font-bold mb-3 text-sm">
                        <span>Total</span><span className="text-green-700">{fmt(totalPrice)}</span>
                      </div>
                      <button onClick={()=>{setCartPop(false);}} className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold text-sm transition-colors">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {user?(
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={()=>setPage("dashboard")} className="text-xs bg-green-700 hover:bg-green-600 px-3 py-2 rounded-xl font-semibold transition-all">
                👤 {user.fullName.split(" ")[0]}
              </button>
              <button onClick={onLogout} className="text-xs text-green-300 hover:text-white px-2 py-2 transition-all">Logout</button>
            </div>
          ):(
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={()=>setPage("login")} className="text-xs text-green-200 hover:text-white px-3 py-2 transition-all">Login</button>
              <button onClick={()=>setPage("register")} className="text-xs bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl transition-all">Register Free</button>
            </div>
          )}

          <button onClick={()=>setOpen(!open)} className="xl:hidden p-2 hover:bg-green-800 rounded-xl transition-all">
            <span className="text-xl">{open?"✕":"☰"}</span>
          </button>
        </div>
      </div>

      {open&&(
        <div className="xl:hidden bg-green-950 px-4 pb-4 space-y-1 border-t border-green-800">
          {navLinks.map(l=>(
            <button key={l.page} onClick={()=>{setPage(l.page);setOpen(false);}}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${page===l.page?"bg-green-700 text-white":"text-green-200 hover:bg-green-800"}`}>
              {l.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            {user?(
              <>
                <button onClick={()=>{setPage("dashboard");setOpen(false);}} className="flex-1 bg-green-700 text-white py-2.5 rounded-xl text-sm font-bold">Dashboard</button>
                <button onClick={()=>{onLogout();setOpen(false);}} className="flex-1 border border-green-600 text-green-300 py-2.5 rounded-xl text-sm font-bold">Logout</button>
              </>
            ):(
              <>
                <button onClick={()=>{setPage("login");setOpen(false);}} className="flex-1 border border-green-600 text-green-200 py-2.5 rounded-xl text-sm font-bold">Login</button>
                <button onClick={()=>{setPage("register");setOpen(false);}} className="flex-1 bg-yellow-500 text-black py-2.5 rounded-xl text-sm font-bold">Register Free</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const links = [
    {label:"About",page:"about"},{label:"Services",page:"services"},{label:"Marketplace",page:"marketplace"},
    {label:"Training",page:"training"},{label:"Blog",page:"blog"},{label:"Contact",page:"contact"},
    {label:"FAQ",page:"faq"},{label:"Gallery",page:"gallery"},{label:"Testimonials",page:"testimonials"},
    {label:"Partners",page:"partners"},{label:"Resources",page:"resources"},{label:"Awards",page:"awards"},
  ];
  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌿</span>
            <div>
              <div className="font-extrabold text-white text-lg">{COMPANY}</div>
              <div className="text-green-400 text-sm">Connecting Farmers, Markets & Innovation</div>
            </div>
          </div>
          <p className="text-green-300 text-sm leading-7 mb-5">An innovative agribusiness company committed to transforming agriculture through technology, extension services, commodity marketing and digital innovation across all 36 states of Nigeria.</p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map(s=>(
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                className={`${s.bg} text-white w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform shadow`}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Quick Links</h3>
          <div className="grid grid-cols-2 gap-1">
            {links.map(l=>(
              <button key={l.page} onClick={()=>setPage(l.page)} className="text-green-300 hover:text-white text-sm py-1 text-left transition-colors">{l.label}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Contact Us</h3>
          <div className="space-y-3 text-sm text-green-300">
            <div className="flex gap-2"><span>📍</span><span>{ADDRESS}</span></div>
            <div className="flex gap-2"><span>📞</span><span>{PHONE1}<br/>{PHONE2}</span></div>
            <div className="flex gap-2"><span>✉️</span><span>{EMAIL}</span></div>
            <div className="flex gap-2"><span>🕐</span><span>Mon–Fri: 8AM–5PM<br/>Sat: 9AM–2PM</span></div>
          </div>
        </div>
      </div>
      <div className="border-t border-green-900 py-5 text-center text-green-600 text-xs">
        © 2026 {COMPANY}. All rights reserved. | Kano State, Nigeria.
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] text-7xl flex flex-wrap gap-8 p-8 pointer-events-none select-none">
          {["🌾","🌽","🥜","🐄","🚜","🌿","🍀","🌱","🐓","🐟"].map((e,i)=><span key={i}>{e}</span>)}
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-green-700/40 border border-green-500/30 rounded-full px-4 py-2 text-green-200 text-sm mb-8">
            <span>🇳🇬</span> Nigeria's Digital Agricultural Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Empowering Agriculture<br/><span className="text-yellow-400">Through Innovation</span>
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-8">
            Connecting farmers, markets and innovation across all 36 states of Nigeria. From Kano to Lagos — we grow together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={()=>setPage("register")} className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-xl">
              🌱 Register as Farmer
            </button>
            <button onClick={()=>setPage("marketplace")} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105">
              🛒 Browse Marketplace
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-green-300">
            {["✅ Free Registration","✅ AI Farming Assistant","✅ Live Market Prices","✅ Weather Dashboard"].map(f=><span key={f}>{f}</span>)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[{n:"5,000+",l:"Registered Farmers",e:"👨‍🌾"},{n:"50+",l:"Commodities Listed",e:"🌾"},{n:"100+",l:"Logistics Deliveries",e:"🚛"},{n:"36",l:"States Covered",e:"🗺️"}]
            .map((s,i)=>(
              <div key={i} className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-4xl mb-2">{s.e}</div>
                <div className="text-3xl font-extrabold text-green-800">{s.n}</div>
                <div className="text-gray-500 text-sm mt-1">{s.l}</div>
              </div>
            ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-green-600 font-bold text-xs uppercase tracking-widest mb-2">What We Offer</div>
            <h2 className="text-4xl font-extrabold text-gray-900">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {e:"👨‍🌾",t:"Agricultural Extension",d:"Expert field advisory connecting farmers with knowledge on crop production, soil health and pest management."},
              {e:"🚜",t:"Farm Mechanization",d:"Access to tractors, harvesters and modern equipment to reduce labour costs and boost productivity."},
              {e:"🐄",t:"Livestock Consultancy",d:"Professional guidance on poultry, cattle and fish farming including feed, disease and marketing advice."},
              {e:"📦",t:"Commodity Trading",d:"Direct market linkages connecting verified farmers with buyers — transparent pricing, no middlemen."},
              {e:"💻",t:"Digital Agriculture",d:"AI assistant, weather dashboard and precision farming tools for smarter, data-driven decisions."},
              {e:"🔬",t:"Research & Innovation",d:"Agricultural research partnerships and variety trials to improve yields and farming sustainability."},
            ].map((s,i)=>(
              <Card key={i} className="p-8 group cursor-pointer">
                <div className="w-14 h-14 bg-green-100 group-hover:bg-green-600 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-colors">{s.e}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.t}</h3>
                <p className="text-gray-500 text-sm leading-6">{s.d}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Btn onClick={()=>setPage("services")} variant="outline" className="mx-auto">View All Services →</Btn>
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-green-600 font-bold text-xs uppercase tracking-widest mb-1">Live Market</div>
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Commodities</h2>
            </div>
            <button onClick={()=>setPage("marketplace")} className="text-green-700 font-semibold text-sm hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {PRODUCTS.map(p=>(
              <div key={p.id} className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center hover:shadow-md hover:border-green-300 transition-all cursor-pointer" onClick={()=>setPage("marketplace")}>
                <div className="text-3xl mb-2">{p.emoji}</div>
                <div className="font-bold text-gray-800 text-sm">{p.name}</div>
                <div className="text-green-700 font-bold text-xs mt-1">{fmt(p.price)}/{p.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Weather teasers */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3">AI Farming Assistant</h3>
            <p className="text-green-200 text-sm leading-7 mb-6">Ask any question about crops, livestock, pests, weather or market prices. Get instant expert guidance 24/7 in English or Hausa.</p>
            <button onClick={()=>setPage("ai")} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-all">Try AI Assistant →</button>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8">
            <div className="text-4xl mb-4">⛅</div>
            <h3 className="text-2xl font-bold mb-3">Weather Dashboard</h3>
            <p className="text-green-200 text-sm leading-7 mb-6">Get 5-day weather forecasts and farming-specific recommendations. Know exactly when to plant, spray and harvest.</p>
            <button onClick={()=>setPage("weather")} className="bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold px-6 py-3 rounded-xl transition-all">View Weather →</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-green-600 font-bold text-xs uppercase tracking-widest mb-2">Success Stories</div>
            <h2 className="text-3xl font-extrabold text-gray-900">What Farmers Say</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t,i)=>(
              <Card key={i} className="p-7">
                <div className="text-3xl text-green-600 font-serif mb-4">"</div>
                <p className="text-gray-600 text-sm leading-7 mb-5">{t.message}</p>
                <div className="flex gap-0.5 mb-4">{[...Array(t.rating)].map((_,j)=><span key={j} className="text-yellow-400">★</span>)}</div>
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-green-600 text-xs">{t.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-black mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-yellow-900 mb-8 text-lg">Join 5,000+ farmers already benefiting from digital agriculture in Nigeria.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={()=>setPage("register")} className="bg-green-800 hover:bg-green-900 text-white font-extrabold px-8 py-4 rounded-2xl transition-all hover:scale-105">Get Started Free 🌱</button>
            <button onClick={()=>setPage("ai")} className="bg-white hover:bg-gray-50 text-black font-bold px-8 py-4 rounded-2xl transition-all">Try AI Assistant 🤖</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div>
      <PageHero title="About Us" subtitle="Connecting Farmers, Markets and Innovation across Nigeria since 2024." emoji="🌿" />
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="text-green-600 font-bold text-xs uppercase tracking-widest mb-3">Who We Are</div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Nigeria's Premier Agricultural Technology Company</h2>
          <p className="text-gray-600 leading-8 mb-4">U.I Khaleel Agrilink Solutions is an innovative agribusiness company committed to transforming agriculture through technology, agricultural extension services, commodity marketing, logistics, research, and digital innovation.</p>
          <p className="text-gray-600 leading-8">We connect farmers, buyers, investors, researchers, and extension professionals on one digital platform, helping improve productivity, profitability, and food security across Nigeria.</p>
        </div>
        <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-12 text-center text-white">
          <div className="text-8xl mb-5">🌾</div>
          <div className="text-2xl font-extrabold mb-1">Founded 2024</div>
          <div className="text-green-300">Kano State, Nigeria</div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {[["5,000+","Farmers"],["36","States"],["50+","Commodities"],["100%","Digital"]].map(([n,l],i)=>(
              <div key={i} className="bg-white/10 rounded-xl p-3">
                <div className="font-extrabold text-yellow-400 text-xl">{n}</div>
                <div className="text-green-300">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {title:"Our Mission",text:"To empower farmers through agricultural extension, technology, market access, innovation, and sustainable agribusiness solutions that improve livelihoods and food security.",icon:"🎯"},
            {title:"Our Vision",text:"To become Africa's leading digital agricultural ecosystem, connecting farmers with knowledge, finance, markets, technology, and opportunities for a prosperous future.",icon:"🌍"},
          ].map((item,i)=>(
            <Card key={i} className="p-8">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-extrabold text-green-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-8">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {v:"Integrity",d:"We operate with complete honesty and transparency in all our dealings.",e:"🤝"},
            {v:"Innovation",d:"We embrace technology and new ideas to solve farming challenges.",e:"💡"},
            {v:"Professionalism",d:"We deliver expert-quality services with dedication and competence.",e:"🏆"},
            {v:"Sustainability",d:"We promote farming practices that protect the environment for future generations.",e:"🌱"},
            {v:"Excellence",d:"We pursue the highest standards in everything we do.",e:"⭐"},
            {v:"Farmer First",d:"Every decision we make puts the welfare of farmers at the centre.",e:"👨‍🌾"},
          ].map((item,i)=>(
            <Card key={i} className="p-7">
              <div className="text-3xl mb-3">{item.e}</div>
              <div className="text-lg font-extrabold text-green-800 mb-2">{item.v}</div>
              <p className="text-gray-500 text-sm leading-6">{item.d}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-green-800 text-white py-14 text-center px-6">
        <h2 className="text-2xl font-bold mb-2">Our Team & Leadership</h2>
        <p className="text-green-200 mb-8 max-w-xl mx-auto text-sm">Led by agricultural professionals, technologists and business experts committed to transforming Nigerian agriculture.</p>
        <div className="max-w-sm mx-auto bg-white/10 border border-white/20 rounded-2xl p-8">
          <div className="text-6xl mb-4">👨‍💼</div>
          <div className="font-extrabold text-lg">U.I Khaleel</div>
          <div className="text-green-300 text-sm">Founder & CEO</div>
          <p className="text-green-200 text-xs mt-3 leading-6">Agricultural extension specialist and agribusiness entrepreneur with a vision to digitise Nigerian agriculture.</p>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage() {
  const services = [
    {e:"👨‍🌾",t:"Agricultural Extension",d:"Field-based advisory and support services. Our extension officers work directly with farmers on crop production, soil health, pest management, post-harvest handling and agribusiness development.",features:["Direct farmer advisory","Soil testing and analysis","Pest and disease identification","Post-harvest support"]},
    {e:"🚜",t:"Farm Mechanization",d:"Access to tractors, harvesters, planters and other modern equipment on hire or purchase basis. We reduce labour costs and help farmers cover more land in less time.",features:["Tractor hire service","Planting and harvesting equipment","Maintenance and repair referrals","Mechanization training"]},
    {e:"🐄",t:"Livestock Consultancy",d:"Professional guidance on poultry, cattle, goat, sheep and fish farming covering all aspects from breeding and feeding to disease management and market linkage.",features:["Poultry farming advisory","Cattle and small ruminant management","Feed formulation guidance","Veterinary referral network"]},
    {e:"📦",t:"Commodity Trading",d:"Our marketplace connects farmers directly with verified buyers, processors and exporters. We ensure transparency, fair pricing and timely payment for agricultural produce.",features:["Verified buyer network","Price discovery and negotiation","Logistics coordination","Payment facilitation"]},
    {e:"💻",t:"Digital Agriculture",d:"We deploy cutting-edge technology including AI farming assistance, precision agriculture tools, remote sensing and mobile-based farm management systems.",features:["AI Farming Assistant","Weather forecasting","Market price alerts","Mobile farm records"]},
    {e:"🔬",t:"Research & Innovation",d:"We collaborate with universities, research institutes and development organisations on agricultural research, variety trials and innovation programmes.",features:["Variety adaptation trials","Research partnerships","Innovation funding","Knowledge dissemination"]},
  ];
  return (
    <div>
      <PageHero title="Our Services" subtitle="Comprehensive agricultural solutions supporting every farmer from field to market." emoji="🌿" />
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {services.map((s,i)=>(
          <Card key={i} className="p-8">
            <div className="flex items-start gap-5">
              <div className="text-5xl shrink-0">{s.e}</div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">{s.t}</h3>
                <p className="text-gray-500 text-sm leading-7 mb-4">{s.d}</p>
                <ul className="space-y-1">
                  {s.features.map((f,j)=><li key={j} className="text-xs text-gray-600 flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>)}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

// ─── MARKETPLACE ──────────────────────────────────────────────────────────────
function MarketplacePage({ cart, setCart, toast }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All Categories");
  const cats = ["All Categories","Grains","Legumes","Oil Seeds","Export Crops"];
  const filtered = PRODUCTS.filter(p=>(cat==="All Categories"||p.category===cat)&&p.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (product) => {
    setCart(prev=>{
      const ex = prev.find(i=>i.id===product.id);
      if(ex) return prev.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i);
      return [...prev,{...product,qty:1}];
    });
    toast(`${product.emoji} ${product.name} added to cart!`,"success");
  };

  return (
    <div>
      <PageHero title="Agricultural Marketplace" subtitle="Buy and Sell Agricultural Commodities Across Nigeria" emoji="🛒" />
      <section className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search products..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"/>
          <Select value={cat} onChange={setCat} options={cats} />
        </div>
        {filtered.length===0?(
          <div className="text-center py-20"><div className="text-6xl mb-4">🔍</div><p className="text-gray-400">No products found. Try a different search.</p></div>
        ):(
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(p=>(
              <Card key={p.id} className="overflow-hidden">
                <div className="h-44 bg-green-50 flex items-center justify-center text-8xl border-b border-gray-100">{p.emoji}</div>
                <div className="p-5">
                  <Badge color="green">{p.category}</Badge>
                  <h2 className="text-xl font-extrabold text-gray-900 mt-2">{p.name}</h2>
                  <p className="text-gray-400 text-xs mt-1 mb-2 leading-5">{p.desc}</p>
                  <div className="text-green-700 text-xl font-extrabold mb-4">{fmt(p.price)}<span className="text-sm font-normal text-gray-400">/{p.unit}</span></div>
                  <div className="flex gap-2">
                    <Btn onClick={()=>addToCart(p)} variant="green" className="flex-1">Buy Now</Btn>
                    <Btn onClick={()=>addToCart(p)} variant="yellow" className="flex-1">+ Cart</Btn>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── COMMODITY PRICES ─────────────────────────────────────────────────────────
function PricesPage() {
  const [search, setSearch] = useState("");
  const [lastUpdate] = useState(new Date().toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"}));
  const filtered = COMMODITIES.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.market.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <PageHero title="Commodity Prices" subtitle="Live agricultural commodity prices from major markets across Nigeria." emoji="📊" />
      <section className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search commodity or market..."
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 w-full sm:max-w-sm"/>
          <div className="text-xs text-gray-400 shrink-0">Last updated: {lastUpdate}</div>
        </div>
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-800 text-white">
              <tr>{["Commodity","Market","Unit","Price","Trend","Change"].map(h=><th key={h} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item,i)=>(
                <tr key={i} className="hover:bg-green-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{item.market}</td>
                  <td className="px-5 py-4 text-gray-400 text-sm">100kg Bag</td>
                  <td className="px-5 py-4 font-extrabold text-green-700 text-lg">{item.price}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${item.trend==="up"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>
                      {item.trend==="up"?"↑ Rising":"↓ Falling"}
                    </span>
                  </td>
                  <td className={`px-5 py-4 font-bold text-sm ${item.trend==="up"?"text-green-600":"text-red-500"}`}>{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
          ⚠️ <strong>Disclaimer:</strong> Prices shown are indicative and sourced from market agents. Always verify current prices before trading. Contact us on {PHONE1} for verified bulk pricing.
        </div>
      </section>
    </div>
  );
}

// ─── TRAINING PAGE ────────────────────────────────────────────────────────────
function TrainingPage({ toast }) {
  return (
    <div>
      <PageHero title="Agricultural Training Centre" subtitle="Learn modern farming techniques from agricultural professionals." emoji="🎓" />
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{e:"📚",t:"Articles & Guides",d:"Practical, downloadable guides on crop and livestock production written by extension experts."},
            {e:"▶️",t:"Video Lessons",d:"Step-by-step video demonstrations from experienced farmers and agricultural scientists."},
            {e:"🏅",t:"Certificates",d:"Earn verified digital certificates after completing courses — recognised by agribusiness employers."}]
            .map((f,i)=>(
              <Card key={i} className="p-8 text-center">
                <div className="text-5xl mb-4">{f.e}</div>
                <h2 className="text-xl font-extrabold mb-2">{f.t}</h2>
                <p className="text-gray-400 text-sm leading-6">{f.d}</p>
              </Card>
            ))}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Available Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c,i)=>(
            <Card key={i} className="p-7">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{c.emoji}</div>
                <Badge color={c.level==="Beginner"?"green":c.level==="Intermediate"?"yellow":"red"}>{c.level}</Badge>
              </div>
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{c.category}</div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-3">{c.title}</h3>
              <div className="flex gap-4 text-xs text-gray-400 mb-5">
                <span>📖 {c.lessons} Lessons</span>
                <span>⏱️ {c.duration}</span>
              </div>
              <Btn onClick={()=>toast(`Enrolled in "${c.title}"! Check your dashboard.`,"success")} variant="green" className="w-full">
                Enrol Now →
              </Btn>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
function BlogPage({ setPage, setBlogPost }) {
  return (
    <div>
      <PageHero title="Agriculture Blog & News" subtitle="Agricultural news, research, market intelligence and extension updates." emoji="📰" />
      <section className="max-w-7xl mx-auto py-16 px-6 grid lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post=>(
          <article key={post.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:border-green-200 transition-all">
            <div className="h-52 bg-green-50 flex items-center justify-center text-9xl border-b border-gray-100">{post.emoji}</div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge color="green">{post.category}</Badge>
                <span className="text-xs text-gray-400">{post.readTime} read</span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">{post.title}</h2>
              <p className="text-gray-400 text-xs mb-4">{post.date} · {COMPANY}</p>
              <p className="text-gray-600 text-sm leading-6 mb-5 line-clamp-3">{post.content.split("\n")[0]}</p>
              <Btn onClick={()=>{setBlogPost(post);setPage("blog-detail");}} variant="green">Read Article →</Btn>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function BlogDetailPage({ post, setPage }) {
  if(!post) return null;
  return (
    <div>
      <div className="max-w-4xl mx-auto py-14 px-6">
        <button onClick={()=>setPage("blog")} className="text-green-700 font-semibold text-sm flex items-center gap-1 mb-8 hover:underline">← Back to Blog</button>
        <Badge color="green">{post.category}</Badge>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-4 mb-3 leading-tight">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-8">{post.date} · {COMPANY} · {post.readTime} read</p>
        <div className="h-64 bg-green-50 rounded-2xl flex items-center justify-center text-9xl mb-10 border border-green-100">{post.emoji}</div>
        <div className="space-y-5">
          {post.content.split("\n\n").map((para,i)=>(
            <p key={i} className="text-gray-700 leading-8">{para}</p>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
          <div className="text-sm text-gray-500">Share this article:</div>
          {SOCIAL_LINKS.slice(0,4).map(s=>(
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className={`${s.bg} text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity`}>{s.name}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ toast }) {
  const [form, setForm] = useState({fullName:"",email:"",phone:"",message:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if(!form.fullName||!form.email||!form.message){toast("Please fill all required fields.","error");return;}
    setSending(true);
    await new Promise(r=>setTimeout(r,1500));
    setSending(false);setSent(true);
    toast("Message sent! We'll reply within 24 hours.","success");
  };

  return (
    <div>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Reach out anytime." emoji="📞" />
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-extrabold text-green-800 mb-8">Contact Information</h2>
          <div className="space-y-6">
            {[
              {e:"📍",t:"Office Address",c:ADDRESS},
              {e:"📞",t:"Phone Numbers",c:`${PHONE1}\n${PHONE2}`},
              {e:"✉️",t:"Email Address",c:EMAIL},
              {e:"💬",t:"WhatsApp",c:"+234 803 483 8198"},
              {e:"🕐",t:"Working Hours",c:"Monday–Friday: 8:00 AM – 5:00 PM\nSaturday: 9:00 AM – 2:00 PM\nSunday: Closed"},
            ].map((item,i)=>(
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl shrink-0">{item.e}</div>
                <div>
                  <div className="font-bold text-gray-900 mb-0.5 text-sm">{item.t}</div>
                  <div className="text-gray-500 text-sm whitespace-pre-line leading-6">{item.c}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Follow Us</h3>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(s=>(
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                  className={`${s.bg} text-white w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform`}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-extrabold text-green-800 mb-6">Send Us a Message</h2>
          {sent?(
            <div className="text-center py-12">
              <div className="text-7xl mb-4">✅</div>
              <div className="text-2xl font-extrabold text-green-700 mb-2">Message Sent!</div>
              <p className="text-gray-500 text-sm mb-6">We'll get back to you within 24 hours.</p>
              <Btn onClick={()=>{setSent(false);setForm({fullName:"",email:"",phone:"",message:""});}} variant="outline">Send Another Message</Btn>
            </div>
          ):(
            <div className="space-y-4">
              <Input label="Full Name" value={form.fullName} onChange={v=>setForm({...form,fullName:v})} placeholder="Your full name" required />
              <Input label="Email Address" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="your@email.com" required />
              <Input label="Phone Number" type="tel" value={form.phone} onChange={v=>setForm({...form,phone:v})} placeholder="08012345678" />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                <textarea rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="How can we help you?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 resize-none"/>
              </div>
              <Btn onClick={submit} variant="green" className="w-full py-4 text-base" disabled={sending}>
                {sending?"Sending...⏳":"Send Message 📨"}
              </Btn>
            </div>
          )}
        </Card>
      </section>

      {/* Map placeholder */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-6">Find Our Office</h2>
        <div className="bg-green-50 border border-green-200 rounded-2xl h-64 flex flex-col items-center justify-center">
          <div className="text-6xl mb-3">📍</div>
          <div className="font-bold text-green-800">Sharada, Kano State, Nigeria</div>
          <div className="text-green-600 text-sm mt-1">{ADDRESS}</div>
          <a href="https://maps.google.com?q=Sharada+Kano+Nigeria" target="_blank" rel="noopener noreferrer"
            className="mt-4 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
            Open in Google Maps →
          </a>
        </div>
      </section>
    </div>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────
function RegisterPage({ setPage, setUser, toast }) {
  const [form, setForm] = useState({fullName:"",email:"",phone:"",nationalId:"",state:"",lga:"",community:"",farmSize:"",farmingType:"Select Farming Type",mainCrop:"Select Main Crop",password:"",confirmPassword:"",farmBio:"",terms:false});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if(!form.fullName||!form.email||!form.phone||!form.password){toast("Please fill all required fields.","error");return;}
    if(form.password!==form.confirmPassword){toast("Passwords do not match.","error");return;}
    if(form.password.length<8){toast("Password must be at least 8 characters.","error");return;}
    if(!form.terms){toast("Please agree to the Terms and Conditions.","error");return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,1500));
    const newUser = {id:Date.now(),fullName:form.fullName,email:form.email,phone:form.phone,role:"farmer",state:form.state,mainCrop:form.mainCrop};
    setUser(newUser);
    setLoading(false);
    toast(`Welcome, ${form.fullName}! Registration successful.`,"success");
    setPage("dashboard");
  };

  const f = (k,v) => setForm(prev=>({...prev,[k]:v}));
  const states = ["Select State","Kano","Lagos","Abuja","Kaduna","Katsina","Sokoto","Zamfara","Kebbi","Niger","Kwara","Borno","Yobe","Adamawa","Gombe","Bauchi","Plateau","Nassarawa","Benue","Taraba","Enugu","Anambra","Imo","Abia","Ebonyi","Rivers","Bayelsa","Delta","Edo","Ondo","Ogun","Oyo","Osun","Ekiti","Kwara","Kogi","Cross River","Akwa Ibom","FCT"];

  return (
    <div>
      <PageHero title="Register" subtitle="Join U.I Khaleel Agrilink Solutions today. Free, fast, and easy." emoji="🌱" />
      <section className="max-w-4xl mx-auto my-12 px-6">
        <Card className="p-10">
          <h2 className="text-2xl font-extrabold text-green-800 mb-8">Farmer Registration Form</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Full Name" value={form.fullName} onChange={v=>f("fullName",v)} placeholder="e.g. Abdullahi Musa" required />
            <Input label="Email Address" type="email" value={form.email} onChange={v=>f("email",v)} placeholder="your@email.com" required />
            <Input label="Phone Number" type="tel" value={form.phone} onChange={v=>f("phone",v)} placeholder="08012345678" required />
            <Input label="National ID (NIN)" value={form.nationalId} onChange={v=>f("nationalId",v)} placeholder="Optional" />
            <Select label="State" value={form.state||"Select State"} onChange={v=>f("state",v)} options={states} />
            <Input label="Local Government Area" value={form.lga} onChange={v=>f("lga",v)} placeholder="Your LGA" />
            <Input label="Community / Village" value={form.community} onChange={v=>f("community",v)} placeholder="Your community" />
            <Input label="Farm Size (Hectares)" type="number" value={form.farmSize} onChange={v=>f("farmSize",v)} placeholder="e.g. 2.5" />
            <Select label="Farming Type" value={form.farmingType} onChange={v=>f("farmingType",v)} options={["Select Farming Type","Crop Farming","Livestock","Poultry","Fish Farming","Mixed Farming"]} />
            <Select label="Main Crop" value={form.mainCrop} onChange={v=>f("mainCrop",v)} options={["Select Main Crop","Maize","Rice","Cowpea","Soybeans","Groundnut","Sesame","Millet","Sorghum","Other"]} />
            <Input label="Password" type="password" value={form.password} onChange={v=>f("password",v)} placeholder="Minimum 8 characters" required />
            <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={v=>f("confirmPassword",v)} placeholder="Repeat password" required />
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">About Your Farm</label>
              <textarea rows={4} value={form.farmBio} onChange={e=>f("farmBio",e.target.value)} placeholder="Tell us about your farm, crops, and challenges..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 resize-none"/>
            </div>
            <label className="md:col-span-2 flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.terms} onChange={e=>f("terms",e.target.checked)} className="mt-0.5 w-4 h-4 accent-green-600"/>
              <span className="text-sm text-gray-600">I agree to the <span className="text-green-700 font-semibold">Terms and Conditions</span> and <span className="text-green-700 font-semibold">Privacy Policy</span> of {COMPANY}.</span>
            </label>
            <Btn onClick={submit} variant="green" className="md:col-span-2 w-full py-4 text-base" disabled={loading}>
              {loading?"Creating Account...⏳":"Create Account 🌱"}
            </Btn>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <button onClick={()=>setPage("login")} className="text-green-700 font-bold hover:underline">Login here</button>
          </div>
        </Card>
      </section>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ setPage, setUser, toast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if(!email||!password){toast("Please enter email and password.","error");return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,1200));
    // Demo admin
    if(email==="admin@agrilink.com"&&password==="admin123"){
      setUser({id:1,fullName:"Administrator",email,role:"admin"});
      toast("Welcome, Administrator!","success");setPage("admin");setLoading(false);return;
    }
    setUser({id:Date.now(),fullName:email.split("@")[0],email,role:"farmer"});
    toast("Login successful! Welcome back.","success");
    setPage("dashboard");setLoading(false);
  };

  return (
    <div>
      <PageHero title="Welcome Back" subtitle="Login to your Agrilink account." emoji="🔐" />
      <section className="max-w-md mx-auto my-16 px-6">
        <Card className="p-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">🔐</div>
            <h2 className="text-2xl font-extrabold text-gray-900">Sign In</h2>
          </div>
          <div className="space-y-4">
            <Input label="Email Address" type="email" value={email} onChange={setEmail} placeholder="your@email.com" required />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPass?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="Your password" className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-green-500"/>
                <button onClick={()=>setShowPass(!showPass)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 text-lg">{showPass?"🙈":"👁️"}</button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600"><input type="checkbox" className="accent-green-600"/> Remember Me</label>
              <button className="text-green-700 hover:underline font-semibold">Forgot Password?</button>
            </div>
            <Btn onClick={submit} variant="green" className="w-full py-4 text-base" disabled={loading}>
              {loading?"Signing In...⏳":"Login →"}
            </Btn>
            <div className="flex items-center gap-3 text-gray-300 text-xs"><div className="flex-1 h-px bg-gray-100"/><span>or</span><div className="flex-1 h-px bg-gray-100"/></div>
            <button className="w-full border border-gray-200 hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-3 font-semibold text-sm transition-colors">
              🔵 Continue with Google
            </button>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <button onClick={()=>setPage("register")} className="text-green-700 font-bold hover:underline">Register Free</button>
          </div>
          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 text-center">
            <strong>Demo Admin Login:</strong> admin@agrilink.com / admin123
          </div>
        </Card>
      </section>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({ user, setPage }) {
  const stats = [
    {e:"🌱",n:"3",l:"Registered Farms"},
    {e:"🛒",n:"7",l:"Orders"},
    {e:"💵",n:"₦840K",l:"Total Sales"},
    {e:"📈",n:"94%",l:"Farm Performance"},
  ];
  const quickLinks = [
    {e:"🛒",l:"Marketplace",p:"marketplace"},{e:"⛅",l:"Weather",p:"weather"},
    {e:"🤖",l:"AI Assistant",p:"ai"},{e:"📚",l:"Training",p:"training"},
    {e:"📊",l:"Prices",p:"prices"},{e:"📰",l:"Blog",p:"blog"},
    {e:"📄",l:"Resources",p:"resources"},{e:"📞",l:"Contact",p:"contact"},
  ];
  return (
    <div>
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Farmer Dashboard</h1>
            <p className="text-green-300 text-sm mt-1">Welcome back, <strong className="text-white">{user?.fullName}</strong> 👋</p>
          </div>
          <div className="text-6xl">👨‍🌾</div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((s,i)=>(
            <Card key={i} className="p-6 text-center">
              <div className="text-3xl mb-2">{s.e}</div>
              <div className="text-2xl font-extrabold text-gray-900">{s.n}</div>
              <div className="text-gray-400 text-xs mt-1">{s.l}</div>
            </Card>
          ))}
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-5">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-10">
          {quickLinks.map((item,i)=>(
            <button key={i} onClick={()=>setPage(item.p)} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 text-center hover:shadow-md hover:border-green-200 transition-all">
              <div className="text-2xl mb-1">{item.e}</div>
              <div className="font-semibold text-xs text-gray-700">{item.l}</div>
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-extrabold text-gray-900 mb-4">🌾 My Farm Profile</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Name</span><span className="font-semibold text-gray-900">{user?.fullName}</span></div>
              <div className="flex justify-between"><span>Email</span><span className="font-semibold text-gray-900">{user?.email}</span></div>
              <div className="flex justify-between"><span>Role</span><span className="font-semibold text-green-700 capitalize">{user?.role}</span></div>
              <div className="flex justify-between"><span>State</span><span className="font-semibold text-gray-900">{user?.state||"Kano State"}</span></div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-extrabold text-gray-900 mb-4">📢 Latest Notifications</h3>
            <div className="space-y-3">
              {[
                {e:"🌧️",t:"Heavy rain expected Friday — delay fertilizer application"},
                {e:"📈",t:"Maize prices rose 3.2% this week at Dawanau Market"},
                {e:"🎓",t:"New course available: Soil Health & Fertilizer Use"},
              ].map((n,i)=>(
                <div key={i} className="flex gap-3 items-start text-sm p-3 bg-gray-50 rounded-xl">
                  <span className="text-xl">{n.e}</span>
                  <span className="text-gray-600">{n.t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminPage({ setPage }) {
  const stats = [
    {n:"5,000",l:"Registered Farmers",e:"👨‍🌾",color:"text-green-700"},
    {n:"1,250",l:"Buyers",e:"🛒",color:"text-yellow-600"},
    {n:"2,140",l:"Products Listed",e:"📦",color:"text-blue-600"},
    {n:"₦45M",l:"Monthly Transactions",e:"💵",color:"text-red-600"},
  ];
  const modules = [
    {e:"👥",t:"Manage Farmers",p:"dashboard"},{e:"🛒",t:"Marketplace",p:"marketplace"},
    {e:"💵",t:"Commodity Prices",p:"prices"},{e:"🎓",t:"Training Centre",p:"training"},
    {e:"📰",t:"Blog",p:"blog"},{e:"📊",t:"Reports",p:"dashboard"},
    {e:"🔔",t:"Notifications",p:"dashboard"},{e:"⚙️",t:"Settings",p:"dashboard"},
  ];
  return (
    <div>
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1"><span className="text-3xl">🛡️</span><h1 className="text-3xl font-extrabold">Administrator Dashboard</h1></div>
          <p className="text-green-300 text-sm">Full platform management — {COMPANY}</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((s,i)=>(
            <Card key={i} className="p-7 text-center">
              <div className="text-3xl mb-2">{s.e}</div>
              <div className={`text-3xl font-extrabold ${s.color}`}>{s.n}</div>
              <div className="text-gray-500 text-xs mt-1">{s.l}</div>
            </Card>
          ))}
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Platform Management</h2>
        <div className="grid md:grid-cols-4 gap-5 mb-10">
          {modules.map((m,i)=>(
            <button key={i} onClick={()=>setPage(m.p)} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7 text-center hover:shadow-md hover:border-green-200 transition-all">
              <div className="text-4xl mb-3">{m.e}</div>
              <div className="font-bold text-gray-800 text-sm">{m.t}</div>
            </button>
          ))}
        </div>
        <Card className="p-8">
          <h2 className="text-xl font-extrabold text-green-800 mb-5">🛡️ Administrator Profile</h2>
          <div className="flex items-center gap-5">
            <div className="text-6xl">👨‍💼</div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">{COMPANY}</div>
              <div className="text-gray-500 text-sm">Platform Administrator</div>
              <div className="text-gray-500 text-sm">{EMAIL}</div>
              <div className="text-gray-500 text-sm">{ADDRESS}</div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

// ─── AI ASSISTANT ─────────────────────────────────────────────────────────────
function AIPage({ toast }) {
  const [messages, setMessages] = useState([
    {from:"ai",text:"👋 Welcome to U.I Khaleel Agrilink AI Assistant! I can help you with:\n\n🌽 Crop production & management\n🐄 Livestock & poultry farming\n🌧️ Weather-based farming advice\n💰 Market prices & selling tips\n🐛 Pest & disease management\n\nType your question below or choose a suggested topic!"}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const suggestions = [
    "How do I control Fall Armyworm in maize?",
    "What fertilizer is best for rice farming?",
    "How can I improve poultry egg production?",
    "When is the best time to plant sorghum in Kano?",
    "How do I manage cassava mosaic disease?",
    "What are the best fish species for pond farming?",
  ];

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  const send = async (msg) => {
    const text = msg || input.trim();
    if(!text||loading) return;
    setInput("");
    setMessages(prev=>[...prev,{from:"user",text}]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ message: text })
      });
      const data = await res.json();
      const reply = data.reply || "I couldn't process that. Please try again or call us on "+PHONE1+" for direct support.";
      setMessages(prev=>[...prev,{from:"ai",text:reply}]);
    } catch {
      setMessages(prev=>[...prev,{from:"ai",text:"Our AI is temporarily unavailable. Please call "+PHONE1+" for immediate farming support, or visit our Training Centre for guides."}]);
    }
    setLoading(false);
  };

  return (
    <div>
      <PageHero title="AI Farming Assistant" subtitle="Get expert farming advice anytime. Powered by advanced AI." emoji="🤖" />
      <section className="max-w-4xl mx-auto py-8 px-5">
        <Card className="overflow-hidden">
          {/* Chat window */}
          <div className="h-[450px] overflow-y-auto p-5 space-y-4 bg-gray-50">
            {messages.map((m,i)=>(
              <div key={i} className={`flex ${m.from==="user"?"justify-end":"justify-start"}`}>
                <div className={`max-w-xs sm:max-w-md px-5 py-3 rounded-2xl text-sm leading-7 whitespace-pre-line
                  ${m.from==="user"?"bg-green-700 text-white rounded-br-sm":"bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading&&(
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm">
                  <div className="flex gap-1">{[0,1,2].map(i=><div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}</div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
          {/* Input */}
          <div className="border-t border-gray-100 p-4 bg-white">
            <div className="flex gap-3">
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
                placeholder="Ask your farming question..." disabled={loading}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"/>
              <Btn onClick={()=>send()} variant="green" disabled={loading||!input.trim()} className="px-6">Send 📨</Btn>
            </div>
          </div>
        </Card>

        {/* Suggestions */}
        <div className="mt-6">
          <div className="text-sm font-bold text-gray-700 mb-3">💡 Suggested Questions</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>send(s)} disabled={loading}
                className="bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 text-left px-4 py-3 rounded-xl text-sm text-gray-700 transition-all flex items-start gap-2">
                <span className="text-green-500 shrink-0">🌿</span>{s}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── WEATHER PAGE ─────────────────────────────────────────────────────────────
function WeatherPage() {
  const w = WEATHER_DATA;
  return (
    <div>
      <PageHero title="Weather Dashboard" subtitle="5-day weather forecasts and farming recommendations for your area." emoji="⛅" />
      <section className="max-w-7xl mx-auto py-10 px-6">
        {/* Current */}
        <div className="mb-8 p-5 bg-green-800 text-white rounded-2xl flex flex-wrap items-center gap-4 justify-between">
          <div><div className="text-green-300 text-sm font-semibold">Current Weather</div><div className="text-2xl font-extrabold">{w.city}, Kano State</div></div>
          <div className="text-5xl font-extrabold text-yellow-400">{w.temp}</div>
          <div className="text-green-200 text-sm">{w.condition}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {[{e:"🌡️",v:w.temp,l:"Temperature"},{e:"💧",v:w.humidity,l:"Humidity"},{e:"💨",v:w.wind,l:"Wind Speed"},{e:"🌧️",v:w.rain,l:"Rain Chance"}]
            .map((s,i)=>(
              <Card key={i} className="p-7 text-center">
                <div className="text-4xl mb-3">{s.e}</div>
                <div className="text-2xl font-extrabold text-gray-900">{s.v}</div>
                <div className="text-gray-400 text-sm mt-1">{s.l}</div>
              </Card>
            ))}
        </div>

        {/* Forecast */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-5">5-Day Forecast — Kano State</h2>
        <div className="grid grid-cols-5 gap-4 mb-10">
          {w.forecast.map((d,i)=>(
            <Card key={i} className="p-5 text-center">
              <div className="font-extrabold text-gray-700 text-sm mb-2">{d.day}</div>
              <div className="text-3xl mb-2">{d.emoji}</div>
              <div className="text-xs text-gray-500 mb-1">{d.condition}</div>
              <div className="text-xl font-extrabold text-gray-900">{d.temp}</div>
              <div className="text-blue-500 text-xs mt-1">🌧 {d.rain}</div>
            </Card>
          ))}
        </div>

        {/* Advisory */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-7">
          <h3 className="text-xl font-extrabold text-yellow-800 mb-3">🌾 Farming Recommendation</h3>
          <p className="text-yellow-700 leading-7">{w.advice}</p>
        </div>
      </section>
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────────────────────
function FAQPage() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about U.I Khaleel Agrilink Solutions." emoji="❓" />
      <section className="max-w-4xl mx-auto py-16 px-6 space-y-3">
        {FAQS.map((faq,i)=>(
          <Card key={i} className="overflow-hidden">
            <button onClick={()=>setOpen(open===i?null:i)}
              className="w-full text-left px-7 py-5 flex items-center justify-between font-bold text-gray-900 hover:bg-green-50 transition-colors">
              <span className="text-sm md:text-base">{faq.q}</span>
              <span className={`text-gray-400 transition-transform duration-200 ml-3 shrink-0 ${open===i?"rotate-180":""}`}>▼</span>
            </button>
            {open===i&&<div className="px-7 pb-6 text-gray-600 text-sm leading-7 border-t border-gray-50 pt-4">{faq.a}</div>}
          </Card>
        ))}
      </section>
    </div>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function GalleryPage() {
  const items = [
    {e:"🌾",t:"Grain Harvest",bg:"from-yellow-50 to-amber-50"},
    {e:"🚜",t:"Farm Mechanization",bg:"from-green-50 to-emerald-50"},
    {e:"👨‍🌾",t:"Farmer Training",bg:"from-blue-50 to-cyan-50"},
    {e:"🐄",t:"Livestock Farming",bg:"from-orange-50 to-amber-50"},
    {e:"🌽",t:"Maize Production",bg:"from-yellow-50 to-lime-50"},
    {e:"🐓",t:"Poultry Farming",bg:"from-red-50 to-orange-50"},
    {e:"🐟",t:"Fish Farming",bg:"from-blue-50 to-teal-50"},
    {e:"🥜",t:"Groundnut Processing",bg:"from-amber-50 to-yellow-50"},
    {e:"🌱",t:"Seedling Nursery",bg:"from-green-50 to-lime-50"},
    {e:"💧",t:"Irrigation System",bg:"from-sky-50 to-blue-50"},
    {e:"🔬",t:"Research & Innovation",bg:"from-purple-50 to-violet-50"},
    {e:"📦",t:"Commodity Trading",bg:"from-gray-50 to-slate-50"},
  ];
  return (
    <div>
      <PageHero title="Photo Gallery" subtitle="Explore agriculture through our collection of photographs from across Nigeria." emoji="📷" />
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((item,i)=>(
            <div key={i} className={`bg-gradient-to-br ${item.bg} border border-gray-100 rounded-2xl h-56 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer group`}>
              <div className="text-7xl mb-3 group-hover:scale-110 transition-transform">{item.e}</div>
              <div className="font-semibold text-gray-700 text-sm">{item.t}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsPage() {
  return (
    <div>
      <PageHero title="Testimonials" subtitle="What farmers and agribusiness professionals say about us." emoji="💬" />
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-8">
        {[...TESTIMONIALS,...TESTIMONIALS].slice(0,6).map((t,i)=>(
          <Card key={i} className="p-8">
            <div className="text-4xl text-green-600 font-serif mb-5 leading-none">"</div>
            <p className="text-gray-600 text-sm leading-8 mb-6">{t.message}</p>
            <div className="flex gap-0.5 mb-4">{[...Array(t.rating)].map((_,j)=><span key={j} className="text-yellow-400 text-lg">★</span>)}</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">👤</div>
              <div>
                <div className="font-extrabold text-gray-900 text-sm">{t.name}</div>
                <div className="text-green-600 text-xs">{t.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

// ─── PARTNERS ─────────────────────────────────────────────────────────────────
function PartnersPage({ setPage }) {
  return (
    <div>
      <PageHero title="Partners & Collaborations" subtitle="Building strategic partnerships to transform agriculture across Nigeria." emoji="🤝" />
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-8 mb-4">
        {[
          {e:"🏛️",t:"Government Agencies",d:"Collaboration with Federal and State agricultural ministries, departments and agencies including FMARD, state ADPs and extension services."},
          {e:"🎓",t:"Universities & Research",d:"Working with Bayero University Kano, ABU Zaria, IITA, and other institutions to advance agricultural research and innovation."},
          {e:"🌍",t:"Development Partners",d:"Supporting food security and sustainable agriculture projects with NGOs, international organisations and development banks."},
          {e:"🏢",t:"Private Sector",d:"Connecting agribusinesses, financial institutions, insurance companies and investors with smallholder farmers across Nigeria."},
        ].map((p,i)=>(
          <Card key={i} className="p-8">
            <div className="text-5xl mb-4">{p.e}</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">{p.t}</h2>
            <p className="text-gray-500 text-sm leading-7">{p.d}</p>
          </Card>
        ))}
      </section>
      <section className="bg-green-800 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-extrabold mb-4">Become a Partner</h2>
        <p className="text-green-200 max-w-2xl mx-auto text-sm leading-8 mb-8">We welcome partnerships with government agencies, universities, NGOs, agribusinesses, financial institutions, technology companies and development organisations committed to transforming Nigerian agriculture.</p>
        <Btn onClick={()=>setPage("contact")} variant="yellow" className="mx-auto px-8 py-4 text-base">Get In Touch →</Btn>
      </section>
    </div>
  );
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function ResourcesPage({ toast }) {
  return (
    <div>
      <PageHero title="Resources Library" subtitle="Download free agricultural guides, manuals and market reports." emoji="📚" />
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RESOURCES.map((r,i)=>(
          <Card key={i} className="p-7">
            <div className="text-4xl mb-4">{r.emoji}</div>
            <Badge color="green">{r.category}</Badge>
            <h2 className="text-lg font-extrabold text-gray-900 mt-3 mb-1">{r.title}</h2>
            <p className="text-gray-400 text-xs mb-1">{r.pages} pages · PDF · Free</p>
            <p className="text-gray-400 text-xs mb-5">Published: July 2026</p>
            <Btn onClick={()=>toast(`"${r.title}" download started!`,"success")} variant="green" className="w-full">
              ⬇️ Download Free
            </Btn>
          </Card>
        ))}
      </section>
    </div>
  );
}

// ─── AWARDS ───────────────────────────────────────────────────────────────────
function AwardsPage() {
  return (
    <div>
      <PageHero title="Awards & Recognition" subtitle="Celebrating excellence, innovation and impact in Nigerian agriculture." emoji="🏆" />
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {[
          {e:"🏆",t:"Innovation in Agriculture",d:"Excellence in agricultural technology and digital innovation."},
          {e:"🥇",t:"Agribusiness Excellence",d:"Outstanding performance in agribusiness development."},
          {e:"📜",t:"Professional Certification",d:"Recognised professional standards in agricultural extension."},
          {e:"🏅",t:"Community Service Award",d:"Outstanding impact on farming communities across Nigeria."},
        ].map((a,i)=>(
          <Card key={i} className="p-8 text-center">
            <div className="text-6xl mb-4">{a.e}</div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-2">{a.t}</h2>
            <p className="text-gray-400 text-xs leading-5 mb-4">{a.d}</p>
            <Badge color="yellow">Coming Soon</Badge>
          </Card>
        ))}
      </section>
      <section className="bg-green-50 py-14 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-green-800 mb-4">Our Commitment to Excellence</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-8 text-sm">U.I Khaleel Agrilink Solutions is committed to excellence, innovation and sustainable agricultural development. As our organisation grows, this page will showcase our awards, certifications, strategic recognitions and professional achievements across the agricultural sector.</p>
      </section>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useLocalStorage("agrilink_user", null);
  const [cart, setCart] = useLocalStorage("agrilink_cart", []);
  const [toastData, setToastData] = useState(null);
  const [blogPost, setBlogPost] = useState(null);

  const toast = (msg, type="success") => setToastData({msg,type,id:Date.now()});
  const logout = () => { setUser(null); setPage("home"); toast("Logged out successfully.","info"); };

  const navSetPage = (p) => {
    if((p==="dashboard"||p==="admin")&&!user){ setPage("login"); return; }
    setPage(p);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const pages = {
    home: <HomePage setPage={navSetPage} />,
    about: <AboutPage />,
    services: <ServicesPage />,
    marketplace: <MarketplacePage cart={cart} setCart={setCart} toast={toast} />,
    prices: <PricesPage />,
    training: <TrainingPage toast={toast} />,
    blog: <BlogPage setPage={navSetPage} setBlogPost={setBlogPost} />,
    "blog-detail": <BlogDetailPage post={blogPost} setPage={navSetPage} />,
    contact: <ContactPage toast={toast} />,
    register: <RegisterPage setPage={navSetPage} setUser={setUser} toast={toast} />,
    login: <LoginPage setPage={navSetPage} setUser={setUser} toast={toast} />,
    dashboard: user ? <DashboardPage user={user} setPage={navSetPage} /> : <LoginPage setPage={navSetPage} setUser={setUser} toast={toast} />,
    admin: user?.role==="admin" ? <AdminPage setPage={navSetPage} /> : <LoginPage setPage={navSetPage} setUser={setUser} toast={toast} />,
    ai: <AIPage toast={toast} />,
    weather: <WeatherPage />,
    faq: <FAQPage />,
    gallery: <GalleryPage />,
    testimonials: <TestimonialsPage />,
    partners: <PartnersPage setPage={navSetPage} />,
    resources: <ResourcesPage toast={toast} />,
    awards: <AwardsPage />,
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar page={page} setPage={navSetPage} user={user} cart={cart} onLogout={logout} />
      <main className="flex-1">{pages[page] || pages.home}</main>
      <Footer setPage={navSetPage} />

      {/* Floating WhatsApp */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-40 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Toast */}
      {toastData && <Toast key={toastData.id} msg={toastData.msg} type={toastData.type} onClose={()=>setToastData(null)} />}
    </div>
  );
}
