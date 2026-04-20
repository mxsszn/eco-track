import Img8261 from "./edu-assets/8261.jpg";

function Hero() {
  return (
    <div className="edu-hero">
      <img
        className="hero-image"
        src={Img8261}
        alt="A city bus at a busy urban bus stop with passengers boarding, cars and cyclists passing on a wet street, low-rise buildings and gray sky in the background."
      />
      <h1>Understand how transport shapes our environment</h1>
      <p>
        Every journey leaves a mark. Learn what carbon footprints mean and how
        transportation drives emissions across the globe.
      </p>
      <p className="pink">Scroll to learn more</p>
    </div>
  );
}

export default Hero;
