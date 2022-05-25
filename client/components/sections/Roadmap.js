import * as Scroll from 'react-scroll'
import Base from '../Base'

const roadmap = {
  '2018': ['Invention of Everdragons, the first cross-chain non-fungible token (NFT) project'],
  'Sept. 2021': ['Announcement of Everdragons2'],
  'Oct. 2021': ['Technical development, team formation, community building'],
  'Nov 2021': [
    'Partnership with Polygon',
    'Partnership with Yayasan Komodo Survival Program'
  ],
  'Dec 2021': [
    'Announcement of crypto-metaverse and in-game use cases and partnerships (e.g. decentralized finance (DeFi), play-to-earn)',
    'Goldmine game context',
    'ARG#1 quest',
    'Integrations of Wormhole native technology for cross-chain token bridging'
  ],
  'Q1/Q2 2022': [
    'Giveaways of 350 Everdragons2 Genesis Governance tokens to the community',
    'Public sale of 250 Everdragons2 Genesis Governance tokens',
    'Reveal and airdrop of the 600 Genesis Governance tokens',
    'Release of the Everdragons2 MiniGame'
  ],
  'Q3/Q4 2022': [
    'Building Everdragons2 GameFi protocol, for staking/lending infrastructure',
    'Decentralized autonomous organization (DAO) governance setup and first Community Treasury vote',
    'Public sale of 9401 Everdragons2 Genesis tokens'
  ],
  '2023': [
    'Partnerships with popular games to integrate Everdragons2 as a cross-game asset',
    'In-house development for Origins game',
    'Launch of Origins play-to-earn crypto-metaverse game'
  ]
}

export default class Roadmap extends Base {

  constructor(props) {
    super(props);

    this.bindMany([
      'roadmapList'
    ])
  }

  roadmapList() {
    const rows = []
    for (let step in roadmap) {
      rows.push(<h4 className={'roadmapStep'} key={'key' + Math.random()}>{step}</h4>)
      for (let elem of roadmap[step]) {
        rows.push(<li className={'roadmapElem'} key={'key' + Math.random()}>{elem}</li>)
      }
    }
    return rows
  }

  render() {
    return (
      <div className={'home-section'}>
        <Scroll.Element name='roadmap'><h1>Roadmap</h1></Scroll.Element>
        <div key={'key' + Math.random()} className={'textBlock roadmap'}>
          {this.roadmapList()}
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
