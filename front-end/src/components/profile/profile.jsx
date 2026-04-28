import { useEffect, useState } from "react";
import "./profile.css";

import pfp from "./testimg1.jpg";
import badge from "./badge.png";
import Leaderboard from "./ProfileLeaderboard";
import ProfileChart from "./ProfileChart";

const API_BASE_URL = "http://localhost:8080/api";

function getStoredProfile() {
  try {
    return JSON.parse(localStorage.getItem("profiledata")) || null;
  } catch {
    return null;
  }
}

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(
    getStoredProfile() || {
      profile_id: null,
      profileUsername: "User",
      bio: "",
      profileImageURL: pfp,
      tierName: "Eco Starter",
      createdAt: "28/04/2026",
    }
  );

  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;

      try {
        const res = await fetch(`${API_BASE_URL}/profile/${userId}`);

        if (!res.ok) {
          throw new Error("Profile not found");
        }

        const data = await res.json();

        const formattedProfile = {
          profile_id: data.profile_id || data.profileId || data.id,
          profileUsername:
            data.display_name ||
            data.profileUsername ||
            data.username ||
            profileData.profileUsername,
          bio: data.bio || "",
          profileImageURL: data.profileImageURL || data.profile_image_url || pfp,
          tierName: data.tierName || data.tier_name || "Eco Starter",
          createdAt: data.created_at || data.createdAt || "28/04/2026",
        };

        setProfileData(formattedProfile);
        localStorage.setItem("profiledata", JSON.stringify(formattedProfile));
      } catch (err) {
        console.warn("Using local profile fallback:", err);
      }
    }

    loadProfile();
  }, [userId]);

  return (
    <main className="profile-page">
      <section className="profile-main">
        {editMode ? (
          <ProfileEditor
            profileData={profileData}
            setProfileData={setProfileData}
            setEditMode={setEditMode}
          />
        ) : (
          <ProfileView
            profileData={profileData}
            setEditMode={setEditMode}
          />
        )}

        <StatsBadges />

        <div className="profile-chart-card">
          <h2>Your CO₂ Progress</h2>
          <ProfileChart />
        </div>
      </section>

      <aside className="profile-sidebar">
        <Leaderboard />
      </aside>
    </main>
  );
}

function ProfileView({ profileData, setEditMode }) {
  return (
    <section className="profile-card">
      <div className="profile-header">
        <div className="profile-image-wrapper readonly">
          <img
            className="profile-picture"
            src={profileData.profileImageURL || pfp}
            alt="Profile"
          />
        </div>

        <div className="profile-info">
          <div className="profile-name-row">
            <h1>{profileData.profileUsername || "User"}</h1>
            <span className="tier-pill">{profileData.tierName || "Eco Starter"}</span>
          </div>

          <p className="member-date">
            A user since <strong>{formatDate(profileData.createdAt)}</strong>
          </p>
        </div>
      </div>

      <div className="profile-about">
        <div className="profile-section-title">
          <h2>About me</h2>
          <button className="editButton" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        </div>

        <p className="description">
          {profileData.bio && profileData.bio.trim()
            ? profileData.bio
            : "No bio yet."}
        </p>
      </div>
    </section>
  );
}

function ProfileEditor({ profileData, setProfileData, setEditMode }) {
  const [userInput, setUserInput] = useState({
    username: profileData.profileUsername || "",
    description: profileData.bio || "",
    profileImageURL: profileData.profileImageURL || pfp,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInput((prev) => ({
        ...prev,
        profileImageURL: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const updatedProfile = {
      ...profileData,
      profileUsername: userInput.username || profileData.profileUsername || "User",
      bio: userInput.description || "",
      profileImageURL: userInput.profileImageURL || pfp,
    };

    const submitData = {
      profileUsername: updatedProfile.profileUsername,
      bio: updatedProfile.bio,
      profileImageURL: updatedProfile.profileImageURL,
      profile_id: updatedProfile.profile_id,
    };

    try {
      if (updatedProfile.profile_id) {
        const res = await fetch(
          `${API_BASE_URL}/profile/update/${updatedProfile.profile_id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          }
        );

        if (!res.ok) {
          throw new Error("Backend update failed");
        }

        const data = await res.json();

        updatedProfile.profileUsername =
          data.display_name ||
          data.profileUsername ||
          submitData.profileUsername;

        updatedProfile.bio = data.bio || submitData.bio;
      }

      setProfileData(updatedProfile);
      localStorage.setItem("profiledata", JSON.stringify(updatedProfile));
      setEditMode(false);
    } catch (err) {
      console.error("Profile update error:", err);

      setProfileData(updatedProfile);
      localStorage.setItem("profiledata", JSON.stringify(updatedProfile));
      setError("Saved locally. Backend update was unavailable.");
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="profile-card">
      <div className="profile-header">
        <label className="profile-image-wrapper">
          <img
            className="profile-picture"
            src={userInput.profileImageURL || pfp}
            alt="Profile"
          />
          <span className="image-overlay">Change</span>
          <input
            type="file"
            accept="image/*"
            className="image-input"
            onChange={handleImageChange}
          />
        </label>

        <div className="profile-info">
          <input
            type="text"
            name="username"
            className="changeUsername"
            placeholder="Username"
            value={userInput.username}
            onChange={handleChange}
          />

          <span className="tier-pill">{profileData.tierName || "Eco Starter"}</span>

          <p className="member-date">
            A user since <strong>{formatDate(profileData.createdAt)}</strong>
          </p>
        </div>
      </div>

      <div className="profile-about">
        <div className="profile-section-title">
          <h2>About me</h2>

          <div className="button-group">
            <button
              className="editButton secondary"
              onClick={() => setEditMode(false)}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              className="editButton"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <textarea
          className="changeDescription"
          placeholder="Write something about yourself..."
          value={userInput.description}
          name="description"
          onChange={handleChange}
        />

        {error && <p className="profile-error">{error}</p>}
      </div>
    </section>
  );
}

function StatsBadges() {
  return (
    <section className="profile-badges-card">
      <div className="profileBadge">
        <h3>This Week</h3>
        <img className="badgeImage" src={badge} alt="Badge" />
        <p>0 kg of CO₂</p>
      </div>

      <div className="profileBadge">
        <h3>Most CO₂ Saved This Month</h3>
        <img className="badgeImage" src={badge} alt="Badge" />
        <p>0 kg of CO₂</p>
      </div>

      <div className="profileBadge">
        <h3>All Time</h3>
        <img className="badgeImage" src={badge} alt="Badge" />
        <p>0 kg of CO₂</p>
      </div>
    </section>
  );
}

function formatDate(dateValue) {
  if (!dateValue) return "28/04/2026";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-GB");
}