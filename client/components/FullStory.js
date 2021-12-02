// eslint-disable-next-line no-undef
import CenteredImage from './sections/CenteredImage';

const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from './Base'
import Ab from './Ab'

export default class FullStory extends Base {

  componentDidMount() {
    Scroll.animateScroll.scrollToTop()
  }

  render() {
    const short = `
### 2018

They’d been traveling alone for hundreds of years through deep space when they finally saw signs of life. A planet with only ten thousand humanoids, and kittens growing uncontrolled.

The [Everdragons](https://everdragons.com) landed in June 2018. A group of one thousand explorers settled on the northern part of the planet to recover from the strenuous voyage. Or so they hoped. An even bigger catastrophe was about to threaten their existence. Crypto winter was coming.

`
    const long0 = `### 2018

They’d been traveling alone for hundreds of years through deep space when they finally saw signs of life. A planet with only ten thousand humanoids, and kittens growing uncontrolled.

The Everdragons landed in June 2018. A group of one thousand explorers settled on the northern part of the planet to recover from the strenuous voyage. Or so they hoped. An even bigger catastrophe was about to threaten their existence. Crypto winter was coming.
`
    const long1 = `
It didn't take long for the dragons to get used to a new lifestyle on this rich planet. When temperatures started to drop, the youngest dragons were simply too spoiled with feasts and engaged in battles to notice, and soon they started to fall into a deep slumber that could last forever.

The elders saw what was happening and regrouped to call for help from home. The communication systems on this new planet were simply too slow, but thankfully the dragons summoned the strongest dragon from the Fire family to embark on the mission. The dragon flew into the Tron portal. But soon after, exhausted, even the last dragon that remained closed his eyes.
`
    const long2 = `
### Back Home

For the first time in history, an explorer came back to the home planet. The purest nobles from the family of Fire were rapidly summoned to hear their report: a liveable planet was found, and less than two years away... It was time for a long-deserved new beginning.

The Everdragons had been inhabiting their home planet for almost fifty thousand years. In the beginning it was war to gain supremacy against other species, then it was war amongst families for an egotistical desire for power, and finally war against nature and scarcity of resources. The dragons gained longevity, but always struggled to survive. Every century or so a new crazy leader, a new illness, a new unstable environment was challenging their existence. What if they could start from fresh?

A group of philosophers and world leaders developed a plan for a new start. Two of the purest dragons from the four families of Fire, Air, Water and Earth. Six pure descendants from each family and a total of ninety six nobles from the combined families. This would serve as the elite, leading another ten thousand or so dragons that would settle in the new world, relaunching their society, developing new art and technology, in full respect of each other, other species, and the natural resources at their disposal. With this plan in mind, they began sending explorers across the galaxies, in the hope to find a habitable planet.

Listening to the explorer's report, the nobles from the pure family of Fire had a question: three hundred years since the plan was designed, did it still make sense? One of the nobles took control--it wasn't time for doubt but for action. The rest of the elite was notified, a spaceship was readied, and the expedition could begin. Soon, it would be a new beginning.
`
    const long3 = `
### Today

Three years have passed since the Everdragons' landing. After a strenuous winter and a widespread pandemic, life is reemerging stronger than ever: kittens, apes and so many new forms and colors. And yet the dragons are still asleep, imprisoned in ice and snow.

A new bright light appears in the center of the sky. The spaceship is getting closer. New Everdragons are about to land.
`
    return (
      <Container style={{marginTop: 100, marginBottom: 120}}>
        <div className={'home-section'}>
          <h1>story</h1>
          <Row>
            <Col>
              <div className={'textBlock'}>
                <div>
                  <Markdown source={long0}/>
                  <div className={'centered'}><Ab link={'https://everdragons.com'} className={'pc70'}
                                                  label={<img src={'/images/logo-ED.png'} alt={'The four elements'}/>}/></div>
                  <Markdown source={long1}/>
                  <div style={{height: 24, clear: 'both'}}>{' '}</div>
                  <CenteredImage src={'/images/00269.png'} />
                  <Markdown source={long2}/>
                  <div style={{height: 24, clear: 'both'}}>{' '}</div>
                  <CenteredImage src={'/images/00265.png'} />
                  <Markdown source={long3}/>

                  <div style={{height: 24, clear: 'both'}}>{' '}</div>
                  <CenteredImage src={'/images/everDragonsLogo.png'} />
                  <div className={'centered'}>
                    <h2 className={'likeh1'}>Welcome the Everdragons2!</h2>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}
