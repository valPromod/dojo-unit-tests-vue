import SegmentationMarket from "./Segmentation";

export default interface EstimatedShopsParameterCriteria {
  lines? : string[];
  markets?: SegmentationMarket[];
  startYearWeek?: string;
  endYearWeek?: string;
}