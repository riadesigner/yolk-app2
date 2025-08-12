import MainPageBanner from '../components/MainPageBanner'
import MainPageCategories from '../components/MainPageCategories'
import MainPageWhyYolk from '../components/MainPageWhyYolk'
import MainPageYoSlider from '../components/MainPageYoSlider'

export default function HomePage(){
    return(
        <>
        <MainPageBanner />
        <MainPageCategories />
        <MainPageWhyYolk />
        <MainPageYoSlider />            
        </>
    )
}