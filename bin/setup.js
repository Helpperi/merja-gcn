// Setup modified from https://github.com/contentful-userland/gatsby-contentful-starter

const spaceImport = require('contentful-import')
const exportFile = require('../contentful/export.json')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileSync } = require('fs')

console.log(`
  To set up this project you need to provide your Space ID
  and the belonging API access tokens.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red(
      '->'
    )} API keys`
  )}

  The ${chalk.green('Content Delivery API Token')}
    will be used to ship published production-ready content in your Gatsby app.

  The ${chalk.green('Content Preview API Token')}
    will be used to show not published data in your development environment.

  The ${chalk.green('Content Management API Token')}
    will be used to import and write data to your space.

  Ready? Let's do it! 🎉
`)

const questions = [
  {
    name: 'spaceId',
    message: 'Your Space ID',
    validate: input =>
      /^[a-z0-9]{12}$/.test(input) ||
      'Space ID must be 12 lowercase characters',
  },
  {
    name: 'accessToken',
    message: 'Your Content Delivery API access token',
  },
  {
    name: 'previewToken',
    message: 'Your Content Preview API access token',
  },
  {
    name: 'managementToken',
    message: 'Your Content Management API access token',
  },
]

inquirer
  .prompt(questions)
  .then(({ spaceId, accessToken, previewToken, managementToken }) => {
    console.log('Writing config files...')
    const envDevPath = path.resolve(__dirname, '..', '.env.development')
    const envProdPath = path.resolve(__dirname, '..', '.env.production')

    const envDevContent = `HOST=preview.contentful.com
SPACE_ID=${spaceId}
CONTENTFUL_ACCESS_TOKEN=${previewToken}
`
    const envProdContent = `HOST=cdn.contentful.com
SPACE_ID=${spaceId}
CONTENTFUL_ACCESS_TOKEN=${accessToken}
`

    writeFileSync(envDevPath, envDevContent)
    writeFileSync(envProdPath, envProdContent)

    console.log(`Config files ${chalk.yellow('.env.development')} and ${chalk.yellow('.env.production')} written`)

    return { spaceId, managementToken }
  })
  .then(({ spaceId, managementToken }) =>
    spaceImport({ spaceId, managementToken, content: exportFile })
  )
  .then((_, error) => {
    console.log(
      `All set! You can now run ${chalk.yellow(
        'gatsby develop'
      )} to see it in action.`
    )
  })
  .catch(error => console.error(error))
