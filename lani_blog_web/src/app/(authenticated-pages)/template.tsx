"use client";

import { signIn, useSession } from "next-auth/react";
import Loading from "../components/atoms/Loading";
import { useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading")
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
}
