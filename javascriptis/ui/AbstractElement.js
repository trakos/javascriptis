jsis.ui.AbstractElement = jsis.$class(jsis.core.EventListener, 
{
	$constructor:		function( renderTo )
	{
		this.$super();
		this._element = jsis.find("<"+this.__elementName+" />");
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
		this.fireEvent('rendered');
	},
	refresh:			function(forceInvisible)
	{
		if ( !forceInvisible && !this._visible )
		{
			return;
		}
		this._refreshElements();
	},
	show:				function()
	{
		this._visible = true;
		this.render();
		this._element.setCss('display',this._displayMode);
		this.refresh();
	},
	hide:				function()
	{
		this._visible = false;
		this._element.setCss('display','none');
	},
	getId:					function()
	{
		return this._element.dom.id;
	},
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
	_renderElements:		function()
	{
		this._element.recreate();
		this._element.setHtml('');
		this._element.appendTo(this.renderTo);
		this._element.removeAllClasses();
	},
	_refreshElements:		function()
	{
	},
	_id:					'',
	_uiType:				"AbstractElement",
	_visible:				false,
	_displayMode:			'block',
	_element:				null,
	__elementName:			'div'
});