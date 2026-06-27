import {ImageResponse} from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Full-Stack Software Developer Portfolio';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#ffffff',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '80px',
                    fontFamily: 'monospace',
                }}
            >
                {/* Subtle Accent Code Token */}
                <div style={{
                    color: '#10b981',
                    fontSize: '20px',
                    marginBottom: '16px',
                    letterSpacing: '2px',
                    fontFamily: 'monospace'
                }}>
                    {"// production_node: online"}
                </div>

                {/* Crisp Header Text */}
                <div style={{
                    color: '#0a0a0a',
                    fontSize: '54px',
                    fontWeight: '300',
                    letterSpacing: '-2px',
                    marginBottom: '4px',
                    fontFamily: 'monospace',
                }}>
                    Wandile Mlambo
                </div>

                {/* Subtitle */}
                <div style={{
                    color: '#838383',
                    fontSize: '24px',
                    fontWeight: '300',
                    marginBottom: '30px',
                    fontFamily: 'monospace'
                }}>
                    Full-Stack Software Developer
                </div>

                {/* Minimalist Tech Array */}
                <div
                    style={{display: 'flex', gap: '16px', color: '#737373', fontSize: '14px', fontFamily: 'monospace'}}>
                    <span>[react]</span>
                    <span>[fastapi]</span>
                    <span>[django]</span>
                    <span>[postgresql]</span>
                    <span>[docker]</span>
                </div>
            </div>
        ),
        {...size}
    );
}