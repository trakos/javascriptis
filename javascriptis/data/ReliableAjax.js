jsis.data.ReliableAjax = jsis.$class(jsis.data.Ajax, 
{
	_error:			function(textStatus,errorThrown)
	{
		this._active = false;
		jsis.ui.dialog(null, "Błąd połączenia - nie udało się uzyskać danych z serwera. Czy chcesz ponowić próbę?", jsis.ui.dialog.YESNO, true, function(textid)
		{
	 		if ( textid == jsis.ui.buttonbar.Buttonbar.YES )
	 		{
	 			this.perform();
	 		}
	 		else
	 		{
	 			this.fireEvent('error', [this,textStatus,errorThrown]);
	 			this._complete(false,textStatus,errorThrown,null);
	 		}
	 	}, this);
	}
});