jsis.ui.blocks.Horizontal = jsis.$class(jsis.ui.AbstractMultiBlockContainer, 
{
	_refreshChildren:	function(children, forceInvisible)
	{
		var width = this.getInnerWidth();
		var height = this.getInnerHeight(); 
		var remainingHeight = height;
		var childrenWithAssignedHeight = 0;
		for ( var i in children )
		{
			if ( children[i].height > 1 )
			{
				children[i].computedHeight = children[i].height;
				remainingHeight-= children[i].height;
				childrenWithAssignedHeight++;
			}
		}
		for ( var i in children )
		{
			if ( children[i].height > 0 && children[i].height <= 1 )
			{
				var computedHeight = (height * children[i].height);
				if ( computedHeight < children[i].minHeight )
				{
					computedHeight = children[i].minHeight;
				}
				children[i].computedHeight = computedHeight;	
				remainingHeight-= computedHeight;
				childrenWithAssignedHeight++;
			}
			this._refreshChild(children[i], forceInvisible);
		}
		var remainingChildren = children.length - childrenWithAssignedHeight;
		for ( var i in children )
		{
			if ( children[i].height <= 0 )
			{
				children[i].computedHeight = remainingHeight / remainingChildren;
			}
		}
		var top = 0;
		for ( var i in children )
		{
			children[i].computedWidth = width;
			children[i].bottom = children[i].right = null;
			children[i].top = top;
			children[i].left = 0;
			top += children[i].computedHeight;
			this._refreshChild(children[i], forceInvisible);
		}
	},
	_uiType:			"blocks.Horizontal"
});