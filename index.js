const yargs = require("yargs");

const argv = yargs.argv;

function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			// implementacja
			break;

		case "get":
			// implementacja
			break;

		case "add":
			// implementacja
			break;

		case "remove":
			// implementacja
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
