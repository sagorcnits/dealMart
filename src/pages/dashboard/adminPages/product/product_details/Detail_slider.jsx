import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Detail_slider = ({ productImage }) => {
    return (
        <div>
      <Carousel showStatus={false} autoPlay={true} infiniteLoop={true}>
        {/* <div>
          <img src={detailsImg.src} alt="details_img" />
        </div>
        <div>
          <img src={detailsImg.src} alt="details_img" />
        </div> */}

        {productImage?.map((image, id) => {
          return (
            <div key={id} className="h-auto max-h-[600px] overflow-hidden">
              <img
                className="h-full object-cover"
                src={image}
                alt="details_img"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
    );
};

export default Detail_slider;



// requires a loader
