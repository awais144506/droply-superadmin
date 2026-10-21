import { formatDistanceToNow } from "date-fns";
import { WebsiteLead, LeadStatus } from "@/features/leads/types";
import { useUpdateLeadStatus } from "@/features/leads/api/use-leads";
import { MapPin, Phone, MessageCircle, ArrowRight, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { formatPhoneNumber } from "react-phone-number-input";

export function LeadsList({ leads }: { leads: WebsiteLead[] }) {
    const { mutate: updateStatus, isPending } = useUpdateLeadStatus();

    const handleStatusUpdate = (id: string, newStatus: LeadStatus) => {
        updateStatus({ id, status: newStatus });
    };

    const getWhatsAppUrl = (phone: string, name: string) => {
        if (!phone) return "#";
        const cleanPhone = phone.replace(/\D/g, ''); // Strip '+' and spaces for WhatsApp API
        const text = encodeURIComponent(`Hi ${name}, we received your inquiry regarding Droply. How can we help you?`);
        return `https://wa.me/${cleanPhone}?text=${text}`;
    };

    const renderActionCTA = (lead: WebsiteLead) => {
        if (lead.status === "NEW") {
            return (
                <button 
                    onClick={() => handleStatusUpdate(lead.id, "CONTACTED")} 
                    disabled={isPending} 
                    className="group flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-all disabled:opacity-50"
                >
                    <Phone className="h-3.5 w-3.5" /> Mark Contacted 
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
            );
        }
        if (lead.status === "CONTACTED") {
            return (
                <button 
                    onClick={() => handleStatusUpdate(lead.id, "MEETING")} 
                    disabled={isPending} 
                    className="group flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-all disabled:opacity-50"
                >
                    <Calendar className="h-3.5 w-3.5" /> Set Meeting 
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
            );
        }
        if (lead.status === "MEETING") {
            return (
                <div className="flex items-center gap-2 w-full">
                    <button 
                        onClick={() => handleStatusUpdate(lead.id, "CONVERTED")} 
                        disabled={isPending} 
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-all disabled:opacity-50"
                        title="Convert Lead"
                    >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Convert
                    </button>
                    <button 
                        onClick={() => handleStatusUpdate(lead.id, "REJECTED")} 
                        disabled={isPending} 
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-all disabled:opacity-50"
                        title="Reject Lead"
                    >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                </div>
            );
        }
        if (lead.status === "CONVERTED") {
            return (
                <div className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-bold bg-emerald-50 text-emerald-600 rounded-lg cursor-default border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4" /> Converted
                </div>
            );
        }
        return (
            <div className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-bold bg-rose-50 text-rose-600 rounded-lg cursor-default border border-rose-100">
                <XCircle className="h-4 w-4" /> Rejected
            </div>
        );
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50/80 text-xs uppercase text-slate-500 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold tracking-wider">Lead Info</th>
                            <th className="px-6 py-4 font-bold tracking-wider">City</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                            <th className="px-6 py-4 font-bold tracking-wider text-center w-48">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    <p className="font-medium text-slate-600">No leads found.</p>
                                    <p className="text-xs mt-1">Your new website inquiries will appear here.</p>
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{lead.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Phone className="h-3 w-3" />
                                                {lead.phone ? formatPhoneNumber(lead.phone) : "N/A"}
                                            </div>
                                            {lead.phone && (
                                                <a 
                                                    href={getWhatsAppUrl(lead.phone, lead.name)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center p-1 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700 rounded-md transition-colors"
                                                    title="Message on WhatsApp"
                                                >
                                                    <MessageCircle className="h-3.5 w-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-700">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span className="font-medium">{lead.city}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        {renderActionCTA(lead)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}