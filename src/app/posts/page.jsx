import { connect } from "@/lib/connect";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  const { userId } = auth();
  const db = connect();

  const postResults = await db.query(`
    SELECT
      posts_table.id,
      profiles.username,
      posts_table.title,
      posts_table.content
    FROM posts_table
    INNER JOIN profiles ON posts_table.clerk_id = profiles.clerk_id;
  `);

  async function handleCreatePost(formData) {
    "use server";
    const content = formData.get("content");
    const title = formData.get("title");

    await db.query(`
      INSERT INTO posts_table (clerk_id, title, content) VALUES ($1, $2, $3)
    `, [userId, title, content]);
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div>
      <h2>Posts</h2>

      <h3>Add New Post</h3>
      <form action={handleCreatePost} className="post-form">
        <input name="title" placeholder="Title" required />
        <textarea name="content" placeholder="New Post" required></textarea>
        <button type="submit">Submit</button>
      </form>

      <h3>All Posts</h3>
      <table className="posts-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {postResults.rows.map((post) => (
            <tr key={post.id}>
              <td>{post.username}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
