const multiparty = require("multiparty");
const path = require("path");
const fse = require("fs-extra");

const extractExt = filename =>
  filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

// 合并切片
const mergeFileChunk = async (filePath, fileHash) => {
  const chunkDir = `${UPLOAD_DIR}/${fileHash}`;
  const chunkPaths = await fse.readdir(chunkDir); // 读取切片中的文件
  await fse.writeFile(filePath, ""); // 创建一个新的文件夹
  chunkPaths.forEach(chunkPath => {
    fse.appendFileSync(filePath, fse.readFileSync(`${chunkDir}/${chunkPath}`)); // 追加切片到新的文件中
    fse.unlinkSync(`${chunkDir}/${chunkPath}`); // 删除对应的切片
  });
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

// 返回已经上传切片名
const createUploadedList = async fileHash =>
  fse.existsSync(`${UPLOAD_DIR}/${fileHash}`)
    ? await fse.readdir(`${UPLOAD_DIR}/${fileHash}`)
    : [];

module.exports = class {
  // 合并切片
  async handleMerge(req, res) {
    const data = await resolvePost(req);
    const { fileHash, filename } = data;
    const ext = extractExt(filename);
    const filePath = `${UPLOAD_DIR}/${fileHash}${ext}`;
    await mergeFileChunk(filePath, fileHash);
    res.end(
      JSON.stringify({
        code: 0,
        message: "file merged success"
      })
    );
  }
  // 处理切片
  async handleFormData(req, res) {
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status = 500;
        res.end("process file chunk failed");
        return;
      }
      const [chunk] = files.chunk;
      const [hash] = fields.hash;
      const [fileHash] = fields.fileHash;
      const [filename] = fields.filename;
      const filePath = `${UPLOAD_DIR}/${fileHash}${extractExt(filename)}`;
      const chunkDir = `${UPLOAD_DIR}/${fileHash}`;

      // 文件存在直接返回
      if (fse.existsSync(filePath)) {
        res.end("file exist");
        return;
      }

      // 切片目录不存在，创建切片目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }
      // fs-extra 专用方法，类似 fs.rename 并且跨平台
      // fs-extra 的 rename 方法 windows 平台会有权限问题
      // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
      await fse.move(chunk.path, `${chunkDir}/${hash}`);
      res.end("received file chunk");
    });
  }
  // 验证是否已上传/已上传切片下标
  async handleVerifyUpload(req, res) {
    const data = await resolvePost(req);
    const { fileHash, filename } = data; // filename 只是用来获取后缀， 并不会根据filename 来查找文件是否存在
    const ext = extractExt(filename);
    const filePath = `${UPLOAD_DIR}/${fileHash}${ext}`;
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      );
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
          uploadedList: await createUploadedList(fileHash)
        })
      );
    }
  }
};
