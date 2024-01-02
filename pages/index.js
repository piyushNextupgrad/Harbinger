import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
//...................
import Sliderr from "@/components/Slider";
import { useRouter } from "next/router";

export default function Home() {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(true);
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
      // setisSubmitingLoader(true);
      const slider = await axios.get(
        process.env.NEXT_PUBLIC_SITE_URL + "/section1/getData"
      );

      setsliderContent(slider?.data?.data);
      const articles = await axios.get(
        process.env.NEXT_PUBLIC_SITE_URL + "/articles/api/getArticle"
      );

      setpost(articles?.data?.data);
      const section3 = await axios.get(
        process.env.NEXT_PUBLIC_SITE_URL + "/section3/api/getSection3"
      );

      setsection3(section3?.data?.data);
      const section4 = await axios.get(
        process.env.NEXT_PUBLIC_SITE_URL + "/section4/api/getSection4"
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
        {/* {isSubmitingLoader ? (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255)", // White background with some transparency
                zIndex: 9999,
                transition: "opacity 1s ease-out", // Fade-out transition
                opacity: isSubmitingLoader ? 1 : 0, // Adjust opacity based on isSubmitingLoader state
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Rotating Image"
                  className="img-rotation"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
            </div>
          ) : null} */}
        {isSubmitingLoader ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 9999,
              transition: "opacity 1s ease-out",
              opacity: isSubmitingLoader ? 1 : 0,
              background: "url('/blurBack.jpg')", // Replace '/path/to/your/background-image.jpg' with the actual path to your background image
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Rotating Image"
                className="img-rotation"
                style={{
                  width: "100px",
                  height: "100px",
                  animation: "rotation 2s infinite linear", // Add a rotation animation
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <section className="sec1" id="demos">
              <h1 className="sec1topHeading">HARBINGER KEY</h1>
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
                              <img src="/images/logo.png" />
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
                    SHIB, LEASH, and BONE, come together to create ShibaSwap,
                    the next evolution in DeFi platforms. ShibaSwap gives users
                    the ability to DIG (provide liquidity), BURY (stake), and
                    SWAP tokens to gain WOOF Returns through our sophisticated
                    and innovative passive income reward system. Our platform
                    also allows the ShibArmy to access upcoming NFTs and
                    additional tools, such as portfolio trackers, to make
                    navigating the crypto world simple and intuitive.
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
                      <p className="sec3-1-1">{item.sectionName}</p>
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
                      <p className="sec3-1-1">{item?.sectionName}</p>
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
        )}
      </>
    </>
  );
}
