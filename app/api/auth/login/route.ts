import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        await connectDB();

        // 1. Locate the admin user record
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // 2. Perform safe cryptographic verification of the password string
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // 3. Generate the payload signature token
        const token = await signToken({ email: user.email, role: user.role });

        // 4. Construct the response object and inject the high-security cookie
        const response = NextResponse.json({ success: true }, { status: 200 });

        response.cookies.set({
            name: 'admin_session',
            value: token,
            httpOnly: true, // Crucial: Prevents cross-site scripting (XSS) attacks from reading the cookie
            secure: process.env.NODE_ENV === 'production', // Transmits only over HTTPS in production
            sameSite: 'lax', // Protects against Cross-Site Request Forgery (CSRF)
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 Days duration matching token lifecycle
        });

        return response;
    } catch (error) {
        console.error('Login routing error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}