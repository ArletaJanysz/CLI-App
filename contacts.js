import { promises as fsPromises } from "fs";
import path from "path";

const contactsPath = path.join(
	process.cwd(),
	"routes",
	"api",
	"db",
	"contacts.json"
);

async function listContacts() {
	try {
		const data = await fsPromises.readFile(contactsPath, "utf8");
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
		const data = await fsPromises.readFile(contactsPath, "utf8");
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
		const data = await fsPromises.readFile(contactsPath, "utf8");
		let contacts = JSON.parse(data);
		const updatedContacts = contacts.filter(
			(c) => c.id !== contactId.toString()
		);

		await fsPromises.writeFile(
			contactsPath,
			JSON.stringify(updatedContacts, null, 2)
		);

		console.log("Contact removed successfully.");
	} catch (error) {
		console.error("Error reading/writing contacts file:", error);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fsPromises.readFile(contactsPath, "utf8");
		let contacts = [];

		if (data.trim()) {
			contacts = JSON.parse(data);
		}

		const newContact = { id: Date.now().toString(), name, email, phone };
		const updatedContacts = [...contacts, newContact];

		await fsPromises.writeFile(
			contactsPath,
			JSON.stringify(updatedContacts, null, 2)
		);

		console.log("Contact added successfully.");
	} catch (error) {
		console.error("Error reading/writing contacts file:", error);
	}
}

export { listContacts, getContactById, removeContact, addContact };
