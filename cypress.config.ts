import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    projectId: 'oc7zg3',
    reporter: 'junit',
    reporterOptions: {
      mochaFile: './target/test-reports/journey/test-results.xml',
    },
    fixturesFolder: false,
    specPattern: './journey/*.cy.ts',
    supportFile: './journey/support.ts',
    videosFolder: './target/test-reports/journey/',
    screenshotsFolder: './target/test-reports/journey/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      TRAY_URL: 'http://localhost:5050/secure/cctray.xml',
      TRAY_URL_TOKEN: 'http://localhost:5050/token/cctray.xml',
      TRAY_TOKEN: 'abc123',
      TRAY_USERNAME: 'u',
      TRAY_PASSWORD: 'p',
    },
    blockHosts: ['api.github.com'],
  },
})
