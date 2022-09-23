import { Attribute } from "./Attribute";
import AttributeType from "./AttributeType";

export interface AttributeGroup {
    id: number;
    attributeType: AttributeType;
    shortName: string;
    longName: string;
    attributeList: Attribute[];
}