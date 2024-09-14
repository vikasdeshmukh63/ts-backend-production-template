export default {
    SUCCESS: `The operation has been successfull`,
    SOMETHING_WENT_WRONG: `Something went wrong`,
    NOT_FOUND: (entity: string) => {
        return `${entity} not found`
    },
    TOO_MANY_REQUESTS: `Too many requests! Please try again after some time`
}
