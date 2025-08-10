import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthConrext/AuthCotext";

const AddArtifacts = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const oldData = Object.fromEntries(formData.entries());
    const newData = {
      ...oldData,
      adderEmail: user?.email,
    };
    console.log(newData);
    try {
      const response = await axios.post(
        "https://assaingment-porjects-baregent.vercel.app/postdata",
        newData
      );
      console.log("Success:", response.data);
      alert("Artifact added successfully!");
      e.target.reset();  
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to add artifact.");
    }
  };

  if (loading) {
    return (
      <div className="text-lime-200 text-center mt-10 w-16 h-16 max-w-5xl mx-auto py-24 border-4 border-dashed rounded-full animate-spin dark:border-lime-600"></div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto bg-black mt-10 text-yellow-300 rounded-2xl p-8 shadow-xl border border-gray-700">
      <h1 className="text-3xl font-bold text-center mb-8 text-lime-400">
        Add Artifact
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Artifact Name */}
        <div className="col-span-1">
          <label
            htmlFor="artifactName"
            className="block mb-2 text-sm font-medium"
          >
            Artifact Name
          </label>
          <input
            id="artifactName"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Artifact Image */}
        <div className="col-span-1">
          <label
            htmlFor="artifactImage"
            className="block mb-2 text-sm font-medium"
          >
            Artifact Image (URL)
          </label>
          <input
            id="artifactImage"
            name="image"
            type="url"
            required
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Artifact Type */}
        <div className="col-span-1">
          <label
            htmlFor="artifactType"
            className="block mb-2 text-sm font-medium"
          >
            Artifact Type
          </label>
          <select
            id="artifactType"
            name="type"
            required
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="">Select Type</option>
            <option value="Weapon">Weapon</option>
            <option value="Tool">Tool</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Historical Context */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label
            htmlFor="historicalContext"
            className="block mb-2 text-sm font-medium"
          >
            Historical Context
          </label>
          <input
            id="historicalContext"
            name="historicalContext"
            type="text"
            required
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Created At */}
        <div className="col-span-1">
          <label
            htmlFor="createdAt"
            className="block mb-2 text-sm font-medium"
          >
            Created At
          </label>
          <input
            id="createdAt"
            name="createdAt"
            type="text"
            required
            placeholder="e.g. 1200 BC"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Discovered Year */}
        <div className="col-span-1">
          <label
            htmlFor="discoveredYear"
            className="block mb-2 text-sm font-medium"
          >
            Discovered Year
          </label>
          <input
            id="discoveredYear"
            name="discoveredYear"
            type="text"
            required
            placeholder="e.g. 1902"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Discovered By */}
        <div className="col-span-1">
          <label
            htmlFor="discoveredBy"
            className="block mb-2 text-sm font-medium"
          >
            Discovered By
          </label>
          <input
            id="discoveredBy"
            name="discoveredBy"
            type="text"
            required
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Present Location */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <label
            htmlFor="presentLocation"
            className="block mb-2 text-sm font-medium"
          >
            Present Location
          </label>
          <input
            id="presentLocation"
            name="presentLocation"
            type="text"
            required
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="w-full bg-lime-500 text-black text-lg font-bold rounded-lg py-3 hover:bg-lime-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            Add Artifact
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddArtifacts;
