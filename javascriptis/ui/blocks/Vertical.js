jsis.ui.blocks.Vertical = jsis.$class(jsis.ui.AbstractMultiBlockContainer, 
{
	_refreshChildren:	function(children, forceInvisible)
	{
		var width = this.getInnerWidth();
		var height = this.getInnerHeight(); 
		var remainingWidth = width;
		var childrenWithAssignedWidth = 0;
		for ( var i in children )
		{
			if ( children[i].width > 1 )
			{
				children[i].computedWidth = children[i].width;
				remainingWidth-= children[i].width;
				childrenWithAssignedWidth++;
			}
		}
		for ( var i in children )
		{
			if ( children[i].width > 0 && children[i].width <= 1 )
			{
				var computedWidth = (width * children[i].width);
				if ( computedWidth < children[i].minWidth )
				{
					computedWidth = children[i].minWidth;
				}
				children[i].computedWidth = computedWidth;	
				remainingWidth-= computedWidth;
				childrenWithAssignedWidth++;
			}
			this._refreshChild(children[i], forceInvisible);
		}
		var remainingChildren = children.length - childrenWithAssignedWidth;
		for ( var i in children )
		{
			if ( children[i].width <= 0 )
			{
				children[i].computedWidth = remainingWidth / remainingChildren;
			}
		}
		var left = 0;
		for ( var i in children )
		{
			children[i].computedHeight = height;
			children[i].bottom = children[i].right = null;
			children[i].top = 0;
			children[i].left = left;
			left += children[i].computedWidth;
			this._refreshChild(children[i], forceInvisible);
		}
	},
	_uiType:			"blocks.Vertical"
});