import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner" id='carousel'>
            <div class=" carousel-caption" style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center search-baar">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control w-75 bg-white text-dark" type="search" placeholder="Search here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button> */}
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://www.burger21.com/wp-content/uploads/2023/06/Bacon-Cheesy-3-scaled.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg/1200px-Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.eatingwell.com/thmb/smK-lWRMbQpo3UpIDzBoQDpT__Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ew-flat-belly-mp-sweet-potato-kale-recipe-960-ded849bdde8b4f798c01b37899cc69ea.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCat !== []
          ? foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItem !== []
                ? foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
                : <div>No data found</div>}
            </div>
          ))
          : <div></div>}

      </div>
      <Footer />
    </div>
  );
}
