// eslint-disable-next-line no-undef
import * as Scroll from 'react-scroll'
import queryString from 'query-string'

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

  render() {

    return (
      <Container style={{marginTop: 100, marginBottom: 120}}>
        <Row>
          <Col className={'centered'}>
            <Scroll.Element name='intro'>
              <img src={'/images/everDragons2Logo.png'} className={'ed2logo'}/>
              {/*<img src={'/images/everDragons2Logo2.png'} className={'ed2logo'}/>*/}
            </Scroll.Element>
          </Col>
        </Row>

        <Intro
          Store={this.Store}
          setStore={this.setStore}
        />

        <Story
          Store={this.Store}
          setStore={this.setStore}
        />

        <Art
          Store={this.Store}
          setStore={this.setStore}
        />

        <FAQ
          Store={this.Store}
          setStore={this.setStore}
        />

        <Roadmap
          Store={this.Store}
          setStore={this.setStore}
        />

        <Sale
          Store={this.Store}
          setStore={this.setStore}
        />

        {/*<Drops*/}
        {/*  Store={this.Store}*/}
        {/*  setStore={this.setStore}*/}
        {/*/>*/}

        <Team
          Store={this.Store}
          setStore={this.setStore}
        />

        {/*<ED*/}
        {/*  Store={this.Store}*/}
        {/*  setStore={this.setStore}*/}
        {/*/>*/}

        <Credits
          Store={this.Store}
          setStore={this.setStore}
        />


      </Container>
    )
  }
}
