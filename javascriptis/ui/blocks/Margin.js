jsis.ui.blocks.Margin = jsis.$class(jsis.ui.AbstractSingleBlockContainer, 
{
	refresh:			function(forceInvisible, dontRecurse)
	{
		this.$super(forceInvisible, dontRecurse);
		this._htmlDiv.setHtml(this.contentHtml);
	},
	_refreshChild:		function(child, forceInvisible)
	{
		child.top = this.marginHorizontal;
		child.left = this.marginVertical;
		child.width = this.getInnerWidth() - 2*this.marginVertical;
		child.height = this.getInnerHeight() - 2*this.marginHorizontal;
		child.refresh(forceInvisible);
	},
	_renderElements:	function()
	{
		this.$super();
		this._htmlDiv = jsis.find("<div></div>");
		this._htmlDiv.addClass("jsis-html");
		this._htmlDiv.appendTo(this._bodyDiv);
	},
	marginVertical:		50,
	marginHorizontal:	50,
	contentHtml:		"",
	_htmlDiv:			null,
	_uiType:			"blocks.Margin"
});