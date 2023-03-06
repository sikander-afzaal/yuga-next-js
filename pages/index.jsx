import Head from "next/head";
import gsap, { Sine } from "gsap";
import styles from "../styles/Home.module.css";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export default function Home() {
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
  const cardSection = useRef(null);
  const scrollText = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
          end: "bottom 10%",
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
      //card section -----------------
      const cardTime = gsap.timeline({
        scrollTrigger: {
          trigger: secondSec.current,
          start: "center 25%",
          end: "+=1000",
          scrub: 3,
        },
      });
      if (window.innerWidth > 800) {
        cardTime
          .to(thirdSection.current, { yPercent: -10 })
          .to(
            [
              card1.current,
              card2.current,
              card3.current,
              card4.current,
              card5.current,
              card6.current,
            ],
            {
              y: 0,
              opacity: 1,
              stagger: 0.5,
            },
            "0"
          )
          .to(scrollText.current, { opacity: 1, delay: 0.3 }, "0");
      } else {
        cardTime
          .to(
            [
              card1.current,
              card2.current,
              card3.current,
              card4.current,
              card5.current,
              card6.current,
            ],
            {
              y: 0,
              opacity: 1,
              stagger: 0.5,
            },
            "0"
          )
          .to(scrollText.current, { opacity: 1, delay: 0.3 }, "0");
      }
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
      const windowWidth = window.innerWidth - 35;
      const TEXT_MOVE = scrollText.current.offsetWidth - windowWidth;

      if (TEXT_MOVE > 0) {
        pinned
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
    }, [
      line1.current,
      line2.current,
      line3.current,
      line4.current,
      line5.current,
      mainContainer.current,
      firstSection.current,
      textSec.current,
      secondSec.current,
    ]);

    return () => {
      context.revert();
    };
  }, []);
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
              <div ref={cardSection} className={styles.cardDiv}>
                <div
                  ref={card1}
                  className={`${styles.card} ${styles.card1}`}
                ></div>
                <div
                  ref={card2}
                  className={`${styles.card} ${styles.card2}`}
                ></div>
                <div
                  ref={card3}
                  className={`${styles.card} ${styles.card3}`}
                ></div>
                <div
                  ref={card4}
                  className={`${styles.card} ${styles.card4}`}
                ></div>
                <div
                  ref={card5}
                  className={`${styles.card} ${styles.card5}`}
                ></div>
                <div
                  ref={card6}
                  className={`${styles.card} ${styles.card6}`}
                ></div>
              </div>
              <p ref={scrollText}>
                CREATIVE, INNOVATIVE, IMAGINATIVE, POSITIVE, COLLECTIVE,
                PASSIONATELY SEEKING MORE PASSIVE COMMUNITY INCOME BUILDING
                OPPORTUNITIES for all
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
