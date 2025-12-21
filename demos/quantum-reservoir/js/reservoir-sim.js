/**
 * Reservoir Dynamics Simulator
 * Real-time visualization of reservoir state evolution using Three.js
 */

class ReservoirVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.N = 1000;  // Reservoir size
        this.M = 1;     // Input dimension
        this.spectralRadius = 0.9;
        this.inputFreq = 1.0;
        this.coupling = 0.9;
        
        // Initialize Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x0a0a0f, 1);
        this.container.appendChild(this.renderer.domElement);
        
        // Initialize reservoir
        this.initializeReservoir();
        
        // Particle system
        this.particles = new THREE.BufferGeometry();
        this.particleSystem = null;
        this.states = [];
        
        // Controls
        this.setupControls();
        
        // Animation
        this.animate();
    }
    
    initializeReservoir() {
        // Generate random reservoir matrix
        const size = this.N;
        const connectivity = 0.1;
        
        // Create sparse random matrix
        const W = new Array(size).fill(0).map(() => new Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (Math.random() < connectivity) {
                    W[i][j] = (Math.random() - 0.5) * 2;
                }
            }
        }
        
        // Normalize to spectral radius
        this.W = this.normalizeSpectralRadius(W, this.spectralRadius);
        this.W_in = new Array(size).fill(0).map(() => (Math.random() - 0.5) * 0.2);
        this.b = new Array(size).fill(0).map(() => (Math.random() - 0.5) * 0.02);
        this.x = new Array(size).fill(0);
    }
    
    normalizeSpectralRadius(W, targetRho) {
        // Approximate spectral radius normalization
        const maxVal = Math.max(...W.flat().map(Math.abs));
        const scale = targetRho / (maxVal * Math.sqrt(0.1));  // Approximate
        return W.map(row => row.map(val => val * scale));
    }
    
    evolveReservoir(input) {
        // Reservoir update: x(t+1) = tanh(W_in * u + W * x + b)
        const newX = new Array(this.N).fill(0);
        
        for (let i = 0; i < this.N; i++) {
            let sum = this.b[i];
            sum += this.W_in[i] * input;
            for (let j = 0; j < this.N; j++) {
                sum += this.W[i][j] * this.x[j];
            }
            newX[i] = Math.tanh(sum);
        }
        
        this.x = newX;
        return [...newX];
    }
    
    computePCA(states) {
        // Simplified PCA: project to 3D using first 3 principal components
        if (states.length < 3) return states.map(() => [0, 0, 0]);
        
        // Compute mean
        const mean = new Array(this.N).fill(0);
        states.forEach(state => {
            state.forEach((val, i) => mean[i] += val);
        });
        mean.forEach((val, i) => mean[i] /= states.length);
        
        // Center data
        const centered = states.map(state => state.map((val, i) => val - mean[i]));
        
        // Simple projection: use first 3 dimensions (simplified PCA)
        return centered.map(state => [
            state[0] * 10,
            state[1] * 10,
            state[2] * 10
        ]);
    }
    
    updateVisualization() {
        // Generate input signal
        const t = Date.now() / 1000;
        const input = Math.sin(2 * Math.PI * this.inputFreq * t);
        
        // Evolve reservoir
        const state = this.evolveReservoir(input);
        this.states.push(state);
        
        // Keep last 100 states
        if (this.states.length > 100) {
            this.states.shift();
        }
        
        // Project to 3D
        const projected = this.computePCA(this.states);
        
        // Update particle system
        if (projected.length > 0) {
            const positions = new Float32Array(projected.length * 3);
            const colors = new Float32Array(projected.length * 3);
            
            projected.forEach((p, i) => {
                positions[i * 3] = p[0];
                positions[i * 3 + 1] = p[1];
                positions[i * 3 + 2] = p[2];
                
                // Color based on activation
                const intensity = Math.abs(p[0]) / 10;
                colors[i * 3] = intensity;      // R
                colors[i * 3 + 1] = 0.5;        // G
                colors[i * 3 + 2] = 1 - intensity; // B
            });
            
            this.particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            this.particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            if (!this.particleSystem) {
                const material = new THREE.PointsMaterial({
                    size: 2,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.8
                });
                this.particleSystem = new THREE.Points(this.particles, material);
                this.scene.add(this.particleSystem);
            }
        }
        
        // Camera rotation
        this.camera.position.x = Math.sin(t * 0.1) * 20;
        this.camera.position.y = Math.cos(t * 0.1) * 20;
        this.camera.position.z = 15;
        this.camera.lookAt(0, 0, 0);
    }
    
    setupControls() {
        const sizeSlider = document.getElementById('reservoir-size');
        const freqSlider = document.getElementById('input-freq');
        const couplingSlider = document.getElementById('coupling');
        const startBtn = document.getElementById('start-sim');
        const resetBtn = document.getElementById('reset-sim');
        
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.N = parseInt(e.target.value);
                document.getElementById('size-value').textContent = this.N;
                this.initializeReservoir();
            });
        }
        
        if (freqSlider) {
            freqSlider.addEventListener('input', (e) => {
                this.inputFreq = parseFloat(e.target.value);
                document.getElementById('freq-value').textContent = this.inputFreq.toFixed(1);
            });
        }
        
        if (couplingSlider) {
            couplingSlider.addEventListener('input', (e) => {
                this.spectralRadius = parseFloat(e.target.value);
                document.getElementById('coupling-value').textContent = this.spectralRadius.toFixed(2);
                this.initializeReservoir();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.initializeReservoir();
                this.states = [];
                if (this.particleSystem) {
                    this.scene.remove(this.particleSystem);
                    this.particleSystem = null;
                }
            });
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.updateVisualization();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reservoir-canvas')) {
        new ReservoirVisualizer('reservoir-canvas');
    }
});

