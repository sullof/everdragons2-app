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
      expanded: {}
    }

    this.bindMany([
      'faq'
    ])
  }

  isMobile() {
    return window.innerWidth < 800
  }

  faq() {
    const {expanded} = this.state
    const faqs = [
      ['When are the new EverDragons dropping?',
        <span>The exact date is to be defined. But, it will most likely be around December 14th, at 1pm EST.<br/>
          Follow our <Ab link={'https://discord.gg/NJ8kHS4JZg'} label={'Discord'}/> to stay updated!</span>],

      ['Where will the new dragons live?',
        <span>Maybe Ethereum. But it could be Polygon, due to the high gas costs on Ethereum.
          Anyway, special free drops will follow on Polygon PoS.</span>],

      ['How much will a new EverDragon cost?',
        <span>Anything from 1.8 ETH when the sale starts down to 0.07 ETH after 32h. The price will drop by 10% every hour (Dutch auction). Early community members will have discounts.</span>],

      ['What makes a new EverDragon rare?',
        <span>First, the dragon's purity. There are 8 pure dragons, 24 dragons of the 2nd generation, 96 dragons of the 3rd generation, etc. In addition, dragons have 123 rarity attributes like jewels, fancy clothing, particular wings or tails. The also have auras and background skies. Finally, there are some exceptional dragons... you\'ll see :-)</span>],

      ['How do I buy a new EverDragon?',
        <span>The new EverDragons will be available for purchase directly on this website when the sale starts. You will need to have wallet like Metamask and ETH in your wallet. Then, simply connect your wallet and select the number of dragons you want to mint.</span>],

      ['What type of token are the new EverDragons?',
        <span>Each new EverDragon is an ERC-721 token. Metadata and images will be served by EverDragons2, but their consistency and immutability are guaranteed using OpenTimestamp.org (timestamps on Bitcoin).</span>],

      ['Any advantage for original EverDragons holders?',
        <span>Definitely yes. Holders of the original dragons can claim as many ED2s for free as many original EDs they hold on Ethereum, Tron, and/or POA Network.</span>],

      ['Where can I purchase the original EverDragons?',
        <span>The best place to go is OpenSea. Look at the <Ab link={'https://opensea.io/collection/everdragons'}
                                                               label={'EverDragons marketplace'}/> and pick them before the price skyrockets.</span>]
    ]
    let i = 0
    const rows = []

    const faqRow = faq => {

      const onClick = faq ? (key => value => {
        const expanded = {}
        expanded[key] = value
        this.setState({expanded})
      })(faq[0]) : new Function

      return <Col xs={12} lg={4} key={'faq' + Math.random()}>{
        faq ? <div className={'textBlock smallBlock'}>
            <div className={'faqTitle'}
                 onClick={() => onClick(!expanded[faq[0]])}
            >
              <div className={'floatRight'}>
                {
                  expanded[faq[0]]
                    ? <i className="fas fa-caret-up"
                         // onClick={() => onClick(false)}
                    />
                    : <i className="fas fa-caret-down"
                         // onClick={() => onClick(true)}
                    />
                }
              </div>

              {faq[0]}</div>
            {
              expanded[faq[0]]
                ? <div className={'faqBody'}>{faq[1]}</div>
                : null
            }
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
