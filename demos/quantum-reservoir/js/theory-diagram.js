/**
 * Theoretical Framework Diagram
 * Interactive Mermaid diagram with click-to-expand functionality
 */

class TheoryDiagram {
    constructor() {
        this.setupDiagram();
    }
    
    setupDiagram() {
        const diagramContainer = document.querySelector('.mermaid');
        if (!diagramContainer) return;
        
        // Mermaid diagram configuration
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#1a1a24',
                primaryTextColor: '#f1f5f9',
                primaryBorderColor: '#2d2d3a',
                lineColor: '#3b82f6',
                secondaryColor: '#12121a',
                tertiaryColor: '#0a0a0f'
            }
        });
        
        // Diagram definition
        const diagram = `
graph TB
    A[Reservoir Computing] --> B[High-Dimensional Dynamics]
    A --> C[Fading Memory]
    A --> D[Undefined States]
    
    E[Quantum Mechanics] --> F[Superposition]
    E --> G[Uncertainty Principle]
    E --> H[Vacuum Fluctuations]
    
    B --> I[State Space Analogy]
    F --> I
    D --> J[Quantum-Like Uncertainty]
    G --> J
    
    C --> K[Dynamical Casimir Effect]
    H --> K
    
    I --> L[Reservoir-Quantum Interface]
    J --> L
    K --> L
    
    L --> M[Quantum Gravity Insights]
    
    style A fill:#a855f7,stroke:#a855f7,color:#fff
    style E fill:#3b82f6,stroke:#3b82f6,color:#fff
    style L fill:#10b981,stroke:#10b981,color:#fff
    style M fill:#f59e0b,stroke:#f59e0b,color:#fff
        `;
        
        diagramContainer.textContent = diagram;
        
        // Add click handlers for interactive expansion
        setTimeout(() => {
            const nodes = diagramContainer.querySelectorAll('.node');
            nodes.forEach(node => {
                node.style.cursor = 'pointer';
                node.addEventListener('click', (e) => {
                    this.expandNode(e.target);
                });
            });
        }, 1000);
    }
    
    expandNode(node) {
        const nodeId = node.getAttribute('id');
        const nodeLabel = node.querySelector('text')?.textContent || '';
        
        // Create modal with details
        const modal = document.createElement('div');
        modal.className = 'theory-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1a1a24;
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 30px;
            max-width: 600px;
            z-index: 1000;
            color: #f1f5f9;
        `;
        
        modal.innerHTML = `
            <h3 style="color: #3b82f6; margin-bottom: 15px;">${nodeLabel}</h3>
            <div id="node-details"></div>
            <button onclick="this.parentElement.remove()" style="
                margin-top: 20px;
                padding: 10px 20px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            ">Close</button>
        `;
        
        // Add details based on node
        const details = modal.querySelector('#node-details');
        details.innerHTML = this.getNodeDetails(nodeLabel);
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    getNodeDetails(nodeLabel) {
        const details = {
            'Reservoir Computing': `
                <p>High-dimensional dynamical systems with fixed random connections.</p>
                <p><strong>Key Equation:</strong> $x(t+1) = \\tanh(W_{in} u(t) + W x(t) + b)$</p>
                <p><strong>Property:</strong> Echo State Property requires $\\rho(W) < 1$</p>
            `,
            'Quantum Mechanics': `
                <p>Fundamental theory describing microscopic physics.</p>
                <p><strong>Uncertainty Principle:</strong> $\\Delta E \\cdot \\Delta t \\geq \\hbar/2$</p>
                <p><strong>Superposition:</strong> States exist as $|\\psi\\rangle = \\sum_i \\alpha_i |i\\rangle$</p>
            `,
            'Reservoir-Quantum Interface': `
                <p>Proposed connection between reservoir dynamics and quantum mechanics.</p>
                <p><strong>Hypothesis:</strong> High-dimensional reservoir states may map to quantum Hilbert space.</p>
                <p><strong>Mechanism:</strong> Undefined reservoir states mirror quantum uncertainty.</p>
            `,
            'Quantum Gravity Insights': `
                <p>Potential pathway to understanding quantum gravity through computational approaches.</p>
                <p><strong>Connection:</strong> Both involve undefined high-dimensional spaces.</p>
                <p><strong>Method:</strong> Reservoir as computational microscope for Planck-scale physics.</p>
            `
        };
        
        return details[nodeLabel] || `<p>Details for ${nodeLabel} coming soon...</p>`;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mermaid !== 'undefined') {
        new TheoryDiagram();
    }
});

