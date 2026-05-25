const automationBypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

const collectSettings = {
  chromeFlags: '--no-sandbox --disable-dev-shm-usage',
};

if (automationBypassSecret) {
  collectSettings.extraHeaders = JSON.stringify({
    'x-vercel-protection-bypass': automationBypassSecret,
  });
}

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000'],
      settings: collectSettings,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
