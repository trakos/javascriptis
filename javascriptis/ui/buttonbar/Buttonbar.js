jsis.ui.buttonbar.Buttonbar = jsis.$class(jsis.ui.AbstractElement, 
{
	$constructor:		function()
	{
		this.$super();
		this.height = 32;
		this._leftButtonsWrap = jsis.find("<div />");
		this._centerButtonsWrap = jsis.find("<div />");
		this._rightButtonsWrap = jsis.find("<div />");
		this.leftButtons = [];
		this.centerButtons = [];
		this.rightButtons = [];
	},
	hasDataToShow:			function()
	{
		return this.leftButtons.length || this.rightButtons.length|| this.centerButtons.length;
	},
	mask:					function()
	{
		this._element.mask();
	},
	unmask:					function()
	{
		this._element.unmask();
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
				button = new jsis.ui.form.Button();
				button.buttonText = this.leftButtons[i];
				button.addListener('buttonClick', this._onButtonClick, this, [button]);
				this.leftButtons[i] = button;
			}
			button.renderTo = this._leftButtonsWrap;
			button.show();
		}
		for ( var i in this.centerButtons )
		{
			var button = this.centerButtons[i];
			if ( typeof button == "string" )
			{
				button = new jsis.ui.form.Button();
				button.buttonText = this.centerButtons[i];
				button.addListener('buttonClick', this._onButtonClick, this, [button]);
				this.centerButtons[i] = button;
			}
			button.renderTo = this._centerButtonsWrap;
			button.show();
		}
		for ( var i = this.rightButtons.length-1; i>=0; i-- )
		{
			var button = this.rightButtons[i];
			if ( typeof button == "string" )
			{
				button = new jsis.ui.form.Button();
				button.buttonText = this.rightButtons[i];
				button.addListener('buttonClick', this._onButtonClick, this, [button]);
				this.rightButtons[i] = button;
			}
			button.renderTo = this._rightButtonsWrap;
			button.show();
		}
	},
	_onButtonClick:			function(button, arguments)
	{
		return this.fireEvent('buttonClick', [button, button.buttonText]);
	},
	_renderElements:		function()
	{
		this.$super();
		this._element.setCss("overflow", "hidden");
		var templateVars = 
		{
				leftButtons:	"<div id="+this._leftButtonsWrap.dom.id+"></div>",
				centerButtons:	"<div id="+this._centerButtonsWrap.dom.id+"></div>",
				rightButtons:	"<div id="+this._rightButtonsWrap.dom.id+"></div>"
		}
		jsis.$.tmpl( this.template, templateVars ).appendTo( "#"+this._element.dom.id );
		this._leftButtonsWrap.recreate();
		this._centerButtonsWrap.recreate();
		this._rightButtonsWrap.recreate();
	},
	title:				'',
	template:			jsis.emptyTpl,
	iconSrc:			jsis.getEmptyImg(),
	buttonCls:			'',
	redButtonCls:		'',
	buttonTemplate:		null,
	leftButtons:		null,
	centerButtons:		null,
	rightButtons:		null,
	_leftButtonsWrap:	null,
	_centerButtonsWrap:	null,
	_rightButtonsWrap:	null,
	_uiType:			"buttonbar.Buttonbar"
},{
	OK:					"OK",
	CANCEL:				"Cancel",
	YES:				"Yes",
	NO:					"No",
	ACCEPT:				"Accept",
	HELP:				"Help",
	APPLY:				"Apply"
});