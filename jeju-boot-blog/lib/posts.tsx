import fs from "fs";
//path는 모듈 전부, join은 path안의 함수하나를 불러올 때
import path, { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";

// 현재 작업 디렉토리 문자열과 posts를 합쳐 새로운 문자열 생성
const postsDirectory = path.join(process.cwd(), "_posts");

export async function getPostBySlug() {
  const fileNames = fs.readdirSync(postsDirectory);
  const getAllData = fileNames.map((fileName) => {
    //.md를 없애서 id 얻으려고
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // const processedContent = await remark()
    //   .use(html)
    //   .process(matterResult.content);
    // const contentHtml = processedContent.toString();
    //id-데이터 뿌려줌
    return {
      id,
      // contentHtml,
      ...matterResult.data,
    };
  });
  // return getAllData.sort((a, b) => {
  //   if (a.date < b.date) {
  //       return 1
  //   } else {
  //       return -1
  //   }
  // })
  console.log(getAllData);
  return getAllData;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}
