#!/usr/bin/env node

// @ts-ignore
process.exitCode = 0;

/**
 * @param {string} command process to run
 * @param {string[]} args commandline arguments
 * @returns {Promise<void>} promise
 */
const runCommand = (command, args) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
        /**
         * 1. command 表示要运行的命令，是一个字符串
         * 2. args 表示要运行指定的参数
         */
		const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true
		});

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

runCommand('nvm', ['--help']).then(() => {
    runCommand('nvm', ['list']).then(() => {
     console.log('done')
    })
})