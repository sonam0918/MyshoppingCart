

function validate()
{
	/* Validating checkboxes input */
	var cb2 = document.getElementById("retailFlag");
	var cb1 = document.getElementById("wholeSaleFlag");
	
	
	if ( cb1.checked == true && cb2.checked == true )
	{
		alert("Both checkbox cannot be selected. Please Check one!");
		
	}

/* Modifying discount to 25% if wholesale is checked */
	if (cb1.checked == true )
	{
		document.getElementById("discount_rate").value = 25;
	}
	else
	{
		document.getElementById("discount_rate").value = 0;
	}

}