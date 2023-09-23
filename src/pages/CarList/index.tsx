import React, { FC, useState, ChangeEvent } from "react";
import { TbArrowsSort } from "react-icons/tb";
import styled from "styled-components";
import { CarCard, Input, Select } from "../../components/ui";
import { SelectOption } from "../../components/ui/Select";
import { ICart } from "../../shared/interface/cart";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffff;
  height: auto;
  width: 100%;
  min-height: 80vh;
  margin-top: 80px;
  @media only screen and (max-width: 767px) {
    margin-top: 60px;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 113px;
  gap: 8px;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    padding: 24px 16px;
  }
`;
const HeaderText = styled.h1`
  font-size: 30px;
  @media only screen and (max-width: 767px) {
    font-size: 24px;
    width: 100%;
  }
`;
const CarListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 33px;
  background-color: #f3f4f6;
  padding: 32px 111px 35px;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 16px;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  gap: 20px;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }
`;
const SearchInput = styled(Input)`
  width: 300px;
`;

export interface ICartCarProp {
  carList: any;
  cart: ICart;
  onAddToCart: (
    id: string,
    title: string,
    price: number,
    photo: string
  ) => () => void;
}

const CardList: FC<ICartCarProp> = ({ cart, carList, onAddToCart }) => {
  const [searchCar, setSearchCar] = useState<string>("");
  const [sort, setSort] = useState<string>("title_desc");

  const orderSort: SelectOption[] = [
    {
      text: "Price: Low - High",
      value: "price_asc",
    },
    {
      text: "Price: High - Low",
      value: "price_desc",
    },
    {
      text: "Title: Z - A",
      value: "title_asc",
    },
    {
      text: "Title: A - Z",
      value: "title_desc",
    },
  ];

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchCar(e.target.value);
  };

  const onSelectChange = (value: string): void => {
    setSort(value);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <HeaderText>{"Car Available"}</HeaderText>
        <FilterWrapper>
          <SearchInput
            placeholder={"Search Car"}
            value={searchCar}
            onChange={onInputChange}
          />
          <Select
            options={orderSort}
            isLoading={false}
            value={sort}
            onChange={onSelectChange}
            startAdornment={<TbArrowsSort />}
          />
        </FilterWrapper>
      </HeaderWrapper>
      <CarListWrapper>
        {carList
          ?.filter((c: any) =>
            c.fields.title.toLowerCase().includes(searchCar.toLowerCase())
          )
          .sort(function (a: any, b: any) {
            if (sort === "price_desc") {
              return b.fields.price - a.fields.price;
            } else if (sort === "price_asc") {
              return a.fields.price - b.fields.price;
            } else if (sort === "title_desc") {
              if (a.fields.title < b.fields.title) return -1;
              if (a.fields.title > b.fields.title) return 1;
              return 0;
            } else if (sort === "title_asc") {
              if (b.fields.title < a.fields.title) return -1;
              if (b.fields.title > a.fields.title) return 1;
              return 0;
            } else {
              if (a.fields.title < b.fields.title) return -1;
              if (a.fields.title > b.fields.title) return 1;
              return 0;
            }
          })
          .map((car: any, index: number) => (
            <CarCard
              key={index}
              id={car.sys.id}
              title={car.fields.title}
              price={car.fields.price}
              img={car.fields.photo}
              isAdded={
                cart.car_list.find((c) => c.carId === car.sys.id) ? true : false
              }
              onClick={onAddToCart}
            />
          ))}
      </CarListWrapper>
    </Wrapper>
  );
};
export default CardList;
