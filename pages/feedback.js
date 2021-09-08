import useSWR from "swr";
import { useAuth } from "../lib/auth";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardSell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import FeedbackTable from "@/components/FeedbackTable";
//import feedback from "./api/feedback";

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/feedback", user._lat] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.feedback ? <FeedbackTable allFeedback={data.feedback}></FeedbackTable> : null}
    </DashboardShell>
  );
};

export default MyFeedback;
