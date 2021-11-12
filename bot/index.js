require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const _ = require('lodash')
const ethers = require('ethers')

const db = require('../server/lib/Db')

bot.login(process.env.DISCORD_BOT_TOKEN)

bot.on('ready', () => {

})

bot.on('message', msg => {

  executeCommand(msg)
    .then(res => {
      if (res) {
        console.info(res)
      }
    })
    .catch(console.error)
})

function fullNickname(user) {
  return user.username + '#' + user.discriminator
}

async function executeCommand(msg) {
  let content = _.trim(msg.content.replace(/<[^>]+>/g, ''))
  if (/^\/synify/.test(content)) {
    content = _.trim(content.replace(/^\/synify /, '')).split(/ +/)
    let code = content[0]
    let codes = db.get('codes')
    let redeemCodes = db.get('redeemCodes') || {}
    const {user} = msg.member
    if (codes[code]) {
      if (codes[code].member === fullNickname(user)) {
        let redeemCode = codes[code].status === 1
          // never used before
          ? ethers.utils.id('code' + Math.random()).substring(2, 20)
          // used but only to get the redeem code
          : codes[code].redeemCode
        // if not it would be false
        msg.author.send(`Hi ${user.username}, your redeem code is
${redeemCode}`)
        msg.channel.send(`Hi ${user.toString()}, please check DM`)
        codes[code].redeemCode = redeemCode
        codes[code].status = 2
        db.set('codes', codes)
        redeemCodes[redeemCode] = code
        db.set('redeemCodes', redeemCodes)
        return `${user.toString()} got the code ${redeemCode}`
      } else {
        msg.channel.send(`Hi ${user.toString()}, that code is reserved to another member`)
      }
    } else if (codes[code] === 0) {
      msg.channel.send(`Hi ${user.toString()}, that code has been already used`)
    } else {
      msg.channel.send(`Hi ${user.toString()}, code not found`)
    }
  }
}
