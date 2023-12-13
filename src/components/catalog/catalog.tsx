import CardsList from '../cards-list/cards-list';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Sorts from '../sorts/sorts';

export default function Catalog() {
  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <Filter />
          <div className="catalog__content">
            <Sorts />
            <CardsList />
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}
