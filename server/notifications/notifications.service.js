const NotificationsModel = require('./notifications.model');
const UsersService = require('../users/users.service');
const BillsService = require('../bills/bills.service');
const AppError = require('../middleware/AppError');
const paginate = require('../utils/paginate');

exports.findByUserId = async function (userId, opt = {}) {
  try {
    const limit = (opt && opt.limit) || 100;
    const page = (opt && opt.page) || 1;

    const query = { receiver: userId };
    const sort = { createdAt: -1 };

    return await paginate(NotificationsModel, query, {
      page: page,
      limit: limit,
      sort: sort,
    });
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.sendAboutNewRespond = function ({ designerId, orderId, customerId }) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const designer = await UsersService.findById(designerId);

      // сообщение заказчику
      const notifToCompany = {
        title: `Дизайнер ${designer.name} откликнулся на заказ ${orderId}`,
        readAt: '',
        links: [
          {
            name: 'утвердить как исполнителя',
            url: `/cp/company/set-contractor/${designerId}/order/${orderId}`,
            bright: true,
          },
          {
            name: 'Заказ',
            url: `/orders/${orderId}`,
          },
          {
            name: 'Дизайнер',
            url: `/designers/${designerId}`,
          },
        ],
        receiver: `${customerId}`, //  заказчик
      };
      // сообщение дизайнеру
      const notifToDesigner = {
        title: `${designer.name}, вы откликнулись на заказ ${orderId}`,
        readAt: '',
        links: [
          {
            name: 'Заказ',
            url: `/orders/${orderId}`,
          },
        ],
        receiver: `${designerId}`,
      };

      const newNotifsToCompany =
        await NotificationsModel.create(notifToCompany);
      const newNotifsToDesigner =
        await NotificationsModel.create(notifToDesigner);

      if (!newNotifsToCompany || !newNotifsToDesigner) {
        res(false);
      } else {
        res(true);
      }
    } catch (e) {
      console.log(`cant send notification, err:${e}`);
      res(false);
    }
  });
};

exports.sendAboutCheckTheBill = async function ({
  customerId,
  // contractorId,
  orderId,
  billId,
}) {
  try {
    // const chatId = '1';
    const customer = await UsersService.findById(customerId); // заказчик
    // const contractor = await UsersService.findById(contractorId); // исполнитель
    const theBill = await BillsService.findById(billId); // счет
    // const date = formatDateTime(theBill.createdAt);
    const date = theBill.createdAt;

    // сообщение заказчику о создании счета для перевода Авансового платежа по Заказу
    const notifToCustomer_1 = {
      title: [
        `Создан Счет № ${theBill.key} от ${date} для перевода авансового платежа по Заказу ${orderId}. `,
        `Проведите платеж, чтобы Дизайнер смог начать работу. `,
      ].join(''),
      readAt: '',
      links: [
        {
          name: `Счет № ${theBill.key}`,
          url: `/cp/company/bills/${billId}`,
          bright: true,
        },
      ],
      receiver: `${customer.id}`,
    };

    const newNotifsToCompany_1 =
      await NotificationsModel.create(notifToCustomer_1);
    return !!newNotifsToCompany_1;
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.sendAboutNewContractor = function ({
  customerId,
  contractorId,
  orderId,
  chatId,
}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const customer = await UsersService.findById(customerId); // заказчик
      const contractor = await UsersService.findById(contractorId); // исполнитель

      // сообщение заказчику
      const notifToCustomer = {
        title: [
          `${customer.name}, вы назначили Исполнителя для заказа ${orderId} \n`,
          `Теперь Вам доступен Чат с Дизайнером, где вы можете обсудить детали Заказа.`,
        ].join(''),
        readAt: '',
        links: [
          {
            name: 'Заказ',
            url: `/orders/${orderId}`,
          },
          {
            name: 'Исполнитель',
            url: `/designers/${contractorId}`,
          },
          {
            name: 'Чат с исполнителем',
            url: `/chats/${chatId}`,
            bright: true,
          },
        ],
        receiver: `${customer.id}`,
      };
      // сообщение исполнителю
      const notifToContractor = {
        title: [
          `${contractor.name}, вам подтвердили запрос на выполнение заказа ${orderId}. `,
          `Вы назначены Исполнителем. `,
          `Дождитесь, когда Заказчик переведет Предоплату на Счет Заказа `,
          `Вам доступен Чат для общения с Заказчиком `,
        ].join(''),
        readAt: '',
        links: [
          {
            name: 'Заказ',
            url: `/orders/${orderId}`,
          },
          {
            name: 'Чат с Заказчиком',
            url: `/chats/${chatId}`,
            bright: true,
          },
        ],
        receiver: `${contractor.id}`,
      };

      const newNotifToCustomer =
        await NotificationsModel.create(notifToCustomer);
      const newNotifToContractor =
        await NotificationsModel.create(notifToContractor);

      if (!newNotifToCustomer || !newNotifToContractor) {
        res(false);
      } else {
        res(true);
      }
    } catch (e) {
      console.log(`cant send notification, err:${e}`);
      res(false);
    }
  });
};

exports.sendWelcomeToNewDesigner = async (designerId) => {
  try {
    return await NotificationsModel.create({
      title: [
        'Приветствуем!',
        'Заполните разделы Анкета и Портфолио, чтобы получить возможность откликаться на Заказы.',
      ].join(' '),
      readAt: null,
      links: [],
      receiver: designerId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

exports.sendWelcomeToNewCompany = async (companyId) => {
  try {
    // Первое уведомление
    const notif1 = await NotificationsModel.create({
      title: [
        'Приветствуем!',
        'Заполните разделы О компании и Реквизиты, чтобы получить возможность публиковать Заказы.',
      ].join(' '),
      readAt: null,
      links: [],
      receiver: companyId,
    });

    // Второе уведомление
    const notif2 = await NotificationsModel.create({
      title:
        'Приветствуем! Опубликуйте ваш первый заказ. Нажмите "Создать Новый"',
      readAt: null,
      links: [],
      receiver: companyId,
    });

    return !!(notif1 && notif2);
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notifications: ${err.message}`,
      500,
    );
  }
};

exports.sendBillPayedToDesigner = async (designerId, orderId) => {
  try {
    return await NotificationsModel.create({
      title: [
        'Приветствуем!',
        `Заказ ${orderId} был оплачен, можно приступать к работе!`,
      ].join(' '),
      readAt: null,
      links: [
        {
          name: 'Заказ',
          url: `/orders/${orderId}`,
        },
        {
          name: 'Чат с Заказчиком',
          url: `/chats/${orderId}`,
          bright: true,
        },
      ],
      receiver: designerId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

exports.sendBillPayedToCompany = async (companyUserId, orderId) => {
  try {
    return await NotificationsModel.create({
      title: [
        'Приветствуем!',
        `Заказ ${orderId} был оплачен, ожидайте завершения работы!`,
      ].join(' '),
      readAt: null,
      links: [
        {
          name: 'Заказ',
          url: `/cp/company/orders/${orderId}`,
        },
        {
          name: 'Чат с исполнителем',
          url: `/chats/${orderId}`,
          bright: true,
        },
      ],
      receiver: companyUserId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

exports.sendWorkCompletedToCompany = async (companyUserId, orderId) => {
  try {
    return await NotificationsModel.create({
      title: [
        'Cпасибо!',
        `Заказ ${orderId} отмечен Выполненным и отправлен в архив.`,
      ].join(' '),
      readAt: null,
      links: [
        {
          name: 'Заказ',
          url: `/cp/company/orders/${orderId}`,
        },
      ],
      receiver: companyUserId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

exports.sendWorkCompletedToDesigner = async (designerId, orderId) => {
  try {
    return await NotificationsModel.create({
      title: [
        'Заказчик принял работу.',
        'От Вашего имени выставлен Счет на получение гонорара с реквизитами, которые вы указали в Анкете.',
      ].join(' '),
      readAt: null,
      links: [
        {
          name: 'Заказ',
          url: `/orders/${orderId}`,
        },
      ],
      receiver: designerId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

exports.sendWorkCompletedToAdministrator = async (adminId, orderId, billId) => {
  try {
    return await NotificationsModel.create({
      title: [
        `Заказ ${orderId} отмечен Выполненным.`,
        `Выставлен Счет от Исполнителя.`,
      ].join(' '),
      readAt: null,
      links: [
        {
          name: 'Счет',
          url: `/cp/yolk-admin/bills/${billId}`,
        },
      ],
      receiver: adminId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

exports.sendCompleteOrderToDesigner = async (designerId, orderId) => {
  try {
    return await NotificationsModel.create({
      title: [
        `YOLK оплатили заказ ${orderId} по указанным вами реквизитам`,
      ].join(' '),
      readAt: null,
      links: [],
      receiver: designerId,
    });
  } catch (err) {
    throw new AppError(
      `Failed to send welcome notification: ${err.message}`,
      500,
    );
  }
};

// Найти все непрочитанные уведомления
// const unreadNotifications = await Notifications.find({ readAt: null });

// Найти все прочитанные уведомления
// const readNotifications = await Notifications.find({ readAt: { $ne: null } });

// Пометить как прочитанное
// await Notifications.findByIdAndUpdate(id, { readAt: new Date() });
