import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/router";

export default function TopicPage({ }) {
    const router = useRouter();
    console.log('CoursePage', router.query);
    return (
        <>
            <div className="mt-24 text-center">
                <PageTitle>
                    Topic Coming Soon{' '}
                    <span role="img" aria-label="roadwork sign">
                        🚧
                    </span>
                </PageTitle>
            </div>
        </>
    )
}