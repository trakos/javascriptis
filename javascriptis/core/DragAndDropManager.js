jsis.core.DragAndDropManager = jsis.$class(jsis.core.EventListener, 
{
    start:				function()
    {
    	if ( this._currentlyListening == 0 )
    	{
    		this._addMoveEvents();
    	}
    	this._currentlyListening++;
    	return this;
    },
    _onMove:			function(el,e)
    {
    	if ( this._currentX != -1 && this._currentY != -1 )
    	{
    		this.fireEvent('move', [e.pageX - this._currentX , e.pageY - this._currentY,e,this]);
    	}
		this._currentX = e.pageX;
		this._currentY = e.pageY;
    },
    _onUp:			function(e)
    {
    	this.fireEvent('drop', [e,this]);
    	this._removeMoveEvents();
    },
    _addMoveEvents:			function()
    {
    	jsis.find('body').addListener('mousemove', this._onMove, this);
    	jsis.find('body').addListener('mouseup', this._onUp, this);
    },
    _removeMoveEvents:		function()
    {
    	this._currentX = this._currentY = -1;
    	this._currentlyListening = 0;
    	jsis.find('body').removeListener('mousemove', this._onMove);
    	jsis.find('body').removeListener('mouseup', this._onUp);
    	this.removeAllListeners('move');
    	this.removeAllListeners('drop');
    },
    _currentX:			-1,
    _currentY:			-1,
    _currentlyListening:0
},{
	instance:			null,
	get:				function()
	{
		if (!this.instance)
		{
			this.instance = new this();
		}
		return this.instance;
	}
});