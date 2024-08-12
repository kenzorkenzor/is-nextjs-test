import { ZodIssue } from 'zod'
import { CredentialsSignin } from 'next-auth'

export interface ServerErrorInterface {
    name: string
    toServerResponse: () => {
        name: string
        [key: string]: any
    }
}

export function isInstanceOfServerErrorInterface(object: any): object is ServerErrorInterface {
    return object && typeof object['toServerResponse'] === 'function'
}

export class ServerError extends Error {
    name = 'ServerError'

    toJSON() {
        return {
            name: this.name,
        }
    }

    toServerResponse() {
        return {
            name: this.name,
        }
    }
}

export class ServerActionValidationError extends Error implements ServerErrorInterface {
    name = 'ServerActionValidation'
    invalidFields: { [key: string]: string[] } = {}

    static fromZodError(parseResult: any) {
        const invalidFields: { [key: string]: string[] } = {}

        parseResult.error?.issues.forEach((issue: ZodIssue) => {
            if (!invalidFields[issue.path[0]]) {
                invalidFields[issue.path[0]] = []
            }

            invalidFields[issue.path[0]].push(issue.message)
        })

        return new ServerActionValidationError(invalidFields)
    }

    constructor(invalidFields: { [key: string]: string[] } = {}) {
        super()
        this.invalidFields = invalidFields
    }

    toJSON() {
        return {
            name: this.name,
            invalidFields: this.invalidFields,
        }
    }

    toServerResponse() {
        return {
            name: this.name,
            data: {
                invalidFields: this.invalidFields,
            },
        }
    }
}

export class InvalidAuthenticationCredentialsError extends CredentialsSignin implements ServerErrorInterface {
    name = 'InvalidAuthenticationCredentials'

    toServerResponse() {
        return {
            name: this.name,
        }
    }
}
