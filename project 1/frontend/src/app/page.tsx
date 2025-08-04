'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import HighlightsProductRow from "./components/highlightsProductRow"
import InformationCards from "./components/informationCards"
import TopPartsRow from "./components/topPartsRow"
import ShoesRow from "./components/shoesRow"

export default function Home() {
  return (
    <body>
      <Header/>
      <Carrousel/>
      <InformationCards/>
      <HighlightsProductRow/>
      <TopPartsRow/>
      <ShoesRow/>
    </body>
  );
}
