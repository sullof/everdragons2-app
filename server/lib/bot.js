const Discord = require('discord.js')
const bot = new Discord.Client()
const requireOrMock = require('require-or-mock')

const env = requireOrMock('../../env.json', {
  token: 'sasdadad'
})

if (env.token.length > 50) {

  bot.login(env.token)

  bot.on('ready', () => {

  })

  bot.on('message', msg => {

    // executeCommand(msg)
  })

// async function executeCommand(msg) {
//
//   let content = _.trim(msg.content.replace(/<[^>]+>/g, ''))s
//
//   if (/^\/everdragons2/.test(content)) {
//
//     content = _.trim(content.replace(/^\/everdragons2 /, '')).split(/ +/)
//
//     let message = 'Whoops. Try `/everdragons2 help`'
//
//     if (content[0] === 'help') {
//       message = `Examples:
//   /everdragons2 claims       (gives info about pending claims)
// `
//     } else if (content[0] === 'claims') {
//
//       console.info(message)
//       msg.channel.send(message)
//     }
//
//   }
// }

  bot.sendMessage = message => {
    bot.channels.cache.get('825085825116930059').send(message)
  }
}


module.exports = bot
