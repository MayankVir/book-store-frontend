import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from '../../atoms/infiniteScroll';
import BookCard from '../../molecules/bookCard';
import PullToRefresh from '../../atoms/pullToRefresh';

import { useRecoilState } from 'recoil';
import { bookListState } from '../../../recoil/atom';
import { Book } from './types';
import { dummyBooks } from '../../../data';

const BOOKS_PER_CALL = 8;

const BookList: React.FC = () => {
  const [books, setBooks] = useRecoilState<Book[]>(bookListState);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchBooks();
    isMounted.current = true;
  }, []);

  const getBooks = (offset: number = 1) =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(dummyBooks.slice((offset - 1) * BOOKS_PER_CALL, offset * BOOKS_PER_CALL) as Book[]),
        2000,
      );
    });

  const fetchBooks = (isRefreshed: boolean = false) => {
    // axios.get('/api/books').then((response) => {
    //   const newBooks = response.data;
    //   setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    //   setHasMore(newBooks.length > 0);
    // });

    const offset = isRefreshed ? 1 : Math.floor(books.length / BOOKS_PER_CALL) + 1;
    if (isRefreshed) setRefreshing(true);

    getBooks(offset)
      .then((response) => {
        setBooks((prev) => (isRefreshed ? (response as Book[]) : [...prev, ...(response as Book[])]));
        setHasMore((response as Book[]).length < dummyBooks.length);
      })
      .finally(() => setRefreshing(false));
  };

  const handleRefresh = () => {
    fetchBooks(true);
  };

  return (
    <div className="container mx-auto mt-16">
      <PullToRefresh onRefresh={handleRefresh} />
      <h4 className="text-center my-2 font-bold">Books</h4>
      {refreshing ? (
        <h4 className="text-center my-10">Loading...</h4>
      ) : (
        <InfiniteScroll
          next={fetchBooks}
          onRefresh={handleRefresh}
          hasMore={hasMore}
          loader={<h4 className="text-center my-10">Loading...</h4>}
          dataLength={books.length}>
          <div className="flex  w-[100%] justify-center">
            <div className=" flex w-[400px] justify-center flex-wrap	 gap-0  sm:gap-0 md:gap-2   lg:gap-4">
              {books.map((book) => (
                <BookCard
                  key={book.title}
                  title={book.title}
                  discountRate={book.discountRate}
                  coverImage={book.coverImage}
                  price={book.price}
                />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default BookList;
