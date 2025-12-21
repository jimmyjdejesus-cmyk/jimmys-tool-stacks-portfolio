/**
 * Quantum Vacuum Fluctuations Visualization
 * Simulates virtual particle creation/annihilation and Dynamical Casimir Effect
 */

class VacuumFluctuationVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mirrorVelocity = 0;
        this.deltaE = 1e-21;
        this.hbar = 1.0545718e-34;
        this.running = true;
        
        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Setup controls
        this.setupControls();
        
        // Start animation
        this.animate();
    }
    
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = 500;
    }
    
    createVirtualPair() {
        const deltaE = this.deltaE * (0.5 + Math.random());
        const lifetime = this.hbar / (2 * deltaE) * 1e12;  // Scale for visualization
        
        const particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            lifetime: lifetime,
            age: 0,
            type: Math.random() > 0.5 ? 'particle' : 'antiparticle',
            color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
            real: false
        };
        
        this.particles.push(particle);
    }
    
    update(dt) {
        // Update particle positions and lifetimes
        this.particles = this.particles.filter(p => {
            p.age += dt * 1000;  // Scale time
            p.x += p.vx * dt * 50;
            p.y += p.vy * dt * 50;
            
            // Wrap around edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            // Check if particle should annihilate
            if (p.age > p.lifetime && !p.real) {
                return false;
            }
            
            // Dynamical Casimir Effect: convert to real particle if mirror moving
            if (this.mirrorVelocity > 0.01) {
                const c = 3e8;  // Speed of light
                const conversionProb = (this.mirrorVelocity / c) * dt * 10;
                if (Math.random() < conversionProb && !p.real) {
                    p.real = true;
                    p.color = '#ffff00';
                    p.lifetime = Infinity;  // Real particles don't annihilate
                }
            }
            
            return true;
        });
        
        // Create new virtual pairs (Poisson process)
        if (Math.random() < 0.15 * dt) {
            this.createVirtualPair();
        }
    }
    
    render() {
        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particles
        this.particles.forEach(p => {
            this.ctx.beginPath();
            const radius = p.real ? 4 : 3;
            this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.real ? 1.0 : 0.6;
            this.ctx.fill();
            
            // Draw trail for real particles
            if (p.real) {
                this.ctx.strokeStyle = p.color;
                this.ctx.lineWidth = 1;
                this.ctx.globalAlpha = 0.3;
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x - p.vx * 10, p.y - p.vy * 10);
                this.ctx.stroke();
            }
        });
        
        this.ctx.globalAlpha = 1.0;
        
        // Draw mirror (if Dynamical Casimir mode)
        if (this.mirrorVelocity > 0) {
            const mirrorX = this.canvas.width / 2 + 
                          Math.sin(Date.now() / 500) * 100 * (this.mirrorVelocity / 0.5);
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(mirrorX, 0);
            this.ctx.lineTo(mirrorX, this.canvas.height);
            this.ctx.stroke();
            
            // Draw mirror label
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '14px monospace';
            this.ctx.fillText('Moving Mirror', mirrorX + 10, 20);
        }
        
        // Draw energy conservation display
        const realCount = this.particles.filter(p => p.real).length;
        const virtualCount = this.particles.length - realCount;
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`Real Particles: ${realCount}`, 10, 20);
        this.ctx.fillText(`Virtual Pairs: ${virtualCount}`, 10, 40);
    }
    
    setupControls() {
        const mirrorSlider = document.getElementById('mirror-vel');
        const deltaESlider = document.getElementById('delta-e');
        const pauseBtn = document.getElementById('pause-vacuum');
        
        if (mirrorSlider) {
            mirrorSlider.addEventListener('input', (e) => {
                this.mirrorVelocity = parseFloat(e.target.value);
                document.getElementById('vel-value').textContent = this.mirrorVelocity.toFixed(2) + 'c';
            });
        }
        
        if (deltaESlider) {
            deltaESlider.addEventListener('input', (e) => {
                this.deltaE = parseFloat(e.target.value);
                document.getElementById('delta-e-value').textContent = this.deltaE.toExponential(1) + ' J';
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.running = !this.running;
                pauseBtn.textContent = this.running ? 'Pause' : 'Resume';
                if (this.running) this.animate();
            });
        }
    }
    
    animate() {
        if (!this.running) return;
        
        const dt = 1/60;  // 60 FPS
        this.update(dt);
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('vacuum-canvas')) {
        new VacuumFluctuationVisualizer('vacuum-canvas');
    }
});

