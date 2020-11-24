// pages/_app.js
import "bootstrap/dist/css/bootstrap.css";
import "../src/App.css";
import "../src/css/style.css";
import "styles/scss/main.scss";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
