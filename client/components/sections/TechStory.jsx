// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class TechStory extends Base {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.bindMany([
      'expand'
    ])
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const short = `We're a group of friends and "crypto archeologists". Digging into the early history of Ethereum NFTs we discovered the Everdragons, minted in June 2018.

We want to revive the project because we believe it has a profound historical importance, and to finance the operation we're issuing a new set of 10,000 collectible Everdragons.
`
    const long1 = `### The Original Everdragons

The Everdragons are a fascinating piece of technology. They are the first example of cross-chain NFTs, the first NFTs on Tron (minted in December 2018) and among the first to introduce games with NFTs. Plus, they're really cool -- they're dragons!

They are a form of generative art and they were minted uniformly at random. They weren't issued with a focus on being collectibles, but as tokens to participate in games and to explore the capabilities of different blockchains.

For example, dragons could join a "race" (on Ethereum) by betting on the price of different cryptocurrencies (e.g., BTC vs ETH vs...); after one hour a coinmarket cap oracle would check the difference in price of every coin, and the winning dragon would collect a price. This is an early example of a prediction market you could play by owning a NFT, back in 2018!

And there's more. As Ethereum is relatively slow and can get rather expensive, it's not suited for faster on-chain applications. This is where cross-chain NFTs come in. An Everdragon could be moved to a different chain to participate in different games. For example you could move your dragon to the Tron chain and play four in a row, in real time. Or Goldmine, the game that in the first week of January 2019 had more transactions than all the other games on Tron combined.

In summary, the Everdragons were a one of a kind NFT, not focused on being collectibles but designed to explore blockchain capabilities through games. Unfortunately, with 2019 crypto winter the project phased out and the team moved on to different works.
`
    const long2 = `### Discovery and Restoration

Discovering the Everdragons has been one surprise after another. We knew they were this mystical NFT that could be moved cross chain but that was more or less about it. On Opensea the dragons didn't even have an image anymore, the proxy for moving them cross-chain was down and the community practically dead.

As we dug into the original design, learned the structure of the dragons' DNA and worked with the original team to restore the images, we started to appreciate the quality and the hard work that went into making the Everdragons.

In recent years, the explosion of NFTs has taught us how people think about collectibles on the blockchain, what they want to see, to own, total numbers, rarity attributes, etc. We think that all elements that make for a great collectible were in the Everdragons since the beginning, they simply weren't highlighted.

By rethinking the Everdragons as collectibles we thought there's an opportunity to both help the community rediscover this early piece of blockchain history, and the original team to finance new exciting projects. We then started reverse engineering the Everdragons to find special attributes that we could turn into rare and collectibles.
`
    const long3 =`
### The Everdragons2

The result is Everdragons2, a set of 10,000 NFTs on the Ethereum blockchain, with 8 pure or 1st generation dragons from the four elements of Fire, Air, Water and Earth, 24 dragons of 2nd generation, 96 of 3rd generation. Everdragons2 have 3 gender pronouns (he/him, she/her, they/them), uniformly distributed. There are 30 rarity attributes from golden chains or boots to fire or hammer on their tail. Finally they have 8 background colors to make them visually distinct from the original Everdragons, while you of course, as an owner, will be able to get your dragon on transparent background, in vector format, full body or just face as an avatar.

We want to stress that all these elements (except the background) were present in the original Everdragons, we're using the same exact original building block images and DNA crossing algorithm, we're simply forcing the most visually recognizable elements to be rare so we can make them collectibles and use the funds to restore the cross-chain proxy, the games and carry on with new development.

To the best of our knowledge this is the first time a new team tries to revive a dormant NFT project. We're working closely with the original team and we're taking all precautions to preserve the integrity of the original project.

Our final goal, were Everdragons2 be successful, is to merge it with the original Everdragons and continue to grow them as one, by also maintaining a clear distinction on what was minted in 2018 vs 2021.
`
    return (
      <div className={'home-section'}>
        <Scroll.Element name='techstory'><h1>Technical Story</h1></Scroll.Element>
        <Row>
          <Col>
            <div className={'textBlock ' + (
              this.state.expanded ? 'smaller' : ''
            )}>
              {
                !this.state.expanded ? <Markdown source={short}/> :
                  <div>
                    <Markdown source={short}/>
                    <img src={'/images/00265.png'} alt={''} style={{width:'30%', paddingRight: 24}} className={'floatLeft'}/>
                    <Markdown source={long1}/>
                    <div style={{height: 24, clear: 'both'}}/>
                    <img src={'/images/00269.png'} alt={''} style={{width:'30%'}} className={'floatRight'}/>
                    <Markdown source={long2}/>
                    <div style={{height: 24, clear: 'both'}}/>
                    <Markdown source={long3}/>
                  </div>
              }

              <div style={{marginTop: 12}}>
                <Scroll.Link
                  offset={-80}
                  spy={true} smooth={true} to='techstory'><b onClick={this.expand}>[ {
                  this.state.expanded
                    ? 'Show less' : 'Show more'
                } ]</b></Scroll.Link>

              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
