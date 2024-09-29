export interface IWine {
  id: number;
  name: string;
  img: string;
  vinicula: string;
  preco: number;
  desconto: number;
  descricao: string;
  categoria: "kit" | "singular" | null;
  uva: string;
  pais: string;
  stars: number;
  unidades: number;
  tipo: string | null;
  safra: number | null;
  teoralcoolico: number;
  temperaturaservico: string | null;
  tipofechamento: string | null;
  volume: string | null;
  cor: string | null;
  aroma: string | null;
  sabor: string | null;
  harmonizacao: string | null;
}

// export const vinhos: IWine[] = [
//   {
//     id: "dcf03d16-c3e0-4b26-b401-8c304fd3bb3f",
//     name: "Catena Zapata Malbec Argentino",
//     img: "https://th.bing.com/th/id/OIP.cHsi6voglna5IjKHxG6dEQHaHa?rs=1&pid=ImgDetMain",
//     vinicula: "Catena Zapata",
//     preco: 180.0,
//     desconto: 30,
//     descricao:
//       "Um Malbec encorpado, com notas de frutas vermelhas e especiarias, proveniente de vinhedos de altitude.",
//     categoria: "vinho",
//     tipo_de_uva: "Malbec",
//     tipo: "tinto",
//     uva: "Malbec",
//     pais: "Argentina",
//     harmonizacao: "Carnes grelhadas, queijos curados.",
//     stars: 4.5,
//     unidades: 1,
//   },
//   {
//     id: "b03aaba3-221d-4d4a-baac-4d1e17a51ae5",
//     name: "Catena Zapata Chardonnay",
//     img: "https://borrachines.com.ar/wp-content/uploads/2021/11/ANGELICA-ZAPATA-VINO-CHARDONNAY-ALTA-750ML-CATENA-ZAPATA.jpg",
//     vinicula: "Catena Zapata",
//     preco: 145.0,
//     desconto: 0,
//     descricao:
//       "Um Chardonnay com aromas de frutas tropicais, nuances de baunilha e um toque mineral.",
//     categoria: "vinho",
//     tipo_de_uva: "Chardonnay",
//     tipo: "branco",
//     uva: "Chardonnay",
//     pais: "Argentina",
//     harmonizacao: "Frutos do mar, pratos à base de frango.",
//     stars: 4.0,
//     unidades: 1,
//   },
//   {
//     id: "584765ca-39fb-4ee9-a035-d17f508dfc99",
//     name: "Catena Zapata Rosé",
//     img: "https://a-static.mlcdn.com.br/800x560/vinho-catena-rose-de-malbec-750ml-catena-zapata/oliststore/mgl5q086rnkx7xcr/3cb2ef93b5a29a91d67de08fed214c9f.jpeg",
//     vinicula: "Catena Zapata",
//     preco: 120.0,
//     desconto: 25,
//     descricao:
//       "Um rosé fresco e frutado, com notas de morango e um final refrescante.",
//     categoria: "vinho",
//     tipo_de_uva: "Malbec",
//     tipo: "rosé",
//     uva: "Malbec",
//     pais: "Argentina",
//     harmonizacao: "Saladas, pratos leves, aperitivos.",
//     stars: 4,
//     unidades: 1,
//   },
//   {
//     id: "0cdf8a76-9471-4f56-9c11-7ebaf75b234e",
//     name: "D.V. Catena",
//     img: "https://quirinobebidas.com.ar/wp-content/uploads/2020/06/DV-CATENA-MALBEC.jpg",
//     vinicula: "Catena Zapata",
//     preco: 350.0,
//     desconto: 10,
//     descricao:
//       "Um vinho tinto elegante, feito com uvas Malbec selecionadas, com aromas de frutas vermelhas e notas de especiarias.",
//     categoria: "vinho",
//     tipo_de_uva: "Malbec",
//     tipo: "tinto",
//     uva: "Malbec",
//     pais: "Argentina",
//     harmonizacao: "Carnes vermelhas, queijos maturados e pratos de massa.",
//     stars: 5,
//     unidades: 1,
//   },
// ];
