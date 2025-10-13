const express = require('express');
const UsersService = require('./users.service');
const UserInfoService = require('../userinfo/userinfo.service');
const PortfoliosService = require('../portfolios/portfolios.service');

const CompaniesService = require('../companies/companies.service');
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const NotificationsService = require('../notifications/notifications.service');

const router = express.Router();

// GET /api/users/role/designer     - все дизайнеры
// GET /api/users/me                - текущий пользователь (из сессии)
// GET /api/users/:id               - конкретный пользователь
// GET /api/users                   - все пользователи  / не реализована

// PATCH /users/me/select-role      - обновить роль аутентифицированного пользователя
// PATCH /users/:id                 - обновить данные аутентифицированного пользователя

router.get(
  '/users/role/designer',
  asyncHandler(async (req, res) => {
    const users = await UsersService.findDesigners();
    const designers = users.map((user) => {
      //------------------------------------
      //     hidding private information
      //------------------------------------
      const { userCompany: _, ...publicUser } = user.toJSON();
      publicUser.userInfo.phone = '';
      return publicUser;
    });

    // добавляем портфолио
    for (let i = 0; i < designers.length; i++) {
      const portfolios = await PortfoliosService.findByUserId(designers[i].id);
      designers[i].portfolios = portfolios.map((p) => p.toJSON()) || [];
    }

    sendSuccess(res, { designers });
  }),
);

router.get(
  '/users/me',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    sendSuccess(res, { user: user.toJSON() });
  }),
);

router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(`search user ${id}`);
    const user = await UsersService.findById(id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    //------------------------------------
    //     hidding private information
    //------------------------------------
    const { userCompany: _, ...publicUser } = user.toJSON();
    publicUser.userInfo.phone = '';
    //------------------------------------
    if (publicUser.role === 'designer') {
      // подгружаем портфолио
      const portfolios = await PortfoliosService.findByUserId(publicUser.id);
      publicUser.portfolios = portfolios.map((p) => p.toJSON()) || [];
    }
    sendSuccess(res, { user: publicUser });
  }),
);

router.patch(
  '/users/me/select-role',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    try {
      const { role } = req.body;
      const userId = req.user.id;

      const userData = {
        role,
      };

      const user = await UsersService.update(userId, userData);

      if (!user) {
        return sendError(res, 'Не удалось обновить данные пользователя', 404);
      }

      if (userData.role === 'designer') {
        await NotificationsService.sendWelcomeToNewDesigner(userId);
      }

      if (userData.role === 'company' && !user.userCompany) {
        const newUserCompany = await CompaniesService.create({ userId });
        user.userCompany = newUserCompany._id;
        await user.save();
        await NotificationsService.sendWelcomeToNewCompany(userId);
      }

      sendSuccess(res, { message: 'Данные сохранены' });
    } catch (e) {
      console.log(e);
      sendError(e, 500);
    }
  }),
);

router.patch(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { userData, userInfo } = req.body;

    console.log('Получены данные:', userData, userInfo);

    // обновляем пользователя
    if (userData) {
      const userUpdated = await UsersService.update(id, userData);
      if (!userUpdated) {
        const errMsg = `Не удалось обновить данные пользователя ${id}`;
        return sendError(res, errMsg, 404);
      }
      console.log('saved user', userUpdated);
    }

    // обновляем расширенные данные пользователя
    if (userInfo) {
      const userInfoUpdated = await UserInfoService.update(
        userInfo.id,
        userInfo,
      );
      if (!userInfoUpdated) {
        return sendError(res, 'Не удалось обоновить данные пользователя', 404);
      }
      console.log('saved userInfo', userInfoUpdated);
    }

    sendSuccess(res, { message: 'Данные сохранены' });
  }),
);

router.get(
  '/admin/users',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { user } = req;

    if (!user || user.role !== 'administrator') {
      return sendError(res, 'У вас нет прав для просмотра пользователей', 403);
    }
    console.log(req.query);
    const { role } = req.query;

    if (!role) {
      const users = await UsersService.findAll();
      return sendSuccess(res, { users });
    }

    const users =
      role === 'designer'
        ? await UsersService.findAdminDesigners()
        : await UsersService.findCompanies();
    return sendSuccess(res, { users });
  }),
);

module.exports = router;
