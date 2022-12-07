import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';
import useOrderStore from '../hooks/useOrderStore';

import { numberFormat } from '../utils/format';

import Input from './common/Input';
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
      <Wrapper>
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
          <Inputs>
            <label htmlFor="input-receiver">받는 분 성함</label>
            <span>*</span>
            <Input
              type="text"
              id="input-receiver"
              name="receiver"
              placeholder="홍길동"
              {...register('receiver')}
            />
            <Message>3~7자까지 한글만 사용 가능</Message>
          </Inputs>
          <Inputs>
            <label htmlFor="input-address">받는 분 주소</label>
            <span>*</span>
            <Input
              type="text"
              id="input-address"
              name="address"
              {...register('address')}
            />
            <Message>주소지를 입력해주세요</Message>
          </Inputs>
          <Inputs>
            <label htmlFor="input-message">받는 분께 보내는 메시지</label>
            <Input
              type="text"
              id="input-message"
              name="message"
              {...register('message')}
            />
            <Message>100글자 이내로 입력해주세요</Message>
          </Inputs>
          <ButtonWrapper>
            <Button type="submit">선물하기</Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
}

const Container = styled.article`  
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const Wrapper = styled.div`
  width: 1180px;

  padding: 80px 140px 40px;

  border: 1px solid ${((props) => props.theme.colors.border)};
`;

const Product = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 40px;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;

  margin-right: 26px;

  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const DescWrapper = styled.div`
  color: ${((props) => props.theme.text.secondary)};
  font-size: ${((props) => props.theme.size.h6)};

  em {
    color: ${((props) => props.theme.text.tertiary)};
  }

  strong {
    margin: 8px 0 42px 0;
  }
  
  em, strong {
    display: block;
  }

  p + p {
    margin-top: 8px;
  }
`;

const Form = styled.form`
  color: ${((props) => props.theme.text.gray)};
  font-size: 15px;

  span {
    color: ${((props) => props.theme.text.red)};
  }
`;

const Inputs = styled.div`
  label {
    display: inline-block;
    margin-bottom: 8px;
  }

  & + & {
    margin-top: 24px;
  }
`;

const Message = styled.p`
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  width: 60%;
  margin: 40px auto 0;
`;
