import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 0 1rem;
`;

export const Header = styled.header`
  width: 100%;
  height: 350px;  

  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 350px;
    background-image: url('/background.png');
    object-fit: fill;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 3.5rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 775px;
    width: 100%;
    margin: 0 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  
  width: 100%;
  height: 3.5rem;

  margin-top: 3rem;
  padding-left: 1rem;
  border: none;
  border-radius: 0.5rem;

  background-color: var(--gray-700);

  input {
    flex: 1;
    border: none;
    background-color: transparent;
    margin-right: 1rem;
    outline: none;

    color: var(--text);

    &::placeholder {
      color: var(--gray-300);
    }
  }

  button {
    width: 3.5rem;
    height: 100%;

    border:none;
    border-radius: 0.5rem;
    color: var(--text);

    > svg {
      width: 1.5rem;
      height: auto;
    }

    &.add {
      background: var(--blue);
    }

    &.edit {
      background: var(--yellow);
      border-radius: 0.5rem 0 0 0.5rem;
    }

    &.cancel {
      background: var(--red);
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
`;

export const Content = styled.main`
  max-width: 775px;
  width: 100%;
  
  margin: -5rem 1rem 0 1rem;
  padding: 1rem;

  background: var(--gray-700);
  border-radius: 0.5rem;
`;

export const SortMenu = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0.5rem 0;

  div {
    button {
      border: none;
      color: var(--text);
      background: transparent;
      outline: none;

      &.selected {
        font-weight: bold;
      }

      & + button {
        margin-left: 2rem;
      }
    }
  }

  > button {
    border: none;
    color: var(--text);
    background: transparent;
  }

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    > button {
      margin-top: 1.5rem;
    }
  }
`;

export const EmptyMessage = styled.p``;


export const TasksContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;  

  > p {
    margin: 1.5rem 0; 
    color: var(--gray-300);
  }
`;

export const Task = styled.div`
  width: 100%;
  transition: display 5s;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 1.5rem 0;
  border-bottom: 1px solid var(--gray-300);
  
  label {
    margin: 0 1rem;
  }

  p {
    flex: 1;
    margin-left:1rem;

    &.checked {
      text-decoration-line: line-through;
      color: var(--gray-300);
    }
  }

  > button {
    border: none;
    background: transparent;
    margin-left: 1.5rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &.edit {
      color: var(--yellow);
    }

    &.delete {
      color: var(--red);
      margin-right: 1.5rem;
    }
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;

  margin: 1.5rem 0 0.5rem 0;

  p {
    max-width: 110px;
    width: 100%;
    margin-right: 1rem;

    text-align: left;
  }

  > div {
    flex: 1;
    height: 0.75rem;
    border-radius: 0.375rem;
    padding: 0.125rem;
    background: var(--gray-300);

    div {
      height: 100%;
      width: 100%;
      border-radius: 0.25rem;
      background: var(--blue);
    }
  }
`;

export const Footer = styled.footer`
  max-width: 775px;
  width: 100%;
  
  margin: 3rem auto 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 1.5rem;
  }

  div {
      display: flex;
      align-items: center;

    a {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: var(--blue);

      text-decoration: none;
      color: var(--text);

      display: flex;
      align-items: center;
      justify-content: center;

      & + a {
        margin-left: 1.5rem;
      }
    }
  }
`;
