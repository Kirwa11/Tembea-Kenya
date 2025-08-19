import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  const slides = [
    {
      id: 1,
      image: 'https://source.unsplash.com/random/800x400?kenya',
      title: 'Explore Kenya',
      description: "Discover the beauty of Kenya's landscapes and wildlife."
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/random/800x400?safari',
      title: 'Wildlife Safari',
      description: 'Experience the thrill of African wildlife up close.'
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/random/800x400?beach',
      title: 'Coastal Paradise',
      description: "Relax on Kenya's pristine white sandy beaches."
    },
    {
      id: 4,
      image: 'https://source.unsplash.com/random/800x400?culture',
      title: 'Rich Culture',
      description: "Immerse yourself in Kenya's diverse cultural heritage."
    },
    {
      id: 5,
      image: 'https://source.unsplash.com/random/800x400?mountain',
      title: 'Mountain Peaks',
      description: 'Conquer the majestic Mount Kenya and other peaks.'
    }
  ];

  return (
    <div className="home-container">
      <div className="carousel-container" style={{ margin: '20px 0' }}>
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <div 
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  position: 'relative',
                  color: 'white',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div 
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '8px',
                    maxWidth: '80%'
                  }}
                >
                  <h2 style={{ fontSize: '2.5em', marginBottom: '15px' }}>{slide.title}</h2>
                  <p style={{ fontSize: '1.2em' }}>{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="content">
        <h2>Tembea Kenya</h2>
        <p>Tembea Kenya means "Welcome to Kenya" in Swahili.</p>
        <p>Tembea Kenya is a company that provides tour services in Kenya.</p>
        <p>The idea was inspired by the fact that Kenya is a country with a rich history and culture.</p>
      </div>
    </div>
  );
};

export default Home;