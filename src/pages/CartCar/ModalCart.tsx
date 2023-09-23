import { FC, SetStateAction, Dispatch, ChangeEvent } from "react";
import styled from "styled-components";
import { Input, Modal } from "../../components/ui";
import { ICarItem, ICart } from "../../shared/interface/cart";
import CartCarItem from "./CartCartem";

const CartFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 530px;
  min-height: 600px;
  max-height: 85vh;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  padding: 0 16px 16px 16px;
  margin-bottom: 8px;
  overflow: hidden auto;
`;
const FormTitle = styled.p`
  padding: 16px 16px 0;
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: bold;
  @media only screen and (max-width: 767px) {
    font-size: 24px;
    margin-bottom: 5px;
  }
`;
const DiscountWrapper = styled.div`
  background-color: #d1d5db;
  padding: 16px;
  margin: auto 16px 16px;
  border-radius: 8px;
  @media only screen and (max-width: 767px) {
    border-radius: 0px;
    margin: auto 0 16px;
  }
`;
const TotalWrapper = styled.div`
  padding: 0 16px 16px;
`;
const TotalItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
`;
const TotalTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  @media only screen and (max-width: 767px) {
    font-size: 18px;
  }
`;
const TotalValue = styled.p`
  font-size: 20px;
  @media only screen and (max-width: 767px) {
    font-size: 18px;
  }
`;
const Line = styled.hr`
  border-top: 1px solid #d1d5db;
  margin: 0 16px;
`;

export interface IModalCartProps {
  cartOpen: boolean;
  discountCode: string;
  cart: ICart;
  closeModal: () => void;
  setCart: Dispatch<SetStateAction<ICart>>;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ModalCart: FC<IModalCartProps> = ({
  cart,
  cartOpen,
  discountCode,
  setCart,
  closeModal,
  onInputChange,
}) => {
  const onAdjustItem = (index: number, action: string) => (): void => {
    const cartList = cart;
    if (action === "inc") {
      cartList.car_list[index].carTotal += 1;
      cartList.cart.total += cartList.car_list[index].carPrice;
    } else if (action === "dec") {
      cartList.car_list[index].carTotal -= 1;
      cartList.cart.total -= cartList.car_list[index].carPrice;
    }
    setCart({
      ...cart,
      car_list: cartList.car_list,
    });
  };

  return (
    <Modal visible={cartOpen ? true : false} onClose={closeModal}>
      <CartFormWrapper>
        <FormTitle>{"Cart"}</FormTitle>
        <ItemWrapper>
          {cart.car_list.map((item: ICarItem, index: number) => (
            <CartCarItem
              key={index}
              item={item}
              index={index}
              onAdjustItem={onAdjustItem}
            />
          ))}
        </ItemWrapper>
        <DiscountWrapper>
          <Input
            placeholder={"Discount code"}
            value={discountCode}
            onChange={onInputChange}
          />
        </DiscountWrapper>
        <TotalWrapper>
          <TotalItem>
            <TotalTitle>{"Total"}</TotalTitle>
            <TotalValue>{`${cart.cart.total.toLocaleString()} THB`}</TotalValue>
          </TotalItem>
          <Line />
          <TotalItem>
            <TotalTitle>{"Discount"}</TotalTitle>
            <TotalValue>{`${cart.cart.discount.toLocaleString()} THB`}</TotalValue>
          </TotalItem>
          <Line />
          <TotalItem>
            <TotalTitle>{"Grand Total"}</TotalTitle>
            <TotalValue>{`${(
              cart.cart.total - cart.cart.discount
            ).toLocaleString()} THB`}</TotalValue>
          </TotalItem>
        </TotalWrapper>
      </CartFormWrapper>
    </Modal>
  );
};
export default ModalCart;
