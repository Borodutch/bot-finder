const { ZipAFolder } = require('zip-a-folder');
const fs = require('fs');

const archiveDir = `${__dirname}/../build`;
const archivePath = `${archiveDir}/${new Date().toISOString()}.zip`;

async function release() {
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
  }
  console.log('Archiving started...');
  try {
    await ZipAFolder.zip(`${__dirname}/../dist`, archivePath);
    console.log('Archiving finished.');
  } catch (error) {
    console.log('Error happened: ' + error);
  }
}

release();
