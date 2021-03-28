const fs = require('fs')
const { zip } = require('zip-a-folder')

async function release() {
  const timestamp = Date.now()
  console.log('Archiving the Firefox add-on...')
  await zip(
    `${__dirname}/../dist`,
    `/Users/nikitakolmogorov/Desktop/firefox.zip`
  )
  console.log(`Moving node_modules to /tmp/${timestamp}...`)
  fs.mkdirSync(`/tmp/${timestamp}`)
  fs.renameSync(
    `${__dirname}/../node_modules`,
    `/tmp/${timestamp}/node_modules`
  )
  console.log(`Archiving the Firefox sources...`)
  await zip(
    `${__dirname}/..`,
    `/Users/nikitakolmogorov/Desktop/firefox-sources.zip`
  )
  console.log(`Moving node_modules back...`)
  fs.renameSync(
    `/tmp/${timestamp}/node_modules`,
    `${__dirname}/../node_modules`
  )
  console.log(
    'Add-on is archived, submit it at https://addons.mozilla.org/en-US/developers/addon/bot-finder/versions/submit/'
  )
}

release()
