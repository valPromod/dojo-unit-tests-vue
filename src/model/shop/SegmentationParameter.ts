export default interface SegmentationParameter {
    segmentationType : string;
    trustLevel?: string;
    family?: string;
    subFamily?: string;
    typology?: string;
    segment?: string; //DESTINATION
    priority: number;
    defaultParameters?: Array<string>;
    startDate: string;
    endDate?: string;
  }