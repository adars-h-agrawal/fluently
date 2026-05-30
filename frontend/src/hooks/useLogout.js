import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.removeQueries({ queryKey: ["streamToken"] });
      queryClient.removeQueries({ queryKey: ["friends"] });
      queryClient.removeQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["friendRequests"] });
      queryClient.removeQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;