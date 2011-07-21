jsis.ui.titlebar.Titlebar = jsis.$class(jsis.ui.AbstractElement, 
{
	$constructor:		function()
	{
		this.$super();
	},
	_renderElements:		function()
	{
		this.$super();
		this._element.setCss("overflow", "hidden");
		jsis.$.tmpl( this.template, { title: this.title, iconSrc: this.iconSrc }).appendTo( "#"+this._element.dom.id );
		console.log(this._element.dom.id);
		this._element.addListener('click', this._onTitleClick, this);
		this._element.addListener('click', this._onTitleClick, this);
		this._element.addListener('mousedown', this._onTitleDown, this);
		this._element.addListener('mouseup', this._onTitleUp, this);
	},
	_onTitleClick:			function(titleComponent,e)
	{
		console.log('titleclick');
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