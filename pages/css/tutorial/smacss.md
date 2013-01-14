#Guide Line——Scalable and Modular Architecture for class **SMACSS**

by jiangC

SMACSS by Jonathan Snook 官网http://smacss.com/book/

随着项目的越来越大，CSS也越来越难以组织。为了使CSS更加结构化以方便维护和扩展，Jonathan Snook在SMACSS中提出了一些Guide Line。

SMACSS将整个Framwork下的CSS规则分为以下几类

**1.Base Rules** ：定义页面级别最基本的元素选择；标签选择器，后代选择器，一些伪类；不包含任何class 或者ID选择器

**2.Layout Rules** ：一个页面的大的区域部分；如footer，header都可以作为Layout；可以细分成很多小的区域，这些小的区域就成为了一个个Module

**3.Module Rules**： layout可以细分成很多小的区域，这些小的区域就成为了一个个Module,Module的特点->重复使用；控件级别。

**4.State Rules** ：定义了两种样式分类：表示消息；表示状态

**5.Theme Rules** ： Theme Style定义的是外观和感觉；容易重定义样式和外观 ；会影响主要的布局、控件外观。例如，链接的颜色；使module呈现多种色彩；影响layout的布局；会改变states style的样式。

**6.Changing State** ：state change的三种手段：class name；pseudo-class；media query。Changing State主要集中在这三点。

##Base Rules

以下是Base Rules的官方释义：

	A Base rule is applied to an element using an element selector, a descendent selector, or a child selector, along with any pseudo-classes. It doesn’t include any class or ID selectors. It is defining the default styling for how that element should look in all occurrences on the page.

总结起来，Base Rules包括以下几点:

+  定义页面级别最基本的元素选择
+  标签选择器，后代选择器，一些伪类
+  不包含任何class 或者ID选择器

如下例

	body, form {
		margin: 0;
		padding: 0;
	}

	a {
		color: #039;
	}

	a:hover {
		color: #03F;    
	}
	
base rules中强调的一点是：

	There should be no need to use !important in a Base style

同时，为了避免在css中对一些属性重写，如页面背景色，这部分CSS属性都可以在base rule中来提前约定一下。




此外，Jonathan Snook提议在base rules中加入Resets，以解决不同浏览器之间的差异性。


**Q：base rules中加入Resets是不是和normalize.css一样了？**

**A：实际上，normalize.css解决的是跨浏览器许多bug的统一解决方案，但是在某一些项目中，有些方案我是不需要的，不需要“大而全”**

**Q:我倾向于向base中添加除了元素选择之外更多的东西，比如说向utility class中添加隐藏的规则、图片或者图标的规则。**

**A:这一类可以归到State Rules中去，你需要将css rule做得更加specify。**

对于图片或者图标
	
	Things like .ir, we have an .icn (icon) class, which is a specific module. We have icn-12, icn-24, and icn-48 for the different sprites. 

##Layout Rules

关于Layout Rules的官方释义：
	
	CSS, by its very nature, is used to lay elements out on the page. However, there is a distinction between layouts dictating the major and minor components of a page. The minor components—such as a callout, or login form, or a navigation item—sit within the scope of major components such as a header or footer. I refer to the minor components as Modules and will dive into those in the next section. The major components are referred to as Layout styles.

Layout Rules->大的页面组件（区域）；Module Rules->小的页面组件（区域）

+ 页面的大的区域部分
+ 如footer，header都可以作为Layout
+ 可以细分成很多小的区域，这些小的区域就成为了一个个Module

如下代码：

	#header, #article, #footer {
		width: 960px;
		margin: auto;
	}

	#article {
		border: solid #CCC;
		border-width: 1px 0 0;
	}

附：
	These minor Layout styles will use class names instead of IDs so that the styles can be used multiple times on the page.
	小的组件使用class命名，在一个页面中可以重复使用。

通常，一个Layout style只有一个选择器：ID或者class；但是为了应对不同的情况，Layout style可能会有多个选择器。例如，根据用户的使用习惯，这种Layout style会是几种Layout style的集合。如下代码：

	#article {
		float: left;
	}

	#sidebar {
		float: right;
	}

	.l-flipped #article {
		float: right;
	}

	.l-flipped #sidebar {
		float: left;
	}

根据用户的使用习惯，导航条和文章的位置可以互换。

再比如：使用两种Layout style以达到从流动布局到固定布局的转换：

	#article {
		width: 80%;
		float: left;
	}

	#sidebar {
		width: 20%;
		float: right;
	}

	.l-fixed #article {
		width: 600px;
	}

	.l-fixed #sidebar {
		width: 200px;
	}
	
说明：	
	Layout styles are the only primary category type to use ID selectors，if you choose to use them at all

再例，HTML的结构如下：

	<div>
	<h2>Featured</h2>
	<ul>
		<li><a href="…">…</a></li>
		<li><a href="…">…</a></li>
		…
	</ul>
	</div>
	
如果没有用SMACSS方式来定义，可能会给div一个id，css定义如下：
	
	div#featured ul { 
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	div#featured li {
		float: left;
		height: 100px;
		margin-left: 10px;
	}
	
使用上述方式我们包含了以下的假设：

1.页面上只有一个featured的ID（区域）
2.List items左浮动
3.List items的高度为100px

这种方式的特点就是 **DOM结构基本保持不变** ，小网站使用此种方式无可厚非。但是对于结构复杂的网站而言，该方式并不理想，看下面的改造:

	.l-grid {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	.l-grid > li {
		display: inline-block;
		margin: 0 0 10px 10px; 
		
		/* IE7 hack to mimic inline-block on block elements */
		*display: inline;
		*zoom: 1;
	}

 上面的代码无法100%解决问题，但是相比较而言，它有如下优点：
 
1.grid 的布局可以应用于多种标签容器
2.代码层级深度减少了1
3.减少了标签的显示调用
4.高度去掉。整个行的高度取决于行内元素的最高的那个

同时，代码减少，复杂度降低（但是对标签元素有良好的认识）

**（旁白：这个问题很经典）Q:我看到最后一个例子是抽象出来的一种很棒的写法，但是这也像一种具体的模块（module）的class的写法。正如bootStrap上button上的写法一样，或者这种写法作用的对象我们可以叫它“对像（object）”,对此我感到迷惑**

**A:buttons，dialogs，widgets都属于Modules，他们都是“对象（object）”，不属于结构层面的东西**

**Q:头部的logo是属于layout还是属于module？**

**A：一次性的组件（不会在页面中出现多次的），例如，页头，页脚；我会把它归到module中去**

**Q:**
	#article {
		border: solid #CCC;
		border-width: 1px 0 0;
	}

	better than

	#article {
		border: 1px solid #CCC;
		border-width: 1px 0 0;
	}

**A:**
	
	“border-width” overwrite border-width which was set by “border” shorthand. And we can change border visibility by setting “border-width” in different selectors.
	
	可以拆分成两个属性，同时设置在不同的选择器当中：
	
	#article {
		float: left;
		border: solid #CCC;
		border-width: 0 1px 0 0;
	}

	.l-flipped #article {
		float: right;
		border-width: 0 0 0 1px;
	}
	
##Module Rules

关于Module Rules的释义：
	
	It is your navigation bars and your carousels and your dialogs and your widgets and so on. This is the meat of the page. Modules sit inside Layout components. Modules can sometimes sit within other Modules, too. Each Module should be designed to exist as a standalone component. In doing so, the page will be more flexible. If done right, Modules can easily be moved to different parts of the layout without breaking.

在使用Module的时候， **避免使用ID和元素选择器** .如果一个元素的内部有一系列的DOM节点，那么最好使用后代和子选择器,如下代码：

	.module > h2 {
		padding: 5px;
	}

	.module span {
		padding: 5px;
	}

使用子选择器或者后代选择器也有一些约定，那就是元素的结构你是可以预知的。例如：

	
	<div class="fld">
		<span>Folder Name</span>
	</div>

	/* The Folder Module */
	.fld > span {
		padding-left: 20px;
		background: url(icon.png);
	}

在当工程逐渐变复杂了以后，DOM结构可能变成这样：

	<div class="fld">
		<span>Folder Name</span> 
		<span>(32 items)</span>
	</div>
	
解决方式：
	Only include a selector that includes semantics. A span or div holds none. A heading has some. A class defined on an element has plenty.

	<div class="fld">
		<span class="fld-name">Folder Name</span> 
		<span class="fld-items">(32 items)</span>
	</div>

最后通过给元素添加class，我们增加了元素的语义，同时也去除了这些元素的含糊语义。
通过这个例子，使用子选择器时， Alternatively, you should be extremely confident that the element in question will not be confused with another element. 

**New Contexts**
新的上下文：
Using the module approach also allows us to better understand where context changes are likely to occur. The need for a new positioning context, for example, is likely to happen at either the layout level or at the root of a module.

**Subclassing Modules**
当我们在不同的区域中（sections）使用这相同的Module的时候，我们的第一直觉就是根据其父元素来对其进行样式的设置。

例如：

	.pod { 
		width: 100%; 
	}
	.pod input[type=text] { 
		width: 50%; 
	}
	#sidebar .pod input[type=text] { 
		width: 100%; 
	}
	
这种解决方式遭遇的问题就是：
The problem with this approach is that you can run into specificity issues that require adding even more selectors to battle against it or to quickly fall back to using !important.

将上个例子展开来说，我们要为input 定义两个不同的宽度，第一种情况是，input之前有个label标签，因此长度上要短一些。而另一个则是在input之上有个标签，因此宽度上要长一些。现在是一切工作正常，但是我们要添加一个新的元素，它需要的样式和.pod的样式基本一致，所以我们重用了这个class。但是新的.pod类有些特别，其宽度是固定的值180px。于是，我们把代码修改如下：

	.pod { 
		width: 100%; 
	} 
	.pod input[type=text] { 
		width: 50%; 
	}
	#sidebar .pod input[type=text] { 
		width: 100%; 
	}

	.pod-callout { 
		width: 200px; 
	}
	#sidebar .pod-callout input[type=text],
	.pod-callout input[type=text] { 
		width: 180px; 
	}
	
这时，我么借助#sidebar重写了两次input的值。
其实，受限的input的宽度可以看成是.pod的两个不同的子类，可以分别对其进行编写样式。
	.pod { 
		width: 100%; 
	} 
	.pod input[type=text] { 
		width: 50%; 
	}
	.pod-constrained input[type=text] { 
		width: 100%; 
	}

	.pod-callout { 
		width: 200px; 
	}
	.pod-callout input[type=text] { 
		width: 180px; 
	}
	
Sub-module class name in HTML
	
	<div class="pod pod-constrained">...</div>
	<div class="pod pod-callout">...</div>

这个时候你可能又会想，当我们在页面A点击了按钮a，a有着基础的btn样式，点击以后又加载了页面B，但同时加载页面B（属于不同的产品）也有自己的基础btn样式，此时页面A的btn子类会被重写。当遇到这种情况的时候要格外当心。

##State Rules

官方释义：

	A state is something that augments and overrides all other styles. For example, an accordion section may be in a collapsed or expanded state. A message may be in a success or error state.

+ 表示消息
+ 表示状态
	
例如：

	<div id="header" class="is-collapsed">
		<form>
			<div class="msg is-error">
				There is an error!
			</div>
			<label for="searchbox" class="is-hidden">Search</label>
			<input type="search" id="searchbox">
		</form>
	</div>


1.header用于layout，而is-collapsed则表示一种收缩的状态
2.msg是一个module，同时伴随一个is-error的状态
3.label的is-hidden的显示/隐藏状态

State Rules和layout rule、module rule只是一个叠加，并没有重写。


sub-module style 和state style会有一些相像，两者不同的地方在于：
1.State styles can apply to layout and/or module styles; and
2.State styles indicate a JavaScript dependency.

第二点是主要区别。Sub-module styles在页面渲染时作用域于元素，然后就不发生变化。State styles会在一个元素发生变化的时候起作用。

**Using !important**

States should be made to stand alone and are usually built of a single class selector.

一般而言，在复杂的应用中，State styles要重写样式，一般而言是建议使用 !important的。

**Combining State Rules with Modules**

	.tab {
		background-color: purple;
		color: white;
	}

	.is-tab-active {
		background-color: white;
		color: black;
	}

	
##Theme Rules

官方释义：

	Theme Rules aren't as often used within a project and because of that, they aren't included as part of the core types. Some projects may have a need for them, though, as we did when working on Yahoo! Mail.
	
主题：
	
	It is probably self-evident but a theme defines colours and images that give your application or site its look and feel. Separating the theme out into its own set of styles allows for those styles to be easily redefined for alternate themes.

	Themes can affect any of the primary types. It could override base styles like default link colours. It could change module elements such as chrome colours and borders. It could affect layout with different arrangements. It could also alter how states look.

即：

1.Theme Style定义的是外观和感觉。

2.容易重定义样式和外观

3.会影响主要的布局、控件外观。例如，链接的颜色；使module呈现多种色彩；影响layout的布局；改变states style的样式。


例如：
	// in module-name.css
	.mod {
		border: 1px solid;
	}

	// in theme.css
	.mod {
		border-color: blue;
	}

使用相同的class名称，将其独立到不同的文件中去。

At Yahoo! Mail, to help with maintaining consistency across all of our theme files—we have over 50—we use a Mustache template for our CSS that allows us to specify a number of colour values, a background image, and create a final CSS file for production.

几个点：
1.颜色
2.背景图
3.不同的css输出文件

附：	
	Mustache is a templating language that uses {{}} around variables that are then merged with a data set to create a final product. So, we had a mustache template for the CSS file that would look something like "color: {{PRIMARY_COLOR}};

**Typography**

Similar to themes, there are times when you need to redefine the fonts that are being used on a wholesale basis, such as with internationalization. Locales such as China and Korea have complex ideograms that are difficult to read at smaller font sizes.As a result, we create separate font files for each locale that redefine the font size for those components.

汉字比较复杂，不能使用太小的文字，为每个地域创建不同的字体文件库以适应本地化。

但是，Font style会影响到base、module和State style。

Font rules will normally affect base, module and state styles.

此外，
Font styles won’t normally be specified at the layout level as layouts are intended for positioning and placement, not for stylistic changes like fonts and colours.

Font style不应放在layout中，因为layout负责的是position和placement。

同时，

Like theme files, there may not be need to define actual font classes (like f-large). Your site should only have 3 to 6 different font-sizes. If you have more than 6 font sizes declared in your project, your users will not likely notice and you are making the site harder to maintain.

整个站点的字体大小应该控制在3-6种之间，一旦超过了6种不仅你的用户无法分辨出来，而且维护起来会很麻烦。

**Q:**

	The site I'm working on has several different "zones", each themed with a different color. Up to now, the colors were defined in separate .css files (named with the zone's name) and the pages called the relevant theme stylesheet by a link in the head. It contains things like background colors, border colors, but also some images with the specific colors (arrows and circles and things like that). Does this seem adequate or would you do it differently?
	
	Theme文件独立分开；引用的时候一个@import；包含背景色，border颜色，特殊的图片等等。
**A:**
	这样很棒


##Changing State

**What is a state change?**
State changes are represented in one of three ways:

+ class name
+ pseudo-class
+ media query

1.借助js改变class，达到状态改变
2.借助于伪类标签达到状态改变
3.定义不同的breakpoint，media query可以实现状态改变

###Change via class name

	// with jQuery
	$('.btn-close').click(function(){ 
		$(this).parents('.dialog').addClass('is-hidden');        
	})
	
###Change via Pseudo-class


###Change via Pseudo-class
