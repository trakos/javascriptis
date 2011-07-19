jsis.ui.blocks.Standard = jsis.$class(jsis.ui.AbstractZeroBlockContainer, 
{
	_uiType:			"blocks.Standard",
	contentHtml:		"",
	refresh:			function(forceInvisible)
	{
		this.$super(forceInvisible);
		this._bodyDiv.setHtml( this.contentHtml );
	}
});