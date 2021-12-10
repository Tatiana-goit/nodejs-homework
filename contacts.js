const fs = require('fs/promises')
const path = require('path')
const crupto = require('crypto')

const readContent = async () => {
    const contactsPath = await fs.readFile(path.join(__dirname,'db','contacts.json'))
}
function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.expotrs = { listContacts, getContactById, removeContact, addContact }
