import { notFound } from "next/navigation";
import UsersPage from "../users";
import KnowledgePage from "../knowledge-base";
import AuditPage from "../audit-logs";

export const instant = false;

export default async function AdminSection({params}:{params:Promise<{section:string}>}) {
  const {section}=await params;
  if(section==="users")return <UsersPage/>;
  if(section==="knowledge-base")return <KnowledgePage/>;
  if(section==="audit-logs")return <AuditPage/>;
  notFound();
}
