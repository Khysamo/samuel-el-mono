import { getAllPosts } from "@/lib/posts";
import AdminClient from "./AdminClient";

export default function AdminPage() {
  const posts = getAllPosts();
  return <AdminClient posts={posts} />;
}
