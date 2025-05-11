export default class Utils {
  static cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }

  static formatData(value: string) {
    const formattedDate = new Date(value).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formattedDate;
  }
}
