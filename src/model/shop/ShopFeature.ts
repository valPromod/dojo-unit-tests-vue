import Segmentation from "./Segmentation";

export default interface ShopFeature {
    segmentationType : string;
    wording : string;
    visible: boolean;
    shopSegmentationList: Segmentation;
}