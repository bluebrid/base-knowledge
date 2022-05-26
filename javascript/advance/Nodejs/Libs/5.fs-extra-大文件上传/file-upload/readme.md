# 前端大文件上传 + 断点续传解决方案

[一文了解文件上传全过程（1.8w字深度解析，进阶必备）](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247485610&idx=1&sn=0d8515c92307e8a05029bf679f5496a2&chksm=ce6ecc06f91945105e136e81d74b95d49f29d01c1dc78316d9d74993ddf004ffdca0cf096544&scene=126&sessionid=1589341727&key=1b30113a73e693c938fcf1f9403ecd9fab1542d384ef3751619651e6189ec903cac75dbff34d48b174ec5be7d96f9576b525a9f89c71def94fd6a2ed27c9337ed006680d0c9e5ad09ac0d605f096f910&ascene=1&uin=MjEwNzg0ODc4Mg%3D%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=Ay1GxxrYWhSWfNjCxvNOzkU%3D&pass_ticket=5xrUhqNHyJFPJyUSs3QLtsulVSfGe1xoXeAcGS57TD1QYmbv%2BEwyGN7i4dL55JUN)
使用前请打开 chrome 开发工具的 network 选项，设置网络节流为 Fast 3G，否则上传速度太快断点续传会无法使用-。-

![](https://tva1.sinaimg.cn/large/006tNbRwgy1ga5u984kjnj30ni0cajwe.jpg)


重新演示上传需要删除 /target 中的文件，否则由于服务端保存了文件上传会直接成功

示例文件： /public/林俊杰-我们很好.mp3


前端
* vue + element 界面展示
* Blob#slice 实现文件切片
* FileReader + spark-md5 + web-worker 生成文件 hash
* xhr 发送 formData

服务端
* nodejs
* multiparty 处理 formData

# start

```
npm install
```

```
npm run start
```
