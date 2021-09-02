import EmptyState from "../components/EmptyState";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import DashboardShell  from "../components/DashboardSell";
import SiteTable  from "../components/SiteTable";
import { useAuth } from "../lib/auth"
import { Table } from "../components/Table";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
const Dashboard = () => {
  const {user} = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user._lat] : null , fetcher);
  
  if(!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton /> 
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState /> }
    </DashboardShell>
  )
} 


export default Dashboard;