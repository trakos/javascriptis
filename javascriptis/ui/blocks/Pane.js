jsis.ui.blocks.Pane = jsis.$class(jsis.ui.blocks.Horizontal, 
{
	$constructor:		function(content,titlebar,buttonbar,renderTo)
	{
		this.titlebar = titlebar;
		this.buttonbar = buttonbar;
		this.$super(content,renderTo);
	},
	_getContent:		function()
	{
		var content = [];
		content.push(this.titlebar);
		this.content.height = 0;
		content.push(this.content);
		content.push(this.buttonbar);
		return content;
	},
	_uiType:			"blocks.Pane"
});