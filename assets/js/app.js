// FUNCTION TO CHANGE BACKGROUND IMAGES
function bgImages(interval, frames) {
		// SET NUMBER VARIABLE TO 1
    var num = 1;
    // FUNCTION TO CHANGE BODY ID TO CORRESPOND WITH NUMBER VARIABLE
    function slide() {
        document.body.id = "bg"+num;
        // INCREASE NUMBER VARIABLE BY 1
        num++;
        // IF NUMBER VARIABLE EQUALS THE NUMBER OF BACKGROUND IMAGES
        // RESET NUMBER VARIABLE TO 1 (WILL START BACKGROUND IMAGE LOOP OVER) 
        if (num === frames) { 
        	num = 1; 
        }
    }
    // SET INTERVAL FOR IMAGES
    var swap = window.setInterval(slide, interval);
}
// RUN BACKGROUND IMAGE FUNCTION
bgImages(4000, 9); // MILLISECONDS, FRAMES



// CLICK EVENT FOR FORM SUBMIT BUTTON
$('#find-zipcode').click(function(event) {

	// CREATE BOOLEAN FOR SEARCH RESULT SET AT FALSE
	var result = false;
	// HIDE POSSIBLE ALERTS FROM PREVIOUS SEARCHES
	$('.alert').hide();

	// PREVENT FORM SUBMIT/PAGE RELOAD
	event.preventDefault();

	
	// AJAX CALL
	$.ajax({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/xml?address='+encodeURIComponent($("#address").val())+'&key=AIzaSyCfAYdCFC0QYpHFJ-uYp84VL3gZSyyZW30',
      dataType: 'xml',
      success: processXML,
      error: error
    });

		// FUNCTION FOR ERROR IF AJAX CALL DOES NOT WORK OR USER DOES NOT ENTER ADDRESS
		function error() {
			// ADD ERROR MESSAGE TO BOOTSTRAP ALERT
			$('.alert-danger').html('Could Not Connect to Server. Please Try Again.');
			// DISPLAY BOOTSTRAP ALERT
      $('.alert-danger').fadeIn();
		}

		// FUNCTION TO PROCESS AJAX CALL IN XML FORMAT
    function processXML(xml) {
    	// FIND THE 'ADDRESS_COMPONENT' OF XML RESULTS
      $(xml).find('address_component').each(function() {

      	// FIND THE 'POSTAL_CODE' OF THE 'ADDRESS COMPONENT'
        if ($(this).find('type').text() == 'postal_code') {

        	// ADD 'POSTAL_CODE' TO BOOTSTRAP ALERT
        	$('#zipcode').html($(this).find('long_name').text());
        	// DISPLAY BOOTSTRAP ALERT
          $('.alert-light').fadeIn();
          // CHANGE BOOLEAN FOR SEARCH RESULT TO TRUE
          result = true;
        }

      });

      // IF THE RESULT BOOLEAN STAYS FALSE
      if (result == false) {
      	// ADD ERROR MESSAGE TO BOOTSTRAP ALERT
      	$('.alert-danger').html('Could Not Find Zipcode for that Address. Please Try Again.');
      	// DISPLAY BOOTSTRAP ALERT
      	$('.alert-danger').fadeIn();
      }
    }

});