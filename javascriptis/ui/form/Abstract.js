jsis.ui.form.Abstract  = jsis.$class(jsis.ui.AbstractElement,
{
	$constructor:		function()
	{
		this.$super();
	},
	_refreshElements:		function()
	{
		this.$super();
		this._element.addClass("jsis-form-element");
	},
	labelText:			"",
	_uiType:			"form.Abstract",
	__elementName:		"input"
});