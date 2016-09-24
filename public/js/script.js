$(document).ready(function() {
	$('#user-name').on('change', function() {
		if ($(this).parent().hasClass('has-error'))
			$(this).parent().removeClass('has-error');
	});

	$('#img-url').on('change', function() {
		if ($(this).parent().hasClass('has-error'))
			$(this).parent().removeClass('has-error');
	});

	$('#btn-take-survey').click(function(event) {
		event.preventDefault();

		var name = $('#user-name').val().trim();
		var imgURL = $('#img-url').val().trim();
		var hasFormError = false;

		if (name.length === 0) {
			$('#user-name').parent().addClass('has-error');
			hasFormError = true;
		}

		//TODO: validate img URL string
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
