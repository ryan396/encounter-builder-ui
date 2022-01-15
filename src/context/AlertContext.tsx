import React, { createContext, useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertContext = createContext({ openAlert: (message: string) => {} });
const AlertContextProvider = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const openAlert = (message: string) => {
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <AlertContext.Provider
      value={{
        openAlert,
      }}
    >
      <Snackbar
        sx={{ ml: "auto", mr: "auto" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={alertMessage}
        action={action}
      />
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertContextProvider };
