import React, { useContext, useEffect, useState } from 'react';
import CarouselHome from '../../Carousel/CarouselHome'
import CreateCard from '../CreateCard/CreateCard';
import { getAllProducts } from '../../../Utils/productApi.js';
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../../Contexts/UserContext.jsx';
import ShopNav from '../../Header/ShopNavbar/ShopNav.jsx';

const images = [
  // 'https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg',
  // 'https://img.freepik.com/premium-vector/online-shopping-with-mobile-store-design-discount-promotion-banner_62391-413.jpg',
  // 'https://static.vecteezy.com/system/resources/previews/001/925/528/non_2x/black-friday-sale-banner-or-promotion-on-dark-background-online-shopping-store-with-mobile-credit-cards-and-shop-elements-illustration-vector.jpg',
  // 'https://media.istockphoto.com/id/1198469235/vector/shopping-and-delivery-promotional-sale-banner-with-shopping-cart.jpg?s=612x612&w=0&k=20&c=jLu5g2OTHqyn87zsjwsoS4M1kUc9Woa3DmirqpOdcYQ=',
  // 'https://www.shutterstock.com/image-vector/fashion-sale-banner-woman-outfit-260nw-1240134448.jpg',
  // '',
  'https://i.pinimg.com/originals/f1/87/c5/f187c529afece931da168cc3735e2883.jpg',
  'https://png.pngtree.com/thumb_back/fh260/background/20201010/pngtree-black-friday-sale-background-design-template-banner-discount-vector-poster-business-image_407567.jpg',
  'https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg',
  'https://valsoftech.com/inet/images/slider/sld4.jpg',

  'https://images-eu.ssl-images-amazon.com/images/G/31/prime/Aug24/DEALS-REVEALED_hero_PC_pse_2_2x._CB568322891_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/23/Central/BAU/ledaup/AA/PC_Hero_3000x1200_2x._CB568322637_.jpg',
  'https://m.media-amazon.com/images/I/61qVFfNuZzL._SX3000_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/AugART24/leadup/desktop_unrec_rev_1x_C._CB568294195_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/Aug/WhatsApp_Image_2024-08-01_at_11.39.54_PM_1._CB568206422_.jpg',
];

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();

      if (response && response.products) {
        setProducts(response.products);
      } else {
        console.error('No products found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col mt-16 -z-0">
      <ShopNav />
      {/* Carousel Section */}
      <div className="w-full mt-2"> {/* Full width container for the carousel */}
        <CarouselHome images={images} className="w-full h-[70vh]" />
      </div>
      <div className="container mx-auto py-2 px-4 mt-4">
        <div className="lg:w-4/5 w-full mx-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <Puff />{/* You can add a loading spinner here */}
              <h1>Render is taking time to Load Please Wait ......</h1>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-80"> {/* Set a fixed width for the cards */}
                    <CreateCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

  );
}


export default Home;
