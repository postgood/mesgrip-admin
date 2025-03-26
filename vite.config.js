import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
         cors: true
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        {
            name: 'blade',
            handleHotUpdate({file, server}) {
                if(file.endsWith('.blade.php')) {
                    // WebSocket을 사용하는 대신 HMR(Hot Module Replacement)을 사용하여 변경된 모듈만 업데이트
                    // module.hot 업데이트를 확인하고 필요한 처리를 수행
                    module.hot.check(true).then((updatedModules) => {
                        if (updatedModules) {
                            // 변경된 모듈이 있는 경우 페이지 리로드를 방지하고 새로 고침
                            module.hot.apply().then(() => {
                                console.log('Modules updated:', updatedModules);
                            }).catch((error) => {
                                console.error('Error applying updates:', error);
                                window.location.reload();
                            });
                        }
                    }).catch((error) => {
                        console.error('Error checking updates:', error);
                        window.location.reload();
                    });
                }
            },
        }
    ],
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output:{
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name][extname]',
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
        minify: 'terser',
        terserOptions: {
            mangle: true,
            compress: {
                drop_console: false,
                drop_debugger: true
            }
        }
    }
});
