require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const facebookTransformer = require('./src/custom-embed-transformers/facebook-transformer');
const contentfulTransformer = require('./src/custom-embed-transformers/contentful-transformer');

module.exports = {
  flags: {
    DEV_SSR:true
  },
  siteMetadata: {
    title: 'Merja Oksman',
    description:
      'Merja Oksman, kaikessa mukana',
    siteUrl: 'https://merjaoksman.fi',
    image: '/images/share.jpg',
    menuLinks: [
      {
        name: 'Kuntavaalit 2021',
        slug: '/',
      },
      {
        name: 'Julkaistuja kolumneja ja mielipiteitä',
        slug: '/julkaistuja-kolumneja-ja-mielipiteitae/',
      },
      {
        name: 'Monessa mukana',
        slug: '/monessa-mukana/',
      },
      {
        name: 'Voimaannuttavaa',
        slug: '/voimaannuttavaa/',
      },
      {
        name: 'Ota yhteyttä',
        slug: '/contact/',
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
    'gatsby-plugin-react-helmet',
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
                contentfulTransformer
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
        host: process.env.HOST
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Merja Oksman Kuntavaalit 2021',
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
        fonts: [
          `Bree Serif`,
          `Montserrat`,
        ],
        display: 'swap'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
