'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent, CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignInFormSchema, SignInFormValues } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useState } from 'react'

interface SignInFormInterface {
    onSubmitAction: (data: SignInFormValues) => Promise<any>
    redirectTo?: string
}

export default function SignInForm(props: SignInFormInterface) {
    const validationErrors = {
        checkForm: 'Check the form for errors.',
        invalidCredentials: 'Incorrect email or password.',
        unknownServerResponse: 'Request failed.',
    }

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: 't@t.com',
            password: '123',
            redirectTo: props.redirectTo,
        },
    })

    const [formErrorMessage, setFormErrorMessage] = useState('')

    // Sign in action
    const signIn = async (formData: SignInFormValues) => {
        // Validate
        await form.trigger()

        if (!form.formState.isValid) {
            return
        }

        setFormErrorMessage('')

        // Submit
        const response = await props.onSubmitAction(formData)

        if (response?.error) {
            switch (response.error.name) {
                case 'ServerActionValidation':
                    setFormErrorMessage(validationErrors.checkForm)
                    break

                case 'InvalidAuthenticationCredentials':
                    setFormErrorMessage(validationErrors.invalidCredentials)
                    break

                default:
                    setFormErrorMessage(validationErrors.unknownServerResponse)
            }
        }
    }

    return (
        <Form {...form}>
            <form method="POST" onSubmit={form.handleSubmit(signIn)}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Login</CardTitle>
                        <CardDescription>Enter your details below to login to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {(formErrorMessage &&
                            <Alert className="mb-4" variant="destructive">
                                <AlertDescription>{formErrorMessage}</AlertDescription>
                            </Alert>
                        )}

                        {(!formErrorMessage && form.formState.isSubmitted && !form.formState.isValid &&
                            <Alert className="mb-4" variant="destructive">
                                <AlertDescription>{validationErrors.checkForm}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="email">Email</Label>
                                            <FormControl>
                                                <Input id="email" placeholder="me@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" id="password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}>
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
