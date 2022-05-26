const refreshMenuBarCommand = (reciver) => {
    return {
        execute: () => {
           reciver.refresh() 
        }
    }
}

const setCommand = (button) => {
    return (command) => {
        button.onclick = () => {
            command.execute()
        }
    }
}
const MenuBar = document.getElementById('menuBar')
const btn = document.getElementById('button')
const command = refreshMenuBarCommand(MenuBar)
setCommand(btn)(command)