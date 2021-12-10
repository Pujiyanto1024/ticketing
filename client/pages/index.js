import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return (
    currentUser ? (
      <h1>You are sign in</h1>
    ) : (
      <h1>You are NOT sign in</h1>
    )
  )
};

LandingPage.getInitialProps = async context => {
  // const response = await axios.get('/api/users/currentuser');
  console.log('landi')
  try{
    const client = buildClient(context);
    // return response.data;
    const { data } = await client.get('/api/users/currentuser');
    return data;
  } catch(e) {
    return {};
  }
};

export default LandingPage;