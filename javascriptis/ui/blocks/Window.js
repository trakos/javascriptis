jsis.ui.blocks.Window = jsis.$class(jsis.ui.blocks.Vertical, 
{
	$constructor:		function(content,renderTo)
	{
		this.left = this.top = 0;
		this.$super(content,renderTo);
		this._titlebar.addListener("titleMouseDown", function(titlebar,titleComponent,e)
		{
			e.preventDefault();
			jsis.core.DragAndDropManager.get().start().addListener('move', this.move, this);
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
	resize:				function(direction, args)
	{
		var x = args[0];
		var y = args[1];
		if ( direction == 'nw' )
		{
			this.move(x,y);
			this.width-=x;
			this.height-=y;
		}
		else if ( direction == 'n' )
		{
			this.move(0,y);
			this.height-=y;
		}
		else if ( direction == 'ne' )
		{
			this.move(0,y);
			this.width+=x;
			this.height-=y;
		}
		else if ( direction == 'e' )
		{
			this.width+=x;
		}
		else if ( direction == 'se' )
		{
			this.width+=x;
			this.height+=y;
		}
		else if ( direction == 's' )
		{
			this.height+=y;
		}
		else if ( direction == 'sw' )
		{
			this.move(x,0);
			this.width-=x;
			this.height+=y;
		}
		else if ( direction == 'w' )
		{
			this.move(x,0);
			this.width-=x;
		}
		if ( this.width < this.minWidth ) this.width = this.minWidth;
		if ( this.height < this.minHeight ) this.height = this.minHeight;
		this.refresh();
	},
	setZIndex:			function(zIndex)
	{
		this._element.setCss("z-index",zIndex);
	},
	_renderElements:		function()
	{
		this.$super();
		var manager = jsis.utils.WindowManager.get(this.renderTo);
		manager.addWindow(this);
		this._element.addListener("mousedown", function(element, event)
		{
			return this.fireEvent("focus", [this, event]);
		}, this);
	},
	_renderTemplate:		function(bodyId)
	{
		this.$super(bodyId);
		for ( var i in {nw:0,ne:0,sw:0,se:0,n:0,w:0,n:0,e:0,s:0})
		{
			this._resizeHandlers[i] = jsis.find("<div></div>");
			this._resizeHandlers[i].appendTo(this._element);
			this._resizeHandlers[i].addClass("jsis-window-resize-"+i);
			this._resizeHandlers[i].setMultiCss(
			{
				height:		this.handlersSize+'px',
				width:		this.handlersSize+'px',
				position:	"absolute",
				cursor:		i+"-resize",
				background:	'url('+jsis.getEmptyImg()+')',
				'font-size':0
			});
			this._resizeHandlers[i].addListener('mousedown', this._onResize, this, [i]);
		}
	},
	_onResize:				function(resizeDirection, args)
	{
		var e = args[1];
		e.preventDefault();
		this._resizeDirection = resizeDirection;
		var dd = jsis.core.DragAndDropManager.get();
		jsis.core.DragAndDropManager.get().start().addListener('move', this.resize, this, [resizeDirection]);
	},
	_refreshElements:		function()
	{
		this.$super();
		var w = this._element.getWidth();
		var h = this._element.getHeight();
		for ( var i in {nw:0,ne:0,sw:0,se:0,n:0,w:0,n:0,e:0,s:0})
		{
			this._resizeHandlers[i].setCss("z-index", parseInt(this._element.getCss("z-index"))+1);
		}
		this._resizeHandlers['nw'].setCss("top", 0);
		this._resizeHandlers['nw'].setCss("left", 0);
		
		this._resizeHandlers['ne'].setCss("top", 0);
		this._resizeHandlers['ne'].setCss("right", 0);
		
		this._resizeHandlers['sw'].setCss("bottom", 0);
		this._resizeHandlers['sw'].setCss("left", 0);
		
		this._resizeHandlers['se'].setCss("bottom", 0);
		this._resizeHandlers['se'].setCss("right", 0);
		
		this._resizeHandlers['w'].setCss("top", this.handlersSize);
		this._resizeHandlers['w'].setCss("left", 0);
		this._resizeHandlers['w'].setHeight(h-2*this.handlersSize);
		
		this._resizeHandlers['n'].setCss("top", 0);
		this._resizeHandlers['n'].setCss("left", this.handlersSize);
		this._resizeHandlers['n'].setWidth(w-2*this.handlersSize);
		
		this._resizeHandlers['e'].setCss("top", this.handlersSize);
		this._resizeHandlers['e'].setCss("right", 0);
		this._resizeHandlers['e'].setHeight(h-2*this.handlersSize);
		
		this._resizeHandlers['s'].setCss("bottom", 0);
		this._resizeHandlers['s'].setCss("left", this.handlersSize);
		this._resizeHandlers['s'].setWidth(w-2*this.handlersSize);
	},
	_onTitleClick:			function(titleComponent,e)
	{
		return this.fireEvent("titleClick", [this,titleComponent,e]);
	},
	_resizeHandlers:	[],
	_uiType:			"blocks.Window",
	_resizeDirection:	null,
	handlersSize:		5,
	minWidth:			15,
	minHeight:			55
});