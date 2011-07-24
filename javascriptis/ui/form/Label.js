jsis.ui.form.Label  = jsis.$class(jsis.ui.form.Abstract,
{
	$constructor:		function()
	{
		this.$super();
	},
	_refreshElements:		function()
	{
		this.$super();
		this._element.addClass("jsis-form-label");
		this._element.setAttr("for", this.inputId);
		this._element.setHtml(this.labelText);
	},
	inputId:			0,
	_uiType:			"form.Abstract",
	__elementName:		"label"
});