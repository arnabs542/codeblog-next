import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function CourseContents({ topics, title, courseId }) {

  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <ul>
          {topics.map((frontMatter, idx) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-4">
                  <div className="space-y-3 xl:col-span-3">
                    <h6 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/course/${courseId}/${slug}`} className="text-gray-900 dark:text-gray-100">{idx + 1}{'. '}{title}</Link>
                    </h6>
                  </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
