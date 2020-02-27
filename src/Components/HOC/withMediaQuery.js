import React from 'react'
import { useMediaQuery, createMuiTheme, ThemeProvider } from '@material-ui/core'

const withMediaQuery = (...args) => Component => props => {
    //const mediaQuery = useMediaQuery(...args);
    const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
        createMuiTheme({
            palette: {
                type: mediaQuery ? 'dark' : 'light',
            },
        }),
        [mediaQuery],
    )
    return (
        <ThemeProvider theme={theme}>
            <Component mediaQuery={mediaQuery} {...props} />;
        </ThemeProvider>
    )
}

export default withMediaQuery