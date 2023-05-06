import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import style from './Carousel.module.css'
const CarouselCom = () => {

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    };

    return ( 
        <Carousel 
            className={style.carousel}
            activeIndex={index}
            onSelect={handleSelect}
            prevIcon={""}
            nextIcon={""}
            >
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={require("../../../assets/slide-01.jpg")}
          alt="First slide"
        />
        <Carousel.Caption className={style.caption}>
          <h3>Be the <span>queen</span> of fashion</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../../assets/slide-02.jpg")}
          alt="Second slide"
        />

        <Carousel.Caption className={style.caption}>
          <h3>Get All 
            the looks</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <LinkContainer to="/shop">
            <Button className={style.btn}>Shop Now</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../../assets/slide-03.jpg")}
          alt="Third slide"
        />

        <Carousel.Caption className={style.caption}>
          <h3>Buy the new <span>hype</span></h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../../assets/slide-04.jpg")}
          alt="Third slide"
        />

        <Carousel.Caption className={style.caption}>
          <h3>New season & arrivals</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

     );
}
 
export default CarouselCom;