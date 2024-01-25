import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import PageContent from '../../components/page-content/page-content';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import { setSortDirection, setSortType } from '../../store/sort-process/sort-process.slice';

export default function StartPage() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const sortType = searchParams.get('type');
  const sortDirection = searchParams.get('direction');

  useEffect(() => {
    if(page && +page !== currentPage) {
      dispatch(setCurrentPage(+page - 1));
    }
  }, [page]);

  useEffect(() => {
    if(sortDirection && sortType) {
      dispatch(setSortDirection(sortDirection));
      dispatch(setSortType(sortType));
    }
  }, [sortDirection, sortType]);

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


