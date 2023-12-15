const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading contacts file:", err);
			return;
		}

		try {
			if (!data.trim()) {
				console.log("No contacts found.");
				return;
			}

			const contacts = JSON.parse(data);
			console.table(contacts);
		} catch (parseError) {
			console.error("Error parsing contacts file:", parseError);
		}
	});
}

function getContactById(contactId) {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading contacts file:", err);
			return;
		}

		try {
			const contacts = JSON.parse(data);
			const contact = contacts.find((c) => c.id === contactId);

			if (contact) {
				console.table([contact]);
			} else {
				console.log("Contact not found.");
			}
		} catch (parseError) {
			console.error("Error parsing contacts file:", parseError);
		}
	});
}

function removeContact(contactId) {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading contacts file:", err);
			return;
		}

		try {
			let contacts = JSON.parse(data);
			const updatedContacts = contacts.filter(
				(c) => c.id !== contactId.toString()
			);

			fs.writeFile(
				contactsPath,
				JSON.stringify(updatedContacts, null, 2),
				(err) => {
					if (err) {
						console.error("Error writing contacts file:", err);
						return;
					}

					console.log("Contact removed successfully.");
				}
			);
		} catch (parseError) {
			console.error("Error parsing contacts file:", parseError);
		}
	});
}

function addContact(name, email, phone) {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading contacts file:", err);
			return;
		}

		let contacts = [];

		if (data.trim()) {
			try {
				contacts = JSON.parse(data);
			} catch (parseError) {
				console.error("Error parsing contacts file:", parseError);
				return;
			}
		}

		const newContact = { id: Date.now().toString(), name, email, phone };
		const updatedContacts = [...contacts, newContact];

		fs.writeFile(
			contactsPath,
			JSON.stringify(updatedContacts, null, 2),
			(err) => {
				if (err) {
					console.error("Error writing contacts file:", err);
					return;
				}

				console.log("Contact added successfully.");
			}
		);
	});
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
