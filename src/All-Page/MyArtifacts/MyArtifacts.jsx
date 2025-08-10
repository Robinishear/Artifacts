import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthConrext/AuthCotext";

const MyArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const refreshData = () => {
    if (user?.email) {
      setLoading(true);
      fetch(`https://assaingment-porjects-baregent.vercel.app/myArtifacts?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setArtifacts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching artifacts:", err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    refreshData();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://assaingment-porjects-baregent.vercel.app/data/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (res.data.deletedCount > 0) {
        alert("Successfully deleted!");
        refreshData();
      } else {
        alert("Artifact not found or already deleted.");
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Something went wrong!");
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedArtifact = {
      ...selectedArtifact,
      ...formData,
    };

    try {
      const res = await axios.put(
        `https://assaingment-porjects-baregent.vercel.app/data/${selectedArtifact._id}`,
        updatedArtifact,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        alert("Artifact updated successfully!");
        document.getElementById("my_modal_1").close();
        refreshData();
      } else {
        alert("No changes made.");
      }
    } catch (error) {
      console.log("Update failed:", error);
      alert("Update failed. Check console.");
    }
  };

  if (loading) {
    return (
      <div className="text-lime-200 text-center mt-10 w-16 h-16 max-w-5xl mx-auto py-24 border-4 border-dashed rounded-full animate-spin dark:border-lime-600"></div>
    );
  }

  return (
    <div className="bg-black border border-amber-300 rounded-lg shadow-md max-w-7xl w-full p-6 mx-auto mt-10">
      {/* Heading and Description */}
      <h1 className="text-3xl font-extrabold mb-1 text-lime-300 text-center">My Artifacts</h1>
      <p className="text-lime-300 text-lg flex justify-center items-center mb-8">
        <i className="fas fa-lock mr-2"></i> (Your Submissions)
      </p>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.length > 0 ? (
          artifacts.map((artifact) => (
            <div
              key={artifact._id}
              className="border border-lime-300 rounded-md p-4 flex space-x-4"
            >
              <img
                alt={`${artifact.name} artifact`}
                className="w-26 h-46 text-lime-300 object-cover rounded-md flex-shrink-0"
                src={artifact.image}
              />
              <div className="flex text-lime-300 flex-col justify-between flex-grow">
                <div className="space-y-1 text-base">
                  <p><strong>Artifact Name: </strong>{artifact.name}</p>
                  <p><strong>Type: </strong>{artifact.type}</p>
                  <p><strong>Discovered By: </strong>{artifact.discoveredBy} ({artifact.discoveredYear})</p>
                  <p><strong>Location: </strong>{artifact.location}</p>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedArtifact(artifact);
                      const { _id, ...rest } = artifact;
                      setFormData(rest);
                      document.getElementById("my_modal_1").showModal();
                    }}
                    className="btn bg-lime-300 text-black hover:text-amber-300 border px-4 py-2 rounded hover:bg-black transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(artifact._id)}
                    className="bg-red-500 text-black hover:text-amber-300 border px-4 py-2 rounded hover:bg-black transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lime-300 text-lg col-span-full">
            You have not added any artifacts yet!
            <br />
            Start preserving history by adding one now.
          </p>
        )}
      </div>

      {/* Modal for update */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-black border border-lime-300">
          <h3 className="font-bold text-lg text-lime-300">Update Artifact</h3>
          {selectedArtifact && (
            <form onSubmit={handleUpdateSubmit} className="py-4 space-y-3 text-lime-300">
              <input name="name" value={formData.name || ""} onChange={handleUpdateChange} placeholder="Artifact Name" className="input input-bordered w-full" />
              <input name="imageUrl" value={formData.imageUrl || ""} onChange={handleUpdateChange} placeholder="Image URL" className="input input-bordered w-full" />
              <select name="type" value={formData.type || ""} onChange={handleUpdateChange} className="input input-bordered w-full">
                <option value="">Select Type</option>
                <option value="Weapon">Weapon</option>
                <option value="Tool">Tool</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Other">Other</option>
              </select>
              <input name="historicalContext" value={formData.historicalContext || ""} onChange={handleUpdateChange} placeholder="Historical Context" className="input input-bordered w-full" />
              <input name="shortDescription" value={formData.shortDescription || ""} onChange={handleUpdateChange} placeholder="Short Description" className="input input-bordered w-full" />
              <input name="presentLocation" value={formData.presentLocation || ""} onChange={handleUpdateChange} placeholder="Present Location" className="input input-bordered w-full" />
              <div className="flex gap-2">
                <input name="createdAt" value={formData.createdAt || ""} onChange={handleUpdateChange} placeholder="Created" className="input input-bordered flex-1" />
                <input name="discoveredYear" value={formData.discoveredYear || ""} onChange={handleUpdateChange} placeholder="Year" className="input input-bordered flex-1" />
              </div>
              <div className="flex gap-2">
                <input name="discoveredBy" value={formData.discoveredBy || ""} onChange={handleUpdateChange} placeholder="Discovered By" className="input input-bordered flex-1" />
                <input name="location" value={formData.location || ""} onChange={handleUpdateChange} placeholder="Location" className="input input-bordered flex-1" />
              </div>
              <div className="flex gap-2">
                <input name="adderName" value={formData.adderName || ""} onChange={handleUpdateChange} placeholder="Adder Name" className="input input-bordered flex-1" />
                <input name="adderEmail" value={formData.adderEmail || ""} onChange={handleUpdateChange} placeholder="Adder Email" className="input input-bordered flex-1" />
              </div>
              <button type="submit" className="w-full bg-lime-500 hover:bg-lime-400 text-black font-semibold py-2 rounded transition-all duration-200">Update</button>
            </form>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-lime-300 text-black hover:text-amber-300 border px-4 py-2 rounded hover:bg-black">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyArtifacts;
