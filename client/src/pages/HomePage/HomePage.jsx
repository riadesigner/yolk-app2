import MainPageBanner from './components/MainPageBanner.jsx';
import MainPageCategories from './components/MainPageCategories.jsx';
import MainPageWhyYolk from './components/MainPageWhyYolk.jsx';
import MainPageYoSlider from './components/MainPageYoSlider.jsx';

export default function HomePage() {
  return (
    <>
      <MainPageBanner />
      <MainPageCategories />
      <MainPageWhyYolk />
      <MainPageYoSlider />
    </>
  );
}
