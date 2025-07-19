import React, { useState, useEffect, useRef } from 'react';

const DragonHead = ({ dragonName, className = '' }) => {
  const [headSvg, setHeadSvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!dragonName) return;

    const fetchDragonSvg = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construct Arweave URL
        const arweaveUrl = `https://arweave.net/vtnH_BsVgMCNt2QFayfLFBzN_IVxZsL2HcTfzi_O9UU/${dragonName}.svg`;
        
        const response = await fetch(arweaveUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch SVG: ${response.status}`);
        }
        
        const svgText = await response.text();
        
        // Parse SVG and extract only the head element
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        // Find the head element
        const headElement = svgDoc.querySelector('g[class="Head"]');
        
        // Debug: log the SVG structure
        console.log('Full SVG content:', svgText.substring(0, 500));
        console.log('Available elements:', svgDoc.querySelectorAll('g').length);
        svgDoc.querySelectorAll('g').forEach((g, i) => {
          console.log(`Group ${i}:`, g.getAttribute('class'));
        });
        
        if (!headElement) {
          console.error('SVG content:', svgText.substring(0, 500));
          throw new Error('Head element not found in SVG');
        }
        
        // Create a new SVG with just the head
        const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        newSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        
        // Clone the head element and its children
        const clonedHead = headElement.cloneNode(true);
        newSvg.appendChild(clonedHead);
        
        // For debugging, let's first try without viewBox to see if the SVG renders at all
        newSvg.setAttribute('viewBox', '0 0 1000 1000');
        
        // Add debugging
        console.log('SVG content length:', svgText.length);
        console.log('Head element found:', !!headElement);
        console.log('New SVG structure:', newSvg.outerHTML.substring(0, 200));
        
        // Convert to string
        const serializer = new XMLSerializer();
        const headSvgString = serializer.serializeToString(newSvg);
        
        setHeadSvg(headSvgString);
      } catch (err) {
        console.error('Error fetching dragon head:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDragonSvg();
  }, [dragonName]);

  if (loading) {
    return (
      <div className={`dragon-head-loading ${className}`}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`dragon-head-error ${className}`}>
        <small>Head not available</small>
      </div>
    );
  }

  const downloadAsPng = async () => {
    if (!headSvg || downloading) return;
    
    try {
      setDownloading(true);
      
      // Create a temporary SVG element
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = headSvg;
      const svgElement = tempDiv.firstChild;
      
      // Create a canvas to draw the SVG and then crop it
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // First render the full SVG at 1000x1000 (original size)
      const fullSize = 1000;
      canvas.width = fullSize;
      canvas.height = fullSize;
      
      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svgElement);
      console.log('SVG data for download:', svgData.substring(0, 300));
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Create image from SVG
      const img = new Image();
      img.onerror = (error) => {
        console.error('Error loading SVG image:', error);
        setDownloading(false);
      };
      img.onload = () => {
        console.log('SVG image loaded successfully, size:', img.width, 'x', img.height);
        // Draw the SVG on canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, fullSize, fullSize);
        ctx.drawImage(img, 0, 0, fullSize, fullSize);
        
        // Use your exact crop coordinates: x=194, y=90, size=612x612
        const cropX = 194;
        const cropY = 90;
        const cropSize = 612;
        
        // Create a new canvas for the cropped image
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        croppedCanvas.width = cropSize;
        croppedCanvas.height = cropSize;
        
                 // Draw the cropped portion using your exact coordinates
         croppedCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, cropSize, cropSize);
         
         // Convert to PNG and download
         croppedCanvas.toBlob((blob) => {
           const downloadUrl = URL.createObjectURL(blob);
           const link = document.createElement('a');
           link.href = downloadUrl;
           link.download = `${dragonName}-head.png`;
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
           
           // Clean up
           URL.revokeObjectURL(downloadUrl);
           URL.revokeObjectURL(url);
           setDownloading(false);
         }, 'image/png');
      };
      
      img.src = url;
      
    } catch (error) {
      console.error('Error downloading PNG:', error);
      setDownloading(false);
    }
  };

  if (!headSvg) {
    return null;
  }

  return (
    <div className={`dragon-head ${className}`}>
      <div 
        ref={svgRef}
        className="dragon-head-svg"
        dangerouslySetInnerHTML={{ __html: headSvg }}
        onClick={downloadAsPng}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ cursor: 'pointer' }}
        title="Click to download as PNG"
      />
      {showTooltip && (
        <div className="custom-tooltip">
          Download your PFP
        </div>
      )}
      {downloading && (
        <div className="download-overlay">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Downloading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragonHead; 