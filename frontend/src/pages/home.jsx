import { Suspense } from "react";

// components
import { UserList } from "@/components/user-list";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  return (
    <div className="h-full p-5">
      <h1 className="text-2xl font-bold">User Lists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        <Suspense fallback={<Skeleton className="h-20 w-full" />}>
          <UserList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
