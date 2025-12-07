import React from 'react'

const Gallery = () => {
  return (
    <div>
       <div>
  {/*================Breadcrumb Area =================*/}
  <section className="breadcrumb_area">
    <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset={0} data-background />
    <div className="container">
      <div className="page-cover text-center">
        <h2 className="page-cover-tittle">Gallery</h2>
        <ol className="breadcrumb">
          <li><a href="index.html">Home</a></li>
          <li className="active">Gallery</li>
        </ol>
      </div>
    </div>
  </section>
  {/*================Breadcrumb Area =================*/}
  {/*================Breadcrumb Area =================*/}
  <section className="gallery_area section_gap">
    <div className="container">
      <div className="section_title text-center">
        <h2 className="title_color">Luxury Hotel Gallery</h2>
        <p>Who are in extremely love with Luxury Hotel friendly system.</p>
      </div>
      <div className="row imageGallery1" id="gallery">
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/01.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/01.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/02.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/02.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/03.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/03.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/04.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/04.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/06.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/05.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/05.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/06.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/01-1.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/01-1.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/02-1.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/02-1.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 gallery_item">
          <div className="gallery_img">
            <img src="image/gallery/03-1.jpg" alt />
            <div className="hover">
              <a className="light" href="image/gallery/03-1.jpg"><i className="fa fa-expand" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================Breadcrumb Area =================*/}
</div>

        
    </div>
  )
}

export default Gallery
