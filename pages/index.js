import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
//import { request } from 'graphql-request'
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import RenderSWR from './RenderSWR';
import ServerSide from './ServerSide';

const fetcher = async(url)=> await fetch(url).then(response=>response.json())
const endpoint="https://graphql-sfv4.zyda.com/graphql"
const MY_QUERY = gql`
  {
    store (subdomain:"demo-sfv4"){
      branches{
        id
        areaEn
      }
    }
  }
`;
export default function Home() {
  const { data, isLoading, error } = useQuery("lll", () => {
    return request(endpoint, MY_QUERY);
  });
 // console.log(data)
  {if(error){
    return (<h1>Ooops...</h1>)
  }}
{if(isLoading){
  return <h1>loading...</h1>
}}

  return (
  <div><h2>Rendered using React Query + GraphQL Request</h2>
  { data.store.branches.map(branch =>
  <h3 >{branch.id} and located in {branch.areaEn} </h3>) }
  {/* <Swrr /> */}
  <RenderSWR />
  <ServerSide />
  
  </div> 
  )

}
