import Inferno from 'inferno';
import Component from 'inferno-component';
import { Router, Route } from 'inferno-router';
import { Provider, connect } from 'inferno-redux';
import h from 'inferno-hyperscript';
import { createStore } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

const store = createStore(function(state, action) {
  switch (action.type) {
    case 'CHANGE_NAME':    
      return {
        name: action.name
      }
    default:
      return {
        name: 'TOM'
      };
  }
})

class App extends Component {
  render() {
    return h('', [
      this.props.children,
    ]);
  }
}

class BasicComponent1 extends Component {
  render() {
    const store = this.context.store;
    const state = store.getState();

    const onClick = e => {
      e.preventDefault();
      store.dispatch({
        type: 'CHANGE_NAME',
        name: 'Jerry'
      });
    };

    return (
      h('.basic', [
        h('a#dispatch', {onClick}, [
          h('span', ['Hello', state.name || 'Tom']),
        ]),
      ])
    );
  }
}

class BasicComponent2 extends Component {
  render() {
    const store = this.context.store;
    const state = store.getState();

    return (
      h('.basic2', [
        state.name === 'Jerry' ? 'You\'re a mouse!' : 'You\'re a cat!',
      ])
    );
  }
}

const container = document.getElementById('root');

Inferno.render(
  h(Provider, {store},
    h(Router, {url: '/', history: browserHistory}, [
      h(Route, {path: '/next', component: BasicComponent2 }),
      h(Route, {path: '/', component: BasicComponent1 }),
    ]),
  ),
  container
);
