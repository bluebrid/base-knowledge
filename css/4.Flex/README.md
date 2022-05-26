## [一劳永逸的搞定 flex 布局](https://juejin.cn/post/6844903474774147086)
## 垂直居中
```css
#add {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/221bb6de73e54f4104a1.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
1. flex的核心概念是<font color=red>容器</font>和<font color=red>轴</font>
2. 容器分为：父容器和子容器
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/f443b657dbc39d361f68.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
3. `justify-content`属性用来定义如何从<font color=red>主轴方向排列子容器</font>
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/be5b7f0e022a8da60ed8.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
> 1. `flex-start`：起始端对齐
> 2. `flex-end`:末尾段对齐
> 3. `center`:居中对其
> 4. `space-around`：子容器沿主轴均匀分布，位于首位两端的子容器到父容器的距离是子容器的一半
> 5. `space-between`: 子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切
4. `align-items`:设置子容器如何沿交叉轴进行排列
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/e7e6aa079f5333828c58.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
> 1. `flex-start`：起始端对齐
> 2. `flex-end`: 末尾段对齐
> 3. `center`:居中对齐
> 4. `baseline`: 基线对齐，这里的`baseline`默认是指首行文字
> 5. `stretch`: 子容器沿交叉轴方向的尺寸拉伸至与容器一致
## 子容器
1. `flex`:在主轴上如何伸缩
2. 子容器是有弹性的(display:flex,则认为子元素有弹性)，他们会自动填充剩余空间，子容器的伸缩比例由子元素的`flex`属性确定
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/78e9030183f686e0b6ed.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
3. `align-self`: 单独设置子容器如何沿交叉轴排列
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/1d09fe5bb413a6dfa5dd.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
> 1. flex-start：起始端对齐(align-self: flex-start)
> 2. flex-end：末尾段对齐(align-self: flex-end)
> 3. center：居中对齐
> 4. baseline: 基线对齐
> 5. stretch：拉伸对齐

## 轴(主轴和交叉轴)
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/5f2a17efffe8f3ab78a4.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
1. 主轴
> flex-direction: row/column/row-reverse/ column-reverse (父容器设置)
2. 交叉轴

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/0dd26d8e99257ff36443.png~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)