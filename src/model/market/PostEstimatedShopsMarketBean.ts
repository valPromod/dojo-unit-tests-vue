import EstimatedShopsBean from "../shop/EstimatedShopsBean"
import MarketBean from "./MarketBean"

export default interface PostEstimatedShopsMarketBean {
  market : MarketBean;
  rows : EstimatedShopsBean[];
}