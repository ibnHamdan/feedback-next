import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardSell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import FeedbackTable from "@/components/FeedbackTable";
import Page from "@/components/Page";
import { useRouter } from "next/router";

import SiteFeedbackTableHeader from "@/components/SiteFeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";
//import feedback from "./api/feedback";

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(user ? [`/api/feedback/${query.siteId}`, user._lat] : null, fetcher);
  
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data.site.site} />
      {data.feedback.length ? <FeedbackTable allFeedback={data.feedback}></FeedbackTable> : <FeedbackEmptyState />}
    </DashboardShell>
  );
};

const SiteFeedbackPage = () => (
  <Page name="Name of Site Feedback" path="/feedback">
    <SiteFeedback />
  </Page>
);

export default SiteFeedbackPage;
