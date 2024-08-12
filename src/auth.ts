import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {
    AppJWT,
    AppSession,
    AuthorisedUser,
    Licenses,
    Roles,
    SignInFormSchema,
} from '@/lib/types'
import { InvalidAuthenticationCredentialsError } from '@/lib/errors'
// import { saltAndHashPassword } from '@/utils/password'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null

                const { email, password } = await SignInFormSchema.parseAsync(credentials)

                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                // user = await getUserFromDb(credentials.email, pwHash)

                // Mock user 1 or 2 based on email address
                const userId = email.substring(0, 1) === '1' ? 1 : 2

                user = {
                    id: userId ? '1' : '2',
                    name: userId === 1 ? 'Basic User' : 'Premium User',
                    email: email,
                    appData: {
                        details: {
                            firstName: userId === 1 ? 'Basic' : 'Premium',
                            lastName: userId === 1 ? 'Buser' : 'Puser',
                            role: Roles.User,
                        },
                        shop: {
                            id: userId,
                            name: userId === 1 ? 'Basic Shop' : 'Premium Shop',
                            license: userId === 1 ? Licenses.Basic : Licenses.Premium,
                        },
                    },
                } as AuthorisedUser

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new InvalidAuthenticationCredentialsError()
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth?.user
        },
        jwt: async ({ token, user }) => {
            if (user) {
                // Store user details in the token
                (token as AppJWT).userData = user as AuthorisedUser
            }

            return Promise.resolve(token)
        },
        session: async ({ session, token }) => {
            const authorisedUser = (token as AppJWT).userData as AuthorisedUser
            let newSession: AppSession

            if (authorisedUser) {
                // Build a new session based on the user data we placed in the token
                newSession = {
                    user: session.user,
                    userDetails: authorisedUser.appData.details,
                    shop: authorisedUser.appData.shop,
                    expires: session.expires,
                }
            } else {
                // Build a new session with default values
                newSession = {
                    user: session.user,
                    userDetails: {
                        firstName: '',
                        lastName: '',
                        role: Roles.User,
                    },
                    shop: undefined,
                    expires: session.expires,
                }
            }

            return Promise.resolve(newSession)
        },
    }
})
