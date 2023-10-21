import { css } from "@emotion/react";

const hrStyle = css`
  margin-bottom: 2rem;
`;

export default function Divider() {
  return <hr css={hrStyle} />;
}
