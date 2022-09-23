<template>
    <div>
        <h2 class="my-3">{{ title }}</h2>
        <div v-if="marketInEstimatedShopsMarketList">
            <v-form ref="form" v-model="isDataOk">
                <v-simple-table class="unFixedPan">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="fixedCellCol1">
                                    Cumul/Taille
                                </th>
                                <th class="fixedCellCol2">
                                    Actuel
                                </th>             
                                <th v-for="yearWeek in yearWeeks" :key="yearWeek" >
                                    {{ yearWeek }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(data,indexSize) in marketInEstimatedShopsMarketList.rows"
                                :key="data.id"
                            >
                                <td class="fixedCellCol1">
                                    {{ data.id }}
                                </td>
                                <td  class="fixedCellCol2">{{data.current}}</td>
                                <td
                                    v-for="(yearWeek, indexYearWeek) in data.yearWeeks"
                                    :key="data.id+yearWeek.yearWeek"
                                >
                                    <v-text-field
                                        v-model="yearWeek.value"
                                        type="number"
                                        min="0"
                                        dense
                                        :rules="[allSizeRequired(indexSize, indexYearWeek)]"
                                        @keypress="numberOnly($event)"
                                        @change="cumulate($event, indexSize, indexYearWeek)"
                                        @paste="onPaste($event, indexSize, indexYearWeek)"
                                        @paste.prevent
                                    ></v-text-field>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-form>
        </div>
        <div class="d-flex align-center justify-center">
            <div>
                <v-icon @click="changeMarket(null, -1)" :disabled="!isDataOk">
                    arrow_back
                </v-icon>
            </div>
            <div>
                <v-select
                :disabled="!isDataOk"
                v-model="market"
                :items="estimatedShopsMarketOriginalList"
                item-value="market"
                item-text="market"
                @change="changeMarket($event,null)"
                class="selectMarket mx-3"
                >
                    <template v-slot:item="{ item, attrs, on }">
                        <v-list-item v-on="on" v-bind="attrs">
                        <v-list-item-content>
                            <v-list-item-title>
                            {{ getItemText(item.market) }}
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-select>
            </div>
            <div>
                <v-icon @click="changeMarket(null, 1)" :disabled="!isDataOk">
                    arrow_forward
                </v-icon>
            </div>
        </div>
        <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn color="error" @click="onEstimatedShopsMarketOriginalChange()">
                Annuler
            </v-btn>
            <v-btn color="success" @click="save(estimatedShopsMarketList)" :disabled="!isDataOk" class="mx-3">
                Valider
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import EstimatedShopsMarketBean from "@/model/market/EstimatedShopsMarketBean";
import Market from "@/model/shop/Segmentation";
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { VForm } from "@/type";

@Component
export default class EstimatedShopsParameterData extends Vue {

    @Prop() public yearWeeks? : string[];

    @Prop() public estimatedShopsMarketOriginalList! : EstimatedShopsMarketBean[];

    @Prop() public markets! : Market[];

    @Emit('save')
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    public save(estimatedShopsMarketBean : EstimatedShopsMarketBean[]): void {
    }

    public estimatedShopsMarketList : EstimatedShopsMarketBean[] = [];

    public market = "";

    public isCopyPaste = false;

    public isDataOk = true;

    @Watch('estimatedShopsMarketOriginalList', { immediate: true, deep: true })
    public onEstimatedShopsMarketOriginalChange(): void {
        // On fait une copie de la liste pour garder l'original
        this.estimatedShopsMarketList = this.estimatedShopsMarketOriginalList.map(item => {
            return {
                market: item.market.toString(),
                rows: item.rows.map(row => {
                    return {
                        id: row.id.toString(),
                        current: row.current,
                        yearWeeks: row.yearWeeks.map(yearWeek => {
                            return {
                                yearWeek: yearWeek.yearWeek,
                                value: yearWeek.value
                            }
                        })
                    };
                })
            };
        });
        this.market = this.estimatedShopsMarketList[0].market;
    }

    @Watch('estimatedShopsMarketList', { immediate: false, deep: true })
    public values(): void {
        this.$nextTick(() => {
            this.form.validate();
        });
    }

    get form(): VForm {
        return this.$refs.form as VForm;
    }

    get title() : string {
        let marketFind = this.markets.find(market => market.id === this.market) as Market;
        return marketFind ? marketFind.id+" - "+marketFind.wording : "";
    }

    cumulate(event : string, indexSize : number, indexYearWeek :number): void{
        if(!this.isCopyPaste){
            let newValue = event && event !== "" ?parseInt(event):0;
            let indexMarket = this.estimatedShopsMarketList.findIndex(market => market.market === this.market);
            if(this.estimatedShopsMarketList[indexMarket].rows[indexSize].id === 'CUMUL'){
                // On est sur le cumul, on met à 0 toutes les autres tailles
                this.cumulateCumul(indexMarket, indexSize, indexYearWeek);
            }else{
                // On est sur une taille, le cumul vaut la somme des tailles
                this.cumulateSize(indexMarket, indexSize, indexYearWeek, newValue);
            }
            this.estimatedShopsMarketList[indexMarket].rows[indexSize].yearWeeks[indexYearWeek].value = newValue;
        }else{
            this.isCopyPaste = false;
        }
    }

    cumulateCumul(indexMarket : number, indexSize : number, indexYearWeek :number) : void{
        this.estimatedShopsMarketList[indexMarket].rows?.forEach(row => {
            if(row.id!=='CUMUL') {
                row.yearWeeks[indexYearWeek].value = undefined;
            }
        });
    }

    cumulateSize(indexMarket : number, indexSize : number, indexYearWeek :number, newValue : number) : void{
        let cumul = 0;
        for(let row of this.estimatedShopsMarketList[indexMarket].rows){
            if(row.id !== 'CUMUL' && this.estimatedShopsMarketList[indexMarket].rows[indexSize].id !== row.id){
                let value = row.yearWeeks[indexYearWeek].value;
                cumul += value ? value : 0;
            }
        }
        cumul += newValue;
        let cumulSize = this.estimatedShopsMarketList[indexMarket].rows.find(row => row.id === 'CUMUL');
        if(cumulSize){
            cumulSize.yearWeeks[indexYearWeek].value = cumul;
        }
    }

    changeMarket(event : string|null, increment : number|null) : void {
        if(this.estimatedShopsMarketList.length > 0){
            let data: EstimatedShopsMarketBean|undefined = undefined;
            if(event){
                data = this.estimatedShopsMarketList
                    .find(estimatedShopsMarket => estimatedShopsMarket.market === event);
            }else if(increment){
                let index = this.estimatedShopsMarketList
                    .findIndex(estimatedShopsMarket => this.market === estimatedShopsMarket.market);
                if(index === 0 && increment<0){
                    data = this.estimatedShopsMarketList[this.estimatedShopsMarketList.length -1];
                }else if(index === this.estimatedShopsMarketList.length -1 && increment>0){
                    data = this.estimatedShopsMarketList[0];
                }else{
                    data = this.estimatedShopsMarketList[index+increment];
                }
            }
            if(data){
                this.market = data.market;
            }
        }  
    }

    get marketInEstimatedShopsMarketList() : EstimatedShopsMarketBean {
        return this.estimatedShopsMarketList.find(data => data.market === this.market) as EstimatedShopsMarketBean;
    }

    getItemText(marketId: string): string {
        const marketFromCriteria = this.markets.find(market => market.id === marketId);
        if (!marketFromCriteria) return "Unknown market";
        return `${marketFromCriteria.id} - ${marketFromCriteria.wording}`;
    }

    numberOnly(event: KeyboardEvent) : void{
        let regex = new RegExp('^[0-9]');
        if(!regex.test(event.key))   event.preventDefault();
    }

    public allSizeRequired(indexSize : number, indexYearWeek :number): ((v:number) => string|boolean) {
        let indexMarket = this.estimatedShopsMarketList.findIndex(market => market.market === this.market);
        let isCumul = this.estimatedShopsMarketList[indexMarket].rows[indexSize].id === 'CUMUL';
        let otherSizeValue = this.estimatedShopsMarketList[indexMarket].rows
            .find(size => (!!size.yearWeeks[indexYearWeek].value || size.yearWeeks[indexYearWeek].value === 0) && size.id !== 'CUMUL');
        return ((v: number) => isCumul || !(!v && v !== 0 && otherSizeValue ) || "Required");
    }

    onPaste(event: ClipboardEvent, indexSize : number, indexYearWeek :number) : void{
        // On récupére ce qui passe dans le collé
        let clipText = event.clipboardData ? event.clipboardData.getData("text") : '';
        // On retire les retours à la ligne qui ne sont pas utiles
        clipText = clipText.replaceAll('\n','');
        let clipCells: string[][] = []
        let clipRows = clipText.split(String.fromCharCode(13));
        for (let i=0; i<clipRows.length; i++) {
            clipCells[i] = clipRows[i].split(String.fromCharCode(9));
        }
        // On retire la dernière ligne vide
        clipCells.pop();
        let indexMarket = this.estimatedShopsMarketList.findIndex(market => market.market === this.market);
        for (let i=0; i<clipCells.length; i++) {
            for (let j=0; j<clipCells[i].length; j++) {
                let marketRow = this.estimatedShopsMarketList[indexMarket].rows[indexSize+i];

                if(marketRow && marketRow.yearWeeks[indexYearWeek+j]){
                    let regex = new RegExp('^[0-9]');
                    if(regex.test(clipCells[i][j])) {
                        marketRow.yearWeeks[indexYearWeek+j].value = parseInt(clipCells[i][j]);
                    }
                    if(marketRow.id === 'CUMUL') {
                        // On est sur le cumul, on met à 0 toutes les autres tailles
                        this.cumulateCumul(indexMarket, indexSize+i, indexYearWeek+j);
                    }else{
                        this.cumulateSize(indexMarket, indexSize+i, indexYearWeek+j, parseInt(clipCells[i][j]));
                    }
                }
            }
        }
        this.isCopyPaste = true;
    }
}

</script>
<style lang='scss' scoped>
    .selectMarket{
        max-width: 200px;
    }
    .fixedCellCol1{
        position: absolute;
        left: 0;
        width: 125px;
        padding-top: 12px !important;
    }
    .fixedCellCol2{
        position: absolute;
        left: 125px;
        width: 100px;
        padding-top: 12px !important;
    }
    .unFixedPan{
        position: relative;
        padding-left: 225px;
    }
    td{
        height: 50px !important;
        min-width: 100px;
    }
    th{
        height: 50px !important;
        min-width: 100px;
    }
</style>