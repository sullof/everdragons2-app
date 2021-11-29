// eslint-disable-next-line no-undef
import CenteredImage from './CenteredImage';

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

972 Everdragons discovered a hospitable planet and established a community in the Ethereum blockchain.

A few of them, the most adventurous, crossed the ocean to reach Tron and, later, POA Network, where 360 new dragons have been born.`,

      `### Current time

On September 17th, 2021, [Agdaroth](https://opensea.io/assets/0x3b6aad76254a79a9e256c8aed9187dea505aad52/10001), a mysterious black dragon, landed on the Ethereum blockchain and laid 10000 eggs to give birth to the Everdragons2.

She is willing to give free eggs to every protector of an original Everdragons, and sell 8000 to the most excellent collectors.

#### 1000 eggs are collected
Agdaroth will give one rare dragon to three humans who welcomed the first eggs.

#### 3000 eggs are collected
She will donate more dragons to the most active members of the welcoming community of humans.

#### 5000 eggs are collected
She will airdrop special dragons to the most passionate community members.

#### 7000 eggs are collected
Agdaroth will gift four couples of Everdragons2 with an adorable, beautiful cub.

#### All the eggs are collected
A new bridge will be built to allow the Everdragons2 to cross the oceans. Then, the dragons' riders will donate 10+ ETH to a non-profit organization whose mission is to save the last dragons on Earth from extinction. The organization will send a thank you video to the community expressing their gratitude and explaining how the funds will be used.

When the eggs hatch, the dragons will be listed on Rarity Tools and other marketplaces.
Special bonus: an avatar with the dragon's head will be airdropped on Polygon Network for every Everdragons2 to all the holders.

Finally, the Dragons' Cavern will open its doors.
An exclusive club where Everdragons2 holders can become dragons' riders. They will grow the project with the initial riders, vote for vital decisions, and suggest new directions, including games and battles between the most formidable dragons.

#### Going towards the future
More Everdragons will populate the planet. Holders of two or more Everdragons2 will have babies for free, mutant dragons will show up, and formidable new species will appear out of a sudden.

`
    ]

    const rows = []
    rows.push(this.step(roadmap[0]))
    rows.push(this.step(roadmap[1]))
    return rows
  }

  render() {
    return (
      <div className={'home-section'}>
        <Scroll.Element name='roadmap'><h1>Roadmap</h1></Scroll.Element>
        {/*{this.steps()}*/}
        <div key={'key'+Math.random()} className={'textBlock roadmap'}>
          <h2>The journey of the dragon</h2>
          <div style={{fontStyle: 'italic'}}>In 2018, 972 Everdragons discovered a hospitable planet and established a community in the Ethereum blockchain. A few of them, the most adventurous, crossed the ocean to reach POA Network and, later, Tron. In the new lands, 360 new dragons have been born.</div>

          <h3 style={{paddingTop: 24}}>Current time</h3>

          <div>On September 17th, 2021, <Ab label={'Agdaroth'} link={'https://opensea.io/assets/0x3b6aad76254a79a9e256c8aed9187dea505aad52/10001'}/>, a mysterious black dragon, landed on the Ethereum blockchain and laid 10000 eggs to give birth to the Everdragons2.</div>
          <CenteredImage top={12} bottom={12}
                         src={'/images/agdaroth-small.png'}
          />
          <div>She is willing to give free eggs to every protector of an original Everdragons, and sell 8000 to the most excellent collectors.</div>

          <h4>Before starting the drop</h4>
          <li>500 members of the <Ab link={'https://discord.gg/AzfFnUjrnG'} label={'community'}/> who will invite three new members first will skip two steps in the Dutch auction, i.e., have a ~20% discount to mint an egg.</li>
          <li>The dragons' riders (EDD) will donate 1 ETH to the <Ab link={'https://komododragon.org'} label={'Komodo Survival Program'}/>, an organization for the safeguard of the endangered Komodo dragon. </li>

          <h4>When 1000 eggs are collected</h4>
          <li>Agdaroth will give one rare dragon to three humans among the 1000 who welcomed the first eggs.</li>

          <h4>When 3000 eggs are collected</h4>
          <li>The EDD will donate 3 more ETH to the Komodo Survival Program.</li>
          <li>Agdaroth will giveaway one more dragon to the ten most active members of the welcoming community of humans.</li>

          <h4>When 5000 eggs are collected</h4>
          <li>Agdaroth will airdrop a unique, rainbow dragon to a lucky, passionate community member.</li>

          <h4>When 7000 eggs are collected</h4>
          <li>The EDD will add other 3 ETH to the donation to the Komodo Survival Program.</li>
          <li>Agdaroth will gift four couples of Everdragons2 with an adorable, beautiful baby dragon.</li>

          <h4>When all the eggs are collected</h4>
          <li>A new bridge will be built to allow the Everdragons2 to cross the oceans.</li>
          <li>The EDD will give 3 more ETH to the Komodo Survival Program, who will send a thank you video to the community explaining how the funds will be used.</li>

          <h4>When the eggs hatch</h4>
          <li>The dragons will be revealed</li>
          <li>The dragons will be listed on Rarity Tools and other marketplaces.</li>
          <li>The lucky owner of Komodo will win a trip for two to Komodo Island and there will participate in a one-in-a-life mission with the Komodo Survival Program.</li>

          <h4>Special bonus</h4>
          <li>An avatar with the dragon's head will be airdropped on Polygon Network for every Everdragons2 to all the holders.</li>
          <li>Wonder what will it happen to the eggs...</li>

          <h4>Finally, the <span className={'bold'}>Dragons' Cavern</span> will open its doors</h4>
          <li>An exclusive club where Everdragons2 holders can become dragons' riders. They will grow the project with the initial riders, vote for vital decisions, and suggest new directions, including games and battles between the most formidable dragons.</li>

          <h3 style={{paddingTop: 24}}>Going towards the future</h3>
          <div>More Everdragons will populate the planet. Holders of two or more Everdragons2 may have babies, mutant dragons will show up, and formidable new species will appear out of a sudden.</div>
          <div>The ED2 DAO will start its activity and decide next steps. The 20% of the sale will go in the DAO treasury, but more money will come from the secondary market. Synthetic tokens will allow holders to play games without risks of losing their dragons. And a lot more...</div>
        </div>
      </div>
    )
  }
}


const a = {
  "cross_chain_twin_contracts": {
    "matic": "0x5303242fd38e7e092f7812f6b975935c0ef96822",
    "solana": "4eaHsFPPPv29j6oVFxEtBY9r79bid5qC4FevEF6c8z1T"
  }
}
