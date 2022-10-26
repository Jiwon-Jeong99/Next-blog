import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { read } from 'to-vfile';
import matter from 'gray-matter';

import fs from 'fs';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify/lib';

interface Post {
  id: number;
  date:  string;
  author: string;
  weather: string;
  comment: string;
}

export interface PostItem {post: Post; __html: string}

export const getPostItems = async () => {
  const postRoot = '__posts';

  const fileNames = fs.readdirSync(path.join(postRoot));

  const data: PostItem[] = []

  for (let filename of fileNames) {
    const markdownWithMeta = fs.readFileSync(
      path.join(postRoot, filename), 'utf-8'
    );

    const __html = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter)
      .use(remarkHtml)
      .process(await read(path.join(postRoot, filename)));
    
    data.push(
      {
        post: matter(markdownWithMeta).data as Post,
        __html: String(__html)
      } as PostItem
    );
  }

  return data;
}

export default Post;
