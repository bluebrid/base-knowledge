const fs = require('fs-extra')
const path = require('path')

function deleteRemovedFiles (directory, newFiles, previousFiles) {
  // get all files that are not in the new filesystem and are still existing
  const filesToDelete = Object.keys(previousFiles)
    .filter(filename => !newFiles[filename])

  // delete each of these files
  return Promise.all(filesToDelete.map(filename => {
    return fs.unlink(path.join(directory, filename))
  }))
}

module.exports = async function writeFileTree (dir, files, previousFiles) {
  if (process.env.VUE_CLI_SKIP_WRITE) {
    return
  }
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles)
  }
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    // 创建项目文件夹
    fs.ensureDirSync(path.dirname(filePath))
    // 创建package.json 文件
    fs.writeFileSync(filePath, files[name])
  })
}
