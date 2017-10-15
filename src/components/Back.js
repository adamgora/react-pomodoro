import React from 'react';
import {formatTime} from "../helpers";

class Back extends React.Component {

    renderSettingsElement(name, element) {
        return(
            <div className="settings-element" key={name}>
                <h5>{element.name}</h5>
                <div>
                    <a href="#"
                       className="setting-modify modify-up"
                       onClick={() => this.props.modifyCounterInitValue(name, 60)}
                    >
                        &nbsp;
                    </a>
                    <span className="setting-value">{formatTime(element.initValue)}</span>
                    <a href="#"
                       className="setting-modify modify-down"
                       onClick={() => this.props.modifyCounterInitValue(name, -60)}
                    >
                        &nbsp;
                    </a>
                </div>
            </div>
        );
    }

    render() {
        return(
            <div id="app-back" className={this.props.is_visible ? 'active' : ''}>
                <span id="go-to-main-screen" onClick={() => this.props.setVisibleComponent('front')}>&lt; back</span>
                <div id="settings-container">
                    {Object.keys(this.props.counters).map((x) => {
                        return this.renderSettingsElement(x, this.props.counters[x]);
                    })}
                </div>
            </div>

        );
    }
}

export default Back;