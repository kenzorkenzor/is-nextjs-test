import PageTitle from '@/components/page-title'
import Counter from '@/app/(dashboard)/pictures/counter'

export default function Settings() {
    return (
        <>
            <div className="flex items-center">
                <PageTitle>Page B</PageTitle>
            </div>

            <p>Showing counter again to show shared state.</p>

            <Counter />
        </>
    )
}
