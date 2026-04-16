// app/index.tsx
import { useEffect, useState, useContext } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "./context/AuthContext";

export default function Index() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [mounted, setMounted] = useState(false);

  // Ensure router is ready after layout mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // wait until layout has mounted

    if (!user) {
      router.replace("/screens/Auth/RoleSelection");
    } else if (user.role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/screens/Home");
    }
  }, [user, mounted]);

  return null; // nothing to render
}
