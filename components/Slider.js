import Slider from "react-slick";
const Sliderr = ({ sliderContent }) => {
  var settings = {
    dots: true,
    infinite: true,

    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {sliderContent?.length > 0
          ? sliderContent.map((item, index) => (
              <div key={index} className="item">
                <div className="cardd">
                  <div className="card1">
                    <img src={item?.imagePath} alt="card1" />
                  </div>
                  <div className="crd">
                    <h2>{item?.keyName}</h2>
                    <a href="#" target="_blank">
                      BUY {item?.keyName}
                    </a>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
};

export default Sliderr;
