const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => !re.test(email));

  if (invalidEmails.length) {
    return `these emails are invalid ${invalidEmails}`;
  }
  return undefined;
};
