


// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import _ from 'lodash'
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class Roadmap extends Base {

  constructor(props) {
    super(props);

    this.state = {}

    this.bindMany([
      'steps'
    ])
  }

  step(s) {
    return <div key={'key'+Math.random()} className={'textBlock'}><Markdown source={s}/></div>
  }

  steps() {
    const roadmap = [
      `### Background Story
972 EverDragons discovered a hospitable planet and established a community in the Ethereum blockchain.

A few of them, the most adventurous, crossed the ocean to reach POA Network and, later, Tron. There, 360 new dragons have been born.`,

      `### PHASE 1 — Current time

10001 EverDragons2 land on the Ethereum planet — [verify on OpenSea](https://opensea.io/collection/everdragons2)

#### 20% SOLD
Giveaway of one special EverDragons2 as a lottery among the members that minted the first 1000 EverDragons2.

#### 40% SOLD
Release of the pre-launch giveaways for the most active members of the community.

Tool release on the website to get high res images of your ED2s.

#### 60% SOLD
Restoration of the original EverDragons bridge. At the end of the sale, it will allow moving original EverDragons among different chains.

#### 80% SOLD
Super special giveaway of four adorable EverDragons cubs to four lucky couples of ED2.

#### 100% SOLD
Building of a new bridge to allow the transfer of the EverDragons2 between Ethereum and Polygon Network.

Donation of 10+ ETH to a non-profit organization safeguarding reptiles at risk of extinction.

#### 100% BONUS
Special giveaway of dragons head/avatar NFT on Polygon to every ED2 holder.`,

      `### PHASE 2
ED2 holders will have exclusive access to the Dragons' Cavern, where they can become dragons' riders and help grow the project, giving suggestions and voting for vital decisions.

Later, the ED2 will find a place in decentralized games, and more EverDragons will populate the planet. Owners of two or more EverDragons2 will mint a cub for free and mutant dragons will appear out of a sudden.

A new bridge will allow the EverDragons2 to move across Ethereum, Polygon, Solana, Cardano, Binance, and many others.
`
    ]

    const rows = []
    rows.push(this.step(roadmap[0]))
    rows.push(this.step(roadmap[1]))
    rows.push(this.step(roadmap[2]))
    return rows
  }

  render() {
    return (
      <div className={'home-section'}>
        <Scroll.Element name='roadmap'><h1>Roadmap</h1></Scroll.Element>
        {/*<div className={'textBlockCS'}>*/}
        {/*  <div className={'comingSoon'}>Coming soon...</div>*/}
        {/*</div>*/}
        {this.steps()}
      </div>
    )
  }
}
