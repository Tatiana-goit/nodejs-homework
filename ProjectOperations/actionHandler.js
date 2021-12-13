const chalk = require('chalk')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./operations')

const actionHandler = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.log(chalk.blue('CONTACTS LIST'))
      console.table(contacts)
      break

    case 'get':
      const contactById = await getContactById(id)
      if (contactById) {
        console.log(chalk.green('Contact found'))
        console.log(contactById)
        return
      }
      console.log(chalk.yellow('Contact not found'))
      break

      case 'add':
        const contact = await addContact(name, email, phone)
        console.log(chalk.yellow('Add new contact'))
        console.log(contact)
        break

      case 'remove':
        await removeContact(id)
        console.log(chalk.yellow('You delete contact '), id);
        break

    default:
      console.warn(chalk.red('Unknown action type!'))
  }
}

module.exports = actionHandler
