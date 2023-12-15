const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
	// implementacja
}

function getContactById(contactId) {
	// implementacja
}

function removeContact(contactId) {
	// implementacja
}

function addContact(name, email, phone) {
	// implementacja
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
