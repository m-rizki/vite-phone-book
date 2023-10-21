import { css } from "@emotion/react";

export const formControl = css`
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

export const formControlPhone = css`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
  }
`;

export const labelStyle = css`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    width: 128px;
  }
`;

export const baseInputStyle = css`
  padding: 0.5rem;
  border: 1px solid #cac9c9;
  color: #cac9c9;
  border-radius: 4px;
  width: 100%;
`;

export const inputStyle = css`
  ${baseInputStyle}
  @media (min-width: 768px) {
    width: 512px;
  }
`;

export const inputPhoneStyle = css`
  ${baseInputStyle}
  @media (min-width: 768px) {
    width: 450px;
  }
`;

export const baseButtonStyle = css`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`;

export const buttonStyle = css`
  ${baseButtonStyle}
  background-color: #15803d;
  &:hover {
    background-color: #16a34a;
  }

  &:active {
    background-color: #14532d;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const submitButtonStyle = css`
  ${buttonStyle}
  display: block;
  margin-top: 4rem;
  width: 100%;
  @media (min-width: 768px) {
    width: 256px;
  }
`;

export const errorButtonStyle = css`
  ${baseButtonStyle}
  background-color: #e11d48;
  &:hover {
    background-color: #f43f5e;
  }

  &:active {
    background-color: #9f1239;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    pointer-events: none;
  }
`
