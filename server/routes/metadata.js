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


router.get('/ed2/:id', async (req, res) => {
  let id = req.params.id

  if (id === '10001') {

    return res.json({
      name: 'Agdaroth',
      image: `https://everdragons2.com/dragons/png/10001.png`,
      description: 'EverDragons2 is a new generation of the EverDragons NFT, a collection born in 2018. ED were born on Ethereum, but soon became the first cross-chain NFT ever, and the first NFT deployed to Tron network.',
      // external_url: `https://everdragons2.com/dragons/10001`,
      // background_color: '#def0e8'
    })
  } else {
    return res.json({
      error: 'Not found'
    })
  }

})



module.exports = router

