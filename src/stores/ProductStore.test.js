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

  context('fetchProduct', () => {
    it('상품 상세 조회하기', async () => {
      const productStore = new ProductStore();

      await productStore.fetchProduct({ id: 1 });

      expect(productStore.product.title).toBe('상품1');
      expect(productStore.product.description).toBe('이 상품1은 이러이러합니다');
    });
  });
});
