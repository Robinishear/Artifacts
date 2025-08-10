import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [artifactData, setArtifactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://assaingment-porjects-baregent.vercel.app/artifactsDetails/${id}`);
        const data = await res.json();

        setArtifactData(data);
      } catch (error) {
        console.log(`Error fetching artifact details: ${error}`);
      } finally {
        setLoading(false);
      }
    };



    loadDetails()
  }, [id]);

  if (loading) {
    return (
      <div className="text-lime-200 text-center mt-10 w-16 h-16 max-w-5xl mx-auto py-24 border-4 border-dashed rounded-full animate-spin dark:border-lime-600"></div>
    );
  }

  return (
    <>
      <div className="p-6 bg-black border border-amber-300 text-lime-200 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 space-y-4">
        <img
          src={artifactData?.image}
          alt={artifactData?.name}
          className="mb-4 w-full max-h-[400px] object-cover rounded border border-lime-400"
        />
        <h1 className="text-3xl font-bold text-lime-400">
          {artifactData?.name}
        </h1>
        <p>
          <span className="font-semibold text-lime-400">Type:</span>{" "}
          {artifactData?.type}
        </p>
        <p>
          <span className="font-semibold text-lime-400">Added By:</span>{" "}
          {artifactData?.adderName}
        </p>
        <p>
          <span className="font-semibold text-lime-400">Context:</span>{" "}
          {artifactData?.historicalContext}
        </p>
        <p>
          <span className="font-semibold text-lime-400">Likes:</span>{" "}
          {artifactData?.likeCount}
        </p>
      </div>
    </>
  );
};

export default Details;
