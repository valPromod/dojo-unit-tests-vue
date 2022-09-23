import EstimatedShopsBean from "../shop/EstimatedShopsBean"

export default interface EstimatedShopsMarketBean {
  market : string;
  rows : EstimatedShopsBean[];
  show? : boolean;
}