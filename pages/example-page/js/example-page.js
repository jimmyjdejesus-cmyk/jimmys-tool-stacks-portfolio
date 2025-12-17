/**
 * Example Page Specific JavaScript
 */

(function() {
    'use strict';
    
    console.log('Example page loaded with page-specific JavaScript');
    
    // Highlight code blocks on load
    function highlightCodeBlocks() {
        const codeBlocks = document.querySelectorAll('.code-example');
        
        codeBlocks.forEach(block => {
            block.addEventListener('click', function() {
                // Select all text in code block when clicked
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(this);
                selection.removeAllRanges();
                selection.addRange(range);
                
                console.log('Code block selected');
            });
        });
    }
    
    // Add copy button to code blocks
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('.code-example');
        
        codeBlocks.forEach(block => {
            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy';
            copyBtn.className = 'copy-btn';
            copyBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 5px 10px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 0.85rem;
            `;
            
            // Make parent relative for absolute positioning
            block.style.position = 'relative';
            block.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const code = block.querySelector('code').textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 2000);
                });
            });
        });
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            highlightCodeBlocks();
            addCopyButtons();
        });
    } else {
        highlightCodeBlocks();
        addCopyButtons();
    }
    
})();
