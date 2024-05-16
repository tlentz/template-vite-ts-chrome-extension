import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import zipPack from 'vite-plugin-zip-pack';
import cleanPlugin from 'vite-plugin-clean';
import getManifest from './manifest.config';
import packageJson from './package.json';
import path, { resolve } from 'path';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const pagesDir = resolve(srcDir, 'pages');
const assetsDir = resolve(srcDir, 'assets');
const sharedDir = resolve(srcDir, 'shared');
const publicDir = resolve(rootDir, 'public');
const outDir = resolve(rootDir, 'dist');

// @ts-ignore
export default defineConfig(async (env) => {
    // @ts-ignore
    const manifest = await getManifest(env);
    const pack = process.env.PACK === 'true';
    const isDev = env.mode === 'development';

    return {
        define: {
            'process.env.IS_DEV': JSON.stringify(isDev),
        },
        resolve: {
            alias: {
                '@root': rootDir,
                '@src': srcDir,
                '@assets': assetsDir,
                '@pages': pagesDir,
                '@shared': sharedDir,
            },
        },
        publicDir,
        build: {
            outDir,
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    background: resolve(pagesDir, 'background', 'index.ts'),
                    content: resolve(pagesDir, 'content', 'index.ts'),
                    popup: resolve(pagesDir, 'popup', 'index.html'),
                },
                output: {
                    chunkFileNames: '[name].[hash].js',
                },
            },
        },
        plugins: [
            cleanPlugin({
                targetFiles: ['dist', 'packaged'],
            }),
            crx({ manifest }),
            // only pack if pack flag is true
            pack &&
            zipPack({
                outDir: 'packaged',
                inDir: 'dist',
                outFileName: `${packageJson.name}-${manifest.version}.zip`,
            }),
        ],
    };
});
