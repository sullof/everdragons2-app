// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class Sale extends Base {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.bindMany([
    ])
  }

  render() {
    const text = `
Everdragons2 will use a Dutch Auction.

This will avoid gas war and a fair distribution for the community.

The sale will start at an inflated price, decreasing by 10% every hour, reaching a floor after 32h.

The sale will happen some day to be defined around December 15th.
`

    return (
      <div className={'home-section'}>
      <Scroll.Element name='sale'><h1>Blog posts</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock smallBlock'}>
              <Ab link={'https://hackernoon.com/rediscovering-the-everdragons-the-first-cross-chain-nfts'} label={'Rediscovering the Everdragons, the First Cross-Chain NFTs'}/>
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
