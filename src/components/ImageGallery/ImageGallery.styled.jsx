import styled from "styled-components";

export const ImageGalleryStyle = styled.ul`
display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`

export const Wrapper = styled.div`
  margin: 10px 0;
  text-align: center;
  justify-content: center;
  align-items: center;

  h1, p{
    user-select: none;
  }
`