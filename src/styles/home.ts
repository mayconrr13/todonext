import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  width: 100%;
  height: 350px;
  background: linear-gradient(180deg, var(--green) 0%, var(--background) 100%);

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 3.5rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;

  max-width: 775px;
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
      background: var(--green);
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
  
  margin: -5rem auto 0 auto;
  padding: 1rem;

  background: var(--gray-700);
  border-radius: 0.5rem;
`;

export const SortMenu = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  margin: 0.5rem 0;

  button {
    border: none;
    color: var(--text);
    background: transparent;

    & + button {
      margin-left: 2rem;
    }

    &:last-child {
      margin-left: auto;
    }
  }
`;

export const TasksContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  
`;

export const Task = styled.div`
  width: 100%;

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