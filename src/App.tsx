import { useEffect, useState } from "react";
import logo from "./assets/images/logo.svg";
import "./App.css";
import CardList from "./pages/CarList";
import CartCar from "./pages/CartCar";
import { getWithExpiry, setWithExpiry } from "./shared/utils/local-storage-TTL";
import { ICarItem, ICart, INITIAL_CART } from "./shared/interface/cart";
import axios from "./shared/utils/axios";

const App = () => {
  const [cart, setCart] = useState<ICart>(
    getWithExpiry("cart") !== null ? getWithExpiry("cart") : { ...INITIAL_CART }
  );
  const [carList, setCarList] = useState<any>([]);

  // console.log(cart);
  // console.log(carList);

  useEffect(() => {
    if (getWithExpiry("cart")) {
      setCart(getWithExpiry("cart"));
    }
  }, []);

  useEffect(() => {
    setWithExpiry("cart", cart);
  }, [cart]);

  useEffect(() => {
    axios
      .get("/spaces/vveq832fsd73/entries?content_type=car", {
        headers: {
          Authorization: `Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o`,
        },
      })
      .then((response: any) => setCarList(response.data.items));
  }, []);

  const onAddToCart =
    (id: string, title: string, price: number, photo: string) => (): void => {
      const cartList = cart;
      const duplicate = cartList.car_list.findIndex((s) => s.carId === id);
      console.log(duplicate);
      console.log(title);
      if (duplicate !== -1) {
        cartList.car_list[duplicate].carTotal += 1;
        cartList.cart.total += price;
      } else {
        const newList: ICarItem = {
          carId: id,
          carTitle: title,
          carPrice: price,
          carPhoto: photo,
          carTotal: 1,
        };
        cartList.car_list.push(newList);
        cartList.cart.total += price;
      }

      setCart({
        ...cart,
        car_list: cartList.car_list,
      });
    };

  return (
    <div>
      <div className="app-header-wrapper">
        <div className="app-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img className="app-logo" src={logo} alt="logo" />{" "}
            <span>Drivehub</span>
          </div>
          <CartCar cart={cart} setCart={setCart} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <CardList cart={cart} carList={carList} onAddToCart={onAddToCart} />
      </div>
      <div className="app-footer">
        <div className="app-footer-text-wrapper">
          <p className="app-footer-company-name">Drivehub Co.,Ltd</p>
          <p className="app-footer-company-address">
            193-195 Lake Rajada Office Complex, Ratchadapisek road, Khlong Toei,
            Bangkok
          </p>
        </div>
        <p className="app-footer-text">© Drivehub 2023</p>
      </div>
    </div>
  );
};

export default App;
