1. Javascript 使用Number来表示数字(整数或浮点数)， 通过**64**位来表示数字
> 1. 第0位，是符号位置，0表是正数，1表示负数
> 2. 1-11：存储得是指数部分(e)
> 3. 12-63 存储小数部分，（即有效数字）
> 4. 0.1和0.2转换成二进制后会无限循环
> 5. 这样在进制之间的转换中精度已经损失
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/16/165e0eb7f4d6c50f~tplv-t2oaga2asx-zoom-in-crop-mark:1630:0:0:0.awebp)