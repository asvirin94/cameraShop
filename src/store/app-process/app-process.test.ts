import { ProductType } from '../../types/types';
import { appSlice, appInitialState } from './app-process.slice';

describe('testing app process', () => {
  test('should set current page', () => {
    const action = appSlice.actions.setCurrentPage(20);
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      currentPage: 20
    };

    expect(result).toEqual(expectedState);
  });

  test('should set modal is open', () => {
    const action = appSlice.actions.setModalIsOpen(true);
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      isModalOpen: true
    };

    expect(result).toEqual(expectedState);
  });

  test('should set add to basket modal open', () => {
    const action = appSlice.actions.setisModalAddToBasketOpen(true);
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      isModalAddToBasketOpen: true
    };

    expect(result).toEqual(expectedState);
  });

  test('should set add review modal open', () => {
    const action = appSlice.actions.setIsModalAddReviewOpen(true);
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      isModalAddReviewOpen: true
    };

    expect(result).toEqual(expectedState);
  });

  test('should set all modals close', () => {
    const action = appSlice.actions.closeAllModal();
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      isModalAddToBasketOpen: false,
      isModalOpen: false,
      isModalAddReviewOpen: false
    };

    expect(result).toEqual(expectedState);
  });

  test('should set current product to add', () => {
    const productToAdd: ProductType = {
      id: 1,
      name: 'Example Product',
      vendorCode: 'ABC123',
      type: 'Моментальная',
      category: 'Фотоаппарат',
      description: 'Description of the product',
      level: 'Любительский',
      price: 999,
      rating: 4.5,
      reviewCount: 20,
      previewImg: 'example.jpg',
      previewImg2x: 'example@2x.jpg',
      previewImgWebp: 'example.webp',
      previewImgWebp2x: 'example@2x.webp',
    };

    const action = appSlice.actions.setproductToAdd(productToAdd);
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      productToAdd
    };

    expect(result).toEqual(expectedState);
  });

  test('should set current product on page', () => {
    const productOnPage: ProductType = {
      id: 1,
      name: 'Example Product',
      vendorCode: 'ABC123',
      type: 'Моментальная',
      category: 'Фотоаппарат',
      description: 'Description of the product',
      level: 'Любительский',
      price: 999,
      rating: 4.5,
      reviewCount: 20,
      previewImg: 'example.jpg',
      previewImg2x: 'example@2x.jpg',
      previewImgWebp: 'example.webp',
      previewImgWebp2x: 'example@2x.webp',
    };

    const action = appSlice.actions.setProductOnPage(productOnPage);
    const result = appSlice.reducer(appInitialState, action);

    const expectedState = {
      ...appInitialState,
      productOnPage
    };

    expect(result).toEqual(expectedState);
  });
});
