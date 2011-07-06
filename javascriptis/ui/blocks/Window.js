jsis.ui.blocks.Window = jsis.$class(jsis.ui.blocks.Pane, 
{
	$constructor:		function(content,titlebar,buttonbar,renderTo)
	{
		this.titlebar = titlebar; 
		this.buttonbar = buttonbar;
		this.$super(content,titlebar,buttonbar,renderTo);
		this.relayEvent(this.titlebar, 'titleClick');
		this.relayEvent(this.titlebar, 'titleMouseUp');
		this.relayEvent(this.titlebar, 'titleMouseDown');
		this.titlebar.addListener("titleMouseDown", function(titlebar,titleComponent,e)
		{
			var dd = jsis.core.DragAndDropManager.get();
			dd.start();
			dd.addListener('move', this.move, this);
		}, this);
	},
	move:				function(x,y)
	{
		if ( this.left + x >= this.renderTo.getWidth() - this.width )
		{
			this.left = this.renderTo.getWidth() - this.width;
		}
		else if ( this.left + x <= 0 )
		{
			this.left = 0;
		}
		else
		{
			this.left += x;
		}
		if ( this.top + y >= this.renderTo.getHeight() - this.height )
		{
			this.top = this.renderTo.getHeight() - this.height;
		}
		else if ( this.top + y <= 0 )
		{
			this.top = 0;
		}
		else
		{
			this.top += y;
		}
		this.refresh();
	},
	setZIndex:			function(zIndex)
	{
		this._div.setCss("z-index",zIndex);
	},
	_renderElements:		function()
	{
		this.$super();
		var manager = jsis.utils.WindowManager.get(this.renderTo);
		manager.addWindow(this);
		this._div.addListener("click", function(element, event)
		{
			return this.fireEvent("focus", [this, event]);
		}, this);
	},
	_onTitleClick:			function(titleComponent,e)
	{
		return this.fireEvent("titleClick", [this,titleComponent,e]);
	},
	_uiType:			"blocks.Window"
});