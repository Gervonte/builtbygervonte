import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const rainyDayScreenshot = new URL(
    '/images/technical/rainy-day/tour-overview.png',
    request.url
  ).toString();

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0D141C',
        backgroundImage:
          'radial-gradient(circle at 8% 10%, rgba(255, 93, 102, 0.18) 0%, transparent 30%), radial-gradient(circle at 94% 88%, rgba(248, 187, 217, 0.12) 0%, transparent 34%)',
        color: '#F7F8FA',
        fontFamily: 'system-ui, sans-serif',
        padding: '34px 52px',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 31, fontWeight: 800 }}>BuiltByGervonte</div>
          <div style={{ color: '#93A3B5', fontSize: 17, marginTop: 3 }}>
            Software Studio By Gervonté Fowler
          </div>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 34,
          marginTop: 18,
        }}
      >
        <div
          style={{
            width: 402,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: '#FF7A82',
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 2.2,
              marginBottom: 14,
            }}
          >
            STATEMENT-FIRST PERSONAL FINANCE
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              marginBottom: 22,
            }}
          >
            Built for The Bahamas, even when banks don’t connect.
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 18,
              borderLeft: '4px solid #FF5D66',
              marginBottom: 24,
            }}
          >
            <div style={{ color: '#F7F8FA', fontSize: 21, fontWeight: 750 }}>
              4 Caribbean institutions + cash.
            </div>
            <div style={{ color: '#A9B8C8', fontSize: 20, marginTop: 4 }}>
              One consistent financial picture.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              gap: 4,
              color: '#93A3B5',
              fontSize: 12,
              fontWeight: 650,
              lineHeight: 1.35,
            }}
          >
            <span>M.S. Computer Science •</span>
            <span>IEEE LLM Research •</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Building Rainy Day</span>
              <svg width="24" height="15" viewBox="0 0 32 20" aria-label="Flag of The Bahamas">
                <rect width="32" height="6.67" fill="#00ABC9" />
                <rect y="6.67" width="32" height="6.66" fill="#FAE042" />
                <rect y="13.33" width="32" height="6.67" fill="#00ABC9" />
                <path d="M0 0L12 10L0 20Z" fill="#000000" />
              </svg>
            </div>
          </div>
        </div>

        <div
          style={{
            width: 660,
            height: 430,
            display: 'flex',
            position: 'relative',
            padding: 2,
            borderRadius: 20,
            background: 'rgba(255, 176, 198, 0.38)',
            boxShadow: '0 28px 70px rgba(0, 0, 0, 0.42)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
              borderRadius: 18,
              backgroundColor: '#080C11',
            }}
          >
            {/* ImageResponse requires a native image element for remote or route-backed assets. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rainyDayScreenshot}
              alt="Rainy Day v0.2.1 guided demo overview"
              width={640}
              height={410}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'translateY(-7%) scale(1.28)',
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
