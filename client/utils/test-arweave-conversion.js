import { convertArweaveUrl, convertArweaveUrlsInObject } from './Address.js';

// Test the conversion function
const testConversion = () => {
  console.log('Testing arweave URL conversion...');
  
  // Test single URL conversion
  const testUrls = [
    'ar://abc123',
    'https://arweave.net/abc123',
    'ar://def456',
    'https://example.com/image.jpg',
    null,
    undefined,
    ''
  ];
  
  testUrls.forEach(url => {
    const converted = convertArweaveUrl(url);
    console.log(`Input: ${url} -> Output: ${converted}`);
  });
  
  // Test metadata object conversion
  const testMetadata = {
    name: 'Test Dragon',
    description: 'A test dragon',
    image: 'ar://abc123',
    composite_image: '<svg><image href="ar://def456"/><image href="ar://ghi789"/></svg>',
    attributes: [
      { trait_type: 'Background', value: 'Blue' },
      { trait_type: 'Aura', value: 'ar://aura123' },
      { trait_type: 'Dragon', value: 'Red' }
    ],
    assets: {
      Dragon: 'ar://def456',
      Sky: 'ar://ghi789',
      Aura: 'ar://jkl012'
    }
  };
  
  const convertedMetadata = convertArweaveUrlsInObject(testMetadata);
  console.log('Original metadata:', testMetadata);
  console.log('Converted metadata:', convertedMetadata);
};

// Run the test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  window.testArweaveConversion = testConversion;
} else {
  // Node.js environment
  testConversion();
}

export { testConversion }; 