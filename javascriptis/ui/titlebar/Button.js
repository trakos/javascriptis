jsis.ui.titlebar.Button = jsis.$class(jsis.ui.form.Button,
{
	$constructor:		function(text)
	{
		this.$super(text);
		this.width = 20;
	},
	_uiType:			"titlebar.Button"
});