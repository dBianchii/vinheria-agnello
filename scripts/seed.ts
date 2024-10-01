import { getTableColumns } from "drizzle-orm";
import { type PgTable } from "drizzle-orm/pg-core";
import { type SQL, sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { wines } from "~/server/db/schema";

const _wines = [
  {
    name: "Portada Winemaker's Selection 2021",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000022579-standing-front.png",
    vinicula: "DFJ Vinhos",
    preco: 129.3,
    desconto: 30,
    descricao:
      "Vinho tinto português da região de Lisboa, encorpado e saboroso.",
    categoria: "singular",

    uva: "Uvas variadas",
    pais: "Portugal",
    stars: 4.5,
    unidades: 1,

    tipo: "Vinho tinto",
    safra: 2021,
    teoralcoolico: 12.5,
    temperaturaservico: "17ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Vermelho-rubi",
    aroma: "Frutas maduras como ameixa e groselha",
    sabor: "Encorpado, saboroso e frutado, com final levemente adocicado",
    harmonizacao:
      "Carnes vermelhas, Pizzas e massas de molho vermelho, Queijos",
  },
  {
    name: "Don Simon Selección Tempranillo",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1646870-standing-front.png",
    vinicula: "J García Carrión",
    preco: 80.9,
    desconto: 33,
    descricao:
      "Vinho tinto espanhol da região de Castilla-La Mancha, feito com uva Tempranillo.",
    categoria: "singular",

    uva: "Tempranillo",
    pais: "Espanha",
    stars: 4.5,
    unidades: 1,

    tipo: "Vinho tinto",
    safra: 2024,
    teoralcoolico: 12,
    temperaturaservico: "16ºC",
    tipofechamento: "Rolha sintética",
    volume: "750ml",

    cor: "Vermelho-rubi com reflexos violáceos",
    aroma: "Frutas vermelhas como cereja e morango, com toques de alcaçuz",
    sabor: "Corpo médio, taninos macios, ótimo equilíbrio e fruta",
    harmonizacao: "Carnes vermelhas, pizzas, massas com molho vermelho",
  },
  {
    name: "La Grupa Gran Selección Malbec 2024",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000023862-standing-front.png",
    vinicula: "La Grupa",
    preco: 49.9,
    desconto: 33,
    descricao:
      "Vinho tinto encorpado da região de Mendoza, Argentina, feito com a uva Malbec.",
    categoria: "singular",

    uva: "Malbec",
    pais: "Argentina",
    stars: 4.2,
    unidades: 1,

    tipo: "Vinho tinto",
    safra: 2024,
    teoralcoolico: 13,
    temperaturaservico: "18ºC",
    tipofechamento: "Rolha sintética",
    volume: "750ml",

    cor: "Vermelho-rubi profundo",
    aroma: "Frutas maduras, ameixa e toques de pimenta",
    sabor: "Marcante, com taninos aveludados e toques de especiarias",
    harmonizacao: "Carnes vermelhas, pizzas, massas de molho vermelho, queijos",
  },
  {
    name: "Viñapeña Blanco",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000001367-standing-front.png",
    vinicula: "J. García Carrión",
    preco: 34.9,
    desconto: 33,
    descricao:
      "Vinho branco refrescante, feito com uvas Airén, ideal para momentos descontraídos.",
    categoria: "singular",

    uva: "Airén",
    pais: "Espanha",
    stars: 4.3,
    unidades: 1,

    tipo: "Vinho branco",
    safra: 2024,
    teoralcoolico: 11,
    temperaturaservico: "16ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Amarelo-pálido com tons dourados",
    aroma: "Frutas amarelas e flores brancas",
    sabor: "Refrescante, com notas de frutas cítricas e damasco",
    harmonizacao: "Carnes brancas, saladas, aperitivos",
  },
  {
    name: "Tanggier Brut Rosé",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1643710-standing-front.png",
    vinicula: "Produtor desconhecido",
    preco: 69.9,
    desconto: 14,
    descricao:
      "Espumante Rosé refrescante e levemente frutado, ideal para dias quentes.",
    categoria: "singular",

    uva: "Uvas variadas",
    pais: "Espanha",
    stars: 4.0,
    unidades: 1,

    tipo: "Espumante rose",
    safra: 2023,
    teoralcoolico: 11,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Rosa-salmão",
    aroma: "Morango, framboesa e cerejas frescas",
    sabor: "Refrescante, levemente frutado, com boa acidez",
    harmonizacao: "Carnes brancas, frutos do mar, saladas e aperitivos",
  },
  {
    name: "Alísios Moscatel",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000002345-standing-front.png",
    vinicula: "Miolo",
    preco: 44.9,
    desconto: 5,
    descricao:
      "Espumante brasileiro leve e refrescante, produzido no Vale do São Francisco.",
    categoria: "singular",

    uva: "Moscatel",
    pais: "Brasil",
    stars: 4.5,
    unidades: 1,

    tipo: "Espumante branco",
    safra: 2024,
    teoralcoolico: 7.5,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Amarelo-palha com reflexos esverdeados",
    aroma: "Notas de jasmim, flores brancas, guaraná e cítricos",
    sabor: "Leve, doce e refrescante, com final jovial",
    harmonizacao: "Sobremesas",
  },
  {
    name: "Kit Trio Portada",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0243891-standing-front.png",
    vinicula: "DFJ Vinhos",
    preco: 149.7,
    desconto: 50,
    descricao:
      "Kit com 3 garrafas do vinho tinto português Portada Winemaker's Selection.",
    categoria: "kit",

    uva: "Uvas variadas",
    pais: "Portugal",
    stars: 4.6,
    unidades: 3,

    tipo: "Vinho tinto",
    safra: 2021,
    teoralcoolico: 12.5,
    temperaturaservico: "17ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Vermelho-rubi",
    aroma: "Frutas maduras como ameixa e groselha",
    sabor: "Encorpado e saboroso, com final levemente adocicado",
    harmonizacao: "Carnes vermelhas, pizzas, queijos",
  },
  {
    name: "Kit 6 Best Sellers",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0250911-standing-front.png",
    vinicula: "Diversas",
    preco: 167.82,
    desconto: 48,
    descricao:
      "Kit com 6 garrafas de vinhos variados: Don Simon, La Grupa e Expedicion.",
    categoria: "kit",

    uva: "Tempranillo, Malbec, Cabernet Sauvignon",
    pais: "Espanha, Argentina, Chile",
    stars: 4.4,
    unidades: 6,

    tipo: "Vinho tinto",
    safra: 2024,
    teoralcoolico: 12.5,
    temperaturaservico: "16-18ºC",
    tipofechamento: "Rolha sintética",
    volume: "750ml",

    cor: "Vermelho-rubi",
    aroma: "Frutas vermelhas e especiarias",
    sabor: "Encorpado, com taninos macios e final agradável",
    harmonizacao: "Carnes vermelhas, massas e queijos",
  },
  {
    name: "António Maçanita Palpite Branco 2018",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000002783-standing-front.png",
    vinicula: "António Maçanita",
    preco: 219.9,
    desconto: 11,
    descricao:
      "Vinho branco português encorpado e estruturado, com acidez bem marcada.",
    categoria: "singular",

    uva: "Antão Vaz, Verdelho, Arinto, Alicante Branco, Tamarez",
    pais: "Portugal",
    stars: 4.8,
    unidades: 1,

    tipo: "Vinho branco",
    safra: 2018,
    teoralcoolico: 13,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Amarelo-palha brilhante",
    aroma: "Limão siciliano, abacaxi e leve toque lácteo",
    sabor: "Encorpado, com acidez marcada e final fresco",
    harmonizacao:
      "Carnes brancas, frutos do mar, risotos, massas de molho branco",
  },
  {
    name: "Alísios Brut",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1693610-standing-front.png",
    vinicula: "Miolo",
    preco: 44.9,
    desconto: 20,
    descricao:
      "Espumante brasileiro refrescante e equilibrado, produzido no Vale do São Francisco.",
    categoria: "singular",

    uva: "Verdejo, Sauvignon Blanc, Chenin Blanc",
    pais: "Brasil",
    stars: 4.4,
    unidades: 1,

    tipo: "Espumante branco",
    safra: 2024,
    teoralcoolico: 12,
    temperaturaservico: "8ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Amarelo-pálido com reflexos esverdeados",
    aroma: "Frutas tropicais e flores como rosa e margarida",
    sabor: "Equilibrado e refrescante, com perlage fina",
    harmonizacao: "Carnes brancas, frutos do mar, queijos e risotos",
  },
  {
    name: "Villa Riviera Splendid Côtes de Provence AOC 2019",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000002951-standing-front.png",
    vinicula: "Villa Riviera",
    preco: 119.9,
    desconto: 26,
    descricao:
      "Vinho rosé elegante e delicado, da região de Provence, França, com aromas de frutas e flores.",
    categoria: "singular",

    uva: "Grenache, Syrah, Cinsault, Tibouren",
    pais: "França",
    stars: 4.7,
    unidades: 1,

    tipo: "Vinho rose",
    safra: 2019,
    teoralcoolico: 13,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Rosa-salmão brilhante",
    aroma: "Pêssego, frutas vermelhas e flores brancas",
    sabor: "Notas de morango e maçã, balanceado e refrescante",
    harmonizacao: "Carnes brancas, frutos do mar, saladas e risotos",
  },
  {
    name: "Tanggier Brut Rosé",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1643710-standing-front.png",
    vinicula: "Produtor desconhecido",
    preco: 69.9,
    desconto: 14,
    descricao:
      "Espumante Rosé refrescante e levemente frutado, ideal para dias quentes.",
    categoria: "singular",

    uva: "Uvas variadas",
    pais: "Espanha",
    stars: 4.0,
    unidades: 1,

    tipo: "Espumante rose",
    safra: 2023,
    teoralcoolico: 11,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Rosa-salmão",
    aroma: "Morango, framboesa e cerejas frescas",
    sabor: "Refrescante, levemente frutado, com boa acidez",
    harmonizacao: "Carnes brancas, frutos do mar, saladas e aperitivos",
  },
  {
    name: "Alísios by Miolo Brut Rosé",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1695200-standing-front.png",
    vinicula: "Miolo",
    preco: 44.9,
    desconto: 15,
    descricao:
      "Espumante rosé brasileiro leve e refrescante, feito com uvas Grenache no Vale do São Francisco.",
    categoria: "singular",

    uva: "Grenache",
    pais: "Brasil",
    stars: 4.5,
    unidades: 1,

    tipo: "Espumante rose",
    safra: 2024,
    teoralcoolico: 12,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Rosa-salmão",
    aroma: "Frutas vermelhas frescas como cereja e morango",
    sabor: "Equilibrado, delicado e refrescante",
    harmonizacao: "Frutos do mar, saladas e aperitivos",
  },
  {
    name: "Alísios Moscatel",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1000002345-standing-front.png",
    vinicula: "Miolo",
    preco: 44.9,
    desconto: 5,
    descricao:
      "Espumante brasileiro leve e refrescante, produzido no Vale do São Francisco.",
    categoria: "singular",

    uva: "Moscatel",
    pais: "Brasil",
    stars: 4.5,
    unidades: 1,

    tipo: "Espumante branco",
    safra: 2024,
    teoralcoolico: 7.5,
    temperaturaservico: "9ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Amarelo-palha com reflexos esverdeados",
    aroma: "Notas de jasmim, flores brancas, guaraná e cítricos",
    sabor: "Leve, doce e refrescante, com final jovial",
    harmonizacao: "Sobremesas",
  },
  {
    name: "Alísios Brut",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/1693610-standing-front.png",
    vinicula: "Miolo",
    preco: 44.9,
    desconto: 20,
    descricao:
      "Espumante brasileiro refrescante e equilibrado, produzido no Vale do São Francisco.",
    categoria: "singular",

    uva: "Verdejo, Sauvignon Blanc, Chenin Blanc",
    pais: "Brasil",
    stars: 4.4,
    unidades: 1,

    tipo: "Espumante branco",
    safra: 2024,
    teoralcoolico: 12,
    temperaturaservico: "8ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Amarelo-pálido com reflexos esverdeados",
    aroma: "Frutas tropicais e flores como rosa e margarida",
    sabor: "Equilibrado e refrescante, com perlage fina",
    harmonizacao: "Carnes brancas, frutos do mar, queijos e risotos",
  },
  {
    name: "Kit Quarteto Nero Reale",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0252781-standing-front.png",
    vinicula: "Rocca",
    preco: 399.6,
    desconto: 41,
    descricao:
      "Kit com 4 garrafas de Nero Reale Primitivo di Manduria DOC, vinho concentrado e aromático da região de Puglia, Itália.",
    categoria: "kit",

    uva: "Primitivo",
    pais: "Itália",
    stars: 4.7,
    unidades: 4,

    tipo: "Vinho tinto",
    safra: 2022,
    teoralcoolico: 14.5,
    temperaturaservico: "16ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Vermelho-rubi intenso",
    aroma: "Frutas vermelhas com toques de baunilha e especiarias",
    sabor: "Concentrado, marcante, com taninos redondos",
    harmonizacao: "Carnes de caça, carnes vermelhas, pizzas e queijos",
  },
  {
    name: "Kit Trio Miliasso Barolo",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0245881-standing-front.png",
    vinicula: "Miliasso",
    preco: 659.7,
    desconto: 51,
    descricao:
      "Kit com 3 garrafas de Barolo DOCG, vinho potente e aveludado da região do Piemonte, Itália.",
    categoria: "kit",

    uva: "Nebbiolo",
    pais: "Itália",
    stars: 4.8,
    unidades: 3,

    tipo: "Vinho tinto",
    safra: 2020,
    teoralcoolico: 14,
    temperaturaservico: "17ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Vermelho-granada",
    aroma: "Rosas secas, frutas vermelhas, especiarias e toques terrosos",
    sabor: "Redondo, aveludado, taninos marcados, final longo",
    harmonizacao: "Carnes de caça, pizzas, massas de molho vermelho, queijos",
  },
  {
    name: "Kit Sexteto Terre di Mario",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0225131-standing-front.png",
    vinicula: "Produtor não especificado",
    preco: 239.4,
    desconto: 56,
    descricao:
      "Kit com 6 garrafas de Terre di Mario Vino Rosso-Abboccato, um vinho tinto aveludado da região de Puglia, Itália.",
    categoria: "kit",

    uva: "Uvas variadas",
    pais: "Itália",
    stars: 4.3,
    unidades: 6,

    tipo: "Vinho tinto",
    safra: 2024,
    teoralcoolico: 13,
    temperaturaservico: "15ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Vermelho-rubi profundo",
    aroma: "Cereja preta com notas de balsâmico",
    sabor: "Aveludado, redondo, com taninos equilibrados",
    harmonizacao: "Carnes vermelhas, queijos, carnes de caça",
  },
  {
    name: "Kit Malbecs em Dobro",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0250941-standing-front.png",
    vinicula: "Diversas",
    preco: 289.0,
    desconto: 57,
    descricao:
      "Kit com 10 garrafas de Malbec argentinos, ótimo custo-benefício com vinhos como La Grupa, El Molino e Viña de Los Andes.",
    categoria: "kit",

    uva: "Malbec",
    pais: "Argentina",
    stars: 4.5,
    unidades: 10,

    tipo: "Vinho tinto",
    safra: 2024,
    teoralcoolico: 13.5,
    temperaturaservico: "16-18ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Vermelho-rubi",
    aroma: "Frutas vermelhas maduras e especiarias",
    sabor: "Encorpado, com taninos equilibrados e final agradável",
    harmonizacao: "Carnes vermelhas, pizzas e queijos",
  },
  {
    name: "Kit Sexteto Sud Primitivo di Manduria",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0251181-standing-front.png",
    vinicula: "San Marzano",
    preco: 599.4,
    desconto: 40,
    descricao:
      "Kit com 6 garrafas do Sud Primitivo di Manduria DOP, vinho tinto italiano da Puglia, estruturado e intenso.",
    categoria: "kit",

    uva: "Primitivo",
    pais: "Itália",
    stars: 4.8,
    unidades: 6,

    tipo: "Vinho tinto",
    safra: 2022,
    teoralcoolico: 14,
    temperaturaservico: "16ºC",
    tipofechamento: "Rolha de cortiça",
    volume: "750ml",

    cor: "Vermelho-rubi com reflexos violáceos",
    aroma: "Cerejas maduras, ameixas, toques de cacau e baunilha",
    sabor: "Encorpado, com final longo e macio",
    harmonizacao: "Carnes vermelhas, queijos",
  },
  {
    name: "Kit 10 Freshs",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0252761-standing-front.png",
    vinicula: "Diversas",
    preco: 249.0,
    desconto: 62,
    descricao:
      "Kit com 10 vinhos brancos e rosés perfeitos para dias quentes e harmonizações leves.",
    categoria: "kit",

    uva: "Airén, Chardonnay, Syrah, Merlot, Carménère",
    pais: "Argentina, Chile, Espanha",
    stars: 4.3,
    unidades: 10,

    tipo: "Diversos",
    safra: 2024,
    teoralcoolico: 12,
    temperaturaservico: "8-10ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Amarelo-pálido e rosa-claro",
    aroma: "Frutas frescas e flores",
    sabor: "Leve, refrescante, com boa acidez",
    harmonizacao: "Saladas, aperitivos, carnes brancas",
  },
  {
    name: "Kit 3 Tempranillo + 3 Pinot",
    img: "https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_434/v1/products/0252801-standing-front.png",
    vinicula: "Don Simon, Fuenteviña",
    preco: 167.4,
    desconto: 61,
    descricao:
      "Kit com 3 garrafas de Don Simon Tempranillo e 3 de Fuenteviña Pinot Noir, vinhos tintos espanhóis.",
    categoria: "kit",

    uva: "Tempranillo, Pinot Noir",
    pais: "Espanha",
    stars: 4.4,
    unidades: 6,

    tipo: "Vinho tinto",
    safra: 2024,
    teoralcoolico: 12.5,
    temperaturaservico: "16ºC",
    tipofechamento: "Rolha",
    volume: "750ml",

    cor: "Vermelho-rubi",
    aroma: "Frutas vermelhas maduras e toques florais",
    sabor: "Equilibrado, com taninos suaves",
    harmonizacao: "Carnes vermelhas, queijos e massas",
  },
] satisfies (typeof wines.$inferInsert)[];

void (async () => {
  const keys = Object.keys(_wines[0]!) as (keyof typeof wines._.columns)[];
  await db
    .insert(wines)
    .values(_wines)
    .onConflictDoUpdate({
      target: wines.id,
      set: buildConflictUpdateColumns(wines, keys),
    });
})();

//? Helper function created with love by andrew sherman love u andrew sherman
//? https://orm.drizzle.team/learn/guides/upsert#postgresql-and-sqlite
function buildConflictUpdateColumns<
  T extends PgTable,
  Q extends keyof T["_"]["columns"],
>(table: T, columns: Q[]) {
  const cls = getTableColumns(table);
  return columns.reduce(
    (acc, column) => {
      console.log(cls[column]!.name);
      const colName = cls[column]!.name;
      acc[column] = sql.raw(`excluded.${colName}`);
      return acc;
    },
    {} as Record<Q, SQL>,
  );
}
