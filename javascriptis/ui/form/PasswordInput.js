jsis.ui.form.PasswordInput  = jsis.$class(jsis.ui.form.TextInput,
{
	$constructor:		function()
	{
		this.$super();
		this._element.setAttr('type', 'password');
	},
	_uiType:			"form.PasswordInput"
});