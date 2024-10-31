import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import api from "@/api";

// components
import { Button } from "@/components/ui/button";

// icons
import { FcGoogle } from "react-icons/fc";

export const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (result) {
        const {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
        } = result.user;

        await api.post("/auth/google", {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleGoogleSignIn} className="w-full">
      <FcGoogle />
      Continue with Google
    </Button>
  );
};
