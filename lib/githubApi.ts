import { BlogPost } from "@/types";
import { compileMDX } from "next-mdx-remote/rsc";
import CustomImage from "@/components/CustomImage";
import CustomVideo from "@/components/CustomVideo";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type Filetree = {
  tree: {
    path: string;
  }[];
};

async function fetchGitHubTree(): Promise<Filetree | undefined> {
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

  return await res.json();
}

async function getFilteredPosts(
  type: string,
  tree: Filetree,
): Promise<BlogPost[]> {
  const filesArray = tree.tree
    .map((obj) => obj.path)
    .filter((path) => path.startsWith(`${type}/`) && path.endsWith(".mdx"));

  const posts: BlogPost[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export async function getPosts(): Promise<BlogPost[] | undefined> {
  const tree = await fetchGitHubTree();
  if (!tree) return undefined;
  return getFilteredPosts("POSTS", tree);
}

export async function getTILs(): Promise<BlogPost[] | undefined> {
  const tree = await fetchGitHubTree();
  if (!tree) return undefined;
  return getFilteredPosts("TIL", tree);
}

export async function getPostByName(
  fileName: string,
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/anonymousRecords/chapdo-archive/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    tags?: string[];
  }>({
    source: rawMDX,
    components: {
      CustomVideo,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  const id = fileName.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags || [],
    },
    content,
  };

  return blogPostObj;
}