// React Stuff
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// App Component
import App from "./App";

// Redux
import store from "./store";
import { Provider } from "react-redux";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

ReactDOM.render(
   <Provider store={store}>
      <ChakraProvider theme={theme}>
         <App />
      </ChakraProvider>
   </Provider>,
   document.getElementById("root")
);

reportWebVitals();
