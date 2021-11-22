// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'


const team = {
  '0': [
    {
      name: 'Francesco Sullo',
      nickname: 'Soolhoth',
      twitter: 'sullof',
      telegram: 'sullof',
      discord: 'sullof#0095',
      linkedin: 'francescosullo'
    },
    {
      name: 'Luigi Bajetti',
      nickname: 'Baayojee',
      discord: 'silmarils#0001',
      telegram: 'silmarilsSF',
      twitter: 'baiogi',
      linkedin: 'luigibajetti'
    },
    {
      name: 'Emanuele Cesena',
      nickname: 'Emhanuel',
      twitter: '0x0ece',
      telegram: 'x0ece',
      discord: '0x0ece#9167',
      linkedin: 'ecesena'
    },
    {
      name: 'Davide Di Cillo',
      nickname: 'Devideth',
      twitter: 'davidenotdavid',
      discord: 'davide#0001',
      linkedin: 'davidedicillo'
    },
    {
      name: 'Luke Kim',
      nickname: 'Yolar',
      telegram: 'LKK153',
      discord: 'LukeKK#1254',
      linkedin: 'lukekim153'
    },
    {
      nickname: 'Jormungandr',
    },
  ],
  '1': [
    {
      name: 'Patrick Rieger',
      nickname: 'Patrick',
      twitter: 'PatrickWRieger',
      telegram: 'PatrickWR',
      discord: 'PatrickWR#4682',
      linkedin: 'patrickwr'
    },
    {
      name: 'Jacqueline Hardy',
      nickname: 'Jacqueline',
      twitter: 'Jacqs_Hardy',
      telegram: 'JacquelineMH',
      discord: 'Jacqueline#1333',
      linkedin: 'jacquelinemh'
    },
    {
      name: 'Marc Scherer',
      nickname: 'Marc',
      twitter: 'sullof',
      telegram: 'MarcS502',
      discord: 'MarcS#6174\n',
      linkedin: 'marc-scherer'
    },
  ],
}

export default class Team extends Base {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.bindMany([
      'expand',
      'text',
      'teamMember'
    ])
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  text() {
    return ``
  }

  teamMember(group, index) {
    const member = team[group][index]
    return <Col xs={12} lg={4}>
      <div className={'textBlock teamMember'} style={{backgroundImage: `url(/images/team/${member.nickname}.png)`}}>
        {/*<Ab label={<img src={'/images/avatars.png'}/>}*/}
        {/*    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/206'}/>*/}

        <div className={'centered teamname'}>{member.nickname}</div>
        <div style={{height: 240}}>{' '}</div>
        <div className={'centered'}>
          {
            member.twitter ? <div className={'socialLinks'}><Ab link={'https://twitter.com/'+member.twitter} label={<i className="fab fa-twitter" />}/></div> : null
          }
          {
            member.linkedin ? <div className={'socialLinks'}><Ab link={'https://linkedin.com/in/'+member.linkedin} label={<i className="fab fa-linkedin" />}/></div> : <i className="fab fa-linkedin" style={{color: 'transparent'}}/>
          }
          {/*{*/}
          {/*  member.discord ? <div className={'socialLinks'}><Ab link={'https://discordapp.com/users/'+member.discord} label={<i className="fab fa-discord" />}/></div> : null*/}
          {/*}*/}

        </div>
      </div>
    </Col>
  }

  render() {

    return (
      <div className={'home-section'}>
        <Scroll.Element name='team'><h1>The Dragons Riders</h1></Scroll.Element>
        <Row className={'dragons-show'}>
          {this.teamMember('0', 0)}
          {this.teamMember('0', 1)}
          {this.teamMember('0', 2)}
        </Row>
        <Row className={'dragons-show'}>
          {this.teamMember('0', 3)}
          {this.teamMember('0', 4)}
          {this.teamMember('0', 5)}
        </Row>
        <div className={'centered'}><Scroll.Element><h1>The Dragons Forgers</h1></Scroll.Element></div>
        {/*<div className={'centrato'}>*/}
          <Row className={'dragons-show'}>
            {this.teamMember('1', 0)}
            {this.teamMember('1', 1)}
            {this.teamMember('1', 2)}
          </Row>
        {/*</div>*/}
      </div>
    )
  }
}
