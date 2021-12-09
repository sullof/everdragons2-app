const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const db = require('../lib/Db')
const Address = require('../../client/utils/Address')
const path = require('path')
const fs = require('fs-extra')
const {getContract} = require('../lib/utils')
const bot = require('../lib/bot')

async function savePicture(picture, serial, address) {
  const base64Data = picture.replace(/^[^,]+,/, '')
  const proofs = path.resolve(__dirname, '../../db/proofs')
  await fs.ensureDir(proofs)
  const fn = [address, serial].join('_') + '.png'
  await fs.writeFile(path.resolve(proofs, fn), base64Data, {encoding: 'base64'})
}

async function getPictureAsBase64(serial, address) {
  const proofs = path.resolve(__dirname, '../../db/proofs')
  const fn = [address, serial].join('_') + '.png'
  return fs.readFile(path.resolve(proofs, fn), 'base64')
}

router.get('/ed2/', async (req, res) => {
  return res.json({
    "name": "Everdragons2",
    "description": "Everdragons2 is a collection of 10,001 dragons randomly generated from hundreds of assets. They inherit the legacy of Everdragons, minted in 2018 as the first bridgeable cross-chain non-fungible token (NFT) for gaming. In the marvelous upcoming Origins, the play-to-earn game of the Everdragons Metaverse, holders of Everdragons2 will get a Loot Box containing Obsidian (the Origins token), Settlement Plans, and Genesis Units based on rarity.",
    "image": "https://www.everdragons2.com/images/new-everdragons2logo.png",
    "external_link": "https://everdragons2.com",
    // "seller_fee_basis_points": 250,
    // "fee_recipient": "...",
    // "chains": {
    //   "ethereum": "0x3b6aad76254a79a9e256c8aed9187dea505aad52",
    //   "polygon": "0x0ece...",
    //   "bsc": "0x0ece...",
    //   // "solana": "...",
    // },
  })
})

router.get('/ed2/:id', async (req, res) => {
  let id = req.params.id

  if (id === '10001') {

    return res.json({
      name: 'Agdaroth',
      image: `https://www.everdragons2.com/dragons/png/10001.png`,
      description: 'Everdragons2 is a new generation of the Everdragons NFT, a collection born in 2018. ED were born on Ethereum, but soon became the first cross-chain NFT ever, and the first NFT deployed to Tron network.',
      // external_url: `https://everdragons2.com/dragons/agdaroth`,
      // background_color: '#def0e8'
    })
  } else {
    return res.json({
      error: 'Not found'
    })
  }

})

router.get('/ed2-test/', async (req, res) => {
  return res.json({
    "name": "Everdragons2 on Testnets",
    "description": "Everdragons2 is a collection of 10,001 dragons randomly generated from hundreds of assets. They inherit the legacy of Everdragons, minted in 2018 as the first bridgeable cross-chain non-fungible token (NFT) for gaming. In the marvelous upcoming Origins, the play-to-earn game of the Everdragons Metaverse, holders of Everdragons2 will get a Loot Box containing Obsidian (the Origins token), Settlement Plans, and Genesis Units based on rarity.",
    "image": "https://www.everdragons2.com/images/new-everdragons2logo.png",
    "external_link": "https://everdragons2.com",
    // "seller_fee_basis_points": 250,
    // "fee_recipient": "...",
    "chains": {
      "ethereum": "0x5647D16CaB593f330AcecF4c1E1029B16a692B0a",
      "polygon": "0x9F4a371bc75C6D3D1DB73bA48E8185080d84B69F",
      "bsc": "0x9F4a371bc75C6D3D1DB73bA48E8185080d84B69F",
      // "solana": "...",
    },
  })
})

router.get('/ed2-test/:id', async (req, res) => {
  let id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    id = 0
  }

  if (1 <= id && id < 100) {
    return res.json({
      name: 'Agdaroth Testnet',
      image: `https://www.everdragons2.com/dragons/png/${id}.png`,
      description: '',
      // external_url: `https://everdragons2.com/dragons/agdaroth`,
      // background_color: '#def0e8'
    })
  } else {
    return res.json({
      error: 'Not found'
    })
  }

})


module.exports = router

