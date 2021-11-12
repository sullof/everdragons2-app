const ethers = require('ethers')
const {Contract} = require('@ethersproject/contracts')
const config = require('../../client/config')

// cache:
const contracts = {}

const utils = {

  sleep: async millis => {
    // eslint-disable-next-line no-undef
    return new Promise(resolve => setTimeout(resolve, millis))
  },

  getContract(chainId, contractName) {
    chainId = chainId.toString()
    if (config.supportedId[chainId]) {
      if (!contracts[chainId]) {
        contracts[chainId] = {}
      }
      if (!contracts[chainId][contractName]) {
        let provider
        if (chainId === '1337') {
          provider = new ethers.providers.JsonRpcProvider()
        } else {
          provider = new ethers.providers.InfuraProvider(chainId === '3' ? 'ropsten': 'homestead', process.env.INFURA_API_KEY)
        }
        contracts[chainId][contractName] = new Contract(config.address[chainId][contractName], config.abi[contractName], provider)
      }
      return contracts[chainId][contractName]
    }
    return false
  },

  async signPackedData(hash, privateKey = process.env.VALIDATOR_PRIVATE_KEY) {
    const signingKey = new ethers.utils.SigningKey(privateKey)
    const signedDigest = signingKey.signDigest(hash)
    return ethers.utils.joinSignature(signedDigest)
  },

  async getPackedHash(chainId, address, authCode) {
    const synNft = utils.getContract(chainId, 'SynNFT')
    const synFactory = utils.getContract(chainId, 'SynNFTFactory')
    if (synNft && synFactory) {
      return await synFactory['encodeForSignature(address,address,bytes32)'](address, synNft.address, authCode)
    } else {
      return false
    }
  }
}

module.exports = utils
