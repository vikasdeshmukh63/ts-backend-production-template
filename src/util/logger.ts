import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnviornment } from '../constants/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'
import { blue, green, magenta, red, yellow } from 'colorette'

// linking trace support
sourceMapSupport.install()

const colorizeLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const consoleLogFormat = format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorizeLevel(level.toUpperCase())

    const customTimeStamp = green(timestamp as string)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`

    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnviornment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

const fileLogFormat = format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...consoleTransport()]
})
