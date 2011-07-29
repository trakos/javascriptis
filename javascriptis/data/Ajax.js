jsis.data.Ajax = jsis.$class(jsis.core.EventListener, 
{
	$constructor:	function(settings)
	{
		this.$super();
		this.settings = {};
		for ( var i in this.$self.defaultSettings ) 
		{
			this.settings[i] = this.$self.defaultSettings[i];
		}
		for ( var i in settings ) 
		{
			this.settings[i] = settings[i];
		}
	},
	perform:		function()
	{
		if ( this._active )
		{
			throw 'this ajax is already loading!';
		}
		this.fireEvent('beforePerform', [this]);
		this.settings.context = this;
		this.settings.error = function(jqXHR, textStatus, errorThrown )
		{
			//textStatus = "timeout", "error", "abort", or "parsererror"
			//errorThrown = textual portion of the HTTP status, such as "Not Found" or "Internal Server Error."
			this._error(textStatus,errorThrown);
		};
		this.settings.success = function(data, textStatus, jqXHR)
		{
			this._success(textStatus,data);
		};
		if ( this.settings.dataType == 'json' )
		{
			for ( var i in this.settings.data )
			{
				var value = this.settings.data[i]; 
				if ( value && ( jsis.$isArray(value) || jsis.$isObject(value) )  )
				{
					this.settings.data[i] = jsis.data.json.encode(value);
				}
			}
		}
		this.xhr = jsis.$.ajax(this.settings);
	},
	_error:			function(textStatus,errorThrown)
	{
		this._active = false;
		this.fireEvent('error', [this,textStatus,errorThrown]);
		this._complete(false,textStatus,errorThrown,null);
	},
	_success:		function(textStatus,data)
	{
		this._active = false;
		this.fireEvent('success', [this,textStatus,data]);
		this._complete(true,textStatus,null,data);
	},
	_complete:		function(isSuccess,textStatus,errorThrown,data)
	{
		this.fireEvent('complete',  [this,isSuccess,textStatus,errorThrown,data]);
	},
	_active:		false,
	settings:		null,
	xhr:			null
},{
	defaultSettings:
	{
		accepts:			'',
		async:				true,
		cache:				false,
		contentTypeString: 'application/x-www-form-urlencoded',
		crossDomain:		false,
		data:				undefined,
		dataType:			'json',
		global:				false,
		headers:			undefined,
		ifModified:			false,
		isLocal:			undefined,
		password:			false,
		processData:		true,
		timeout:			undefined,
		type:				'GET',
		url:				undefined,
		username:			undefined
	}
});