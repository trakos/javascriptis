StandardElement

	AbstractContainer
		Titlebar //przyjmuje titlebar.Element
		Toolbar // przyjmuje toolbar.Element
		Formbar // przyjmuje form.Element 
		AbstractStandardContainer
			multiblock.VerticalContainer
			multiblock.HorizontalContainer
			multiblock.CenteredContainer
			multiblock.AbstractOneAtATimeContainer
				multiblock.TabContainer
				multiblock.AccordionContainer
			singleblock.StandardPane(titlebar,toolbar,standardelement,toolbar,formbar) // drugi toolbar to stopka
				singleblock.Window(titlebar,toolbar,standardelement,toolbar,formbar)
			endblock.Grid
			endblock.Tree
			endblock.Gallery
			endblock.Form	
			
	titlebar.Element
		titlebar.Title
		titlebar.ImageButton
		
	toolbar.Element
		toolbar.FormElement(formelement)
		toolbar.Label
			toolbar.Button
		toolbar.MenuItem
			toolbar.Menu
	
	form.Element
		form.TextInput
		form.Combo
		form.DatePicker
			form.DateTimePicker
		form.NumberInput
		form.Button