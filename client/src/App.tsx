import { themeSettings } from '@/themes'
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/scenes/navbar';
import Dashboard from '@/scenes/dashboard';
import Predictions from '@/scenes/predictions';
function App() {

  const theme = useMemo( () => 
    createTheme(themeSettings), []
  );

  return (  
  
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" >
            <Navbar />

            <Routes>
              <Route path='/' element={<Dashboard />}>

              </Route>
              <Route path='/predictions' element={<Predictions />}>

              </Route>
            </Routes>
        </Box>
        

      </ThemeProvider>


    
    
    </BrowserRouter>

    </div>);

}

export default App
