jsis.core.Event = jsis.$class(jsis.Base, 
{
	$constructor:		function(eventName, eventOwner, firstEventHandler, firstEventHandlerArguments, eventChainType)
	{
		this._name = eventName;
		this._owner = eventOwner;
		this._firstHandler = firstEventHandler;
		this._firstHandlerArguments = firstEventHandlerArguments;
		this._eventChainType = ( eventChainType == undefined ? this.$self.CHAIN_IGNORE_UNDEFINED : eventChainType);
		this.$setValues(
		{
			_handlers:				{},
			_scopes:				{},
			_options:				{},
			_arguments:				{}
		});
	},
	// public
	setEventChainType:	function(eventChainType)
	{
		this._eventChainType = eventChainType;
	},
	defaultOptions:
	{
		runOnce:		false
	},
	addListener:		function(eventHandler, eventScope, eventArguments, eventOptions)
	{
		if ( !this._isInitialized )
		{
			this._isInitialized = true;
			this._firstHandler( this._owner, this, this._firstHandlerArguments );
		}	
		var mergedOptions = {};
		for( var i in this.defaultOptions )
		{
			mergedOptions[i] = (typeof eventOptions[i] != 'undefined')?eventOptions[i]:this.defaultOptions[i];
		}
		var id = jsis.uuid();
		this._handlers[id] = eventHandler;
		this._scopes[id] = eventScope;
		this._arguments[id] = eventArguments;
		this._options[id] = mergedOptions;
		return id;
	},
	fire:				function(eventArguments)
	{
		var result = true;
		if ( this._eventChainType & this.$self.CHAIN_INVERT )
		{
			result = false;
		}
		for( var k in this._handlers )
		{
			var scope = this._scopes[k];
			scope = scope || this._owner;
			var newargs = eventArguments;
			if ( this._arguments[k] )
			{
				newargs = jsis.$clone1d(this._arguments[k]);
				newargs.push( eventArguments );
			}
			var returnValue = this._handlers[k].apply(scope, newargs);
			if ( this._eventChainType & this.$self.CHAIN_IGNORE_UNDEFINED ) returnValue = ( returnValue == undefined ? true : returnValue );
			if ( this._eventChainType & this.$self.CHAIN_INVERT )
			{
				result = result || returnValue;
			}
			else 
			{
				result = result && returnValue;
			}
			if(this._options[k] && this._options[k].runOnce)
			{
				delete this._handlers[k];
				delete this._scopes[k];
				delete this._arguments[k];
				delete this._options[k];
			}
			if ( !result && this._eventChainType & this.$self.CHAIN_BREAK_ON_FIRST  ) break;
		}
		return result;
	},
	removeListener:		function(eventHandler)
	{
		for( var k in this._handlers )
		{
			if(eventHandler == this._handlers[k])
			{
				delete this._handlers[k];
				delete this._scopes[k];
				delete this._arguments[k];
				delete this._options[k];
			}
		}
	},
	removeListenerById:	function(eventId)
	{
		if(this._handlers[eventId])
		{
			delete this._handlers[eventId];
			delete this._scopes[eventId];
			delete this._arguments[eventId];
			delete this._options[eventId];
		}
	},
	removeAllListeners:	function()
	{
		this._handlers = {};
		this._scopes = {};
		this._arguments = {};
		this._options = {};
	},
	// protected
	_name:					false,
	_owner:					false,
	_firstHandler:			jsis.EMPTYFN,
	_firstHandlerArguments:	null,
	_isInitialized:			false,
	_handlers:				null,
	_scopes:				null,
	_options:				null,
	_arguments:				null,
	/**
	 * @see static variables for jsis.core.Event class
	 */
	_eventChainType:		null
},{
	/**
	 * Break event execution chain on first false-return handler. It is off by default.
	 */
	CHAIN_BREAK_ON_FIRST:		1,
	/**
	 * Treat undefined return values as true (prevents event handlers that don't return value from making it false). It is enabled by default.
	 */
	CHAIN_IGNORE_UNDEFINED:		2,
	/**
	 * The execution chain will return true if at least one event handler will return true (no handlers = return false) - return values are ORed (normally they're ANDed). NOTE: CHAIN_IGNORE_UNDEFINED still makes undefined return values true, so it does work the other way around as well with this modifier. Off by default.
	 */
	CHAIN_INVERT:				4
});