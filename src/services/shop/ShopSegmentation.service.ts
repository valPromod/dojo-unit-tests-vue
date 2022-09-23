import SegmentationParameter from "@/model/shop/SegmentationParameter";
import SegmentationGetResponse from "@/model/shop/Segmentation";
import SegmentationPutResponse from "@/model/shop/SegmentationPutResponse";
import axiosApiShops from '@/plugins/axios/axiosApiShops';
import { AxiosPromise } from "axios";
import ShopFeature from "@/model/shop/ShopFeature";

export default class ShopSegmentationService {
    public static baseUrlShopSegmentation = `/shop-segmentations`;
    public static featureUrlShopSegmentation = `${ShopSegmentationService.baseUrlShopSegmentation}/shop-features`;
    public static multipleUrlShopSegmentation = `${ShopSegmentationService.baseUrlShopSegmentation}/defaults/multiple`;

    public static getShopSegmentation(segmentation : string) : AxiosPromise<SegmentationGetResponse[]> {
        return axiosApiShops.get(`${this.baseUrlShopSegmentation}?segmentationType=${segmentation}`);
    }

    public static getShopFeatures(line: string): AxiosPromise<ShopFeature[]> {
        return axiosApiShops.get(`${this.featureUrlShopSegmentation}?line=${line}`);
    }

    public static putShopSegmentation(segmentationParameters: SegmentationParameter[]) : AxiosPromise<SegmentationPutResponse[]> {
        return axiosApiShops.put(`${this.multipleUrlShopSegmentation}`, segmentationParameters);
    }
}
