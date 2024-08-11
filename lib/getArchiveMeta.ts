import { ArchiveType, BlogPost } from "@/types";
import { getPostByName } from "./getPostByName";

type Filetree = {
  tree: {
    path: string;
  }[];
};

export async function getArchiveMeta(
  type: ArchiveType,
): Promise<BlogPost[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/anonymousRecords/chapdo-archive/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) {
    console.error(`GitHub API request failed with status: ${res.status}`);
    return undefined;
  }

  const repoFiletree: Filetree = await res.json();

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.startsWith(`${type}/`))
    .filter((path) => path.endsWith(".mdx"));

  console.log("filesArray", filesArray);

  const posts: BlogPost[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      posts.push(post);
    }
  }

  console.log("posts", posts);

  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
