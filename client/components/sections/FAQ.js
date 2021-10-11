// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'

import Base from '../Base'
import Ab from '../Ab'

export default class FAQ extends Base {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.bindMany([
      'faq'
    ])
  }

  isMobile() {
    return window.innerWidth < 800
  }

  faq() {
    const faqs = [
      ['When are the new EverDragons dropping?',
        <span>The exact date is to be defined. But, it will be one day in October, at 1pm EST.<br/>
          Follow our <Ab link={'https://discord.gg/NJ8kHS4JZg'} label={'Discord'}/> to stay updated!</span>],

      ['Where will the new dragons live?',
        <span>Ethereum. However, special free drops will appears on Polygon PoS and/or other EVM-compatible chains.</span>],

      ['How much will a new EverDragon cost?',
        'Anything from 1.8 ETH when the sale starts down to 0.07 ETH after 32h. The price will drop by 10% every hour (Dutch auction). Early community members will have discounts.'],

      ['What makes a new EverDragon rare?',
        'First, the dragon\'s purity. There are 8 pure dragons, 24 dragons of the 2nd generation, 96 dragons of the 3rd generation, etc. In addition, dragons have 123 rarity attributes like jewels, fancy clothing, particular wings or tails. Finally, there are some exceptional dragons... you\'ll see :-)'],

      ['How do I buy a new EverDragon?',
        'The new EverDragons will be available for purchase directly on this website when the sale starts. You will need to have wallet like Metamask and ETH in your wallet. Then, simply connect your wallet and select the number of dragons you want to mint.'],

      ['What type of token are the new EverDragons?',
        'Each new EverDragon is an ERC-721 token. Metadata and images will be served by EverDragons2, but their consistency and immutability are guaranteed using OpenTimestamp.org (timestamps on Bitcoin).'],

      ['Any advantage for original EverDragons holders?',
        'Definitely yes. Holders of the original dragons can claim as many ED2s for free as many original EDs they hold on Ethereum, Tron, and/or POA Network. '],

      ['Where can I purchase the original EverDragons?',
        <span>The best place to go is OpenSea. Look at the <Ab link={'https://opensea.io/collection/everdragons'}
                                                               label={'EverDragons marketplace'}/> and pick them before the price skyrockets.</span>]
    ]
    let i = 0
    const rows = []

    function faqRow(faq) {
      return <Col xs={12} lg={4} key={'faq' + Math.random()}>{
        faq ? <div className={'textBlock'}>
            <div className={'faqTitle'}>{faq[0]}</div>
            <div className={'faqBody'}>{faq[1]}</div>
          </div>
          : null
      }
      </Col>
    }

    for (let i = 0; i < faqs.length; i += 3) {
      rows.push(<Row key={'faqrow' + Math.random()}>
        {faqRow(faqs[i])}
        {faqRow(faqs[i + 1])}
        {faqRow(faqs[i + 2])}
      </Row>)
    }
    return rows
  }

  render() {

    return (
      <div className={'home-section'}>
        <Scroll.Element name='faq'><h1>FAQ</h1></Scroll.Element>
        {this.faq()}
      </div>
    )
  }
}
