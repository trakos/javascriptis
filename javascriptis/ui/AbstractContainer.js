jsis.ui.AbstractContainer = jsis.$class(jsis.ui.AbstractElement, 
{
	$constructor:		function( content, renderTo )
	{
		this.content = content || [];
		var renderToObject = null;
		if ( renderTo && renderTo.$jsis$ && renderTo.isAbstractContainer )
		{
			renderToObject = renderTo;
			renderTo = null;
		}
		this.$super(renderTo);
		if ( renderToObject ) 
		{
			renderToObject.content.push(this);
			renderToObject.render();
		}
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
		this._refreshChildren(this._content);
	},
	show:				function()
	{
		this._visible = true;
		this.render();
		this._element.setCss('display',this._displayMode);
		this.refresh();
	},
	refresh:			function(forceInvisible, dontRecurse)
	{
		if ( !forceInvisible && !this._visible )
		{
			return;
		}
		this._refreshElements();
		if ( !dontRecurse )
		{
			this._refreshChildren(this._content, forceInvisible);
		}
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
		child.renderTo = this._element;
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
	isAbstractContainer:1,
	_content:			null,
	_uiType:			"AbstractContainer"
});