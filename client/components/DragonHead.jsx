import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner.jsx';
import { convertArweaveUrl } from '../utils/Address.js';

const DragonHead = ({ dragonName, className = '', dragonMetadata = null }) => {
  const [headSvg, setHeadSvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [includeBackground, setIncludeBackground] = useState(false);
  const [showDebugModal, setShowDebugModal] = useState(false);
  const [debugCanvas, setDebugCanvas] = useState(null);
  const [debugStep, setDebugStep] = useState('');
  const svgRef = useRef(null);

  useEffect(() => {
    if (!dragonName) return;

    const fetchDragonSvg = async () => {
      setLoading(true);
      setError(null);

      // Get the Dragon asset URL and convert if needed
      const arweaveUrl = convertArweaveUrl(dragonMetadata.assets.Dragon);

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

      if (!headElement) {
        throw new Error('Head element not found in SVG');
      }

      // Create a new SVG container for the head
      const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      newSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      newSvg.setAttribute('viewBox', '0 0 500 500');

      // Clone the head element and its children
      const clonedHead = headElement.cloneNode(true);
      newSvg.appendChild(clonedHead);

      // Convert to string
      const serializer = new XMLSerializer();
      const headSvgString = serializer.serializeToString(newSvg);

      setHeadSvg(headSvgString);
      setLoading(false);
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



  // Debug function to show canvas at each step
  const showDebugCanvas = (canvas, step) => {
    const canvasCopy = canvas.cloneNode();
    setDebugCanvas(canvasCopy);
    setDebugStep(step);
    setShowDebugModal(true);
  };

  // Helper function to compose the final image with all pieces
  const composeAndDownload = (croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, skyImage, auraImage) => {
    // Draw Sky background - scale to 612x612 (no cropping)
    croppedCtx.drawImage(skyImage, 0, 0, 612, 612);
    showDebugCanvas(croppedCanvas, 'After adding Sky background');

    // Draw Aura on top - scale to 612x612 (no cropping)
    croppedCtx.drawImage(auraImage, 0, 0, 612, 612);
    showDebugCanvas(croppedCanvas, 'After adding Aura background');

    // Draw the cropped head on top
    croppedCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, 612, 612);
    showDebugCanvas(croppedCanvas, 'After adding cropped head');

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
      setShowDebugModal(false);
    }, 'image/png');
  };

  // Helper function to load background images and composite
  const loadBackgroundImages = async (croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, assets) => {

    const skyUrl = convertArweaveUrl(assets.Sky);
    const auraUrl = convertArweaveUrl(assets.Aura);

    console.log('Loading background images...');
    console.log('Full dragonMetadata:', dragonMetadata);

    // Helper function to load image with fetch to handle redirects
    const loadImageWithFetch = async (fullUrl) => {

          const response = await fetch(fullUrl, { mode: 'cors' });
          console.log('Fetch response status:', response.status);
          console.log('Fetch response URL:', response.url);

          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);

          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log('Image loaded via fetch, size:', img.width, 'x', img.height);
              resolve(img);
            };
            img.onerror = () => {
              console.error('Failed to load image from blob');
              reject(new Error('Failed to load image from blob'));
            };
            img.src = objectUrl;
          });

        }

    // Load both Sky and Aura images
    const skyImage = await loadImageWithFetch(skyUrl);
    const auraImage = await loadImageWithFetch(auraUrl);
    
    // Compose with both backgrounds
    composeAndDownload(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, skyImage, auraImage);
};

  const downloadAsPng = async () => {
    if (!headSvg || downloading) return;

    setDownloading(true);

    // Create a temporary SVG element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headSvg;
    const svgElement = tempDiv.firstChild;

    // Create a canvas to draw the SVG and then crop it
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Render the SVG at higher resolution for better quality
    const fullSize = 2000; // Increased from 1000 to 2000 for better quality
    canvas.width = fullSize;
    canvas.height = fullSize;

    // Set high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

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

      // Scale crop coordinates for 2000x2000 canvas (2x the original 1000x1000)
      const cropX = 194 * 2; // 388
      const cropY = 90 * 2;  // 180
      const cropSize = 612 * 2; // 1224

      console.log('Source canvas size:', canvas.width, 'x', canvas.height);
      console.log('Crop coordinates:', cropX, cropY, cropSize);

      // Create a new canvas for the cropped image - exactly 612x612
      const croppedCanvas = document.createElement('canvas');
      const croppedCtx = croppedCanvas.getContext('2d');
      croppedCanvas.width = 612;
      croppedCanvas.height = 612;

      // Set high-quality image smoothing for the cropped canvas
      croppedCtx.imageSmoothingEnabled = true;
      croppedCtx.imageSmoothingQuality = 'high';

      console.log('Cropped canvas size:', croppedCanvas.width, 'x', croppedCanvas.height);
      console.log('includeBackground:', includeBackground);

      if (includeBackground) {
        // Create background using Sky and Aura images
        console.log('Loading background images...');
        // Use the assets directly from metadata
        const assets = dragonMetadata.assets;
        loadBackgroundImages(croppedCtx, canvas, cropX, cropY, cropSize, url, croppedCanvas, assets);
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
          <LoadingSpinner size="small" />
        </div>
      )}

      {/* Debug Modal */}
      {showDebugModal && (
        <div className="debug-modal-overlay">
          <div className="debug-modal">
            <div className="debug-modal-header">
              <h4>Debug Canvas - {debugStep}</h4>
              <button
                className="debug-close-btn"
                onClick={() => setShowDebugModal(false)}
              >
                ×
              </button>
            </div>
            <div className="debug-modal-content">
              {debugCanvas && (
                <canvas
                  ref={(canvas) => {
                    if (canvas && debugCanvas) {
                      const ctx = canvas.getContext('2d');
                      canvas.width = debugCanvas.width;
                      canvas.height = debugCanvas.height;
                      ctx.drawImage(debugCanvas, 0, 0);
                    }
                  }}
                  style={{
                    border: '2px solid red',
                    maxWidth: '100%',
                    maxHeight: '400px'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragonHead;
