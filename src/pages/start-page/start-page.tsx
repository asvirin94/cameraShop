import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import PageContent from '../../components/page-content/page-content';
import 'react-toastify/dist/ReactToastify.css';

export default function StartPage() {
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

