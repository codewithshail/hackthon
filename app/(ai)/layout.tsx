import Providers from "@/components/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <Providers>
        <div>{props.children}</div>
    </Providers>
  );
};

export default Layout;
