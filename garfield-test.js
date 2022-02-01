// 2022 @ultimape
// modified gun's tutorial to all heck
//
// use "yarn install" or "npm install" to get teh dependancies (gun)
// run with "$node garfield-test.js"
// see console output
const { on } = require("events");
const Gun = require("gun");
const { off } = require("process");

var gun = Gun({
	multicast: false,
	axe: false,
	log: on,
});



testgun();

async function testgun() {


	// create an orange cat
	var garfield = gun.get('garfield');
	garfield.put({ name: "I am Orange Cat" });

	// create sad man
	var jon = gun.get("jon");
	jon.put({ name: "I am Jon Arbuckle" });

	// create pookie bear
	var pookie = gun.get("pookie");
	pookie.put({ name: "I am pookie, the teddybear" });

	// they are friends
	jon.get('friends').set(garfield);
	garfield.get('friends').set(jon);
	garfield.get('friends').set(pookie);

	// lets list jon's friends names
	var map_jons_friends = jon.get('friends').map();
	await map_jons_friends.once((o) => {
		console.log("Where are you jon? " + o['name']);
	}).then();
	// should output
	// "Where are you jon? I am Orange Cat"


	// lets list garfireld's friends name
	var map_garfields_friends = garfield.get('friends').map();
	await map_garfields_friends.once((o) => {
		console.log("I'm garfield's friend: " + o['name']);
	}).then();
	// should output
	// "I'm garfield's friend: I am pookie, the teddybear"
	// "I'm garfield's friend: I am Jon Arbuckle"

	// we can call once on the set "friends"
	await garfield.get('friends').once((b) => {
		console.log("Garfireld has good friends");
	});
	// should output
	// "Garfireld has good friends!"

	// ok lets try doing stuff with these characters
	console.log("garfield is hungry");

	// odie is a friend, lets eat him
	var odie = garfield.get('friends').get('pookie'); // pookie is a valid node attached to friends
	garfield.get('friends').set(odie);  // this should trigger "I'm garfield's friend: undefined" becaues of the map above

	// garfield wants to be friends with odie
	console.log("I am hungry, can I eat odie?")

	// we can call once() on the set "friends"
	await garfield.get('friends').once((b) => {
		console.log("Garfield! stop trying to eat odie");
	});

	// lasagna is a friend, lets eat that!
	var lasagna = garfield.get('lasagna'); // note this get is to a non-existant node "lasagna"
	garfield.get('friends').set(lasagna); // this seems to break it now
	// I believe this should trigger a second "I'm garfield's friend: undefined" becaues of the map above

	// garfield want to be friends with lasagna
	console.log("Where is my lasagna jon? I need my lasagna"); // we get this far

	// but it silently breaks when we actually try to use once() on friends
	// there is also only one "I'm garfield's friend: undefined" (not two)
	await garfield.get('friends').once((b) => {
		console.log("Where is my LASAGNA?!"); // this never happens ?! 
	});

	console.log("I'm so sorry jon, I was really hungry..."); // so this never shows up
	map_jons_friends.off();
	map_garfields_friends.off();


	return;
}
