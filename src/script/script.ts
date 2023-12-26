export default function replaceSpacesWithHyphens(str: String | undefined) {
    return str?.replace(/\s/g, "-");
  }

  export function convertToHourMinute(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    const hourText = hours > 0 ? hours + " hr" : "";
    const minuteText = minutes > 0 ? minutes + " min" : "";
  
    return hourText + " " + minuteText;
  }

  export const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));

  export function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
  }
  
  export function unslugify(str: string) {
    return str.replace(/-/g, " ")
  }
  