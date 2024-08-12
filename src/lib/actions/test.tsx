'use server'

import { delay } from '@/lib/utils'

export default async function testAction() {
    await delay(3)

    return {
        test: true
    }
}
