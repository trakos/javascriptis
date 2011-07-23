jsis.ui.blocks.StandardWindow = jsis.$class(jsis.ui.blocks.Window, 
{
	$constructor:		function(content,renderTo)
	{
		this.$super(content,renderTo);
 		this.titlebar.rightButtons = [ jsis.ui.titlebar.Titlebar.MIN, jsis.ui.titlebar.Titlebar.MAX, jsis.ui.titlebar.Titlebar.X ];
 		this.addListener('titleButtonClick', function(win, button, id)
 		{
	 		if ( id == jsis.ui.titlebar.Titlebar.MAX )
	 		{
		 		win.windowMaximize();
		 		win.titlebar.rightButtons[1].buttonId = jsis.ui.titlebar.Titlebar.RESTORE;
		 		win.titlebar.render();
	 		}
	 		else if ( id == jsis.ui.titlebar.Titlebar.RESTORE )
	 		{
		 		win.windowRestore();
		 		win.titlebar.rightButtons[1].buttonId = jsis.ui.titlebar.Titlebar.MAX;
		 		win.titlebar.render();
	 		}
	 		else if ( id == jsis.ui.titlebar.Titlebar.X || id == jsis.ui.titlebar.Titlebar.MIN )
	 		{
		 		win.hide();
	 		}
 		});
 		this.addListener('titleDoubleClick', function(window, title)
 		{
	 		if ( window.windowMaximized )
	 		{
	 			window.windowRestore();
	 			window.titlebar.rightButtons[1].buttonId = jsis.ui.titlebar.Titlebar.MAX;
	 			window.titlebar.render();
	 		}
	 		else
	 		{
	 			window.windowMaximize();
	 			window.titlebar.rightButtons[1].buttonId = jsis.ui.titlebar.Titlebar.RESTORE;
	 			window.titlebar.render();
	 		}
 		});
	},
	_uiType:				"blocks.StandardWindow",
});