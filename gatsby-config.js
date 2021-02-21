let contentfulConfig
try {
  contentfulConfig = require('./.contentful')
} catch (e) {
  contentfulConfig = {
    production: {
      spaceId: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN,
    },
  }
} finally {
  const { spaceId, accessToken } = contentfulConfig.production
  if (!spaceId || !accessToken) {
    throw new Error('Contentful space ID and access token need to be provided.')
  }
}

module.exports = {
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
        name: 'Mietteitä',
        slug: '/mietteita/',
      },
      {
        name: 'Tietoa minusta',
        slug: '/about/',
      },
      {
        name: 'Ota yhteyttä',
        slug: '/contact/',
      },
    ],
    postsPerFirstPage: 7,
    postsPerTagPage: 6,
    postsPerPage: 3,
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
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-source-contentful',
      options:
        process.env.NODE_ENV === 'development'
          ? contentfulConfig.development
          : contentfulConfig.production,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Merja Oksman Kuntavaalit 2021',
        short_name: 'Merja Oksman',
        start_url: '/vaalit-2021/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: './static/images/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
