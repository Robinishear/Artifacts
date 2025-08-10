import axios from 'axios';

const Delete = ({ data, refreshData }) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://assaingment-porjects-baregent.vercel.app/data/${id}`);
      if (res.data.deletedCount > 0) {
        alert('Successfully deleted!');
        refreshData(); // reload the list
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div>
      {data.map(item => (
        <div key={item._id} className="border p-4 rounded">
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p>{item.description}</p>
          <button
            onClick={() => handleDelete(item._id)}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Delete;
