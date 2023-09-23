import React, { FC } from "react";
import styled from "styled-components";
import { AiOutlineMinus as Minus, AiOutlinePlus as Plus } from "react-icons/ai";
import { ICarItem } from "../../shared/interface/cart";
import imageCar from "../../assets/images/image_not_found.png";

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 8px 0;
`;
const Item = styled.div`
  display: flex;
  width: 100%;
`;
const DescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CarImage = styled.div<{ src: string }>`
  background: url(${(props) => props.src}), url(${imageCar});
  width: 87px;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;
const PriceText = styled.p`
  font-size: 14px;
`;
const ButtononAdjust = styled.button`
  background: #3b82f6;
  color: white;
  height: fit-content;
  border: none;
  border-radius: 8px;
  padding-top: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const InputCount = styled.input`
  font-weight: bold;
  height: 31px;
  text-align: center;
  background-color: #ffff;
  border: none;
  width: 30px;
  margin: 0 16px;
  @media only screen and (max-width: 767px) {
    margin: 0 8px;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;
const CarTitleText = styled.p`
  font-size: 20px;
  font-weight: bold;
  @media only screen and (max-width: 767px) {
    font-size: 18px;
  }
`;

interface IItemCartProps {
  item: ICarItem;
  index: number;
  onAdjustItem: any;
}

const CartCarItem: FC<IItemCartProps> = ({ item, index, onAdjustItem }) => {
  return (
    <>
      <ItemWrapper>
        <Item>
          <CarImage src={item.carPhoto} />
          <DescriptionStyled>
            <CarTitleText>{item.carTitle}</CarTitleText>
            <PriceText>
              {`${Number(item.carPrice)?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })} THB/Day`}
            </PriceText>
          </DescriptionStyled>
          <ButtonRow>
            <ButtononAdjust onClick={onAdjustItem(index, "inc")}>
              <Plus />
            </ButtononAdjust>
            <InputCount
              disabled={true}
              value={item.carTotal.toString()}
              placeholder={"0"}
            />
            <ButtononAdjust
              onClick={onAdjustItem(index, "dec")}
              disabled={item.carTotal === 1}
            >
              <Minus />
            </ButtononAdjust>
          </ButtonRow>
        </Item>
      </ItemWrapper>
    </>
  );
};

export default CartCarItem;
