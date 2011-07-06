jsis.ui.buttonbar.Button = jsis.$class(jsis.ui.form.Button, 
{
	$constructor:		function(text)
	{
		this.$super(text);
		this.show();
		this.width = this._div.getWidth()+5;
		this.hide();
	},
	_uiType:			"buttonbar.Button"
});