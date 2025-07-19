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
      ['When are the Everdragons2 Genesis tokens dropping?',
        <span>184 genesis tokens have been sold in April. The remaining genesis tokens (won during the Goldmine contest, the ARG, etc.) will be airdropped on the same contract on May 26th.<br/>
          Follow our <Ab link={'https://discord.gg/NJ8kHS4JZg'} label={'Discord'}/> to stay updated!</span>],

      ['Where will the new dragons live?',
        <span>Polygon Proof-of-Stake (ex-MATIC Network).</span>],

      ['How much will a Everdragon2 Governance Genesis Token cost?',
        <span>100 Matic.</span>],

      ['What makes an Everdragons2 rare?',
        <span>There are two types of Everdragons2 tokens: Governance Genesis Tokens (600 items) and Genesis Tokens (9401).
          Considering both, there are 8 pure dragons, 24 dragons of the 2nd generation, 96 dragons of the 3rd generation, etc. In addition, dragons have 123 rarity attributes like jewels, fancy clothing, particular wings or tails. The also have auras and background skies. Finally, in the Genesis tokens, there are some exceptional dragons... you'll see 🙂</span>],

      ['How do I buy Everdragons2?',
        <span>
          The best place to buy Everdragons2 Genesis tokens is OpenSea. Look at the <Ab link={'https://opensea.io/collection/everdragons2-genesis-token'} label={'Everdragons marketplace'}/> and pick them before the price skyrockets.<br/>
          The future 9401 Everdragons2 will be available for purchase directly on this website when the sale starts. You will need to have a wallet like Metamask, connect to the Polygon network and select the number of dragons you want to mint.</span>],

      ['What type of token are the Everdragons2?',
        <span>Each Everdragons2 is an ERC-721 token. Metadata and images will be served by Everdragons2, but their consistency and immutability are guaranteed (read <Ab label={'this blog post'} link={'https://medium.com/ndujalabs/everdragons2-fair-tokens-distribution-9c6f77c748f6'}/> for more details).</span>],

      ['Any advantage for original Everdragons holders?',
        <span>During the final sale of the 9401 Genesis Tokens, holders of the original dragons can claim as many Everdragons2 Genesis tokens as they hold in the form of original Everdragons in Ethereum, Tron, and/or POA Network.</span>]
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
