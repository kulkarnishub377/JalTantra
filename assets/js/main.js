document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // --- CONFIGURATION ---
    const apiKey = "__REPLACE_WITH_YOUR_API_KEY__";
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    let currentLang = 'en';

    // --- ANIMATED BACKGROUND (Original Particles) ---
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];
        function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; createParticles(); }
        function createParticles() {
            particles = []; const count = Math.floor(width / 50);
            for(let i=0; i<count; i++) { particles.push({x: Math.random()*width, y: Math.random()*height, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, size: Math.random()*2 + 1, alpha: Math.random()*0.5}); }
        }
        function animate() {
            ctx.clearRect(0, 0, width, height); ctx.fillStyle = '#059669';
            particles.forEach(p => { p.x += p.vx; p.y += p.vy; if(p.x < 0 || p.x > width) p.vx *= -1; if(p.y < 0 || p.y > height) p.vy *= -1; ctx.globalAlpha = p.alpha; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill(); });
            requestAnimationFrame(animate);
        }
        window.addEventListener('resize', resize); resize(); animate();
    }

    // --- TRANSLATIONS (Full) ---
    const translations = {
        'en': {
            nav_home: 'Home', nav_iot: 'IoT Live', nav_ai: 'AI Labs', nav_market: 'Market', nav_schemes: 'Schemes',
            hero_desc: 'The world\'s first operating system for the Indian Farmer. Integrate satellite data, market intelligence, and automated irrigation in one dashboard.',
            btn_ai: 'Access AI Tools', btn_radar: 'Live Radar', weather_label: 'Live from Pune Field #4',
            iot_subtitle: 'Field Telemetry', iot_title: 'Smart Irrigation Dashboard', btn_ai_advisor: 'AI Advisor',
            radar_subtitle: 'Satellite Intelligence', radar_title: 'Live Rain Radar', btn_locate: 'Locate Farm',
            ai_title: 'JalTantra AI Suite', ai_desc: 'Diagnostic & Advisory Tools',
            tool1_title: 'Crop Doctor', tool1_desc: 'Identify diseases from photos.', lbl_upload: 'Upload', btn_diagnose: 'Diagnose',
            tool2_title: 'Smart Farm Planner', tool2_desc: 'Daily tasks based on weather.', ph_enter_crop: 'Enter Crop (e.g. Wheat)', lbl_context: 'Syncs with live weather', btn_plan: 'Generate Plan',
            tool5_title: 'Soil Health Decoder', tool5_desc: 'Analyze NPK reports.', btn_soil: 'Analyze',
            tool6_title: 'Profit Calculator', tool6_desc: 'Estimate Cost vs Revenue.', ph_enter_crop: 'Crop Name', ph_enter_acres: 'Land Size (Acres)', btn_calc: 'Calculate',
            tool3_title: 'Price Predictor', tool3_desc: 'Forecast Mandi rates.', btn_predict: 'Predict',
            tool4_title: 'Kisan Sahayak', tool4_desc: 'Speak in Hindi, Marathi, English.', chat_welcome: 'Namaste! Ask me anything.', ph_chat: 'Type...',
            market_title: 'Smart Commerce', market_desc: 'Negotiate better and draft contracts instantly.',
            tool_contract_title: 'Contract Drafter', btn_draft: 'Draft',
            tool_negot_title: 'Negotiation Coach', btn_coach: 'Get Strategy',
            scheme_title: 'Govt Schemes', scheme_desc: 'Find financial aid tailored for you.', scheme_ai_title: 'AI Scheme Matcher', btn_find_schemes: 'Find My Schemes',
            sch1_title: 'PM-Kisan', sch1_desc: '₹6000/year support.', sch3_title: 'PM-KUSUM', sch3_desc: 'Solar pump subsidy.',
            footer_desc: 'Empowering 1.4 Billion Indians.',
            ticker_apmc: 'PUNE APMC LIVE:', ticker_alert: 'WEATHER ALERT:', ticker_msg: 'Heavy rainfall alert for Ratnagiri & Sindhudurg. Keep livestock indoors.',
            crop_onion: 'Onion', crop_tomato: 'Tomato', crop_soybean: 'Soybean', crop_rice: 'Rice',
            hero_title_1: 'Smart Farming', hero_title_2: 'Simplified.', hero_badge: 'Active in 4,500+ Villages | v4.1'
        },
        'hi': {
            nav_home: 'होम', nav_iot: 'IoT लाइव', nav_ai: 'AI लैब्स', nav_market: 'बाज़ार', nav_schemes: 'योजनाएं',
            hero_desc: 'भारतीय किसान के लिए दुनिया का पहला ऑपरेटिंग सिस्टम। सैटेलाइट डेटा, मार्केट इंटेलिजेंस और स्वचालित सिंचाई एक ही डैशबोर्ड में।',
            btn_ai: 'AI टूल्स', btn_radar: 'लाइव रडार', weather_label: 'पुणे फील्ड #4 से लाइव',
            iot_subtitle: 'फील्ड टेलीमेट्री', iot_title: 'स्मार्ट सिंचाई डैशबोर्ड', btn_ai_advisor: 'AI सलाहकार',
            radar_subtitle: 'उपग्रह खुफिया', radar_title: 'लाइव वर्षा रडार', btn_locate: 'खेत खोजें',
            ai_title: 'जलतंत्र AI सुइट', ai_desc: 'निदान और सलाह उपकरण',
            tool1_title: 'फसल डॉक्टर', tool1_desc: 'फोटो से बीमारी पहचानें।', lbl_upload: 'अपलोड', btn_diagnose: 'निदान करें',
            tool2_title: 'स्मार्ट फार्म प्लानर', tool2_desc: 'मौसम के अनुसार दैनिक कार्य।', ph_enter_crop: 'फसल (जैसे गेहूं)', lbl_context: 'लाइव मौसम से लिंक', btn_plan: 'योजना बनाएं',
            tool5_title: 'मृदा डिकोडर', tool5_desc: 'NPK रिपोर्ट विश्लेषण।', btn_soil: 'विश्लेषण',
            tool6_title: 'लाभ कैलकुलेटर', tool6_desc: 'लागत बनाम आय का अनुमान।', ph_enter_crop: 'फसल का नाम', ph_enter_acres: 'जमीन (एकड़)', btn_calc: 'गणना करें',
            tool3_title: 'मूल्य पूर्वानुमान', tool3_desc: 'मंडी भाव का अनुमान।', btn_predict: 'अनुमान',
            tool4_title: 'किसान सहायक', tool4_desc: 'हिंदी, मराठी, अंग्रेजी में बोलें।', chat_welcome: 'नमस्ते! कुछ भी पूछें।', ph_chat: 'लिखें...',
            market_title: 'स्मार्ट कॉमर्स', market_desc: 'बेहतर मोलभाव और तुरंत अनुबंध।',
            tool_contract_title: 'अनुबंध निर्माता', btn_draft: 'बनाएं',
            tool_negot_title: 'मोलभाव कोच', btn_coach: 'रणनीति पाएं',
            scheme_title: 'सरकारी योजनाएं', scheme_desc: 'अपने लिए मदद खोजें।', scheme_ai_title: 'AI योजना खोजक', btn_find_schemes: 'मेरी योजनाएं',
            sch1_title: 'पीएम-किसान', sch1_desc: '₹6000/वर्ष सहायता।', sch3_title: 'पीएम-कुसुम', sch3_desc: 'सोलर पंप सब्सिडी।',
            footer_desc: '1.4 अरब भारतीयों को सशक्त बनाना।',
            ticker_apmc: 'पुणे APMC लाइव:', ticker_alert: 'मौसम चेतावनी:', ticker_msg: 'रत्नागिरी और सिंधुदुर्ग के लिए भारी बारिश का अलर्ट। पशुओं को अंदर रखें।',
            crop_onion: 'प्याज़', crop_tomato: 'टमाटर', crop_soybean: 'सोयाबीन', crop_rice: 'चावल',
            hero_title_1: 'स्मार्ट खेती', hero_title_2: 'आसान हो गई।', hero_badge: '4,500+ गांवों में सक्रिय | v4.1'
        },
        'mr': {
            nav_home: 'होम', nav_iot: 'IoT लाइव', nav_ai: 'AI लॅब्स', nav_market: 'बाजार', nav_schemes: 'योजना',
            hero_desc: 'भारतीय शेतकऱ्यासाठी जगातील पहिले ऑपरेटिंग सिस्टम. उपग्रह डेटा, मार्केट इंटेलिजन्स आणि स्वयंचलित सिंचन एकाच डॅशबोर्डवर.',
            btn_ai: 'AI टूल्स', btn_radar: 'लाइव रडार', weather_label: 'पुणे फील्ड #4 वरून थेट',
            iot_subtitle: 'फील्ड टेलिमेट्री', iot_title: 'स्मार्ट सिंचन डॅशबोर्ड', btn_ai_advisor: 'AI सल्लागार',
            radar_subtitle: 'उपग्रह बुद्धिमत्ता', radar_title: 'थेट पाऊस रडार', btn_locate: 'शेत शोधा',
            ai_title: 'जलतंत्र AI सुइट', ai_desc: 'निदान आणि सल्ला साधने',
            tool1_title: 'पीक डॉक्टर', tool1_desc: 'फोटोवरून रोग ओळखा.', lbl_upload: 'अपलोड', btn_diagnose: 'निदान करा',
            tool2_title: 'स्मार्ट फार्म प्लॅनर', tool2_desc: 'हवामानानुसार दैनंदिन कामे.', ph_enter_crop: 'पीक (उदा. गहू)', lbl_context: 'थेट हवामानाशी लिंक', btn_plan: 'योजना बनवा',
            tool5_title: 'मृदा डिकोडर', tool5_desc: 'NPK रिपोर्ट विश्लेषण.', btn_soil: 'विश्लेषण',
            tool6_title: 'नफा कॅल्क्युलेटर', tool6_desc: 'खर्च विरुद्ध उत्पन्नाचा अंदाज.', ph_enter_crop: 'पिकाचे नाव', ph_enter_acres: 'जमीन (एकर)', btn_calc: 'गणना करा',
            tool3_title: 'भाव अंदाज', tool3_desc: 'बाजार भावाचा अंदाज.', btn_predict: 'अंदाज',
            tool4_title: 'किसान सहाय्यक', tool4_desc: 'मराठी, हिंदी, इंग्रजीत बोला.', chat_welcome: 'नमस्कार! काहीही विचारा.', ph_chat: 'लिहा...',
            market_title: 'स्मार्ट कॉमर्स', market_desc: 'चांगली वाटाघाटी आणि त्वरित करार.',
            tool_contract_title: 'करार मसुदा', btn_draft: 'बनवा',
            tool_negot_title: 'निगोशिएशन कोच', btn_coach: 'रणनीती मिळवा',
            scheme_title: 'सरकारी योजना', scheme_desc: 'तुमच्यासाठी मदत शोधा.', scheme_ai_title: 'AI योजना शोधक', btn_find_schemes: 'माझ्या योजना',
            sch1_title: 'पीएम-किसान', sch1_desc: '₹6000/वर्ष मदत.', sch3_title: 'पीएम-कुसुम', sch3_desc: 'सोलर पंप सबसिडी.',
            footer_desc: '१.४ अब्ज भारतीयांना सक्षम करणे.',
            ticker_apmc: 'पुणे APMC लाइव्ह:', ticker_alert: 'हवामान इशारा:', ticker_msg: 'रत्नागिरी आणि सिंधुदुर्गसाठी मुसळधार पावसाचा इशारा. जनावरांना आत ठेवा.',
            crop_onion: 'कांदा', crop_tomato: 'टोमॅटो', crop_soybean: 'सोयाबीन', crop_rice: 'तांदूळ',
            hero_title_1: 'स्मार्ट शेती', hero_title_2: 'सोपी झाली.', hero_badge: '4,500+ गावांमध्ये सक्रिय | v4.1'
        }
    };

    window.setLang = function(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if(translations[lang][key]) {
                el.innerText = translations[lang][key];
                if(el.tagName === 'INPUT') el.placeholder = translations[lang][key];
            }
        });
        ['en','hi','mr'].forEach(l => {
            const btn = document.getElementById('lang-'+l);
            if(l === lang) {
                btn.classList.remove('text-gray-500', 'hover:text-gray-900');
                btn.classList.add('lang-active', 'text-white', 'shadow-lg');
            } else {
                btn.classList.remove('lang-active', 'text-white', 'shadow-lg');
                btn.classList.add('text-gray-500', 'hover:text-gray-900');
            }
        });
    };

    // --- WEATHER & IOT SIMULATION ---
    async function fetchWeather() {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true`);
            const data = await res.json();
            document.getElementById('hero-temp').innerText = `${Math.round(data.current_weather.temperature)}°`;
            document.getElementById('hero-cond').innerText = "Clear";
            document.getElementById('hero-wind').innerText = `${data.current_weather.windspeed} km/h`;
        } catch(e) {}
    }
    fetchWeather();

    function updateIoT() {
        const m1 = 60 + Math.floor(Math.random() * 5);
        const m2 = 40 + Math.floor(Math.random() * 5);
        const t = 30 + Math.floor(Math.random() * 2);
        const h = 45 + Math.floor(Math.random() * 3);
        
        const valA = document.getElementById('val-a');
        if(valA) valA.innerText = m1 + '%';
        const valB = document.getElementById('val-b');
        if(valB) valB.innerText = m2 + '%';
        
        const iotTemp = document.getElementById('iot-temp');
        if(iotTemp) iotTemp.innerText = t + '°C';
        const iotHum = document.getElementById('iot-hum');
        if(iotHum) iotHum.innerText = h + '%';
        
        const c = 251.2; // Circumference for r=40
        const gaugeA = document.getElementById('gauge-a');
        if(gaugeA) gaugeA.style.strokeDashoffset = c - (c * m1 / 100);
        const gaugeB = document.getElementById('gauge-b');
        if(gaugeB) gaugeB.style.strokeDashoffset = c - (c * m2 / 100);
    }
    setInterval(updateIoT, 3000);
    document.getElementById('iot-refresh')?.addEventListener('click', updateIoT);

    // --- GENERIC GEMINI HANDLER ---
    async function callGemini(promptText, resultElementId, btnId, loadingText = "Thinking...", systemInstr = "") {
        const resBox = document.getElementById(resultElementId);
        const btn = document.getElementById(btnId);
        if (!resBox || !btn) return;

        const originalBtnHtml = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = `<span class="ai-loader"></span> ${loadingText}`;
        resBox.classList.remove('hidden');
        resBox.innerHTML = "<i>Connecting to Gemini Satellite...</i>";

        try {
            const res = await fetch(geminiUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                    systemInstruction: systemInstr ? { parts: [{ text: systemInstr }] } : undefined
                })
            });
            const data = await res.json();
            const mdText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Signal lost.";
            resBox.innerHTML = marked.parse(mdText);
        } catch (e) {
            resBox.innerText = "Connection Failed. Check API Key.";
        }
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
    }

    // --- FEATURE LISTENERS ---
    document.getElementById('ai-irrigate-btn')?.addEventListener('click', () => {
        const t = document.getElementById('iot-temp').innerText;
        const m = document.getElementById('val-a').innerText;
        callGemini(`Act as irrigation expert. Temp: ${t}, Moisture: ${m}. Crop: Cotton. Advice? Reply in ${currentLang} (1 sentence).`, 'iot-ai-res', 'ai-irrigate-btn', 'Analyzing...');
    });

    const fileInput = document.getElementById('crop-image-input');
    let imgBase64 = "";
    fileInput?.addEventListener('change', e => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = ev => {
                imgBase64 = ev.target.result.split(',')[1];
                document.getElementById('preview-img').src = ev.target.result;
                document.getElementById('preview-img').classList.remove('hidden');
                document.getElementById('preview-img').classList.add('block');
            };
            reader.readAsDataURL(file);
        }
    });

    // 1. Enhanced Crop Doctor Listener (Structured Report)
    document.getElementById('analyze-btn')?.addEventListener('click', async () => {
        if(!imgBase64) return alert("Upload image");
        const btn = document.getElementById('analyze-btn');
        const resBox = document.getElementById('doctor-result');
        const origHtml = btn.innerHTML;
        btn.innerHTML = '<span class="ai-loader"></span> Scanning...';
        resBox.classList.remove('hidden');
        
        const prompt = `Act as an expert Plant Pathologist. Analyze this crop image. Provide a detailed diagnosis report in ${currentLang}.
        Format: Markdown.
        Structure:
        ## 🦠 Diagnosis
        **Disease/Pest:** [Name]
        **Confidence:** [High/Medium/Low]

        ### 🔍 Symptoms Identified
        - [Symptom 1]
        - [Symptom 2]

        ### 🌿 Organic Solution
        - [Remedy 1]
        - [Remedy 2]

        ### 🧪 Chemical Treatment
        - [Fungicide/Pesticide Name] with dosage

        ### 🛡️ Future Prevention
        - [Tip 1]`;

        try {
            const res = await fetch(geminiUrl, { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: imgBase64 } }] }] }) 
            });
            const data = await res.json();
            resBox.innerHTML = marked.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "Error");
        } catch(e) { resBox.innerHTML = "Error"; }
        btn.innerHTML = origHtml;
    });

    document.getElementById('plan-btn')?.addEventListener('click', () => {
        const crop = document.getElementById('plan-crop').value;
        if(!crop) return alert("Enter crop");
        callGemini(`Farmer in Pune. Weather: Clear. Crop: ${crop}. 3 tasks for today. Reply in ${currentLang} (Markdown).`, 'plan-result', 'plan-btn', 'Planning...');
    });

    document.getElementById('soil-btn')?.addEventListener('click', () => {
        const n = document.getElementById('soil-n').value;
        if(!n) return alert("Enter N");
        callGemini(`Analyze soil N=${n}. Suggest fertilizer. Reply in ${currentLang} (Markdown).`, 'soil-result', 'soil-btn', 'Decoding...');
    });

    document.getElementById('roi-btn')?.addEventListener('click', () => {
        const crop = document.getElementById('roi-crop').value;
        if(!crop) return alert("Enter crop");
        callGemini(`Estimate profit for ${crop} in India/acre. Table format. Reply in ${currentLang}.`, 'roi-result', 'roi-btn', 'Calculating...');
    });

    document.getElementById('pred-btn')?.addEventListener('click', () => {
        const crop = document.getElementById('pred-crop').value;
        if(!crop) return alert("Enter crop");
        callGemini(`Predict ${crop} price trend in Maharashtra. Reply in ${currentLang}.`, 'pred-result', 'pred-btn', 'Forecasting...');
    });

    document.getElementById('send-chat-btn')?.addEventListener('click', () => {
        const txt = document.getElementById('chat-input').value;
        if(!txt) return;
        const history = document.getElementById('chat-history');
        history.innerHTML += `<div class="flex justify-end gap-2"><div class="bg-emerald-600 p-2 rounded-lg rounded-tr-none text-white">${txt}</div></div>`;
        document.getElementById('chat-input').value = '';
        
        (async () => {
            try {
                const res = await fetch(geminiUrl, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ contents: [{ parts: [{ text: `You are Kisan Sahayak. User: "${txt}". Reply in ${currentLang} (short).` }] }] }) });
                const data = await res.json();
                const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";
                history.innerHTML += `<div class="flex gap-2"><div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px]"><i class="fa-solid fa-robot"></i></div><div class="bg-gray-100 p-2 rounded-lg rounded-tl-none text-gray-800">${marked.parse(reply)}</div></div>`;
                history.scrollTop = history.scrollHeight;
            } catch(e) {}
        })();
    });

    document.getElementById('contract-btn')?.addEventListener('click', () => {
        const buyer = document.getElementById('contract-buyer').value;
        if(!buyer) return alert("Enter buyer");
        callGemini(`Draft farming contract for buyer ${buyer}. Reply in ${currentLang} (Markdown).`, 'contract-result', 'contract-btn', 'Drafting...');
    });

    document.getElementById('negot-btn')?.addEventListener('click', () => {
        const sit = document.getElementById('negot-situation').value;
        if(!sit) return alert("Enter situation");
        callGemini(`Negotiation help: "${sit}". 3 arguments. Reply in ${currentLang}.`, 'negot-result', 'negot-btn', 'Thinking...');
    });

    // Export Manager Listener
    document.getElementById('export-btn')?.addEventListener('click', () => {
        const crop = document.getElementById('export-crop').value;
        if(!crop) return alert("Enter crop");
        callGemini(`Act as Export Consultant. Crop: ${crop}. List top 3 export countries from India and 1 key quality standard for each. Reply in ${currentLang}.`, 'export-result', 'export-btn', 'Checking Global Markets...');
    });

    // Intercropping Genius Listener
    document.getElementById('inter-btn')?.addEventListener('click', () => {
        const crop = document.getElementById('inter-crop').value;
        if(!crop) return alert("Enter crop");
        callGemini(`Suggest 2 best intercrops for ${crop} to increase income and soil health. Reply in ${currentLang}.`, 'inter-result', 'inter-btn', 'Finding Pairs...');
    });

    // Pashu Vaidya Listener
    document.getElementById('vet-btn')?.addEventListener('click', () => {
        const animal = document.getElementById('vet-animal').value;
        const sym = document.getElementById('vet-symptom').value;
        if(!animal || !sym) return alert("Enter details");
        callGemini(`Act as a Veterinarian. Animal: ${animal}. Symptoms: ${sym}. Diagnosis and immediate home remedies? Reply in ${currentLang} (Markdown).`, 'vet-result', 'vet-btn', 'Diagnosing...');
    });

    // Yantra Doctor Listener
    document.getElementById('mech-btn')?.addEventListener('click', () => {
        const equip = document.getElementById('mech-equip').value;
        const prob = document.getElementById('mech-issue').value;
        if(!equip || !prob) return alert("Enter details");
        callGemini(`Act as a Mechanic. Equipment: ${equip}. Problem: ${prob}. 3 troubleshooting steps? Reply in ${currentLang} (Markdown).`, 'mech-result', 'mech-btn', 'Troubleshooting...');
    });

    document.getElementById('find-schemes-btn')?.addEventListener('click', () => {
        const land = document.getElementById('scheme-land').value;
        if(!land) return alert("Enter details");
        callGemini(`Suggest 3 Indian govt schemes for farmer with ${land} acres. Reply in ${currentLang} (Markdown list).`, 'scheme-results', 'find-schemes-btn', 'Searching DB...');
    });

    // --- NAVBAR MOBILE TOGGLE ---
    const mobileToggle = document.querySelector('.lg\\:hidden');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu-overlay';
    mobileMenu.className = 'fixed inset-0 z-50 bg-white transform translate-x-full transition-transform duration-300 lg:hidden flex flex-col p-6';
    mobileMenu.innerHTML = `
        <button id="mobile-close" class="self-end text-3xl mb-8">&times;</button>
        <a href="#home" class="mb-4 text-xl font-bold" onclick="closeMobileMenu()">Home</a>
        <a href="#iot" class="mb-4 text-xl font-bold" onclick="closeMobileMenu()">IoT Public</a>
        <a href="#ai-labs" class="mb-4 text-xl font-bold" onclick="closeMobileMenu()">AI Labs</a>
        <a href="#market" class="mb-4 text-xl font-bold" onclick="closeMobileMenu()">Market</a>
    `;
    document.body.appendChild(mobileMenu);

    function openMobileMenu() {
        document.getElementById('mobile-menu-overlay').classList.remove('translate-x-full');
    }
    window.closeMobileMenu = function() {
        document.getElementById('mobile-menu-overlay').classList.add('translate-x-full');
    }

    if(mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
    document.getElementById('mobile-close')?.addEventListener('click', closeMobileMenu);

});
