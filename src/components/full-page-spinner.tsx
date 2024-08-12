export const FullPageSpinner = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-50"/>
        </div>
    )
}
