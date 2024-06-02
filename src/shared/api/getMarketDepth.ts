import axios from "axios";
import {REST_URL} from "@shared/api/config";

export interface IGetMarketDepthParams {
    symbol: string;
    limit: string | number;
}

interface IResponse {
    lastUpdateId: number;
    bids: string[][];
    asks: string[][];
}

export const getMarketDepth = async ({symbol, limit}: IGetMarketDepthParams) => {
    const response = await axios.get<IResponse>(`${REST_URL}/depth?symbol=${symbol}&limit=${limit}`)

    return response.data
}