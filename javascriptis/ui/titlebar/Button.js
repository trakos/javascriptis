jsis.ui.titlebar.Button = jsis.$class(jsis.ui.AbstractElement,
{
	$constructor:		function()
	{
		this.$super();
		// CHAIN_INVERT because it should return false by default, so no the titlebar can be moved, but a handler can override this setting.
		this._addEvent("buttonMouseDown", null, null, jsis.core.Event.CHAIN_INVERT);
		this._element.setAttr("href","#");
		this._element.addListener('click', this._onButtonClick, this);
		this._element.addListener('dblclick', this._onButtonDoubleClick, this);
		this._element.addListener('mousedown', this._onButtonDown, this);
		this._element.addListener('mouseup', this._onButtonUp, this);
		this._element.addListener('mouseleave', this._onButtonMouseOut, this);
	},
	_renderElements:	function()
	{
		this.$super();
		jsis.$.tmpl( this.template, {iconClass:this.buttonId} ).appendTo( "#"+this._element.dom.id );
		if ( this.clsStyleName )
		{
			this._element.addClass(this.clsStyleName);
		}
		this._element.addClass(this.clsName);
	},
	_onButtonClick:			function(titleComponent,e)
	{
		return this.fireEvent("buttonClick", [this,titleComponent,e]);
	},
	_onButtonUp:				function(titleComponent,e)
	{
		this._element.removeClass('jsis-active');
		return this.fireEvent("buttonMouseUp", [this,titleComponent,e]);
	},
	_onButtonDown:			function(titleComponent,e)
	{
		this._element.addClass('jsis-active');
		return this.fireEvent("buttonMouseDown", [this,titleComponent,e]);
	},
	_onButtonDoubleClick:	function(titleComponent,e)
	{
		return this.fireEvent("buttonDoubleClick", [this,titleComponent,e]);
	},
	_onButtonMouseOut:		function(titleComponent,e)
	{
		this._element.removeClass('jsis-active');
	},
	clsName:			'',
	clsStyleName:		'',
	template:			'',
	buttonId:			'',
	_uiType:			"titlebar.Button",
	__elementName:		"a"
});