import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" sx={{height: "100vh"}}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 2,
            fontSize: "0.8rem",
            border: "1px solid grey",
            borderRadius: "7px"
          }}
        >
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}