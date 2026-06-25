import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Exclude static assets, images, and API routes from tracking
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // ==========================================
    // 🔐 ADMIN SECURITY WALL SUB-SYSTEM
    // ==========================================
    if (pathname.startsWith('/admin')) {
        // Exclude the login screen route itself to prevent infinite redirect loops!
        if (pathname !== '/admin/login') {
            const sessionCookie = request.cookies.get('admin_session')?.value;
            const verifiedPayload = sessionCookie ? await verifyToken(sessionCookie) : null;

            // If token missing or signature invalid, bounce the user back to authentication entrance
            if (!verifiedPayload || verifiedPayload.role !== 'admin') {
                const loginUrl = new URL('/admin/login', request.url);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    // 2. Extract visitor metrics using the modern Vercel header approach
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const referrer = request.headers.get('referer') || 'Direct';
    const userAgent = request.headers.get('user-agent') || '';

    // Determine device type from user-agent string
    let deviceType = 'desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'mobile';
    else if (/tablet/i.test(userAgent)) deviceType = 'tablet';

    // 3. Fire-and-forget background request to log analytics
    const baseUrl = request.nextUrl.origin;

    fetch(`${baseUrl}/api/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pagePath: pathname,
            country,
            deviceType,
            referrer,
        }),
    }).catch((err) => console.error('Analytics tracking failed:', err));

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};