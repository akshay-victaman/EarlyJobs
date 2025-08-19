import Slider from "react-slick";
import "./franchisecarousel.css"
export default function HeroCarousel() {
  const images = [
    "https://picsum.photos/800/500?random=1",
    "https://picsum.photos/800/500?random=2",
    "https://picsum.photos/800/500?random=3",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="hero-carousel w-[50vw] mx-auto mt-5">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="flex justify-center">
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="h-[529px] w-[59%] rounded-2xl shadow-md object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
