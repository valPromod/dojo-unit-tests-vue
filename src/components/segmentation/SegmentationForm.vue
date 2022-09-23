<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>
        {{ mode }} UNE SEGMENTATION
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormOk">
          <v-row>
            <v-col cols="4">
              <v-select label="Segmentation" :items="segmentations" v-model="segmentation" :rules="[requiredRule()]">
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-select label="Niv. conf" :item="confidenceLevels" v-model="confidenceLevel" :rules="[requiredRule()]">
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-select label="Famille" :item="families" v-model="family" :rules="[requiredRule()]"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-select label="Sous-famille" :item="subfamilies" v-model="subfamily" :disabled="segmentation === ''"
                :rules="[requiredRule()]"></v-select>
            </v-col>

            <v-col cols="4">
              <v-select label="Typologie" :item="typologies" v-model="typology" :rules="[requiredRule()]"></v-select>
            </v-col>

            <v-col cols="4">
              <v-select label="Destination" :item="destinations" v-model="destination" :rules="[requiredRule()]">
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-select label="Paramétrage par défaut" :item="defaultParameters" v-model="defaultParameter"
                :disabled="segmentation === ''" :rules="[requiredRule()]">
              </v-select>
            </v-col>

            <v-col cols="4">
              <div class="d-flex">
                <v-text-field label="Date de début" :value="formatDate(desiredStartWeek)"
                  :rules="[requiredRule(), formatDateRule(), startRangeDateRules(desiredEndWeek)]"></v-text-field>

                <v-menu :close-on-content-click="true">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-calendar</v-icon>
                  </template>
                  <v-date-picker v-model="desiredStartWeek" locale="fr-fr"></v-date-picker>
                </v-menu>
              </div>
            </v-col>

            <v-col cols="4">
              <div class="d-flex">
                <v-text-field label="Date de fin" :value="formatDate(desiredEndWeek)"
                  :rules="[requiredRule(), formatDateRule(), endRangeDateRules(desiredStartWeek)]"></v-text-field>

                <v-menu :close-on-content-click="true">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-calendar</v-icon>
                  </template>
                  <v-date-picker v-model="desiredEndWeek" locale="fr-fr"></v-date-picker>
                </v-menu>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-select label="Priorité" :item="priorities" v-model="priority" :rules="[requiredRule()]"></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancel">Annuler</v-btn>
        <v-btn color="primary" :disabled="!isFormOk">{{ mode }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { RuleReturnType } from "@/utils/Types";
import { VForm } from "@/type";

import Rules from "@/utils/Rules2";
import moment from "moment";

@Component({})
export default class SegmentationForm extends Vue {
  @Prop() public mode!: string;
  @Prop() public segmentations!: string[];
  @Prop() public confidenceLevels!: string[];
  @Prop() public families!: string[];
  @Prop() public subfamilies!: string[];
  @Prop() public typologies!: string[];
  @Prop() public destinations!: string[];
  @Prop() public defaultParameters!: string[];
  @Prop() public priorities!: string[];

  public dialog = true;
  public isFormOk = true;
  public segmentation = "";
  public confidenceLevel = "";
  public family = "";
  public subfamily = "";
  public typology = "";
  public destination = "";
  public defaultParameter = "";
  public desiredStartWeek = "";
  public desiredEndWeek = "";
  public priority = "";

  public open(): void {
    this.dialog = true;
  }

  public cancel(): void {
    this.dialog = false;
  }

  get form(): VForm {
    return this.$refs.form as VForm;
  }

  public validate(): boolean {
    return this.form.validate();
  }

  @Watch('segmentation', { immediate: false, deep: true })
  @Watch('confidenceLevel', { immediate: false, deep: true })
  @Watch('family', { immediate: false, deep: true })
  @Watch('subfamily', { immediate: false, deep: true })
  @Watch('typology', { immediate: false, deep: true })
  @Watch('destination', { immediate: false, deep: true })
  @Watch('defaultParameter', { immediate: false, deep: true })
  @Watch('priority', { immediate: false, deep: true })
  public onFieldChange(): void {
    this.$nextTick(() => {
      this.isFormOk = this.form.validate();
    });
  }

  @Watch('desiredStartWeek', { immediate: false, deep: true })
  public onDesiredStartWeekChanged(): void {
    console.log(this.families || "");
    this.$nextTick(() => {
      this.isFormOk = this.form.validate();
    });
  }

  @Watch('desiredEndWeek', { immediate: false, deep: true })
  public onDesiredEndWeekChanged(): void {
    this.$nextTick(() => {
      this.form.validate();
    });
  }

  formatDate(date: string | undefined): string {
    if (date !== undefined && date.length > 0) {
      moment.locale('fr');
      return moment(date).format('L');
    }
    return "";
  }

  requiredRule(): RuleReturnType {
    return Rules.requiredRule();
  }

  startRangeDateRules(value: string | undefined): RuleReturnType {
    return Rules.startRangeDateRules(value, 'YYYY-MM-DD');
  }

  endRangeDateRules(value: string | undefined): RuleReturnType {
    return Rules.endRangeDateRules(value, 'YYYY-MM-DD');
  }

  formatDateRule(): RuleReturnType {
    return Rules.formatDateRuleFormat('YYYY-MM-DD', 10);
  }
}
</script>
