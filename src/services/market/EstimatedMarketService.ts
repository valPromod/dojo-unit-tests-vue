import EstimatedShopsMarketBean from "@/model/market/EstimatedShopsMarketBean";
import PostEstimatedShopsMarketBean from "@/model/market/PostEstimatedShopsMarketBean";
import axiosApiEstimated from '@/plugins/axios/axiosApiEstimated';
import { AxiosPromise } from "axios";

export default class EstimatedMarketService {
    public static baseUrlEstimatedMarket = `/estimated-markets`;

    public static getEstimatedMarkets(line : string, markets : string, begin : string, end : string|undefined) : AxiosPromise<EstimatedShopsMarketBean[]> {
        return axiosApiEstimated.get(`${this.baseUrlEstimatedMarket}?line=${line}&markets=${markets}&begin=${begin}&end=${end? end : ''}`);
    }

    public static postEtimatedMarkets(body: PostEstimatedShopsMarketBean[]) :  AxiosPromise {
        return axiosApiEstimated.post(`${this.baseUrlEstimatedMarket}`, body);
    }
}
