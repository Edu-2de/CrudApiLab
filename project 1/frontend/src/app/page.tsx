'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import ProductRow from "./components/shoesRow"
import HighlightsProductRow from "./components/highlightsProductRow"

export default function Home() {
  return (
    <body>
      <Header/>
      <Carrousel/>
      <HighlightsProductRow/>
      <ProductRow/>
    </body>
  );
}
