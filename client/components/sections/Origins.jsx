// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'

import Base from '../Base'

export default class Story extends Base {

  render() {
    return (
      <div className={'home-section'}>
        <Scroll.Element name='origins'><h1 style={{ paddingBottom: 0 }}>Origins</h1></Scroll.Element>
        <div style={{ textAlign: 'center' }}>
          <img src="/images/obsidian.png" style={{ maxHeight: 200, marginBottom: 16 }} />
        </div>
        <Row>
            <Col>
              <div className={'textBlock'}>
                <Markdown source={`
                  Origins is an upcoming play-to-earn game where you fly into the crypto-metaverse on your dragon NFT!

                  Based on the rarity and strength of your Everdragons2 NFT, you get a Loot Box to start. Obsidian is the in-game currency and native token of Origins.

                  Create alliances and become a Dragon Knight to win Obsidian in battle! Stay tuned...
                `}/>
              </div>
            </Col>
        </Row>
      </div>
    )
  }
}
