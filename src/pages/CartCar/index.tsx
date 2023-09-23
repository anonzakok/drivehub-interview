import {
  FC,
  useState,
  useRef,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import axios from "../../shared/utils/axios";
import imageCart from "../../assets/images/Shopping.png";
import ModalCart from "./ModalCart";
import { ICart } from "../../shared/interface/cart";
import { GoDotFill } from "react-icons/go";

const ShoppingBagWrapper = styled.div`
  display: flex;
  cursor: pointer;
  gap: 10px;
  width: max-content;
  position: relative;
`;
const CartIcon = styled.img`
  width: 18px;
`;
const CartButton = styled(IconButton)`
  padding: 0 !important;
  font-size: 14px !important;
  color: black !important;
`;
const IconDot = styled(GoDotFill)`
  position: absolute;
  right: -3px;
  top: -5px;
  font-size: 12px;
  color: red;
`;
const CartText = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

export interface ICartCarProp {
  cart: ICart;
  setCart: Dispatch<SetStateAction<ICart>>;
}

const CartCar: FC<ICartCarProp> = ({ cart, setCart }) => {
  const [discountList, setDiscountList] = useState<any>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const refCart = useRef(null);

  useEffect(() => {
    if (discountList.length) {
      if (
        discountList.findIndex((d: any) => d.fields.code === discountCode) !==
        -1
      ) {
        cart.cart.discount =
          discountList[
            discountList.findIndex((d: any) => d.fields.code === discountCode)
          ].fields.amount;
      } else {
        cart.cart.discount = 0;
      }
    }
    // eslint-disable-next-line
  }, [discountList]);

  useEffect(() => {
    axios
      .get("/spaces/vveq832fsd73/entries?content_type=discount", {
        headers: {
          Authorization: `Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o`,
        },
      })
      .then((response) => setDiscountList(response.data.items));
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscountCode(e.target.value);
    if (discountList.length) {
      if (
        discountList.findIndex((d: any) => d.fields.code === e.target.value) !==
        -1
      ) {
        cart.cart.discount =
          discountList[
            discountList.findIndex((d: any) => d.fields.code === e.target.value)
          ].fields.amount;
      } else {
        cart.cart.discount = 0;
      }
    }
  };

  const showCart = () => {
    setCartOpen(true);
  };

  const closeModal = () => {
    setCartOpen(false);
  };

  return (
    <div>
      <ShoppingBagWrapper ref={refCart} onClick={showCart}>
        <CartButton>
          <CartIcon src={imageCart} />
          {cart.car_list.length > 0 && <IconDot />}
        </CartButton>
        <CartText>{`Cart (${cart.car_list.length})`}</CartText>
      </ShoppingBagWrapper>
      <ModalCart
        cart={cart}
        setCart={setCart}
        discountCode={discountCode}
        onInputChange={onInputChange}
        cartOpen={cartOpen}
        closeModal={closeModal}
      />
    </div>
  );
};
export default CartCar;
