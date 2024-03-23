import Carousel from "react-bootstrap/Carousel";
import Recommendations from "../../assets/recommendations.png";
import { useRef } from "react";
import sandwitch from "../../assets/sandwitch.png";
import starter from "../../assets/starters.png";

type handle = (index: number) => void;

function CarouselBanner() {
  const bannerOneRef = useRef<HTMLImageElement>(null);
  const bannerTwoRef = useRef<HTMLImageElement>(null);
  const bannerThreeRef = useRef<HTMLImageElement>(null);

  const handleSelect: handle = (index: number) => {
    const myTimeout = setTimeout(() => {
      const activeRefs = [bannerOneRef, bannerTwoRef, bannerThreeRef];
      activeRefs.forEach((ref) =>
        ref.current?.classList.remove("carousel_banner_item_active")
      );
      activeRefs[index].current?.classList.add("carousel_banner_item_active");
    }, 100);
    return () => clearTimeout(myTimeout);
  };
  return (
    <section className="custom_section">
      <div className="custom_section_dummy_div"></div>
      <div className="custom_section_dummy_div">
        <span>Treat time is calling! Answer its delicious request.</span>
      </div>
      <Carousel indicators={false} className="carousel" onSelect={handleSelect}>
        <Carousel.Item>
          <div className="carousel_image_layer">
            <img
              className="carousel_image"
              src="https://png.pngtree.com/back_origin_pic/05/05/68/52e6ab3fde77ad0a01b5d03c03e982f8.jpg"
            />
          </div>

          <Carousel.Caption className="carousel_description_container">
            <img
              ref={bannerOneRef}
              className="carousel_banner_item carousel_banner_item_active"
              src="https://www.pikpng.com/pngl/b/336-3365000_rt-for-chicken-biriyani-like-for-mutton-biriyani.png"
              style={{ width: "25%", height: "25%" }}
            />
            <h1 className="carousel_banner_item_name">Biryani</h1>
            <h4 className="carousel_banner_item_description">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </h4>
          </Carousel.Caption >
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel_image_layer">
            <img
              className="carousel_image"
              src="https://png.pngtree.com/back_origin_pic/05/05/68/52e6ab3fde77ad0a01b5d03c03e982f8.jpg"
            />
          </div>
          <Carousel.Caption className="carousel_description_container">
            <img
              ref={bannerTwoRef}
              className="carousel_banner_item carousel_banner_item_starter"
              src={starter}
              style={{ width: "35%" }}
            />
            <h1 className="carousel_banner_item_name">Starters</h1>
            <h4 className="carousel_banner_item_description">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel_image_layer">
            <img
              className="carousel_image"
              src="https://png.pngtree.com/back_origin_pic/05/05/68/52e6ab3fde77ad0a01b5d03c03e982f8.jpg"
            />
          </div>
          <Carousel.Caption className="carousel_description_container">
            <img
              ref={bannerThreeRef}
              className="carousel_banner_item_sandwitch carousel_banner_item"
              src={sandwitch}
              style={{ width: "35%" }}
            />
            <h1 className="carousel_banner_item_name">Sandwitch</h1>
            <h4 className="carousel_banner_item_description">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="recommendations_container d-flex flex-column align-items-center mt-3">
        <img className="recommendations_image" src={Recommendations} />
      </div>
    </section>
  );
}

export default CarouselBanner;
