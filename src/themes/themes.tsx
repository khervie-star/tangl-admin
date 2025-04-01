import { ThemeOptions } from "@mui/material/styles";
import { amber, blueGrey, cyan, green } from "@mui/material/colors";
import { outfit } from "@/fonts";

// Extend the Theme interface to include your custom property
declare module "@mui/material/styles" {
  interface Theme {
    drawerWidth: number;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    drawerWidth?: number;
  }
}

export const lightThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: outfit.style.fontFamily
  },
  palette: {
    text: { primary: blueGrey[800] },
    background: {
      default: "#ffffff"
    },

    primary: {
      main: "#007afb",
      contrastText: "#ffffff"
    },

    secondary: {
      main: "#011122"
    },

    // danger: {
    //   light: red[300],
    //   main: red[500],
    //   dark: red[700],
    // },

    success: {
      light: green[300],
      main: green[500],
      dark: green[700]
    },

    error: {
      light: "#FA7777",
      main: "#F71C1C",
      dark: "#d31717"
    },

    warning: {
      light: amber[300],
      main: amber[500],
      dark: amber[700]
    },

    info: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700]
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },

  drawerWidth: 300,

  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(75, 8, 4, 0.20)"
          }
        }
      }
    },

    MuiFormGroup: {
      styleOverrides: {
        root: {
          "& .f_rl": {
            marginLeft: "-0.05rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",

            "& .MuiRadio-root": {
              padding: "0.05rem"
            },

            "& .MuiTypography-root": {
              fontSize: "0.75rem",
              color: "#5A5B60"
            }
          }
        }
      }
    }
  }
};
