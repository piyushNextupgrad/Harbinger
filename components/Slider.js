import Slider from "react-slick";
const Sliderr = ({ sliderContent }) => {
  var settings = {
    dots: true,
    infinite: true,

    slidesToShow: sliderContent.length > 4 ? 4 : sliderContent.length,

    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: sliderContent.length > 3 ? 3 : sliderContent.length,
          slidesToScroll: 1,
          infinite: true,
          dots: true,

          initialSlide: 0,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: sliderContent.length > 2 ? 2 : sliderContent.length,
          slidesToScroll: 1,
          dots: true,

          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: sliderContent.length > 2 ? 2 : sliderContent.length,
          slidesToScroll: 1,
          dots: true,

          initialSlide: 0,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
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
                  <div className="cardfullwidth">
                    <img
                      className="keyImage"
                      src={item?.imagePath}
                      alt="card1"
                    />
                  </div>
                  <div className="crd">
                    <h2>{item?.keyName}</h2>
                    <a className="sliderLink" href={item?.link} target="_blank">
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
