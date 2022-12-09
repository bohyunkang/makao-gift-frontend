import styled from 'styled-components';

import { images } from '../assets';

const Container = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  min-height: 100%;

  padding-inline: 15em;
`;

const Description = styled.article`
  font-weight: 700;

  em {
    font-size: ${((props) => props.theme.size.h4)};
    color: ${((props) => props.theme.colors.secondary)};
  }

  strong {
    display: block;

    margin-block: 24px;

    font-size: ${((props) => props.theme.size.h2)};
    color: ${((props) => props.theme.text.primary)};
  }
`;

const ImageWrapper = styled.div`
  width: 500px;
  height: 500px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background: url(${({ image }) => image}) no-repeat 50% 100%;
`;

export default function Home() {
  return (
    <Container>
      <Description>
        <em>무얼 선물할 지 고민이라면</em>
        <strong>
          특별한
          <br />
          아이템을 전하세요
        </strong>
        <p>마카오 선물하기에서만 볼 수 있는 특별한 아이템</p>
      </Description>
      <ImageWrapper>
        <Image image={images.hero} />
      </ImageWrapper>
    </Container>
  );
}
