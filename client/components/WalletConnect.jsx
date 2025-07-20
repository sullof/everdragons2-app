import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button } from 'react-bootstrap'

const WalletConnect = ({ Store, setStore }) => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()

  const handleConnect = () => {
    open()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const formatAddress = (addr) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address">
          <i className="fas fa-user-astronaut" style={{marginRight: 10}}/>
          {formatAddress(address)}
        </span>
        <Button 
          variant="outline-secondary" 
          size="sm" 
          onClick={handleDisconnect}
          style={{marginLeft: 10}}
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={handleConnect} variant="primary" className="chiaro">
      Connect your wallet
    </Button>
  )
}

export default WalletConnect 