jsis.ui.AbstractZeroContainer = jsis.$class(jsis.ui.AbstractElement, 
{
	_normalizeContent:	function(content)
	{
		this.$super(_content);
		if ( this._content.length )
		{
			this._content = [];
			throw "this element is not really a container and it has received "+this._content.length+" child elements in property 'content'!"; 
		}
	},
	_uiType:			"AbstractZeroContainer"
});