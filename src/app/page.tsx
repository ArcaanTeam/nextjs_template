import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TestQuery from "./test-query";
import { fetchPosts } from "./usePosts";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-screen h-screen p-10">
        <TestQuery />
      </div>
    </HydrationBoundary>
  );
}
