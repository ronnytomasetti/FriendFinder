/**
 * UCF Coding Bootcamp 2016
 * Ronny Tomasetti
 *
 * Home page js script.
 */

$(document).ready(function() {

	/**
	 * On click event handler for take survey button.
	 * Verifies that name and url inputs are not empty.
	 * Adds error class if inputs are empty.
	 * When complete, calls goTakeSurvey function.
	 */
	$('#btn-take-survey').click(function(event) {
		event.preventDefault();

		//TODO: VALIDATE NAME STRING
		//TODO: VALIDATE IMAGE URL STRING

		var name = $('#user-name').val().trim();
		var imgURL = $('#img-url').val().trim();
		var hasFormError = false;

		if (name.length === 0) {
			$('#user-name').parent().addClass('has-error');
			hasFormError = true;
		}

		if (imgURL.length === 0) {
			$('#img-url').parent().addClass('has-error');
			hasFormError = true;
		}

		if (hasFormError)
			$('.error-msg').removeClass('hidden');
		else {
			$('#user-name').val('');
			$('#img-url').val('');
			$('.error-msg').addClass('hidden');
			goTakeSurvey(name, imgURL);
		}
	});

	/**
	 * On change event handler that removes error class,
	 * if assigned, from user name input field once user
	 * has completed filling in their name.
	 */
	$('#user-name').on('change', function() {
		if ($(this).parent().hasClass('has-error'))
			$(this).parent().removeClass('has-error');
	});

	/**
	 * On change event handler that removes error class,
	 * if assigned, from img url input field once user
	 * has completed filling that input.
	 */
	$('#img-url').on('change', function() {
		if ($(this).parent().hasClass('has-error'))
			$(this).parent().removeClass('has-error');
	});

	/**
	 * Function takes validated input from name and url fields
	 * creates user object and passes that json string to through
	 * to the /take-survey route.
	 *
	 * @param  {string} name   User's name from input field.
	 * @param  {string} imgURL User's profile img url from input field.
	 * @return {}
	 */
	function goTakeSurvey(name, imgURL) {
		var user = {
			name: name,
			img: imgURL
		};

		var currentURL = window.location.origin;
		var goToURL = currentURL + '/take-survey/' + encodeURIComponent(JSON.stringify(user));

		window.location.assign(goToURL);
	}
});
