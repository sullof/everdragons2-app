// eslint-disable-next-line no-undef
import * as Scroll from 'react-scroll'
import queryString from 'query-string'
import web3 from 'web3';

const {Container, Row, Col} = ReactBootstrap

import Base from './Base'
import Intro from './sections/Intro'
import Story from './sections/Story'
import Team from './sections/Team'
import Art from './sections/Art'
import Drops from './sections/Drops'
import FAQ from './sections/FAQ'
import Roadmap from './sections/Roadmap'
import Sale from './sections/Sale'
import TechStory from './sections/TechStory'
import ED from './sections/ED'
import Credits from './sections/Credits'
import Origins from './sections/Origins'
import {utils} from 'ethers';

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
  { name: 'salt', type: 'bytes32' },
];

function domainType(domain) {
  return EIP712Domain.filter(({ name }) => domain[name] !== undefined);
}

export default class Home extends Base {


  constructor(props) {
    super(props);
    const qs = queryString.parse(window.location.search)
    this.state = {
      qs
    }
  }

  componentDidMount() {
    Scroll.animateScroll.scrollToTop()
  }

  async getSignature(signer) {

    let domain = {
      name: "Cruna",
      version: "1",
      chainId: 31337,
      verifyingContract: "0x0E801D84Fa97b50751Dbf25036d067dCf18858bF",
    };

    const message = {
      to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      contents: 'very interesting',
    };

    const data = {
      types: {
        EIP712Domain: domainType(domain),
        Mail: [
          { name: 'to', type: 'address' },
          { name: 'contents', type: 'string' },
        ],
      },
      domain,
      primaryType: 'Mail',
      message
    };
    const msgParams = JSON.stringify(data);

      const params = [signer, msgParams]
      const method = 'eth_signTypedData_v4'

      const signature = await window.ethereum.request({
        method,
        params,
        from: signer,
      })
      console.log(signature)
      // return {msgParams, signature}
    }


  render() {

    const signer = this.Store.signedInAddress;

    return (
      <div>
      <Container style={{marginTop: 100}}>
        <Row>
          <Col className={'centered'}>
            <Scroll.Element name='intro'>
              <img src={'/images/new-everdragons2logo.png'} className={'ed2logo'}/>
              {/*<img src={'/images/everDragons2Logo2.png'} className={'ed2logo'}/>*/}
            </Scroll.Element>
            <button onClick={() => this.getSignature(signer)}>Click</button>
          </Col>
        </Row>
      </Container>

      <div className="bg0">
      <Container>
        <Intro
          Store={this.Store}
          setStore={this.setStore}
        />

        <Story
          Store={this.Store}
          setStore={this.setStore}
        />
      </Container>
      </div>

      <div className="bg1">
      <Container>
        {/*<Art*/}
        {/*  Store={this.Store}*/}
        {/*  setStore={this.setStore}*/}
        {/*/>*/}

        <Roadmap
          Store={this.Store}
          setStore={this.setStore}
        />

        {/*<Sale*/}
        {/*  Store={this.Store}*/}
        {/*  setStore={this.setStore}*/}
        {/*/>*/}
      </Container>
      </div>

      <div className="bg2">
      <Container>

        <FAQ
          Store={this.Store}
          setStore={this.setStore}
        />

        <Origins
          Store={this.Store}
          setStore={this.setStore}
        />

        <Team
          Store={this.Store}
          setStore={this.setStore}
        />

        <div style={{height: 24}}>{' '}</div>

        {/*<Drops*/}
        {/*  Store={this.Store}*/}
        {/*  setStore={this.setStore}*/}
        {/*/>*/}
      </Container>
      </div>

      <div className="bg3">
      <Container style={{marginBottom: 50}}>

        {/*<ED*/}
        {/*  Store={this.Store}*/}
        {/*  setStore={this.setStore}*/}
        {/*/>*/}

        <Credits
          Store={this.Store}
          setStore={this.setStore}
        />
      </Container>
      </div>
      </div>
    )
  }
}
