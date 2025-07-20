import React, { useState, useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { Container, Row, Col, Card, Badge, Modal, Button } from 'react-bootstrap'
import * as Scroll from 'react-scroll'
import Base from '../Base'
import OpenSeaIcon from '../OpenSeaIcon.jsx'
import DragonHead from '../DragonHead.jsx'
import LoadingSpinner from '../LoadingSpinner.jsx'

// EverDragons2 contract ABI for balanceOf and tokenOfOwnerByIndex
const ERC721_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

// EverDragons2 contract address on Ethereum mainnet
const EVERDRAGONS2_CONTRACT = '0x3b6aad76254a79a9e256c8aed9187dea505aad52'

const YourDragons = ({ Store, setStore }) => {
  const { address, isConnected } = useAccount()
  const [userDragons, setUserDragons] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDragon, setSelectedDragon] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [usingCache, setUsingCache] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Cache keys
  const getCacheKey = (address) => `everdragons2_${address}`
  const getMetadataKey = (tokenId) => `everdragons2_metadata_${tokenId}`
  const getCountKey = (address) => `everdragons2_count_${address}`

  // Cache helper functions
  const getCachedDragons = (address) => {
    try {
      const cached = localStorage.getItem(getCacheKey(address))
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      console.error('Error reading cached dragons:', error)
      return null
    }
  }

  const setCachedDragons = (address, dragons) => {
    try {
      localStorage.setItem(getCacheKey(address), JSON.stringify(dragons))
    } catch (error) {
      console.error('Error caching dragons:', error)
    }
  }

  const getCachedCount = (address) => {
    try {
      const cached = localStorage.getItem(getCountKey(address))
      return cached ? parseInt(cached) : null
    } catch (error) {
      console.error('Error reading cached count:', error)
      return null
    }
  }

  const setCachedCount = (address, count) => {
    try {
      localStorage.setItem(getCountKey(address), count.toString())
    } catch (error) {
      console.error('Error caching count:', error)
    }
  }

  const getCachedMetadata = (tokenId) => {
    try {
      const cached = localStorage.getItem(getMetadataKey(tokenId))
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      console.error('Error reading cached metadata:', error)
      return null
    }
  }

  const setCachedMetadata = (tokenId, metadata) => {
    try {
      localStorage.setItem(getMetadataKey(tokenId), JSON.stringify(metadata))
    } catch (error) {
      console.error('Error caching metadata:', error)
    }
  }

  // Get user's dragon balance
  const { data: balance, isLoading: balanceLoading } = useContractRead({
    address: EVERDRAGONS2_CONTRACT,
    abi: ERC721_ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: isConnected && address,
  })

  // Fetch user's dragons with caching
  useEffect(() => {
    const fetchUserDragons = async () => {
      if (!isConnected || !address || !balance || balance === 0n) {
        setUserDragons([])
        return
      }

      const balanceNum = Number(balance)
      const cachedCount = getCachedCount(address)
      const cachedDragons = getCachedDragons(address)

      // Check if we have cached data and count hasn't changed
      if (cachedCount === balanceNum && cachedDragons && cachedDragons.length === balanceNum) {
        // console.log(`Using cached data for ${balanceNum} dragons`)
        setUserDragons(cachedDragons)
        setUsingCache(true)
        return
      }

      // console.log(`Fetching ${balanceNum} dragons for address ${address}`)
      setLoading(true)
      setUserDragons([]) // Clear existing dragons

      try {
        const dragons = []

        for (let i = 0; i < balanceNum; i++) {
          try {
            // Get token ID for each dragon using eth_call
            const tokenId = await window.ethereum.request({
              method: 'eth_call',
              params: [{
                to: EVERDRAGONS2_CONTRACT,
                data: '0x2f745c59' + // tokenOfOwnerByIndex function selector
                      address.slice(2).padStart(64, '0') + // owner address
                      i.toString(16).padStart(64, '0') // index
              }]
            })

            const tokenIdNum = parseInt(tokenId, 16)
            // console.log(`Dragon ${i}: Token ID ${tokenIdNum}`)

            // Check if we have cached metadata for this token
            let metadata = getCachedMetadata(tokenIdNum)

            if (!metadata) {
              // Fetch metadata from Arweave only if not cached
                const metadataResponse = await fetch(`https://arweave.net/qoTieeAFFW2wocsXd9Vi004HVZbhQxT3uFs1a0fg1JM/${tokenIdNum}`)
                metadata = await metadataResponse.json()

                // Cache the metadata
                setCachedMetadata(tokenIdNum, metadata)
                // console.log(`Cached metadata for token ${tokenIdNum}`)

            }

            dragons.push(metadata)

            // Add the new dragon to the list immediately
            setUserDragons(prevDragons => [...prevDragons, metadata])

            // Small delay to show loading effect
            await new Promise(resolve => setTimeout(resolve, 100))

          } catch (error) {
            console.error(`Error fetching dragon ${i}:`, error)
          }
        }

        // Cache the complete dragon list and count
        setCachedDragons(address, dragons)
        setCachedCount(address, balanceNum)
        // console.log(`Successfully fetched and cached ${balanceNum} dragons`)

      } catch (error) {
        console.error('Error fetching user dragons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDragons()
  }, [isConnected, address, balance, refreshTrigger])

  const handleDragonClick = (dragon) => {
    setSelectedDragon(dragon)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedDragon(null)
  }

  const handleRefresh = () => {
    // Clear cache for this address to force refresh
    try {
      localStorage.removeItem(getCacheKey(address))
      localStorage.removeItem(getCountKey(address))
    } catch (error) {
      console.error('Error clearing cache:', error)
    }

    // Reset states to trigger fresh fetch
    setUserDragons([])
    setUsingCache(false)
    setLoading(true)
    setRefreshTrigger(prev => prev + 1)
  }

  if (!isConnected || !address) {
    return null
  }

  if (balanceLoading) {
    return (
      <div className={'home-section'}>
        <Scroll.Element name='mydragons'><h1>Your Dragons</h1></Scroll.Element>
        <Container>
          <Row>
            <Col>
              <div className={'textBlock centered'}>
                <div className="loading-logo-container">
                  <LoadingSpinner size="medium" />
                </div>
                <p>Checking your dragon collection...</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  if (!balance || balance === 0n) {
    return (
      <div className={'home-section'}>
        <Scroll.Element name='mydragons'><h1>Your Dragons</h1></Scroll.Element>
        <Container>
          <Row>
            <Col>
              <div className={'textBlock centered'}>
                <p>You don't own any EverDragons2 yet.</p>
                <p>
                  <a href="https://opensea.io/collection/everdragons2" target="_blank" rel="noopener noreferrer">
                    Get your first dragon on OpenSea
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }


  return (
    <div className={'home-section'}>
      <Scroll.Element name='mydragons'><h1>Your Dragons</h1></Scroll.Element>
      <Row>
        <Col>
          <div className={'textBlock'}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="mb-0">You own <Badge bg="primary">{Number(balance)}</Badge> EverDragons2!</p>
              {usingCache && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleRefresh}
                  className="refresh-btn"
                >
                  <i className="fas fa-sync-alt me-1"></i>
                  Refresh
                </Button>
              )}
            </div>
            {loading && (
              <p className="text-muted">
                <small>Loading dragons... {userDragons.length} of {Number(balance)} loaded</small>
              </p>
            )}

            <Row>
              {userDragons.map((dragon) => (
                <Col key={dragon.tokenId} xs={6} sm={4} md={3} lg={2} className="mb-3">
                  <div
                    className="dragon-simple-card"
                    onClick={() => handleDragonClick(dragon)}
                    title="Click to view details"
                  >
                    <div className="dragon-image-container">
                      <img
                        src={dragon.image}
                        alt={dragon.name}
                        className="dragon-image"
                      />
                    </div>
                    <div className="dragon-name">{dragon.name}</div>
                  </div>
                </Col>
              ))}
              {loading && userDragons.length < Number(balance) && (
                <Col xs={12} className="text-center">
                  <div className="loading-logo-container">
                    <LoadingSpinner size="small" />
                  </div>
                  <p className="mt-2">Loading more dragons...</p>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>

      {/* Dragon Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header className="text-center position-relative">
          <Modal.Title className="w-100 text-center">{selectedDragon?.name} (#{selectedDragon?.tokenId})</Modal.Title>
          {selectedDragon && (
            <div className="modal-header-actions">
              <a
                href={`https://opensea.io/assets/ethereum/${EVERDRAGONS2_CONTRACT}/${selectedDragon.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="opensea-icon"
                title="View on OpenSea"
              >
                <OpenSeaIcon size={22} />
              </a>
              <button
                type="button"
                className="close-btn"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
        </Modal.Header>
        <Modal.Body>
          {selectedDragon && (
            <div className="dragon-modal-content">
              <div className="text-center mb-4 dragon-modal-image-container">
                <img
                  src={selectedDragon.image}
                  onError={(e) => {
                    e.target.src = selectedDragon.fallbackImage
                  }}
                  alt={selectedDragon.name}
                  className="dragon-modal-image"
                />
                <DragonHead
                  dragonName={selectedDragon.name}
                  className="dragon-head-modal"
                  dragonMetadata={selectedDragon}
                />
              </div>

              {selectedDragon.attributes && selectedDragon.attributes.length > 0 && (
                <div className="dragon-attributes">
                  <h5>Attributes</h5>
                  <Row>
                    {selectedDragon.attributes.map((attr, index) => (
                      <Col key={index} xs={6} md={4} className="mb-2">
                        <div className="attribute-item">
                          <strong>{attr.trait_type}:</strong> {attr.value}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default YourDragons
