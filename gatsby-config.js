require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const facebookTransformer = require('./src/custom-embed-transformers/facebook-transformer')
const contentfulTransformer = require('./src/custom-embed-transformers/contentful-transformer')

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Merja Oksman',
    description: 'Merja Oksman, monessa mukana',
    siteUrl: 'https://merjaoksman.fi',
    image: '/images/share.jpg',
    menuLinks: [
      {
        name: 'Merja Oksman',
        slug: '/',
      },
      {
        name: 'Kunta- ja aluevaalit 2025',
        slug: '/kunta-ja-aluevaalit-2025/',
      },
      {
        name: 'Monessa mukana',
        slug: '/monessa-mukana/',
      },
      {
        name: 'Julkaistuja kolumneja ja mielipiteitä',
        slug: '/julkaistuja-kolumneja-ja-mielipiteitae/',
      },
      {
        name: 'Voimaannuttavaa',
        slug: '/voimaannuttavaa/',
      },
    ],
    postsPerFirstPage: 7,
    postsPerTagPage: 6,
    postsPerPage: 6,
    basePath: '/',
  },
  plugins: [
    `gatsby-plugin-emotion`,
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-lodash',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 650,
              backgroundColor: 'white',
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
                facebookTransformer,
                contentfulTransformer,
              ],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.HOST,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Merja Oksman Kunta- ja aluevaalit 2025',
        short_name: 'Merja Oksman',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: './static/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Bree Serif`, `Montserrat`],
        display: 'swap',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `./src/gatsby/schema/schema.gql`,
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
    'gatsby-plugin-netlify',
  ],
}
