jsis.data.ReliableAjax = jsis.$class(jsis.data.Ajax, 
{
	retryQuestionString:"Connection error - couldn't fetch data from server.<br /><br />Do you want to retry?",
	_error:				function(textStatus,errorThrown)
	{
		this._active = false;
		jsis.ui.dialog(null, this.retryQuestionString, jsis.ui.dialog.YESNO, true, function(textid)
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