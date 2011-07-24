jsis.ui.AbstractBlockContainer = jsis.$class(jsis.ui.AbstractContainer, 
{
	$constructor:			function( content, renderTo )
	{
		this.titlebar = new jsis.ui.titlebar.Titlebar();
		this.buttonbar = new jsis.ui.buttonbar.Buttonbar();
		this.$super(content, renderTo);
		this.relayEvent(this.titlebar, 'titleClick', this);
		this.relayEvent(this.titlebar, 'titleMouseUp', this);
		this.relayEvent(this.titlebar, 'titleMouseDown', this);
		this.relayEvent(this.titlebar, 'titleDoubleClick', this);
		this.relayEvent(this.buttonbar, 'buttonClick', this);
		this.titlebar.addListener('titleButtonClick', this._onTitleButtonClick, this);
	},
	getInnerHeight:			function()
	{
		return this._bodyDiv.getHeight();
	},
	getInnerWidth:			function()
	{
		return this._bodyDiv.getWidth();
	},
	_onTitleButtonClick:	function(button, buttonId)
	{
		return this.fireEvent('titleButtonClick', [this, button, buttonId]);
	},
	_renderElements:		function()
	{
		this._element.recreate();
		this._element.setHtml('');
		this._element.appendTo(this.renderTo);
		this._element.removeAllClasses();
		var bodyId = 'jsis-'+jsis.uuid();
		this._currentStyle = this.style ? this.style : jsis.settings.defaultStyle;
		this._currentStyleVariant = this.styleVariant ? this.styleVariant : jsis.settings.blockStyles[this._currentStyle].getVariantName(this);
		this._renderedStyle = jsis.settings.blockStyles[this._currentStyle][this._currentStyleVariant];
		this._renderTemplate(bodyId);
		this._bodyDiv = jsis.find("#"+bodyId);
		this._element.setMultiCss(
		{
			position:		'absolute',
			display:		this._visible ? this._displayMode : 'none',
			overflow:		'hidden'
		});
		this._bodyDiv.setMultiCss(
		{
			overflow:		'auto',
			position:		'relative'
		});
		this._element.addClass(this._renderedStyle.wrapCls);
		this._bodyDiv.addClass(this._renderedStyle.bodyCls);
		this.computedHeight = null;
		this.computedWidth = null;
	},
	_refreshElements:		function()
	{
		var width = this.computedWidth != null ? this.computedWidth : this.width;
		var height = this.computedHeight != null ? this.computedHeight : this.height;
		this._bodyDiv.setMultiCss(
		{
			width:		width - this._renderedStyle.outerMargins[0] - this._renderedStyle.innerMargins[0] - ( this.titlebar.hasDataToShow() ? this._renderedStyle.titleMargins[0] : 0)  - ( this.buttonbar.hasDataToShow() ? this._renderedStyle.buttonbarMargins[0] : 0),
			height:		height - this._renderedStyle.outerMargins[1] - this._renderedStyle.innerMargins[1] - ( this.titlebar.hasDataToShow() ? this._renderedStyle.titleMargins[1] : 0) - ( this.buttonbar.hasDataToShow() ? this._renderedStyle.buttonbarMargins[1] : 0)
		});
		this._element.setMultiCss(
		{
			width:		width - this._renderedStyle.outerMargins[0],
			height:		height - this._renderedStyle.outerMargins[1],
			left:		(!this.left && this.left!=0) ? 'auto' : this.left,
			top:		(!this.top && this.top!=0) ? 'auto' : this.top,
			bottom:		(!this.bottom && this.bottom!=0) ? 'auto' : this.bottom,
			right:		(!this.right && this.right!=0) ? 'auto' : this.right
		});
	},
	_renderChild:		function(child)
	{
		child.renderTo = this._bodyDiv;
		child.show();
	},
	_renderTemplate:		function(bodyId)
	{
		this.titlebar.title = this.title;
		var buttonbarId;
		var templateArguments = 
		{
			body:		"<div id='"+bodyId+"'></div>",
			buttonbar:	"",
			title:		""
		};
		if ( this.buttonbar.hasDataToShow() )
		{
			buttonbarId = 'jsis-'+jsis.uuid();
			templateArguments.buttonbar = "<div id='"+buttonbarId+"'></div>";
		}
		if ( this.titlebar.hasDataToShow() )
		{
			var titleId = 'jsis-'+jsis.uuid();
			var template = this._renderedStyle.wrapperTitle;
			templateArguments.title = "<div id='"+titleId+"'></div>";
			jsis.$.tmpl( template, templateArguments ).appendTo( "#"+this._element.dom.id );
			this._titleDiv = jsis.find("#"+titleId);
			this._titleDiv.addClass(this._renderedStyle.titleCls);
			this.titlebar.renderTo = this._titleDiv;
			this.titlebar.template = this._renderedStyle.title;
			this.titlebar.buttonTemplate = this._renderedStyle.buttonTitle;
			this.titlebar.buttonCls = this._renderedStyle.buttonCls;
			this.titlebar.redButtonCls = this._renderedStyle.redButtonCls;
			this.titlebar.show();
		}
		else
		{
			var template = this._renderedStyle.wrapper;
			jsis.$.tmpl( template, templateArguments ).appendTo( "#"+this._element.dom.id );
		}
		if ( this.buttonbar.hasDataToShow() )
		{
			this._buttonbarDiv = jsis.find("#"+buttonbarId);
			this._buttonbarDiv.addClass(this._renderedStyle.buttonbarCls);
			this.buttonbar.renderTo = this._buttonbarDiv;
			this.buttonbar.template = this._renderedStyle.buttonbar;
			this.buttonbar.show();
		}
	},
	title:					"",
	computedWidth:			0,
	computedHeight:			0,
	minWidth:				0,
	minHeight:				0,
	titlebar:				null,
	style:					null,
	styleVariant:			null,
	_currentStyle:			jsis.settings.defaultStyle,
	_currentStyleVariant:	null,
	_titleDiv:				null,
	_buttonbarDiv:			null,
	_bodyDiv:				null,
	_htmlDiv:				null,
	_renderedStyle:			null,
	_uiType:				"AbstractBlockContainer"
});