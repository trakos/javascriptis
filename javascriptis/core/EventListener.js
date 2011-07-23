jsis.core.EventListener = jsis.$class(jsis.Base, 
{
    $constructor:		function( )
    {
		this._events = {};
    },
    // public
	fireEvent:			function(eventName, eventArguments)
	{
    	if(this._eventsSuspended === true)
    	{
    		return;
    	}
    	eventName = eventName.toLowerCase();
    	eventArguments = eventArguments || [];
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	var event = this._events[eventName];
    	return event.fire(eventArguments);
    },
    /**
     * If eventArguments not given or false, the function will receive arguments given to the event during fireEvent
     * Otherwise, the arguments will be taken from the args value, and  the array with arguments from fireEvent will be appended as last argument
     * @return listenerId, which can be used with removeListenerById method
     */
    addListener:		function(eventName, eventHandler, eventScope, eventArguments, eventOptions)
    {
    	eventName = '' + eventName + '';
    	eventName = eventName.toLowerCase();
    	eventScope = eventScope ? eventScope : this;
    	eventOptions = eventOptions ? eventOptions : {};
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	return this._events[eventName].addListener(eventHandler, eventScope, eventArguments, eventOptions);
    },
    addListeners:		function(listeners)
    {
    	for ( var i in listeners )
    	{
    		this.addListener(i, listeners[i].handler, listeners[i].scope, listeners[i].arguments, listeners[i].options);
    	}
    	return this;
    },
    removeListener:		function(eventName, eventHandler)
    {
    	eventName = eventName.toLowerCase();
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	var event = this._events[eventName];
    	this._events[eventName].removeListener(eventHandler);
    	return this;
    },
    removeListenerById:	function(eventName, eventHandlerId)
    {
    	eventName = eventName.toLowerCase();
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	var event = this._events[eventName];
    	this._events[eventName].removeListenerById(eventHandlerId);
    	return this;
    },
    removeAllListeners:	function(eventName)
    {
    	eventName = eventName.toLowerCase();
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	var event = this._events[eventName];
    	event.removeAllListeners();
    	return this;
    },
    relayEvent:			function(from, eventName, prependArgument)
    {
    	if ( prependArgument != undefined )
    	{
	    	from.addListener(eventName, function(firstArgument, arguments)
	    	{
	    		var newargs = Array.prototype.slice.call(arguments);
	    		newargs.unshift(firstArgument);
	    		return this.fireEvent(eventName, newargs);
	    	}, this, [prependArgument]);
    	}
	    else
	    {
	    	from.addListener(eventName, function()
	    	{
	    		return this.fireEvent(eventName, arguments);
	    	}, this);
	    }
    	return this;
    },
    setEventChainType:	function(eventName,chainType)
    {
    	eventName = eventName.toLowerCase();
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	this._events[eventName].setEventChainType(chainType);
    },
    /**
     * Make sure you call this function only BEFORE any other job is done with events - especially before any listener is added - as it resets all handlers attached to this event
     * @todo make it preserve the events as mentioned above
     * @var string eventName nazwa eventu
     * @var function onFirstEventHandler funkcja wywoływana przy pierwszym dodaniu listenera, przydatna do dodania np. konieczne listenera do obsługi eventu dopiero gdy jest potrzebny, argumenty: 
     * 		@arg scope instancja klasy implementującej eventListenera
     * 		@arg instancja jsis.Event, którą aktualnie dodajemy
     * 		@arg onFirstEventHandlerArgument otrzymany argument
     * @var onFirstEventHandlerArgument argument do handleru
     */
    _addEvent:			function(eventName, onFirstEventHandler, onFirstEventHandlerArgument, eventChainType)
    {
    	eventName = eventName.toLowerCase();
    	onFirstEventHandler = onFirstEventHandler || jsis.EMPTYFN;
    	this._events[eventName] = new jsis.core.Event(eventName, this, onFirstEventHandler, onFirstEventHandlerArgument, eventChainType);
    },
    // protected
	_eventsSuspended:	false,
	_events:			null
});