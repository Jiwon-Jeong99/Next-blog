import fs from "fs";
//path는 모듈 전부, join은 path안의 함수하나를 불러올 때
import path, { join } from "path";
import matter from "gray-matter";

// 현재 작업 디렉토리 문자열과 posts를 합쳐 새로운 문자열 생성
const postsDirectory = path.join(process.cwd(), "_posts");

export function getPostBySlug() {
  const fileNames = fs.readdirSync(postsDirectory);
  const getAllData = fileNames.map((fileName) => {
    //.md를 없애서 id 얻으려고
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    //id-데이터 뿌려줌
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  //   return allPostsData.sort(({ date: a }, { date: b }) => {
  //     if (a < b) {
  //       return 1;
  //     } else if (a > b) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
}
