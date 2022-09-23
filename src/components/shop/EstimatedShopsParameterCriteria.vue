<template>
  <div class="estimated-shops-parameter-criteria">
    <h1>Projection du parc Magasin</h1>
    
    <v-form ref="form" v-model="isFormOk" class="my-5">
      <v-row>
        <v-col class="estimated-shops-parameter-criteria_column">
          <v-select
            :items="criteria.lines"
            label="Ligne"
            v-model="lineSelected"
            @change="changeMarkets(lineSelected)"
          ></v-select>
          <v-select
            v-model="marketsSelected"
            :items="criteria.markets"
            item-value="id"
            item-text="id"
            chips
            label="Marchés"
            multiple
          >
            <template v-slot:selection="{ item }">
              <v-chip>
                {{ item.id }}
              </v-chip>
            </template>
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ `${item.id} - ${item.wording}` }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col class="estimated-shops-parameter-criteria_column">
          <div class="d-flex align-center">
            <v-icon @click="startYearWeek = minusOneWeek(startYearWeek)">
              mdi-minus
            </v-icon>
            <v-text-field
              v-model="startYearWeek"
              :maxlength="6"
              label="Début"
              class="mx-3"
              @keypress="numberOnly($event)"
              :rules="[requiredRule(), formatDateRule(), startRangeDateRules(endYearWeek)]"
              required
            ></v-text-field>
            <v-icon @click="startYearWeek = addOneWeek(startYearWeek)">
              mdi-plus
            </v-icon>
          </div>
          <div class="d-flex align-center">
            <v-icon @click="endYearWeek = minusOneWeek(endYearWeek)">
              mdi-minus
            </v-icon>
            <v-text-field
              v-model="endYearWeek"
              :maxlength="6"
              label="Fin"
              class="mx-3"
              @keypress="numberOnly($event)"
              :rules="[formatDateRule(), endRangeDateRules(startYearWeek), maxRangeDateRules(startYearWeek)]"
            ></v-text-field>
            <v-icon @click="endYearWeek = addOneWeek(endYearWeek)">
              mdi-plus
            </v-icon>
          </div>
        </v-col>
        <v-spacer/>
        <v-btn
          color="primary"
          fab
          large
          class="ma-5"
          id="id-test"
          @click="search(lineSelected, marketsSelected, startYearWeek, endYearWeek)"
          :disabled="!isFormOk"
        >
          <v-icon color="white">
            search
          </v-icon>
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import { VForm } from "@/type";
import Criteria from "@/model/shop/EstimatedShopsParameterCriteria2";
import SegmentationMarket from "@/model/shop/Segmentation";
import YearWeekUtilities from "@/utils/YearWeekUtilities2";
import Rules from "@/utils/Rules2";
import { RuleReturnType } from "@/utils/Types";

@Component
export default class EstimatedShopsParameterCriteria extends Vue {
  @Prop() public criteria!: Criteria;
  @Prop() public marketsFromApi! : SegmentationMarket[];

  @Emit('search')
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public search(line : string, markets : string[], begin : string, end : string|undefined): void {
  }

  public show = true;
  public isFormOk = true;
  public lineSelected = '';
  public marketsSelected = [];
  public startYearWeek = YearWeekUtilities.getCurrentWearYeek();
  public endYearWeek = '';

  @Watch('criteria', { immediate: true, deep: true })
  public onCriteriaChanged(): void {
    if(!this.lineSelected){
      this.lineSelected = this.criteria && this.criteria.lines ? this.criteria.lines[0] : '';
    }else{
      this.$nextTick(() => {
      this.form.validate();
    });
    }
    
  }

  get form(): VForm {
    return this.$refs.form as VForm;
  }

  changeMarkets(line : string|undefined) : void {
    this.marketsSelected=[];
    this.criteria.markets = this.marketsFromApi && this.marketsFromApi.length > 0 ? this.marketsFromApi.filter(market => market.line === line):[];
  }

  addOneWeek(value : string) : string {
    return value && value !== "" ? YearWeekUtilities.plusOneWeek(value) : YearWeekUtilities.plusOneWeek(YearWeekUtilities.getCurrentWearYeek());
  }

  minusOneWeek(value : string) : string {
    return value && value !== "" ? YearWeekUtilities.minusOneWeek(value) : YearWeekUtilities.minusOneWeek(YearWeekUtilities.getCurrentWearYeek());
  }

  formatDateRule() : RuleReturnType{
    return Rules.formatDateRule('YYYYWW');
  }

  requiredRule() : RuleReturnType{
    return Rules.requiredRule();
  }

  startRangeDateRules(value : string|undefined) : RuleReturnType{
    return Rules.startRangeDateRules(value,'YYYYWW');
  }

  endRangeDateRules(value : string|undefined) : RuleReturnType{
    return Rules.endRangeDateRules(value,'YYYYWW');
  }

  maxRangeDateRules(value : string|undefined) : RuleReturnType{
    return Rules.maxRangeToEndDateRules(value,52,'YYYYWW');
  } 

  numberOnly(event: KeyboardEvent) : void{
    let regex = new RegExp('^[0-9]');
    if(!regex.test(event.key))   event.preventDefault();
  }
}

</script>

<style lang="scss" scoped>
  .estimated-shops-parameter-criteria::v-deep .v-select.v-select--chips .v-select__selections {
    // Taille des autres éléments input et select
    min-height: 32px;

    &_col {
      min-width: 300px;
    }
  }
</style>
