const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const chalk = require('chalk')

const { Command } = require('commander')
const program = new Command()

program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()


class ContactsOperations {
  constructor(action, id, name, email, phone) {
    this.action = action
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
  }

  actionHandler = async ( {action, id, name, email, phone }) => {
    switch (action) {
      case 'list':
        const contacts =await this.listContacts()
        console.log(chalk.blue('CONTACTS LIST'))
        console.table(contacts)
        break

      case 'get':
        const contactById =await this.getContactById(id)
        if (contactById) {
          console.log(chalk.green('Contact found'))
          console.log(contactById)
          return
        }
        console.log(chalk.yellow('Contact not found'))
        break

      case 'add':
        const contact =  await this.addContact(name, email, phone)
        console.log(chalk.yellow('Add new contact'))
        console.log(contact)
        break

      case 'remove':
        await this.removeContact(id)
        console.log(chalk.yellow('You delete contact '), id)
        break

      default:
        console.warn(chalk.red('Unknown action type!'))
    }
  }

  readContent = async () => {
    const contactsPath =await fs.readFile(
      path.join(__dirname, '../db', 'contacts.json'),
      'utf8',
    )
    const result = JSON.parse(contactsPath)
    return result
  }

  listContacts = async () => {
    return await this.readContent()
  }

  getContactById = async (contactId) => {
    const contacts = await this.readContent()
    const [contact] = contacts.filter((contact) => contact.id === contactId)
    return contact
  }

  removeContact = async (contactId) => {
    const contacts = await this.readContent()
    const newContactsList = contacts.filter(
      (contact) => contact.id !== contactId,
    )
    await fs.writeFile(
      path.join(__dirname, '../db', 'contacts.json'),
      JSON.stringify(newContactsList, null, 2),
    )
  }

  addContact = async (name, email, phone) => {
    const contacts =  this.readContent()
    const newContact = { name, email, phone, id: crypto.randomUUID() }
    contacts.push(newContact)
    await fs.writeFile(
      path.join(__dirname, '../db', 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    )
    return newContact
  }

  init = () => {
      this.actionHandler(this.action, this.id, this.name, this.email, this.phone)
  }
}

module.exports = new ContactsOperations(argv).init()
