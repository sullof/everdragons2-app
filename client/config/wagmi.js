import { createConfig, http } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { metaMask, walletConnect, injected } from 'wagmi/connectors'

// Set up wagmi config
export const config = createConfig({
  chains: [mainnet, polygon],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: 'a5eba3157e93b90bc4c393777ec41801',
    }),
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
}) 