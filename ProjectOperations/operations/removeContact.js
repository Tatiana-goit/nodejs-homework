const fs = require('fs/promises')
const path = require('path')
const {readContent} = require('./readContent')

const removeContact = async (contactId) => {
    const contacts = await readContent();
    const newContactsList = contacts.filter(contact => contact.id !==contactId)
    await fs.writeFile(path.join(__dirname,'../../db','contacts.json'),JSON.stringify(newContactsList,null,2))
  }

module.exports = removeContact