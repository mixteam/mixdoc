#变量  **变量**

分为以下几类：

##淡色（Grays）

	@black:                 #000;
	@grayDarker:            #222;
	@grayDark:              #333;
	@gray:                  #555;
	@grayLight:             #999;
	@grayLighter:           #eee;
	@white:                 #fff;
	
##重色(Accent colors)

	@blue:                  #049cdb;
	@blueDark:              #0064cd;
	@green:                 #46a546;
	@red:                   #9d261d;
	@yellow:                #ffc40d;
	@orange:                #f89406;
	@pink:                  #c3325f;
	@purple:                #7a43b6;
	
##全局文本、背景（Scaffolding）
	
	@bodyBackground:        @white;
	@textColor:             @grayDark;
	
##链接（Links）

	@linkColor:             #08c;
	@linkColorHover:        darken(@linkColor, 15%);

##排版（Typography）

	@sansFontFamily:        "Helvetica Neue", Helvetica, Arial, sans-serif;
	@serifFontFamily:       Georgia, "Times New Roman", Times, serif;
	@monoFontFamily:        Monaco, Menlo, Consolas, "Courier New", monospace;

	@baseFontSize:          14px;
	@baseFontFamily:        @sansFontFamily;
	@baseLineHeight:        20px;
	@altFontFamily:         @serifFontFamily;

	@headingsFontFamily:    inherit; // empty to use BS default, @baseFontFamily
	@headingsFontWeight:    bold;    // instead of browser default, bold
	@headingsColor:         inherit; // empty to use BS default, @textColor
	
##组件尺寸（基于14px字体大小和20px行高）

	@fontSizeLarge:         @baseFontSize * 1.25; // ~18px
	@fontSizeSmall:         @baseFontSize * 0.85; // ~12px
	@fontSizeMini:          @baseFontSize * 0.75; // ~11px

	@paddingLarge:          11px 19px; // 44px
	@paddingSmall:          2px 10px;  // 26px
	@paddingMini:           1px 6px;   // 24px

	@baseBorderRadius:      4px;
	@borderRadiusLarge:     6px;
	@borderRadiusSmall:     3px;
	
##Buttons

	@btnBackground:                     @white;
	@btnBackgroundHighlight:            darken(@white, 10%);
	@btnBorder:                         #bbb;

	@btnPrimaryBackground:              @linkColor;
	@btnPrimaryBackgroundHighlight:     spin(@btnPrimaryBackground, 20%);

	@btnInfoBackground:                 #5bc0de;
	@btnInfoBackgroundHighlight:        #2f96b4;

	@btnSuccessBackground:              #62c462;
	@btnSuccessBackgroundHighlight:     #51a351;

	@btnWarningBackground:              lighten(@orange, 15%);
	@btnWarningBackgroundHighlight:     @orange;

	@btnDangerBackground:               #ee5f5b;
	@btnDangerBackgroundHighlight:      #bd362f;

	@btnInverseBackground:              #444;
	@btnInverseBackgroundHighlight:     @grayDarker;
	
##Forms

	@inputBackground:               @white;
	@inputBorder:                   #ccc;
	@inputBorderRadius:             @baseBorderRadius;
	@inputDisabledBackground:       @grayLighter;
	@formActionsBackground:         #f5f5f5;
	@inputHeight:                   @baseLineHeight + 10px; // base line-height + 8px vertical padding + 2px top/bottom border

##Z-index（规定以下几种，避免用户自己定义）

	@zindexDropdown:          1000;
	@zindexPopover:           1010;
	@zindexTooltip:           1030;
	@zindexFixedNavbar:       1030;
	@zindexModalBackdrop:     1040;
	@zindexModal:             1050;
	
##Sprite

	@iconSpritePath:          "../img/glyphicons-halflings.png";
	@iconWhiteSpritePath:     "../img/glyphicons-halflings-white.png";
	
##Input placeholder text color

	@placeholderText:         @grayLight;
	
##Hr border color

	@hrBorder:                @grayLighter;
	
##Horizontal forms & lists

	@horizontalComponentOffset:       180px;
	
##Pagination

	@paginationBackground:                #fff;
	@paginationBorder:                    #ddd;
	@paginationActiveBackground:          #f5f5f5;

##Form states and alerts

	@warningText:             #c09853;
	@warningBackground:       #fcf8e3;
	@warningBorder:           darken(spin(@warningBackground, -10), 3%);

	@errorText:               #b94a48;
	@errorBackground:         #f2dede;
	@errorBorder:             darken(spin(@errorBackground, -10), 3%);

	@successText:             #468847;
	@successBackground:       #dff0d8;
	@successBorder:           darken(spin(@successBackground, -10), 5%);

	@infoText:                #3a87ad;
	@infoBackground:          #d9edf7;
	@infoBorder:              darken(spin(@infoBackground, -10), 7%);
