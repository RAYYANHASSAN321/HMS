import React, { useState } from "react";

const Rooms = () => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");

  const rooms = [
    {
      id: 1,
      type: "single",
      name: "Single Room",
      price: 5000,
      img: "image/room1.jpg",
    },
    {
      id: 2,
      type: "double",
      name: "Double Room",
      price: 6500,
      img: "image/room2.jpg",
    },
    {
      id: 3,
      type: "suite",
      name: "Suite Room",
      price: 7500,
      img: "image/room3.jpg",
    },
    {
      id: 4,
      type: "deluxe",
      name: "Deluxe Room",
      price: 8000,
      img: "image/room4.jpg",
    },
  ];

  const filteredRooms = rooms.filter((room) => {
    const matchType = filterType === "all" || room.type === filterType;
    const matchSearch = room.name.toLowerCase().includes(searchText.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div>
      {/*================Breadcrumb Area =================*/}
  <section className="breadcrumb_area">
    <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset={0} data-background />
    <div className="container">
      <div className="page-cover text-center">
        <h2 className="page-cover-tittle">Rooms</h2>
        <ol className="breadcrumb">
          <li><a href="index.html">Home</a></li>
          <li className="active">Rooms</li>
        </ol>
      </div>
    </div>
  </section>
  {/*================Breadcrumb Area =================*/}
      {/* Search & Filter Section */}
      <section className="search-section" style={{ background: "#f8f9fa", padding: "60px 0" }}>
        <div className="container">
          <div
            className="search-filter"
            style={{
              maxWidth: "900px",
              margin: "auto",
              padding: "40px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 6px 25px rgba(0,0,0,0.1)",
            }}
          >
            <div className="row align-items-center">
              <div className="col-md-6 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="🔍 Search Rooms..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-control form-control-lg"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="single">Single Room</option>
                  <option value="double">Double Room</option>
                  <option value="suite">Suite Room</option>
                  <option value="deluxe">Deluxe Room</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="accomodation_area section_gap" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="row" id="roomList">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="col-lg-3 col-sm-6 room-card"
                style={{
                  transition: "all 0.3s ease",
                  marginBottom: "30px",
                }}
              >
                <div
                  className="accomodation_item text-center"
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="hotel_img">
                    <img src={room.img} alt={room.name} style={{ width: "100%" }} />
                    <a href="#" className="btn theme_btn button_hover">
                      Book Now
                    </a>
                  </div>
                  <h4 className="sec_h4" style={{ marginTop: "15px" }}>
                    {room.name}
                  </h4>
                  <h5>
                    Rs. {room.price} <small>/night</small>
                  </h5>
                </div>
              </div>
            ))}

            {filteredRooms.length === 0 && (
              <div className="col-12 text-center">
                <p>No rooms found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
