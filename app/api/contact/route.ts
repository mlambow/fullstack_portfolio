import {NextResponse} from 'next/server';
import {Resend} from 'resend';

// Initialize Resend with your secure environment token
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const {name, email, message} = await request.json();

        // Basic payload verification
        if (!name || !email || !message) {
            return NextResponse.json({error: 'Missing required payload keys'}, {status: 400});
        }

        // Dispatch email through Resend's architecture
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'wandile.developer@gmail.com',
            subject: `Incoming Connection from: ${name}`,
            text: `Name: ${name}\nReturn Email Address: ${email}\n\nMessage:\n${message}`,
        });

        return NextResponse.json({success: true, id: data.data?.id});
    } catch (error: unknown) {
        console.error('Resend serverless invocation failure:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}