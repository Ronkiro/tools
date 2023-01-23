import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./App.css";

// import required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import Footer from "./components/Footer";

function App() {
  const [referral, setReferral] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = () => {
      fetch("/tools/tools.json")
        .then((r) => r.json())
        .then(setProjects)
        .catch(console.error);
    };

    const query = new URLSearchParams(window.location.search);
    const r = query.get("r");
    console.log(r);
    if (r) {
      setReferral(r);
    }

    fetchProjects();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Hello, </h1>
        <p>
          {referral && `It seems you like ${referral}!`} Here are some{" "}
          {referral && "other"} tools i made for utility and fun.
        </p>
      </div>
      <div className="slides">
        <Swiper
          effect={"coverflow"}
          slidesPerView="1"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            slideShadows: true,
          }}
          pagination={true}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
        >
          {projects.length > 0 &&
            projects.map((e) => (
              <SwiperSlide>
                <a href={e.url} target="__blank">
                  <div className="project-info">
                    <h2>{e.name}</h2>
                  </div>
                  <img
                    alt="project information"
                    src={"/tools/img/" + e.img + ".jpg"}
                  />
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <Footer />
    </div>
  );
}

export default App;
