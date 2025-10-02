const UsersService = require('../users/users.service');
module.exports = async () => {
  const addAdmins = async () => {
    const arr = ['yolk2025@yandex.ru'];
    for (const email of arr) {
      await UsersService.create({ email: email, role: 'administrator' });
    }
  };
  const admins = await UsersService.findAdmins();
  (!admins || admins.length === 0) && (await addAdmins());
};
