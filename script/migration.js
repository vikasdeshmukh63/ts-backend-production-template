const { exec } = require('child_process')

// command line arguments
const command = process.argv[2]
const migrationName = process.argv[3]

// valid migration commands
const validCommands = ['create', 'up', 'down', 'list', 'prune']
if (!validCommands.includes(command)) {
    console.error(`Invalid command: Command must be one of ${validCommands}`)
    process.exit(0)
}

const commandsWithoutMigrationNameRequired = ['list', 'prune']
if (!commandsWithoutMigrationNameRequired.includes(command)) {
    if (!migrationName) {
        console.error(`Migration name is required`)
        process.exit(0)
    }
}

function runNpmScript() {
    return new Promise((resolve, reject) => {
        let execCommand = ``

        if (commandsWithoutMigrationNameRequired.includes(command)) {
            execCommand = `migrate ${command}`
        } else {
            execCommand = `migrate ${command} ${migrationName}`
        }

        const childProcess = exec(execCommand, (error, stdout) => {
            if (error) {
                reject(`Error running script: ${error}`)
            } else {
                resolve(stdout)
            }
        })

        childProcess.stderr.on('data', (data) => {
            console.error(data)
        })
    })
}

// example useage:
runNpmScript()
    .then((output) => {
        console.info(output)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
