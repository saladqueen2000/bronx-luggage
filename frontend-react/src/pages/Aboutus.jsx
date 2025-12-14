import React from 'react';
import '../assets/style/AboutUs.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../assets/images/logo_images.jpg';


const AboutUs = () => {
  return (
    <div className="about-page">
        <Header/>
      {/* Header cho trang About Us */}
      <header className="about-header">
        <div className='Logo-img'>
            <div className='aboutLogo-img'>
            <img src={Logo} alt="Logo"/>
            </div>
            <div className="slogan-about">Be with you everywhere</div> 
        </div>
      </header>
      
     
      <section className="about-content-section">
        <div className="content-left">
          <img 
            src="https://scontent.fhph1-2.fna.fbcdn.net/v/t39.30808-6/515310884_1267200052082303_1119338314304141939_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHiBeCnD3FR2WLH4yDlC58crfqaHh2IfLSt-poeHYh8tOvYtzcTCzvUAPXWGpI8KYvOSFTYcrQm4DZdSrNr2prB&_nc_ohc=-OrvRZhAFh4Q7kNvwF9Lydo&_nc_oc=AdnZHoUVFOB001SNcSvhxrdEXerUwcW1Red2To-yEKIFimk55dg_rKTQ-PHiZoyTEY04eGOADUKcubYd8QBpN5eB&_nc_zt=23&_nc_ht=scontent.fhph1-2.fna&_nc_gid=q_81wkgkgVf42kuF3ePxqg&oh=00_AflTdNJdVoBxQo44mAYnab_lOamQh-p-ubY0mR9RxwAw7w&oe=69448D1C" 
            alt="store-image" 
            className="about-image" 
          />
        </div>
        
        <div className="content-right">
          <h2>Company History and Experience</h2>
          <p>
            Bronx Luggage launched in Pompano Beach in 1996 and proudly relocated to The Promenade Shops at Coconut Creek in 2025, steps from The Cheesecake Factory. We’re excited to continue serving Broward and Palm Beach Counties with quality luggage, personalized service, and the guaranteed best pricing in the country.
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
      
     <section className="about-content-section">
                
        <div className="content-right">
          <h2>Mission and Business Philosophy</h2>
          <p>
            Bronx Luggage has experts with extensive experience with action care, specializing in repairing zippers, wheels and handles. With a practical approach and attention to detail, we ensure your action is durable, convenient and ready for your next storage trip.
          </p>
        
          
        </div>

        <div className="content-left">
            <img 
            src="https://cdn-ildojdg.nitrocdn.com/ezwpfHTKHWJsbjdfVxgscYUFuXgCtWBD/assets/images/optimized/rev-76009d0/bronxluggage.com/wp-content/uploads/2025/06/bronx-luggage3.jpg" 
            alt="expert and product" 
            className="about-image" 
          />
        </div>
      </section>

     <section className="about-content-section">
        <div className="content-left">
            <img 
            src="https://scontent.fhph1-3.fna.fbcdn.net/v/t39.30808-6/514483636_1267200078748967_2383330853763402754_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE5Aaw1R7z88LDZcADcxXbbwdwwzNJFgzbB3DDM0kWDNlhKVGWnRFo5Xizhprvc61W9EWYyh8bZSLEMvUqNeKLj&_nc_ohc=1_YQygYE7TkQ7kNvwHC51cH&_nc_oc=AdkcO9H_miSMQYQlfL8szUUyldX57h-A2r9FhlnS9c48MPZj00nFVepXNRQ3zYLn1nxHUnV4_uDDz-IzM04rO300&_nc_zt=23&_nc_ht=scontent.fhph1-3.fna&_nc_gid=rzQsU0Iuw61xtJw_0wnfMQ&oh=00_Afn7uAtJ9_BH8dd4_ffV9TVQbp-s57Q4XKx-8INJgz664w&oe=69446EC9"
            alt="" 
            className="about-image" 
          />
        </div>
        
        <div className="content-right">
          <h2>Versatile and suitable products</h2>
          <p>
            Bronx Luggage also offers a wide range of accompanying products such as backpacks, bags and other necessary equipment to keep your trip safe and comfortable.
          </p>
            
        </div>
      </section>
    <div className='final-wishes'>
      <h2>Enjoy the journey</h2>
      <h2>Bronx Luggage be with you everywhere</h2>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;