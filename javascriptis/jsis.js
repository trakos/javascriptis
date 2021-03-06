var jsis = 
{
	$clone1d:	function( arrayOrObject )
	{
		var clone;
		if ( jsis.$isArray(arrayOrObject) )
		{
			clone = [];
		}
		else
		{
			clone = {};
		}
		for ( var i in arrayOrObject )
		{
			clone[i] = arrayOrObject[i];
		}
		return clone;
	},
	$isArray:	function( array )
	{
		return jsis.$.isArray(array);
	},
	$isObject:	function( value )
	{
		return value.constructor == Object;
	},
	$class:		function( $superClass, definition, statics )
	{
		definition = definition || {};
		statics = statics || {};
		// default empty constructor/destructor or inherited
		definition.$constructor = definition.$constructor || function(){ this.$super.apply(this,arguments); };
		definition.$destructor = definition.$destructor || function(){ this.$super.apply(this,arguments); };
		// base core function
		var $subClass = function()
		{
			// destructor - masking behind $jsis
			this.$jsis$.$destructor = this.$destructor;
			this.$destructor = function()
			{
				this.$jsis$.$destructor();
				for ( var i in this )
				{
					this[i] = undefined;
				}
			};
			// calling constructor
			if ( this.$constructor && typeof this.$constructor == 'function' )
			{
				this.$constructor.apply(this, arguments);
			}
			else
			{
				throw "$constructor does not exist in a class definition or is not a function!"; 
			}
		};
		// inheriting static variables
		for ( var i in $superClass )
		{
			$subClass[i] = $superClass[i];
		}
		// assigning static variables
		for ( var i in statics )
		{
			$subClass[i] = statics[i];
		}
		// assigning new new methods
		jsis.$override($subClass, definition);
		// copying prototype from $superClass
		var runMethod = function( method, superMethod, methodName, args )
		{
			var tmp = this.$super;
			this.$super = jsis.$delegate( superMethod, this );
			try 
			{
				return method.apply(this,args);
			}
			catch (e)
			{
				this.$super = tmp;
				throw e;
			}
			this.$super = tmp;
		};
		for ( var i in $superClass.prototype )
		{
			if ( typeof $subClass.prototype[i] == 'function' )
			{
				$subClass.prototype[i] = jsis.$delegate( runMethod, null, [ $subClass.prototype[i], $superClass.prototype[i], i ]);
			}
			else if ( !$subClass.prototype[i] )
			{
				$subClass.prototype[i] = $superClass.prototype[i];
			}
		}
		// keyword '$self' as an alias for constructor - it is a function, so to avoid wrapping with runMethod (which also clears all properties) we do it on the end
		$subClass.prototype.$self = $subClass;
		return $subClass;
	},
	$delegate:	function( method, scope, args )
	{
		// if args not given or false, the function will receive arguments given to the function normally
		// otherwise, the arguments will be taken from the args value, and the last value will be the array with real arguments
		return function()
		{
			var newargs;
			var newscope;
			if (!args)
			{
				newargs = Array.prototype.slice.call(arguments);
			}
			else
			{
				newargs = jsis.$clone1d(args);
				newargs.push( Array.prototype.slice.call(arguments) );
			}
			if (!scope) newscope = this;
			else newscope = scope;
			return method.apply(newscope, newargs);
		}; 
	},
	$override:	function( $class, definition )
	{
		// change everything from definition
		for ( var i in definition )
		{
			$class.prototype[i] = definition[i];
		}
		return $class;
	},
	$instance:			function( $superClass, $definition )
	{
		var $subClass = jsis.$class($superClass, $definition );
		return new $subClass;
	},
	addElement:			function(element)
	{
		if ( !element.dom.id )
		{
			element.dom.id = 'jsis-'+this.uuid();
		}
		this.instances.elements[element.dom.id] = element;
		$(element.dom).data('jsisid', element.dom.id);
	},
	removeElement:		function(element)
	{
		if ( element && element.dom && element.dom.id )
		{
			delete this.instances.elements[element.dom.id];
		}
	},
	uuid:				function()
	{
		var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	},
	$:					jQuery,
	find:				function( cssQuery )
	{
		if ( cssQuery.$jsis$ && cssQuery.dom )
		{
			return cssQuery;
		}
		else if (cssQuery.$jsis$)
		{
			console.error("!");
			throw  "jsis.find(): given some unrecognized object as cssQuery argument!";
		}
		var result = jsis.$(cssQuery);
		if ( result.length == 0 )
		{
			return false;
		}
		else if ( result.length > 1 )
		{
			throw "jsis.find(): Query "+cssQuery+" returned more than one result!";
		}
		else
		{
			return new jsis.core.Element(result.get(0));
		}
	},
	disableAnimations:	function()
	{
		jsis.$.fx.off = true;
	},
	enableAnimations:	function()
	{
		jsis.$.fx.off = false;
	},
	ready:				function( handler )
	{
		this.$( handler );
	},
	resourcesUrl:		"javascriptis.res",
	emptyTpl:			$.template( null, ''),
	getEmptyImg:		function(){ return jsis.resourcesUrl+'/empty.gif'; },
	settings:
	{
		defaultStyle:	'jsis',
		styles:
		{
			jsis:
			{
				getVariantName:	function(element)
				{
					if ( element.styleVariant ) return element.styleVariant;
					if ( element._uiType == "blocks.Body" ) return "empty";
					if ( element._uiType == "blocks.Window" ) return "window";
					if ( element._uiType == "blocks.StandardWindow" ) return "window";
					return "standard";
				},
				formSettings:
				{
					inputHeight:	25,
					formRowPadding:	5,
				},
				blockVariants:
				{
					standard:
					{
						wrapper:		$.template( null, '{{html body}}{{html buttonbar}}'),
						wrapperTitle:	$.template( null, '<div class="jsis-titlebar">{{html title}}</div>{{html body}}{{html buttonbar}}'),
						buttonbar:		$.template( null, '<span class="jsis-buttonbar jsis-buttonbar-left">{{html leftButtons}}</span><span class="jsis-buttonbar jsis-buttonbar-right">{{html rightButtons}}</span><span class="jsis-buttonbar jsis-buttonbar-center">{{html centerButtons}}</span>'),
						innerMargins:	[0,0], //w,h
						outerMargins:	[0,0],
						buttonbarMargins:[0,35],
						bodyCls:		"jsis-body",
						wrapCls:		"jsis-wrap",
						childVariant:	"standard"
					},
					darker:
					{
						wrapper:		$.template( null, '{{html body}}{{html buttonbar}}'),
						wrapperTitle:	$.template( null, '<div class="jsis-titlebar">{{html title}}</div>{{html body}}{{html buttonbar}}'),
						buttonbar:		$.template( null, '<span class="jsis-buttonbar jsis-buttonbar-left">{{html leftButtons}}</span><span class="jsis-buttonbar jsis-buttonbar-right">{{html rightButtons}}</span><span class="jsis-buttonbar jsis-buttonbar-center">{{html centerButtons}}</span>'),
						innerMargins:	[0,0], //w,h
						outerMargins:	[0,0],
						buttonbarMargins:[0,35],
						bodyCls:		"jsis-body-darker",
						wrapCls:		"jsis-wrap-darker",
						childVariant:	"darker"
					},
					window:
					{
						wrapper:		$.template( null, '<div class="jsis-window-border-top-notitle"><div class="jsis-window-border-bottom"><div class="jsis-window-border-left"><div class="jsis-window-border-right">{{html body}}{{html buttonbar}}</div></div></div></div>'),
						wrapperTitle:	$.template( null, '<div class="jsis-window-border-top">{{html title}}</div><div class="jsis-window-border-bottom"><div class="jsis-window-border-left"><div class="jsis-window-border-right">{{html body}}{{html buttonbar}}</div></div></div>'),
						title:			$.template( null, '<span class="jsis-window-titlebuttons jsis-window-titlebuttons-left">{{html leftButtons}}</span><span class="jsis-window-titlebuttons jsis-window-titlebuttons-right">{{html rightButtons}}</span><img src="{{html iconSrc}}" class="jsis-window-titleicon" /><span class="jsis-window-title">{{html title}}</span>'),
						buttonTitle:	$.template( null, '<span class="jsis-titlebutton-icon {{html iconClass}}"></span>'),
						buttonbar:		$.template( null, '<span class="jsis-buttonbar jsis-buttonbar-left">{{html leftButtons}}</span><span class="jsis-buttonbar jsis-buttonbar-right">{{html rightButtons}}</span><span class="jsis-buttonbar jsis-buttonbar-center">{{html centerButtons}}</span>'),
						loadingMask:	$.template( null, '<div><img src="{{html resourcesPath}}/spinner_small.gif" /><span class="jsis-loading">{{html loadingText}}</span></div>' ),
						innerMargins:	[10,10], //w,h
						outerMargins:	[0,0],
						titleMargins:	[0,19],
						buttonbarMargins:[0,35],
						titleCls:		"jsis-window-titlebar",
						buttonbarCls:	"jsis-buttonbar",
						buttonCls:		"jsis-window-titlebutton",
						redButtonCls:	"jsis-window-titlebutton-red",
						bodyCls:		"jsis-window-body",
						wrapCls:		"jsis-window-wrap",
						focusCls:		"jsis-window-focus",
						childVariant:	"standard"
					},
					empty:
					{
						wrapper:		$.template( null, '{{html body}}'),
						wrapperTitle:	$.template( null, '{{html body}}'),
						innerMargins:	[0,0], //w,h
						outerMargins:	[0,0],
						bodyCls:		"jsis-empty-body",
						wrapCls:		"jsis-empty-wrap",
						childVariant:	"empty"
					}
				}
			}
		}
	},
	instances:	
	{
		elements:	{},
		widgets:	{},
		components:	{}
	},
	EMPTYFN:	function(){},
	Base:		function(){},
	core:		{},
	data:		
	{
		json:		{}
	},
	ui:			
	{
		blocks:		{},
		form:		{},
		toolbar:	{},
		titlebar:	{},
		buttonbar:	{}
	},
	utils:		{}
};

jsis.Base.prototype = 
{
	$jsis$:
	{
		disposed:		false,
		$destructor:	function(){}
	},
	$self:			{},
	$constructor:	function(){},
	$super:			function(){}, 			// temporary function will be assigned on every method being run
	$setValues:		function(valuesMap)
	{
		for( var i in valuesMap )
		{
			this[i] = valuesMap[i];
		}
	}
};

