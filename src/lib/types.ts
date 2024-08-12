import {
    object,
    string,
    z,
} from 'zod'
import {
    Session,
    User,
} from 'next-auth'
import { JWT } from '@auth/core/jwt'

/**
 * Sign in form schema.
 */
export const SignInFormSchema = object({
    email: string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: string({ required_error: 'Password is required' })
        .min(1, 'Password is required'),
    redirectTo: string()
        .optional(),
})

/**
 * Sign in form values.
 */
export type SignInFormValues = z.infer<typeof SignInFormSchema>

/**
 * Subscription plans / licenses.
 */
export const Licenses = {
    Basic: 0,
    Premium: 1,
}

export type License = typeof Licenses[keyof typeof Licenses]

/**
 * User roles.
 */
export const Roles = {
    User: 0,
    Admin: 1,
}

export type Role = typeof Roles[keyof typeof Roles]

/**
 * Shop object.
 */
export interface Shop {
    id: number
    name: string
    license: License
}

/**
 * Details regarding a user that are not sensitive and will be kept in the JWT and Session.
 */
interface AuthorisedUserDetails {
    firstName: string
    lastName: string
    role: Role
}

/**
 * User object that will be returned from the authorize callback.
 */
export interface AuthorisedUser extends User {
    appData: {
        details: AuthorisedUserDetails
        shop: Shop | undefined
    }
}

/**
 * Extension of the JWT object to include the user data.
 */
export interface AppJWT extends JWT {
    userData: AuthorisedUser
}

/**
 * Extension of the Session object to include the user details and shop
 */
export interface AppSession extends Session {
    userDetails: AuthorisedUserDetails
    shop: Shop | undefined
}
