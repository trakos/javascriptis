jsis.ui.blocks.FormRow = jsis.$class(jsis.ui.blocks.Vertical, 
{
	$constructor:		function(  )
	{
		this.labelContainer = new jsis.ui.blocks.Simple();
		this.marginContainer = new jsis.ui.blocks.Simple();
		this.inputContainer = new jsis.ui.blocks.Simple();
		this.$super( [this.labelContainer, this.marginContainer, this.inputContainer] );
		this.labelContainer.styleVariant = "empty";
		this.inputContainer.styleVariant = "empty";
	},
	_refreshChildren:	function(children, forceInvisible)
	{
		this.$super(children, forceInvisible);
		this.labelContainer.width = this.parentForm.labelWidth;
		this.marginContainer.width = this.parentForm.labelMargin;
		this.inputContainer.width = 0;
		this.label.labelText = this.input.labelText + this.parentForm.labelSeparator;
		this.$super();
		this.label.refresh();
		this.input._element.setCss("width", this.inputContainer.getInnerWidth() );
		this.input.refresh();
	},
	_renderElements:	function()
	{
		this.$super();
		this.height = this._renderedStyle.formSettings.inputHeight + this._renderedStyle.formSettings.formRowPadding;
	},
	_renderChildren:	function(children)
	{
		this.$super(children);
		this.label.renderTo = this.labelContainer._bodyDiv;
		this.input.renderTo = this.inputContainer._bodyDiv;
		this.input.show();
		this.label.inputId = this.input.getId();
		this.label.show();
	},
	labelContainer:		null,
	marginContainer:	null,
	inputContainer:		null,
	label:				null,
	input:				null,
	parentForm:			null,
	_uiType:			"blocks.FormRow"
});