
const config = {
  supportedId: {
    1337: 'Local EVM',
    1: 'Ethereum',
    3: 'Ropsten'
  },
  address: require('./deployed.json'),
  abi: require('./ABIs.json').contracts
}

module.exports = config
