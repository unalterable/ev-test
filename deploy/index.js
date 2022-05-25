const { Octokit } = require('@octokit/rest')
const YAML = require('yaml')
const { findIndex, matchesProperty, set } = require('lodash/fp')

const fileLocationInfo = { owner: "unalterable", repo: "demo-dev", path: "env/Chart.yaml" }

const updateVersion = async () => {
  const octokit = new Octokit({ auth: process.env['TOKEN'] })
  const { data } = await octokit.rest.repos.getContent(fileLocationInfo)
  const chartJson = YAML.parse(Buffer.from(data.content, 'base64').toString())

  console.log('OLD', JSON.stringify(chartJson, null, 2))

  const appIndex = findIndex(matchesProperty('name', process.env['APP']), chartJson.dependencies)
  if (appIndex < 0) throw new Error(`App "${process.env['APP']}" not found in ${fileLocationInfo.path}`)
  const newChartJson = set(`dependencies.${appIndex}.version`, process.env['VERSION'], chartJson)

  console.log('NEW', JSON.stringify(newChartJson, null, 2))

  await octokit.rest.repos.createOrUpdateFileContents({
    ...fileLocationInfo,
    message: `Tech Test Team. Updating ${process.env['APP']}:${process.env['VERSION']}`,
    content: Buffer.from(YAML.stringify(newChartJson)).toString('base64'),
    sha: data.sha,
    committer: { name: 'Tech Test Team', email: 'tech_test@ev.uk' }
  })
}
updateVersion()