import {createSSRApp} from 'vue'
import {renderToString} from 'vue/server-renderer'
import Main from './app/Main.vue'
import {router} from './app/providers/router.ts'
import {createVuetify} from "vuetify";
import {aliases, mdi} from "vuetify/iconsets/mdi-svg";
import {createPinia} from 'pinia';

export async function render(url: string) {
    const pinia = createPinia()
    const vuetify = createVuetify({
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
        ssr: true
    });

    const app = createSSRApp(Main);
    app.use(router).use(vuetify).use(pinia);

    await router.push(url)
    await router.isReady()

    return await renderToString(app)
}

