import { FC } from "react";
import styled from "styled-components";
import imageCar from "../../assets/images/image_not_found.png";
import Button from "./Button";

const CardWrapper = styled.div`
  width: 305px;
  min-height: 340px;
  border-radius: 16px;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.11), 0 5px 8px rgba(0, 0, 0, 20%);
  overflow: hidden;
  flex-direction: column;
`;

const CarImage = styled.div<{ src: string }>`
  background: url(${(props) => props.src}), url(${imageCar});
  width: 100%;
  min-height: 185px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;
const CarTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const PriceText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
const AddButton = styled(Button)`
  width: 100%;
  margin-top: 16px !important;
`;

export interface ICarCardProps {
  id: string;
  title: string;
  price: number;
  img: string;
  isAdded: boolean;
  onClick: (
    id: string,
    title: string,
    price: number,
    photo: string
  ) => () => void;
}

const CarCard: FC<ICarCardProps> = ({
  id,
  title,
  price,
  img,
  isAdded,
  onClick,
}) => {
  return (
    <CardWrapper>
      <CarImage src={img} />
      <DetailWrapper>
        <CarTitle>{title}</CarTitle>
        <PriceText>{`${price.toLocaleString()} THB/Day`} </PriceText>
        <AddButton onClick={onClick(id, title, price, img)} disabled={isAdded}>
          {isAdded ? "Added" : "Add to cart"}
        </AddButton>
      </DetailWrapper>
    </CardWrapper>
  );
};
export default CarCard;
