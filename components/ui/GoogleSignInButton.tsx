"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton({ text = "signin_with" }: { text?: "signin_with" | "signup_with" }) {
  const router = useRouter();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId || !(window as any).google) return;

      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: any) => {
          try {
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            });

            const data = await res.json();
            if (data.success) {
              localStorage.setItem("user", JSON.stringify(data.user));
              router.push("/dashboard");
              router.refresh();
            } else {
              alert(data.message || "Google Login failed");
            }
          } catch (e) {
            console.error("Google sign in error", e);
          }
        },
      });

      if (googleBtnRef.current) {
        (window as any).google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          width: "100%",
          text: text,
          shape: "pill",
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [router, text]);

  return <div ref={googleBtnRef} className="w-full flex justify-center my-4" />;
}
