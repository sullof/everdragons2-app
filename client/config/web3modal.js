import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config } from './wagmi.js'

// Initialize modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: 'a5eba3157e93b90bc4c393777ec41801',
  chains: config.chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent-color': '#6366f1',
    '--w3m-background-color': '#1f2937',
    '--w3m-overlay-background-color': 'rgba(0, 0, 0, 0.8)',
  },
  walletConnectVersion: 2,
  enableAnalytics: false, // Disable analytics to avoid 403 errors
  enableOnramp: false, // Disable onramp features
  enableWalletConnectFeatures: false, // Disable WC features that require API
}) 