import * as Scroll from 'react-scroll'
import Base from '../Base'

const roadmap = [
  '2018', ['Invention of Everdragons, the first cross-chain non-fungible token (NFT) project'],
  'Sept. 2021', ['Announcement of EverDragons2'],
  'Oct. 2021', ['Technical development, team formation, community building'],
  'Nov 2021', [
    'Partnership with Polygon',
    'Partnership with Yayasan Komodo Survival Program'
  ],
  'Dec 2021', [
    'Announcement of crypto-metaverse and in-game use cases and partnerships (e.g. decentralized finance (DeFi), play-to-earn)',
    'Goldmine game context',
    'ARG#1 quest'
  ],
  'Q1/Q2 2022', [
    'Giveaways of 350 EverDragons2 Genesis Governance tokens to the community',
    'Public sale of 250 EverDragons2 Genesis Governance tokens',
    'Reveal and airdrop of the 600 Genesis Governance tokens'
  ],
  '2022-2025', [
    'Everything changed. No more Origins game, no more EverDragons2 MiniGame. The bearish market ate everything.'
  ],
  'April 2025', [
    'Reunion of the EverDragons2 on Ethereum'
  ],
  'current', [
    'Restarting the project with a new vision.',
    'Distributing the not-yet-minted '
  ]
]

export default class Roadmap extends Base {

  constructor(props) {
    super(props);

    this.bindMany([
      'roadmapList'
    ])
  }

  roadmapList() {
    const rows = []
    for (let i=0;i<roadmap.length; i+=2) {
      rows.push(<h4 className={'roadmapStep'} key={'key' + Math.random()}>{roadmap[i]}</h4>)
      for (let elem of roadmap[i + 1]) {
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
