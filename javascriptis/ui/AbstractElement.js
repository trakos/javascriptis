jsis.ui.AbstractElement = jsis.$class(jsis.core.EventListener, 
{
	$constructor:		function( renderTo )
	{
		this.$super();
		this._div = jsis.find("<div></div>");
		if ( !renderTo )
		{
			renderTo = 'body';
		}
		this.renderTo = jsis.find(renderTo);
		this.render();
	},
	render:			function()
	{
		if ( !this._visible )
		{
			return;
		}
		this._renderElements();
		this.refresh();
	},
	refresh:			function(forceInvisible)
	{
		if ( !forceInvisible && !this._visible )
		{
			return;
		}
		var width = this.computedWidth != null ? this.computedWidth : this.width;
		var height = this.computedHeight != null ? this.computedHeight : this.height;
		this._bodyDiv.setMultiCss(
		{
			width:		width - this._renderedStyle.outerMargins[0] - this._renderedStyle.innerMargins[0],
			height:		height - this._renderedStyle.outerMargins[1] - this._renderedStyle.innerMargins[1]
		});
		this._div.setMultiCss(
		{
			width:		width - this._renderedStyle.outerMargins[0],
			height:		height - this._renderedStyle.outerMargins[1],
			left:		(!this.left && this.left!=0) ? 'auto' : this.left,
			top:		(!this.top && this.top!=0) ? 'auto' : this.top,
			bottom:		(!this.bottom && this.bottom!=0) ? 'auto' : this.bottom,
			right:		(!this.right && this.right!=0) ? 'auto' : this.right
		});
	},
	show:				function()
	{
		this._visible = true;
		this.render();
		this._div.setCss('display','block');
	},
	hide:				function()
	{
		this._visible = false;
		this._div.setCss('display','none');
	},
	getInnerHeight:			function()
	{
		return this._bodyDiv.getHeight();
	},
	getInnerWidth:			function()
	{
		return this._bodyDiv.getWidth();
	},
	getId:					function()
	{
		return this._id;
	},
	title:					"",
	renderTo:				null,
	width:					null,
	height:					null,
	left:					null,
	top:					null,
	bottom:					null,
	right:					null,
	style:					null,
	styleVariant:			null,
	contentHTML:			'',
	computedWidth:			0,
	computedHeight:			0,
	minWidth:				0,
	minHeight:				0,
	_renderElements:		function()
	{
		this._div.setHtml('');
		this._div.appendTo(this.renderTo);
		this._div.removeAllClasses();
		var bodyId = 'jsis-'+jsis.uuid();
		this._currentStyle = this.style ? this.style : jsis.settings.defaultStyle;
		this._currentStyleVariant = jsis.settings.styles[this._currentStyle].getVariantName(this);
		this._renderedStyle = jsis.settings.styles[this._currentStyle][this._currentStyleVariant];
		var template = this.title ? this._renderedStyle.wrapperTitle : this._renderedStyle.wrapper;
		jsis.$.tmpl( this._renderedStyle.wrapper, {body:"<div id='"+bodyId+"'></div>",title:this.title} ).appendTo( "#"+this._div.dom.id );
		this._bodyDiv = jsis.find("#"+bodyId);
		this._div.setMultiCss(
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
		this._div.addClass(this._renderedStyle.wrapCls);
		this._bodyDiv.addClass(this._renderedStyle.bodyCls);
		this.computedHeight = null;
		this.computedWidth = null;
	},
	_id:					'jsis-component-'+jsis.uuid(),
	_currentStyle:			jsis.settings.defaultStyle,
	_currentStyleVariant:	null,
	_uiType:				"AbstractElement",
	_visible:				false,
	_renderedStyle:			null,
	_div:					null,
	_bodyDiv:				null,
	_htmlDiv:				null
});