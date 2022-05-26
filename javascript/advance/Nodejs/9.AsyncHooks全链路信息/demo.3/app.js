const express = require('express');
const app = express();
const PORT = 3000;
const { logger } = require('./logger');

app.use((req, res, next) => logger.run(req, next));

app.get('/logger', async (req, res, next) => {
  try {
  	const users = await getUsersController();
  	res.json({ code: 'SUCCESS', message: '', data: users });
  } catch (error) {
    res.json({ code: 'ERROR', message: error.message })
  }
});

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));

async function getUsersController() {
  logger.info('Get user list at controller layer.');
  return getUsersService();
}

async function getUsersService() {
  logger.info('Get user list at service layer.');
  setTimeout(function() { logger.info('setTimeout 2s at service layer.') }, 3000);
  return getUsersModel();
}

async function getUsersModel() {
  logger.info('Get user list at model layer.');
  return [];
}