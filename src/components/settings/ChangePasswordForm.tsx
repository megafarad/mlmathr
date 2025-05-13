import React, { useState } from 'react';
import {supabase} from "../../supabase.ts";

const ChangePasswordForm: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (password.length < 6) {
            setMessage('Password must be at least 6 characters.');
            return;
        }

        if (password !== confirm) {
            setMessage('Passwords do not match.');
            return;
        }

        setSubmitting(true);
        const { error } = await supabase.auth.updateUser({ password });
        setSubmitting(false);

        if (error) {
            setMessage(`❌ ${error.message}`);
        } else {
            setMessage('✅ Password updated successfully.');
            setPassword('');
            setConfirm('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h2 className="text-lg font-semibold">🔐 Change Password</h2>

            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />

            <button
                type="submit"
                disabled={submitting}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
                {submitting ? 'Updating...' : 'Update Password'}
            </button>

            {message && <div className="text-sm mt-2">{message}</div>}
        </form>
    );
};

export default ChangePasswordForm;
