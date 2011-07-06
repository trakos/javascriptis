jsis.ui.titlebar.Title = jsis.$class(jsis.ui.blocks.Standard, 
{
	$constructor:		function(title)
	{
		this.contentHtml = title;
		this.$super();
	},
	width:					0,
	_renderElements:		function()
	{
		this.$super();
		this._bodyDiv.setCss("overflow", "hidden");
		this._bodyDiv.addListener('click', this._onTitleClick, this);
		this._bodyDiv.addListener('mousedown', this._onTitleDown, this);
		this._bodyDiv.addListener('mouseup', this._onTitleUp, this);
	},
	_onTitleClick:			function(element,e)
	{
		return this.fireEvent("click", [this,e]);
	},
	_onTitleDown:			function(element,e)
	{
		e.preventDefault();
		return this.fireEvent("mousedown", [this,e]);
	},
	_onTitleUp:				function(element,e)
	{
		return this.fireEvent("mouseup", [this,e]);
	},
	styleVariant:		"empty",
	_uiType:			"titlebar.Title"
});