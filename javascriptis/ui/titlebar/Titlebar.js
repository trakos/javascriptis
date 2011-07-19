jsis.ui.titlebar.Titlebar = jsis.$class(jsis.ui.AbstractElement, 
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
		for ( var i in this.buttons )
		{
			content.push(new jsis.ui.titlebar.Button(this.buttons[i]));
		}
		return content;
	},
	_renderElements:		function()
	{
		this.$super();
		this._element.setCss("overflow", "hidden");
		jsis.$.tmpl( this.template, { title: this.title, iconSrc: this.iconSrc }).appendTo( "#"+this._element.dom.id );
		this._element.addListener('click', this._onTitleClick, this);
		this._element.addListener('mousedown', this._onTitleDown, this);
		this._element.addListener('mouseup', this._onTitleUp, this);
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
	title:				'',
	template:			jsis.emptyTpl,
	iconSrc:			jsis.getEmptyImg(),
	leftbuttons:		[],
	rightButtons:		[],
	_uiType:			"titlebar.Titlebar"
},{
	X:			'<span>x</span>'
});