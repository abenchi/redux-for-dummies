const { createStore, applyMiddleware } = require('redux');

const defaultState = {
  courses: [
    {
      name: 'Learning React',
      topic: 'React',
    },
    {
      name: 'Learning Angular',
      topic: 'Angular',
    },
    {
      name: 'Using Redux with Angular',
      topic: 'Angular',
    }
  ]
};

function reducer (state, action) {
  switch(action.type) {
    case 'ADD_COURSE': {
      return Object.assign({}, state, {
        courses : [...state.courses, action.course]
      })
    };
    default: {
      return state;
    }
  }
}

const logger = store =>next => action => {
  console.log(`Middleware before: ${store.getState().courses.length}`)
  next(action);
  console.log(`Middleware after: ${store.getState().courses.length}`)
}

const store = createStore(reducer, defaultState, applyMiddleware(logger));

function addView(viewFunc) {
  viewFunc(defaultState);

  store.subscribe(() => {
    viewFunc(store.getState());
  })
}

addView((state) => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

addView((state) => {
  console.log(`The latest course in the library: ${state.courses[state.courses.length -1].name}`);
});

store.dispatch({
  type: 'ADD_COURSE',
  course: {
    name: 'new course has been added',
    topic: 'topic'
  }
})


