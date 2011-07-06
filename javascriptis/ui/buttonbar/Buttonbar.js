jsis.ui.buttonbar.Buttonbar = jsis.$class(jsis.ui.blocks.Vertical, 
{
	$constructor:		function()
	{
		this.$super();
		this.layout = this.$self.LEFT;
	},
	_getContent:		function()
	{
		var content = [];
		if ( this.layout == 'right' || this.layout == 'center' )
			content.push(new jsis.ui.blocks.Empty());
		for ( var i in this.buttons )
		{
			content.push(new jsis.ui.buttonbar.Button(this.buttons[i]));
		}
		if ( this.layout == 'left' || this.layout == 'center' )
			content.push(new jsis.ui.blocks.Empty());
		return content;
	},
	_uiType:			"buttonbar.Buttonbar",
	layout:				null,
	buttons:			[],
	height:				20,
	styleVariant:		"empty"
},{
	LEFT:		'left',
	RIGHT:		'right',
	CENTER:		'center'
});