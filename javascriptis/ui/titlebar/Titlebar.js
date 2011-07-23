jsis.ui.titlebar.Titlebar = jsis.$class(jsis.ui.AbstractElement, 
{
	$constructor:		function()
	{
		this.$super();
		this._leftButtonsWrap = jsis.find("<div />");
		this._rightButtonsWrap = jsis.find("<div />");
		this.leftButtons = [];
		this.rightButtons = [];
		this._element.addListener('click', this._onTitleClick, this);
		this._element.addListener('dblclick', this._onTitleDoubleClick, this);
		this._element.addListener('mousedown', this._onTitleDown, this);
		this._element.addListener('mouseup', this._onTitleUp, this);
	},
	_refreshElements:		function()
	{
		this.$super();
		this._leftButtonsWrap.setHtml('');
		this._rightButtonsWrap.setHtml('');
		for ( var i in this.leftButtons )
		{
			var button = this.leftButtons[i];
			if ( typeof button == "string" )
			{
				button = new jsis.ui.titlebar.Button();
				button.buttonId = this.leftButtons[i];
				if ( button.buttonId == this.$self.X )
				{
					button.clsName = this.redButtonCls;
				}
				button.addListener('buttonClick', this._onButtonClick, this, [button]);
				this.leftButtons[i] = button;
			}
			button.template = this.buttonTemplate;
			button.clsStyleName = this.buttonCls;
			button.renderTo = this._leftButtonsWrap;
			button.show();
		}
		for ( var i in this.rightButtons )
		{
			var button = this.rightButtons[i];
			if ( typeof button == "string" )
			{
				button = new jsis.ui.titlebar.Button();
				button.buttonId = this.rightButtons[i];
				if ( button.buttonId == this.$self.X )
				{
					button.clsName = this.redButtonCls;
				}
				button.addListener('buttonClick', this._onButtonClick, this, [button]);
				this.rightButtons[i] = button;
			}
			button.template = this.buttonTemplate;
			button.clsStyleName = this.buttonCls;
			button.renderTo = this._rightButtonsWrap;
			button.show();
		}
	},
	_onButtonClick:			function(button, arguments)
	{
		return this.fireEvent('titleButtonClick', [button, button.buttonId]);
	},
	_renderElements:		function()
	{
		this.$super();
		this._element.setCss("overflow", "hidden");
		var templateVars = 
		{
				title:			this.title,
				iconSrc:		this.iconSrc,
				leftButtons:	"<div id="+this._leftButtonsWrap.dom.id+"></div>",
				rightButtons:	"<div id="+this._rightButtonsWrap.dom.id+"></div>"
		}
		jsis.$.tmpl( this.template, templateVars ).appendTo( "#"+this._element.dom.id );
		this._leftButtonsWrap.recreate();
		this._rightButtonsWrap.recreate();
	},
	_onTitleClick:			function(titleElement,e)
	{
		return this.fireEvent("titleClick", [this,e]);
	},
	_onTitleUp:				function(titleElement,e)
	{
		return this.fireEvent("titleMouseUp", [this,e]);
	},
	_onTitleDown:			function(titleElement,e)
	{
		return this.fireEvent("titleMouseDown", [this,e]);
	},
	_onTitleDoubleClick:	function(titleElement,e)
	{
		return this.fireEvent("titleDoubleClick", [this,e]);
	},
	title:				'',
	template:			jsis.emptyTpl,
	iconSrc:			jsis.getEmptyImg(),
	buttonCls:			'',
	redButtonCls:		'',
	buttonTemplate:		null,
	/**
	 * Classes for left buttons
	 */
	leftButtons:		null,
	rightButtons:		null,
	/**
	 * Rendered left buttons
	 */
	_leftButtons:		null,
	_rightButtons:		null,
	_leftButtonsWrap:	null,
	_rightButtonsWrap:	null,
	_uiType:			"titlebar.Titlebar"
},{
	UNPIN:				"jsis-titlebutton-icon-unpin",
	PIN:				"jsis-titlebutton-icon-pin",
	UP:					"jsis-titlebutton-icon-up",
	DOWN:				"jsis-titlebutton-icon-down",
	PLUS:				"jsis-titlebutton-icon-plus",
	ASK:				"jsis-titlebutton-icon-ask",
	MIN:				"jsis-titlebutton-icon-min",
	RESTORE:			"jsis-titlebutton-icon-restore",
	MAX:				"jsis-titlebutton-icon-max",
	X:					"jsis-titlebutton-icon-x"
});