jsis.ui.AbstractSingleBlockContainer = jsis.$class(jsis.ui.AbstractBlockContainer, 
{
	_normalizeContent:	function(content)
	{
		this.$super(content);
		if ( this._content.length != 1 )
		{
			this._content = [];
			console.error("this container is of an one-child-only type, and it has received "+this._content.length+" elements!");
		}
	},
	_uiType:			"AbstractSingleBlockContainer"
});