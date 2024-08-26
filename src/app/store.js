const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
