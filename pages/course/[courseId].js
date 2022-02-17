import PageTitle from '@/components/PageTitle'
import courseData from '@/data/course/courseList'
import { getAllCourseFrontMatter } from '@/lib/mdx'
import CourseContents from '@/layouts/CourseContents'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  return {
    paths: courseData.map((course) => (
      { params: { courseId: course.slug } }
    )),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  console.log(params);
  const topics = await getAllCourseFrontMatter(params.courseId);
  console.log(topics);
  return { props: { topics: topics, courseId: params.courseId } }
}

export default function CoursePage({ topics, courseId }) {
  if (topics == null || courseId == null)
    return (
      <>
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">🚧</span>
          </PageTitle>
        </div>
      </>
    )
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <CourseContents
        topics={topics}
        title="Contents"
        courseId={courseId}
      />
    </>
  )
}
