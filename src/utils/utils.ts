export default class Utils {
  static cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }
}
