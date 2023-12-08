import { StyleSheet } from 'react-native'
import Header from '../Components/Header'
import Categories from '../Components/Categories'

const Home = ({setCategorySelected}) => {
  
  return (
        <>
            <Header title='Bienvenido a un poco de todo' />
            <Categories setCategorySelected={setCategorySelected}/>
        </>
  )
}

export default Home

const styles = StyleSheet.create({

})

