import PostList from "./PostList";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/api/posts`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Home() {
  const response: any = await getData();

  return <PostList posts={response.data} />;
}
