import SegmentationParameter from "./SegmentationParameter";

export default interface SegmentationPutResponse {
    body: SegmentationParameter;
    isError: boolean;
    message: string;
}