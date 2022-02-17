import PageTitle from "@/components/PageTitle";
import Link from '@/components/Link'

// export async function getStaticPaths() {
//   const posts = getFiles('course')
//   console.log(posts);
//   return {
//     paths: posts.map((p) => ({
//       params: {
//         slug: formatSlug(p).split('/'),
//       },
//     })),
//     fallback: false,
//   }
// }

export async function getStaticProps({ params }) {
  const contents = [
    { title: 'Introduction' },
    { title: 'Basics' }
  ]
  return {
    props: {
      contents
    }
  }
}

export default function StaticPagePage({ contents }) {
  return (
    <>
      <div className="mt-12 text-center">
        <PageTitle>
          Contents{' '}
          <span role="img" aria-label="roadwork sign">🚧</span>
        </PageTitle>
        <div className="mt-12 w-full rounded-lg shadow">
          <ul>
            <li className="p-3 hover:text-blue-400"><Link href="/">List Item 1</Link></li>
            <li className="p-3 hover:text-blue-400"><Link href="/">List Item 2</Link></li>
            <li className="p-3 hover:text-blue-400"><Link href="/">List Item 3</Link></li>
            <li className="p-3 hover:text-blue-400"><Link href="/">List Item 4</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}