const LOAD = 'px/frontpage/LOAD';

const defaultState = {
  load: false,
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export function loadFrontpage() {
  return { type: LOAD };
}
