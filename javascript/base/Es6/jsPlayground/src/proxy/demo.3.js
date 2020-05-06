const sendEmail = () => {
    console.log("sending email after task completion")
};

const handler = {
    set: function (target, prop, value) {
        if (prop === 'status' && value === 'complete') {
            sendEmail()
        }
        target[prop] = value
    }
};

const tasks = new Proxy({}, handler);

tasks.status = "complete";