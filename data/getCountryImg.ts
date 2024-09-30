export function getCountryImg(country: string): string {
  let link = "https://cdn-icons-png.flaticon.com/512/9746/9746676.png";
  switch (country.toLowerCase()) {
    case "brasil":
      link = "https://cdn-icons-png.flaticon.com/128/5372/5372653.png";
      break;
    case "argentina":
      link = "https://cdn-icons-png.flaticon.com/128/197/197573.png";
      break;
    case "portugal":
      link = "https://cdn-icons-png.flaticon.com/128/12364/12364368.png";
      break;
    case "espanha":
      link = "https://cdn-icons-png.flaticon.com/128/197/197593.png";
      break;
    case "frança":
      link = "https://cdn-icons-png.flaticon.com/128/197/197560.png";
      break;
    case "italia":
      link = "https://cdn-icons-png.flaticon.com/128/197/197626.png";
      break;
  }
  console.log(link);
  return link;
}
