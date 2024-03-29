import styled from "styled-components";

export const HeaderWrapper = styled.div`
    height: 41px;
    display: flex;
    line-height: 41px;
    align-items: center;
    background: url(${require('../../../../../assets/img/playlist_bg.png')}) 0 0;
    border-radius: 10px 10px 0 0;
`;

export const HeaderLeft = styled.div`
    display: flex;
    justify-content: space-between;
    width: 553px;
    padding: 0 25px;

    h2 {
        color: #e2e2e2;
        font-weight: 700;
    };

    .operator {
        color: #e2e2e2;
            .del {
                width: 13px;
                height: 13px;
                display: inline-block;
                background-position: -51px 0;
                position: relative;
                top: 2px;
                margin-right: 5px;
            };

            span {
                color: #ccc;
                cursor: pointer;
                
                :hover {
                    /* text-decoration: underline; */
                    color: white;
                };
            };
            .close {
                margin-left: 20px;
            }
    };

`;

export const HeaderRight = styled.div`
    width: 420px;
    display: flex;
    flex: 1;
    text-align: center;
    color: #fff;

    h2 {
        width:420px;
        position: relative;
        font-size: 15px;
        margin-left: 10px;
    }

`;