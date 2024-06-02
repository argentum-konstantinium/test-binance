import {routerConfig} from "@shared/config";

export const routes = [
    {
        path: routerConfig.ORDER_BOOK.path,
        name: routerConfig.ORDER_BOOK.name,
        component: () => import('./order-book'),
    },
    {
        path: routerConfig.SETTINGS.path,
        name: routerConfig.SETTINGS.name,
        component: () => import('./settings'),
    }
]