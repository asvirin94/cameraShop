import Banner from '../../components/banner/banner';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PageContent from '../../components/page-content/page-content';
import 'react-toastify/dist/ReactToastify.css';

export default function StartPage() {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <Banner />
        <PageContent />
      </main>
      <Footer />
    </div>
  );
}


