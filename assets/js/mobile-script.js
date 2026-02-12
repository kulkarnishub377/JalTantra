/* JalTantra Pro Mobile Logic v2.0 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SYSTEM FUNDAMENTALS ---
    
    // Splash Screen Handling
    const splash = document.getElementById('splash-screen');
    if(splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => splash.remove(), 500);
            document.getElementById('app-shell').style.display = 'flex';
            setTimeout(() => document.getElementById('app-shell').style.opacity = '1', 50);
            showNotification('Welcome back, Ramesh!', 'fa-user-check', 'text-emerald-600');
        }, 1500);
    }

    // Dynamic Clock & Greeting
    function updateSystem() {
        const now = new Date();
        const timeEl = document.getElementById('status-time');
        const greetingEl = document.getElementById('greeting');
        
        if(timeEl) {
            const h = now.getHours();
            const m = now.getMinutes().toString().padStart(2, '0');
            timeEl.textContent = `${h}:${m}`;
        }
        
        if(greetingEl) {
            const h = now.getHours();
            let g = 'Good Morning';
            if(h >= 12) g = 'Good Afternoon';
            if(h >= 18) g = 'Good Evening';
            greetingEl.textContent = `${g},`;
        }
    }
    setInterval(updateSystem, 1000);
    updateSystem();

    // Battery Integration
    if ('getBattery' in navigator) {
        navigator.getBattery().then(b => {
             updateBattery(b);
             b.addEventListener('levelchange', () => updateBattery(b));
             b.addEventListener('chargingchange', () => updateBattery(b));
        });
    }
    function updateBattery(b) {
        const el = document.getElementById('battery-level');
        const icon = document.getElementById('battery-icon');
        if(el) el.textContent = `${Math.round(b.level * 100)}%`;
        if(icon) {
            icon.className = b.charging ? 'fa-solid fa-bolt text-yellow-500' 
                : b.level > 0.2 ? 'fa-solid fa-battery-full text-emerald-600' 
                : 'fa-solid fa-battery-quarter text-red-500';
        }
    }

    // --- 2. NAVIGATION & TABS ---
    
    const tabs = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id^="tab-"]');
    
    window.switchTab = (tabId) => {
        // Hide all sections
        sections.forEach(s => s.classList.add('hidden'));
        
        // Reset Nav Buttons
        tabs.forEach(t => {
            t.classList.remove('active', 'text-emerald-600');
            t.classList.add('text-slate-400');
        });
        
        // Show Target
        const target = document.getElementById(`tab-${tabId}`);
        if(target) target.classList.remove('hidden');
        
        // Highlight Nav Button
        const btn = document.querySelector(`.nav-item[onclick="switchTab('${tabId}')"]`);
        if(btn) {
            btn.classList.add('active', 'text-emerald-600');
            btn.classList.remove('text-slate-400');
        }
    };

    // --- 3. MOTOR SIMULATION ---
    
    let isMotorRunning = false;
    window.toggleMotor = () => {
        const btn = document.getElementById('motor-btn');
        const status = document.getElementById('motor-status');
        const icon = btn.querySelector('i');
        
        isMotorRunning = !isMotorRunning;
        
        // Vibration feedback (if supported)
        if(navigator.vibrate) navigator.vibrate(50);
        
        if(isMotorRunning) {
            btn.classList.add('is-running');
            icon.className = 'fa-solid fa-power-off text-emerald-600';
            status.innerHTML = '<span class="animate-pulse">RUNNING</span>';
            status.className = 'font-bold text-emerald-600 mt-4 tracking-widest text-sm';
            showNotification('Main Pump Started', 'fa-water', 'text-blue-500');
        } else {
            btn.classList.remove('is-running');
            icon.className = 'fa-solid fa-power-off text-slate-300';
            status.textContent = 'OFFLINE';
            status.className = 'font-bold text-slate-400 mt-4 tracking-widest text-sm';
            showNotification('Main Pump Stopped', 'fa-power-off', 'text-slate-500');
        }
    };

    // --- 4. SCANNER SIMULATION ---
    
    window.openScanner = () => {
        const modal = document.getElementById('tool-modal');
        const container = document.getElementById('modal-container');
        
        // Camera UI HTML
        container.innerHTML = `
            <div class="h-[80vh] bg-black rounded-t-3xl relative overflow-hidden flex flex-col">
                <!-- Camera Feed Simulation -->
                <div class="flex-1 bg-slate-900 relative">
                     <img src="https://images.unsplash.com/photo-1599583626394-b1523a67764d?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover opacity-80" id="camera-feed">
                     
                     <!-- Scanning Overlay -->
                     <div class="absolute inset-0 z-10 flex items-center justify-center">
                        <div class="w-64 h-64 border-2 border-emerald-500/50 rounded-lg relative">
                             <div class="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-500 -mt-1 -ml-1"></div>
                             <div class="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-500 -mt-1 -mr-1"></div>
                             <div class="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-500 -mb-1 -ml-1"></div>
                             <div class="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-500 -mb-1 -mr-1"></div>
                             <div class="w-full h-1 bg-emerald-500/80 absolute top-0 animate-[scan_2s_linear_infinite] shadow-[0_0_10px_#10b981]"></div>
                        </div>
                     </div>
                     
                     <div class="absolute top-4 right-4 z-20">
                         <button type="button" onclick="closeModal()" class="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button>
                     </div>
                </div>
                
                <!-- Controls -->
                <div class="h-32 bg-black flex items-center justify-center gap-8 pb-8">
                     <button type="button" class="w-12 h-12 rounded-full bg-slate-800 text-white"><i class="fa-solid fa-bolt"></i></button>
                     <button type="button" onclick="captureImage()" class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:scale-90 transition-transform"><div class="w-16 h-16 bg-white rounded-full"></div></button>
                     <button type="button" class="w-12 h-12 rounded-full bg-slate-800 text-white"><i class="fa-solid fa-image"></i></button>
                </div>
            </div>
        `;
        
        modal.classList.add('open');
        setTimeout(() => container.style.transform = 'translateY(0)', 10);
    };

    window.captureImage = () => {
        // Flash effect
        const feed = document.getElementById('camera-feed');
        feed.classList.add('brightness-200');
        setTimeout(() => feed.classList.remove('brightness-200'), 100);
        
        // Show Processing
        const container = document.getElementById('modal-container');
        container.innerHTML = `
            <div class="h-[50vh] bg-white rounded-t-3xl p-8 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                <h3 class="text-xl font-bold text-slate-800">Analyzing Crop...</h3>
                <p class="text-slate-500 text-sm mt-2">Checking for 140+ diseases</p>
            </div>
        `;
        
        // Show Result
        setTimeout(() => {
            container.innerHTML = `
                <div class="bg-white rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-y-auto">
                    <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-3xl">
                            <i class="fa-solid fa-bug"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-slate-800">Cercospora Leaf Spot</h3>
                            <p class="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full inline-block mt-1">Confidence: 94%</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 class="font-bold text-sm text-slate-800 mb-2"><i class="fa-solid fa-prescription-bottle-medical text-emerald-600 mr-2"></i>Treatment</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Spray Copper Oxychloride 50 WP @ 2.5 g/liter of water. Repeat after 15 days if necessary.</p>
                        </div>
                        
                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 class="font-bold text-sm text-slate-800 mb-2"><i class="fa-solid fa-shield-halved text-blue-600 mr-2"></i>Prevention</h4>
                             <p class="text-sm text-slate-600 leading-relaxed">Use certified disease-free seeds. Rotate crops with non-host plants like corn.</p>
                        </div>
                    </div>
                    
                    <button type="button" onclick="closeModal()" class="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold mt-6 shadow-lg shadow-emerald-200 active:scale-95 transition-transform">Done</button>
                </div>
            `;
        }, 2000);
    };

    // --- 5. TOOL MODALS ---
    
    const toolContent = {
        'crop-doctor': { title: 'Crop Doctor', icon: 'fa-user-doctor', text: 'Upload a photo of your crop to diagnose diseases instantly using AI.' },
        'soil-test': { title: 'Soil Health', icon: 'fa-flask', text: 'Connect your IoT Soil Sensor to analyze NPK, pH, and Moisture levels.' },
        'market-view': { title: 'Market View', icon: 'fa-sack-dollar', text: 'Real-time prices from 2000+ Mandis across India.' },
        'calculator': { title: 'Profit Calculator', icon: 'fa-calculator', text: 'Estimate your ROI based on crop type, acreage, and market rates.' },
        'profile': { title: 'Farmer Profile', icon: 'fa-id-card', text: 'Manage your personal details, farm records, and app settings here.' },
        'weather-plus': { title: 'Weather Plus', icon: 'fa-cloud-bolt', text: 'Hyper-local forecasts with rain alerts and humidity tracking.' },
        'schemes': { title: 'Gov Schemes', icon: 'fa-landmark', text: 'Browse and apply for latest government subsidies and grants.' },
        'community': { title: 'Kisan Sangh', icon: 'fa-users', text: 'Connect with 10k+ farmers. Share tips, ask questions, and grow together.' },
        'shop': { title: 'Agri Shop', icon: 'fa-cart-shopping', text: 'Buy seeds, fertilizers, and equipment at best prices.' },
        'expert-call': { title: 'Expert Call', icon: 'fa-headset', text: 'Get on a video call with an agriculture expert for personalized advice.' },
        'add-device': { title: 'Add New Device', icon: 'fa-plus', text: 'Search for nearby Bluetooth/Wi-Fi devices to connect. Ensure your device is in pairing mode.' }
    };

    window.openTool = (toolId) => {
        if(toolId === 'camera-scan') { openScanner(); return; }
        
        const modal = document.getElementById('tool-modal');
        const container = document.getElementById('modal-container');
        const data = toolContent[toolId] || { title: 'Feature Coming Soon', icon: 'fa-hammer', text: 'This feature is part of the JalTantra Pro suite.' };
        
        container.innerHTML = `
            <div class="bg-white rounded-t-3xl p-8 pb-12">
                <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8"></div>
                <div class="text-center">
                    <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                        <i class="fa-solid ${data.icon}"></i>
                    </div>
                    <h3 class="font-bold text-2xl text-slate-800 mb-2">${data.title}</h3>
                    <p class="text-slate-500 leading-relaxed px-4 mb-8">${data.text}</p>
                    
                    <button type="button" onclick="closeModal()" class="w-full bg-slate-900 text-white py-4 rounded-xl font-bold active:scale-95 transition-transform">Got it</button>
                </div>
            </div>
        `;
        
        modal.classList.add('open');
        setTimeout(() => container.style.transform = 'translateY(0)', 10);
    };

    window.openMarketDetail = (name, location, price, change, color) => {
        const modal = document.getElementById('tool-modal');
        const container = document.getElementById('modal-container');
        
        container.innerHTML = `
            <div class="bg-white rounded-t-3xl p-8 pb-12">
                <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h3 class="font-bold text-2xl text-slate-900">${name}</h3>
                        <p class="text-slate-500 ml-1"><i class="fa-solid fa-location-dot mr-1"></i> ${location} Mandi</p>
                    </div>
                    <div class="text-right">
                         <h2 class="font-bold text-3xl text-emerald-700">₹${price}</h2>
                         <p class="font-bold ${color} bg-slate-50 px-2 py-1 rounded inline-block mt-1">${change} today</p>
                    </div>
                </div>
                
                <div class="h-32 bg-slate-50 rounded-xl mb-6 flex items-end justify-between p-4 px-6 border border-slate-100">
                    <div class="w-4 bg-emerald-200 rounded-t h-1/2"></div>
                    <div class="w-4 bg-emerald-300 rounded-t h-2/3"></div>
                    <div class="w-4 bg-emerald-400 rounded-t h-3/4"></div>
                    <div class="w-4 bg-emerald-500 rounded-t h-full"></div>
                    <div class="w-4 bg-emerald-600 rounded-t h-4/5"></div>
                </div>
                
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <button class="py-3 bg-emerald-600 text-white rounded-xl font-bold active:scale-95 transition-transform"><i class="fa-solid fa-bell mr-2"></i>Set Alert</button>
                    <button onclick="closeModal()" class="py-3 bg-slate-100 text-slate-700 rounded-xl font-bold active:scale-95 transition-transform">Close</button>
                </div>
            </div>
        `;
         modal.classList.add('open');
        setTimeout(() => container.style.transform = 'translateY(0)', 10);
    };
    
    window.closeModal = () => {
        const modal = document.getElementById('tool-modal');
        const container = document.getElementById('modal-container');
        if(container) container.style.transform = 'translateY(100%)';
        setTimeout(() => modal.classList.remove('open'), 300);
    };

    // --- 6. NOTIFICATIONS ---
    
    function showNotification(msg, icon = 'fa-bell', color = 'text-emerald-500') {
        const notif = document.createElement('div');
        notif.className = 'fixed top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-[60] flex items-center gap-4 transform -translate-y-24 transition-transform duration-500 border border-slate-100';
        notif.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center ${color} text-xl"><i class="fa-solid ${icon}"></i></div>
            <div>
                <h4 class="font-bold text-sm text-slate-800">System Alert</h4>
                <p class="text-xs text-slate-500">${msg}</p>
            </div>
        `;
        document.body.appendChild(notif);
        
        // Slide In
        setTimeout(() => notif.style.transform = 'translateY(0)', 100);
        
        // Slide Out
        setTimeout(() => {
            notif.style.transform = 'translateY(-150%)';
            setTimeout(() => notif.remove(), 500);
        }, 3000);
    }
    
    // Language Toggle
    window.toggleLang = () => {
        const disp = document.getElementById('lang-display');
        if(disp.textContent === 'English') {
            disp.textContent = 'मराठी';
            showNotification('Language switched to Marathi', 'fa-language', 'text-orange-500');
        } else {
            disp.textContent = 'English';
             showNotification('Language switched to English', 'fa-language', 'text-blue-500');
        }
    }
});
