'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import ProductRow from "./components/shoesRow"
import HighlightsProductRow from "./components/highlightsProductRow"
import InformationCards from "./components/informationCards"

export default function Home() {
  return (
    <body>
      <Header/>
      <Carrousel/>
      <InformationCards/>
      <HighlightsProductRow/>
      <ProductRow/>
    </body>
  );
}
