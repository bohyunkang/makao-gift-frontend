import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';
import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/numberFormat';

import Button from './common/Button';

export default function Order() {
  const userStore = useUserStore();
  const productStore = useProductStore();
  const orderStore = useOrderStore();

  const { product } = productStore;
  const {
    id, title, maker, imageUrl,
  } = product;

  const { quantity, totalPrice } = orderStore;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { receiver, address, message } = data;

    await orderStore.processOrder({
      productId: id,
      quantity,
      receiver,
      address,
      message,
    });

    if (orderStore.isOrderSuccess) {
      userStore.payAmount(orderStore.totalPrice);
      navigate('/orders');
    }
  };

  return (
    <Container>
      <Product>
        <ImageWrapper>
          <img src={imageUrl} alt={title} />
        </ImageWrapper>
        <DescWrapper>
          <em>{maker}</em>
          <strong>{title}</strong>
          <p>
            구매수량:
            {' '}
            {quantity}
          </p>
          <p>
            총 상품금액:
            {' '}
            {numberFormat(totalPrice)}
            원
          </p>
        </DescWrapper>
      </Product>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-receiver">받는 분 성함</label>
          <span>*</span>
          <input
            type="text"
            id="input-receiver"
            name="receiver"
            {...register('receiver')}
          />
          <p>3~7자까지 한글만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-address">받는 분 주소</label>
          <span>*</span>
          <input
            type="text"
            id="input-address"
            name="address"
            {...register('address')}
          />
          <p>주소지를 입력해주세요</p>
        </div>
        <div>
          <label htmlFor="input-message">받는 분께 보내는 메시지</label>
          <textarea
            type="text"
            id="input-message"
            name="message"
            {...register('message')}
          />
          <p>100글자 이내로 입력해주세요</p>
        </div>
        <Button type="submit">선물하기</Button>
      </Form>
    </Container>
  );
}

const Container = styled.article`

`;

const Product = styled.div`
  
`;

const ImageWrapper = styled.div`
  
`;

const DescWrapper = styled.div`

`;

const Form = styled.form`

`;
