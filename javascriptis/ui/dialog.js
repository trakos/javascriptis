jsis.ui.dialog = function(title, content, buttons, closeable, handler, handlerScope, handlerArguments )
{
	var leftButtons = [];
	var centerButtons = [];
	var rightButtons = [];
	if ( !buttons ) 
	{
		throw 'Dialog must have at least one button!';
	}
	else if ( buttons && (buttons.leftButtons || buttons.rightButtons || buttons.rightButtons) )
	{
		leftButtons = buttons.leftButtons || [];
		centerButtons = buttons.centerButtons || [];
		rightButtons = buttons.rightButtons || [];
	}
	else
	{
		rightButtons = buttons;
	}
	var dialogWindow = new jsis.ui.blocks.Window();
	if ( closeable )
	{
		dialogWindow.titlebar.rightButtons = [ jsis.ui.titlebar.Titlebar.X ];
	}
	dialogWindow.title = title;
	dialogWindow.buttonbar.leftButtons = leftButtons;
	dialogWindow.buttonbar.centerButtons = centerButtons;
	dialogWindow.buttonbar.rightButtons = rightButtons;
	var contentEl = new jsis.ui.blocks.Standard();
	contentEl.contentHtml = "<p class='jsis-dialog-text'>"+content+"</p>";
	var marginEl = new jsis.ui.blocks.Margin(contentEl,dialogWindow);
	marginEl.marginHorizontal = 10;
	var handlerData = 
	{
		handler:		handler,
		scope:			handlerScope,
		arguments:		handlerArguments
	};
	dialogWindow.addListener('buttonClick', function(dialogWindow,buttonbar,text)
 	{
		dialogWindow.windowClose();
		jsis.$delegate(this.handler,this.scope,this.arguments)(text);
 	}, handlerData);
	dialogWindow.addListener('titleButtonClick', function(win, button, buttonid)
	{
		// buttonid to na pewno x, bo tylko jego dodajemy
		dialogWindow.windowClose();
		jsis.$delegate(this.handler,this.scope,this.arguments)(false);
	}, handlerData);
	dialogWindow.dialogWindowResizeable = false;
	dialogWindow.height = 150;
	dialogWindow.width = 500;
	dialogWindow.show();
	dialogWindow.height = jsis.$(contentEl._bodyDiv).find('.jsis-dialog-text').height() + 150;
	dialogWindow.left = ( jsis.$(window).width() - dialogWindow.width )/2;
	dialogWindow.top = ( jsis.$(window).height() - dialogWindow.height )/2;
	dialogWindow.refresh();
};
jsis.ui.dialog.CONFIRM = 
{
	rightButtons:	[ jsis.ui.buttonbar.Buttonbar.OK, jsis.ui.buttonbar.Buttonbar.CANCEL ]
};
jsis.ui.dialog.YESNO = 
{
	rightButtons:	[ jsis.ui.buttonbar.Buttonbar.YES, jsis.ui.buttonbar.Buttonbar.NO ]
};
jsis.ui.dialog.ALERT = 
{
	centerButtons:	[ jsis.ui.buttonbar.Buttonbar.OK ]
};