// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class ED extends Base {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.bindMany([
    ])
  }

  render() {
    const text = `Deployed and minted on Ethereum in July 2018, [Everdragons](https://everdragons.com)
also was the first NFT ever on Tron with a bridge that allowed users
to move their dragons from one chain to another, among Ethereum, Tron, and POA Network.
They represent a strong belief in decentralized technology and have
pushed the technical boundaries on multiple fronts.`
    return (
      <div className={'home-section'}>
      <Scroll.Element name='ed'><h1>The Everdragons original project</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <div className={'centered'}><img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/everDragonsLogo.png'} alt={' '} style={{width: '40%'}}/></div>
              <Markdown source={text}/>
            </div>
          </Col>
      </Row>
        <div className={'centered'}><Scroll.Element><h2>The Dragons Forgers</h2></Scroll.Element></div>
        <div className={'centrato'}>
          <Row className={'dragons-show'}>
            <Col xs={6} lg={4}>
              <div className={'textBlock'}>
                <Ab label={<img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/avatarp.png'}/>}
                    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/1'}/>
                <div className={'centered teamname'}>Patrick</div>
              </div>
            </Col>
            <Col xs={6} lg={4}>
              <div className={'textBlock'}>
                <Ab label={<img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/avatarj.png'}/>}
                    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/921'}/>
                <div className={'centered teamname'}>Jacqueline</div>
              </div>
            </Col>
            <Col xs={6} lg={4}>
              <div className={'textBlock'}>
                <Ab label={<img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/avatarm.png'}/>}
                    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/969'}/>
                <div className={'centered teamname'}>Marc</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
