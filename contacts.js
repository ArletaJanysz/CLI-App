const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);

		if (contacts.length === 0) {
			console.log("No contacts found.");
		} else {
			console.table(contacts);
		}
	} catch (error) {
		console.error("Error reading contacts file:", error);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		const contact = contacts.find((c) => c.id === contactId);

		if (contact) {
			console.table([contact]);
		} else {
			console.log("Contact not found.");
		}
	} catch (error) {
		console.error("Error reading contacts file:", error);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		let contacts = JSON.parse(data);
		const updatedContacts = contacts.filter(
			(c) => c.id !== contactId.toString()
		);

		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

		console.log("Contact removed successfully.");
	} catch (error) {
		console.error("Error reading/writing contacts file:", error);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		let contacts = [];

		if (data.trim()) {
			contacts = JSON.parse(data);
		}

		const newContact = { id: Date.now().toString(), name, email, phone };
		const updatedContacts = [...contacts, newContact];

		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

		console.log("Contact added successfully.");
	} catch (error) {
		console.error("Error reading/writing contacts file:", error);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
