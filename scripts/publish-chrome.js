const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../.env` })
const fs = require('fs')
const { zip } = require('zip-a-folder')

const archivePath = `${__dirname}/../chrome.zip`

async function release() {
  console.log('Archiving...')
  await zip(`${__dirname}/../dist`, archivePath)
  const webStore = require('chrome-webstore-upload')({
    extensionId: 'fbjbccjcmmnegakmjkklplmijeilnbhd',
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH,
  })
  console.log('Getting an access token...')
  const token = await webStore.fetchToken()
  console.log('Uploading the archive...')
  const archive = fs.createReadStream(archivePath)
  const response = await webStore.uploadExisting(archive, token)
  if (response.itemError && response.itemError.length) {
    console.log('Error', response.itemError)
    process.exit(1)
  }
  console.log('Deleting the archive...')
  fs.unlinkSync(archivePath)
  console.log('Publishing the extension...')
  const status = (await webStore.publish('default', token)).status
  console.log('Finished with status', status)
}

release()
