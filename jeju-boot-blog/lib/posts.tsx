import fs from "fs";
//path는 모듈 전부, join은 path안의 함수하나를 불러올 때
import path, { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 현재 작업 디렉토리 문자열과 posts를 합쳐 새로운 문자열 생성
const postsDirectory = path.join(process.cwd(), "_posts");

export async function getPostBySlug() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        //.md를 없애서 id 얻으려고
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // gray-matter 사용해서 텍스트파일의 front-matter를 파싱
  const matterResult = matter(fileContents);

  // remark 써서 markdown -> html로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // id, html, data 뿌려줌
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
}