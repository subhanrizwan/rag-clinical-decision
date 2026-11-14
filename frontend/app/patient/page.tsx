import Overview from "./overview";
import Upload from "./upload";
import Prescriptions from "./prescriptions";
import Reports from "./reports";
import Schedule from "./schedule";
import History from "./history";
import Settings from "./settings";

const pages = {
  upload: Upload,
  prescriptions: Prescriptions,
  reports: Reports,
  schedule: Schedule,
  history: History,
  settings: Settings,
};

type Section = keyof typeof pages;

export const instant = false;

export default async function PatientPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; id?: string }>;
}) {
  const { section, id } = await searchParams;
  if (section === "reports") {
    return <Reports key={id ?? "default"} initialId={id} />;
  }
  const Page = section && Object.hasOwn(pages, section)
    ? pages[section as Section]
    : Overview;
  return <Page key={section ?? "overview"} />;
}
