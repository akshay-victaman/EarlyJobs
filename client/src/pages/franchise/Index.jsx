
import React from 'react';
import Navbar from "../../components/franchise/Navbar";
import Hero from "../../components/franchise/Hero";
import ProblemSolution from "../../components/franchise/ProblemSolution";
import WhyFranchise from "../../components/franchise/WhyFranchise";
import EarningModel from "../../components/franchise/EarningModel";
import SetupRequirements from "../../components/franchise/SetupRequirements";
import FranchiseRoadmap from "../../components/franchise/FranchiseRoadmap";
import Testimonials from "../../components/franchise/Testimonials";
import LimitedOffer from "../../components/franchise/LimitedOffer";
import FAQ from "../../components/franchise/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <WhyFranchise />
      <EarningModel />
      <SetupRequirements />
      <FranchiseRoadmap />
      {/* <Testimonials /> */}
      <LimitedOffer />
      <FAQ />
    </div>
  );
};

export default Index;
