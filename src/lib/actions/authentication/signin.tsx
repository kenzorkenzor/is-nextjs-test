'use server'

import { signIn as authSignIn } from '@/auth'
import {
    SignInFormSchema,
    SignInFormValues,
} from '@/lib/types'
import {
    isInstanceOfServerErrorInterface,
    ServerActionValidationError,
} from '@/lib/errors'
import { ZodError } from 'zod'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function signIn(data: SignInFormValues) {
    // Validate
    const parseResult = SignInFormSchema.safeParse(data)

    if (!parseResult.success) {
        const invalidFields: { [key: string]: string[] } = {}

        parseResult.error?.issues.forEach((issue) => {
            if (!invalidFields[issue.path[0]]) {
                invalidFields[issue.path[0]] = []
            }

            invalidFields[issue.path[0]].push(issue.message)
        })

        return {
            error: ServerActionValidationError.fromZodError(parseResult).toServerResponse(),
        }
    }

    // Sign in
    try {
        await authSignIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            if (isInstanceOfServerErrorInterface(error.cause?.err)) {
                return {
                    error: error.cause.err.toServerResponse(),
                }
            }

            return {
                error: error.type,
            }
        } else if (error instanceof ZodError) {
            return {
                error: ServerActionValidationError.fromZodError(error).toServerResponse(),
            }
        }

        throw error
    }

    redirect(data.redirectTo || '/pictures')
}
