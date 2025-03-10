import { Carousel } from 'react-responsive-carousel'
import './App.css'
import Header from './Components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import CarouselEffect from './Components/Carousel/Carousel'
import Category from './Components/Category/Category'
import Product from './Components/Product/Product'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Header/>
    <CarouselEffect/>
    <Category/>
    <Product/>
    </BrowserRouter>
    </>
  )
}


export default App