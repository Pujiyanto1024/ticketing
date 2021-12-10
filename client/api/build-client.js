import axios from "axios";

export default ({ req }) => {
  if(typeof window === 'undefined') {
    // run on server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req?.headers
    });
  } else {
    // run on client
    return axios.create({
      baseURL: '/'
    })
  }
}