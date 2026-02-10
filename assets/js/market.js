document.addEventListener('DOMContentLoaded', () => {
    // Ticker
    function updateTicker() {
        const crops = [{n:"Onion",p:2100},{n:"Tomato",p:1600},{n:"Soybean",p:4800},{n:"Cotton",p:7200}];
        let h = '';
        crops.forEach(c => {
            const p = c.p + Math.floor(Math.random()*40-20);
            const col = p > c.p ? 'text-green-400' : 'text-red-400';
            h += `<div class="ticker-item"><span class="text-teal-200 mr-2">${c.n}</span><span class="text-white">₹${p}</span><span class="ml-1 ${col}">${p>c.p?'▲':'▼'}</span></div>`;
        });
        const tickerEl = document.getElementById('mandi-ticker');
        if(tickerEl) {
             tickerEl.innerHTML = h + h;
        }
    }
    setInterval(updateTicker, 3000); updateTicker();
});
