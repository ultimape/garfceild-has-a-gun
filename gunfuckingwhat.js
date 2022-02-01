// 2022 @ultimape
// modified gun's tutorial to all hell 
const { node } = require("gun");
const Gun = require("gun");

testgun().then();

async function testgun() {

	var gun = Gun({
		multicast: false,
	});

	gun.ready = function () {
		return gun.get('').once((b) => {
			console.log("we're waiting until gun turns on to write this out lmao");
		})
	};

	await gun.ready();


	console.log();
	console.log("0what doese dave have?");
	var bob = gun.get('bob');
	bob.put({ name: "Bob" });
	await bob.once((b) => {

		console.log("0one of my friend's name is  " + b.name);

	});
	var dave = gun.get('dave').put({ name: "Dave" });

	/*
	{
		bob: {name: "Bob"},
		dave: {name: "Dave"}
	}
	//*/

	console.log();
	console.log("1what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("1one of my friend's name is " + b);

	});

	dave.get('friends').set(bob);
	/*
	{
		bob: {name: "Bob"},
		dave:
		{	name: "Dave",
			friends: {'[uid1]': { #:'/bob' } }
		}
	}
	//*/

	console.log();
	console.log("2what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("2one of my friend's name is " + b);

	});

	bob.get('friends').set(dave);
	/*
	{
		bob:
		{	name: "Bob"
			friends: {'[uid2]': { #:'/dave' } }
		},
		dave:
		{	name: "Dave",
			friends: {'[uid1]': { #:'/bob' } }
		}
	}
	//*/


	console.log();
	console.log("3what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("3one of my friend's name is " + b);

	});

	dave.get('friends').set(dave);
	/*
	{
		bob:
		{	name: "Bob"
			friends: {'[uid2]': { #:'/dave' } }
		},
		dave:
		{	name: "Dave",
			friends:
			{	'[uid1]': { #:'/bob' },
				'[uid3]': { #:'/dave' } }
		}
	}
	//*/


	console.log();
	console.log("4what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("4one of my friend's name is " + b);

	});

	/*dave.get('friends').put("fuckshitfuck"); // ????
	/*
		{
			bob:
			{	name: "Bob"
				friends: {'[uid2]': { #:'/dave' } }
			},
			dave:
			{	name: "Dave",
				friends: "fuckshitfuck"
				//{	'[uid1]': { #:'/bob' },
				//	'[uid3]': { #:'/dave' } }
			}
		}
		//*/


	console.log();
	console.log("5what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("5one of my friend's name is " + b);

	});


	dave.get('friends').set("ohno");
	/*
	{
		bob:
		{	name: "Bob"
			friends: {'[uid2]': { #:'/dave' } }
		},
		dave:
		{	name: "Dave",
			friends: {	'[uid1]': { #:'/bob' },
				'[uid3]': { #:'/dave' },
				'[uid4]': "ohno"  }
		}
	}
	//*/


	console.log();
	console.log("6what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("6one of my friend's name is " + b);

	});

	var garbage = dave.get('friends').get('[uid5]');
	console.log(JSON.stringify(garbage));
	dave.get('friends').set(garbage);
	/** {
	 * 	bob:
	 * 	{	name: "Bob"
	 *  		friends: {'[uid2]': { #:'/dave' } }
	 *  	},
	 *  	dave:
	 *  	{	name: "Dave",
	 *  		friends: {	'[uid1]': { #:'/bob/name' },
	 *  			'[uid3]': { #:'/dave' },
	 *  			'[uid4]': "ohno",
	 *  			'[uid5]': { #:'dave/friends/uid1' }				}
	 *  	}
	 *  }
	 **/

	console.log();
	console.log("7what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("7one of my friend's name is " + b);

	});
	console.log("can we get here");



	//myname = await dave.get('friends').get('[uid5]').once().then();
	//console.log("my name =" + myname + "!"); // "my name is Bob!"

	//??
	console.log("'dave' name is " + dave.get('name'));

	console.log();
	console.log("8what doe dave have?");
	await dave.get('friends').once((b) => {

		console.log("8one of my friend's name is " + b);

	});

	console.log("end");

}
