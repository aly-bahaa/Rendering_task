import { request , GraphQLClient} from 'graphql-request'

import {  gql } from "graphql-request";

 const MY_QUERY = gql`
  {
    store (subdomain:"demo-sfv4"){
      branches{
        id
        titleEn
        areaEn
      }
    }
  }
`;
const endpoint="https://graphql-sfv4.zyda.com/graphql"

 const fetcher = (url) => {
     return request(url, MY_QUERY);
  }
  function  ServerSide({ data }) {
    console.log(data)
    return (
      <ul>
        { data ? data.map(branch =>
        <li>
          <h1>{branch.id}</h1>           
        </li>) : <h1>Loading...</h1> }
      </ul>
    )
   }
   
 export async function getServerSideProps() {
  console.log("skmdks")
  // const client=new GraphQLClient(endpoint)
  //const {store}= await client.request(MY_QUERY)
  const response = await fetcher(endpoint)
  const data = await response.json();
 
  return { props:{
    data
  }}
 
 }

 export default ServerSide;