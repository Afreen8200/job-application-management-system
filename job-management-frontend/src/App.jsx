import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);

  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    status: "APPLIED",
    appliedDate: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [searchCompany, setSearchCompany] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/applications"
      );

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch(
          `http://localhost:8081/api/applications/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
          }
        );
      } else {
        await fetch(
          "http://localhost:8081/api/applications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
          }
        );
      }

      setForm({
        companyName: "",
        jobTitle: "",
        location: "",
        status: "APPLIED",
        appliedDate: "",
        notes: ""
      });

      setEditingId(null);

      fetchApplications();
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  const handleEdit = (application) => {
    setForm({
      companyName: application.companyName || "",
      jobTitle: application.jobTitle || "",
      location: application.location || "",
      status: application.status || "APPLIED",
      appliedDate: application.appliedDate || "",
      notes: application.notes || ""
    });

    setEditingId(application.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:8081/api/applications/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      companyName: "",
      jobTitle: "",
      location: "",
      status: "APPLIED",
      appliedDate: "",
      notes: ""
    });
  };

  const handleSearch = async () => {
    try {
      let url =
        "http://localhost:8081/api/applications/search";

      const params = new URLSearchParams();

      if (searchCompany.trim()) {
        params.append("company", searchCompany);
      }

      if (searchStatus) {
        params.append("status", searchStatus);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error("Error searching applications:", error);
    }
  };

  const handleClearSearch = () => {
    setSearchCompany("");
    setSearchStatus("");
    fetchApplications();
  };

  return (
    <div className="container">
      <h1>Job Application Manager</h1>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="SELECTED">Selected</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId
            ? "Update Application"
            : "Add Application"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2>Search Applications</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by company"
          value={searchCompany}
          onChange={(e) =>
            setSearchCompany(e.target.value)
          }
        />

        <select
          value={searchStatus}
          onChange={(e) =>
            setSearchStatus(e.target.value)
          }
        >
          <option value="">All Statuses</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="SELECTED">Selected</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button type="button" onClick={handleSearch}>
          Search
        </button>

        <button
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </div>

      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            className="job-card"
          >
            <h3>{application.companyName}</h3>

            <p>
              <strong>Job Title:</strong>{" "}
              {application.jobTitle}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {application.location}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {application.status}
            </p>

            <p>
              <strong>Applied Date:</strong>{" "}
              {application.appliedDate}
            </p>

            <p>
              <strong>Notes:</strong>{" "}
              {application.notes}
            </p>

            <button
              onClick={() =>
                handleEdit(application)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(application.id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;