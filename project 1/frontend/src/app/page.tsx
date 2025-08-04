'use client';
import Carrousel from "./components/carrousel"
import Header from "./components/header"
import HighlightsProductRow from "./components/highlightsProductRow"
import InformationCards from "./components/informationCards"
import TopPartsRow from "./components/topPartsRow"
import ShoesRow from "./components/shoesRow"
import BottomParts from "./components/bottomParts"

export default function Home() {
  return (
    <>
      <Header/>
      <Carrousel/>
      <InformationCards/>
      <HighlightsProductRow/>
      <TopPartsRow/>
      <BottomParts/>
      <ShoesRow/>
    </>
  );
}
