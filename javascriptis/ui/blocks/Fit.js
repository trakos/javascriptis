jsis.ui.blocks.Fit = jsis.$class(jsis.ui.AbstractSingleBlockContainer, 
{
	_refreshChild:		function(child, forceInvisible)
	{
		child.top = child.left = child.right = child.bottom = undefined;
		child.width = this.getInnerWidth();
		child.height = this.getInnerHeight();
		child.refresh(forceInvisible);
	},
	_uiType:			"blocks.Centered"
});