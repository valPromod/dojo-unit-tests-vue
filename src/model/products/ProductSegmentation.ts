import ProductSegmentationChildren from  "./ProductSegmentationChildren";

export default interface ProductSegmentation {
    segmentationType: string;
    segmentationId: string;
    segmentationCode: string;
    segmentationName: string;
    seasonIds: string[];
    seasonRefs: string[];
    language: string;
    children: ProductSegmentationChildren[];
}