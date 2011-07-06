
		// what we want to have
		jsis.alert("tytuł","opis",function( button )
		{
			if ( button == jsis.core.Dialog.OK )
			{
				// ok
			}
			else if ( button == jsis.core.Dialog.X )
			{
				// clicked 'x'
			}
		});


		// jsis.core.Dialog
		jsis.core.Dialog = 
		{
				$constructor(title, description):	function()
				{
					this._title = new jsis.ui.titlebar.Title("tytuł okna");
					this._x = new jsis.ui.titlebar.IconButton( jsis.ui.titlebar.Button.ICON_CLOSE );
					this._titlebar = new jsis.ui.Titlebar([this._title, this._x]);
					this._button = new jsis.core.Button("OK");
					this._footerbar = new jsis.ui.Footerbar([this._button]);
					this._window = new jsis.ui.Window();
					this._window.footerbar = this._footerbar;
					this._window.titlebar = this._titlebar;
					this._window.contentHtml = '<p>Informacja!</p>';
					this._window.refresh();
					this._window.show();
				},
		};

		jsis.ui.