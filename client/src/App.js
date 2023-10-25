import Header from './components/Header';
import Home from './components/Home';
import { Box } from '@mui/material'
import DataProvider from './context/DataProvider';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import DetailsProducts from './components/DetailsProduct';
import Cart from './components/Cart';
function App() {
  return (
    <>
      <DataProvider>
      <BrowserRouter>
      <Header />
        <Box style={{ marginTop: 54 }}>
         
          <Routes>
            <Route path='/' element={<Home />} />          
            <Route path='/product/:productId' element={<DetailsProducts/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
      
        </Box>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
