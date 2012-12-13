#适合移动端的组件 **移动端组件**

写此篇的目的，完全是因为在读bootStrap后将其部分搬到Mixcss发现诸多“水土不服”的地方，移动端的组件还是与PC上的组件有诸多不同点的。

PC代表：bootStrap
Mobile代表： H5 、 taobaoPad 、Jquery Mobile(Native)

##操作方式

**一些伪类**

这在一些标签的使用上就有所不同，如PC上使用hover：

![hover后的样式](../assets/images/2012-12-13-1.JPG)

但是在Mobile端就不需要考虑这种情况，要考虑的情况可能是focus，disable，readonly等这些情况。


**滚动VS滑动**

这块在样式上的区别还算比较小。但是在一些JS动作上区别比较大。


##组件展现

###button

1.下面是bootStrap的button呈现方式：

![button呈现样式](../assets/images/2012-12-13-2.JPG)

再看一下H5 和 Jquery Mobile（类似Native）的按钮样式

2.H5：

![H5的button的呈现样式](../assets/images/2012-12-13-3.JPG)

3.Jquery Mobile（Native）：

![button的呈现样式](../assets/images/2012-12-13-4.JPG)


比较起来，H5 和 Jquery Mobile 重视手指点击区域、在有限区域的分辨度的设计，而bootStrap基于PC，这点并不突出。

**因此，MixCss在提供的样式依据为点击区域、辨识度等CSS属性。**

##Tables

bootStrap的Tables:
![Tables](../assets/images/2012-12-13-5.JPG)

**这类组件在Mobile上应用场景很少。**

##Form:Legend

bootStrap的Legend:

![Legend的呈现样式](../assets/images/2012-12-13-6.JPG)

**目前H5和TaobaoPad都没有应用。此类控件场景相对较少（或者用控件拼合，如label，hr）。**


##Form:Inputs

bootStrap的Inputs:

![Inputs的呈现样式](../assets/images/2012-12-13-7.JPG)

**和移动端的区别还是在于一些伪类，如hover，mousein，mouseout，除去这些其他和移动端基本一致。 **

##Form:TextArea

bootStrap的TextArea:

![TextArea的呈现样式](../assets/images/2012-12-13-8.JPG)


**在某些属性上：如大小可拖动。在Mobile上并不太适用。**


##Form: Checkboxes and radios

bootStrap:
![Checkboxes的呈现样式](../assets/images/2012-12-13-9.JPG)

H5和JMobile的样式：

![Checkboxes的呈现样式](../assets/images/2012-12-13-10.JPG)

**和Button类似，Mobile端更突出点击区域、辨识度。这部分的CSS属性可能是宽、高、定制的背景等等**

##Form: select

bootStrap:
![select的呈现样式](../assets/images/2012-12-13-11.JPG)

H5和JMobile的样式：
![select的呈现样式](../assets/images/2012-12-13-12.JPG)

**同上，点击区域、辨识度。**

##Form: 混合

bootStrap:
![Form混合的呈现样式](../assets/images/2012-12-13-13.JPG)

H5和JMobile的混合样式：






