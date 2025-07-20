import React, { useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'

const WagmiStoreSync = ({ Store, setStore }) => {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  useEffect(() => {
    // Sync wagmi connection state with Store
    if (isConnected && address) {
      let connectedNetwork = null
      
      // Check if we're on Ethereum mainnet (chain ID 1)
      if (chainId === 1) {
        connectedNetwork = 'ethereum'
      }
      
      setStore({
        signedInAddress: address,
        isConnected: true,
        connectedNetwork: connectedNetwork,
        chainId: chainId
      })
    } else {
      setStore({
        signedInAddress: null,
        isConnected: false,
        connectedNetwork: null,
        chainId: null
      })
    }
  }, [isConnected, address, chainId, setStore])

  // This component doesn't render anything, it just syncs state
  return null
}

export default WagmiStoreSync 