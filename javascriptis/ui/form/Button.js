jsis.ui.form.Button = jsis.$class(jsis.ui.blocks.Standard, 
{
	$constructor:		function(text)
	{
		this.contentHtml = text;
		this.$super();
		this.show();
		this.width = this._div.getWidth();
		this.hide();
	},
	_renderElements:		function()
	{
		this.$super();
		this._bodyDiv.setCss("overflow", "hidden");
		this._bodyDiv.addListener("click",function(element, e)
		{
			this.fireEvent("click",[this,e]);
		}, this);
	},
	styleVariant:		"button",
	_uiType:			"form.Button"
});