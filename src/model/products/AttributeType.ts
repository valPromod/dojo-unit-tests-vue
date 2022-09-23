import { AttributeGroup } from "./AttributeGroup";

export default interface AttributeType {
    id: number;
    name: string;
    dateRequired: boolean;
    countryRequired: boolean;
    marketRequired: boolean;
    productSourcingRequired: boolean;
    attributeTypeDisplay: string;
    attributeTypeGroup: string;
    attributeGroupList: AttributeGroup;
}