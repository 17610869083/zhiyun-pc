import React from 'react';
import {Icon} from 'antd';
import { LIGHT, DARKER,BLUES,GRAY} from '../../utils/colors';
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
                        color:'#000'
                    },
                    grounding:{
                        color:'#E4EBF7'
                    },
                    borderColor:{
                        color:'#e4ebf7'
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
                        color:'#b5b5b5'
                    },
                    grounding:{
                        color:'#181b2b'
                    },
                    borderColor:{
                        color:'#35394f'
                    }
                }
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
        const {themeColor} = this.props;
        const Themes = this.state.theme.map((item, index) =>
            <div className="theme-item" key={index}
                 onClick={this.showItem.bind(this, index, item)}
            >
                <div className="top" style={item.topColor}></div>
                <div className="bottom">
                    <div className="left" style={item.bottomColor}></div>
                    <div className="right">
                        <Icon type="check-square" className="check" style={themeColor.topColor.backgroundColor === item.topColor.backgroundColor ? {display: 'block'} : {display: 'none'}}/>
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
const mapStateToProps = state => {
    return {
        themeColor: state.changeThemeReducer
    }
};
const mapDispatchToProps = dispatch => {
    return {
        changeTheme: req => {
            dispatch(changeTheme(req));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTheme);
