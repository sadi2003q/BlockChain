



import {NextResponse, NextRequest} from 'next/server'



function authMiddleware(req: NextRequest){

    const path = req.nextUrl.pathname;

    const isPublicPath = path.startsWith('/signin') || path.startsWith('/signup') || path === '/';
    const token = req.cookies.get("auth")?.value;

    // ❌ Not logged in → trying to access a protected route
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    // ✅ Logged in → trying to access auth pages
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // ✅ Allow the request to continue
    return NextResponse.next()
}

 export function proxy(req: NextRequest){
    return authMiddleware(req);
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/signin',
        '/signup'
    ]
}