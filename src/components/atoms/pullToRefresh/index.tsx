import React from 'react';
import { useSetRecoilState } from 'recoil';
import { bookListState } from '../../../recoil/atom';
import { PullToRefreshProps } from './types';

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh }) => {
  const setBooks = useSetRecoilState(bookListState);

  const handleRefresh = () => {
    setBooks([]);
    onRefresh();
  };

  return (
    <div
      onTouchStart={handleRefresh}
      className="absolute top-0 left-0 right-0 h-8 bg-blue-500 text-white flex justify-center items-center">
      Pull to Refresh
    </div>
  );
};

export default PullToRefresh;
