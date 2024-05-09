import Image from 'next/image'
import Pagination from './components/Pagination'

export default function Home({searchParams: {page}}: {searchParams: {page: string}}) {
  return (
    <Pagination itemCount={100} pageSize={15} currentPage={parseInt(page)}/>
  )
}
