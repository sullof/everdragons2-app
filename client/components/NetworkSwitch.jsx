import React from 'react'
import { useChainId } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { mainnet } from 'wagmi/chains'

const NetworkSwitch = ({ Store }) => {
  const chainId = useChainId()
  const { open } = useWeb3Modal()

  const handleSwitchToEthereum = () => {
    // Open the Web3Modal with network switching view
    open({ view: 'Networks' })
  }

  // Only show the switch button if we're not on Ethereum mainnet
  if (chainId === mainnet.id) {
    return null
  }

  return (
    <span 
      className="notConnected command" 
      onClick={handleSwitchToEthereum}
      style={{ cursor: 'pointer' }}
      title="Click to switch to Ethereum Mainnet"
    >
      Switch to Ethereum Mainnet
    </span>
  )
}

export default NetworkSwitch 