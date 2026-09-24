import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { getAllInquiries } from "../../api/inquiryApi";
import type { Inquiry } from "../../types/inquiry";
import DashboardLayout from "../../components/common/DashboardLayout";

function Inquiries() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInquiries = async () => {

            try {
                setLoading(true);
                setError('');

                const data = await getAllInquiries();
                const customerInquiries = data.filter(
                    (inquiry) => inquiry.customerId === user?.id  // Assuming you have access to the authenticated user's ID
                )
                setInquiries(customerInquiries);
            } catch (error) {
                console.error("Error fetching inquiries:", error);
                setError("Failed to load inquiries.");
                
            }finally {
                setLoading(false);
                
            }
        }
        if (user) {
            fetchInquiries();
        }
    }, [user]);




    return (
        <DashboardLayout>
      <div className="space-y-6">
        <div>
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="mb-4 text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-2xl font-bold text-white">
            My Inquiries
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            View your property inquiries and their current status.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">
              Loading inquiries...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-800 bg-red-950/30 p-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && inquiries.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
            <h2 className="text-lg font-semibold text-white">
              No inquiries found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              You haven't submitted any property inquiries yet.
            </p>

            <button
              onClick={() => navigate('/customer/properties')}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Browse Properties
            </button>
          </div>
        )}

        {!loading && inquiries.length > 0 && (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-white">
                      Property #{inquiry.propertyId}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {inquiry.message}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      inquiry.status === 'NEW'
                        ? 'bg-blue-500/10 text-blue-400'
                        : inquiry.status === 'RESPONDED'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 border-t border-slate-800 pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-slate-500">
                      Agent
                    </span>

                    <p className="mt-1 text-slate-300">
                      {inquiry.agentId
                        ? `Agent #${inquiry.agentId}`
                        : 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-500">
                      Created
                    </span>

                    <p className="mt-1 text-slate-300">
                      {new Date(
                        inquiry.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
    );
}

export default Inquiries