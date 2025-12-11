import Img8261 from "./edu-assets/8261.jpg";
import LineRevealText from "./text-reveal";

function Hero() {
  return (
    <div className="edu-hero">
      <img
        className="hero-image"
        src={Img8261}
        alt="A city bus at a busy urban bus stop with passengers boarding, cars and cyclists passing on a wet street, low-rise buildings and gray sky in the background."
      />

      <h1 className="animate-lines">
        Understand how transport shapes our environment
      </h1>
      <p className="animate-lines">
        Every journey leaves a mark. Learn what carbon footprints mean and how
        transportation drives emissions across the globe.
      </p>
      <LineRevealText selector=".animate-lines" />
      <p className="pink">Scroll to learn more</p>
    </div>
  );
}

export default Hero;
