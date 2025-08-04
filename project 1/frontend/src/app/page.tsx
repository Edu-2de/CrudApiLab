'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import HighlightsProductRow from "./components/highlightsProductRow"
import InformationCards from "./components/informationCards"
import TopPartsRow from "./components/topPartsRow"
import NewShoesRow from "./components/newShoesRow"

export default function Home() {
  return (
    <body>
      <Header/>
      <Carrousel/>
      <InformationCards/>
      <HighlightsProductRow/>
      <TopPartsRow/>
      <NewShoesRow/>
    </body>
  );
}
