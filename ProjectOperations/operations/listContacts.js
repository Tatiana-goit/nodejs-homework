const {readContent} = require('./readContent')
const listContacts = async() =>  {
  return await readContent();
}

module.exports = listContacts