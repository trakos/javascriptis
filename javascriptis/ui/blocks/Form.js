jsis.ui.blocks.Form = jsis.$class(jsis.ui.blocks.Horizontal, 
{
	$constructor:		function( inputs, renderTo )
	{
		this.emptyFiller = new jsis.ui.blocks.Standard();
		this.emptyFiller.styleVariant = "empty";
		this.$super([],renderTo);
		this.content = [];
		if ( inputs )
		{
			for ( var i in inputs )
			{
				if ( inputs[i]._uiType == "blocks.FormRow" )
				{
					this.content.push(inputs[i]);
				}
				else
				{
					this.addInput(inputs[i]);
				}
			}
		}
	},
	addInput:			function(input)
	{
		var formRow = new jsis.ui.blocks.FormRow();
		formRow.input = input;
		formRow.parentForm = this;
		formRow.label = new jsis.ui.form.Label();
		this.content.push(formRow);
	},
	_getContent:		function()
	{
		var content = jsis.$clone1d(this.content);
		content.push(this.emptyFiller);
		return content;
	},
	labelWidth:			50,
	labelSeparator:		":",
	labelMargin:		50,
	emptyFiller:		null,
	_uiType:			"blocks.Form"
});