import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./franchisecarousel.css";
import earlyJobs1 from "../../assets/EarlyJobs1.jpg";
import earlyJobs4 from "../../assets/EarlyJobs4.jpg";
import earlyJobs3 from "../../assets/EarlyJobs3.jpg";

export default function HeroCarousel() {
  const images = [earlyJobs1, earlyJobs4, earlyJobs3];

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
    <div className="hero-carousel" style={{ width: "50vw", margin: "0 auto", marginTop: "1.25rem", minHeight: "529px" }}>
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="flex justify-center">
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="h-[529px] w-full rounded-2xl shadow-md object-cover"
              onError={() => console.log(`Failed to load image ${i + 1}`)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}