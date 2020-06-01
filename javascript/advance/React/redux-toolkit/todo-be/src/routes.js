const controller = require('./controller');

module.exports = (app) => {
    app.route('/todos')
        .get(controller.getAll)
        .post(controller.create);

    app.route('/todos/completed')
        .get(controller.getCompleted);

    app.route('/todos/:id')
        .post(controller.updateText)
        .delete(controller.delete);

    app.route('/todos/:id/complete')
        .post(controller.complete);

    app.route('/todos/:id/incomplete')
        .post(controller.incomplete);
};
