import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';
import useOrderStore from '../hooks/useOrderStore';

import { numberFormat } from '../utils/format';

import Input from './common/Input';
import Button from './common/Button';

const Container = styled.article`  
  display: flex;
  justify-content: center;
  align-items: center;
  
  margin-top: 80px;
`;

const Wrapper = styled.div`
  min-width: 1180px;

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

const ErrorMessage = styled.p`
  margin-top: 8px;

  font-size: 15px;

  color: ${((props) => props.theme.text.red)};
`;

const DefaultMessage = styled.p`
  margin-top: 8px;

  font-size: 15px;
`;

const ButtonWrapper = styled.div`
  width: 60%;
  margin: 40px auto 0;
`;

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
              error={(errors.receiver && errors.address) || errors.receiver}
              {...register('receiver', {
                required: true,
                pattern: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,7}$/,
              })}
            />
            {errors.receiver
              ? (<ErrorMessage>성함을 입력해주세요</ErrorMessage>)
              : (<DefaultMessage>3~7자까지 한글만 사용 가능</DefaultMessage>)}
          </Inputs>
          <Inputs>
            <label htmlFor="input-address">받는 분 주소</label>
            <span>*</span>
            <Input
              type="text"
              id="input-address"
              name="address"
              error={(errors.receiver && errors.address) || errors.address}
              {...register('address', { required: true })}
            />
            {errors.address
              ? (<ErrorMessage>주소를 입력해주세요</ErrorMessage>)
              : (<DefaultMessage>주소지를 입력해주세요</DefaultMessage>)}
          </Inputs>
          <Inputs>
            <label htmlFor="input-message">받는 분께 보내는 메시지</label>
            <Input
              type="text"
              id="input-message"
              name="message"
              {...register('message')}
            />
            <DefaultMessage>100글자 이내로 입력해주세요</DefaultMessage>
          </Inputs>
          <ButtonWrapper>
            <Button type="submit">선물하기</Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
}
