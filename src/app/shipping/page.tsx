import { Metadata } from 'next';
import { Truck, MapPin, Clock, Package } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shipping Information | TopCup',
    description: 'Learn about TopCup delivery options, charges, and shipping policies.',
};

const deliveryCities = [
    { city: 'Mumbai', time: '2-4 hours', sameDay: true },
    { city: 'Delhi', time: '2-4 hours', sameDay: true },
    { city: 'Bangalore', time: '2-4 hours', sameDay: true },
    { city: 'Chennai', time: '4-6 hours', sameDay: true },
    { city: 'Hyderabad', time: '4-6 hours', sameDay: true },
    { city: 'Pune', time: '3-5 hours', sameDay: true },
    { city: 'Kolkata', time: 'Same day', sameDay: true },
    { city: 'Ahmedabad', time: 'Next day', sameDay: false },
];

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <Truck className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Shipping Information</h1>
                    <p className="text-white/80">Fast and reliable delivery across India</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Delivery Features */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                <Package className="w-7 h-7 text-primary-500" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Free Delivery</h3>
                            <p className="text-gray-600 text-sm">On all orders above ₹499</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                <Clock className="w-7 h-7 text-green-500" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Same Day Delivery</h3>
                            <p className="text-gray-600 text-sm">Order before 2 PM in major cities</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <MapPin className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Pan India</h3>
                            <p className="text-gray-600 text-sm">We deliver to 500+ cities</p>
                        </div>
                    </div>

                    {/* Delivery Charges */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-6">Delivery Charges</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Order Value</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Delivery Charge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">Below ₹499</td>
                                        <td className="py-3 px-4 text-gray-600">₹49</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">₹499 and above</td>
                                        <td className="py-3 px-4 text-green-600 font-semibold">FREE</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-gray-600">Express Delivery (2 hours)</td>
                                        <td className="py-3 px-4 text-gray-600">₹99 (select cities)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* City-wise Delivery */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold mb-6">Delivery Times by City</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {deliveryCities.map((item) => (
                                <div key={item.city} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-primary-500" />
                                        <span className="font-medium text-gray-900">{item.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600">{item.time}</span>
                                        {item.sameDay && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                Same Day
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
