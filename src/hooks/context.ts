import { useContext } from "react";
import { RouteContext } from "@/contexts/RouteContextProvider";

function useRouteContext() {
  const context = useContext(RouteContext);
  if (!context) throw Error("useRouteContext can only be used inside an RouteContextProvider");
  return context;
}

export {
  useRouteContext,
};
