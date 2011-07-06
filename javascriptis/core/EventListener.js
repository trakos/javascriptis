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
    addListener:		function(eventName, eventHandler, eventScope, eventOptions)
    {
    	eventName = '' + eventName + '';
    	eventName = eventName.toLowerCase();
    	eventScope = eventScope ? eventScope : this;
    	eventOptions = eventOptions ? eventOptions : {};
    	if( !this._events[eventName] )
    	{
    		this._addEvent(eventName);
    	}
    	this._events[eventName].addListener(eventHandler, eventScope, eventOptions);
    },
    addListeners:		function(listeners)
    {
    	for ( var i in listeners )
    	{
    		this.addListener(i, listeners[i].handler, listeners[i].scope, listeners[i].options);
    	}
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
    },
    relayEvent:			function(from, eventName)
    {
    	from.addListener(eventName, function()
    	{
    		return this.fireEvent(eventName, arguments);
    	}, this);
    },
    /**
     * @var string eventName nazwa eventu
     * @var function onFirstEventHandler funkcja wywoływana przy pierwszym dodaniu listenera, przydatna do dodania np. konieczne listenera do obsługi eventu dopiero gdy jest potrzebny, argumenty: 
     * 		@arg scope instancja klasy implementującej eventListenera
     * 		@arg instancja jsis.Event, którą aktualnie dodajemy
     * 		@arg onFirstEventHandlerArgument otrzymany argument
     * @var onFirstEventHandlerArgument argument do handleru
     */
    _addEvent:			function(eventName, onFirstEventHandler, onFirstEventHandlerArgument)
    {
    	onFirstEventHandler = onFirstEventHandler || jsis.EMPTYFN;
    	this._events[eventName] = new jsis.core.Event(eventName, this, onFirstEventHandler, onFirstEventHandlerArgument);
    },
    // protected
	_eventsSuspended:	false,
	_events:			null
});