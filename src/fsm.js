class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.config.initial = 'normal'
        this.undoArr = ['normal']
        this.redoArr = []
        if (this.config === undefined) {
            throw new Error("Config: Empty")
        } 
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.config.initial
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let possibleStates = ['normal', 'busy', 'hungry', 'sleeping'];
        let errorCount = 0;
        for (let index = 0; index < possibleStates.length; index++) {
            const element = possibleStates[index];
            if (state === element) {
                errorCount++
            }
        }
        if(errorCount === 0) {
            throw new Error("State: fail check");
        } 
        this.config.initial = state
        this.undoArr.push(this.config.initial)
        return this.config.initial 
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
  
    trigger(event) {  
        if (this.config.states[this.config.initial].transitions[event] == undefined) {
            throw new Error("Event: fail check");
        }
        this.config.initial = this.config.states[this.config.initial].transitions[event]
        this.undoArr.push(this.config.initial)
        return this.config.initial
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        return this.config.initial = 'normal'
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = []
        if (event === undefined) {
            return ['normal', 'busy', 'hungry', 'sleeping']
        }

        for (const key in config.states) {
            if (config.states[key].transitions.hasOwnProperty(event)) {
                states.push(key)
            }
        }

        return states

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoArr.length === 1) {
            return false
        }
        this.redoArr.push(this.undoArr[this.undoArr.length -1])
        console.log(redoArr)
        this.undoArr.pop()
        this.changeState(this.undoArr[this.undoArr.length -1])
        this.undoArr.pop()
        return true
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoArr.length === 0) {
            return false
        }
        this.changeState(this.redoArr[this.redoArr.length -1])
        this.redoArr.pop()
        return true
    }

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};

// for (const key in config.states) {

//     if (config.states[key].transitions.hasOwnProperty('study')) {
//         console.log(config.states[key].transitions.hasOwnProperty('study'));
//         console.log(key, 'ANSWER')
//         console.log(config.states[key].transitions['study']);
//     }

// }

// let arr = [ 'normal', 'busy', 'sleeping', 'hungry' ]
// console.log(arr)
// arr.pop()
// console.log(arr, 'POP')
// console.log(arr[arr.length - 1], '-1')