/* docgenerator.js - Dynamically adds footer content and enables PDF download using jsPDF with advanced features */

// Utility to dynamically load external scripts with promise-based error handling
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Utility to check if an element exists
function elementExists(selector) {
    return !!document.querySelector(selector);
}

// Utility to format the current date for filenames
function getFormattedDate() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-').split('.')[0];
}

// Function to add footer content with enhanced styling
function addFooterContent() {
    if (elementExists('footer')) {
        console.warn('Footer already exists, skipping creation.');
        return;
    }

    const footer = document.createElement('footer');
    footer.id = 'pdf-footer';
    footer.style.cssText = `
        padding: 20px;
        background-color: #f8f9fa;
        text-align: center;
        border-top: 1px solid #dee2e6;
        margin-top: 20px;
        font-family: Arial, sans-serif;
    `;
    footer.innerHTML = `
        <h3 style="margin: 0 0 10px; font-size: 1.5em; color: #333;">Export Tutorial</h3>
        <p style="margin: 0 0 15px; color: #666;">Download this tutorial as a PDF to read offline.</p>
        <a id="downloadtutorial" href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Download PDF</a>
        <div id="pdf-status" style="margin-top: 10px; color: #666; display: none;"></div>
    `;
    document.body.appendChild(footer);
}

// Function to filter content for PDF (exclude footer and scripts)
function getFilteredContent() {
    const clone = document.body.cloneNode(true);
    // Remove footer and script tags
    const footer = clone.querySelector('#pdf-footer');
    if (footer) footer.remove();
    const scripts = clone.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    // Add basic styling for PDF
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: Arial, sans-serif; color: #333; }
        h1, h2, h3 { color: #007bff; }
        p { line-height: 1.6; }
        img { max-width: 100%; height: auto; }
    `;
    clone.insertBefore(style, clone.firstChild);
    return clone;
}

// Function to show status messages
function showStatus(message, isError = false) {
    const statusEl = document.getElementById('pdf-status');
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.style.color = isError ? '#dc3545' : '#28a745';
        statusEl.textContent = message;
        setTimeout(() => {
            statusEl.style.display = 'none';
            statusEl.textContent = '';
        }, 3000);
    }
}

// Function to generate and download PDF
async function setupPDFDownload() {
    const downloadLink = document.getElementById('downloadtutorial');
    if (!downloadLink) {
        console.error('Download link not found');
        showStatus('Error: Download link not found', true);
        return;
    }

    downloadLink.addEventListener('click', async (e) => {
        e.preventDefault();
        showStatus('Generating PDF...');

        // Ensure jsPDF is loaded
        if (!window.jspdf || !window.jspdf.jsPDF) {
            console.error('jsPDF not loaded');
            showStatus('Error: jsPDF library not loaded', true);
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });

        try {
            // Add custom header to each page
            const addHeader = () => {
                doc.setFontSize(12);
                doc.setTextColor(100);
                doc.text('Tutorial Document', 20, 20);
                doc.setLineWidth(0.5);
                doc.line(20, 25, 430, 25); // Header line
            };

            // Capture filtered content
            const content = getFilteredContent();
            await doc.html(content, {
                callback: (doc) => {
                    addHeader();
                    const filename = `tutorial_${getFormattedDate()}.pdf`;
                    doc.save(filename);
                    showStatus('PDF downloaded successfully!');
                },
                x: 20,
                y: 30,
                width: 400,
                windowWidth: Math.min(document.body.scrollWidth, 800),
                html2canvas: {
                    scale: 0.5, // Optimize for performance
                    useCORS: true,
                    logging: false
                },
                margin: [30, 20, 30, 20]
            });
        } catch (error) {
            console.error('PDF generation failed:', error);
            showStatus('Error generating PDF', true);
        }
    });
}

// Initialize everything with error handling
async function initialize() {
    try {
        // Load jsPDF with fallback
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        // Load html2canvas (required for doc.html)
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        
        addFooterContent();
        await setupPDFDownload();
        console.log('DocGenerator initialized successfully');
    } catch (error) {
        console.error('Initialization failed:', error);
        showStatus('Error initializing PDF generator', true);
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);

// Export for testing or module usage
i            f (typeof module !== 'undefined' && module.exports) {
       module.exports = { loadScript, addFooterContent, setupPDFDownload, initialize };
}
