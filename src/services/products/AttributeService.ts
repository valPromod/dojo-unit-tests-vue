import AttributeSearchCriteria from "@/model/products/AttributeSearchCriteria";
import AttributeTypes from "@/model/products/AttributeTypes";
import {AxiosPromise} from "axios";
import axiosApiProducts from '@/plugins/axios/axiosApiProducts';


export default class AttributeService{
    public static baseUrlAttributeTypes = "/attribute_types";
    public static urlSearch = `${AttributeService.baseUrlAttributeTypes}/search`;

    public static postAttributeSearch(attributeCriteria: AttributeSearchCriteria, attributeType?: string): AxiosPromise<AttributeTypes> {
        return axiosApiProducts.post(`${this.urlSearch}?attribute-type-group=${attributeType}`, attributeCriteria);
    }
}