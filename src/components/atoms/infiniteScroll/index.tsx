import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface InfiniteScrollProps {
  next: () => void;
  hasMore: boolean;
  loader: React.ReactNode;
  dataLength: number;
  children: React.ReactNode;
  onRefresh: () => void;
}

const CustomInfiniteScroll: React.FC<InfiniteScrollProps> = ({
  next,
  onRefresh,
  hasMore,
  loader,
  dataLength,
  children,
}) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={loader}
      refreshFunction={onRefresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
      releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}>
      {children}
    </InfiniteScroll>
  );
};

export default CustomInfiniteScroll;
