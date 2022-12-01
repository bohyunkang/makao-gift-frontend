import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  context('fetchProducts', () => {
    it('상품 목록 조회하기', async () => {
      const productStore = new ProductStore();

      await productStore.fetchProducts();

      expect(productStore.products[0].title).toBe('상품1');
    });
  });
});
