import {defineStore} from "pinia";
import {ref} from "vue";
import {getOrderBook} from "@entities/order-book/api";
import {IGetMarketDepthParams} from "@shared/api";
import {IDepthElem} from "@entities/order-book/api";
import {binarySearch} from "@shared/utils";

export const useOrderBookStore = defineStore('orderBookStore', () => {
    const lastUpdateId = ref<number>(0);
    const asks = ref<IDepthElem[]>([]);
    const bids = ref<IDepthElem[]>([]);
    const limit = ref<number>(100);
    const lastUId = ref(0);

    const fetchOrderBook = async (params: IGetMarketDepthParams) => {
        const marketDepth = await getOrderBook(params);
        asks.value = marketDepth.asks;
        bids.value = marketDepth.bids;
        lastUpdateId.value = marketDepth.lastUpdateId;
    };

    const addNewElem = (arr: typeof asks | typeof bids, elem: IDepthElem) => {

        const elPrice = parseFloat(elem.price);
        const firstEl = arr.value[0];
        const firstPrice = parseFloat(firstEl.price);

        if (elPrice > firstPrice) {
            return [elem, ...arr.value];
        }

        const lastEl = arr.value[arr.value.length - 1];
        const lastPrice = parseFloat(lastEl.price);

        if (elPrice < lastPrice) {
            arr.value.push(elem);
            return arr.value;
        }

        const newArr: IDepthElem[] = [];
        let inserted = false;
        // такой топорный метод был выбран не просто так
        // .sort в js использует под капотом быструю сортировку
        // она может сильно деградировать на уже отсортированном массиве - наш случай
        // мы точно знаем, что в нашем массиве не отсортирован только 1 элемент,
        // поэтому банальная пузырьковая сортировка будет стабильно давать сложность O(n)
        // в нашем случае O(n - 1) будет не более 999
        for (let index = 0; index <= arr.value.length - 1; index++) {
            const currentEl = arr.value[index];

            if (inserted) {
                newArr.push(currentEl);
                continue
            }

            const nextEl = arr.value[index + 1];
            const currentPrice = parseFloat(currentEl.price);
            let nextPrice = 0;

            if (nextEl) {
                nextPrice = parseFloat(nextEl.price);
            }

            if (currentPrice > elPrice && elPrice > nextPrice) {
                newArr.push(currentEl);
                newArr.push(elem);
                inserted = true;
                continue;
            }

            newArr.push(currentEl);
        }


        return newArr;
    }

    const addNewAsk = (ask: IDepthElem) => {
        asks.value = addNewElem(asks, ask);
    }

    const addNewBid = (bid: IDepthElem) => {
        bids.value = addNewElem(bids, bid);
    }

    const updateDepth = (arr: typeof asks | typeof bids, elem: IDepthElem) => {
        const result = binarySearch({
            arr: arr.value,
            el: elem,
            reversed: true,
            compareFunc: (currentEl: IDepthElem, el: IDepthElem) => {
                const currentPrice = parseFloat(currentEl.price);
                const elPrice = parseFloat(el.price);

                if (elPrice > currentPrice) {
                    return 1
                }

                if (currentPrice > elPrice) {
                    return -1
                }

                if (currentPrice === elPrice) {
                    return 0;
                }
            }
        });

        if (parseFloat(elem.quantity) === 0 && result) {
            arr.value = deleteElem(arr, result.item)
        }

        if (!result) {
            if (parseFloat(elem.quantity) !== 0) {
                arr.value = addNewElem(arr, elem);
            }
        }

        if (arr.value.length > limit.value) {
            //eslint-disable-next-line
            if (arr === asks) {
                arr.value = deleteElem(arr, arr.value[0])
            } else {
                arr.value.pop()
            }

        }


        if (result) {
            const {item} = result;

            item.quantity = elem.quantity;
            item.total = elem.total
        }
    }

    const updateBid = (elem: IDepthElem) => {
        updateDepth(bids, elem);
    };

    const updateAsk = (elem: IDepthElem) => {
        updateDepth(asks, elem);
    }

    const updateAsks = (elems: IDepthElem[]) => {
        for (const item of elems) {
            updateAsk(item);
        }
    }

    const updateBids = (elems: IDepthElem[]) => {
        for (const item of elems) {
            updateBid(item);
        }
    }

    const deleteElem = (arr: typeof asks | typeof bids, elem: IDepthElem) => {
        const newArr: IDepthElem[] = [];

        for (const item of arr.value) {
            if (item !== elem) {
                newArr.push(item)
            }
        }

        return newArr;
    }

    return {
        lastUpdateId,
        lastUId,
        asks,
        bids,
        limit,
        fetchOrderBook,
        addNewAsk,
        addNewBid,
        updateBids,
        updateAsks,
        updateAsk,
        updateBid
    };
})