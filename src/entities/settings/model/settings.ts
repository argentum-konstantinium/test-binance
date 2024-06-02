import {defineStore} from "pinia";
import {ref} from "vue";
import {currencyPairsList} from "@shared/config";

export interface IHistoryItem {
    action: string;
    date: string;
}

export const useSettingsStore = defineStore('settings', () => {
    const currencyPair = ref<string>(currencyPairsList[0]);
    const historyChanges = ref<IHistoryItem[]>([]);

    return {
        currencyPair,
        historyChanges
    }
})