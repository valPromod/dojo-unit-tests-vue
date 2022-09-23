import SegmentationGetResponse from "@/model/products/ProductSegmentationList";
import axiosApiProducts from '@/plugins/axios/axiosApiProducts';
import { AxiosPromise } from "axios";

export default class ProductSegmentationService {
    public static baseUrlProductSegmentation = `/product-segmentations`;

    public static getProductSegmentation(segmentation : string, line? : string) : AxiosPromise<SegmentationGetResponse> {
        return axiosApiProducts.get(`${this.baseUrlProductSegmentation}?segmentationType=${segmentation}&line=${line}`);
    }
}