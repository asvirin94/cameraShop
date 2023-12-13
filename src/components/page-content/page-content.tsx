import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Catalog from '../catalog/catalog';

export default function PageContent() {
  return (
    <div className='page-content'>
      <Breadcrumbs />
      <Catalog />
    </div>
  );
}
