import EmptyState from "../components/EmptyState";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import DashboardShell from "../components/DashboardSell";
import SiteTable from "../components/SiteTable";
import { useAuth } from "../lib/auth";
import { Table } from "../components/Table";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import SiteTableHeader from "../components/SiteTableHeader";
import Page from "@/components/Page";
const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", user._lat] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      <EmptyState />
    </DashboardShell>
  );
};

const DashboardPage = () => (
  <Page name="dashboard" path="/sites">
    <Dashboard />
  </Page>
);

export default DashboardPage;
