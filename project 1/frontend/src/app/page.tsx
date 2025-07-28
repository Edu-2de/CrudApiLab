'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import ProductRow from "./components/productRow"

export default function Home() {
  return (
    <>
      <Header/>
      <Carrousel/>
      <ProductRow/>
    </>
  );
}
