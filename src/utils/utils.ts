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

  static formatJsonString(jsonString: string) {
    const jsonStringWithoutCodeBlock = jsonString
      .replace("```json\n", "")
      .replace("\n```", "");
    const jsonObj = JSON.parse(jsonStringWithoutCodeBlock);

    return JSON.stringify(jsonObj, null, 2);
  }

  static removeTagHtml(value: string) {
    return value.replace(/<[^>]*>/g, "");
  }

  static removeEncodeHtml(text: string) {
    const temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.textContent || temp.innerText;
  }
}
