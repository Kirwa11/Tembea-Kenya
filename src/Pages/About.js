import React from 'react';


const About = () => {
  const aboutSections = [
    {
      id: 1,
      title: "The History of Kenya",
      image: "/assets/history.jpg",
      content: `Kenya's story begins thousands of years ago, with evidence showing that it is one of the cradles of humankind. Fossils discovered in Turkana and the Rift Valley prove that early humans lived here millions of years ago. Kenya became home to diverse communities such as the Kikuyu, Luo, Luhya, Maasai, Kamba, and Kalenjin, each with rich traditions and ways of life.`
    },
    {
      id: 2,
      title: "Kenyan Culture",
      image: "/assets/culture.jpg",
      content: `Kenya's culture is a beautiful mosaic shaped by more than 40 ethnic groups. The shared spirit of "Harambee" (pulling together) defines Kenyan life. From the Swahili culture along the coast to the Maasai and Samburu traditions, Kenya celebrates a rich heritage of music, dance, and culinary diversity.`
    },
    {
      id: 3,
      title: "Tourism & Wildlife",
      image: "/assets/tourism.jpg",
      content: `Kenya is world-renowned as the home of the safari. From the Maasai Mara to Mount Kilimanjaro's foothills, Kenya offers encounters with the Big Five. The annual Great Migration is one of nature's greatest spectacles, while the coast offers pristine beaches and rich marine life.`
    },
    {
      id: 4,
      title: "Natural Wonders",
      image: "/assets/nature.jpg",
      content: `From the snow-capped Mount Kenya to the Great Rift Valley, Kenya's landscapes are breathtaking. The country boasts incredible lakes like Victoria, Nakuru, and Turkana, each with unique ecosystems. Kenya's national parks protect this natural heritage, making it a global leader in conservation.`
    }
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">Welcome to Tembea Kenya</h1>
      <div className="about-grid">
        {aboutSections.map((section) => (
          <div key={section.id} className="about-card">
            <div className="card-image">
              <img src={section.image} alt={section.title} />
            </div>
            <div className="card-content">
              <h3>{section.title}</h3>
              <p>{section.content}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;