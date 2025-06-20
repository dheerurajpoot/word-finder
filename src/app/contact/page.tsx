"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setSubmitted(true);
		setIsSubmitting(false);
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-4xl font-bold text-center mb-8'>
						Contact Us
					</h1>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<div className='lg:col-span-2'>
							<Card>
								<CardHeader>
									<CardTitle>Send us a Message</CardTitle>
								</CardHeader>
								<CardContent>
									{submitted ? (
										<div className='text-center py-8'>
											<div className='text-green-600 text-6xl mb-4'>
												✓
											</div>
											<h3 className='text-xl font-semibold mb-2'>
												Message Sent!
											</h3>
											<p className='text-gray-600'>
												Thank you for contacting us.
												We&apos;ll get back to you soon.
											</p>
										</div>
									) : (
										<form
											onSubmit={handleSubmit}
											className='space-y-6'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div>
													<Label htmlFor='name'>
														Name *
													</Label>
													<Input
														id='name'
														name='name'
														value={formData.name}
														onChange={handleChange}
														required
														className='mt-1'
													/>
												</div>
												<div>
													<Label htmlFor='email'>
														Email *
													</Label>
													<Input
														id='email'
														name='email'
														type='email'
														value={formData.email}
														onChange={handleChange}
														required
														className='mt-1'
													/>
												</div>
											</div>

											<div>
												<Label htmlFor='subject'>
													Subject *
												</Label>
												<Input
													id='subject'
													name='subject'
													value={formData.subject}
													onChange={handleChange}
													required
													className='mt-1'
												/>
											</div>

											<div>
												<Label htmlFor='message'>
													Message *
												</Label>
												<Textarea
													id='message'
													name='message'
													value={formData.message}
													onChange={handleChange}
													required
													rows={6}
													className='mt-1'
												/>
											</div>

											<Button
												type='submit'
												disabled={isSubmitting}
												className='w-full bg-green-500 hover:bg-green-600'>
												{isSubmitting
													? "Sending..."
													: "Send Message"}
											</Button>
										</form>
									)}
								</CardContent>
							</Card>
						</div>

						<div className='space-y-6'>
							<Card>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<Mail className='h-5 w-5' />
										Email
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-gray-600'>
										support@wordtips.com
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<MessageSquare className='h-5 w-5' />
										Support
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-gray-600 mb-2'>
										Need help with our tools?
									</p>
									<p className='text-sm text-gray-500'>
										We typically respond within 24 hours
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>FAQ</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										<div>
											<h4 className='font-semibold text-sm'>
												How accurate are the results?
											</h4>
											<p className='text-sm text-gray-600'>
												Our tools use comprehensive
												dictionaries to ensure high
												accuracy.
											</p>
										</div>
										<div>
											<h4 className='font-semibold text-sm'>
												Is WordTips free?
											</h4>
											<p className='text-sm text-gray-600'>
												Yes, all our tools are
												completely free to use.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
