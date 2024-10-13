import { connect } from "@/lib/connect"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function handleUpdateProfile(formData) {
  "use server"; 
  const db = connect();
  const { userId } = auth(); 

  const updatedUsername = formData.get("username");
  const updatedBio = formData.get("bio");
  const updatedEmail = formData.get("email");
  const updatedLocation = formData.get("location");
  const updatedWebsite = formData.get("website");

  const profiles = await db.query(
    `SELECT * FROM profiles WHERE clerk_id = $1`,
    [userId]
  );

  if (profiles.rowCount === 0) {
    await db.query(
      `INSERT INTO profiles (clerk_id, username, bio, email, location, website) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, updatedUsername, updatedBio, updatedEmail, updatedLocation, updatedWebsite]
    );
  } else {
    await db.query(
      `UPDATE profiles SET username=$1, bio=$2, email=$3, location=$4, website=$5 WHERE clerk_id=$6`,
      [updatedUsername, updatedBio, updatedEmail, updatedLocation, updatedWebsite, userId]
    );
  }
  revalidatePath("/profiles");
}

export default async function ProfilePage() {
  const { userId } = auth(); 
  const db = connect();

  const profileResult = await db.query(
    `SELECT username, bio, avatar_url, email, location, website FROM profiles WHERE clerk_id = $1`,
    [userId]
  );

  const profile = profileResult.rows[0] || {
    username: "",
    bio: "",
    avatar_url: "",
    email: "",
    location: "",
    website: ""
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{profile.username}</td>
          </tr>
          <tr>
            <td>Bio:</td>
            <td>{profile.bio}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{profile.location}</td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>{profile.website}</td>
          </tr>
        </tbody>
      </table>
      <h3>Update Your Information</h3>
      <form action={handleUpdateProfile}>
        <input 
          name="username" 
          placeholder="Username" 
          defaultValue={profile.username} 
          required
        />
        <textarea 
          name="bio" 
          placeholder="Bio" 
          defaultValue={profile.bio} 
        ></textarea>
        <input 
          name="email" 
          placeholder="Email" 
          defaultValue={profile.email} 
          required
        />
        <input 
          name="location" 
          placeholder="Location" 
          defaultValue={profile.location} 
        />
        <input 
          name="website" 
          placeholder="Website" 
          defaultValue={profile.website} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
