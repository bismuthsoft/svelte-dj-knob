import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		launchOptions: {
			executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
		}
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
});
