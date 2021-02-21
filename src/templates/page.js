import React from 'react'
import { graphql } from 'gatsby'
import { startCase, orderBy } from 'lodash'
import moment from 'moment'
import Layout from '../components/Layout'
import Card from '../components/Card'
import CardList from '../components/CardList'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import SEO from '../components/SEO'
import Pagination from '../components/Pagination'

const PageTemplate = ({ data, pageContext }) => {
  const posts = orderBy(
    data.contentfulPage.post,
    // eslint-disable-next-line
    [object => new moment(object.publishDateISO)],
    ['desc']
  )

  const numberOfPosts = posts.length
  const skip = pageContext.skip
  const limit = pageContext.limit
  const { humanPageNumber, basePath } = pageContext

  let ogImage
  try {
    ogImage = posts[0].heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  const { title, metaDescription, body } = data.contentfulPage
  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
      />
      <Container>
        <PageTitle>{title}</PageTitle>
        <PageBody body={body} />
        <PageTitle small>
            Aiheeseen liittyvää:
          </PageTitle>
        <CardList>
            {posts.slice(skip, limit * humanPageNumber).map(post => (
              <Card {...post} key={post.id} basePath={basePath} />
            ))}
        </CardList>
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      post {
        id
        title
        slug
        publishDate(formatString: "MMMM DD, YYYY")
        publishDateISO: publishDate(formatString: "YYYY-MM-DD")
        heroImage {
          title
          fluid(maxWidth: 1800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
          ogimg: resize(width: 1800) {
            src
          }
        }
        body {
          childMarkdownRemark {
            timeToRead
            html
            excerpt(pruneLength: 80)
          }
        }
      }
      metaDescription {
        internal {
          content
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PageTemplate
