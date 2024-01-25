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
import { useAppDispatch } from '../../hooks';
import { setSortDirection, setSortType } from '../../store/sort-process/sort-process.slice';

export default function StartPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const sortType = searchParams.get('sortType');
  const sortDirection = searchParams.get('sortDirection');

  useEffect(() => {
    if(page) {
      dispatch(setCurrentPage(+page - 1));
    } else {
      dispatch(setCurrentPage(0));
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


