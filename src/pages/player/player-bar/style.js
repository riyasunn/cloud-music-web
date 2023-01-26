import styled from "styled-components";

export const PlayerBarWrapper = styled.div`
    position: fixed;
    height: 52px;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: 0 0;
    background-repeat: repeat;

    .content {
        height: 47px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
`

export const Control = styled.div`
    display: flex;
    align-items: center;
    .prev {
        width: 28px;
        height: 28px;
        background-position: 0 -130px;
        :hover {
            filter: drop-shadow(0 0 0px rgb(0, 255, 255));
        }
    };

    .play {
        width: 36px;
        height: 36px;
        background-position: 0 ${props => props.isPlaying ? "-165px" : "-203px" };
        margin: 0 8px;
        :hover {
            filter: drop-shadow(0 0 1px rgb(0, 255, 255));
        }
    };

    .next {
        width: 28px;
        height: 28px;
        background-position: -80px -130px;
        :hover {
            filter: drop-shadow(0 0 0px rgb(0, 255, 255));
        }
    }
`

export const PlayInfo = styled.div`
    width: 624px;
    display: flex;
    align-items: center;

    .image {
        /* margin-right: 10px; */
        border: 1 solid black;
        border-radius: 5px;
        position: relative;

        .cover {
            width: 34px;
            height: 34px; 
            background-position: 0px -80px;
            position: absolute;
            top:0px;
            left: 0px;
        }
    }

    .info {
        /* flex: 1; */
        color: #a1a1a1;
        margin-left: 10px;

        .song {
            position: relative;
            top: 8px;
            left: 8px;

            .song-name {
                color: #e8e8e8; 
                margin-right: 10px;
            }

            .artiest-name {
                color: #9b9b9b;
            }
        };

        .progress {
            display: flex;
            align-items: center;

            .ant-slider {
                width: 493px;
                margin-right: 10px;
            }

            .ant-slider-rail {
                background-image: url(${require('../../../assets/img/progress_bar.png')});
                height: 9px;
                background-position: 0 0;
            }
            
            .ant-slider-track {
                background-image: url(${require("../../../assets/img/progress_bar.png")});
                height: 9px;
                background-position: left -66px;
            }

            /* .ant-slider-handle {
                width: 22px;
                height: 24px;
                background: url(${require('../../../assets/img/sprite_icon.png')}) 0 -250px;
                margin-top: -7px;
                border: none;
            } */

            .time {
                .now-time {
                    color: #e1e1e1;
                }

                .divider {
                    margin: 0 3px;
                }
            }
        }
    }
`

export const Operator = styled.div`
    display: flex;
    /* align-items: center; */
    /* position: relative; */
    /* top: 5px; */
    margin-top: 10px;
    
    .btn {
        width: 25px;
        height: 25px;
    }

    .favor {
        background-position: -88px -163px;
    }

    .share {
        background-position: -114px -163px;
    }

    .right {
        width: 130px;
        margin-left: 20px;
        background-position: -147px -248px;
        
        .volume {
            background-position: -2px -248px;
            opacity: .7;
            :hover {
                opacity: 1;
                filter: drop-shadow(0 0px 3px rgb(0 255 255));
            }
        }

        .loop {
            opacity: .7;
            /* background-position: -66px -248px; */
            background-position: ${props => {
                switch(props.sequence) {
                    case 1:
                        return "-66px -248px";
                    case 2:
                        return "-66px -344px";
                    default:
                        return "-3px -344px";
                }
           }};

            :hover {
                opacity: 1;
                filter: drop-shadow(0 0px 3px rgb(0 255 255));
            }
        }

        .play-list {
            width: 59px;
            background-position: -42px -68px; 
            opacity: .7;
          
            /* color: #ccc; */
            /* padding-left: 18px; */
            :hover {
                filter: drop-shadow(0 0px 3px rgb(0 255 255));
                /* box-shadow: 0 0 50px white; */
                opacity: 1;
            }
        }

        .count {
            width: 20px;
            color: #9b9b9b;
            position: absolute;
            top: 20px;
            right: 25px;
        }
    }
  
`