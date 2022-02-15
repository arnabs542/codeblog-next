import PageTitle from "@/components/PageTitle";

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

// export async function getStaticProps({ params }) {
//   const post = await getFileBySlug('course', params.slug.join('/'))
//   return { props: { post } }
// }

export default function CoursePage({ post }) {
  console.log(post);
  return (
    <>
      <div className="mt-24 text-center">
          <PageTitle>
            Course Coming Soon{' '}
            <span role="img" aria-label="roadwork sign">🚧</span>
          </PageTitle>
        </div>
    </>
  )
}