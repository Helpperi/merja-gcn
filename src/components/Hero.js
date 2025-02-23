import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'

const Wrapper = styled.section`
  position: relative;
  min-height: 300px;
  height: auto;
  @media (min-width: ${props => props.theme.responsive.small}) {
    height: ${props => props.height || 'auto'};
  }
`
const BgImg = styled(GatsbyImage)`
  position: absolute;
  width: 100%;
  height: 100%;
  &::before {
    content: '';
    background: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`

const Title = styled.h1`
  z-index: 2;
  font-size: 4em;
  text-shadow: 2px 2px ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.header};
  font-weight: 400;
  position: absolute;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  padding: 0 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${props => props.theme.colors.secondary};
`

const Hero = props => (
  <Wrapper height={props.height}>
    <BgImg image={props.image.gatsbyImageData} alt={props.image.title} backgroundColor={'#eeeeee'} />
    <Title>{props.title}</Title>
  </Wrapper>
)

export default Hero