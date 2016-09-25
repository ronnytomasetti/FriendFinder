/**
 * UCF Coding Bootcamp 2016
 * Ronny Tomasetti
 *
 * Friend Object
 */

/**
 * Object constructor
 *
 * @param {string} name  Param containing user's name
 * @param {string} photo Param containing user's photo url
 * @param {array} scores Param containing array of survey scores
 * @param {string} uuid  Param containing unique user id string
 * @return {}
 */
function Friend(name, photo, scores, uuid) {
	this.name = name;
	this.photo = photo;
	this.scores = scores;
	this.uuid = uuid;
}

module.exports = Friend;
