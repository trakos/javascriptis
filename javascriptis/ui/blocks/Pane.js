jsis.ui.blocks.Pane = jsis.$class(jsis.ui.blocks.Fit, 
{
	$constructor:		function(content,renderTo)
	{
		//this.buttonbar = buttonbar;
		this.$super(content,renderTo);
	},
	/*_getContent:		function()
	{
		var content = [];
		content.push(this.titlebar);
		this.content.height = 0;
		content.push(this.content);
		content.push(this.buttonbar);
		return content;
	},*/
	_uiType:			"blocks.Pane"
});