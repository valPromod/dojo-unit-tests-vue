import moment from "moment";

export default class YearWeekUtilities {

  public static minusOneWeek(value : string): string {
    return moment(value, "YYYYWW").subtract(1, "weeks").format("YYYYWW");
  }

  public static plusOneWeek(value : string): string {
    return moment(value, "YYYYWW").add(1, "weeks").format("YYYYWW");
  }

  public static getCurrentWearYeek(): string{
    return moment().format("YYYYWW");
  }
}