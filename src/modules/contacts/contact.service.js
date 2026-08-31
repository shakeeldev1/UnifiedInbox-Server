import Contact from "../../models/Contact.js";

const findOrCreateContact = async ({
  channel,
  externalId,
  name,
  phone,
  profilePicture,
}) => {
  let contact = await Contact.findOne({
    channels: {
      $elemMatch: {
        channel,
        externalId,
      },
    },
  });

  if (contact) {
    let updated = false;

    if (name && contact.name === "Unknown") {
      contact.name = name;
      updated = true;
    }

    if (phone && !contact.phone) {
      contact.phone = phone;
      updated = true;
    }

    if (profilePicture && !contact.profilePicture) {
      contact.profilePicture = profilePicture;
      updated = true;
    }

    if (updated) {
      await contact.save();
    }

    return contact;
  }

  contact = await Contact.create({
    name: name || "Unknown",
    phone: phone || null,
    profilePicture: profilePicture || null,
    channels: [
      {
        channel,
        externalId,
      },
    ],
  });

  return contact;
};

export { findOrCreateContact };