import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }

    body {
        background: #F8F8F8;
        overflow-y: hidden;
    }

    .bgCube {
        width: 1500px;
        height: 1024px;
        border-radius: 50px;
        background-color: #333333;
        transform: rotate(140deg);
        position: absolute;
        top: -300px;
        left: -500px;
        z-index: -1;
    }
`;
