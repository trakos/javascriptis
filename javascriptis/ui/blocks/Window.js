jsis.ui.blocks.Window = jsis.$class(jsis.ui.blocks.Vertical, 
{
	$constructor:		function(content,renderTo)
	{
		this.left = this.top = 0;
		this.$super(content,renderTo);
		this._resizeHandlers = [];
		this.titlebar.addListener("titleMouseDown", function(titlebar,e)
		{
			e.preventDefault();
			this._overflowBeforeResize = this._bodyDiv.getCss('overflow');
			this._bodyDiv.setCss('overflow','hidden');
			jsis.core.DragAndDropManager.get().start().addListener('move', this.move, this);
			jsis.core.DragAndDropManager.get().start().addListener('drop', this.endDrag, this);
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
		this.refresh(0,1);
	},
	resize:				function(direction, args)
	{
		var x = args[0];
		var y = args[1];
		var moveX = 0;
		var moveY = 0;
		if ( direction == 'nw' )
		{
			this.width-=x;
			this.height-=y;
			moveX = x;
			moveY = y;
		}
		else if ( direction == 'n' )
		{
			if ( !this.titlebar.hasDataToShow() )
			{
				// in case of lack of titlebar, let north resize work as a move handler
				moveX = x;
				moveY = y;
			}
			else
			{
				this.height-=y;
				moveY = y;
			}
		}
		else if ( direction == 'ne' )
		{
			this.width+=x;
			this.height-=y;
			moveY = y;
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
			this.width-=x;
			this.height+=y;
			moveX = x;
		}
		else if ( direction == 'w' )
		{
			this.width-=x;
			moveX = x;
		}
		if ( this.width < this.minWidth )
		{
			this.width = this.minWidth;
			moveX = 0;
		}
		if ( this.height < this.minHeight )
		{
			this.height = this.minHeight;
			moveY = 0;
		}
		this.move(moveX,moveY); 
		if ( this.windowResizeOnTheFly )
		{
			this.refresh();
		}
		else
		{
			this.refresh(0,1);
		}
	},
	setZIndex:			function(zIndex)
	{
		this._element.setCss("z-index",zIndex);
	},
	takeWindowFocus:	function()
	{
		this._element.removeClass("jsis-window-focused");
		this.windowFocused = 0;
	},
	giveWindowFocus:	function()
	{
		this._element.addClass("jsis-window-focused");
		this.windowFocused = 1;
	},
	windowMaximize:		function()
	{
		this._widthBeforeMaximize = this.width;
		this._heightBeforeMaximize = this.height;
		this._leftBeforeMaximize = this.left;
		this._topBeforeMaximize = this.top;
		this.width = this.renderTo.getWidth();
		this.height = this.renderTo.getHeight();
		this.left = this.top = 0;
		this.windowMaximized = true;
		this.refresh();
	},
	windowRestore:		function()
	{
		this.width = this._widthBeforeMaximize;
		this.height = this._heightBeforeMaximize;
		this.left = this._leftBeforeMaximize;
		this.top = this._topBeforeMaximize;
		this.windowMaximized = false;
		this.refresh();
	},
	windowClose:		function()
	{
		// @todo
		this.hide();
	},
	endDrag:			function()
	{
		this._bodyDiv.setCss('overflow',this._overflowBeforeResize);
		this.refresh();
	},
	_renderElements:	function()
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
		if ( !this.titlebar.hasDataToShow() )
		{
			// in case of lack of titlebar, let north resize work as a move handler!
			this._resizeHandlers['n'].setCss('cursor', 'move');
		}
	},
	_onResize:				function(resizeDirection, args)
	{
		var e = args[1];
		e.preventDefault();
		this._resizeDirection = resizeDirection;
		this._overflowBeforeResize = this._bodyDiv.getCss('overflow');
		this._bodyDiv.setCss('overflow','hidden');
		jsis.core.DragAndDropManager.get().start().addListener('move', this.resize, this, [resizeDirection]);
		jsis.core.DragAndDropManager.get().start().addListener('drop', this.endDrag, this);
	},
	_refreshElements:		function()
	{
		this.$super();
		if ( this.windowResizeable )
		{
			var w = this._element.getWidth();
			var h = this._element.getHeight();
			for ( var i in {nw:0,ne:0,sw:0,se:0,n:0,w:0,n:0,e:0,s:0})
			{
				this._resizeHandlers[i].setCss("display", "block");
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
		}
		else
		{
			for ( var i in {nw:0,ne:0,sw:0,se:0,n:0,w:0,n:0,e:0,s:0})
			{
				this._resizeHandlers[i].setCss("display", "none");
			}
		}
	},
	_onTitleClick:			function(titleComponent,e)
	{
		return this.fireEvent("titleClick", [this,titleComponent,e]);
	},
	_resizeHandlers:		null,
	_uiType:				"blocks.Window",
	_resizeDirection:		null,
	_widthBeforeMaximize:	100,
	_heightBeforeMaximize:	100,
	_leftBeforeMaximize:	0,
	_rightBeforeMaximize:	0,
	_overflowBeforeResize:	'',
	windowResizeOnTheFly:	0,
	windowResizeable:		1,
	windowMaximized:		0,
	windowFocused:			0,
	handlersSize:			5,
	minWidth:				15,
	minHeight:				65
});