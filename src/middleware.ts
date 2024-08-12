import { auth } from '@/auth'

export default auth((req) => {
    const validLoggedOutPaths = ['/login', '/logout', '/signup']
    const invalidLoggedInPaths = ['/login', '/signup']

    if (!req.auth && !validLoggedOutPaths.includes(req.nextUrl.pathname)) {
        const newUrl = new URL('/login', req.nextUrl.origin)
        return Response.redirect(newUrl)
    }

    if (req.auth && invalidLoggedInPaths.includes(req.nextUrl.pathname)) {
        const newUrl = new URL('/pictures', req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
