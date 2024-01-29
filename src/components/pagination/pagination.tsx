import { Link } from 'react-router-dom';
import { PAGES_COUNT_IN_PAGGINATION_SECTOR, PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getFilteredAndSortedProducts } from '../../store/app-process/app-process.selectors';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { getProducts } from '../../store/data-process/data-process.selectors';
import { getSortDirection, getSortType } from '../../store/sort-process/sort-process.selectors';
import { getFilterCategory, getFilterType, getFilterLevel } from '../../store/filter-process/filter-process.selectors';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);
  const filteredProducts = useAppSelector(getFilteredAndSortedProducts);
  const currentPage = useAppSelector(getCurrentPage);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const filterCategory = useAppSelector(getFilterCategory);
  const filterType = useAppSelector(getFilterType);
  const filterlevel = useAppSelector(getFilterLevel);
  const products = filterCategory || filterType.length > 0 || filterlevel.length > 0 ? filteredProducts : allProducts;
  const currentSector = Math.floor(currentPage / PAGES_COUNT_IN_PAGGINATION_SECTOR);

  const sortTypeUrl = sortType ? `&sortType=${sortType}` : '';
  const sortDirectionUrl = sortDirection ? `&sortDirection=${sortDirection}` : '';
  const pagesCount = Math.ceil(products.length / PRODUCTS_ON_PAGE_COUNT);
  const sectorsCount = Math.ceil(pagesCount / PAGES_COUNT_IN_PAGGINATION_SECTOR);
  const pagginationLength = Math.min(PAGES_COUNT_IN_PAGGINATION_SECTOR, pagesCount - currentSector * PAGES_COUNT_IN_PAGGINATION_SECTOR);
  const pagginationArray = Array.from({length: pagginationLength});
  const nextButtonElement = currentSector === sectorsCount - 1
    ? null
    : (
      <li className="pagination__item" onClick={() => {
        dispatch(setCurrentPage((currentSector + 1) * PAGES_COUNT_IN_PAGGINATION_SECTOR));
        window.scrollTo({
          top: 360,
          behavior: 'smooth'
        });
      }} style={{cursor: 'pointer'}}
      >
        <Link to={`/?page=${(currentSector + 1) * PAGES_COUNT_IN_PAGGINATION_SECTOR + 1}${sortTypeUrl}${sortDirectionUrl}`} className='pagination__link pagination__link--text'>
        Далее
        </Link>
      </li>
    );

  const prevButtonElement = currentSector === 0
    ? null
    : (
      <li className="pagination__item" onClick={() => {
        dispatch(setCurrentPage((currentSector - 1) * PAGES_COUNT_IN_PAGGINATION_SECTOR + 2));
        window.scrollTo({
          top: 360,
          behavior: 'smooth'
        });
      }} style={{cursor: 'pointer'}}
      >
        <Link to={`/?page=${(currentSector - 1) * PAGES_COUNT_IN_PAGGINATION_SECTOR + 3}${sortTypeUrl}${sortDirectionUrl}`} className='pagination__link pagination__link--text'>
          Назад
        </Link>
      </li>
    );

  return products.length < 10
    ? null
    : (
      <div className="pagination">
        <ul className="pagination__list">
          {prevButtonElement}
          {pagginationArray.map((_, index) => (
            <li className="pagination__item" key={`key-${index + 1}`} onClick={() => {
              dispatch(setCurrentPage(currentSector * PAGES_COUNT_IN_PAGGINATION_SECTOR + index));
              window.scrollTo({
                top: 360,
                behavior: 'smooth'
              });
            }}
            >
              <Link to={`/?page=${currentSector * PAGES_COUNT_IN_PAGGINATION_SECTOR + index + 1}${sortTypeUrl}${sortDirectionUrl}`}
                className={`pagination__link ${currentSector * PAGES_COUNT_IN_PAGGINATION_SECTOR + index === currentPage ? 'pagination__link--active' : ''}`}
                style={{cursor: 'pointer'}}
              >{currentSector * PAGES_COUNT_IN_PAGGINATION_SECTOR + index + 1}
              </Link>
            </li>
          ))}
          {nextButtonElement}
        </ul>
      </div>
    );
}
