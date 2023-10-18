import styled from "@emotion/styled";
import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}

const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Card = ({ children }: CardProps) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
