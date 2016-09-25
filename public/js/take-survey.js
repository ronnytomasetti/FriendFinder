var numOfQuestions = 0;
var surveyResponses = {};

/**
 * Initializes surveyResponses object with same number of
 * keys as there are questions in survey.
 *
 * @return {}
 */
function initSurveyResponsesObject() {
	numOfQuestions = $('#survey').attr('total-questions');

	for (var i = 0; i < numOfQuestions; i++) {
		surveyResponses['resGroup' + i] = null;
	}
}

/**
 * Grabs user name and img url variables stored in
 * survey header, creates user scores array, and
 * submits the data via ajax POST request.
 *
 * @return {}
 */
function submitSurvey() {
	var userName = $('.survey-header').attr('data-user');
	var userimgURL = $('.survey-header').attr('data-img');
	var userScores = [];

	$.each(surveyResponses, function(key, val) {
		userScores.push(parseInt(val));
	});

	var newSurvey = {
		name: userName,
		photo: userimgURL,
		scores: userScores
	};

	var currentURL = window.location.origin;

	$.ajax({
		type: 'POST',
		url: currentURL + '/api/friends',
		dataType: 'json',
		data: newSurvey,
		success: function(data) {
		  window.location.assign('/survey-results/' + data.uuid);
	  	},
		error: function() {
		  console.log('AJAX ERROR');
	  	}
	});
}

$(document).ready(function() {

	/**
	 * On click event handler for responses div that will
	 * grab value of button clicked and stores it into surveyResponses
	 * object in same position as question.
	 */
	$('.response').click(function(event) {
		event.preventDefault();

		var resGroupId = $(this).attr('id');
		var resValue = $(event.target).text();

		surveyResponses[ resGroupId ] = parseInt(resValue);

		// $(this).parent().removeClass('bg-danger');
	});

	/**
	 * On click event handler for submit survey button.
	 * Adds bg-danger class to any response not yet answered.
	 * When all questions have been answered, calls submitSurvey()
	 */
	$('#submit-btn').click(function(event) {
		event.preventDefault();

		for (var res in surveyResponses) {
			if (surveyResponses[res] === null)
				$('#' + res).parent().addClass('bg-danger');
			else
				$('#' + res).parent().removeClass('bg-danger');
		}

		var notAnswered = $('tbody').find('.answers.bg-danger').length;

		if ( notAnswered === 0 ) {
			$('#survey-error').text(' ');
			$(this).addClass('disabled');
			submitSurvey();
		}
		else
			$('#survey-error').text('Please answer the ' + notAnswered + ' question(s) remaining before submitting survey.');

		return false;
	});

	// ==============================================
	// On document ready, initialize response object.
	// ==============================================
	initSurveyResponsesObject();
});
