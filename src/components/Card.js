import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const Post = styled.li`
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 2px;
  margin: 0 0 1em;
  width: 100%;
  transition: background 0.2s;
  @media screen and (min-width: ${(props) => props.theme.responsive.small}) {
    flex: ${(props) => (props.featured ? '0 0 100%' : '0 0 49%')};
    margin: 0 0 2vw;
  }
  @media screen and (min-width: ${(props) => props.theme.responsive.medium}) {
    flex: ${(props) => (props.featured ? '0 0 100%' : '0 0 32%')};
  }
  &:hover {
    background: ${(props) => props.theme.colors.tertiary};
  }
  a {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
    .gatsby-image-wrapper {
      height: 0;
      padding-bottom: 60%;
      @media screen and (min-width: ${(props) =>
          props.theme.responsive.small}) {
        padding-bottom: ${(props) => (props.featured ? '40%' : '60%')};
      }
    }
  }
`

const StyledImg = styled(GatsbyImage)`
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
`

const Title = styled.h2`
  font-size: 1.5em;
  color: ${props => props.theme.colors.header};
  font-family: ${props => props.theme.fonts.header};
  font-weight: 600;
  margin: 1rem 1rem 0.5rem 1rem;
  text-transform: capitalize;
`

const Date = styled.h3`
  margin: 0 1rem 0.5rem 1rem;
  color: gray;
`

const ReadingTime = styled.h4`
  margin: 0 1rem 1.5rem 1rem;
  color: gray;
`

const Excerpt = styled.p`
  margin: 0 1rem 1rem 1rem;
  line-height: 1.6;
`

const Card = ({ slug, heroImage, title, publishDate, body, ...props }) => {
  return (
    <>
      {heroImage && body && (
        <Post featured={props.featured}>
          <Link to={`${props.basePath}/${slug}/`}>
            <StyledImg
              image={heroImage.gatsbyImageData}
              alt={heroImage.title}
              backgroundColor={'#eeeeee'}
            />
            <Title>{title}</Title>
            <Date>{publishDate}</Date>
            <ReadingTime>
              {body.childMarkdownRemark.timeToRead} min read
            </ReadingTime>
            <Excerpt
              dangerouslySetInnerHTML={{
                __html: body.childMarkdownRemark.excerpt,
              }}
            />
          </Link>
        </Post>
      )}
    </>
  )
}

export default Card