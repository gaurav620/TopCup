import { Metadata } from 'next';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Careers | TopCup',
    description: 'Join the TopCup team - Explore career opportunities with us.',
};

const openings = [
    {
        title: 'Senior Baker',
        location: 'Mumbai',
        type: 'Full-time',
        department: 'Production',
    },
    {
        title: 'Delivery Partner',
        location: 'Multiple Cities',
        type: 'Full-time',
        department: 'Operations',
    },
    {
        title: 'Customer Support Executive',
        location: 'Remote',
        type: 'Full-time',
        department: 'Support',
    },
    {
        title: 'Social Media Manager',
        location: 'Mumbai',
        type: 'Full-time',
        department: 'Marketing',
    },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Join Our Team</h1>
                    <p className="text-white/80">Build your career while spreading sweetness</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Why Join */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-6">Why Work at TopCup?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">🎂</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Sweet Perks</h3>
                                    <p className="text-gray-600 text-sm">Free cakes on birthdays and festivals</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">📈</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Growth Opportunities</h3>
                                    <p className="text-gray-600 text-sm">Learn and grow with a fast-paced startup</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">🏥</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Health Insurance</h3>
                                    <p className="text-gray-600 text-sm">Comprehensive health coverage for you and family</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">🏠</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Flexible Work</h3>
                                    <p className="text-gray-600 text-sm">Work from home options for eligible roles</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Open Positions */}
                    <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
                    <div className="space-y-4">
                        {openings.map((job) => (
                            <div key={job.title} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {job.type}
                                        </span>
                                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                                            {job.department}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2 text-primary-500 font-medium hover:underline"
                                >
                                    Apply <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center text-gray-600">
                        <p>Don&apos;t see a role that fits? Send your resume to{' '}
                            <a href="mailto:careers@topcup.in" className="text-primary-500 hover:underline">
                                careers@topcup.in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
