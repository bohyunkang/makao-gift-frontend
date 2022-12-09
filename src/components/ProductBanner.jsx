import styled from 'styled-components';

import { images } from '../assets';

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 320px;

  padding-left: 12em;

  background: url(${({ image }) => image}) no-repeat 100% 100% #fce778;
`;

const Description = styled.article`
  font-weight: 700;

  em {
    font-size: ${((props) => props.theme.size.default)};
    color: ${((props) => props.theme.colors.tertiary)};
  }

  strong {
    display: block;

    margin-block: 24px;

    font-size: ${((props) => props.theme.size.h4)};
    color: ${((props) => props.theme.text.primary)};
  }

  p {
    font-weight: 400;
    font-size: ${((props) => props.theme.size.default)};
  }
`;

export default function ProductBanner() {
  return (
    <Container image={images.banner}>
      <Description>
        <em>평범한 선물은 주기도 민망하다구요?</em>
        <strong>
          작정하고 준비한
          <br />
          마카오톡 선물하기 아이템
        </strong>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </Description>
    </Container>
  );
}
