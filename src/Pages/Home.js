import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Importing images from assets
import flag from '../assets/carosel/flag.jpeg';
import culture from '../assets/carosel/kenyaculture.jpeg';
import history from '../assets/carosel/kenyahistory.jpeg';
import hotels from '../assets/carosel/kenyahotels.jpeg';
import lake from '../assets/carosel/kenyalaketurkana.jpeg';
import rift from '../assets/carosel/kenyarift.jpeg';
import tourism from '../assets/carosel/kenyatourism.jpeg';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    dotsClass: 'slick-dots custom-dots',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const slides = [
    {
      id: 1,
      image: tourism,
      title: 'Discover Kenya',
      description: 'Experience the magic of Kenya\'s world-famous wildlife and breathtaking landscapes.'
    },
    {
      id: 2,
      image: culture,
      title: 'Rich Cultural Heritage',
      description: 'Immerse yourself in the vibrant traditions of Kenya\'s diverse communities.'
    },
    {
      id: 3,
      image: lake,
      title: 'Natural Wonders',
      description: 'Explore the stunning beauty of Lake Turkana and other natural treasures.'
    },
    {
      id: 4,
      image: history,
      title: 'Historical Journey',
      description: 'Walk through the rich history that shaped modern Kenya.'
    },
    {
      id: 5,
      image: rift,
      title: 'Great Rift Valley',
      description: 'Marvel at the spectacular landscapes of the Great Rift Valley.'
    },
    {
      id: 6,
      image: hotels,
      title: 'Luxury Stays',
      description: 'Experience world-class hospitality in Kenya\'s finest accommodations.'
    },
    {
      id: 7,
      image: flag,
      title: 'Kenya Flag',
      description: ''
    }
  ];

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow next" onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow prev" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-carousel">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <div 
                className="slide-bg"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`
                }}
              >
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button className="explore-btn">Explore More</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="welcome-section">
        <h2>Tembea Kenya</h2>
        <p className="subtitle">Tembea Kenya is a campaign that promotes the beauty, culture, and experiences found within Kenya. It encourages both local and international tourists to explore the country’s rich heritage, breathtaking landscapes, diverse wildlife, and warm hospitality. From the vast savannahs of the Maasai Mara to the white sandy beaches of Diani, from the snowcapped peaks of Mount Kenya to the bustling city life of Nairobi, Kenya offers unforgettable adventures for everyone.

        The campaign also highlights Kenya’s cultural diversity, showcasing traditions, music, food, and crafts from over 40 different communities. It is about celebrating Kenya’s identity and inviting the world to share in its natural wonders and vibrant spirit.</p>
        <button className="explore-btn">Explore More</button>
      </div>
    </div>
  );
};

export default Home;