import { request } from 'graphql-request'
import useSWR from 'swr' 
import {  gql } from "graphql-request";
import Container from "../styles/Container"

const endpoint="https://graphql-sfv4.zyda.com/graphql"
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
const fetcher = (url) => {
    return request(url, MY_QUERY);
  }

function RenderSWR () {
  const { data, error } = useSWR(endpoint,
    fetcher,caches
  )
  //console.log(data)
  return(<Container >
  <div><h1>rendered using SWR:</h1>
  {data ? data.store.branches.map(branch =>
    <h3 >Branch Name: {branch.titleEn} ID: {branch.id} and located in {branch.areaEn} </h3>):<h1>loading...</h1> }</div>
 
    </Container>)
}
export default RenderSWR;