import { Html } from "next/document";
import styled from "@emotion/styled";

export const $Html = styled(Html)`
  height: 100%;
  background: #f5f5f5;

  & body {
    height: 100%;
    margin: 0;
  }
`;
