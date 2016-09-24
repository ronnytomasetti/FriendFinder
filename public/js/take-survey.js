var numOfQuestions = 0;
var surveyResponses = {};

function initSurveyResponsesObject() {
	numOfQuestions = $('#survey').attr('total-questions');

	for (var i = 0; i < numOfQuestions; i++) {
		surveyResponses['resGroup' + i] = null;
	}
}

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
		url: currentURL + '/api/friends',
		data: newSurvey,
		error: function() {
			console.log('AJAX ERROR');
		},
		dataType: 'json',
		success: function(data) {
		  window.location.assign('/survey-results/' + data.uuid);
		},
		type: 'POST'
	});

	// $.post(currentURL + '/api/friends', newSurvey, function(data) {
	// 	if (data)
	// 		window.location.assign('/survey-results/' + data.uuid);
	// 	else
	// 		console.log("ERROR");
	// });
}

$(document).ready(function() {

	$('.response').click(function(event) {
		event.preventDefault();

		var resGroupId = $(this).attr('id');
		var resValue = $(event.target).text();

		surveyResponses[ resGroupId ] = parseInt(resValue);

		// $(this).parent().removeClass('bg-danger');
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
