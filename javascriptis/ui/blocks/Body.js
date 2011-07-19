jsis.ui.blocks.Body = jsis.$class(jsis.ui.blocks.Fit, 
{
	$constructor:		function( content )
	{
		this.$super(content, "body");
		var resizeEventHandler = jsis.$delegate(this.refresh, this);
		jsis.$(window).resize(resizeEventHandler);
	},
	_renderElements:	function()
	{
		this.renderTo = jsis.find("body");
		this.$super();
	},
	_refreshElements:	function()
	{
		var overflow = jsis.find('body').getCss("overflow");
		jsis.find('body').setCss("overflow", "hidden");
		this.width = jsis.$(window).width();
		this.height = jsis.$(window).height();
		jsis.find('body').setCss("overflow", overflow);
		this.top = this.left = 0; 
		this.bottom = this.right = null;
		this.$super();
	},
	_uiType:			"blocks.Body"
});