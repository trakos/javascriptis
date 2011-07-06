jsis.ui.blocks.Standard = jsis.$class(jsis.ui.AbstractZeroContainer, 
{
	_uiType:			"blocks.Standard",
	contentHtml:		"",
	refresh:			function(forceInvisible)
	{
		this.$super(forceInvisible);
		this._bodyDiv.setHtml( this.contentHtml );
	}
});