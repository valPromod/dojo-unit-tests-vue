<template>
  <div>
    <div v-show="!isLoadingCriteria">
      <estimated-shops-criteria :marketsFromApi="segmentationsMarkets" :criteria="criteria" @search="search"/>
    </div>
    <v-divider></v-divider>
    <div class="alert">
      <v-alert
        v-for="(alert,index) in alerts"
        :key="index"
        :value="alert.show"
        :type="alert.type"
        colored-border
        dismissible
        elevation="2"
        class="ma-0"
      >
        {{ alert.message }}
      </v-alert>
    </div>

    <estimated-shops-data
      :estimatedShopsMarketOriginalList="datas"
      :yearWeeks="yearWeeks"
      :markets="criteria.markets"
      @save="save"
      v-if="datas && datas.length > 0 && !isLoadingData && !isLoadingCriteria"
    />

    <v-progress-circular
      :size="200"
      color="primary"
      indeterminate
      v-show="isLoadingData || isLoadingCriteria || isLoadingSave"
      class="loader"
    >Chargement
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EstimatedShopsCriteria from "@/components/shop/EstimatedShopsParameterCriteria.vue";
import EstimatedShopsData from "@/components/shop/EstimatedShopsParameterData.vue";
import EstimatedShopsMarketBean from "@/model/market/EstimatedShopsMarketBean";
import SegmentationMarket from "@/model/shop/Segmentation";
import Criteria from "@/model/shop/EstimatedShopsParameterCriteria2";
import ShopSegmentationService from "@/services/shop/ShopSegmentation.service";
import EstimatedMarketService from "@/services/market/EstimatedMarketService";
import Alert from "@/model/alert/Alert2";
import PostEstimatedShopsMarketBean from "@/model/market/PostEstimatedShopsMarketBean";

@Component({
  components: {
    EstimatedShopsCriteria,
    EstimatedShopsData,
  },
})
export default class EstimatedShopsParameter extends Vue {

  public alerts : Alert[] = [];

  public isLoadingData = false;
  public isLoadingCriteria = false;
  public isLoadingSave = false;
  public segmentationsMarkets : SegmentationMarket[] = [];

  public criteria : Criteria = {};

  public yearWeeks : string[] = [];

  public datas? : EstimatedShopsMarketBean[] = [];
  
  created(): void {
    this.isLoadingCriteria = true;
    ShopSegmentationService.getShopSegmentation('market')
      .then(response => {
        this.segmentationsMarkets = response.data;
        if(this.segmentationsMarkets){
          let flatLinesFromMarket = this.segmentationsMarkets.map(market => market.line);
          let linesFromMarkets : string[] = flatLinesFromMarket.filter((line,pos) => flatLinesFromMarket.indexOf(line) == pos) as string[];
          this.criteria = {
            lines : linesFromMarkets.sort((a,b) => parseInt(a)-parseInt(b)),
            markets : this.segmentationsMarkets.filter(market => market.line === linesFromMarkets[0]),
          } 
        }
      })
      .catch(() => {
        this.alerts.push({show: true, message: "Erreur lors de la récupération des critères", type: "error"})
        })
      .finally(() => this.isLoadingCriteria = false);
  }

  search(line : string, markets : string[], begin : string, end : string|undefined) : void{
    this.isLoadingData = true;
    EstimatedMarketService.getEstimatedMarkets(line, markets.join(','), begin, end)
      .then(response => {
        this.datas = response.data;
        if(this.datas?.length){
          let market = this.datas[0];
          if(market?.rows.length){
            let size = market.rows[0];
            this.yearWeeks = size.yearWeeks.map(yearWeek => yearWeek.yearWeek);
          }
        }
      }).catch(() => {
        this.alerts.push({show: true, message: "Erreur lors de la récupération des données", type: "error"})
      }).finally(() => this.isLoadingData=false);
  }

  public getLineOfMarket(marketId : string) : string {
    if(this.criteria.markets){
      let market = this.criteria.markets.find(market => market.id === marketId);
      return market ? market.line : "";
    }
    return "";
  }

  public save(estimatedShopsMarketList : EstimatedShopsMarketBean[]): void {
    this.isLoadingSave = true;
    let body : PostEstimatedShopsMarketBean[] = estimatedShopsMarketList.map(estimatedMarket => {
        return {
            market: {
                id: estimatedMarket.market,
                line: this.getLineOfMarket(estimatedMarket.market)
            },
            rows: estimatedMarket.rows
        }
    })
    EstimatedMarketService.postEtimatedMarkets(body).then(() => {
      this.alerts.push({show: true, message: "Sauvegarde des données effectuée", type: "success"})
    })
      .catch(() => {
        this.alerts.push({show: true, message: "Erreur lors de la sauvegarde des données", type: "error"})
      }).finally(() => this.isLoadingSave=false);
  }
}

</script>
