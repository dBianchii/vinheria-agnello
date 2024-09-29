import { eq } from "drizzle-orm";
import { db } from "./index";
import { type SelectWine, wines } from "./schema";

export async function getWines(): Promise<
  Array<{
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
  }>
> {
  return db.select().from(wines);
}

export async function getWineById(id: SelectWine["id"]): Promise<
  Array<{
    id: number;
    name: string;
    img: string;
    vinicula: string;
    preco: number;
    desconto: number | null;
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
  }>
> {
  return db.select().from(wines).where(eq(wines.id, id));
}
