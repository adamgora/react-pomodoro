import React from 'react';
import {formatTime} from "../helpers";

class Front extends React.Component {

    render() {

        const degs = parseFloat(180 - (((this.props.counterValue * 100) / this.props.counterInitValue) * 180) / 100, 2);

        const fillStyles = {
            transform: `rotate(${degs}deg)`
        };

        const fixStyles = {
            transform: `rotate(${degs * 2}deg)`
        };

        return(
            <div id="app-front" className={this.props.is_visible ? 'active' : ''}>
                <span id="go-to-settings" onClick={() => this.props.setVisibleComponent('back')} className="fa fa-cog">&nbsp;</span>
                <button id="start-stop"
                        className="btn"
                        onClick={() => this.props.isCountingDown ? this.props.stopCounter() : this.props.startCounter()}
                >
                    {this.props.isCountingDown ? 'pause' : 'start'}
                </button>
                <button id="reset"
                        className="btn"
                        onClick={() => this.props.resetCurrentCounter()}
                >
                    reset
                </button>
                <div id="main-counter" className="radial-progress">
                    <div className="circle">
                        <div className="mask full" style={fillStyles}>
                            <div className="fill" style={fillStyles}>&nbsp;</div>
                        </div>
                        <div className="mask half">
                            <div className="fill" style={fillStyles}>&nbsp;</div>
                            <div className="fill fix" style={fixStyles}>&nbsp;</div>
                        </div>
                        <div className="inset">&nbsp;</div>
                        <div className="counter">{formatTime(this.props.counterValue)}</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Front;