import 'bootstrap/dist/css/bootstrap.css';
import 'styles/globals.css';
import 'styles/scss/main.scss';

import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
