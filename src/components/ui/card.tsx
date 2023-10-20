import styled from "@emotion/styled";
import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}

const CardContainer = styled.div`
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  background-color: #171212;
  border: 1px solid #cac9c9;
  padding: 1rem;
  border-radius: 1rem;
`;

const Card = ({ children }: CardProps) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
