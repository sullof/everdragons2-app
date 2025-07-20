import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import Address from '../utils/Address.js'

import { ethers } from 'ethers'
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../config/wagmi.js'
import '../config/web3modal.js'

// import {Web3Provider} from '@ethersproject/providers'
// import Web3Modal from 'web3modal'

import { Contract } from '@ethersproject/contracts'

import appConfig from '../config/index.js'

import ls from 'local-storage'

import Common from './Common.jsx'
import Header from './Header.jsx'
import Home from './Home.jsx'
import Admin from './Admin.jsx'
import Error404 from './Error404.jsx'
import Footer from './Footer.jsx'
import WagmiStoreSync from './WagmiStoreSync.jsx'

// Create a client
const queryClient = new QueryClient()

class App extends Common {

  constructor(props) {
    super(props)

    this.state = {
      Store: {
        content: {},
        editing: {},
        temp: {},
        menuVisibility: false,
        config: appConfig,
        width: this.getWidth(),
        pathname: window.location.pathname
      }
    }

    this.bindMany([
      'handleClose',
      'handleShow',
      'setStore',
      'getContract',
      'updateDimensions',
      'showModal',
      'setWallet',
      'connect'
    ])
  }

  getWidth() {
    // let width = 2 * (window.innerWidth - 100) / 6
    // if (window.innerWidth < 800) {
    //   width = window.innerWidth - 50
    // }
    return window.innerWidth
  }

  updateDimensions() {
    this.setStore({
      width: this.getWidth()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }


  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({show: true})
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))
    // await this.connect(true)
  }

  async setWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const chainId = (await provider.getNetwork()).chainId
      const signedInAddress = await signer.getAddress()

      const {
        contract,
        connectedNetwork,
        networkNotSupported
      } = this.getContract(appConfig, chainId, provider)

      this.setStore({
        provider,
        signer,
        signedInAddress,
        chainId,
        contract,
        connectedNetwork,
        networkNotSupported
      })
    } catch (e) {
      window.location.reload()
    }
  }

  async connect(dontShowError) {

    if (typeof window.ethereum !== 'undefined') {

      if (await window.ethereum.request({method: 'eth_requestAccounts'})) {

        window.ethereum.on('accountsChanged', () => window.location.reload())
        window.ethereum.on('chainChanged', () => window.location.reload())
        window.ethereum.on('disconnect', () => window.location.reload())

        this.setWallet()
      }

    } else {

      // if (!dontShowError) {
      //   this.showModal(
      //     'No wallet extention found',
      //     'Please, activate your wallet and reload the page',
      //     'Ok'
      //   )
      // }
    }

  }

  showModal(modalTitle, modalBody, modalClose, secondButton, modalAction) {
    this.setStore({
      modalTitle,
      modalBody,
      modalClose,
      secondButton,
      modalAction,
      showModal: true
    })
  }


  getContract(config, chainId, web3Provider) {
    let contract
    let networkNotSupported = false
    let connectedNetwork = null

    if (config.address[chainId]) {
      contract = new Contract(config.address[chainId], config.abi, web3Provider)
      for (let name in config.supported) {
        if (config.supported[name] === chainId) {
          connectedNetwork = name
        }
      }
    } else {
      networkNotSupported = true
    }
    return {
      contract,
      connectedNetwork,
      networkNotSupported
    }
  }

  setStore(newProps, localStorage) {
    let store = this.state.Store
    for (let i in newProps) {
      if (newProps[i] === null) {
        if (localStorage) {
          ls.remove(i)
        }
        delete store[i]
      } else {
        if (localStorage) {
          ls(i, newProps[i])
        }
        store[i] = newProps[i]
      }
    }
    this.setState({
      Store: store
    })
  }

  render() {

    const Store = this.state.Store

    return (
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <WagmiStoreSync Store={Store} setStore={this.setStore} />
            <Header
              Store={Store}
              setStore={this.setStore}
              connect={this.connect}
            />
            <main>
              <Routes>
                {/*<Route path="/" element={<LandingPage Store={Store} setStore={this.setStore} />} />*/}
                <Route path="/" element={<Home Store={Store} setStore={this.setStore} />} />
                <Route path="/admin" element={
                  Store.signedInAddress
                    ? (
                      Address.isAdmin(Store.signedInAddress)
                        ? <Admin Store={Store} setStore={this.setStore} />
                        : <Navigate to="/404" replace />
                    )
                    : <Navigate to="/404" replace />
                } />
                <Route path="*" element={<Error404 Store={Store} setStore={this.setStore} />} />
              </Routes>
            </main>
            <Footer
              Store={Store}
              setStore={this.setStore}
            />
            <Modal show={Store.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{Store.modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{Store.modalBody}</Modal.Body>
              <Modal.Footer>
                {Store.secondButton ? (
                  <Button variant="secondary" onClick={Store.modalAction}>
                    {Store.secondButton}
                  </Button>
                ) : null}
                <Button variant="primary" onClick={this.handleClose}>
                  {Store.modalClose}
                </Button>
              </Modal.Footer>
            </Modal>
          </BrowserRouter>
        </QueryClientProvider>
      </WagmiConfig>
    )
  }
}

export default App
