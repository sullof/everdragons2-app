// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

import Base from './Base'

export default class LandingPage extends Base {

  render() {

    return (
      <Container style={{marginTop: 100}}>
        <Row>
          <Col className={'centered'}>
            <img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/everDragonsLogo.png'} className={'bigLogo'}/>
          </Col>
        </Row>
        <Row>
          <Col className={'centered'}>
            <div className={'hina'} style={{fontSize: '3rem'}}>Coming soon...</div>
          </Col>
        </Row>

      </Container>
    )
  }
}
