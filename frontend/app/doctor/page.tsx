import Overview from "./overview";
import Reviews from "./reviews";
import Verify from "./verify";
import ReviewHistory from "./history";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ view?: string | string[]; id?: string | string[] }>;
};

export const instant = false;

// Next.js 16 expects async searchParams. next.config.ts rewrites keep URLs clean.
export default async function DoctorPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const view = typeof query.view === "string" ? query.view : "overview";
  const id = typeof query.id === "string" ? query.id : undefined;
  if (view === "overview") return <Overview />;
  if (view === "reviews") return <Reviews />;
  if (view === "verify") return <Verify initialId={id} />;
  if (view === "history") return <ReviewHistory />;
  notFound();
}
