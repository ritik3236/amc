"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

interface ProvidersProps {
  children?: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { children, themeProps } = props;

  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
};
