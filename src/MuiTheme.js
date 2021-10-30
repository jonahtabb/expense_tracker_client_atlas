import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    palette: {
        primary: {
            main: `#2c6ac7`
        }
    },
    styleOverrides: {
        MuiTypography:{
            root:{
                color:`#2c6ac7`
            }
        }

    }
})

export default theme