export default interface ProductSegmentationChildren {
    segmentationType: string;
    segmentationId: string;
    segmentationCode: string;
    segmentationName: string;
    language: string;
    children: ProductSegmentationChildren[];
}