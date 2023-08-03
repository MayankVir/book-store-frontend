import { atom } from 'recoil';
import { Book } from '../components/organisms/bookList/types';

export const bookListState = atom<Book[]>({
  key: 'bookListState',
  default: [],
});
