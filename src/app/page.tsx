import { Homepage } from "~/components/homepage";
import { getWines } from "~/server/db/select";

export default async function HomePage() {
	const wines = await getWines();
  return <Homepage wines={wines}/>;
}
