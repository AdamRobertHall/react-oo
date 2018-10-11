import React, { Component } from 'react';
import {initConfig, initList} from './defautConfig'
import List from './pages/list'
import Config from './pages/config'
class App extends Component {
  constructor() {
    super();
    initConfig();
    initList();
    this.state = {
      update: false
    };
    global.cols = this.getCols();
  }

  componentWillMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }

  getCols() {
    let cols = 1;
    let cw = document.documentElement.clientWidth || document.body.clientWidth;
		if (cw >= 1280) {
		  cols = 4
		} else if (cw >= 960 && cw < 1280) {
		  cols = 3
		} else if (cw >= 640 && cw < 960) {
		  cols = 2
		} else {
      cols = 1
    }
    return cols;
  }

  onWindowResize() {
    global.cols = this.getCols();
    this.setState({ update: !this.state.update });
  }

  render() {
    return (
      <div>
        <Config refresh={() => this.setState({ update: !this.state.update })}/>
        <List/>
      </div>
    );
  }
}

export default App;
