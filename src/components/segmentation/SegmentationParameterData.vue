<template>
    <div v-if="segmentationParameterListData">
        <v-data-table
            :headers="headers"
            :items="segmentationParameterListData"
            hide-default-footer
            disable-pagination
            class="overflow-x-auto"
        >
            <template v-slot:body="{ items }">
                <draggable tag="tbody" v-model="segmentationParameterListData">
                    <tr v-for="(item, index) in items" :key="index">
                        <td> {{ index + 1 }} </td>

                        <td> {{ item.segmentationType }}</td>

                        <td>                
                            <v-select
                                v-model="item.trustLevel"
                                :items="trustLevels"
                            ></v-select>
                        </td>

                        <td>
                            <v-select
                                v-model="item.family"
                                :items="families"
                            ></v-select>
                        </td>

                        <td>
                            <v-select
                                v-model="item.subFamily"
                                :items="subFamilies"
                            ></v-select>
                        </td>

                        <td>
                            <v-select
                                v-model="item.typology"
                                :items="typologies"
                            ></v-select>
                        </td>

                        <td>
                            <v-select
                                v-model="item.segment"
                                :items="segments"
                            ></v-select>
                        </td>

                        <td>
                            <v-combobox
                                v-model="item.defaultParameters"
                                :items="parameters"
                                multiple
                                small-chips
                            >
                            </v-combobox>
                        </td>

                        <td>
                            <div class="d-flex">
                                <v-text-field :value="formatDate(item.startDate)" @change="updateDate('START', item, $event)"></v-text-field>
                        
                                <v-menu :close-on-content-click="true">
                                    <template v-slot:activator="{on, attrs}">
                                        <v-icon v-bind="attrs" v-on="on">mdi-calendar</v-icon>
                                    </template>
                                    <v-date-picker v-model="item.startDate" locale="fr-fr"></v-date-picker>
                                </v-menu>
                            </div>
                        </td>

                        <td>
                            <div class="d-flex">
                                <v-text-field :value="formatDate(item.endDate)" @change="updateDate('END', item, $event)"></v-text-field>

                                <v-menu :close-on-content-click="true">
                                    <template v-slot:activator="{on, attrs}">
                                        <v-icon v-bind="attrs" v-on="on">mdi-calendar</v-icon>
                                    </template>
                                    <v-date-picker v-model="item.endDate" locale="fr-fr"></v-date-picker>
                                </v-menu>
                            </div>
                        </td>

                        <td>
                            <v-icon color="red" @click="deleteSegmentation(index)">mdi-delete</v-icon>
                        </td>
                    </tr>
                </draggable>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import moment from "moment";
import SegmentationParameter from "@/model/shop/SegmentationParameter";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    draggable
  },
})
export default class SegmentationParameterData extends Vue {
    @Prop() public segmentationParameterList! : SegmentationParameter[];
    @Prop() public trustLevels!: string[];
    @Prop() public families!: string[];
    @Prop() public subFamilies!: string[];
    @Prop() public typologies!: string[];
    @Prop() public segments!: string[];
    @Prop() public parameters!: string[];

    public segmentationParameterListData: SegmentationParameter[] = [];

    mounted(): void {
        this.segmentationParameterListData = this.segmentationParameterList;
        this.segmentationParameterListData.sort((a, b) => a.priority - b.priority);
    }

    get headers(): {text: string, value: string, align: string, sortable: boolean, width?: string, class: string}[] {
        return [
            {text: '', value: 'priority', align: 'center', sortable: false, class: "blue lighten-2"},
            {text: 'Segmentation', value: 'segmentationType', align: 'left', sortable: false, class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Niv. Confiance', value: 'trustLevel', align: 'center', sortable: false, class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Famille', value: 'family', align: 'center', sortable: false, class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Sous-Famille', value: 'subFamily', align: 'center', sortable: false, class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Typologie', value: 'typology', align: 'center', sortable: false, class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Destination', value: 'segment', align: 'center', sortable: false, class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Paramétrage par défaut', value: 'defaultParameters', align: 'center', sortable: false, width: "300px", class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Date de début', value: 'startDate', align: 'center', sortable: false, width: "150px", class: "white--text subtitle-2 blue lighten-2"},
            {text: 'Date de fin', value: 'endDate', align: 'center', sortable: false, width: "150px", class: "white--text subtitle-2 blue lighten-2"},
            {text: '', value: 'supprimer', align: 'center',  sortable: false, class: "blue lighten-2"},
        ];
    }

    formatDate(date: string | undefined): string {
        if (date !== undefined) {
            moment.locale('fr');
            return moment(date).format('L');
        }
        return "";
    }

    deleteSegmentation(index: number): void {
        this.segmentationParameterListData.splice(index, 1);
    }

    updateDate(type: string, segmentation: SegmentationParameter, e: string): void {
        let format = moment(e, 'DD/MM/YYYY');
        let date = format.format('YYYY-MM-DD');
        
        switch (type) {
            case "START" :
                segmentation.startDate = date;
                break;
            case "END" :
                segmentation.endDate = date;
                break;
        } 
    }
}
</script>