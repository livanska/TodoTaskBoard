import React from "react";
import Board from "./components/Board";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Board />
        </Provider>
    );
};

export default App;
