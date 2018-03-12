function run(interval, frames) {
    var int = 1;
    
    function func() {
        document.body.id = "bg"+int;
        int++;
        if(int === frames) { int = 1; }
    }
    
    var swap = window.setInterval(func, interval);
}

run(4000, 9); //milliseconds, frames



// CLICK EVENT FOR FORM SUBMIT BUTTON
$('#find-zipcode').click(function(event) {

	var result = false;
	$('.alert').hide();

	// PREVENT FORM SUBMIT/PAGE RELOAD
	event.preventDefault();

	

	$.ajax({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/xml?address='+encodeURIComponent($("#address").val())+'&key=AIzaSyCfAYdCFC0QYpHFJ-uYp84VL3gZSyyZW30',
      dataType: 'xml',
      success: processXML,
      error: error
    });

		function error() {
			$('.alert-danger').html('Could Not Connect to Server. Please Try Again.');
      $('.alert-danger').fadeIn();
		}

    function processXML(xml) {
      $(xml).find('address_component').each(function() {

        if ($(this).find('type').text() == 'postal_code') {


        	$('#zipcode').html($(this).find('long_name').text());
          $('.alert-light').fadeIn();

          result = true;
        }

      });

      if (result == false) {
      	$('.alert-danger').html('Could Not Find Zipcode for that Address. Please Try Again.');
      	$('.alert-danger').fadeIn();
      }
    }

});