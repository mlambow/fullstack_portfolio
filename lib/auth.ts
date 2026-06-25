import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Signs a stateless token containing the admin payload
 */
export async function signToken(payload: { email: string; role: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // Session lasts 7 days
        .sign(secretKey);
}

/**
 * Verifies if an incoming token signature is authentic
 */
export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (error) {
        return null;
    }
}