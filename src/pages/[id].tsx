// next
import { GetStaticProps, GetStaticPaths } from 'next';

// data
import { PostItem, getPostItems } from "@/data/post.data";

const MainDetailPage = ({ item }: {item: PostItem}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: item.__html}}></div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const item: PostItem[] = await getPostItems();

  const id = params?.id

  return {
    props: {
      item: item.find((value)=>value.post.id === Number(id))
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items: PostItem[] = await getPostItems();

  return {
    paths: items.map((item)=>{
      return {
        params: {
          id: String(item.post.id)
        }
      }
    }),
    fallback: true
  }
}

export default MainDetailPage;
