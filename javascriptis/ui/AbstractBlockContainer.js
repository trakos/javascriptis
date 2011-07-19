jsis.ui.AbstractBlockContainer = jsis.$class(jsis.ui.AbstractContainer, 
{
	$constructor:			function( content, renderTo )
	{
		this.$super(content, renderTo);
		this._titlebar = new jsis.ui.titlebar.Titlebar();
		this.relayEvent(this._titlebar, 'titleClick');
		this.relayEvent(this._titlebar, 'titleMouseUp');
		this.relayEvent(this._titlebar, 'titleMouseDown');
	},
	getInnerHeight:			function()
	{
		return this._bodyDiv.getHeight();
	},
	getInnerWidth:			function()
	{
		return this._bodyDiv.getWidth();
	},
	_renderElements:		function()
	{
		this._element.setHtml('');
		this._element.appendTo(this.renderTo);
		this._element.removeAllClasses();
		var bodyId = 'jsis-'+jsis.uuid();
		this._currentStyle = this.style ? this.style : jsis.settings.defaultStyle;
		this._currentStyleVariant = jsis.settings.blockStyles[this._currentStyle].getVariantName(this);
		this._renderedStyle = jsis.settings.blockStyles[this._currentStyle][this._currentStyleVariant];
		this._renderTemplate(bodyId);
		this._bodyDiv = jsis.find("#"+bodyId);
		this._element.setMultiCss(
		{
			position:		'absolute',
			display:		'none',
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
			width:		width - this._renderedStyle.outerMargins[0] - this._renderedStyle.innerMargins[0],
			height:		height - this._renderedStyle.outerMargins[1] - this._renderedStyle.innerMargins[1]
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
	_renderTemplate:		function(bodyId)
	{
		if ( this.title )
		{
			var titleId = 'jsis-'+jsis.uuid();
			var template = this._renderedStyle.wrapperTitle;
			jsis.$.tmpl( template, {body:"<div id='"+bodyId+"'></div>",title:"<div id='"+titleId+"'></div>"} ).appendTo( "#"+this._element.dom.id );
			this._titleDiv = jsis.find("#"+titleId);
			this._titleDiv.addClass(this._renderedStyle.titleCls);
			this._titlebar.title = this.title;
			this._titlebar.renderTo = this._titleDiv;
			this._titlebar.template = this._renderedStyle.title;
			this._titlebar.show();
		}
		else
		{
			var template = this._renderedStyle.wrapper;
			jsis.$.tmpl( template, {body:"<div id='"+bodyId+"'></div>"} ).appendTo( "#"+this._element.dom.id );
		}
	},
	title:					"",
	computedWidth:			0,
	computedHeight:			0,
	minWidth:				0,
	minHeight:				0,
	_titlebar:				null,
	_currentStyle:			jsis.settings.defaultStyle,
	_currentStyleVariant:	null,
	_titleDiv:				null,
	_bodyDiv:				null,
	_htmlDiv:				null,
	_renderedStyle:			null,
	_uiType:				"AbstractBlockContainer"
});