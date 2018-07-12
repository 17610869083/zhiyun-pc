import React from 'react';
import {Icon} from 'antd';
import { LIGHT, DARKER,BLUES} from '../../utils/colors';
import {changeTheme} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import './ChangeTheme.less';

class ChangeTheme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            themeShow: true,
            theme: [
                {
                    topColor: {
                        backgroundColor: BLUES
                    },
                    bottomColor: {
                        backgroundColor: '#fff'
                    },
                    textColor:{
                         color:'#fff'
                    }
                },
                {
                    topColor: {
                        backgroundColor: LIGHT
                    },
                    bottomColor: {
                        backgroundColor: DARKER
                    },
                    textColor:{
                        color:'#fff'
                    }
                },
                // {
                //     topColor: {
                //         backgroundColor: BLUE
                //     },
                //     bottomColor: {
                //         backgroundColor: LIGHT
                //     }
                // },
                // {
                //     topColor: {
                //         backgroundColor: RED
                //     },
                //     bottomColor: {
                //         backgroundColor: LIGHT
                //     }
                // }
            ]
        }
    }
     
    showItem(index,item) {
        this.setState({
            index: index
        });
        this.props.changeTheme(item);
    }
    render() {
        const Themes = this.state.theme.map((item, index) =>
            <div className="theme-item" key={index}
                 onClick={this.showItem.bind(this, index, item)}
            >
                <div className="top" style={item.topColor}></div>
                <div className="bottom">
                    <div className="left" style={item.bottomColor}></div>
                    <div className="right">
                        <Icon type="check-square" className="check" style={this.state.index === index ? {display: 'block'} : {display: 'none'}}/>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="change-theme">
                <div className="theme-box">
                    {Themes}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeTheme: req => {
            dispatch(changeTheme(req));
        }
    }
};
export default connect(null, mapDispatchToProps)(ChangeTheme);
