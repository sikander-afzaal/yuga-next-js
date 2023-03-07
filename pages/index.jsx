import Head from "next/head";
import gsap, { Sine } from "gsap";
import styles from "../styles/Home.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export default function Home() {
  const [TEXT_MOVE, setTEXT_MOVE] = useState(0);
  const mainContainer = useRef();
  const firstSection = useRef();
  const textSec = useRef();
  const secondSec = useRef();
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const line4 = useRef(null);
  const line5 = useRef(null);
  const secondSecPara = useRef();
  //card section -----------
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const card4 = useRef(null);
  const card5 = useRef(null);
  const card6 = useRef(null);
  const thirdSection = useRef();
  const cardWrapper = useRef(null);
  const cardSectionMobHead = useRef(null);
  const cardSection = useRef(null);
  const scrollText = useRef(null);
  const parallexCont = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      const windowWidth = window.innerWidth - 35;
      setTEXT_MOVE(scrollText.current.offsetWidth - windowWidth);
    }, 300);
    const context = gsap.context(() => {
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });
      if (window.innerWidth <= 800) {
        ScrollTrigger.normalizeScroll(true);
      }
      gsap.to(mainContainer.current, {
        scrollTrigger: {
          trigger: firstSection.current,
          start: "top top",
          end: "bottom bottom",
          // toggleActions: "play reverse play reverse",
        },
        backgroundColor: "black",
        opacity: 1,
      });
      gsap.to(firstSection.current, {
        scrollTrigger: {
          trigger: firstSection.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          // pinReparent: true,
          pinSpacing: false,
          // toggleActions: "play reverse play reverse",
        },
      });
      //second sectuon-----
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: textSec.current,
          start: "top top",
          end: "+=3500",
          scrub: 3,
          pin: textSec.current,
          pinSpacing: true,
          pinReparent: true,
        },
      });
      textTimeline.fromTo(
        [
          line1.current,
          line2.current,
          line3.current,
          line4.current,
          line5.current,
        ],
        {
          y: "100vh",
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          duration: 6,
          stagger: 3,
          ease: Sine.easeOut,
        }
      );

      //third section
      gsap.to(mainContainer.current, {
        scrollTrigger: {
          trigger: secondSec.current,
          start: "top 40%",
          end: "130% top",
          toggleActions: "play reverse play reverse",
        },
        backgroundColor: "white",
      });
      const hiddenWords = Array.from(
        document.querySelectorAll(".second-section p span")
      );
      //shuffling the array so words pop up randomly
      let shuffledWords = hiddenWords
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      gsap.to(shuffledWords, {
        scrollTrigger: {
          trigger: secondSec.current,
          start: "top 50%",
          end: "bottom 70%",
          scrub: 1,
        },
        opacity: 1,
        duration: 0.01,
        stagger: 0.01,
      });
      let desktopAnimations = gsap.matchMedia();
      let mobileAnimations = gsap.matchMedia();

      // add a media query. When it matches, the associated function will run
      desktopAnimations.add("(min-width: 800px)", () => {
        //card section -----------------
        const cardTime = gsap.timeline({
          scrollTrigger: {
            trigger: secondSec.current,
            start: "50% top",
            // markers: true,
            end: "130% top",
            scrub: 2,
          },
        });
        cardTime.to(thirdSection.current, { yPercent: -55 }).to(
          [card1.current, card2.current, card3.current],
          {
            y: 0,
            opacity: 1,
            stagger: 0.5,
          },
          0
        );

        ////////////////////////////////////////////////////////
        const pinned = gsap.timeline({
          scrollTrigger: {
            trigger: thirdSection.current,
            start: "top top",
            end: "+=4500",
            pin: thirdSection.current,
            scrub: 1,
            pinSpacing: true,
          },
        });
        const CARDS_ON_SCREEN =
          window.innerWidth > 800
            ? (window.innerWidth - 70) / 640 // number of cards on the screen desktop
            : (window.innerWidth - 70) / 415; // number of cards on the screen mobile
        const CARD_MOVE =
          window.innerWidth > 800
            ? (6 - CARDS_ON_SCREEN) * 620 // amount to be moved desktop
            : (6 - CARDS_ON_SCREEN) * 400; // amount to be moved mobile

        if (TEXT_MOVE > 0) {
          pinned
            .to(scrollText.current, { opacity: 1, color: "white" })
            .to(
              cardSection.current,
              { x: -CARD_MOVE, duration: 4, delay: 0.1 },
              "0"
            )
            .to(
              scrollText.current,
              { x: -TEXT_MOVE, duration: 3.5, delay: 0.1 },
              "0"
            );
        }
        //parallex section ---------------------------------------------------

        gsap.to(parallexCont.current, {
          scrollTrigger: {
            trigger: parallexCont.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
          },
          marginTop: "-100vh",
        });
      });
      mobileAnimations.add("(max-width: 800px)", () => {
        //card section -----------------
        const cardTime = gsap.timeline({
          scrollTrigger: {
            trigger: thirdSection.current,
            start: "top 100%",
            // markers: true,
            end: "+=200",
            scrub: 1,
          },
        });
        cardTime.fromTo(cardSectionMobHead.current, { y: -20 }, { y: 40 });

        [
          card1.current,
          card2.current,
          card3.current,
          card4.current,
          card5.current,
          card6.current,
        ].forEach((elem) => {
          gsap.to(elem, {
            scrollTrigger: {
              trigger: elem,
              start: "top 100%",
              scrub: 1,
            },
            y: 0,
            opacity: 1,
          });
        });
      });
    }, [mainContainer.current]);

    return () => {
      context.revert();
    };
  }, [TEXT_MOVE]);
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div>
        <div ref={mainContainer} className={styles.main}>
          <div ref={firstSection} className={styles.hero}>
            <h2>Scroll Down</h2>
          </div>
          <div ref={textSec} className={styles.textSec}>
            <h1 ref={line1}>SHAPING WEB3</h1>
            <h1 ref={line2}>THROUGH</h1>
            <h1 ref={line3}>STORYTELLING,</h1>
            <h1 ref={line4}>EXPERIENCES,</h1>
            <h1 ref={line5}>AND COMMUNITY.</h1>
          </div>
          <div ref={secondSec} className={"second-section " + styles.secondSec}>
            <p ref={secondSecPara}>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
              <span>Lorem </span>
            </p>
          </div>
          <div ref={thirdSection} className={styles.thirdWrapper}>
            <div ref={cardWrapper} className={styles.thirdSection}>
              <p ref={cardSectionMobHead} className={styles.mobHead}>
                The Yuga Verse
              </p>
              <div ref={cardSection} className={styles.cardDiv}>
                <div ref={card1} className={`${styles.card} ${styles.card1}`}>
                  <div className={styles.cardInner}></div>
                  <button className={styles.ctaBtn}>Club</button>
                </div>
                <div ref={card2} className={`${styles.card} ${styles.card2}`}>
                  {" "}
                  <div className={styles.cardInner}></div>
                  <button className={styles.ctaBtn}>Club</button>
                </div>
                <div ref={card3} className={`${styles.card} ${styles.card3}`}>
                  {" "}
                  <div className={styles.cardInner}></div>
                  <button className={styles.ctaBtn}>Club</button>
                </div>
                <div ref={card4} className={`${styles.card} ${styles.card4}`}>
                  {" "}
                  <div className={styles.cardInner}></div>
                  <button className={styles.ctaBtn}>Club</button>
                </div>
                <div ref={card5} className={`${styles.card} ${styles.card5}`}>
                  {" "}
                  <div className={styles.cardInner}></div>
                  <button className={styles.ctaBtn}>Club</button>
                </div>
                <div ref={card6} className={`${styles.card} ${styles.card6}`}>
                  {" "}
                  <div className={styles.cardInner}></div>
                  <button className={styles.ctaBtn}>Club</button>
                </div>
              </div>
              <p ref={scrollText}>
                The Yugaverse The Yugaverse The Yugaverse The Yugaverse The
                Yugaverse
              </p>
            </div>
          </div>
          <div ref={parallexCont} className={styles.parallexCont}>
            <div className={styles.fourthSection}>
              <h2>
                THE YUGAVERSE RUNS ON <br />{" "}
                <span style={{ textDecoration: "underline" }}>APECOIN .</span>
              </h2>
              <div className={styles.bottomPart}>
                <p>
                  Owned and operated by the ApeCoin DAO, APE is a token
                  supporting what’s next in web3. Yuga Labs is a contributor to
                  ApeCoin, a community member of the ApeCoin DAO, and will be
                  using ApeCoin as the primary token in Yuga Labs projects.
                </p>
                <button className={styles.ctaBtn}>Learn more</button>
              </div>
            </div>
            <div className={styles.joinUs}>
              <h2>Join Us</h2>
              <div className={styles.btnDiv}>
                <button className={styles.ctaBtn}>Work at Yuga</button>
                <button className={styles.ctaBtn}>Partner with Yuga</button>
              </div>
            </div>
            <footer className={styles.footer}>
              <div className={styles.footRow}>
                <div className={styles.footCol}>
                  <a href="#">Home</a>
                  <a href="#">About</a>
                  <a href="#">Press</a>
                  <a href="#">Careers</a>
                </div>
                <div className={styles.footCol}>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Use</a>
                </div>
              </div>
              <div className={styles.footRow}>
                <div className={styles.footCol}>
                  <a href="#" target={"blanl"}>
                    Twitter
                  </a>
                  <a href="#" target={"blanl"}>
                    Instagram
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
