jsis.ui.form.TextInput  = jsis.$class(jsis.ui.form.Abstract,
{
	$constructor:		function()
	{
		this.$super();
		this._element.setAttr('type', 'text');
	},
	_refreshElements:		function()
	{
		this.$super();
		this._element.addClass("jsis-form-text-input");
		this._element.setAttr("tabindex", this.tabIndex);
	},
	getValue:				function()
	{
		return this._element.getValue();
	},
	setValue:				function(value)
	{
		this._element.setValue(value);
	},
	buttonText:			'',
	tabIndex:			1,
	_uiType:			"form.TextInput"
});