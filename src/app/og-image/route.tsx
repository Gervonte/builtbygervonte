import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFCFB',
        backgroundImage: 'linear-gradient(135deg, #F8BBD9 0%, #E91E63 100%)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Sakura petals decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 20%, rgba(248, 187, 217, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(233, 30, 99, 0.2) 0%, transparent 50%)',
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px',
          zIndex: 1,
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#E91E63',
            marginBottom: 20,
            textShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          Gervonte Fowler
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#2C3E50',
            marginBottom: 30,
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          Full-Stack Software Engineer & AI Researcher
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: '#5A6C7D',
            maxWidth: 700,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Building scalable software solutions and advancing AI research
        </div>

        {/* Tech stack */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          {['React', 'Node.js', 'TypeScript', 'Python', 'AI/ML'].map(tech => (
            <div
              key={tech}
              style={{
                backgroundColor: 'rgba(233, 30, 99, 0.1)',
                color: '#E91E63',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 500,
                border: '2px solid rgba(233, 30, 99, 0.2)',
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Portfolio URL */}
        <div
          style={{
            fontSize: 20,
            color: '#7F8C8D',
            fontWeight: 500,
          }}
        >
          builtbygervonte.com
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
