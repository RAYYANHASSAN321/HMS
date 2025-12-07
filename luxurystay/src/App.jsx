import React from 'react'

const App = () => {
  return (
    <div>
        <div>
          {/*================Banner Area =================*/}
  <section className="banner_area">
    <div className="booking_table d_flex align-items-center">
      <div className="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset={0} data-background />
      <div className="container">
        <div className="banner_content text-center">
          <h6>Away from monotonous life</h6>
          <h2>Luxury Stay Hotel</h2>
          <p>LuxuryStay – Your World of Comfort, Class, and Care.</p>
          <a href="#" className="btn theme_btn button_hover">Get Started</a>
        </div>
      </div>
    </div>
  </section>
  {/*================ Accomodation Area  =================*/}
  <section className="accomodation_area section_gap">
    <div className="container">
      <div className="section_title text-center">
        <h2 className="title_color">Hotel Accomodation</h2>
        <p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, </p>
      </div>
      <div className="row mb_30">
        <div className="col-lg-3 col-sm-6">
          <div className="accomodation_item text-center">
            <div className="hotel_img">
              <img src="image/room1.jpg" alt />
              <a href="#" className="btn theme_btn button_hover">Book Now</a>
            </div>
            <a href="single-roomview.html"><h4 className="sec_h4">Single Room</h4></a>
            <h5>Rs. 5000<small>/night</small></h5>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="accomodation_item text-center">
            <div className="hotel_img">
              <img src="image/room2.jpg" alt />
              <a href="#" className="btn theme_btn button_hover">Book Now</a>
            </div>
            <a href="single-roomview.html"><h4 className="sec_h4">Double Room</h4></a>
            <h5>Rs. 6500<small>/night</small></h5>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="accomodation_item text-center">
            <div className="hotel_img">
              <img src="image/room3.jpg" alt />
              <a href="#" className="btn theme_btn button_hover">Book Now</a>
            </div>
            <a href="single-roomview.html"><h4 className="sec_h4">Suite Room</h4></a>
            <h5>Rs .7500<small>/night</small></h5>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="accomodation_item text-center">
            <div className="hotel_img">
              <img src="image/room4.jpg" alt />
              <a href="#" className="btn theme_btn button_hover">Book Now</a>
            </div>
            <a href="single-roomview.html"><h4 className="sec_h4">Double room</h4></a>
            <h5>Rs. 8000<small>/night</small></h5>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================ Accomodation Area  =================*/}
  {/*================ Facilities Area  =================*/}
  <section className="facilities_area section_gap">
    <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset={0} data-background>  
    </div>
    <div className="container">
      <div className="section_title text-center">
        <h2 className="title_w">Luxury Facilities</h2>
        <p>Who are in extremely love with Luxury friendly system.</p>
      </div>
      <div className="row mb_30">
        <div className="col-lg-4 col-md-6">
          <div className="facilities_item">
            <h4 className="sec_h4"><i className="lnr lnr-dinner" />Restaurant</h4>
            <p>Introduction to Restaurant Facilities
              Dining and Seating Arrangements
              Kitchen and Food Preparation Facilities
              Customer Comfort and Convenience
              Food Service OptionsEntertainment and Special Features</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="facilities_item">
            <h4 className="sec_h4"><i className="lnr lnr-bicycle" />Sports CLub</h4>
            <p>A sports club is a place that provides members and visitors access to sports, fitness, and recreational activities.
              It promotes physical fitness, teamwork, and social interaction. Indoor Games (Table Tennis, Badminton, Squash)</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="facilities_item">
            <h4 className="sec_h4"><i className="lnr lnr-shirt" />Swimming Pool</h4>
            <p>A swimming pool is a recreational and fitness facility designed for swimming, training, and relaxation.
              , and therapy.Indoor Pool – temperature-controlled, usable year-round.
              Outdoor Pool – open-air, </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="facilities_item">
            <h4 className="sec_h4"><i className="lnr lnr-car" />Rent a Car</h4>
            <p>Rent a Car is a service that provides vehicles to customers for temporary use on a daily, weekly, or monthly basis.
              It helps travelers, tourists, and locals with flexible transport solutions.</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="facilities_item">
            <h4 className="sec_h4"><i className="lnr lnr-construction" />Gymnesium</h4>
            <p>A gymnasium is a fitness and training center equipped with machines and spaces designed for physical exercise, strength training, and overall wellness. Fitn.</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="facilities_item">
            <h4 className="sec_h4"><i className="lnr lnr-coffee-cup" />Bar</h4>
            <p>A bar is a social place where alcoholic and non-alcoholic drinks are served.
              It often provides entertainment, food, and a relaxing environment for social gatherings..</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================ Facilities Area  =================*/}
  {/*================ About History Area  =================*/}
  <section className="about_history_area section_gap">
    <div className="container">
      <div className="row">
        <div className="col-md-6 d_flex align-items-center">
          <div className="about_content ">
            <h2 className="title title_color">About Us <br />Our History<br />Luxury &amp; Hotel</h2>
            <p>Founded in 2025, our hotel has a proud legacy of excellence in the hospitality industry. From humble beginnings, we have grown into a prestigious luxury destination recognized for outstanding service, exquisite dining, and world-class facilities. Over the years, we have welcomed international travelers, business leaders, and celebrities—building a reputation as one of the finest hotels in the region. inappropriate behavior is often laughed.</p>
            <a href="#" className="button_hover theme_btn_two">Readmore</a>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src="image/about_bg.jpg" alt="img" />
        </div>
      </div>
    </div>
  </section>
  {/*================ About History Area  =================*/}

  {/*================ Latest Blog Area  =================*/}
  <section className="latest_blog_area section_gap">
    <div className="container">
      <div className="section_title text-center">
        <h2 className="title_color">latest posts from blog</h2>
        <p>The French Revolution constituted for the conscience of the dominant aristocratic class a fall from </p>
      </div>
      <div className="row mb_30">
        <div className="col-lg-4 col-md-6">
          <div className="single-recent-blog-post">
            <div className="thumb">
              <img className="img-fluid" src="image/blog/blog-1.jpg" alt="post" />
            </div>
            <div className="details">
              <div className="tags">
                <a href="#" className="button_hover tag_btn">Travel</a>
                <a href="#" className="button_hover tag_btn">Life Style</a>
              </div>
              <a href="#"><h4 className="sec_h4">Low Cost Advertising</h4></a>
              <p>Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer.</p>
              <h6 className="date title_color">3 January,2025</h6>
            </div>	
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-recent-blog-post">
            <div className="thumb">
              <img className="img-fluid" src="image/blog/blog-2.jpg" alt="post" />
            </div>
            <div className="details">
              <div className="tags">
                <a href="#" className="button_hover tag_btn">Travel</a>
                <a href="#" className="button_hover tag_btn">Life Style</a>
              </div>
              <a href="#"><h4 className="sec_h4">Creative Outdoor Ads</h4></a>
              <p>Self-doubt and fear interfere with our ability to achieve or set goals. Self-doubt and fear are</p>
              <h6 className="date title_color">31st January,2026</h6>
            </div>	
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-recent-blog-post">
            <div className="thumb">
              <img className="img-fluid" src="image/blog/blog-3.jpg" alt="post" />
            </div>
            <div className="details">
              <div className="tags">
                <a href="#" className="button_hover tag_btn">Travel</a>
                <a href="#" className="button_hover tag_btn">Life Style</a>
              </div>
              <a href="#"><h4 className="sec_h4">It S Classified How To Utilize Free</h4></a>
              <p>Why do you want to motivate yourself? Actually, just answering that question fully can </p>
              <h6 className="date title_color">31st May,2019</h6>
            </div>	
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================ Recent Area  =================*/}
</div>

        
    </div>
  )
}

export default App
