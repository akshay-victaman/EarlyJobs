
import React from 'react';
import Navbar from "../../components/Franchise/Navbar";
import Hero from "../../components/Franchise/Hero";
import ProblemSolution from "../../components/Franchise/ProblemSolution";
import WhyFranchise from "../../components/Franchise/WhyFranchise";
import EarningModel from "../../components/Franchise/EarningModel";
import SetupRequirements from "../../components/Franchise/SetupRequirements";
import FranchiseRoadmap from "../../components/Franchise/FranchiseRoadmap";
import Testimonials from "../../components/Franchise/Testimonials";
import LimitedOffer from "../../components/Franchise/LimitedOffer";
import FAQ from "../../components/Franchise/FAQ";

const Franchise = () => {
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

export default Franchise;