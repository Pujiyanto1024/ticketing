import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  let pageProps = {};
  if(appContext.Component.getInitialProps) {
    try {
      const { data } = await client.get('/api/users/currentuser');
      
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
      return {
        pageProps,
        ...data
      }
    } catch(e) {
      return {};
    }
  }

  return {};
};

export default AppComponent;