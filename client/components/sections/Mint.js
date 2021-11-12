// eslint-disable-next-line no-undef
const {InputGroup, FormControl, Row, Col, Button} = ReactBootstrap

import Base from '../Base'
import Loading from '../utils/Loading'
import Ab from '../utils/Ab'

export default class Mint extends Base {

  constructor(props) {
    super(props)

    this.state = {
      redeemCode: '',
      errors: {}
    }

    this.bindMany([
      'handleChange',
      'handleBlur',
      'verifyRedeemCode',
      'mintYourToken'
    ])

  }

  handleChange(event) {
    const redeemCode = event.target.value
    this.setState({
      redeemCode,
      errors: {},
      redeemCodeIsValid: /^[0-9a-f]{18}$/.test(redeemCode)
    })
  }

  handleBlur(event) {
    const {redeemCode} = this.state
    if (!/^[0-9a-f]{18}$/.test(redeemCode)) {
      this.setState({
        errors: {redeemCode: 'Wrong format'},
        redeemCodeIsValid: false
      })
    } else {
      this.setState({
        errors: {},
        redeemCodeIsValid: true
      })
    }
  }

  async verifyRedeemCode() {
    const {redeemCode, redeemCodeIsValid} = this.state
    if (redeemCodeIsValid) {
      const res = await this.request('verify-redeem-code/' + redeemCode, 'post')
      if (res.success) {
        const {authCode, signature, member} = res
        this.setState({
          redeemCodeIsVerified: true,
          authCode,
          signature,
          member
        })
      } else {
        this.setState({
          errors: {redeemCode: res.error}
        })
      }
    } else {
      this.setState({
        error: ''
      })
    }
  }

  decodeError(message) {
    let i = 0
    return this.decodeMetamaskError(message).map(e => {
      return <div key={'key' + i++}>{e}</div>
    })
  }

  decodeMetamaskError(message) {
    try {
      if (/denied transaction signature/.test(message)) {
        return ['You denied transaction signature :-(']
      }
      let tmp = message.split('{"code":')[1].split(',')
      // let code = tmp[0]
      let res = tmp[1].split('"message":"')[1].split('"')[0].split(/: */)
      let reason = res.slice(1).join(': ')
      reason = reason.substring(0, 1).toUpperCase() + reason.substring(1)
      return [res[0] + '.', reason]
    } catch (e) {
      return ['VM Exception while processing transaction :-(']
    }
  }

  async mintYourToken() {
    this.setState({
      error: undefined
    })
    if (this.Store.connectedNetwork) {
      const {signature, authCode, redeemCode} = this.state
      const {SynNFTFactory, SynNFT} = this.Store.contracts
      if (SynNFTFactory && authCode && signature) {
        try {
          this.setState({
            minting: true
          })
          const transaction = await SynNFTFactory.connect(this.Store.signer).claimAFreeToken(SynNFT.address, authCode, signature, {
            gasLimit: 222222
          })
          await transaction.wait()
          const balanceOf = await SynNFT.balanceOf(this.Store.connectedWallet)
          if (balanceOf > 0) {
            this.request('set-used-redeem-code/' + redeemCode, 'post')
            this.setState({
              congratulations: true,
              minting: false
            })
          } else {
            this.setState({
              error: 'It looks like something went wrong'
            })
          }
        } catch (e) {
          console.error(JSON.stringify(e, null, 2))
          this.setState({
            error: this.decodeError(e.message),
            minting: false
          })
        }
      }
    } else {
      alert('You must be connected to Ethereum Mainnet')
    }
  }

  render() {
    return (
      <div className={'home-section'}>
        <h3 className={'centered crimson'}>Welcome to the Syn NFT pre-minting page</h3>
        <Row>
          <Col>
            <div className={'textBlock'}>{
              this.Store.connectedNetwork
                ? <div>
                  <div className={'label'}>{
                    this.state.congratulations
                      ? <div>
                        <h2>Hi <b>{this.state.member}</b>, congratulations!</h2>
                        <h2>You got a fantastic SynCity Blueprint NFT</h2>
                        <div className={'centered'}>Check it on <Ab label={'Etherscan'} link={`https://${this.Store.chainId === 3 ? 'ropsten.' : ''}etherscan.io/address/${this.Store.connectedWallet}#tokentxnsErc721`}/></div>
                      </div>
                      : this.state.member
                        ? (
                          this.state.minting
                            ? <span>Hi <b>{this.state.member}</b>, you are minting your SynCity Blueprint NFT...</span>
                            : <span>Hi <b>{this.state.member}</b>, you are ready to mint your SynCity Blueprint NFT</span>
                        )
                        : 'Please, past the redeem code that the Synner bot DM-ed you'
                  }</div>
                  {
                    this.state.congratulations
                      ? null
                      : this.state.redeemCodeIsVerified
                        ? <div>
                          {
                            this.state.minting ? <Loading
                                variant={'light'}
                              />
                              : <Button size={'lg'}
                                        onClick={this.mintYourToken}>Mint your token!</Button>
                          }
                          {
                            this.state.error
                              ? <div className={'error digit'}>{this.state.error}</div>
                              : null
                          }
                        </div>

                        : <div><InputGroup className="mb-3" size={'lg'}>
                          <InputGroup.Text id="basic-addon3">
                            Redeem code
                          </InputGroup.Text>
                          <FormControl id="basic-url" aria-describedby="basic-addon3"
                                       name={'redeemCode'}
                                       value={this.state.redeemCode}
                                       onChange={this.handleChange}
                                       onBlur={this.handleBlur}
                          />
                          {this.state.errors.redeemCode && (
                            <div className="input-error">{this.state.errors.redeemCode}
                            </div>
                          )}
                        </InputGroup>
                          <Button size={'lg'}
                                  disabled={!this.state.redeemCodeIsValid}
                                  onClick={this.verifyRedeemCode}>Verify your code!</Button>
                        </div>
                  }
                </div>
                : <div>
                  <h2>Please connect your wallet to the Ropsten testnet.</h2>
                </div>

            }</div>
          </Col>
        </Row>
      </div>
    )
  }
}
