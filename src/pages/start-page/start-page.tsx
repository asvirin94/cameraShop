import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import PageContent from '../../components/page-content/page-content';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { useAppDispatch } from '../../hooks';
import { setSortDirection, setSortType } from '../../store/sort-process/sort-process.slice';
import { setCategory, setLevel, setMaxPrice, setMinPrice, setType } from '../../store/filter-process/filter-process.slice';

export default function StartPage() {
  const dispatch = useAppDispatch();
  const [queryParams] = useSearchParams();
  const page = queryParams.get('page');
  const sortType = queryParams.get('sortType');
  const sortDirection = queryParams.get('sortDirection');
  const filterCategory = queryParams.get('filterCategory');
  const filterType = queryParams.get('filterType');
  const filterLevel = queryParams.get('filterLevel');
  const minPrice = queryParams.get('minPrice');
  const maxPrice = queryParams.get('maxPrice');

  const isMounted = useRef(false);

  useEffect(() => {
    if(page) {
      dispatch(setCurrentPage(+page - 1));
    } else {
      dispatch(setCurrentPage(0));
    }
  }, []);

  useEffect(() => {
    if(sortDirection && sortType) {
      dispatch(setSortDirection(sortDirection));
      dispatch(setSortType(sortType));
    }
  }, []);

  useEffect(() => {
    if(isMounted.current) {
      if(filterCategory) {
        dispatch(setCategory(filterCategory));
      }

      if(filterType) {
        const typesArr = filterType.split(',');
        typesArr.forEach((type) => dispatch(setType(type)));
      }

      if(filterLevel) {
        const levelsArr = filterLevel.split(',');
        levelsArr.forEach((level) => dispatch(setLevel(level)));
      }
    } else {
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if(minPrice) {
      dispatch(setMinPrice(minPrice));
    }

    if(maxPrice) {
      dispatch(setMaxPrice(maxPrice));
    }
  }, []);

  return (
    <div className='wrapper'>
      <Helmet><title>Фотошоп</title></Helmet>
      <Header />
      <main>
        <Banner />
        <PageContent />
        <Modal />
      </main>
      <Footer />
    </div>
  );
}

