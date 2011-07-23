jsis.core.Element = {};
// nasty trick to make this variable not trashing scope while being usable in jsis.core.Element below during intialization
jsis.core.Element.defaultHandler = function(eventName,event)
{
	event = event[0];
	var instance = jsis.instances.elements[jsis.$(this).data('jsisid')];
	return instance.fireEvent(eventName, [instance, event]);
}
jsis.core.Element = jsis.$class(jsis.core.EventListener, 
{
	/**
	 * Do not construct it by yourself - use jsis.find !
	 * Constructing by yourself might break things e.g. destroy the previous instance if existing, making previous handlers behave improperly.
	 */
	$constructor:		function(domNode)
	{
		this.$super();
		this.dom = domNode;
		this.attachedEvents = {};
		this.data = {};
		var jsisid = jsis.$(domNode).data('jsisid');
		if ( jsisid )
		{
			for ( var i in jsis.instances.elements[jsisid] )
			{
				this[i] = jsis.instances.elements[jsisid][i];
			}
			this.recreate();
		}
		else
		{
			this.recreate();
			for ( var eventName in this.$self.__eventsHandlers )
			{
				this._addEvent(eventName, function(instance, jsisEvent, eventName)
				{
					instance.$self.__attachHandler(instance, eventName);
				}, eventName);
			}
		}
	},
	dom:			null,
	recreate:		function()
	{
		var dom = jsis.$('#'+this.dom.id).get(0);
		if ( dom )
		{
			this.dom = dom;
		}
		jsis.addElement(this);
		for ( var eventName in this.attachedEvents )
		{
			this.$self.__attachHandler(this, eventName);
		}
	},
	addClass:		function(className)
	{
		jsis.$(this.dom).addClass(className);
		return this;
	},
	hasClass:		function(className)
	{
		return jsis.$(this.dom).hasClass(className);
	},
	removeClass:	function(className)
	{
		jsis.$(this.dom).removeClass(className);
		return this;
	},
	removeAllClasses:function()
	{
		jsis.$(this.dom).removeClass();
		return this;
	},
	setMultiAttr:function(attributeMap)
	{
		jsis.$(this.dom).attr(attributeMap);
		return this;
	},
	setAttr:		function(attributeName, attributeValue)
	{
		jsis.$(this.dom).attr(attributeName, attributeValue);
		return this;
	},
	getAttr:		function(attributeName)
	{
		return jsis.$(this.dom).attr(attributeName);
		return this;
	},
	getCss:			function(attributeName)
	{
		return jsis.$(this.dom).css(attributeName);
		return this;
	},
	setCss:			function(attributeName, attributeValue)
	{
		jsis.$(this.dom).css(attributeName, attributeValue);
		return this;
	},
	setMultiCss:	function(attributeMap)
	{
		jsis.$(this.dom).css(attributeMap);
		return this;
	},
	getHeight:		function()
	{
		return jsis.$(this.dom).height();
	},
	setHeight:		function(heightValue)
	{
		jsis.$(this.dom).height(heightValue);
		return this;
	},
	getWidth:		function()
	{
		return jsis.$(this.dom).width();
	},
	setWidth:		function(widthValue)
	{
		jsis.$(this.dom).width(widthValue);
		return this;
	},
	getScrollLeft:		function()
	{
		return jsis.$(this.dom).scrollLeft();
	},
	setScrollLeft:		function(scrollValue)
	{
		jsis.$(this.dom).scrollLeft(scrollValue);
		return this;
	},
	getScrollTop:		function()
	{
		return jsis.$(this.dom).scrollTop();
	},
	setScrollTop:		function(scrollValue)
	{
		jsis.$(this.dom).scrollTop(scrollValue);
		return this;
	},
	getHtml:			function()
	{
		return jsis.$(this.dom).html();
	},
	setHtml:			function(html)
	{
		jsis.$(this.dom).html(html);
		return this;
	},
	getRelativeLeft:	function()
	{
		var position = jsis.$(this.dom).position();
		return position.left;
	},
	getRelativeTop:		function()
	{
		var position = jsis.$(this.dom).position();
		return position.top;
	},
	getDocumentLeft:	function()
	{
		var position = jsis.$(this.dom).offset();
		return position.left;
	},
	getDocumentTop:		function()
	{
		var position = jsis.$(this.dom).offset();
		return position.top;
	},
	setDocumentLeft:	function(leftValue)
	{
		var position = jsis.$(this.dom).offset();
		position.left = leftValue;
		jsis.$(this.dom).offset(position);
		return this;
	},
	setDocumentTop:		function(topValue)
	{
		var position = jsis.$(this.dom).offset();
		position.top = topValue;
		jsis.$(this.dom).offset(position);
		return this;
	},
	addDocumentTop:		function(topValue)
	{
		this.setDocumentTop( this.getDocumentTop()+topValue );
		return this;
	},
	addDocumentLeft:	function(leftValue)
	{
		this.setDocumentLeft( this.getDocumentLeft()+leftValue );
		return this;
	},
	animate:			function(cssMap, options)
	{
		// same arguments as for jquery's animate plus: scope, arguments, stepScope, stepArguments (first two for complete function, the other two for step function)
		if ( !options ) options = [];
		if ( !options.scope ) options.scope = this;
		if ( !options.arguments ) options.arguments = [];
		if ( options.complete ) options.complete = jsis.$delegate(options.complete, options.scope, options.arguments);
		if ( !options.stepScope ) options.stepScope = this;
		if ( !options.stepArguments ) options.stepArguments = [];
		if ( options.step ) options.step = jsis.$delegate(options.step, options.stepScope, options.stepArguments);
		jsis.$(this.dom).animate(cssMap, options);
		return this;
	},
	fadeIn:				function( duration, easing, callback, scope, args )
	{
		if ( !args ) args = [];
		if ( !scope ) scope = this;
		if ( callback ) callback = jsis.$delegate(callback, scope, args);
		jsis.$(this.dom).fadeIn(duration, easing, callback, scope, args);
		return this;
	},
	fadeOut:			function( duration, easing, callback, scope, args )
	{
		if ( !args ) args = [];
		if ( !scope ) scope = this;
		if ( callback ) callback = jsis.$delegate(callback, scope, args);
		jsis.$(this.dom).fadeIn(duration, easing, callback);
		return this;
	},
	fadeTo:				function( duration, opacity, easing, callback, scope, args )
	{
		if ( !args ) args = [];
		if ( !scope ) scope = this;
		if ( callback ) callback = jsis.$delegate(callback, scope, args);
		jsis.$(this.dom).fadeIn(duration, opacity, easing, callback);
		return this;
	},
	slideDown:				function( duration, easing, callback, scope, args )
	{
		if ( !args ) args = [];
		if ( !scope ) scope = this;
		if ( callback ) callback = jsis.$delegate(callback, scope, args);
		jsis.$(this.dom).slideDown(duration, easing, callback, scope, args);
		return this;
	},
	slideUp:				function( duration, easing, callback, scope, args )
	{
		if ( !args ) args = [];
		if ( !scope ) scope = this;
		if ( callback ) callback = jsis.$delegate(callback, scope, args);
		jsis.$(this.dom).slideUp(duration, easing, callback, scope, args);
		return this;
	},
	stopAnimation:			function( clearQueue, jumpToEnd )
	{
		if ( typeof clearQueue == 'undefined' )
		{
			clearQueue = true;
		}
		if ( typeof jumpToEnd == 'undefined' )
		{
			jumpToEnd = true;
		}
		jsis.$(this.dom).stop(clearQueue,jumpToEnd);
		return this;
	},
	detach:				function()
	{
		jsis.$(this.dom).detach();
		return this;
	},
	// functions not being just mirrors of jquery:
	find:				function(cssQuery)
	{
		if ( cssQuery.$jsis$ && cssQuery.dom )
		{
			return cssQuery;
		}
		var result = jsis.$(this.dom).find(cssQuery);
		if ( result.length == 0 )
		{
			return false;
		}
		else if ( result.length > 1 )
		{
			throw new Exception("jsis.find(): Query "+cssQuery+" returned more than one result!");
		}
		else
		{
			return new jsis.core.Element(result.get(0));
		}
	},
	appendTo:					function(targetEl)
	{
		targetEl = jsis.find(targetEl);
		jsis.$(this.dom).appendTo("#"+targetEl.dom.id);
	},
	append:						function(appendMe)
	{
		appendMe = jsis.find(appendMe);
		jsis.$(this.dom).append(appendMe.dom);
	},
	isVisible:					function()
	{
		jsis.$(this.dom).is(":visible");
	},
	dom:						null,
	data:						null,
	attachedEvents:				null,
},{
	__attachHandler:			function(instance,eventName)
	{
		instance.attachedEvents[eventName] = 1;
		var array = instance.__eventsWithExactMirror;
		var handler, jqueryEventName;
		if ( instance.$self.__eventsHandlers[eventName] )
		{
        	handler = instance.$self.__eventsHandlers[eventName];
        	jqueryEventName = eventName;
        	if ( handler.jquery )
        	{
        		jqueryEventName = handler.jquery;
        		handler = handler.handler;
        	}
		}
		else
		{	
			throw "event with name "+eventName+" unexpected!";
		}
		jsis.$(instance.dom).unbind(jqueryEventName, handler).bind(jqueryEventName, handler);
	},
	__eventsHandlers:
	{
		blur:				jsis.core.Element.defaultHandler,
		change:				jsis.core.Element.defaultHandler,
		click:				jsis.core.Element.defaultHandler,
		dblclick:			jsis.core.Element.defaultHandler,
		error:				jsis.core.Element.defaultHandler,
		focus:				jsis.core.Element.defaultHandler,
		focusin:			jsis.core.Element.defaultHandler,
		focusout:			jsis.core.Element.defaultHandler,
		hover:				jsis.core.Element.defaultHandler,
		keydown:			jsis.core.Element.defaultHandler,
		keypress:			jsis.core.Element.defaultHandler,
		keyup:				jsis.core.Element.defaultHandler,
		load:				jsis.core.Element.defaultHandler,
		mousedown:			jsis.core.Element.defaultHandler,
		mouseenter:			jsis.core.Element.defaultHandler,
		mouseleave:			jsis.core.Element.defaultHandler,
		mousemove:			jsis.core.Element.defaultHandler,
		mouseout:			jsis.core.Element.defaultHandler,
		mouseover:			jsis.core.Element.defaultHandler,
		mouseup:			jsis.core.Element.defaultHandler,
		ready:				jsis.core.Element.defaultHandler,
		resize:				jsis.core.Element.defaultHandler,
		scroll:				jsis.core.Element.defaultHandler,
		select:				jsis.core.Element.defaultHandler,
		submit:				jsis.core.Element.defaultHandler,
		unload:				jsis.core.Element.defaultHandler,
		rightclick:			
		{
			jquery:			'contextmenu',
			handler:		function(eventName,event)
			{
					event = event[0];
					var instance = jsis.instances.elements[jsis.$(this).data('jsisid')];
					return instance.fireEvent("rightclick", [instance, event]);
			}
		},
		middleclick:
		{
			jquery:			'click',
			handler:		function(eventName,event)
			{
				event = event[0];
				if ( event.which == 2)
				{
					var instance = jsis.instances.elements[jsis.$(this).data('jsisid')];
					return instance.fireEvent("middleclick", [instance, event]);
				}
			}
		}
	}
});

// Don't ever tell anyone you saw that! No, just kidding, but seriously, it's quite a brute-hack to achieve it.
// We have to delegate all those __eventsHandlers only once to make them constant between instances to make sure unbinding from jquery will work properly
// and there are no better methods to delegate some argument to be saved in event.
// An alternative would be to just write jsis.$delegate for each element of array above, but that would be more characters used even including this comment,
// not to mention what would happen if anybody would want to change something ;)
for ( var eventName in jsis.core.Element.__eventsHandlers )
{
	jsis.core.Element.__eventsHandlers[eventName] = jsis.$delegate(jsis.core.Element.__eventsHandlers[eventName], null, [eventName]);
}