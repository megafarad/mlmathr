import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase.ts";

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const { hash } = window.location;
        if (!hash.includes('access_token')) {
            setError('Invalid or missing reset link.');
        }
    }, []);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => navigate('/auth'), 2000);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow space-y-4">
            <h1 className="text-xl font-bold text-center">🔐 Reset Your Password</h1>

            {success ? (
                <p className="text-green-600 text-center">✅ Password updated! Redirecting to login...</p>
            ) : (
                <form onSubmit={handleReset} className="space-y-4">
                    <input
                        type="password"
                        placeholder="New password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full p-2 border rounded"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    >
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordPage;
