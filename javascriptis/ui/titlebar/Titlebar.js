jsis.ui.titlebar.Titlebar = jsis.$class(jsis.ui.blocks.Vertical, 
{
	$constructor:		function()
	{
		this.$super();
	},
	_getContent:		function()
	{
		var content = [];
		for ( var i in this.frontButtons )
		{
			content.push(new jsis.ui.titlebar.Button(this.frontButtons[i]));
		}
		this._titleComponent = new jsis.ui.titlebar.Title(this.title);
		content.push(this._titleComponent);
		this._titleComponent.addListener('click', this._onTitleClick, this);
		this._titleComponent.addListener('mousedown', this._onTitleDown, this);
		this._titleComponent.addListener('mouseup', this._onTitleUp, this);
		for ( var i in this.buttons )
		{
			content.push(new jsis.ui.titlebar.Button(this.buttons[i]));
		}
		return content;
	},
	_renderElements:		function()
	{
		this.$super();
		this._bodyDiv.setCss("overflow", "hidden");
	},
	_onTitleClick:			function(titleComponent,e)
	{
		return this.fireEvent("titleClick", [this,titleComponent,e]);
	},
	_onTitleUp:				function(titleComponent,e)
	{
		return this.fireEvent("titleMouseUp", [this,titleComponent,e]);
	},
	_onTitleDown:			function(titleComponent,e)
	{
		return this.fireEvent("titleMouseDown", [this,titleComponent,e]);
	},
	_uiType:			"titlebar.Titlebar",
	_titleComponent:	null,
	title:				'',
	styleVariant:		"empty",
	buttons:			[],
	frontButtons:		[],
	height:				20
},{
	X:			'<span>x</span>'
});