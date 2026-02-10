document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMATED BACKGROUND (particle system) ---
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createParticles();
        }

        function createParticles() {
            particles = [];
            // particle count scales with viewport width for a tasteful density
            const count = Math.max(50, Math.floor(width / 30));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    alpha: Math.random() * 0.6 + 0.2
                });
            }
        }

        function animate() {
            // If tab is hidden, throttle updates to save CPU
            if (document.hidden) {
                setTimeout(animate, 1000);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            // Create gradient for particles based on temperature
            const temp = window.currentTemp || 25;
            let color1, color2;
            if (temp > 30) {
                color1 = 'rgba(255, 100, 0, 0.8)'; // Orange
                color2 = 'rgba(255, 100, 0, 0.2)';
            } else if (temp < 15) {
                color1 = 'rgba(0, 100, 255, 0.8)'; // Blue
                color2 = 'rgba(0, 100, 255, 0.2)';
            } else {
                color1 = 'rgba(5, 150, 105, 0.8)'; // Green
                color2 = 'rgba(5, 150, 105, 0.2)';
            }
            const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // bounce from edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw connections between nearby particles
            particles.forEach((p, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const alpha = temp > 30 ? 0.4 : temp < 15 ? 0.3 : 0.3;
                        ctx.strokeStyle = `rgba(${temp > 30 ? '255, 100, 0' : temp < 15 ? '0, 100, 255' : '5, 150, 105'}, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }
});
