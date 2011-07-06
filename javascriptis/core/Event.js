jsis.core.Event = jsis.$class(jsis.Base, 
{
	$constructor:		function(eventName, eventOwner, firstEventHandler, firstEventHandlerArguments)
	{
		this._name = eventName;
		this._owner = eventOwner;
		this._firstHandler = firstEventHandler;
		this._firstHandlerArguments = firstEventHandlerArguments;
		this.$setValues(
		{
			_handlers:				[],
			_scopes:				[],
			_options:				[]
		});
	},
	// public
	defaultOptions:
	{
		runOnce:		false
	},
	addListener:		function(eventHandler, eventScope, eventOptions)
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
		this._handlers.push(eventHandler);
		this._scopes.push(eventScope);
		this._options.push(eventOptions);
	},
	fire:				function(eventArguments)
	{
		var result = true;
		for( var k=0; k < this._handlers.length; k++ )
		{
			var scope = this._scopes[k];
			scope = scope || this._owner;
			result = result && this._handlers[k].apply(scope, eventArguments);
			if(this._options[k] && this._options[k].runOnce)
			{
				this._handlers.splice(k,1);
				this._scopes.splice(k,1);
				this._options.splice(k,1);
				k--;
			}
		}
		return result;
	},
	removeListener:		function(eventHandler)
	{
		var k = 0;
		while( k < this._handlers.length )
		{
			if(eventHandler == this._handlers[k])
			{
				this._handlers.splice(k,1);
				this._scopes.splice(k,1);
				this._options.splice(k,1);
			}
			else
			{
				k++;
			}
		}
	},
	removeAllListeners:	function()
	{
		this._handlers = [];
		this._scopes = [];
		this._options = [];
	},
	// protected
	_name:					false,
	_owner:					false,
	_firstHandler:			jsis.EMPTYFN,
	_firstHandlerArguments:	null,
	_isInitialized:			false,
	_handlers:				null,
	_scopes:				null,
	_options:				null
});