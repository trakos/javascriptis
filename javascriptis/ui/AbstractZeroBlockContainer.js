jsis.ui.AbstractZeroBlockContainer = jsis.$class(jsis.ui.AbstractBlockContainer, 
{
	$constructor:		function( renderTo )
	{
		this.$super([], renderTo);
	},
	_normalizeContent:	function(content)
	{
		this.$super(content);
		if ( this._content && this._content.length > 0 )
		{
			console.error("this element is not really a container and it has received "+this._content.length+" child elements in property 'content'!");
			throw "this element is not really a container and it has received "+this._content.length+" child elements in property 'content'!"; 
		}
	},
	_uiType:			"AbstractZeroBlockContainer"
});