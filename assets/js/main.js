document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // IMPORTANT: remove or replace the placeholder below with your own API key.
    // Do NOT commit real private API keys into source control. Set as a runtime environment variable
    // or inject with your build system. For demo / local dev you may use a valid key here.
    const apiKey = "__REPLACE_WITH_YOUR_API_KEY__";
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    // language engine (persisted) — default to Marathi per user request
    let currentLang = localStorage.getItem('jalTantra_lang') || 'mr';

    // --- MODAL LOGIC ---
    window.closeModal = function() {
        const modal = document.getElementById('modal-overlay');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.setAttribute('aria-hidden', 'true');
    }

    // --- HELPERS ---
    // Copy to Clipboard
    window.copyToClipboard = function(btn) {
        const text = btn.getAttribute('data-text');
        
        // Fallback for restricted environments
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            
            // Ensure it's not visible but part of DOM
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i>';
                setTimeout(() => btn.innerHTML = original, 2000);
            } else {
                console.error('Fallback copy failed.');
            }
        } catch (err) {
            console.error('Unable to copy', err);
        }
    }

    // --- TRANSLATIONS ---
    const translations = {
        en: {
            nav_home: 'Home', nav_product: 'Hardware', nav_features: 'Solutions', nav_market: 'Market', nav_calc: 'Savings',
            hero_badge: 'Smart Farming System 2.0', hero_title_1: 'Farm Smarter,', hero_title_2: 'Earn Better.', hero_desc: 'Your complete digital dashboard. Monitor soil health, automate irrigation, and sell at the right price—all from one app.',
            btn_talk: 'Ask Sahayak', btn_calc_hero: 'Check Savings', ticker_label: 'LIVE MANDI RATES', chat_greet: 'Ram Ram! 🙏 Ask me anything!', chat_bubble: 'Ram Ram! 🙏 Need Help?',
            prod_title: 'JalTantra Controller Pro', prod_desc: 'Industrial grade smart irrigation controller. Solar powered, LoRaWAN enabled, and built for the harsh Indian fields.',
            feat_solar: 'Solar Powered', feat_lora: 'LoRaWAN Range', feat_ip65: 'IP65 Weatherproof', btn_order: 'Pre-Order Now',
            feat_solar_desc: 'Zero electricity needed. Runs 24/7 with built-in 5000mAh battery backup.',
            feat_lora_desc: 'Connect sensors up to 5km away. Works even in remote areas with no 4G.',
            feat_ip65_desc: 'Dust, rain, and heat proof. Engineered specifically for Indian conditions.',
            calc_title: 'Calculate Your Savings', market_title: 'Market Intelligence', tool_contract_title: 'Contract Drafter', scheme_title: 'Govt Schemes',
            solutions_desc: 'Smart & Sustainable Technology for the modern Indian field.',
            sol_irrig_title: 'Smart Irrigation', sol_irrig_desc: 'Precision watering using real-time weather & soil data to prevent wastage.',
            sol_disease_title: 'Disease AI', sol_disease_desc: 'Early detection using AI ensures healthier crops & reduced financial loss.',
            sol_health_title: 'Crop Health', sol_health_desc: 'Real-time sensor insights preventing pest attacks & soil degradation.',
            sol_planning_title: 'Crop Planning', sol_planning_desc: 'AI recommends best crops based on climate patterns & soil conditions.',
            sol_hw_title: 'Cost-Effective HW', sol_hw_desc: 'Durable, affordable IoT solutions built specifically for Indian farming.',
            sol_market_title: 'Direct Marketplace', sol_market_desc: 'Farmers sell directly to buyers, ensuring fair pricing & higher profits.',
            sol_insights_title: 'Market Insights', sol_insights_desc: 'AI-driven intelligence helps farmers predict demand & optimize sales.',
            sol_language_title: 'Multi-Language', sol_language_desc: 'Breaking barriers by providing technology in local regional languages.',
            farmers_trust: 'trust JalTantra', farmers_count: '4,500+ Farmers', trusted_villages: 'Trusted by 4,500+ Villages',
            hero_scan_placeholder: "Identify disease (e.g. 'Yellow leaves')...", placeholder_buyer: 'Buyer Name', placeholder_crop: 'Crop', placeholder_acres: 'Acres', placeholder_email: 'Email', placeholder_chat: 'Ask in Hindi/Marathi...',
            hero_scan_attached: 'Image attached! Click Diagnose ->',
            ai_thinking: 'Thinking...', connecting_text: 'Connecting to Satellite...', analyzing_text: 'Analyzing...', connection_error: 'Connection Error', check_settings: 'Check API key, network, and CORS settings.',
            input_symptom_missing: 'Type a symptom or upload a photo', calc_invalid: 'Please enter a valid farm area (acres) greater than 0.', demo_mode_message: 'Demo mode — API key not configured. Add your key to enable chat.', chat_error_text: 'Error',
            btn_diagnose: 'Diagnose', btn_draft: 'Draft Legal Agreement', btn_find_schemes: 'Find My Schemes', modal_title: 'Diagnosis Result', menu_title: 'Menu',
            solutions_badge: 'THE SOLUTION', solutions_title: 'Empowering Farmers', hardware_badge: 'HARDWARE', market_badge: 'SMART COMMERCE',
            calc_btn: 'Calculate Impact', calc_results_title: 'Estimated Seasonal Savings', label_select_crop: 'Select Crop', label_farm_area: 'Farm Area (Acres)',
            footer_platform: 'Platform', footer_resources: 'Resources', footer_newsletter: 'Newsletter'
            , footer_link_home: 'Home', footer_link_product: 'Hardware', footer_link_market: 'Marketplace', footer_link_blog: 'Blog', footer_link_help: 'Help Center', footer_link_schemes: 'Schemes', footer_copyright: '© 2025 JalTantra Solutions Pvt. Ltd.', skip_to_content: 'Skip to content',
            alt_mascot: 'JalTantra mascot — farmer character smiling and holding crops', alt_controller: 'Controller device illustration', alt_avatar: 'Farmer avatar image',
            radar_subtitle: 'Satellite Intelligence', radar_title: 'Live Rain Radar', btn_locate: 'Locate Farm',
            maps_subtitle: 'Weather Intelligence', maps_title: 'Detailed Weather Maps'
        },
        hi: {
            nav_home: 'होम', nav_product: 'हार्डवेयर', nav_features: 'समाधान', nav_market: 'बाजार', nav_calc: 'बचत',
            hero_badge: 'स्मार्ट खेती सिस्टम 2.0', hero_title_1: 'अधिक स्मार्ट खेती,', hero_title_2: 'अधिक आय।', hero_desc: 'आपका पूरा डिजिटल डैशबोर्ड। मृदा स्वास्थ्य की निगरानी, सिंचाई स्वचालन और सही कीमत पर बिक्री।',
            btn_talk: 'सहायक से पूछें', btn_calc_hero: 'बचत देखें', ticker_label: 'लाइव मंडी रेट्स', chat_greet: 'राम राम! 🙏 मुझसे कुछ भी पूछें!', chat_bubble: 'राम राम! 🙏 मदद चाहिए?',
            prod_title: 'JalTantra कंट्रोलर प्रो', prod_desc: 'इंडस्ट्रियल ग्रेड स्मार्ट सिंचाई कंट्रोलर। सोलर पावर्ड, LoRaWAN सक्षम।',
            feat_solar: 'सोलर पावर्ड', feat_lora: 'LoRaWAN रेंज', feat_ip65: 'IP65 वेदरप्रूफ', btn_order: 'प्री-ऑर्डर करें',
            calc_title: 'अपनी बचत की गणना करें', market_title: 'बाजार बुद्धिमत्ता', tool_contract_title: 'कॉन्ट्रैक्ट ड्राफ्टर', scheme_title: 'सरकारी योजनाएँ',
            solutions_desc: 'आधुनिक भारतीय खेत के लिए स्मार्ट और टिकाऊ टेक्नोलॉजी।',
            sol_irrig_title: 'स्मार्ट सिंचाई', sol_irrig_desc: 'मल्टी-रियल-टाइम मौसम और मिट्टी के डेटा का उपयोग कर सटीक सिंचाई।',
            sol_disease_title: 'रोग पहचान AI', sol_disease_desc: 'शुरूआती पहचान - फसल स्वास्थ्य बेहतर होती है और नुकसान कम होता है।',
            sol_health_title: 'फसल स्वास्थ्य', sol_health_desc: 'सीमांत सेंसर इनसाइट्स: कीट, मिट्टी क्षरण रोकने में मदद।',
            sol_planning_title: 'फसल योजना', sol_planning_desc: 'कलाइमेट पैटर्न्स और मिट्टी के अनुसार सर्वश्रेष्ठ फसल की सिफारिश।',
            sol_hw_title: 'लागत-प्रभावी हार्डवेयर', sol_hw_desc: 'टिकाऊ, किफायती IoT समाधान जो भारतीय खेती के लिए बनाए गए हैं।',
            sol_market_title: 'डायरेक्ट मार्केटप्लेस', sol_market_desc: 'किसान सीधे खरीदारों को बेचते हैं, सही कीमत और अधिक मुनाफा सुनिश्चित करते हैं।',
            sol_insights_title: 'बाजार अंतर्दृष्टि', sol_insights_desc: 'AI-ड्रिवन इंटेलिजेंस मांग की भविष्यवाणी कर बिक्री ऑप्टिमाइज़ करता है।',
            sol_language_title: 'मल्टी-लैंग्वेज', sol_language_desc: 'स्थानीय भाषाओं में तकनीक उपलब्ध कराकर बाधाएँ तोड़ना।',
            farmers_trust: 'हमें भरोसा करते हैं', farmers_count: '4,500+ किसान', trusted_villages: '4,500+ गाँवों द्वारा भरोसेमंद',
            hero_scan_placeholder: "रोग पहचानें (उदा. 'पीले पत्ते')...", placeholder_buyer: 'खरीदार का नाम', placeholder_crop: 'फसल', placeholder_acres: 'एकड़', placeholder_email: 'ईमेल', placeholder_chat: 'हिंदी/मराठी में पूछें...',
            hero_scan_attached: 'इमेज अटैच्ड! Diagnose पर क्लिक करें ->',
            ai_thinking: 'विचार किया जा रहा है...', connecting_text: 'सैटेलाइट से कनेक्ट कर रहे हैं...', analyzing_text: 'विश्लेषण कर रहे हैं...', connection_error: 'कनेक्शन त्रुटि', check_settings: 'API कुंजी, नेटवर्क और CORS सेटिंग्स जांचें।',
            input_symptom_missing: 'कृपया लक्षण टाइप करें या फोटो अपलोड करें', calc_invalid: 'कृपया 0 से अधिक एक मान्य खेत क्षेत्र (एकड़) दर्ज करें।', demo_mode_message: 'डेमो मोड — API की कॉन्फ़िगर नहीं है। चैट सक्षम करने के लिए अपनी कुंजी जोड़ें।', chat_error_text: 'त्रुटी',
            btn_diagnose: 'निदान', btn_draft: 'कानूनी अनुबंध मसौदा', btn_find_schemes: 'मेरी योजनाएँ खोजें', modal_title: 'निदान परिणाम', menu_title: 'मेनू',
            solutions_badge: 'समाधान', solutions_title: 'किसानों को सशक्त बनाना', hardware_badge: 'हार्डवेयर', market_badge: 'स्मार्ट वाणिज्य',
            calc_btn: 'बचत की गणना करें', calc_results_title: 'अनुमानित मौसमी बचत', label_select_crop: 'फसल चुनें', label_farm_area: 'खेत क्षेत्र (एकड़)',
            footer_platform: 'प्लेटफार्म', footer_resources: 'संसाधन', footer_newsletter: 'न्यूज़लेटर'
            , footer_link_home: 'होम', footer_link_product: 'हार्डवेयर', footer_link_market: 'बाजार', footer_link_blog: 'ब्लॉग', footer_link_help: 'हेल्प सेंटर', footer_link_schemes: 'योजनाएँ', footer_copyright: '© 2025 JalTantra Solutions Pvt. Ltd.', skip_to_content: 'सामग्री पर जाएँ',
            alt_mascot: 'JalTantra मैस्कट — हसणारा शेतकरी', alt_controller: 'कंट्रोलर डिव्हाइस प्रतिमा', alt_avatar: 'शेतकरी अवतार प्रतिमा'
        },
        mr: {
            nav_home: 'होम', nav_product: 'हार्डवेअर', nav_features: 'उपाय', nav_market: 'बाजार', nav_calc: 'बचत',
            hero_badge: 'स्मार्ट शेती सिस्टीम 2.0', hero_title_1: 'शेती स्मार्ट करा,', hero_title_2: 'नफा वाढवा.', hero_desc: 'तुमचा संपूर्ण डिजिटल डॅशबोर्ड. मातीची स्थिती पहा, सिंचन स्वयंचलित करा आणि योग्य किमतीत विक्री करा.',
            btn_talk: 'सहायकाला विचारा', btn_calc_hero: 'बचत पहा', ticker_label: 'लाइव मंडी रेट्स', chat_greet: 'राम राम! 🙏 मला काहीही विचारा!', chat_bubble: 'राम राम! 🙏 मदत हवी?',
            prod_title: 'JalTantra कंट्रोलर प्रो', prod_desc: 'इंडस्ट्रियल ग्रेड स्मार्ट सिंचाई कंट्रोलर. सोलर पावर्ड, LoRaWAN सक्षम.',
            feat_solar: 'सोलर पावर्ड', feat_lora: 'LoRaWAN रेंज', feat_ip65: 'IP65 वेदरप्रूफ', btn_order: 'प्री-ऑर्डर करा',
            calc_title: 'तुमच्या बचतीची गणना करा', market_title: 'बाजार बुद्धिमत्ता', tool_contract_title: 'करार मसुदा तयार करा', scheme_title: 'शासकीय योजना',
            solutions_desc: 'आधुनिक भारतीय शेतासाठी स्मार्ट आणि शाश्वत तंत्रज्ञान.',
            sol_irrig_title: 'स्मार्ट सिंचन', sol_irrig_desc: 'रिअल-टाइम हवामान व माती माहितीने अचूक पाणी देणे.',
            sol_disease_title: 'रोग ओळख AI', sol_disease_desc: 'लवकर ओळख — फळवंत आरोग्य सुधारते आणि नुकसान कमी होते.',
            sol_health_title: 'पिक आरोग्य', sol_health_desc: 'रिअल-टाइम सेन्सर इनसाइट्स — कीड व मातीची समस्या प्रतिबंधित करा.',
            sol_planning_title: 'पीक नियोजन', sol_planning_desc: 'हवामान व मातीच्या आधारे सर्वोत्तम पिक सुचवते.',
            sol_hw_title: 'खर्च-प्रभावी हार्डवेअर', sol_hw_desc: 'टिकाऊ, स्वस्त IoT सोल्यूशन्स भारतीय शेतकरी लक्षात घेऊन.',
            sol_market_title: 'थेट बाजारपेठ', sol_market_desc: 'शेतकरी थेट खरेदीदारांना विकतात — योग्य दर व जास्त नफा.',
            sol_insights_title: 'बाजार अंतर्दृष्टी', sol_insights_desc: 'AI-आधारित अंतर्दृष्टी मागणीचा अंदाज व विक्री योजना सुधारते.',
            sol_language_title: 'अनेक भाषा', sol_language_desc: 'स्थानीय भाषा मध्ये तंत्रज्ञान उपलब्ध करून अडथळे हटविते.',
            farmers_trust: 'आम्हांवर विश्वास ठेवतात', farmers_count: '4,500+ शेतकरी', trusted_villages: '4,500+ गावांनी विश्वास ठेवलाय',
            hero_scan_placeholder: "रोग ओळखा (उदा. 'पिवळे पाने')...", placeholder_buyer: 'खरेदीदार नाव', placeholder_crop: 'पीक', placeholder_acres: 'एकर', placeholder_email: 'ईमेल', placeholder_chat: 'हिंदी/मराठी मध्ये विचारा...',
            hero_scan_attached: "चित्र जोडले गेले आहे! निदान करण्यासाठी क्लिक करा ->",
            ai_thinking: 'विचार चालू आहे...', connecting_text: 'सेटेलाइटशी कनेक्ट करत आहोत...', analyzing_text: 'विश्लेषण करीत आहोत...', connection_error: 'कनेक्शन त्रुटी', check_settings: 'API की, नेटवर्क व CORS सेटिंग तपासा.',
            input_symptom_missing: 'कृपया लक्षण टाइप करा किंवा फोटो अपलोड करा', calc_invalid: 'कृपया 0 पेक्षा मोठे वैध शेत क्षेत्र (एकर) प्रविष्ट करा.', demo_mode_message: 'प्रदर्शन मोड — API की कॉन्फिगर केलेली नाही. चैट सक्षम करण्यासाठी आपली की जोडा.', chat_error_text: 'त्रुटी',
            btn_diagnose: 'निदान', btn_draft: 'कायदेशीर करार मसुदा', btn_find_schemes: 'माझ्या योजना शोधा', modal_title: 'निदान निकाल', menu_title: 'मेन्यू',
            solutions_badge: 'उपाय', solutions_title: 'शेतकऱ्यांना सशक्त करणे', hardware_badge: 'हार्डवेअर', market_badge: 'स्मार्ट कॉमर्स',
            calc_btn: 'बचत मोजा', calc_results_title: 'आकलन موسमी बचत', label_select_crop: 'पीक निवडा', label_farm_area: 'शेत क्षेत्र (एकर)',
            footer_platform: 'प्लॅटफॉर्म', footer_resources: 'संसाधने', footer_newsletter: 'न्यूझलॅटर'
            , footer_link_home: 'होम', footer_link_product: 'हार्डवेअर', footer_link_market: 'बाजार', footer_link_blog: 'ब्लॉग', footer_link_help: 'सहाय्य केंद्र', footer_link_schemes: 'योजना', footer_copyright: '© 2025 JalTantra Solutions Pvt. Ltd.', skip_to_content: 'सामग्रीकडे जा',
            alt_mascot: 'JalTantra मॅस्कॉट — हसणारा शेतकरी', alt_controller: 'कंट्रोलर डिव्हाइस प्रतिमा', alt_avatar: 'शेतकरी अवतार प्रतिमा',
            radar_subtitle: 'सेटेलाइट इंटेलिजेंस', radar_title: 'लाइव रेन रडार', btn_locate: 'फार्म लोके करा',
            maps_subtitle: 'हवामान इंटेलिजेंस', maps_title: 'तपशीलवार हवामान नकाशे'
        }
    };

    // --- PRODUCT TAB SWITCHING ---
    window.showProduct = function(productId) {
        // Hide all product contents
        const contents = document.querySelectorAll('.product-content');
        contents.forEach(content => content.classList.add('hidden'));
        
        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Show selected product content
        const selectedContent = document.getElementById(productId);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
        
        // Add active class to clicked tab
        const clickedTab = document.querySelector(`[data-product="${productId}"]`);
        if (clickedTab) {
            clickedTab.classList.add('active');
        }
    }

    window.setLang = function(lang) {
        // set HTML lang attribute for screen readers and CSS rules
        try { document.documentElement.lang = lang; } catch(e) { }
        currentLang = lang;
        // persist user preference
        try { localStorage.setItem('jalTantra_lang', lang); } catch(e) { /* ignore */ }
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if(translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
        });
        // placeholders: inputs and textareas
        document.querySelectorAll('[data-placeholder-key]').forEach(inp => {
            const pk = inp.getAttribute('data-placeholder-key');
            if (translations[lang] && translations[lang][pk]) inp.placeholder = translations[lang][pk];
        });
        // alt attributes for images
        document.querySelectorAll('[data-alt-key]').forEach(el => {
            const ak = el.getAttribute('data-alt-key');
            if (translations[lang] && translations[lang][ak]) el.alt = translations[lang][ak];
        });
        // accessibility: inform screen-readers
        const intro = document.getElementById('chat-intro');
        const greeting = document.getElementById('chat-greeting');
        if (intro) intro.innerText = translations[lang].chat_greet;
        if (greeting) greeting.innerText = translations[lang].chat_bubble;
        ['en','hi','mr'].forEach(l => {
            const btn = document.getElementById('lang-'+l);
            const mbtn = document.getElementById('lang-'+l+'-mobile');
            if(btn) {
                if(l === lang) { btn.classList.add('bg-primary', 'text-white'); btn.classList.remove('text-slate-500'); }
                else { btn.classList.remove('bg-primary', 'text-white'); btn.classList.add('text-slate-500'); }
            }
            if(mbtn) {
                if(l === lang) { mbtn.classList.add('bg-primary', 'text-white'); mbtn.classList.remove('text-slate-500'); }
                else { mbtn.classList.remove('bg-primary', 'text-white'); mbtn.classList.add('text-slate-500'); }
            }
        });
    };

    // Initialize language (apply any translations loaded before JS executed)
    if (translations[currentLang]) window.setLang(currentLang);

    // --- WEATHER FETCH ---
    async function fetchWeather() {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7`);
            const data = await res.json();
            const current = data.current_weather;
            document.getElementById('hero-temp').innerText = `${Math.round(current.temperature)}°C`;
            // Map weathercode to condition
            const conditions = {
                0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
                45: 'Fog', 48: 'Depositing Rime Fog', 51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
                56: 'Light Freezing Drizzle', 57: 'Dense Freezing Drizzle', 61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
                66: 'Light Freezing Rain', 67: 'Heavy Freezing Rain', 71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
                77: 'Snow Grains', 80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
                85: 'Slight Snow Showers', 86: 'Heavy Snow Showers', 95: 'Thunderstorm', 96: 'Thunderstorm with Slight Hail', 99: 'Thunderstorm with Heavy Hail'
            };
            document.getElementById('hero-cond').innerText = conditions[current.weathercode] || 'Unknown';
            document.getElementById('hero-wind').innerText = `${current.windspeed} km/h`;
            // If there's a humidity element, add it
            const humidityEl = document.getElementById('hero-humidity');
            if (humidityEl && data.hourly.relative_humidity_2m) {
                humidityEl.innerText = `${data.hourly.relative_humidity_2m[0]}%`;
            }
            // Store temperature for background effects
            window.currentTemp = current.temperature;
            // Populate forecast
            const forecastContainer = document.getElementById('forecast-container');
            if (forecastContainer && data.daily) {
                forecastContainer.innerHTML = '';
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                data.daily.time.forEach((date, i) => {
                    const day = new Date(date).getDay();
                    const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
                    const minTemp = Math.round(data.daily.temperature_2m_min[i]);
                    const code = data.daily.weathercode[i];
                    const condition = conditions[code] || 'Unknown';
                    const icon = getWeatherIcon(code);
                    forecastContainer.innerHTML += `
                        <div class="text-center p-4 bg-gray-50 rounded-xl">
                            <p class="font-bold text-gray-900">${days[day]}</p>
                            <i class="${icon} text-3xl text-primary my-2"></i>
                            <p class="text-sm text-gray-600">${condition}</p>
                            <p class="font-bold text-lg">${maxTemp}° / ${minTemp}°</p>
                        </div>
                    `;
                });
            }
        } catch(e) {
            console.error('Weather fetch failed:', e);
        }
    }

    function getWeatherIcon(code) {
        if (code === 0 || code === 1) return 'fa-solid fa-sun';
        if (code === 2 || code === 3) return 'fa-solid fa-cloud-sun';
        if (code >= 45 && code <= 48) return 'fa-solid fa-smog';
        if (code >= 51 && code <= 67) return 'fa-solid fa-cloud-rain';
        if (code >= 71 && code <= 86) return 'fa-solid fa-snowflake';
        if (code >= 95) return 'fa-solid fa-bolt';
        return 'fa-solid fa-cloud';
    }
    fetchWeather();

    // --- GPS LOCATE ---
    document.getElementById('gps-btn').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Update the iframe src with new location
                const iframes = document.querySelectorAll('#radar iframe, #weather-maps iframe');
                iframes.forEach(iframe => {
                    const src = iframe.src;
                    const newSrc = src.replace(/lat=[^&]*/, `lat=${lat}`).replace(/lon=[^&]*/, `lon=${lon}`).replace(/detailLat=[^&]*/, `detailLat=${lat}`).replace(/detailLon=[^&]*/, `detailLon=${lon}`);
                    iframe.src = newSrc;
                });
                alert('Maps updated to your location!');
            }, () => {
                alert('Unable to retrieve your location.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    // --- GENERIC GEMINI CALLER ---
    async function callGemini(prompt, resId, btnId, useModal = false, imgBase64 = null) {
        const btn = document.getElementById(btnId);
        const resBox = document.getElementById(resId);
        
        if(btn) {
            var oldText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="ai-loader"></span> ${(translations[currentLang] && translations[currentLang].ai_thinking) ? translations[currentLang].ai_thinking : 'Thinking...'}`;
        }

        if(!useModal && resBox) {
            resBox.classList.remove('hidden');
            resBox.innerHTML = `<i>${(translations[currentLang] && translations[currentLang].connecting_text) ? translations[currentLang].connecting_text : 'Connecting to Satellite...'}</i>`;
        } else if (useModal) {
            const modal = document.getElementById('modal-overlay');
            const content = document.getElementById('modal-content');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.setAttribute('aria-hidden', 'false');
            // focus the nearest close button in the modal
            setTimeout(() => {
                const closeBtn = modal.querySelector('button[onclick="closeModal()"]');
                if (closeBtn) closeBtn.focus();
            }, 80);
            content.innerHTML = `<div class="text-center p-4"><span class="ai-loader"></span> ${(translations[currentLang] && translations[currentLang].analyzing_text) ? translations[currentLang].analyzing_text : 'Analyzing...'}</div>`;
        }

        // API key safety check
        if (!apiKey || apiKey === '__REPLACE_WITH_YOUR_API_KEY__') {
            const message = '<p class="text-yellow-500">API key not configured — set your Generative Language API key in the page (for development) or via your build environment. The current demo will not make external calls.</p>';
            if (useModal) {
                document.getElementById('modal-content').innerHTML = message;
                document.getElementById('modal-overlay').setAttribute('aria-hidden', 'false');
                document.getElementById('modal-overlay').classList.remove('hidden');
                document.getElementById('modal-overlay').classList.add('flex');
            } else if (resBox) {
                resBox.innerHTML = message;
            }
            if (btn) { btn.disabled = false; btn.innerHTML = oldText; }
            return;
        }

        try {
            const parts = [{ text: prompt }];
            if (imgBase64) {
                parts.push({ inlineData: { mimeType: "image/jpeg", data: imgBase64 } });
            }

            const res = await fetch(geminiUrl, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ contents: [{ parts: parts }] })
            });
            if (!res.ok) {
                throw new Error('Non-OK response: ' + res.status + ' ' + res.statusText);
            }
            const data = await res.json();
            const md = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";
            const parsed = marked.parse(md);

            // Add Copy Button Wrapper
            const safeText = md.replace(/"/g, '&quot;');
            const finalHtml = `
                <div class="relative group">
                    <button onclick="copyToClipboard(this)" data-text="${safeText}" class="absolute top-0 right-0 text-slate-400 hover:text-primary p-2 transition-opacity opacity-0 group-hover:opacity-100" title="Copy">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    ${parsed}
                </div>
            `;

            if(useModal) {
                document.getElementById('modal-content').innerHTML = finalHtml;
            } else if (resBox) {
                resBox.innerHTML = finalHtml;
            }
        } catch(e) {
            console.error('Gemini request error', e);
            const errMsg = (translations[currentLang] && translations[currentLang].connection_error) ? translations[currentLang].connection_error : 'Connection Error';
            const errHTML = `<p class="text-red-500">${errMsg}: ${e?.message || 'unknown'}. ${(translations[currentLang] && translations[currentLang].check_settings) ? translations[currentLang].check_settings : 'Check API key, network, and CORS settings.'}</p>`;
            if(useModal) document.getElementById('modal-content').innerHTML = errHTML;
            else if(resBox) resBox.innerHTML = errHTML;
        }
        
        if(btn) {
            btn.disabled = false;
            btn.innerHTML = oldText;
        }
    }

    // --- NEW FEATURE LISTENERS ---
    
    // 1. Hero Quick Scan (Multimodal)
    const heroImgInput = document.getElementById('hero-img-input');
    let heroImgBase64 = null;
    heroImgInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
            if(file) {
            const reader = new FileReader();
            reader.onload = (ev) => { 
                heroImgBase64 = ev.target.result.split(',')[1];
                document.getElementById('hero-img-indicator').classList.remove('hidden');
                const att = (translations[currentLang] && translations[currentLang].hero_scan_attached) ? translations[currentLang].hero_scan_attached : "Image attached! Click Diagnose ->";
                document.getElementById('hero-scan-input').placeholder = att;
            };
            reader.readAsDataURL(file);
        }
    });

    // make the image label keyboard-operable
    const heroLabel = document.querySelector('label[for="hero-img-input"]');
    if (heroLabel) {
        heroLabel.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                document.getElementById('hero-img-input').click();
            }
        });
    }

    document.getElementById('hero-scan-btn').addEventListener('click', () => {
        const val = document.getElementById('hero-scan-input').value;
        if(!val && !heroImgBase64) return alert((translations[currentLang] && translations[currentLang].input_symptom_missing) ? translations[currentLang].input_symptom_missing : "Type a symptom or upload a photo");
        
        let prompt = `Act as a Senior Plant Pathologist. I am a farmer. `;
        if(val) prompt += `My crop has "${val}". `;
        prompt += `Diagnose and suggest cure in ${currentLang}. 
        Format: Markdown. 
        Structure: 
        1. **Diagnosis** 2. **Organic Solution** (Home remedies)
        3. **Chemical Solution** (Brands)
        4. **Prevention**`;
        
        callGemini(prompt, null, 'hero-scan-btn', true, heroImgBase64);
    });

    // ensure modal aria-hidden toggles when callGemini opens/closes

    // 3. ROI Advice
    document.getElementById('calc-btn').addEventListener('click', () => {
        const crop = document.getElementById('calc-crop').value;
        const areaRaw = document.getElementById('calc-area').value;
        const area = parseFloat(areaRaw || 0);

        // validation
        if (!area || area <= 0 || isNaN(area)) {
            // friendly inline validation
            alert((translations[currentLang] && translations[currentLang].calc_invalid) ? translations[currentLang].calc_invalid : 'Please enter a valid farm area (acres) greater than 0.');
            return;
        }

        let profitPerAcre = 25000;
        if (crop && crop.toLowerCase().includes('sugarcane')) profitPerAcre = 50000;

        const totalProfit = profitPerAcre * area;
        const waterUsed = area * 400000; // baseline estimate
        const waterSaved = area * 150000; // estimated saved with system

        // Format numbers with thousands separators
        const fmt = v => Number(v).toLocaleString(undefined);

        document.getElementById('res-water').innerText = fmt(waterUsed) + ' L';
        const savedEl = document.getElementById('res-saved');
        if (savedEl) savedEl.innerText = fmt(waterSaved) + ' L';
        document.getElementById('res-money').innerText = '₹' + fmt(totalProfit);
    });

    // --- EXISTING LISTENERS ---
    document.getElementById('contract-btn')?.addEventListener('click', () => {
        const b = document.getElementById('contract-buyer').value;
        callGemini(`Draft contract for buyer ${b}. ${currentLang}. Markdown.`, 'contract-result', 'contract-btn');
    });
    document.getElementById('find-schemes-btn')?.addEventListener('click', () => {
        const l = document.getElementById('scheme-land').value;
        callGemini(`Schemes for ${l} acres in India. ${currentLang}. List.`, 'scheme-results', 'find-schemes-btn');
    });
    document.getElementById('negot-btn')?.addEventListener('click', () => {
        const s = document.getElementById('negot-situation').value;
        callGemini(`Negotiation help: "${s}". ${currentLang}.`, 'negot-result', 'negot-btn');
    });
    
    // Chatbot
    window.toggleChat = function() {
        const win = document.getElementById('chat-window');
        const greeting = document.getElementById('chat-greeting');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        if (win) win.classList.toggle('hidden');
        if (greeting) greeting.classList.toggle('hidden');
        if (toggleBtn) {
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', (!expanded).toString());
        }
    };
    document.getElementById('chat-send-float').addEventListener('click', () => {
        const inp = document.getElementById('chat-input-float');
        const txt = inp.value;
        if(!txt) return;
        document.getElementById('chat-messages').innerHTML += `<div class="chat-bubble chat-user">${txt}</div>`;
        inp.value = '';
        
            (async () => {
            const msgs = document.getElementById('chat-messages');
            const loadId = 'l'+Date.now();
            msgs.innerHTML += `<div id="${loadId}" class="chat-bubble chat-bot">...</div>`;
            msgs.scrollTop = msgs.scrollHeight;
            try {
                if (!apiKey || apiKey === '__REPLACE_WITH_YOUR_API_KEY__') {
                    document.getElementById(loadId).innerText = (translations[currentLang] && translations[currentLang].demo_mode_message) ? translations[currentLang].demo_mode_message : "Demo mode — API key not configured. Add your key to enable chat.";
                    return;
                }
                const res = await fetch(geminiUrl, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ contents: [{ parts: [{ text: `User: ${txt}. Reply in ${currentLang}.` }] }] }) });
                const d = await res.json();
                document.getElementById(loadId).innerHTML = marked.parse(d.candidates[0].content.parts[0].text);
            } catch(e) { document.getElementById(loadId).innerText = (translations[currentLang] && translations[currentLang].chat_error_text) ? translations[currentLang].chat_error_text : "Error"; }
        })();
    });

    // Mobile Menu
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileToggle && mobileMenu) {
        mobileToggle.setAttribute('aria-controls', 'mobile-menu');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            mobileToggle.setAttribute('aria-expanded', 'true');
            // move focus to close so keyboard users can escape quickly
            setTimeout(() => mobileClose?.focus(), 120);
        });
    }
    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileToggle?.setAttribute('aria-expanded', 'false');
            mobileToggle?.focus();
        });
        // make close key accessible via keyboard
        mobileClose.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') mobileClose.click(); });
    }

    // Global Escape key to close overlays
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
            closeModal();
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                mobileToggle?.setAttribute('aria-expanded', 'false');
            }
            const chatWindow = document.getElementById('chat-window');
            if (chatWindow && !chatWindow.classList.contains('hidden')) toggleChat();
        }
    });

});
