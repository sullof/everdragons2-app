import React from 'react'
import * as Scroll from 'react-scroll'
import queryString from 'query-string'
import { Container, Row, Col } from 'react-bootstrap'

import Base from './Base'
import Intro from './sections/Intro'
import Story from './sections/Story'
import Roadmap from './sections/Roadmap'
import YourDragons from './sections/YourDragons'

// Custom Container component that handles isTop prop
const TopContainer = ({ isTop, children, ...props }) => {
  const getMarginTop = () => {
    if (!isTop) return {};
    
    // Check if we're on mobile (you can adjust this breakpoint)
    const isMobile = window.innerWidth <= 768;
    return {
      marginTop: isMobile ? 70 : 100
    };
  };

  return (
    <Container {...props} style={getMarginTop()}>
      {children}
    </Container>
  );
};

export default class Home extends Base {


  constructor(props) {
    super(props);
    const qs = queryString.parse(window.location.search)
    this.state = {
      qs
    }
  }

  componentDidMount() {
    // Removed scrollToTop to prevent automatic scrolling on page refresh
  }

  render() {

    return (
      <div>
      <TopContainer isTop={true}>
        <Row>
          <Col className={'centered'}>
            <Scroll.Element name='intro'>
              <img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/everdragons2.png'} className={'ed2logo'}/>
              {/*<img src={'/images/everDragons2Logo2.png'} className={'ed2logo'}/>*/}
            </Scroll.Element>
          </Col>
        </Row>
      </TopContainer>

      <Container>
        <Intro
          Store={this.Store}
          setStore={this.setStore}
        />
</Container>

<Container>
<YourDragons
          Store={this.Store}
          setStore={this.setStore}
        />
</Container>

<Container>
        <Story
          Store={this.Store}
          setStore={this.setStore}
        />
      </Container>
        <Container>

          <Roadmap
            Store={this.Store}
            setStore={this.setStore}
          />

        </Container>



      <div style={{height: 100}}>

      </div>
      </div>
    )
  }
}
