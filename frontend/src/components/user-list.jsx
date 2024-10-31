import PropTypes from "prop-types";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// hooks
import { useToast } from "@/hooks/use-toast";

// api
import { fetchAllUsers } from "@/api/users";

export const UserList = () => {
  const {
    data: users,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    suspense: true,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
  }, [isError, error, toast]);

  return users?.map((user) => (
    <div className="bg-white p-4 rounded-lg shadow-xl" key={user.id}>
      <h2 className="text-lg font-bold">{user.displayName}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  ));
};

UserList.propTypes = {
  users: PropTypes.array,
};
