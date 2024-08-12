'use client'

import PageTitle from '@/components/page-title'
import Counter from './counter'
import Example from '@/app/(dashboard)/pictures/example'


export default function Pictures() {
    return (
        <>
            <div className="flex items-center">
                <PageTitle>Page A</PageTitle>
            </div>

            <p>This counter shares its state with Page B.</p>

            <Counter/>

            <h3><strong>Other</strong></h3>
            <p>This component gets its initial state from API.</p>

            <Example/>
        </>
    )
}
