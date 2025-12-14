import React from "react";
import "../assets/style/AboutUs.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../assets/images/logo_images.jpg";

const AboutUs = () => {
  return (
    <div className="about-page">
      <Header />

      {/* Hero Header */}
      <header className="about-header">
        <div className="about-header-content">
          <div className="aboutLogo-img">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="slogan-about">Be with you everywhere</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="about-container">
        {/* Section 1 */}
        <section className="about-content-section">
          <div className="content-left">
            <img
              src="https://scontent.fhph1-2.fna.fbcdn.net/v/t39.30808-6/515310884_1267200052082303_1119338314304141939_n.jpg"
              alt="store"
              className="about-image"
            />
          </div>

          <div className="content-right">
            <h2>Company History and Experience</h2>
            <p>
              Bronx Luggage launched in Pompano Beach in 1996 and proudly
              relocated to The Promenade Shops at Coconut Creek in 2025. We
              continue serving Broward and Palm Beach Counties with quality
              luggage, personalized service, and guaranteed best pricing.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span>20+</span>
                <p>Years of Experience</p>
              </div>
              <div className="stat-item">
                <span>100+</span>
                <p>Quality Products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="about-content-section reverse">
          <div className="content-right">
            <h2>Mission and Business Philosophy</h2>
            <p>
              Our experts specialize in repairing zippers, wheels, and handles.
              With attention to detail and practical solutions, we ensure your
              luggage is durable and ready for every journey.
            </p>
          </div>

          <div className="content-left">
            <img
              src="https://cdn-ildojdg.nitrocdn.com/ezwpfHTKHWJsbjdfVxgscYUFuXgCtWBD/assets/images/optimized/rev-76009d0/bronxluggage.com/wp-content/uploads/2025/06/bronx-luggage3.jpg"
              alt="expert"
              className="about-image"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="about-content-section">
          <div className="content-left">
            <img
              src="https://scontent.fhph1-3.fna.fbcdn.net/v/t39.30808-6/514483636_1267200078748967_2383330853763402754_n.jpg"
              alt="products"
              className="about-image"
            />
          </div>

          <div className="content-right">
            <h2>Versatile and Suitable Products</h2>
            <p>
              We offer backpacks, travel bags, and essential accessories to
              ensure your trip is safe, comfortable, and convenient.
            </p>
          </div>
        </section>

        {/* Final */}
        <div className="final-wishes">
          <h2>Enjoy the journey</h2>
          <h2>Bronx Luggage be with you everywhere</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
