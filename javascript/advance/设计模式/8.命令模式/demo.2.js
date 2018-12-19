const MacroCommand = (...commands) => {
    return {
        commandList: commands || [],
        add: function (command) {
            this.commandList.push(command)
        },
        execute: function () {
            this.commandList.forEach(command => {
                command.execute();
            });
        }
    }
}

const openDoorCommand = delay => {
    return {
        execute: () => {
            setTimeout(() => {
                console.log('Open Door.')
            }, delay * 1000)
        }
    }
}

const openPcCommand = (delay) => {
    return {
        execute: () => {
            setTimeout(() => {
                console.log('Open Computer.')
            }, delay * 1000)
        }
    }
}

const openQQCommand = (delay) => {
    return {
        execute: () => {
            setTimeout(() => {
                console.log('Open QQ.')
            }, delay * 1000)
        }
    }
}

MacroCommand(openDoorCommand(1), openPcCommand(2), openQQCommand(3)).execute()
