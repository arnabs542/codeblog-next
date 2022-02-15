import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/router";

export default function CoursePage({}) {
  const router = useRouter();
  console.log('CoursePage', router.query);
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