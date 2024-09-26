export function getCountryImg(country: string): string {
  let link = "https://cdn-icons-png.flaticon.com/512/9746/9746676.png";
  switch (country.toLowerCase()) {
    case "brasil":
      link =
        "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-brazil-flag-glossy-circle-png-image_6474178.png";
    case "argentina":
      link =
        "https://static.vecteezy.com/system/resources/previews/015/272/195/original/argentina-3d-rounded-flag-with-no-background-free-png.png";
  }
  console.log(link);
  return link;
}
