jsis.ui.AbstractContainer = jsis.$class(jsis.ui.AbstractElement, 
{
	$constructor:		function( content, renderTo )
	{
		this.content = content;
		this.$super(renderTo);
	},
	render:			function(dontRecurse)
	{
		if ( !this._visible )
		{
			return;
		}
		this._renderElements();
		this.refresh(false, true);
		this._normalizeContent(this._getContent());
		this._renderChildren(this._content);
	},
	refresh:			function(forceInvisible, dontRecurse)
	{
		this.$super(forceInvisible, dontRecurse);
		if ( !dontRecurse )
		{
			this._refreshChildren(this._content, forceInvisible);
		}
	},
	show:				function()
	{
		this._visible = true;
		this.render();
		this._div.setCss('display','block');
		this.refresh();
	},
	_getContent:		function()
	{
		return this.content;
	},
	_renderChildren:	function(children)
	{
		for ( var i in children )
		{
			this._renderChild(children[i]);
		}
	},
	_refreshChildren:	function(children, forceInvisible)
	{
		for ( var i in children )
		{
			this._refreshChild(children[i], forceInvisible);
		}
	},
	_renderChild:		function(child)
	{
		child.renderTo = this._bodyDiv;
		child.show();
	},
	_refreshChild:		function(child, forceInvisible)
	{
		child.refresh(forceInvisible);
	},
	_normalizeContent:	function(content)
	{
		if ( jsis.$isArray(content) )
		{
			this._content = jsis.$clone1d(content);
		}
		else if ( !content )
		{
			this._content = [];
		}
		else
		{
			this._content = [ content ];
		}
	},
	content:			null,
	_content:			null,
	_uiType:			"AbstractContainer"
});