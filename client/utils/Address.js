import { toChecksumAddress } from 'ethereumjs-util'

class Address {

  static equal(addr1, addr2) {
    try {
      let result = toChecksumAddress(addr1) === toChecksumAddress(addr2)
      return result
    } catch(e) {
      return false
    }
  }

  static isAdmin(addr) {
    return Address.equal(addr, '0x75543056D9cA56B29FfcCF873d5C2Cfc91f412b4')
  }
}

/**
 * Converts ar:// URLs to https://arweave.net/ URLs for compatibility
 * @param {string} url - The URL to convert
 * @returns {string} - The converted URL
 */
export const convertArweaveUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  
  // Convert ar:// URLs to https://arweave.net/ URLs
  if (url.startsWith('ar://')) {
    const txId = url.replace('ar://', '');
    const convertedUrl = `https://arweave.net/${txId}`;
    return convertedUrl;
  }
  
  return url;
};

/**
 * Converts specific ar:// URLs in metadata to https://arweave.net/ URLs
 * Only converts known properties: image, assets.Dragon, assets.Sky, assets.Aura, and Aura trait values
 * @param {object} metadata - The metadata object to process
 * @returns {object} - The processed metadata object
 */
export const convertArweaveUrlsInObject = (metadata) => {
  if (!metadata || typeof metadata !== 'object') {
    return metadata;
  }
  
  const converted = { ...metadata };
  let hasChanges = false;
  
  // Convert image URL
  if (metadata.image && typeof metadata.image === 'string' && metadata.image.startsWith('ar://')) {
    converted.image = convertArweaveUrl(metadata.image);
    hasChanges = true;
  }
  
  // Convert assets URLs
  if (metadata.assets && typeof metadata.assets === 'object') {
    converted.assets = { ...metadata.assets };
    
    if (metadata.assets.Dragon && typeof metadata.assets.Dragon === 'string' && metadata.assets.Dragon.startsWith('ar://')) {
      converted.assets.Dragon = convertArweaveUrl(metadata.assets.Dragon);
      hasChanges = true;
    }
    
    if (metadata.assets.Sky && typeof metadata.assets.Sky === 'string' && metadata.assets.Sky.startsWith('ar://')) {
      converted.assets.Sky = convertArweaveUrl(metadata.assets.Sky);
      hasChanges = true;
    }
    
    if (metadata.assets.Aura && typeof metadata.assets.Aura === 'string' && metadata.assets.Aura.startsWith('ar://')) {
      converted.assets.Aura = convertArweaveUrl(metadata.assets.Aura);
      hasChanges = true;
    }
  }
  
  // Convert Aura trait values
  if (metadata.attributes && Array.isArray(metadata.attributes)) {
    converted.attributes = metadata.attributes.map(attr => {
      if (attr.trait_type === 'Aura' && attr.value && typeof attr.value === 'string' && attr.value.startsWith('ar://')) {
        return {
          ...attr,
          value: convertArweaveUrl(attr.value)
        };
      }
      return attr;
    });
    
    // Check if any Aura traits were converted
    const originalAuraTraits = metadata.attributes.filter(attr => 
      attr.trait_type === 'Aura' && attr.value && typeof attr.value === 'string' && attr.value.startsWith('ar://')
    );
    if (originalAuraTraits.length > 0) {
      hasChanges = true;
    }
  }
  
  // Convert composite_image field using regex replacement
  if (metadata.composite_image && typeof metadata.composite_image === 'string' && metadata.composite_image.includes('ar://')) {
    converted.composite_image = metadata.composite_image.replace(/ar:\/\//g, 'https://arweave.net/');
    hasChanges = true;
  }
  
  if (hasChanges) {
    console.log('Converted ar:// URLs in metadata for compatibility');
  }
  
  return converted;
};

export default Address

