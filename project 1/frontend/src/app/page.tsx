'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import ProductRow from "./components/productRow"
import HighlightsProductRow from "./components/highlightsProductRow"

export default function Home() {
  return (
    <>
      <Header/>
      <Carrousel/>
      <HighlightsProductRow/>
      <ProductRow/>
    </>
  );
}
