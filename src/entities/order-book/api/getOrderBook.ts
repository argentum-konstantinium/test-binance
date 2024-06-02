import {getMarketDepth, IGetMarketDepthParams} from "@shared/api";

export interface IDepthElem {
    price: string;
    quantity: string;
    total: string;
}

export const getOrderBook = async (params: IGetMarketDepthParams) => {

    const marketDepth = await getMarketDepth(params);
    const preparedData = {
        lastUpdateId: marketDepth.lastUpdateId,
        asks: [] as IDepthElem[],
        bids: [] as IDepthElem[],
    }

    for (let index = 0; index < marketDepth.asks.length; index++) {
        // аски приходят в порядке возрастания, поэтому перевернём массив с ними
        const lastAsksIndex = marketDepth.asks.length - 1 - index;
        const [askPrice, askQuantity] = marketDepth.asks[lastAsksIndex];
        const [bidPrice, bidQuantity] = marketDepth.bids[index];
        const totalAsk = (parseFloat(askPrice) * parseFloat(askQuantity)).toFixed(8);
        const totalBid = (parseFloat(bidPrice) * parseFloat(bidQuantity)).toFixed(8);

        preparedData.asks.push({
            price: askPrice,
            quantity: askQuantity,
            total: totalAsk
        });

        preparedData.bids.push({
            price: bidPrice,
            quantity: bidQuantity,
            total: totalBid
        });
    }

    return preparedData;
}
