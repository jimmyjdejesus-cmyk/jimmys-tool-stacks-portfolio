/**
 * Reservoir-Quantum Interface Visualization
 * Side-by-side comparison of reservoir states and quantum states
 */

class ReservoirQuantumInterface {
    constructor() {
        this.reservoirState = null;
        this.quantumState = null;
        this.mappingType = 'linear';
        this.showUncertainty = true;
        this.syncAnimation = true;
        this.hbar = 1.0545718e-34;
        
        // Initialize reservoir
        this.N = 100;
        this.initializeReservoir();
        
        // Setup visualization
        this.setupVisualization();
        this.setupControls();
        
        // Start animation
        this.animate();
    }
    
    initializeReservoir() {
        this.W = new Array(this.N).fill(0).map(() => 
            new Array(this.N).fill(0).map(() => (Math.random() - 0.5) * 0.1)
        );
        this.W_in = new Array(this.N).fill(0).map(() => (Math.random() - 0.5) * 0.1);
        this.x = new Array(this.N).fill(0);
    }
    
    evolveReservoir(input) {
        const newX = new Array(this.N).fill(0);
        for (let i = 0; i < this.N; i++) {
            let sum = this.W_in[i] * input;
            for (let j = 0; j < this.N; j++) {
                sum += this.W[i][j] * this.x[j];
            }
            newX[i] = Math.tanh(sum);
        }
        this.x = newX;
        return [...newX];
    }
    
    mapReservoirToQuantum(x) {
        // Normalize reservoir state
        const norm = Math.sqrt(x.reduce((sum, xi) => sum + xi * xi, 0));
        if (norm === 0) return x.map(() => ({ real: 0, imag: 0 }));
        
        const normalized = x.map(xi => xi / norm);
        
        // Interpret as quantum amplitudes
        return normalized.map(xi => ({
            real: xi,
            imag: 0  // Start with real amplitudes
        }));
    }
    
    computeUncertainty(x, dt = 0.01) {
        // Compute variance
        const mean = x.reduce((sum, xi) => sum + xi, 0) / x.length;
        const variance = x.reduce((sum, xi) => sum + (xi - mean) * (xi - mean), 0) / x.length;
        const deltaX = Math.sqrt(variance);
        const deltaT = dt;
        const uncertainty = deltaX * deltaT;
        
        // Compare to ℏ/2
        const ratio = uncertainty / (this.hbar / 2);
        
        return { uncertainty, ratio, deltaX, deltaT };
    }
    
    setupVisualization() {
        // Create SVG containers if they don't exist
        const reservoirSpace = document.getElementById('reservoir-space');
        const quantumSpace = document.getElementById('quantum-space');
        
        if (!reservoirSpace || !quantumSpace) return;
        
        // Clear existing content
        reservoirSpace.innerHTML = '';
        quantumSpace.innerHTML = '';
        
        // Create SVG elements
        this.reservoirSVG = d3.select('#reservoir-space')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '400');
        
        this.quantumSVG = d3.select('#quantum-space')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '400');
    }
    
    visualizeComparison() {
        if (!this.reservoirState || !this.quantumState) return;
        
        const width = 400;
        const height = 400;
        const gridSize = Math.ceil(Math.sqrt(this.N));
        const cellSize = width / gridSize;
        
        // Reservoir state visualization
        const reservoirData = this.reservoirState.map((val, i) => ({
            x: (i % gridSize) * cellSize,
            y: Math.floor(i / gridSize) * cellSize,
            value: val,
            index: i
        }));
        
        this.reservoirSVG.selectAll('circle')
            .data(reservoirData)
            .enter()
            .append('circle')
            .attr('cx', d => d.x + cellSize / 2)
            .attr('cy', d => d.y + cellSize / 2)
            .attr('r', d => Math.abs(d.value) * cellSize * 0.3)
            .attr('fill', d => {
                const intensity = (d.value + 1) / 2;
                return d3.interpolateViridis(intensity);
            })
            .attr('opacity', 0.8);
        
        // Quantum state visualization
        const quantumData = this.quantumState.map((amp, i) => ({
            x: (i % gridSize) * cellSize,
            y: Math.floor(i / gridSize) * cellSize,
            amplitude: Math.sqrt(amp.real * amp.real + amp.imag * amp.imag),
            phase: Math.atan2(amp.imag, amp.real),
            index: i
        }));
        
        this.quantumSVG.selectAll('circle')
            .data(quantumData)
            .enter()
            .append('circle')
            .attr('cx', d => d.x + cellSize / 2)
            .attr('cy', d => d.y + cellSize / 2)
            .attr('r', d => d.amplitude * cellSize * 0.4)
            .attr('fill', d => {
                const hue = (d.phase + Math.PI) / (2 * Math.PI) * 360;
                return `hsl(${hue}, 70%, 60%)`;
            })
            .attr('opacity', 0.8);
        
        // Update uncertainty display
        if (this.showUncertainty) {
            const uncertainty = this.computeUncertainty(this.reservoirState);
            const display = document.getElementById('uncertainty-display');
            if (display) {
                display.innerHTML = `
                    <div style="color: #10b981; font-size: 1.2rem; margin-bottom: 10px;">
                        Uncertainty Analysis
                    </div>
                    <div>Δx · Δt = ${uncertainty.uncertainty.toExponential(2)}</div>
                    <div>Ratio to ℏ/2: ${uncertainty.ratio.toExponential(2)}</div>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: #94a3b8;">
                        ${uncertainty.ratio > 1 ? 'Above quantum limit' : 'Below quantum limit'}
                    </div>
                `;
            }
        }
    }
    
    setupControls() {
        const mappingSelect = document.getElementById('mapping-type');
        const uncertaintyCheck = document.getElementById('show-uncertainty');
        const syncCheck = document.getElementById('sync-animation');
        
        if (mappingSelect) {
            mappingSelect.addEventListener('change', (e) => {
                this.mappingType = e.target.value;
            });
        }
        
        if (uncertaintyCheck) {
            uncertaintyCheck.addEventListener('change', (e) => {
                this.showUncertainty = e.target.checked;
            });
        }
        
        if (syncCheck) {
            syncCheck.addEventListener('change', (e) => {
                this.syncAnimation = e.target.checked;
            });
        }
    }
    
    animate() {
        if (!this.syncAnimation) return;
        
        // Generate input signal
        const t = Date.now() / 1000;
        const input = Math.sin(2 * Math.PI * 0.5 * t);
        
        // Evolve reservoir
        this.reservoirState = this.evolveReservoir(input);
        
        // Map to quantum state
        this.quantumState = this.mapReservoirToQuantum(this.reservoirState);
        
        // Update visualization
        this.visualizeComparison();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reservoir-space') && typeof d3 !== 'undefined') {
        new ReservoirQuantumInterface();
    }
});

