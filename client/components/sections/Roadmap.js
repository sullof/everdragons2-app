// eslint-disable-next-line no-undef
import CenteredImage from './CenteredImage';

const {Container, Row, Col} = ReactBootstrap
import _ from 'lodash'
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

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
    'NFT sales of 10,001 Everdragons2',
    'Awarding of rare and special dragons with exclusive redeemable and collectible value'
  ],
  'Q1/Q2 2022': [
    'Building DeFi for staking/lending infrastructure',
    'Decentralized autonomous organization (DAO) governance setup and first Community Treasury vote',
    'In-house development for Origins game',
    'Strategic partnerships to increase the redeemable value of each NFT for digital and physical goods and services'
  ],
  'Q3/Q4 2022': [
    'Partnerships with popular games to integrate Everdragons2 as a cross-game asset',
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
      rows.push(<h4 className={'roadmapStep'} key={'key'+Math.random()}>{step}</h4>)
      for (let elem of roadmap[step]) {
        rows.push(<li className={'roadmapElem'}  key={'key'+Math.random()}>{elem}</li>)
      }
    }
    return rows
  }

  // <div className={'home-section'}>
  //   <Scroll.Element name='roadmap'><h1>Roadmap</h1></Scroll.Element>
  //   <div key={'key' + Math.random()} className={'textBlock roadmap'}>
  //     {this.roadmapList()}
  //   </div>
  // </div>

  //   <Row>
  //     <Col>
  //       <div className={'textBlock'} style={{ padding: 0 }}>
  //         <img src="/images/roadmap.png" width="100%" />
  //       </div>
  //     </Col>
  // </Row>

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
