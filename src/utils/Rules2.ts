import moment from "moment";
import { RuleReturnType } from "./Types";

export default class Rules {

    public static requiredRule(): RuleReturnType{
        return ((v: string) => (!!v && v.trim() !== "") || "obligatoire*");
    }
    
    public static requiredNumberRule(): (v:number) => string|boolean{
        return ((v: number) => !!v || "obligatoire*");
    }
    
    public static maxCharRule(max: number): RuleReturnType{
        return ((v: string) =>( (!v || v.trim() == "") || v.length <= max) || ("Doit contenir moins de "+max+" caractères"));
    }

    public static equalCharRule(nombreChar: number): RuleReturnType{
        return ((v: string) =>(!v || v.length >= nombreChar) || ("Doit contenir "+nombreChar+" caractères"));
    }

    public static formatDateRule(format: string): RuleReturnType {    
        return ((v: string) => !v || (v && moment(v, format).isValid())  || "Date invalide");       
    }

    public static formatDateRuleFormat(format: string, length : number): RuleReturnType {    
        return ((v: string) => !v || (v && moment(v, format).isValid() && v.length === length)  || "Date invalide");       
    }

    public static startRangeDateRules(endRangeDateValue: string|undefined, format : string): RuleReturnType {
        const endRangeDate = moment(endRangeDateValue, format).toDate();
        return ((v: string) => !v || (v && !endRangeDateValue) || (v && moment(v, format).toDate() <= endRangeDate) || "La date de début doit être inférieure à la date de fin");
    }

    public static endRangeDateRules(startRangeDateValue: string|undefined, format : string): RuleReturnType {
        const startRangeDate = moment(startRangeDateValue, format).toDate();
        return ((v: string) => !v || (v && !startRangeDateValue) || (v && moment(v, format).toDate() >= startRangeDate) || "La date de fin doit être supérieure à la date de début");
    }

    public static maxRangeToEndDateRules(endDateValue: string|undefined, range : number, format : string): RuleReturnType {
        const endDate = moment(endDateValue, format);
        return ((v: string) => !v || (v && !endDate) || (v &&  moment(v, format).diff(endDate,"week") <= range) || `L'écart maximale entre les dates est de ${range}`);
    }
}