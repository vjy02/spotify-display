import styled from 'styled-components/macro';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 30vw;
  height: 90vh;

  img.header_img {
    max-width: 250px;
    min-width: 120px;
    max-height: 250px;
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
    background-color: var(--dark-grey);
    border-radius: ${props => props.type === 'user' ? '50%' : '0'};
    margin-bottom: 0px;
  }

  #profile_flex{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 2em;
    border: 2px solid purple;
  }

  h1.header_name {
    font-size: clamp(2.5rem, 10vw, 6rem);
    font-weight: 900;
    line-height: 1;
    margin: 0 0 var(--spacing-xs) 0;
  }

  .header_meta {
    display: flex;
    align-items: center;
    font-size: var(--fz-lg);
    color: var(--light-grey);
    margin: 0;

    span {
      display: flex;
      align-items: center;

      &:not(:last-of-type)::after {
        content: '•';
        display: block;
        margin: 0 var(--spacing-xs);
        color: var(--light-grey);
        font-size: 8px;
      }
    }
  }
`;

export default StyledHeader;