import Main from './Main.vue';
import {createApp} from "vue";
import {router} from "./providers/router.ts";
import {createVuetify} from "vuetify";
import {aliases, mdi} from "vuetify/iconsets/mdi-svg";
import 'vuetify/styles';
import "@shared/ui/scss/reset.scss";
import {createPinia} from "pinia";

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

const pinia = createPinia();

export const App = createApp(Main).use(router).use(vuetify).use(pinia);



