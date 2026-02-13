import { useContext } from "react";
import Provider from "./auth-provider";

export default function useAuth() {
  return useContext(Provider.AuthContext);
}
