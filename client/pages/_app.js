import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>Header {currentUser?.email}</h1>
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