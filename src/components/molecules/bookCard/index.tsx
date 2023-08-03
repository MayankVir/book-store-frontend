import React from 'react';
import Card from '../../atoms/card';

interface BookCardProps {
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ title, discountRate, coverImage, price }) => {
  return (
    <Card>
      <img src={coverImage} alt={title} className="object-cover w-[175px] h-[175px] aspect-square " />
      <div className="relative h-[70px] w-[175px] overflow-hidden ">
        <h3 className="text-sm m-2  overflow-hidden truncate w-36">{title}</h3>
        <div className=" flex mx-2 items-center justify-between">
          <p className="text-sm">{discountRate}%</p>
          <p className="text-md font-bold">${price}</p>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
