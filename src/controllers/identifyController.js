const { Contact } = require('../models');

const identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'At least one of email or phoneNumber is required' });
    }

    let contacts = await Contact.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNumber }]
      }
    });

    if (contacts.length === 0) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: 'primary'
      });

      return res.json({
        contact: {
          primaryContactId: newContact.id,
          emails: [newContact.email],
          phoneNumbers: [newContact.phoneNumber],
          secondaryContactIds: []
        }
      });
    }

    let primaryContact = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];

    let allContacts = await Contact.findAll({
      where: { linkedId: primaryContact.id }
    });

    let secondaryContacts = [...contacts, ...allContacts].filter(c => c.id !== primaryContact.id);
    
    let emails = new Set([primaryContact.email, ...secondaryContacts.map(c => c.email)].filter(Boolean));
    let phoneNumbers = new Set([primaryContact.phoneNumber, ...secondaryContacts.map(c => c.phoneNumber)].filter(Boolean));
    let secondaryIds = secondaryContacts.map(c => c.id);

    if (!contacts.some(c => c.email === email && c.phoneNumber === phoneNumber)) {
      let newContact = await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary'
      });
      secondaryIds.push(newContact.id);
      if (newContact.email) emails.add(newContact.email);
      if (newContact.phoneNumber) phoneNumbers.add(newContact.phoneNumber);
    }

    return res.json({
      contact: {
        primaryContactId: primaryContact.id,
        emails: [...emails],
        phoneNumbers: [...phoneNumbers],
        secondaryContactIds: secondaryIds
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { identifyContact };
