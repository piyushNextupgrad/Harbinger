import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
//...................
import Sliderr from "@/components/Slider";

export default function Home() {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [sliderContent, setsliderContent] = useState([]);
  const [post, setpost] = useState([]);
  const [section3, setsection3] = useState({});
  const [section4, setsection4] = useState({});
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (sliderContent.length > 0) {
      console.log("sliderContent", sliderContent);
    }
  }, [sliderContent]);
  async function getData() {
    try {
      setisSubmitingLoader(true);
      const slider = await axios.get(
        "https://harbinger-backend.onrender.com/section1/getData"
      );

      setsliderContent(slider?.data?.data);
      const articles = await axios.get(
        "https://harbinger-backend.onrender.com/articles/api/getArticle"
      );

      setpost(articles?.data?.data);
      const section3 = await axios.get(
        "https://harbinger-backend.onrender.com/section3/api/getSection3"
      );

      setsection3(section3?.data?.data);
      const section4 = await axios.get(
        "https://harbinger-backend.onrender.com/section4/api/getSection4"
      );
      console.log("sec4", section4);
      setsection4(section4?.data?.data);
      setisSubmitingLoader(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <>
        <section className="sec1" id="demos">
          {isSubmitingLoader ? (
            <div className="overlay">
              <div className="spinner-container">
                <Spinner
                  className="loaderSpinnerPiyush"
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "#0a1c51fc",
                  }}
                  animation="border"
                />
              </div>
            </div>
          ) : null}
          <h1>HARBINGER KEY</h1>
          {sliderContent.length > 0 ? (
            <Sliderr sliderContent={sliderContent} />
          ) : null}
        </section>
        <section className="sec2">
          <h1 className="sec2-0">LATEST ARTICLES</h1>
          {post.length > 0
            ? post.map((item, index) => (
                <div key={index} className="sc2">
                  <div className="sec2-2">
                    <img
                      src={item.postMedia ? item.postMedia : "/key1-1.png"}
                      alt="img"
                    />
                  </div>
                  <div className="sec2-1">
                    <div className="sec2-1-1">
                      <ul>
                        <li>
                          <img src="/key-icon.png" />
                        </li>
                        <li className="authorName">{item?.authorName}</li>
                        <li>{item?.updatedAt}</li>
                      </ul>
                    </div>
                    <div className="sec2-1-2">
                      <h5>{item?.postHeading}</h5>
                      <p className="postContent">{item?.postContent}</p>
                      <a href={item?.postLink} target="_blank">
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              ))
            : null}

          <div className="sc3">
            <a href="#" target="_blank">
              Visit Our Blog →
            </a>
          </div>
          <div className="sc5">
            <div className="sc5-1">
              <h1>Audited by CERTIK</h1>
              <p>
                SHIB, LEASH, and BONE, come together to create ShibaSwap, the
                next evolution in DeFi platforms. ShibaSwap gives users the
                ability to DIG (provide liquidity), BURY (stake), and SWAP
                tokens to gain WOOF Returns through our sophisticated and
                innovative passive income reward system. Our platform also
                allows the ShibArmy to access upcoming NFTs and additional
                tools, such as portfolio trackers, to make navigating the crypto
                world simple and intuitive.
              </p>
            </div>
            <div className="sc5-2">
              <img src="/CerticLogo.png" alt="img" />
              <a href="#" target="_blank">
                AUDIT REPORT
              </a>
            </div>
          </div>
        </section>
        {section3.length > 0
          ? section3.map((item, index) => (
              <section key={index} className="sec3">
                <div className="sec3-1">
                  <p>{item.sectionName}</p>
                  <h3>{item.sectionHeading}</h3>
                  <p>{item.sectionContent1}</p>
                  <p>{item.sectioncontent2}</p>

                  <a href={item.link1} target="_blank">
                    Harbinger Key
                  </a>
                  <a href={item.link2} target="_blank">
                    Key Token
                  </a>
                </div>
              </section>
            ))
          : null}
        {section4.length > 0
          ? section4.map((item, index) => (
              <section key={index} className="sec4" id="comm">
                <div className="sec4-1">
                  <p>{item?.sectionName}</p>
                  <h3>{item?.sectionHeading}</h3>
                  <p>{item?.sectionContent1}</p>
                  <p>{item?.sectionContent2}</p>
                  <a href={item?.link1} target="_blank" className="sc7-1">
                    {item?.buttonText}
                  </a>
                </div>
              </section>
            ))
          : null}
      </>
    </>
  );
}
