/**
 * Friend Object
 * UCF Coding Bootcamp 2016
 * By: Ronny Tomasetti
 */

/**
 * Friend object constructor
 *
 * @param {}
 * @return {}
 */
function Friend(name, photo, scores, uuid) {
	this.name = name;
	this.photo = photo;
	this.scores = scores;
	this.uuid = uuid;
}

module.exports = Friend;
