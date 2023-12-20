import Slider from "react-slick";
const Sliderr = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
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
        <div className="item">
          <div className="card">
            <div className="card1">
              <img src="/card-key.png" alt="card1" />
            </div>
            <div className="crd">
              <h2>KEY 1</h2>
              <a href="#" target="_blank">
                BUY KEY 1
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="card">
            <div className="card2">
              <img src="/card-key.png" alt="card2" />
            </div>
            <div className="crd">
              <h2>KEY 2</h2>
              <a href="#" target="_blank">
                BUY KEY 2
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="card">
            <div className="card3">
              <img src="/card-key.png" alt="card3" />
            </div>
            <div className="crd">
              <h2>KEY 3</h2>
              <a href="#" target="_blank">
                BUY KEY 3
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="card">
            <div className="card4">
              <img src="/card-key.png" alt="card1" />
            </div>
            <div className="crd">
              <h2>KEY 4</h2>
              <a href="#" target="_blank">
                BUY KEY 4
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="card">
            <div className="card4">
              <img src="/card-key.png" alt="card1" />
            </div>
            <div className="crd">
              <h2>KEY 5</h2>
              <a href="#" target="_blank">
                BUY KEY 5
              </a>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Sliderr;
