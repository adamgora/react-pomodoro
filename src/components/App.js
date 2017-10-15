import React from 'react';
import Front from "./Front";
import Back from "./Back";

class App extends React.Component {

    constructor() {
        super();
        this.setVisibleComponent = this.setVisibleComponent.bind(this);
        this.startCounter = this.startCounter.bind(this);
        this.stopCounter = this.stopCounter.bind(this);
        this.resetCurrentCounter = this.resetCurrentCounter.bind(this);
        this.decreaseCounterValue = this.decreaseCounterValue.bind(this);
        this.modifyCounterInitValue = this.modifyCounterInitValue.bind(this);
        this.state = {
            visibleComponent: 'front',
            counters: {
                pomodoro: {
                    initValue: 1500,
                    name: 'pomodoro duration'
                },
                shortBreak: {
                    initValue: 300,
                    name: 'short break duration'
                },
                longBreak: {
                    initValue: 900,
                    name: 'long break duration'
                }
            },
            currentCounter: '',
            currentCounterInitValue: 0,
            currentCounterValue: 0,
            pomodorosPassed: 0,
            intervalId: {},
            isCountingDown: false
        };
    }

    componentWillMount() {
        const intervalId = setInterval(this.decreaseCounterValue, 1000);
        const firstCounter = Object.keys(this.state.counters)[0];
        this.setState({
            intervalId: intervalId,
            currentCounter: firstCounter,
            currentCounterValue: this.state.counters[firstCounter].initValue,
            currentCounterInitValue: this.state.counters[firstCounter].initValue
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    setVisibleComponent(component) {
        this.setState({visibleComponent:component});
    }

    decreaseCounterValue() {
        if(this.state.isCountingDown) {
            let counterValue = this.state.currentCounterValue;
            if(counterValue > 0) {
                this.setState({currentCounterValue: counterValue - 1});
            } else {
                this.stopCounter();
                this.setCyclesPassed();
                this.setNextCounter();
            }
        }
    }

    modifyCounterInitValue(name, value) {
        let counters = {...this.state.counters};
        counters[name].initValue += value;
        this.setState({counters});
    }

    startCounter() {
        this.setState({isCountingDown:true});
    }

    stopCounter() {
        this.setState({isCountingDown:false});
    }

    resetCurrentCounter() {
        this.setState({
            isCountingDown:false,
            currentCounterValue: this.state.counters[this.state.currentCounter].initValue,
            currentCounterInitValue: this.state.counters[this.state.currentCounter].initValue
        });
    }

    setNextCounter() {
        let nextCounter = '';
        if(this.state.currentCounter === 'pomodoro') {
            nextCounter = this.state.pomodorosPassed % 4 === 0 ? 'longBreak' : 'shortBreak';
        } else {
            nextCounter = 'pomodoro';
        }
        this.setState({
            currentCounter:nextCounter,
            currentCounterValue: this.state.counters[nextCounter].initValue,
            currentCounterInitValue: this.state.counters[nextCounter].initValue
        });
    }

    setCyclesPassed() {
        let pomodorosPassed = this.state.pomodorosPassed;
        if(this.state.currentCounter === 'pomodoro') {
            pomodorosPassed++;
            this.setState({pomodorosPassed: pomodorosPassed});
        }
    }

    render() {
        return(
            <div>
                <Front
                    is_visible={this.state.visibleComponent === 'front'}
                    setVisibleComponent={this.setVisibleComponent}
                    counterValue={this.state.currentCounterValue}
                    counterInitValue={this.state.currentCounterInitValue}
                    startCounter={this.startCounter}
                    resetCurrentCounter={this.resetCurrentCounter}
                    stopCounter={this.stopCounter}
                    isCountingDown={this.state.isCountingDown}
                />
                <Back
                    is_visible={this.state.visibleComponent === 'back'}
                    setVisibleComponent={this.setVisibleComponent}
                    counters={this.state.counters}
                    modifyCounterInitValue={this.modifyCounterInitValue}
                />
            </div>
        );
    }
}

export default App;