import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import PageContent from '../../components/page-content/page-content';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { useAppDispatch } from '../../hooks';
import { setSortDirection, setSortType } from '../../store/sort-process/sort-process.slice';
import { setCategory, setLevel, setMaxPrice, setMinPrice, setType } from '../../store/filter-process/filter-process.slice';
import queryString from 'query-string';

export default function StartPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = queryString.parse(location.search);
  const page = searchParams.page;
  const sortType = searchParams.sortType;
  const sortDirection = searchParams.sortDirection;
  const filterCategory = searchParams.filterCategory;
  const filterType = searchParams.filterType;
  const filterLevel = searchParams.filterLevel;
  const minPrice = searchParams.minPrice;
  const maxPrice = searchParams.maxPrice;

  const isMounted = useRef(false);

  useEffect(() => {
    if(page) {
      dispatch(setCurrentPage(+page - 1));
    } else {
      dispatch(setCurrentPage(0));
    }
  }, [page]);

  useEffect(() => {
    if(typeof sortDirection === 'string' && typeof sortType === 'string') {
      dispatch(setSortDirection(sortDirection));
      dispatch(setSortType(sortType));
    }
  }, []);

  useEffect(() => {
    if(isMounted.current) {
      if(typeof filterCategory === 'string') {
        dispatch(setCategory(filterCategory));
      }

      if(typeof filterType === 'string') {
        const typesArr = filterType.split(',');
        typesArr.forEach((type) => dispatch(setType(type)));
      }

      if(typeof filterLevel === 'string') {
        const levelsArr = filterLevel.split(',');
        levelsArr.forEach((level) => dispatch(setLevel(level)));
      }
    } else {
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if(typeof minPrice === 'number') {
      dispatch(setMinPrice(minPrice));
    }

    if(typeof maxPrice === 'number') {
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

