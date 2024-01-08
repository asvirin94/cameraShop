import { ProductType } from '../../types/types';
import { appSlice, initialState } from './app-process.slice';

describe('testing app process', () => {
  test('should set current page', () => {
    const action = appSlice.actions.setCurrentPage(20);
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      currentPage: 20
    };

    expect(result).toEqual(expectedState);
  });

  test('should set modal is open', () => {
    const action = appSlice.actions.setModalIsOpen(true);
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalOpen: true
    };

    expect(result).toEqual(expectedState);
  });

  test('should set add to basket modal open', () => {
    const action = appSlice.actions.setisModalAddToBusketOpen(true);
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddToBusketOpen: true
    };

    expect(result).toEqual(expectedState);
  });

  test('should set add review modal open', () => {
    const action = appSlice.actions.setIsModalAddReviewOpen(true);
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddReviewOpen: true
    };

    expect(result).toEqual(expectedState);
  });

  test('should set all modals close', () => {
    const action = appSlice.actions.closeAllModal();
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddToBusketOpen: false,
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
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
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
    const result = appSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      productOnPage
    };

    expect(result).toEqual(expectedState);
  });
});
