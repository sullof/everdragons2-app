import React, { useState, useEffect, useRef } from 'react';

const DragonHead = ({ dragonName, className = '', dragonMetadata = null }) => {
  const [headSvg, setHeadSvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [includeBackground, setIncludeBackground] = useState(false);
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
        
        // For now, let's just use the original SVG content to see if it renders
        // We'll add the head element to a simple container
        const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        newSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        newSvg.setAttribute('viewBox', '0 0 500 500');
        
        // Clone the head element and its children
        const clonedHead = headElement.cloneNode(true);
        newSvg.appendChild(clonedHead);
        
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



  // Helper function to compose the final image with all pieces
  const composeAndDownload = (croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, skyImage = null, auraImage = null) => {
    // Draw Sky background if available
    if (skyImage) {
      croppedCtx.drawImage(skyImage, 0, 0, cropSize, cropSize);
    }
    
    // Draw Aura on top if available
    if (auraImage) {
      croppedCtx.drawImage(auraImage, 0, 0, cropSize, cropSize);
    }
    
    // Draw the head on top
    croppedCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, 612, 612);
    
    // Download the final image
    croppedCanvas.toBlob((blob) => {
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${dragonName}_PFP.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(downloadUrl);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 'image/png');
  };

  // Helper function to load background images and composite
  const loadBackgroundImages = async (croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas) => {
    try {
      const skyUrl = dragonMetadata.assets?.sky;
      const auraUrl = dragonMetadata.assets?.aura;
      
      console.log('Loading background images:', { skyUrl, auraUrl });
      
      // Load Sky image
      const skyImage = new Image();
      skyImage.crossOrigin = 'anonymous';
      
      skyImage.onload = () => {
        console.log('Sky image loaded, size:', skyImage.width, 'x', skyImage.height);
        
        if (auraUrl) {
          // Load Aura image
          const auraImage = new Image();
          auraImage.crossOrigin = 'anonymous';
          
          auraImage.onload = () => {
            console.log('Aura image loaded, size:', auraImage.width, 'x', auraImage.height);
            composeAndDownload(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, skyImage, auraImage);
          };
          
          auraImage.onerror = () => {
            console.error('Failed to load Aura image');
            composeAndDownload(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, skyImage, null);
          };
          
          auraImage.src = auraUrl;
        } else {
          // No Aura, just compose with Sky
          composeAndDownload(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, skyImage, null);
        }
      };
      
      skyImage.onerror = () => {
        console.error('Failed to load Sky image');
        // Fallback to transparent background
        composeAndDownload(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, null, null);
      };
      
      skyImage.src = skyUrl;
    } catch (error) {
      console.error('Error in loadBackgroundImages:', error);
      // Fallback to transparent background
      composeAndDownload(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, null, null);
    }
  };

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
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Create image from SVG
      const img = new Image();
      img.onerror = (error) => {
        console.error('Error loading SVG image:', error);
        setDownloading(false);
      };
      img.onload = () => {
        // Draw the SVG on canvas
        ctx.drawImage(img, 0, 0, fullSize, fullSize);
        
        // Use the original working crop coordinates: x=194, y=90, size=612x612
        const cropX = 194;
        const cropY = 90;
        const cropSize = 612;
        
        console.log('Source canvas size:', canvas.width, 'x', canvas.height);
        console.log('Crop coordinates:', cropX, cropY, cropSize);
        
        // Create a new canvas for the cropped image - exactly 612x612
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        croppedCanvas.width = 612;
        croppedCanvas.height = 612;
        
        console.log('Cropped canvas size:', croppedCanvas.width, 'x', croppedCanvas.height);
        
        if (includeBackground) {
          // Create background using Sky and Aura images
          if (dragonMetadata && dragonMetadata.assets) {
            loadBackgroundImages(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas);
          } else {
            // Fallback to transparent background if no metadata
            croppedCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, 612, 612);
            
            // Convert to PNG and download directly (no scaling)
            croppedCanvas.toBlob((blob) => {
              const downloadUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.download = `${dragonName}_PFP.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              // Clean up
              URL.revokeObjectURL(downloadUrl);
              URL.revokeObjectURL(url);
              setDownloading(false);
            }, 'image/png');
          }
        } else {
          // Draw the cropped portion with transparency
          croppedCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, 612, 612);
          
          // Convert to PNG and download directly (no scaling)
          croppedCanvas.toBlob((blob) => {
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${dragonName}_PFP.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            URL.revokeObjectURL(downloadUrl);
            URL.revokeObjectURL(url);
            setDownloading(false);
          }, 'image/png');
        }
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
      />
      <div className="download-options">
        <div className="download-button-container">
          <button 
            className="download-pfp-btn"
            onClick={downloadAsPng}
            disabled={downloading}
          >
            Download PFP
          </button>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={`include-background-${dragonName}`}
              checked={includeBackground}
              onChange={(e) => setIncludeBackground(e.target.checked)}
            />
            <label htmlFor={`include-background-${dragonName}`}>
              Include background
            </label>
          </div>
        </div>
      </div>
      {downloading && (
        <div className="download-overlay">
          <img 
            src="/images/everDragons2Icon.png" 
            alt="Loading..." 
            className="loading-logo-small"
          />
        </div>
      )}
    </div>
  );
};

export default DragonHead; 