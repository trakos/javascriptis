jsis.core.Element = jsis.$class(jsis.core.EventListener, 
{
	$constructor:		function(domNode)
	{
		this.$super();
		this.dom = domNode;
		this.data = {};
		var jsisid = jsis.$(domNode).data('jsisid');
		if ( jsisid )
		{
			for ( var i in jsis.instances.elements[jsisid] )
			{
				this[i] = jsis.instances.elements[jsisid][i];
			}
		}
		else
		{
			jsis.addElement(this);
			jsisid = this.dom.id;
			jsis.$(this.dom).data('jsisid', this.dom.id);
			function mirrorEvent(eventName, that)
			{
				that._addEvent(eventName, function(instance, jsisEvent, eventName)
				{
					jsis.$(instance.dom).bind(eventName, function(event)
					{
						var instance = jsis.instances.elements[jsis.$(this).data('jsisid')];
						return instance.fireEvent(eventName, [instance, event]);
					});
				}, eventName);
			}
			var eventList = ['blur','change','click','dblclick','error','focus','focusin','focusout','hover','keydown','keypress','keyup','load','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','ready','resize','scroll','select','submit','unload'];
			for ( var i in eventList )
			{
				mirrorEvent(eventList[i], this);
			}
			jsis.instances.elements[jsisid] = this;
			// adding rightclick and middleclick events:
			this._addEvent("rightclick", function(instance, jsisEvent)
			{
				jsis.$(instance.dom).bind('contextmenu', function(event)
				{
					var instance = jsis.instances.elements[jsis.$(this).data('jsisid')];
					return instance.fireEvent("rightclick", [instance, event]);
				});
			});
			this._addEvent("middleclick", function(instance, jsisEvent)
			{
				jsis.$(instance.dom).mousedown(function(event)
				{
					if ( event.which == 2)
					{
						var instance = jsis.instances.elements[jsis.$(this).data('jsisid')];
						return instance.fireEvent("middleclick", [instance, event]);
					}
				});
			});
		}
	},
	dom:			null,
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
	appendTo:				function(targetEl)
	{
		jsis.$(this.dom).appendTo("#"+targetEl.dom.id);
	},
	append:					function(appendMe)
	{
		jsis.$(this.dom).append(appendMe);
	},
	isVisible:				function()
	{
		jsis.$(this.dom).is(":visible");
	},
	dom:					null,
	data:					null
});