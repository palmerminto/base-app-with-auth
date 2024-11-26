"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "../../lib/apollo";
import { AuthProvider } from "../contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
