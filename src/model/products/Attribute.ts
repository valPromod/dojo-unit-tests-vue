import { AttributeGroup } from "./AttributeGroup";

export interface Attribute {
    id: number;
    groupAttribute: AttributeGroup;
    name: string;
    longName: string;
    startRangeDate: string;
    endRangeDate: string;
    imageUrl: string;
}