const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const db = require('../lib/Db')
const Address = require('../utils/Address')
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

router.get('/tokens', async (req, res) => {
  let {forceReload, chainId} = req.query
  chainId = parseInt(chainId)
  if (!cachedOwners[chainId] || forceReload || Date.now() - lastCachedAt[chainId] > 300000) {
    cachedOwners[chainId] = {}
  }
  let tokens = db.get('claimed') || {}
  // const contract = getContract(chainId)
  // if (contract) {
  //   for (let id in tokens) {
  //     let token = tokens[id]
  //     if (cachedOwners[chainId][id]) {
  //       token.owner = cachedOwners[chainId][id]
  //     } else {
  //       try {
  //         let owner = await contract.ownerOf(id)
  //         cachedOwners[chainId][id] = token.owner = owner
  //         lastCachedAt[chainId] = Date.now()
  //       } catch (e) {
  //         delete token.owner
  //         // console.error(e.message)
  //       }
  //     }
  //   }
  // }
  res.json({
    success: true,
    tokens
  })
})



module.exports = router

