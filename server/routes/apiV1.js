const express = require('express')
const router = express.Router()
const ethers = require('ethers')
// const sigUtil = require('eth-sig-util')
const db = require('../lib/Db')
// const Address = require('../../client/utils/Address')
// const path = require('path')
// const fs = require('fs-extra')
const {signPackedData, getPackedHash} = require('../lib/utils')

router.post('/verify-redeem-code/:redeemCode', async (req, res) => {
  const connectedWallet = req.get('Connected-wallet')
  const chainId = req.get('Chain-id')
  const {redeemCode} = req.params
  let redeemCodes = db.get('redeemCodes') || {}
  let codes = db.get('codes') || {}
  if (redeemCodes[redeemCode]) {
    let code = codes[redeemCodes[redeemCode]]
    if (code.status === 0) {
      res.json({
        success: false,
        error: 'Redeem code already used'
      })
    } else {
      let authCode = ethers.utils.id(redeemCode)
      let hash = await getPackedHash(chainId, connectedWallet, authCode)
      if (hash) {
        let signature = await signPackedData(hash)
        res.json({
          success: true,
          member: code.member,
          signature,
          authCode
        })
      } else {
        res.json({
          success: false,
          error: 'Cannot connect to blockchain'
        })
      }
    }
  } else {
    res.json({
      success: false,
      error: 'Redeem code not found'
    })
  }
})

router.post('/set-used-redeem-code/:redeemCode', async (req, res) => {
  const {redeemCode} = req.params
  let redeemCodes = db.get('redeemCodes') || {}
  let codes = db.get('codes') || {}
  if (redeemCodes[redeemCode]) {
    codes[redeemCodes[redeemCode]].status = 0
    db.set('codes', codes)
    res.json({
      success: true
    })
  } else {
    res.json({
      success: false
    })
  }
})

router.get('/new-code/:code/for/:member', async (req, res) => {
  const authToken = req.get('Auth-token')
  if (
    process.env.AUTH_TOKEN && // < in testing the variable will be empty
    authToken !== process.env.AUTH_TOKEN) {
    return res.json({
      error: 403,
      message: 'Forbidden'
    })
  }
  let {code, member} = req.params
  let tmp = member.split('#')
  if (/[^a-zA-Z0-9_]/g.test(tmp[0]) || !/^\d{4}$/.test(tmp[1])) {
    return res.json({
      error: 500,
      message: 'Member name should be in `nickname#0000` format'
    })
  }
  let codes = db.get('codes') || {}
  codes[code] = {
    member,
    status: 1
  }
  db.set('codes', codes)
  res.json({
    success: true
  })
})


module.exports = router

