jsis.utils.WindowManager = jsis.$class(jsis.core.EventListener, 
{
    $constructor:		function( element, baseZIndex )
    {
		this._baseZIndex = baseZIndex ? baseZIndex : 400;
		this._el = element;
		this._windows = [];
    },
    addWindow:			function( uiWindow )
    {
    	this._addEvents(uiWindow);
    	this._appendWindowToArray(uiWindow);
    	this._updateZIndexes();
    },
    /**
     * WARNING: it does not clear events, so you cannot just move window to other manager ATM!
     */
    removeWindow:		function( uiWindow )
    {
    	this._removeFromWindowArray(uiWindow.getId());
    	this._updateZIndexes();
    },
    bringWindowToFront:	function( uiWindow )
    {
    	this._removeFromWindowArray(uiWindow);
    	this._appendWindowToArray(uiWindow);
    	this._updateZIndexes();
    },
    _onWindowFocus:			function( uiWindow )
    {
    	this.bringWindowToFront(uiWindow);
    },
    _onWindowClose:			function( uiWindow )
    {
    	this.removeWindow(uiWindow);
    },
    _addEvents:				function( uiWindow )
    {
    	uiWindow.addListener("focus", this._onWindowFocus, this);
    	uiWindow.addListener("close", this._onWindowClose, this);
    },
    _removeFromWindowArray:	function( uiWindow )
    {
    	var id = uiWindow.getId();
    	var number = undefined;
    	for ( var i in this._windows )
    	{
    		if ( this._windows[i].getId() == id )
    		{
    			number = i;
    			break;
    		}
    	}
    	if ( number != undefined )
    	{
    		this._windows.splice(number, 1);
    		this._updateZIndexes();
    	}
    	else
    	{
    		throw "ID "+id+" not found in windows!";
    	}
    },
    _appendWindowToArray:	function( uiWindow )
    {
    	this._windows.push(uiWindow);
    },
    _updateZIndexes:	function()
    {
    	for ( var i in this._windows )
    	{
    		this._windows[i].setZIndex(this._baseZIndex+parseInt(i));
    	}
    },
    _windows:			null,
    _el:				null,
    _baseZIndex:		0
},{
	DEFAULT_BASE_Z_INDEX:1000,
	get:				function( element, baseZIndex )
	{
		baseZIndex = baseZIndex ? baseZIndex : this.DEFAULT_BASE_Z_INDEX;
		var name = "jsis.core.WindowManager.instance."+baseZIndex;
		if (!element.data[name] )
		{
			element.data[name] = new this(element);
		}
		return element.data[name];
	}
});