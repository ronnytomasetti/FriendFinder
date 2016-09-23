var numOfQuestions = 0;
var surveyResponses = {};

function initSurveyResponsesObject() {
	numOfQuestions = $('#survey').attr('total-questions');

	for (var i = 0; i < numOfQuestions; i++) {
		surveyResponses['resGroup' + i] = null;
	}
}

function submitSurvey() {
	console.log('SUBMIT SURVEY', JSON.stringify(surveyResponses, null, 4));

	var name = 'TESTING FUNCTIONS';
	var imgURL = 'IMAGE URL';

	var currentURL = window.location.origin;

	$.post(currentURL + '/api/surveys', surveyResponses, function(data) {
		if (data)
			window.location.assign('/survey-results/' + name);
		else
			console.log("ERROR");
	});
}

$(document).ready(function() {

	$('.response').click(function(event) {
		event.preventDefault();

		var resGroupId = $(this).attr('id');
		var resValue = $(event.target).text();

		surveyResponses[ resGroupId ] = resValue;
	});

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

	initSurveyResponsesObject();
});
