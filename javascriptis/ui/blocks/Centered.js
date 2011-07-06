jsis.ui.blocks.Centered = jsis.$class(jsis.ui.AbstractSingleContainer, 
{
	refresh:			function(forceInvisible, dontRecurse)
	{
		this.$super(forceInvisible, dontRecurse);
		this._htmlDiv.setHtml(this.contentHtml);
	},
	_refreshChild:		function(child, forceInvisible)
	{
		child.top = (this.getInnerHeight() - child.height) / 2;
		child.left = (this.getInnerWidth() - child.width) / 2;
		child.refresh(forceInvisible);
	},
	_renderElements:	function()
	{
		this.$super();
		this._htmlDiv = jsis.find("<div></div>");
		this._htmlDiv.addClass("jsis-html");
		this._htmlDiv.appendTo(this._bodyDiv);
	},
	contentHtml:		"",
	_htmlDiv:			null,
	_uiType:			"blocks.Centered"
});