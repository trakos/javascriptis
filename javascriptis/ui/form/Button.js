jsis.ui.form.Button  = jsis.$class(jsis.ui.AbstractElement,
{
	$constructor:		function()
	{
		this.$super();
		// CHAIN_INVERT because it should return false by default, so no the titlebar can be moved, but a handler can override this setting.
		this._addEvent("buttonMouseDown", null, null, jsis.core.Event.CHAIN_INVERT);
		this._element.setAttr('type', 'button');
		this._element.addListener('click', this._onButtonClick, this);
		this._element.addListener('dblclick', this._onButtonDoubleClick, this);
		this._element.addListener('mousedown', this._onButtonDown, this);
		this._element.addListener('mouseup', this._onButtonUp, this);
		this._element.addListener('mouseleave', this._onButtonMouseOut, this);
	},
	_refreshElements:		function()
	{
		this._element.setAttr('value', this.buttonText);
		this._element.addClass("jsis-form-button");
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
	buttonText:			'',
	_uiType:			"form.Button",
	__elementName:		"input"
});