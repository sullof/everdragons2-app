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
Many NFT drops experience gas war that produces network congestion and causes problems to the community. To solve this and other issues, EverDragons2 will use a Dutch Auction.

The sale will start at an inflated price, decreasing by 10% every hour, reaching a floor after 32h. People will start buying when they believe that the price is fair, most likely, close to the floor. Since what is reasonable for anyone depends on many factors, the request will distribute naturally among the 32 hours.

The alternative is a fixed price and a whitelist. Many projects applied this solution naively, making the check only in the web app, allowing people to interact directly with the contract, bypassing the control. Since the only way to whitelist users securely is to set the logic in the smart contract, the consequence of this approach is a higher gas consumption that defeats the goal.

Depending on many factors, the time required for the auction to reach the floor price could be shorter or longer.
`

    return (
      <div className={'home-section'}>
      <Scroll.Element name='sale'><h1>The Sale</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <Markdown source={text}/>
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
