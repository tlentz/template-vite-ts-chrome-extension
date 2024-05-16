import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';

function extractVersion(v: string): [string, string, string] {
    const sanitizedVersion = v.replace(/[^\d.-]+/g, '');
    const [major, minor, patch] = sanitizedVersion.split(/[.-]/);
    return [major, minor, patch];
}

const { version, description } = packageJson;
const [major, minor, patch] = extractVersion(version);
const SHORT_NAME = 'Extension Name';
const icons = {
    '16': 'img/icon16.png',
    '32': 'img/icon32.png',
    '48': 'img/icon48.png',
    '128': 'img/icon128.png',
};

export default defineManifest(async () => {
    return {
        // TODO: Add your own key here
        // key: '<YOUR KEY HERE>',
        manifest_version: 3,
        name: SHORT_NAME,
        short_name: SHORT_NAME,
        description,
        version: `${major}.${minor}.${patch}`,
        version_name: version,
        icons,

        permissions: ['storage', 'tabs', 'activeTab'],

        content_security_policy: {
            extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
        },

        web_accessible_resources: [
            {
                resources: ['img/*'],
                matches: ['<all_urls>'],
            },
        ],

        action: {
            default_icon: icons,
            default_title: SHORT_NAME,
            default_popup: 'src/pages/popup/index.html',
        },

        background: {
            service_worker: 'src/pages/background/index.ts',
            type: 'module',
        },

        content_scripts: [
            {
                matches: ['http://*/*', 'https://*/*'],
                js: ['src/pages/content/index.ts'],
            },
        ],
    };
});
